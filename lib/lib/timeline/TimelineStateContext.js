"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineStateProvider = exports.TimelineStateConsumer = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _createReactContext2 = _interopRequireDefault(require("create-react-context"));
var _calendar = require("../utility/calendar");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
/* this context will hold all information regarding timeline state:
  1. timeline width
  2. visible time start and end
  3. canvas time start and end
  4. helpers for calculating left offset of items (and really...anything)
*/

/* eslint-disable no-console */
var defaultContextState = {
  getTimelineState: function getTimelineState() {
    console.warn('"getTimelineState" default func is being used');
  },
  getLeftOffsetFromDate: function getLeftOffsetFromDate() {
    console.warn('"getLeftOffsetFromDate" default func is being used');
  },
  getDateFromLeftOffsetPosition: function getDateFromLeftOffsetPosition() {
    console.warn('"getDateFromLeftOffsetPosition" default func is being used');
  },
  showPeriod: function showPeriod() {
    console.warn('"showPeriod" default func is being used');
  }
};
/* eslint-enable */

var _createReactContext = (0, _createReactContext2["default"])(defaultContextState),
  Consumer = _createReactContext.Consumer,
  Provider = _createReactContext.Provider;
var TimelineStateProvider = exports.TimelineStateProvider = /*#__PURE__*/function (_React$Component) {
  function TimelineStateProvider(props) {
    var _this;
    _classCallCheck(this, TimelineStateProvider);
    _this = _callSuper(this, TimelineStateProvider, [props]);
    _defineProperty(_this, "getTimelineState", function () {
      var _this$props = _this.props,
        visibleTimeStart = _this$props.visibleTimeStart,
        visibleTimeEnd = _this$props.visibleTimeEnd,
        canvasTimeStart = _this$props.canvasTimeStart,
        canvasTimeEnd = _this$props.canvasTimeEnd,
        canvasWidth = _this$props.canvasWidth,
        timelineUnit = _this$props.timelineUnit,
        timelineWidth = _this$props.timelineWidth;
      return {
        visibleTimeStart: visibleTimeStart,
        visibleTimeEnd: visibleTimeEnd,
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        timelineUnit: timelineUnit,
        timelineWidth: timelineWidth
      }; // REVIEW,
    });
    _defineProperty(_this, "getLeftOffsetFromDate", function (date) {
      var _this$props2 = _this.props,
        canvasTimeStart = _this$props2.canvasTimeStart,
        canvasTimeEnd = _this$props2.canvasTimeEnd,
        canvasWidth = _this$props2.canvasWidth;
      return (0, _calendar.calculateXPositionForTime)(canvasTimeStart, canvasTimeEnd, canvasWidth, date);
    });
    _defineProperty(_this, "getDateFromLeftOffsetPosition", function (leftOffset) {
      var _this$props3 = _this.props,
        canvasTimeStart = _this$props3.canvasTimeStart,
        canvasTimeEnd = _this$props3.canvasTimeEnd,
        canvasWidth = _this$props3.canvasWidth;
      return (0, _calendar.calculateTimeForXPosition)(canvasTimeStart, canvasTimeEnd, canvasWidth, leftOffset);
    });
    _this.state = {
      timelineContext: {
        getTimelineState: _this.getTimelineState,
        getLeftOffsetFromDate: _this.getLeftOffsetFromDate,
        getDateFromLeftOffsetPosition: _this.getDateFromLeftOffsetPosition,
        showPeriod: _this.props.showPeriod
      }
    };
    return _this;
  }
  _inherits(TimelineStateProvider, _React$Component);
  return _createClass(TimelineStateProvider, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(Provider, {
        value: this.state.timelineContext
      }, this.props.children);
    }
  }]);
}(_react["default"].Component);
/* eslint-disable react/no-unused-prop-types */
_defineProperty(TimelineStateProvider, "propTypes", {
  children: _propTypes["default"].element.isRequired,
  visibleTimeStart: _propTypes["default"].number.isRequired,
  visibleTimeEnd: _propTypes["default"].number.isRequired,
  canvasTimeStart: _propTypes["default"].number.isRequired,
  canvasTimeEnd: _propTypes["default"].number.isRequired,
  canvasWidth: _propTypes["default"].number.isRequired,
  showPeriod: _propTypes["default"].func.isRequired,
  timelineUnit: _propTypes["default"].string.isRequired,
  timelineWidth: _propTypes["default"].number.isRequired
});
var TimelineStateConsumer = exports.TimelineStateConsumer = Consumer;