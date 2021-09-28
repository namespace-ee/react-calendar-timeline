"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDefaultRenderer = exports.createMarkerStylesWithLeftOffset = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
}; // FIXME: this creates a new object each time in render
// might want to memoize this?

var createMarkerStylesWithLeftOffset = function createMarkerStylesWithLeftOffset(leftOffset) {
  return _objectSpread(_objectSpread({}, criticalStyles), {}, {
    left: leftOffset
  });
};

exports.createMarkerStylesWithLeftOffset = createMarkerStylesWithLeftOffset;

var createDefaultRenderer = function createDefaultRenderer(dataTestidValue) {
  // eslint-disable-next-line
  return function DefaultMarkerRenderer(_ref) {
    var styles = _ref.styles;
    return /*#__PURE__*/_react["default"].createElement("div", {
      style: styles
    });
  };
};

exports.createDefaultRenderer = createDefaultRenderer;