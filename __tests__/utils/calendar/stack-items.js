import { stackTimelineItems } from 'lib/utility/calendar'
import { items, groups } from '../../../__fixtures__/itemsAndGroups'
import {
  props,
  state,
  stateMoveItem,
  stateResizeItemLeft,
  stateResizeItemRight,
  propsNoStack,
} from '../../../__fixtures__/stateAndProps'
describe('stackItems', () => {
  it('work as expected', () => {
    expect(
      stackTimelineItems(
        items,
        groups,
        9000,
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
        state.newGroupOrder
      )
    ).toMatchSnapshot()
  })
  it('work as expected no stack', () => {
    expect(
      stackTimelineItems(
        items,
        groups,
        9000,
        state.canvasTimeStart,
        state.canvasTimeEnd,
        propsNoStack.keys,
        propsNoStack.lineHeight,
        propsNoStack.itemHeightRatio,
        propsNoStack.stackItems,
        state.draggingItem,
        state.resizingItem,
        state.dragTime,
        state.resizingEdge,
        state.resizeTime,
        state.newGroupOrder
      )
    ).toMatchSnapshot()
  })
  it('should stack items while moving an item', () => {
    expect(
      stackTimelineItems(
        items,
        groups,
        9000,
        stateMoveItem.canvasTimeStart,
        stateMoveItem.canvasTimeEnd,
        props.keys,
        props.lineHeight,
        props.itemHeightRatio,
        props.stackItems,
        stateMoveItem.draggingItem,
        stateMoveItem.resizingItem,
        stateMoveItem.dragTime,
        stateMoveItem.resizingEdge,
        stateMoveItem.resizeTime,
        stateMoveItem.newGroupOrder
      )
    ).toMatchSnapshot()
  })
  it('should stack items while resize item left', () => {
    expect(
      stackTimelineItems(
        items,
        groups,
        9000,
        stateResizeItemLeft.canvasTimeStart,
        stateResizeItemLeft.canvasTimeEnd,
        props.keys,
        props.lineHeight,
        props.itemHeightRatio,
        props.stackItems,
        stateResizeItemLeft.draggingItem,
        stateResizeItemLeft.resizingItem,
        stateResizeItemLeft.dragTime,
        stateResizeItemLeft.resizingEdge,
        stateResizeItemLeft.resizeTime,
        stateResizeItemLeft.newGroupOrder
      )
    ).toMatchSnapshot()
  })
  it('should stack items while resize item right', () => {
    expect(
      stackTimelineItems(
        items,
        groups,
        9000,
        stateResizeItemRight.canvasTimeStart,
        stateResizeItemRight.canvasTimeEnd,
        props.keys,
        props.lineHeight,
        props.itemHeightRatio,
        props.stackItems,
        stateResizeItemRight.draggingItem,
        stateResizeItemRight.resizingItem,
        stateResizeItemRight.dragTime,
        stateResizeItemRight.resizingEdge,
        stateResizeItemRight.resizeTime,
        stateResizeItemRight.newGroupOrder
      )
    ).toMatchSnapshot()
  })
  it('should return empty dimensions if groups are empty', () => {
    expect(
      stackTimelineItems(
        items,
        [],
        9000,
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
        state.newGroupOrder
      )
    ).toMatchObject({
      dimensionItems: [],
      height: 0,
      groupHeights: [],
      groupTops: []
    })
  })
})
