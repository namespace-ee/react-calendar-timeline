'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDefaultRenderer = exports.createMarkerStylesWithLeftOffset = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Baseline styles to get the marker to render correctly
 */
var criticalStyles = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '2px',
  backgroundColor: 'black',
  // by default, pointer events (specifically click) will
  // "pass through".  This is added so that CursorMarker
  // will not get in the way of canvas click
  pointerEvents: 'none'

  // FIXME: this creates a new object each time in render
  // might want to memoize this?
};var createMarkerStylesWithLeftOffset = exports.createMarkerStylesWithLeftOffset = function createMarkerStylesWithLeftOffset(leftOffset) {
  return _extends({}, criticalStyles, {
    left: leftOffset
  });
};

var createDefaultRenderer = exports.createDefaultRenderer = function createDefaultRenderer(dataTestidValue) {
  // eslint-disable-next-line
  return function DefaultMarkerRenderer(_ref) {
    var styles = _ref.styles;

    return _react2.default.createElement('div', { style: styles });
  };
};