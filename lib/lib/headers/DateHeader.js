'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TimelineStateContext = require('../timeline/TimelineStateContext');

var _CustomHeader = require('./CustomHeader');

var _CustomHeader2 = _interopRequireDefault(_CustomHeader);

var _calendar = require('../utility/calendar');

var _defaultConfig = require('../default-config');

var _Interval = require('./Interval');

var _Interval2 = _interopRequireDefault(_Interval);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateHeader = function (_React$Component) {
  _inherits(DateHeader, _React$Component);

  function DateHeader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateHeader.__proto__ || Object.getPrototypeOf(DateHeader)).call.apply(_ref, [this].concat(args))), _this), _this.getHeaderUnit = function () {
      if (_this.props.unit) {
        return _this.props.unit;
      } else if (_this.props.primaryHeader) {
        return (0, _calendar.getNextUnit)(_this.props.timelineUnit);
      } else {
        return _this.props.timelineUnit;
      }
    }, _this.getRootStyle = function () {
      return _extends({
        height: 30
      }, _this.props.style);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateHeader, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var unit = this.getHeaderUnit();
      var props = this.props.props;

      return _react2.default.createElement(
        _CustomHeader2.default,
        { unit: unit, props: props },
        function (_ref2, props) {
          var intervals = _ref2.headerContext.intervals,
              getRootProps = _ref2.getRootProps,
              getIntervalProps = _ref2.getIntervalProps,
              showPeriod = _ref2.showPeriod;

          var unit = _this2.getHeaderUnit();

          return _react2.default.createElement(
            'div',
            _extends({
              className: _this2.props.className
            }, getRootProps({ style: _this2.getRootStyle() })),
            intervals.map(function (interval) {
              var intervalText = _this2.getLabelFormat([interval.startTime, interval.endTime], unit, interval.labelWidth);
              return _react2.default.createElement(_Interval2.default, {
                key: 'label-' + interval.startTime.valueOf(),
                unit: unit,
                interval: interval,
                showPeriod: showPeriod,
                intervalText: intervalText,
                primaryHeader: !!_this2.props.primaryHeader,
                secondaryHeader: !!_this2.props.secondaryHeader,
                getIntervalProps: getIntervalProps,
                intervalRenderer: _this2.props.intervalRenderer,
                props: props
              });
            })
          );
        }
      );
    }
  }, {
    key: 'getLabelFormat',
    value: function getLabelFormat(interval, unit, labelWidth) {
      var labelFormat = this.props.labelFormat;

      if (typeof labelFormat === 'string') {
        var startTime = interval[0];
        return startTime.format(labelFormat);
      } else if ((typeof labelFormat === 'undefined' ? 'undefined' : _typeof(labelFormat)) === 'object') {
        return formatLabel(interval, unit, labelWidth, labelFormat);
      } else if (typeof labelFormat === 'function') {
        return labelFormat(interval, unit, labelWidth);
      } else {
        throw new Error('labelFormat should be function, object or string');
      }
    }
  }]);

  return DateHeader;
}(_react2.default.Component);

DateHeader.propTypes = {
  primaryHeader: _propTypes2.default.bool,
  secondaryHeader: _propTypes2.default.bool,
  unit: _propTypes2.default.string,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  timelineUnit: _propTypes2.default.string,
  labelFormat: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.objectOf(_propTypes2.default.objectOf(_propTypes2.default.string)), _propTypes2.default.string]).isRequired,
  intervalRenderer: _propTypes2.default.func,
  props: _propTypes2.default.object
};


var DateHeaderWrapper = function DateHeaderWrapper(_ref3) {
  var primaryHeader = _ref3.primaryHeader,
      secondaryHeader = _ref3.secondaryHeader,
      unit = _ref3.unit,
      labelFormat = _ref3.labelFormat,
      style = _ref3.style,
      className = _ref3.className,
      intervalRenderer = _ref3.intervalRenderer,
      props = _ref3.props;
  return _react2.default.createElement(
    _TimelineStateContext.TimelineStateConsumer,
    null,
    function (_ref4) {
      var getTimelineState = _ref4.getTimelineState;

      var timelineState = getTimelineState();
      return _react2.default.createElement(DateHeader, {
        timelineUnit: timelineState.timelineUnit,
        primaryHeader: primaryHeader,
        secondaryHeader: secondaryHeader,
        unit: unit,
        labelFormat: labelFormat,
        style: style,
        className: className,
        intervalRenderer: intervalRenderer,
        props: props
      });
    }
  );
};

DateHeaderWrapper.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  primaryHeader: _propTypes2.default.bool,
  secondaryHeader: _propTypes2.default.bool,
  unit: _propTypes2.default.string,
  labelFormat: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.objectOf(_propTypes2.default.objectOf(_propTypes2.default.string)), _propTypes2.default.string]),
  intervalRenderer: _propTypes2.default.func,
  props: _propTypes2.default.object
};

DateHeaderWrapper.defaultProps = {
  secondaryHeader: true,
  labelFormat: formatLabel
};

function formatLabel(_ref5, unit, labelWidth) {
  var _ref6 = _slicedToArray(_ref5, 2),
      timeStart = _ref6[0],
      timeEnd = _ref6[1];

  var formatOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _defaultConfig.defaultHeaderFormats;

  var format = void 0;
  if (labelWidth >= 150) {
    format = formatOptions[unit]['long'];
  } else if (labelWidth >= 100) {
    format = formatOptions[unit]['mediumLong'];
  } else if (labelWidth >= 50) {
    format = formatOptions[unit]['medium'];
  } else {
    format = formatOptions[unit]['short'];
  }
  return timeStart.format(format);
}

exports.default = DateHeaderWrapper;