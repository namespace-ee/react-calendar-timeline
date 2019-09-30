import React from 'react';
import PropTypes from 'prop-types'

const defaultContextState = {
  lineCount: undefined,
  minUnit: undefined,
  timeSteps: undefined,
  height: undefined,
  verticalLineClassNamesForTime: undefined
}

const ItemContext = React.createContext(defaultContextState)

const { Consumer, Provider } = ItemContext

export function ItemContextProvider({children,...rest}) {
    return <Provider value={rest}>
        {children}
    </Provider>
}

ItemContextProvider.propTypes={
    lineCount: PropTypes.number.isRequired,
    minUnit: PropTypes.string.isRequired,
    timeSteps: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    verticalLineClassNamesForTime: PropTypes.func,
}

export const ItemConsumer = Consumer;
export default ItemContext;
