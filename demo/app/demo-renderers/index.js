/* eslint-disable no-console */
import React, { Component } from 'react'
import moment from 'moment'

import Timeline from 'react-calendar-timeline'

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

class GroupRenderer extends Component {
  render() {
    // console.log("heading rendering");
    return <table><thead><tr><td>Name</td><td>Metadata</td></tr></thead></table>;
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)

    const { groups, items } = generateFakeData(100, 5000)
    const visibleTimeStart = moment()
      .startOf('month')
      .toDate().valueOf()
    const visibleTimeEnd = moment()
      .endOf('month')
      .toDate().valueOf()

    this.state = {
      groups,
      items,
      visibleTimeStart,
      visibleTimeEnd
    }
  }

  handleCanvasClick = (groupId, time) => {
    console.log('Canvas clicked', groupId, moment(time).format())
  }

  handleCanvasContextMenu = (group, time) => {
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
      this.setState({
        visibleTimeStart: minTime,
        visibleTimeEnd: maxTime
      })
      //updateScrollCanvas(minTime, maxTime)
    } else if (visibleTimeStart < minTime) {
      //updateScrollCanvas(minTime, minTime + (visibleTimeEnd - visibleTimeStart))
    } else if (visibleTimeEnd > maxTime) {
      //updateScrollCanvas(maxTime - (visibleTimeEnd - visibleTimeStart), maxTime)
    } else {
      this.setState({
        visibleTimeStart,
        visibleTimeEnd
      });
      //updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
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

  // itemRenderer = ({ item }) => {
  //   return (
  //     <div className='custom-item'>
  //       <span className='title'>{item.title}</span>
  //       <p className='tip'>{item.itemProps['data-tip']}</p>
  //     </div>
  //   )
  // }

  groupRenderer = ({ group }) => {
    return (
      <table>
        <tbody>
          <tr>
            <td>{group.title}</td>
            <td>Another Cell</td>
          </tr>
        </tbody>
      </table>
    )
  }

  render() {
    const { groups, items, visibleTimeStart, visibleTimeEnd } = this.state

    return (
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        sidebarWidth={150}
        sidebarContent={<GroupRenderer />}
        // rightSidebarWidth={150}
        // rightSidebarContent={<div>Above The Right</div>}

        canMove
        canResize="right"
        canSelect
        itemsSorted
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        // resizeDetector={containerResizeDetector}

        visibleTimeStart={visibleTimeStart}
        visibleTimeEnd={visibleTimeEnd}
        // itemRenderer={this.itemRenderer}
        groupRenderer={this.groupRenderer}

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
