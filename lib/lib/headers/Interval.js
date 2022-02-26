"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _calendar = require("../utility/calendar");

var _events = require("../utility/events");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Interval =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Interval, _React$PureComponent);

  function Interval() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Interval);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Interval)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onIntervalClick", function () {
      var _this$props = _this.props,
          primaryHeader = _this$props.primaryHeader,
          interval = _this$props.interval,
          unit = _this$props.unit,
          showPeriod = _this$props.showPeriod;

      if (primaryHeader) {
        var nextUnit = (0, _calendar.getNextUnit)(unit);
        var newStartTime = interval.startTime.clone().startOf(nextUnit);
        var newEndTime = interval.startTime.clone().endOf(nextUnit);
        showPeriod(newStartTime, newEndTime);
      } else {
        showPeriod(interval.startTime, interval.endTime);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getIntervalProps", function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _objectSpread({}, _this.props.getIntervalProps(_objectSpread({
        interval: _this.props.interval
      }, props)), {
        onClick: (0, _events.composeEvents)(_this.onIntervalClick, props.onClick)
      });
    });

    return _this;
  }

  _createClass(Interval, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          intervalText = _this$props2.intervalText,
          interval = _this$props2.interval,
          intervalRenderer = _this$props2.intervalRenderer,
          headerData = _this$props2.headerData;
      var Renderer = intervalRenderer;

      if (Renderer) {
        return _react["default"].createElement(Renderer, {
          getIntervalProps: this.getIntervalProps,
          intervalContext: {
            interval: interval,
            intervalText: intervalText
          },
          data: headerData
        });
      }

      return _react["default"].createElement("div", _extends({}, this.getIntervalProps({}), {
        className: "rct-dateHeader ".concat(this.props.primaryHeader ? 'rct-dateHeader-primary' : '')
      }), _react["default"].createElement("span", null, intervalText));
    }
  }]);

  return Interval;
}(_react["default"].PureComponent);

_defineProperty(Interval, "propTypes", {
  intervalRenderer: _propTypes["default"].func,
  unit: _propTypes["default"].string.isRequired,
  interval: _propTypes["default"].object.isRequired,
  showPeriod: _propTypes["default"].func.isRequired,
  intervalText: _propTypes["default"].string.isRequired,
  primaryHeader: _propTypes["default"].bool.isRequired,
  getIntervalProps: _propTypes["default"].func.isRequired,
  headerData: _propTypes["default"].object
});

var _default = Interval;
exports["default"] = _default;