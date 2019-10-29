/* eslint-disable no-console */
import React, { Component, useEffect } from 'react'
import moment from 'moment'

import Timeline, {
  TimelineMarkers,
  TimelineHeaders,
  TodayMarker,
  CustomMarker,
  CursorMarker,
  CustomHeader,
  SidebarHeader,
  DateHeader,
  RowColumns,
  RowItems,
  GroupRow,
  HelpersContext
} from 'react-calendar-timeline'
import { useDrag, useDrop } from 'react-dnd'
import * as d3 from 'd3'

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
      defaultTimeEnd,
      timelineLinks: [],
      itemsToDrag: [
        {
          title: 'print',
          id: '0a',
          slots: [
            {
              groupId: '1',
              startTime: moment()
                .startOf('day')
                .add(2, 'h'),
              endTime: moment()
                .startOf('day')
                .add(4, 'h')
            },
            {
              groupId: '2',
              startTime: moment()
                .startOf('day')
                .add(8, 'h'),
              endTime: moment()
                .startOf('day')
                .add(16, 'h')
            }
          ]
        },
        {
          title: 'cut',
          id: '1a',
          slots: [
            {
              groupId: '2',
              startTime: moment()
                .startOf('day')
                .add(9, 'h'),
              endTime: moment()
                .startOf('day')
                .add(18, 'h')
            },
            {
              groupId: '5',
              startTime: moment()
                .startOf('day')
                .add(2, 'h'),
              endTime: moment()
                .startOf('day')
                .add(10, 'h')
            }
          ]
        },
        {
          title: 'fold',
          id: '2a',
          slots: [
            {
              groupId: '4',
              startTime: moment()
                .startOf('day')
                .add(9, 'h'),
              endTime: moment()
                .startOf('day')
                .add(18, 'h')
            },
            {
              groupId: '6',
              startTime: moment()
                .startOf('day')
                .add(2, 'h'),
              endTime: moment()
                .startOf('day')
                .add(8, 'h')
            }
          ]
        }
      ],
      unavailableSlots: {
        '1': [
          {
            id: '0',
            groupId: '0',
            startTime: moment()
              .startOf('day')
              .add(16, 'h'),
            endTime: moment()
              .startOf('day')
              .add(20, 'h')
          }
        ],
        '3': [
          {
            id: '1',
            groupId: '3',
            startTime: moment()
              .startOf('day')
              .add(13, 'h'),
            endTime: moment()
              .startOf('day')
              .add(15, 'h')
          },
          {
            id: '2',
            groupId: '3',
            startTime: moment()
              .startOf('day')
              .add(22, 'h'),
            endTime: moment()
              .startOf('day')
              .add(24, 'h')
          }
        ]
      }
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

  findItemById = itemId => {
    return this.state.items.find(i => i.id === itemId)
  }

  tempItemId = undefined

  handleItemClick = (itemId, _, time) => {
    console.log('Clicked: ' + itemId, moment(time).format())
  }

  handleItemSelect = (itemId, _, time) => {
    if (!this.tempItemId) {
      this.tempItemId = itemId
    } else {
      this.setState(
        state => ({
          timelineLinks: [...state.timelineLinks, [this.tempItemId, itemId]]
        }),
        () => {
          this.tempItemId = undefined
        }
      )
    }
    console.log('Selected: ' + itemId, moment(time).format())
  }

  handleItemDoubleClick = (itemId, _, time) => {
    console.log('Double Click: ' + itemId, moment(time).format())
  }

  handleItemContextMenu = (itemId, _, time) => {
    console.log('Context Menu: ' + itemId, moment(time).format())
  }

  handleItemMove = (itemId, dragTime, newGroupId) => {
    const { items, groups } = this.state

    const group = groups.find(i => i.id === newGroupId)

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

    console.log('Moved', itemId, dragTime, newGroupId)
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
    const unavailableSlots = this.state.unavailableSlots[item.group]
    const originalItem = this.state.items.find(i => i.id === item.id)
    const startTimeInMoment = moment(time, 'x')
    const endTimeInMoment = moment(item.end - item.start + time, 'x')
    if (unavailableSlots) {
      const violation = unavailableSlots.find(slot => {
        const { startTime, endTime } = slot
        console.log(endTimeInMoment.format(), startTime.format())
        return (
          (startTimeInMoment.isAfter(startTime) &&
            startTimeInMoment.isBefore(endTime)) ||
          (endTimeInMoment.isAfter(startTime) &&
            endTimeInMoment.isBefore(endTime))
        )
      })
      if (violation)
        return (
          violation.startTime.valueOf() -
          (originalItem.end - originalItem.start)
        )
    }
    return time
  }

  handleDrop = (item, slot) => {
    const fullItem = this.state.itemsToDrag.find(i => i.id === item.id)
    this.setState(state => ({
      itemsToDrag: state.itemsToDrag.filter(i => item.id !== i.id),
      items: [
        ...state.items,
        {
          title: fullItem.title,
          id: item.id,
          group: slot.groupId,
          start: slot.startTime.valueOf(),
          end: slot.endTime.valueOf()
        }
      ]
    }))
  }

  rowRenderer = ({
    rowData,
    getLayerRootProps,
    group,
    itemsWithInteractions
  }) => {
    const helpers = React.useContext(HelpersContext)
    const { itemsToDrag, unavailableSlots, timelineLinks } = rowData
    const groupUnavailableSlots = unavailableSlots[group.id]
      ? unavailableSlots[group.id]
      : []
    return (
      <GroupRow>
        <RowItems />
        <UnavailableLayer
          getLayerRootProps={getLayerRootProps}
          getLeftOffsetFromDate={helpers.getLeftOffsetFromDate}
          groupUnavailableSlots={groupUnavailableSlots}
        />
        <DroppablesLayer
          getLayerRootProps={getLayerRootProps}
          itemsToDrag={itemsToDrag}
          getLeftOffsetFromDate={helpers.getLeftOffsetFromDate}
          handleDrop={this.handleDrop}
          group={group}
        />
        <Links
          timelineLinks={timelineLinks}
          getItemAbsoluteDimensions={helpers.getItemAbsoluteDimensions}
          getItemDimensions={helpers.getItemDimensions}
          group={group}
          getLayerRootProps={getLayerRootProps}
          items={itemsWithInteractions}
        />
      </GroupRow>
    )
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
        canResize="both"
        canSelect
        itemsSorted
        itemTouchSendsClick={false}
        stackItems
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
        rowRenderer={this.rowRenderer}
        rowData={{
          itemsToDrag: this.state.itemsToDrag,
          unavailableSlots: this.state.unavailableSlots,
          timelineLinks: this.state.timelineLinks
        }}
        // moveResizeValidator={this.moveResizeValidator}
      >
        <TimelineHeaders>
          <DateHeader />
          <CustomHeader
            headerData={{
              itemsToDrag: this.state.itemsToDrag
            }}
          >
            {({
              headerContext: { intervals },
              getRootProps,
              getIntervalProps,
              showPeriod,
              data: { itemsToDrag }
            }) => {
              const {getLeftOffsetFromDate} = React.useContext(HelpersContext)
              return (
                <div {...getRootProps()}>
                  <div
                    style={{
                      height: '100%',
                      transform: `translateX(${getLeftOffsetFromDate(
                        moment()
                          .startOf('day')
                          .valueOf()
                      )}px)`,
                      display: 'flex'
                    }}
                  >
                    {itemsToDrag.map(dragItem => {
                      return (
                        <Draggable
                          key={dragItem.id}
                          id={dragItem.id}
                          style={{
                            height: '100%',
                            width: 100,
                            background: 'white',
                            marginLeft: 15,
                            border: '1px solid white'
                          }}
                          onDragEnd={item => console.log('dragEnd', item)}
                          onDragStart={item => console.log('dragStart', item)}
                        >
                          {dragItem.title}
                        </Draggable>
                      )
                    })}
                  </div>
                </div>
              )
            }}
          </CustomHeader>
        </TimelineHeaders>
        {/* <TimelineMarkers>
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
        </TimelineMarkers> */}
      </Timeline>
    )
  }
}

