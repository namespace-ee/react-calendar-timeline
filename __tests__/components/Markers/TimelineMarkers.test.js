import React from 'react'
import { render } from 'react-testing-library'
import 'jest-dom/extend-expect'
import TimelineMarkers from 'lib/markers/TimelineMarkers'
import TodayMarker from 'lib/markers/TodayMarker'
import { RenderWrapper } from 'test-utility/marker-renderer'

describe('TimelineMarkers', () => {
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
})
