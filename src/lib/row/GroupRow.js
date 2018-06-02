import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PreventClickOnDrag from '../interaction/PreventClickOnDrag'

class GroupRow extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    isEvenRow: PropTypes.bool.isRequired,
    style: PropTypes.object.isRequired
  }

  render() {
    const { onDoubleClick, isEvenRow, style, onClick } = this.props

    return (
      <PreventClickOnDrag onClick={onClick}>
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
