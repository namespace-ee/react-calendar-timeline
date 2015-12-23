import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'

import { iterateTimes } from '../utils.js'

export default class VerticalLines extends Component {
  constructor (props) {
    super(props)
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  render () {
    const originX = this.props.originX
    const maxX = this.props.maxX
    const minUnit = this.props.minUnit
    const ratio = this.props.canvasWidth / (maxX - originX)
    const lineCount = this.props.lineCount
    const lineHeight = this.props.lineHeight

    let lines = []

    iterateTimes(originX, maxX, minUnit, (time, nextTime) => {
      const left = Math.round((time.valueOf() - originX) * ratio, -2)
      const minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit)
      const firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0)
      const lineWidth = firstOfType ? 2 : 1
      const labelWidth = Math.ceil((nextTime.valueOf() - time.valueOf()) * ratio) - lineWidth
      const color = this.props.borderColor || (firstOfType || labelWidth > 100 ? '#aaa' : '#ccc')
      const leftPush = this.props.fixedHeader === 'fixed' && firstOfType ? -1 : 0
      const background = typeof this.props.dayBackground == 'function' ? this.props.dayBackground(minUnit, time) : (this.props.dayBackground || null)

      lines.push(
        <div key={`line-${time.valueOf()}`}
             style={{
               position: 'absolute',
               top: `${lineHeight * 2}px`,
               left: `${left + leftPush}px`,
               width: `${labelWidth}px`,
               height: `${lineCount * lineHeight}px`,
               borderLeft: `${lineWidth}px solid ${color}`,
               background: background
             }} />)
    })

    return (
      <div>
        {lines}
      </div>
    )
  }
}

VerticalLines.propTypes = {
  originX: React.PropTypes.number.isRequired,
  maxX: React.PropTypes.number.isRequired,
  canvasWidth: React.PropTypes.number.isRequired,
  lineHeight: React.PropTypes.number.isRequired,
  lineCount: React.PropTypes.number.isRequired,
  minUnit: React.PropTypes.string.isRequired,
  fixedHeader: React.PropTypes.string.isRequired,
  dayBackground: React.PropTypes.func,
  borderColor: React.PropTypes.string
}
VerticalLines.defaultProps = {
  fixedHeader: 'none',
  dayBackground: null
}
