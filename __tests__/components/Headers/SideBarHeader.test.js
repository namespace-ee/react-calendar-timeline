import React from 'react'
import { render, cleanup, within } from 'react-testing-library'
import Timeline from 'lib/Timeline'
import DateHeader from 'lib/headers/DateHeader'
import SidebarHeader from 'lib/headers/SidebarHeader'
import TimelineHeaders from 'lib/headers/TimelineHeaders'
import 'jest-dom/extend-expect'
import { RenderHeadersWrapper } from '../../test-utility/header-renderer'

describe('Testing SidebarHeader Component', () => {
  afterEach(cleanup)
  //  Testing The Example In The Docs
  it('Given SidebarHeader When rendered Then it should shown correctly in the timeline', () => {
    const { getByTestId } = render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return (
                <div data-testid="leftSidebarHeader" {...getRootProps()}>
                  Left
                </div>
              )
            }}
          </SidebarHeader>
          <SidebarHeader variant="right">
            {({ getRootProps }) => {
              return (
                <div data-testid="rightSidebarHeader" {...getRootProps()}>
                  Right
                </div>
              )
            }}
          </SidebarHeader>
          <DateHeader primaryHeader />
          <DateHeader />
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )

    expect(getByTestId('leftSidebarHeader')).toBeInTheDocument()
    expect(getByTestId('rightSidebarHeader')).toBeInTheDocument()

    expect(getByTestId('leftSidebarHeader').nextElementSibling).toHaveAttribute(
      'data-testid',
      'headerContainer'
    )
    expect(
      getByTestId('rightSidebarHeader').previousElementSibling
    ).toHaveAttribute('data-testid', 'headerContainer')
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
    const { getByTestId, getAllByTestId } = renderSidebarHeaderWithCustomValues(
      { variant: 'right' }
    )
    expect(getByTestId('sidebarHeader')).toBeInTheDocument()
    expect(getByTestId('sidebarHeader').previousElementSibling).toHaveAttribute(
      'data-testid',
      'headerContainer'
    )
    expect(getAllByTestId('sidebarHeader')).toHaveLength(1)
  })

  it('Given SidebarHeader When passing variant prop with unusual value Then it should rendered above the left sidebar by default', () => {
    const { getByTestId } = renderSidebarHeaderWithCustomValues({ variant: '' })
    expect(getByTestId('sidebarHeader')).toBeInTheDocument()
    expect(getByTestId('sidebarHeader').nextElementSibling).toHaveAttribute(
      'data-testid',
      'headerContainer'
    )
  })

  it('Given SidebarHeader When passing props to the props getter Then it should rendered correctly', () => {
    const { getByTestId } = renderSidebarHeaderWithCustomValues({
      props: { style: { width: 250 } }
    })
    const { width } = getComputedStyle(getByTestId('sidebarHeader'))
    expect(width).toBe('250px')
  })

  it('Given SidebarHeader When passing children to it Then it should rendered correctly', () => {
    const { getByText } = renderSidebarHeaderWithCustomValues()
    expect(getByText('Should Be Rendred')).toBeInTheDocument()
  })

  it('Given sidebarheader When pass a variant and props Then it should render both correctly', () => {
    const { getByTestId } = renderSidebarHeaderWithCustomValues({
      props: { style: { width: 250 }, variant: 'left' }
    })
    const { width } = getComputedStyle(getByTestId('sidebarHeader'))
    expect(width).toBe('250px')
    expect(getByTestId('sidebarHeader').nextElementSibling).toHaveAttribute(
      'data-testid',
      'headerContainer'
    )
  })

  it('Given two sidebarheaders When pass a variants and props Then it should render both correctly', () => {
    const { getByText } = renderTwoSidebarHeadersWithCustomValues({
      props: { style: { width: 250 } }
    })
    const { width: leftWidth } = getComputedStyle(getByText('LeftSideBar'))
    const { width: rightWidth } = getComputedStyle(getByText('RightSideBar'))
    expect(leftWidth).toBe('250px')
    expect(rightWidth).toBe('250px')
    expect(getByText('LeftSideBar').nextElementSibling).toHaveAttribute(
      'data-testid',
      'headerContainer'
    )
    expect(getByText('RightSideBar').previousElementSibling).toHaveAttribute(
      'data-testid',
      'headerContainer'
    )
  })

  it('Given SidebarHeader When Pass an props obj to props renderer Then it should render it correctly', () => {
    const { getByTestId } = renderSidebarHeaderWithCustomValues({
      props: { 'aria-hidden': false }
    })
    expect(getByTestId('sidebarHeader')).toHaveAttribute('aria-hidden')
  })
})

function renderSidebarHeaderWithCustomValues({
  variant = undefined,
  props,
  timelineState,
  headersState
} = {}) {
  return render(
    <RenderHeadersWrapper
      timelineState={timelineState}
      headersState={headersState}
    >
      <TimelineHeaders>
        <SidebarHeader variant={variant} props={props}>
          {({ getRootProps }, extraProps) => {
            return (
              <div
                data-testid="sidebarHeader"
                {...getRootProps(props)}
                {...extraProps}
              >
                SidebarHeader
                <div>Should Be Rendred</div>
              </div>
            )
          }}
        </SidebarHeader>
        <DateHeader primaryHeader />
        <DateHeader />
      </TimelineHeaders>
    </RenderHeadersWrapper>
  )
}

function renderTwoSidebarHeadersWithCustomValues({
  props,
  timelineState,
  headersState
} = {}) {
  return render(
    <RenderHeadersWrapper
      timelineState={timelineState}
      headersState={headersState}
    >
      <TimelineHeaders>
        <SidebarHeader variant={'left'} props={props}>
          {({ getRootProps }) => {
            return (
              <div {...getRootProps(props)}>
                LeftSideBar
                <div>Should Be Rendred</div>
              </div>
            )
          }}
        </SidebarHeader>
        <SidebarHeader variant={'right'} props={props}>
          {({ getRootProps }, props) => {
            return <div {...getRootProps(props)}>RightSideBar</div>
          }}
        </SidebarHeader>
        <DateHeader primaryHeader />
        <DateHeader />
      </TimelineHeaders>
    </RenderHeadersWrapper>
  )
}
