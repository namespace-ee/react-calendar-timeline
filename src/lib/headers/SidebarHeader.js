import React from 'react'
import PropTypes from 'prop-types'
import { TimelineHeadersConsumer } from './HeadersContext'
import {
  LEFT_VARIANT,
  RIGHT_VARIANT,
} from './constants'

class SidebarHeader extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    rightSidebarWidth: PropTypes.number,
    leftSidebarWidth: PropTypes.number.isRequired,
    variant: PropTypes.string
  }


  render() {
    console.log("sidebar wrapper")
    const width =
      this.props.variant === RIGHT_VARIANT
        ? this.props.rightSidebarWidth
        : this.props.leftSidebarWidth
    const provided = {
      style: {
        width
      }
    }
    if(this.props.children){
      return this.props.children({provided})
    }
    return <div {...provided}/>
  }
}

const SidebarWrapper = ({ children, variant }) => (
  <TimelineHeadersConsumer>
    {({ leftSidebarWidth, rightSidebarWidth }) => {
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
