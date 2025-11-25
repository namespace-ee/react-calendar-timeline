"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _domHelpers = require("../utility/dom-helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
var ScrollElement = /*#__PURE__*/function (_Component) {
  function ScrollElement() {
    var _this;
    _classCallCheck(this, ScrollElement);
    _this = _callSuper(this, ScrollElement);
    /**
     * needed to handle scrolling with trackpad
     */
    _defineProperty(_this, "handleScroll", function () {
      var scrollX = _this.scrollComponent.scrollLeft;
      _this.props.onScroll(scrollX);
    });
    _defineProperty(_this, "refHandler", function (el) {
      _this.scrollComponent = el;
      _this.props.scrollRef(el);
      if (el) {
        el.addEventListener('wheel', _this.handleWheel, {
          passive: false
        });
      }
    });
    _defineProperty(_this, "handleWheel", function (e) {
      var traditionalZoom = _this.props.traditionalZoom;

      // zoom in the time dimension
      if (e.ctrlKey || e.metaKey || e.altKey) {
        e.preventDefault();
        var parentPosition = (0, _domHelpers.getParentPosition)(e.currentTarget);
        var xPosition = e.clientX - parentPosition.x;
        var speed = e.ctrlKey ? 10 : e.metaKey ? 3 : 1;

        // convert vertical zoom to horiziontal
        _this.props.onWheelZoom(speed, xPosition, e.deltaY);
      } else if (e.shiftKey) {
        e.preventDefault();
        // shift+scroll event from a touchpad has deltaY property populated; shift+scroll event from a mouse has deltaX
        _this.props.onScroll(_this.scrollComponent.scrollLeft + (e.deltaY || e.deltaX));
        // no modifier pressed? we prevented the default event, so scroll or zoom as needed
      }
    });
    _defineProperty(_this, "handleMouseDown", function (e) {
      if (e.button === 0) {
        _this.dragStartPosition = e.pageX;
        _this.dragLastPosition = e.pageX;
        _this.setState({
          isDragging: true
        });
      }
    });
    _defineProperty(_this, "handleMouseMove", function (e) {
      // this.props.onMouseMove(e)
      //why is interacting with item important?
      if (_this.state.isDragging && !_this.props.isInteractingWithItem) {
        _this.props.onScroll(_this.scrollComponent.scrollLeft + _this.dragLastPosition - e.pageX);
        _this.dragLastPosition = e.pageX;
      }
    });
    _defineProperty(_this, "handleMouseUp", function () {
      _this.dragStartPosition = null;
      _this.dragLastPosition = null;
      _this.setState({
        isDragging: false
      });
    });
    _defineProperty(_this, "handleMouseLeave", function () {
      // this.props.onMouseLeave(e)
      _this.dragStartPosition = null;
      _this.dragLastPosition = null;
      _this.setState({
        isDragging: false
      });
    });
    _defineProperty(_this, "handleTouchStart", function (e) {
      if (e.touches.length === 2) {
        e.preventDefault();
        _this.lastTouchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX);
        _this.singleTouchStart = null;
        _this.lastSingleTouch = null;
      } else if (e.touches.length === 1) {
        e.preventDefault();
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        _this.lastTouchDistance = null;
        _this.singleTouchStart = {
          x: x,
          y: y,
          screenY: window.pageYOffset
        };
        _this.lastSingleTouch = {
          x: x,
          y: y,
          screenY: window.pageYOffset
        };
      }
    });
    _defineProperty(_this, "handleTouchMove", function (e) {
      var _this$props = _this.props,
        isInteractingWithItem = _this$props.isInteractingWithItem,
        width = _this$props.width,
        onZoom = _this$props.onZoom;
      if (isInteractingWithItem) {
        e.preventDefault();
        return;
      }
      if (_this.lastTouchDistance && e.touches.length === 2) {
        e.preventDefault();
        var touchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX);
        var parentPosition = (0, _domHelpers.getParentPosition)(e.currentTarget);
        var xPosition = (e.touches[0].screenX + e.touches[1].screenX) / 2 - parentPosition.x;
        if (touchDistance !== 0 && _this.lastTouchDistance !== 0) {
          onZoom(_this.lastTouchDistance / touchDistance, xPosition / width);
          _this.lastTouchDistance = touchDistance;
        }
      } else if (_this.lastSingleTouch && e.touches.length === 1) {
        e.preventDefault();
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        var deltaX = x - _this.lastSingleTouch.x;
        var deltaX0 = x - _this.singleTouchStart.x;
        var deltaY0 = y - _this.singleTouchStart.y;
        _this.lastSingleTouch = {
          x: x,
          y: y
        };
        var moveX = Math.abs(deltaX0) * 3 > Math.abs(deltaY0);
        var moveY = Math.abs(deltaY0) * 3 > Math.abs(deltaX0);
        if (deltaX !== 0 && moveX) {
          _this.props.onScroll(_this.scrollComponent.scrollLeft - deltaX);
        }
        if (moveY) {
          window.scrollTo(window.pageXOffset, _this.singleTouchStart.screenY - deltaY0);
        }
      }
    });
    _defineProperty(_this, "handleTouchEnd", function () {
      if (_this.lastTouchDistance) {
        _this.lastTouchDistance = null;
      }
      if (_this.lastSingleTouch) {
        _this.lastSingleTouch = null;
        _this.singleTouchStart = null;
      }
    });
    _this.state = {
      isDragging: false
    };
    return _this;
  }
  _inherits(ScrollElement, _Component);
  return _createClass(ScrollElement, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.scrollComponent) {
        this.scrollComponent.removeEventListener('wheel', this.handleWheel);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        width = _this$props2.width,
        height = _this$props2.height,
        children = _this$props2.children;
      var isDragging = this.state.isDragging;
      var scrollComponentStyle = {
        width: "".concat(width, "px"),
        height: "".concat(height + 20, "px"),
        //20px to push the scroll element down off screen...?
        cursor: isDragging ? 'move' : 'default',
        position: 'relative'
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.refHandler,
        "data-testid": "scroll-element",
        className: "rct-scroll",
        style: scrollComponentStyle,
        onMouseDown: this.handleMouseDown,
        onMouseMove: this.handleMouseMove,
        onMouseUp: this.handleMouseUp,
        onMouseLeave: this.handleMouseLeave,
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        onTouchEnd: this.handleTouchEnd,
        onScroll: this.handleScroll
      }, children);
    }
  }]);
}(_react.Component);
_defineProperty(ScrollElement, "propTypes", {
  children: _propTypes["default"].element.isRequired,
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired,
  traditionalZoom: _propTypes["default"].bool.isRequired,
  scrollRef: _propTypes["default"].func.isRequired,
  isInteractingWithItem: _propTypes["default"].bool.isRequired,
  onZoom: _propTypes["default"].func.isRequired,
  onWheelZoom: _propTypes["default"].func.isRequired,
  onScroll: _propTypes["default"].func.isRequired
});
var _default = exports["default"] = ScrollElement;