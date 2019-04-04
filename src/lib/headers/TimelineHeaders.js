import React from 'react'
import { TimelineHeadersConsumer } from './HeadersContext'
import PropTypes from 'prop-types'
import SidebarHeader from './SidebarHeader'
import { RIGHT_VARIANT, LEFT_VARIANT } from './constants'
class TimelineHeaders extends React.Component {
  static propTypes = {
    registerScroll: PropTypes.func.isRequired,
    leftSidebarWidth: PropTypes.number.isRequired,
    rightSidebarWidth: PropTypes.number.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    calendarHeaderStyle: PropTypes.object,
    calendarHeaderClassName: PropTypes.string,
    headerRef: PropTypes.func,
  }

  constructor(props) {
    super(props)
  }

  getRootStyle = () => {
    return {
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
      ...calendarHeaderStyle,
      overflow: 'hidden',
      width: `calc(100% - ${leftSidebarWidth + rightSidebarWidth}px)`
    }
  }

  handleRootRef = (element) => {
    if(this.props.headerRef){
      this.props.headerRef(element)
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
      if (child.type === SidebarHeader) {
        if (child.props.variant === RIGHT_VARIANT) {
          rightSidebarHeader = child
        } else {
          leftSidebarHeader = child
        }
      } else {
        calendarHeaders.push(child)
      }
    })
    if(!leftSidebarHeader){
      leftSidebarHeader= <SidebarHeader/>
    }
    if(!rightSidebarHeader && this.props.rightSidebarWidth){
      rightSidebarHeader = <SidebarHeader variant="right"/>
    }
    return (
      <div
        ref={this.handleRootRef}
        data-testid="headerRootDiv"
        style={this.getRootStyle()}
        className={`rct-header-root ${this.props.className}`}
      >
        {leftSidebarHeader}
        <div
          ref={this.props.registerScroll}
          style={this.getCalendarHeaderStyle()}
          className={`rct-calendar-header ${this.props.calendarHeaderClassName}`}
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
  calendarHeaderClassName: PropTypes.string,
  headerRef: PropTypes.func,
}

export default TimelineHeadersWrapper
