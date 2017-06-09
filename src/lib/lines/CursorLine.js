import React, { Component } from 'react'

export default class CursorLine extends Component {
  static propTypes = {
    canvasTimeStart: React.PropTypes.number.isRequired,
    canvasTimeEnd: React.PropTypes.number.isRequired,
    canvasWidth: React.PropTypes.number.isRequired,
    lineHeight: React.PropTypes.number.isRequired,
    lineCount: React.PropTypes.number.isRequired
  }

  render () {
    const { cursorTime } = this.props

    if (cursorTime > this.props.canvasTimeStart && cursorTime < this.props.canvasTimeEnd) {
      const ratio = this.props.canvasWidth / (this.props.canvasTimeEnd - this.props.canvasTimeStart)
      const left = Math.round((cursorTime - this.props.canvasTimeStart) * ratio)
      const top = this.props.headerHeight
      const height = this.props.height - this.props.headerHeight
      const styles = {
        top: `${top}px`,
        left: `${left}px`,
        height: `${height}px`
      }

      return <div className='rct-cursor-line' style={styles} />
    } else {
      return <div />
    }
  }
}
