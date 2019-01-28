import React from 'react'
import { render, cleanup, within } from 'react-testing-library'
import Timeline from 'lib/Timeline'
import DateHeader from 'lib/headers/DateHeader'
import SidebarHeader from 'lib/headers/SidebarHeader'
import TimelineHeaders from 'lib/headers/TimelineHeaders'
import 'jest-dom/extend-expect'
import moment from 'moment'
import { items, groups } from '../../../__fixtures__/itemsAndGroups'
import { visibleTimeEnd, visibleTimeStart } from '../../../__fixtures__/stateAndProps'
import { TimelineStateProvider } from 'lib/timeline/TimelineStateContext'
import { TimelineHeadersProvider } from 'lib/headers/HeadersContext'
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
  it("Given DateHeader When rendered Then it should be rendered correctly in the timeLine", () => {
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

  it("Given Dateheader When pass a string typed labelFormat Then it should render the intervals with hte given format", () => {
    const { getAllByTestId } = render(dateHeaderComponent({ unit: "day", labelFormat: "MM/DD" }));
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/25')
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/26')
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/27')
    expect(getAllByTestId('dateHeader')[0]).toHaveTextContent('Thursday, October 25')

  })

  it("Given Dateheader When pass an object typed labelFormat Then it should render the intervals with hte given format", () => {
    const { getAllByTestId } = render(dateHeaderComponent({ unit: "day", labelFormat: { day: { long: "MM/DD/YYYY" } } }));

    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/25/2018')
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/26/2018')
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/27/2018')
    expect(getAllByTestId('dateHeader')[0]).toHaveTextContent('Thursday, October 25')
  })
  it("Given Dateheader When pass a function typed labelFormat Then it should render the intervals with hte given format", () => {
    const formatlabel = jest.fn((interval, unit, labelWidth) => interval[0].format("MM/DD/YYYY"))
    const { getAllByTestId } = render(dateHeaderComponent({ unit: "day", labelFormat: formatlabel }));

    expect(formatlabel).toHaveBeenCalled()

    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/25/2018')
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/26/2018')
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/27/2018')

    expect(getAllByTestId('dateHeader')[0]).toHaveTextContent('Thursday, October 25')

  })

  it("Given Dateheader When pass a string typed labelFormat Then it should be called with the right params", () => {
    const formatlabel = jest.fn((interval, unit, labelWidth) => interval[0].format("MM/DD/YYYY"))
    render(dateHeaderComponent({ unit: "day", labelFormat: formatlabel }))
    expect(formatlabel).toHaveBeenCalled()
    expect(formatlabel).toHaveBeenCalledWith(expect.any(Array), "day", expect.any(Number))
  })



  it("Given Dateheader When click on the primary header Then it should change the unit", async () => {

    const formatlabel = jest.fn((interval, unit, labelWidth) => interval[0].format("MM/DD/YYYY"))
    const { getByTestId, getAllByTestId } = render(dateHeaderComponent({ unit: "day", labelFormat: formatlabel }));
    // Arrange
    const primaryHeader = getByTestId('dateHeader')
    const seconderyHeader = getAllByTestId('dateHeader')[2]

    // Act
    const primaryFirstClick = within(primaryHeader).getByText('Friday, October 26, 2018').parentElement
    primaryFirstClick.click()
    const primarySecondClick = within(primaryHeader).getByText('October 2018').parentElement
    primarySecondClick.click()

    // Assert
    expect(seconderyHeader).toHaveTextContent('January')
    expect(primaryHeader).toHaveTextContent('2018')
  })

  it("Given Dateheader When click on the secondary header Then it should change the unit", async () => {

    const formatlabel = jest.fn((interval, unit, labelWidth) => interval[0].format("MM/DD/YYYY"))
    const { getByTestId, getAllByTestId } = render(dateHeaderComponent({ unit: "day", labelFormat: formatlabel }));
    // Arrange
    const primaryHeader = getByTestId('dateHeader')
    const seconderyHeader = getAllByTestId('dateHeader')[2]

    const primaryFirstClick = within(primaryHeader).getByText('Friday, October 26, 2018').parentElement
    primaryFirstClick.click()
    const primarySecondClick = within(primaryHeader).getByText('October 2018').parentElement

    primarySecondClick.click()

    // Act
    const secondaryFirstClick = within(seconderyHeader).queryByText('January')
    secondaryFirstClick.click()
    expect(primaryHeader).toHaveTextContent('December 2016')
    const secondarySecondClick = within(seconderyHeader).queryByText('1')
    secondarySecondClick.click()
    expect(primaryHeader).toHaveTextContent('Wednesday, November 30, 2016')
  })

  it('Given DateHeadr When click on primary or secondary Then onTimeChange function should be called with the right params', () => {
    const handleTimeChange = jest.fn((visibleTimeStart, visibleTimeEnd, updateScrollCanvas) =>
      updateScrollCanvas(visibleTimeStart, visibleTimeEnd))
    const { getByTestId, getAllByTestId, debug } = render(dateHeaderComponent({ unit: "day", handleTimeChange: handleTimeChange }));
    const primaryHeader = within(getByTestId('dateHeader')).getByText('Friday, October 26, 2018').parentElement
    primaryHeader.click()
    const secondaryHeader = within(getAllByTestId('dateHeader')[1]).getByText('1').parentElement
    expect(handleTimeChange).toBeCalled()
    expect(handleTimeChange).toBeCalledTimes(1)
    expect(handleTimeChange).toBeCalledWith(expect.any(Number), expect.any(Number), expect.any(Function))
    expect(handleTimeChange).toReturn()

    secondaryHeader.click();
    expect(handleTimeChange).toBeCalled()
    expect(handleTimeChange).toBeCalledTimes(1)
    expect(handleTimeChange).toBeCalledWith(expect.any(Number), expect.any(Number), expect.any(Function))
    expect(handleTimeChange).toReturn()
  })

  it('Given Dateheader When pass a className Then it should be applied to DateHeader', () => {
    const { getAllByTestId } = render(dateHeaderComponent({ labelFormat: "MM/DD/YYYY", className: 'test-class-name' }));
    expect(getAllByTestId('dateHeader')[1]).toHaveClass('test-class-name')
  })

  it('Given Interval When pass an ovveride values for (width, left, position) it should not ovverride the default values', () => {
    const { getAllByTestId } = render(dateHeaderComponent({ labelFormat: "MM/DD/YYYY", props: { style: { width: 100, position: 'fixed' } } }));
    const { width, position } = getComputedStyle(getAllByTestId('interval')[0])
    expect(width).not.toBe('100px')
    expect(position).not.toBe('fixed')
  })

  it('Given Interval When pass an override (width, position) Then it should render the default values for it', () => {
    const { getAllByTestId } = render(dateHeaderComponent({ labelFormat: "MM/DD/YYYY", props: { style: { width: 100, position: 'fixed' } } }));
    const { width, position } = getComputedStyle(getAllByTestId('interval')[0])
    expect(width).toBe('36px')
    expect(position).toBe('absolute')


  })
  it('Given Interval When pass any style other than (position, width, left) through the Dateheader Then it should take it', () => {
    const { getAllByTestId } = render(dateHeaderComponent({ labelFormat: "MM/DD/YYYY", props: { style: { display: 'flex' } } }));
    const { display } = getComputedStyle(getAllByTestId('interval')[0])

    expect(display).toBe('flex')

  })
  it('Given unit Dateheader When pass a style Object Then it should render the given style correctly', () => {
    const { getAllByTestId } = render(dateHeaderComponent({ style: { height: 50 }, labelFormat: "MM/DD/YYYY" }));
    const { height } = getComputedStyle(getAllByTestId('dateHeader')[1])

    expect(height).toBe('50px')
  })

  it('Given DateHeader component When pass an intervalRenderer prop then it should be called with the right params', () => {
    const intervalRenderer = jest.fn(({ getIntervalProps, intervalContext }, props) => <div data-testid="myAwesomeInterval">{intervalContext.intervalText}</div>)
    const { getByTestId, rerender } = render(dateHeaderWithIntervalRenderer({ intervalRenderer: intervalRenderer }))
    const bluePrint = {
      getIntervalProps: expect.any(Function),
      intervalContext: expect.any(Object)
    }
    expect(intervalRenderer).toBeCalled()
    expect(intervalRenderer).toReturn()
    // because we did not pass a props then the function will called with undefined props
    expect(intervalRenderer).toBeCalledWith(expect.objectContaining(bluePrint), undefined)
    rerender(dateHeaderWithIntervalRenderer({ intervalRenderer: intervalRenderer, props: { style: { height: 50 } } }))
    expect(intervalRenderer).toBeCalledWith(expect.objectContaining(bluePrint), expect.any(Object))
    expect(getByTestId('myAwesomeInterval')).toBeInTheDocument()
  })
  describe('Testing The Label Format Diffrent Cases', () => {
    it('Given DateHeader When resize the width of the screen to 1000 Then it Should take the long format', () => {
      Element.prototype.getBoundingClientRect = jest.fn(() => ({ width: 1000 }));
      const { getAllByTestId, rerender } = render(dateHeaderComponent({
        unit: "day", labelFormat: {
          day: { short: "DD", medium: "DD/MM", mediumLong: "MM/YYYY", long: "MM/DD/YYYY", }
        }
      }));
      expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/26/2018')
    })

    it('Given DateHeader When resize the width of the screen to 250 Then it Should take the mediumLong format', () => {
      Element.prototype.getBoundingClientRect = jest.fn(() => ({ width: 250 }));
      const { getAllByTestId } = render(dateHeaderComponent({
        unit: "day", labelFormat: {
          day: { short: "DD", medium: "DD/MM", mediumLong: "MM/YYYY", long: "MM/DD/YYYY", }
        }
      }));
      expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/2018')
      expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/2018')
      expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/2018')
    })
    it('Given DateHeader When resize the width of the screen to 200 Then it Should take the medium format', () => {
      Element.prototype.getBoundingClientRect = jest.fn(() => ({ width: 200 }));
      const { getAllByTestId } = render(dateHeaderComponent({
        unit: "day", labelFormat: {
          day: { short: "DD", medium: "DD/MM", mediumLong: "MM/YYYY", long: "MM/DD/YYYY", }
        }
      }));
      expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('25/10')
      expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('26/10')
      expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('27/10')
    })
    it('Given DateHeader When resize the width of the screen to 100 Then it Should take the short format', () => {
      Element.prototype.getBoundingClientRect = jest.fn(() => ({ width: 100 }));
      const { getAllByTestId } = render(dateHeaderComponent({
        unit: "day", labelFormat: {
          day: { short: "DD", medium: "DD/MM", mediumLong: "MM/YYYY", long: "MM/DD/YYYY", }
        }
      }));
      expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('26')
    })
  })

   describe('Testing Diffrent Unit Values', () => {
   it('Given DateHeader When pass a year unit to the timeline then it should take it as default', () => {
    const children = <TimelineHeaders><DateHeader primaryHeader /><DateHeader /></TimelineHeaders> 
    const {getAllByTestId} = renderDateHeaderWithContext({unit: 'year', children: children});
    const primaryHeader = getAllByTestId('dateHeader')[0]
    const secondaryHeader = getAllByTestId('dateHeader')[1]
    expect(primaryHeader).toHaveTextContent('2019')
    expect(secondaryHeader).toHaveTextContent('2019')
   })
   it('Given DateHeader When pass a month unit to the timeline then it should take it as default', () => {
    const children = <TimelineHeaders><DateHeader primaryHeader /><DateHeader /></TimelineHeaders> 
    const {getAllByTestId} = renderDateHeaderWithContext({unit: 'month', children: children});
    const primaryHeader = getAllByTestId('dateHeader')[0]
    const secondaryHeader = getAllByTestId('dateHeader')[1]
    expect(primaryHeader).toHaveTextContent('2019')
    expect(secondaryHeader).toHaveTextContent('January 2019')
   })
   it('Given DateHeader When pass a day unit to the timeline then it should take it as default', () => {
    const children = <TimelineHeaders><DateHeader primaryHeader /><DateHeader /></TimelineHeaders> 
    const {getAllByTestId} = renderDateHeaderWithContext({unit: 'day', children: children});
    const primaryHeader = getAllByTestId('dateHeader')[0]
    const secondaryHeader = getAllByTestId('dateHeader')[1]
    expect(primaryHeader).toHaveTextContent('January 2019')
    expect(secondaryHeader).toHaveTextContent('Monday, January 21, 2019')
   })
   it('Given DateHeader When pass a hour unit to the timeline then it should take it as default', () => {
    const children = <TimelineHeaders><DateHeader primaryHeader /><DateHeader /></TimelineHeaders> 
    const {getAllByTestId} = renderDateHeaderWithContext({unit: 'hour', children: children});
    const primaryHeader = getAllByTestId('dateHeader')[0]
    const secondaryHeader = getAllByTestId('dateHeader')[1]
    expect(primaryHeader).toHaveTextContent('Monday, January 21, 2019')
    expect(secondaryHeader).toHaveTextContent('30')
   })
  })

})

