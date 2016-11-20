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
exports.groupBy = groupBy;
exports.hasSomeParentTheClass = hasSomeParentTheClass;
exports.createGradientPattern = createGradientPattern;
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
  var item = _ref.item,
      order = _ref.order,
      keys = _ref.keys,
      canvasTimeStart = _ref.canvasTimeStart,
      canvasTimeEnd = _ref.canvasTimeEnd,
      canvasWidth = _ref.canvasWidth,
      dragSnap = _ref.dragSnap,
      lineHeight = _ref.lineHeight,
      draggingItem = _ref.draggingItem,
      dragTime = _ref.dragTime,
      resizingItem = _ref.resizingItem,
      resizingEdge = _ref.resizingEdge,
      resizeTime = _ref.resizeTime,
      newGroupOrder = _ref.newGroupOrder,
      itemHeightRatio = _ref.itemHeightRatio,
      fullUpdate = _ref.fullUpdate,
      visibleTimeStart = _ref.visibleTimeStart,
      visibleTimeEnd = _ref.visibleTimeEnd;

  var itemId = _get(item, keys.itemIdKey);
  var itemTimeStart = _get(item, keys.itemTimeStartKey);
  var itemTimeEnd = _get(item, keys.itemTimeEndKey);

  var isDragging = itemId === draggingItem;
  var isResizing = itemId === resizingItem;

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
  var h = lineHeight * itemHeightRatio;

  var dimensions = {
    left: (x - canvasTimeStart) * ratio,
    top: null,
    width: Math.max(w * ratio, 3),
    height: h,
    order: isDragging ? newGroupOrder : order,
    stack: true,
    collisionLeft: collisionX,
    originalLeft: itemTimeStart,
    collisionWidth: collisionW,
    lineHeight: lineHeight,
    isDragging: isDragging,
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

  var groupHeights = {};
  var groupTops = {};

  var groupedItems = groupBy(items, function (item) {
    return item.dimensions.order;
  });

  if (force) {
    // reset top position of all items
    for (i = 0, iMax = items.length; i < iMax; i++) {
      items[i].dimensions.top = null;
    }
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(groupOrders)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var url = _step.value;

      var key = groupOrders[url];
      // calculate new, non-overlapping positions
      var group = groupedItems[key] || [];

      groupTops[key] = totalHeight;

      var groupHeight = 0;
      var verticalMargin = 0;
      for (i = 0, iMax = group.length; i < iMax; i++) {
        var item = group[i];
        verticalMargin = item.dimensions.lineHeight - item.dimensions.height;

        if (item.dimensions.stack && item.dimensions.top === null) {
          item.dimensions.top = totalHeight + verticalMargin;
          groupHeight = Math.max(groupHeight, item.dimensions.lineHeight);
          do {
            var collidingItem = null;
            for (var j = 0, jj = group.length; j < jj; j++) {
              var other = group[j];
              if (other.top !== null && other !== item && other.dimensions.stack && collision(item.dimensions, other.dimensions, item.dimensions.lineHeight)) {
                collidingItem = other;
                break;
              } else {
                // console.log('dont test', other.top !== null, other !== item, other.stack);
              }
            }

            if (collidingItem != null) {
              // There is a collision. Reposition the items above the colliding element
              item.dimensions.top = collidingItem.dimensions.top + collidingItem.dimensions.lineHeight;
              groupHeight = Math.max(groupHeight, item.dimensions.top + item.dimensions.height - totalHeight);
            }
          } while (collidingItem);
        }
      }
      groupHeights[key] = Math.max(groupHeight + verticalMargin, lineHeight);
      totalHeight += Math.max(groupHeight + verticalMargin, lineHeight);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return {
    height: totalHeight,
    groupHeights: groupHeights,
    groupTops: groupTops
  };
}

function nostack(items, groupOrders, lineHeight, headerHeight, force) {
  var i, iMax;

  var totalHeight = headerHeight;

  var groupHeights = {};
  var groupTops = {};

  var groupedItems = groupBy(items, function (item) {
    return item.dimensions.order;
  });

  if (force) {
    // reset top position of all items
    for (i = 0, iMax = items.length; i < iMax; i++) {
      items[i].dimensions.top = null;
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object.keys(groupOrders)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var url = _step2.value;

      var key = groupOrders[url];
      // calculate new, non-overlapping positions
      var group = groupedItems[key] || [];

      groupTops[key] = totalHeight;

      var groupHeight = 0;
      for (i = 0, iMax = group.length; i < iMax; i++) {
        var item = group[i];
        var verticalMargin = (item.dimensions.lineHeight - item.dimensions.height) / 2;

        if (item.dimensions.top === null) {
          item.dimensions.top = totalHeight + verticalMargin;
          groupHeight = Math.max(groupHeight, item.dimensions.lineHeight);
        }
      }
      groupHeights[key] = Math.max(groupHeight, lineHeight);
      totalHeight += Math.max(groupHeight, lineHeight);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

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

function groupBy(collection, groupFunction) {
  var obj = {};

  collection.forEach(function (element, index, array) {
    var key = groupFunction(element);
    if (!obj[key]) {
      obj[key] = [];
    }
    obj[key].push(element);
  });

  return obj;
}

function hasSomeParentTheClass(element, classname) {
  if (element.className && element.className.split(' ').indexOf(classname) >= 0) return true;
  return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
}

function createGradientPattern(lineHeight, color1, color2, borderColor) {
  if (borderColor) {
    if (!color2 || color1 === color2) {
      return 'repeating-linear-gradient(to bottom, ' + (color1 + ',') + (color1 + ' ' + (lineHeight - 1) + 'px,') + (borderColor + ' ' + (lineHeight - 1) + 'px,') + (borderColor + ' ' + lineHeight + 'px') + ')';
    } else {
      return 'repeating-linear-gradient(to bottom, ' + (color1 + ',') + (color1 + ' ' + (lineHeight - 1) + 'px,') + (borderColor + ' ' + (lineHeight - 1) + 'px,') + (borderColor + ' ' + lineHeight + 'px,') + (color2 + ' ' + lineHeight + 'px,') + (color2 + ' ' + (lineHeight * 2 - 1) + 'px,') + (borderColor + ' ' + (lineHeight * 2 - 1) + 'px,') + (borderColor + ' ' + lineHeight * 2 + 'px') + ')';
    }
  } else {
    if (!color2 || color1 === color2) {
      return color1;
    } else {
      return 'repeating-linear-gradient(to bottom,' + color1 + ',' + color1 + ' ' + lineHeight + 'px,' + color2 + ' ' + lineHeight + 'px,' + color2 + ' ' + lineHeight * 2 + 'px)';
    }
  }
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