import { calculateXPositionForTime } from 'lib/utility/calendar'
import moment from 'moment'

describe('calculateXPositionForTime', () => {
  const width = 1000
  const startTime = 100000
  const endTime = 200000

  it('returns time in middle of timeline', () => {
    const time = startTime + (endTime - startTime) * 0.5
    const result = calculateXPositionForTime(startTime, endTime, width, time, 0)

    expect(result).toBe(500)
  })

  it('returns time in the first quarter of timeline', () => {
    const time = startTime + (endTime - startTime) * 0.25
    const result = calculateXPositionForTime(startTime, endTime, width, time)

    expect(result).toBe(250)
  })

  it('returns time in the middle of timeline with actual date', () => {
    const today = moment().startOf('day')
    const startTime = today.valueOf()
    const endTime = today
      .clone()
      .add(1, 'day')
      .valueOf()
    const time = startTime + (endTime - startTime) * 0.5
    const result = calculateXPositionForTime(startTime, endTime, width, time)

    expect(result).toBe(500)
  })
})
