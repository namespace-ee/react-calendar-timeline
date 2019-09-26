import React, { useContext } from 'react'
import TimelineStateContext from '../timeline/TimelineStateContext'
import Columns from '../columns/Columns'
import { _get, _length } from '../utility/generic'
import GroupRow from '../row/GroupRow'
import Items from '../items/Items'

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
  groupsWithItemsDimensions,
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
    const group = groupsWithItemsDimensions[groupId]
    const itemDimensions = group.itemDimensions.find(i => i.id === itemId)
    if (itemDimensions) return itemDimensions.dimensions
    else return undefined
  }

  function getItemAbsoluteLocation(item) {
    const itemId = _get(item, keys.itemIdKey)
    const groupId = _get(item, keys.itemGroupKey)
    const group = groupsWithItemsDimensions[groupId]
    const itemDimensions = group.itemDimensions.find(i => i.id === itemId)
    const groupIndex = group.index
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
        const groupId = _get(groups[i], keys.groupIdKey)
        const group = groupsWithItemsDimensions[groupId]
        return (
          <GroupRow
            clickTolerance={clickTolerance}
            onContextMenu={evt => onRowContextClick(evt, i)}
            onClick={evt => onRowClick(evt, i)}
            onDoubleClick={evt => onRowDoubleClick(evt, i)}
            key={`horizontal-line-${groupId}`}
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
              <Items
                groups={groups}
                items={items}
                canvasTimeStart={canvasTimeStart}
                canvasTimeEnd={canvasTimeEnd}
                canvasWidth={canvasWidth}
                dragSnap={dragSnap}
                minResizeWidth={minResizeWidth}
                selectedItem={selectedItem}
                canChangeGroup={canChangeGroup}
                canMove={canMove}
                canResize={canResize}
                canSelect={canSelect}
                keys={keys}
                moveResizeValidator={moveResizeValidator}
                itemSelect={itemSelect}
                itemDrag={itemDrag}
                itemDrop={itemDrop}
                itemResizing={itemResizing}
                itemResized={itemResized}
                onItemDoubleClick={onItemDoubleClick}
                onItemContextMenu={onItemContextMenu}
                itemRenderer={itemRenderer}
                selected={selected}
                groupDimensions={group}
                groupTops={groupTops}
                useResizeHandle={useResizeHandle}
                scrollRef={scrollRef}
                order={group}
              />
              <Layers
                getLayerRootProps={getLayerRootProps}
                helpers={{
                  getLeftOffsetFromDate,
                  getDateFromLeftOffsetPosition,
                  getItemAbsoluteLocation,
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
