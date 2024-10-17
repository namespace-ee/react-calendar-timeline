import React, { MouseEventHandler, PropsWithChildren } from 'react'
import {
  MarkerCanvasContext,
  MarkerCanvasProvider,
} from './MarkerCanvasContext'
import TimelineMarkersRenderer from './TimelineMarkersRenderer'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'

// expand to fill entire parent container (ScrollElement)
const staticStyles: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
}

type MarkerCanvasProps = {
  getDateFromLeftOffsetPosition: (offset: number) => number
}

/**
 * Renders registered markers and exposes a mouse over listener for
 * CursorMarkers to subscribe to
 */
class MarkerCanvas extends React.Component<
  PropsWithChildren<MarkerCanvasProps>
> {
  handleMouseMove: MouseEventHandler<HTMLDivElement> = (evt) => {
    if (this.subscription !== null) {
      const { pageX } = evt
      // FIXME: dont use getBoundingClientRect. Use passed in scroll amount
      const { left: containerLeft } =
        this.containerEl.current?.getBoundingClientRect() ?? {
          left: 0,
        }

      // number of pixels from left we are on canvas
      // we do this calculation as pageX is based on x from viewport whereas
      // our canvas can be scrolled left and right and is generally outside
      // of the viewport.  This calculation is to get how many pixels the cursor
      // is from left of this element
      const canvasX = pageX - containerLeft
      const date = this.props.getDateFromLeftOffsetPosition(canvasX)
      this.subscription({
        leftOffset: canvasX,
        date,
        isCursorOverCanvas: true,
      })
    }
  }

  handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    if (this.subscription !== null) {
      // tell subscriber that we're not on canvas
      this.subscription({ leftOffset: 0, date: 0, isCursorOverCanvas: false })
    }
  }

  handleMouseMoveSubscribe: MarkerCanvasContext['subscribeToMouseOver'] = (
    sub,
  ) => {
    this.subscription = sub
    return () => {
      this.subscription = null
    }
  }

  state: MarkerCanvasContext = {
    subscribeToMouseOver: this.handleMouseMoveSubscribe,
  }

  containerEl = React.createRef<HTMLDivElement>()
  private subscription: ((s: any) => void) | null = null

  render() {
    return (
      <MarkerCanvasProvider value={this.state}>
        <div
          style={staticStyles}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          ref={this.containerEl}
        >
          <TimelineMarkersRenderer />
          {this.props.children}
        </div>
      </MarkerCanvasProvider>
    )
  }
}

const MarkerCanvasWrapper = (
  props: Omit<MarkerCanvasProps, 'getDateFromLeftOffsetPosition'>,
) => (
  <TimelineStateConsumer>
    {({ getDateFromLeftOffsetPosition }) => (
      <MarkerCanvas
        getDateFromLeftOffsetPosition={getDateFromLeftOffsetPosition}
        {...props}
      />
    )}
  </TimelineStateConsumer>
)

export default MarkerCanvasWrapper
