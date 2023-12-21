import {
  Component,
  CSSProperties,
  MouseEventHandler,
  ReactNode,
  TouchEventHandler,
} from 'react'
import { getParentPosition } from '../utility/dom-helpers'

type Props = {
  children: ReactNode
  width: number
  height: number
  traditionalZoom: boolean
  scrollRef: (e: HTMLDivElement) => void
  isInteractingWithItem: boolean
  onZoom: (n: number, m: number) => void
  onWheelZoom: (speed: number, xPosition: number, deltaY: number) => void
  onScroll: (n: number) => void
}

type State = {
  isDragging: boolean
}

class ScrollElement extends Component<Props, State> {
  scrollComponent: HTMLDivElement | null = null
  // @ts-ignore
  private dragStartPosition: number | null = null
  private dragLastPosition: number | null = null
  private lastTouchDistance: number | null = null
  private singleTouchStart: { x: number; y: number; screenY: number } | null =
    null
  private lastSingleTouch: { x: number; y: number; screenY: number } | null =
    null
  constructor(props: Props) {
    super(props)
    this.state = {
      isDragging: false,
    }
  }

  /**
   * needed to handle scrolling with trackpad
   */
  handleScroll = () => {
    const scrollX = this.scrollComponent!.scrollLeft
    this.props.onScroll(scrollX)
  }

  refHandler = (el: HTMLDivElement) => {
    this.scrollComponent = el
    this.props.scrollRef(el)
    if (el) {
      el.addEventListener('wheel', this.handleWheel, { passive: false })
    }
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
      this.props.onScroll(
        this.scrollComponent!.scrollLeft + (e.deltaY || e.deltaX),
      )
      // no modifier pressed? we prevented the default event, so scroll or zoom as needed
    }
  }

  handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.button === 0) {
      this.dragStartPosition = e.pageX
      this.dragLastPosition = e.pageX
      this.setState({
        isDragging: true,
      })
    }
  }

  handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    // this.props.onMouseMove(e)
    //why is interacting with item important?
    if (this.state.isDragging && !this.props.isInteractingWithItem) {
      this.props.onScroll(
        this.scrollComponent!.scrollLeft + this.dragLastPosition! - e.pageX,
      )
      this.dragLastPosition = e.pageX
    }
  }

  handleMouseUp = () => {
    this.dragStartPosition = null
    this.dragLastPosition = null

    this.setState({
      isDragging: false,
    })
  }

  handleMouseLeave = () => {
    // this.props.onMouseLeave(e)
    this.dragStartPosition = null
    this.dragLastPosition = null
    this.setState({
      isDragging: false,
    })
  }

  handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault()

      this.lastTouchDistance = Math.abs(
        e.touches[0].screenX - e.touches[1].screenX,
      )
      this.singleTouchStart = null
      this.lastSingleTouch = null
    } else if (e.touches.length === 1) {
      e.preventDefault()

      const x = e.touches[0].clientX
      const y = e.touches[0].clientY

      this.lastTouchDistance = null
      this.singleTouchStart = { x: x, y: y, screenY: window.pageYOffset }
      this.lastSingleTouch = { x: x, y: y, screenY: window.pageYOffset }
    }
  }

  handleTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    const { isInteractingWithItem, width, onZoom } = this.props
    if (isInteractingWithItem) {
      e.preventDefault()
      return
    }
    if (this.lastTouchDistance && e.touches.length === 2) {
      e.preventDefault()
      const touchDistance = Math.abs(
        e.touches[0].screenX - e.touches[1].screenX,
      )
      const parentPosition = getParentPosition(e.currentTarget as HTMLElement)
      const xPosition =
        (e.touches[0].screenX + e.touches[1].screenX) / 2 - parentPosition.x
      if (touchDistance !== 0 && this.lastTouchDistance !== 0) {
        onZoom(this.lastTouchDistance / touchDistance, xPosition / width)
        this.lastTouchDistance = touchDistance
      }
    } else if (this.lastSingleTouch && e.touches.length === 1) {
      e.preventDefault()
      const x = e.touches[0].clientX
      const y = e.touches[0].clientY
      const deltaX = x - this.lastSingleTouch.x
      const deltaX0 = x - this.singleTouchStart!.x
      const deltaY0 = y - this.singleTouchStart!.y
      this.lastSingleTouch = { x: x, y: y, screenY: window.pageYOffset }
      const moveX = Math.abs(deltaX0) * 3 > Math.abs(deltaY0)
      const moveY = Math.abs(deltaY0) * 3 > Math.abs(deltaX0)
      if (deltaX !== 0 && moveX) {
        this.props.onScroll(this.scrollComponent!.scrollLeft - deltaX)
      }
      if (moveY) {
        window.scrollTo(
          window.pageXOffset,
          this.singleTouchStart!.screenY - deltaY0,
        )
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

  componentWillUnmount() {
    if (this.scrollComponent) {
      this.scrollComponent.removeEventListener('wheel', this.handleWheel)
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
        ref={this.refHandler}
        data-testid="scroll-element"
        className="rct-scroll"
        style={scrollComponentStyle}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onScroll={this.handleScroll}
      >
        {children}
      </div>
    )
  }
}

export default ScrollElement
