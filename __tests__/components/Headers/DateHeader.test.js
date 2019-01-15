import React from 'react'
import ReactDOM from 'react-dom'

import { render, cleanup, within, queryByAttribute } from 'react-testing-library'
import Timeline from 'lib/Timeline'
import DateHeader from 'lib/headers/DateHeader'
import SidebarHeader from 'lib/headers/SidebarHeader'
import TimelineHeaders from 'lib/headers/TimelineHeaders'
import 'jest-dom/extend-expect'
import moment from 'moment'
import { items, groups } from '../../../__fixtures__/itemsAndGroups'
import { visibleTimeEnd, visibleTimeStart } from '../../../__fixtures__/stateAndProps'
const defaultProps = {
  groups,
  items,
  defaultTimeStart: moment(visibleTimeStart, 'x'),
  defaultTimeEnd: moment(visibleTimeEnd, 'x'),
}

describe("Testing DateHeader Component", () => {
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

  // Testing The Example In The Docs
  it("DateHeader Will Be Rendered Correctly In The TimeLine", () => {
    const { getAllByTestId } = render(
      <Timeline
        {...defaultProps}
      >
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}>Left</div>
            }}
          </SidebarHeader>
          <DateHeader primaryHeader />
          <DateHeader />
          <DateHeader
            unit="day"
            style={{ height: 50 }}
            intervalRenderer={({ getIntervalProps, intervalContext }) => {
              return <div {...getIntervalProps()}>
                {intervalContext.intervalText}
              </div>
            }}
          />
        </TimelineHeaders>
      </Timeline>
    )

    expect(getAllByTestId('dateHeader')).toHaveLength(3)

  })

  it("Label Format With A String Will Rendered Correctly In The intervalRenderer", () => {
    const { getAllByTestId } = renderDateHeader({ unit: "day", labelFormat: "MM/DD" });
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/25')
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/26')
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/27')
    expect(getAllByTestId('dateHeader')[0]).toHaveTextContent('Thursday, October 25')

  })

  it("Label Format With An Object Will Rendered Correctly In The intervalRenderer", () => {
    const { getAllByTestId } = renderDateHeader({ unit: "day", labelFormat: { day: { short: "MM/DD/YYYY", long: "MM/DD/YYYY" } } });

    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/25/2018')
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/26/2018')
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/27/2018')
    expect(getAllByTestId('dateHeader')[0]).toHaveTextContent('Thursday, October 25')
  })
  it("Label Format With A Function Will Rendered Correctly In The intervalRenderer", () => {
    const formatlabel = jest.fn((interval, unit, labelWidth) => interval[0].format("MM/DD/YYYY"))
    const { getAllByTestId } = renderDateHeader({ unit: "day", labelFormat: formatlabel });

    expect(formatlabel).toHaveBeenCalled()

    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/25/2018')
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/26/2018')
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/27/2018')

    expect(getAllByTestId('dateHeader')[0]).toHaveTextContent('Thursday, October 25')

  })
  it("Label Format With A Function Will Be Called With The Right Parameters", () => {
    const formatlabel = jest.fn((interval, unit, labelWidth) => interval[0].format("MM/DD/YYYY"))
    renderDateHeader({ unit: "day", labelFormat: formatlabel })
    expect(formatlabel).toHaveBeenCalled()
    expect(formatlabel).toHaveBeenCalledWith(expect.any(Array), "day", expect.any(Number))
  })

  it("Format Will Change When Click On The Primary", async () => {

    const formatlabel = jest.fn((interval, unit, labelWidth) => interval[0].format("MM/DD/YYYY"))
    const { getByTestId, getAllByTestId } = renderDateHeader({ unit: "day", labelFormat: formatlabel });
    // Arrange
    const primaryHeader = getByTestId('dateHeader')
    const seconderyHeader = getAllByTestId('dateHeader')[2]
    const unitHeader = getAllByTestId('dateHeader')[1]

    const unitHeaderChildrenBeforeClick = unitHeader.childElementCount
    const secondaryHeaderChildrenBeforeClick = seconderyHeader.childElementCount

    // Act
    const primaryFirstClick = within(primaryHeader).getByText('Friday, October 26, 2018').parentElement
    primaryFirstClick.click()
    const primarySecondClick = within(primaryHeader).getByText('October 2018').parentElement
    primarySecondClick.click()

    // Assert
    expect(seconderyHeader).toHaveTextContent('January')
    expect(primaryHeader).toHaveTextContent('2018')
    expect(secondaryHeaderChildrenBeforeClick).toBeGreaterThan(seconderyHeader.childElementCount)
    expect(unitHeaderChildrenBeforeClick).toBeLessThan(unitHeader.childElementCount)

  })

  it("Format Will Change When Click On The Secondary", async () => {

    const formatlabel = jest.fn((interval, unit, labelWidth) => interval[0].format("MM/DD/YYYY"))
    const { getByTestId, getAllByTestId, debug } = renderDateHeader({ unit: "day", labelFormat: formatlabel });
    // Arrange
    const primaryHeader = getByTestId('dateHeader')
    const seconderyHeader = getAllByTestId('dateHeader')[2]
    const unitHeader = getAllByTestId('dateHeader')[1]

    const primaryFirstClick = within(primaryHeader).getByText('Friday, October 26, 2018').parentElement
    primaryFirstClick.click()
    const primarySecondClick = within(primaryHeader).getByText('October 2018').parentElement

    primarySecondClick.click()
    const unitHeaderChildrenBeforeClick = unitHeader.childElementCount
    const secondaryHeaderChildrenBeforeClick = seconderyHeader.childElementCount

    // Act
    const secondaryFirstClick = within(seconderyHeader).queryByText('January')
    secondaryFirstClick.click()
    const secondarySecondClick = within(seconderyHeader).queryByText('1')
    secondarySecondClick.click()

    // Assert
    expect(secondaryHeaderChildrenBeforeClick).toBeLessThan(seconderyHeader.childElementCount)
    expect(unitHeaderChildrenBeforeClick).toBeGreaterThan(unitHeader.childElementCount)
  })
  it('ClassName Will Be Applied To DateHeader When Provided', () => {
    const { getAllByTestId } = renderDateHeader({ labelFormat: "MM/DD/YYYY", className: 'test-class-name' });
    expect(getAllByTestId('dateHeader')[1]).toHaveClass('test-class-name')
  })
  it('should not ovverride the width/left/position in case of providing interval renderer but it will accept any other style values', () => {
    const { getAllByTestId } = renderDateHeader({ labelFormat: "MM/DD/YYYY", props: { style: { width: 100, position: 'fixed', display: 'flex' } } });
    const { width, position, display } = getComputedStyle(getAllByTestId('interval')[0])

    expect(width).not.toBe('100px')
    expect(position).not.toBe('fixed')
    expect(display).toBe('flex')

  })
  it('should render the given style correctly in the unit header', () => {
    const { getAllByTestId } = renderDateHeader({ style: { height: 50 }, labelFormat: "MM/DD/YYYY", props: { style: { width: 100, position: 'fixed', display: 'flex' } } });
    const { height } = getComputedStyle(getAllByTestId('dateHeader')[1])

    expect(height).toBe('50px')
  })


})

function renderDateHeader({ labelFormat, unit, props, className, style } = {}) {

  return render(

    <Timeline
      {...defaultProps}
      style={{ width: 1000 }}
    >
      <TimelineHeaders>
        <SidebarHeader>
          {({ getRootProps }) => {
            return <div {...getRootProps()}>Left</div>
          }}
        </SidebarHeader>
        <DateHeader primaryHeader />
        <DateHeader
          unit={unit}
          labelFormat={labelFormat}
          props={props}
          style={style}
          className={className}
          intervalRenderer={({ getIntervalProps, intervalContext }, props) => {
            return <div data-testid="interval" {...getIntervalProps(props)}>
              {intervalContext.intervalText}

            </div>
          }}
        />
        <DateHeader />
      </TimelineHeaders>
    </Timeline>
  )
}