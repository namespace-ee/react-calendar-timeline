import { Component, createRef, CSSProperties, ReactNode } from 'react'
import { getParentPosition } from '../utility/dom-helpers'

type Props = {
  children: ReactNode
  width: number
  height: number
  traditionalZoom: boolean
  scrollRef: (e: HTMLDivElement) => void
  onZoom: (n: number, m: number) => void
  onWheelZoom: (speed: number, xPosition: number, deltaY: number) => void
  onScroll: (n: number) => void
  scrollOffset: number
}

type State = {
  isDragging: boolean
}

class ScrollElement extends Component<Props, State> {
  scrollComponentRef = createRef<HTMLDivElement>()
  private dragLastPosition: number | null = null
  private lastTouchDistance: number | null = null
  private singleTouchStart: { x: number; y: number; screenY: number } | null = null
  private lastSingleTouch: { x: number; y: number; screenY: number } | null = null
  private isItemInteraction: boolean = false
  private rafId: number | null = null
  private pendingScrollOffset: number | null = null
  constructor(props: Props) {
    super(props)
    this.state = {
      isDragging: false,
    }
  }

  /**
   * Batch scroll updates to once per animation frame, mimicking
   * how the browser coalesces native scroll events. Without this,
   * each wheel/pointer event triggers a separate onScroll → onTimeChange
   * → canvas recalculation cycle.
   */
  scheduleScroll = (scrollOffset: number) => {
    this.pendingScrollOffset = scrollOffset
    if (this.rafId === null) {
      this.rafId = requestAnimationFrame(() => {
        this.rafId = null
        if (this.pendingScrollOffset !== null) {
          this.props.onScroll(this.pendingScrollOffset)
          this.pendingScrollOffset = null
        }
      })
    }
  }
  componentDidMount() {
    if (this.scrollComponentRef.current) {
      this.props.scrollRef(this.scrollComponentRef.current)
      this.scrollComponentRef.current.addEventListener('wheel', this.handleWheel, { passive: false })
      this.scrollComponentRef.current.addEventListener('itemInteraction', this.handleItemInteract)
      this.scrollComponentRef.current.addEventListener('pointerdown', this.handlePointerStart, { passive: false })
      this.scrollComponentRef.current.addEventListener('pointermove', this.handlePointerMove, { passive: false })
      this.scrollComponentRef.current.addEventListener('pointerup', this.handlePointerEnd)
      this.scrollComponentRef.current.addEventListener('pointerleave', this.handlePointerLeave)
    }
  }

  handlePointerStart = (e: PointerEvent) => {
    if (e.pointerType === 'touch') {
      this.handleTouchStart(e)
    } else if (e.pointerType === 'mouse') {
      this.handleMouseDown(e)
    }
  }

  handlePointerMove = (e: PointerEvent) => {
    if (e.pointerType === 'touch') {
      this.handleTouchMove(e)
    } else if (e.pointerType === 'mouse') {
      this.handleMouseMove(e)
    }
  }

  handlePointerEnd = (e: PointerEvent) => {
    if (e.pointerType === 'touch') {
      this.handleTouchEnd()
    } else if (e.pointerType === 'mouse') {
      this.handleMouseUp()
    }
  }

  /**
   * Normalize wheel delta values for consistent behavior across browsers.
   * Addresses issue #929 (trackpad scrolling too fast on some platforms)
   * and issue #975 (mouse wheel zoom jumps).
   *
   * Browsers report wheel events differently:
   * - deltaMode 0 (DOM_DELTA_PIXEL): Raw pixel values (varies by OS/browser)
   * - deltaMode 1 (DOM_DELTA_LINE): Line-based scrolling (multiply by pixels/line)
   * - deltaMode 2 (DOM_DELTA_PAGE): Page-based scrolling (rare)
   */
  normalizeWheelDelta = (e: WheelEvent): number => {
    let delta = e.deltaY || e.deltaX

    if (e.deltaMode === 1) {
      // LINE mode: Convert to pixels (1 line ≈ 15px)
      delta *= 15
    } else if (e.deltaMode === 2) {
      // PAGE mode: Convert to pixels (1 page ≈ viewport height)
      delta *= 800
    }

    // Clamp to ±120 (standard mouse wheel click) to prevent excessive jumps
    const MAX_DELTA = 120
    return Math.max(-MAX_DELTA, Math.min(MAX_DELTA, delta))
  }

