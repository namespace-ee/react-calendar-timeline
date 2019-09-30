import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { iterateTimes } from '../utility/calendar'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'
import { ColumnsConsumer } from './ColumnsContext'

export class Columns extends Component {
  static propTypes = {
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    lineCount: PropTypes.number.isRequired,
    minUnit: PropTypes.string.isRequired,
    timeSteps: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    verticalLineClassNamesForTime: PropTypes.func,
    getLeftOffsetFromDate: PropTypes.func.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return !(
      nextProps.canvasTimeStart === this.props.canvasTimeStart &&
      nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
      nextProps.lineCount === this.props.lineCount &&
      nextProps.minUnit === this.props.minUnit &&
      nextProps.timeSteps === this.props.timeSteps &&
      nextProps.height === this.props.height &&
      nextProps.verticalLineClassNamesForTime ===
        this.props.verticalLineClassNamesForTime
    )
  }

  render() {
    const {
      canvasTimeStart,
      canvasTimeEnd,
      minUnit,
      timeSteps,
      height,
      verticalLineClassNamesForTime,
      getLeftOffsetFromDate
    } = this.props

    let lines = []

    iterateTimes(
      canvasTimeStart,
      canvasTimeEnd,
      minUnit,
      timeSteps,
      (time, nextTime) => {
        const minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit)
        const firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0)

        let classNamesForTime = []
        if (verticalLineClassNamesForTime) {
          classNamesForTime = verticalLineClassNamesForTime(
            time.unix() * 1000, // turn into ms, which is what verticalLineClassNamesForTime expects
            nextTime.unix() * 1000 - 1
          )
        }

        // TODO: rename or remove class that has reference to vertical-line
        const classNames =
          'rct-vl' +
          (firstOfType ? ' rct-vl-first' : '') +
          (minUnit === 'day' || minUnit === 'hour' || minUnit === 'minute'
            ? ` rct-day-${time.day()} `
            : '') +
          classNamesForTime.join(' ')

        const left = getLeftOffsetFromDate(time.valueOf())
        const right = getLeftOffsetFromDate(nextTime.valueOf())
        lines.push(
          <div
            key={`line-${time.valueOf()}`}
            className={classNames}
            style={{
              pointerEvents: 'none',
              top: '0px',
              left: `${left}px`,
              width: `${right - left}px`,
              height: `${height}px`
            }}
          />
        )
      }
    )

    return <div className="rct-vertical-lines">{lines}</div>
  }
}

const ColumnsWrapper = () => {
  return (
    <TimelineStateConsumer>
      {({ getLeftOffsetFromDate, getTimelineState }) => {
        const { canvasTimeStart, canvasTimeEnd } = getTimelineState()
        return (
          <ColumnsConsumer>
            {({lineCount, minUnit, timeSteps, height, verticalLineClassNamesForTime}) => (
              <Columns
                getLeftOffsetFromDate={getLeftOffsetFromDate}
                canvasTimeStart={canvasTimeStart}
                canvasTimeEnd={canvasTimeEnd}
                lineCount={lineCount}
                minUnit={minUnit}
                timeSteps={timeSteps}
                height={height}
                verticalLineClassNamesForTime={verticalLineClassNamesForTime}
              />
            )}
          </ColumnsConsumer>
        )
      }}
    </TimelineStateConsumer>
  )
}

ColumnsWrapper.propTypes = {}

export default ColumnsWrapper
