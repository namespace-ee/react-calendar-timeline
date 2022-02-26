"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TimelineMarkersContext = require("../TimelineMarkersContext");

var _markerType = require("../markerType");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TodayMarker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TodayMarker, _React$Component);

  function TodayMarker() {
    _classCallCheck(this, TodayMarker);

    return _possibleConstructorReturn(this, _getPrototypeOf(TodayMarker).apply(this, arguments));
  }

  _createClass(TodayMarker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props$subscribe = this.props.subscribeMarker({
        type: _markerType.TimelineMarkerType.Today,
        renderer: this.props.children,
        interval: this.props.interval
      }),
          unsubscribe = _this$props$subscribe.unsubscribe,
          getMarker = _this$props$subscribe.getMarker;

      this.unsubscribe = unsubscribe;
      this.getMarker = getMarker;
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
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.interval !== this.props.interval && this.getMarker) {
        var marker = this.getMarker();
        this.props.updateMarker(_objectSpread({}, marker, {
          interval: this.props.interval
        }));
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return TodayMarker;
}(_react["default"].Component); // TODO: turn into HOC?


_defineProperty(TodayMarker, "propTypes", {
  subscribeMarker: _propTypes["default"].func.isRequired,
  updateMarker: _propTypes["default"].func.isRequired,
  interval: _propTypes["default"].number,
  children: _propTypes["default"].func
});

_defineProperty(TodayMarker, "defaultProps", {
  interval: 1000 * 10 // default to ten seconds

});

var TodayMarkerWrapper = function TodayMarkerWrapper(props) {
  return _react["default"].createElement(_TimelineMarkersContext.TimelineMarkersConsumer, null, function (_ref) {
    var subscribeMarker = _ref.subscribeMarker,
        updateMarker = _ref.updateMarker;
    return _react["default"].createElement(TodayMarker, _extends({
      subscribeMarker: subscribeMarker,
      updateMarker: updateMarker
    }, props));
  });
};

TodayMarkerWrapper.displayName = 'TodayMarkerWrapper';
var _default = TodayMarkerWrapper;
exports["default"] = _default;