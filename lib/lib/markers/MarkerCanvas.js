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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var MarkerCanvas =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MarkerCanvas, _React$Component);

  function MarkerCanvas() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MarkerCanvas);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MarkerCanvas)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleMouseMove", function (evt) {
      if (_this.subscription != null) {
        var pageX = evt.pageX; // FIXME: dont use getBoundingClientRect. Use passed in scroll amount

        var _this$containerEl$get = _this.containerEl.getBoundingClientRect(),
            containerLeft = _this$containerEl$get.left; // number of pixels from left we are on canvas
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

    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function () {
      if (_this.subscription != null) {
        // tell subscriber that we're not on canvas
        _this.subscription({
          leftOffset: 0,
          date: 0,
          isCursorOverCanvas: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseMoveSubscribe", function (sub) {
      _this.subscription = sub;
      return function () {
        _this.subscription = null;
      };
    });

    _defineProperty(_assertThisInitialized(_this), "state", {
      subscribeToMouseOver: _this.handleMouseMoveSubscribe
    });

    return _this;
  }

  _createClass(MarkerCanvas, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement(_MarkerCanvasContext.MarkerCanvasProvider, {
        value: this.state
      }, _react["default"].createElement("div", {
        style: staticStyles,
        onMouseMove: this.handleMouseMove,
        onMouseLeave: this.handleMouseLeave,
        ref: function ref(el) {
          return _this2.containerEl = el;
        }
      }, _react["default"].createElement(_TimelineMarkersRenderer["default"], null), this.props.children));
    }
  }]);

  return MarkerCanvas;
}(_react["default"].Component);

_defineProperty(MarkerCanvas, "propTypes", {
  getDateFromLeftOffsetPosition: _propTypes["default"].func.isRequired,
  children: _propTypes["default"].node
});

var MarkerCanvasWrapper = function MarkerCanvasWrapper(props) {
  return _react["default"].createElement(_TimelineStateContext.TimelineStateConsumer, null, function (_ref) {
    var getDateFromLeftOffsetPosition = _ref.getDateFromLeftOffsetPosition;
    return _react["default"].createElement(MarkerCanvas, _extends({
      getDateFromLeftOffsetPosition: getDateFromLeftOffsetPosition
    }, props));
  });
};

var _default = MarkerCanvasWrapper;
exports["default"] = _default;