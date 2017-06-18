import moment from 'moment'

const EPSILON = 0.001

// so we could use both immutable.js objects and regular objects
export function _get (object, key) {
  return typeof object.get === 'function' ? object.get(key) : object[key]
}

export function _length (object) {
  return typeof object.count === 'function' ? object.count() : object.length
}

export function arraysEqual (array1, array2) {
  return (_length(array1) === _length(array2)) && array1.every((element, index) => {
    return element === _get(array2, index)
  })
}

export function iterateTimes (start, end, unit, timeSteps, callback) {
  let time = moment(start).startOf(unit)

  if (timeSteps[unit] && timeSteps[unit] > 1) {
    let value = time.get(unit)
    time.set(unit, value - (value % timeSteps[unit]))
  }

  while (time.valueOf() < end) {
    let nextTime = moment(time).add(timeSteps[unit] || 1, `${unit}s`)
    callback(time, nextTime)
    time = nextTime
  }
}

export function getMinUnit (zoom, width, timeSteps) {
  let timeDividers = {
    second: 1000,
    minute: 60,
    hour: 60,
    day: 24,
    month: 30,
    year: 12
  }

  let minUnit = 'year'
  let breakCount = zoom
  const minCellWidth = 17

  Object.keys(timeDividers).some(unit => {
    breakCount = breakCount / timeDividers[unit]
    const cellCount = breakCount / timeSteps[unit]
    const countNeeded = width / (timeSteps[unit] && timeSteps[unit] > 1 ? 3 * minCellWidth : minCellWidth)

    if (cellCount < countNeeded) {
      minUnit = unit
      return true
    }
  })

  return minUnit
}

export function getNextUnit (unit) {
  let nextUnits = {
    second: 'minute',
    minute: 'hour',
    hour: 'day',
    day: 'month',
    month: 'year'
  }

  return nextUnits[unit] || ''
}

export function getParentPosition (element) {
  var xPosition = 0
  var yPosition = 0
  var first = true

  while (element) {
    xPosition += (element.offsetLeft - (first ? 0 : element.scrollLeft) + element.clientLeft)
    yPosition += (element.offsetTop - (first ? 0 : element.scrollTop) + element.clientTop)
    element = element.offsetParent
    first = false
  }
  return { x: xPosition, y: yPosition }
}

export function coordinateToTimeRatio (canvasTimeStart, canvasTimeEnd, canvasWidth) {
  return (canvasTimeEnd - canvasTimeStart) / canvasWidth
}

export function calculateDimensions ({ item, order, keys, canvasTimeStart, canvasTimeEnd, canvasWidth, dragSnap, lineHeight, draggingItem, dragTime, resizingItem, resizingEdge, resizeTime, newGroupOrder, itemHeightRatio, fullUpdate, visibleTimeStart, visibleTimeEnd }) {
  var itemId = _get(item, keys.itemIdKey)
  var itemTimeStart = _get(item, keys.itemTimeStartKey)
  var itemTimeEnd = _get(item, keys.itemTimeEndKey)

  var isDragging = itemId === draggingItem
  var isResizing = itemId === resizingItem

  const itemStart = (isResizing && resizingEdge === 'left' ? resizeTime : itemTimeStart)
  const itemEnd = (isResizing && resizingEdge === 'right' ? resizeTime : itemTimeEnd)

  let x = isDragging ? dragTime : itemStart

  let w = Math.max(itemEnd - itemStart, dragSnap)

  let collisionX = itemStart
  let collisionW = w

  if (isDragging) {
    if (itemTimeStart >= dragTime) {
      collisionX = dragTime
      collisionW = Math.max(itemTimeEnd - dragTime, dragSnap)
    } else {
      collisionW = Math.max(dragTime - itemTimeStart + w, dragSnap)
    }
  }

  let clippedLeft = false
  let clippedRight = false

  if (fullUpdate) {
    if (!isDragging && (visibleTimeStart > x + w || visibleTimeEnd < x)) {
      return null
    }

    if (visibleTimeStart > x) {
      w -= (visibleTimeStart - x)
      x = visibleTimeStart
      if (isDragging && w < 0) {
        x += w
        w = 0
      }
      clippedLeft = true
    }
    if (x + w > visibleTimeEnd) {
      w -= ((x + w) - visibleTimeEnd)
      clippedRight = true
    }
  }

  const ratio = 1 / coordinateToTimeRatio(canvasTimeStart, canvasTimeEnd, canvasWidth)
  const h = lineHeight * itemHeightRatio

  const dimensions = {
    left: (x - canvasTimeStart) * ratio,
    top: null,
    width: Math.max(w * ratio, 3),
    height: h,
    order: isDragging ? newGroupOrder : order,
    stack: !item.isOverlay,
    collisionLeft: collisionX,
    originalLeft: itemTimeStart,
    collisionWidth: collisionW,
    lineHeight,
    isDragging,
    clippedLeft,
    clippedRight
  }

  return dimensions
}

export function getGroupOrders (groups, keys) {
  const { groupIdKey } = keys

  let groupOrders = {}

  for (let i = 0; i < groups.length; i++) {
    groupOrders[_get(groups[i], groupIdKey)] = i
  }

  return groupOrders
}

