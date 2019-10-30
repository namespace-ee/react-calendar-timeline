import React from 'react'
import 'react-testing-library/cleanup-after-each'
import render from '../../test-utility/renderWithTimelineStateAndHelpers'
import Item from 'lib/items/Item'
import { items } from '../../../__fixtures__/itemsAndGroups'
import { props, state } from '../../../__fixtures__/stateAndProps'
import { orderedGroups } from '../../../__fixtures__/groupOrderAndItemDimentions'
import { noop } from 'test-utility/index'
import { defaultItemRenderer } from 'lib/items/defaultItemRenderer'

describe('Item', () => {
  it('should render', () => {
    const container = document.createElement('div')
    const { } = render(
      <Item
        item={items[0]}
        keys={props.keys}
        order={orderedGroups['1']}
        dimensions={{
          left: 0,
          width: 100,
          collisionLeft: 1572370000000,
          collisionWidth: 11155131,
          top: 3.75,
          stack: true,
          height: 22.5
        }}
        selected={false}
        canChangeGroup={false}
        canMove={false}
        canResizeLeft={false}
        canResizeRight={false}
        canSelect={false}
        useResizeHandle={false}
        canvasTimeStart={state.canvasTimeStart}
        canvasTimeEnd={state.canvasTimeEnd}
        canvasWidth={state.width}
        dragSnap={props.dragSnap}
        minResizeWidth={props.minResizeWidth}
        onResizing={noop}
        onResized={noop}
        moveResizeValidator={null}
        onDrag={noop}
        onDrop={noop}
        onItemDoubleClick={noop}
        onContextMenu={noop}
        onSelect={noop}
        itemRenderer={defaultItemRenderer}
        scrollRef={container}
        dragging={false}
        resizing={false}
        dragOffset={0}
        resizeEdge={undefined}
        onDragStart={noop}
        onDragEnd={noop}
        onResizeStart={noop}
        visibleTimeEnd={state.visibleTimeEnd}
        visibleTimeStart={state.visibleTimeStart}
        timelineWidth={state.width}
      />,
      {
        container: document.body.appendChild(container)
      }
    )
  })
})
