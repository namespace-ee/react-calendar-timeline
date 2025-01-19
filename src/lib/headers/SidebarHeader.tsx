import React, { CSSProperties, HTMLProps, PureComponent, ReactNode } from 'react'
import { useTimelineHeadersContext } from './HeadersContext'
import { LEFT_VARIANT, RIGHT_VARIANT } from './constants'

type GetRootProps = (props?: { style?: React.CSSProperties }) => HTMLProps<HTMLDivElement>
type SidebarHeaderProps = {
  children: (props: { getRootProps: GetRootProps }) => ReactNode
  rightSidebarWidth?: number
  leftSidebarWidth: number
  variant: typeof LEFT_VARIANT | typeof RIGHT_VARIANT
  headerData?: any
}

class SidebarHeader extends PureComponent<SidebarHeaderProps> {
  getRootProps:GetRootProps = (props: { style?: CSSProperties } = {}) => {
    const { style } = props
    const width = this.props.variant === RIGHT_VARIANT ? this.props.rightSidebarWidth : this.props.leftSidebarWidth
    return {
      style: {
        color:style?.color??"#fff",
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
    return this.props.children(props)
  }
}



export type SidebarWrapperProps = {
  children?: (props: { getRootProps: GetRootProps }) => ReactNode
  variant?: typeof LEFT_VARIANT | typeof RIGHT_VARIANT
  headerData?: any
}

const defaultChildren: SidebarWrapperProps['children'] = ({ getRootProps }: { getRootProps: GetRootProps }) => (
  <div data-testid="sidebarHeader" {...getRootProps()} />
)

const SidebarWrapper = (props: SidebarWrapperProps) => {
  const { children, variant = LEFT_VARIANT, headerData } = props
  const { leftSidebarWidth, rightSidebarWidth } = useTimelineHeadersContext()
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
}

SidebarWrapper.secretKey = 'SidebarHeader'

export default SidebarWrapper
