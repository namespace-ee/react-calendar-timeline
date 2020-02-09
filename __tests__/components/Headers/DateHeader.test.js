import React from 'react'
import { render, cleanup, within, fireEvent } from 'react-testing-library'
import Timeline from 'lib/Timeline'
import DateHeader from 'lib/headers/DateHeader'
import SidebarHeader from 'lib/headers/SidebarHeader'
import TimelineHeaders from 'lib/headers/TimelineHeaders'
import '@testing-library/jest-dom/extend-expect'
import { RenderHeadersWrapper } from '../../test-utility/header-renderer'
import moment from 'moment'

describe('Testing DateHeader Component', () => {
  afterEach(cleanup)

  const format = 'MM/DD/YYYY hh:mm a'

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
          <DateHeader unit="primaryHeader" />
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

  describe('DateHeader labelFormat', () => {
    afterEach(cleanup)

    it('Given Dateheader When pass a string typed labelFormat Then it should render the intervals with the given format', () => {
      const { getAllByTestId } = render(
        dateHeaderComponent({ unit: 'day', labelFormat: 'MM/DD' })
      )
      expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/25')
      expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/26')
      expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/27')
    })

    it('Given Dateheader When pass a function typed labelFormat Then it should render the intervals with the given format', () => {
      const formatlabel = jest.fn(interval => interval[0].format('MM/DD/YYYY'))
      const { getAllByTestId } = render(
        dateHeaderComponent({ unit: 'day', labelFormat: formatlabel })
      )

      expect(formatlabel).toHaveBeenCalled()

      expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/25/2018')
      expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/26/2018')
      expect(getAllByTestId('dateHeader')[1]).toHaveTextContent('10/27/2018')
    })

    it('Given Dateheader When pass a function typed labelFormat Then it should be called with an interval, label width and unit', () => {
      const formatlabel = jest.fn(interval => interval[0].format('MM/DD/YYYY'))
      render(dateHeaderComponent({ unit: 'day', labelFormat: formatlabel }))

      expect(formatlabel).toHaveBeenCalled()

      formatlabel.mock.calls.forEach(param => {
        const [[start, end], unit, labelWidth] = param
        expect(moment.isMoment(start)).toBeTruthy()
        expect(moment.isMoment(end)).toBeTruthy()
        expect(end.diff(start, 'd')).toBe(1)
        expect(unit).toBe('day')
        expect(labelWidth).toEqual(expect.any(Number))
      })
    })
  })

  it('Given Dateheader When click on the primary header Then it should change the unit', async () => {
    const formatlabel = jest.fn(interval => interval[0].format('MM/DD/YYYY'))
    const showPeriod = jest.fn()
    const { getByTestId } = render(
      dateHeaderComponent({ unit: 'day', labelFormat: formatlabel, showPeriod })
    )
    // Arrange
    const primaryHeader = getByTestId('dateHeader')

    // Act
    const primaryFirstClick = within(primaryHeader).getByText('2018')
      .parentElement
    primaryFirstClick.click()
    expect(showPeriod).toBeCalled()
    const [start, end] = showPeriod.mock.calls[0]
    expect(start.format('DD/MM/YYYY hh:mm a')).toBe('01/01/2018 12:00 am')
    expect(end.format('DD/MM/YYYY hh:mm a')).toBe('31/12/2018 11:59 pm')
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

  it('Given Interval When pass an override values for (width, left, position) it should not override the default values', () => {
    const { getAllByTestId } = render(
      dateHeaderComponent({
        labelFormat: 'MM/DD/YYYY',
        props: { style: { width: 100, position: 'fixed', left: 2342 } }
      })
    )
    const { width, position, left } = getComputedStyle(
      getAllByTestId('interval')[0]
    )
    expect(width).not.toBe('100px')
    expect(position).not.toBe('fixed')
    expect(left).not.toBe('2342px')
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

  it('Given DateHeader component When pass an intervalRenderer prop then it should be called with the right params', () => {
    const intervalRenderer = jest.fn(
      ({ getIntervalProps, intervalContext, data }) => (
        <div data-testid="myAwesomeInterval">
          {intervalContext.intervalText}
        </div>
      )
    )
    const props = {
      title: 'some title'
    }
    render(
      dateHeaderWithIntervalRenderer({
        intervalRenderer: intervalRenderer,
        props
      })
    )
    const bluePrint = {
      getIntervalProps: expect.any(Function),
      intervalContext: expect.any(Object)
    }
    expect(intervalRenderer).toBeCalled()
    expect(intervalRenderer).toReturn()
    expect(intervalRenderer.mock.calls[0][0].data).toBe(props)
    expect(intervalRenderer.mock.calls[0][0].getIntervalProps).toEqual(
      expect.any(Function)
    )
    expect(intervalRenderer.mock.calls[0][0].intervalContext).toEqual(
      expect.any(Object)
    )
  })

  describe('DateHeader Unit Values', () => {
    it('Given DateHeader When not passing a unit then the date header unit should be same as timeline unit', () => {
      const { getAllByTestId } = render(
        <RenderHeadersWrapper timelineState={{ timelineUnit: 'day' }}>
          <TimelineHeaders>
            <DateHeader labelFormat={interval => interval[0].format(format)} />
          </TimelineHeaders>
        </RenderHeadersWrapper>
      )
      const intervals = getAllByTestId('dateHeaderInterval').map(
        interval => interval.textContent
      )
      for (let index = 0; index < intervals.length - 1; index++) {
        const a = intervals[index]
        const b = intervals[index + 1]

        const timeStampA = moment(a, format)
        const timeStampB = moment(b, format)
        const diff = timeStampB.diff(timeStampA, 'day')
        expect(diff).toBe(1)
      }
    })
    it('Given DateHeader When passing a unit then the date header unit should be same as unit passed', () => {
      const { getAllByTestId } = render(
        <RenderHeadersWrapper timelineState={{ timelineUnit: 'month' }}>
          <TimelineHeaders>
            <DateHeader
              unit="day"
              labelFormat={interval => interval[0].format(format)}
            />
          </TimelineHeaders>
        </RenderHeadersWrapper>
      )
      const intervals = getAllByTestId('dateHeaderInterval').map(
        interval => interval.textContent
      )
      for (let index = 0; index < intervals.length - 1; index++) {
        const a = intervals[index]
        const b = intervals[index + 1]

        const timeStampA = moment(a, format)
        const timeStampB = moment(b, format)
        const diff = timeStampB.diff(timeStampA, 'day')
        expect(diff).toBe(1)
      }
    })

    it('Given DateHeader When passing primaryHeader Then the header unit should be bigger the timeline unit', () => {
      const { getAllByTestId } = render(
        <RenderHeadersWrapper timelineState={{ timelineUnit: 'day' }}>
          <TimelineHeaders>
            <DateHeader
              unit="primaryHeader"
              labelFormat={interval => interval[0].format(format)}
            />
          </TimelineHeaders>
        </RenderHeadersWrapper>
      )
      const intervals = getAllByTestId('dateHeaderInterval').map(
        interval => interval.textContent
      )
      for (let index = 0; index < intervals.length - 1; index++) {
        const a = intervals[index]
        const b = intervals[index + 1]

        const timeStampA = moment(a, format)
        const timeStampB = moment(b, format)
        const diff = timeStampB.diff(timeStampA, 'month')
        expect(diff).toBe(1)
      }
    })

    it('Given DateHeader When not passing unit Then the header unit should be same as the timeline unit', () => {
      const { getAllByTestId } = render(
        <RenderHeadersWrapper timelineState={{ timelineUnit: 'day' }}>
          <TimelineHeaders>
            <DateHeader labelFormat={interval => interval[0].format(format)} />
          </TimelineHeaders>
        </RenderHeadersWrapper>
      )
      const intervals = getAllByTestId('dateHeaderInterval').map(
        interval => interval.textContent
      )
      for (let index = 0; index < intervals.length - 1; index++) {
        const a = intervals[index]
        const b = intervals[index + 1]

        const timeStampA = moment(a, format)
        const timeStampB = moment(b, format)
        const diff = timeStampB.diff(timeStampA, 'day')
        expect(diff).toBe(1)
      }
    })
  })

  describe('DateHeader Interval', () => {
    it('Given DateHeader Interval When passing on click event to the prop getter Then it should trigger', () => {
      const onClick = jest.fn()
      const { getAllByTestId } = render(
        <RenderHeadersWrapper>
          <TimelineHeaders>
            <DateHeader
              intervalRenderer={({
                getIntervalProps,
                intervalContext,
                data
              }) => {
                return (
                  <div
                    data-testid="interval"
                    {...getIntervalProps({ onClick: onClick })}
                  >
                    {intervalContext.intervalText}
                  </div>
                )
              }}
            />
          </TimelineHeaders>
        </RenderHeadersWrapper>
      )
      const intervals = getAllByTestId('interval')
      fireEvent.click(intervals[0])
      expect(onClick).toHaveBeenCalled()
    })
    it('Given DateHeader When passing interval renderer Then it should be rendered', () => {
      const { getByTestId } = render(
        <RenderHeadersWrapper>
          <TimelineHeaders>
            <DateHeader
              intervalRenderer={({ getIntervalProps, intervalContext }) => {
                return (
                  <div data-testid="interval" {...getIntervalProps()}>
                    {intervalContext.intervalText}
                  </div>
                )
              }}
            />
          </TimelineHeaders>
        </RenderHeadersWrapper>
      )
      expect(getByTestId('interval')).toBeInTheDocument()
    })
    it("Given DateHeader When passing interval renderer Then it should called with interval's context", () => {
      const renderer = jest.fn(({ getIntervalProps, intervalContext }) => {
        return (
          <div data-testid="interval" {...getIntervalProps()}>
            {intervalContext.intervalText}
          </div>
        )
      })
      render(
        <RenderHeadersWrapper>
          <TimelineHeaders>
            <DateHeader intervalRenderer={renderer} />
          </TimelineHeaders>
        </RenderHeadersWrapper>
      )
      expect(renderer.mock.calls[0][0].intervalContext).toEqual(
        expect.objectContaining({
          interval: expect.objectContaining({
            startTime: expect.any(moment),
            endTime: expect.any(moment),
            labelWidth: expect.any(Number),
            left: expect.any(Number)
          }),
          intervalText: expect.any(String)
        })
      )
    })
  })
  it('Given DateHeader When passing a stateless react component to interval renderer Then it should render', () => {
    const Renderer = ({ getIntervalProps, intervalContext }) => {
      return (
        <div data-testid="interval-a" {...getIntervalProps()}>
          {intervalContext.intervalText}
        </div>
      )
    }
    const { getByTestId } = render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}>Left</div>
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
          <DateHeader
            unit="day"
            style={{ height: 50 }}
            intervalRenderer={Renderer}
          />
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )

    expect(getByTestId('interval-a')).toBeInTheDocument()
  })
  it('Given DateHeader When passing a react component to interval renderer Then it should render', () => {
    class Renderer extends React.Component {
      render() {
        const { getIntervalProps, intervalContext } = this.props
        return (
          <div data-testid="interval-a" {...getIntervalProps()}>
            {intervalContext.intervalText}
          </div>
        )
      }
    }
    const { getByTestId } = render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}>Left</div>
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
          <DateHeader
            unit="day"
            style={{ height: 50 }}
            intervalRenderer={Renderer}
          />
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )

    expect(getByTestId('interval-a')).toBeInTheDocument()
  })
  it('#562 Given DateHeader when passing week as a unit then header should render without error', ()=>{
    render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <DateHeader unit="week" />
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )
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
        <DateHeader unit="primaryHeader" />
        <DateHeader
          unit={unit}
          labelFormat={labelFormat}
          headerData={props}
          style={style}
          className={className}
          intervalRenderer={({ getIntervalProps, intervalContext, data }) => {
            return (
              <div data-testid="interval" {...getIntervalProps(data)}>
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
        <DateHeader unit="primaryHeader" />
        <DateHeader
          unit={'day'}
          labelFormat={'MM/DD/YYYY'}
          headerData={props}
          intervalRenderer={intervalRenderer}
        />
        <DateHeader />
      </TimelineHeaders>
    </RenderHeadersWrapper>
  )
}
