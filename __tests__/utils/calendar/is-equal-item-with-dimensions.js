import { isEqualItemWithDimensions } from 'lib/utility/calendar'
import { items } from '../../../__fixtures__/itemsAndGroups'
import { props, state } from '../../../__fixtures__/stateAndProps'

describe('isEqualItemWithDimensions', () => {
  it('should return true when same old and new args', () => {
    const groupWithItems = {
      items
    }
    const newArgs = [
      groupWithItems,
      props.keys,
      state.canvasTimeStart,
      state.canvasTimeEnd,
      state.width * 3,
      props.lineHeight,
      props.itemHeightRatio,
      props.stackItems
    ]
    const oldArgs = [
      groupWithItems,
      props.keys,
      state.canvasTimeStart,
      state.canvasTimeEnd,
      state.width * 3,
      props.lineHeight,
      props.itemHeightRatio,
      props.stackItems
    ]
    expect(isEqualItemWithDimensions(newArgs, oldArgs)).toBeTruthy()
  })
  it('should return false when changing something other than groupWithItems', () => {
    const groupWithItems = {
      items
    }
    const newArgsChangeCanvasStart = [
      groupWithItems,
      props.keys,
      state.canvasTimeStart + 1,
      state.canvasTimeEnd,
      state.width * 3,
      props.lineHeight,
      props.itemHeightRatio,
      props.stackItems
    ]
    const newArgsChangeCanvasEnd = [
      groupWithItems,
      props.keys,
      state.canvasTimeStart,
      state.canvasTimeEnd + 1,
      state.width * 3,
      props.lineHeight,
      props.itemHeightRatio,
      props.stackItems
    ]
    const newArgsChangeStackItems = [
      groupWithItems,
      props.keys,
      state.canvasTimeStart,
      state.canvasTimeEnd + 1,
      state.width * 3,
      props.lineHeight,
      props.itemHeightRatio,
      !props.stackItems
    ]
    const oldArgs = [
      groupWithItems,
      props.keys,
      state.canvasTimeStart,
      state.canvasTimeEnd,
      state.width * 3,
      props.lineHeight,
      props.itemHeightRatio,
      props.stackItems
    ]
    expect(
      isEqualItemWithDimensions(newArgsChangeCanvasStart, oldArgs)
    ).toBeFalsy()
    expect(
      isEqualItemWithDimensions(newArgsChangeCanvasEnd, oldArgs)
    ).toBeFalsy()
    expect(
      isEqualItemWithDimensions(newArgsChangeStackItems, oldArgs)
    ).toBeFalsy()
  })
  it('should return false when groupWithItems is different', () => {
    const groupWithItems = {
      items
    }
    const otherGroupWithItems = { items: [items[1]] }
    const newArgs = [
      otherGroupWithItems,
      props.keys,
      state.canvasTimeStart,
      state.canvasTimeEnd,
      state.width * 3,
      props.lineHeight,
      props.itemHeightRatio,
      props.stackItems
    ]
    const oldArgs = [
      groupWithItems,
      props.keys,
      state.canvasTimeStart,
      state.canvasTimeEnd,
      state.width * 3,
      props.lineHeight,
      props.itemHeightRatio,
      props.stackItems
    ]
    expect(isEqualItemWithDimensions(newArgs, oldArgs)).toBeFalsy()
  })
})
