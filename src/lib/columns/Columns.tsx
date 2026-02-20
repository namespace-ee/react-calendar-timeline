import React, { Component, FC } from 'react'

import { iterateTimes } from '../utility/calendar'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'
import { TimelineTimeSteps } from '../types/main'

type WrapperColumnsProps = {
  canvasTimeStart: number
  canvasTimeEnd: number
  canvasWidth: number
  lineCount: number
  minUnit: keyof TimelineTimeSteps
  timeSteps: TimelineTimeSteps
  height: number
  verticalLineClassNamesForTime?: (a: number, b: number) => string[]
}

type ColumnsProps = WrapperColumnsProps & {
  getLeftOffsetFromDate: (time: number) => number
  timezone?: string
}

class Columns extends Component<ColumnsProps> {
  shouldComponentUpdate(nextProps: ColumnsProps) {
    return !(
      nextProps.canvasTimeStart === this.props.canvasTimeStart &&
      nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
      nextProps.canvasWidth === this.props.canvasWidth &&
      nextProps.lineCount === this.props.lineCount &&
      nextProps.minUnit === this.props.minUnit &&
      nextProps.timeSteps === this.props.timeSteps &&
      nextProps.height === this.props.height &&
      nextProps.verticalLineClassNamesForTime === this.props.verticalLineClassNamesForTime &&
      nextProps.timezone === this.props.timezone
    )
  }

  render() {
    const {
      canvasTimeStart,
      canvasTimeEnd,
      // canvasWidth,
      minUnit,
      timeSteps,
      height,
      verticalLineClassNamesForTime,
      getLeftOffsetFromDate,
      timezone,
    } = this.props
    //const ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart)

    const lines: React.JSX.Element[] = []

    iterateTimes(canvasTimeStart, canvasTimeEnd, minUnit, timeSteps, (time, nextTime) => {
      const minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit)
      const firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0)

      let classNamesForTime: string[] = []
      if (verticalLineClassNamesForTime) {
        classNamesForTime = verticalLineClassNamesForTime(
          time.unix() * 1000, // turn into ms, which is what verticalLineClassNamesForTime expects
          nextTime.unix() * 1000 - 1,
        )
      }

      // TODO: rename or remove class that has reference to vertical-line
      const classNames =
        'rct-vl' +
        (firstOfType ? ' rct-vl-first' : '') +
        (minUnit === 'day' || minUnit === 'hour' || minUnit === 'minute' ? ` rct-day-${time.day()} ` : ' ') +
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
            height: `${height}px`,
          }}
        />,
      )
    }, timezone)

    return <div className="rct-vertical-lines">{lines}</div>
  }
}

const ColumnsWrapper: FC<WrapperColumnsProps> = ({ ...props }) => {
  return (
    <TimelineStateConsumer>
      {({ getLeftOffsetFromDate, timezone }) => <Columns getLeftOffsetFromDate={getLeftOffsetFromDate} timezone={timezone} {...props} />}
    </TimelineStateConsumer>
  )
}

export default ColumnsWrapper
