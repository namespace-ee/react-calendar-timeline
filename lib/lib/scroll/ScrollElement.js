'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _domHelpers = require('../utility/dom-helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollElement = function (_Component) {
  _inherits(ScrollElement, _Component);

  function ScrollElement() {
    _classCallCheck(this, ScrollElement);

    var _this = _possibleConstructorReturn(this, (ScrollElement.__proto__ || Object.getPrototypeOf(ScrollElement)).call(this));

    _this.refHandler = function (el) {
      _this.scrollComponent = el;
      _this.props.scrollRef(el);
    };

    _this.handleScroll = function () {
      var scrollX = _this.scrollComponent.scrollLeft;
      _this.props.onScroll(scrollX);
    };

    _this.handleWheel = function (e) {
      var traditionalZoom = _this.props.traditionalZoom;


      e.preventDefault();

      // zoom in the time dimension
      if (e.ctrlKey || e.metaKey || e.altKey) {
        var parentPosition = (0, _domHelpers.getParentPosition)(e.currentTarget);
        var xPosition = e.clientX - parentPosition.x;

        var speed = e.ctrlKey ? 10 : e.metaKey ? 3 : 1;

        // convert vertical zoom to horiziontal
        _this.props.onWheelZoom(speed, xPosition, e.deltaY);
      } else if (e.shiftKey) {
        // shift+scroll event from a touchpad has deltaY property populated; shift+scroll event from a mouse has deltaX
        _this.scrollComponent.scrollLeft += e.deltaY || e.deltaX;

        // no modifier pressed? we prevented the default event, so scroll or zoom as needed
      } else {
        if (e.deltaX !== 0) {
          if (!traditionalZoom) {
            _this.scrollComponent.scrollLeft += e.deltaX;
          }
        }
        if (e.deltaY !== 0) {
          window.scrollTo(window.pageXOffset, window.pageYOffset + e.deltaY);
          if (traditionalZoom) {
            var _parentPosition = (0, _domHelpers.getParentPosition)(e.currentTarget);
            var _xPosition = e.clientX - _parentPosition.x;

            _this.props.onWheelZoom(10, _xPosition, e.deltaY);
          }
        }
      }
    };

    _this.handleMouseDown = function (e) {
      if (e.button === 0) {
        _this.dragStartPosition = e.pageX;
        _this.dragLastPosition = e.pageX;
        _this.setState({
          isDragging: true
        });
      }
    };

    _this.handleMouseMove = function (e) {
      // this.props.onMouseMove(e)
      //why is interacting with item important?
      if (_this.state.isDragging && !_this.props.isInteractingWithItem) {
        _this.scrollComponent.scrollLeft += _this.dragLastPosition - e.pageX;
        _this.dragLastPosition = e.pageX;
      }
    };

    _this.handleMouseUp = function () {
      _this.dragStartPosition = null;
      _this.dragLastPosition = null;

      _this.setState({
        isDragging: false
      });
    };

    _this.handleMouseLeave = function () {
      // this.props.onMouseLeave(e)
      _this.dragStartPosition = null;
      _this.dragLastPosition = null;
      _this.setState({
        isDragging: false
      });
    };

    _this.handleTouchStart = function (e) {
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
        _this.singleTouchStart = { x: x, y: y, screenY: window.pageYOffset };
        _this.lastSingleTouch = { x: x, y: y, screenY: window.pageYOffset };
      }
    };

    _this.handleTouchMove = function (e) {
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
        _this.lastSingleTouch = { x: x, y: y };
        var moveX = Math.abs(deltaX0) * 3 > Math.abs(deltaY0);
        var moveY = Math.abs(deltaY0) * 3 > Math.abs(deltaX0);
        if (deltaX !== 0 && moveX) {
          _this.scrollComponent.scrollLeft -= deltaX;
        }
        if (moveY) {
          window.scrollTo(window.pageXOffset, _this.singleTouchStart.screenY - deltaY0);
        }
      }
    };

    _this.handleTouchEnd = function () {
      if (_this.lastTouchDistance) {
        _this.lastTouchDistance = null;
      }
      if (_this.lastSingleTouch) {
        _this.lastSingleTouch = null;
        _this.singleTouchStart = null;
      }
    };

    _this.state = {
      isDragging: false
    };
    return _this;
  }

  _createClass(ScrollElement, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          width = _props.width,
          height = _props.height,
          children = _props.children;
      var isDragging = this.state.isDragging;


      var scrollComponentStyle = {
        width: width + 'px',
        height: height + 20 + 'px', //20px to push the scroll element down off screen...?
        cursor: isDragging ? 'move' : 'default',
        position: 'relative'
      };

      return _react2.default.createElement(
        'div',
        {
          ref: this.refHandler,

          className: 'rct-scroll',
          style: scrollComponentStyle,
          onScroll: this.handleScroll,
          onWheel: this.handleWheel,
          onMouseDown: this.handleMouseDown,
          onMouseMove: this.handleMouseMove,
          onMouseUp: this.handleMouseUp,
          onMouseLeave: this.handleMouseLeave,
          onTouchStart: this.handleTouchStart,
          onTouchMove: this.handleTouchMove,
          onTouchEnd: this.handleTouchEnd
        },
        children
      );
    }
  }]);

  return ScrollElement;
}(_react.Component);

ScrollElement.propTypes = {
  children: _propTypes2.default.element.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  traditionalZoom: _propTypes2.default.bool.isRequired,
  scrollRef: _propTypes2.default.func.isRequired,
  isInteractingWithItem: _propTypes2.default.bool.isRequired,
  onZoom: _propTypes2.default.func.isRequired,
  onWheelZoom: _propTypes2.default.func.isRequired,
  onScroll: _propTypes2.default.func.isRequired
};
exports.default = ScrollElement;