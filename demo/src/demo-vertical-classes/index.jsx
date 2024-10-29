import dayjs from 'dayjs'
import React, { Component } from 'react'

import generateFakeData from '../generate-fake-data'
import Timeline from 'react-calendar-timeline'

const format = 'DD.MM.YYYY'
const year = dayjs().year()
const holidays = [
  dayjs(`01.01.${year}`, format),
  dayjs(`06.01.${year}`, format),
  dayjs(`30.03.${year}`, format),
  dayjs(`01.04.${year}`, format),
  dayjs(`02.04.${year}`, format),
  dayjs(`01.05.${year}`, format),
  dayjs(`10.05.${year}`, format),
  dayjs(`20.05.${year}`, format),
  dayjs(`21.05.${year}`, format),
  dayjs(`31.05.${year}`, format),
  dayjs(`15.08.${year}`, format),
  dayjs(`26.10.${year}`, format),
  dayjs(`01.11.${year}`, format),
  dayjs(`08.12.${year}`, format),
  dayjs(`24.12.${year}`, format),
  dayjs(`25.12.${year}`, format),
  dayjs(`26.12.${year}`, format),
  dayjs(`31.12.${year}`, format),
]

const keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start_time',
  itemTimeEndKey: 'end_time',
}

export default class App extends Component {
  constructor(props) {
    super(props)

    const { groups, items } = generateFakeData()
    const defaultTimeStart = dayjs().startOf('day').toDate()
    const defaultTimeEnd = dayjs().startOf('day').add(1, 'day').toDate()

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
    }
  }

  getMinutesOfDay = (date) => {
    return date.hour() * 60 + date.minute()
  }

  verticalLineClassNamesForTime = (timeStart, timeEnd) => {
    const currentTimeStart = dayjs(timeStart)
    const currentTimeEnd = dayjs(timeEnd)

    let classes = []

    // check for public holidays
    for (let holiday of holidays) {
      if (
        holiday.isSame(currentTimeStart, 'day') &&
        holiday.isSame(currentTimeEnd, 'day')
      ) {
        classes.push('holiday')
      }
    }

    // highlight lunch break (12:00-13:00)
    const lunchStart = dayjs().hour(12).minute(0).second(0)
    const lunchEnd = dayjs().hour(13).minute(0).second(0)
    if (
      this.getMinutesOfDay(currentTimeStart) >=
        this.getMinutesOfDay(lunchStart) &&
      this.getMinutesOfDay(currentTimeEnd) <= this.getMinutesOfDay(lunchEnd)
    ) {
      classes.push('lunch')
    }

    return classes
  }

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state

    return (
      <div style={{ padding: 20, paddingTop: 0 }}>
        In this example we have public holidays we want to highlight.
        <br />
        Also we want to visually highlight a blocking range (e.g. lunch break).
        <br />
        <br />
        <Timeline
          groups={groups}
          items={items}
          keys={keys}
          sidebarWidth={150}
          sidebarContent={<div>Above The Left</div>}
          canMove
          canResize="right"
          canSelect
          itemsSorted
          itemTouchSendsClick={false}
          stackItems
          itemHeightRatio={0.75}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
          verticalLineClassNamesForTime={this.verticalLineClassNamesForTime}
        />
      </div>
    )
  }
}
