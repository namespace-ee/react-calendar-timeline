/* eslint-disable no-console */
import React, { Component, Fragment, createRef } from 'react'
import moment from 'moment'

import Timeline, {
  TimelineMarkers,
  TodayMarker,
  CustomMarker,
  CursorMarker
} from 'react-calendar-timeline'

import generateFakeData from '../generate-fake-data'
import interact from 'interactjs'
import { coordinateToTimeRatio } from 'react-calendar-timeline/lib/utility/calendar'
import {
  getSumOffset,
  getSumScroll,
} from 'react-calendar-timeline/lib/utility/dom-helpers'
import PropTypes from 'prop-types'

class Draggable extends Component {
  static propTypes = {
    handleItemDrop: PropTypes.func,
    timelineRef: PropTypes.object,
    scrollRef: PropTypes.shape({
      current: PropTypes.object,
    }),
    children: PropTypes.node,
    data: PropTypes.object,
  }
  handleItemDrop = e => {
    const {
      props: { timelineRef, scrollRef: { current: scrollRef }, data },
    } = this
    const {
      canvasTimeStart,
      visibleTimeStart,
      visibleTimeEnd,
      groupTops,
      width,
    } = timelineRef.current.state

    const canvasWidth = width * 3
    const zoom = visibleTimeEnd - visibleTimeStart
    const canvasTimeEnd = zoom * 3 + canvasTimeStart
    const ratio = coordinateToTimeRatio(
      canvasTimeStart,
      canvasTimeEnd,
      canvasWidth,
    )

    const { offsetLeft, offsetTop } = getSumOffset(scrollRef)
    const { scrollLeft, scrollTop } = getSumScroll(scrollRef)
    const { pageX, pageY } = e

    const x = pageX - offsetLeft + scrollLeft
    const y = pageY - offsetTop + scrollTop

    const start = x * ratio + canvasTimeStart

    let groupKey = ''
    for (const key of Object.keys(groupTops)) {
      const groupTop = groupTops[key]
      if (y > groupTop) {
        groupKey = key
      } else {
        break
      }
    }

    if (groupKey === '' || pageX < offsetLeft || pageX > offsetLeft + width) {
      return
    }

    this.props.handleItemDrop({ data, start, groupKey })
  }

  componentDidMount = () => {
    let x, y
    this.interactable = interact(this.item.current)
      .draggable({ enabled: true })
      .on('dragstart', e => {
        ({ pageX: x, pageY: y } = e)
      })
      .on('dragmove', e => {
        const { pageX, pageY } = e
        e.target.style.transform = `translate(${pageX - x}px, ${pageY - y}px)`
      })
      .on('dragend', e => {
        e.target.style.transform = ''
        this.handleItemDrop(e)
      })
  }
  componentWillUnmount() {
    this.interactable.unset()
  }

  item = createRef()

  render() {
    return <div ref={this.item}>{this.props.children}</div>
  }
}

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

  handleItemDrop = ({ data: { title }, start, groupKey }) => {
    const end = start + 1000 * 60 * 60 * 24
    const startDay = moment(start).day()
    const endDay = moment(end).day()
    const items = this.state.items
    this.setState({
      items: [
        ...items,
        {
          id: items.length,
          start,
          end,
          group: parseInt(groupKey, 10) + 1,
          title,
          className:
            startDay === 6 || startDay === 0 || endDay === 6 || endDay === 0
              ? 'item-weekend'
              : '',
          itemProps: {
            'data-tip': 'Drag & drop is working',
          },
        },
      ],
    })
  }

  scrollRef = {
    current: null,
  }
  onScrollRef = ref => {
    this.scrollRef.current = ref
  }
  timelineRef = createRef()

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state

    return (
      <Fragment>
        <Draggable
          handleItemDrop={this.handleItemDrop}
          timelineRef={this.timelineRef}
          scrollRef={this.scrollRef}
          data={{ title: 'Drag & drop works' }}
        >
          <div
            style={{
              padding: 10,
              width: '100px',
              height: '100px',
              background: 'lightgray',
            }}
          >
            Drag & drop me onto the timeline
          </div>
        </Draggable>
        <Timeline
          ref={this.timelineRef}
          scrollRef={this.onScrollRef}
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
      </Fragment>
    )
  }
}
