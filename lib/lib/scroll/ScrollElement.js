"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _domHelpers = require("../utility/dom-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ScrollElement =
/*#__PURE__*/
function (_Component) {
  _inherits(ScrollElement, _Component);

  function ScrollElement() {
    var _this;

    _classCallCheck(this, ScrollElement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ScrollElement).call(this));

    _defineProperty(_assertThisInitialized(_this), "handleScroll", function () {
      var scrollX = _this.scrollComponent.scrollLeft;

      _this.props.onScroll(scrollX);
    });

    _defineProperty(_assertThisInitialized(_this), "refHandler", function (el) {
      _this.scrollComponent = el;

      _this.props.scrollRef(el);

      if (el) {
        el.addEventListener('wheel', _this.handleWheel, {
          passive: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleWheel", function (e) {
      var traditionalZoom = _this.props.traditionalZoom; // zoom in the time dimension

      if (e.ctrlKey || e.metaKey || e.altKey) {
        e.preventDefault();
        var parentPosition = (0, _domHelpers.getParentPosition)(e.currentTarget);
        var xPosition = e.clientX - parentPosition.x;
        var speed = e.ctrlKey ? 10 : e.metaKey ? 3 : 1; // convert vertical zoom to horiziontal

        _this.props.onWheelZoom(speed, xPosition, e.deltaY);
      } else if (e.shiftKey) {
        e.preventDefault(); // shift+scroll event from a touchpad has deltaY property populated; shift+scroll event from a mouse has deltaX

        _this.props.onScroll(_this.scrollComponent.scrollLeft + (e.deltaY || e.deltaX)); // no modifier pressed? we prevented the default event, so scroll or zoom as needed

      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseDown", function (e) {
      if (e.button === 0) {
        _this.dragStartPosition = e.pageX;
        _this.dragLastPosition = e.pageX;

        _this.setState({
          isDragging: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseMove", function (e) {
      // this.props.onMouseMove(e)
      //why is interacting with item important?
      if (_this.state.isDragging && !_this.props.isInteractingWithItem) {
        _this.props.onScroll(_this.scrollComponent.scrollLeft + _this.dragLastPosition - e.pageX);

        _this.dragLastPosition = e.pageX;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseUp", function () {
      _this.dragStartPosition = null;
      _this.dragLastPosition = null;

      _this.setState({
        isDragging: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function () {
      // this.props.onMouseLeave(e)
      _this.dragStartPosition = null;
      _this.dragLastPosition = null;

      _this.setState({
        isDragging: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleTouchStart", function (e) {
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

    _defineProperty(_assertThisInitialized(_this), "handleTouchMove", function (e) {
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

    _defineProperty(_assertThisInitialized(_this), "handleTouchEnd", function () {
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
  /**
   * needed to handle scrolling with trackpad
   */


  _createClass(ScrollElement, [{
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
      return _react["default"].createElement("div", {
        ref: this.refHandler,
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

  return ScrollElement;
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

var _default = ScrollElement;
exports["default"] = _default;