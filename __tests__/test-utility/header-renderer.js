import React from 'react'
import TimelineMarkersRenderer from 'lib/markers/TimelineMarkersRenderer'
import { TimelineMarkersProvider } from 'lib/markers/TimelineMarkersContext'
import { TimelineStateProvider } from 'lib/timeline/TimelineStateContext'
import { state } from '../../__fixtures__/stateAndProps'
import jest from 'jest'
import { defaultTimeSteps, defaultKeys } from '../../src/lib/default-config'
import { TimelineHeadersProvider } from '../../src/lib/headers/HeadersContext'

// eslint-disable-next-line
export const RenderHeadersWrapper = ({
  children,
  timelineState = {},
  headersState = {},
  showPeriod = () => {},
  registerScroll = () => {}
}) => {
  const defaultTimelineState = {
    visibleTimeStart: state.visibleTimeStart,
    visibleTimeEnd: state.visibleTimeEnd,
    canvasTimeStart: state.canvasTimeStart,
    canvasTimeEnd: state.canvasTimeEnd,
    canvasWidth: 2000,
    showPeriod: showPeriod,
    timelineUnit: 'day',
    timelineWidth: 1000,
    keys: defaultKeys
  }

  const timelineStateProps = {
    ...defaultTimelineState,
    ...timelineState
  }

  const headersStateProps = {
    registerScroll: registerScroll,
    timeSteps: defaultTimeSteps,
    leftSidebarWidth: 150,
    rightSidebarWidth: 0,
    ...headersState
  }

  return (
    <div>
      <TimelineStateProvider {...timelineStateProps}>
        <div>
          <TimelineHeadersProvider {...headersStateProps}>
            {children}
          </TimelineHeadersProvider>
        </div>
      </TimelineStateProvider>
    </div>
  )
}
