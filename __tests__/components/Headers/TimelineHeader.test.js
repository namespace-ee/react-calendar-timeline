import { render } from 'react-testing-library'
import SidebarHeader from 'lib/headers/SidebarHeader'
import DateHeader from 'lib/headers/DateHeader'
import TimelineHeaders from 'lib/headers/TimelineHeaders'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'

import { RenderHeadersWrapper } from '../../test-utility/header-renderer'

describe('TimelineHeader', () => {
  it('Given TimelineHeader When pass a left sidebar as a child Then it should render a left sidebar', () => {
    const { getByTestId, getAllByTestId } = renderTimelineWithVariantSidebar({
      variant: 'left'
    })
    expect(getByTestId('sidebarHeader')).toBeInTheDocument()
    expect(getAllByTestId('sidebarHeader')).toHaveLength(1)
  })
  it('Given TimelineHeader When pass a right sidebar as a child Then it should render a right sidebar', () => {
    const { getByTestId, getAllByTestId } = renderTimelineWithVariantSidebar({
      variant: 'right'
    })
    expect(getByTestId('sidebarHeader')).toBeInTheDocument()
    expect(getAllByTestId('sidebarHeader')).toHaveLength(1)
  })
  it('Given TimelineHeader When pass a left and right sidebars as children Then it should render a left and right sidebars', () => {
    const { getByTestId } = renderTimelineWithLeftAndRightSidebar()
    expect(getByTestId('left-header')).toBeInTheDocument()
    expect(getByTestId('right-header')).toBeInTheDocument()
  })

  it('Given TimelineHeader When pass calendarHeaderStyle with overrided (overflow, width) Then it should not override the deaful values', () => {
    const { getByTestId } = renderTimelineWithLeftAndRightSidebar({
      calendarHeaderStyle: { overflow: 'unset', width: 0 }
    })
    const headerContainer = getByTestId('headerContainer')
    const { width, overflow } = getComputedStyle(headerContainer)

    expect(overflow).not.toBe('unset')
    expect(width).not.toBe('0px')
  })
  it('Given TimelineHeader When pass rootStyle with overrided (display, width) Then it should not override the deaful values', () => {
    const { getByTestId } = renderTimelineWithLeftAndRightSidebar({
      style: { display: 'none', width: 0 }
    })
    const rootDiv = getByTestId('headerRootDiv')
    const { width, display } = getComputedStyle(rootDiv)

    expect(display).not.toBe('none')
    expect(width).not.toBe('0px')
  })
  it('Given TimelineHeader When pass calendarHeaderClassName Then it should be applied to the date header container', () => {
    const { getByTestId } = renderTimelineWithLeftAndRightSidebar({
      calendarHeaderClassName: 'testClassName'
    })
    expect(getByTestId('headerContainer')).toHaveClass('testClassName')
  })

  it('Given TimelineHeader When rendered Then it should render the default styles of the date header container', () => {
    const { getByTestId } = renderTimelineWithLeftAndRightSidebar()
    const headerContainer = getByTestId('headerContainer')
    const { overflow } = getComputedStyle(headerContainer)
    expect(overflow).toBe('hidden')
    // The JSDOM will not fire the calc css function
  })

  it('Given TimelineHeader When rendered Then it should render the default styles of the rootStyle', () => {
    const { getByTestId } = renderTimelineWithLeftAndRightSidebar()
    const rootDiv = getByTestId('headerRootDiv')
    const { width, display } = getComputedStyle(rootDiv)

    expect(display).toBe('flex')
    expect(width).toBe('100%')
  })

  /**
   * Testing The Example Provided In The Docs
   */
  it('Given TimelineHeader When pass a headers as children Then it should render them correctly', () => {
    const { getByText, rerender, queryByText } = render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}>Left</div>
            }}
          </SidebarHeader>
          <SidebarHeader variant="right">
            {({ getRootProps }) => {
              return (
                <div data-testid="right" {...getRootProps()}>
                  Right
                </div>
              )
            }}
          </SidebarHeader>
          <DateHeader style={{ height: 50 }} />
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )
    expect(getByText('Left')).toBeInTheDocument()
    expect(getByText('Right')).toBeInTheDocument()
    rerender(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}>Left</div>
            }}
          </SidebarHeader>
          <DateHeader style={{ height: 50 }} />
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )
    expect(queryByText('Right')).toBeNull()
  })
})

function renderTimelineWithLeftAndRightSidebar({
  calendarHeaderClassName,
  calendarHeaderStyle,
  style,
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

function renderTimelineWithVariantSidebar({
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
