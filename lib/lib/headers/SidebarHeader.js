"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _HeadersContext = require("./HeadersContext");
var _constants = require("./constants");
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
var SidebarHeader = /*#__PURE__*/function (_React$PureComponent) {
  function SidebarHeader() {
    var _this;
    _classCallCheck(this, SidebarHeader);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, SidebarHeader, [].concat(args));
    _defineProperty(_this, "getRootProps", function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var style = props.style;
      var width = _this.props.variant === _constants.RIGHT_VARIANT ? _this.props.rightSidebarWidth : _this.props.leftSidebarWidth;
      return {
        style: _objectSpread(_objectSpread({}, style), {}, {
          width: width
        })
      };
    });
    _defineProperty(_this, "getStateAndHelpers", function () {
      return {
        getRootProps: _this.getRootProps,
        data: _this.props.headerData
      };
    });
    return _this;
  }
  _inherits(SidebarHeader, _React$PureComponent);
  return _createClass(SidebarHeader, [{
    key: "render",
    value: function render() {
      var props = this.getStateAndHelpers();
      var Renderer = this.props.children;
      return /*#__PURE__*/_react["default"].createElement(Renderer, props);
    }
  }]);
}(_react["default"].PureComponent);
_defineProperty(SidebarHeader, "propTypes", {
  children: _propTypes["default"].func.isRequired,
  rightSidebarWidth: _propTypes["default"].number,
  leftSidebarWidth: _propTypes["default"].number.isRequired,
  variant: _propTypes["default"].string,
  headerData: _propTypes["default"].object
});
var SidebarWrapper = function SidebarWrapper(_ref) {
  var children = _ref.children,
    variant = _ref.variant,
    headerData = _ref.headerData;
  return /*#__PURE__*/_react["default"].createElement(_HeadersContext.TimelineHeadersConsumer, null, function (_ref2) {
    var leftSidebarWidth = _ref2.leftSidebarWidth,
      rightSidebarWidth = _ref2.rightSidebarWidth;
    return /*#__PURE__*/_react["default"].createElement(SidebarHeader, {
      leftSidebarWidth: leftSidebarWidth,
      rightSidebarWidth: rightSidebarWidth,
      children: children,
      variant: variant,
      headerData: headerData
    });
  });
};
SidebarWrapper.propTypes = {
  children: _propTypes["default"].func.isRequired,
  variant: _propTypes["default"].string,
  headerData: _propTypes["default"].object
};
SidebarWrapper.defaultProps = {
  variant: _constants.LEFT_VARIANT,
  children: function children(_ref3) {
    var getRootProps = _ref3.getRootProps;
    return /*#__PURE__*/_react["default"].createElement("div", _extends({
      "data-testid": "sidebarHeader"
    }, getRootProps()));
  }
};
SidebarWrapper.secretKey = "SidebarHeader";
var _default = exports["default"] = SidebarWrapper;