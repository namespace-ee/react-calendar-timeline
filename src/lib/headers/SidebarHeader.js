import React from 'react'
import PropTypes from 'prop-types'
import { TimelineHeadersConsumer } from './HeadersContext'
import { LEFT_VARIANT, RIGHT_VARIANT } from './constants'

class SidebarHeader extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    rightSidebarWidth: PropTypes.number,
    leftSidebarWidth: PropTypes.number.isRequired,
    variant: PropTypes.string,
    headerData: PropTypes.object
  }

  getRootProps = (props = {}) => {
    const { style } = props
    const width =
      this.props.variant === RIGHT_VARIANT
        ? this.props.rightSidebarWidth
        : this.props.leftSidebarWidth
    return {
      style: {
        ...style,
        width,
      }
    }
  }

  getStateAndHelpers = () => {
    return {
      getRootProps: this.getRootProps,
      data: this.props.headerData,
    }
  }

  render() {
    const props = this.getStateAndHelpers()
    const Renderer = this.props.children
    return <Renderer {...props}/>
  }
}

const SidebarWrapper = ({ children, variant, headerData }) => (
  <TimelineHeadersConsumer>
    {({ leftSidebarWidth, rightSidebarWidth }) => {
      return (
        <SidebarHeader
          leftSidebarWidth={leftSidebarWidth}
          rightSidebarWidth={rightSidebarWidth}
          children={children}
          variant={variant}
          headerData={headerData}
        />
      )
    }}
  </TimelineHeadersConsumer>
)

SidebarWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  variant: PropTypes.string,
  headerData: PropTypes.object
}

SidebarWrapper.defaultProps = {
  variant: LEFT_VARIANT,
  children: ({ getRootProps }) => <div data-testid="sidebarHeader" {...getRootProps()} />
}

SidebarWrapper.secretKey = "SidebarHeader"

export default SidebarWrapper
