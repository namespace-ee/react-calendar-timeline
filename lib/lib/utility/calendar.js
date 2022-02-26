"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.coordinateToTimeRatio = coordinateToTimeRatio;
exports.calculateXPositionForTime = calculateXPositionForTime;
exports.calculateTimeForXPosition = calculateTimeForXPosition;
exports.iterateTimes = iterateTimes;
exports.getMinUnit = getMinUnit;
exports.getNextUnit = getNextUnit;
exports.calculateInteractionNewTimes = calculateInteractionNewTimes;
exports.calculateDimensions = calculateDimensions;
exports.getGroupOrders = getGroupOrders;
exports.getGroupedItems = getGroupedItems;
exports.getVisibleItems = getVisibleItems;
exports.collision = collision;
exports.groupStack = groupStack;
exports.groupNoStack = groupNoStack;
exports.stackAll = stackAll;
exports.stackGroup = stackGroup;
exports.stackTimelineItems = stackTimelineItems;
exports.getCanvasWidth = getCanvasWidth;
exports.getItemDimensions = getItemDimensions;
exports.getItemWithInteractions = getItemWithInteractions;
exports.getCanvasBoundariesFromVisibleTime = getCanvasBoundariesFromVisibleTime;
exports.calculateScrollCanvas = calculateScrollCanvas;
exports.minCellWidth = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _generic = require("./generic");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Calculate the ms / pixel ratio of the timeline state
 * @param {number} canvasTimeStart
 * @param {number} canvasTimeEnd
 * @param {number} canvasWidth
 * @returns {number}
 */
