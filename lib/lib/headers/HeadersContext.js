"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineHeadersConsumer = exports.TimelineHeadersProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _createReactContext2 = _interopRequireDefault(require("create-react-context"));

var _generic = require("../utility/generic");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultContextState = {
  registerScroll: function registerScroll() {
    // eslint-disable-next-line
    console.warn('default registerScroll header used');
    return _generic.noop;
  },
  rightSidebarWidth: 0,
  leftSidebarWidth: 150,
  timeSteps: {}
};

var _createReactContext = (0, _createReactContext2["default"])(defaultContextState),
    Consumer = _createReactContext.Consumer,
    Provider = _createReactContext.Provider;

var TimelineHeadersProvider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TimelineHeadersProvider, _React$Component);

  function TimelineHeadersProvider() {
    _classCallCheck(this, TimelineHeadersProvider);

    return _possibleConstructorReturn(this, _getPrototypeOf(TimelineHeadersProvider).apply(this, arguments));
  }

  _createClass(TimelineHeadersProvider, [{
    key: "render",
    value: function render() {
      var contextValue = {
        rightSidebarWidth: this.props.rightSidebarWidth,
        leftSidebarWidth: this.props.leftSidebarWidth,
        timeSteps: this.props.timeSteps,
        registerScroll: this.props.registerScroll
      };
      return _react["default"].createElement(Provider, {
        value: contextValue
      }, this.props.children);
    }
  }]);

  return TimelineHeadersProvider;
}(_react["default"].Component);

exports.TimelineHeadersProvider = TimelineHeadersProvider;

_defineProperty(TimelineHeadersProvider, "propTypes", {
  children: _propTypes["default"].element.isRequired,
  rightSidebarWidth: _propTypes["default"].number,
  leftSidebarWidth: _propTypes["default"].number.isRequired,
  //TODO: maybe this should be skipped?
  timeSteps: _propTypes["default"].object.isRequired,
  registerScroll: _propTypes["default"].func.isRequired
});

var TimelineHeadersConsumer = Consumer;
exports.TimelineHeadersConsumer = TimelineHeadersConsumer;