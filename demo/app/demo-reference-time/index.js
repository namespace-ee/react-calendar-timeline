import React, { Component } from 'react'

import Timeline from 'react-calendar-timeline'
// import containerResizeDetector from 'react-calendar-timeline/lib/resize-detector/container'

import faker from './ref-time-faker'

const JUDGMENT_DAY = 872817240000 // 02:14, 29 August 1997
const TWENTY_FOUR_LITTLE_HOURS = 86400000

var minTime = JUDGMENT_DAY - (6 * TWENTY_FOUR_LITTLE_HOURS)
var maxTime = JUDGMENT_DAY + (6 * TWENTY_FOUR_LITTLE_HOURS)

const referenceTime = JUDGMENT_DAY
const {groups, items} = faker(referenceTime)

var keys = {
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
  constructor (props) {
    super(props)

    const defaultTimeStart = new Date(referenceTime - TWENTY_FOUR_LITTLE_HOURS)
    const defaultTimeEnd = new Date(referenceTime + TWENTY_FOUR_LITTLE_HOURS)

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
      referenceTime
    }
  }

  handleCanvasClick = (groupId, time, event) => {
    console.log('Canvas clicked', groupId, time)
  }

  handleCanvasContextMenu = (group, time, e) => {
    console.log('Canvas context menu', group, time)
  }

  handleItemClick = (itemId) => {
    console.log('Clicked: ' + itemId)
  }

  handleItemSelect = (itemId) => {
    console.log('Selected: ' + itemId)
  }

  handleItemContextMenu = (itemId) => {
    console.log('Context Menu: ' + itemId)
  }

  // this limits the timeline to -6 months ... +6 months
  handleTimeChange = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
    if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
      updateScrollCanvas(minTime, maxTime)
    } else if (visibleTimeStart < minTime) {
      updateScrollCanvas(minTime, minTime + (visibleTimeEnd - visibleTimeStart))
    } else if (visibleTimeEnd > maxTime) {
      updateScrollCanvas(maxTime - (visibleTimeEnd - visibleTimeStart), maxTime)
    } else {
      updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
    }
  }

  render () {
    const { groups, items, defaultTimeStart, defaultTimeEnd, referenceTime } = this.state

    return (
      <div>
        <div>Reference Time is set to 2:14am on 29 August 1997, and random tasks are generated around it.</div>
        <div>
          <Timeline groups={groups}
                    items={items}
                    keys={keys}
                    fixedHeader='fixed'
                    fullUpdate

                    sidebarWidth={150}
                    sidebarContent={<div>Above The Left</div>}
                    rightSidebarWidth={150}
                    rightSidebarContent={<div>Above The Right</div>}

                    canMove={false}
                    canResize={false}
                    canChangeGroup={false}
                    canSelect

                    itemsSorted
                    itemTouchSendsClick={false}
                    stackItems
                    itemHeightRatio={0.75}

                    showCursorLine

                    // resizeDetector={containerResizeDetector}

                    referenceTime={referenceTime}
                    defaultTimeStart={defaultTimeStart}
                    defaultTimeEnd={defaultTimeEnd}

                    // itemRenderer={this.itemRenderer}
                    // groupRenderer={this.groupRenderer}

                    onCanvasClick={this.handleCanvasClick}
                    onCanvasContextMenu={this.handleCanvasContextMenu}

                    onItemClick={this.handleItemClick}
                    onItemSelect={this.handleItemSelect}
                    onItemContextMenu={this.handleItemContextMenu}

                    onTimeChange={this.handleTimeChange}/>
            </div>
      </div>
    )
  }
}
