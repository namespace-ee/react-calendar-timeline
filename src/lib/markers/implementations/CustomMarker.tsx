import React from 'react'
import {
  createMarkerStylesWithLeftOffset,
  createDefaultRenderer,
} from './shared'

const defaultCustomMarkerRenderer = createDefaultRenderer(
  'default-customer-marker-id',
)
type CustomMarkerProps = {
  date: number
  getLeftOffsetFromDate: (date: number) => number
  renderer: ({
    styles,
    date,
  }: {
    styles: React.CSSProperties
    date: number
  }) => React.JSX.Element
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
