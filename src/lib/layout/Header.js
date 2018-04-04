import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TimelineElementsHeader from './TimelineElementsHeader'

class Header extends Component {
  static propTypes = {
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
    stickyOffset: PropTypes.number.isRequired,
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

    const headerStyle = {
      top: stickyOffset || 0
    }

    return (
      <div className="rct-header-container" style={headerStyle}>
        {leftSidebarHeader}
        <div style={{ width }}>
          <TimelineElementsHeader {...this.props} />
        </div>
        {rightSidebarHeader}
      </div>
    )
  }
}

export default Header
