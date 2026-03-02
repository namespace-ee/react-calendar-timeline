import { render } from '@testing-library/react'
import TimelineMarkers from 'lib/markers/public/TimelineMarkers'
import TodayMarker from 'lib/markers/public/TodayMarker'
import CustomMarker from 'lib/markers/public/CustomMarker'
import { RenderWrapper } from 'test-utility/marker-renderer'

describe('TimelineMarkers', () => {
  it('renders', () => {
    const { container } = render(
      <RenderWrapper>
        <TimelineMarkers>
          <TodayMarker />
        </TimelineMarkers>
      </RenderWrapper>
    )
    expect(container).toBeInTheDocument()
  })

  it('doesnt throw error if no markers registered', () => {
    const { container } = render(
      <RenderWrapper>
        <TimelineMarkers />
      </RenderWrapper>
    )
    expect(container).toBeInTheDocument()
  })

  it('is unsubscribed on unmounting after passing new date then hide it', ()=>{
    const defaultCustomMarkerTestId = 'default-customer-marker-id'
    const { queryByTestId, rerender } = render(
      <RenderWrapper>
        <TimelineMarkers>
          <CustomMarker date={1000} />
        </TimelineMarkers>
      </RenderWrapper>)

    rerender(<RenderWrapper>
      <TimelineMarkers>
        <CustomMarker date={2000} />
      </TimelineMarkers>
    </RenderWrapper>)

    rerender(<RenderWrapper>
      <TimelineMarkers>
      </TimelineMarkers>
    </RenderWrapper>)

    expect(queryByTestId(defaultCustomMarkerTestId)).not.toBeInTheDocument()
  })
})
