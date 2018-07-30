import React from 'react'
import PropTypes from 'prop-types'
import { TimelineHeadersConsumer } from './HeadersContext'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'
import { iterateTimes } from '../utility/calendar'

export class CustomHeader extends React.Component {
  static propTypes = {
    //component props
    children: PropTypes.func.isRequired,
    unit: PropTypes.string.isRequired,
    timeSteps: PropTypes.object.isRequired,
    //Timeline context
    visibleTimeStart: PropTypes.number.isRequired,
    visibleTimeEnd: PropTypes.number.isRequired,
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    showPeriod: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    const {
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      unit,
      timeSteps,
      showPeriod
    } = props
    const intervals = this.getHeaderIntervals({
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      unit,
      timeSteps,
      showPeriod
    })
    this.state = {
      intervals
    }
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.canvasTimeStart !== this.props.canvasTimeStart ||
      nextProps.canvasTimeEnd !== this.props.canvasTimeEnd ||
      nextProps.canvasWidth !== this.props.canvasWidth ||
      nextProps.unit !== this.props.unit ||
      nextProps.timeSteps !== this.props.timeSteps ||
      nextProps.showPeriod !== this.props.showPeriod
    ) {
      return true
    }
    return false
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.canvasTimeStart !== this.props.canvasTimeStart ||
      nextProps.canvasTimeEnd !== this.props.canvasTimeEnd ||
      nextProps.canvasWidth !== this.props.canvasWidth ||
      nextProps.unit !== this.props.unit ||
      nextProps.timeSteps !== this.props.timeSteps ||
      nextProps.showPeriod !== this.props.showPeriod
    ) {
      
      const {
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth,
        unit,
        timeSteps,
        showPeriod
      } = nextProps
      const intervals = this.getHeaderIntervals({
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth,
        unit,
        timeSteps,
        showPeriod
      })
      this.setState({ intervals })
    }
  }

  getHeaderIntervals = ({
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
    unit,
    timeSteps,
    showPeriod
  }) => {
    const ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart)
    const intervals = []
    iterateTimes(
      canvasTimeStart,
      canvasTimeEnd,
      unit,
      timeSteps,
      (startTime, endTime) => {
        const left = Math.round((startTime.valueOf() - canvasTimeStart) * ratio)
        const unitValue = startTime.get(unit === 'day' ? 'date' : unit)
        const firstOfType = unitValue === (unit === 'day' ? 1 : 0)
        // console.log('new', [startTime.format('HH:mm'), endTime.format('HH:mm')])
        const labelWidth = Math.ceil(
          (endTime.valueOf() - startTime.valueOf()) * ratio
        )
        const leftCorrect = firstOfType ? 1 : 0
        console.log(leftCorrect, unitValue)
        const headerItemProvided = {
          style: {
            left: left - leftCorrect,
            width: labelWidth,
            position: 'absolute'
          }
        }
        intervals.push({
          startTime,
          endTime,
          provided: headerItemProvided,
          showPeriod: showPeriod,
          intervalContext: { intervalWidth: labelWidth }
        })
      }
    )
    return intervals
  }

  rootElementProvided = {
    style: {
      position: 'relative'
    }
  }

  getStateAndHelpers(props) {
    const {
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      unit,
      timeSteps,
      showPeriod
    } = props
    //TODO: only evaluate on changing params
    return {
      provided: this.rootElementProvided,
      intervals: this.state.intervals
    }
  }

  render() {
    const props = this.getStateAndHelpers(this.props)
    return this.props.children(props)
  }
}

const CustomHeaderWrapper = ({ children, unit }) => (
  <TimelineStateConsumer>
    {({ getTimelineState, showPeriod }) => {
      const timelineState = getTimelineState()
      return (
        <TimelineHeadersConsumer>
          {({ timeSteps }) => (
            <CustomHeader
              children={children}
              timeSteps={timeSteps}
              showPeriod={showPeriod}
              unit={unit ? unit : timelineState.timelineUnit}
              {...timelineState}
            />
          )}
        </TimelineHeadersConsumer>
      )
    }}
  </TimelineStateConsumer>
)

CustomHeaderWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  unit: PropTypes.string
}

export default CustomHeaderWrapper
