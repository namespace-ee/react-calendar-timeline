import React from 'react'
import { TimelineHeadersConsumer } from './HeadersContext'
import PropTypes from 'prop-types'
import SidebarHeader from './SidebarHeader'
import { RIGHT_VARIANT, LEFT_VARIANT } from './constants'
class TimelineHeaders extends React.PureComponent {
  static propTypes = {
    registerScroll: PropTypes.func.isRequired,
    leftSidebarWidth: PropTypes.number.isRequired,
    rightSidebarWidth: PropTypes.number.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    calendarHeaderStyle: PropTypes.object,
    calendarHeaderClassName: PropTypes.string
  }

  constructor(props) {
    super(props)
  }

  getRootStyle = () => {
    return {
      background: '#c52020',
      borderBottom: '1px solid #bbb',
      ...this.props.style,
      display: 'flex',
      width: '100%'
    }
  }

  getCalendarHeaderStyle = () => {
    const {
      leftSidebarWidth,
      rightSidebarWidth,
      calendarHeaderStyle
    } = this.props
    return {
      border: '1px solid #bbb',
      ...calendarHeaderStyle,
      overflow: 'hidden',
      width: `calc(100% - ${leftSidebarWidth + rightSidebarWidth}px)`
    }
  }

  render() {
    let rightSidebarHeader
    let leftSidebarHeader
    let calendarHeaders = []
    const children = Array.isArray(this.props.children)
      ? this.props.children.filter(c => c)
      : [this.props.children]
    React.Children.map(children, child => {
      if (
        child.type === SidebarHeader &&
        child.props.variant === RIGHT_VARIANT
      ) {
        rightSidebarHeader = child
      } else if (
        child.type === SidebarHeader &&
        child.props.variant === LEFT_VARIANT
      ) {
        leftSidebarHeader = child
      } else {
        calendarHeaders.push(child)
      }
    })
    return (
      <div style={this.getRootStyle()} className={this.props.className}>
        {leftSidebarHeader}
        <div
          ref={this.props.registerScroll}
          style={this.getCalendarHeaderStyle()}
          className={this.props.calendarHeaderClassName}
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
  calendarHeaderClassName
}) => (
  <TimelineHeadersConsumer>
    {({ leftSidebarWidth, rightSidebarWidth, registerScroll }) => {
      return (
        <TimelineHeaders
          leftSidebarWidth={leftSidebarWidth}
          rightSidebarWidth={rightSidebarWidth}
          registerScroll={registerScroll}
          children={children}
          style={style}
          className={className}
          calendarHeaderStyle={calendarHeaderStyle}
          calendarHeaderClassName={calendarHeaderClassName}
        />
      )
    }}
  </TimelineHeadersConsumer>
)

TimelineHeadersWrapper.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  calendarHeaderStyle: PropTypes.object,
  calendarHeaderClassName: PropTypes.string
}

export default TimelineHeadersWrapper
