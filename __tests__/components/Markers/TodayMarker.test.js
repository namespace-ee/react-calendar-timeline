import React from 'react'
import { render, Simulate } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { RenderWrapper } from 'test-utility/marker-renderer'
import TimelineMarkers from 'lib/markers/public/TimelineMarkers'
import TodayMarker from 'lib/markers/public/TodayMarker'

const defaultTestId = 'default-today-line'

describe('TodayMarker', () => {
  it('is present', () => {
    const { getByTestId } = render(
      <RenderWrapper>
        <TimelineMarkers>
          <TodayMarker />
        </TimelineMarkers>
      </RenderWrapper>
    )

    expect(getByTestId(defaultTestId)).toBeInTheDOM()
  })

  it('is removed after initial render', () => {
    class RemoveTodayMarker extends React.Component {
      state = {
        isShowing: true
      }
      handleToggleTodayMarker = () => {
        this.setState({
          isShowing: false
        })
      }
      render() {
        return (
          <RenderWrapper>
            <button onClick={this.handleToggleTodayMarker}>Hide Today</button>
            <TimelineMarkers>
              {this.state.isShowing && <TodayMarker />}
            </TimelineMarkers>
          </RenderWrapper>
        )
      }
    }

    const { queryByTestId, getByText } = render(<RemoveTodayMarker />)

    expect(queryByTestId(defaultTestId)).toBeInTheDOM()

    Simulate.click(getByText('Hide Today'))

    expect(queryByTestId(defaultTestId)).not.toBeInTheDOM()
  })

  it('allows for custom renderer', () => {
    const dataTestId = 'custom-today-renderer'

    const { getByTestId } = render(
      <RenderWrapper>
        <TimelineMarkers>
          <TodayMarker>{() => <div data-testid={dataTestId} />}</TodayMarker>
        </TimelineMarkers>
      </RenderWrapper>
    )

    expect(getByTestId(dataTestId)).toBeInTheDOM()
  })

  it('custom renderer is passed styles and date', () => {
    const renderMock = jest.fn(() => null)

    render(
      <RenderWrapper>
        <TimelineMarkers>
          <TodayMarker>{renderMock}</TodayMarker>
        </TimelineMarkers>
      </RenderWrapper>
    )

    // FIXME: test for date and styles as actual values
    expect(renderMock).toHaveBeenCalledWith({
      date: expect.any(Number),
      styles: expect.any(Object)
    })
  })

  // TODO: find good way to test these interval based functionality
  // xit('sets setInterval timeout based on passed in prop')
  // xit('sets setInterval timeout to 10 seconds if no interval prop passed in')
})