export function getVisibleItems (items, canvasTimeStart, canvasTimeEnd, keys) {
  const { itemTimeStartKey, itemTimeEndKey } = keys

  return items.filter(item => {
    return _get(item, itemTimeStartKey) <= canvasTimeEnd && _get(item, itemTimeEndKey) >= canvasTimeStart
  })
}

export function collision (a, b, lineHeight) {
  // var verticalMargin = (lineHeight - a.height)/2;
  var verticalMargin = 0
  return ((a.collisionLeft + EPSILON) < (b.collisionLeft + b.collisionWidth) &&
  (a.collisionLeft + a.collisionWidth - EPSILON) > b.collisionLeft &&
  (a.top - verticalMargin + EPSILON) < (b.top + b.height) &&
  (a.top + a.height + verticalMargin - EPSILON) > b.top)
}

export function stack (items, groupOrders, lineHeight, headerHeight, force) {
  var i, iMax
  var totalHeight = headerHeight

  var groupHeights = {}
  var groupTops = {}

  var groupedItems = getGroupedItems(items, groupOrders)

  if (force) {
    // reset top position of all items
    for (i = 0, iMax = items.length; i < iMax; i++) {
      items[i].dimensions.top = null
    }
  }

  groupedItems.forEach(function (group, index, array) {
    // calculate new, non-overlapping positions
    groupTops[index] = totalHeight

    var groupHeight = 0
    var verticalMargin = 0
    for (i = 0, iMax = group.length; i < iMax; i++) {
      var item = group[i]
      verticalMargin = (item.dimensions.lineHeight - item.dimensions.height)

      if (item.dimensions.stack && item.dimensions.top === null) {
        item.dimensions.top = totalHeight + verticalMargin
        groupHeight = Math.max(groupHeight, item.dimensions.lineHeight)
        do {
          var collidingItem = null
          for (var j = 0, jj = group.length; j < jj; j++) {
            var other = group[j]
            if (other.dimensions.top !== null && other !== item && other.dimensions.stack && collision(item.dimensions, other.dimensions, item.dimensions.lineHeight)) {
              collidingItem = other
              break
            } else {
              // console.log('dont test', other.top !== null, other !== item, other.stack);
            }
          }

          if (collidingItem != null) {
            // There is a collision. Reposition the items above the colliding element
            item.dimensions.top = collidingItem.dimensions.top + collidingItem.dimensions.lineHeight
            groupHeight = Math.max(groupHeight, item.dimensions.top + item.dimensions.height - totalHeight)
          }
        } while (collidingItem)
      }
    }
    groupHeights[index] = Math.max(groupHeight + verticalMargin, lineHeight)
    totalHeight += Math.max(groupHeight + verticalMargin, lineHeight)
  })
  return {
    height: totalHeight,
    groupHeights,
    groupTops
  }
}

export function nostack (items, groupOrders, lineHeight, headerHeight, force) {
  var i, iMax

  var totalHeight = headerHeight

  var groupHeights = {}
  var groupTops = {}

  var groupedItems = getGroupedItems(items, groupOrders)

  if (force) {
    // reset top position of all items
    for (i = 0, iMax = items.length; i < iMax; i++) {
      items[i].dimensions.top = null
    }
  }

  groupedItems.forEach(function (group, index, array) {
    // calculate new, non-overlapping positions
    groupTops[index] = totalHeight

    var groupHeight = 0
    for (i = 0, iMax = group.length; i < iMax; i++) {
      var item = group[i]
      var verticalMargin = (item.dimensions.lineHeight - item.dimensions.height) / 2

      if (item.dimensions.top === null) {
        item.dimensions.top = totalHeight + verticalMargin
        groupHeight = Math.max(groupHeight, item.dimensions.lineHeight)
      }
    }
    groupHeights[index] = Math.max(groupHeight, lineHeight)
    totalHeight += Math.max(groupHeight, lineHeight)
  })
  return {
    height: totalHeight,
    groupHeights,
    groupTops
  }
}

export function keyBy (value, key) {
  let obj = {}

  value.forEach(function (element, index, array) {
    obj[element[key]] = element
  })

  return obj
}

export function getGroupedItems (items, groupOrders) {
  var arr = []

  // Initialize with empty arrays for each group
  for (let i = 0; i < Object.keys(groupOrders).length; i++) {
    arr[i] = []
  }
  // Populate groups
  for (let i = 0; i < items.length; i++) {
    if (items[i].dimensions.order !== undefined) {
      arr[items[i].dimensions.order].push(items[i])
    }
  }

  return arr
}

export function hasSomeParentTheClass (element, classname) {
  if (element.className && element.className.split(' ').indexOf(classname) >= 0) return true
  return element.parentNode && hasSomeParentTheClass(element.parentNode, classname)
}

export function deepObjectCompare (obj1, obj2) {
  for (var p in obj1) {
    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false

    switch (typeof (obj1[p])) {
      case 'object':
        if (!Object.compare(obj1[p], obj2[p])) return false
        break
      case 'function':
        if (typeof (obj2[p]) === 'undefined' || (p !== 'compare' && obj1[p].toString() !== obj2[p].toString())) return false
        break
      default:
        if (obj1[p] !== obj2[p]) return false
    }
  }

  for (var r in obj2) {
    if (typeof (obj1[r]) === 'undefined') return false
  }
  return true
};
