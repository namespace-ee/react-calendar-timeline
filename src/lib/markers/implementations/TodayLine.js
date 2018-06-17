import React from 'react'

// this should expect a timelineContext prop or some
// way to calculate left position

const staticStyles = {
  position: 'absolute',
  top: 0,
  bottom: 0
}

/** Implementation of TodayLine.  This component will be in charge
 * of setting interval as to when to re render with new time
 */
class TodayLine extends React.Component {
  render() {
    return <div style={staticStyles} data-testid="today-line-implementation" />
  }
}

export default TodayLine
