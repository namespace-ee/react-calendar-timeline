import React from 'react'
import { TimelineHeadersConsumer } from './HeadersContext'
import PropTypes from 'prop-types'
import SidebarHeader from './SidebarHeader'
import { RIGHT_VARIANT, LEFT_VARIANT } from './constants'
import { TimelineStateConsumer } from '../timeline/TimelineStateContext';
class TimelineHeaders extends React.PureComponent {
  static propTypes = {
    registerScroll: PropTypes.func.isRequired,
    leftSidebarWidth: PropTypes.number.isRequired,
    rightSidebarWidth: PropTypes.number.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    calendarHeaderStyle: PropTypes.object,
    calendarHeaderClassName: PropTypes.string,
    width: PropTypes.number.isRequired
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
      width: 'max-content'
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
      width: this.props.width
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
      <div data-testid="headerRootDiv" style={this.getRootStyle()} className={this.props.className}>
        {leftSidebarHeader}
        <div
          ref={this.props.registerScroll}
          style={this.getCalendarHeaderStyle()}
          className={this.props.calendarHeaderClassName}
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
  <TimelineStateConsumer>
    {({ getTimelineState, showPeriod }) => {
      const state = getTimelineState()
      return (
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
                width={state.width}
              />
            )
          }}
        </TimelineHeadersConsumer>
      )
    }}
  </TimelineStateConsumer>
)

TimelineHeadersWrapper.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  calendarHeaderStyle: PropTypes.object,
  calendarHeaderClassName: PropTypes.string
}

export default TimelineHeadersWrapper
