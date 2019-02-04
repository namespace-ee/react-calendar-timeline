'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MarkerCanvasContext = require('./MarkerCanvasContext');

var _TimelineMarkersRenderer = require('./TimelineMarkersRenderer');

var _TimelineMarkersRenderer2 = _interopRequireDefault(_TimelineMarkersRenderer);

var _TimelineStateContext = require('../timeline/TimelineStateContext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// expand to fill entire parent container (ScrollElement)
var staticStyles = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0

  /**
   * Renders registered markers and exposes a mouse over listener for
   * CursorMarkers to subscribe to
   */
};
var MarkerCanvas = function (_React$Component) {
  _inherits(MarkerCanvas, _React$Component);

  function MarkerCanvas() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MarkerCanvas);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MarkerCanvas.__proto__ || Object.getPrototypeOf(MarkerCanvas)).call.apply(_ref, [this].concat(args))), _this), _this.handleMouseMove = function (evt) {
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
    }, _this.handleMouseLeave = function () {
      if (_this.subscription != null) {
        // tell subscriber that we're not on canvas
        _this.subscription({ leftOffset: 0, date: 0, isCursorOverCanvas: false });
      }
    }, _this.handleMouseMoveSubscribe = function (sub) {
      _this.subscription = sub;
      return function () {
        _this.subscription = null;
      };
    }, _this.state = {
      subscribeToMouseOver: _this.handleMouseMoveSubscribe
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MarkerCanvas, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _MarkerCanvasContext.MarkerCanvasProvider,
        { value: this.state },
        _react2.default.createElement(
          'div',
          {
            style: staticStyles,
            onMouseMove: this.handleMouseMove,
            onMouseLeave: this.handleMouseLeave,
            ref: function ref(el) {
              return _this2.containerEl = el;
            }
          },
          _react2.default.createElement(_TimelineMarkersRenderer2.default, null),
          this.props.children
        )
      );
    }
  }]);

  return MarkerCanvas;
}(_react2.default.Component);

MarkerCanvas.propTypes = {
  getDateFromLeftOffsetPosition: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.node
};


var MarkerCanvasWrapper = function MarkerCanvasWrapper(props) {
  return _react2.default.createElement(
    _TimelineStateContext.TimelineStateConsumer,
    null,
    function (_ref2) {
      var getDateFromLeftOffsetPosition = _ref2.getDateFromLeftOffsetPosition;
      return _react2.default.createElement(MarkerCanvas, _extends({
        getDateFromLeftOffsetPosition: getDateFromLeftOffsetPosition
      }, props));
    }
  );
};

exports.default = MarkerCanvasWrapper;