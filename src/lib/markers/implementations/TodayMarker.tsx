import React from 'react'
import {
  createMarkerStylesWithLeftOffset,
  createDefaultRenderer,
} from './shared'
import { MarkerRendererType } from '../markerType'

const defaultRenderer = createDefaultRenderer('default-today-line')

type TodayMarkerProps = {
  getLeftOffsetFromDate: (date: number) => number
  renderer: MarkerRendererType
  interval: number
}

/** Marker that is placed based on current date.  This component updates itself on
 * a set interval, dictated by the 'interval' prop.
 */
class TodayMarker extends React.Component<TodayMarkerProps> {
  public static defaultProps = {
    renderer: defaultRenderer,
  }

  state = {
    date: Date.now(),
  }
  private intervalToken: NodeJS.Timeout | undefined

  componentDidMount() {
    this.intervalToken = this.createIntervalUpdater(this.props.interval)
  }

  componentDidUpdate(prevProps: TodayMarkerProps) {
    if (prevProps.interval !== this.props.interval) {
      clearInterval(this.intervalToken)
      this.intervalToken = this.createIntervalUpdater(this.props.interval)
    }
  }

  createIntervalUpdater(interval: number) {
    return setInterval(() => {
      this.setState({
        date: Date.now(), // FIXME: use date utils pass in as props
      })
    }, interval)
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
