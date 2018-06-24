import React from 'react'
import PropTypes from 'prop-types'
import { TimelineMarkersConsumer } from '../TimelineMarkersContext'
import { TimelineMarkerType } from '../markerType'

class CursorMarker extends React.Component {
  static propTypes = {
    subscribeMarker: PropTypes.func.isRequired,
    children: PropTypes.func
  }

  componentDidMount() {
    this.unsubscribe = this.props.subscribeMarker({
      type: TimelineMarkerType.Cursor,
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
const CursorMarkerWrapper = props => {
  return (
    <TimelineMarkersConsumer>
      {({ subscribeMarker }) => (
        <CursorMarker subscribeMarker={subscribeMarker} {...props} />
      )}
    </TimelineMarkersConsumer>
  )
}

CursorMarkerWrapper.displayName = 'CursorMarkerWrapper'

export default CursorMarkerWrapper
