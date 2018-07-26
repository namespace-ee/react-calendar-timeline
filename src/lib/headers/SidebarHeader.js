import React from 'react'
import PropTypes from 'prop-types'
import { TimelineHeadersConsumer } from './HeadersContext'
import {
  LEFT_VARIANT,
  RIGHT_VARIANT,
  LEFT_SIDEBAR_ID,
  RIGHT_SIDEBAR_ID
} from './constants'

class SidebarHeader extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    rightSidebarWidth: PropTypes.number,
    leftSidebarWidth: PropTypes.number.isRequired,
    variant: PropTypes.string
  }


  render() {
    const width =
      this.props.variant === RIGHT_VARIANT
        ? this.props.rightSidebarWidth
        : this.props.leftSidebarWidth
    const provided = {
      style: {
        width
      }
    }
    return this.props.children({provided})
  }
}

const SidebarWrapper = ({ children, variant }) => (
  <TimelineHeadersConsumer>
    {({ leftSidebarWidth, rightSidebarWidth }) => {
      console.log("sidebar wrapper")
      return (
        <SidebarHeader
          leftSidebarWidth={leftSidebarWidth}
          rightSidebarWidth={rightSidebarWidth}
          children={children}
          variant={variant}
        />
      )
    }}
  </TimelineHeadersConsumer>
)

SidebarWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  variant: PropTypes.string
}

SidebarWrapper.defaultProps = {
  variant: LEFT_VARIANT
}

export default SidebarWrapper
