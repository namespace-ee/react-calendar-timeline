/* eslint-disable no-var */
import dayjs, { Dayjs } from 'dayjs'
import { _get } from './generic'
import { Dimension, ItemDimension } from '../types/dimension'
import {
  GroupedItem,
  GroupOrders,
  GroupStack,
  Id,
  TimelineGroupBase,
  TimelineItemBase,
  TimelineKeys,
  TimelineTimeSteps,
} from '../types/main'
import { ReactCalendarTimelineProps, ReactCalendarTimelineState } from '../Timeline'

/**
 * Calculate the ms / pixel ratio of the timeline state
 * @param {number} canvasTimeStart
 * @param {number} canvasTimeEnd
 * @param {number} canvasWidth
 * @returns {number}
 */
export function coordinateToTimeRatio(canvasTimeStart: number, canvasTimeEnd: number, canvasWidth: number): number {
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
  canvasTimeStart: number,
  canvasTimeEnd: number,
  canvasWidth: number,
  time: number,
): number {
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
  canvasTimeStart: number,
  canvasTimeEnd: number,
  canvasWidth: number,
  leftOffset: number,
): number {
  const timeToPxRatio = (canvasTimeEnd - canvasTimeStart) / canvasWidth

  const timeFromCanvasTimeStart = timeToPxRatio * leftOffset

  return timeFromCanvasTimeStart + canvasTimeStart
}

