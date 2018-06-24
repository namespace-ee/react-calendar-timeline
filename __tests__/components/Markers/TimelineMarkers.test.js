import React from 'react'
import { render } from 'react-testing-library'
import 'jest-dom/extend-expect'
import TimelineMarkers from 'lib/markers/public/TimelineMarkers'
import TodayMarker from 'lib/markers/public/TodayMarker'
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
