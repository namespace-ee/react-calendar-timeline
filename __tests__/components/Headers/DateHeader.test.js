import React from 'react'
import { render, cleanup, within } from 'react-testing-library'
import Timeline from 'lib/Timeline'
import DateHeader from 'lib/headers/DateHeader'
import SidebarHeader from 'lib/headers/SidebarHeader'
import TimelineHeaders from 'lib/headers/TimelineHeaders'
import 'jest-dom/extend-expect'
import { RenderHeadersWrapper } from '../../test-utility/header-renderer'

describe('Testing DateHeader Component', () => {
  beforeEach(() => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 1000,
        height: 120,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }
    })
  })
  afterEach(cleanup)

  // Testing The Example In The Docs
  it('Given DateHeader When rendered Then it should be rendered correctly in the timeLine', () => {
    const { getAllByTestId } = render(
      <RenderHeadersWrapper>
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
              return (
                <div {...getIntervalProps()}>
                  {intervalContext.intervalText}
                </div>
              )
            }}
          />
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )

    expect(getAllByTestId('dateHeader')).toHaveLength(3)
  })

  it('Given Dateheader When pass a string typed labelFormat Then it should render the intervals with the given format', () => {
    const { getAllByTestId } = render(
      dateHeaderComponent({ unit: 'day', labelFormat: 'MM/DD' })
    )
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/25')
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/26')
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/27')
    expect(getAllByTestId('dateHeader')[0]).toHaveTextContent('2018')
  })

  it('Given Dateheader When pass an object typed labelFormat Then it should render the intervals with hte given format', () => {
    const { getAllByTestId } = render(
      dateHeaderComponent({
        unit: 'day',
        labelFormat: { day: { long: 'MM/DD/YYYY' } }
      })
    )

    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/25/2018')
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/26/2018')
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/27/2018')
    expect(getAllByTestId('dateHeader')[0]).toHaveTextContent('2018')
  })
  it('Given Dateheader When pass a function typed labelFormat Then it should render the intervals with hte given format', () => {
    const formatlabel = jest.fn(interval => interval[0].format('MM/DD/YYYY'))
    const { getAllByTestId } = render(
      dateHeaderComponent({ unit: 'day', labelFormat: formatlabel })
    )

    expect(formatlabel).toHaveBeenCalled()

    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/25/2018')
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/26/2018')
    expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/27/2018')

    expect(getAllByTestId('dateHeader')[0]).toHaveTextContent('2018')
  })

  it('Given Dateheader When pass a string typed labelFormat Then it should be called with the right params', () => {
    const formatlabel = jest.fn(interval => interval[0].format('MM/DD/YYYY'))
    render(dateHeaderComponent({ unit: 'day', labelFormat: formatlabel }))
    expect(formatlabel).toHaveBeenCalled()
    expect(formatlabel).toHaveBeenCalledWith(
      expect.any(Array),
      'day',
      expect.any(Number)
    )
  })

  it('Given Dateheader When click on the primary header Then it should change the unit', async () => {
    const formatlabel = jest.fn(interval => interval[0].format('MM/DD/YYYY'))
    const showPeriod = jest.fn()
    const { getByTestId, getAllByTestId } = render(
      dateHeaderComponent({ unit: 'day', labelFormat: formatlabel, showPeriod })
    )
    // Arrange
    const primaryHeader = getByTestId('dateHeader')
    const secondaryHeader = getAllByTestId('dateHeader')[2]

    // Act
    const primaryFirstClick = within(primaryHeader).getByText('2018')
      .parentElement
    primaryFirstClick.click()
    expect(showPeriod).toBeCalled()
    //TODO: test has been called with
    // expect(showPeriod).toHaveBeenCalledWith()
  })

  it('Given Dateheader When pass a className Then it should be applied to DateHeader', () => {
    const { getAllByTestId } = render(
      dateHeaderComponent({
        labelFormat: 'MM/DD/YYYY',
        className: 'test-class-name'
      })
    )
    expect(getAllByTestId('dateHeader')[1]).toHaveClass('test-class-name')
  })

  it('Given Interval When pass an ovveride values for (width, left, position) it should not ovverride the default values', () => {
    const { getAllByTestId } = render(
      dateHeaderComponent({
        labelFormat: 'MM/DD/YYYY',
        props: { style: { width: 100, position: 'fixed' } }
      })
    )
    const { width, position } = getComputedStyle(getAllByTestId('interval')[0])
    expect(width).not.toBe('100px')
    expect(position).not.toBe('fixed')
  })

  it('Given Interval When pass an override (width, position) Then it should ignore these values', () => {
    const { getAllByTestId, debug } = render(
      dateHeaderComponent({
        labelFormat: 'MM/DD/YYYY',
        props: { style: { width: 100, position: 'fixed' } }
      })
    )
    const { width, position } = getComputedStyle(getAllByTestId('interval')[0])
    expect(width).not.toBe('1000px')
    expect(position).toBe('absolute')
  })
  it('Given Interval When pass any style other than (position, width, left) through the Dateheader Then it should take it', () => {
    const { getAllByTestId } = render(
      dateHeaderComponent({
        labelFormat: 'MM/DD/YYYY',
        props: { style: { display: 'flex' } }
      })
    )
    const { display } = getComputedStyle(getAllByTestId('interval')[0])

    expect(display).toBe('flex')
  })
  it('Given unit Dateheader When pass a style Object Then it should render the given style correctly', () => {
    const { getAllByTestId } = render(
      dateHeaderComponent({ style: { height: 50 }, labelFormat: 'MM/DD/YYYY' })
    )
    const { height } = getComputedStyle(getAllByTestId('dateHeader')[1])

    expect(height).toBe('50px')
  })

  it('Given DateHeader component When pass an intervalRenderer prop then it should be called with the right params', () => {
    const intervalRenderer = jest.fn(
      ({ getIntervalProps, intervalContext }, props) => (
        <div data-testid="myAwesomeInterval">
          {intervalContext.intervalText}
        </div>
      )
    )
    const { getByTestId, rerender } = render(
      dateHeaderWithIntervalRenderer({ intervalRenderer: intervalRenderer })
    )
    const bluePrint = {
      getIntervalProps: expect.any(Function),
      intervalContext: expect.any(Object)
    }
    expect(intervalRenderer).toBeCalled()
    expect(intervalRenderer).toReturn()
    // because we did not pass a props then the function will called with undefined props
    expect(intervalRenderer).toBeCalledWith(
      expect.objectContaining(bluePrint),
      undefined
    )
    rerender(
      dateHeaderWithIntervalRenderer({
        intervalRenderer: intervalRenderer,
        props: { style: { height: 50 } }
      })
    )
    expect(intervalRenderer).toBeCalledWith(
      expect.objectContaining(bluePrint),
      expect.any(Object)
    )
    expect(getByTestId('myAwesomeInterval')).toBeInTheDocument()
  })
  describe('Testing The Label Format Diffrent Cases', () => {
    it('Given DateHeader When resize the width of the screen to 1000 Then it Should take the long format', () => {
      Element.prototype.getBoundingClientRect = jest.fn(() => ({ width: 1000 }))
      const { getAllByTestId, rerender } = render(
        dateHeaderComponent({
          unit: 'day',
          labelFormat: {
            day: {
              short: 'DD',
              medium: 'DD/MM',
              mediumLong: 'MM/YYYY',
              long: 'MM/DD/YYYY'
            }
          }
        })
      )
      expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/26/2018')
    })

    //TODO: replace implementation using rerender
    it('Given DateHeader When resize the width of the screen to 250 Then it Should take the mediumLong format', () => {
      // Element.prototype.getBoundingClientRect = jest.fn(() => ({ width: 250 }))
      // const { getAllByTestId } = render(
      //   dateHeaderComponent({
      //     unit: 'day',
      //     labelFormat: {
      //       day: {
      //         short: 'DD',
      //         medium: 'DD/MM',
      //         mediumLong: 'MM/YYYY',
      //         long: 'MM/DD/YYYY'
      //       }
      //     }
      //   })
      // )
      // expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/2018')
      // expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/2018')
      // expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/2018')
    })

    //TODO: replace implementation using rerender
    it('Given DateHeader When resize the width of the screen to 200 Then it Should take the medium format', () => {
      // Element.prototype.getBoundingClientRect = jest.fn(() => ({ width: 200 }))
      // const { getAllByTestId } = render(
      //   dateHeaderComponent({
      //     unit: 'day',
      //     labelFormat: {
      //       day: {
      //         short: 'DD',
      //         medium: 'DD/MM',
      //         mediumLong: 'MM/YYYY',
      //         long: 'MM/DD/YYYY'
      //       }
      //     }
      //   })
      // )
      // expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('25/10')
      // expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('26/10')
      // expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('27/10')
    })
    it('Given DateHeader When resize the width of the screen to 100 Then it Should take the short format', () => {
      Element.prototype.getBoundingClientRect = jest.fn(() => ({ width: 100 }))
      const { getAllByTestId } = render(
        dateHeaderComponent({
          unit: 'day',
          labelFormat: {
            day: {
              short: 'DD',
              medium: 'DD/MM',
              mediumLong: 'MM/YYYY',
              long: 'MM/DD/YYYY'
            }
          }
        })
      )
      expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('26')
    })
  })

  describe('Testing Diffrent Unit Values', () => {
    it('Given DateHeader When pass a year unit to the timeline then it should take it as default', () => {
      const { getAllByTestId } = render(
        <RenderHeadersWrapper timelineState={{ timelineUnit: 'year' }}>
          <TimelineHeaders>
            <DateHeader primaryHeader />
            <DateHeader />
          </TimelineHeaders>
        </RenderHeadersWrapper>
      )
      const primaryHeader = getAllByTestId('dateHeader')[0]
      const secondaryHeader = getAllByTestId('dateHeader')[1]
      expect(primaryHeader).toHaveTextContent('2018')
      expect(secondaryHeader).toHaveTextContent('2018')
    })
    it('Given DateHeader When pass a month unit to the timeline then it should take it as default', () => {
      const { getAllByTestId } = render(
        <RenderHeadersWrapper timelineState={{ timelineUnit: 'month' }}>
          <TimelineHeaders>
            <DateHeader primaryHeader />
            <DateHeader />
          </TimelineHeaders>
        </RenderHeadersWrapper>
      )

      const primaryHeader = getAllByTestId('dateHeader')[0]
      const secondaryHeader = getAllByTestId('dateHeader')[1]
      expect(primaryHeader).toHaveTextContent('2018')
      expect(secondaryHeader).toHaveTextContent('October 2018')
    })
    it('Given DateHeader When pass a day unit to the timeline then it should take it as default', () => {
      const { getAllByTestId } = render(
        <RenderHeadersWrapper timelineState={{ timelineUnit: 'day' }}>
          <TimelineHeaders>
            <DateHeader primaryHeader />
            <DateHeader />
          </TimelineHeaders>
        </RenderHeadersWrapper>
      )

      const primaryHeader = getAllByTestId('dateHeader')[0]
      const secondaryHeader = getAllByTestId('dateHeader')[1]
      expect(primaryHeader).toHaveTextContent('October 2018')
      expect(secondaryHeader).toHaveTextContent('Thursday, October 25')
    })
    it('Given DateHeader When pass a hour unit to the timeline then it should take it as default', () => {
      const { getAllByTestId, debug } = render(
        <RenderHeadersWrapper timelineState={{ timelineUnit: 'hour' }}>
          <TimelineHeaders>
            <DateHeader primaryHeader />
            <DateHeader />
          </TimelineHeaders>
        </RenderHeadersWrapper>
      )
      const primaryHeader = getAllByTestId('dateHeader')[0]
      const secondaryHeader = getAllByTestId('dateHeader')[1]
      expect(primaryHeader).toHaveTextContent('October 27, 2018')
      expect(secondaryHeader).toHaveTextContent('14')
    })
  })
})

function dateHeaderComponent({
  labelFormat,
  unit,
  props,
  className,
  style,
  showPeriod
} = {}) {
  return (
    <RenderHeadersWrapper
      showPeriod={showPeriod}
      timelineState={{ timelineUnit: 'month' }}
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
            return (
              <div data-testid="interval" {...getIntervalProps(props)}>
                {intervalContext.intervalText}
              </div>
            )
          }}
        />
        <DateHeader />
      </TimelineHeaders>
    </RenderHeadersWrapper>
  )
}

function dateHeaderWithIntervalRenderer({ intervalRenderer, props } = {}) {
  return (
    <RenderHeadersWrapper timelineState={{ timelineUnit: 'month' }}>
      <TimelineHeaders>
        <SidebarHeader>
          {({ getRootProps }) => {
            return <div {...getRootProps()}>Left</div>
          }}
        </SidebarHeader>
        <DateHeader primaryHeader />
        <DateHeader
          unit={'day'}
          labelFormat={'MM/DD/YYYY'}
          props={props}
          intervalRenderer={intervalRenderer}
        />
        <DateHeader />
      </TimelineHeaders>
    </RenderHeadersWrapper>
  )
}