function Link({
  timelineLink,
  getItemAbsoluteDimensions,
  getItemDimensions,
  group,
  items
}) {
  const [startId, endId] = timelineLink
  const startItem = items.find(i => i.id === startId)
  if (startItem.group !== group.id) return null
  const startItemDimensions = getItemAbsoluteDimensions(startId) || {
    left: 0,
    top: 0
  }
  const endItemDimensions = getItemAbsoluteDimensions(endId) || {
    left: 0,
    top: 0
  }
  let startLink = [startItemDimensions.left, startItemDimensions.top]
  let endLink = [endItemDimensions.left, endItemDimensions.top]
  const isEndLinkBeforeStart =
    endLink[0] <= startLink[0] || endLink[1] <= startLink[1]
  let itemLink = isEndLinkBeforeStart
    ? [endLink, startLink]
    : [startLink, endLink]
  const lineGenerator = d3.line()
  const [startLk, endLk] = itemLink
  const endPoint = [endLk[0] - startLk[0], endLk[1] - startLk[1]]
  const itemDimensions = getItemDimensions(startId)
  return (
    <svg
      style={{
        position: 'absolute',
        left: startLk[0],
        zIndex: 200,
        top: itemDimensions.top,
        height: endPoint[1],
        //handle case where endPoint is 0
        width: endPoint[0] > 2 ? endPoint[0] : 2,
        pointerEvents: 'none'
      }}
    >
      <path
        d={lineGenerator([[0, 0], endPoint])}
        stroke="red"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  )
}

