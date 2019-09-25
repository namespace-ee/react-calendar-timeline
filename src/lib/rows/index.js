import React, { useContext } from 'react'
import TimelineStateContext from '../timeline/TimelineStateContext'
import Columns from '../columns/Columns'
import {
  getVisibleItems,
  getGroupOrders,
  getItemDimensions,
  stackGroup
} from '../utility/calendar'
import { _get, _length } from '../utility/generic'
import Item from '../items/Item'
import GroupRow from '../row/GroupRow'

export default ({
  groupHeights,
  items,
  groups,
  itemRenderer,
  lineHeight,
  itemHeightRatio,
  stackItems,
  canChangeGroup,
  canMove,
  canResize,
  canSelect,
  useResizeHandle,
  groupTops,
  dragSnap,
  minResizeWidth,
  itemResizing,
  moveResizeValidator,
  itemDrag,
  itemDrop,
  onItemDoubleClick,
  onItemContextMenu,
  itemSelect,
  scrollRef,
  itemResized,
  selected,
  selectedItem,
  verticalLineClassNamesForTime,
  timeSteps,
  minUnit,
  rowRenderer: Layers,
  rowData,
  //row props
  clickTolerance,
  onRowClick,
  onRowDoubleClick,
  horizontalLineClassNamesForGroup,
  onRowContextClick
}) => {
  const {
    getTimelineState,
    getLeftOffsetFromDate,
    getDateFromLeftOffsetPosition
  } = useContext(TimelineStateContext)
  const {
    visibleTimeStart,
    visibleTimeEnd,
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
    timelineUnit,
    timelineWidth,
    keys
  } = getTimelineState()
  const visableItems = getVisibleItems(
    items,
    canvasTimeStart,
    canvasTimeEnd,
    keys
  )
  const groupOrders = getGroupOrders(groups, keys)
  const groupsWithItems = getGroupsWithItemDimensions(
    groupOrders,
    visableItems,
    keys,
    lineHeight,
    itemHeightRatio,
    stackItems,
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth
  )

  function getLayerRootProps() {
    return {
      style: {
        // height: '100%'
      }
    }
  }

  function getItemDimensionsHelper(item) {
    const itemId = _get(item, keys.itemIdKey)
    const groupId = _get(item, keys.itemGroupKey)
    const groupIndex = groupOrders[groupId].index
    const group = groupsWithItems[groupIndex]
    const itemDimensions = group.itemDimensions.find(i => i.id === itemId)
    if (itemDimensions) return itemDimensions.dimensions
    else return undefined
  }

  function getItemAbslouteLocation(item) {
    const itemId = _get(item, keys.itemIdKey)
    const groupId = _get(item, keys.itemGroupKey)
    const groupIndex = groupOrders[groupId].index
    const group = groupsWithItems[groupIndex]
    const itemDimensions = group.itemDimensions.find(i => i.id === itemId)
    const groupTop = groupHeights.reduce((acc, height, index) => {
      if (index < groupIndex) return acc + height
      else return acc
    }, 0)
    return {
      left: itemDimensions.dimensions.left,
      top: groupTop + itemDimensions.dimensions.top
    }
  }

  return (
    <div style={{ position: 'absolute', top: 0 }}>
      {groupHeights.map((groupHeight, i) => {
        const group = groupsWithItems[i]
        return (
          <GroupRow
            clickTolerance={clickTolerance}
            onContextMenu={evt => onRowContextClick(evt, i)}
            onClick={evt => onRowClick(evt, i)}
            onDoubleClick={evt => onRowDoubleClick(evt, i)}
            key={`horizontal-line-${i}`}
            isEvenRow={i % 2 === 0}
            group={groups[i]}
            horizontalLineClassNamesForGroup={horizontalLineClassNamesForGroup}
            style={{
              width: canvasWidth,
              height: groupHeight,
              background: 'lightgray',
              border: '1px solid blue',
              position: 'relative'
            }}
          >
              <React.Fragment>
                <Columns
                  canvasTimeStart={canvasTimeStart}
                  canvasTimeEnd={canvasTimeEnd}
                  canvasWidth={canvasWidth}
                  lineCount={_length(groups)}
                  minUnit={minUnit}
                  timeSteps={timeSteps}
                  height={groupHeight}
                  verticalLineClassNamesForTime={verticalLineClassNamesForTime}
                />
                <div>
                  {group.items.map((item, y) => {
                    return (
                      <Item
                        key={_get(item, keys.itemIdKey)}
                        item={item}
                        keys={keys}
                        order={groupOrders[_get(item, keys.itemGroupKey)]}
                        dimensions={
                          group.itemDimensions.find(
                            itemDimension =>
                              itemDimension.id === _get(item, keys.itemIdKey)
                          ).dimensions
                        }
                        canChangeGroup={
                          _get(item, 'canChangeGroup') !== undefined
                            ? _get(item, 'canChangeGroup')
                            : canChangeGroup
                        }
                        canMove={
                          _get(item, 'canMove') !== undefined
                            ? _get(item, 'canMove')
                            : canMove
                        }
                        canResizeLeft={canResizeLeft(item, canResize)}
                        canResizeRight={canResizeRight(item, canResize)}
                        canSelect={
                          _get(item, 'canSelect') !== undefined
                            ? _get(item, 'canSelect')
                            : canSelect
                        }
                        useResizeHandle={useResizeHandle}
                        groupTops={groupTops}
                        canvasTimeStart={canvasTimeStart}
                        canvasTimeEnd={canvasTimeEnd}
                        canvasWidth={canvasWidth}
                        dragSnap={dragSnap}
                        minResizeWidth={minResizeWidth}
                        onResizing={itemResizing}
                        onResized={itemResized}
                        moveResizeValidator={moveResizeValidator}
                        onDrag={itemDrag}
                        onDrop={itemDrop}
                        onItemDoubleClick={onItemDoubleClick}
                        onContextMenu={onItemContextMenu}
                        onSelect={itemSelect}
                        itemRenderer={itemRenderer}
                        scrollRef={scrollRef}
                        selected={isSelected(
                          item,
                          keys.itemIdKey,
                          selectedItem,
                          selected
                        )}
                      />
                    )
                  })}
                </div>
                <Layers
                  getLayerRootProps={getLayerRootProps}
                  helpers={{
                    getLeftOffsetFromDate,
                    getDateFromLeftOffsetPosition,
                    getItemAbslouteLocation,
                    getItemDimensions: getItemDimensionsHelper
                  }}
                  rowData={rowData}
                  group={group.group}
                />
              </React.Fragment>
          </GroupRow>
        )
      })}
    </div>
  )
}

