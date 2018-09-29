import React from 'react'
import PropTypes from 'prop-types'
import {
  createMarkerStylesWithLeftOffset,
  createDefaultRenderer
} from './shared'

const defaultRenderer = createDefaultRenderer('default-today-line')

/** Marker that is placed based on current date.  This component updates itself on
 * a set interval, dictated by the 'interval' prop.
 */
class TodayMarker extends React.Component {
  static propTypes = {
    getLeftOffsetFromDate: PropTypes.func.isRequired,
    renderer: PropTypes.func,
    interval: PropTypes.number.isRequired
  }

  static defaultProps = {
    renderer: defaultRenderer
  }

  state = {
    date: Date.now()
  }

  componentDidMount() {
    this.intervalToken = this.createIntervalUpdater(this.props.interval)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.interval !== this.props.interval) {
      clearInterval(this.intervalToken)
      this.intervalToken = this.createIntervalUpdater(this.props.interval)
    }
  }

  createIntervalUpdater(interval) {
    return setInterval(() => {
      this.setState({
        date: Date.now() // FIXME: use date utils pass in as props
      });
    }, interval);
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
