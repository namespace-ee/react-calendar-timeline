import moment from 'moment'
import { _get } from './generic'

/**
 * Calculate the ms / pixel ratio of the timeline state
 * @param {number} canvasTimeStart
 * @param {number} canvasTimeEnd
 * @param {number} canvasWidth
 * @returns {number}
 */
export function coordinateToTimeRatio(
  canvasTimeStart,
  canvasTimeEnd,
  canvasWidth
) {
  return (canvasTimeEnd - canvasTimeStart) / canvasWidth
}

/**
 * For a given time, calculate the pixel position given timeline state
 * (timeline width in px, canvas time range)
 * @param {number} canvasTimeStart
 * @param {number} canvasTimeEnd
 * @param {number} canvasWidth
 * @param {number} time
 * @returns {number}
 */
export function calculateXPositionForTime(
  canvasTimeStart,
  canvasTimeEnd,
  canvasWidth,
  time
) {
  const widthToZoomRatio = canvasWidth / (canvasTimeEnd - canvasTimeStart)
  const timeOffset = time - canvasTimeStart

  return timeOffset * widthToZoomRatio
}

/**
 * For a given x position (leftOffset) in pixels, calculate time based on
 * timeline state (timeline width in px, canvas time range)
 * @param {number} canvasTimeStart
 * @param {number} canvasTimeEnd
 * @param {number} canvasWidth
 * @param {number} leftOffset
 * @returns {number}
 */
export function calculateTimeForXPosition(
  canvasTimeStart,
  canvasTimeEnd,
  canvasWidth,
  leftOffset
) {
  const timeToPxRatio = (canvasTimeEnd - canvasTimeStart) / canvasWidth

  const timeFromCanvasTimeStart = timeToPxRatio * leftOffset

  return timeFromCanvasTimeStart + canvasTimeStart
}

export function iterateTimes(start, end, unit, timeSteps, callback) {
  let time = moment(start).startOf(unit)

  if (timeSteps[unit] && timeSteps[unit] > 1) {
    let value = time.get(unit)
    time.set(unit, value - value % timeSteps[unit])
  }

  while (time.valueOf() < end) {
    let nextTime = moment(time).add(timeSteps[unit] || 1, `${unit}s`)
    callback(time, nextTime)
    time = nextTime
  }
}

// this function is VERY HOT as its used in Timeline.js render function
// TODO: check if there are performance implications here
// when "weeks" feature is implemented, this function will be modified heavily

/** determine the current rendered time unit based on timeline time span
 *
 * zoom: (in milliseconds) difference between time start and time end of timeline canvas
 * width: (in pixels) pixel width of timeline canvas
 * timeSteps: map of timeDividers with number to indicate step of each divider
 */

// the smallest cell we want to render is 17px
// this can be manipulated to make the breakpoints change more/less
// i.e. on zoom how often do we switch to the next unit of time
// i think this is the distance between cell lines
export const minCellWidth = 17

export function getMinUnit(zoom, width, timeSteps) {
  // for supporting weeks, its important to remember that each of these
  // units has a natural progression to the other. i.e. a year is 12 months
  // a month is 24 days, a day is 24 hours.
  // with weeks this isnt the case so weeks needs to be handled specially
  let timeDividers = {
    second: 1000,
    minute: 60,
    hour: 60,
    day: 24,
    month: 30,
    year: 12
  }

  let minUnit = 'year'

  // this timespan is in ms initially
  let nextTimeSpanInUnitContext = zoom

  Object.keys(timeDividers).some(unit => {
    // converts previous time span to current unit
    // (e.g. milliseconds to seconds, seconds to minutes, etc)
    nextTimeSpanInUnitContext = nextTimeSpanInUnitContext / timeDividers[unit]

    // timeSteps is "
    // With what step to display different units. E.g. 15 for minute means only minutes 0, 15, 30 and 45 will be shown."
    // how many cells would be rendered given this time span, for this unit?
    // e.g. for time span of 60 minutes, and time step of 1, we would render 60 cells
    const cellsToBeRenderedForCurrentUnit =
      nextTimeSpanInUnitContext / timeSteps[unit]

    // what is happening here? why 3 if time steps are greater than 1??
    const cellWidthToUse =
      timeSteps[unit] && timeSteps[unit] > 1 ? 3 * minCellWidth : minCellWidth

    // for the minWidth of a cell, how many cells would be rendered given
    // the current pixel width
    // i.e. f
    const minimumCellsToRenderUnit = width / cellWidthToUse

    if (cellsToBeRenderedForCurrentUnit < minimumCellsToRenderUnit) {
      // for the current zoom, the number of cells we'd need to render all parts of this unit
      // is less than the minimum number of cells needed at minimum cell width
      minUnit = unit
      return true
    }
  })

  return minUnit
}

