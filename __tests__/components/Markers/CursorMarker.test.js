import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'
import TimelineMarkers from 'lib/markers/public/TimelineMarkers'
import CursorMarker from 'lib/markers/public/CursorMarker'
import { RenderWrapper } from 'test-utility/marker-renderer'
import { MarkerCanvasProvider } from 'lib/markers/MarkerCanvasContext'

/**
 * CursorMarker implementation relies on MarkerCanvas to notify it when the user
 * mouses over.  On mouse over, CursorMarker is notified detail on the mouseover
 * such as date and leftOffset which is used to position the line.  These tests
 * kind of stub that behavior out but are kind of dirty...
 */

describe('CursorMarker', () => {
  afterEach(cleanup)
  const defaultCursorMarkerTestId = 'default-cursor-marker'
  it('renders one', () => {
    const subscribeToMouseOverMock = jest.fn()

    const { getByTestId } = render(
      <MarkerCanvasProvider
        value={{ subscribeToMouseOver: subscribeToMouseOverMock }}
      >
        <RenderWrapper>
          <TimelineMarkers>
            <CursorMarker />
          </TimelineMarkers>
        </RenderWrapper>
      </MarkerCanvasProvider>
    )

    subscribeToMouseOverMock.mock.calls[0][0]({
      isCursorOverCanvas: true
    })

    expect(getByTestId(defaultCursorMarkerTestId)).toBeInTheDocument()
  })

  it('renders with custom renderer', () => {
    const customDataIdSelector = 'my-custom-marker-cursor'
    const subscribeToMouseOverMock = jest.fn()
    const { getByTestId } = render(
      <MarkerCanvasProvider
        value={{ subscribeToMouseOver: subscribeToMouseOverMock }}
      >
        <RenderWrapper>
          <TimelineMarkers>
            <CursorMarker>
              {() => <div data-testid={customDataIdSelector} />}
            </CursorMarker>
          </TimelineMarkers>
        </RenderWrapper>
      </MarkerCanvasProvider>
    )

    subscribeToMouseOverMock.mock.calls[0][0]({
      isCursorOverCanvas: true
    })

    expect(getByTestId(customDataIdSelector)).toBeInTheDocument()
  })

  it('styles.left based on callback leftOffset', () => {
    const subscribeToMouseOverMock = jest.fn()
    const { getByTestId } = render(
      <MarkerCanvasProvider
        value={{ subscribeToMouseOver: subscribeToMouseOverMock }}
      >
        <RenderWrapper>
          <TimelineMarkers>
            <CursorMarker />
          </TimelineMarkers>
        </RenderWrapper>
      </MarkerCanvasProvider>
    )

    const leftOffset = 1000

    subscribeToMouseOverMock.mock.calls[0][0]({
      isCursorOverCanvas: true,
      leftOffset
    })

    const el = getByTestId(defaultCursorMarkerTestId)

    expect(el).toHaveStyle(`left: ${leftOffset}px`)
  })

  it('child function is passed in date from callback', () => {
    const subscribeToMouseOverMock = jest.fn()
    const rendererMock = jest.fn(() => null)
    render(
      <MarkerCanvasProvider
        value={{ subscribeToMouseOver: subscribeToMouseOverMock }}
      >
        <RenderWrapper>
          <TimelineMarkers>
            <CursorMarker>{rendererMock}</CursorMarker>
          </TimelineMarkers>
        </RenderWrapper>
      </MarkerCanvasProvider>
    )

    const now = Date.now()

    subscribeToMouseOverMock.mock.calls[0][0]({
      isCursorOverCanvas: true,
      date: now
    })

    expect(rendererMock).toHaveBeenCalledWith({
      styles: expect.any(Object),
      date: now
    })
  })

  it('is removed after unmount', () => {
    const subscribeToMouseOverMock = jest.fn()
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
          <MarkerCanvasProvider
            value={{ subscribeToMouseOver: subscribeToMouseOverMock }}
          >
            <RenderWrapper>
              <button onClick={this.handleToggleCursorMarker}>
                Hide Cursor Marker
              </button>
              <TimelineMarkers>
                {this.state.isShowing && <CursorMarker />}
              </TimelineMarkers>
            </RenderWrapper>
          </MarkerCanvasProvider>
        )
      }
    }

    const { queryByTestId, getByText } = render(<RemoveCursorMarker />)

    subscribeToMouseOverMock.mock.calls[0][0]({
      isCursorOverCanvas: true
    })

    expect(queryByTestId(defaultCursorMarkerTestId)).toBeInTheDocument()

    fireEvent.click(getByText('Hide Cursor Marker'))

    expect(queryByTestId(defaultCursorMarkerTestId)).not.toBeInTheDocument()
  })
})
