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
  constructor(props: Props) {
    super(props)
    this.state = {
      isDragging: false,
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
   * needed to handle scrolling with trackpad
   */
  handleScroll = () => {
    const scrollX = this.scrollComponentRef.current!.scrollLeft
    this.props.onScroll(scrollX)
  }

  handleWheel = (e: WheelEvent) => {
    //const { traditionalZoom } = this.props

    // zoom in the time dimension
    if (e.ctrlKey || e.metaKey || e.altKey) {
      e.preventDefault()
      const parentPosition = getParentPosition(e.currentTarget as HTMLElement)
      const xPosition = e.clientX - parentPosition.x

      const speed = e.ctrlKey ? 10 : e.metaKey ? 3 : 1

      // convert vertical zoom to horiziontal
      this.props.onWheelZoom(speed, xPosition, e.deltaY)
    } else if (e.shiftKey) {
      e.preventDefault()
      // shift+scroll event from a touchpad has deltaY property populated; shift+scroll event from a mouse has deltaX
      this.props.onScroll(this.scrollComponentRef.current!.scrollLeft + (e.deltaY || e.deltaX))
      // no modifier pressed? we prevented the default event, so scroll or zoom as needed
    }
  }

  handleMouseDown = (e: PointerEvent) => {
    if (e.button === 0) {
      this.dragLastPosition = e.pageX
      this.setState({
        isDragging: true,
      })
    }
  }

  handleMouseMove = (e: PointerEvent) => {
    //why is interacting with item important?
    if (this.state.isDragging && !this.isItemInteraction) {
      this.props.onScroll(this.scrollComponentRef.current!.scrollLeft + this.dragLastPosition! - e.pageX)
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
        this.props.onScroll(this.scrollComponentRef.current!.scrollLeft - deltaX)
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
    const { width, height, children } = this.props
    const { isDragging } = this.state

    const scrollComponentStyle: CSSProperties = {
      width: `${width}px`,
      height: `${height + 20}px`, //20px to push the scroll element down off screen...?
      cursor: isDragging ? 'move' : 'default',
      position: 'relative',
    }

    return (
      <div
        ref={this.scrollComponentRef}
        data-testid="scroll-element"
        className="rct-scroll"
        style={scrollComponentStyle}
        onScroll={this.handleScroll}
      >
        {children}
      </div>
    )
  }
}

export default ScrollElement
