import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { RenderWrapper } from 'test-utility/marker-renderer'
import TimelineMarkers from 'lib/markers/public/TimelineMarkers'
import TodayMarker from 'lib/markers/public/TodayMarker'

const defaultTestId = 'default-today-line'

describe('TodayMarker', () => {
  afterEach(cleanup)
  it('is present', () => {
    const { getByTestId } = render(
      <RenderWrapper>
        <TimelineMarkers>
          <TodayMarker />
        </TimelineMarkers>
      </RenderWrapper>
    )

    expect(getByTestId(defaultTestId)).toBeInTheDocument()
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

    expect(queryByTestId(defaultTestId)).toBeInTheDocument()

    fireEvent.click(getByText('Hide Today'))

    expect(queryByTestId(defaultTestId)).not.toBeInTheDocument()
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

    expect(getByTestId(dataTestId)).toBeInTheDocument()
  })

  it('custom renderer is passed styles and date', () => {
    const renderMock = vi.fn(() => null)

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

  it('sets setInterval timeout based on passed in prop', () => {
    const spy = vi.spyOn(global, 'setInterval')

    render(
      <RenderWrapper>
        <TimelineMarkers>
          <TodayMarker interval={5000} />
        </TimelineMarkers>
      </RenderWrapper>
    )

    expect(spy).toHaveBeenCalledWith(expect.any(Function), 5000)
    spy.mockRestore()
  })

  it('sets setInterval timeout to 10 seconds if no interval prop passed in', () => {
    const spy = vi.spyOn(global, 'setInterval')

    render(
      <RenderWrapper>
        <TimelineMarkers>
          <TodayMarker />
        </TimelineMarkers>
      </RenderWrapper>
    )

    expect(spy).toHaveBeenCalledWith(expect.any(Function), 10000)
    spy.mockRestore()
  })
})
