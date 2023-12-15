import React, {
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  PureComponent,
} from 'react'
import { TimelineHeadersConsumer } from './HeadersContext'
import { LEFT_VARIANT, RIGHT_VARIANT } from './constants'

type SidebarHeaderProps = {
  children: ComponentType<{ getRootProps: GetRootProps }>
  rightSidebarWidth?: number
  leftSidebarWidth: number
  variant: typeof LEFT_VARIANT | typeof RIGHT_VARIANT
  headerData?: any
}

class SidebarHeader extends PureComponent<SidebarHeaderProps> {
  getRootProps = (props: { style?: CSSProperties } = {}) => {
    const { style } = props
    const width =
      this.props.variant === RIGHT_VARIANT
        ? this.props.rightSidebarWidth
        : this.props.leftSidebarWidth
    return {
      style: {
        ...style,
        width,
      },
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
    return <Renderer {...props} />
  }
}

type GetRootProps = () => HTMLAttributes<HTMLDivElement>

type SidebarWrapperProps = {
  children?: ComponentType<{ getRootProps: GetRootProps }>
  variant?: typeof LEFT_VARIANT | typeof RIGHT_VARIANT
  headerData?: any
}

const defaultChildren: SidebarWrapperProps['children'] = ({
  getRootProps,
}: {
  getRootProps: GetRootProps
}) => <div data-testid="sidebarHeader" {...getRootProps()} />

const SidebarWrapper = (props: SidebarWrapperProps) => {
  const { children, variant = LEFT_VARIANT, headerData } = props
  return (
    <TimelineHeadersConsumer>
      {({ leftSidebarWidth, rightSidebarWidth }) => {
        return (
          <SidebarHeader
            leftSidebarWidth={leftSidebarWidth}
            rightSidebarWidth={rightSidebarWidth}
            variant={variant}
            headerData={headerData}
          >
            {children || defaultChildren}
          </SidebarHeader>
        )
      }}
    </TimelineHeadersConsumer>
  )
}

SidebarWrapper.secretKey = 'SidebarHeader'

export default SidebarWrapper
