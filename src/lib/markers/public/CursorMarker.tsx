import { Component } from 'react'
import { SubscribeReturn, TimelineMarkersConsumer } from '../TimelineMarkersContext'
import { MarkerRendererType, MarkerType, TimelineMarkerType } from '../markerType'

export type CursorMarkerProps = {
  subscribeMarker: (m: MarkerType) => SubscribeReturn
  children?: MarkerRendererType
}
class CursorMarker extends Component<CursorMarkerProps> {
  private unsubscribe: (() => void) | null = null
  componentDidMount() {
    const { unsubscribe } = this.props.subscribeMarker({
      type: TimelineMarkerType.Cursor,
      renderer: this.props.children,
    })
    this.unsubscribe = unsubscribe
  }

  componentWillUnmount() {
    if (this.unsubscribe != null) {
      this.unsubscribe()
      this.unsubscribe = null
    }
  }
  render() {
    return null
  }
}

// TODO: turn into HOC?

const CursorMarkerWrapper = (props: Pick<CursorMarkerProps, 'children'>) => {
  return <TimelineMarkersConsumer>{({ subscribeMarker }) => <CursorMarker subscribeMarker={subscribeMarker} {...props} />}</TimelineMarkersConsumer>
}

CursorMarkerWrapper.displayName = 'CursorMarkerWrapper'

export default CursorMarkerWrapper
