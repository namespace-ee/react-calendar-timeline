import React, { Component, MouseEventHandler } from 'react'
import PreventClickOnDrag from '../interaction/PreventClickOnDrag'

interface GroupRowProps<T> {
  onClick: MouseEventHandler<HTMLDivElement>
  onDoubleClick?: MouseEventHandler<HTMLDivElement>
  onContextMenu?: MouseEventHandler<HTMLDivElement>
  isEvenRow?: boolean
  style?: React.CSSProperties
  clickTolerance?: number | undefined
  group: T
  horizontalLineClassNamesForGroup?: (group: T) => string[]
}

class GroupRow<T> extends Component<GroupRowProps<T>> {
  render() {
    const {
      onContextMenu,
      onDoubleClick,
      isEvenRow,
      style,
      onClick,
      clickTolerance,
      horizontalLineClassNamesForGroup,
      group,
    } = this.props

    let classNamesForGroup: string[] = []
    if (horizontalLineClassNamesForGroup) {
      classNamesForGroup = horizontalLineClassNamesForGroup(group)
    }

    return (
      <PreventClickOnDrag clickTolerance={clickTolerance} onClick={onClick}>
        <div
          onContextMenu={onContextMenu}
          onDoubleClick={onDoubleClick}
          className={
            (isEvenRow ? 'rct-hl-even ' : 'rct-hl-odd ') + (classNamesForGroup ? classNamesForGroup.join(' ') : '')
          }
          style={style}
        />
      </PreventClickOnDrag>
    )
  }
}

export default GroupRow
