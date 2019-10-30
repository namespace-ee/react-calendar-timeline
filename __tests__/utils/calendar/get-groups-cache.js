import { getGroupsCache } from 'lib/utility/calendar'
import { groups, items } from '../../../__fixtures__/itemsAndGroups'
import { props, state } from '../../../__fixtures__/stateAndProps'

describe('getGroupsCache', () => {
  it('should map of groupId:function', () => {
    const mockMethod = jest.fn()
    const result = getGroupsCache(groups, props.keys, mockMethod)
    const keys = Object.keys(result)
    expect(keys).toHaveLength(groups.length)
    keys.forEach(key => {
      expect(result[key]).toBeInstanceOf(Function)
    })
  })
  it('should cache result when passed same args', () => {
    const mockMethod = jest.fn()
    const oldResult = getGroupsCache(groups, props.keys, mockMethod)
    const newResult = getGroupsCache(groups, props.keys, mockMethod)
    const newKeys = Object.keys(newResult)
    const oldKeys = Object.keys(oldResult)
    expect(oldResult).toBe(newResult)
    expect(oldKeys).toEqual(newKeys)
    newKeys.forEach(key => {
      expect(newResult[key]).toBe(oldResult[key])
    })
  })
  it('should cache result of methods map', () => {
    const mockMethod = jest.fn()
    const groupWithItems = {
      items
    }
    const args = [
      groupWithItems,
      props.keys,
      state.canvasTimeStart,
      state.canvasTimeEnd,
      state.width * 3,
      props.lineHeight,
      props.itemHeightRatio,
      props.stackItems
    ]
    const result = getGroupsCache(groups, props.keys, mockMethod)
    const keys = Object.keys(result)
    keys.forEach(key => {
      const method = result[key]
      method(...args)
      method(...args)
      expect(mockMethod).toHaveBeenCalledTimes(1)
      //reset after checking each method before trying the next one in the groupid:method dictionary
      mockMethod.mockClear();
    })
  })
  it('should call method again if arg is different', () => {
    const mockMethod = jest.fn()
    const groupWithItems = {
      items
    }
    const args = [
      groupWithItems,
      props.keys,
      state.canvasTimeStart,
      state.canvasTimeEnd,
      state.width * 3,
      props.lineHeight,
      props.itemHeightRatio,
      props.stackItems
    ]
    const newArgs = [
      groupWithItems,
      props.keys,
      state.canvasTimeStart + 1,
      state.canvasTimeEnd,
      state.width * 3,
      props.lineHeight,
      props.itemHeightRatio,
      props.stackItems
    ]
    const result = getGroupsCache(groups, props.keys, mockMethod)
    const keys = Object.keys(result)
    keys.forEach(key => {
      const method = result[key]
      method(...args)
      method(...newArgs)
      expect(mockMethod).toHaveBeenCalledTimes(2)
      //reset after checking each method before trying the next one in the groupid:method dictionary
      mockMethod.mockClear();
    })
  })
})