export function getNextUnit(unit) {
  let nextUnits = {
    second: 'minute',
    minute: 'hour',
    hour: 'day',
    day: 'month',
    month: 'year',
    year: 'year'
  }
  if (!nextUnits[unit]) {
    throw new Error(`unit ${unit} in not acceptable`)
  }
  return nextUnits[unit]
}

/**
 * get the new start and new end time of item that is being
 * dragged or resized
 * @param {*} itemTimeStart original item time in milliseconds
 * @param {*} itemTimeEnd original item time in milliseconds
 * @param {*} dragTime new start time if item is dragged in milliseconds
 * @param {*} isDragging is item being dragged
 * @param {*} isResizing is item being resized
 * @param {`right` or `left`} resizingEdge resize edge
 * @param {*} resizeTime new resize time in milliseconds
 */
export function calculateInteractionNewTimes({
  itemTimeStart,
  itemTimeEnd,
  dragTime,
  isDragging,
  isResizing,
  resizingEdge,
  resizeTime
}) {
  const originalItemRange = itemTimeEnd - itemTimeStart
  const itemStart =
    isResizing && resizingEdge === 'left' ? resizeTime : itemTimeStart
  const itemEnd =
    isResizing && resizingEdge === 'right' ? resizeTime : itemTimeEnd
  return [
    isDragging ? dragTime : itemStart,
    isDragging ? dragTime + originalItemRange : itemEnd
  ]
}

export function calculateDimensions({
  itemTimeStart,
  itemTimeEnd,
  canvasTimeStart,
  canvasTimeEnd,
  canvasWidth
}) {
  const itemTimeRange = itemTimeEnd - itemTimeStart

  // restrict startTime and endTime to be bounded by canvasTimeStart and canvasTimeEnd
  const effectiveStartTime = Math.max(itemTimeStart, canvasTimeStart)
  const effectiveEndTime = Math.min(itemTimeEnd, canvasTimeEnd)

  const left = calculateXPositionForTime(
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
    effectiveStartTime
  )
  const right = calculateXPositionForTime(
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
    effectiveEndTime
  )
  const itemWidth = right - left

  const dimensions = {
    left: left,
    width: Math.max(itemWidth, 3),
    collisionLeft: itemTimeStart,
    collisionWidth: itemTimeRange
  }

  return dimensions
}

/**
 * Get the order of groups based on their keys
 * @param {*} groups array of groups
 * @param {*} keys the keys object
 * @returns Ordered hash of objects with their array index and group
 */
export function getGroupOrders(groups, keys) {
  const { groupIdKey } = keys

  let groupOrders = {}

  for (let i = 0; i < groups.length; i++) {
    groupOrders[_get(groups[i], groupIdKey)] = { index: i, group: groups[i] }
  }

  return groupOrders
}

/**
 * Adds items relevant to each group to the result of getGroupOrders
 * @param {*} items list of all items
 * @param {*} groupOrders the result of getGroupOrders
 */
export function getGroupedItems(items, groupOrders) {
  var groupedItems = {}
  var keys = Object.keys(groupOrders)
  // Initialize with result object for each group
  for (let i = 0; i < keys.length; i++) {
    const groupOrder = groupOrders[keys[i]]
    groupedItems[i] = {
      index: groupOrder.index,
      group: groupOrder.group,
      items: []
    }
  }

  // Populate groups
  for (let i = 0; i < items.length; i++) {
    if (items[i].dimensions.order !== undefined) {
      const groupItem = groupedItems[items[i].dimensions.order.index]
      if (groupItem) {
        groupItem.items.push(items[i])
      }
    }
  }

  return groupedItems
}

