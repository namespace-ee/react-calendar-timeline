import React from 'react'
import PropTypes from 'prop-types'

const staticStyles = {
  position: 'absolute',
  top: 0,
  bottom: 0
}

const defaultCustomMarkerRenderer = ({ style }) => (
  <div style={style} data-testid="default-customer-marker-id" />
)

defaultCustomMarkerRenderer.propTypes = {
  style: PropTypes.object.isRequired
}

class CustomMarker extends React.Component {
  static propTypes = {
    renderer: PropTypes.func
  }

  static defaultProps = {
    renderer: defaultCustomMarkerRenderer
  }
  render() {
    return this.props.renderer({ style: staticStyles })
  }
}

export default CustomMarker
