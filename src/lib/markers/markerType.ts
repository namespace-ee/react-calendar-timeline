import React, { ReactNode } from 'react'

export enum TimelineMarkerType {
  Today = 'Today',
  Custom = 'Custom',
  Cursor = 'Cursor',
}

export type MarkerType = {
  date?: number
  type: TimelineMarkerType
  renderer?: MarkerRendererType
  interval?: number
  id?: number
}

export type MarkerRendererTypeProps = { styles: React.CSSProperties; date: number }
export type MarkerRendererType = ({ styles, date }: MarkerRendererTypeProps) => ReactNode
