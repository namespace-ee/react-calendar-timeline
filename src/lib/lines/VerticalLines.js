import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { iterateTimes } from '../utility/calendar'

export default class VerticalLines extends Component {
  static propTypes = {
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    lineHeight: PropTypes.number.isRequired,
    lineCount: PropTypes.number.isRequired,
    minUnit: PropTypes.string.isRequired,
    timeSteps: PropTypes.object.isRequired,
    fixedHeader: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    headerHeight: PropTypes.number.isRequired
  }

  static defaultProps = {
    fixedHeader: 'sticky',
    dayBackground: null
  }

  shouldComponentUpdate(nextProps) {
    return !(
      nextProps.canvasTimeStart === this.props.canvasTimeStart &&
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

  render() {
    const {
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      minUnit,
      timeSteps,
      height,
      headerHeight
    } = this.props
    const ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart)

    let lines = []

    iterateTimes(
      canvasTimeStart,
      canvasTimeEnd,
      minUnit,
      timeSteps,
      (time, nextTime) => {
        const left = Math.round((time.valueOf() - canvasTimeStart) * ratio, -2)
        const minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit)
        const firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0)
        const lineWidth = firstOfType ? 2 : 1
        const labelWidth =
          Math.ceil((nextTime.valueOf() - time.valueOf()) * ratio) - lineWidth
        const leftPush =
          this.props.fixedHeader !== 'none' && firstOfType ? -1 : 0

        const classNames =
          'rct-vl' +
          (firstOfType ? ' rct-vl-first' : '') +
          (minUnit === 'day' || minUnit === 'hour' || minUnit === 'minute'
            ? ` rct-day-${time.day()}`
            : '')

        lines.push(
          <div
            key={`line-${time.valueOf()}`}
            className={classNames}
            style={{
              transform: `translate3d(${left + leftPush}px, ${headerHeight}px, 0)`,
              width: `${labelWidth}px`,
              height: `${height - headerHeight}px`
            }}
          />
        )
      }
    )

    return <div className="rct-vertical-lines">{lines}</div>
  }
}
