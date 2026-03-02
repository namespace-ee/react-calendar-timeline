import { calculateXPositionForTime } from 'lib/utility/calendar'
import dayjs from 'dayjs'

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
    const today = dayjs().startOf('day')
    const startTime = today.valueOf()
    const endTime = today
      .add(1, 'day')
      .valueOf()
    const time = startTime + (endTime - startTime) * 0.5
    const result = calculateXPositionForTime(startTime, endTime, width, time)

    expect(result).toBe(500)
  })
})
