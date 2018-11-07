import { getVisibleItems } from 'lib/utility/calendar'
import moment from 'moment'

const itemTimeStartKey = 'start'
const itemTimeEndKey = 'end'

const keys = {
  itemTimeStartKey,
  itemTimeEndKey
}

describe('getVisibleItems', () => {
  it('returns items within date range - both dates', () => {
    const startRange = moment()
      .add(-1, 'day')
      .valueOf()
    const endRange = moment(startRange).add(1, 'day')
    const items = [
      {
        [itemTimeStartKey]: moment(startRange)
          .add(10, 'minute')
          .valueOf(),
        [itemTimeEndKey]: moment(startRange)
          .add(20, 'minute')
          .valueOf(),
        id: 1
      }
    ]

    const result = getVisibleItems(items, startRange, endRange, keys)

    expect(result).toMatchObject(items)
  })

  it('returns items within date range - start date', () => {
    const startRange = moment()
      .add(-1, 'day')
      .valueOf()
    const endRange = moment(startRange).add(1, 'day')
    const items = [
      {
        [itemTimeStartKey]: moment(endRange)
          .add(-10, 'minute')
          .valueOf(),
        [itemTimeEndKey]: moment(endRange)
          .add(20, 'minute')
          .valueOf(),
        id: 1
      }
    ]

    const result = getVisibleItems(items, startRange, endRange, keys)

    expect(result).toMatchObject(items)
  })

  it('returns items within date range - end date', () => {
    const startRange = moment()
      .add(-1, 'day')
      .valueOf()
    const endRange = moment(startRange).add(1, 'day')
    const items = [
      {
        [itemTimeStartKey]: moment(startRange)
          .add(-10, 'minute')
          .valueOf(),
        [itemTimeEndKey]: moment(startRange)
          .add(10, 'minute')
          .valueOf(),
        id: 1
      }
    ]

    const result = getVisibleItems(items, startRange, endRange, keys)

    expect(result).toMatchObject(items)
  })

  it('does not return items outside of date range - before start date', () => {
    const startRange = moment()
      .add(-1, 'day')
      .valueOf()
    const endRange = moment(startRange).add(1, 'day')
    const items = [
      {
        [itemTimeStartKey]: moment(startRange)
          .add(-2, 'day')
          .valueOf(),
        [itemTimeEndKey]: moment(startRange)
          .add(-1, 'day')
          .valueOf(),
        id: 1
      }
    ]

    const result = getVisibleItems(items, startRange, endRange, keys)

    expect(result).toMatchObject([])
  })

  it('does not return items outside of date range - after end date', () => {
    const startRange = moment()
      .add(-1, 'day')
      .valueOf()
    const endRange = moment(startRange).add(1, 'day')
    const items = [
      {
        [itemTimeStartKey]: moment(endRange)
          .add(1, 'day')
          .valueOf(),
        [itemTimeEndKey]: moment(endRange)
          .add(2, 'day')
          .valueOf(),
        id: 1
      }
    ]

    const result = getVisibleItems(items, startRange, endRange, keys)

    expect(result).toMatchObject([])
  })
})
