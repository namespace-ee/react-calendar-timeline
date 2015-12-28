import React, { Component } from 'react'
import Item from './Item.jsx'

import moment from 'moment'

import { _get } from '../utils'

export default class Items extends Component {
  constructor (props) {
    super(props)
  }

  getGroupOrders () {
    const { groupIdKey } = this.props

    let groupOrders = {}
    let i = 0

    this.props.groups.forEach(group => {
      groupOrders[_get(group, groupIdKey)] = i++
    })

    return groupOrders
  }

  getVisibleItems (canvasTimeStart, canvasTimeEnd, groupOrders) {
    const { itemTimeStartKey, itemTimeEndKey, itemGroupKey } = this.props

    return this.props.items.filter(item => {
      return groupOrders.hasOwnProperty(_get(item, itemGroupKey))
    }).filter(item => {
      const x1 = moment(_get(item, itemTimeStartKey)).valueOf()
      const x2 = moment(_get(item, itemTimeEndKey)).valueOf()

      return x1 <= canvasTimeEnd && x2 >= canvasTimeStart
    })
  }

  render () {
    const groupOrders = this.getGroupOrders()
    const visibleItems = this.getVisibleItems(this.props.canvasTimeStart, this.props.canvasTimeEnd, groupOrders)

    const { itemIdKey, itemGroupKey, itemTimeStartKey, itemTimeEndKey, itemTitleKey } = this.props

    return (
      <div>
        {visibleItems.map(item => <Item key={_get(item, itemIdKey)}
                                        itemId={_get(item, itemIdKey)}
                                        itemTitle={_get(item, itemTitleKey)}
                                        itemTimeStart={_get(item, itemTimeStartKey)}
                                        itemTimeEnd={_get(item, itemTimeEndKey)}
                                        canvasTimeStart={this.props.canvasTimeStart}
                                        canvasTimeEnd={this.props.canvasTimeEnd}
                                        canvasWidth={this.props.canvasWidth}
                                        lineHeight={this.props.lineHeight}
                                        order={groupOrders[_get(item, itemGroupKey)]}
                                        selected={this.props.selectedItem === _get(item, itemIdKey)}
                                        dragSnap={this.props.dragSnap}
                                        minResizeWidth={this.props.minResizeWidth}
                                        canChangeGroup={_get(item, 'canChangeGroup') !== undefined ? _get(item, 'canChangeGroup') : this.props.canChangeGroup}
                                        canMove={_get(item, 'canMove') !== undefined ? _get(item, 'canMove') : this.props.canMove}
                                        canResize={_get(item, 'canResize') !== undefined ? _get(item, 'canResize') : this.props.canResize}
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
  groups: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]).isRequired,
  items: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]).isRequired,

  canvasTimeStart: React.PropTypes.number.isRequired,
  canvasTimeEnd: React.PropTypes.number.isRequired,
  canvasWidth: React.PropTypes.number.isRequired,
  lineHeight: React.PropTypes.number.isRequired,

  dragSnap: React.PropTypes.number,
  minResizeWidth: React.PropTypes.number,
  selectedItem: React.PropTypes.string,

  canChangeGroup: React.PropTypes.bool.isRequired,
  canMove: React.PropTypes.bool.isRequired,
  canResize: React.PropTypes.bool.isRequired,

  groupIdKey: React.PropTypes.string.isRequired,
  itemIdKey: React.PropTypes.string.isRequired,
  itemTitleKey: React.PropTypes.string.isRequired,
  itemGroupKey: React.PropTypes.string.isRequired,
  itemTimeStartKey: React.PropTypes.string.isRequired,
  itemTimeEndKey: React.PropTypes.string.isRequired,

  itemSelect: React.PropTypes.func,
  itemDrag: React.PropTypes.func,
  itemDrop: React.PropTypes.func,
  itemResizing: React.PropTypes.func,
  itemResized: React.PropTypes.func
}
Items.defaultProps = {
}
