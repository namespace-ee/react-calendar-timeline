import React from 'react'
import PropTypes from 'prop-types'
import { MarkerCanvasConsumer } from '../MarkerCanvasContext'

const criticalStyles = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  // FIXME: are these critical styles?
  width: '2px',
  backgroundColor: 'pink'
}

// FIXME: this is used in all marker implementations
// REVIEW: might want to memoize this as it creates a new object
// in each render which is passed to React component
const createMarkerStylesWithLeftOffset = leftOffset => ({
  ...criticalStyles,
  left: leftOffset
})

// eslint-disable-next-line
const defaultRenderer = ({ styles }) => (
  <div style={styles} data-testid="default-cursor-marker" />
)

/**
 * CursorMarker implementation subscribe to 'subscribeToCanvasMouseOver' on mount.
 * This subscription is passed in via MarkerCanvasConsumer, which is wired up to
 * MarkerCanvasProvider in the MarkerCanvas component. When the user mouses over MarkerCanvas,
 * the callback registered in CursorMarker (this component) is passed:
 *  leftOffset - pixels from left edge of canvas, used to position this element
 *  date - the date the cursor pertains to
 *  isCursorOverCanvas - whether the user cursor is over the canvas. This is set to 'false'
 *  when the user mouseleaves the element
 */
class CursorMarker extends React.Component {
  static propTypes = {
    subscribeToCanvasMouseOver: PropTypes.func.isRequired,
    renderer: PropTypes.func
  }

  static defaultProps = {
    renderer: defaultRenderer
  }

  constructor() {
    super()

    this.state = {
      leftOffset: 0,
      date: 0,
      isShowingCursor: false
    }
  }

  handleCanvasMouseOver = ({ leftOffset, date, isCursorOverCanvas }) => {
    this.setState({
      leftOffset,
      date,
      isShowingCursor: isCursorOverCanvas
    })
  }

  componentDidMount() {
    this.unsubscribe = this.props.subscribeToCanvasMouseOver(
      this.handleCanvasMouseOver
    )
  }

  componentWillUnmount() {
    if (this.unsubscribe != null) {
      this.unsubscribe()
      this.unsubscribe = null
    }
  }

  render() {
    const { isShowingCursor, leftOffset, date } = this.state

    if (!isShowingCursor) return null

    const styles = createMarkerStylesWithLeftOffset(leftOffset)

    return this.props.renderer({ styles, date })
  }
}

// TODO: turn into HOC?
const CursorMarkerWrapper = props => {
  return (
    <MarkerCanvasConsumer>
      {({ subscribeToMouseOver }) => {
        return (
          <CursorMarker
            subscribeToCanvasMouseOver={subscribeToMouseOver}
            {...props}
          />
        )
      }}
    </MarkerCanvasConsumer>
  )
}

CursorMarkerWrapper.displayName = 'CursorMarkerWrapper'

export default CursorMarkerWrapper
