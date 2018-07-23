import React from 'react'

/**
 * Baseline styles to get the marker to render correctly
 */
const criticalStyles = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '2px',
  backgroundColor: 'black'
}

// FIXME: this creates a new object each time in render
// might want to memoize this?
export const createMarkerStylesWithLeftOffset = leftOffset => ({
  ...criticalStyles,
  left: leftOffset
})

export const createDefaultRenderer = dataTestidValue => {
  // eslint-disable-next-line
  return function DefaultMarkerRenderer({ styles }) {
    return <div style={styles} data-testid={dataTestidValue} />
  }
}
