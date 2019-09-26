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
      defaultTimeEnd,
      showInfoLabel: false,
      infoLabelTime: '',
      infoLabelGroupTitle: '',
      infoLabelHeading: ''
    }
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
      ),
      showInfoLabel: false,
      infoLabelTime: ''
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
      ),
      showInfoLabel: false,
      infoLabelTime: ''
    })
  }

  handleItemDrag = ({ eventType, itemId, time, edge, newGroupId }) => {
    const group = this.state.groups.find(i => i.id === newGroupId)
    const infoLabelGroupTitle = group ? group.title : ''
    const infoLabelTime = moment(time).format('dddd, MMMM Do YYYY')
    let heading = ''
    switch (eventType) {
      case 'move':
        heading = '🚚 Moving'
        break
      case 'resize':
        heading = '📅 Resizing'
        break
    }

    if (
      this.state.infoLabelTime !== infoLabelTime ||
      this.state.infoLabelGroupTitle !== infoLabelGroupTitle
    ) {
      this.setState({
        showInfoLabel: true,
        infoLabelTime,
        infoLabelGroupTitle,
        infoLabelHeading: heading
      })
    }
  }

  render() {
    const {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
      showInfoLabel,
      infoLabelTime,
      infoLabelGroupTitle,
      infoLabelHeading
    } = this.state

    const customInfoLabelMarkup = showInfoLabel ? (
      <CustomInfoLabel
        time={infoLabelTime}
        groupTitle={infoLabelGroupTitle}
        heading={infoLabelHeading}
      />
    ) : null

    return (
      <div>
        {customInfoLabelMarkup}
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
          onItemDrag={this.handleItemDrag}
        />
      </div>
    )
  }
}
