import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { _get, arraysEqual } from '../utility/generic'

export default class Sidebar extends Component {
  static propTypes = {
    groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    groupHeights: PropTypes.array.isRequired,
    keys: PropTypes.object.isRequired,
    groupRenderer: PropTypes.func,
    isRightSidebar: PropTypes.bool,
  }

  shouldComponentUpdate(nextProps) {
    return !(
      arraysEqual(nextProps.groups, this.props.groups) &&
      nextProps.keys === this.props.keys &&
      nextProps.width === this.props.width &&
      nextProps.groupHeights === this.props.groupHeights &&
      nextProps.height === this.props.height
    )
  }

  renderGroupContent(group, isRightSidebar, groupTitleKey, groupRightTitleKey) {
    if (this.props.groupRenderer) {
      return React.createElement(this.props.groupRenderer, {
        group,
        isRightSidebar
      })
    } else {
      return _get(group, isRightSidebar ? groupRightTitleKey : groupTitleKey)
    }
  }

  render() {
    const { width, groupHeights, height, isRightSidebar } = this.props

    const { groupIdKey, groupTitleKey, groupRightTitleKey } = this.props.keys

    const sidebarStyle = {
      width: `${width}px`,
      height: `${height}px`
    }

    const groupsStyle = {
      width: `${width}px`
    }

    let groupLines = this.props.groups.map((group, index) => {
      const elementStyle = {
        height: `${groupHeights[index] - 1}px`,
        lineHeight: `${groupHeights[index] - 1}px`
      }

      return (
        <div
          key={_get(group, groupIdKey)}
          className={
            'rct-sidebar-row rct-sidebar-row-' + (index % 2 === 0 ? 'even' : 'odd')
          }
          style={elementStyle}
        >
          {this.renderGroupContent(
            group,
            isRightSidebar,
            groupTitleKey,
            groupRightTitleKey
          )}
        </div>
      )
    })

    return (
      <div
        className={'rct-sidebar' + (isRightSidebar ? ' rct-sidebar-right' : '')}
        style={sidebarStyle}
      >
        <div style={groupsStyle}>{groupLines}</div>
      </div>
    )
  }
}
