import { Component } from 'react'
import Item, { ItemProps } from './Item'
import { _get, arraysEqual, keyBy } from '../utility/generic'
import { getGroupOrders, getVisibleItems } from '../utility/calendar'
import { Id, TimelineGroupBase, TimelineItemBase, TimelineKeys } from '../types/main'
import { ItemDimension } from '../types/dimension'

export type CanResize = true | false | 'left' | 'right' | 'both'
type ItemsProps<CustomItem extends TimelineItemBase<number>> = {
  groups: TimelineGroupBase[]
  items: CustomItem[]
  dimensionItems: ItemDimension[]
  selected?: Id[]

  canvasTimeStart: number
  canvasTimeEnd: number
  canvasWidth: number

  dragSnap?: number
  minResizeWidth?: number
  selectedItem?: Id

  canChangeGroup?: boolean
  canMove?: boolean
  canResize?: CanResize
  canSelect?: boolean
  keys: TimelineKeys
  moveResizeValidator?: ItemProps<CustomItem>['moveResizeValidator']
  itemSelect: ItemProps<CustomItem>['onSelect']
  itemDrag: ItemProps<CustomItem>['onDrag']
  itemDrop: ItemProps<CustomItem>['onDrop']
  itemResizing: ItemProps<CustomItem>['onResizing']
  itemResized: ItemProps<CustomItem>['onResized']
  onItemDoubleClick: ItemProps<CustomItem>['onItemDoubleClick']
  onItemContextMenu?: ItemProps<CustomItem>['onContextMenu']
  itemRenderer?: ItemProps<CustomItem>['itemRenderer']
  groupTops: number[]
  useResizeHandle?: boolean
  scrollRef: HTMLElement | null
  // Add more props if needed
}

type ItemsState = object

function canResizeLeft<CustomItem extends TimelineItemBase<number>>(item: CustomItem, canResize?: CanResize) {
  const value = _get(item, 'canResize') !== undefined ? _get(item, 'canResize') : canResize
  return value === 'left' || value === 'both'
}

function canResizeRight<CustomItem extends TimelineItemBase<number>>(item: CustomItem, canResize?: CanResize) {
  const value = _get(item, 'canResize') !== undefined ? _get(item, 'canResize') : canResize
  return value === 'right' || value === 'both' || value === true
}

export default class Items<CustomItem extends TimelineItemBase<number>> extends Component<
  ItemsProps<CustomItem>,
  ItemsState
> {
  shouldComponentUpdate(nextProps: ItemsProps<CustomItem>) {
    return !(
      arraysEqual(nextProps.groups, this.props.groups) &&
      arraysEqual(nextProps.items, this.props.items) &&
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

  isSelected(item: CustomItem, itemIdKey: string) {
    if (!this.props.selected) {
      return this.props.selectedItem === _get(item, itemIdKey)
    } else {
      const target = _get(item, itemIdKey) as string | number
      return this.props.selected.includes(target)
    }
  }

  getVisibleItems(canvasTimeStart: number, canvasTimeEnd: number) {
    const { keys, items } = this.props

    return getVisibleItems(items, canvasTimeStart, canvasTimeEnd, keys)
  }

  render() {
    const { canvasTimeStart, canvasTimeEnd, dimensionItems, keys, groups } = this.props
    const { itemIdKey, itemGroupKey } = keys

    const groupOrders = getGroupOrders(groups, keys)
    const visibleItems = this.getVisibleItems(canvasTimeStart, canvasTimeEnd)
    const sortedDimensionItems = keyBy(dimensionItems, 'id')

    return (
      <div className="rct-items">
        {visibleItems
          .filter((item) => sortedDimensionItems[_get(item, itemIdKey)])
          .map((item) => (
            <Item
              itemProps={item.itemProps}
              key={_get(item, itemIdKey)}
              item={item}
              keys={this.props.keys}
              order={groupOrders[_get(item, itemGroupKey)]}
              dimensions={sortedDimensionItems[_get(item, itemIdKey)].dimensions}
              selected={this.isSelected(item, itemIdKey)}
              canChangeGroup={
                _get(item, 'canChangeGroup') !== undefined ? _get(item, 'canChangeGroup') : this.props.canChangeGroup
              }
              canMove={_get(item, 'canMove') !== undefined ? _get(item, 'canMove') : this.props.canMove}
              canResizeLeft={canResizeLeft(item, this.props.canResize)}
              canResizeRight={canResizeRight(item, this.props.canResize)}
              canSelect={_get(item, 'canSelect') !== undefined ? _get(item, 'canSelect') : this.props.canSelect}
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
              onItemDoubleClick={this.props.onItemDoubleClick}
              onContextMenu={this.props.onItemContextMenu}
              onSelect={this.props.itemSelect}
              itemRenderer={this.props.itemRenderer}
              scrollRef={this.props.scrollRef}
            />
          ))}
      </div>
    )
  }
}
