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
      const time =  this.timelineComponent.current.timeFromItemEvent(e) // time from drag/resize event, DO NOT USE "time" param
      const stateFrom = this.timelineComponent.current.state.visibleTimeStart;
      const stateTo = this.timelineComponent.current.state.visibleTimeEnd;
    
      const zoomMillis = Math.round((stateTo - stateFrom));
      const closeToBorderTolerance = 3; // How close item to border enables the auto-scroll canvas, 2-5 are good values.
    
      // Percent of the window area will be used for activanting the move Time window, will change base on zoom level  
      const timeBorderArea =  Math.round(((zoomMillis * closeToBorderTolerance) / 100));
      const duration = item.end - item.start;
      const rightBorderTime = time + duration;
    
      // Moves timeline to right, when item close to right border
      if (rightBorderTime > stateTo - timeBorderArea) {
        const newFrom = stateFrom + (timeBorderArea / closeToBorderTolerance); 
        const newTo = stateTo + (timeBorderArea / closeToBorderTolerance); 
    
        this.timelineComponent.current.updateScrollCanvas(newFrom, newTo);
        return time + (dragStart.offset);
      }  
    
      // Moves canvas to left, when item close to left border
      if (time < stateFrom + timeBorderArea) {
        const newFrom = stateFrom - (timeBorderArea / closeToBorderTolerance); 
        const newTo = stateTo - (timeBorderArea / closeToBorderTolerance); 
    
        this.timelineComponent.current.updateScrollCanvas(newFrom, newTo);
        return time + (dragStart.offset);
      }
    }


    if (action === 'resize' && this.timelineComponent && this.timelineComponent.current && this.timelineComponent.current.state) {
      const time =  this.timelineComponent.current.timeFromItemEvent(e) // time from drag/resize event, DO NOT USE "time" param
      const stateFrom = this.timelineComponent.current.state.visibleTimeStart;
      const stateTo = this.timelineComponent.current.state.visibleTimeEnd;
    
      const zoomMillis = Math.round((stateTo - stateFrom));
      const closeToBorderTolerance = 2; // How close item to border enables the auto-scroll canvas, 2-5 are good values.
    
      // Percent of the window area will be used for activanting the move Time window, will change base on zoom level  
      const timeBorderArea =  Math.round(((zoomMillis * closeToBorderTolerance) / 100));

      // Moves timeline to right, when item close to right border
      if (resizeEdge === 'right' && time > stateTo - timeBorderArea) {
        const newFrom = stateFrom + (timeBorderArea / closeToBorderTolerance); 
        const newTo = stateTo + (timeBorderArea / closeToBorderTolerance); 
    
        this.timelineComponent.current.updateScrollCanvas(newFrom, newTo);
        return time + (timeBorderArea / 2);
      } else if (time < stateFrom + timeBorderArea) { // Moves canvas to left, when item close to left border
        const newFrom = stateFrom - (timeBorderArea / closeToBorderTolerance); 
        const newTo = stateTo - (timeBorderArea / closeToBorderTolerance); 
    
        this.timelineComponent.current.updateScrollCanvas(newFrom, newTo);
        return time - (timeBorderArea / 2);
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
