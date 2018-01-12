'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports._get = _get;
exports._length = _length;
exports.arraysEqual = arraysEqual;
exports.iterateTimes = iterateTimes;
exports.getMinUnit = getMinUnit;
exports.getNextUnit = getNextUnit;
exports.getParentPosition = getParentPosition;
exports.coordinateToTimeRatio = coordinateToTimeRatio;
exports.calculateDimensions = calculateDimensions;
exports.getGroupOrders = getGroupOrders;
exports.getVisibleItems = getVisibleItems;
exports.collision = collision;
exports.stack = stack;
exports.nostack = nostack;
exports.keyBy = keyBy;
exports.getGroupedItems = getGroupedItems;
exports.hasSomeParentTheClass = hasSomeParentTheClass;
exports.deepObjectCompare = deepObjectCompare;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EPSILON = 0.001;

// so we could use both immutable.js objects and regular objects
function _get(object, key) {
  return typeof object.get === 'function' ? object.get(key) : object[key];
}

function _length(object) {
  return typeof object.count === 'function' ? object.count() : object.length;
}

function arraysEqual(array1, array2) {
  return _length(array1) === _length(array2) && array1.every(function (element, index) {
    return element === _get(array2, index);
  });
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

function getMinUnit(zoom, width, timeSteps) {
  var timeDividers = {
    second: 1000,
    minute: 60,
    hour: 60,
    day: 24,
    month: 30,
    year: 12
  };

  var minUnit = 'year';
  var breakCount = zoom;
  var minCellWidth = 17;

  Object.keys(timeDividers).some(function (unit) {
    breakCount = breakCount / timeDividers[unit];
    var cellCount = breakCount / timeSteps[unit];
    var countNeeded = width / (timeSteps[unit] && timeSteps[unit] > 1 ? 3 * minCellWidth : minCellWidth);

    if (cellCount < countNeeded) {
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

function getParentPosition(element) {
  var xPosition = 0;
  var yPosition = 0;
  var first = true;

  while (element) {
    xPosition += element.offsetLeft - (first ? 0 : element.scrollLeft) + element.clientLeft;
    yPosition += element.offsetTop - (first ? 0 : element.scrollTop) + element.clientTop;
    element = element.offsetParent;
    first = false;
  }
  return { x: xPosition, y: yPosition };
}

function coordinateToTimeRatio(canvasTimeStart, canvasTimeEnd, canvasWidth) {
  return (canvasTimeEnd - canvasTimeStart) / canvasWidth;
}

function calculateDimensions(_ref) {
  var itemTimeStart = _ref.itemTimeStart,
      itemTimeEnd = _ref.itemTimeEnd,
      isDragging = _ref.isDragging,
      isResizing = _ref.isResizing,
      canvasTimeStart = _ref.canvasTimeStart,
      canvasTimeEnd = _ref.canvasTimeEnd,
      canvasWidth = _ref.canvasWidth,
      dragSnap = _ref.dragSnap,
      dragTime = _ref.dragTime,
      resizingItem = _ref.resizingItem,
      resizingEdge = _ref.resizingEdge,
      resizeTime = _ref.resizeTime,
      fullUpdate = _ref.fullUpdate,
      visibleTimeStart = _ref.visibleTimeStart,
      visibleTimeEnd = _ref.visibleTimeEnd;

  var itemStart = isResizing && resizingEdge === 'left' ? resizeTime : itemTimeStart;
  var itemEnd = isResizing && resizingEdge === 'right' ? resizeTime : itemTimeEnd;

  var x = isDragging ? dragTime : itemStart;

  var w = Math.max(itemEnd - itemStart, dragSnap);

  var collisionX = itemStart;
  var collisionW = w;

  if (isDragging) {
    if (itemTimeStart >= dragTime) {
      collisionX = dragTime;
      collisionW = Math.max(itemTimeEnd - dragTime, dragSnap);
    } else {
      collisionW = Math.max(dragTime - itemTimeStart + w, dragSnap);
    }
  }

  var clippedLeft = false;
  var clippedRight = false;

  if (fullUpdate) {
    if (!isDragging && (visibleTimeStart > x + w || visibleTimeEnd < x)) {
      return null;
    }

    if (visibleTimeStart > x) {
      w -= visibleTimeStart - x;
      x = visibleTimeStart;
      if (isDragging && w < 0) {
        x += w;
        w = 0;
      }
      clippedLeft = true;
    }
    if (x + w > visibleTimeEnd) {
      w -= x + w - visibleTimeEnd;
      clippedRight = true;
    }
  }

  var ratio = 1 / coordinateToTimeRatio(canvasTimeStart, canvasTimeEnd, canvasWidth);

  var dimensions = {
    left: (x - canvasTimeStart) * ratio,
    width: Math.max(w * ratio, 3),
    collisionLeft: collisionX,
    originalLeft: itemTimeStart,
    collisionWidth: collisionW,
    clippedLeft: clippedLeft,
    clippedRight: clippedRight
  };

  return dimensions;
}

function getGroupOrders(groups, keys) {
  var groupIdKey = keys.groupIdKey;


  var groupOrders = {};

  for (var i = 0; i < groups.length; i++) {
    groupOrders[_get(groups[i], groupIdKey)] = i;
  }

  return groupOrders;
}

function getVisibleItems(items, canvasTimeStart, canvasTimeEnd, keys) {
  var itemTimeStartKey = keys.itemTimeStartKey,
      itemTimeEndKey = keys.itemTimeEndKey;


  return items.filter(function (item) {
    return _get(item, itemTimeStartKey) <= canvasTimeEnd && _get(item, itemTimeEndKey) >= canvasTimeStart;
  });
}

function collision(a, b, lineHeight) {
  // var verticalMargin = (lineHeight - a.height)/2;
  var verticalMargin = 0;
  return a.collisionLeft + EPSILON < b.collisionLeft + b.collisionWidth && a.collisionLeft + a.collisionWidth - EPSILON > b.collisionLeft && a.top - verticalMargin + EPSILON < b.top + b.height && a.top + a.height + verticalMargin - EPSILON > b.top;
}

function stack(items, groupOrders, lineHeight, headerHeight, force) {
  var i, iMax;
  var totalHeight = headerHeight;

  var groupHeights = [];
  var groupTops = [];

  var groupedItems = getGroupedItems(items, groupOrders);

  if (force) {
    // reset top position of all items
    for (i = 0, iMax = items.length; i < iMax; i++) {
      items[i].dimensions.top = null;
    }
  }

  groupedItems.forEach(function (group, index, array) {
    // calculate new, non-overlapping positions
    groupTops.push(totalHeight);

    var groupHeight = 0;
    var verticalMargin = 0;
    for (i = 0, iMax = group.length; i < iMax; i++) {
      var item = group[i];
      verticalMargin = lineHeight - item.dimensions.height;

      if (item.dimensions.stack && item.dimensions.top === null) {
        item.dimensions.top = totalHeight + verticalMargin;
        groupHeight = Math.max(groupHeight, lineHeight);
        do {
          var collidingItem = null;
          for (var j = 0, jj = group.length; j < jj; j++) {
            var other = group[j];
            if (other.dimensions.top !== null && other !== item && other.dimensions.stack && collision(item.dimensions, other.dimensions, lineHeight)) {
              collidingItem = other;
              break;
            } else {
              // console.log('dont test', other.top !== null, other !== item, other.stack);
            }
          }

          if (collidingItem != null) {
            // There is a collision. Reposition the items above the colliding element
            item.dimensions.top = collidingItem.dimensions.top + lineHeight;
            groupHeight = Math.max(groupHeight, item.dimensions.top + item.dimensions.height - totalHeight);
          }
        } while (collidingItem);
      }
    }

    groupHeights.push(Math.max(groupHeight + verticalMargin, lineHeight));
    totalHeight += Math.max(groupHeight + verticalMargin, lineHeight);
  });
  return {
    height: totalHeight,
    groupHeights: groupHeights,
    groupTops: groupTops
  };
}

function nostack(items, groupOrders, lineHeight, headerHeight, force) {
  var i, iMax;

  var totalHeight = headerHeight;

  var groupHeights = [];
  var groupTops = [];

  var groupedItems = getGroupedItems(items, groupOrders);

  if (force) {
    // reset top position of all items
    for (i = 0, iMax = items.length; i < iMax; i++) {
      items[i].dimensions.top = null;
    }
  }

  groupedItems.forEach(function (group, index, array) {
    // calculate new, non-overlapping positions
    groupTops.push(totalHeight);

    var groupHeight = 0;
    for (i = 0, iMax = group.length; i < iMax; i++) {
      var item = group[i];
      var verticalMargin = (lineHeight - item.dimensions.height) / 2;

      if (item.dimensions.top === null) {
        item.dimensions.top = totalHeight + verticalMargin;
        groupHeight = Math.max(groupHeight, lineHeight);
      }
    }

    groupHeights.push(Math.max(groupHeight, lineHeight));
    totalHeight += Math.max(groupHeight, lineHeight);
  });
  return {
    height: totalHeight,
    groupHeights: groupHeights,
    groupTops: groupTops
  };
}

function keyBy(value, key) {
  var obj = {};

  value.forEach(function (element, index, array) {
    obj[element[key]] = element;
  });

  return obj;
}

function getGroupedItems(items, groupOrders) {
  var arr = [];

  // Initialize with empty arrays for each group
  for (var i = 0; i < Object.keys(groupOrders).length; i++) {
    arr[i] = [];
  }
  // Populate groups
  for (var _i = 0; _i < items.length; _i++) {
    if (items[_i].dimensions.order !== undefined) {
      arr[items[_i].dimensions.order].push(items[_i]);
    }
  }

  return arr;
}

function hasSomeParentTheClass(element, classname) {
  if (element.className && element.className.split(' ').indexOf(classname) >= 0) return true;
  return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
}

function deepObjectCompare(obj1, obj2) {
  for (var p in obj1) {
    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

    switch (_typeof(obj1[p])) {
      case 'object':
        if (!Object.compare(obj1[p], obj2[p])) return false;
        break;
      case 'function':
        if (typeof obj2[p] === 'undefined' || p !== 'compare' && obj1[p].toString() !== obj2[p].toString()) return false;
        break;
      default:
        if (obj1[p] !== obj2[p]) return false;
    }
  }

  for (var r in obj2) {
    if (typeof obj1[r] === 'undefined') return false;
  }
  return true;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(EPSILON, 'EPSILON', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(_get, '_get', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(_length, '_length', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(arraysEqual, 'arraysEqual', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(iterateTimes, 'iterateTimes', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(getMinUnit, 'getMinUnit', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(getNextUnit, 'getNextUnit', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(getParentPosition, 'getParentPosition', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(coordinateToTimeRatio, 'coordinateToTimeRatio', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(calculateDimensions, 'calculateDimensions', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(getGroupOrders, 'getGroupOrders', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(getVisibleItems, 'getVisibleItems', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(collision, 'collision', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(stack, 'stack', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(nostack, 'nostack', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(keyBy, 'keyBy', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(getGroupedItems, 'getGroupedItems', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(hasSomeParentTheClass, 'hasSomeParentTheClass', 'src/lib/utils.js');

  __REACT_HOT_LOADER__.register(deepObjectCompare, 'deepObjectCompare', 'src/lib/utils.js');
}();

;