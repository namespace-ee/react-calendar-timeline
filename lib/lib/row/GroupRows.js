"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _GroupRow = _interopRequireDefault(require("./GroupRow"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var GroupRows = exports["default"] = /*#__PURE__*/function (_Component) {
  _inherits(GroupRows, _Component);
  function GroupRows() {
    _classCallCheck(this, GroupRows);
    return _callSuper(this, GroupRows, arguments);
  }
  _createClass(GroupRows, [{
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
        lines.push( /*#__PURE__*/_react["default"].createElement(_GroupRow["default"], {
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
  return GroupRows;
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