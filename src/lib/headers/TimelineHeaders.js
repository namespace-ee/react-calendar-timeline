import React from 'react'
import classNames from 'classnames'
import { TimelineHeadersConsumer } from './HeadersContext'
import PropTypes from 'prop-types'
import SidebarHeader from './SidebarHeader'
import { RIGHT_VARIANT } from './constants'
class TimelineHeaders extends React.Component {
  static propTypes = {
    registerScroll: PropTypes.func.isRequired,
    leftSidebarWidth: PropTypes.number.isRequired,
    rightSidebarWidth: PropTypes.number.isRequired,
    style: PropTypes.object,
    children: PropTypes.node,
    className: PropTypes.string,
    calendarHeaderStyle: PropTypes.object,
    calendarHeaderClassName: PropTypes.string,
    headerRef: PropTypes.func,
    sticky: PropTypes.bool
  }

  getRootStyle = () => {
    return {
      ...this.props.style,
      display: 'flex',
      width: '300%',
      ...(this.props.sticky
        ? {
            position: 'sticky',
            zIndex: 101,
            top: 0
          }
        : null)
    }
  }

  handleRootRef = element => {
    if (this.props.headerRef) {
      this.props.headerRef(element)
    }
  }

  /**
   * check if child of type SidebarHeader
   * refer to for explanation https://github.com/gaearon/react-hot-loader#checking-element-types
   */
  isSidebarHeader = child => {
    if (child.type === undefined) return false
    return child.type.secretKey === SidebarHeader.secretKey
  }

  render() {
    let rightSidebarHeader
    let leftSidebarHeader
    let calendarHeaders = []
    const {
      children,
      className,
      registerScroll,
      rightSidebarWidth,
      calendarHeaderStyle,
      calendarHeaderClassName
    } = this.props
    React.Children.map(
      Array.isArray(children) ? children.filter(c => c) : [children],
      child => {
        if (this.isSidebarHeader(child)) {
          if (child.props.variant === RIGHT_VARIANT) {
            rightSidebarHeader = child
          } else {
            leftSidebarHeader = child
          }
        } else {
          calendarHeaders.push(child)
        }
      }
    )
    if (!leftSidebarHeader) {
      leftSidebarHeader = <SidebarHeader />
    }
    if (!rightSidebarHeader && rightSidebarWidth) {
      rightSidebarHeader = <SidebarHeader variant="right" />
    }
    return (
      <div
        ref={this.handleRootRef}
        data-testid="headerRootDiv"
        style={this.getRootStyle()}
        className={classNames('rct-header-root', className)}
      >
        {leftSidebarHeader}
        <div
          ref={registerScroll}
          style={{ ...calendarHeaderStyle, position: 'relative' }}
          className={classNames('rct-calendar-header', calendarHeaderClassName)}
          data-testid="headerContainer"
        >
          {calendarHeaders}
        </div>
        {rightSidebarHeader}
      </div>
    )
  }
}

const TimelineHeadersWrapper = ({
  children,
  style,
  className,
  calendarHeaderStyle,
  calendarHeaderClassName,
  sticky
}) => (
  <TimelineHeadersConsumer>
    {({ leftSidebarWidth, rightSidebarWidth, registerScroll }) => {
      return (
        <TimelineHeaders
          leftSidebarWidth={leftSidebarWidth}
          rightSidebarWidth={rightSidebarWidth}
          registerScroll={registerScroll}
          style={style}
          sticky={sticky}
          className={className}
          calendarHeaderStyle={calendarHeaderStyle}
          calendarHeaderClassName={calendarHeaderClassName}
        >
          {children}
        </TimelineHeaders>
      )
    }}
  </TimelineHeadersConsumer>
)

TimelineHeadersWrapper.propTypes = {
  sticky: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  calendarHeaderStyle: PropTypes.object,
  calendarHeaderClassName: PropTypes.string
}

TimelineHeadersWrapper.secretKey = 'TimelineHeaders'

export default TimelineHeadersWrapper
