import React from 'react'
import PropTypes from 'prop-types'
import { TimelineHeadersConsumer } from './HeadersContext'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'
import { iterateTimes } from '../utility/calendar'

export class CustomHeader extends React.PureComponent {
  static propTypes = {
    //component props
    children: PropTypes.func.isRequired,
    //Headers context
    subscribeHeader: PropTypes.func.isRequired,
    minUnit: PropTypes.string.isRequired,
    maxUnit: PropTypes.string.isRequired,
    timeSteps: PropTypes.object.isRequired,
    //Timeline context
    visibleTimeStart: PropTypes.number.isRequired,
    visibleTimeEnd: PropTypes.number.isRequired,
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired
  }
  constructor(props) {
    super(props)
    const provided = {}
    this.unsubscribe = props.subscribeHeader({
      renderer: props.children,
      props: {
        provided,
        intervals: this.getHeaderIntervals()
      }
    })
  }

  getHeaderIntervals = () => {
    const ratio =
      this.props.canvasWidth /
      (this.props.canvasTimeEnd - this.props.canvasTimeStart)
    const { canvasTimeStart, canvasTimeEnd, minUnit, timeSteps } = this.props
    const intervals = []
    iterateTimes(
      canvasTimeStart,
      canvasTimeEnd,
      minUnit,
      timeSteps,
      (startTime, endTime) => {
        const left = Math.round((startTime.valueOf() - canvasTimeStart) * ratio)
        const minUnitValue = startTime.get(minUnit === 'day' ? 'date' : minUnit)
        const firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0)
        const labelWidth = Math.round(
          (endTime.valueOf() - startTime.valueOf()) * ratio
        )
        const leftCorrect = firstOfType ? 1 : 0
        const headerItemProvided = {
          style: {
            left: left - leftCorrect,
            width: labelWidth,
            position: "absolute",
            // height:
            //   minUnit === 'year'
            //     ? headerLabelGroupHeight + headerLabelHeight
            //     : headerLabelHeight,
            // lineHeight:
            //   minUnit === 'year'
            //     ? headerLabelGroupHeight + headerLabelHeight
            //     : headerLabelHeight,
            // fontSize: `${
            //   labelWidth > 30 ? '14' : labelWidth > 20 ? '12' : '10'
            // }px`
          }
          //   onClick: () => this.handlePeriodClick(startTime, minUnit)
        }
        intervals.push({
          startTime,
          endTime,
          provided: headerItemProvided,
        })
      }
    )
    return intervals
  }

  render() {
    return null
  }
}

const CustomHeaderWrapper = ({ children }) => (
  <TimelineStateConsumer>
    {({ getTimelineState }) => {
      const timelineState = getTimelineState()
      return (
        <TimelineHeadersConsumer>
          {({ subscribeHeader, minUnit, maxUnit, timeSteps }) => (
            <CustomHeader
              minUnit={minUnit}
              maxUnit={maxUnit}
              subscribeHeader={subscribeHeader}
              children={children}
              timeSteps={timeSteps}
              {...timelineState}
            />
          )}
        </TimelineHeadersConsumer>
      )
    }}
  </TimelineStateConsumer>
)

CustomHeaderWrapper.propTypes = {
  children: PropTypes.func.isRequired
}

export default CustomHeaderWrapper
