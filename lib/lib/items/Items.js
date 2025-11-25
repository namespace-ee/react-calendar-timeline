"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _Item = _interopRequireDefault(require("./Item"));
var _generic = require("../utility/generic");
var _calendar = require("../utility/calendar");
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
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // import ItemGroup from './ItemGroup'
var canResizeLeft = function canResizeLeft(item, canResize) {
  var value = (0, _generic._get)(item, 'canResize') !== undefined ? (0, _generic._get)(item, 'canResize') : canResize;
  return value === 'left' || value === 'both';
};
var canResizeRight = function canResizeRight(item, canResize) {
  var value = (0, _generic._get)(item, 'canResize') !== undefined ? (0, _generic._get)(item, 'canResize') : canResize;
  return value === 'right' || value === 'both' || value === true;
};
var Items = exports["default"] = /*#__PURE__*/function (_Component) {
  function Items() {
    _classCallCheck(this, Items);
    return _callSuper(this, Items, arguments);
  }
  _inherits(Items, _Component);
  return _createClass(Items, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !((0, _generic.arraysEqual)(nextProps.groups, this.props.groups) && (0, _generic.arraysEqual)(nextProps.items, this.props.items) && (0, _generic.arraysEqual)(nextProps.dimensionItems, this.props.dimensionItems) && nextProps.keys === this.props.keys && nextProps.canvasTimeStart === this.props.canvasTimeStart && nextProps.canvasTimeEnd === this.props.canvasTimeEnd && nextProps.canvasWidth === this.props.canvasWidth && nextProps.selectedItem === this.props.selectedItem && nextProps.selected === this.props.selected && nextProps.dragSnap === this.props.dragSnap && nextProps.minResizeWidth === this.props.minResizeWidth && nextProps.canChangeGroup === this.props.canChangeGroup && nextProps.canMove === this.props.canMove && nextProps.canResize === this.props.canResize && nextProps.canSelect === this.props.canSelect);
    }
  }, {
    key: "isSelected",
    value: function isSelected(item, itemIdKey) {
      if (!this.props.selected) {
        return this.props.selectedItem === (0, _generic._get)(item, itemIdKey);
      } else {
        var target = (0, _generic._get)(item, itemIdKey);
        return this.props.selected.includes(target);
      }
    }
  }, {
    key: "getVisibleItems",
    value: function getVisibleItems(canvasTimeStart, canvasTimeEnd) {
      var _this$props = this.props,
        keys = _this$props.keys,
        items = _this$props.items;
      return (0, _calendar.getVisibleItems)(items, canvasTimeStart, canvasTimeEnd, keys);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;
      var _this$props2 = this.props,
        canvasTimeStart = _this$props2.canvasTimeStart,
        canvasTimeEnd = _this$props2.canvasTimeEnd,
        dimensionItems = _this$props2.dimensionItems,
        keys = _this$props2.keys,
        groups = _this$props2.groups;
      var itemIdKey = keys.itemIdKey,
        itemGroupKey = keys.itemGroupKey;
      var groupOrders = (0, _calendar.getGroupOrders)(groups, keys);
      var visibleItems = this.getVisibleItems(canvasTimeStart, canvasTimeEnd, groupOrders);
      var sortedDimensionItems = (0, _generic.keyBy)(dimensionItems, 'id');
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "rct-items"
      }, visibleItems.filter(function (item) {
        return sortedDimensionItems[(0, _generic._get)(item, itemIdKey)];
      }).map(function (item) {
        return /*#__PURE__*/_react["default"].createElement(_Item["default"], {
          key: (0, _generic._get)(item, itemIdKey),
          item: item,
          keys: _this.props.keys,
          order: groupOrders[(0, _generic._get)(item, itemGroupKey)],
          dimensions: sortedDimensionItems[(0, _generic._get)(item, itemIdKey)].dimensions,
          selected: _this.isSelected(item, itemIdKey),
          canChangeGroup: (0, _generic._get)(item, 'canChangeGroup') !== undefined ? (0, _generic._get)(item, 'canChangeGroup') : _this.props.canChangeGroup,
          canMove: (0, _generic._get)(item, 'canMove') !== undefined ? (0, _generic._get)(item, 'canMove') : _this.props.canMove,
          canResizeLeft: canResizeLeft(item, _this.props.canResize),
          canResizeRight: canResizeRight(item, _this.props.canResize),
          canSelect: (0, _generic._get)(item, 'canSelect') !== undefined ? (0, _generic._get)(item, 'canSelect') : _this.props.canSelect,
          useResizeHandle: _this.props.useResizeHandle,
          groupTops: _this.props.groupTops,
          canvasTimeStart: _this.props.canvasTimeStart,
          canvasTimeEnd: _this.props.canvasTimeEnd,
          canvasWidth: _this.props.canvasWidth,
          dragSnap: _this.props.dragSnap,
          minResizeWidth: _this.props.minResizeWidth,
          onResizing: _this.props.itemResizing,
          onResized: _this.props.itemResized,
          moveResizeValidator: _this.props.moveResizeValidator,
          onDrag: _this.props.itemDrag,
          onDrop: _this.props.itemDrop,
          onItemDoubleClick: _this.props.onItemDoubleClick,
          onContextMenu: _this.props.onItemContextMenu,
          onSelect: _this.props.itemSelect,
          itemRenderer: _this.props.itemRenderer,
          scrollRef: _this.props.scrollRef
        });
      }));
    }
  }]);
}(_react.Component);
_defineProperty(Items, "propTypes", {
  groups: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object]).isRequired,
  items: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object]).isRequired,
  canvasTimeStart: _propTypes["default"].number.isRequired,
  canvasTimeEnd: _propTypes["default"].number.isRequired,
  canvasWidth: _propTypes["default"].number.isRequired,
  dragSnap: _propTypes["default"].number,
  minResizeWidth: _propTypes["default"].number,
  selectedItem: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  canChangeGroup: _propTypes["default"].bool.isRequired,
  canMove: _propTypes["default"].bool.isRequired,
  canResize: _propTypes["default"].oneOf([true, false, 'left', 'right', 'both']),
  canSelect: _propTypes["default"].bool,
  keys: _propTypes["default"].object.isRequired,
  moveResizeValidator: _propTypes["default"].func,
  itemSelect: _propTypes["default"].func,
  itemDrag: _propTypes["default"].func,
  itemDrop: _propTypes["default"].func,
  itemResizing: _propTypes["default"].func,
  itemResized: _propTypes["default"].func,
  onItemDoubleClick: _propTypes["default"].func,
  onItemContextMenu: _propTypes["default"].func,
  itemRenderer: _propTypes["default"].func,
  selected: _propTypes["default"].array,
  dimensionItems: _propTypes["default"].array,
  groupTops: _propTypes["default"].array,
  useResizeHandle: _propTypes["default"].bool,
  scrollRef: _propTypes["default"].object
});
_defineProperty(Items, "defaultProps", {
  selected: []
});