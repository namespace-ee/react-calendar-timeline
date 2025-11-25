"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _HeadersContext = require("./HeadersContext");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _SidebarHeader = _interopRequireDefault(require("./SidebarHeader"));
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var TimelineHeaders = /*#__PURE__*/function (_React$Component) {
  function TimelineHeaders(props) {
    var _this;
    _classCallCheck(this, TimelineHeaders);
    _this = _callSuper(this, TimelineHeaders, [props]);
    _defineProperty(_this, "getRootStyle", function () {
      return _objectSpread(_objectSpread({}, _this.props.style), {}, {
        display: 'flex',
        width: '100%'
      });
    });
    _defineProperty(_this, "getCalendarHeaderStyle", function () {
      var _this$props = _this.props,
        leftSidebarWidth = _this$props.leftSidebarWidth,
        rightSidebarWidth = _this$props.rightSidebarWidth,
        calendarHeaderStyle = _this$props.calendarHeaderStyle;
      return _objectSpread(_objectSpread({}, calendarHeaderStyle), {}, {
        overflow: 'hidden',
        width: "calc(100% - ".concat(leftSidebarWidth + rightSidebarWidth, "px)")
      });
    });
    _defineProperty(_this, "handleRootRef", function (element) {
      if (_this.props.headerRef) {
        _this.props.headerRef(element);
      }
    });
    /**
     * check if child of type SidebarHeader
     * refer to for explanation https://github.com/gaearon/react-hot-loader#checking-element-types 
     */
    _defineProperty(_this, "isSidebarHeader", function (child) {
      if (child.type === undefined) return false;
      return child.type.secretKey === _SidebarHeader["default"].secretKey;
    });
    return _this;
  }
  _inherits(TimelineHeaders, _React$Component);
  return _createClass(TimelineHeaders, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var rightSidebarHeader;
      var leftSidebarHeader;
      var calendarHeaders = [];
      var children = Array.isArray(this.props.children) ? this.props.children.filter(function (c) {
        return c;
      }) : [this.props.children];
      _react["default"].Children.map(children, function (child) {
        if (_this2.isSidebarHeader(child)) {
          if (child.props.variant === _constants.RIGHT_VARIANT) {
            rightSidebarHeader = child;
          } else {
            leftSidebarHeader = child;
          }
        } else {
          calendarHeaders.push(child);
        }
      });
      if (!leftSidebarHeader) {
        leftSidebarHeader = /*#__PURE__*/_react["default"].createElement(_SidebarHeader["default"], null);
      }
      if (!rightSidebarHeader && this.props.rightSidebarWidth) {
        rightSidebarHeader = /*#__PURE__*/_react["default"].createElement(_SidebarHeader["default"], {
          variant: "right"
        });
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.handleRootRef,
        "data-testid": "headerRootDiv",
        style: this.getRootStyle(),
        className: (0, _classnames["default"])('rct-header-root', this.props.className)
      }, leftSidebarHeader, /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.props.registerScroll,
        style: this.getCalendarHeaderStyle(),
        className: (0, _classnames["default"])('rct-calendar-header', this.props.calendarHeaderClassName),
        "data-testid": "headerContainer"
      }, calendarHeaders), rightSidebarHeader);
    }
  }]);
}(_react["default"].Component);
_defineProperty(TimelineHeaders, "propTypes", {
  registerScroll: _propTypes["default"].func.isRequired,
  leftSidebarWidth: _propTypes["default"].number.isRequired,
  rightSidebarWidth: _propTypes["default"].number.isRequired,
  style: _propTypes["default"].object,
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  calendarHeaderStyle: _propTypes["default"].object,
  calendarHeaderClassName: _propTypes["default"].string,
  headerRef: _propTypes["default"].func
});
var TimelineHeadersWrapper = function TimelineHeadersWrapper(_ref) {
  var children = _ref.children,
    style = _ref.style,
    className = _ref.className,
    calendarHeaderStyle = _ref.calendarHeaderStyle,
    calendarHeaderClassName = _ref.calendarHeaderClassName;
  return /*#__PURE__*/_react["default"].createElement(_HeadersContext.TimelineHeadersConsumer, null, function (_ref2) {
    var leftSidebarWidth = _ref2.leftSidebarWidth,
      rightSidebarWidth = _ref2.rightSidebarWidth,
      registerScroll = _ref2.registerScroll;
    return /*#__PURE__*/_react["default"].createElement(TimelineHeaders, {
      leftSidebarWidth: leftSidebarWidth,
      rightSidebarWidth: rightSidebarWidth,
      registerScroll: registerScroll,
      style: style,
      className: className,
      calendarHeaderStyle: calendarHeaderStyle,
      calendarHeaderClassName: calendarHeaderClassName
    }, children);
  });
};
TimelineHeadersWrapper.propTypes = {
  style: _propTypes["default"].object,
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  calendarHeaderStyle: _propTypes["default"].object,
  calendarHeaderClassName: _propTypes["default"].string
};
TimelineHeadersWrapper.secretKey = "TimelineHeaders";
var _default = exports["default"] = TimelineHeadersWrapper;