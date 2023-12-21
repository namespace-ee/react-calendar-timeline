import React from 'react'

export enum TimelineMarkerType {
  Today = 'Today',
  Custom = 'Custom',
  Cursor = 'Cursor',
}

export type MarkerType = {
  date?: number
  type: TimelineMarkerType
  renderer: MarkerRendererType
  interval?: number
  id?: number
}

export type MarkerRendererType = ({
  styles,
  date,
}: {
  styles: React.CSSProperties
  date: number
}) => React.JSX.Element
