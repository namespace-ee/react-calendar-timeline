import React from 'react'
import PropTypes from 'prop-types'
import {
  createMarkerStylesWithLeftOffset,
  createDefaultRenderer,
} from './shared'
import { MarkerCanvasConsumer } from '../MarkerCanvasContext'

const defaultRenderer = createDefaultRenderer('default-cursor-marker')

type CursorMarkerWrapperProps = {
  getLeftOffsetFromDate: (date: number) => number
  renderer: ({
    styles,
    date,
  }: {
    styles: React.CSSProperties
    date: number
  }) => React.JSX.Element
  //interval: number
}

type CursorMarkerProps = CursorMarkerWrapperProps & {
  subscribeToCanvasMouseOver: (
    handleCanvasMouseOver: ({
      leftOffset,
      date,
      isCursorOverCanvas,
    }: {
      leftOffset: number
      date: number
      isCursorOverCanvas: boolean
    }) => void,
  ) => void
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
class CursorMarker extends React.Component<
  CursorMarkerProps,
  CursorMarkerStat
> {
  static propTypes = {
    subscribeToCanvasMouseOver: PropTypes.func.isRequired,
    renderer: PropTypes.func,
  }

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

  handleCanvasMouseOver = ({
    leftOffset,
    date,
    isCursorOverCanvas,
  }: {
    leftOffset: number
    date: number
    isCursorOverCanvas: boolean
  }) => {
    this.setState({
      leftOffset,
      date,
      isShowingCursor: isCursorOverCanvas,
    })
  }
  private unsubscribe: undefined | any //todo

  componentDidMount() {
    this.unsubscribe = this.props.subscribeToCanvasMouseOver(
      this.handleCanvasMouseOver,
    )
  }

  componentWillUnmount() {
    if (this.unsubscribe != null) {
      this.unsubscribe()
      this.unsubscribe = null
    }
  }

  render() {
    const { isShowingCursor, leftOffset, date } = this.state

    if (!isShowingCursor) return null

    const styles = createMarkerStylesWithLeftOffset(leftOffset)

    return this.props.renderer({ styles, date })
  }
}

// TODO: turn into HOC?
const CursorMarkerWrapper = (props: CursorMarkerWrapperProps) => {
  return (
    <MarkerCanvasConsumer>
      {({ subscribeToMouseOver }) => {
        return (
          <CursorMarker
            subscribeToCanvasMouseOver={subscribeToMouseOver}
            {...props}
          />
        )
      }}
    </MarkerCanvasConsumer>
  )
}

CursorMarkerWrapper.displayName = 'CursorMarkerWrapper'

export default CursorMarkerWrapper
