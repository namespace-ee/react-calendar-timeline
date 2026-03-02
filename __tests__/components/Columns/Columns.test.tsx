import { render } from '@testing-library/react'
import Columns from 'lib/columns/Columns'
import { TimelineStateProvider, TimelineStartProps } from 'lib/timeline/TimelineStateContext'
import type { SelectUnits } from 'lib/utility/calendar'
import type { TimelineTimeSteps } from 'lib/types/main'

const now = Date.now()
const oneDay = 1000 * 60 * 60 * 24

const defaultTimelineState: TimelineStartProps = {
  visibleTimeStart: now - oneDay,
  visibleTimeEnd: now + oneDay,
  canvasTimeStart: now - 2 * oneDay,
  canvasTimeEnd: now + 2 * oneDay,
  canvasWidth: 3000,
  showPeriod: () => {},
  timelineUnit: 'day' as SelectUnits,
  timelineWidth: 1000,
}

const defaultProps = {
  canvasTimeStart: defaultTimelineState.canvasTimeStart,
  canvasTimeEnd: defaultTimelineState.canvasTimeEnd,
  canvasWidth: 3000,
  lineCount: 1,
  minUnit: 'day' as keyof TimelineTimeSteps,
  timeSteps: {
    second: 1,
    minute: 1,
    hour: 1,
    day: 1,
    month: 1,
    year: 1,
  },
  height: 800,
}

const renderColumns = (props = {}) =>
  render(
    <TimelineStateProvider {...defaultTimelineState}>
      <Columns {...defaultProps} {...props} />
    </TimelineStateProvider>
  )

describe('Columns', () => {
  it('renders vertical lines container', () => {
    const { container } = renderColumns()
    expect(container.querySelector('.rct-vertical-lines')).toBeInTheDocument()
  })

  it('generates vertical line divs with rct-vl class', () => {
    const { container } = renderColumns()
    const lines = container.querySelectorAll('.rct-vl')
    expect(lines.length).toBeGreaterThan(0)
  })

  it('marks first-of-type lines with rct-vl-first', () => {
    const { container } = renderColumns()
    const firstLines = container.querySelectorAll('.rct-vl-first')
    expect(firstLines.length).toBeGreaterThan(0)
  })

  it('applies day-of-week classes for day unit', () => {
    const { container } = renderColumns({ minUnit: 'day' })
    const lines = container.querySelectorAll('.rct-vl')
    // At least one line should have a rct-day-X class
    const hasDayClass = Array.from(lines).some((line) =>
      /rct-day-\d/.test(line.className)
    )
    expect(hasDayClass).toBe(true)
  })

  it('applies custom classes from verticalLineClassNamesForTime', () => {
    const customClassFn = () => ['custom-holiday']
    const { container } = renderColumns({
      verticalLineClassNamesForTime: customClassFn,
    })

    const customLines = container.querySelectorAll('.custom-holiday')
    expect(customLines.length).toBeGreaterThan(0)
  })

  it('lines have left and width styles', () => {
    const { container } = renderColumns()
    const line = container.querySelector('.rct-vl') as HTMLElement
    expect(line!.style.left).toBeTruthy()
    expect(line!.style.width).toBeTruthy()
  })
})
