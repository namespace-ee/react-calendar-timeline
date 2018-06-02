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
    clickTolerance: PropTypes.number.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return !(
      nextProps.canvasWidth === this.props.canvasWidth &&
      nextProps.lineCount === this.props.lineCount &&
      nextProps.groupHeights === this.props.groupHeights
    )
  }

  render() {
    const {
      canvasWidth,
      lineCount,
      groupHeights,
      onRowClick,
      onRowDoubleClick,
      clickTolerance
    } = this.props
    let lines = []

    for (let i = 0; i < lineCount; i++) {
      lines.push(
        <GroupRow
          clickTolerance={clickTolerance}
          onClick={evt => onRowClick(evt, i)}
          onDoubleClick={evt => onRowDoubleClick(evt, i)}
          key={`horizontal-line-${i}`}
          isEvenRow={i % 2 === 0}
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
