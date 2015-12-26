import React, { Component } from 'react'

export default class TodayLine extends Component {
  constructor (props) {
    super(props)
  }

  // TODO: should currentTime come from a prop? probably...?
  render () {
    let currentTime = new Date().getTime()

    if (currentTime > this.props.originX && currentTime < this.props.maxX) {
      const ratio = this.props.canvasWidth / (this.props.maxX - this.props.originX)
      const left = Math.round((currentTime - this.props.originX) * ratio)
      const top = this.props.lineHeight * 2
      const height = this.props.lineCount * this.props.lineHeight
      const styles = {
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        width: '2px',
        height: `${height}px`,
        background: 'red'
      }

      return <div style={styles} />
    } else {
      return <div />
    }
  }
}
TodayLine.propTypes = {
  originX: React.PropTypes.number.isRequired,
  maxX: React.PropTypes.number.isRequired,
  canvasWidth: React.PropTypes.number.isRequired,
  lineHeight: React.PropTypes.number.isRequired,
  lineCount: React.PropTypes.number.isRequired
}
TodayLine.defaultProps = {
}
