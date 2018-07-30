import moment from "moment";
import React, {Component} from "react";

import generateFakeData from '../generate-fake-data'
import Timeline from "react-calendar-timeline";

const format = "DD.MM.YYYY"
const holidays = [moment("01.01.2018", format), moment("06.01.2018", format), moment("30.03.2018", format),
  moment("01.04.2018", format), moment("02.04.2018", format), moment("01.05.2018", format),
  moment("10.05.2018", format), moment("20.05.2018", format), moment("21.05.2018", format),
  moment("31.05.2018", format), moment("15.08.2018", format), moment("26.10.2018", format),
  moment("01.11.2018", format), moment("08.12.2018", format), moment("24.12.2018", format),
  moment("25.12.2018", format), moment("26.12.2018", format), moment("31.12.2018", format)]

const keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end'
}

export default class App extends Component {

  constructor(props) {
    super(props)

    const {groups, items} = generateFakeData()
    const defaultTimeStart = moment()
      .startOf('day')
      .toDate()
    const defaultTimeEnd = moment()
      .startOf('day')
      .add(1, 'day')
      .toDate()

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd
    }
  }

  verticalLineClassNamesForTime = (timeStart, timeEnd) => {
    const currentTimeStart = moment(timeStart)
    const currentTimeEnd = moment(timeEnd)

    for (let holiday of holidays) {
      if (holiday.isSame(currentTimeStart, "day") && holiday.isSame(currentTimeEnd, "day")) {
        return ["holiday"]
      }
    }
  }

  render() {
    const {groups, items, defaultTimeStart, defaultTimeEnd} = this.state

    return (
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
        showCursorLine
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        verticalLineClassNamesForTime={this.verticalLineClassNamesForTime}
      />
    )
  }

}
