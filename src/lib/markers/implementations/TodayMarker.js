import React from 'react'
import PropTypes from 'prop-types'

// this should expect a timelineContext prop or some
// way to calculate left position

const criticalStyles = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '2px',
  backgroundColor: 'red'
}

// REVIEW: might want to memoize this as it creates a new object
// in each render which is passed to React component
const createMarkerStylesWithLeftOffset = leftOffset => ({
  ...criticalStyles,
  left: leftOffset
})

// eslint-disable-next-line
const defaultRenderer = ({ styles }) => (
  <div style={styles} data-testid="default-today-line" />
)

/** Implementation of TodayMarker.  This component will be in charge
 * of setting interval as to when to re render with new time
 */
class TodayMarker extends React.Component {
  static propTypes = {
    getLeftOffsetFromDate: PropTypes.func.isRequired,
    renderer: PropTypes.func
  }

  static defaultProps = {
    renderer: defaultRenderer
  }

  state = {
    date: Date.now()
  }

  componentDidMount() {
    this.intervalToken = setInterval(
      () =>
        this.setState({
          date: Date.now() // FIXME: use date utils pass in as props
        }),
      5000
    )
  }

  componentWillUnmount() {
    clearInterval(this.intervalToken)
  }

  render() {
    const { date } = this.state
    const leftOffset = this.props.getLeftOffsetFromDate(date)
    const styles = createMarkerStylesWithLeftOffset(leftOffset)
    return this.props.renderer({ styles, date })
  }
}

export default TodayMarker
