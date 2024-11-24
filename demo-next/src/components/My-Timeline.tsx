'use client'

import { CursorMarker, Timeline, TimelineMarkers, TodayMarker } from 'react-calendar-timeline'
import dayjs from 'dayjs'
import generateFakeData, { FakeDataItem, FakeGroup } from '@/components/generate-fake-data'
import { useEffect, useState } from 'react'


const MyTimeline = () => {
  var minTime = dayjs().add(-6, 'months').hour(0).minute(0).second(0).millisecond(0).valueOf()
  var maxTime = dayjs().add(6, 'months').hour(0).minute(0).second(0).millisecond(0).valueOf()
  const [init, setInit] = useState<boolean>(false)
  const [groups, setGroups] = useState<FakeGroup[]>([])
  const [items, setItems] = useState<FakeDataItem[]>([])
  useEffect(() => {
    const { groups: gr, items: fakeItems } = generateFakeData(15, 100)
    setItems(fakeItems.splice(0, Math.floor(fakeItems.length / 2)))

    setGroups(gr)
    setInit(true)
  }, [])

  return (init ?
      <>
        <Timeline groups={groups} items={items} visibleTimeStart={minTime} visibleTimeEnd={maxTime}>
            <TimelineMarkers>
              <TodayMarker />
              <CursorMarker/>
            </TimelineMarkers>
        </Timeline>
      </> : 'please wait...'
  )
}


export default MyTimeline
