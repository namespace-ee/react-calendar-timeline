import { iterateTimes } from 'lib/utility/calendar'
import dayjs from 'dayjs'

describe('iterateTimes', () => {
  const defaultTimeSteps = {
    second: 1,
    minute: 1,
    hour: 1,
    day: 1,
    month: 1,
    year: 1,
  }

  it('iterates over each day in the range', () => {
    const start = dayjs('2024-01-01').valueOf()
    const end = dayjs('2024-01-04').valueOf()
    const intervals: Array<{ start: number; end: number }> = []

    iterateTimes(start, end, 'day', defaultTimeSteps, (time, nextTime) => {
      intervals.push({ start: time.valueOf(), end: nextTime.valueOf() })
    })

    expect(intervals).toHaveLength(3)
    expect(dayjs(intervals[0].start).format('YYYY-MM-DD')).toBe('2024-01-01')
    expect(dayjs(intervals[1].start).format('YYYY-MM-DD')).toBe('2024-01-02')
    expect(dayjs(intervals[2].start).format('YYYY-MM-DD')).toBe('2024-01-03')
  })

  it('iterates over each hour in the range', () => {
    const start = dayjs('2024-01-01T00:00').valueOf()
    const end = dayjs('2024-01-01T03:00').valueOf()
    const intervals: number[] = []

    iterateTimes(start, end, 'hour', defaultTimeSteps, (time) => {
      intervals.push(time.hour())
    })

    expect(intervals).toEqual([0, 1, 2])
  })

  it('respects timeSteps larger than 1', () => {
    const start = dayjs('2024-01-01T00:00').valueOf()
    const end = dayjs('2024-01-01T06:00').valueOf()
    const timeSteps = { ...defaultTimeSteps, hour: 2 }
    const hours: number[] = []

    iterateTimes(start, end, 'hour', timeSteps, (time) => {
      hours.push(time.hour())
    })

    expect(hours).toEqual([0, 2, 4])
  })

  it('iterates over months', () => {
    const start = dayjs('2024-01-01').valueOf()
    const end = dayjs('2024-04-01').valueOf()
    const months: number[] = []

    iterateTimes(start, end, 'month', defaultTimeSteps, (time) => {
      months.push(time.month()) // 0-indexed
    })

    expect(months).toEqual([0, 1, 2])
  })

  it('handles empty range (start === end)', () => {
    const time = dayjs('2024-01-01').valueOf()
    const callback = vi.fn()

    iterateTimes(time, time, 'day', defaultTimeSteps, callback)

    expect(callback).not.toHaveBeenCalled()
  })

  it('provides nextTime as start of next interval', () => {
    const start = dayjs('2024-01-15').valueOf()
    const end = dayjs('2024-01-17').valueOf()
    const intervals: Array<{ start: string; end: string }> = []

    iterateTimes(start, end, 'day', defaultTimeSteps, (time, nextTime) => {
      intervals.push({
        start: time.format('YYYY-MM-DD HH:mm'),
        end: nextTime.format('YYYY-MM-DD HH:mm'),
      })
    })

    expect(intervals[0].start).toBe('2024-01-15 00:00')
    expect(intervals[0].end).toBe('2024-01-16 00:00')
    expect(intervals[1].start).toBe('2024-01-16 00:00')
    expect(intervals[1].end).toBe('2024-01-17 00:00')
  })
})
