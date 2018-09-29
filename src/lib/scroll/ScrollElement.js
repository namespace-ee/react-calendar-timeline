import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getParentPosition } from '../utility/dom-helpers'

class ScrollElement extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    traditionalZoom: PropTypes.bool.isRequired,
    scrollRef: PropTypes.func.isRequired,
    isInteractingWithItem: PropTypes.bool.isRequired,
    onZoom: PropTypes.func.isRequired,
    onWheelZoom: PropTypes.func.isRequired,
    onScroll: PropTypes.func.isRequired
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

  handleScroll = () => {
    const scrollX = this.scrollComponent.scrollLeft
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
      // shift+scroll event from a touchpad has deltaY property populated; shift+scroll event from a mouse has deltaX
      this.scrollComponent.scrollLeft += e.deltaY || e.deltaX

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
    if (e.button === 0) {
      this.dragStartPosition = e.pageX
      this.dragLastPosition = e.pageX
      this.setState({
        isDragging: true
      })
    }
  }

  handleMouseMove = e => {
    // this.props.onMouseMove(e)
    //why is interacting with item important?
    if (this.state.isDragging && !this.props.isInteractingWithItem) {
      this.scrollComponent.scrollLeft += this.dragLastPosition - e.pageX
      this.dragLastPosition = e.pageX
    }
  }

  handleMouseUp = () => {
    this.dragStartPosition = null
    this.dragLastPosition = null

    this.setState({
      isDragging: false
    })
  }

  handleMouseLeave = () => {
    // this.props.onMouseLeave(e)
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
    const { isInteractingWithItem, width, onZoom } = this.props
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
        onZoom(this.lastTouchDistance / touchDistance, xPosition / width)
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

  handleTouchEnd = () => {
    if (this.lastTouchDistance) {
      this.lastTouchDistance = null
    }
    if (this.lastSingleTouch) {
      this.lastSingleTouch = null
      this.singleTouchStart = null
    }
  }

  render() {
    const { width, height, children } = this.props
    const { isDragging } = this.state

    const scrollComponentStyle = {
      width: `${width}px`,
      height: `${height + 20}px`, //20px to push the scroll element down off screen...?
      cursor: isDragging ? 'move' : 'default',
      position: 'relative'
    }

    return (
      <div
        ref={this.refHandler}
        data-testid="scroll-element"
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