export function getVisibleItems(items, canvasTimeStart, canvasTimeEnd, keys) {
  const { itemTimeStartKey, itemTimeEndKey } = keys

  return items.filter(item => {
    return (
      _get(item, itemTimeStartKey) <= canvasTimeEnd &&
      _get(item, itemTimeEndKey) >= canvasTimeStart
    )
  })
}

const EPSILON = 0.001

export function collision(a, b, lineHeight, collisionPadding = EPSILON) {
  // 2d collisions detection - https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  var verticalMargin = 0

  return (
    a.collisionLeft + collisionPadding < b.collisionLeft + b.collisionWidth &&
    a.collisionLeft + a.collisionWidth - collisionPadding > b.collisionLeft &&
    a.top - verticalMargin + collisionPadding < b.top + b.height &&
    a.top + a.height + verticalMargin - collisionPadding > b.top
  )
}

/**
 * Calculate the position of a given item for a group that
 * is being stacked
 */
export function groupStack(
  lineHeight,
  item,
  group,
  groupHeight,
  groupTop,
  itemIndex
) {
  // calculate non-overlapping positions
  let curHeight = groupHeight
  let verticalMargin = (lineHeight - item.dimensions.height) / 2
  if (item.dimensions.stack && item.dimensions.top === null) {
    item.dimensions.top = groupTop + verticalMargin
    curHeight = Math.max(curHeight, lineHeight)
    do {
      var collidingItem = null
      //Items are placed from i=0 onwards, only check items with index < i
      for (var j = itemIndex - 1, jj = 0; j >= jj; j--) {
        var other = group[j]
        if (
          other.dimensions.top !== null &&
          other.dimensions.stack &&
          collision(item.dimensions, other.dimensions, lineHeight)
        ) {
          collidingItem = other
          break
        } else {
          // console.log('dont test', other.top !== null, other !== item, other.stack);
        }
      }

      if (collidingItem != null) {
        // There is a collision. Reposition the items above the colliding element
        item.dimensions.top = collidingItem.dimensions.top + lineHeight
        curHeight = Math.max(
          curHeight,
          item.dimensions.top + item.dimensions.height + verticalMargin - groupTop
        )
      }
    } while (collidingItem)
  }
  return {
    groupHeight: curHeight,
    verticalMargin,
    itemTop: item.dimensions.top
  }

}

// Calculate the position of this item for a group that is not being stacked
export function groupNoStack(lineHeight, item, groupHeight, groupTop) {
  let verticalMargin = (lineHeight - item.dimensions.height) / 2
  if (item.dimensions.top === null) {
    item.dimensions.top = groupTop + verticalMargin
    groupHeight = Math.max(groupHeight, lineHeight)
  }
  return { groupHeight, verticalMargin: 0, itemTop: item.dimensions.top }
}

function sum(arr = []) {
  return arr.reduce((acc, i) => acc + i, 0)
}

/**
 * Stack all groups
 * @param {*} items items to be stacked
 * @param {*} groupOrders the groupOrders object
 * @param {*} lineHeight
 * @param {*} stackItems should items be stacked?
 */
export function stackAll(itemsDimensions, groupOrders, lineHeight, stackItems) {
  var groupHeights = []
  var groupTops = []

  var groupedItems = getGroupedItems(itemsDimensions, groupOrders)

  for (var index in groupedItems) {
    const groupItems = groupedItems[index]
    const { items: itemsDimensions, group } = groupItems
    const groupTop = sum(groupHeights)

    // Is group being stacked?
    const isGroupStacked =
      group.stackItems !== undefined ? group.stackItems : stackItems
    const { groupHeight, verticalMargin } = stackGroup(
      itemsDimensions,
      isGroupStacked,
      lineHeight,
      groupTop
    )
    // If group height is overridden, push new height
    // Do this late as item position still needs to be calculated
    groupTops.push(groupTop)
    if (group.height) {
      groupHeights.push(group.height)
    } else {
      groupHeights.push(Math.max(groupHeight, lineHeight))
    }
  }
  
  return {
    height: sum(groupHeights),
    groupHeights,
    groupTops
  }
}

/**
 * 
 * @param {*} itemsDimensions 
 * @param {*} isGroupStacked 
 * @param {*} lineHeight 
 * @param {*} groupTop 
 */
