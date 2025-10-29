import React, { HTMLAttributes, ReactNode } from 'react'
import { getNextUnit, SelectUnits, getPrevFactor, isCustomUnit } from '../utility/calendar'
import { composeEvents } from '../utility/events'
import { IntervalRenderer, Interval as IntervalType, GetIntervalProps, CustomUnit } from '../types/main'
import { GetIntervalPropsType } from './types'
import { UnitType } from 'dayjs'

export type IntervalProps<Data> = {
  intervalRenderer: (p: IntervalRenderer<Data>) => ReactNode
  unit: SelectUnits
  interval: IntervalType
  showPeriod: (startTime: number, endTime: number) => void
  intervalText: string
  primaryHeader: boolean
  getIntervalProps: GetIntervalPropsType

  headerData?: Data
}

class Interval<Data> extends React.PureComponent<IntervalProps<Data>> {
  onIntervalClick = () => {
    const { primaryHeader, interval, unit, showPeriod } = this.props
    if (primaryHeader) {
      if (isCustomUnit(unit)) {
        const nextUnit = getNextUnit(unit) as CustomUnit
        const startTimeValue = interval.startTime.valueOf()
        const blockSize = getPrevFactor(nextUnit)
        const newStartTimeValue = Math.floor(startTimeValue / blockSize) * blockSize
        const newEndTimeValue = Math.floor(startTimeValue / blockSize) * blockSize + blockSize - 1
        showPeriod(newStartTimeValue, newEndTimeValue)
      } else {
        const nextUnit = getNextUnit(unit) as UnitType
        const newStartTime = interval.startTime.clone().startOf(nextUnit)
        const newEndTime = interval.startTime.clone().endOf(nextUnit)
        showPeriod(newStartTime.valueOf(), newEndTime.valueOf())
      }
    } else {
      showPeriod(interval.startTime.valueOf(), interval.endTime.valueOf())
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
