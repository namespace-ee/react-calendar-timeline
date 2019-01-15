import React from 'react'
import { render, cleanup, within } from 'react-testing-library'
import Timeline from 'lib/Timeline'
import DateHeader from 'lib/headers/DateHeader'
import SidebarHeader from 'lib/headers/SidebarHeader'
import TimelineHeaders from 'lib/headers/TimelineHeaders'
import 'jest-dom/extend-expect'

import moment from 'moment'

import { items, groups } from '../../../__fixtures__/itemsAndGroups'


const defaultProps = {
  groups,
  items,
  defaultTimeStart: moment('1995-12-25').add(-12, 'hour'),
  defaultTimeEnd: moment('1995-12-25').add(12, 'hour')
}

describe("Testing SidebarHeader Component", () => {
  afterEach(cleanup)
  //  Testing The Example In The Docs
  it("SidebarHeader Will Be Rendered Correctly In The Timeline", () => {
    const { container } = render(
      <Timeline
        {...defaultProps}
      >
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div data-testid="leftSidebarHeader" {...getRootProps()}>Left</div>
            }}
          </SidebarHeader>
          <SidebarHeader variant="right">
            {({ getRootProps }) => {
              return <div data-testid="rightSidebarHeader" {...getRootProps()}>Right</div>
            }}
          </SidebarHeader>
          <DateHeader primaryHeader />
          <DateHeader />
        </TimelineHeaders>
      </Timeline>
    )

    const { getByTestId } = within(container)

    expect(getByTestId('leftSidebarHeader')).toBeInTheDocument()
    expect(getByTestId('rightSidebarHeader')).toBeInTheDocument()

    expect(getByTestId('leftSidebarHeader').nextElementSibling).toHaveAttribute('data-testid', 'headerContainer')
    expect(getByTestId('rightSidebarHeader').previousElementSibling).toHaveAttribute('data-testid', 'headerContainer')
  })

  it("passing no variant prop will render it above the left sidebar", () => {
    const { getByTestId } = renderSidebarHeaderWithCustomValues()
    expect(getByTestId('sidebarHeader')).toBeInTheDocument()
    expect(getByTestId('sidebarHeader').nextElementSibling).toHaveAttribute('data-testid', 'headerContainer')
  })
  it("passing variant = left prop will render it above the left sidebar", () => {
    const { getByTestId } = renderSidebarHeaderWithCustomValues({ variant: "left" })
    expect(getByTestId('sidebarHeader')).toBeInTheDocument()
    expect(getByTestId('sidebarHeader').nextElementSibling).toHaveAttribute('data-testid', 'headerContainer')
  })
  it("passing variant = right prop will render it above the right sidebar", () => {
    const { getByTestId } = renderSidebarHeaderWithCustomValues({ variant: "right" })
    expect(getByTestId('sidebarHeader')).toBeInTheDocument()
    expect(getByTestId('sidebarHeader').previousElementSibling).toHaveAttribute('data-testid', 'headerContainer')
  })

  it("passing unusual variant value will render it above the left sidebar by default", () => {
    const { getByTestId } = renderSidebarHeaderWithCustomValues({ variant: "" })
    expect(getByTestId('sidebarHeader')).toBeInTheDocument()
    expect(getByTestId('sidebarHeader').nextElementSibling).toHaveAttribute('data-testid', 'headerContainer')
  })

  it("props getter function works correctly", () => {
    const { getByTestId } = renderSidebarHeaderWithCustomValues({ props: { style: { width: 250 } } })
    const { width } = getComputedStyle(getByTestId("sidebarHeader"))
    expect(width).toBe("250px")
  })

  it("should rendered the passed children correctly", () => {
    const { getByText } = renderSidebarHeaderWithCustomValues()
    expect(getByText("Should Be Rendred")).toBeInTheDocument()
  })

})


function renderSidebarHeaderWithCustomValues({ variant = undefined, props, rightSidebarWidth } = {}) {
  return render(<Timeline
    {...defaultProps}
    rightSidebarWidth={rightSidebarWidth}
  >
    <TimelineHeaders>
      <SidebarHeader variant={variant} props={props}>
        {({ getRootProps }, props) => {
          return <div data-testid="sidebarHeader" {...getRootProps(props)}>SidebarHeader
          <div>Should Be Rendred</div>
          </div>
        }}
      </SidebarHeader>
      <DateHeader primaryHeader />
      <DateHeader />
    </TimelineHeaders>
  </Timeline>
  )
}

