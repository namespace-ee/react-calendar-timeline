import { ReactNode } from 'react'
import TimelineMarkersRenderer from 'lib/markers/TimelineMarkersRenderer'
import { TimelineMarkersProvider } from 'lib/markers/TimelineMarkersContext'
import { TimelineStateProvider, type TimelineStartProps } from 'lib/timeline/TimelineStateContext'
import type { SelectUnits } from 'lib/utility/calendar'

const oneDay = 1000 * 60 * 60 * 24

type RenderWrapperProps = {
  children?: ReactNode
  timelineState?: TimelineStartProps
}

export const RenderWrapper = ({ children, timelineState }: RenderWrapperProps) => {
  const now = Date.now()
  const visibleTimeStart = now - oneDay
  const visibleTimeEnd = now + oneDay
  const defaultTimelineState: TimelineStartProps = {
    visibleTimeStart,
    visibleTimeEnd,
    canvasTimeStart: visibleTimeStart - oneDay,
    canvasTimeEnd: visibleTimeEnd + oneDay,
    canvasWidth: 3000,
    showPeriod: () => {},
    timelineWidth: 1000,
    timelineUnit: 'day' as SelectUnits
  }

  const state = timelineState ?? defaultTimelineState

  return (
    <div>
      <TimelineStateProvider {...state}>
        <TimelineMarkersProvider>
          <div>
            {children}
            <TimelineMarkersRenderer />
          </div>
        </TimelineMarkersProvider>
      </TimelineStateProvider>
    </div>
  )
}
