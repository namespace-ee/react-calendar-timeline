import React from 'react'
import PropTypes from 'prop-types'
import createReactContext from 'create-react-context'
import { calculateXPositionForTime } from '../utility/calendar'

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

export class TimelineStateProvider extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    visibleTimeStart: PropTypes.number.isRequired,
    visibleTimeEnd: PropTypes.number.isRequired,
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    visibleWidth: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)

    const {
      visibleTimeStart,
      visibleTimeEnd,
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      visibleWidth
    } = props

    this.state = {
      timelineContext: {
        getTimelineState: this.getTimelineState,
        getLeftOffsetFromDate: this.getLeftOffsetFromDate
      },
      timelineState: {
        visibleTimeStart,
        visibleTimeEnd,
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth,
        visibleWidth
      }
    }
  }

  getTimelineState = () => {
    return this.state.timelineState // REVIEW: return copy or object.freeze?
  }

  getLeftOffsetFromDate = date => {
    return getLeftOffsetFromDateImpl(date, this.state.timelineState)
  }

  state = {
    timelineContext: {
      getTimelineState: this.getTimelineState,
      getLeftOffsetFromDate: this.getLeftOffsetFromDate
    },
    timelineState: {
      visibleTimeStart: 0,
      visibleTimeEnd: 0,
      canvasTimeStart: 0,
      canvasTimeEnd: 0,
      canvasWidth: 0,
      visibleWidth: 0
    }
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
