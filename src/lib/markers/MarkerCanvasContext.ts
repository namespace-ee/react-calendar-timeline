import React from 'react'

/* eslint-disable no-console */
const defaultContextState = {
  subscribeToMouseOver: () => {
    console.warn('"subscribeToMouseOver" default func is being used')
  }
}
/* eslint-enable */

const { Consumer, Provider } = React.createContext(defaultContextState)

export const MarkerCanvasProvider = Provider
export const MarkerCanvasConsumer = Consumer
