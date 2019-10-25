import React from 'react'
import { TimelineStateProvider } from 'lib/timeline/TimelineStateContext'
import { state } from '../../__fixtures__/stateAndProps'
import { groups } from '../../__fixtures__/itemsAndGroups'
import { defaultTimeSteps, defaultKeys } from '../../src/lib/default-config'
import { GroupRowContextProvider } from '../../src/lib/rows/GroupRowContext'

// eslint-disable-next-line
export const RenderGroupRowWrapper = ({
  children,
  timelineState = {},
  groupRowState = {},
}) => {
  const defaultTimelineState = {
    visibleTimeStart: state.visibleTimeStart,
    visibleTimeEnd: state.visibleTimeEnd,
    canvasTimeStart: state.canvasTimeStart,
    canvasTimeEnd: state.canvasTimeEnd,
    canvasWidth: 2000,
    showPeriod: ()=>{},
    timelineUnit: 'day',
    timelineWidth: 1000,
    keys: defaultKeys
  }

  const timelineStateProps = {
    ...defaultTimelineState,
    ...timelineState
  }
  
  const groupRowStateProps = {
    clickTolerance: 20,
    onContextMenu: () => {},
    onClick: () => {},
    onDoubleClick: ()=>{},
    isEvenRow: true,
    group: groups[1],
    horizontalLineClassNamesForGroup: undefined,
    groupHeight: 60,
    groupIndex: 3,
    ...groupRowState
  }

  return (
      <TimelineStateProvider {...timelineStateProps}>
          <GroupRowContextProvider {...groupRowStateProps}>
            {children}
          </GroupRowContextProvider>
      </TimelineStateProvider>
  )
}
