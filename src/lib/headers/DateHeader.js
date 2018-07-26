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
    console.log(unit, this.props.primaryHeader && "primaryHeader", this.props.secondaryHeader && "secondaryHeader", this.props.timelineUnit)
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
                    lineHeight: '30px',
                    textAlign: 'center',
                    borderLeft: '1px solid black',
                    cursor: 'pointer',
                    ...intervalProvided.style
                  }
                  return (
                    <div
                      onClick={() => {
                        showPeriod(startTime, undefined, endTime)
                      }}
                      {...intervalProvided}
                      style={style}
                    >
                      {this.props.labelFormat([startTime, endTime], unit, intervalContext)}
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
  const f = formatOptions
  let format 
  if (intervalWidth >= 150) {
    format = f[unit]['long']
  } else if (intervalWidth >= 100) {
    format = f[unit]['mediumLong']
  }
  else if (intervalWidth >= 50) {
    format = f[unit]['medium']
  }
  else {
    format = f[unit]['short']
  }
  return timeStart.format(format)
}

export default DateHeaderWrapper
