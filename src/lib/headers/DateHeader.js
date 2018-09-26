import React from 'react'
import PropTypes from 'prop-types'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'
import CustomHeader from './CustomHeader'
import { getNextUnit } from '../utility/calendar'
import { defaultHeaderFormats } from '../default-config'
import Interval from './Interval'

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
    ]).isRequired,
    intervalRenderer: PropTypes.func,
    props: PropTypes.object,
  }

  getHeaderUnit = () => {
    if (this.props.unit) {
      return this.props.unit
    } else if (this.props.primaryHeader) {
      return getNextUnit(this.props.timelineUnit)
    } else {
      return this.props.timelineUnit
    }
  }

  render() {
    const unit = this.getHeaderUnit()
    const {props} = this.props;
    return (
      <CustomHeader unit={unit} props={props}>
        {({
          headerContext: { intervals },
          getRootProps,
          getIntervalProps,
          showPeriod
        }, props) => {
          const unit = this.getHeaderUnit()

          return (
            <div
              className={this.props.className}
              {...getRootProps({ style: this.getRootStyle() })}
            >
              {intervals.map(interval => {
                const intervalText = this.getLabelFormat(
                  [interval.startTime, interval.endTime],
                  unit,
                  interval.labelWidth
                )
                return (
                  <Interval
                    key={`label-${interval.startTime.valueOf()}`}
                    unit={unit}
                    interval={interval}
                    showPeriod={showPeriod}
                    intervalText={intervalText}
                    primaryHeader={!!this.props.primaryHeader}
                    secondaryHeader={!!this.props.secondaryHeader}
                    getIntervalProps={getIntervalProps}
                    intervalRenderer={this.props.intervalRenderer}
                    props={props}
                  />
                )
              })}
            </div>
          )
        }}
      </CustomHeader>
    )
  }

  getRootStyle = () => {
    return {
      height: 30,
      ...this.props.style
    }
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
  intervalRenderer,
  props,
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
          intervalRenderer={intervalRenderer}
          props={props}
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
  ]),
  intervalRenderer: PropTypes.func,
  props: PropTypes.object,
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
