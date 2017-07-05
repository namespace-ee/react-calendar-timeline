import React, { Component } from 'react'
import moment from 'moment'
import Timeline from 'react-calendar-timeline'

var keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end'
}

export default class App extends Component {
  constructor (props) {
    super(props)

    let groups = [
      {
        id: 1,
        title: 'Group A'
      },
      {
        id: 2,
        title: 'Group B'
      },
      {
        id: 3,
        title: 'Group C'
      }
    ]
    let items = [
      {
        start: moment().add(-2, 'hours'),
        end: moment().add(2, 'hours'),
        group: 1,
        id: 1,
        title: 'Item A',
        canResize: 'both'
      },
      {
        start: moment().add(-6, 'hours'),
        end: moment().add(-2, 'hours'),
        group: 2,
        id: 2,
        title: 'Item B',
        canResize: 'both'
      },
      {
        start: moment().add(-6, 'hours'),
        end: moment().add(-2, 'hours'),
        group: 3,
        id: 3,
        title: 'Item C',
        canResize: 'both'
      }
    ]

    const defaultTimeStart = moment().startOf('day').toDate()
    const defaultTimeEnd = moment().startOf('day').add(1, 'day').toDate()

    this.state = {
      groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
      selected: [1, 2]
    }
  }

  handleCanvasClick = (groupId, time, event) => {
    console.log('Canvas clicked', groupId, time)
  }

  handleCanvasContextMenu = (group, time, e) => {
    console.log('Canvas context menu', group, time)
  }

  handleItemClick = (itemId) => {
    this.setState({
      selected: this.state.selected.filter(id => id !== itemId)
    })

    console.log('Clicked: ' + itemId)
  }

  handleItemSelect = (itemId) => {
    let selected = this.state.selected.slice()
    selected.push(itemId)
    this.setState({
      selected
    })
    console.log('Selected: ' + itemId)
  }

  handleItemDeselect = () => {
    this.setState({
      selected: []
    })
    console.log('Deselected all')
  }

  handleItemContextMenu = (itemId) => {
    console.log('Context Menu: ' + itemId)
  }

  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state

    const group = groups[newGroupOrder]

    this.setState({
      items: items.map(item => item.id === itemId ? Object.assign({}, item, {
        start: dragTime,
        end: dragTime + (item.end - item.start),
        group: group.id
      }) : item)
    })

    console.log('Moved', itemId, dragTime, newGroupOrder)
  }

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state

    this.setState({
      items: items.map(item => item.id === itemId ? Object.assign({}, item, {
        start: edge === 'left' ? time : item.start,
        end: edge === 'left' ? item.end : time
      }) : item)
    })

    console.log('Resized', itemId, time, edge)
  }

  render () {
    const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state

    return (
      <Timeline groups={groups}
                items={items}
                keys={keys}
                fixedHeader='fixed'
                fullUpdate

                sidebarWidth={150}
                sidebarContent={<div>Above The Left</div>}

                canMove
                canResize='right'
                canSelect

                itemsSorted
                itemTouchSendsClick={false}
                stackItems
                itemHeightRatio={0.75}

                showCursorLine

                defaultTimeStart={defaultTimeStart}
                defaultTimeEnd={defaultTimeEnd}

                selected={this.state.selected}
                canChangeGroup={true}

                onCanvasClick={this.handleCanvasClick}
                onCanvasContextMenu={this.handleCanvasContextMenu}

                onItemClick={this.handleItemClick}
                onItemSelect={this.handleItemSelect}
                onItemDeselect={this.handleItemDeselect}
                onItemContextMenu={this.handleItemContextMenu}
                onItemMove={this.handleItemMove}
                onItemResize={this.handleItemResize}
      />
    )
  }
}
