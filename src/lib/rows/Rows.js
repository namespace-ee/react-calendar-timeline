import React from 'react'
import TimelineStateContext from '../timeline/TimelineStateContext'
import { _get, _length } from '../utility/generic'
import { ItemsContextProvider } from '../items/ItemsContext'
import { GroupRowContextProvider } from './GroupRowContext'

class Rows extends React.PureComponent {

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
