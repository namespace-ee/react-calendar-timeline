import { getVisibleItems } from 'lib/utility/calendar'
import type { TimelineItemBase, TimelineKeys } from 'lib/types/main'
import dayjs from 'dayjs'

const itemTimeStartKey = 'start'
const itemTimeEndKey = 'end'

const keys = {
  itemTimeStartKey,
  itemTimeEndKey
} as unknown as TimelineKeys

describe('getVisibleItems', () => {
  it('returns items within date range - both dates', () => {
    const startRange = dayjs()
      .add(-1, 'day')
      .valueOf()
    const endRange = dayjs(startRange).add(1, 'day')
    const items = [
      {
        [itemTimeStartKey]: dayjs(startRange)
          .add(10, 'minute')
          .valueOf(),
        [itemTimeEndKey]: dayjs(startRange)
          .add(20, 'minute')
          .valueOf(),
        id: 1
      }
    ]

    const result = getVisibleItems(items as unknown as TimelineItemBase<number>[], startRange, endRange.valueOf(), keys)

    expect(result).toMatchObject(items)
  })

  it('returns items within date range - start date', () => {
    const startRange = dayjs()
      .add(-1, 'day')
      .valueOf()
    const endRange = dayjs(startRange).add(1, 'day')
    const items = [
      {
        [itemTimeStartKey]: dayjs(endRange)
          .add(-10, 'minute')
          .valueOf(),
        [itemTimeEndKey]: dayjs(endRange)
          .add(20, 'minute')
          .valueOf(),
        id: 1
      }
    ]

    const result = getVisibleItems(items as unknown as TimelineItemBase<number>[], startRange, endRange.valueOf(), keys)

    expect(result).toMatchObject(items)
  })

  it('returns items within date range - end date', () => {
    const startRange = dayjs()
      .add(-1, 'day')
      .valueOf()
    const endRange = dayjs(startRange).add(1, 'day')
    const items = [
      {
        [itemTimeStartKey]: dayjs(startRange)
          .add(-10, 'minute')
          .valueOf(),
        [itemTimeEndKey]: dayjs(startRange)
          .add(10, 'minute')
          .valueOf(),
        id: 1
      }
    ]

    const result = getVisibleItems(items as unknown as TimelineItemBase<number>[], startRange, endRange.valueOf(), keys)

    expect(result).toMatchObject(items)
  })

  it('does not return items outside of date range - before start date', () => {
    const startRange = dayjs()
      .add(-1, 'day')
      .valueOf()
    const endRange = dayjs(startRange).add(1, 'day')
    const items = [
      {
        [itemTimeStartKey]: dayjs(startRange)
          .add(-2, 'day')
          .valueOf(),
        [itemTimeEndKey]: dayjs(startRange)
          .add(-1, 'day')
          .valueOf(),
        id: 1
      }
    ]

    const result = getVisibleItems(items as unknown as TimelineItemBase<number>[], startRange, endRange.valueOf(), keys)

    expect(result).toMatchObject([])
  })

  it('does not return items outside of date range - after end date', () => {
    const startRange = dayjs()
      .add(-1, 'day')
      .valueOf()
    const endRange = dayjs(startRange).add(1, 'day')
    const items = [
      {
        [itemTimeStartKey]: dayjs(endRange)
          .add(1, 'day')
          .valueOf(),
        [itemTimeEndKey]: dayjs(endRange)
          .add(2, 'day')
          .valueOf(),
        id: 1
      }
    ]

    const result = getVisibleItems(items as unknown as TimelineItemBase<number>[], startRange, endRange.valueOf(), keys)

    expect(result).toMatchObject([])
  })
})
