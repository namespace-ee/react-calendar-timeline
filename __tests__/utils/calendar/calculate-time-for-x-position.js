import moment from 'moment'
import { calculateTimeForXPosition } from 'lib/utility/calendar'

describe('calculate time for x position', () => {
  it('calculates point in middle of timeline', () => {
    const canvasStart = moment('2018-01-01').valueOf()
    const canvasEnd = moment('2018-01-03').valueOf()
    const canvasWidthInPixels = 3000

    const currentXPositionInPixels = canvasWidthInPixels / 2

    const actual = calculateTimeForXPosition(
      canvasStart,
      canvasEnd,
      canvasWidthInPixels,
      currentXPositionInPixels
    )

    const expected = moment('2018-01-02').valueOf()

    expect(actual).toBe(expected)
  })

  it('calculates point in first quarter of timeline', () => {
    const canvasStart = moment('2018-01-01').valueOf()
    const canvasEnd = moment('2018-01-02').valueOf()
    const canvasWidthInPixels = 3000

    const currentXPositionInPixels = canvasWidthInPixels / 4

    const actual = calculateTimeForXPosition(
      canvasStart,
      canvasEnd,
      canvasWidthInPixels,
      currentXPositionInPixels
    )

    const expected = moment('2018-01-01')
      .add(6, 'hour')
      .valueOf()

    expect(actual).toBe(expected)
  })

  it('calculates point in latter quarter of timeline', () => {
    const canvasStart = moment('2018-01-01').valueOf()
    const canvasEnd = moment('2018-01-02').valueOf()
    const canvasWidthInPixels = 3000

    const currentXPositionInPixels = canvasWidthInPixels * 0.75

    const actual = calculateTimeForXPosition(
      canvasStart,
      canvasEnd,
      canvasWidthInPixels,
      currentXPositionInPixels
    )

    const expected = moment('2018-01-01')
      .add(18, 'hour')
      .valueOf()

    expect(actual).toBe(expected)
  })
})
