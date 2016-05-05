import React, { Component } from 'react'

import { iterateTimes } from '../utils.js'

export default class VerticalLines extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !(nextProps.canvasTimeStart === this.props.canvasTimeStart &&
             nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
             nextProps.canvasWidth === this.props.canvasWidth &&
             nextProps.lineHeight === this.props.lineHeight &&
             nextProps.lineCount === this.props.lineCount &&
             nextProps.minUnit === this.props.minUnit &&
             nextProps.timeSteps === this.props.timeSteps &&
             nextProps.fixedHeader === this.props.fixedHeader &&
             nextProps.height === this.props.height &&
             nextProps.headerHeight === this.props.headerHeight
    )
  }

  render () {
    const { canvasTimeStart, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height, headerHeight } = this.props
    const ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart)

    let lines = []

    iterateTimes(canvasTimeStart, canvasTimeEnd, minUnit, timeSteps, (time, nextTime) => {
      const left = Math.round((time.valueOf() - canvasTimeStart) * ratio, -2)
      const minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit)
      const firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0)
      const lineWidth = firstOfType ? 2 : 1
      const labelWidth = Math.ceil((nextTime.valueOf() - time.valueOf()) * ratio) - lineWidth
      const leftPush = this.props.fixedHeader === 'fixed' && firstOfType ? -1 : 0

      const classNames = 'rct-vl' +
                         (firstOfType ? ' rct-vl-first' : '') +
                         (minUnit === 'day' || minUnit === 'hour' || minUnit === 'minute' ? ` rct-day-${time.day()}` : '')

      lines.push(
        <div key={`line-${time.valueOf()}`}
             className={classNames}
             style={{
               top: `${headerHeight}px`,
               left: `${left + leftPush}px`,
               width: `${labelWidth}px`,
               height: `${height - headerHeight}px`
             }} />)
    })

    return (
      <div className='rct-vertical-lines'>
        {lines}
      </div>
    )
  }
}

VerticalLines.propTypes = {
  canvasTimeStart: React.PropTypes.number.isRequired,
  canvasTimeEnd: React.PropTypes.number.isRequired,
  canvasWidth: React.PropTypes.number.isRequired,
  lineHeight: React.PropTypes.number.isRequired,
  lineCount: React.PropTypes.number.isRequired,
  minUnit: React.PropTypes.string.isRequired,
  timeSteps: React.PropTypes.object.isRequired,
  fixedHeader: React.PropTypes.string.isRequired
}
VerticalLines.defaultProps = {
  fixedHeader: 'none',
  dayBackground: null
}
