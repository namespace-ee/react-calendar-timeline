import { render } from '@testing-library/react'
import { TimelineStateProvider, TimelineStateConsumer, useTimelineState, TimelineContextType, TimelineStartProps } from 'lib/timeline/TimelineStateContext'
import { calculateXPositionForTime, calculateTimeForXPosition, SelectUnits } from 'lib/utility/calendar'

const now = Date.now()
const oneDay = 1000 * 60 * 60 * 24

const defaultProps: TimelineStartProps = {
  visibleTimeStart: now - oneDay,
  visibleTimeEnd: now + oneDay,
  canvasTimeStart: now - 2 * oneDay,
  canvasTimeEnd: now + 2 * oneDay,
  canvasWidth: 3000,
  showPeriod: vi.fn(),
  timelineUnit: 'day' as SelectUnits,
  timelineWidth: 1000,
}

describe('TimelineStateContext', () => {
  it('getTimelineState returns correct time bounds and dimensions', () => {
    let captured: ReturnType<TimelineContextType['getTimelineState']> | undefined
    render(
      <TimelineStateProvider {...defaultProps}>
        <TimelineStateConsumer>
          {(ctx) => {
            captured = ctx.getTimelineState()
            return null
          }}
        </TimelineStateConsumer>
      </TimelineStateProvider>
    )

    expect(captured!.visibleTimeStart).toBe(defaultProps.visibleTimeStart)
    expect(captured!.visibleTimeEnd).toBe(defaultProps.visibleTimeEnd)
    expect(captured!.canvasTimeStart).toBe(defaultProps.canvasTimeStart)
    expect(captured!.canvasTimeEnd).toBe(defaultProps.canvasTimeEnd)
    expect(captured!.canvasWidth).toBe(defaultProps.canvasWidth)
    expect(captured!.timelineWidth).toBe(defaultProps.timelineWidth)
  })

  it('getLeftOffsetFromDate returns correct X position', () => {
    let getLeftOffsetFromDate: TimelineContextType['getLeftOffsetFromDate'] | undefined
    render(
      <TimelineStateProvider {...defaultProps}>
        <TimelineStateConsumer>
          {(ctx) => {
            getLeftOffsetFromDate = ctx.getLeftOffsetFromDate
            return null
          }}
        </TimelineStateConsumer>
      </TimelineStateProvider>
    )

    const testDate = now
    const result = getLeftOffsetFromDate!(testDate)
    const expected = calculateXPositionForTime(
      defaultProps.canvasTimeStart,
      defaultProps.canvasTimeEnd,
      defaultProps.canvasWidth,
      testDate
    )
    expect(result).toBe(expected)
  })

  it('getDateFromLeftOffsetPosition returns correct timestamp', () => {
    let getDateFromLeftOffsetPosition: TimelineContextType['getDateFromLeftOffsetPosition'] | undefined
    render(
      <TimelineStateProvider {...defaultProps}>
        <TimelineStateConsumer>
          {(ctx) => {
            getDateFromLeftOffsetPosition = ctx.getDateFromLeftOffsetPosition
            return null
          }}
        </TimelineStateConsumer>
      </TimelineStateProvider>
    )

    const leftOffset = 1500 // middle of canvas
    const result = getDateFromLeftOffsetPosition!(leftOffset)
    const expected = calculateTimeForXPosition(
      defaultProps.canvasTimeStart,
      defaultProps.canvasTimeEnd,
      defaultProps.canvasWidth,
      leftOffset
    )
    expect(result).toBe(expected)
  })

  it('useTimelineState hook provides the same context', () => {
    let hookResult: TimelineContextType | undefined
    const HookConsumer = () => {
      hookResult = useTimelineState()
      return null
    }

    render(
      <TimelineStateProvider {...defaultProps}>
        <HookConsumer />
      </TimelineStateProvider>
    )

    expect(hookResult!.getTimelineState).toBeDefined()
    expect(hookResult!.getLeftOffsetFromDate).toBeDefined()
    expect(hookResult!.getDateFromLeftOffsetPosition).toBeDefined()
    expect(hookResult!.showPeriod).toBeDefined()
  })
})
