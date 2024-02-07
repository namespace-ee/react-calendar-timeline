"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _TimelineStateContext = require("../timeline/TimelineStateContext");
var _CustomHeader = _interopRequireDefault(require("./CustomHeader"));
var _calendar = require("../utility/calendar");
var _defaultConfig = require("../default-config");
var _memoizeOne = _interopRequireDefault(require("memoize-one"));
var _CustomDateHeader = require("./CustomDateHeader");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DateHeader = /*#__PURE__*/function (_React$Component) {
  _inherits(DateHeader, _React$Component);
  function DateHeader() {
    var _this;
    _classCallCheck(this, DateHeader);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, DateHeader, [].concat(args));
    _defineProperty(_assertThisInitialized(_this), "getHeaderUnit", function () {
      if (_this.props.unit === 'primaryHeader') {
        return (0, _calendar.getNextUnit)(_this.props.timelineUnit);
      } else if (_this.props.unit) {
        return _this.props.unit;
      }
      return _this.props.timelineUnit;
    });
    _defineProperty(_assertThisInitialized(_this), "getRootStyle", (0, _memoizeOne["default"])(function (style) {
      return _objectSpread({
        height: 30
      }, style);
    }));
    _defineProperty(_assertThisInitialized(_this), "getLabelFormat", function (interval, unit, labelWidth) {
      var labelFormat = _this.props.labelFormat;
      if (typeof labelFormat === 'string') {
        var startTime = interval[0];
        return startTime.format(labelFormat);
      } else if (typeof labelFormat === 'function') {
        return labelFormat(interval, unit, labelWidth);
      } else {
        throw new Error('labelFormat should be function or string');
      }
    });
    _defineProperty(_assertThisInitialized(_this), "getHeaderData", (0, _memoizeOne["default"])(function (intervalRenderer, style, className, getLabelFormat, unitProp, headerData) {
      return {
        intervalRenderer: intervalRenderer,
        style: style,
        className: className,
        getLabelFormat: getLabelFormat,
        unitProp: unitProp,
        headerData: headerData
      };
    }));
    return _this;
  }
  _createClass(DateHeader, [{
    key: "render",
    value: function render() {
      var unit = this.getHeaderUnit();
      var _this$props = this.props,
        headerData = _this$props.headerData,
        height = _this$props.height;
      return /*#__PURE__*/_react["default"].createElement(_CustomHeader["default"], {
        unit: unit,
        height: height,
        headerData: this.getHeaderData(this.props.intervalRenderer, this.getRootStyle(this.props.style), this.props.className, this.getLabelFormat, this.props.unit, this.props.headerData),
        children: _CustomDateHeader.CustomDateHeader
      });
    }
  }]);
  return DateHeader;
}(_react["default"].Component);
_defineProperty(DateHeader, "propTypes", {
  unit: _propTypes["default"].string,
  style: _propTypes["default"].object,
  className: _propTypes["default"].string,
  timelineUnit: _propTypes["default"].string,
  labelFormat: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].objectOf(_propTypes["default"].objectOf(_propTypes["default"].string)), _propTypes["default"].string]).isRequired,
  intervalRenderer: _propTypes["default"].func,
  headerData: _propTypes["default"].object,
  height: _propTypes["default"].number
});
var DateHeaderWrapper = function DateHeaderWrapper(_ref) {
  var unit = _ref.unit,
    labelFormat = _ref.labelFormat,
    style = _ref.style,
    className = _ref.className,
    intervalRenderer = _ref.intervalRenderer,
    headerData = _ref.headerData,
    height = _ref.height;
  return /*#__PURE__*/_react["default"].createElement(_TimelineStateContext.TimelineStateConsumer, null, function (_ref2) {
    var getTimelineState = _ref2.getTimelineState;
    var timelineState = getTimelineState();
    return /*#__PURE__*/_react["default"].createElement(DateHeader, {
      timelineUnit: timelineState.timelineUnit,
      unit: unit,
      labelFormat: labelFormat,
      style: style,
      className: className,
      intervalRenderer: intervalRenderer,
      headerData: headerData,
      height: height
    });
  });
};
DateHeaderWrapper.propTypes = {
  style: _propTypes["default"].object,
  className: _propTypes["default"].string,
  unit: _propTypes["default"].string,
  labelFormat: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].objectOf(_propTypes["default"].objectOf(_propTypes["default"].string)), _propTypes["default"].string]),
  intervalRenderer: _propTypes["default"].func,
  headerData: _propTypes["default"].object,
  height: _propTypes["default"].number
};
DateHeaderWrapper.defaultProps = {
  labelFormat: formatLabel
};
function formatLabel(_ref3, unit, labelWidth) {
  var _ref4 = _slicedToArray(_ref3, 2),
    timeStart = _ref4[0],
    timeEnd = _ref4[1];
  var formatOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _defaultConfig.defaultHeaderFormats;
  var format;
  if (labelWidth >= 150) {
    format = formatOptions[unit]['long'];
  } else if (labelWidth >= 100) {
    format = formatOptions[unit]['mediumLong'];
  } else if (labelWidth >= 50) {
    format = formatOptions[unit]['medium'];
  } else {
    format = formatOptions[unit]['short'];
  }
  return timeStart.format(format);
}
var _default = exports["default"] = DateHeaderWrapper;