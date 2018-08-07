import React from 'react'
import PropTypes from 'prop-types'
import { TimelineHeadersConsumer } from './HeadersContext'
import { LEFT_VARIANT, RIGHT_VARIANT } from './constants'

class SidebarHeader extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    rightSidebarWidth: PropTypes.number,
    leftSidebarWidth: PropTypes.number.isRequired,
    variant: PropTypes.string
  }

  getRootProps = (props = {}) => {
    const { style } = props
    const width =
      this.props.variant === RIGHT_VARIANT
        ? this.props.rightSidebarWidth
        : this.props.leftSidebarWidth
    return {
      style: {
        width,
        ...style
      }
    }
  }

  getStateAndHelpers = () => {
    return {
      getRootProps: this.getRootProps
    }
  }

  render() {
    const props = this.getStateAndHelpers()
    return this.props.children(props)
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
  variant: LEFT_VARIANT,
  children: ({ getRootProps }) => <div {...getRootProps()} />
}

export default SidebarWrapper
