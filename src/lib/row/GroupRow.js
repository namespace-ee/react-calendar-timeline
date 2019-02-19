import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import PreventClickOnDrag from '../interaction/PreventClickOnDrag'

class GroupRow extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    onContextMenu: PropTypes.func.isRequired,
    isEvenRow: PropTypes.bool.isRequired,
    clickTolerance: PropTypes.number.isRequired,
    group: PropTypes.object.isRequired,
    horizontalLineClassNamesForGroup: PropTypes.func,
    order: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,

  }

  onGroupRowContextMenuClick = evt => this.props.onContextMenu(evt, this.props.order);

  onGroupRowClick = evt => this.props.onClick(evt, this.props.order)

  onGroupRowDoubleClick =evt => this.props.onDoubleClick(evt, this.props.order)

  render() {
    const {
      isEvenRow,
      clickTolerance,
      horizontalLineClassNamesForGroup,
      group,
      canvasWidth,
      height,
    } = this.props

    let classNamesForGroup = [];
    if (horizontalLineClassNamesForGroup) {
      classNamesForGroup = horizontalLineClassNamesForGroup(group);
    }

    return (
      <PreventClickOnDrag clickTolerance={clickTolerance} onClick={this.onGroupRowClick}>
        <div
          onContextMenu={this.onGroupRowContextMenuClick}
          onDoubleClick={this.onGroupRowDoubleClick}
          className={(isEvenRow ? 'rct-hl-even ' : 'rct-hl-odd ') + (classNamesForGroup ? classNamesForGroup.join(' ') : '')}
          style={{
            width: canvasWidth,
            height: height - 1
          }}
        />
      </PreventClickOnDrag>
    )
  }
}

export default GroupRow