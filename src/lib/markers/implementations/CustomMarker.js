import React from 'react'

// implementation of CustomMarker
// takes a renderer

const staticStyles = {
  position: 'absolute',
  top: 0,
  bottom: 0
}

class CustomMarker extends React.Component {
  render() {
    return <div style={staticStyles} data-testid="default-customer-marker-id" />
  }
}

export default CustomMarker
