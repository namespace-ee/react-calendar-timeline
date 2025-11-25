"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _moment = _interopRequireDefault(require("moment"));
var _calendar = require("../utility/calendar");
var _generic = require("../utility/generic");
var _TimelineStateContext = require("../timeline/TimelineStateContext");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var passThroughPropTypes = {
  canvasTimeStart: _propTypes["default"].number.isRequired,
  canvasTimeEnd: _propTypes["default"].number.isRequired,
  canvasWidth: _propTypes["default"].number.isRequired,
  lineCount: _propTypes["default"].number.isRequired,
  minUnit: _propTypes["default"].string.isRequired,
  timeSteps: _propTypes["default"].object.isRequired,
  height: _propTypes["default"].number.isRequired,
  verticalLineClassNamesForTime: _propTypes["default"].func
};
var Columns = /*#__PURE__*/function (_Component) {
  function Columns() {
    _classCallCheck(this, Columns);
    return _callSuper(this, Columns, arguments);
  }
  _inherits(Columns, _Component);
  return _createClass(Columns, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !(nextProps.canvasTimeStart === this.props.canvasTimeStart && nextProps.canvasTimeEnd === this.props.canvasTimeEnd && nextProps.canvasWidth === this.props.canvasWidth && nextProps.lineCount === this.props.lineCount && nextProps.minUnit === this.props.minUnit && nextProps.timeSteps === this.props.timeSteps && nextProps.height === this.props.height && nextProps.verticalLineClassNamesForTime === this.props.verticalLineClassNamesForTime && (0, _generic.arraysEqual)(nextProps.items, this.props.items) && (0, _generic.arraysEqual)(nextProps.groups, this.props.groups) && nextProps.keys === this.props.keys && (0, _generic.arraysEqual)(nextProps.dimensionItems, this.props.dimensionItems) && (0, _generic.arraysEqual)(nextProps.groupHeights, this.props.groupHeights) && (0, _generic.arraysEqual)(nextProps.groupTops, this.props.groupTops) && nextProps.emptyCellLabelRenderer === this.props.emptyCellLabelRenderer && nextProps.lineHeight === this.props.lineHeight);
    }

    // Check if a time range overlaps with any items in a group
  }, {
    key: "isTimeRangeEmpty",
    value: function isTimeRangeEmpty(groupId, timeStart, timeEnd) {
      var _this$props = this.props,
        items = _this$props.items,
        keys = _this$props.keys;
      if (!keys) {
        return false;
      }
      if (!items || (0, _generic._length)(items) === 0) {
        return true;
      }
      var itemGroupKey = keys.itemGroupKey,
        itemTimeStartKey = keys.itemTimeStartKey,
        itemTimeEndKey = keys.itemTimeEndKey;

      // Get all items for this group
      var groupItems = items.filter(function (item) {
        return (0, _generic._get)(item, itemGroupKey) === groupId;
      });

      // Check if any item overlaps with this time range
      return !groupItems.some(function (item) {
        var itemStart = (0, _generic._get)(item, itemTimeStartKey);
        var itemEnd = (0, _generic._get)(item, itemTimeEndKey);

        // Check for overlap: item starts before timeEnd and ends after timeStart
        return itemStart < timeEnd && itemEnd > timeStart;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;
      var _this$props2 = this.props,
        canvasTimeStart = _this$props2.canvasTimeStart,
        canvasTimeEnd = _this$props2.canvasTimeEnd,
        canvasWidth = _this$props2.canvasWidth,
        minUnit = _this$props2.minUnit,
        timeSteps = _this$props2.timeSteps,
        height = _this$props2.height,
        verticalLineClassNamesForTime = _this$props2.verticalLineClassNamesForTime,
        getLeftOffsetFromDate = _this$props2.getLeftOffsetFromDate,
        groups = _this$props2.groups,
        groupHeights = _this$props2.groupHeights,
        groupTops = _this$props2.groupTops,
        emptyCellLabelRenderer = _this$props2.emptyCellLabelRenderer,
        lineHeight = _this$props2.lineHeight;
      var ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart);
      var lines = [];
      var emptyCellLabels = [];
      var groupOrders = emptyCellLabelRenderer && groups && this.props.keys ? (0, _calendar.getGroupOrders)(groups, this.props.keys) : null;
      (0, _calendar.iterateTimes)(canvasTimeStart, canvasTimeEnd, minUnit, timeSteps, function (time, nextTime) {
        var minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit);
        var firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0);
        var classNamesForTime = [];
        if (verticalLineClassNamesForTime) {
          classNamesForTime = verticalLineClassNamesForTime(time.unix() * 1000,
          // turn into ms, which is what verticalLineClassNamesForTime expects
          nextTime.unix() * 1000 - 1);
        }

        // TODO: rename or remove class that has reference to vertical-line
        var classNames = 'rct-vl' + (firstOfType ? ' rct-vl-first' : '') + (minUnit === 'day' || minUnit === 'hour' || minUnit === 'minute' ? " rct-day-".concat(time.day(), " ") : ' ') + classNamesForTime.join(' ');
        var left = getLeftOffsetFromDate(time.valueOf());
        var right = getLeftOffsetFromDate(nextTime.valueOf());
        lines.push(/*#__PURE__*/_react["default"].createElement("div", {
          key: "line-".concat(time.valueOf()),
          className: classNames,
          style: {
            pointerEvents: 'none',
            top: '0px',
            left: "".concat(left, "px"),
            width: "".concat(right - left, "px"),
            height: "".concat(height, "px")
          }
        }));

        // Check for empty cells and render labels if renderer is provided
        if (emptyCellLabelRenderer && groups && groupHeights && groupTops && groupOrders) {
          var timeStartMs = time.valueOf();
          var timeEndMs = nextTime.valueOf();
          var cellWidth = right - left;

          // Check each group for empty cells
          groups.forEach(function (group) {
            var groupId = (0, _generic._get)(group, _this.props.keys.groupIdKey);
            var groupOrderData = groupOrders[groupId];
            if (groupOrderData && _this.isTimeRangeEmpty(groupId, timeStartMs, timeEndMs)) {
              var groupOrder = groupOrderData.index;
              var groupTop = groupTops[groupOrder] || 0;
              var groupHeight = groupHeights[groupOrder];
              if (!groupHeight) {
                groupHeight = group.height || lineHeight;
              }
              var label = emptyCellLabelRenderer({
                time: (0, _moment["default"])(timeStartMs),
                timeEnd: (0, _moment["default"])(timeEndMs),
                group: group,
                groupOrder: groupOrder
              });
              if (label) {
                emptyCellLabels.push(/*#__PURE__*/_react["default"].createElement("div", {
                  key: "empty-cell-".concat(groupOrder, "-").concat(timeStartMs),
                  className: "rct-empty-cell-label",
                  style: {
                    position: 'absolute',
                    top: "".concat(groupTop, "px"),
                    left: "".concat(left, "px"),
                    width: "".concat(cellWidth, "px"),
                    height: "".concat(groupHeight, "px"),
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1
                  }
                }, label));
              }
            }
          });
        }
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "rct-vertical-lines"
      }, lines, emptyCellLabels);
    }
  }]);
}(_react.Component);
_defineProperty(Columns, "propTypes", _objectSpread(_objectSpread({}, passThroughPropTypes), {}, {
  getLeftOffsetFromDate: _propTypes["default"].func.isRequired,
  items: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object]),
  groups: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object]),
  keys: _propTypes["default"].object,
  dimensionItems: _propTypes["default"].array,
  groupHeights: _propTypes["default"].array,
  groupTops: _propTypes["default"].array,
  emptyCellLabelRenderer: _propTypes["default"].func,
  lineHeight: _propTypes["default"].number
}));
var ColumnsWrapper = function ColumnsWrapper(_ref) {
  var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  return /*#__PURE__*/_react["default"].createElement(_TimelineStateContext.TimelineStateConsumer, null, function (_ref2) {
    var getLeftOffsetFromDate = _ref2.getLeftOffsetFromDate;
    return /*#__PURE__*/_react["default"].createElement(Columns, _extends({
      getLeftOffsetFromDate: getLeftOffsetFromDate
    }, props));
  });
};
ColumnsWrapper.defaultProps = _objectSpread({}, passThroughPropTypes);
var _default = exports["default"] = ColumnsWrapper;