"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _shared = require("./shared");
var _MarkerCanvasContext = require("../MarkerCanvasContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
var defaultRenderer = (0, _shared.createDefaultRenderer)('default-cursor-marker');

/**
 * CursorMarker implementation subscribes to 'subscribeToCanvasMouseOver' on mount.
 * This subscription is passed in via MarkerCanvasConsumer, which is wired up to
 * MarkerCanvasProvider in the MarkerCanvas component. When the user mouses over MarkerCanvas,
 * the callback registered in CursorMarker (this component) is passed:
 *  leftOffset - pixels from left edge of canvas, used to position this element
 *  date - the date the cursor pertains to
 *  isCursorOverCanvas - whether the user cursor is over the canvas. This is set to 'false'
 *  when the user mouseleaves the element
 */
var CursorMarker = /*#__PURE__*/function (_React$Component) {
  function CursorMarker() {
    var _this;
    _classCallCheck(this, CursorMarker);
    _this = _callSuper(this, CursorMarker);
    _defineProperty(_this, "handleCanvasMouseOver", function (_ref) {
      var leftOffset = _ref.leftOffset,
        date = _ref.date,
        isCursorOverCanvas = _ref.isCursorOverCanvas;
      _this.setState({
        leftOffset: leftOffset,
        date: date,
        isShowingCursor: isCursorOverCanvas
      });
    });
    _this.state = {
      leftOffset: 0,
      date: 0,
      isShowingCursor: false
    };
    return _this;
  }
  _inherits(CursorMarker, _React$Component);
  return _createClass(CursorMarker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.unsubscribe = this.props.subscribeToCanvasMouseOver(this.handleCanvasMouseOver);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.unsubscribe != null) {
        this.unsubscribe();
        this.unsubscribe = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
        isShowingCursor = _this$state.isShowingCursor,
        leftOffset = _this$state.leftOffset,
        date = _this$state.date;
      if (!isShowingCursor) return null;
      var styles = (0, _shared.createMarkerStylesWithLeftOffset)(leftOffset);
      return this.props.renderer({
        styles: styles,
        date: date
      });
    }
  }]);
}(_react["default"].Component); // TODO: turn into HOC?
_defineProperty(CursorMarker, "propTypes", {
  subscribeToCanvasMouseOver: _propTypes["default"].func.isRequired,
  renderer: _propTypes["default"].func
});
_defineProperty(CursorMarker, "defaultProps", {
  renderer: defaultRenderer
});
var CursorMarkerWrapper = function CursorMarkerWrapper(props) {
  return /*#__PURE__*/_react["default"].createElement(_MarkerCanvasContext.MarkerCanvasConsumer, null, function (_ref2) {
    var subscribeToMouseOver = _ref2.subscribeToMouseOver;
    return /*#__PURE__*/_react["default"].createElement(CursorMarker, _extends({
      subscribeToCanvasMouseOver: subscribeToMouseOver
    }, props));
  });
};
CursorMarkerWrapper.displayName = 'CursorMarkerWrapper';
var _default = exports["default"] = CursorMarkerWrapper;