"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _calendar = require("../utility/calendar");
var _events = require("../utility/events");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Interval = /*#__PURE__*/function (_React$PureComponent) {
  function Interval() {
    var _this;
    _classCallCheck(this, Interval);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Interval, [].concat(args));
    _defineProperty(_this, "onIntervalClick", function () {
      var _this$props = _this.props,
        primaryHeader = _this$props.primaryHeader,
        interval = _this$props.interval,
        unit = _this$props.unit,
        showPeriod = _this$props.showPeriod;
      if (primaryHeader) {
        var nextUnit = (0, _calendar.getNextUnit)(unit);
        var newStartTime = interval.startTime.clone().startOf(nextUnit);
        var newEndTime = interval.startTime.clone().endOf(nextUnit);
        showPeriod(newStartTime, newEndTime);
      } else {
        showPeriod(interval.startTime, interval.endTime);
      }
    });
    _defineProperty(_this, "getIntervalProps", function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _objectSpread(_objectSpread({}, _this.props.getIntervalProps(_objectSpread({
        interval: _this.props.interval
      }, props))), {}, {
        onClick: (0, _events.composeEvents)(_this.onIntervalClick, props.onClick)
      });
    });
    return _this;
  }
  _inherits(Interval, _React$PureComponent);
  return _createClass(Interval, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        intervalText = _this$props2.intervalText,
        interval = _this$props2.interval,
        intervalRenderer = _this$props2.intervalRenderer,
        headerData = _this$props2.headerData;
      var Renderer = intervalRenderer;
      if (Renderer) {
        return /*#__PURE__*/_react["default"].createElement(Renderer, {
          getIntervalProps: this.getIntervalProps,
          intervalContext: {
            interval: interval,
            intervalText: intervalText
          },
          data: headerData
        });
      }
      return /*#__PURE__*/_react["default"].createElement("div", _extends({
        "data-testid": "dateHeaderInterval"
      }, this.getIntervalProps({}), {
        className: "rct-dateHeader ".concat(this.props.primaryHeader ? 'rct-dateHeader-primary' : '')
      }), /*#__PURE__*/_react["default"].createElement("span", null, intervalText));
    }
  }]);
}(_react["default"].PureComponent);
_defineProperty(Interval, "propTypes", {
  intervalRenderer: _propTypes["default"].func,
  unit: _propTypes["default"].string.isRequired,
  interval: _propTypes["default"].object.isRequired,
  showPeriod: _propTypes["default"].func.isRequired,
  intervalText: _propTypes["default"].string.isRequired,
  primaryHeader: _propTypes["default"].bool.isRequired,
  getIntervalProps: _propTypes["default"].func.isRequired,
  headerData: _propTypes["default"].object
});
var _default = exports["default"] = Interval;