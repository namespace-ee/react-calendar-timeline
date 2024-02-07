"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineStateProvider = exports.TimelineStateConsumer = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _createReactContext2 = _interopRequireDefault(require("create-react-context"));
var _calendar = require("../utility/calendar");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
  _inherits(TimelineStateProvider, _React$Component);
  function TimelineStateProvider(props) {
    var _this;
    _classCallCheck(this, TimelineStateProvider);
    _this = _callSuper(this, TimelineStateProvider, [props]);
    _defineProperty(_assertThisInitialized(_this), "getTimelineState", function () {
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
    _defineProperty(_assertThisInitialized(_this), "getLeftOffsetFromDate", function (date) {
      var _this$props2 = _this.props,
        canvasTimeStart = _this$props2.canvasTimeStart,
        canvasTimeEnd = _this$props2.canvasTimeEnd,
        canvasWidth = _this$props2.canvasWidth;
      return (0, _calendar.calculateXPositionForTime)(canvasTimeStart, canvasTimeEnd, canvasWidth, date);
    });
    _defineProperty(_assertThisInitialized(_this), "getDateFromLeftOffsetPosition", function (leftOffset) {
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
  _createClass(TimelineStateProvider, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(Provider, {
        value: this.state.timelineContext
      }, this.props.children);
    }
  }]);
  return TimelineStateProvider;
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