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
    unit: PropTypes.string.isRequired,
    timeSteps: PropTypes.object.isRequired,
    //Timeline context
    visibleTimeStart: PropTypes.number.isRequired,
    visibleTimeEnd: PropTypes.number.isRequired,
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    showPeriod: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
    const newHeader = this.getNewHeader(props)
    const subscribers = props.subscribeHeader(newHeader)
    this.unsubscribe = subscribers.unsubscribeHeader
    this.resubscribe = subscribers.resubscribeHeader
  }

  getHeaderIntervals = ({
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
    unit,
    timeSteps,
    showPeriod,
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
        const labelWidth = Math.round(
          (endTime.valueOf() - startTime.valueOf()) * ratio
        )
        const leftCorrect = firstOfType ? 1 : 0
        const headerItemProvided = {
          style: {
            left: left - leftCorrect,
            width: labelWidth,
            position: 'absolute'
            // height:
            //   unit === 'year'
            //     ? headerLabelGroupHeight + headerLabelHeight
            //     : headerLabelHeight,
            // lineHeight:
            //   unit === 'year'
            //     ? headerLabelGroupHeight + headerLabelHeight
            //     : headerLabelHeight,
            // fontSize: `${
            //   labelWidth > 30 ? '14' : labelWidth > 20 ? '12' : '10'
            // }px`
          }
          //   onClick: () => this.handlePeriodClick(startTime, unit)
        }
        intervals.push({
          startTime,
          endTime,
          provided: headerItemProvided,
          showPeriod: showPeriod,
          intervalContext: {intervalWidth: labelWidth}
        })
      }
    )
    return intervals
  }

  getNewHeader({
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
    unit,
    timeSteps,
    showPeriod,
    children,
  }) {
    const provided = {
      style: {
        position: 'relative'
      }
    }
    const newHeader = {
      renderer: children,
      props: {
        provided,
        intervals: this.getHeaderIntervals({
          canvasTimeStart,
          canvasTimeEnd,
          canvasWidth,
          unit,
          timeSteps,
          showPeriod,
        })
      }
    }
    return newHeader
  }

  componentWillReceiveProps(nextProps) {
    //TODO: optimize calls to getNewHeaders for visable start and end
    if (
      this.props.children !== nextProps.children ||
      this.props.unit !== nextProps.unit ||
      this.props.timeSteps !== nextProps.timeSteps ||
      this.props.canvasTimeStart !== nextProps.canvasTimeStart ||
      this.props.canvasTimeEnd !== nextProps.canvasTimeEnd ||
      this.props.canvasWidth !== nextProps.canvasWidth
    ) {
      this.resubscribe(this.getNewHeader(nextProps))
    }
  }

  render() {
    return null
  }
}

const CustomHeaderWrapper = ({ children, unit, }) => (
  <TimelineStateConsumer>
    {({ getTimelineState, showPeriod }) => {
      const timelineState = getTimelineState()
      return (
        <TimelineHeadersConsumer>
          {({ subscribeCalendarHeader, timeSteps }) => (
            <CustomHeader
              subscribeHeader={subscribeCalendarHeader}
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
  unit: PropTypes.string,
}

export default CustomHeaderWrapper
