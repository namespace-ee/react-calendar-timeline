"use client"

import { Timeline, TimelineMarkers, TodayMarker } from 'react-calendar-timeline-4ef'
import dayjs from 'dayjs'


const MyTimeline = () => {
  var minTime = dayjs().add(-6, 'months').hour(0).minute(0).second(0).millisecond(0).valueOf()
  var maxTime = dayjs().add(6, 'months').hour(0).minute(0).second(0).millisecond(0).valueOf()

  return    <Timeline groups={[{id:1, title: 'Group 1'}]} items={[{id: 1, title: 'Item 1', start_time: minTime, end_time:
    dayjs(minTime).add(1, 'hour').valueOf(), group:1}]} visibleTimeStart={minTime} visibleTimeEnd={maxTime} >
    <TimelineMarkers>
      <TodayMarker /></TimelineMarkers></Timeline>
};

export default MyTimeline
