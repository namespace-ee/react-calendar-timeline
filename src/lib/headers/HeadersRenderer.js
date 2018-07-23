import React from 'react'
import { TimelineHeadersConsumer } from './HeadersContext'

class HeadersRenderer extends React.Component {
  render() {
    return (
      <TimelineHeadersConsumer>
        {({
          headers: { leftSidebarHeader, rightSidebarHeader, calenderHeaders },
          leftSidebarWidth,
          rightSidebarWidth,
        }) => {
          return (
            <div style={{ display:"flex", width: '100%', background: 'red' }}>
              {leftSidebarHeader &&
                leftSidebarHeader.renderer(leftSidebarHeader.props)}
              <div style={{width:`calc(100% - ${leftSidebarWidth+rightSidebarWidth}px)`}}>
                {calenderHeaders.map(header => {
                  const { renderer, props } = header
                  return renderer(props)
                })}
              </div>
              {rightSidebarHeader &&
                rightSidebarHeader.renderer(rightSidebarHeader.props)}
            </div>
          )
        }}
      </TimelineHeadersConsumer>
    )
  }
}

export default HeadersRenderer
