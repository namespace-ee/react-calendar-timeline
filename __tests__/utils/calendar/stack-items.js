import { stackItems } from 'lib/utility/calendar'
import { items, groups } from '../../../__fixtures__/itemsAndGroups'
import {
  props,
  state,
  stateMoveItem,
  stateResizeItemLeft,
  stateResizeItemRight,
} from '../../../__fixtures__/stateAndProps'
describe('stackItems', () => {
  it('work as expected', () => {
    expect(
      stackItems(
        items,
        groups,
        state.canvasTimeStart,
        state.visibleTimeStart,
        state.visibleTimeEnd,
        3000,
        props,
        state
      )
    ).toMatchSnapshot()
  })
  it('should stack items while moving an item', () => {
    expect(
      stackItems(
        items,
        groups,
        state.canvasTimeStart,
        stateMoveItem.visibleTimeStart,
        stateMoveItem.visibleTimeEnd,
        3000,
        props,
        stateMoveItem
      )
    ).toMatchSnapshot()
  })
  it('should stack items while resize item left', () => {
    expect(
        stackItems(
          items,
          groups,
          state.canvasTimeStart,
          stateMoveItem.visibleTimeStart,
          stateMoveItem.visibleTimeEnd,
          3000,
          props,
          stateResizeItemLeft
        )
      ).toMatchSnapshot()
  })
  it('should stack items while resize item right', () => {
    expect(
        stackItems(
          items,
          groups,
          state.canvasTimeStart,
          stateMoveItem.visibleTimeStart,
          stateMoveItem.visibleTimeEnd,
          3000,
          props,
          stateResizeItemRight
        )
      ).toMatchSnapshot()
  })
})
