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
    timelineUnit: PropTypes.string,
    labelFormat: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
      PropTypes.string
    ]).isRequired
  }

  getHeaderUnit = () => {
    if (this.props.primaryHeader) {
      return getNextUnit(this.props.timelineUnit)
    } else if (this.props.secondaryHeader) {
      return this.props.timelineUnit
    } else {
      return this.props.unit
    }
  }

  render() {
    const unit = this.getHeaderUnit()
    return (
      <CustomHeader unit={unit}>
        {({ provided, intervals }) => {
          const rootStyle = {
            height: 30,
            ...provided.style
          }
          return (
            <div {...provided} style={rootStyle}>
              {intervals.map(
                ({
                  startTime,
                  endTime,
                  provided: intervalProvided,
                  showPeriod,
                  intervalContext,
                }) => {
                  const style = {
                    backgroundColor: this.props.secondaryHeader && !this.props.primaryHeader ? 'rgb(240, 240, 240)' : 'initial',
                    lineHeight: '30px',
                    textAlign: 'center',
                    borderLeft: this.props.primaryHeader? "1px solid #bbb" : '2px solid #bbb',
                    borderRight: this.props.primaryHeader? "1px solid #bbb" : "none",
                    borderBottom: '1px solid #bbb',
                    color: this.props.primaryHeader ? '#fff' : 'initial',
                    cursor: 'pointer',
                    fontSize: '14px',
                    ...intervalProvided.style
                  }
                  return (
                    <div
                      onClick={() => {
                        if(this.props.primaryHeader){
                          const nextUnit = getNextUnit(unit)
                          const newStartTime =startTime.clone().startOf(nextUnit)
                          const newEndTime = startTime.clone().endOf(nextUnit)
                          showPeriod(newStartTime, undefined, newEndTime)
                        }
                        else {
                          showPeriod(startTime, undefined, endTime)
                        }
                      }}
                      {...intervalProvided}
                      style={style}
                    >
                      {this.getLabelFormat([startTime, endTime], unit, intervalContext)}
                    </div>
                  )
                }
              )}
            </div>
          )
        }}
      </CustomHeader>
    )
  }

  getLabelFormat(interval, unit, intervalContext) {
    const {labelFormat} = this.props;
    if(typeof labelFormat === 'string'){
      const startTime = interval[0]
      return startTime.format(labelFormat)
    }
    else if (typeof labelFormat === 'object'){
      return formatLabel(interval, unit, intervalContext, labelFormat)
    }
    else if (typeof labelFormat === 'function'){
      return labelFormat(interval, unit, intervalContext);
    }
    else {
      throw new Error('labelFormat should be function, object or string')
    }
  }
}

const DateHeaderWrapper = ({ primaryHeader, secondaryHeader, unit, labelFormat }) => (
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
        />
      )
    }}
  </TimelineStateConsumer>
)

DateHeaderWrapper.propTypes = {
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
  {intervalWidth},
  formatOptions = defaultHeaderFormats
) {
  let format 
  if (intervalWidth >= 150) {
    format = formatOptions[unit]['long']
  } else if (intervalWidth >= 100) {
    format = formatOptions[unit]['mediumLong']
  }
  else if (intervalWidth >= 50) {
    format = formatOptions[unit]['medium']
  }
  else {
    format = formatOptions[unit]['short']
  }
  return timeStart.format(format)
}

export default DateHeaderWrapper
