import React from 'react'
import { render, Simulate } from 'react-testing-library'
import 'jest-dom/extend-expect'
import TimelineMarkers from 'lib/markers/public/TimelineMarkers'
import CustomMarker from 'lib/markers/public/CustomMarker'
import { RenderWrapper } from 'test-utility/marker-renderer'

describe('CustomMarker', () => {
  const defaultCustomMarkerTestId = 'default-customer-marker-id'
  it('renders one', () => {
    const { getByTestId } = render(
      <RenderWrapper>
        <TimelineMarkers>
          <CustomMarker date={1000} />
        </TimelineMarkers>
      </RenderWrapper>
    )

    expect(getByTestId(defaultCustomMarkerTestId)).toBeInTheDOM()
  })
  it('render multiple', () => {
    const { queryAllByTestId } = render(
      <RenderWrapper>
        <TimelineMarkers>
          <CustomMarker date={1000} />
          <CustomMarker date={1000} />
          <CustomMarker date={1000} />
        </TimelineMarkers>
      </RenderWrapper>
    )

    expect(queryAllByTestId(defaultCustomMarkerTestId).length).toBe(3)
  })
  it('renders with custom renderer', () => {
    const customDataIdSelector = 'my-custom-marker'
    const { getByTestId } = render(
      <RenderWrapper>
        <TimelineMarkers>
          <CustomMarker date={1000}>
            {() => <div data-testid={customDataIdSelector} />}
          </CustomMarker>
        </TimelineMarkers>
      </RenderWrapper>
    )

    expect(getByTestId(customDataIdSelector)).toBeInTheDOM()
  })

  it('is passed styles with left corresponding to passed in date', () => {
    const oneDay = 1000 * 60 * 60 * 24
    const canvasWidth = 3000

    const now = Date.now()

    /**
     * CanvasTimeStart - one day ago
     * VisibleTimeStart - now
     * VisibleTimeEnd - one day in future
     * CanvasTimeEnd - two days in the future
     */

    const visibleTimeStart = now
    const visibleTimeEnd = now + oneDay
    const timelineState = {
      visibleTimeStart,
      visibleTimeEnd,
      canvasTimeStart: visibleTimeStart - oneDay,
      canvasTimeEnd: visibleTimeEnd + oneDay,
      canvasWidth
    }

    const markerDate = now + oneDay / 2

    const { getByTestId } = render(
      <RenderWrapper timelineState={timelineState}>
        <TimelineMarkers>
          <CustomMarker date={markerDate} />
        </TimelineMarkers>
      </RenderWrapper>
    )

    const el = getByTestId(defaultCustomMarkerTestId)

    expect(el).toHaveStyle(`left: ${3000 / 2}px`)
  })

  it('is removed after unmount', () => {
    class RemoveCustomMarker extends React.Component {
      state = {
        isShowing: true
      }
      handleToggleCustomMarker = () => {
        this.setState({
          isShowing: false
        })
      }
      render() {
        return (
          <RenderWrapper>
            <button onClick={this.handleToggleCustomMarker}>
              Hide Custom Marker
            </button>
            <TimelineMarkers>
              {this.state.isShowing && <CustomMarker date={1000} />}
            </TimelineMarkers>
          </RenderWrapper>
        )
      }
    }

    const { queryByTestId, getByText } = render(<RemoveCustomMarker />)

    expect(queryByTestId(defaultCustomMarkerTestId)).toBeInTheDOM()

    Simulate.click(getByText('Hide Custom Marker'))

    expect(queryByTestId(defaultCustomMarkerTestId)).not.toBeInTheDOM()
  })
})