export function stackGroup(itemsDimensions, isGroupStacked, lineHeight, groupTop) {
  var groupHeight = 0
  var verticalMargin = 0
  // Find positions for each item in group
  for (let itemIndex = 0; itemIndex < itemsDimensions.length; itemIndex++) {
    let r = {}
    if (isGroupStacked) {
      r = groupStack(
        lineHeight,
        itemsDimensions[itemIndex],
        itemsDimensions,
        groupHeight,
        groupTop,
        itemIndex
      )
    } else {
      r = groupNoStack(lineHeight, itemsDimensions[itemIndex], groupHeight, groupTop)
    }
    groupHeight = r.groupHeight
    verticalMargin = r.verticalMargin
  }
  return { groupHeight, verticalMargin }
}

/**
 * Stack the items that will be visible
 * within the canvas area
 * @param {item[]} items
 * @param {group[]} groups
 * @param {number} canvasWidth
 * @param {number} canvasTimeStart
 * @param {number} canvasTimeEnd
 * @param {*} keys
 * @param {number} lineHeight
 * @param {number} itemHeightRatio
 * @param {boolean} stackItems
 * @param {*} draggingItem
 * @param {*} resizingItem
 * @param {number} dragTime
 * @param {left or right} resizingEdge
 * @param {number} resizeTime
 * @param {number} newGroupOrder
 */
export function stackTimelineItems(
  items,
  groups,
  canvasWidth,
  canvasTimeStart,
  canvasTimeEnd,
  keys,
  lineHeight,
  itemHeightRatio,
  stackItems,
  draggingItem,
  resizingItem,
  dragTime,
  resizingEdge,
  resizeTime,
  newGroupOrder
) {
  const visibleItems = getVisibleItems(
    items,
    canvasTimeStart,
    canvasTimeEnd,
    keys
  )
  const visibleItemsWithInteraction = visibleItems.map(item =>
    getItemWithInteractions({
      item,
      keys,
      draggingItem,
      resizingItem,
      dragTime,
      resizingEdge,
      resizeTime,
      groups,
      newGroupOrder
    })
  )

  // if there are no groups return an empty array of dimensions
  if (groups.length === 0) {
    return {
      dimensionItems: [],
      height: 0,
      groupHeights: [],
      groupTops: []
    }
  }

  // Get the order of groups based on their id key
  const groupOrders = getGroupOrders(groups, keys)
  let dimensionItems = visibleItemsWithInteraction
    .map(item =>
      getItemDimensions({
        item,
        keys,
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth,
        groupOrders,
        lineHeight,
        itemHeightRatio
      })
    )
    .filter(item => !!item)
  // Get a new array of groupOrders holding the stacked items
  const { height, groupHeights, groupTops } = stackAll(
    dimensionItems,
    groupOrders,
    lineHeight,
    stackItems
  )
  return { dimensionItems, height, groupHeights, groupTops }
}

/**
 * get canvas width from visible width
 * @param {*} width
 * @param {*} buffer
 */
export function getCanvasWidth(width, buffer = 3) {
  return width * buffer
}

/**
 * get item's position, dimensions and collisions
 * @param {*} item
 * @param {*} keys
 * @param {*} canvasTimeStart
 * @param {*} canvasTimeEnd
 * @param {*} canvasWidth
 * @param {*} groupOrders
 * @param {*} lineHeight
 * @param {*} itemHeightRatio
 */
export function getItemDimensions({
  item,
  keys,
  canvasTimeStart,
  canvasTimeEnd,
  canvasWidth,
  groupOrders,
  lineHeight,
  itemHeightRatio
}) {
  const itemId = _get(item, keys.itemIdKey)
  let dimension = calculateDimensions({
    itemTimeStart: _get(item, keys.itemTimeStartKey),
    itemTimeEnd: _get(item, keys.itemTimeEndKey),
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth
  })
  if (dimension) {
    dimension.top = null
    dimension.order = groupOrders[_get(item, keys.itemGroupKey)]
    dimension.stack = !item.isOverlay
    dimension.height = lineHeight * itemHeightRatio
    return {
      id: itemId,
      dimensions: dimension
    }
  }
}

