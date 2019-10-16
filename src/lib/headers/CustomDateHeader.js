import React from 'react'
import Interval from './Interval'
export function CustomDateHeader({
  headerContext: { intervals, unit },
  getRootProps,
  getIntervalProps,
  showPeriod,
  data: {
    style,
    intervalRenderer,
    className,
    getLabelFormat,
    unitProp,
    headerData
  }
}) {
  return (
    <div
      data-testid={`dateHeader`}
      className={className}
      {...getRootProps({ style })}
    >
      {intervals.map(interval => {
        const intervalText = getLabelFormat(
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
            primaryHeader={unitProp === 'primaryHeader'}
            getIntervalProps={getIntervalProps}
            intervalRenderer={intervalRenderer}
            headerData={headerData}
          />
        )
      })}
    </div>
  )
}
