import React from 'react';
import { render } from 'react-testing-library'
import { items, groups } from '../../__fixtures__/itemsAndGroups'
import { props, state } from '../../__fixtures__/stateAndProps'
import { HelpersContextProvider } from '../../src/lib/timeline/HelpersContext'
import {
  TimelineStateProvider,
  TimelineStateConsumer
} from '../../src/lib/timeline/TimelineStateContext'
import { stackTimelineItems } from 'lib/utility/calendar'

function renderWithTimelineStateAndHelpers(
  ui,
  { providersPropsOverride, ...options } = { providersPropsOverride: {} }
) {
  const canvasWidth = state.width * 3
  const {
    groupsWithItemsDimensions,
    groupHeights,
    groupTops,
    itemsWithInteractions
  } = stackTimelineItems(
    items,
    groups,
    canvasWidth,
    state.canvasTimeStart,
    state.canvasTimeEnd,
    props.keys,
    props.lineHeight,
    props.itemHeightRatio,
    props.stackItems,
    state.draggingItem,
    state.resizingItem,
    state.dragTime,
    state.resizingEdge,
    state.resizeTime,
    state.newGroupId
  )
  const providersProps = {
    visibleTimeStart: state.visibleTimeStart,
    visibleTimeEnd: state.visibleTimeEnd,
    canvasTimeStart: state.canvasTimeStart,
    canvasTimeEnd: state.canvasTimeEnd,
    canvasWidth: canvasWidth,
    showPeriod: ()=>{},
    timelineUnit: 'day',
    timelineWidth: state.width,
    keys: props.keys,
    groupsWithItemsDimensions,
    groupHeights,
    groupTops,
    itemsWithInteractions,
    ...providersPropsOverride
  }
  function Wrapper(props) {
    return (
      <TimelineStateProvider
        visibleTimeStart={providersProps.visibleTimeStart}
        visibleTimeEnd={providersProps.visibleTimeEnd}
        canvasTimeStart={providersProps.canvasTimeStart}
        canvasTimeEnd={providersProps.canvasTimeEnd}
        canvasWidth={providersProps.canvasWidth}
        showPeriod={providersProps.showPeriod}
        timelineUnit={providersProps.timelineUnit}
        timelineWidth={providersProps.timelineWidth}
        keys={providersProps.keys}
      >
        <TimelineStateConsumer>
          {({ getLeftOffsetFromDate, getDateFromLeftOffsetPosition }) => (
            <HelpersContextProvider
              getLeftOffsetFromDate={getLeftOffsetFromDate}
              getDateFromLeftOffsetPosition={getDateFromLeftOffsetPosition}
              groupsWithItemsDimensions={
                providersProps.groupsWithItemsDimensions
              }
              items={providersProps.itemsWithInteractions}
              keys={providersProps.keys}
              groupHeights={providersProps.groupHeights}
              groupTops={providersProps.groupTops}
            >
              {props.children}
            </HelpersContextProvider>
          )}
        </TimelineStateConsumer>
      </TimelineStateProvider>
    )
  }
  return render(ui, { wrapper: Wrapper, ...options })
}

export default renderWithTimelineStateAndHelpers
