/* eslint-disable */
import { getMinUnit, minCellWidth } from 'lib/utility/calendar'
import moment from 'moment'
import { defaultTimeSteps } from 'lib/default-config'

describe('getMinUnit', () => {
  // this is the happy path and used as safety net if we make any refactorings
  // to this function.  There seem to be a ton of edge cases here...
  describe('standard width of 1200', () => {
    const standardWidth = 1200
    it('should be second for one minute duration', () => {
      const oneMinute = moment.duration(1, 'minute').asMilliseconds()
      const result = getMinUnit(oneMinute, standardWidth, defaultTimeSteps)

      expect(result).toBe('second')
    })
    it('should be minute for one hour duration', () => {
      const oneHour = moment.duration(1, 'hour').asMilliseconds()
      const result = getMinUnit(oneHour, standardWidth, defaultTimeSteps)

      expect(result).toBe('minute')
    })
    it('should be hour for one day duration', () => {
      const oneDay = moment.duration(1, 'day').asMilliseconds()
      const result = getMinUnit(oneDay, standardWidth, defaultTimeSteps)

      expect(result).toBe('hour')
    })
    it('should be day for one week duration', () => {
      const oneWeek = moment.duration(1, 'week').asMilliseconds()
      const result = getMinUnit(oneWeek, standardWidth, defaultTimeSteps)

      expect(result).toBe('day')
    })
    it('should be day for one month duration', () => {
      const oneMonth = moment.duration(1, 'month').asMilliseconds()
      const result = getMinUnit(oneMonth, standardWidth, defaultTimeSteps)

      expect(result).toBe('day')
    })
    it('should be month for one year duration', () => {
      const oneYear = moment.duration(1, 'year').asMilliseconds()
      const result = getMinUnit(oneYear, standardWidth, defaultTimeSteps)

      expect(result).toBe('month')
    })
  })
})
