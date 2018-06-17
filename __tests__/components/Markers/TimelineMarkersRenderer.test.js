import React from 'react'
import { render, Simulate, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'
import TimelineMarkersRenderer from 'lib/markers/TimelineMarkersRenderer'
import TimelineMarkers from 'lib/markers/TimelineMarkers'
import { TimelineMarkersProvider } from 'lib/markers/TimelineMarkersContext'
import TodayLine from 'lib/markers/TodayLine'

// eslint-disable-next-line
const RenderWrapper = ({ children }) => {
  return (
    <div>
      <TimelineMarkersProvider>
        <div>
          {children}
          <TimelineMarkersRenderer />
        </div>
      </TimelineMarkersProvider>
    </div>
  )
}

afterEach(cleanup)

describe('TimelineMarkersRenderer', () => {
  it('renders', () => {
    render(
      <RenderWrapper>
        <TimelineMarkers>
          <TodayLine />
        </TimelineMarkers>
      </RenderWrapper>
    )
  })

  it('doesnt throw error if no markers registered', () => {
    render(
      <RenderWrapper>
        <TimelineMarkers />
      </RenderWrapper>
    )
  })

  describe('TodayLine', () => {
    it('TodayLine is present', () => {
      const { getByTestId } = render(
        <RenderWrapper>
          <TimelineMarkers>
            <TodayLine />
          </TimelineMarkers>
        </RenderWrapper>
      )

      expect(getByTestId('today-line-implementation')).toBeDefined()
    })

    it('TodayLine is removed after initial render', () => {
      class RemoveTodayLine extends React.Component {
        state = {
          isShowing: true
        }
        handleToggleTodayLine = () => {
          this.setState({
            isShowing: false
          })
        }
        render() {
          return (
            <RenderWrapper>
              <button onClick={this.handleToggleTodayLine}>Hide Today</button>
              <TimelineMarkers>
                {this.state.isShowing && <TodayLine />}
              </TimelineMarkers>
            </RenderWrapper>
          )
        }
      }

      const { queryByTestId, getByText } = render(<RemoveTodayLine />)

      expect(queryByTestId('today-line-implementation')).toBeInTheDOM()

      Simulate.click(getByText('Hide Today'))

      expect(queryByTestId('today-line-implementation')).not.toBeInTheDOM()
    })
  })
})
