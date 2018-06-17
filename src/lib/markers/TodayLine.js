import React from 'react'
import PropTypes from 'prop-types'
import { TimelineMarkersConsumer } from './TimelineMarkersContext'
import { TimelineMarkerType } from './markerType'

class TodayLine extends React.Component {
  static propTypes = {
    subscribeMarker: PropTypes.func.isRequired
    // other props from user
    // renderer?: (styles, dateTime)
  }

  componentDidMount() {
    this.unsubscribe = this.props.subscribeMarker({
      type: TimelineMarkerType.Today
    })
  }

  componentWillUnmount() {
    if (this.unsubscribe != null) {
      this.unsubscribe()
      this.unsubscribe = null
    }
  }

  render() {
    return null
  }
}

const TodayLineWrapper = props => {
  return (
    <TimelineMarkersConsumer>
      {({ subscribeMarker }) => (
        <TodayLine subscribeMarker={subscribeMarker} {...props} />
      )}
    </TimelineMarkersConsumer>
  )
}

TodayLineWrapper.displayName = 'TodayLineWrapper'

export default TodayLineWrapper
