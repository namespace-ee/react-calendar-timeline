'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._get = _get;
exports._length = _length;
exports.arraysEqual = arraysEqual;
exports.deepObjectCompare = deepObjectCompare;
exports.keyBy = keyBy;
exports.noop = noop;

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

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

function deepObjectCompare(obj1, obj2) {
  return (0, _lodash2.default)(obj1, obj2);
}

function keyBy(value, key) {
  var obj = {};

  value.forEach(function (element) {
    obj[element[key]] = element;
  });

  return obj;
}

function noop() {}