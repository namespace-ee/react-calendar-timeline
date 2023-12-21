import React, { Component, MouseEventHandler } from 'react'

type Props = {
  children: React.ReactElement
  onClick: MouseEventHandler<HTMLElement>
  clickTolerance?: number
}
class PreventClickOnDrag extends Component<Props> {
  handleMouseDown: MouseEventHandler<HTMLElement> = (evt) => {
    this.originClickX = evt.clientX
  }

  handleMouseUp: MouseEventHandler<HTMLElement> = (evt) => {
    if (
      this.props.clickTolerance !== undefined &&
      Math.abs(this.originClickX - evt.clientX) > this.props.clickTolerance
    ) {
      this.cancelClick = true
    }
  }

  handleClick: MouseEventHandler<HTMLElement> = (evt) => {
    if (!this.cancelClick) {
      this.props.onClick(evt)
    }

    this.cancelClick = false
    this.originClickX = null
  }
  private originClickX: any
  private cancelClick: boolean = false

  render() {
    const childElement = React.Children.only(this.props.children)
    return React.cloneElement(childElement, {
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onClick: this.handleClick,
    })
  }
}

export default PreventClickOnDrag
