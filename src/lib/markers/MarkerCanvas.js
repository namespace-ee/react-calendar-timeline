import React from 'react'
import PropTypes from 'prop-types'
import { MarkerCanvasProvider } from './MarkerCanvasContext'
import TimelineMarkersRenderer from './TimelineMarkersRenderer'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'

// expand to fill entire parent container (ScrollElement)
const staticStyles = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}

/**
 * Renders registered markers and exposes a mouse over listener for
 * CursorMarkers to subscribe to
 */
class MarkerCanvas extends React.Component {
  static propTypes = {
    getDateFromLeftOffsetPosition: PropTypes.func.isRequired
  }

  handleMouseMove = evt => {
    if (this.subscription != null) {
      const { pageX } = evt
      // FIXME: dont use getBoundingClientRect. Use passed in scroll amount
      const { left: containerLeft } = this.containerEl.getBoundingClientRect()

      // number of pixels from left we are on canvas
      // we do this calculation as pageX is based on x from viewport whereas
      // our canvas can be scrolled left and right and is generally outside
      // of the viewport.  This calculation is to get how many pixels the cursor
      // is from left of this element
      const canvasX = pageX - containerLeft
      const date = this.props.getDateFromLeftOffsetPosition(canvasX)
      this.subscription({
        leftOffset: canvasX,
        date,
        isCursorOverCanvas: true
      })
    }
  }

  handleMouseLeave = () => {
    if (this.subscription != null) {
      // tell subscriber that we're not on canvas
      this.subscription({ leftOffset: 0, date: 0, isCursorOverCanvas: false })
    }
  }

  handleMouseMoveSubscribe = sub => {
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
        <div
          style={staticStyles}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          ref={el => (this.containerEl = el)}
        >
          <TimelineMarkersRenderer />
        </div>
      </MarkerCanvasProvider>
    )
  }
}

const MarkerCanvasWrapper = props => (
  <TimelineStateConsumer>
    {({ getDateFromLeftOffsetPosition }) => (
      <MarkerCanvas
        getDateFromLeftOffsetPosition={getDateFromLeftOffsetPosition}
        {...props}
      />
    )}
  </TimelineStateConsumer>
)

export default MarkerCanvasWrapper
