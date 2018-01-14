import React, { Component } from 'react'

import Timeline from 'react-calendar-timeline'

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

    const refTime = referenceTime
    const refLabel = 'Example Ref Time'

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
      refTime,
      refLabel
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

  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state

    const group = groups[newGroupOrder]

    this.setState({
      items: items.map(item => item.id === itemId ? Object.assign({}, item, {
        start: dragTime,
        end: dragTime + (item.end - item.start),
        group: group.id
      }) : item)
    })

    console.log('Moved', itemId, dragTime, newGroupOrder)
  }

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state

    this.setState({
      items: items.map(item => item.id === itemId ? Object.assign({}, item, {
        start: edge === 'left' ? time : item.start,
        end: edge === 'left' ? item.end : time
      }) : item)
    })

    console.log('Resized', itemId, time, edge)
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

  moveResizeValidator = (action, item, time, resizeEdge) => {
    if (time < new Date().getTime()) {
      var newTime = Math.ceil(new Date().getTime() / (15 * 60 * 1000)) * (15 * 60 * 1000)
      return newTime
    }

    return time
  }

  // itemRenderer = ({ item }) => {
  //   return (
  //     <div className='custom-item'>
  //       <span className='title'>{item.title}</span>
  //       <p className='tip'>{item.itemProps['data-tip']}</p>
  //     </div>
  //   )
  // }

  // groupRenderer = ({ group }) => {
  //   return (
  //     <div className='custom-group'>
  //       {group.title}
  //     </div>
  //   )
  // }

  render () {
    const { groups, items, defaultTimeStart, defaultTimeEnd, refTime, refLabel } = this.state

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

                    referenceTime={refTime}
                    referenceTimeLabel={refLabel}
                    defaultTimeStart={defaultTimeStart}
                    defaultTimeEnd={defaultTimeEnd}

                    // itemRenderer={this.itemRenderer}
                    // groupRenderer={this.groupRenderer}

                    onCanvasClick={this.handleCanvasClick}
                    onCanvasContextMenu={this.handleCanvasContextMenu}

                    onItemClick={this.handleItemClick}
                    onItemSelect={this.handleItemSelect}
                    onItemContextMenu={this.handleItemContextMenu}
                    onItemMove={this.handleItemMove}
                    onItemResize={this.handleItemResize}

                    onTimeChange={this.handleTimeChange}

                    moveResizeValidator={this.moveResizeValidator} />
            </div>
      </div>
    )
  }
}
