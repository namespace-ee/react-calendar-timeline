import React, { Component } from 'react'
import PropTypes from 'prop-types'

const dragThreshold = 10
class PreventClickOnDrag extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired
  }

  handleMouseDown = evt => {
    this.originClickX = evt.clientX
  }

  handleMouseUp = evt => {
    if (Math.abs(this.originClickX - evt.clientX) > dragThreshold) {
      this.cancelClick = true
    }
  }

  handleClick = evt => {
    if (!this.cancelClick) {
      this.props.onClick(evt)
    }

    this.cancelClick = false
    this.originClickX = null
  }

  render() {
    return React.cloneElement(this.props.children, {
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onClick: this.handleClick
    })
  }
}

export default PreventClickOnDrag
