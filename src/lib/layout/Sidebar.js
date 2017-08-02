import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { _get, arraysEqual } from '../utils'

export default class Sidebar extends Component {
  static propTypes = {
    groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    lineHeight: PropTypes.number.isRequired,
    groupHeights: PropTypes.array.isRequired,
    fixedHeader: PropTypes.oneOf(['fixed', 'sticky', 'none']),
    stickyOffset: PropTypes.number.isRequired,
    headerPosition: PropTypes.oneOf(['top', 'bottom', 'fixed']),
    keys: PropTypes.object.isRequired,
    groupRenderer: PropTypes.func,
    children: PropTypes.node,
    isRightSidebar: PropTypes.bool
  }

  static defaultProps = {
    fixedHeader: 'sticky',
    stickyOffset: 0,
    headerPosition: 'top',
    children: null,
    isRightSidebar: false
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(arraysEqual(nextProps.groups, this.props.groups) &&
             nextProps.keys === this.props.keys &&
             nextProps.width === this.props.width &&
             nextProps.lineHeight === this.props.lineHeight &&
             nextProps.fixedHeader === this.props.fixedHeader &&
             nextProps.stickyOffset === this.props.stickyOffset &&
             nextProps.headerPosition === this.props.headerPosition &&
             nextProps.groupHeights === this.props.groupHeights &&
             nextProps.height === this.props.height)
  }

  renderGroupContent (group, isRightSidebar, groupTitleKey, groupRightTitleKey) {
    if (this.props.groupRenderer) {
      return React.createElement(this.props.groupRenderer, { group, isRightSidebar })
    } else {
      return _get(group, isRightSidebar ? groupRightTitleKey : groupTitleKey)
    }
  }

  render () {
    const {
      fixedHeader, stickyOffset, width, lineHeight, groupHeights, height, headerHeight, isRightSidebar, headerPosition
    } = this.props

    const {groupIdKey, groupTitleKey, groupRightTitleKey} = this.props.keys

    const sidebarStyle = {
      width: `${width}px`,
      height: `${height}px`
    }

    const headerStyle = {
      height: `${headerHeight}px`,
      lineHeight: `${lineHeight}px`,
      width: `${width}px`
    }

    const groupsStyle = {
      width: `${width}px`
    }

    if (fixedHeader === 'fixed') {
      headerStyle.position = 'fixed'
      groupsStyle.paddingTop = headerStyle.height
    } else if (fixedHeader === 'sticky') {
      if (headerPosition === 'top') {
        // do nothing - keep at the top
      } else if (headerPosition === 'fixed') {
        headerStyle.position = 'fixed'
        headerStyle.top = stickyOffset
        groupsStyle.paddingTop = headerStyle.height
      } else if (headerPosition === 'bottom') {
        headerStyle.position = 'absolute'
        headerStyle.bottom = 0
        groupsStyle.paddingTop = headerStyle.height
      }
    }

    const header = <div ref='sidebarHeader' className='rct-sidebar-header' style={headerStyle}>
                     {this.props.children}
                   </div>

    let groupLines = []
    let i = 0

    this.props.groups.forEach((group, index) => {
      const elementStyle = {
        height: `${groupHeights[index] - 1}px`,
        lineHeight: `${groupHeights[index] - 1}px`
      }

      groupLines.push(
        <div key={_get(group, groupIdKey)} className={'rct-sidebar-row' + (i % 2 === 0 ? ' rct-sidebar-row-even' : ' rct-sidebar-row-odd')} style={elementStyle}>
          {this.renderGroupContent(group, isRightSidebar, groupTitleKey, groupRightTitleKey)}
        </div>
      )
      i += 1
    })

    return (
      <div ref='sidebar' className={'rct-sidebar' + (isRightSidebar ? ' rct-sidebar-right' : '')} style={sidebarStyle}>
        {header}
        <div style={groupsStyle}>
          {groupLines}
        </div>
      </div>
    )
  }
}
