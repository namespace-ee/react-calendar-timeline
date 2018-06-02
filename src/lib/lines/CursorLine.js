import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class CursorLine extends Component {
  static propTypes = {
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    cursorTime: PropTypes.number,
    height: PropTypes.number.isRequired
  }

  render() {
    const { cursorTime } = this.props

    if (
      cursorTime > this.props.canvasTimeStart &&
      cursorTime < this.props.canvasTimeEnd
    ) {
      const ratio =
        this.props.canvasWidth /
        (this.props.canvasTimeEnd - this.props.canvasTimeStart)
      const left = Math.round((cursorTime - this.props.canvasTimeStart) * ratio)
      const height = this.props.height
      const styles = {
        top: '0px',
        left: `${left}px`,
        height: `${height}px`,
        pointerEvents: 'none'
      }

      return <div className="rct-cursor-line" style={styles} />
    } else {
      return <div />
    }
  }
}
