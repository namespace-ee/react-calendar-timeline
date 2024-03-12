import React, { ReactNode, LegacyRef, CSSProperties } from 'react'
import classNames from 'classnames'
import { useTimelineHeadersContext } from './HeadersContext'
import SidebarHeader from './SidebarHeader'
import { RIGHT_VARIANT } from './constants'
import { ElementWithSecret } from '../types/main'

export type TimelineHeadersProps = {
  registerScroll: LegacyRef<HTMLDivElement>
  leftSidebarWidth: number
  rightSidebarWidth: number
  style?: React.CSSProperties
  children?: ReactNode
  className?: string
  calendarHeaderStyle?: React.CSSProperties
  calendarHeaderClassName?: string
}
class TimelineHeaders extends React.Component<TimelineHeadersProps> {
  getRootStyle = () => {
    return {
      ...this.props.style,
      display: 'flex',
      width: '100%',
    }
  }

  getCalendarHeaderStyle = () => {
    const { leftSidebarWidth, rightSidebarWidth, calendarHeaderStyle } = this.props
    return {
      ...calendarHeaderStyle,
      overflow: 'hidden',
      width: `calc(100% - ${leftSidebarWidth + rightSidebarWidth}px)`,
    }
  }

  /**
   * check if child of type SidebarHeader
   * refer to for explanation https://github.com/gaearon/react-hot-loader#checking-element-types
   */
  isSidebarHeader = (child: ElementWithSecret) => {
    if (child.type === undefined) return false
    return child.type.secretKey === SidebarHeader.secretKey
  }

  render() {
    let rightSidebarHeader
    let leftSidebarHeader
    const calendarHeaders: ElementWithSecret[] = []
    const children: ElementWithSecret[] = Array.isArray(this.props.children)
      ? this.props.children.filter((c) => c)
      : [this.props.children]
    React.Children.map(children, (child) => {
      if (this.isSidebarHeader(child)) {
        if (child?.props?.variant === RIGHT_VARIANT) {
          rightSidebarHeader = child
        } else {
          leftSidebarHeader = child
        }
      } else {
        calendarHeaders.push(child)
      }
    })
    if (!leftSidebarHeader) {
      leftSidebarHeader = <SidebarHeader />
    }
    if (!rightSidebarHeader && this.props.rightSidebarWidth) {
      rightSidebarHeader = <SidebarHeader variant="right" />
    }
    return (
      <div
        data-testid="headerRootDiv"
        style={this.getRootStyle()}
        className={classNames('rct-header-root', this.props.className)}
      >
        {leftSidebarHeader}
        <div
          ref={this.props.registerScroll}
          style={this.getCalendarHeaderStyle()}
          className={classNames('rct-calendar-header', this.props.calendarHeaderClassName)}
          data-testid="headerContainer"
        >
          {calendarHeaders}
        </div>
        {rightSidebarHeader}
      </div>
    )
  }
}

export interface TimelineHeadersWrapperProps {
  children: ReactNode
  style?: CSSProperties
  className?: string
  calendarHeaderStyle?: CSSProperties
  calendarHeaderClassName?: string
}
const TimelineHeadersWrapper = ({
  children,
  style,
  className,
  calendarHeaderStyle,
  calendarHeaderClassName,
}: TimelineHeadersWrapperProps) => {
  const { leftSidebarWidth, rightSidebarWidth, registerScroll } = useTimelineHeadersContext()
  return (
    <TimelineHeaders
      leftSidebarWidth={leftSidebarWidth}
      rightSidebarWidth={rightSidebarWidth}
      registerScroll={registerScroll}
      style={style}
      className={className}
      calendarHeaderStyle={calendarHeaderStyle}
      calendarHeaderClassName={calendarHeaderClassName}
    >
      {children}
    </TimelineHeaders>
  )
}

TimelineHeadersWrapper.secretKey = 'TimelineHeaders'

export default TimelineHeadersWrapper