const Links = React.memo(({
  timelineLinks,
  getItemAbsoluteDimensions,
  getItemDimensions,
  group,
  getLayerRootProps,
  items
}) => {
  return (
    <div {...getLayerRootProps()}>
      {timelineLinks.map((timelineLink, i) => {
        const [startId, endId] = timelineLink
        return (
          <Link
            timelineLink={timelineLink}
            key={`${startId}${endId}`}
            getItemAbsoluteDimensions={getItemAbsoluteDimensions}
            getItemDimensions={getItemDimensions}
            group={group}
            items={items}
          />
        )
      })}
    </div>
  )
})

function Droppable({ children, itemIdAccepts, style, slot, onDrop, ...rest }) {
  const [collected, droppableRef] = useDrop({
    drop: (item, monitor) => {
      onDrop(item, slot)
    },
    accept: itemIdAccepts,
    collect: monitor => ({
      canDrop: monitor.canDrop()
    })
  })
  const isVisable = collected.canDrop
  return (
    <div
      style={{
        ...style,
        display: isVisable ? 'initial' : 'none'
      }}
      ref={droppableRef}
      {...rest}
    >
      {children}
    </div>
  )
}

function Draggable({ id, children, onDragStart, onDragEnd, ...rest }) {
  const [collectedProps, dragRef] = useDrag({
    item: { id, type: id },
    begin: monitor => {
      onDragStart(id)
    },
    end: (item, monitor) => {
      console.log(monitor)
      onDragEnd(item)
    }
  })
  return (
    <div {...rest} ref={dragRef}>
      {children}
    </div>
  )
}

function DroppablesLayer({
  getLayerRootProps,
  itemsToDrag,
  getLeftOffsetFromDate,
  handleDrop,
  group
}) {
  return (
    <div {...getLayerRootProps()}>
      {itemsToDrag.map((item, index) => {
        return item.slots
          .filter(slot => slot.groupId === group.id)
          .map(slot => {
            const left = getLeftOffsetFromDate(slot.startTime.valueOf())
            const right = getLeftOffsetFromDate(slot.endTime.valueOf())
            return (
              <Droppable
                key={index}
                style={{
                  position: 'absolute',
                  left: left,
                  width: right - left,
                  backgroundColor: 'purple',
                  height: '100%'
                }}
                itemIdAccepts={item.id}
                slot={slot}
                onDrop={handleDrop}
              >
                {item.title}
              </Droppable>
            )
          })
      })}
    </div>
  )
}

const UnavailableLayer = (({
  getLayerRootProps,
  groupUnavailableSlots,
  getLeftOffsetFromDate
}) => {
  useEffect(() => {
    return () => {
      // console.log("unmount UnavailableLayer")
    }
  })
  return (
    <div {...getLayerRootProps()}>
      {groupUnavailableSlots.map(slot => {
        const left = getLeftOffsetFromDate(slot.startTime.valueOf())
        const right = getLeftOffsetFromDate(slot.endTime.valueOf())
        return (
          <div
            key={slot.id}
            style={{
              position: 'absolute',
              left: left,
              width: right - left,
              backgroundColor: '#ECF0F1',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{ height: 12 }}>unavailable</span>
          </div>
        )
      })}
    </div>
  )
})
