'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minCellWidth = undefined;
exports.coordinateToTimeRatio = coordinateToTimeRatio;
exports.calculateXPositionForTime = calculateXPositionForTime;
exports.calculateTimeForXPosition = calculateTimeForXPosition;
exports.iterateTimes = iterateTimes;
exports.getMinUnit = getMinUnit;
exports.getNextUnit = getNextUnit;
exports.calculateDimensions = calculateDimensions;
exports.getGroupOrders = getGroupOrders;
exports.getVisibleItems = getVisibleItems;
exports.collision = collision;
exports.stackAll = stackAll;
exports.stackItems = stackItems;
exports.calculateScrollCanvas = calculateScrollCanvas;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _generic = require('./generic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  var time = (0, _moment2.default)(start).startOf(unit);

  if (timeSteps[unit] && timeSteps[unit] > 1) {
    var value = time.get(unit);
    time.set(unit, value - value % timeSteps[unit]);
  }

  while (time.valueOf() < end) {
    var nextTime = (0, _moment2.default)(time).add(timeSteps[unit] || 1, unit + 's');
    callback(time, nextTime);
    time = nextTime;
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
var minCellWidth = exports.minCellWidth = 17;

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

  var minUnit = 'year';

  // this timespan is in ms initially
  var nextTimeSpanInUnitContext = zoom;

  Object.keys(timeDividers).some(function (unit) {
    // converts previous time span to current unit
    // (e.g. milliseconds to seconds, seconds to minutes, etc)
    nextTimeSpanInUnitContext = nextTimeSpanInUnitContext / timeDividers[unit];

    // timeSteps is "
    // With what step to display different units. E.g. 15 for minute means only minutes 0, 15, 30 and 45 will be shown."
    // how many cells would be rendered given this time span, for this unit?
    // e.g. for time span of 60 minutes, and time step of 1, we would render 60 cells
    var cellsToBeRenderedForCurrentUnit = nextTimeSpanInUnitContext / timeSteps[unit];

    // what is happening here? why 3 if time steps are greater than 1??
    var cellWidthToUse = timeSteps[unit] && timeSteps[unit] > 1 ? 3 * minCellWidth : minCellWidth;

    // for the minWidth of a cell, how many cells would be rendered given
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
    month: 'year'
  };

  return nextUnits[unit] || '';
}

function calculateDimensions(_ref) {
  var itemTimeStart = _ref.itemTimeStart,
      itemTimeEnd = _ref.itemTimeEnd,
      isDragging = _ref.isDragging,
      isResizing = _ref.isResizing,
      canvasTimeStart = _ref.canvasTimeStart,
      canvasTimeEnd = _ref.canvasTimeEnd,
      canvasWidth = _ref.canvasWidth,
      dragTime = _ref.dragTime,
      resizingEdge = _ref.resizingEdge,
      resizeTime = _ref.resizeTime;

  var itemStart = isResizing && resizingEdge === 'left' ? resizeTime : itemTimeStart;
  var itemEnd = isResizing && resizingEdge === 'right' ? resizeTime : itemTimeEnd;

  var itemTimeRange = itemEnd - itemStart;

  var newItemStart = isDragging ? dragTime : itemStart;

  var ratio = 1 / coordinateToTimeRatio(canvasTimeStart, canvasTimeEnd, canvasWidth);

  // restrict startTime and endTime to be bounded by canvasTimeStart and canasTimeEnd
  var effectiveStartTime = Math.max(itemStart, canvasTimeStart);
  var effectiveEndTime = Math.min(itemEnd, canvasTimeEnd);
  var itemWidth = (effectiveEndTime - effectiveStartTime) * ratio;

  var dimensions = {
    left: Math.max(newItemStart - canvasTimeStart, 0) * ratio,
    width: Math.max(itemWidth, 3),
    collisionLeft: newItemStart,
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
    groupOrders[(0, _generic._get)(groups[i], groupIdKey)] = { index: i, group: groups[i] };
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
  var keys = Object.keys(groupOrders);
  // Initialize with result object for each group
  for (var i = 0; i < keys.length; i++) {
    var groupOrder = groupOrders[keys[i]];
    groupedItems[i] = {
      index: groupOrder.index,
      group: groupOrder.group,
      items: []
    };
  }

  // Populate groups
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
function groupStack(lineHeight, item, group, groupHeight, totalHeight, i) {
  // calculate non-overlapping positions
  var curHeight = groupHeight;
  var verticalMargin = lineHeight - item.dimensions.height;
  if (item.dimensions.stack && item.dimensions.top === null) {
    item.dimensions.top = totalHeight + verticalMargin;
    curHeight = Math.max(curHeight, lineHeight);
    do {
      var collidingItem = null;
      //Items are placed from i=0 onwards, only check items with index < i
      for (var j = i - 1, jj = 0; j >= jj; j--) {
        var other = group[j];
        if (other.dimensions.top !== null && other.dimensions.stack && collision(item.dimensions, other.dimensions, lineHeight)) {
          collidingItem = other;
          break;
        } else {
          // console.log('dont test', other.top !== null, other !== item, other.stack);
        }
      }

      if (collidingItem != null) {
        // There is a collision. Reposition the items above the colliding element
        item.dimensions.top = collidingItem.dimensions.top + lineHeight;
        curHeight = Math.max(curHeight, item.dimensions.top + item.dimensions.height - totalHeight);
      }
    } while (collidingItem);
  }
  return { groupHeight: curHeight, verticalMargin: verticalMargin };
}

// Calculate the position of this item for a group that is not being stacked
function groupNoStack(lineHeight, item, groupHeight, totalHeight) {
  var verticalMargin = (lineHeight - item.dimensions.height) / 2;
  if (item.dimensions.top === null) {
    item.dimensions.top = totalHeight + verticalMargin;
    groupHeight = Math.max(groupHeight, lineHeight);
  }
  return { groupHeight: groupHeight, verticalMargin: 0 };
}

/**
 * Stack all groups
 * @param {*} items items to be stacked
 * @param {*} groupOrders the groupOrders object
 * @param {*} lineHeight 
 * @param {*} stackItems should items be stacked?
 */
function stackAll(items, groupOrders, lineHeight, stackItems) {
  var i, iMax;
  var totalHeight = 0;

  var groupHeights = [];
  var groupTops = [];

  var groupedItems = getGroupedItems(items, groupOrders);

  for (var index in groupedItems) {
    var groupItems = groupedItems[index];
    var _items = groupItems.items,
        group = groupItems.group;

    groupTops.push(totalHeight);

    // Is group being stacked?
    var isGroupStacked = group.stackItems !== undefined ? group.stackItems : stackItems;
    var groupHeight = 0;
    var verticalMargin = 0;
    // Find positions for each item in group
    for (i = 0, iMax = _items.length; i < iMax; i++) {
      var r = {};
      if (isGroupStacked) {
        r = groupStack(lineHeight, _items[i], _items, groupHeight, totalHeight, i);
      } else {
        r = groupNoStack(lineHeight, _items[i], groupHeight, totalHeight);
      }
      groupHeight = r.groupHeight;
      verticalMargin = r.verticalMargin;
    }

    // If group height is overridden, push new height
    // Do this late as item position still needs to be calculated
    if (group.height) {
      groupHeights.push(group.height);
      totalHeight += group.height;
    } else {
      groupHeights.push(Math.max(groupHeight + verticalMargin, lineHeight));
      totalHeight += Math.max(groupHeight + verticalMargin, lineHeight);
    }
  }
  return {
    height: totalHeight,
    groupHeights: groupHeights,
    groupTops: groupTops
  };
}

/**
 * Stack the items that will be visible
 * within the canvas area
 * @param {item[]} items 
 * @param {group[]} groups 
 * @param {number} canvasTimeStart 
 * @param {number} visibleTimeStart 
 * @param {number} visibleTimeEnd 
 * @param {number} width 
 * @param {*} props 
 * @param {*} state 
 */
function stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, width, props, state) {
  // if there are no groups return an empty array of dimensions
  if (groups.length === 0) {
    return {
      dimensionItems: [],
      height: 0,
      groupHeights: [],
      groupTops: []
    };
  }

  var keys = props.keys,
      lineHeight = props.lineHeight,
      stackItems = props.stackItems,
      itemHeightRatio = props.itemHeightRatio;
  var draggingItem = state.draggingItem,
      dragTime = state.dragTime,
      resizingItem = state.resizingItem,
      resizingEdge = state.resizingEdge,
      resizeTime = state.resizeTime,
      newGroupOrder = state.newGroupOrder;

  var zoom = visibleTimeEnd - visibleTimeStart;
  var canvasTimeEnd = canvasTimeStart + zoom * 3;
  var canvasWidth = width * 3;

  // Find items that fit within canvasTimeStart and canvasTimeEnd
  // this is used when calculating the number of 'lines' each group
  // will use.
  var visibleItems = getVisibleItems(items, canvasTimeStart, canvasTimeEnd, keys);

  // Get the order of groups based on their id key
  var groupOrders = getGroupOrders(groups, keys);

  var dimensionItems = visibleItems.reduce(function (memo, item) {
    var itemId = (0, _generic._get)(item, keys.itemIdKey);
    var isDragging = itemId === draggingItem;
    var isResizing = itemId === resizingItem;

    var dimension = calculateDimensions({
      itemTimeStart: (0, _generic._get)(item, keys.itemTimeStartKey),
      itemTimeEnd: (0, _generic._get)(item, keys.itemTimeEndKey),
      isDragging: isDragging,
      isResizing: isResizing,
      canvasTimeStart: canvasTimeStart,
      canvasTimeEnd: canvasTimeEnd,
      canvasWidth: canvasWidth,
      dragTime: dragTime,
      resizingEdge: resizingEdge,
      resizeTime: resizeTime
    });

    if (dimension) {
      dimension.top = null;
      dimension.order = isDragging ? { index: newGroupOrder, group: groups[newGroupOrder] } : groupOrders[(0, _generic._get)(item, keys.itemGroupKey)];
      dimension.stack = !item.isOverlay;
      dimension.height = lineHeight * itemHeightRatio;
      dimension.isDragging = isDragging;

      memo.push({
        id: itemId,
        dimensions: dimension
      });
    }

    return memo;
  }, []);

  // Get a new array of groupOrders holding the stacked items

  var _stackAll = stackAll(dimensionItems, groupOrders, lineHeight, stackItems),
      height = _stackAll.height,
      groupHeights = _stackAll.groupHeights,
      groupTops = _stackAll.groupTops;

  return { dimensionItems: dimensionItems, height: height, groupHeights: groupHeights, groupTops: groupTops };
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

  var newState = { visibleTimeStart: visibleTimeStart, visibleTimeEnd: visibleTimeEnd

    // Check if the current canvas covers the new times
  };var canKeepCanvas = visibleTimeStart >= oldCanvasTimeStart + oldZoom * 0.5 && visibleTimeStart <= oldCanvasTimeStart + oldZoom * 1.5 && visibleTimeEnd >= oldCanvasTimeStart + oldZoom * 1.5 && visibleTimeEnd <= oldCanvasTimeStart + oldZoom * 2.5;

  if (!canKeepCanvas || forceUpdateDimensions) {
    newState.canvasTimeStart = visibleTimeStart - (visibleTimeEnd - visibleTimeStart);
    // The canvas cannot be kept, so calculate the new items position
    Object.assign(newState, stackItems(items, groups, newState.canvasTimeStart, visibleTimeStart, visibleTimeEnd, state.width, props, state));
  }
  return newState;
}