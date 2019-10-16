import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const defaultContextState = {
  clickTolerance: undefined,
  onContextMenu: undefined,
  onClick: undefined,
  onDoubleClick: undefined,
  isEvenRow: undefined,
  group: undefined,
  horizontalLineClassNamesForGroup: undefined,
  groupHeight: undefined
}

const GroupRowContext = React.createContext(defaultContextState)

const { Consumer, Provider } = GroupRowContext

export class GroupRowContextProvider extends PureComponent {
  static propTypes = {
    clickTolerance: PropTypes.number.isRequired,
    onContextMenu: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    isEvenRow: PropTypes.bool.isRequired,
    group: PropTypes.object.isRequired,
    horizontalLineClassNamesForGroup: PropTypes.func,
    groupHeight: PropTypes.number.isRequired
  }
  render() {
    const { children, ...rest } = this.props
    return <Provider value={rest}>{children}</Provider>
  }
}

export const GroupRowConsumer = Consumer
export default GroupRowContext
