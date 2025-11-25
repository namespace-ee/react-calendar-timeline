"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _MarkerCanvasContext = require("./MarkerCanvasContext");
var _TimelineMarkersRenderer = _interopRequireDefault(require("./TimelineMarkersRenderer"));
var _TimelineStateContext = require("../timeline/TimelineStateContext");
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
// expand to fill entire parent container (ScrollElement)
var staticStyles = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

/**
 * Renders registered markers and exposes a mouse over listener for
 * CursorMarkers to subscribe to
 */
var MarkerCanvas = /*#__PURE__*/function (_React$Component) {
  function MarkerCanvas() {
    var _this;
    _classCallCheck(this, MarkerCanvas);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, MarkerCanvas, [].concat(args));
    _defineProperty(_this, "handleMouseMove", function (evt) {
      if (_this.subscription != null) {
        var pageX = evt.pageX;
        // FIXME: dont use getBoundingClientRect. Use passed in scroll amount
        var _this$containerEl$get = _this.containerEl.getBoundingClientRect(),
          containerLeft = _this$containerEl$get.left;

        // number of pixels from left we are on canvas
        // we do this calculation as pageX is based on x from viewport whereas
        // our canvas can be scrolled left and right and is generally outside
        // of the viewport.  This calculation is to get how many pixels the cursor
        // is from left of this element
        var canvasX = pageX - containerLeft;
        var date = _this.props.getDateFromLeftOffsetPosition(canvasX);
        _this.subscription({
          leftOffset: canvasX,
          date: date,
          isCursorOverCanvas: true
        });
      }
    });
    _defineProperty(_this, "handleMouseLeave", function () {
      if (_this.subscription != null) {
        // tell subscriber that we're not on canvas
        _this.subscription({
          leftOffset: 0,
          date: 0,
          isCursorOverCanvas: false
        });
      }
    });
    _defineProperty(_this, "handleMouseMoveSubscribe", function (sub) {
      _this.subscription = sub;
      return function () {
        _this.subscription = null;
      };
    });
    _defineProperty(_this, "state", {
      subscribeToMouseOver: _this.handleMouseMoveSubscribe
    });
    return _this;
  }
  _inherits(MarkerCanvas, _React$Component);
  return _createClass(MarkerCanvas, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      return /*#__PURE__*/_react["default"].createElement(_MarkerCanvasContext.MarkerCanvasProvider, {
        value: this.state
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: staticStyles,
        onMouseMove: this.handleMouseMove,
        onMouseLeave: this.handleMouseLeave,
        ref: function ref(el) {
          return _this2.containerEl = el;
        }
      }, /*#__PURE__*/_react["default"].createElement(_TimelineMarkersRenderer["default"], null), this.props.children));
    }
  }]);
}(_react["default"].Component);
_defineProperty(MarkerCanvas, "propTypes", {
  getDateFromLeftOffsetPosition: _propTypes["default"].func.isRequired,
  children: _propTypes["default"].node
});
var MarkerCanvasWrapper = function MarkerCanvasWrapper(props) {
  return /*#__PURE__*/_react["default"].createElement(_TimelineStateContext.TimelineStateConsumer, null, function (_ref) {
    var getDateFromLeftOffsetPosition = _ref.getDateFromLeftOffsetPosition;
    return /*#__PURE__*/_react["default"].createElement(MarkerCanvas, _extends({
      getDateFromLeftOffsetPosition: getDateFromLeftOffsetPosition
    }, props));
  });
};
var _default = exports["default"] = MarkerCanvasWrapper;