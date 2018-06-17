import React from 'react'
import PropTypes from 'prop-types'
import createReactContext from 'create-react-context'

/* this context will hold all information regarding timeline state:
  1. timeline width
  2. visible time start and end
  3. canvas time start and end
  4. helpers for calculating left offset of items (and really...anything)
*/

/* eslint-disable no-console */
const defaultContextState = {
  getTimelineContext: () => {
    console.warn('"getTimelineContext" default func is being used')
  },
  getLeftOffsetFromDate: () => {
    console.warn('"getLeftOffsetFromDate" default func is being used')
  }
}
/* eslint-enable */

const { Consumer, Provider } = createReactContext(defaultContextState)

export class TimelineStateProvider extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  getTimelineContext = () => {
    throw new Error('getTimelineContext not implemented')
  }

  getLeftOffsetFromDate = date => {
    return date
  }

  state = {
    timelineContext: {
      getTimelineContext: this.getTimelineContext,
      getLeftOffsetFromDate: this.getLeftOffsetFromDate
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