function dateHeaderComponent({ labelFormat, unit, props, className, style, handleTimeChange } = {}) {

  return (

    <Timeline
      {...defaultProps}
      timelineUnit="month"
      style={{ width: 1000 }}
      onTimeChange={handleTimeChange}
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

function dateHeaderWithIntervalRenderer({ intervalRenderer, props } = {}) {

  return (

    <Timeline
      {...defaultProps}
      timelineUnit="month"
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
          unit={"day"}
          labelFormat={"MM/DD/YYYY"}
          props={props}
          intervalRenderer={intervalRenderer}
        />
        <DateHeader />
      </TimelineHeaders>
    </Timeline>
  )
}


function renderDateHeaderWithContext({unit, children} = {})
{
  const oneDay = 1000 * 60 * 60 * 24
  const now = Date.now()
  const visibleTimeStart = now - oneDay
  const visibleTimeEnd = now + oneDay
  const defaultTimelineState = {
    visibleTimeStart,
    visibleTimeEnd,
    canvasTimeStart: visibleTimeStart - oneDay,
    canvasTimeEnd: visibleTimeEnd + oneDay,
    canvasWidth: 3000,
    visibleWidth: 1000,
    showPeriod:()=>{},
    timelineWidth:1000,
    timelineUnit:unit
  }

  return render(
    <TimelineStateProvider {...defaultTimelineState}>
    <TimelineHeadersProvider
            leftSidebarWidth={150}
            timeSteps={{
              second: 1,
              minute: 1,
              hour: 1,
              day: 1,
              month: 1,
              year: 1
            }}
            registerScroll={() => React.createRef()}
            rightSidebarWidth={0}
          >
        {children}
        </TimelineHeadersProvider>
    </TimelineStateProvider>
  )

}
