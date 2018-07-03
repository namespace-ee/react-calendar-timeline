import createReactContext from 'create-react-context'

/* eslint-disable no-console */
const defaultContextState = {
  subscribeToMouseOver: () => {
    console.warn('"subscribeToMouseOver" default func is being used')
  }
}
/* eslint-enable */

const { Consumer, Provider } = createReactContext(defaultContextState)

export const MarkerCanvasProvider = Provider
export const MarkerCanvasConsumer = Consumer
