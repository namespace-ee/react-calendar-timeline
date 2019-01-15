import { render, cleanup, prettyDOM } from 'react-testing-library'
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
  beforeEach(() => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 1000,
        height: 120,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }
    });
  })
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
      const { getByTestId } = renderDefaultTimeline()
      expect(getByTestId("sidebarHeader")).toBeInTheDocument()
    })
    it('renders two default sidebar headers if rightSidebarWidth is passed', () => {
      let rightSidebarWidth = 150;
      const { getAllByTestId } = renderDefaultTimeline({ rightSidebarWidth });
      const sidebarHeaders = getAllByTestId('sidebarHeader')

      expect(sidebarHeaders).toHaveLength(2)
      expect(sidebarHeaders[0]).toBeInTheDocument()
      expect(sidebarHeaders[1]).toBeInTheDocument()
      const { width } = getComputedStyle(sidebarHeaders[1])
      expect(width).toBe("150px")


    })
    it('renders two dateHeaders one primary and one secondary by default', () => {
      const { getAllByTestId, getByTestId } = renderDefaultTimeline();
      const dateHeaders = getAllByTestId("dateHeader")

      expect(dateHeaders).toHaveLength(2)
      expect(dateHeaders[1].childElementCount).toBeGreaterThan(dateHeaders[0].childElementCount)

    })

    it("Will Render A Left SideBar Header When Passed As A child", () => {
      const { getByTestId } = renderTimelineWithVariantSidebar({ variant: "left" });
      expect(getByTestId('sidebarHeader')).toBeInTheDocument();
    })
    it("Will Render A Right SideBar Header When Passed As A child", () => {
      const { getByTestId } = renderTimelineWithVariantSidebar({ variant: "right" });
      expect(getByTestId('sidebarHeader')).toBeInTheDocument();
    })
    it("Will Render A Left And Right SideBar Headers When The Tow Passed As A children", () => {
      const { getByTestId } = renderTimelineWithLeftAndRightSidebar();
      expect(getByTestId('left-header')).toBeInTheDocument();
      expect(getByTestId('right-header')).toBeInTheDocument();
    })

    it("Will Not Ovverride The Overflow and Width of the CalendarHeaderStyle", () => {
      const { getByTestId } = renderTimelineWithLeftAndRightSidebar({ calendarHeaderStyle: { overflow: 'unset', width: 0 } });
      const headerContainer = getByTestId('headerContainer')
      const { width, overflow } = getComputedStyle(headerContainer)

      expect(overflow).not.toBe('unset')
      expect(width).not.toBe("0px")

    })
    it("Will Not Ovverride The display and Width of the RootStyle", () => {
      const { getByTestId } = renderTimelineWithLeftAndRightSidebar({ style: { display: 'none', width: 0 } });
      const rootDiv = getByTestId('headerRootDiv')
      const { width, display } = getComputedStyle(rootDiv)

      expect(display).not.toBe('none')
      expect(width).not.toBe("0px")

    })
    it("Will Affect The Calendar Heders When Passing A CalendarHeaderClassName", () => {
      const { getByTestId } = renderTimelineWithLeftAndRightSidebar({ calendarHeaderClassName: "testClassName" });
      expect(getByTestId("headerContainer")).toHaveClass("testClassName")
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

function renderTimelineWithVariantSidebar({ props, variant } = {}) {
  const timelineProps = {
    ...defaultProps,
    ...props
  }
  return render(
    <Timeline {...timelineProps}>
      <TimelineHeaders>
        <SidebarHeader variant={variant}>
          {({ getRootProps }) => {
            return <div data-testid="sidebarHeader" {...getRootProps()}>Left</div>
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



