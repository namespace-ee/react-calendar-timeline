import {
  getGroupsWithItemDimensions,
  getOrderedGroupsWithItems
} from 'lib/utility/calendar'
import { groups, items } from '../../../__fixtures__/itemsAndGroups'
import { props, state } from '../../../__fixtures__/stateAndProps'

describe('getGroupsWithItemDimensions', () => {
  it('should work as expected', () => {
    const groupsWithItems = getOrderedGroupsWithItems(groups, items, props.keys)
    const result = getGroupsWithItemDimensions(
      groupsWithItems,
      props.keys,
      props.lineHeight,
      props.itemHeightRatio,
      props.stackItems,
      state.canvasTimeStart,
      state.canvasTimeEnd,
      state.width * 3,
      groups
    )
    expect(Object.keys(result)).toHaveLength(groups.length)
    expect(result).toMatchSnapshot()
  })
  it('should cache groups if no params changed', () => {
    const groupsWithItems = getOrderedGroupsWithItems(groups, items, props.keys)
    const args = [
      groupsWithItems,
      props.keys,
      props.lineHeight,
      props.itemHeightRatio,
      props.stackItems,
      state.canvasTimeStart,
      state.canvasTimeEnd,
      state.width * 3,
      groups
    ]
    const oldResult = getGroupsWithItemDimensions(...args)
    const newResult = getGroupsWithItemDimensions(...args)
    const keys = Object.keys(oldResult)
    keys.forEach(key => {
      expect(oldResult[key]).toBe(newResult[key])
    })
  })
})
