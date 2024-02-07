"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _shared = require("./shared");
var _MarkerCanvasContext = require("../MarkerCanvasContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
  _inherits(CursorMarker, _React$Component);
  function CursorMarker() {
    var _this;
    _classCallCheck(this, CursorMarker);
    _this = _callSuper(this, CursorMarker);
    _defineProperty(_assertThisInitialized(_this), "handleCanvasMouseOver", function (_ref) {
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
  _createClass(CursorMarker, [{
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
  return CursorMarker;
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