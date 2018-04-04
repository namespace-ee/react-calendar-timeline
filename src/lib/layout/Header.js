import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimelineElementsHeader from './TimelineElementsHeader'

class Header extends Component {
  static propTypes = {
    // header props
    hasRightSidebar: PropTypes.bool.isRequired,
    showPeriod: PropTypes.func.isRequired,
    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    lineHeight: PropTypes.number.isRequired,
    minUnit: PropTypes.string.isRequired,
    timeSteps: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    headerLabelFormats: PropTypes.object.isRequired,
    subHeaderLabelFormats: PropTypes.object.isRequired,
    fixedHeader: PropTypes.oneOf(['fixed', 'sticky', 'none']),
    stickyOffset: PropTypes.number.isRequired,
    headerPosition: PropTypes.oneOf(['top', 'bottom', 'fixed']),
    headerLabelGroupHeight: PropTypes.number.isRequired,
    headerLabelHeight: PropTypes.number.isRequired,
    registerScroll: PropTypes.func.isRequired,
    leftSidebarHeader: PropTypes.node,
    rightSidebarHeader: PropTypes.node
  }

  render() {
    const {
      leftSidebarHeader,
      rightSidebarHeader,
      width,
      stickyOffset
    } = this.props
    const leftSidebarHeaderDiv = (
      <div className="rct-sidebar-header">{leftSidebarHeader}</div>
    )

    const rightSidebarHeaderDiv = (
      <div className="rct-sidebar-header rct-sidebar-right">
        {rightSidebarHeader}
      </div>
    )

    const headerStyle = {
      display: 'flex',
      zIndex: 100, //TODO: get a hold of zindex yall
      position: 'sticky',
      top: stickyOffset || 0
    }

    return (
      <div style={headerStyle}>
        {leftSidebarHeaderDiv}
        <div style={{ width }}>
          <TimelineElementsHeader {...this.props} />
        </div>
        {rightSidebarHeaderDiv}
      </div>
    )
  }
}

export default Header
