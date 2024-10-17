import React from 'react'

const defaultContextState = {
  subscribeToMouseOver: () => {
    console.warn('"subscribeToMouseOver" default func is being used')
    return () => {}
  },
}

export type HandleCanvasMouseOver = ({
  leftOffset,
  date,
  isCursorOverCanvas,
}: {
  leftOffset: number
  date: number
  isCursorOverCanvas: boolean
}) => void
export type MarkerCanvasContext = {
  subscribeToMouseOver: (p: HandleCanvasMouseOver) => () => void
}

const { Consumer, Provider } =
  React.createContext<MarkerCanvasContext>(defaultContextState)

export const MarkerCanvasProvider = Provider
export const MarkerCanvasConsumer = Consumer
