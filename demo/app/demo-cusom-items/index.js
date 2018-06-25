import React, { Component } from 'react'
import moment from 'moment'

import Timeline from 'react-calendar-timeline'
// import containerResizeDetector from 'react-calendar-timeline/lib/resize-detector/container'

import generateFakeData from '../generate-fake-data'

var minTime = moment()
  .add(-6, 'months')
  .valueOf()
var maxTime = moment()
  .add(6, 'months')
  .valueOf()

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
  constructor(props) {
    super(props)

    const { groups, items } = generateFakeData()
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

  handleCanvasClick = (groupId, time, event) => {
    console.log('Canvas clicked', groupId, moment(time).format())
  }

  handleCanvasContextMenu = (group, time, e) => {
    console.log('Canvas context menu', group, moment(time).format())
  }

  handleItemClick = (itemId, _, time) => {
    console.log('Clicked: ' + itemId, moment(time).format())
  }

  handleItemSelect = (itemId, _, time) => {
    console.log('Selected: ' + itemId, moment(time).format())
  }

  handleItemDoubleClick = (itemId, _, time) => {
    console.log('Double Click: ' + itemId, moment(time).format())
  }

  handleItemContextMenu = (itemId, _, time) => {
    console.log('Context Menu: ' + itemId, moment(time).format())
  }

  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state

    const group = groups[newGroupOrder]

    this.setState({
      items: items.map(
        item =>
          item.id === itemId
            ? Object.assign({}, item, {
              start: dragTime,
              end: dragTime + (item.end - item.start),
              group: group.id
            })
            : item
      )
    })

    console.log('Moved', itemId, dragTime, newGroupOrder)
  }

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state

    this.setState({
      items: items.map(
        item =>
          item.id === itemId
            ? Object.assign({}, item, {
              start: edge === 'left' ? time : item.start,
              end: edge === 'left' ? item.end : time
            })
            : item
      )
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
      var newTime =
        Math.ceil(new Date().getTime() / (15 * 60 * 1000)) * (15 * 60 * 1000)
      return newTime
    }

    return time
  }

  itemRenderer = ({
    item,
    timelineContext,
    itemContext,
    getItemProps,
    getResizeProps,
  }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps()
    const backgroundColor = itemContext.selected ? itemContext.dragging ? 'red' : item.selectedBgColor : item.bgColor;
    const borderColor = itemContext.resizing ? 'red' : item.color;
    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor,
            color: item.color,
            borderColor,
            borderStyle: 'solid',
            borderWidth: 1,
            borderRadius: 4,
            borderLeftWidth: itemContext.selected ? 3 : 1,
            borderRightWidth: itemContext.selected ? 3 : 1,
          }
        }) }
      >
        {itemContext.useResizeHandle ? (
          <div {...leftResizeProps} />
        ) : null}

        <div
          style={{
            height: itemContext.dimensions.height,
            overflow: 'hidden',
            paddingLeft:3,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {itemContext.title}
        </div>


        {itemContext.useResizeHandle ? (
          <div {...rightResizeProps} />
        ) : null}
      </div>
    )
  }

  // groupRenderer = ({ group }) => {
  //   return (
  //     <div className='custom-group'>
  //       {group.title}
  //     </div>
  //   )
  // }

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state
    console.log("render")
    return (
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        sidebarWidth={150}
        sidebarContent={<div>Above The Left</div>}
        // rightSidebarWidth={150}
        // rightSidebarContent={<div>Above The Right</div>}

        canMove
        canResize="right"
        canSelect
        itemsSorted
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        lineHeight={40}
        showCursorLine
        // resizeDetector={containerResizeDetector}

        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        itemRenderer={this.itemRenderer}
        // groupRenderer={this.groupRenderer}

        onCanvasClick={this.handleCanvasClick}
        onCanvasContextMenu={this.handleCanvasContextMenu}
        onItemClick={this.handleItemClick}
        onItemSelect={this.handleItemSelect}
        onItemContextMenu={this.handleItemContextMenu}
        onItemMove={this.handleItemMove}
        onItemResize={this.handleItemResize}
        onItemDoubleClick={this.handleItemDoubleClick}
        onTimeChange={this.handleTimeChange}
        moveResizeValidator={this.moveResizeValidator}
      />
    )
  }
}
