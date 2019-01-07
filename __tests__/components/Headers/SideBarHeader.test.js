import React from 'react'
import { render, cleanup } from 'react-testing-library'
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
    const { getByTestId } = render(
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

    expect(getByTestId('leftSidebarHeader')).toBeInTheDocument()
    expect(getByTestId('rightSidebarHeader')).toBeInTheDocument()

    expect(getByTestId('leftSidebarHeader').nextElementSibling.getAttribute('data-testid')).toBe('headerContainer')
    expect(getByTestId('rightSidebarHeader').previousElementSibling.getAttribute('data-testid')).toBe('headerContainer')
  })

  it("passing no variant prop will render it above the left sidebar", () => {
    const { getByTestId } = renderSidebarHeaderWithCustomValues()
    expect(getByTestId('sidebarHeader')).toBeInTheDocument()
    expect(getByTestId('sidebarHeader').nextElementSibling.getAttribute('data-testid')).toBe('headerContainer')
  })
  it("passing variant = left prop will render it above the left sidebar", () => {
    const { getByTestId } = renderSidebarHeaderWithCustomValues({variant: "left"})
    expect(getByTestId('sidebarHeader')).toBeInTheDocument()
    expect(getByTestId('sidebarHeader').nextElementSibling.getAttribute('data-testid')).toBe('headerContainer')
  })
  it("passing variant = right prop will render it above the right sidebar", () => {
    const { getByTestId } = renderSidebarHeaderWithCustomValues({variant: "right"})
    expect(getByTestId('sidebarHeader')).toBeInTheDocument()
    expect(getByTestId('sidebarHeader').previousElementSibling.getAttribute('data-testid')).toBe('headerContainer')
  })

  it("passing unusual variant value will render it above the left sidebar by default", () => {
    const { getByTestId } = renderSidebarHeaderWithCustomValues({variant: ""})
    expect(getByTestId('sidebarHeader')).toBeInTheDocument()
    expect(getByTestId('sidebarHeader').nextElementSibling.getAttribute('data-testid')).toBe('headerContainer')
  })
  it("passing ${x}Sidebarwidth when variant is ${x} will affect the ${x} sidebarHeader", () => {
    const {getByTestId} = renderSidebarHeaderWithCustomValues({variant: "right", rightSidebarWidth: 300})
    expect(getByTestId('sidebarHeader').style.width).toBe('300px')
  })

  it("passing ${x}Sidebarwidth when variant is ${y} will not affect the ${x} sidebarHeader", () => {
    const {getByTestId} = renderSidebarHeaderWithCustomValues({variant: "left", rightSidebarWidth: 300})
    expect(getByTestId('sidebarHeader').style.width).not.toBe('300px')
  })

  it("passing a style to prop getter will override the {x}Sidebarwidth on the sidebarHeader", () => {
    const {getByTestId} = renderSidebarHeaderWithCustomValues({variant: "right", rightSidebarWidth: 300, props: {style:{width: 50}}})
    expect(getByTestId('sidebarHeader').style.width).toBe('50px')
  })
})


function renderSidebarHeaderWithCustomValues({variant = undefined, props, rightSidebarWidth} = {}) {
  return render(<Timeline
    {...defaultProps}
    rightSidebarWidth={rightSidebarWidth}
  >
    <TimelineHeaders>
      <SidebarHeader variant={variant} props={props}>
        {({ getRootProps }, props) => {
          return <div data-testid="sidebarHeader" {...getRootProps(props)}>SidebarHeader</div>
        }}
      </SidebarHeader>
      <DateHeader primaryHeader />
      <DateHeader />
    </TimelineHeaders>
  </Timeline>
  )
}

