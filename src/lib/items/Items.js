import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Item from './Item'
// import ItemGroup from './ItemGroup'

import { _get, arraysEqual, keyBy } from '../utility/generic'
import { getGroupOrders, getVisibleItems } from '../utility/calendar'

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
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,

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

    groupDimensions: PropTypes.object,
    useResizeHandle: PropTypes.bool,
    scrollRef: PropTypes.object,
    order: PropTypes.object
  }

  static defaultProps = {
    selected: []
  }

  initState = {
    dragging: false,
    resizing: false,
    dragOffset: 0,
    //TODO: exist in Timeline but needs to be passed here through prop drilling (might consider)
    resizeEdge: null,
    resizeStart: null,
    interactingItemId: undefined,
  }

  state = this.initState

  handleDragStart = (dragging, dragOffset, itemId) => {
    this.setState({
      dragging,
      dragOffset,
      interactingItemId: itemId
    })
  }

  clearState = () => {
    this.setState(this.initState)
  }

  handleResizeStart = (resizing, resizeEdge, resizeStart, itemId) => {
    this.setState({
      resizing,
      resizeEdge,
      resizeStart,
      interactingItemId: itemId
    })
  }

  handleResizeMove = (itemId, resizeTime, resizeEdge) =>{
    this.props.itemResizing(itemId, resizeTime, resizeEdge)
    this.setState({resizeEdge})
  }

  handleResizeEnd = (itemId, resizeTime, resizeEdge, timeDelta) => {
    this.props.itemResized(itemId, resizeTime, resizeEdge, timeDelta)
    this.clearState()
  }

  handleDragEnd = () => {
    this.clearState()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      arraysEqual(nextProps.items, this.props.items) &&
      nextProps.groupDimensions === this.props.groupDimensions &&
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
      nextState.canSelect === this.state.canSelect &&
      nextState.dragging === this.state.dragging &&
      nextState.resizing === this.state.resizing &&
      nextState.resizeEdge === this.state.resizeEdge &&
      nextState.resizeStart === this.state.resizeStart &&
      nextState.interactingItemId === this.state.interactingItemId
    )
  }

  isSelected(item, itemIdKey) {
    if (!this.props.selected) {
      return this.props.selectedItem === _get(item, itemIdKey)
    } else {
      let target = _get(item, itemIdKey)
      return this.props.selected.includes(target)
    }
  }

  isInteractingItem = (item) => {
    return this.state.interactingItemId === _get(item, this.props.keys.itemIdKey)
  }

  render() {
    const {
      canvasTimeStart,
      canvasTimeEnd,
      dimensionItems,
      keys,
      groupDimensions,
      order,
      items
    } = this.props
    const { itemIdKey, itemGroupKey } = keys

    return (
      <div className="rct-items">
        {items.map((item, i) => {
          const isInteractingItem = this.isInteractingItem(item)
          return (
          <Item
            key={_get(item, itemIdKey)}
            item={item}
            keys={this.props.keys}
            order={order}
            dimensions={groupDimensions.itemDimensions[i].dimensions}
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
            canvasTimeStart={this.props.canvasTimeStart}
            canvasTimeEnd={this.props.canvasTimeEnd}
            canvasWidth={this.props.canvasWidth}
            dragSnap={this.props.dragSnap}
            minResizeWidth={this.props.minResizeWidth}
            onResizing={this.handleResizeMove}
            onResized={this.handleResizeEnd}
            moveResizeValidator={this.props.moveResizeValidator}
            onDrag={this.props.itemDrag}
            onDrop={this.props.itemDrop}
            onItemDoubleClick={this.props.onItemDoubleClick}
            onContextMenu={this.props.onItemContextMenu}
            onSelect={this.props.itemSelect}
            itemRenderer={this.props.itemRenderer}
            scrollRef={this.props.scrollRef}
            dragging={isInteractingItem && this.state.dragging}
            resizing={isInteractingItem && this.state.resizing}
            dragOffset={isInteractingItem && this.state.dragOffset}
            resizeEdge={isInteractingItem && this.state.resizeEdge}
            resizeStart={isInteractingItem && this.state.resizeStart}
            onDragStart={this.handleDragStart}
            onDragEnd={this.handleDragEnd}
            onResizeStart={this.handleResizeStart}
          />
        )})}
      </div>
    )
  }
}
