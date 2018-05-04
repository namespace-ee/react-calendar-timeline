import { coordinateToTimeRatio } from 'lib/utility/calendar'

describe('coordinateToTimeRatio', () => {
  it('calculates ratio', () => {
    const width = 1000 // in pixels;

    const canvasTimeEnd = 20000
    const canvasTimeStart = 10000

    const expected = 10 // 10 units for every pixel;
    expect(coordinateToTimeRatio(canvasTimeStart, canvasTimeEnd, width)).toBe(
      expected
    )
  })
})
