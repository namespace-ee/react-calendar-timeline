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
      expect(getAllByTestId(new RegExp('dateHeader'))).toHaveLength(2)
      expect(getByTestId('headerContainer').children).toHaveLength(2)
    })
    it('renders default sidebar header', () => {
      const { getByTestId } = renderDefaultTimeline()
      expect(getByTestId("sidebarHeader")).toBeInTheDocument()
    })
    it('renders two default sidebar headers if rightSidebarWidth is passed', () => {
      let rightSidebarWidth = 150;
      const { getAllByTestId } = renderDefaultTimeline({ rightSidebarWidth });
      expect(getAllByTestId('sidebarHeader')).toHaveLength(2)
      expect(getAllByTestId('sidebarHeader')[0]).toBeInTheDocument()
      expect(getAllByTestId('sidebarHeader')[1]).toBeInTheDocument()
    })
    it('renders two dateHeaders one primary and one secondary', () => {
      const { getByTestId } = renderDefaultTimeline();
      expect(getByTestId(new RegExp('primary'))).toBeInTheDocument()
      expect(getByTestId(new RegExp('secondary'))).toBeInTheDocument()
    })

    it("Will Render A Left SideBar Header When Passed As A child", () => {
      const { getByTestId } = renderTimelineWithLeftSidebar();
      expect(getByTestId('left-header')).toBeInTheDocument();
    })
    it("Will Render A Right SideBar Header When Passed As A child", () => {
      const { getByTestId } = renderTimelineWithRightSidebar();
      expect(getByTestId('right-header')).toBeInTheDocument();
    })
    it("Will Render A Left And Right SideBar Headers When The Tow Passed As A children", () => {
      const { getByTestId } = renderTimelineWithLeftAndRightSidebar();
      expect(getByTestId('left-header')).toBeInTheDocument();
      expect(getByTestId('right-header')).toBeInTheDocument();
    })

    it("Will Not Ovverride The Overflow and Width of the CalendarHeaderStyle", () => {
      const { getByTestId } = renderTimelineWithLeftAndRightSidebar({ calendarHeaderStyle: { overflow: 'unset', width: 0 } });
      expect(getByTestId('headerContainer').style["overflow"]).not.toBe("unset")
      expect(getByTestId('headerContainer').style["width"]).not.toBe(0)
    })
    it("Will Not Ovverride The display and Width of the RootStyle", () => {
      const { getByTestId } = renderTimelineWithLeftAndRightSidebar({ style: { display: 'unset', width: 0 } });
      expect(getByTestId('headerRootDiv').style["display"]).not.toBe("unset")
      expect(getByTestId('headerRootDiv').style["width"]).not.toBe(0)
    })
    it("Will Affect The Calendar Heders When Passing A CalendarHeaderClassName", () => {
      const { getByTestId } = renderTimelineWithLeftAndRightSidebar({ calendarHeaderClassName: "testClassName" });
      expect(getByTestId("headerContainer").className).toMatch("testClassName")
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

function renderTimelineWithLeftSidebar(props = {}) {
  const timelineProps = {
    ...defaultProps,
    ...props
  }
  return render(
    <Timeline {...timelineProps}>
      <TimelineHeaders>
        <SidebarHeader variant="left">
          {({ getRootProps }) => {
            return <div data-testid="left-header" {...getRootProps()}>Left</div>
          }}
        </SidebarHeader>
      </TimelineHeaders>
    </Timeline>
  )
}

function renderTimelineWithRightSidebar(props = {}) {
  const timelineProps = {
    ...defaultProps,
    ...props
  }
  return render(
    <Timeline {...timelineProps}>
      <TimelineHeaders>
        <SidebarHeader variant="right">
          {({ getRootProps }) => {
            return <div data-testid="right-header" {...getRootProps()}>Left</div>
          }}
        </SidebarHeader>
      </TimelineHeaders>
    </Timeline>
  )
}

function renderTimelineWithLeftAndRightSidebar({ props, calendarHeaderClassName, calendarHeaderStyle, style } = {}) {

  const timelineProps = {
    ...defaultProps,
    ...props
  }

  return render(
    <Timeline {...timelineProps}>
      <TimelineHeaders style={style}
        calendarHeaderStyle={calendarHeaderStyle}
        calendarHeaderClassName={calendarHeaderClassName}>
        <SidebarHeader variant="right">
          {({ getRootProps }) => {
            return <div data-testid="right-header" {...getRootProps()}>Left</div>
          }}
        </SidebarHeader>
        <SidebarHeader variant="left">
          {({ getRootProps }) => {
            return <div data-testid="left-header" {...getRootProps()}>Left</div>
          }}
        </SidebarHeader>
      </TimelineHeaders>
    </Timeline>
  )
}

