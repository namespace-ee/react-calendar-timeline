import React from 'react';
import PropTypes from 'prop-types'

const defaultContextState = {
  lineCount: undefined,
  minUnit: undefined,
  timeSteps: undefined,
  height: undefined,
  verticalLineClassNamesForTime: undefined
}

const ColumnsContext = React.createContext(defaultContextState)

const { Consumer, Provider } = ColumnsContext

export function ColumnsContextProvider({children,...rest}) {
    return <Provider value={rest}>
        {children}
    </Provider>
}

ColumnsContextProvider.propTypes={
    lineCount: PropTypes.number.isRequired,
    minUnit: PropTypes.string.isRequired,
    timeSteps: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    verticalLineClassNamesForTime: PropTypes.func,
}

export const ColumnsConsumer = Consumer;
export default ColumnsContext;
