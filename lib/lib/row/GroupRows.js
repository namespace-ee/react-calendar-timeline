"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _GroupRow = _interopRequireDefault(require("./GroupRow"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var GroupRows = exports["default"] = /*#__PURE__*/function (_Component) {
  function GroupRows() {
    _classCallCheck(this, GroupRows);
    return _callSuper(this, GroupRows, arguments);
  }
  _inherits(GroupRows, _Component);
  return _createClass(GroupRows, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !(nextProps.canvasWidth === this.props.canvasWidth && nextProps.lineCount === this.props.lineCount && nextProps.groupHeights === this.props.groupHeights && nextProps.groups === this.props.groups);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        canvasWidth = _this$props.canvasWidth,
        lineCount = _this$props.lineCount,
        groupHeights = _this$props.groupHeights,
        onRowClick = _this$props.onRowClick,
        onRowDoubleClick = _this$props.onRowDoubleClick,
        clickTolerance = _this$props.clickTolerance,
        groups = _this$props.groups,
        horizontalLineClassNamesForGroup = _this$props.horizontalLineClassNamesForGroup,
        onRowContextClick = _this$props.onRowContextClick;
      var lines = [];
      var _loop = function _loop(i) {
        lines.push(/*#__PURE__*/_react["default"].createElement(_GroupRow["default"], {
          clickTolerance: clickTolerance,
          onContextMenu: function onContextMenu(evt) {
            return onRowContextClick(evt, i);
          },
          onClick: function onClick(evt) {
            return onRowClick(evt, i);
          },
          onDoubleClick: function onDoubleClick(evt) {
            return onRowDoubleClick(evt, i);
          },
          key: "horizontal-line-".concat(i),
          isEvenRow: i % 2 === 0,
          group: groups[i],
          horizontalLineClassNamesForGroup: horizontalLineClassNamesForGroup,
          style: {
            width: "".concat(canvasWidth, "px"),
            height: "".concat(groupHeights[i], "px")
          }
        }));
      };
      for (var i = 0; i < lineCount; i++) {
        _loop(i);
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "rct-horizontal-lines"
      }, lines);
    }
  }]);
}(_react.Component);
_defineProperty(GroupRows, "propTypes", {
  canvasWidth: _propTypes["default"].number.isRequired,
  lineCount: _propTypes["default"].number.isRequired,
  groupHeights: _propTypes["default"].array.isRequired,
  onRowClick: _propTypes["default"].func.isRequired,
  onRowDoubleClick: _propTypes["default"].func.isRequired,
  clickTolerance: _propTypes["default"].number.isRequired,
  groups: _propTypes["default"].array.isRequired,
  horizontalLineClassNamesForGroup: _propTypes["default"].func,
  onRowContextClick: _propTypes["default"].func.isRequired
});