function getGroupsWithItems(groupOrders, items, keys) {
  const groupedItems = {}
  const groupKeys = Object.keys(groupOrders)
  // Initialize with result object for each group
  for (let i = 0; i < groupKeys.length; i++) {
    const groupOrder = groupOrders[groupKeys[i]]
    groupedItems[i] = {
      index: groupOrder.index,
      group: groupOrder.group,
      items: items.filter(
        item =>
          _get(item, keys.itemGroupKey) ===
          _get(groupOrder.group, keys.groupIdKey)
      )
    }
  }
  return groupedItems
}

function getGroupsWithItemDimensions(
  groupOrders,
  items,
  keys,
  lineHeight,
  itemHeightRatio,
  stackItems,
  canvasTimeStart,
  canvasTimeEnd,
  canvasWidth
) {
  const groupsWithItems = getGroupsWithItems(groupOrders, items, keys)
  const groupKeys = Object.keys(groupsWithItems)
  return groupKeys.map(groupKey => {
    const group = groupsWithItems[groupKey]
    const itemDimensions = group.items.map(item => {
      return getItemDimensions({
        item,
        keys,
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth,
        groupOrders: {},
        lineHeight,
        itemHeightRatio
      })
    })

    const { groupHeight } = stackGroup(
      itemDimensions,
      stackItems,
      lineHeight,
      0
    )
    return {
      ...group,
      itemDimensions: itemDimensions,
      height: groupHeight
    }
  })
}

function canResizeLeft(item, canResize) {
  const value =
    _get(item, 'canResize') !== undefined ? _get(item, 'canResize') : canResize
  return value === 'left' || value === 'both'
}

function canResizeRight(item, canResize) {
  const value =
    _get(item, 'canResize') !== undefined ? _get(item, 'canResize') : canResize
  return value === 'right' || value === 'both' || value === true
}

function isSelected(item, itemIdKey, selectedItem, selected) {
  if (!selected) {
    return selectedItem === _get(item, itemIdKey)
  } else {
    let target = _get(item, itemIdKey)
    return selected.includes(target)
  }
}
