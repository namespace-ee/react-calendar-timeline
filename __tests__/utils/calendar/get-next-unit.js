/* eslint-disable */
import { getNextUnit } from 'lib/utility/calendar'

//what value do these tests have? :)
describe('getNextUnit', () => {
  it('second to minute', () => {
    const result = getNextUnit('second')
    expect(result).toBe('minute')
  })
  it('minute to hour', () => {
    const result = getNextUnit('minute')
    expect(result).toBe('hour')
  })
  it('hour to day', () => {
    const result = getNextUnit('hour')
    expect(result).toBe('day')
  })
  it('day to month', () => {
    const result = getNextUnit('day')
    expect(result).toBe('month')
  })
  it('month to year', () => {
    const result = getNextUnit('month')
    expect(result).toBe('year')
  })
  it('year to empty string', () => {
    const result = getNextUnit('year')
    expect(result).toBe('')
  })
  it('unknown value to empty string', () => {
    const result = getNextUnit('foo')
    expect(result).toBe('')
  })
})
