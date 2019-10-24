import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const defaultContextState = {
    itemsWithInteractions: undefined,
    getLayerRootProps: undefined,
}

const LayerContext = React.createContext(defaultContextState)

const { Consumer, Provider } = LayerContext

export class LayerContextProvider extends PureComponent {
  static propTypes = {
    itemsWithInteractions: PropTypes.array.isRequired,
    getLayerRootProps: PropTypes.func.isRequired,
  }
  render() {
    const { children, ...rest } = this.props
    const value = {
      ...rest,
    }
    return <Provider value={value}>{children}</Provider>
  }
}

export const LayerConsumer = Consumer
export default LayerContext
