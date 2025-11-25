"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomDateHeader = CustomDateHeader;
var _react = _interopRequireDefault(require("react"));
var _Interval = _interopRequireDefault(require("./Interval"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    "data-testid": "dateHeader",
    className: className
  }, getRootProps({
    style: style
  })), intervals.map(function (interval) {
    var intervalText = getLabelFormat([interval.startTime, interval.endTime], unit, interval.labelWidth);
    return /*#__PURE__*/_react["default"].createElement(_Interval["default"], {
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