  handleWheel = (e: WheelEvent) => {
    // zoom in the time dimension
    if (e.ctrlKey || e.metaKey || e.altKey) {
      e.preventDefault()
      const parentPosition = getParentPosition(e.currentTarget as HTMLElement)
      const xPosition = e.clientX - parentPosition.x

      const speed = e.ctrlKey ? 10 : e.metaKey ? 3 : 1

      // Normalize delta for consistent zoom behavior
      const normalizedDelta = this.normalizeWheelDelta(e)
      this.props.onWheelZoom(speed, xPosition, normalizedDelta)
    } else if (e.shiftKey) {
      e.preventDefault()
      // Normalize delta for consistent horizontal scroll
      const normalizedDelta = this.normalizeWheelDelta(e)
      this.scheduleScroll(this.props.scrollOffset + normalizedDelta)
    } else {
      // Plain wheel/trackpad horizontal panning.
      // Use raw deltaX (not clamped) so trackpad momentum feels natural.
      // Only intercept when scroll is predominantly horizontal to avoid
      // capturing vertical scroll that has a small deltaX component.
      const deltaX = e.deltaX
      if (deltaX !== 0 && Math.abs(deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault()
        this.scheduleScroll(this.props.scrollOffset + deltaX)
      }
    }
  }

  handleMouseDown = (e: PointerEvent) => {
    if (e.button === 0 && !this.isItemInteraction) {
      this.dragLastPosition = e.pageX
    }
  }

  handleMouseMove = (e: PointerEvent) => {
    //why is interacting with item important?
    if (this.dragLastPosition !== null) {
      if (!this.state.isDragging) {
        this.setState({ isDragging: true })
      }
      this.scheduleScroll(this.props.scrollOffset + this.dragLastPosition - e.pageX)
      this.dragLastPosition = e.pageX
    }
  }

  handleMouseUp = () => {
    this.dragLastPosition = null

    this.setState({
      isDragging: false,
    })
  }

  handlePointerLeave = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') {
      this.dragLastPosition = null
      this.setState({
        isDragging: false,
      })
    }
  }

  handleTouchStart = (e: PointerEvent) => {
    if (e.isPrimary) {
      e.preventDefault()
      this.lastTouchDistance = null
      this.singleTouchStart = { x: e.clientX, y: e.clientY, screenY: window.scrollY }
      this.lastSingleTouch = { x: e.clientX, y: e.clientY, screenY: window.scrollY }
    } else {
      e.preventDefault()
      this.lastTouchDistance = Math.abs(e.clientX - this.singleTouchStart!.x)
      this.singleTouchStart = null
      this.lastSingleTouch = null
    }
  }

  handleTouchMove = (e: PointerEvent) => {
    const { width, onZoom } = this.props
    if (this.isItemInteraction) {
      e.preventDefault()
      return
    }
    if (this.lastTouchDistance && !e.isPrimary) {
      e.preventDefault()
      const touchDistance = Math.abs(e.clientX - this.singleTouchStart!.x)
      const parentPosition = getParentPosition(e.currentTarget as HTMLElement)
      const xPosition = (e.clientX + this.singleTouchStart!.x) / 2 - parentPosition.x
      if (touchDistance !== 0 && this.lastTouchDistance !== 0) {
        onZoom(this.lastTouchDistance / touchDistance, xPosition / width)
        this.lastTouchDistance = touchDistance
      }
    } else if (this.lastSingleTouch && e.isPrimary) {
      e.preventDefault()
      const x = e.clientX
      const y = e.clientY
      const deltaX = x - this.lastSingleTouch.x
      const deltaX0 = x - this.singleTouchStart!.x
      const deltaY0 = y - this.singleTouchStart!.y
      this.lastSingleTouch = { x: x, y: y, screenY: window.pageYOffset }
      const moveX = Math.abs(deltaX0) * 3 > Math.abs(deltaY0)
      const moveY = Math.abs(deltaY0) * 3 > Math.abs(deltaX0)
      if (deltaX !== 0 && moveX) {
        this.scheduleScroll(this.props.scrollOffset - deltaX)
      }
      if (moveY) {
        window.scrollTo(window.scrollX, this.singleTouchStart!.screenY - deltaY0)
      }
    }
  }

  handleTouchEnd = () => {
    if (this.lastTouchDistance) {
      this.lastTouchDistance = null
    }
    if (this.lastSingleTouch) {
      this.lastSingleTouch = null
      this.singleTouchStart = null
    }
  }
  handleItemInteract = (e: Event) => {
    this.isItemInteraction = (e as CustomEvent<{ itemInteraction: boolean }>).detail.itemInteraction
  }

  componentWillUnmount() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
    }
    if (this.scrollComponentRef.current) {
      this.scrollComponentRef.current.removeEventListener('wheel', this.handleWheel)
      this.scrollComponentRef.current.removeEventListener('itemInteraction', this.handleItemInteract)
      this.scrollComponentRef.current.removeEventListener('pointerdown', this.handlePointerStart)
      this.scrollComponentRef.current.removeEventListener('pointermove', this.handlePointerMove)
      this.scrollComponentRef.current.removeEventListener('pointerup', this.handlePointerEnd)
      this.scrollComponentRef.current.removeEventListener('pointerleave', this.handlePointerLeave)
    }
  }

  render() {
    const { width, height, children, scrollOffset } = this.props
    const { isDragging } = this.state

    const scrollComponentStyle: CSSProperties = {
      width: `${width}px`,
      height: `${height}px`,
      cursor: isDragging ? 'move' : 'default',
      position: 'relative',
      overflow: 'hidden',
    }

    return (
      <div
        ref={this.scrollComponentRef}
        data-testid="scroll-element"
        className="rct-scroll"
        style={scrollComponentStyle}
      >
        <div style={{ transform: `translateX(${-scrollOffset}px)`, height: '100%' }}>
          {children}
        </div>
      </div>
    )
  }
}

export default ScrollElement
