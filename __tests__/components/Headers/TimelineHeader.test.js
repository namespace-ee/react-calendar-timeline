import { render, cleanup, queryByText } from 'react-testing-library'
import Timeline from 'lib/Timeline'
import SidebarHeader from 'lib/headers/SidebarHeader'
import DateHeader from 'lib/headers/DateHeader'
import TimelineHeaders from 'lib/headers/TimelineHeaders'
import 'jest-dom/extend-expect'

import React from 'react'
import moment from 'moment'

import { items, groups } from '../../../__fixtures__/itemsAndGroups'
import {
  visibleTimeStart,
  visibleTimeEnd
} from '../../../__fixtures__/stateAndProps'

const defaultProps = {
  groups,
  items,
  defaultTimeStart: moment('1995-12-25').add(-12, 'hour'),
  defaultTimeEnd: moment('1995-12-25').add(12, 'hour')
}

describe('TimelineHeader', () => {
  afterEach(cleanup)
  /**
   * Testing The Default Functionality
   */
  describe('renders default headers correctly', () => {
    it('renders two dateHeaders by default', () => {
      const { getAllByTestId, getByTestId } = renderDefaultTimeline()
      expect(getAllByTestId('dateHeader')).toHaveLength(2)
      expect(getByTestId('headerContainer').children).toHaveLength(2)
    })
    it('renders default sidebar header', () => {
      const {getByTestId} = renderDefaultTimeline()
      expect(getByTestId("sidebarHeader")).toBeInTheDocument()
    })
    it('renders two default sidebar headers if rightSidebarWidth is passed', () => {
      let rightSidebarWidth = 150;
      const {getAllByTestId} = renderDefaultTimeline({rightSidebarWidth});
      expect(getAllByTestId('sidebarHeader')).toHaveLength(2)
      expect(getAllByTestId('sidebarHeader')[0]).toBeInTheDocument()
      expect(getAllByTestId('sidebarHeader')[1]).toBeInTheDocument()
    })
    it('renders two dateHeaders one primary and one secondary', () => {
      const {getAllByTestId} = renderDefaultTimeline()
      
    })
  })

  /**
   * Testing The Example Provided In The Docs
   */
  it('renders headers in TimelineHeaders correctly', () => {
    const { getByText, rerender, queryByText } = render(
      <Timeline
        groups={groups}
        items={items}
        visibleTimeStart={visibleTimeStart}
        visibleTimeEnd={visibleTimeEnd}
      >
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
      </Timeline>
    )
    expect(getByText('Left')).toBeInTheDocument()
    expect(getByText('Right')).toBeInTheDocument()
    rerender(
      <Timeline
        groups={groups}
        items={items}
        visibleTimeStart={visibleTimeStart}
        visibleTimeEnd={visibleTimeEnd}
      >
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}>Left</div>
            }}
          </SidebarHeader>
          <DateHeader style={{ height: 50 }} />
        </TimelineHeaders>
      </Timeline>
    )
    expect(queryByText('Right')).toBeNull()
  })
})

function renderDefaultTimeline(props = {}) {
  const timelineProps = {
    ...defaultProps,
    ...props
  }
  return render(<Timeline {...timelineProps} />)
}
