import PropTypes from 'prop-types'
import React, { Component } from 'react'
import GroupRow from './GroupRow'

export default class GroupRows extends Component {
  static propTypes = {
    canvasWidth: PropTypes.number.isRequired,
    lineCount: PropTypes.number.isRequired,
    groupHeights: PropTypes.array.isRequired,
    onRowClick: PropTypes.func.isRequired,
    onRowDoubleClick: PropTypes.func.isRequired,
    clickTolerance: PropTypes.number.isRequired,
    groups: PropTypes.array.isRequired,
    horizontalLineClassNamesForGroup: PropTypes.func,
    onRowContextClick: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !(
      nextProps.canvasWidth === this.props.canvasWidth &&
      nextProps.lineCount === this.props.lineCount &&
      nextProps.groupHeights === this.props.groupHeights &&
      nextProps.groups === this.props.groups
    )
  }

  render() {
    const {
      canvasWidth,
      lineCount,
      groupHeights,
      onRowClick,
      onRowDoubleClick,
      clickTolerance,
      groups,
      horizontalLineClassNamesForGroup,
      onRowContextClick,
    } = this.props
    let lines = []

    for (let i = 0; i < lineCount; i++) {
      const group = groups[i]
      lines.push(
        <GroupRow
          clickTolerance={clickTolerance}
          onContextMenu={evt => onRowContextClick(evt, i, group)}
          onClick={evt => onRowClick(evt, i, group)}
          onDoubleClick={evt => onRowDoubleClick(evt, i, group)}
          key={`horizontal-line-${i}`}
          isEvenRow={i % 2 === 0}
          group={group}
          horizontalLineClassNamesForGroup={horizontalLineClassNamesForGroup}
          style={{
            width: `${canvasWidth}px`,
            height: `${groupHeights[i] - 1}px`
          }}
        />
      )
    }

    return <div className="rct-horizontal-lines">{lines}</div>
  }
}
