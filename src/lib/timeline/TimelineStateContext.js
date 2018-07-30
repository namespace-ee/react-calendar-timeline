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
  }
}
/* eslint-enable */

const { Consumer, Provider } = createReactContext(defaultContextState)

// TODO: move into utility function
const getLeftOffsetFromDateImpl = (date, timelineState) => {
  const { canvasTimeStart, canvasTimeEnd, canvasWidth } = timelineState
  return calculateXPositionForTime(
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
    date
  )
}

const getDateFromLeftOffsetPosition = (leftOffset, timelineState) => {
  const { canvasTimeStart, canvasTimeEnd, canvasWidth } = timelineState
  return calculateTimeForXPosition(
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
    leftOffset
  )
}

export class TimelineStateProvider extends React.Component {
  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    children: PropTypes.element.isRequired,
    visibleTimeStart: PropTypes.number.isRequired,
    visibleTimeEnd: PropTypes.number.isRequired,
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired
    // visibleWidth: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      timelineContext: {
        getTimelineState: this.getTimelineState,
        getLeftOffsetFromDate: this.getLeftOffsetFromDate,
        getDateFromLeftOffsetPosition: this.getDateFromLeftOffsetPosition
      }
    }
  }

  getTimelineState = () => {
    return this.state.timelineState // REVIEW: return copy or object.freeze?
  }

  getLeftOffsetFromDate = date => {
    return getLeftOffsetFromDateImpl(date, this.props)
  }

  getDateFromLeftOffsetPosition = leftOffset => {
    return getDateFromLeftOffsetPosition(leftOffset, this.props)
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
