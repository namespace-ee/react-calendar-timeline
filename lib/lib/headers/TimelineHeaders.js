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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var TimelineHeaders = /*#__PURE__*/function (_React$Component) {
  _inherits(TimelineHeaders, _React$Component);
  function TimelineHeaders(props) {
    var _this;
    _classCallCheck(this, TimelineHeaders);
    _this = _callSuper(this, TimelineHeaders, [props]);
    _defineProperty(_assertThisInitialized(_this), "getRootStyle", function () {
      return _objectSpread(_objectSpread({}, _this.props.style), {}, {
        display: 'flex',
        width: '100%'
      });
    });
    _defineProperty(_assertThisInitialized(_this), "getCalendarHeaderStyle", function () {
      var _this$props = _this.props,
        leftSidebarWidth = _this$props.leftSidebarWidth,
        rightSidebarWidth = _this$props.rightSidebarWidth,
        calendarHeaderStyle = _this$props.calendarHeaderStyle;
      return _objectSpread(_objectSpread({}, calendarHeaderStyle), {}, {
        overflow: 'hidden',
        width: "calc(100% - ".concat(leftSidebarWidth + rightSidebarWidth, "px)")
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleRootRef", function (element) {
      if (_this.props.headerRef) {
        _this.props.headerRef(element);
      }
    });
    /**
     * check if child of type SidebarHeader
     * refer to for explanation https://github.com/gaearon/react-hot-loader#checking-element-types 
     */
    _defineProperty(_assertThisInitialized(_this), "isSidebarHeader", function (child) {
      if (child.type === undefined) return false;
      return child.type.secretKey === _SidebarHeader["default"].secretKey;
    });
    return _this;
  }
  _createClass(TimelineHeaders, [{
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
  return TimelineHeaders;
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