import { render, act } from '@testing-library/react'
import { noop } from 'test-utility'
import ScrollElement from 'lib/scroll/ScrollElement'

// jsdom does not provide PointerEvent
class PointerEventPolyfill extends MouseEvent {
  pointerType: string
  pointerId: number
  isPrimary: boolean
  constructor(type: string, params: PointerEventInit & Record<string, unknown> = {}) {
    super(type, params)
    this.pointerType = (params.pointerType as string) || 'mouse'
    this.pointerId = (params.pointerId as number) || 1
    this.isPrimary = params.isPrimary !== undefined ? params.isPrimary : true
  }
}
globalThis.PointerEvent = globalThis.PointerEvent || (PointerEventPolyfill as typeof PointerEvent)

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
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => { cb(0); return 0 })

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
        clientX: 100, button: 0, pointerType: 'mouse', bubbles: true,
      }))
      scrollEl.dispatchEvent(new PointerEvent('pointermove', {
        clientX: 50, pointerType: 'mouse', bubbles: true,
      }))
    })

    expect(onScrollMock).toHaveBeenCalledTimes(1)
    // scrollOffset (0) + dragLastPosition (100) - pageX (50) = 50
    expect(onScrollMock).toHaveBeenCalledWith(50)

    rafSpy.mockRestore()
  })

  describe('wheel events', () => {
    let rafSpy: { mockRestore: () => void }

    beforeEach(() => {
      rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => { cb(0); return 0 })
    })

    afterEach(() => {
      rafSpy.mockRestore()
    })

    it('ctrl+wheel calls onWheelZoom with speed 10', () => {
      const onWheelZoomMock = vi.fn()
      const { getByTestId } = render(
        <ScrollElement {...defaultProps} onWheelZoom={onWheelZoomMock}>
          <div />
        </ScrollElement>
      )

      const scrollEl = getByTestId('scroll-element')

      act(() => {
        const wheelEvent = new WheelEvent('wheel', {
          deltaY: 100,
          deltaMode: 0,
          ctrlKey: true,
          bubbles: true,
          cancelable: true,
        })
        scrollEl.dispatchEvent(wheelEvent)
      })

      expect(onWheelZoomMock).toHaveBeenCalledWith(10, expect.any(Number), expect.any(Number))
    })

    it('alt+wheel calls onWheelZoom with speed 1', () => {
      const onWheelZoomMock = vi.fn()
      const { getByTestId } = render(
        <ScrollElement {...defaultProps} onWheelZoom={onWheelZoomMock}>
          <div />
        </ScrollElement>
      )

      const scrollEl = getByTestId('scroll-element')

      act(() => {
        const wheelEvent = new WheelEvent('wheel', {
          deltaY: 50,
          deltaMode: 0,
          altKey: true,
          bubbles: true,
          cancelable: true,
        })
        scrollEl.dispatchEvent(wheelEvent)
      })

      expect(onWheelZoomMock).toHaveBeenCalledWith(1, expect.any(Number), expect.any(Number))
    })

    it('shift+wheel calls onScroll for horizontal scrolling', () => {
      const onScrollMock = vi.fn()
      const { getByTestId } = render(
        <ScrollElement {...defaultProps} onScroll={onScrollMock} scrollOffset={100}>
          <div />
        </ScrollElement>
      )

      const scrollEl = getByTestId('scroll-element')

      act(() => {
        const wheelEvent = new WheelEvent('wheel', {
          deltaY: 60,
          deltaMode: 0,
          shiftKey: true,
          bubbles: true,
          cancelable: true,
        })
        scrollEl.dispatchEvent(wheelEvent)
      })

      expect(onScrollMock).toHaveBeenCalledTimes(1)
      // scrollOffset (100) + normalized delta (clamped 60) = 160
      expect(onScrollMock).toHaveBeenCalledWith(160)
    })

    it('plain wheel with dominant deltaX calls onScroll for horizontal pan', () => {
      const onScrollMock = vi.fn()
      const { getByTestId } = render(
        <ScrollElement {...defaultProps} onScroll={onScrollMock} scrollOffset={0}>
          <div />
        </ScrollElement>
      )

      const scrollEl = getByTestId('scroll-element')

      act(() => {
        const wheelEvent = new WheelEvent('wheel', {
          deltaX: 80,
          deltaY: 10,
          deltaMode: 0,
          bubbles: true,
          cancelable: true,
        })
        scrollEl.dispatchEvent(wheelEvent)
      })

      expect(onScrollMock).toHaveBeenCalledTimes(1)
      // Uses raw deltaX (not clamped) for trackpad: 0 + 80 = 80
      expect(onScrollMock).toHaveBeenCalledWith(80)
    })
  })

  it('item interaction blocks pointer drag', () => {
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => { cb(0); return 0 })
    const onScrollMock = vi.fn()
    const { getByTestId } = render(
      <ScrollElement {...defaultProps} onScroll={onScrollMock}>
        <div />
      </ScrollElement>
    )

    const scrollEl = getByTestId('scroll-element')

    // Fire itemInteraction event to block scrolling
    act(() => {
      scrollEl.dispatchEvent(new CustomEvent('itemInteraction', {
        bubbles: true,
        detail: { itemInteraction: true },
      }))
    })

    // Now try to drag — should be blocked
    act(() => {
      scrollEl.dispatchEvent(new PointerEvent('pointerdown', {
        clientX: 100, button: 0, pointerType: 'mouse', bubbles: true,
      }))
      scrollEl.dispatchEvent(new PointerEvent('pointermove', {
        clientX: 50, pointerType: 'mouse', bubbles: true,
      }))
    })

    expect(onScrollMock).not.toHaveBeenCalled()

    rafSpy.mockRestore()
  })

  it('touch drag calls onScroll for horizontal movement', () => {
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => { cb(0); return 0 })
    const onScrollMock = vi.fn()
    const { getByTestId } = render(
      <ScrollElement {...defaultProps} onScroll={onScrollMock} scrollOffset={0}>
        <div />
      </ScrollElement>
    )

    const scrollEl = getByTestId('scroll-element')

    act(() => {
      // Primary touch start
      scrollEl.dispatchEvent(new PointerEvent('pointerdown', {
        clientX: 200, clientY: 200, pointerType: 'touch', isPrimary: true, bubbles: true,
      }))
      // Move horizontally (deltaX=50 is > deltaY=0 * 3)
      scrollEl.dispatchEvent(new PointerEvent('pointermove', {
        clientX: 150, clientY: 200, pointerType: 'touch', isPrimary: true, bubbles: true,
      }))
    })

    expect(onScrollMock).toHaveBeenCalled()
    // scrollOffset (0) - deltaX (150 - 200 = -50) → 0 - (-50) = 50
    expect(onScrollMock).toHaveBeenCalledWith(50)

    rafSpy.mockRestore()
  })
})
