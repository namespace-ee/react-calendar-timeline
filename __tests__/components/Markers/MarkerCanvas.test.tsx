import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import MarkerCanvas from 'lib/markers/MarkerCanvas'
import { TimelineStateProvider } from 'lib/timeline/TimelineStateContext'
import { TimelineMarkersProvider } from 'lib/markers/TimelineMarkersContext'
import { MarkerCanvasConsumer } from 'lib/markers/MarkerCanvasContext'

const now = Date.now()
const oneDay = 1000 * 60 * 60 * 24

const defaultTimelineState = {
  visibleTimeStart: now - oneDay,
  visibleTimeEnd: now + oneDay,
  canvasTimeStart: now - 2 * oneDay,
  canvasTimeEnd: now + 2 * oneDay,
  canvasWidth: 3000,
  showPeriod: () => {},
  timelineUnit: 'day',
  timelineWidth: 1000,
}

const renderMarkerCanvas = (children) =>
  render(
    <TimelineStateProvider {...defaultTimelineState}>
      <TimelineMarkersProvider>
        <MarkerCanvas>
          {children}
        </MarkerCanvas>
      </TimelineMarkersProvider>
    </TimelineStateProvider>
  )

describe('MarkerCanvas', () => {
  it('renders children', () => {
    const { getByTestId } = renderMarkerCanvas(
      <div data-testid="canvas-child" />
    )
    expect(getByTestId('canvas-child')).toBeInTheDocument()
  })

  it('provides subscribeToMouseOver via context', () => {
    let contextValue
    renderMarkerCanvas(
      <MarkerCanvasConsumer>
        {(ctx) => {
          contextValue = ctx
          return null
        }}
      </MarkerCanvasConsumer>
    )

    expect(contextValue.subscribeToMouseOver).toBeDefined()
    expect(typeof contextValue.subscribeToMouseOver).toBe('function')
  })

  it('mouse move triggers subscription with cursor data', () => {
    const subscriber = vi.fn()
    let subscribe

    const { container } = renderMarkerCanvas(
      <MarkerCanvasConsumer>
        {(ctx) => {
          subscribe = ctx.subscribeToMouseOver
          return null
        }}
      </MarkerCanvasConsumer>
    )

    subscribe(subscriber)

    // The MarkerCanvas div is the first child inside the provider div
    const canvasDiv = container.querySelector('div[style]')
    fireEvent.mouseMove(canvasDiv, { pageX: 100 })

    expect(subscriber).toHaveBeenCalledWith(
      expect.objectContaining({
        isCursorOverCanvas: true,
        leftOffset: expect.any(Number),
        date: expect.any(Number),
      })
    )
  })

  it('mouse leave triggers subscription with isCursorOverCanvas false', () => {
    const subscriber = vi.fn()
    let subscribe

    const { container } = renderMarkerCanvas(
      <MarkerCanvasConsumer>
        {(ctx) => {
          subscribe = ctx.subscribeToMouseOver
          return null
        }}
      </MarkerCanvasConsumer>
    )

    subscribe(subscriber)

    const canvasDiv = container.querySelector('div[style]')
    fireEvent.mouseLeave(canvasDiv)

    expect(subscriber).toHaveBeenCalledWith(
      expect.objectContaining({
        isCursorOverCanvas: false,
      })
    )
  })
})
