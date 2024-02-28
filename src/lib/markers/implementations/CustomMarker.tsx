import React from 'react'
import { createMarkerStylesWithLeftOffset, createDefaultRenderer } from './shared'
import { MarkerRendererType } from '../markerType'

const defaultCustomMarkerRenderer = createDefaultRenderer('default-customer-marker-id')
type CustomMarkerProps = {
  date: number
  getLeftOffsetFromDate: (date: number) => number
  renderer: MarkerRendererType
}

/**
 * CustomMarker that is placed based on passed in date prop
 */
class CustomMarker extends React.Component<CustomMarkerProps> {
  public static defaultProps = {
    renderer: defaultCustomMarkerRenderer,
  }
  render() {
    const { date } = this.props
    const leftOffset = this.props.getLeftOffsetFromDate(date)

    const styles = createMarkerStylesWithLeftOffset(leftOffset)
    return this.props.renderer({ styles, date })
  }
}

export default CustomMarker
