import React from 'react'
import { createMarkerStylesWithLeftOffset, createDefaultRenderer } from './shared'
import { HandleCanvasMouseOver, MarkerCanvasConsumer } from '../MarkerCanvasContext'
import { MarkerRendererType } from '../markerType'

const defaultRenderer = createDefaultRenderer('default-cursor-marker')

type CursorMarkerWrapperProps = {
  getLeftOffsetFromDate: (date: number) => number
  renderer?: MarkerRendererType
  //interval: number
}

type CursorMarkerProps = CursorMarkerWrapperProps & {
  subscribeToCanvasMouseOver: (p: HandleCanvasMouseOver) => () => void
}

type CursorMarkerStat = {
  leftOffset: number
  date: number
  isShowingCursor: boolean
}

/**
 * CursorMarker implementation subscribes to 'subscribeToCanvasMouseOver' on mount.
 * This subscription is passed in via MarkerCanvasConsumer, which is wired up to
 * MarkerCanvasProvider in the MarkerCanvas component. When the user mouses over MarkerCanvas,
 * the callback registered in CursorMarker (this component) is passed:
 *  leftOffset - pixels from left edge of canvas, used to position this element
 *  date - the date the cursor pertains to
 *  isCursorOverCanvas - whether the user cursor is over the canvas. This is set to 'false'
 *  when the user mouseleaves the element
 */
class CursorMarker extends React.Component<CursorMarkerProps, CursorMarkerStat> {
  public static defaultProps = {
    renderer: defaultRenderer,
  }

  constructor(props: any) {
    super(props)

    this.state = {
      leftOffset: 0,
      date: 0,
      isShowingCursor: false,
    }
  }

  handleCanvasMouseOver = ({ leftOffset, date, isCursorOverCanvas }: { leftOffset: number; date: number; isCursorOverCanvas: boolean }) => {
    this.setState({
      leftOffset,
      date,
      isShowingCursor: isCursorOverCanvas,
    })
  }
  private unsubscribe?: ReturnType<CursorMarkerProps['subscribeToCanvasMouseOver']>

  componentDidMount() {
    this.unsubscribe = this.props.subscribeToCanvasMouseOver(this.handleCanvasMouseOver)
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = undefined
    }
  }

  render() {
    const { isShowingCursor, leftOffset, date } = this.state

    if (!isShowingCursor) return null

    const styles = createMarkerStylesWithLeftOffset(leftOffset)
    if(!this.props.renderer)return null;
    return this.props.renderer({ styles, date })
  }
}

const CursorMarkerWrapper = (props: CursorMarkerWrapperProps) => {
  return (
    <MarkerCanvasConsumer>
      {({ subscribeToMouseOver }) => {
        return <CursorMarker subscribeToCanvasMouseOver={subscribeToMouseOver} {...props} />
      }}
    </MarkerCanvasConsumer>
  )
}

CursorMarkerWrapper.displayName = 'CursorMarkerWrapper'

export default CursorMarkerWrapper
