import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getParentPosition } from './utility/dom-helpers'

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
      this.setState({
        isDragging: true,
        dragStartPosition: e.pageX,
        dragLastPosition: e.pageX
      })
    }
  }

  handleMouseMove = e => {
    //why is interacting with item important?
    if (this.state.isDragging && !this.props.isInteractingWithItem) {
      this.scrollComponent.scrollLeft += this.state.dragLastPosition - e.pageX
      this.setState({ dragLastPosition: e.pageX })
    }
  }

  handleMouseUp = e => {
    const { dragStartPosition } = this.state

    if (Math.abs(dragStartPosition - e.pageX) <= this.props.clickTolerance) {
      this.props.onScrollAreaClick(e)
    }

    this.setState({
      isDragging: false,
      dragStartPosition: null,
      dragLastPosition: null
    })
  }

  handleMouseLeave = () => {
    this.setState({
      isDragging: false,
      dragStartPosition: null,
      dragLastPosition: null
    })
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
        className="rct-scroll"
        style={scrollComponentStyle}
        onScroll={this.handleScroll}
        onWheel={this.handleWheel}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
      >
        {children}
      </div>
    )
  }
}

export default ScrollElement
