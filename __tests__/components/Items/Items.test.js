import React from 'react'
import 'react-testing-library/cleanup-after-each'
import render from '../../test-utility/renderWithTimelineStateAndHelpers'
import Items from 'lib/items/Items'
import { ItemsContextProvider } from 'lib/items/ItemsContext'
import { items } from '../../../__fixtures__/itemsAndGroups'
import { props, state } from '../../../__fixtures__/stateAndProps'
import {
  orderedGroups,
  dimensionItems
} from '../../../__fixtures__/groupOrderAndItemDimentions'
import { noop } from 'test-utility/index'
import { defaultItemRenderer } from 'lib/items/defaultItemRenderer'

describe('Items', () => {
  it('should render', () => {
    const container = document.createElement('div')
    const {} = render(
      <ItemsContextProvider
        items={items}
        dragSnap={props.dragSnap}
        minResizeWidth={props.minResizeWidth}
        selectedItem={null}
        canChangeGroup={false}
        canMove={false}
        canResize={false}
        canSelect={false}
        moveResizeValidator={null}
        itemSelect={noop}
        itemDrag={noop}
        itemDrop={noop}
        itemResizing={noop}
        itemResized={noop}
        onItemDoubleClick={noop}
        onItemContextMenu={noop}
        itemRenderer={defaultItemRenderer}
        selected={null}
        groupDimensions={{itemDimensions:  dimensionItems }}
        useResizeHandle={false}
        scrollRef={container}
        order={orderedGroups['1']}
        onDragStart={noop}
        onDragEnd={noop}
        onResizeStart={noop}
        resizeEdge={undefined}
        dragging={false}
        resizing={undefined}
        dragOffset={0}
        interactingItemId={undefined}
      >
        <Items />
      </ItemsContextProvider>,
      {
        container: document.body.appendChild(container)
      }
    )
  })
})
