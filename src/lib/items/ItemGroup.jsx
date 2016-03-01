import React, { Component } from 'react'
import Item from './Item'

import { _get, arraysEqual } from '../utils'

export default class ItemGroup extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !(arraysEqual(nextProps.groups, this.props.groups) &&
             arraysEqual(nextProps.items, this.props.items) &&
             arraysEqual(Object.keys(nextProps.groupOrders), Object.keys(this.props.groupOrders)) &&
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

  render () {
    // const { canvasTimeStart, canvasTimeEnd } = this.props
    const { itemIdKey, itemGroupKey } = this.props.keys

    const groupOrders = this.props.groupOrders
    const visibleItems = this.props.items

    return (
      <div className='rct-item-group'>
        {visibleItems.map(item => <Item key={_get(item, itemIdKey)}
                                        item={item}
                                        keys={this.props.keys}
                                        order={groupOrders[_get(item, itemGroupKey)]}
                                        selected={this.props.selectedItem === _get(item, itemIdKey)}
                                        canChangeGroup={_get(item, 'canChangeGroup') !== undefined ? _get(item, 'canChangeGroup') : this.props.canChangeGroup}
                                        canMove={_get(item, 'canMove') !== undefined ? _get(item, 'canMove') : this.props.canMove}
                                        canResize={_get(item, 'canResize') !== undefined ? _get(item, 'canResize') : this.props.canResize}
                                        canvasTimeStart={this.props.canvasTimeStart}
                                        canvasTimeEnd={this.props.canvasTimeEnd}
                                        canvasWidth={this.props.canvasWidth}
                                        lineHeight={this.props.lineHeight}
                                        dragSnap={this.props.dragSnap}
                                        minResizeWidth={this.props.minResizeWidth}
                                        onResizing={this.props.itemResizing}
                                        onResized={this.props.itemResized}
                                        onDrag={this.props.itemDrag}
                                        onDrop={this.props.itemDrop}
                                        onSelect={this.props.itemSelect}/>)}
      </div>
    )
  }
}

// they were all checked in Items
ItemGroup.propTypes = {
  // groups: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]).isRequired,
  // items: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]).isRequired,
  // groupOrders: React.PropTypes.object.isRequired,
  //
  // canvasTimeStart: React.PropTypes.number.isRequired,
  // canvasTimeEnd: React.PropTypes.number.isRequired,
  // canvasWidth: React.PropTypes.number.isRequired,
  // lineHeight: React.PropTypes.number.isRequired,
  //
  // dragSnap: React.PropTypes.number,
  // minResizeWidth: React.PropTypes.number,
  // selectedItem: React.PropTypes.string,
  //
  // canChangeGroup: React.PropTypes.bool.isRequired,
  // canMove: React.PropTypes.bool.isRequired,
  // canResize: React.PropTypes.bool.isRequired,
  //
  // keys: React.PropTypes.object.isRequired,
  //
  // itemSelect: React.PropTypes.func,
  // itemDrag: React.PropTypes.func,
  // itemDrop: React.PropTypes.func,
  // itemResizing: React.PropTypes.func,
  // itemResized: React.PropTypes.func
}
ItemGroup.defaultProps = {
}
