import React from 'react'
import { render, Simulate, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'
import TimelineMarkersRenderer from 'lib/markers/TimelineMarkersRenderer'
import TimelineMarkers from 'lib/markers/TimelineMarkers'
import { TimelineMarkersProvider } from 'lib/markers/TimelineMarkersContext'
import TodayMarker from 'lib/markers/TodayMarker'
import CustomMarker from 'lib/markers/CustomMarker'

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
          <TodayMarker />
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
})
