import React from 'react'
import PropTypes from 'prop-types'

// this should expect a timelineContext prop or some
// way to calculate left position

const staticStyles = {
  position: 'absolute',
  top: 0,
  bottom: 0
}

// REVIEW: might want to memoize this...
const createMarkerStylesWithLeftOffset = leftOffset => ({
  ...staticStyles,
  left: leftOffset
})

/** Implementation of TodayLine.  This component will be in charge
 * of setting interval as to when to re render with new time
 */
class TodayLine extends React.Component {
  static propTypes = {
    getLeftOffsetFromDate: PropTypes.func.isRequired
  }

  state = {
    date: Date.now()
  }

  componentDidMount() {
    this.intervalToken = setInterval(() =>
      this.setState({
        date: Date.now()
      })
    )
  }

  componentWillUnmount() {
    clearInterval(this.intervalToken)
  }

  render() {
    // we will likely pass in date to custom renderer...
    const { date } = this.state
    const leftOffset = this.props.getLeftOffsetFromDate(date)
    const styles = createMarkerStylesWithLeftOffset(leftOffset)
    return <div style={styles} data-testid="today-line-implementation" />
  }
}

export default TodayLine
