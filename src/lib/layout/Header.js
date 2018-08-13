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
    minUnit: PropTypes.string.isRequired,
    timeSteps: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    headerLabelFormats: PropTypes.object.isRequired,
    subHeaderLabelFormats: PropTypes.object.isRequired,
    stickyOffset: PropTypes.number,
    stickyHeader: PropTypes.bool.isRequired,
    headerLabelGroupHeight: PropTypes.number.isRequired,
    headerLabelHeight: PropTypes.number.isRequired,
    leftSidebarHeader: PropTypes.node,
    rightSidebarHeader: PropTypes.node,
    leftSidebarWidth: PropTypes.number,
    rightSidebarWidth: PropTypes.number,
    headerRef: PropTypes.func.isRequired,
    scrollHeaderRef: PropTypes.func.isRequired
  }

  render() {
    const {
      width,
      stickyOffset,
      stickyHeader,
      headerRef,
      scrollHeaderRef,
      hasRightSidebar,
      showPeriod,
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
      minUnit,
      timeSteps,
      headerLabelFormats,
      subHeaderLabelFormats,
      headerLabelGroupHeight,
      headerLabelHeight,
      leftSidebarHeader,
      rightSidebarHeader,
      leftSidebarWidth,
      rightSidebarWidth
    } = this.props

    const headerStyle = {
      top: stickyHeader ? stickyOffset || 0 : 0
    }

    const headerClass = stickyHeader ? 'header-sticky' : ''

    const leftSidebar = leftSidebarHeader && leftSidebarWidth > 0 && (
      <div
        className="rct-sidebar-header"
        style={{ width: leftSidebarWidth }}
      >
        {leftSidebarHeader}
      </div>
    )

    const rightSidebar = rightSidebarHeader && rightSidebarWidth > 0 && (
      <div
        className="rct-sidebar-header rct-sidebar-right"
        style={{ width: rightSidebarWidth }}
      >
        {rightSidebarHeader}
      </div>
    )

    return (
      <div
        className={`rct-header-container ${headerClass}`}
        data-testid="timeline-elements-container"
        ref={headerRef}
        style={headerStyle}
      >
        {leftSidebar}
        <div style={{ width }} data-testid="timeline-elements-header-container">
          <TimelineElementsHeader
            data-testid="timeline-elements-header"
            hasRightSidebar={hasRightSidebar}
            showPeriod={showPeriod}
            canvasTimeStart={canvasTimeStart}
            canvasTimeEnd={canvasTimeEnd}
            canvasWidth={canvasWidth}
            minUnit={minUnit}
            timeSteps={timeSteps}
            width={width}
            headerLabelFormats={headerLabelFormats}
            subHeaderLabelFormats={subHeaderLabelFormats}
            headerLabelGroupHeight={headerLabelGroupHeight}
            headerLabelHeight={headerLabelHeight}
            scrollHeaderRef={scrollHeaderRef}

          />
        </div>
        {rightSidebar}
      </div>
    )
  }
}

export default Header
