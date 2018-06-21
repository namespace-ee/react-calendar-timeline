import React from 'react'
import PropTypes from 'prop-types'
import { TimelineMarkersConsumer } from './TimelineMarkersContext'
import { TimelineMarkerType } from './markerType'

class TodayMarker extends React.Component {
  static propTypes = {
    subscribeMarker: PropTypes.func.isRequired,
    // other props from user
    children: PropTypes.func // custom renderer that accepts ({styles, date})
  }

  componentDidMount() {
    this.unsubscribe = this.props.subscribeMarker({
      type: TimelineMarkerType.Today,
      renderer: this.props.children
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

// TODO: turn into HOC?
const TodayMarkerWrapper = props => {
  return (
    <TimelineMarkersConsumer>
      {({ subscribeMarker }) => (
        <TodayMarker subscribeMarker={subscribeMarker} {...props} />
      )}
    </TimelineMarkersConsumer>
  )
}

TodayMarkerWrapper.displayName = 'TodayMarkerWrapper'

export default TodayMarkerWrapper
