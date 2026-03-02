import React from 'react'
import { render, act } from '@testing-library/react'
import { noop } from 'test-utility'
import ScrollElement from 'lib/scroll/ScrollElement'

// jsdom does not provide PointerEvent
class PointerEventPolyfill extends MouseEvent {
  constructor(type, params = {}) {
    super(type, params)
    this.pointerType = params.pointerType || 'mouse'
    this.pointerId = params.pointerId || 1
    this.isPrimary = params.isPrimary !== undefined ? params.isPrimary : true
  }
}
globalThis.PointerEvent = globalThis.PointerEvent || PointerEventPolyfill

const defaultProps = {
  width: 1000,
  height: 800,
  onZoom: noop,
  onWheelZoom: noop,
  onScroll: noop,
  traditionalZoom: false,
  scrollRef: noop,
  isInteractingWithItem: false,
  scrollOffset: 0,
}

describe('ScrollElement', () => {
  it('renders with data-testid', () => {
    const { getByTestId } = render(
      <ScrollElement {...defaultProps}>
        <div />
      </ScrollElement>
    )

    expect(getByTestId('scroll-element')).toBeDefined()
  })

  it('calls onScroll when dragged via pointer events', () => {
    // Mock requestAnimationFrame to execute callback synchronously
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => { cb(0); return 0 })

    const onScrollMock = vi.fn()
    const props = {
      ...defaultProps,
      onScroll: onScrollMock,
    }

    const { getByTestId } = render(
      <ScrollElement {...props}>
        <div />
      </ScrollElement>
    )

    const scrollEl = getByTestId('scroll-element')

    // Simulate a pointer drag (mouse)
    act(() => {
      scrollEl.dispatchEvent(new PointerEvent('pointerdown', {
        clientX: 100, pageX: 100, button: 0, pointerType: 'mouse', bubbles: true,
      }))
      scrollEl.dispatchEvent(new PointerEvent('pointermove', {
        clientX: 50, pageX: 50, pointerType: 'mouse', bubbles: true,
      }))
    })

    expect(onScrollMock).toHaveBeenCalledTimes(1)
    // scrollOffset (0) + dragLastPosition (100) - pageX (50) = 50
    expect(onScrollMock).toHaveBeenCalledWith(50)

    rafSpy.mockRestore()
  })
})
