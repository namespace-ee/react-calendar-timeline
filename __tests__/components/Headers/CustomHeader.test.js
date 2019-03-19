import React from 'react'
import { render, cleanup, prettyDOM } from 'react-testing-library'
import Timeline from 'lib/Timeline'
import DateHeader from 'lib/headers/DateHeader'
import SidebarHeader from 'lib/headers/SidebarHeader'
import TimelineHeaders from 'lib/headers/TimelineHeaders'
import CustomHeader from 'lib/headers/CustomHeader'
import { RenderHeadersWrapper } from '../../test-utility/header-renderer'

import 'jest-dom/extend-expect'

describe('CustomHeader Component Test', () => {
  afterEach(cleanup)
  // Render The Example In The Docs
  it('Given CustomHeader When render Then it should renderd Correctly in the timeline', () => {
    const { getByTestId } = render(
      <RenderHeadersWrapper>
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}>Left</div>
            }}
          </SidebarHeader>
          <DateHeader primaryHeader />
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
  it('Given CustomHeader When pass a unit to it Then it should take it', () => {
    const { getByTestId, rerender } = render(
      getCustomHeadersInTimeline({ unit: 'year' })
    )
    expect(getByTestId('customHeader')).toHaveTextContent('01/01/2018')

    rerender(getCustomHeadersInTimeline({ unit: 'month' }))
    expect(getByTestId('customHeader')).toHaveTextContent('10/01/2018')

    rerender(getCustomHeadersInTimeline({ unit: 'day' }))
    expect(getByTestId('customHeader')).toHaveTextContent('10/25/2018')
    expect(getByTestId('customHeader')).toHaveTextContent('10/26/2018')
    expect(getByTestId('customHeader')).toHaveTextContent('10/27/2018')
  })
  it('Given CustomHeader When pass a style props with (width, position) Then it should not ovverride the default values', () => {
    const { getByTestId } = render(
      getCustomHeadersInTimeline({
        props: { style: { width: 0, position: 'fixed' } }
      })
    )
    const { width, position } = getComputedStyle(getByTestId('customHeader'))
    expect(width).not.toBe('0px')
    expect(position).not.toBe('fixed')
  })

  it('Given CustomHeader When pass a style props other than (width, position) Then it should renderd Correctly', () => {
    const { getByTestId } = render(
      getCustomHeadersInTimeline({ props: { style: { height: 150 } } })
    )
    const { height } = getComputedStyle(getByTestId('customHeader'))
    expect(height).toBe('150px')
  })

  it('Given CustomHeader When pass an interval style with (width, position, left) Then it should not ovverride the default values', () => {
    const { getByTestId } = render(
      getCustomHeadersInTimeline({
        intervalStyle: {
          width: 0,
          position: 'fixed',
          left: 0
        }
      })
    )
    const { width, position, left } = getComputedStyle(
      getByTestId('customHeaderInterval')
    )
    expect(width).not.toBe('0px')
    expect(position).not.toBe('fixed')
    expect(left).not.toBe('0px')
  })
  it('Given CustomHeader When pass an interval style other than (width, position) Then it should rendered correctly', () => {
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
  it('Given a CustomHeader When pass a jsx as a children Then it Should be rendered Correctly', () => {
    const { getByText } = render(getCustomHeadersInTimeline())
    expect(getByText('Should Be Rendered')).toBeInTheDocument()
  })
  it('Given a CustomHeader When not pass any unit prop Then it Should take the default timeline unit (year)', () => {
    const { getByTestId } = render(getCustomHeadersInTimeline())
    expect(getByTestId('customHeader')).toHaveTextContent('01/01/2018')
  })
  //TODO: need a way to test this
  it('Given DateHeader When Rendered with day unit Then getIntervalStyle function shuold be act correctly', () => {
    // const props = getIntervalStyle({ startTime: moment("2018-10-27T21:00:00.000"), canvasTimeStart: 1540414800000, ratio: 0.5, unit: 'month', labelWidth: 150 })
    // expect(props).toEqual({
    //     left: 124200000,
    //     width: 150,
    //     position: 'absolute'
    // })
  })
  //TODO: rewrite to check if render function gets the props same as they are passed
  it('Given CustomHeader When pass a style in props obj to props renderer Then it should not override correctly render it', () => {
    // const { getByTestId } = render(getCustomHeadersInTimeline({props: {'aria-hidden': false}}))
    // expect(getByTestId('customHeader')).toHaveAttribute('aria-hidden')
  })
  describe('Testing Diffrent Unit Values', () => {
    it('Given CustomHeader When pass a year unit then it should render it correctly', () => {
      const { getByTestId } = render(
        getCustomHeadersInTimeline({ unit: 'year' })
      )
      expect(getByTestId('customHeader')).toHaveTextContent('01/01/2018')
    })
    it('Given CustomHeader When pass a month unit then it should render it correctly', () => {
      const { getByTestId } = render(
        getCustomHeadersInTimeline({ unit: 'month' })
      )
      expect(getByTestId('customHeader')).toHaveTextContent('10/01/2018')
    })
    it('Given CustomHeader When pass a day unit then it should render it correctly', () => {
      const { getByTestId } = render(
        getCustomHeadersInTimeline({ unit: 'day' })
      )
      expect(getByTestId('customHeader')).toHaveTextContent('10/25/2018')
    })
    it('Given CustomHeader When pass a hour unit then it should render it correctly', () => {
      const { getByTestId } = render(
        getCustomHeadersInTimeline({ unit: 'hour' })
      )
      expect(getByTestId('customHeader')).toHaveTextContent('10/25/2018')
    })
  })
})

function getCustomHeadersInTimeline({
  unit = 'year',
  props,
  intervalStyle
} = {}) {
  return (
    <RenderHeadersWrapper>
      <TimelineHeaders>
        <SidebarHeader>
          {({ getRootProps }) => {
            return <div {...getRootProps()}>Left</div>
          }}
        </SidebarHeader>
        <DateHeader primaryHeader />
        <DateHeader />
        <CustomHeader unit={unit} props={props}>
          {(
            {
              headerContext: { intervals },
              getRootProps,
              getIntervalProps,
              showPeriod
            },
            extraProps
          ) => {
            return (
              <div data-testid="customHeader" {...getRootProps(extraProps)}>
                {intervals.map(interval => {
                  return (
                    <div
                      data-testid="customHeaderInterval"
                      onClick={() => {
                        showPeriod(interval.startTime, interval.endTime)
                      }}
                      {...getIntervalProps({
                        interval,
                        style: intervalStyle
                      })}
                    >
                      <div className="sticky">
                        {interval.startTime.format('MM/DD/YYYY')}
                      </div>
                    </div>
                  )
                })}
                <div>Should Be Rendered</div>
              </div>
            )
          }}
        </CustomHeader>
      </TimelineHeaders>
    </RenderHeadersWrapper>
  )
}
