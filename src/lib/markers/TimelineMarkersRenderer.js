import React from 'react'
// import PropTypes from 'prop-types'
import { TimelineMarkersConsumer } from './TimelineMarkersContext'
import { TimelineMarkerType } from './markerType'
import TodayMarker from './implementations/TodayMarker'

/** Internal component used in timeline to render markers registered */
const TimelineMarkersRenderer = () => {
  return (
    <TimelineMarkersConsumer>
      {({ markers }) => {
        return markers.map(marker => {
          switch (marker.type) {
            case TimelineMarkerType.Today:
              return <TodayMarker key={marker.id} />
            default:
              return null
          }
        })
      }}
    </TimelineMarkersConsumer>
  )
}

// TimelineMarkersRenderer.propTypes = {

// }

export default TimelineMarkersRenderer
