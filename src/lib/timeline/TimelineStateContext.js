import React from 'react'
import PropTypes from 'prop-types'
import createReactContext from 'create-react-context'
import {
  calculateXPositionForTime,
  calculateTimeForXPosition
} from '../utility/calendar'

/* this context will hold all information regarding timeline state:
  1. timeline width
  2. visible time start and end
  3. canvas time start and end
  4. helpers for calculating left offset of items (and really...anything)
*/

/* eslint-disable no-console */
const defaultContextState = {
  getTimelineState: () => {
    console.warn('"getTimelineState" default func is being used')
  },
  getLeftOffsetFromDate: () => {
    console.warn('"getLeftOffsetFromDate" default func is being used')
  },
  getDateFromLeftOffsetPosition: () => {
    console.warn('"getDateFromLeftOffsetPosition" default func is being used')
  },
  showPeriod: () => {
    console.warn('"showPeriod" default func is being used')
  }
}
/* eslint-enable */

const TimelineStateContext = createReactContext(defaultContextState)

const { Consumer, Provider } = TimelineStateContext

export class TimelineStateProvider extends React.Component {
  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    children: PropTypes.element.isRequired,
    visibleTimeStart: PropTypes.number.isRequired,
    visibleTimeEnd: PropTypes.number.isRequired,
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    showPeriod: PropTypes.func.isRequired,
    timelineUnit: PropTypes.string.isRequired,
    timelineWidth: PropTypes.number.isRequired,
    keys: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      timelineContext: {
        getTimelineState: this.getTimelineState,
        getLeftOffsetFromDate: this.getLeftOffsetFromDate,
        getDateFromLeftOffsetPosition: this.getDateFromLeftOffsetPosition,
        showPeriod: this.props.showPeriod,
      }
    }
  }

  getTimelineState = () => {
    const {
      visibleTimeStart,
      visibleTimeEnd,
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      timelineUnit,
      timelineWidth,
      keys,
    } = this.props
    return {
      visibleTimeStart,
      visibleTimeEnd,
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      timelineUnit,
      timelineWidth,
      keys,
    } // REVIEW,
  }

  getLeftOffsetFromDate = date => {
    const { canvasTimeStart, canvasTimeEnd, canvasWidth } = this.props
    return calculateXPositionForTime(
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      date
    )
  }

  getDateFromLeftOffsetPosition = leftOffset => {
    const { canvasTimeStart, canvasTimeEnd, canvasWidth } = this.props
    return calculateTimeForXPosition(
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      leftOffset
    )
  }

  render() {
    return (
      <Provider value={this.state.timelineContext}>
        {this.props.children}
      </Provider>
    )
  }
}

export const TimelineStateConsumer = Consumer
export default TimelineStateContext;
