import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getParentPosition } from '../utility/dom-helpers'

class ScrollElement extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    clickTolerance: PropTypes.number.isRequired,
    onScrollAreaClick: PropTypes.func.isRequired,
    onWheelZoom: PropTypes.func.isRequired,
    onScroll: PropTypes.func.isRequired,
    traditionalZoom: PropTypes.bool.isRequired,
    scrollRef: PropTypes.func.isRequired,
    isInteractingWithItem: PropTypes.bool.isRequired
  }

  constructor() {
    super()
    this.state = {
      isDragging: false
    }
  }

  refHandler = el => {
    this.scrollComponent = el
    this.props.scrollRef(el)
  }

  // TODO: fix this where this is called when scrollLeft is set
  handleScroll = () => {
    const scrollComponent = this.scrollComponent

    const scrollX = scrollComponent.scrollLeft

    // move the virtual canvas if needed
    // if scrollX is less...i dont know how to explain the logic here
    if (scrollX < this.state.width * 0.5) {
      scrollComponent.scrollLeft += this.state.width
    }
    if (scrollX > this.state.width * 1.5) {
      scrollComponent.scrollLeft -= this.state.width
    }
    this.props.onScroll(scrollX)
  }

  handleWheel = e => {
    const { traditionalZoom } = this.props

    e.preventDefault()

    // zoom in the time dimension
    if (e.ctrlKey || e.metaKey || e.altKey) {
      const parentPosition = getParentPosition(e.currentTarget)
      const xPosition = e.clientX - parentPosition.x

      const speed = e.ctrlKey ? 10 : e.metaKey ? 3 : 1

      // convert vertical zoom to horiziontal
      this.props.onWheelZoom(speed, xPosition, e.deltaY)
    } else if (e.shiftKey) {
      const scrollComponent = this.scrollComponent
      scrollComponent.scrollLeft += e.deltaY

      // no modifier pressed? we prevented the default event, so scroll or zoom as needed
    } else {
      if (e.deltaX !== 0) {
        if (!traditionalZoom) {
          this.scrollComponent.scrollLeft += e.deltaX
        }
      }
      if (e.deltaY !== 0) {
        window.scrollTo(window.pageXOffset, window.pageYOffset + e.deltaY)
        if (traditionalZoom) {
          const parentPosition = getParentPosition(e.currentTarget)
          const xPosition = e.clientX - parentPosition.x

          this.props.onWheelZoom(10, xPosition, e.deltaY)
        }
      }
    }
  }

  handleMouseDown = e => {
    // TODO: what about header click
    if (e.button === 0) {
      this.dragStartPosition = e.pageX
      this.dragLastPosition = e.pageX
      this.setState({
        isDragging: true
      })
    }
  }

  handleMouseMove = e => {
    //why is interacting with item important?
    if (this.state.isDragging && !this.props.isInteractingWithItem) {
      this.scrollComponent.scrollLeft += this.dragLastPosition - e.pageX
      this.dragLastPosition = e.pageX
    }
  }

  handleMouseUp = e => {
    if (
      Math.abs(this.dragStartPosition - e.pageX) <= this.props.clickTolerance
    ) {
      this.props.onScrollAreaClick(e)
    }

    this.dragStartPosition = null
    this.dragLastPosition = null

    this.setState({
      isDragging: false
    })
  }

  handleMouseLeave = () => {
    this.dragStartPosition = null
    this.dragLastPosition = null
    this.setState({
      isDragging: false
    })
  }

  handleTouchStart = e => {
    if (e.touches.length === 2) {
      e.preventDefault()

      this.lastTouchDistance = Math.abs(
        e.touches[0].screenX - e.touches[1].screenX
      )
      this.singleTouchStart = null
      this.lastSingleTouch = null
    } else if (e.touches.length === 1) {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      this.lastTouchDistance = null
      this.singleTouchStart = { x: x, y: y, screenY: window.pageYOffset }
      this.lastSingleTouch = { x: x, y: y, screenY: window.pageYOffset }
    }
  }

  handleTouchMove = e => {
    const { isInteractingWithItem, width } = this.props
    if (isInteractingWithItem) {
      e.preventDefault()
      return
    }
    if (this.lastTouchDistance && e.touches.length === 2) {
      e.preventDefault()

      let touchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX)

      let parentPosition = getParentPosition(e.currentTarget)
      let xPosition =
        (e.touches[0].screenX + e.touches[1].screenX) / 2 - parentPosition.x

      if (touchDistance !== 0 && this.lastTouchDistance !== 0) {
        this.changeZoom(
          this.lastTouchDistance / touchDistance,
          xPosition / width
        )
        this.lastTouchDistance = touchDistance
      }
    } else if (this.lastSingleTouch && e.touches.length === 1) {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY

      let deltaX = x - this.lastSingleTouch.x

      let deltaX0 = x - this.singleTouchStart.x
      let deltaY0 = y - this.singleTouchStart.y

      this.lastSingleTouch = { x: x, y: y }

      let moveX = Math.abs(deltaX0) * 3 > Math.abs(deltaY0)
      let moveY = Math.abs(deltaY0) * 3 > Math.abs(deltaX0)

      if (deltaX !== 0 && moveX) {
        this.scrollComponent.scrollLeft -= deltaX
      }
      if (moveY) {
        window.scrollTo(
          window.pageXOffset,
          this.singleTouchStart.screenY - deltaY0
        )
      }
    }
  }

  handleTouchEnd = e => {
    if (this.lastTouchDistance) {
      e.preventDefault()

      this.lastTouchDistance = null
    }
    if (this.lastSingleTouch) {
      e.preventDefault()

      this.lastSingleTouch = null
      this.singleTouchStart = null
    }
  }

  render() {
    const { width, height, children } = this.props
    const { isDragging } = this.state

    const scrollComponentStyle = {
      width: `${width}px`,
      height: `${height + 20}px`,
      cursor: isDragging ? 'move' : 'default'
    }

    return (
      <div
        ref={this.refHandler}
        data-test-id="scroll-element"
        className="rct-scroll"
        style={scrollComponentStyle}
        onScroll={this.handleScroll}
        onWheel={this.handleWheel}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        {children}
      </div>
    )
  }
}

export default ScrollElement
