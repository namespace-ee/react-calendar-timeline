import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PreventClickOnDrag from '../interaction/PreventClickOnDrag'

class GroupRow extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    isEvenRow: PropTypes.bool.isRequired,
    style: PropTypes.object.isRequired,
    clickTolerance: PropTypes.number.isRequired
  }

  render() {
    const {
      onDoubleClick,
      isEvenRow,
      style,
      onClick,
      clickTolerance
    } = this.props

    return (
      <PreventClickOnDrag clickTolerance={clickTolerance} onClick={onClick}>
        <div
          onDoubleClick={onDoubleClick}
          className={isEvenRow ? 'rct-hl-even' : 'rct-hl-odd'}
          style={style}
        />
      </PreventClickOnDrag>
    )
  }
}

export default GroupRow
