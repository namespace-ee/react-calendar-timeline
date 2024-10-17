import React, { PropsWithChildren, useContext } from 'react'

import { calculateXPositionForTime, calculateTimeForXPosition, SelectUnits } from '../utility/calendar'
import { TimelineContext as TimelineContextValue } from '../types/main'
import { Dayjs } from 'dayjs'

/* this context will hold all information regarding timeline state:
  1. timeline width
  2. visible time start and end
  3. canvas time start and end
  4. helpers for calculating left offset of items (and really...anything)
*/

/* eslint-disable no-console */
const defaultContextState: TimelineContextType = {
  getTimelineState: () => {
    console.warn('"getTimelineState" default func is being used')
    return {} as TimelineContextValue
  },
  getLeftOffsetFromDate: () => {
    console.warn('"getLeftOffsetFromDate" default func is being used')
    return 0
  },
  getDateFromLeftOffsetPosition: () => {
    console.warn('"getDateFromLeftOffsetPosition" default func is being used')
    return 0
  },
  showPeriod: () => {
    console.warn('"showPeriod" default func is being used')
  },
}
/* eslint-enable */

export const TimelineContext = React.createContext<TimelineContextType>(defaultContextState)
const { Consumer, Provider } = TimelineContext

type TimelineStartProps = {
  visibleTimeStart: number
  visibleTimeEnd: number
  canvasTimeStart: number
  canvasTimeEnd: number
  canvasWidth: number
  showPeriod: (from: Dayjs, to: Dayjs) => void
  timelineUnit: SelectUnits
  timelineWidth: number
}
export type TimelineContextType = {
  getTimelineState: () => TimelineContextValue
  getLeftOffsetFromDate: (date: number) => number
  getDateFromLeftOffsetPosition: (leftOffset: number) => number
  showPeriod: (from: Dayjs, to: Dayjs) => void
}

type TimelineState = {
  timelineContext: TimelineContextType
}

export class TimelineStateProvider extends React.Component<PropsWithChildren<TimelineStartProps>, TimelineState> {
  constructor(props: PropsWithChildren<TimelineStartProps>) {
    super(props)

    this.state = {
      timelineContext: {
        getTimelineState: this.getTimelineState,
        getLeftOffsetFromDate: this.getLeftOffsetFromDate,
        getDateFromLeftOffsetPosition: this.getDateFromLeftOffsetPosition,
        showPeriod: this.props.showPeriod,
      },
    }
  }

  getTimelineState = () => {
    const {
      visibleTimeStart,
      visibleTimeEnd,
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      timelineUnit,
      timelineWidth,
    } = this.props
    return {
      visibleTimeStart,
      visibleTimeEnd,
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      timelineUnit,
      timelineWidth,
    } as TimelineContextValue // REVIEW,
  }

  getLeftOffsetFromDate = (date: number): number => {
    const { canvasTimeStart, canvasTimeEnd, canvasWidth } = this.props
    return calculateXPositionForTime(canvasTimeStart, canvasTimeEnd, canvasWidth, date)
  }

  getDateFromLeftOffsetPosition = (leftOffset: number) => {
    const { canvasTimeStart, canvasTimeEnd, canvasWidth } = this.props
    return calculateTimeForXPosition(canvasTimeStart, canvasTimeEnd, canvasWidth, leftOffset)
  }

  render() {
    return <Provider value={this.state.timelineContext}>{this.props.children}</Provider>
  }
}

export const TimelineStateConsumer = Consumer
export const useTimelineState = () => useContext(TimelineContext)
