import React, { Component } from 'react'
import Item from './Item.jsx'

export default class Items extends Component {
  constructor (props) {
    super(props)
  }

  getGroupOrders () {
    let groupOrders = {}
    let i = 0

    this.props.groups.forEach(group => {
      groupOrders[group.id] = i++
    })

    return groupOrders
  }

  getVisibleItems (originX, maxX, groupOrders) {
    return this.props.items.filter(item => {
      return groupOrders.hasOwnProperty(item.group)
    }).filter(item => {
      const x1 = item.start.getTime()
      const x2 = item.end.getTime()
      return (x1 >= originX && x1 <= maxX) || (x1 <= originX && x2 >= maxX) || (x2 >= originX && x2 <= maxX)
    })
  }

  render () {
    const groupOrders = this.getGroupOrders()
    const visibleItems = this.getVisibleItems(this.props.originX, this.props.maxX, groupOrders)

    return (
      <div>
        {visibleItems.map(item => <Item key={item.id}
                                        item={item}
                                        originX={this.props.originX}
                                        maxX={this.props.maxX}
                                        canvasWidth={this.props.canvasWidth}
                                        lineHeight={this.props.lineHeight}
                                        order={groupOrders[item.group]}
                                        selected={this.props.selectedItem === item.id}
                                        dragSnap={this.props.dragSnap}
                                        minResizeWidth={this.props.minResizeWidth}
                                        canChangeGroup={item.canChangeGroup !== undefined ? item.canChangeGroup : this.props.canChangeGroup}
                                        canMove={item.canMove !== undefined ? item.canMove : this.props.canMove}
                                        canResize={item.canResize !== undefined ? item.canResize : this.props.canResize}
                                        onResizing={this.props.itemResizing}
                                        onResized={this.props.itemResized}
                                        onDrag={this.props.itemDrag}
                                        onDrop={this.props.itemDrop}
                                        onSelect={this.props.itemSelect}/>)}
      </div>
    )
  }
}

Items.propTypes = {
  groups: React.PropTypes.array.isRequired,
  items: React.PropTypes.array.isRequired,

  originX: React.PropTypes.number.isRequired,
  maxX: React.PropTypes.number.isRequired,
  canvasWidth: React.PropTypes.number.isRequired,
  lineHeight: React.PropTypes.number.isRequired,

  dragSnap: React.PropTypes.number,
  minResizeWidth: React.PropTypes.number,
  selectedItem: React.PropTypes.string,

  canChangeGroup: React.PropTypes.bool.isRequired,
  canMove: React.PropTypes.bool.isRequired,
  canResize: React.PropTypes.bool.isRequired,

  itemSelect: React.PropTypes.func,
  itemDrag: React.PropTypes.func,
  itemDrop: React.PropTypes.func,
  itemResizing: React.PropTypes.func,
  itemResized: React.PropTypes.func
}
Items.defaultProps = {
}
