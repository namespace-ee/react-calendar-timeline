import React, { HTMLAttributes, ReactNode } from 'react'
import { getNextUnit, SelectUnits } from '../utility/calendar'
import { composeEvents } from '../utility/events'
import { Dayjs } from 'dayjs'
import {
  IntervalRenderer,
  Interval as IntervalType,
  GetIntervalProps,
} from '../types/main'

type GetIntervalPropsParams = {
  interval: IntervalType
} & HTMLAttributes<HTMLDivElement>

export type IntervalProps<Data> = {
  intervalRenderer: (p: IntervalRenderer<Data>) => ReactNode
  unit: SelectUnits
  interval: IntervalType
  showPeriod: (startTime: Dayjs, endTime: Dayjs) => void
  intervalText: string
  primaryHeader: boolean
  getIntervalProps: (
    props?: GetIntervalPropsParams,
  ) => HTMLAttributes<HTMLDivElement>

  headerData?: Data
}

class Interval<Data> extends React.PureComponent<IntervalProps<Data>> {
  onIntervalClick = () => {
    const { primaryHeader, interval, unit, showPeriod } = this.props
    if (primaryHeader) {
      const nextUnit = getNextUnit(unit)
      const newStartTime = interval.startTime.clone().startOf(nextUnit)
      const newEndTime = interval.startTime.clone().endOf(nextUnit)
      showPeriod(newStartTime, newEndTime)
    } else {
      showPeriod(interval.startTime, interval.endTime)
    }
  }

  getIntervalProps = (
    props: GetIntervalProps = {},
  ): HTMLAttributes<HTMLDivElement> => {
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
      return (
        <Renderer
          getIntervalProps={this.getIntervalProps}
          intervalContext={{
            interval,
            intervalText,
          }}
          data={headerData}
        />
      )
    }

    return (
      <div
        data-testid="dateHeaderInterval"
        {...this.getIntervalProps({})}
        className={`rct-dateHeader ${
          this.props.primaryHeader ? 'rct-dateHeader-primary' : ''
        }`}
      >
        <span>{intervalText}</span>
      </div>
    )
  }
}

export default Interval
