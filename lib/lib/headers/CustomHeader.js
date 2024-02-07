"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CustomHeader = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _HeadersContext = require("./HeadersContext");
var _TimelineStateContext = require("../timeline/TimelineStateContext");
var _calendar = require("../utility/calendar");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
var CustomHeader = exports.CustomHeader = /*#__PURE__*/function (_React$Component) {
  _inherits(CustomHeader, _React$Component);
  function CustomHeader(_props) {
    var _this;
    _classCallCheck(this, CustomHeader);
    _this = _callSuper(this, CustomHeader, [_props]);
    _defineProperty(_assertThisInitialized(_this), "getHeaderIntervals", function (_ref) {
      var canvasTimeStart = _ref.canvasTimeStart,
        canvasTimeEnd = _ref.canvasTimeEnd,
        unit = _ref.unit,
        timeSteps = _ref.timeSteps,
        getLeftOffsetFromDate = _ref.getLeftOffsetFromDate;
      var intervals = [];
      (0, _calendar.iterateTimes)(canvasTimeStart, canvasTimeEnd, unit, timeSteps, function (startTime, endTime) {
        var left = getLeftOffsetFromDate(startTime.valueOf());
        var right = getLeftOffsetFromDate(endTime.valueOf());
        var width = right - left;
        intervals.push({
          startTime: startTime,
          endTime: endTime,
          labelWidth: width,
          left: left
        });
      });
      return intervals;
    });
    _defineProperty(_assertThisInitialized(_this), "getRootProps", function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var style = props.style;
      return {
        style: Object.assign({}, style ? style : {}, {
          position: 'relative',
          width: _this.props.canvasWidth,
          height: _this.props.height
        })
      };
    });
    _defineProperty(_assertThisInitialized(_this), "getIntervalProps", function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var interval = props.interval,
        style = props.style;
      if (!interval) throw new Error('you should provide interval to the prop getter');
      var startTime = interval.startTime,
        labelWidth = interval.labelWidth,
        left = interval.left;
      return {
        style: _this.getIntervalStyle({
          style: style,
          startTime: startTime,
          labelWidth: labelWidth,
          canvasTimeStart: _this.props.canvasTimeStart,
          unit: _this.props.unit,
          left: left
        }),
        key: "label-".concat(startTime.valueOf())
      };
    });
    _defineProperty(_assertThisInitialized(_this), "getIntervalStyle", function (_ref2) {
      var left = _ref2.left,
        labelWidth = _ref2.labelWidth,
        style = _ref2.style;
      return _objectSpread(_objectSpread({}, style), {}, {
        left: left,
        width: labelWidth,
        position: 'absolute'
      });
    });
    _defineProperty(_assertThisInitialized(_this), "getStateAndHelpers", function () {
      var _this$props = _this.props,
        canvasTimeStart = _this$props.canvasTimeStart,
        canvasTimeEnd = _this$props.canvasTimeEnd,
        unit = _this$props.unit,
        showPeriod = _this$props.showPeriod,
        timelineWidth = _this$props.timelineWidth,
        visibleTimeStart = _this$props.visibleTimeStart,
        visibleTimeEnd = _this$props.visibleTimeEnd,
        headerData = _this$props.headerData;
      //TODO: only evaluate on changing params
      return {
        timelineContext: {
          timelineWidth: timelineWidth,
          visibleTimeStart: visibleTimeStart,
          visibleTimeEnd: visibleTimeEnd,
          canvasTimeStart: canvasTimeStart,
          canvasTimeEnd: canvasTimeEnd
        },
        headerContext: {
          unit: unit,
          intervals: _this.state.intervals
        },
        getRootProps: _this.getRootProps,
        getIntervalProps: _this.getIntervalProps,
        showPeriod: showPeriod,
        data: headerData
      };
    });
    var _canvasTimeStart = _props.canvasTimeStart,
      _canvasTimeEnd = _props.canvasTimeEnd,
      canvasWidth = _props.canvasWidth,
      _unit = _props.unit,
      _timeSteps = _props.timeSteps,
      _showPeriod = _props.showPeriod,
      _getLeftOffsetFromDate = _props.getLeftOffsetFromDate;
    var _intervals = _this.getHeaderIntervals({
      canvasTimeStart: _canvasTimeStart,
      canvasTimeEnd: _canvasTimeEnd,
      canvasWidth: canvasWidth,
      unit: _unit,
      timeSteps: _timeSteps,
      showPeriod: _showPeriod,
      getLeftOffsetFromDate: _getLeftOffsetFromDate
    });
    _this.state = {
      intervals: _intervals
    };
    return _this;
  }
  _createClass(CustomHeader, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.canvasTimeStart !== this.props.canvasTimeStart || nextProps.canvasTimeEnd !== this.props.canvasTimeEnd || nextProps.canvasWidth !== this.props.canvasWidth || nextProps.unit !== this.props.unit || nextProps.timeSteps !== this.props.timeSteps || nextProps.showPeriod !== this.props.showPeriod || nextProps.children !== this.props.children || nextProps.headerData !== this.props.headerData) {
        return true;
      }
      return false;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.canvasTimeStart !== this.props.canvasTimeStart || nextProps.canvasTimeEnd !== this.props.canvasTimeEnd || nextProps.canvasWidth !== this.props.canvasWidth || nextProps.unit !== this.props.unit || nextProps.timeSteps !== this.props.timeSteps || nextProps.showPeriod !== this.props.showPeriod) {
        var canvasTimeStart = nextProps.canvasTimeStart,
          canvasTimeEnd = nextProps.canvasTimeEnd,
          canvasWidth = nextProps.canvasWidth,
          unit = nextProps.unit,
          timeSteps = nextProps.timeSteps,
          showPeriod = nextProps.showPeriod,
          getLeftOffsetFromDate = nextProps.getLeftOffsetFromDate;
        var intervals = this.getHeaderIntervals({
          canvasTimeStart: canvasTimeStart,
          canvasTimeEnd: canvasTimeEnd,
          canvasWidth: canvasWidth,
          unit: unit,
          timeSteps: timeSteps,
          showPeriod: showPeriod,
          getLeftOffsetFromDate: getLeftOffsetFromDate
        });
        this.setState({
          intervals: intervals
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.getStateAndHelpers();
      var Renderer = this.props.children;
      return /*#__PURE__*/_react["default"].createElement(Renderer, props);
    }
  }]);
  return CustomHeader;
}(_react["default"].Component);
_defineProperty(CustomHeader, "propTypes", {
  //component props
  children: _propTypes["default"].func.isRequired,
  unit: _propTypes["default"].string.isRequired,
  //Timeline context
  timeSteps: _propTypes["default"].object.isRequired,
  visibleTimeStart: _propTypes["default"].number.isRequired,
  visibleTimeEnd: _propTypes["default"].number.isRequired,
  canvasTimeStart: _propTypes["default"].number.isRequired,
  canvasTimeEnd: _propTypes["default"].number.isRequired,
  canvasWidth: _propTypes["default"].number.isRequired,
  showPeriod: _propTypes["default"].func.isRequired,
  headerData: _propTypes["default"].object,
  getLeftOffsetFromDate: _propTypes["default"].func.isRequired,
  height: _propTypes["default"].number.isRequired
});
var CustomHeaderWrapper = function CustomHeaderWrapper(_ref3) {
  var children = _ref3.children,
    unit = _ref3.unit,
    headerData = _ref3.headerData,
    height = _ref3.height;
  return /*#__PURE__*/_react["default"].createElement(_TimelineStateContext.TimelineStateConsumer, null, function (_ref4) {
    var getTimelineState = _ref4.getTimelineState,
      showPeriod = _ref4.showPeriod,
      getLeftOffsetFromDate = _ref4.getLeftOffsetFromDate;
    var timelineState = getTimelineState();
    return /*#__PURE__*/_react["default"].createElement(_HeadersContext.TimelineHeadersConsumer, null, function (_ref5) {
      var timeSteps = _ref5.timeSteps;
      return /*#__PURE__*/_react["default"].createElement(CustomHeader, _extends({
        children: children,
        timeSteps: timeSteps,
        showPeriod: showPeriod,
        unit: unit ? unit : timelineState.timelineUnit
      }, timelineState, {
        headerData: headerData,
        getLeftOffsetFromDate: getLeftOffsetFromDate,
        height: height
      }));
    });
  });
};
CustomHeaderWrapper.propTypes = {
  children: _propTypes["default"].func.isRequired,
  unit: _propTypes["default"].string,
  headerData: _propTypes["default"].object,
  height: _propTypes["default"].number
};
CustomHeaderWrapper.defaultProps = {
  height: 30
};
var _default = exports["default"] = CustomHeaderWrapper;