import React from 'react'

/* eslint-disable no-console */
const defaultContextState = {
  subscribeToMouseOver: () => {
    console.warn('"subscribeToMouseOver" default func is being used')
    return () => {}
  },
}

type Params = {
  leftOffset: number
  date: number
  isCursorOverCanvas: boolean
}
/* eslint-enable */
export type MarkerCanvasContext = {
  subscribeToMouseOver: (p: (params: Params) => void) => void
}

const { Consumer, Provider } =
  React.createContext<MarkerCanvasContext>(defaultContextState)

export const MarkerCanvasProvider = Provider
export const MarkerCanvasConsumer = Consumer
