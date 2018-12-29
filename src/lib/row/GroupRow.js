import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import PreventClickOnDrag from '../interaction/PreventClickOnDrag'
import { Droppable } from 'react-beautiful-dnd'

class GroupRow extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    onContextMenu: PropTypes.func.isRequired,
    isEvenRow: PropTypes.bool.isRequired,
    style: PropTypes.object.isRequired,
    clickTolerance: PropTypes.number.isRequired,
    group: PropTypes.object.isRequired,
    horizontalLineClassNamesForGroup: PropTypes.func
  }

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

    let classNamesForGroup = [];
    if (horizontalLineClassNamesForGroup) {
      classNamesForGroup = horizontalLineClassNamesForGroup(group);
    }

    // console.log(group)

    return (
      <Droppable droppableId={group.id}>
              {(provided, snapshot) => (<PreventClickOnDrag clickTolerance={clickTolerance} onClick={onClick}><div
                ref={provided.innerRef}
                onContextMenu={onContextMenu}
                onDoubleClick={onDoubleClick}
                className={(isEvenRow ? 'rct-hl-even ' : 'rct-hl-odd ') + (classNamesForGroup ? classNamesForGroup.join(' ') : '') + (snapshot.isDraggingOver ? ' dragging-over' : '')}
                style={style}
              /></PreventClickOnDrag>)}
      </Droppable>
    )
  }
}

export default GroupRow
