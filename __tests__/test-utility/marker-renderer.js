import React from 'react'
import TimelineMarkersRenderer from 'lib/markers/TimelineMarkersRenderer'
import { TimelineMarkersProvider } from 'lib/markers/TimelineMarkersContext'
import { TimelineStateProvider } from 'lib/timeline/TimelineStateContext'
import { defaultKeys } from '../../src/lib/default-config'
const oneDay = 1000 * 60 * 60 * 24

// eslint-disable-next-line
export const RenderWrapper = ({ children, timelineState }) => {
  const now = Date.now()
  const visibleTimeStart = now - oneDay
  const visibleTimeEnd = now + oneDay
  const defaultTimelineState = {
    visibleTimeStart,
    visibleTimeEnd,
    canvasTimeStart: visibleTimeStart - oneDay,
    canvasTimeEnd: visibleTimeEnd + oneDay,
    canvasWidth: 3000,
    visibleWidth: 1000,
    showPeriod:()=>{},
    timelineWidth:1000,
    timelineUnit:'day',
    keys: defaultKeys,
  }

  timelineState = timelineState != null ? timelineState : defaultTimelineState

  return (
    <div>
      <TimelineStateProvider {...timelineState}>
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
