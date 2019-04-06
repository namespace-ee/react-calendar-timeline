import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Item from './Item'
// import ItemGroup from './ItemGroup'

import { _get, arraysEqual, keyBy } from '../utility/generic'
import { getGroupOrders, getVisibleItems } from '../utility/calendar'
import Connection from './Connection';

const canResizeLeft = (item, canResize) => {
  const value =
    _get(item, 'canResize') !== undefined ? _get(item, 'canResize') : canResize
  return value === 'left' || value === 'both'
}

const canResizeRight = (item, canResize) => {
  const value =
    _get(item, 'canResize') !== undefined ? _get(item, 'canResize') : canResize
  return value === 'right' || value === 'both' || value === true
}

export default class Items extends Component {
  static propTypes = {
    groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    connections: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,

    dragSnap: PropTypes.number,
    minResizeWidth: PropTypes.number,
    selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    canChangeGroup: PropTypes.bool.isRequired,
    canMove: PropTypes.bool.isRequired,
    canResize: PropTypes.oneOf([true, false, 'left', 'right', 'both']),
    canSelect: PropTypes.bool,

    keys: PropTypes.object.isRequired,

    moveResizeValidator: PropTypes.func,
    itemSelect: PropTypes.func,
    itemDrag: PropTypes.func,
    itemDrop: PropTypes.func,
    itemResizing: PropTypes.func,
    itemResized: PropTypes.func,

    onItemDoubleClick: PropTypes.func,
    onItemContextMenu: PropTypes.func,

    itemRenderer: PropTypes.func,
    selected: PropTypes.array,

    dimensionItems: PropTypes.array,
    groupTops: PropTypes.array,
    useResizeHandle: PropTypes.bool,
    scrollRef: PropTypes.object
  }

  static defaultProps = {
    selected: []
  }

  shouldComponentUpdate(nextProps) {
    return !(
      arraysEqual(nextProps.groups, this.props.groups) &&
      arraysEqual(nextProps.items, this.props.items) &&
      arraysEqual(nextProps.connections, this.props.connections) &&
      arraysEqual(nextProps.dimensionItems, this.props.dimensionItems) &&
      nextProps.keys === this.props.keys &&
      nextProps.canvasTimeStart === this.props.canvasTimeStart &&
      nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
      nextProps.canvasWidth === this.props.canvasWidth &&
      nextProps.selectedItem === this.props.selectedItem &&
      nextProps.selected === this.props.selected &&
      nextProps.dragSnap === this.props.dragSnap &&
      nextProps.minResizeWidth === this.props.minResizeWidth &&
      nextProps.canChangeGroup === this.props.canChangeGroup &&
      nextProps.canMove === this.props.canMove &&
      nextProps.canResize === this.props.canResize &&
      nextProps.canSelect === this.props.canSelect
    )
  }

  getGroupOrders() {
    const { keys, groups } = this.props

    return getGroupOrders(groups, keys)
  }

  isSelected(item, itemIdKey) {
    if (!this.props.selected) {
      return this.props.selectedItem === _get(item, itemIdKey)
    } else {
      let target = _get(item, itemIdKey)
      return this.props.selected.includes(target)
    }
  }

  isLineSelected(line) {
    if (!this.props.selected) {
      return false
    } else {
      return this.props.selected.includes(line.startId) || this.props.selected.includes(line.endId)
    }
  }

  calcDimensionConnections(items,connections){
    function calculate(id, start, end, warning){
      const { top: st, left: sl, width: sw, height: sh } = start.dimensions
      const { top: et, left: el, height: eh } = end.dimensions

      const startX = sl + sw
      const startY = st + sh/2
      const endX = el
      const endY = et + eh/2
      const width = Math.abs(endX-startX)

      const startPoint = [startX, startY];
      const controlPoint = [startX + width/2 ,startY]
      const controlPoint2 = [endX - width/2 ,endY]
      const endPoint = [endX, endY];

      return {
        id,
        startId: start.id,
        endId: end.id,
        startPoint,
        controlPoint,
        controlPoint2,
        endPoint,
        warning,
      }
    }
    const lines = []
    for (const line of connections){
      if(!items[line.start] || !items[line.end]) continue
      lines.push(calculate(line.id, items[line.start], items[line.end],line.warning))
    }
    return lines

  }

  getVisibleItems(canvasTimeStart, canvasTimeEnd) {
    const { keys, items } = this.props

    return getVisibleItems(items, canvasTimeStart, canvasTimeEnd, keys)
  }

  render() {
    const {
      canvasTimeStart,
      canvasTimeEnd,
      dimensionItems,
      connections
    } = this.props

    const { itemIdKey, itemGroupKey } = this.props.keys
    
    const groupOrders = this.getGroupOrders()
    const visibleItems = this.getVisibleItems(
      canvasTimeStart,
      canvasTimeEnd,
      groupOrders
      )
      const sortedDimensionItems = keyBy(dimensionItems, 'id')
      const dimensionConnections = this.calcDimensionConnections(sortedDimensionItems,connections)
    // console.log('@@@@',sortedDimensionItems)

    return (
      <div className="rct-items">
        {visibleItems
          .filter(item => sortedDimensionItems[_get(item, itemIdKey)])
          .map(item => (
            <Item
              key={_get(item, itemIdKey)}
              item={item}
              keys={this.props.keys}
              order={groupOrders[_get(item, itemGroupKey)]}
              dimensions={
                sortedDimensionItems[_get(item, itemIdKey)].dimensions
              }
              selected={this.isSelected(item, itemIdKey)}
              canChangeGroup={
                _get(item, 'canChangeGroup') !== undefined
                  ? _get(item, 'canChangeGroup')
                  : this.props.canChangeGroup
              }
              canMove={
                _get(item, 'canMove') !== undefined
                  ? _get(item, 'canMove')
                  : this.props.canMove
              }
              canResizeLeft={canResizeLeft(item, this.props.canResize)}
              canResizeRight={canResizeRight(item, this.props.canResize)}
              canSelect={
                _get(item, 'canSelect') !== undefined
                  ? _get(item, 'canSelect')
                  : this.props.canSelect
              }
              useResizeHandle={this.props.useResizeHandle}
              groupTops={this.props.groupTops}
              canvasTimeStart={this.props.canvasTimeStart}
              canvasTimeEnd={this.props.canvasTimeEnd}
              canvasWidth={this.props.canvasWidth}
              dragSnap={this.props.dragSnap}
              minResizeWidth={this.props.minResizeWidth}
              onResizing={this.props.itemResizing}
              onResized={this.props.itemResized}
              moveResizeValidator={this.props.moveResizeValidator}
              onDrag={this.props.itemDrag}
              onDrop={this.props.itemDrop}
              onPointEnter={this.props.onPointEnter}
              onPointDrop={this.props.onPointDrop}
              onPointLeave={this.props.onPointLeave}
              onItemDoubleClick={this.props.onItemDoubleClick}
              onContextMenu={this.props.onItemContextMenu}
              onSelect={this.props.itemSelect}
              itemRenderer={this.props.itemRenderer}
              scrollRef={this.props.scrollRef}
            />
          ))}
          <svg
            id="svg-canvas"
            width="3000"
            viewBox={`0 0 3000 800`}
            style={{ zIndex: 70 ,position:'relative', marginTop:64}}
          >
            {dimensionConnections.map((line,i) => <Connection {...line} selected={this.isLineSelected(line)} key={i} />)}
          </svg>
      </div>
    )
  }
}