function coordinateToTimeRatio(canvasTimeStart, canvasTimeEnd, canvasWidth) {
  return (canvasTimeEnd - canvasTimeStart) / canvasWidth;
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


function calculateXPositionForTime(canvasTimeStart, canvasTimeEnd, canvasWidth, time) {
  var widthToZoomRatio = canvasWidth / (canvasTimeEnd - canvasTimeStart);
  var timeOffset = time - canvasTimeStart;
  return timeOffset * widthToZoomRatio;
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


function calculateTimeForXPosition(canvasTimeStart, canvasTimeEnd, canvasWidth, leftOffset) {
  var timeToPxRatio = (canvasTimeEnd - canvasTimeStart) / canvasWidth;
  var timeFromCanvasTimeStart = timeToPxRatio * leftOffset;
  return timeFromCanvasTimeStart + canvasTimeStart;
}

function iterateTimes(start, end, unit, timeSteps, callback) {
  var time = (0, _moment["default"])(start).startOf(unit);

  if (timeSteps[unit] && timeSteps[unit] > 1) {
    var value = time.get(unit);
    time.set(unit, value - value % timeSteps[unit]);
  }

  while (time.valueOf() < end) {
    var nextTime = (0, _moment["default"])(time).add(timeSteps[unit] || 1, "".concat(unit, "s"));
    callback(time, nextTime);
    time = nextTime;
  }
} // this function is VERY HOT as its used in Timeline.js render function
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


var minCellWidth = 17;
exports.minCellWidth = minCellWidth;

function getMinUnit(zoom, width, timeSteps) {
  // for supporting weeks, its important to remember that each of these
  // units has a natural progression to the other. i.e. a year is 12 months
  // a month is 24 days, a day is 24 hours.
  // with weeks this isnt the case so weeks needs to be handled specially
  var timeDividers = {
    second: 1000,
    minute: 60,
    hour: 60,
    day: 24,
    month: 30,
    year: 12
  };
  var minUnit = 'year'; // this timespan is in ms initially

  var nextTimeSpanInUnitContext = zoom;
  Object.keys(timeDividers).some(function (unit) {
    // converts previous time span to current unit
    // (e.g. milliseconds to seconds, seconds to minutes, etc)
    nextTimeSpanInUnitContext = nextTimeSpanInUnitContext / timeDividers[unit]; // timeSteps is "
    // With what step to display different units. E.g. 15 for minute means only minutes 0, 15, 30 and 45 will be shown."
    // how many cells would be rendered given this time span, for this unit?
    // e.g. for time span of 60 minutes, and time step of 1, we would render 60 cells

    var cellsToBeRenderedForCurrentUnit = nextTimeSpanInUnitContext / timeSteps[unit]; // what is happening here? why 3 if time steps are greater than 1??

    var cellWidthToUse = timeSteps[unit] && timeSteps[unit] > 1 ? 3 * minCellWidth : minCellWidth; // for the minWidth of a cell, how many cells would be rendered given
    // the current pixel width
    // i.e. f

    var minimumCellsToRenderUnit = width / cellWidthToUse;

    if (cellsToBeRenderedForCurrentUnit < minimumCellsToRenderUnit) {
      // for the current zoom, the number of cells we'd need to render all parts of this unit
      // is less than the minimum number of cells needed at minimum cell width
      minUnit = unit;
      return true;
    }
  });
  return minUnit;
}

function getNextUnit(unit) {
  var nextUnits = {
    second: 'minute',
    minute: 'hour',
    hour: 'day',
    day: 'month',
    month: 'year',
    year: 'year'
  };

  if (!nextUnits[unit]) {
    throw new Error("unit ".concat(unit, " in not acceptable"));
  }

  return nextUnits[unit];
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


function calculateInteractionNewTimes(_ref) {
  var itemTimeStart = _ref.itemTimeStart,
      itemTimeEnd = _ref.itemTimeEnd,
      dragTime = _ref.dragTime,
      isDragging = _ref.isDragging,
      isResizing = _ref.isResizing,
      resizingEdge = _ref.resizingEdge,
      resizeTime = _ref.resizeTime;
  var originalItemRange = itemTimeEnd - itemTimeStart;
  var itemStart = isResizing && resizingEdge === 'left' ? resizeTime : itemTimeStart;
  var itemEnd = isResizing && resizingEdge === 'right' ? resizeTime : itemTimeEnd;
  return [isDragging ? dragTime : itemStart, isDragging ? dragTime + originalItemRange : itemEnd];
}

function calculateDimensions(_ref2) {
  var itemTimeStart = _ref2.itemTimeStart,
      itemTimeEnd = _ref2.itemTimeEnd,
      canvasTimeStart = _ref2.canvasTimeStart,
      canvasTimeEnd = _ref2.canvasTimeEnd,
      canvasWidth = _ref2.canvasWidth;
  var itemTimeRange = itemTimeEnd - itemTimeStart; // restrict startTime and endTime to be bounded by canvasTimeStart and canvasTimeEnd

  var effectiveStartTime = Math.max(itemTimeStart, canvasTimeStart);
  var effectiveEndTime = Math.min(itemTimeEnd, canvasTimeEnd);
  var left = calculateXPositionForTime(canvasTimeStart, canvasTimeEnd, canvasWidth, effectiveStartTime);
  var right = calculateXPositionForTime(canvasTimeStart, canvasTimeEnd, canvasWidth, effectiveEndTime);
  var itemWidth = right - left;
  var dimensions = {
    left: left,
    width: Math.max(itemWidth, 3),
    collisionLeft: itemTimeStart,
    collisionWidth: itemTimeRange
  };
  return dimensions;
}
/**
 * Get the order of groups based on their keys
 * @param {*} groups array of groups
 * @param {*} keys the keys object
 * @returns Ordered hash of objects with their array index and group
 */


function getGroupOrders(groups, keys) {
  var groupIdKey = keys.groupIdKey;
  var groupOrders = {};

  for (var i = 0; i < groups.length; i++) {
    groupOrders[(0, _generic._get)(groups[i], groupIdKey)] = {
      index: i,
      group: groups[i]
    };
  }

  return groupOrders;
}
/**
 * Adds items relevant to each group to the result of getGroupOrders
 * @param {*} items list of all items
 * @param {*} groupOrders the result of getGroupOrders
 */


function getGroupedItems(items, groupOrders) {
  var groupedItems = {};
  var keys = Object.keys(groupOrders); // Initialize with result object for each group

  for (var i = 0; i < keys.length; i++) {
    var groupOrder = groupOrders[keys[i]];
    groupedItems[i] = {
      index: groupOrder.index,
      group: groupOrder.group,
      items: []
    };
  } // Populate groups


  for (var _i = 0; _i < items.length; _i++) {
    if (items[_i].dimensions.order !== undefined) {
      var groupItem = groupedItems[items[_i].dimensions.order.index];

      if (groupItem) {
        groupItem.items.push(items[_i]);
      }
    }
  }

  return groupedItems;
}

function getVisibleItems(items, canvasTimeStart, canvasTimeEnd, keys) {
  var itemTimeStartKey = keys.itemTimeStartKey,
      itemTimeEndKey = keys.itemTimeEndKey;
  return items.filter(function (item) {
    return (0, _generic._get)(item, itemTimeStartKey) <= canvasTimeEnd && (0, _generic._get)(item, itemTimeEndKey) >= canvasTimeStart;
  });
}

var EPSILON = 0.001;

function collision(a, b, lineHeight) {
  var collisionPadding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : EPSILON;
  // 2d collisions detection - https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  var verticalMargin = 0;
  return a.collisionLeft + collisionPadding < b.collisionLeft + b.collisionWidth && a.collisionLeft + a.collisionWidth - collisionPadding > b.collisionLeft && a.top - verticalMargin + collisionPadding < b.top + b.height && a.top + a.height + verticalMargin - collisionPadding > b.top;
}
/**
 * Calculate the position of a given item for a group that
 * is being stacked
 */


function groupStack(lineHeight, item, group, groupHeight, groupTop, itemIndex) {
  // calculate non-overlapping positions
  var curHeight = groupHeight;
  var verticalMargin = (lineHeight - item.dimensions.height) / 2;

  if (item.dimensions.stack && item.dimensions.top === null) {
    item.dimensions.top = groupTop + verticalMargin;
    curHeight = Math.max(curHeight, lineHeight);

    do {
      var collidingItem = null; //Items are placed from i=0 onwards, only check items with index < i

      for (var j = itemIndex - 1, jj = 0; j >= jj; j--) {
        var other = group[j];

        if (other.dimensions.top !== null && other.dimensions.stack && collision(item.dimensions, other.dimensions, lineHeight)) {
          collidingItem = other;
          break;
        } else {// console.log('dont test', other.top !== null, other !== item, other.stack);
        }
      }

      if (collidingItem != null) {
        // There is a collision. Reposition the items above the colliding element
        item.dimensions.top = collidingItem.dimensions.top + lineHeight;
        curHeight = Math.max(curHeight, item.dimensions.top + item.dimensions.height + verticalMargin - groupTop);
      }
    } while (collidingItem);
  }

  return {
    groupHeight: curHeight,
    verticalMargin: verticalMargin,
    itemTop: item.dimensions.top
  };
} // Calculate the position of this item for a group that is not being stacked


function groupNoStack(lineHeight, item, groupHeight, groupTop) {
  var verticalMargin = (lineHeight - item.dimensions.height) / 2;

  if (item.dimensions.top === null) {
    item.dimensions.top = groupTop + verticalMargin;
    groupHeight = Math.max(groupHeight, lineHeight);
  }

  return {
    groupHeight: groupHeight,
    verticalMargin: 0,
    itemTop: item.dimensions.top
  };
}

function sum() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return arr.reduce(function (acc, i) {
    return acc + i;
  }, 0);
}
/**
 * Stack all groups
 * @param {*} items items to be stacked
 * @param {*} groupOrders the groupOrders object
 * @param {*} lineHeight
 * @param {*} stackItems should items be stacked?
 */


function stackAll(itemsDimensions, groupOrders, lineHeight, stackItems) {
  var groupHeights = [];
  var groupTops = [];
  var groupedItems = getGroupedItems(itemsDimensions, groupOrders);

  for (var index in groupedItems) {
    var groupItems = groupedItems[index];
    var _itemsDimensions = groupItems.items,
        group = groupItems.group;
    var groupTop = sum(groupHeights); // Is group being stacked?

    var isGroupStacked = group.stackItems !== undefined ? group.stackItems : stackItems;

    var _stackGroup = stackGroup(_itemsDimensions, isGroupStacked, lineHeight, groupTop),
        groupHeight = _stackGroup.groupHeight,
        verticalMargin = _stackGroup.verticalMargin; // If group height is overridden, push new height
    // Do this late as item position still needs to be calculated


    groupTops.push(groupTop);

    if (group.height) {
      groupHeights.push(group.height);
    } else {
      groupHeights.push(Math.max(groupHeight, lineHeight));
    }
  }

  return {
    height: sum(groupHeights),
    groupHeights: groupHeights,
    groupTops: groupTops
  };
}
/**
 * 
 * @param {*} itemsDimensions 
 * @param {*} isGroupStacked 
 * @param {*} lineHeight 
 * @param {*} groupTop 
 */


function stackGroup(itemsDimensions, isGroupStacked, lineHeight, groupTop) {
  var groupHeight = 0;
  var verticalMargin = 0; // Find positions for each item in group

  for (var itemIndex = 0; itemIndex < itemsDimensions.length; itemIndex++) {
    var r = {};

    if (isGroupStacked) {
      r = groupStack(lineHeight, itemsDimensions[itemIndex], itemsDimensions, groupHeight, groupTop, itemIndex);
    } else {
      r = groupNoStack(lineHeight, itemsDimensions[itemIndex], groupHeight, groupTop);
    }

    groupHeight = r.groupHeight;
    verticalMargin = r.verticalMargin;
  }

  return {
    groupHeight: groupHeight,
    verticalMargin: verticalMargin
  };
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


function stackTimelineItems(items, groups, canvasWidth, canvasTimeStart, canvasTimeEnd, keys, lineHeight, itemHeightRatio, stackItems, draggingItem, resizingItem, dragTime, resizingEdge, resizeTime, newGroupOrder) {
  var visibleItems = getVisibleItems(items, canvasTimeStart, canvasTimeEnd, keys);
  var visibleItemsWithInteraction = visibleItems.map(function (item) {
    return getItemWithInteractions({
      item: item,
      keys: keys,
      draggingItem: draggingItem,
      resizingItem: resizingItem,
      dragTime: dragTime,
      resizingEdge: resizingEdge,
      resizeTime: resizeTime,
      groups: groups,
      newGroupOrder: newGroupOrder
    });
  }); // if there are no groups return an empty array of dimensions

  if (groups.length === 0) {
    return {
      dimensionItems: [],
      height: 0,
      groupHeights: [],
      groupTops: []
    };
  } // Get the order of groups based on their id key


  var groupOrders = getGroupOrders(groups, keys);
  var dimensionItems = visibleItemsWithInteraction.map(function (item) {
    return getItemDimensions({
      item: item,
      keys: keys,
      canvasTimeStart: canvasTimeStart,
      canvasTimeEnd: canvasTimeEnd,
      canvasWidth: canvasWidth,
      groupOrders: groupOrders,
      lineHeight: lineHeight,
      itemHeightRatio: itemHeightRatio
    });
  }).filter(function (item) {
    return !!item;
  }); // Get a new array of groupOrders holding the stacked items

  var _stackAll = stackAll(dimensionItems, groupOrders, lineHeight, stackItems),
      height = _stackAll.height,
      groupHeights = _stackAll.groupHeights,
      groupTops = _stackAll.groupTops;

  return {
    dimensionItems: dimensionItems,
    height: height,
    groupHeights: groupHeights,
    groupTops: groupTops
  };
}
/**
 * get canvas width from visible width
 * @param {*} width
 * @param {*} buffer
 */


function getCanvasWidth(width) {
  var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  return width * buffer;
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


function getItemDimensions(_ref3) {
  var item = _ref3.item,
      keys = _ref3.keys,
      canvasTimeStart = _ref3.canvasTimeStart,
      canvasTimeEnd = _ref3.canvasTimeEnd,
      canvasWidth = _ref3.canvasWidth,
      groupOrders = _ref3.groupOrders,
      lineHeight = _ref3.lineHeight,
      itemHeightRatio = _ref3.itemHeightRatio;
  var itemId = (0, _generic._get)(item, keys.itemIdKey);
  var dimension = calculateDimensions({
    itemTimeStart: (0, _generic._get)(item, keys.itemTimeStartKey),
    itemTimeEnd: (0, _generic._get)(item, keys.itemTimeEndKey),
    canvasTimeStart: canvasTimeStart,
    canvasTimeEnd: canvasTimeEnd,
    canvasWidth: canvasWidth
  });

  if (dimension) {
    dimension.top = null;
    dimension.order = groupOrders[(0, _generic._get)(item, keys.itemGroupKey)];
    dimension.stack = !item.isOverlay;
    dimension.height = lineHeight * itemHeightRatio;
    return {
      id: itemId,
      dimensions: dimension
    };
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


function getItemWithInteractions(_ref4) {
  var _objectSpread2;

  var item = _ref4.item,
      keys = _ref4.keys,
      draggingItem = _ref4.draggingItem,
      resizingItem = _ref4.resizingItem,
      dragTime = _ref4.dragTime,
      resizingEdge = _ref4.resizingEdge,
      resizeTime = _ref4.resizeTime,
      groups = _ref4.groups,
      newGroupOrder = _ref4.newGroupOrder;
  if (!resizingItem && !draggingItem) return item;
  var itemId = (0, _generic._get)(item, keys.itemIdKey);
  var isDragging = itemId === draggingItem;
  var isResizing = itemId === resizingItem;

  var _calculateInteraction = calculateInteractionNewTimes({
    itemTimeStart: (0, _generic._get)(item, keys.itemTimeStartKey),
    itemTimeEnd: (0, _generic._get)(item, keys.itemTimeEndKey),
    isDragging: isDragging,
    isResizing: isResizing,
    dragTime: dragTime,
    resizingEdge: resizingEdge,
    resizeTime: resizeTime
  }),
      _calculateInteraction2 = _slicedToArray(_calculateInteraction, 2),
      itemTimeStart = _calculateInteraction2[0],
      itemTimeEnd = _calculateInteraction2[1];

  var newItem = _objectSpread({}, item, (_objectSpread2 = {}, _defineProperty(_objectSpread2, keys.itemTimeStartKey, itemTimeStart), _defineProperty(_objectSpread2, keys.itemTimeEndKey, itemTimeEnd), _defineProperty(_objectSpread2, keys.itemGroupKey, isDragging ? (0, _generic._get)(groups[newGroupOrder], keys.groupIdKey) : (0, _generic._get)(item, keys.itemGroupKey)), _objectSpread2));

  return newItem;
}
/**
 * get canvas start and end time from visible start and end time
 * @param {number} visibleTimeStart
 * @param {number} visibleTimeEnd
 */


function getCanvasBoundariesFromVisibleTime(visibleTimeStart, visibleTimeEnd) {
  var zoom = visibleTimeEnd - visibleTimeStart;
  var canvasTimeStart = visibleTimeStart - (visibleTimeEnd - visibleTimeStart);
  var canvasTimeEnd = canvasTimeStart + zoom * 3;
  return [canvasTimeStart, canvasTimeEnd];
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


function calculateScrollCanvas(visibleTimeStart, visibleTimeEnd, forceUpdateDimensions, items, groups, props, state) {
  var oldCanvasTimeStart = state.canvasTimeStart;
  var oldZoom = state.visibleTimeEnd - state.visibleTimeStart;
  var newZoom = visibleTimeEnd - visibleTimeStart;
  var newState = {
    visibleTimeStart: visibleTimeStart,
    visibleTimeEnd: visibleTimeEnd // Check if the current canvas covers the new times

  };
  var canKeepCanvas = newZoom === oldZoom && visibleTimeStart >= oldCanvasTimeStart + oldZoom * 0.5 && visibleTimeStart <= oldCanvasTimeStart + oldZoom * 1.5 && visibleTimeEnd >= oldCanvasTimeStart + oldZoom * 1.5 && visibleTimeEnd <= oldCanvasTimeStart + oldZoom * 2.5;

  if (!canKeepCanvas || forceUpdateDimensions) {
    var _getCanvasBoundariesF = getCanvasBoundariesFromVisibleTime(visibleTimeStart, visibleTimeEnd),
        _getCanvasBoundariesF2 = _slicedToArray(_getCanvasBoundariesF, 2),
        canvasTimeStart = _getCanvasBoundariesF2[0],
        canvasTimeEnd = _getCanvasBoundariesF2[1];

    newState.canvasTimeStart = canvasTimeStart;
    newState.canvasTimeEnd = canvasTimeEnd;

    var mergedState = _objectSpread({}, state, {}, newState);

    var canvasWidth = getCanvasWidth(mergedState.width); // The canvas cannot be kept, so calculate the new items position

    Object.assign(newState, stackTimelineItems(items, groups, canvasWidth, mergedState.canvasTimeStart, mergedState.canvasTimeEnd, props.keys, props.lineHeight, props.itemHeightRatio, props.stackItems, mergedState.draggingItem, mergedState.resizingItem, mergedState.dragTime, mergedState.resizingEdge, mergedState.resizeTime, mergedState.newGroupOrder));
  }

  return newState;
}