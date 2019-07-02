import React, { Component } from 'react'
import moment from 'moment'

import Timeline from 'react-calendar-timeline'
import CustomInfoLabel from './CustomInfoLabel'

import generateFakeData from '../generate-fake-data'

var keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end',
  groupLabelKey: 'title'
}

export default class App extends Component {
  constructor(props) {
    super(props)

    const { groups, items } = generateFakeData(5, 20)
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
  }

  dragRenderer = ({
    eventType,
    InfoLabel,
    dragTime,
    dragGroupTitle,
    resizeTime
  }) => {
    switch (eventType) {
      case 'resize':
        return <InfoLabel label={moment(resizeTime).format('ll')} />
      case 'move':
        return <CustomInfoLabel time={dragTime} groupTitle={dragGroupTitle} />
      default:
        return null
    }
  }

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state

    return (
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        fullUpdate
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        canMove={true}
        canResize={'both'}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        onItemMove={this.handleItemMove}
        onItemResize={this.handleItemResize}
        onDragRenderer={this.dragRenderer}
      />
    )
  }
}
