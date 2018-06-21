import React from 'react'
import { render, Simulate } from 'react-testing-library'
import 'jest-dom/extend-expect'
import TimelineMarkers from 'lib/markers/TimelineMarkers'
import CursorMarker from 'lib/markers/CursorMarker'
import { RenderWrapper } from 'test-utility/marker-renderer'

describe('CursorMarker', () => {
  const defaultCursorMarkerTestId = 'default-cursor-marker'
  it('renders one', () => {
    const { getByTestId } = render(
      <RenderWrapper>
        <TimelineMarkers>
          <CursorMarker date={1000} />
        </TimelineMarkers>
      </RenderWrapper>
    )

    expect(getByTestId(defaultCursorMarkerTestId)).toBeInTheDOM()
  })
  it('render multiple', () => {
    const { queryAllByTestId } = render(
      <RenderWrapper>
        <TimelineMarkers>
          <CursorMarker />
          <CursorMarker />
          <CursorMarker />
        </TimelineMarkers>
      </RenderWrapper>
    )

    expect(queryAllByTestId(defaultCursorMarkerTestId).length).toBe(3)
  })
  it('renders with custom renderer', () => {
    const customDataIdSelector = 'my-custom-marker-cursor'
    const { getByTestId } = render(
      <RenderWrapper>
        <TimelineMarkers>
          <CursorMarker>
            {() => <div data-testid={customDataIdSelector} />}
          </CursorMarker>
        </TimelineMarkers>
      </RenderWrapper>
    )

    expect(getByTestId(customDataIdSelector)).toBeInTheDOM()
  })

  // it('is passed styles with left corresponding to passed in date', () => {
  //   const oneDay = 1000 * 60 * 60 * 24
  //   const canvasWidth = 3000

  //   const now = Date.now()

  //   /**
  //    * CanvasTimeStart - one day ago
  //    * VisibleTimeStart - now
  //    * VisibleTimeEnd - one day in future
  //    * CanvasTimeEnd - two days in the future
  //    */

  //   const visibleTimeStart = now
  //   const visibleTimeEnd = now + oneDay
  //   const timelineState = {
  //     visibleTimeStart,
  //     visibleTimeEnd,
  //     canvasTimeStart: visibleTimeStart - oneDay,
  //     canvasTimeEnd: visibleTimeEnd + oneDay,
  //     canvasWidth
  //   }

  //   const markerDate = now + oneDay / 2

  //   const { getByTestId } = render(
  //     <RenderWrapper timelineState={timelineState}>
  //       <TimelineMarkers>
  //         <CursorMarker date={markerDate} />
  //       </TimelineMarkers>
  //     </RenderWrapper>
  //   )

  //   const el = getByTestId(defaultCursorMarkerTestId)

  //   expect(el).toHaveStyle(`left: ${3000 / 2}px`)
  // })

  it('is removed after unmount', () => {
    class RemoveCursorMarker extends React.Component {
      state = {
        isShowing: true
      }
      handleToggleCursorMarker = () => {
        this.setState({
          isShowing: false
        })
      }
      render() {
        return (
          <RenderWrapper>
            <button onClick={this.handleToggleCursorMarker}>
              Hide Cursor Marker
            </button>
            <TimelineMarkers>
              {this.state.isShowing && <CursorMarker date={1000} />}
            </TimelineMarkers>
          </RenderWrapper>
        )
      }
    }

    const { queryByTestId, getByText } = render(<RemoveCursorMarker />)

    expect(queryByTestId(defaultCursorMarkerTestId)).toBeInTheDOM()

    Simulate.click(getByText('Hide Cursor Marker'))

    expect(queryByTestId(defaultCursorMarkerTestId)).not.toBeInTheDOM()
  })
})
