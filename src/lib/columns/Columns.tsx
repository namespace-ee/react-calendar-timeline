import React, { Component, FC } from 'react'

import { isCustomUnit, iterateTimes } from '../utility/calendar'
import dayjs, { UnitType } from 'dayjs'
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
      nextProps.verticalLineClassNamesForTime === this.props.verticalLineClassNamesForTime
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
    } = this.props
    //const ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart)

    const lines: React.JSX.Element[] = []

    iterateTimes(canvasTimeStart, canvasTimeEnd, minUnit, timeSteps, (time: number, nextTime: number) => {
      // TODO: bypasses first line for custom timeline steps, missing slight css perk
      let minUnitValue = 0
      let firstOfType = false
      let originalCheck = false
      if (!isCustomUnit(minUnit)) {
        const originalMinUnit = minUnit as UnitType
        minUnitValue = dayjs(time).get(originalMinUnit === 'day' ? 'date' : originalMinUnit)
        firstOfType = minUnitValue === (originalMinUnit === 'day' ? 1 : 0)
        originalCheck = originalMinUnit === 'day' || originalMinUnit === 'hour' || originalMinUnit === 'minute'
      }

      let classNamesForTime: string[] = []
      if (verticalLineClassNamesForTime) {
        classNamesForTime = verticalLineClassNamesForTime(
          time * 1000, // turn into ms, which is what verticalLineClassNamesForTime expects
          nextTime * 1000 - 1,
        )
      }

      // TODO: rename or remove class that has reference to vertical-line
      const classNames =
        'rct-vl' +
        (firstOfType ? ' rct-vl-first' : '') +
        (originalCheck ? ` rct-day-${dayjs(time).day()} ` : ' ') +
        classNamesForTime.join(' ')

      const left = getLeftOffsetFromDate(time)
      const right = getLeftOffsetFromDate(nextTime)
      lines.push(
        <div
          key={`line-${time}`}
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
    })

    return <div className="rct-vertical-lines">{lines}</div>
  }
}

const ColumnsWrapper: FC<WrapperColumnsProps> = ({ ...props }) => {
  return (
    <TimelineStateConsumer>
      {({ getLeftOffsetFromDate }) => <Columns getLeftOffsetFromDate={getLeftOffsetFromDate} {...props} />}
    </TimelineStateConsumer>
  )
}

export default ColumnsWrapper
