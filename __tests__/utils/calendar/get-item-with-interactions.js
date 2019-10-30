import { getItemWithInteractions } from 'lib/utility/calendar'
import { items, groups } from '../../../__fixtures__/itemsAndGroups'
import { defaultKeys } from 'lib/default-config'

describe('getItemWithInteractions', () => {
  it('should return the same item if no interaction occurred', () => {
    const item = items[0]
    expect(
      getItemWithInteractions({
        item,
        keys: defaultKeys,
        draggingItem: undefined,
        resizingItem: undefined,
        dragTime: false,
        resizingEdge: false,
        resizeTime: false,
        newGroupId: '1'
      })
    ).toBe(item)
  })
  it('should return the same item if draggingItem and resizingItem is not for the same item', () => {
    const item = items[0]
    expect(
      getItemWithInteractions({
        item,
        keys: defaultKeys,
        draggingItem: 'some id',
        resizingItem: 'some id',
        dragTime: false,
        resizingEdge: false,
        resizeTime: false,
        newGroupId: '1'
      })
    ).toBe(item)
  })
  it('should return new item with new start and end time if dragged with no changed group', () => {
    const item = items[0]
    //moved 1 hour
    const dragOffset = 60 * 60 * 1000
    expect(
      getItemWithInteractions({
        item,
        keys: defaultKeys,
        draggingItem: item.id,
        resizingItem: undefined,
        dragTime: item.start_time + dragOffset,
        resizingEdge: false,
        resizeTime: false,
        newGroupId: '1'
      })
    ).toMatchObject({
      ...item,
      start_time: item.start_time + dragOffset,
      end_time: item.end_time + dragOffset,
      group: item.group
    })
  })
  it('should return new item with new start and end time if dragged with changed group', () => {
    const item = items[0]
    //moved 1 hour
    const dragOffset = 60 * 60 * 1000
    expect(
      getItemWithInteractions({
        item,
        keys: defaultKeys,
        draggingItem: item.id,
        resizingItem: undefined,
        dragTime: item.start_time + dragOffset,
        resizingEdge: false,
        resizeTime: false,
        newGroupId: groups[1].id,
      })
    ).toMatchObject({
      ...item,
      start_time: item.start_time + dragOffset,
      end_time: item.end_time + dragOffset,
      group: groups[1].id
    })
  })
  it('should return new item with new start time if resized left', () => {
    const item = items[0]
    //moved 1 hour
    const dragOffset = 60 * 60 * 1000
    expect(
      getItemWithInteractions({
        item,
        keys: defaultKeys,
        draggingItem: undefined,
        resizingItem: item.id,
        dragTime: undefined,
        resizingEdge: 'left',
        resizeTime: item.start_time + dragOffset,
        newGroupId: 0
      })
    ).toMatchObject({
      ...item,
      start_time: item.start_time + dragOffset,
    })
  })
  it('should return new item with end start time if resized right', () => {
    const item = items[0]
    //moved 1 hour
    const dragOffset = 60 * 60 * 1000
    expect(
      getItemWithInteractions({
        item,
        keys: defaultKeys,
        draggingItem: undefined,
        resizingItem: item.id,
        dragTime: undefined,
        resizingEdge: 'right',
        resizeTime: item.end_time + dragOffset,
        newGroupId: 0
      })
    ).toMatchObject({
      ...item,
      end_time: item.end_time + dragOffset,
    })
  })
})
