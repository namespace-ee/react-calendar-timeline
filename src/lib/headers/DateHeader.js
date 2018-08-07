import React from 'react'
import PropTypes from 'prop-types'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'
import CustomHeader from './CustomHeader'
import { getNextUnit } from '../utility/calendar'
import { defaultHeaderFormats } from '../default-config'

class DateHeader extends React.Component {
  static propTypes = {
    primaryHeader: PropTypes.bool,
    secondaryHeader: PropTypes.bool,
    unit: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    timelineUnit: PropTypes.string,
    labelFormat: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
      PropTypes.string
    ]).isRequired
  }

  getHeaderUnit = () => {
    if(this.props.unit) {
      return this.props.unit
    }
    else if (this.props.primaryHeader) {
      return getNextUnit(this.props.timelineUnit)
    } else {
      return this.props.timelineUnit
    }
  }

  render() {
    const unit = this.getHeaderUnit()
    return <CustomHeader unit={unit} children={this.headerRenderer} />
  }

  getRootStyle = () => {
    console.log(this.props)
    return {
      height: 30,
      ...this.props.style,
    }
  }

  headerRenderer = ({
    headerContext: { intervals },
    getRootProps,
    getIntervalProps,
    showPeriod
  }) => {
    const unit = this.getHeaderUnit()

    return (
      <div className={this.props.className} {...getRootProps({ style: this.getRootStyle() })}>
        {intervals.map(interval => {
          const intervalStyle = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              this.props.secondaryHeader && !this.props.primaryHeader
                ? 'rgb(240, 240, 240)'
                : 'initial',
            height: '100%',
            borderLeft: this.props.primaryHeader
              ? '1px solid #bbb'
              : '2px solid #bbb',
            borderRight: this.props.primaryHeader ? '1px solid #bbb' : 'none',
            borderBottom: '1px solid #bbb',
            color: this.props.primaryHeader ? '#fff' : 'initial',
            cursor: 'pointer',
            fontSize: '14px'
          }
          return (
            <div
              onClick={() => {
                if (this.props.primaryHeader) {
                  const nextUnit = getNextUnit(unit)
                  const newStartTime = interval.startTime
                    .clone()
                    .startOf(nextUnit)
                  const newEndTime = interval.startTime.clone().endOf(nextUnit)
                  showPeriod(newStartTime, newEndTime)
                } else {
                  showPeriod(interval.startTime, interval.endTime)
                }
              }}
              {...getIntervalProps({
                interval,
                style: intervalStyle
              })}
            >
              <span>
              {this.getLabelFormat(
                [interval.startTime, interval.endTime],
                unit,
                interval.labelWidth,
              )}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  getLabelFormat(interval, unit, labelWidth) {
    const { labelFormat } = this.props
    if (typeof labelFormat === 'string') {
      const startTime = interval[0]
      return startTime.format(labelFormat)
    } else if (typeof labelFormat === 'object') {
      return formatLabel(interval, unit, labelWidth, labelFormat)
    } else if (typeof labelFormat === 'function') {
      return labelFormat(interval, unit, labelWidth)
    } else {
      throw new Error('labelFormat should be function, object or string')
    }
  }
}

const DateHeaderWrapper = ({
  primaryHeader,
  secondaryHeader,
  unit,
  labelFormat,
  style,
  className,
}) => (
  <TimelineStateConsumer>
    {({ getTimelineState }) => {
      const timelineState = getTimelineState()
      return (
        <DateHeader
          timelineUnit={timelineState.timelineUnit}
          primaryHeader={primaryHeader}
          secondaryHeader={secondaryHeader}
          unit={unit}
          labelFormat={labelFormat}
          style={style}
          className={className}
        />
      )
    }}
  </TimelineStateConsumer>
)

DateHeaderWrapper.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  primaryHeader: PropTypes.bool,
  secondaryHeader: PropTypes.bool,
  unit: PropTypes.string,
  labelFormat: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    PropTypes.string
  ])
}

DateHeaderWrapper.defaultProps = {
  secondaryHeader: true,
  labelFormat: formatLabel
}

function formatLabel(
  [timeStart, timeEnd],
  unit,
  labelWidth,
  formatOptions = defaultHeaderFormats
) {
  let format
  if (labelWidth >= 150) {
    format = formatOptions[unit]['long']
  } else if (labelWidth >= 100) {
    format = formatOptions[unit]['mediumLong']
  } else if (labelWidth >= 50) {
    format = formatOptions[unit]['medium']
  } else {
    format = formatOptions[unit]['short']
  }
  return timeStart.format(format)
}

export default DateHeaderWrapper
