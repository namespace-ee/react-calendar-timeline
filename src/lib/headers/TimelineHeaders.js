import React from 'react'
import { TimelineHeadersConsumer } from './HeadersContext'
import PropTypes from 'prop-types'
import SidebarHeader from './SidebarHeader';
import { RIGHT_VARIANT, LEFT_VARIANT } from './constants';
class TimelineHeaders extends React.Component {
  static propTypes = {
    registerScroll: PropTypes.func.isRequired,
    calendarHeaders: PropTypes.array.isRequired,
    sidebarHeaders: PropTypes.object.isRequired,
    leftSidebarWidth: PropTypes.number.isRequired,
    rightSidebarWidth: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {
      leftSidebarWidth,
      rightSidebarWidth
    } = this.props
    let rightSidebarHeader;
    let leftSidebarHeader;
    let calendarHeaders = [];
    React.Children.map(this.props.children, child => {
      if(child.type === SidebarHeader && child.props.variant === RIGHT_VARIANT){
        rightSidebarHeader = child
      }
      else if(child.type === SidebarHeader && child.props.variant === LEFT_VARIANT){
        leftSidebarHeader= child
      }
      else {
        calendarHeaders.push(child)
      }
    })
    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          background: '#c52020',
          borderBottom: '1px solid #bbb',
        }}
      >
        {leftSidebarHeader}
        <div
          ref={this.props.registerScroll}
          style={{
            overflow: 'hidden',
            width: `calc(100% - ${leftSidebarWidth + rightSidebarWidth}px)`,
            border: '1px solid #bbb',
          }}
        >
          {calendarHeaders} 
        </div>
        {rightSidebarHeader}
      </div>
    )
  }
}

const TimelineHeadersWrapper = ({children}) => (
  <TimelineHeadersConsumer>
    {({
      calendarHeaders,
      sidebarHeaders,
      leftSidebarWidth,
      rightSidebarWidth,
      registerScroll,
    }) => {
      return (
        <TimelineHeaders
          calendarHeaders={calendarHeaders}
          sidebarHeaders={sidebarHeaders}
          leftSidebarWidth={leftSidebarWidth}
          rightSidebarWidth={rightSidebarWidth}
          registerScroll={registerScroll}
          children={children}
        />
      )
    }}
  </TimelineHeadersConsumer>
)

export default TimelineHeadersWrapper
