/* eslint-disable no-console */
import React, { Component } from 'react'
import moment from 'moment'

import Timeline, {
  TimelineMarkers,
  TodayMarker,
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
    this.timelineComponent = React.createRef();

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

  handleZoom = (timelineContext, unit) => {
    console.log('Zoomed', timelineContext, unit)
  }

  moveResizeValidator = (action, item, timeDONOTUSE, resizeEdge, e, dragStart) => {
    if (action === 'move' && this.timelineComponent && this.timelineComponent.current && this.timelineComponent.current.state) {
      const time =  this.timelineComponent.current.timeFromItemEvent(e) // right time from timeline, DO NOT USE time "param"
      const stateFrom = this.timelineComponent.current.state.visibleTimeStart;
      const stateTo = this.timelineComponent.current.state.visibleTimeEnd;
    
      const zoomMillis = Math.round((stateTo - stateFrom));
      const percentCloseToBorder = 2;
    
      // 5 % Percent of the window area will be used for activanting the move Time window, will change base on zoom level  
      const timeBorderArea =  Math.round(((zoomMillis * percentCloseToBorder) / 100));
      const duration = item.end - item.start;
      const rightBorderTime = time + duration;
    
      // Moves to right  
      if (rightBorderTime > stateTo - timeBorderArea) {
        const newFrom = stateFrom + (timeBorderArea / percentCloseToBorder); // Moves 20 percent  
        const newTo = stateTo + (timeBorderArea / percentCloseToBorder); // Moves 20 percent  
    
        this.timelineComponent.current.updateScrollCanvas(newFrom, newTo);
        return time + (dragStart.offset);
      }  
    
      // Moves to left  
      if (time < stateFrom + timeBorderArea) {
        const newFrom = stateFrom - (timeBorderArea / percentCloseToBorder); // Moves 20 percent  
        const newTo = stateTo - (timeBorderArea / percentCloseToBorder); // Moves 20 percent  
    
        this.timelineComponent.current.updateScrollCanvas(newFrom, newTo);
        return time + (dragStart.offset);
      }
    }

    return timeDONOTUSE;
  }

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state

    return (
      <Timeline
        ref={this.timelineComponent}
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
        onItemMove={this.handleItemMove}
        onItemResize={this.handleItemResize}
        onTimeChange={this.handleTimeChange}
        onZoom={this.handleZoom}
        moveResizeValidator={this.moveResizeValidator}
        buffer={3}
      >
        <TimelineMarkers>
          <TodayMarker />
        </TimelineMarkers>
      </Timeline>
    )
  }
}
