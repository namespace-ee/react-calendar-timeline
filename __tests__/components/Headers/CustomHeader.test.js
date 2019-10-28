import React from 'react'
import { render, cleanup } from 'react-testing-library'
import DateHeader from 'lib/headers/DateHeader'
import SidebarHeader from 'lib/headers/SidebarHeader'
import TimelineHeaders from 'lib/headers/TimelineHeaders'
import CustomHeader from 'lib/headers/CustomHeader'
import { RenderHeadersWrapper } from '../../test-utility/header-renderer'
import { getCustomHeadersInTimeline } from '../../test-utility/headerRenderers'
import { parsePxToNumbers } from '../../test-utility/index'

import '@testing-library/jest-dom/extend-expect'
import moment from 'moment'

describe('CustomHeader Component Test', () => {
  afterEach(cleanup)

  it('Given CustomHeader When pass a unit to it Then header should render that unit', () => {
    const { getAllByTestId } = render(
      getCustomHeadersInTimeline({
        unit: 'month',
        timelineState: {
          timelineUnit: 'month',
          canvasTimeStart: moment.utc('1/6/2018', 'DD/MM/YYYY').valueOf(),
          canvasTimeEnd: moment.utc('1/6/2020', 'DD/MM/YYYY').valueOf(),
          visibleTimeStart: moment.utc('1/1/2019', 'DD/MM/YYYY').valueOf(),
          visibleTimeEnd: moment.utc('1/1/2020', 'DD/MM/YYYY').valueOf()
        }
      })
    )
    const intervals = getAllByTestId('customHeaderInterval')
    const start = moment(intervals[0].textContent, 'DD/MM/YYYY')
    const end = moment(intervals[1].textContent, 'DD/MM/YYYY')
    expect(end.diff(start, 'M')).toBe(1)
  })
  it('Given CustomHeader When pass a style props with (width, position) Then it should not override the default values', () => {
    const { getByTestId } = render(
      getCustomHeadersInTimeline({
        props: { style: { width: 0, position: 'fixed' } }
      })
    )
    const { width, position } = getComputedStyle(getByTestId('customHeader'))
    expect(width).not.toBe('0px')
    expect(position).not.toBe('fixed')
  })

  it('Given CustomHeader When pass a style props other than (width, position) Then it should rendered Correctly', () => {
    const { getByTestId } = render(
      getCustomHeadersInTimeline({ props: { style: { color: 'white' } } })
    )
    const { color } = getComputedStyle(getByTestId('customHeader'))
    expect(color).toBe('white')
  })

  it('Given CustomHeader When pass an interval style with (width, position and left) Then it should not override the default values', () => {
    const { getByTestId } = render(
      getCustomHeadersInTimeline({
        intervalStyle: {
          width: 0,
          position: 'fixed',
          left: 1222222
        }
      })
    )
    const { width, position, left } = getComputedStyle(
      getByTestId('customHeaderInterval')
    )
    expect(width).not.toBe('0px')
    expect(position).not.toBe('fixed')
    expect(left).not.toBe('1222222px')
  })
  it('Given CustomHeader When pass an interval style other than (width, position and left) Then it should rendered correctly', () => {
    const { getByTestId } = render(
      getCustomHeadersInTimeline({
        intervalStyle: {
          lineHeight: '30px',
          textAlign: 'center',
          borderLeft: '1px solid black',
          cursor: 'pointer',
          color: 'white'
        }
      })
    )
    const {
      lineHeight,
      textAlign,
      borderLeft,
      cursor,
      color
    } = getComputedStyle(getByTestId('customHeaderInterval'))
    expect(lineHeight).toBe('30px')
    expect(textAlign).toBe('center')
    expect(borderLeft).toBe('1px solid black')
    expect(cursor).toBe('pointer')
    expect(color).toBe('white')
  })

  it('Given a CustomHeader When not pass any unit prop Then it Should take the default timeline unit', () => {
    const { getAllByTestId } = render(
      getCustomHeadersInTimeline({
        timelineState: {
          //default unit we are testing
          timelineUnit: 'month',
          canvasTimeStart: moment.utc('1/6/2018', 'DD/MM/YYYY').valueOf(),
          canvasTimeEnd: moment.utc('1/6/2020', 'DD/MM/YYYY').valueOf(),
          visibleTimeStart: moment.utc('1/1/2019', 'DD/MM/YYYY').valueOf(),
          visibleTimeEnd: moment.utc('1/1/2020', 'DD/MM/YYYY').valueOf()
        }
      })
    )
    const intervals = getAllByTestId('customHeaderInterval')
    const start = moment(intervals[0].textContent, 'DD/MM/YYYY')
    const end = moment(intervals[1].textContent, 'DD/MM/YYYY')
    expect(end.diff(start, 'M')).toBe(1)
  })

  it("Given CustomHeader When rendered Then intervals don't overlap in position", () => {
    const { getAllByTestId } = render(getCustomHeadersInTimeline())
    const intervals = getAllByTestId('customHeaderInterval')
    const intervalsCoordinations = intervals.map(interval => {
      const { left, width } = getComputedStyle(interval)
      return {
        left: parsePxToNumbers(left),
        right: parsePxToNumbers(left) + parsePxToNumbers(width)
      }
    })
    for (let index = 0; index < intervalsCoordinations.length - 1; index++) {
      const a = intervalsCoordinations[index]
      const b = intervalsCoordinations[index + 1]
      expect(Math.abs(a.right - b.left)).toBeLessThan(0.1)
    }
  })

  it('Given CustomHeader When passing child renderer Then showPeriod should be passed', () => {
    const showPeriod = () => {}
    const renderer = jest.fn(() => {
      return <div>header</div>
    })
    render(
      <RenderHeadersWrapper
        timelineState={{
          showPeriod: showPeriod
        }}
      >
        <TimelineHeaders>
          <CustomHeader>{renderer}</CustomHeader>
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )
    expect(renderer.mock.calls[0][0].showPeriod).toBe(showPeriod)
  })

  it('Given CustomHeader When passing child renderer Then headerContext should be passed', () => {
    const renderer = jest.fn(() => {
      return <div>header</div>
    })
    render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <CustomHeader>{renderer}</CustomHeader>
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )
    const headerContext = renderer.mock.calls[0][0].headerContext
    expect(headerContext).toBeDefined()
  })

  it('Given CustomHeader When passing child renderer Then headerContext should be passed with intervals and unit', () => {
    const renderer = jest.fn(() => {
      return <div>header</div>
    })
    render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <CustomHeader>{renderer}</CustomHeader>
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )
    const headerContext = renderer.mock.calls[0][0].headerContext
    const intervals = headerContext.intervals
    const unit = headerContext.unit
    expect(intervals).toBeDefined()
    expect(intervals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          startTime: expect.any(moment),
          endTime: expect.any(moment),
          labelWidth: expect.any(Number),
          left: expect.any(Number)
        })
      ])
    )
    expect(unit).toEqual(expect.any(String))
  })

  it('Given CustomHeader When passing child renderer Then timelineContext should be passed', () => {
    const renderer = jest.fn(() => {
      return <div>header</div>
    })
    render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <CustomHeader>{renderer}</CustomHeader>
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )
    const timelineContext = renderer.mock.calls[0][0].timelineContext
    expect(timelineContext).toBeDefined()
    expect(timelineContext).toMatchObject({
      timelineWidth: expect.any(Number),
      visibleTimeStart: expect.any(Number),
      visibleTimeEnd: expect.any(Number),
      canvasTimeStart: expect.any(Number),
      canvasTimeEnd: expect.any(Number)
    })
  })

  describe('CustomHeader Intervals', () => {
    it('Given intervals Then they should have the same width', () => {
      const renderer = jest.fn(() => {
        return <div>header</div>
      })
      render(
        <RenderHeadersWrapper timelineState={{ timelineUnit: 'hour' }}>
          <TimelineHeaders>
            <CustomHeader>{renderer}</CustomHeader>
          </TimelineHeaders>
        </RenderHeadersWrapper>
      )

      const headerContext = renderer.mock.calls[0][0].headerContext
      const intervals = headerContext.intervals
      const widths = intervals.map(interval => interval.labelWidth)
      for (let index = 0; index < widths.length - 1; index++) {
        const a = widths[index]
        const b = widths[index + 1]

        expect(Math.abs(b - a)).toBeLessThan(0.1)
      }
    })

    it('Given intervals Then left property should be different', () => {
      const renderer = jest.fn(() => {
        return <div>header</div>
      })
      render(
        <RenderHeadersWrapper>
          <TimelineHeaders>
            <CustomHeader>{renderer}</CustomHeader>
          </TimelineHeaders>
        </RenderHeadersWrapper>
      )
      const headerContext = renderer.mock.calls[0][0].headerContext
      const intervals = headerContext.intervals
      const lefts = intervals.map(interval => interval.left)
      for (let index = 0; index < lefts.length - 1; index++) {
        const a = lefts[index]
        const b = lefts[index + 1]
        expect(a).toBeLessThan(b)
      }
    })
  })

  it('Given CustomHeader When passing extra props Then it will be passed to the renderProp', () => {
    const renderer = jest.fn(() => {
      return <div>header</div>
    })
    const props = {
      data: 'some'
    }
    render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <CustomHeader headerData={props}>{renderer}</CustomHeader>
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )
    expect(renderer.mock.calls[0][0].data).toBe(props)
  })
  // Render The Example In The Docs
  it('Given CustomHeader When render Then it should render Correctly in the timeline', () => {
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
          <CustomHeader unit="year">
            {({
              headerContext: { intervals },
              getRootProps,
              getIntervalProps,
              showPeriod
            }) => {
              return (
                <div
                  data-testid="customHeader"
                  {...getRootProps({ style: { height: 30 } })}
                >
                  {intervals.map(interval => {
                    const intervalStyle = {
                      // height: 30,
                      lineHeight: '30px',
                      textAlign: 'center',
                      borderLeft: '1px solid black',
                      cursor: 'pointer',
                      backgroundColor: 'Turquoise',
                      color: 'white'
                    }
                    return (
                      <div
                        onClick={() => {
                          showPeriod(interval.startTime, interval.endTime)
                        }}
                        {...getIntervalProps({
                          interval,
                          style: intervalStyle
                        })}
                      >
                        <div className="sticky">
                          {interval.startTime.format('YYYY')}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            }}
          </CustomHeader>
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )

    expect(getByTestId('customHeader')).toBeInTheDocument()
  })
  it('Given Custom Header When passing react stateless component to render prop Then it should render', () => {
    const Renderer = props => {
      return <div>header</div>
    }

    const { getByText } = render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <CustomHeader>{Renderer}</CustomHeader>
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )
    expect(getByText('header')).toBeInTheDocument()
  })

  it('Given Custom Header When passing react component to render prop Then it should render', () => {
    class Renderer extends React.Component {
      render() {
        return <div>header</div>
      }
    }

    const { getByText } = render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <CustomHeader>{Renderer}</CustomHeader>
        </TimelineHeaders>
      </RenderHeadersWrapper>
    )
    expect(getByText('header')).toBeInTheDocument()
  })
})
