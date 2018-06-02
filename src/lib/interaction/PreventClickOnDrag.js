import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PreventClickOnDrag extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired,
    clickTolerance: PropTypes.number.isRequired
  }

  handleMouseDown = evt => {
    this.originClickX = evt.clientX
  }

  handleMouseUp = evt => {
    if (Math.abs(this.originClickX - evt.clientX) > this.props.clickTolerance) {
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
    const childElement = React.Children.only(this.props.children)
    return React.cloneElement(childElement, {
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onClick: this.handleClick
    })
  }
}

export default PreventClickOnDrag
