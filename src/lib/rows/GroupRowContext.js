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
    groupHeight: PropTypes.number.isRequired,
    groupIndex: PropTypes.number.isRequired,
  }
  handleContextMenu = (e) => {
    this.props.onContextMenu(e, this.props.groupIndex)
  }
  handleClick = (e) => {
    this.props.onClick(e, this.props.groupIndex)
  }
  handleDoubleClick = (e) => {
    this.props.onDoubleClick(e, this.props.groupIndex)
  }
  render() {
    const { children, onContextMenu, onClick, onDoubleClick, ...rest } = this.props
    const value = {
      ...rest,
      onContextMenu: this.handleContextMenu,
      onClick: this.handleClick,
      onDoubleClick: this.handleDoubleClick
    }
    return <Provider value={value}>{children}</Provider>
  }
}

export const GroupRowConsumer = Consumer
export default GroupRowContext
