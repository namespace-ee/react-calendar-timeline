import React from 'react'
import PropTypes from 'prop-types'
import { TimelineMarkersConsumer } from '../TimelineMarkersContext'
import { TimelineMarkerType } from '../markerType'

class CustomMarker extends React.Component {
  static propTypes = {
    subscribeMarker: PropTypes.func.isRequired,
    children: PropTypes.func,
    date: PropTypes.number.isRequired
  }

  componentDidMount() {
    this.unsubscribe = this.props.subscribeMarker({
      type: TimelineMarkerType.Custom,
      renderer: this.props.children,
      date: this.props.date
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
const CustomMarkerWrapper = props => {
  return (
    <TimelineMarkersConsumer>
      {({ subscribeMarker }) => (
        <CustomMarker subscribeMarker={subscribeMarker} {...props} />
      )}
    </TimelineMarkersConsumer>
  )
}

CustomMarkerWrapper.displayName = 'CustomMarkerWrapper'

export default CustomMarkerWrapper
