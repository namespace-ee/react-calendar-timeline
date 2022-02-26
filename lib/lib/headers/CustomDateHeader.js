"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomDateHeader = CustomDateHeader;

var _react = _interopRequireDefault(require("react"));

var _Interval = _interopRequireDefault(require("./Interval"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function CustomDateHeader(_ref) {
  var _ref$headerContext = _ref.headerContext,
      intervals = _ref$headerContext.intervals,
      unit = _ref$headerContext.unit,
      getRootProps = _ref.getRootProps,
      getIntervalProps = _ref.getIntervalProps,
      showPeriod = _ref.showPeriod,
      _ref$data = _ref.data,
      style = _ref$data.style,
      intervalRenderer = _ref$data.intervalRenderer,
      className = _ref$data.className,
      getLabelFormat = _ref$data.getLabelFormat,
      unitProp = _ref$data.unitProp,
      headerData = _ref$data.headerData;
  return _react["default"].createElement("div", _extends({
    className: className
  }, getRootProps({
    style: style
  })), intervals.map(function (interval) {
    var intervalText = getLabelFormat([interval.startTime, interval.endTime], unit, interval.labelWidth);
    return _react["default"].createElement(_Interval["default"], {
      key: "label-".concat(interval.startTime.valueOf()),
      unit: unit,
      interval: interval,
      showPeriod: showPeriod,
      intervalText: intervalText,
      primaryHeader: unitProp === 'primaryHeader',
      getIntervalProps: getIntervalProps,
      intervalRenderer: intervalRenderer,
      headerData: headerData
    });
  }));
}