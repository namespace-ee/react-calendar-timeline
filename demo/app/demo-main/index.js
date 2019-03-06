/* eslint-disable no-console */
import React, { Component } from 'react'
import moment from 'moment'

import Timeline, {
  TimelineMarkers,
  TimelineHeaders,
  TodayMarker,
  CustomMarker,
  CursorMarker,
  CustomHeader,
  SidebarHeader,
  DateHeader
} from 'react-calendar-timeline'

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

    const items = [
      // {
      //   id: '4',
      //   group: '1',
      //   title:
      //     '4',
      //   start: 1550538000000,
      //   end: 1550560702870,
      //   canResize: false,
      //   className: '',
      //   bgColor: 'rgba(209, 154, 237, 0.6)',
      //   selectedBgColor: 'rgba(209, 154, 237, 1)',
      //   color: '#55077c',
      //   itemProps: {
      //     'data-tip':
      //       'The AGP bus is down, calculate the multi-byte alarm so we can generate the THX driver!'
      //   }
      // },
      // {
      //   id: '5',
      //   group: '1',
      //   title:
      //     '5',
      //   start: 1550549700000,
      //   end: 1550569678295,
      //   canMove: true,
      //   canResize: 'both',
      //   className: '',
      //   bgColor: 'rgba(235, 171, 242, 0.6)',
      //   selectedBgColor: 'rgba(235, 171, 242, 1)',
      //   color: '#ad0fbf',
      //   itemProps: {
      //     'data-tip':
      //       "I'll parse the virtual AI monitor, that should microchip the SDD circuit!"
      //   }
      // },
      {
        id: '1',
        group: '1',
        title:
          '1',
        start: 1550562300000,
        end: 1550566800000,
        canMove: true,
        canResize: 'both',
        className: '',
        bgColor: 'rgba(119, 126, 249, 0.6)',
        selectedBgColor: 'rgba(119, 126, 249, 1)',
        color: '#010887',
        itemProps: {
          'data-tip':
            'The IB alarm is down, parse the virtual driver so we can copy the COM bus!'
        }
      },
      {
        id: '3',
        group: '2',
        title: '3',
        start: 1550538000000,
        end: 1550557157371,
        canResize: false,
        className: '',
        bgColor: 'rgba(184, 141, 239, 0.6)',
        selectedBgColor: 'rgba(184, 141, 239, 1)',
        color: '#3c0584',
        itemProps: {
          'data-tip':
            'Try to synthesize the AI circuit, maybe it will calculate the cross-platform interface!'
        }
      },
     
      
      {
        id: '6',
        group: '2',
        title: '6',
        start: 1550551500000,
        end: 1550571478295,
        canResize: false,
        className: '',
        bgColor: 'rgba(252, 191, 243, 0.6)',
        selectedBgColor: 'rgba(252, 191, 243, 1)',
        color: '#ea15ca',
        itemProps: {
          'data-tip': 'We need to input the haptic USB panel!'
        }
      },
      {
        id: '7',
        group: '2',
        title:
          "7",
        start: 1550539800000,
        end: 1550559571292,
        canResize: false,
        className: '',
        bgColor: 'rgba(247, 116, 197, 0.6)',
        selectedBgColor: 'rgba(247, 116, 197, 1)',
        color: '#db0288',
        itemProps: {
          'data-tip':
            "bypassing the driver won't do anything, we need to compress the haptic XML monitor!"
        }
      },
      {
        id: '8',
        group: '2',
        title: '8',
        start: 1550535300000,
        end: 1550550380987,
        canResize: false,
        className: '',
        bgColor: 'rgba(244, 129, 173, 0.6)',
        selectedBgColor: 'rgba(244, 129, 173, 1)',
        color: '#99043d',
        itemProps: {
          'data-tip':
            "copying the system won't do anything, we need to quantify the neural SCSI protocol!"
        }
      }
    ]

    const groups = [
      {
        id: '1',
        title: 'Dee',
        rightTitle: 'Kuhn',
        label: 'Label Amari',
        bgColor: '#c0d0f9'
      },
      {
        id: '2',
        title: 'Brennon',
        rightTitle: 'Cronin',
        label: 'Label Maude',
        bgColor: '#777ef9'
      }
    ]

    const defaultTimeStart = moment('19/2/2019', 'dd/mm/yyyy')
      .startOf('day')
      .toDate()
    const defaultTimeEnd = moment('19/2/2019', 'dd/mm/yyyy')
      .endOf('day')
      .toDate()
    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd
    }
  }

  handleCanvasClick = (groupId, time) => {
    console.log('Canvas clicked', groupId, moment(time).format())
  }

  handleCanvasDoubleClick = (groupId, time) => {
    console.log('Canvas double clicked', groupId, moment(time).format())
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

  handleMoveUpdate= (...args)=> {
    console.log(args)
  }

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state

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
        stackItems='lines'
        itemHeightRatio={0.75}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        onCanvasClick={this.handleCanvasClick}
        onCanvasDoubleClick={this.handleCanvasDoubleClick}
        onCanvasContextMenu={this.handleCanvasContextMenu}
        onItemClick={this.handleItemClick}
        onItemSelect={this.handleItemSelect}
        onItemContextMenu={this.handleItemContextMenu}
        onItemMove={this.handleItemMove}
        onItemResize={this.handleItemResize}
        onItemDoubleClick={this.handleItemDoubleClick}
        onTimeChange={this.handleTimeChange}
        moveResizeValidator={this.moveResizeValidator}
        width={1000}
        onUpdateMove={this.handleMoveUpdate}
      >
        <TimelineMarkers>
          <TodayMarker />
          <CustomMarker
            date={
              moment()
                .startOf('day')
                .valueOf() +
              1000 * 60 * 60 * 2
            }
          />
          <CustomMarker
            date={moment()
              .add(3, 'day')
              .valueOf()}
          >
            {({ styles }) => {
              const newStyles = { ...styles, backgroundColor: 'blue' }
              return <div style={newStyles} />
            }}
          </CustomMarker>
          <CursorMarker />
        </TimelineMarkers>
      </Timeline>
    )
  }
}
