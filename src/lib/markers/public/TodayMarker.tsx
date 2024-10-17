import React from 'react'
import { SubscribeReturn, TimelineMarkersConsumer } from '../TimelineMarkersContext'
import { MarkerRendererType, MarkerType, TimelineMarkerType } from '../markerType'

export type TodayMarkerProps = {
  interval?: number
  updateMarker: (marker: MarkerType) => void
  subscribeMarker: (m: MarkerType) => SubscribeReturn
  children?: MarkerRendererType
}

class TodayMarker extends React.Component<TodayMarkerProps> {
  static defaultProps = {
    interval: 1000 * 10, // default to ten seconds
  }
  private unsubscribe: (() => void) | null = null
  private getMarker: (() => MarkerType) | null = null

  componentDidMount() {
    const { unsubscribe, getMarker } = this.props.subscribeMarker({
      type: TimelineMarkerType.Today,
      renderer: this.props.children,
      interval: this.props.interval,
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

  componentDidUpdate(prevProps: TodayMarkerProps) {
    if (prevProps.interval !== this.props.interval && this.getMarker) {
      const marker = this.getMarker()
      this.props.updateMarker({
        ...marker,
        interval: this.props.interval,
      })
    }
  }

  render() {
    return null
  }
}

// TODO: turn into HOC?
const TodayMarkerWrapper = (props: Omit<TodayMarkerProps, 'updateMarker' | 'subscribeMarker'>) => {
  return <TimelineMarkersConsumer>{({ subscribeMarker, updateMarker }) => <TodayMarker subscribeMarker={subscribeMarker} updateMarker={updateMarker} {...props} />}</TimelineMarkersConsumer>
}

TodayMarkerWrapper.displayName = 'TodayMarkerWrapper'

export default TodayMarkerWrapper
