import React from 'react';
import { render } from 'react-testing-library';
import DateHeader from 'lib/headers/DateHeader';
import SidebarHeader from 'lib/headers/SidebarHeader';
import TimelineHeaders from 'lib/headers/TimelineHeaders';
import { RenderHeadersWrapper } from './header-renderer';
export function renderSidebarHeaderWithCustomValues({ variant = undefined, props, timelineState, headersState, extraProps } = {}) {
  return render(<RenderHeadersWrapper timelineState={timelineState} headersState={headersState}>
    <TimelineHeaders>
      <SidebarHeader variant={variant} props={extraProps}>
        {({ getRootProps }, extraProps) => {
          return (<div data-testid="sidebarHeader" {...getRootProps(props)}>
            SidebarHeader
                <div>Should Be Rendred</div>
          </div>);
        }}
      </SidebarHeader>
      <DateHeader primaryHeader />
      <DateHeader />
    </TimelineHeaders>
  </RenderHeadersWrapper>);
}
export function renderTwoSidebarHeadersWithCustomValues({ props, timelineState, headersState } = {}) {
  return render(<RenderHeadersWrapper timelineState={timelineState} headersState={headersState}>
    <TimelineHeaders>
      <SidebarHeader variant={'left'} props={props}>
        {({ getRootProps }) => {
          return (<div {...getRootProps(props)}>
            LeftSideBar
                <div>Should Be Rendred</div>
          </div>);
        }}
      </SidebarHeader>
      <SidebarHeader variant={'right'} props={props}>
        {({ getRootProps }, props) => {
          return <div {...getRootProps(props)}>RightSideBar</div>;
        }}
      </SidebarHeader>
      <DateHeader primaryHeader />
      <DateHeader />
    </TimelineHeaders>
  </RenderHeadersWrapper>);
}

export function renderTimelineWithLeftAndRightSidebar({
  calendarHeaderClassName,
  calendarHeaderStyle,
  style,
  className,
  timelineState,
  headersState
} = {}) {
  return render(
    <RenderHeadersWrapper
      timelineState={timelineState}
      headersState={headersState}
    >
      <TimelineHeaders
        style={style}
        className={className}
        calendarHeaderStyle={calendarHeaderStyle}
        calendarHeaderClassName={calendarHeaderClassName}
      >
        <SidebarHeader variant="right">
          {({ getRootProps }) => {
            return (
              <div data-testid="right-header" {...getRootProps()}>
                Right
              </div>
            )
          }}
        </SidebarHeader>
        <SidebarHeader variant="left">
          {({ getRootProps }) => {
            return (
              <div data-testid="left-header" {...getRootProps()}>
                Left
              </div>
            )
          }}
        </SidebarHeader>
      </TimelineHeaders>
    </RenderHeadersWrapper>
  )
}

export function renderTimelineWithVariantSidebar({
  variant,
  timelineState,
  headersState
} = {}) {
  return render(
    <RenderHeadersWrapper
      timelineState={timelineState}
      headersState={headersState}
    >
      <TimelineHeaders>
        <SidebarHeader variant={variant}>
          {({ getRootProps }) => {
            return (
              <div data-testid="sidebarHeader" {...getRootProps()}>
                Header
              </div>
            )
          }}
        </SidebarHeader>
      </TimelineHeaders>
    </RenderHeadersWrapper>
  )
}