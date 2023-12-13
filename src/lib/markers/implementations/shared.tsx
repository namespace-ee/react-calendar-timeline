import React from 'react'

/**
 * Baseline styles to get the marker to render correctly
 */
const criticalStyles: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '2px',
  backgroundColor: 'black',
  // by default, pointer events (specifically click) will
  // "pass through".  This is added so that CursorMarker
  // will not get in the way of canvas click
  pointerEvents: 'none',
}

// FIXME: this creates a new object each time in render
// might want to memoize this?
export const createMarkerStylesWithLeftOffset = (leftOffset: number) => ({
  ...criticalStyles,
  left: leftOffset,
})

export const createDefaultRenderer = (dataTestidValue: string | undefined) => {
  // eslint-disable-next-line
  return function DefaultMarkerRenderer({
    styles,
  }: {
    styles: React.CSSProperties
  }) {
    return <div style={styles} data-testid={dataTestidValue} />
  }
}
