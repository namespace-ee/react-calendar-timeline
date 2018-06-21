import React from 'react'
import { render, Simulate } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { RenderWrapper } from 'test-utility/marker-renderer'
import TimelineMarkers from 'lib/markers/TimelineMarkers'
import TodayMarker from 'lib/markers/TodayMarker'

describe('TodayMarker', () => {
  it('TodayMarker is present', () => {
    const { getByTestId } = render(
      <RenderWrapper>
        <TimelineMarkers>
          <TodayMarker />
        </TimelineMarkers>
      </RenderWrapper>
    )

    expect(getByTestId('today-line-implementation')).toBeInTheDOM()
  })

  it('TodayMarker is removed after initial render', () => {
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

    expect(queryByTestId('today-line-implementation')).toBeInTheDOM()

    Simulate.click(getByText('Hide Today'))

    expect(queryByTestId('today-line-implementation')).not.toBeInTheDOM()
  })
})
