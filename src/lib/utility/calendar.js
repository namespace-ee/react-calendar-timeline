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
    month: 'year'
  }

  return nextUnits[unit] || ''
}

export function calculateDimensions({
  itemTimeStart,
  itemTimeEnd,
  isDragging,
  isResizing,
  canvasTimeStart,
  canvasTimeEnd,
  canvasWidth,
  dragTime,
  resizingEdge,
  resizeTime
}) {
  const itemStart =
    isResizing && resizingEdge === 'left' ? resizeTime : itemTimeStart
  const itemEnd =
    isResizing && resizingEdge === 'right' ? resizeTime : itemTimeEnd

  const itemTimeRange = itemEnd - itemStart

  let newItemStart = isDragging ? dragTime : itemStart

  const ratio =
    1 / coordinateToTimeRatio(canvasTimeStart, canvasTimeEnd, canvasWidth)

  // restrict startTime and endTime to be bounded by canvasTimeStart and canasTimeEnd
  const effectiveStartTime = Math.max(itemStart, canvasTimeStart)
  const effectiveEndTime = Math.min(itemEnd, canvasTimeEnd)
  const itemWidth = (effectiveEndTime - effectiveStartTime) * ratio

  const dimensions = {
    left: Math.max(newItemStart - canvasTimeStart, 0) * ratio,
    width: Math.max(itemWidth, 3),
    collisionLeft: newItemStart,
    collisionWidth: itemTimeRange
  }

  return dimensions
}

// Get the order of groups based on their keys
export function getGroupOrders(groups, keys) {
  const { groupIdKey } = keys

  let groupOrders = {}

  for (let i = 0; i < groups.length; i++) {
    groupOrders[_get(groups[i], groupIdKey)] = {index: i, group: groups[i]} 
  }

  return groupOrders
}

function getGroupedItems(items, groupOrders) {
  var groupedItems = {}
  // Initialize with result object for each group
  for (let i = 0; i < Object.keys(groupOrders).length; i++) {
    const groupOrder = groupOrders[Object.keys(groupOrders)[i]]
    groupedItems[i] = {
      index: groupOrder.index,
      group: groupOrder.group,
      items: []
    }
  }

  // Populate groups
  for (let i = 0; i < items.length; i++) {
    if (items[i].dimensions.order !== undefined) {
      groupedItems[items[i].dimensions.order].items.push(items[i])
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

function groupStack(lineHeight, item, group, groupHeight, totalHeight, i) {
  // calculate non-overlapping positions
  let x = groupHeight
  let verticalMargin = lineHeight - item.dimensions.height
  if (item.dimensions.stack && item.dimensions.top === null) {
    item.dimensions.top = totalHeight + verticalMargin
    x = Math.max(x, lineHeight)
    do {
      var collidingItem = null
      for (var j = i-1, jj = 0; j >= jj; j--) {
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
        x = Math.max(
          x,
          item.dimensions.top + item.dimensions.height - totalHeight
        )
      }
    } while (collidingItem)
  }
  return {groupHeight: x, verticalMargin}
}

function groupNoStack(lineHeight, item, groupHeight, totalHeight) {
  let verticalMargin = (lineHeight - item.dimensions.height) / 2
  if (item.dimensions.top === null) {
    item.dimensions.top = totalHeight + verticalMargin
    groupHeight = Math.max(groupHeight, lineHeight)
  }
  return {groupHeight, verticalMargin: 0}
}

export function stackAll(items, groupOrders, lineHeight, stackItems) {
  var i, iMax
  var totalHeight = 0

  var groupHeights = []
  var groupTops = []

  var groupedItems = getGroupedItems(items, groupOrders)

  for (var index in groupedItems) {
    const groupItems = groupedItems[index]
    const {items, group} = groupItems
    groupTops.push(totalHeight)
    const isGroupStacked = group.stackItems !== undefined ? group.stackItems : stackItems
    var groupHeight = 0
    var verticalMargin = 0
    for (i = 0, iMax = items.length; i < iMax; i++) {
      let r = {}
      if (isGroupStacked) {
        r = groupStack(lineHeight, items[i], items, groupHeight, totalHeight, i)
      } else {
        r = groupNoStack(lineHeight, items[i], groupHeight, totalHeight)
      }
      groupHeight = r.groupHeight
      verticalMargin = r.verticalMargin

    }

    
    groupHeights.push(Math.max(groupHeight + verticalMargin, lineHeight))
    totalHeight += Math.max(groupHeight + verticalMargin, lineHeight)
  }
  return {
    height: totalHeight,
    groupHeights,
    groupTops
  }
}
