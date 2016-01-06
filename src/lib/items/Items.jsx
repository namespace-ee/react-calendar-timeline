import React, { Component } from 'react'
// import Item from './Item.jsx'
import ItemGroup from './ItemGroup.jsx'

import { _get, arraysEqual } from '../utils'

export default class Items extends Component {
  constructor (props) {
    super(props)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(arraysEqual(nextProps.groups, this.props.groups) &&
             arraysEqual(nextProps.items, this.props.items) &&
             nextProps.keys === this.props.keys &&
             nextProps.canvasTimeStart === this.props.canvasTimeStart &&
             nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
             nextProps.canvasWidth === this.props.canvasWidth &&
             nextProps.selectedItem === this.props.selectedItem &&
             nextProps.lineHeight === this.props.lineHeight &&
             nextProps.dragSnap === this.props.dragSnap &&
             nextProps.minResizeWidth === this.props.minResizeWidth &&
             nextProps.canChangeGroup === this.props.canChangeGroup &&
             nextProps.canMove === this.props.canMove &&
             nextProps.canResize === this.props.canResize)
  }

  getGroupOrders () {
    const { groupIdKey } = this.props.keys

    let groupOrders = {}

    for (let i = 0; i < this.props.groups.length; i++) {
      groupOrders[_get(this.props.groups[i], groupIdKey)] = i
    }

    return groupOrders
  }

  getVisibleItems (canvasTimeStart, canvasTimeEnd, groupOrders) {
    const { itemTimeStartKey, itemTimeEndKey } = this.props.keys

    return this.props.items.filter(item => {
      return _get(item, itemTimeStartKey) <= canvasTimeEnd && _get(item, itemTimeEndKey) >= canvasTimeStart
    })
  }

  render () {
    const { canvasTimeStart, canvasTimeEnd, canvasWidth } = this.props

    const groupOrders = this.getGroupOrders()
    const visibleItems = this.getVisibleItems(canvasTimeStart, canvasTimeEnd, groupOrders)

    const timeDiff = Math.floor((canvasTimeEnd - canvasTimeStart) / 24)

    const start = Math.floor(canvasTimeStart / timeDiff) * timeDiff
    const end = Math.floor(canvasTimeEnd / timeDiff) * timeDiff

    const canvasTimeLength = (canvasTimeEnd - canvasTimeStart)
    const ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart)

    let itemGroups = []

    for (let i = start; i < end + timeDiff; i += timeDiff) {
      itemGroups.push({
        start: i,
        end: i + timeDiff,
        left: Math.round((i - canvasTimeStart) * ratio, 2),
        items: visibleItems.filter(item => item.start >= i && item.start < i + timeDiff)
      })
    }

    return (
      <div>
        {itemGroups.map(group => (
          <div key={`timegroup-${group.start}-${group.end}`} style={{position: 'absolute', top: '0', left: `${group.left}px`}}>
            <ItemGroup {...this.props} items={group.items} canvasTimeStart={group.start} canvasTimeEnd={group.start + canvasTimeLength} groupOrders={groupOrders} />
          </div>
        ))}
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

  keys: React.PropTypes.object.isRequired,

  itemSelect: React.PropTypes.func,
  itemDrag: React.PropTypes.func,
  itemDrop: React.PropTypes.func,
  itemResizing: React.PropTypes.func,
  itemResized: React.PropTypes.func
}
Items.defaultProps = {
}