export function iterateTimes(
  start: number,
  end: number,
  unit: keyof TimelineTimeSteps,
  timeSteps: TimelineTimeSteps,
  callback: (time: number, nextTime: number) => void,
) {
  if (unit === 'blocks5') {
    // 5 msec blocks or future 5 blocks (where each block will represent 16nanoseconds)
    // this is used for the timeline to render the blocks
    const blockTime = 20
    let time = Math.floor(start / blockTime) * blockTime

    while (time < end) {
      const nextTime = Math.floor((time + blockTime) / blockTime) * blockTime
      callback(time, nextTime)
      time = nextTime
    }
  } else {
    let time = dayjs(start).startOf(unit)

    if (timeSteps[unit] && timeSteps[unit] > 1) {
      const value = time.get(unit)
      time = time.set(unit, value - (value % timeSteps[unit]))
    }

    while (time.valueOf() < end) {
      const nextTime = dayjs(time)
        .add(timeSteps[unit] || 1, unit as dayjs.ManipulateType)
        .startOf(unit)

      callback(time.valueOf(), nextTime.valueOf())
      time = nextTime
    }
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

export function getMinUnit(zoom: number, width: number, timeSteps: TimelineTimeSteps) {
  // for supporting weeks, its important to remember that each of these
  // units has a natural progression to the other. i.e. a year is 12 months
  // a month is 24 days, a day is 24 hours.
  // with weeks this isnt the case so weeks needs to be handled specially
  const timeDividers: Record<keyof TimelineTimeSteps, number> = {
    blocks5: 20,
    second: 50,
    minute: 60,
    hour: 60,
    day: 24,
    month: 30,
    year: 12,
  }

  let minUnit: keyof TimelineTimeSteps = 'year'

  // this timespan is in ms initially
  let nextTimeSpanInUnitContext = zoom

  Object.keys(timeDividers).some((unit) => {
    const unitKey = unit as keyof TimelineTimeSteps
    // converts previous time span to current unit
    // (e.g. milliseconds to seconds, seconds to minutes, etc)
    nextTimeSpanInUnitContext = nextTimeSpanInUnitContext / timeDividers[unitKey]

    // timeSteps is "
    // With what step to display different units. E.g. 15 for minute means only minutes 0, 15, 30 and 45 will be shown."
    // how many cells would be rendered given this time span, for this unit?
    // e.g. for time span of 60 minutes, and time step of 1, we would render 60 cells
    const cellsToBeRenderedForCurrentUnit = nextTimeSpanInUnitContext / timeSteps[unitKey]

    // what is happening here? why 3 if time steps are greater than 1??
    const cellWidthToUse = timeSteps[unitKey] && timeSteps[unitKey] > 1 ? 3 * minCellWidth : minCellWidth

    // for the minWidth of a cell, how many cells would be rendered given
    // the current pixel width
    // i.e. f
    const minimumCellsToRenderUnit = width / cellWidthToUse

    if (cellsToBeRenderedForCurrentUnit < minimumCellsToRenderUnit) {
      // for the current zoom, the number of cells we'd need to render all parts of this unit
      // is less than the minimum number of cells needed at minimum cell width
      minUnit = unit as keyof TimelineTimeSteps
      return true
    }
  })

  return minUnit
}

export type SelectUnits = 'blocks5' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year'

export type SelectUnitsRes = Exclude<SelectUnits, 'blocks5'>

export const NEXT_UNITS: Record<SelectUnits, SelectUnitsRes> = {
  blocks5: 'second',
  second: 'minute',
  minute: 'hour',
  hour: 'day',
  day: 'month',
  month: 'year',
  year: 'year',
}

export function getNextUnit(unit: SelectUnits): SelectUnitsRes {
  if (!NEXT_UNITS[unit]) {
    throw new Error(`unit ${unit} is not acceptable`)
  }
  return NEXT_UNITS[unit]
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
  resizeTime,
}: {
  itemTimeStart: number
  itemTimeEnd: number
  dragTime: number | null
  isDragging: boolean
  isResizing: boolean
  resizingEdge: 'left' | 'right' | null
  resizeTime: number | null
}): [number, number] {
  const originalItemRange = itemTimeEnd - itemTimeStart
  const itemStart = isResizing && resizingEdge === 'left' && resizeTime ? resizeTime : itemTimeStart
  const itemEnd = isResizing && resizingEdge === 'right' && resizeTime ? resizeTime : itemTimeEnd
  return [
    isDragging && dragTime ? dragTime : itemStart,
    isDragging && dragTime ? dragTime + originalItemRange : itemEnd,
  ]
}

export function calculateDimensions({
  itemTimeStart,
  itemTimeEnd,
  canvasTimeStart,
  canvasTimeEnd,
  canvasWidth,
}: {
  itemTimeStart: number
  itemTimeEnd: number
  canvasTimeStart: number
  canvasTimeEnd: number
  canvasWidth: number
}): Partial<Dimension> {
  const itemTimeRange = itemTimeEnd - itemTimeStart

  // restrict startTime and endTime to be bounded by canvasTimeStart and canvasTimeEnd
  const effectiveStartTime = Math.max(itemTimeStart, canvasTimeStart)
  const effectiveEndTime = Math.min(itemTimeEnd, canvasTimeEnd)

  const left = calculateXPositionForTime(canvasTimeStart, canvasTimeEnd, canvasWidth, effectiveStartTime)
  const right = calculateXPositionForTime(canvasTimeStart, canvasTimeEnd, canvasWidth, effectiveEndTime)
  const itemWidth = right - left

  return {
    left: left,
    width: Math.max(itemWidth, 3),
    collisionLeft: itemTimeStart,
    collisionWidth: itemTimeRange,
  }
}

/**
 * Get the order of groups based on their keys
 * @param {*} groups array of groups
 * @param {*} keys the keys object
 * @returns Ordered hash of objects with their array index and group
 */
export function getGroupOrders(groups: TimelineGroupBase[], keys: TimelineKeys) {
  const { groupIdKey } = keys

  const groupOrders: GroupOrders = {}

  for (let i = 0; i < groups.length; i++) {
    groupOrders[_get(groups[i], groupIdKey) as string] = {
      index: i,
      group: groups[i],
    }
  }

  return groupOrders
}

/**
 * Adds items relevant to each group to the result of getGroupOrders
 * @param {*} items list of all items
 * @param {*} groupOrders the result of getGroupOrders
 */
export function getGroupedItems(items: ItemDimension[], groupOrders: GroupOrders) {
  const groupedItems: Record<number, GroupedItem> = {}
  const keys = Object.keys(groupOrders)
  // Initialize with result object for each group
  for (let i = 0; i < keys.length; i++) {
    const groupOrder = groupOrders[keys[i]]
    groupedItems[i] = {
      index: groupOrder.index,
      group: groupOrder.group,
      items: [],
    }
  }

  // Populate groups
  for (let i = 0; i < items.length; i++) {
    if (items[i].dimensions !== undefined && items[i].dimensions?.order !== undefined) {
      const groupItem = groupedItems[items[i].dimensions?.order.index ?? 0]
      if (groupItem) {
        groupItem.items.push(items[i])
      }
    }
  }

  return groupedItems
}

export function getVisibleItems<
  CustomItem extends TimelineItemBase<any> = TimelineItemBase<number>,
  // CustomGroup extends TimelineGroupBase = TimelineGroupBase,
>(items: CustomItem[], canvasTimeStart: number, canvasTimeEnd: number, keys: TimelineKeys) {
  const { itemTimeStartKey, itemTimeEndKey } = keys

  return items.filter((item) => {
    const afterStart = _get(item, itemTimeStartKey) <= canvasTimeEnd
    const beforeEnd = _get(item, itemTimeEndKey) >= canvasTimeStart

    return afterStart && beforeEnd
  })
}

const EPSILON = 0.001

export function collision(a: Dimension, b: Dimension, collisionPadding: number = EPSILON) {
  // 2d collisions detection - https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  const verticalMargin = 0

  return (
    a.collisionLeft + collisionPadding < b.collisionLeft + b.collisionWidth &&
    a.collisionLeft + a.collisionWidth - collisionPadding > b.collisionLeft &&
    a.top! - verticalMargin + collisionPadding < b.top! + b.height &&
    a.top! + a.height + verticalMargin - collisionPadding > b.top!
  )
}

/**
 * Calculate the position of a given item for a group that
 * is being stacked
 */
export function groupStack(
  lineHeight: number,
  item: ItemDimension,
  group: ItemDimension[],
  groupHeight: number,
  groupTop: number,
  itemIndex: number,
): GroupStack {
  // calculate non-overlapping positions
  let curHeight = groupHeight
  const verticalMargin = (lineHeight - item.dimensions.height) / 2
  if (item.dimensions.stack && item.dimensions.top === null) {
    item.dimensions.top = groupTop + verticalMargin
    curHeight = Math.max(curHeight, lineHeight)
    do {
      // converting it to a const create an infinite loop (why?)
      // noinspection ES6ConvertVarToLetConst
      var collidingItem: null | ItemDimension = null
      //Items are placed from i=0 onwards, only check items with index < i
      for (let j = itemIndex - 1, jj = 0; j >= jj; j--) {
        const other = group[j]
        if (other.dimensions.top !== null && other.dimensions.stack && collision(item.dimensions, other.dimensions)) {
          collidingItem = other
          break
        } else {
          // console.log('dont test', other.top !== null, other !== item, other.stack);
        }
      }

      if (collidingItem != null) {
        // There is a collision. Reposition the items above the colliding element
        item.dimensions.top = collidingItem.dimensions.top! + lineHeight
        curHeight = Math.max(curHeight, item.dimensions.top + item.dimensions.height + verticalMargin - groupTop)
      }
    } while (collidingItem)
  }
  return {
    groupHeight: curHeight,
    verticalMargin,
    itemTop: item.dimensions.top!,
  }
}

// Calculate the position of this item for a group that is not being stacked
export function groupNoStack(
  lineHeight: number,
  item: ItemDimension,
  groupHeight: number,
  groupTop: number,
): GroupStack {
  const verticalMargin = (lineHeight - (item.dimensions?.height ?? 1)) / 2
  if (item.dimensions && item.dimensions.top === null) {
    item.dimensions.top = groupTop + verticalMargin
    groupHeight = Math.max(groupHeight, lineHeight)
  }
  return { groupHeight, verticalMargin: 0, itemTop: item.dimensions?.top ?? 0 }
}

function sum(arr: number[] = []) {
  return arr.reduce((acc, i) => acc + i, 0)
}

/**
 * Stack all groups
 * @param itemsDimensions
 * @param {*} groupOrders the groupOrders object
 * @param {*} lineHeight
 * @param {*} stackItems should items be stacked?
 */
export function stackAll(
  itemsDimensions: ItemDimension[],
  groupOrders: GroupOrders,
  lineHeight: number,
  stackItems: boolean,
) {
  const groupHeights: number[] = []
  const groupTops: number[] = []

  const groupedItems = getGroupedItems(itemsDimensions, groupOrders)

  for (const index in groupedItems) {
    const groupItems = groupedItems[index]
    const { items: itemsDimensions, group } = groupItems
    const groupTop = sum(groupHeights)

    // Is group being stacked?
    const isGroupStacked = group.stackItems !== undefined ? group.stackItems : stackItems
    const { groupHeight } = stackGroup(itemsDimensions, isGroupStacked, lineHeight, groupTop)
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
    groupTops,
  }
}

/**
 *
 * @param {*} itemsDimensions
 * @param {*} isGroupStacked
 * @param {*} lineHeight
 * @param {*} groupTop
 */
export function stackGroup(
  itemsDimensions: ItemDimension[],
  isGroupStacked: boolean,
  lineHeight: number,
  groupTop: number,
) {
  let groupHeight = 0
  let verticalMargin = 0
  // Find positions for each item in group
  for (let itemIndex = 0; itemIndex < itemsDimensions.length; itemIndex++) {
    const r = isGroupStacked
      ? groupStack(lineHeight, itemsDimensions[itemIndex], itemsDimensions, groupHeight, groupTop, itemIndex)
      : groupNoStack(lineHeight, itemsDimensions[itemIndex], groupHeight, groupTop)

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
export function stackTimelineItems<
  CustomItem extends TimelineItemBase<any> = TimelineItemBase<number>,
  CustomGroup extends TimelineGroupBase = TimelineGroupBase,
>(
  items: CustomItem[],
  groups: CustomGroup[],
  canvasWidth: number,
  canvasTimeStart: number,
  canvasTimeEnd: number,
  keys: TimelineKeys,
  lineHeight: number,
  itemHeightRatio: number,
  stackItems: boolean,
  draggingItem: Id | null | undefined,
  resizingItem: Id | null | undefined,
  dragTime: number | null,
  resizingEdge: 'left' | 'right' | null,
  resizeTime: number | null,
  newGroupOrder: number,
) {
  const visibleItems = getVisibleItems(items, canvasTimeStart, canvasTimeEnd, keys)
  const visibleItemsWithInteraction = visibleItems.map((item) =>
    getItemWithInteractions({
      item,
      keys,
      draggingItem,
      resizingItem,
      dragTime,
      resizingEdge,
      resizeTime,
      groups,
      newGroupOrder,
    }),
  )

  // if there are no groups return an empty array of dimensions
  if (groups.length === 0) {
    return {
      dimensionItems: [],
      height: 0,
      groupHeights: [],
      groupTops: [],
    }
  }

  // Get the order of groups based on their id key
  const groupOrders = getGroupOrders(groups, keys)
  const dimensionItems = visibleItemsWithInteraction
    .map((item) =>
      getItemDimensions({
        item,
        keys,
        canvasTimeStart,
        canvasTimeEnd,
        canvasWidth,
        groupOrders,
        lineHeight,
        itemHeightRatio,
      }),
    )
    .filter((item) => !!item) as ItemDimension[]
  // Get a new array of groupOrders holding the stacked items
  const { height, groupHeights, groupTops } = stackAll(dimensionItems, groupOrders, lineHeight, stackItems)
  return { dimensionItems, height, groupHeights, groupTops }
}

/**
 * get canvas width from visible width
 * @param {*} width
 * @param {*} buffer
 */
export function getCanvasWidth(width: number, buffer: number) {
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
export function getItemDimensions<CustomItem extends TimelineItemBase<any>>({
  item,
  keys,
  canvasTimeStart,
  canvasTimeEnd,
  canvasWidth,
  groupOrders,
  lineHeight,
  itemHeightRatio,
}: {
  item: CustomItem
  keys: TimelineKeys
  canvasTimeStart: number
  canvasTimeEnd: number
  canvasWidth: number
  groupOrders: GroupOrders
  lineHeight: number
  itemHeightRatio: number
}): ItemDimension | undefined {
  const itemId = _get(item, keys.itemIdKey)
  const dimension = calculateDimensions({
    itemTimeStart: _get(item, keys.itemTimeStartKey),
    itemTimeEnd: _get(item, keys.itemTimeEndKey),
    canvasTimeStart,
    canvasTimeEnd,
    canvasWidth,
  })
  if (dimension) {
    dimension.top = null
    dimension.order = groupOrders[_get(item, keys.itemGroupKey)]
    dimension.stack = !item.isOverlay
    dimension.height = lineHeight * itemHeightRatio
    return {
      id: itemId,
      dimensions: dimension as Dimension,
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
export function getItemWithInteractions<
  CustomItem extends TimelineItemBase<any>,
  CustomGroup extends TimelineGroupBase = TimelineGroupBase,
>({
  item,
  keys,
  draggingItem,
  resizingItem,
  dragTime,
  resizingEdge,
  resizeTime,
  groups,
  newGroupOrder,
}: {
  item: CustomItem
  keys: TimelineKeys
  draggingItem: Id | null | undefined
  resizingItem: Id | null | undefined
  dragTime: number | null
  resizingEdge: 'left' | 'right' | null
  resizeTime: number | null
  groups: CustomGroup[]
  newGroupOrder: number
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
    resizeTime,
  })
  return {
    ...item,
    [keys.itemTimeStartKey]: itemTimeStart,
    [keys.itemTimeEndKey]: itemTimeEnd,
    [keys.itemGroupKey]: isDragging ? _get(groups[newGroupOrder], keys.groupIdKey) : _get(item, keys.itemGroupKey),
  }
}

/**
 * get canvas start and end time from visible start and end time
 * @param {number} visibleTimeStart
 * @param {number} visibleTimeEnd
 * @param buffer
 */
export function getCanvasBoundariesFromVisibleTime(visibleTimeStart: number, visibleTimeEnd: number, buffer: number) {
  const zoom = visibleTimeEnd - visibleTimeStart
  // buffer - 1 (1 is visible area) divided by 2 (2 is the buffer split on the right and left of the timeline)
  const canvasTimeStart = visibleTimeStart - (zoom * (buffer - 1)) / 2
  const canvasTimeEnd = canvasTimeStart + zoom * buffer
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
export function calculateScrollCanvas<
  P extends ReactCalendarTimelineProps<any, any>,
  S extends ReactCalendarTimelineState<any, any>,
>(
  visibleTimeStart: number,
  visibleTimeEnd: number,
  forceUpdateDimensions: boolean,
  items: any,
  groups: any,
  props: P,
  state: S,
): S {
  const buffer = props.buffer
  const oldCanvasTimeStart = state.canvasTimeStart
  const oldCanvasTimeEnd = state.canvasTimeEnd
  const oldZoom = state.visibleTimeEnd - state.visibleTimeStart
  const newZoom = visibleTimeEnd - visibleTimeStart
  const newState: S = {
    ...state,
    visibleTimeStart,
    visibleTimeEnd,
  }

  // Calculate half of the buffer size on each side = 1/4 of the (buffer - viewport)
  const halfBuffer = oldZoom * (buffer! - 1) * 0.25

  // Check if the current canvas covers the new times
  const shouldCreateNewCanvas =
    newZoom !== oldZoom ||
    visibleTimeStart <= oldCanvasTimeStart + halfBuffer ||
    visibleTimeEnd >= oldCanvasTimeEnd - halfBuffer

  if (shouldCreateNewCanvas || forceUpdateDimensions) {
    const [canvasTimeStart, canvasTimeEnd] = getCanvasBoundariesFromVisibleTime(
      visibleTimeStart,
      visibleTimeEnd,
      buffer!,
    )
    newState.canvasTimeStart = canvasTimeStart
    newState.canvasTimeEnd = canvasTimeEnd
    const mergedState = {
      ...state,
      ...newState,
    }

    const canvasWidth = getCanvasWidth(mergedState.width, props.buffer!)

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
        mergedState.newGroupOrder,
      ),
    )
  }
  return newState
}
