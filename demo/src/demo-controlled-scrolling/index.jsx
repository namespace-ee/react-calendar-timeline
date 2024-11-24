/* eslint-disable no-console */
import React, { Component } from 'react'
import dayjs from 'dayjs'

import Timeline, {
  TimelineMarkers,
  TimelineHeaders,
  TodayMarker,
  CustomMarker,
  CursorMarker,
  CustomHeader,
  SidebarHeader,
  DateHeader,
} from 'react-calendar-timeline'

import generateFakeData from '../generate-fake-data'

var minTime = dayjs().add(-6, 'months').valueOf()
var maxTime = dayjs().add(6, 'months').valueOf()

var keys = {
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
    const visibleTimeStart = dayjs().startOf('day').valueOf()
    const visibleTimeEnd = dayjs().startOf('day').add(1, 'day').valueOf()

    this.state = {
      groups,
      items,
      visibleTimeStart,
      visibleTimeEnd,
    }
  }

  handleCanvasClick = (groupId, time) => {
    console.log('Canvas clicked', groupId, dayjs(time).format())
  }

  handleCanvasDoubleClick = (groupId, time) => {
    console.log('Canvas double clicked', groupId, dayjs(time).format())
  }

  handleCanvasContextMenu = (group, time) => {
    console.log('Canvas context menu', group, dayjs(time).format())
  }

  handleItemClick = (itemId, _, time) => {
    console.log('Clicked: ' + itemId, dayjs(time).format())
  }

  handleItemSelect = (itemId, _, time) => {
    console.log('Selected: ' + itemId, dayjs(time).format())
  }

  handleItemDoubleClick = (itemId, _, time) => {
    console.log('Double Click: ' + itemId, dayjs(time).format())
  }

  handleItemContextMenu = (itemId, _, time) => {
    console.log('Context Menu: ' + itemId, dayjs(time).format())
  }

  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state

    const group = groups[newGroupOrder]

    this.setState({
      items: items.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: dragTime,
              end: dragTime + (item.end - item.start),
              group: group.id,
            })
          : item,
      ),
    })

    console.log('Moved', itemId, dragTime, newGroupOrder)
  }

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state

    this.setState({
      items: items.map((item) =>
        item.id === itemId
          ? Object.assign({}, item, {
              start: edge === 'left' ? time : item.start,
              end: edge === 'left' ? item.end : time,
            })
          : item,
      ),
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

  moveResizeValidator = (action, item, time) => {
    if (time < new Date().getTime()) {
      var newTime =
        Math.ceil(new Date().getTime() / (15 * 60 * 1000)) * (15 * 60 * 1000)
      return newTime
    }

    return time
  }

  onPrevClick = () => {
    this.setState((state) => {
      const zoom = state.visibleTimeEnd - state.visibleTimeStart
      return {
        visibleTimeStart: state.visibleTimeStart - zoom,
        visibleTimeEnd: state.visibleTimeEnd - zoom,
      }
    })
  }

  onNextClick = () => {
    this.setState((state) => {
      const zoom = state.visibleTimeEnd - state.visibleTimeStart
      console.log({
        visibleTimeStart: state.visibleTimeStart + zoom,
        visibleTimeEnd: state.visibleTimeEnd + zoom,
      })
      return {
        visibleTimeStart: state.visibleTimeStart + zoom,
        visibleTimeEnd: state.visibleTimeEnd + zoom,
      }
    })
  }

  render() {
    const { groups, items, visibleTimeStart, visibleTimeEnd } = this.state

    return (
      <div>
        <button onClick={this.onPrevClick}>{'< Prev'}</button>
        <button onClick={this.onNextClick}>{'Next >'}</button>
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
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          onCanvasClick={this.handleCanvasClick}
          onCanvasDoubleClick={this.handleCanvasDoubleClick}
          onCanvasContextMenu={this.handleCanvasContextMenu}
          onItemClick={this.handleItemClick}
          onItemSelect={this.handleItemSelect}
          onItemContextMenu={this.handleItemContextMenu}
          onItemMove={this.handleItemMove}
          onItemResize={this.handleItemResize}
          onItemDoubleClick={this.handleItemDoubleClick}
          buffer={1}
          onTimeChange={this.handleTimeChange}
          // moveResizeValidator={this.moveResizeValidator}
        >
          <TimelineMarkers>
            <TodayMarker />
            <CustomMarker
              date={dayjs().startOf('day').valueOf() + 1000 * 60 * 60 * 2}
            />
            <CustomMarker date={dayjs().add(3, 'day').valueOf()}>
              {({ styles }) => {
                const newStyles = { ...styles, backgroundColor: 'blue' }
                return <div style={newStyles} />
              }}
            </CustomMarker>
            <CursorMarker />
          </TimelineMarkers>
        </Timeline>
      </div>
    )
  }
}
