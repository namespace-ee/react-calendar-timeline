import React from 'react'
import 'react-testing-library/cleanup-after-each'
import render from 'test-utility/renderWithTimelineStateAndHelpers'
import Rows from 'lib/rows/Rows'
import { props, state } from '../../../__fixtures__/stateAndProps'
import { items, groups } from '../../../__fixtures__/itemsAndGroups'
import { defaultItemRenderer } from 'lib/items/defaultItemRenderer'
import { noop } from 'test-utility/index'
import { stackTimelineItems } from 'lib/utility/calendar'

describe('Rows', () => {
  it('should render', () => {
    const container = document.createElement('div')
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
    const {} = render(
      <Rows
        {...props}
        items={itemsWithInteractions}
        groups={groups}
        groupsWithItemsDimensions={groupsWithItemsDimensions}
        groupTops={groupTops}
        groupHeights={groupHeights}
        itemRenderer={defaultItemRenderer}
        itemResized={noop}
        itemResizing={noop}
        itemSelect={noop}
        itemDrag={noop}
        itemDrop={noop}
        onItemDoubleClick={noop}
        onItemContextMenu={noop}
        onRowClick={noop}
        onRowDoubleClick={noop}
        onRowContextClick={noop}
        scrollRef={container}
      />,
      {
        container: document.body.appendChild(container)
      }
    )
  })
})
