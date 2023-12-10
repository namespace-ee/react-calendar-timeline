import React from 'react'

export const TimelineMarkerType = {
  Today: 'Today',
  Custom: 'Custom',
  Cursor: 'Cursor',
}

export type MarkerType = {
  type: typeof TimelineMarkerType
  renderer: MarkerRendererType
  interval: number
  id: number
}

export type MarkerRendererType = ({
  styles,
  date,
}: {
  styles: React.CSSProperties
  date: number
}) => React.JSX.Element
