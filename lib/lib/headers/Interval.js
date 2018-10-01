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

var _calendar = require('../utility/calendar');

var _events = require('../utility/events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Interval = function (_React$PureComponent) {
  _inherits(Interval, _React$PureComponent);

  function Interval() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Interval);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Interval.__proto__ || Object.getPrototypeOf(Interval)).call.apply(_ref, [this].concat(args))), _this), _this.getIntervalStyle = function () {
      return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: _this.props.secondaryHeader && !_this.props.primaryHeader ? 'rgb(240, 240, 240)' : 'initial',
        height: '100%',
        borderLeft: _this.props.primaryHeader ? '1px solid #bbb' : '2px solid #bbb',
        borderRight: _this.props.primaryHeader ? '1px solid #bbb' : 'none',
        borderBottom: '1px solid #bbb',
        color: _this.props.primaryHeader ? '#fff' : 'initial',
        cursor: 'pointer',
        fontSize: '14px'
      };
    }, _this.onIntervalClick = function () {
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
    }, _this.getIntervalProps = function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return _extends({}, _this.props.getIntervalProps(_extends({
        interval: _this.props.interval
      }, props)), {
        onClick: (0, _events.composeEvents)(_this.onIntervalClick, props.onClick)
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Interval, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          intervalText = _props.intervalText,
          interval = _props.interval,
          intervalRenderer = _props.intervalRenderer,
          props = _props.props;

      if (intervalRenderer) return intervalRenderer({
        getIntervalProps: this.getIntervalProps,
        intervalContext: {
          interval: interval,
          intervalText: intervalText
        }
      }, props);
      return _react2.default.createElement(
        'div',
        this.getIntervalProps({
          style: this.getIntervalStyle()
        }),
        _react2.default.createElement(
          'span',
          null,
          intervalText
        )
      );
    }
  }]);

  return Interval;
}(_react2.default.PureComponent);

Interval.propTypes = {
  intervalRenderer: _propTypes2.default.func,
  unit: _propTypes2.default.string.isRequired,
  interval: _propTypes2.default.object.isRequired,
  showPeriod: _propTypes2.default.func.isRequired,
  intervalText: _propTypes2.default.string.isRequired,
  primaryHeader: _propTypes2.default.bool.isRequired,
  secondaryHeader: _propTypes2.default.bool.isRequired,
  getIntervalProps: _propTypes2.default.func.isRequired,
  props: _propTypes2.default.object
};
exports.default = Interval;