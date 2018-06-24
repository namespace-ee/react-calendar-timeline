import React from 'react'
import PropTypes from 'prop-types'
import { TimelineMarkersConsumer } from '../TimelineMarkersContext'
import { TimelineMarkerType } from '../markerType'

class TodayMarker extends React.Component {
  static propTypes = {
    subscribeMarker: PropTypes.func.isRequired,
    interval: PropTypes.number,
    children: PropTypes.func
  }

  static defaultProps = {
    interval: 1000 * 10 // default to ten seconds
  }

  componentDidMount() {
    this.unsubscribe = this.props.subscribeMarker({
      type: TimelineMarkerType.Today,
      renderer: this.props.children,
      interval: this.props.interval
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
