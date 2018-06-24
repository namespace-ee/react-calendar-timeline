import React from 'react'
import { TimelineMarkersConsumer } from './TimelineMarkersContext'
import { TimelineMarkerType } from './markerType'
import TodayMarker from './implementations/TodayMarker'
import CustomMarker from './implementations/CustomMarker'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext'
import CursorMarker from './implementations/CursorMarker'

/** Internal component used in timeline to render markers registered */
const TimelineMarkersRenderer = () => {
  return (
    <TimelineStateConsumer>
      {({ getLeftOffsetFromDate }) => (
        <TimelineMarkersConsumer>
          {({ markers }) => {
            return markers.map(marker => {
              switch (marker.type) {
                case TimelineMarkerType.Today:
                  return (
                    <TodayMarker
                      key={marker.id}
                      getLeftOffsetFromDate={getLeftOffsetFromDate}
                      renderer={marker.renderer}
                      interval={marker.interval}
                    />
                  )
                case TimelineMarkerType.Custom:
                  return (
                    <CustomMarker
                      key={marker.id}
                      renderer={marker.renderer}
                      date={marker.date}
                      getLeftOffsetFromDate={getLeftOffsetFromDate}
                    />
                  )
                case TimelineMarkerType.Cursor:
                  return (
                    <CursorMarker
                      key={marker.id}
                      renderer={marker.renderer}
                      getLeftOffsetFromDate={getLeftOffsetFromDate}
                    />
                  )
                default:
                  return null
              }
            })
          }}
        </TimelineMarkersConsumer>
      )}
    </TimelineStateConsumer>
  )
}

export default TimelineMarkersRenderer