/**
 * get new item with changed  `itemTimeStart` , `itemTimeEnd` and `itemGroupKey` according to user interaction
 * user interaction is dragging an item and resize left and right
 * @param {*} item
 * @param {*} keys
 * @param {*} draggingItem
 * @param {*} resizingItem
 * @param {*} dragTime
 * @param {*} resizingEdge
 * @param {*} resizeTime
 * @param {*} groups
 * @param {*} newGroupOrder
 */
export function getItemWithInteractions({
  item,
  keys,
  draggingItem,
  resizingItem,
  dragTime,
  resizingEdge,
  resizeTime,
  groups,
  newGroupOrder
}) {
  if (!resizingItem && !draggingItem) return item
  const itemId = _get(item, keys.itemIdKey)
  const isDragging = itemId === draggingItem
  const isResizing = itemId === resizingItem
  const [itemTimeStart, itemTimeEnd] = calculateInteractionNewTimes({
    itemTimeStart: _get(item, keys.itemTimeStartKey),
    itemTimeEnd: _get(item, keys.itemTimeEndKey),
    isDragging,
    isResizing,
    dragTime,
    resizingEdge,
    resizeTime
  })
  const newItem = {
    ...item,
    [keys.itemTimeStartKey]: itemTimeStart,
    [keys.itemTimeEndKey]: itemTimeEnd,
    [keys.itemGroupKey]: isDragging
      ? _get(groups[newGroupOrder], keys.groupIdKey)
      : _get(item, keys.itemGroupKey)
  }
  return newItem
}

/**
 * get canvas start and end time from visible start and end time
 * @param {number} visibleTimeStart
 * @param {number} visibleTimeEnd
 */
export function getCanvasBoundariesFromVisibleTime(
  visibleTimeStart,
  visibleTimeEnd
) {
  const zoom = visibleTimeEnd - visibleTimeStart
  const canvasTimeStart = visibleTimeStart - (visibleTimeEnd - visibleTimeStart)
  const canvasTimeEnd = canvasTimeStart + zoom * 3
  return [canvasTimeStart, canvasTimeEnd]
}

/**
 * Get the the canvas area for a given visible time
 * Will shift the start/end of the canvas if the visible time
 * does not fit within the existing
 * @param {number} visibleTimeStart
 * @param {number} visibleTimeEnd
 * @param {boolean} forceUpdateDimensions
 * @param {*} items
 * @param {*} groups
 * @param {*} props
 * @param {*} state
 */
export function calculateScrollCanvas(
  visibleTimeStart,
  visibleTimeEnd,
  forceUpdateDimensions,
  items,
  groups,
  props,
  state
) {
  const oldCanvasTimeStart = state.canvasTimeStart
  const oldZoom = state.visibleTimeEnd - state.visibleTimeStart
  const newZoom = visibleTimeEnd - visibleTimeStart
  const newState = { visibleTimeStart, visibleTimeEnd }

  // Check if the current canvas covers the new times
  const canKeepCanvas =
    newZoom === oldZoom &&
    visibleTimeStart >= oldCanvasTimeStart + oldZoom * 0.5 &&
    visibleTimeStart <= oldCanvasTimeStart + oldZoom * 1.5 &&
    visibleTimeEnd >= oldCanvasTimeStart + oldZoom * 1.5 &&
    visibleTimeEnd <= oldCanvasTimeStart + oldZoom * 2.5

  if (!canKeepCanvas || forceUpdateDimensions) {
    const [canvasTimeStart, canvasTimeEnd] = getCanvasBoundariesFromVisibleTime(
      visibleTimeStart,
      visibleTimeEnd
    )
    newState.canvasTimeStart = canvasTimeStart
    newState.canvasTimeEnd = canvasTimeEnd
    const mergedState = {
      ...state,
      ...newState
    }

    const canvasWidth = getCanvasWidth(mergedState.width)

    // The canvas cannot be kept, so calculate the new items position
    Object.assign(
      newState,
      stackTimelineItems(
        items,
        groups,
        canvasWidth,
        mergedState.canvasTimeStart,
        mergedState.canvasTimeEnd,
        props.keys,
        props.lineHeight,
        props.itemHeightRatio,
        props.stackItems,
        mergedState.draggingItem,
        mergedState.resizingItem,
        mergedState.dragTime,
        mergedState.resizingEdge,
        mergedState.resizeTime,
        mergedState.newGroupOrder
      )
    )
  }
  return newState
}
