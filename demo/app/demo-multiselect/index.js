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
      },
      {
        id: 4,
        title: 'Group D'
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
      },
      {
        start: moment().add(-2, 'hours'),
        end: moment().add(2, 'hours'),
        group: 4,
        id: 4,
        title: 'Item D',
        canResize: 'both'
      },
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

  handleCanvasClick = (groupId, time, e) => {
    console.log('Canvas clicked', groupId, time)

    // Deselect all items
    this.setState({
      selected: []
    });
  }

  handleCanvasContextMenu = (group, time, e) => {
    console.log('Canvas context menu', group, time)
  }

  handleItemClick = (itemId, e, time) => {
    console.log('Parent Clicked: ' + itemId)

    // If item is currently selected, then deselect it and vice versa
    const isSelected = this.state.selected.indexOf(itemId) > -1;

    let newSelected = this.state.selected.slice();

    if( isSelected) {
      newSelected = this.state.selected.filter(id => id !== itemId)
    } else {
      newSelected.push(itemId)
    }

    this.setState({
      selected: newSelected
    })

  }

  handleItemDoubleClick = (itemId) => {
    console.log('Parent double click', itemId);
  }

  handleItemContextMenu = (itemId) => {
    console.log('Context Menu: ' + itemId)
  }


  calcNewGroupOrder = (orderOffset, groups, groupId) => {

    const rawGroupOrder = groups.findIndex( g => g.id == groupId) + orderOffset;
    
    return orderOffset < 0 ? Math.max(0, rawGroupOrder) : Math.min(rawGroupOrder, groups.length -1);
  }

  handleItemMove = (item, dragTime, newGroupOrder) => {
    const { items, groups, selected } = this.state;

    const group = groups[newGroupOrder];

    // calculate the overall group change for all selected items
    const oldGroupOrder = groups.findIndex( g => g.id == item.group);

    // The net offset will be negative for moving up
    const orderOffset = newGroupOrder - oldGroupOrder;
    
    console.log('Moved', item, dragTime, group, newGroupOrder, oldGroupOrder, orderOffset)

    this.setState({
      items: items.map(i => (
        selected.indexOf(i.id) > -1 ? Object.assign({}, i, {
        start: i.start + dragTime,
        end:  i.end + dragTime,
        group: groups[this.calcNewGroupOrder(orderOffset, groups, i.group)].id
      }) : i )
      )
    });

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
    const { groups, items, defaultTimeStart, defaultTimeEnd, selected } = this.state

    return (
      <Timeline groups={groups}
                items={items}
                keys={keys}
                fixedHeader='fixed'
                fullUpdate

                sidebarWidth={150}
                sidebarContent={<div>Above The Left</div>}

                canMove
                canResize='both'
                useResizeHandle
                // selectMode="multi"

                itemsSorted
                itemTouchSendsClick={false}
                stackItems
                itemHeightRatio={0.75}

                showCursorLine

                defaultTimeStart={defaultTimeStart}
                defaultTimeEnd={defaultTimeEnd}

                selected={selected}
                canChangeGroup={true}

                onCanvasClick={this.handleCanvasClick}
                onCanvasContextMenu={this.handleCanvasContextMenu}

                onItemClick={this.handleItemClick}
                onItemDoubleClick={this.handleItemDoubleClick}
                onItemContextMenu={this.handleItemContextMenu}
                onItemMove={this.handleItemMove}
                onItemResize={this.handleItemResize}
      />
    )
  }
}