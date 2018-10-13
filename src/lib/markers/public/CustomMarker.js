import React from 'react'
import PropTypes from 'prop-types'
import { TimelineMarkersConsumer } from '../TimelineMarkersContext'
import { TimelineMarkerType } from '../markerType'

class CustomMarker extends React.Component {
  static propTypes = {
    subscribeMarker: PropTypes.func.isRequired,
    updateMarker: PropTypes.func.isRequired,
    children: PropTypes.func,
    date: PropTypes.number.isRequired
  }

  componentDidUpdate(prevProps) {
    if (prevProps.date !== this.props.date && this.getMarker) {
      const marker = this.getMarker()
      this.props.updateMarker({ ...marker, date: this.props.date })
    }
  }

  componentDidMount() {
    const { unsubscribe, getMarker } = this.props.subscribeMarker({
      type: TimelineMarkerType.Custom,
      renderer: this.props.children,
      date: this.props.date
    })
    this.unsubscribe = unsubscribe
    this.getMarker = getMarker
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
      {({ subscribeMarker, updateMarker }) => (
        <CustomMarker
          subscribeMarker={subscribeMarker}
          updateMarker={updateMarker}
          {...props}
        />
      )}
    </TimelineMarkersConsumer>
  )
}

CustomMarkerWrapper.displayName = 'CustomMarkerWrapper'

export default CustomMarkerWrapper
