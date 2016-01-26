'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._get = _get;
exports._length = _length;
exports.arraysEqual = arraysEqual;
exports.iterateTimes = iterateTimes;
exports.getMinUnit = getMinUnit;
exports.getNextUnit = getNextUnit;
exports.getParentPosition = getParentPosition;
exports.createGradientPattern = createGradientPattern;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function iterateTimes(start, end, unit, callback) {
  var time = (0, _moment2.default)(start).startOf(unit);

  while (time.valueOf() < end) {
    var nextTime = (0, _moment2.default)(time).add(1, unit + 's');
    callback(time, nextTime);
    time = nextTime;
  }
}

function getMinUnit(zoom, width) {
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
    if (breakCount < width / minCellWidth) {
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