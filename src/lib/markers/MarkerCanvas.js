import React from 'react'
import { MarkerCanvasProvider } from './MarkerCanvasContext'
import TimelineMarkersRenderer from './TimelineMarkersRenderer'

/**
 * Renders registered markers and exposes a mouse over listener for
 * CursorMarkers to subscribe to
 */

// expand to fill entire parent container (ScrollElement)
const staticStyles = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}

class MarkerCanvas extends React.Component {
  handleMouseMove = () => {
    // const target = evt.target
    // TODO: wrap this in a RAF
    // but we dont want to do that for every render
    // we could inject in scrollLeft but then this would
    // be rerenderer every scroll
    // we could wrap in TimelineStateContext (which well need anyways)
    // but that wont help us as we need to know our current state of scroll
    // const offsetLeft = target.getBoundingClientRect().left
    // console.log('mouse over')
    if (this.subscription != null) {
      this.subscription()
    }
  }
  // TODO: what about mouse enter and mouse leave?

  handleMouseMoveSubscribe = sub => {
    // console.log('subscribing!')
    this.subscription = sub
    return () => {
      this.subscription = null
    }
  }

  state = {
    subscribeToMouseOver: this.handleMouseMoveSubscribe
  }

  render() {
    return (
      <MarkerCanvasProvider value={this.state}>
        <div style={staticStyles} onMouseMove={this.handleMouseMove}>
          <TimelineMarkersRenderer />
        </div>
      </MarkerCanvasProvider>
    )
  }
}

export default MarkerCanvas
