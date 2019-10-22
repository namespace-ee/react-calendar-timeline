import React from 'react'
import TimelineStateContext from '../timeline/TimelineStateContext'
import { _get, _length } from '../utility/generic'
import { ItemsContextProvider } from '../items/ItemsContext'
import { GroupRowContextProvider } from './GroupRowContext'

class Rows extends React.PureComponent {
  static contextType = TimelineStateContext

  initState = {
    dragging: false,
    resizing: false,
    dragOffset: 0,
    interactingItemId: undefined
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

  handleResizeEnd = (itemId, resizeTime, resizeEdge, timeDelta) => {
    this.props.itemResized(itemId, resizeTime, resizeEdge, timeDelta)
    this.clearState()
  }

  handleDragEnd = () => {
    this.clearState()
  }

  handleResizeStart = (resizing, itemId) => {
    this.setState({
      resizing,
      interactingItemId: itemId
    })
  }

  //TODO: make this faster
  getGroupByItemId = itemId => {
    const { items, keys } = this.props
    const item = items.find(i => _get(i, keys.itemIdKey) === itemId)
    const groupId = _get(item, keys.itemGroupKey)
    return groupId
  }

  getItemDimensionsHelper = itemId => {
    const { groupsWithItemsDimensions } = this.props
    const groupId = this.getGroupByItemId(itemId)
    const group = groupsWithItemsDimensions[groupId]
    const itemDimensions = group.itemDimensions.find(i => i.id === itemId)
    if (itemDimensions) return itemDimensions.dimensions
    else return undefined
  }

  getItemAbsoluteLocation = itemId => {
    const { groupsWithItemsDimensions } = this.props
    const { groupHeights } = this.props
    const groupId = this.getGroupByItemId(itemId)
    const group = groupsWithItemsDimensions[groupId]
    const itemDimensions = group.itemDimensions.find(i => i.id === itemId)
    if (!itemDimensions) return
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

  getLayerRootProps = () => {
    return {
      style: {
        // height: '100%'
      }
    }
  }

  render() {
    const {
      groupHeights,
      groups,
      itemRenderer,
      canChangeGroup,
      canMove,
      canResize,
      canSelect,
      useResizeHandle,
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
      onRowContextClick,
      items,
      keys,
      resizeEdge,
    } = this.props
    const { getLeftOffsetFromDate, getDateFromLeftOffsetPosition } = this.context
    return (
      <div style={{ position: 'absolute', top: 0 }}>
        {groupHeights.map((groupHeight, i) => {
          const groupId = _get(groups[i], keys.groupIdKey)
          const group = groupsWithItemsDimensions[groupId]
          return (
            <Group
              key={`horizontal-line-${groupId}`}
              clickTolerance={clickTolerance}
              onRowContextClick={onRowContextClick}
              onRowClick={onRowClick}
              onRowDoubleClick={onRowDoubleClick}
              index={i}
              groups={groups}
              horizontalLineClassNamesForGroup={
                horizontalLineClassNamesForGroup
              }
              groupHeight={groupHeight}
              minUnit={minUnit}
              timeSteps={timeSteps}
              verticalLineClassNamesForTime={verticalLineClassNamesForTime}
              group={group}
              dragSnap={dragSnap}
              minResizeWidth={minResizeWidth}
              selectedItem={selectedItem}
              canChangeGroup={canChangeGroup}
              canMove={canMove}
              canResize={canResize}
              canSelect={canSelect}
              moveResizeValidator={moveResizeValidator}
              itemSelect={itemSelect}
              itemDrag={itemDrag}
              itemDrop={itemDrop}
              itemResizing={itemResizing}
              onItemDoubleClick={onItemDoubleClick}
              onItemContextMenu={onItemContextMenu}
              itemRenderer={itemRenderer}
              selected={selected}
              useResizeHandle={useResizeHandle}
              scrollRef={scrollRef}
              resizeEdge={resizeEdge}
              Layers={Layers}
              getLeftOffsetFromDate={getLeftOffsetFromDate}
              rowData={rowData}
              items={items}
              itemResized={this.handleResizeEnd}
              onDragStart={this.handleDragStart}
              onDragEnd={this.handleDragEnd}
              onResizeStart={this.handleResizeStart}
              dragging={this.state.dragging}
              resizing={this.state.resizing}
              dragOffset={this.state.dragOffset}
              interactingItemId={this.state.interactingItemId}
              getLayerRootProps={this.getLayerRootProps}
              getDateFromLeftOffsetPosition={getDateFromLeftOffsetPosition}
              getItemAbsoluteLocation={this.getItemAbsoluteLocation}
              getItemDimensions={this.getItemDimensionsHelper}
            />
          )
        })}
      </div>
    )
  }
}

class Group extends React.PureComponent {

  render() {
    const {
      clickTolerance,
      onRowContextClick,
      onRowClick,
      onRowDoubleClick,
      index,
      groups,
      horizontalLineClassNamesForGroup,
      groupHeight,
      minUnit,
      timeSteps,
      verticalLineClassNamesForTime,
      group,
      dragSnap,
      minResizeWidth,
      selectedItem,
      canChangeGroup,
      canMove,
      canResize,
      canSelect,
      moveResizeValidator,
      itemSelect,
      itemDrag,
      itemDrop,
      itemResizing,
      onItemDoubleClick,
      onItemContextMenu,
      itemRenderer,
      selected,
      useResizeHandle,
      scrollRef,
      resizeEdge,
      Layers,
      getLeftOffsetFromDate,
      rowData,
      items,
      itemResized,
      onDragStart,
      onDragEnd,
      onResizeStart,
      dragging,
      resizing,
      dragOffset,
      interactingItemId,
      getLayerRootProps,
      getDateFromLeftOffsetPosition,
      getItemAbsoluteLocation,
      getItemDimensions
    } = this.props

    return (
      <GroupRowContextProvider
        clickTolerance={clickTolerance}
        onContextMenu={onRowContextClick}
        onClick={onRowClick}
        onDoubleClick={onRowDoubleClick}
        isEvenRow={index % 2 === 0}
        group={groups[index]}
        horizontalLineClassNamesForGroup={horizontalLineClassNamesForGroup}
        groupHeight={groupHeight}
        groupIndex={index}
      >
          <ItemsContextProvider
            //TODO: fix groups with no items
            items={group.items || []}
            groupDimensions={group}
            dragSnap={dragSnap}
            minResizeWidth={minResizeWidth}
            selectedItem={selectedItem}
            canChangeGroup={canChangeGroup}
            canMove={canMove}
            canResize={canResize}
            canSelect={canSelect}
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
            useResizeHandle={useResizeHandle}
            scrollRef={scrollRef}
            order={group}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onResizeStart={onResizeStart}
            resizeEdge={resizeEdge}
            dragging={dragging}
            resizing={resizing}
            dragOffset={dragOffset}
            interactingItemId={interactingItemId}
          >
            <Layers
              getLayerRootProps={getLayerRootProps}
              helpers={{
                getLeftOffsetFromDate: getLeftOffsetFromDate,
                getDateFromLeftOffsetPosition: getDateFromLeftOffsetPosition,
                getItemAbsoluteLocation: getItemAbsoluteLocation,
                getItemDimensions: getItemDimensions
              }}
              rowData={rowData}
              group={group.group}
              itemsWithInteractions={items}
            />
          </ItemsContextProvider>
      </GroupRowContextProvider>
    )
  }
}

export default Rows
