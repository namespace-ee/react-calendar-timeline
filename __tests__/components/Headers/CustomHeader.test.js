import React from 'react'
import { render, cleanup } from 'react-testing-library'
import Timeline from 'lib/Timeline'
import DateHeader from 'lib/headers/DateHeader'
import SidebarHeader from 'lib/headers/SidebarHeader'
import TimelineHeaders from 'lib/headers/TimelineHeaders'
import CustomHeader from 'lib/headers/CustomHeader'
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

describe('CustomHeader Component Test', () => {
    afterEach(cleanup)
    // Render The Example In The Docs
    it('Given CustomHeader When render Then it should renderd Correctly in the timeline', () => {
        const { getByTestId } = render(
            <Timeline {...defaultProps}>
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
                                <div data-testid="customHeader" {...getRootProps({ style: { height: 30 } })}>
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
            </Timeline>
        )

        expect(getByTestId('customHeader')).toBeInTheDocument()
    })
    it('Given CustomHeader When pass a unit to it Then it should take it', () => {
        const { getByTestId, rerender } = render(getCustomHeadersInTimeline({ unit: "year" }));
        expect(getByTestId('customHeader')).toHaveTextContent('01/01/2018')

        rerender(getCustomHeadersInTimeline({ unit: "month" }));
        expect(getByTestId('customHeader')).toHaveTextContent('10/01/2018')

        rerender(getCustomHeadersInTimeline({ unit: "day" }));
        expect(getByTestId('customHeader')).toHaveTextContent('10/25/2018')
        expect(getByTestId('customHeader')).toHaveTextContent('10/26/2018')
        expect(getByTestId('customHeader')).toHaveTextContent('10/27/2018')
    })
    it('Given CustomHeader When pass a style props with (width, position) Then it should not ovverride the default values', () => {
        const { getByTestId } = render(getCustomHeadersInTimeline({ props: { style: { width: 0, position: 'fixed' } } }));
        const { width, position } = getComputedStyle(getByTestId('customHeader'))
        expect(width).not.toBe('0px')
        expect(position).not.toBe('fixed')
    })

    it('Given CustomHeader When pass a style props other than (width, position) Then it should renderd Correctly', () => {
        const { getByTestId } = render(getCustomHeadersInTimeline({ props: { style: { height: 150 } } }));
        const { height } = getComputedStyle(getByTestId('customHeader'))
        expect(height).toBe("150px")
    })

    it('Given CustomHeader When pass an interval style with (width, position, left) Then it should not ovverride the default values', () => {
        const { getByTestId } = render(getCustomHeadersInTimeline({
            intervalStyle: {
                width: 0,
                position: 'fixed',
                left: 0

            }
        }));
        const { width, position, left } = getComputedStyle(getByTestId('customHeaderInterval'))
        expect(width).not.toBe('0px')
        expect(position).not.toBe('fixed')
        expect(left).not.toBe('0px')
    })
    it('Given CustomHeader When pass an interval style other than (width, position) Then it should rendered correctly', () => {
        const { getByTestId } = render(getCustomHeadersInTimeline({
            intervalStyle: {
                lineHeight: '30px',
                textAlign: 'center',
                borderLeft: '1px solid black',
                cursor: 'pointer',
                color: 'white'
            }
        }));
        const { lineHeight, textAlign, borderLeft, cursor, color } = getComputedStyle(getByTestId('customHeaderInterval'))
        expect(lineHeight).toBe('30px')
        expect(textAlign).toBe('center')
        expect(borderLeft).toBe('1px solid black')
        expect(cursor).toBe('pointer')
        expect(color).toBe('white')
    })
    it('Given a DateHeader When pass a jsx as a children Then it Should be rendered Correctly', () => {
        const {getByText} = render(getCustomHeadersInTimeline())
        expect(getByText('Should Be Rendered')).toBeInTheDocument()
    })
    it('Given a DateHeader When not pass any unit prop Then it Should take the default timeline unit (year)', () => {
        const {getByTestId} = render(getCustomHeadersInTimeline())
        expect(getByTestId('customHeader')).toHaveTextContent('01/01/2018')
    })
})

function getCustomHeadersInTimeline({ unit = "year", props, intervalStyle } = {}) {

    return (
        <Timeline {...defaultProps}>
            <TimelineHeaders>
                <SidebarHeader>
                    {({ getRootProps }) => {
                        return <div {...getRootProps()}>Left</div>
                    }}
                </SidebarHeader>
                <DateHeader primaryHeader />
                <DateHeader />
                <CustomHeader unit={unit} props={props}>
                    {({
                        headerContext: { intervals },
                        getRootProps,
                        getIntervalProps,
                        showPeriod
                    }) => {
                        return (
                            <div data-testid="customHeader" {...getRootProps(props)}>
                                {intervals.map(interval => {
                                    return (
                                        <div data-testid="customHeaderInterval"
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
                                <div>
                                    Should Be Rendered
                                </div>
                            </div>

                        )
                    }}
                </CustomHeader>
            </TimelineHeaders>
        </Timeline>
    )
}