import { Component } from 'react'
import {
  SubscribeReturn,
  TimelineMarkersConsumer,
} from '../TimelineMarkersContext'
import {
  MarkerRendererType,
  MarkerType,
  TimelineMarkerType,
} from '../markerType'

type noop = () => any

type CustomMarkerProps = {
  date: number
  children?: MarkerRendererType
  updateMarker: (marker: MarkerType) => void
  subscribeMarker: (newe: MarkerType) => SubscribeReturn
}
class CustomMarker extends Component<CustomMarkerProps> {
  private unsubscribe: noop | null = null
  private getMarker: noop | null = null

  componentDidUpdate(prevProps: CustomMarkerProps) {
    if (prevProps.date !== this.props.date && this.getMarker) {
      const marker = this.getMarker()
      this.props.updateMarker({ ...marker, date: this.props.date })
    }
  }

  componentDidMount() {
    const { unsubscribe, getMarker } = this.props.subscribeMarker({
      type: TimelineMarkerType.Custom,
      renderer: this.props.children,
      date: this.props.date,
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

  render() {
    return null
  }
}

type Props = Pick<CustomMarkerProps, 'date' | 'children'>

// TODO: turn into HOC?
const CustomMarkerWrapper = (props: Props) => {
  return (
    <TimelineMarkersConsumer>
      {({ subscribeMarker, updateMarker }) => (
        <CustomMarker
          subscribeMarker={subscribeMarker}
          updateMarker={updateMarker}
          {...props}
        />
      )}
    </TimelineMarkersConsumer>
  )
}

CustomMarkerWrapper.displayName = 'CustomMarkerWrapper'

export default CustomMarkerWrapper
