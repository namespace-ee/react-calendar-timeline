import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class TodayLine extends Component {
  static propTypes = {
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }

  static defaultProps = {}

  // TODO: should currentTime come from a prop? probably...?
  render() {
    let currentTime = new Date().getTime()

    if (
      currentTime > this.props.canvasTimeStart &&
      currentTime < this.props.canvasTimeEnd
    ) {
      const ratio =
        this.props.canvasWidth /
        (this.props.canvasTimeEnd - this.props.canvasTimeStart)
      const left = Math.round(
        (currentTime - this.props.canvasTimeStart) * ratio
      )
      const height = this.props.height
      const styles = {
        top: '0px',
        left: `${left}px`,
        height: `${height}px`
      }

      return <div className="rct-today" style={styles} />
    } else {
      return <div />
    }
  }
}
