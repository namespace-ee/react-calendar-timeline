import { render, cleanup } from 'react-testing-library'
import Timeline from 'lib/Timeline'
import SidebarHeader from 'lib/headers/SidebarHeader'
import DateHeader from 'lib/headers/DateHeader'
import TimelineHeaders from 'lib/headers/TimelineHeaders'
import 'jest-dom/extend-expect'

import React from 'react'
import moment from 'moment'

const groups = [
  { id: 2, title: 'group 2' },
  { id: 1, title: 'group 1' },
  { id: 3, title: 'group 3' }
]

const items = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start_time: moment('1995-12-25'),
    end_time: moment('1995-12-25').add(1, 'hour')
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment('1995-12-25').add(-0.5, 'hour'),
    end_time: moment('1995-12-25').add(0.5, 'hour')
  },
  {
    id: 3,
    group: 3,
    title: 'item 3',
    start_time: moment('1995-12-25').add(2, 'hour'),
    end_time: moment('1995-12-25').add(3, 'hour')
  }
]

describe('TimelineHeader', () => { 
  afterEach(cleanup)
  it('renders headers correctly', () => {
    const container = render(
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment('1995-12-25').add(-12, 'hour')}
        defaultTimeEnd={moment('1995-12-25').add(12, 'hour')}
      />
    )
  })
  it('renders headers in TimelineHeaders correctly', () => {
    const { getByText, debug, rerender, queryByTestId } = render(
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment('1995-12-25').add(-12, 'hour')}
        defaultTimeEnd={moment('1995-12-25').add(12, 'hour')}
      >
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}>Left</div>
            }}
          </SidebarHeader>
          <SidebarHeader variant="right">
            {({ getRootProps }) => {
              return <div data-testid="right" {...getRootProps()}>Right</div>
            }}
          </SidebarHeader>
          <DateHeader style={{ height: 50 }} />
        </TimelineHeaders>
      </Timeline>
    )
    expect(getByText('Left')).toBeInTheDocument()
    expect(queryByTestId('right')).toBeInTheDocument()
    rerender(
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment('1995-12-25').add(-12, 'hour')}
        defaultTimeEnd={moment('1995-12-25').add(12, 'hour')}
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
    expect(queryByTestId('right')).toBeNull()
  })
})
