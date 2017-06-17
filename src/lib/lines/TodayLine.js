import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class TodayLine extends Component {
  static propTypes = {
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    lineHeight: PropTypes.number.isRequired,
    lineCount: PropTypes.number.isRequired
  }

  static defaultProps = {
  }

  // TODO: should currentTime come from a prop? probably...?
  render () {
    let currentTime = new Date().getTime()

    if (currentTime > this.props.canvasTimeStart && currentTime < this.props.canvasTimeEnd) {
      const ratio = this.props.canvasWidth / (this.props.canvasTimeEnd - this.props.canvasTimeStart)
      const left = Math.round((currentTime - this.props.canvasTimeStart) * ratio)
      const top = this.props.headerHeight
      const height = this.props.height - this.props.headerHeight
      const styles = {
        top: `${top}px`,
        left: `${left}px`,
        height: `${height}px`
      }

      return <div className='rct-today' style={styles} />
    } else {
      return <div />
    }
  }
}
