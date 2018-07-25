import React from 'react'
import { TimelineHeadersConsumer } from './HeadersContext'
import PropTypes from 'prop-types'
import { LEFT_SIDEBAR_ID, RIGHT_SIDEBAR_ID } from './constants';
class HeadersRenderer extends React.Component {

  static propTypes = {
    registerScroll: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    props.registerScroll(scrollX => {
      if (scrollX != null) {
        this.headerEl.scrollLeft = scrollX
      }
    })
  }

  render() {
    return (
      <TimelineHeadersConsumer>
        {({
          calendarHeaders,
          sidebarHeaders,
          leftSidebarWidth,
          rightSidebarWidth
        }) => {
          return (
            <div style={{ display: 'flex', width: '100%', background: 'red' }}>
              {sidebarHeaders && sidebarHeaders[LEFT_SIDEBAR_ID] &&
                sidebarHeaders[LEFT_SIDEBAR_ID].renderer(sidebarHeaders[LEFT_SIDEBAR_ID].props)}
              <div
                ref={el => (this.headerEl = el)}
                style={{
                  overflow:'hidden',
                  width: `calc(100% - ${leftSidebarWidth +
                    rightSidebarWidth}px)`
                }}
              >
                {calendarHeaders.map(header => {
                  const { renderer, props } = header
                  return renderer(props)
                })}
              </div>
              {sidebarHeaders &&  sidebarHeaders[RIGHT_SIDEBAR_ID] &&
                sidebarHeaders[RIGHT_SIDEBAR_ID].renderer(sidebarHeaders[RIGHT_SIDEBAR_ID].props)}
            </div>
          )
        }}
      </TimelineHeadersConsumer>
    )
  }
}

export default HeadersRenderer
