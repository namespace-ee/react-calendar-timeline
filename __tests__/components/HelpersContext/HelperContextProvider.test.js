import React from 'react'
import { render } from 'react-testing-library'
import renderWithTimelineStateAndHelpers from '../../test-utility/renderWithTimelineStateAndHelpers'
import 'react-testing-library/cleanup-after-each'
import { stackTimelineItems } from 'lib/utility/calendar'
import {
  HelpersContextProvider,
  HelpersConsumer
} from '../../../src/lib/timeline/HelpersContext'
import {
  TimelineStateProvider,
  TimelineStateConsumer
} from '../../../src/lib/timeline/TimelineStateContext'
import { items, groups } from '../../../__fixtures__/itemsAndGroups'
import { props, state } from '../../../__fixtures__/stateAndProps'
import { defaultKeys } from '../../../src/lib/default-config'

describe('HelperContext', () => {
  it('should work correctly', () => {
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
    const defaultTimelineState = {
      visibleTimeStart: state.visibleTimeStart,
      visibleTimeEnd: state.visibleTimeEnd,
      canvasTimeStart: state.canvasTimeStart,
      canvasTimeEnd: state.canvasTimeEnd,
      canvasWidth: canvasWidth,
      showPeriod: jest.fn(),
      timelineUnit: 'day',
      timelineWidth: state.width,
      keys: defaultKeys
    }
    renderWithTimelineStateAndHelpers(
      <HelpersConsumer>
        {props => {
          expect(props).toEqual(
            expect.objectContaining({
              getDateFromLeftOffsetPosition: expect.any(Function),
              getLeftOffsetFromDate: expect.any(Function),
              getItemDimensions: expect.any(Function),
              getItemAbsoluteDimensions: expect.any(Function),
              getGroupDimensions: expect.any(Function)
            })
          )
          return <div />
        }}
      </HelpersConsumer>
    )
  })
})
