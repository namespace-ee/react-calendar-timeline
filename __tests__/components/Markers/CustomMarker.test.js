import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'
import TimelineMarkers from 'lib/markers/public/TimelineMarkers'
import CustomMarker from 'lib/markers/public/CustomMarker'
import { RenderWrapper } from 'test-utility/marker-renderer'
import { TimelineStateConsumer } from 'lib/timeline/TimelineStateContext'

describe('CustomMarker', () => {
  afterEach(cleanup)
  const defaultCustomMarkerTestId = 'default-customer-marker-id'
  it('renders one', () => {
    const { getByTestId } = render(
      <RenderWrapper>
        <TimelineStateConsumer>
          {({ getTimelineState }) => {
            const { canvasTimeStart } = getTimelineState();
            return (
              <TimelineMarkers>
                <CustomMarker date={canvasTimeStart + 100} />
              </TimelineMarkers>
            )
          }}
        </TimelineStateConsumer>
      </RenderWrapper>
    )

    expect(getByTestId(defaultCustomMarkerTestId)).toBeInTheDocument()
  })
  it('render multiple', () => {
    const { queryAllByTestId } = render(
      <RenderWrapper>
        <TimelineStateConsumer>
          {({ getTimelineState }) => {
            const { canvasTimeStart } = getTimelineState();
            return (
              <TimelineMarkers>
                <CustomMarker date={canvasTimeStart + 100} />
                <CustomMarker date={canvasTimeStart + 101} />
                <CustomMarker date={canvasTimeStart + 102} />
              </TimelineMarkers>
            )
          }}
        </TimelineStateConsumer>
      </RenderWrapper>
    )

    expect(queryAllByTestId(defaultCustomMarkerTestId).length).toBe(3)
  })
  it('renders with custom renderer', () => {
    const customDataIdSelector = 'my-custom-marker'
    const { getByTestId } = render(
      <RenderWrapper>
        <TimelineStateConsumer>
          {({ getTimelineState }) => {
            const { canvasTimeStart } = getTimelineState();
            return (
              <TimelineMarkers>
                <CustomMarker date={canvasTimeStart + 100}>
                  {() => <div data-testid={customDataIdSelector} />}
                </CustomMarker>
              </TimelineMarkers>
            )
          }}
        </TimelineStateConsumer>
      </RenderWrapper>
    )

    expect(getByTestId(customDataIdSelector)).toBeInTheDocument()
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
      canvasWidth,
      showPeriod: () => { },
      timelineWidth: 1000,
      timelineUnit: 'day'
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
            <TimelineStateConsumer>
              {({ getTimelineState }) => {
                const { canvasTimeStart } = getTimelineState();
                return (
                  <React.Fragment>
                    <button onClick={this.handleToggleCustomMarker}>
                      Hide Custom Marker
                    </button>
                    <TimelineMarkers>
                      {this.state.isShowing && <CustomMarker date={canvasTimeStart + 100} />}
                    </TimelineMarkers>
                  </React.Fragment>
                )
              }}</TimelineStateConsumer>
          </RenderWrapper>
        )
      }
    }

    const { queryByTestId, getByText } = render(<RemoveCustomMarker />)

    expect(queryByTestId(defaultCustomMarkerTestId)).toBeInTheDocument()

    fireEvent.click(getByText('Hide Custom Marker'))

    expect(queryByTestId(defaultCustomMarkerTestId)).not.toBeInTheDocument()
  })
  it('updates marker location after passing new date', () => {
    const { getByTestId, rerender } = render(
      <RenderWrapper>
        <TimelineStateConsumer>
          {({ getTimelineState }) => {
            const { canvasTimeStart } = getTimelineState();
            return (
              <TimelineMarkers>
                <CustomMarker date={canvasTimeStart + 1000} />
              </TimelineMarkers>
            )
          }}</TimelineStateConsumer>
      </RenderWrapper>)
    const positionLeftBeforeChange = getByTestId(defaultCustomMarkerTestId).style.left
    rerender(<RenderWrapper>
      <TimelineStateConsumer>
        {({ getTimelineState }) => {
          const { canvasTimeStart } = getTimelineState();
          return (
            <TimelineMarkers>
              <CustomMarker date={canvasTimeStart + 2000} />
            </TimelineMarkers>
          )
        }}</TimelineStateConsumer>
    </RenderWrapper>)
    const positionLeftAfterChange = getByTestId(defaultCustomMarkerTestId).style.left
    expect(positionLeftBeforeChange).not.toEqual(positionLeftAfterChange)
  })
  it('should not render marker outside canvas', () => {
    const { queryByTestId } = render(
      <RenderWrapper>
        <TimelineStateConsumer>
          {({ getTimelineState }) => {
            const { canvasTimeEnd } = getTimelineState();
            return (
              <TimelineMarkers>
                <CustomMarker date={canvasTimeEnd + 100} />
              </TimelineMarkers>
            )
          }}
        </TimelineStateConsumer>
      </RenderWrapper>
    )

    expect(queryByTestId(defaultCustomMarkerTestId)).not.toBeInTheDocument()
  })
})
