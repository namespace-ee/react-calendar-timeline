import React from 'react'
import { render, Simulate } from 'react-testing-library'
import 'jest-dom/extend-expect'
import TimelineMarkers from 'lib/markers/TimelineMarkers'
import CustomMarker from 'lib/markers/CustomMarker'
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
