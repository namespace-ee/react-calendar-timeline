import React, { HTMLAttributes, ReactNode } from 'react'
import { getNextUnit, SelectUnits } from '../utility/calendar'
import { composeEvents } from '../utility/events'
import { Dayjs } from 'dayjs'
import { IntervalRenderer, Interval as IntervalType, GetIntervalProps } from '../types/main'
import { GetIntervalPropsType } from './types'

export type IntervalProps<Data> = {
  intervalRenderer: (p: IntervalRenderer<Data>) => ReactNode
  unit: SelectUnits
  interval: IntervalType
  showPeriod: (startTime: Dayjs, endTime: Dayjs) => void
  intervalText: string
  primaryHeader: boolean
  getIntervalProps: GetIntervalPropsType

  headerData?: Data
  timezone?: string
}

class Interval<Data> extends React.PureComponent<IntervalProps<Data>> {
  onIntervalClick = () => {
    const { primaryHeader, interval, unit, showPeriod, timezone } = this.props
    if (primaryHeader) {
      const nextUnit = getNextUnit(unit)
      // Preserve timezone when calculating period boundaries
      let baseTime = interval.startTime.clone()
      if (timezone) {
        baseTime = baseTime.tz(timezone)
      }
      const newStartTime = baseTime.startOf(nextUnit)
      const newEndTime = baseTime.endOf(nextUnit)
      showPeriod(newStartTime, newEndTime)
    } else {
      showPeriod(interval.startTime, interval.endTime)
    }
  }

  getIntervalProps = (props: GetIntervalProps = {}): HTMLAttributes<HTMLDivElement> & { key: string } => {
    return {
      ...this.props.getIntervalProps({
        interval: this.props.interval,
        ...props,
      }),
      onClick: composeEvents(this.onIntervalClick, props.onClick),
    }
  }

  render() {
    const { intervalText, interval, intervalRenderer, headerData } = this.props
    const Renderer = intervalRenderer
    if (Renderer) {
      return Renderer({
        getIntervalProps: this.getIntervalProps,
        intervalContext: {
          interval,
          intervalText,
        },
        data: headerData,
      })
    }

    const { key, ...rest } = this.getIntervalProps()
    return (
      <div
        data-testid="dateHeaderInterval"
        {...rest}
        key={key}
        className={`rct-dateHeader ${this.props.primaryHeader ? 'rct-dateHeader-primary' : ''}`}
      >
        <span>{intervalText}</span>
      </div>
    )
  }
}

export default Interval
