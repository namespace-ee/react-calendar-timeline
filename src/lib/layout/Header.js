import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TimelineElementsHeader from './TimelineElementsHeader'

class Header extends PureComponent {
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
    stickyOffset: PropTypes.number,
    stickyHeader: PropTypes.bool.isRequired,
    headerLabelGroupHeight: PropTypes.number.isRequired,
    headerLabelHeight: PropTypes.number.isRequired,
    registerScroll: PropTypes.func.isRequired,
    leftSidebarHeader: PropTypes.func,
    rightSidebarHeader: PropTypes.func,
    headerRef: PropTypes.func.isRequired
  }

  render() {
    const {
      leftSidebarHeader,
      rightSidebarHeader,
      width,
      stickyOffset,
      stickyHeader,
      headerRef
    } = this.props

    const headerStyle = {
      top: stickyHeader ? stickyOffset || 0 : 0
    }

    const headerClass = stickyHeader ? 'header-sticky' : ''

    return (
      <div
        className={`rct-header-container ${headerClass}`}
        data-test-id="timeline-elements-container"
        ref={headerRef}
        style={headerStyle}
      >
        {leftSidebarHeader()}
        <div
          style={{ width }}
          data-test-id="timeline-elements-header-container"
        >
          <TimelineElementsHeader
            data-test-id="timeline-elements-header"
            {...this.props}
          />
        </div>
        {rightSidebarHeader()}
      </div>
    )
  }
}

export default Header
