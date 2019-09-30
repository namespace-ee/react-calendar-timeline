import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PreventClickOnDrag from '../interaction/PreventClickOnDrag'
import interact from 'interactjs'
import { _get } from '../utility/generic'

class GroupRow extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    onContextMenu: PropTypes.func.isRequired,
    isEvenRow: PropTypes.bool.isRequired,
    style: PropTypes.object.isRequired,
    clickTolerance: PropTypes.number.isRequired,
    group: PropTypes.object.isRequired,
    horizontalLineClassNamesForGroup: PropTypes.func,
    keys: PropTypes.object
  }

  ref= React.createRef()

  componentDidMount(){
    interact(this.ref.current).dropzone({
      accept: '.rct-item',
      overlap: 'pointer'
    })
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
      children,
      keys,
    } = this.props
    // console.log(group)
    let classNamesForGroup = [];
    if (horizontalLineClassNamesForGroup) {
      classNamesForGroup = horizontalLineClassNamesForGroup(group);
    }

    return (
      <PreventClickOnDrag clickTolerance={clickTolerance} onClick={onClick}>
        <div
          ref={this.ref}
          onContextMenu={onContextMenu}
          onDoubleClick={onDoubleClick}
          className={'rct-hl '+ (isEvenRow ? 'rct-hl-even ' : 'rct-hl-odd ') + (classNamesForGroup ? classNamesForGroup.join(' ') : '')}
          style={style}
          data-groupid={_get(group, keys.groupIdKey)}
        >
          {children}
        </div>
      </PreventClickOnDrag>
    )
  }
}

export default GroupRow
