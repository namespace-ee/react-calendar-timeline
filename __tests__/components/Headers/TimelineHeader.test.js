import { render } from 'react-testing-library'
import SidebarHeader from 'lib/headers/SidebarHeader'
import DateHeader from 'lib/headers/DateHeader'
import TimelineHeaders from 'lib/headers/TimelineHeaders'
import '@testing-library/jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'

import { RenderHeadersWrapper } from '../../test-utility/header-renderer'
import {
  renderSidebarHeaderWithCustomValues,
  renderTimelineWithVariantSidebar,
  renderTimelineWithLeftAndRightSidebar
} from '../../test-utility/headerRenderers'

describe('TimelineHeader', () => {
  it('Given TimelineHeader When pass a left and right sidebars as children Then it should render a left and right sidebars', () => {
    const { getByTestId } = renderTimelineWithLeftAndRightSidebar()
    expect(getByTestId('left-header')).toBeInTheDocument()
    expect(getByTestId('right-header')).toBeInTheDocument()
  })

  it('Given TimelineHeader When pass calendarHeaderStyle with overridden (overflow, width) Then it should not override the default values', () => {
    const { getByTestId } = renderTimelineWithLeftAndRightSidebar({
      calendarHeaderStyle: { overflow: 'unset', width: 0 }
    })
    const headerContainer = getByTestId('headerContainer')
    const { width, overflow } = getComputedStyle(headerContainer)

    expect(overflow).not.toBe('unset')
    expect(width).not.toBe('0px')
  })
  it('Given TimelineHeader When pass calendarHeaderStyle Then it be added to styles', () => {
    const { getByTestId } = renderTimelineWithLeftAndRightSidebar({
      calendarHeaderStyle: { color: 'white', background: 'black' }
    })
    const headerContainer = getByTestId('headerContainer')
    const { color, background } = getComputedStyle(headerContainer)

    expect(color).toBe('white')
    expect(background).toBe('black')
  })
  it('Given TimelineHeader When pass style with overridden (display, width) Then it should not override the default values', () => {
    const { getByTestId } = renderTimelineWithLeftAndRightSidebar({
      style: { display: 'none', width: 0 }
    })
    const rootDiv = getByTestId('headerRootDiv')
    const { width, display } = getComputedStyle(rootDiv)

    expect(display).not.toBe('none')
    expect(width).not.toBe('0px')
  })
  it('Given TimelineHeader When pass style Then it should it be added to root`s styles', () => {
    const { getByTestId } = renderTimelineWithLeftAndRightSidebar({
      style: { color: 'white', background: 'black' }
    })
    const rootDiv = getByTestId('headerRootDiv')
    const { color, background } = getComputedStyle(rootDiv)

    expect(color).toBe('white')
    expect(background).toBe('black')
  })
  it('Given TimelineHeader When pass calendarHeaderClassName Then it should be applied to the date header container', () => {
    const { getByTestId } = renderTimelineWithLeftAndRightSidebar({
      calendarHeaderClassName: 'testClassName'
    })
    expect(getByTestId('headerContainer')).toHaveClass('testClassName')
  })

  it('Given TimelineHeader When no calendarHeaderClassName specified Then undefined should not be applied to the date header container', () => {
    const { getByTestId } = renderTimelineWithLeftAndRightSidebar({
      calendarHeaderClassName: undefined
    })
    expect(getByTestId('headerContainer')).not.toHaveClass('undefined')
  })

  it('Given TimelineHeader When pass className Then it should be applied to the root header container', () => {
    const { getByTestId } = renderTimelineWithLeftAndRightSidebar({
      className: 'testClassName'
    })
    expect(getByTestId('headerRootDiv')).toHaveClass('testClassName')
  })

  it('Given TimelineHeader When no className specified Then undefined should not be applied to the root header container', () => {
    const { getByTestId } = renderTimelineWithLeftAndRightSidebar({
      className: undefined
    })
    expect(getByTestId('headerRootDiv')).not.toHaveClass('undefined')
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

  it('Given SidebarHeader When passing no variant prop Then it should rendered above the left sidebar', () => {
    const {
      getByTestId,
      getAllByTestId
    } = renderSidebarHeaderWithCustomValues()
    expect(getByTestId('sidebarHeader')).toBeInTheDocument()
    expect(getByTestId('sidebarHeader').nextElementSibling).toHaveAttribute(
      'data-testid',
      'headerContainer'
    )
    expect(getAllByTestId('sidebarHeader')).toHaveLength(1)
  })
  it('Given SidebarHeader When passing variant prop with left value Then it should rendered above the left sidebar', () => {
    const { getByTestId, getAllByTestId } = renderSidebarHeaderWithCustomValues(
      { variant: 'left' }
    )
    expect(getByTestId('sidebarHeader')).toBeInTheDocument()
    expect(getByTestId('sidebarHeader').nextElementSibling).toHaveAttribute(
      'data-testid',
      'headerContainer'
    )
    expect(getAllByTestId('sidebarHeader')).toHaveLength(1)
  })
  it('Given SidebarHeader When passing variant prop with right value Then it should rendered above the right sidebar', () => {
    const {
      getByTestId,
      getAllByTestId,
      debug
    } = renderSidebarHeaderWithCustomValues({ variant: 'right' })
    expect(getByTestId('sidebarHeader')).toBeInTheDocument()
    expect(getAllByTestId('sidebarHeader')).toHaveLength(2)
    expect(
      getAllByTestId('sidebarHeader')[1].previousElementSibling
    ).toHaveAttribute('data-testid', 'headerContainer')
  })

  it('Given SidebarHeader When passing variant prop with unusual value Then it should rendered above the left sidebar by default', () => {
    const { getByTestId } = renderSidebarHeaderWithCustomValues({ variant: '' })
    expect(getByTestId('sidebarHeader')).toBeInTheDocument()
    expect(getByTestId('sidebarHeader').nextElementSibling).toHaveAttribute(
      'data-testid',
      'headerContainer'
    )
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
