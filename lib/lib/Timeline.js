"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _Items = _interopRequireDefault(require("./items/Items"));
var _Sidebar = _interopRequireDefault(require("./layout/Sidebar"));
var _Columns = _interopRequireDefault(require("./columns/Columns"));
var _GroupRows = _interopRequireDefault(require("./row/GroupRows"));
var _ScrollElement = _interopRequireDefault(require("./scroll/ScrollElement"));
var _MarkerCanvas = _interopRequireDefault(require("./markers/MarkerCanvas"));
var _window = _interopRequireDefault(require("../resize-detector/window"));
var _calendar = require("./utility/calendar");
var _generic = require("./utility/generic");
var _defaultConfig = require("./default-config");
var _TimelineStateContext = require("./timeline/TimelineStateContext");
var _TimelineMarkersContext = require("./markers/TimelineMarkersContext");
var _HeadersContext = require("./headers/HeadersContext");
var _TimelineHeaders = _interopRequireDefault(require("./headers/TimelineHeaders"));
var _DateHeader = _interopRequireDefault(require("./headers/DateHeader"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var ReactCalendarTimeline = exports["default"] = /*#__PURE__*/function (_Component) {
  function ReactCalendarTimeline(_props) {
    var _this;
    _classCallCheck(this, ReactCalendarTimeline);
    _this = _callSuper(this, ReactCalendarTimeline, [_props]);
    _defineProperty(_this, "getTimelineContext", function () {
      var _this$state = _this.state,
        width = _this$state.width,
        visibleTimeStart = _this$state.visibleTimeStart,
        visibleTimeEnd = _this$state.visibleTimeEnd,
        canvasTimeStart = _this$state.canvasTimeStart,
        canvasTimeEnd = _this$state.canvasTimeEnd;
      return {
        timelineWidth: width,
        visibleTimeStart: visibleTimeStart,
        visibleTimeEnd: visibleTimeEnd,
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd
      };
    });
    _defineProperty(_this, "getTimelineUnit", function () {
      var _this$state2 = _this.state,
        width = _this$state2.width,
        visibleTimeStart = _this$state2.visibleTimeStart,
        visibleTimeEnd = _this$state2.visibleTimeEnd;
      var timeSteps = _this.props.timeSteps;
      var zoom = visibleTimeEnd - visibleTimeStart;
      var minUnit = (0, _calendar.getMinUnit)(zoom, width, timeSteps);
      return minUnit;
    });
    _defineProperty(_this, "resize", function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props;
      var _this$container$getBo = _this.container.getBoundingClientRect(),
        containerWidth = _this$container$getBo.width;
      var width = containerWidth - props.sidebarWidth - props.rightSidebarWidth;
      var canvasWidth = (0, _calendar.getCanvasWidth)(width, props.buffer);
      var _stackTimelineItems = (0, _calendar.stackTimelineItems)(props.items, props.groups, canvasWidth, _this.state.canvasTimeStart, _this.state.canvasTimeEnd, props.keys, props.lineHeight, props.itemHeightRatio, props.stackItems, _this.state.draggingItem, _this.state.resizingItem, _this.state.dragTime, _this.state.resizingEdge, _this.state.resizeTime, _this.state.newGroupOrder),
        dimensionItems = _stackTimelineItems.dimensionItems,
        height = _stackTimelineItems.height,
        groupHeights = _stackTimelineItems.groupHeights,
        groupTops = _stackTimelineItems.groupTops;

      // this is needed by dragItem since it uses pageY from the drag events
      // if this was in the context of the scrollElement, this would not be necessary

      _this.setState({
        width: width,
        dimensionItems: dimensionItems,
        height: height,
        groupHeights: groupHeights,
        groupTops: groupTops
      });
      //initial scroll left is the buffer - 1 (1 is visible area) divided by 2 (2 is the buffer split on the right and left of the timeline)
      var scrollLeft = width * ((props.buffer - 1) / 2);
      _this.scrollComponent.scrollLeft = scrollLeft;
      _this.scrollHeaderRef.scrollLeft = scrollLeft;
    });
    _defineProperty(_this, "onScroll", function (scrollX) {
      var width = _this.state.width;
      var canvasTimeStart = _this.state.canvasTimeStart;
      var zoom = _this.state.visibleTimeEnd - _this.state.visibleTimeStart;
      var visibleTimeStart = canvasTimeStart + zoom * scrollX / width;
      if (_this.state.visibleTimeStart !== visibleTimeStart || _this.state.visibleTimeEnd !== visibleTimeStart + zoom) {
        _this.props.onTimeChange(visibleTimeStart, visibleTimeStart + zoom, _this.updateScrollCanvas, _this.getTimelineUnit());
      }
    });
    // called when the visible time changes
    _defineProperty(_this, "updateScrollCanvas", function (visibleTimeStart, visibleTimeEnd, forceUpdateDimensions) {
      var items = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _this.props.items;
      var groups = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _this.props.groups;
      _this.setState((0, _calendar.calculateScrollCanvas)(visibleTimeStart, visibleTimeEnd, forceUpdateDimensions, items, groups, _this.props, _this.state));
    });
    _defineProperty(_this, "handleWheelZoom", function (speed, xPosition, deltaY) {
      _this.changeZoom(1.0 + speed * deltaY / 500, xPosition / _this.state.width);
    });
    _defineProperty(_this, "changeZoom", function (scale) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
      var _this$props = _this.props,
        minZoom = _this$props.minZoom,
        maxZoom = _this$props.maxZoom;
      var oldZoom = _this.state.visibleTimeEnd - _this.state.visibleTimeStart;
      var newZoom = Math.min(Math.max(Math.round(oldZoom * scale), minZoom), maxZoom); // min 1 min, max 20 years
      var newVisibleTimeStart = Math.round(_this.state.visibleTimeStart + (oldZoom - newZoom) * offset);
      _this.props.onTimeChange(newVisibleTimeStart, newVisibleTimeStart + newZoom, _this.updateScrollCanvas, _this.getTimelineUnit());
    });
    _defineProperty(_this, "showPeriod", function (from, to) {
      var visibleTimeStart = from.valueOf();
      var visibleTimeEnd = to.valueOf();
      var zoom = visibleTimeEnd - visibleTimeStart;
      // can't zoom in more than to show one hour
      if (zoom < _this.props.minZoom) {
        return;
      }
      _this.props.onTimeChange(visibleTimeStart, visibleTimeStart + zoom, _this.updateScrollCanvas, _this.getTimelineUnit());
    });
    _defineProperty(_this, "selectItem", function (item, clickType, e) {
      if (_this.isItemSelected(item) || _this.props.itemTouchSendsClick && clickType === 'touch') {
        if (item && _this.props.onItemClick) {
          var time = _this.timeFromItemEvent(e);
          _this.props.onItemClick(item, e, time);
        }
      } else {
        _this.setState({
          selectedItem: item
        });
        if (item && _this.props.onItemSelect) {
          var _time = _this.timeFromItemEvent(e);
          _this.props.onItemSelect(item, e, _time);
        } else if (item === null && _this.props.onItemDeselect) {
          _this.props.onItemDeselect(e); // this isnt in the docs. Is this function even used?
        }
      }
    });
    _defineProperty(_this, "doubleClickItem", function (item, e) {
      if (_this.props.onItemDoubleClick) {
        var time = _this.timeFromItemEvent(e);
        _this.props.onItemDoubleClick(item, e, time);
      }
    });
    _defineProperty(_this, "contextMenuClickItem", function (item, e) {
      if (_this.props.onItemContextMenu) {
        var time = _this.timeFromItemEvent(e);
        _this.props.onItemContextMenu(item, e, time);
      }
    });
    // TODO: this is very similar to timeFromItemEvent, aside from which element to get offsets
    // from.  Look to consolidate the logic for determining coordinate to time
    // as well as generalizing how we get time from click on the canvas
    _defineProperty(_this, "getTimeFromRowClickEvent", function (e) {
      var _this$props2 = _this.props,
        dragSnap = _this$props2.dragSnap,
        buffer = _this$props2.buffer;
      var _this$state3 = _this.state,
        width = _this$state3.width,
        canvasTimeStart = _this$state3.canvasTimeStart,
        canvasTimeEnd = _this$state3.canvasTimeEnd;
      // this gives us distance from left of row element, so event is in
      // context of the row element, not client or page
      var offsetX = e.nativeEvent.offsetX;
      var time = (0, _calendar.calculateTimeForXPosition)(canvasTimeStart, canvasTimeEnd, (0, _calendar.getCanvasWidth)(width, buffer), offsetX);
      time = Math.floor(time / dragSnap) * dragSnap;
      return time;
    });
    _defineProperty(_this, "timeFromItemEvent", function (e) {
      var _this$state4 = _this.state,
        width = _this$state4.width,
        visibleTimeStart = _this$state4.visibleTimeStart,
        visibleTimeEnd = _this$state4.visibleTimeEnd;
      var dragSnap = _this.props.dragSnap;
      var scrollComponent = _this.scrollComponent;
      var _scrollComponent$getB = scrollComponent.getBoundingClientRect(),
        scrollX = _scrollComponent$getB.left;
      var xRelativeToTimeline = e.clientX - scrollX;
      var relativeItemPosition = xRelativeToTimeline / width;
      var zoom = visibleTimeEnd - visibleTimeStart;
      var timeOffset = relativeItemPosition * zoom;
      var time = Math.round(visibleTimeStart + timeOffset);
      time = Math.floor(time / dragSnap) * dragSnap;
      return time;
    });
    _defineProperty(_this, "dragItem", function (item, dragTime, newGroupOrder) {
      var newGroup = _this.props.groups[newGroupOrder];
      var keys = _this.props.keys;
      _this.setState({
        draggingItem: item,
        dragTime: dragTime,
        newGroupOrder: newGroupOrder,
        dragGroupTitle: newGroup ? (0, _generic._get)(newGroup, keys.groupLabelKey) : ''
      });
      _this.updatingItem({
        eventType: 'move',
        itemId: item,
        time: dragTime,
        newGroupOrder: newGroupOrder
      });
    });
    _defineProperty(_this, "dropItem", function (item, dragTime, newGroupOrder) {
      _this.setState({
        draggingItem: null,
        dragTime: null,
        dragGroupTitle: null
      });
      if (_this.props.onItemMove) {
        _this.props.onItemMove(item, dragTime, newGroupOrder);
      }
    });
    _defineProperty(_this, "resizingItem", function (item, resizeTime, edge) {
      _this.setState({
        resizingItem: item,
        resizingEdge: edge,
        resizeTime: resizeTime
      });
      _this.updatingItem({
        eventType: 'resize',
        itemId: item,
        time: resizeTime,
        edge: edge
      });
    });
    _defineProperty(_this, "resizedItem", function (item, resizeTime, edge, timeDelta) {
      _this.setState({
        resizingItem: null,
        resizingEdge: null,
        resizeTime: null
      });
      if (_this.props.onItemResize && timeDelta !== 0) {
        _this.props.onItemResize(item, resizeTime, edge);
      }
    });
    _defineProperty(_this, "updatingItem", function (_ref) {
      var eventType = _ref.eventType,
        itemId = _ref.itemId,
        time = _ref.time,
        edge = _ref.edge,
        newGroupOrder = _ref.newGroupOrder;
      if (_this.props.onItemDrag) {
        _this.props.onItemDrag({
          eventType: eventType,
          itemId: itemId,
          time: time,
          edge: edge,
          newGroupOrder: newGroupOrder
        });
      }
    });
    _defineProperty(_this, "handleRowClick", function (e, rowIndex) {
      // shouldnt this be handled by the user, as far as when to deselect an item?
      if (_this.hasSelectedItem()) {
        _this.selectItem(null);
      }
      if (_this.props.onCanvasClick == null) return;
      var time = _this.getTimeFromRowClickEvent(e);
      var groupId = (0, _generic._get)(_this.props.groups[rowIndex], _this.props.keys.groupIdKey);
      _this.props.onCanvasClick(groupId, time, e);
    });
    _defineProperty(_this, "handleRowDoubleClick", function (e, rowIndex) {
      if (_this.props.onCanvasDoubleClick == null) return;
      var time = _this.getTimeFromRowClickEvent(e);
      var groupId = (0, _generic._get)(_this.props.groups[rowIndex], _this.props.keys.groupIdKey);
      _this.props.onCanvasDoubleClick(groupId, time, e);
    });
    _defineProperty(_this, "handleScrollContextMenu", function (e, rowIndex) {
      if (_this.props.onCanvasContextMenu == null) return;
      var timePosition = _this.getTimeFromRowClickEvent(e);
      var groupId = (0, _generic._get)(_this.props.groups[rowIndex], _this.props.keys.groupIdKey);
      if (_this.props.onCanvasContextMenu) {
        e.preventDefault();
        _this.props.onCanvasContextMenu(groupId, timePosition, e);
      }
    });
    _defineProperty(_this, "handleHeaderRef", function (el) {
      _this.scrollHeaderRef = el;
      _this.props.headerRef(el);
    });
    /**
     * check if child of type TimelineHeader
     * refer to for explanation https://github.com/gaearon/react-hot-loader#checking-element-types
     */
    _defineProperty(_this, "isTimelineHeader", function (child) {
      if (child.type === undefined) return false;
      return child.type.secretKey === _TimelineHeaders["default"].secretKey;
    });
    _defineProperty(_this, "renderHeaders", function () {
      if (_this.props.children) {
        var headerRenderer;
        _react["default"].Children.map(_this.props.children, function (child) {
          if (_this.isTimelineHeader(child)) {
            headerRenderer = child;
          }
        });
        if (headerRenderer) {
          return headerRenderer;
        }
      }
      return /*#__PURE__*/_react["default"].createElement(_TimelineHeaders["default"], null, /*#__PURE__*/_react["default"].createElement(_DateHeader["default"], {
        unit: "primaryHeader"
      }), /*#__PURE__*/_react["default"].createElement(_DateHeader["default"], null));
    });
    _defineProperty(_this, "getScrollElementRef", function (el) {
      _this.props.scrollRef(el);
      _this.scrollComponent = el;
    });
    _this.getSelected = _this.getSelected.bind(_this);
    _this.hasSelectedItem = _this.hasSelectedItem.bind(_this);
    _this.isItemSelected = _this.isItemSelected.bind(_this);
    var _visibleTimeStart = null;
    var _visibleTimeEnd = null;
    if (_this.props.defaultTimeStart && _this.props.defaultTimeEnd) {
      _visibleTimeStart = _this.props.defaultTimeStart.valueOf();
      _visibleTimeEnd = _this.props.defaultTimeEnd.valueOf();
    } else if (_this.props.visibleTimeStart && _this.props.visibleTimeEnd) {
      _visibleTimeStart = _this.props.visibleTimeStart;
      _visibleTimeEnd = _this.props.visibleTimeEnd;
    } else {
      //throwing an error because neither default or visible time props provided
      throw new Error('You must provide either "defaultTimeStart" and "defaultTimeEnd" or "visibleTimeStart" and "visibleTimeEnd" to initialize the Timeline');
    }
    var _getCanvasBoundariesF = (0, _calendar.getCanvasBoundariesFromVisibleTime)(_visibleTimeStart, _visibleTimeEnd, _props.buffer),
      _getCanvasBoundariesF2 = _slicedToArray(_getCanvasBoundariesF, 2),
      _canvasTimeStart = _getCanvasBoundariesF2[0],
      _canvasTimeEnd = _getCanvasBoundariesF2[1];
    _this.state = {
      width: 1000,
      visibleTimeStart: _visibleTimeStart,
      visibleTimeEnd: _visibleTimeEnd,
      canvasTimeStart: _canvasTimeStart,
      canvasTimeEnd: _canvasTimeEnd,
      selectedItem: null,
      dragTime: null,
      dragGroupTitle: null,
      resizeTime: null,
      resizingItem: null,
      resizingEdge: null
    };
    var _canvasWidth = (0, _calendar.getCanvasWidth)(_this.state.width, _props.buffer);
    var _stackTimelineItems2 = (0, _calendar.stackTimelineItems)(_props.items, _props.groups, _canvasWidth, _this.state.canvasTimeStart, _this.state.canvasTimeEnd, _props.keys, _props.lineHeight, _props.itemHeightRatio, _props.stackItems, _this.state.draggingItem, _this.state.resizingItem, _this.state.dragTime, _this.state.resizingEdge, _this.state.resizeTime, _this.state.newGroupOrder),
      _dimensionItems = _stackTimelineItems2.dimensionItems,
      _height = _stackTimelineItems2.height,
      _groupHeights = _stackTimelineItems2.groupHeights,
      _groupTops = _stackTimelineItems2.groupTops;

    /* eslint-disable react/no-direct-mutation-state */
    _this.state.dimensionItems = _dimensionItems;
    _this.state.height = _height;
    _this.state.groupHeights = _groupHeights;
    _this.state.groupTops = _groupTops;

    /* eslint-enable */
    return _this;
  }
  _inherits(ReactCalendarTimeline, _Component);
  return _createClass(ReactCalendarTimeline, [{
    key: "getChildContext",
    value: function getChildContext() {
      var _this2 = this;
      return {
        getTimelineContext: function getTimelineContext() {
          return _this2.getTimelineContext();
        }
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.resize(this.props);
      if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
        this.props.resizeDetector.addListener(this);
      }
      _window["default"].addListener(this);
      this.lastTouchDistance = null;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.resizeDetector && this.props.resizeDetector.addListener) {
        this.props.resizeDetector.removeListener(this);
      }
      _window["default"].removeListener(this);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var newZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
      var oldZoom = prevState.visibleTimeEnd - prevState.visibleTimeStart;

      // are we changing zoom? Report it!
      if (this.props.onZoom && newZoom !== oldZoom) {
        this.props.onZoom(this.getTimelineContext(), this.getTimelineUnit());
      }

      // The bounds have changed? Report it!
      if (this.props.onBoundsChange && this.state.canvasTimeStart !== prevState.canvasTimeStart) {
        this.props.onBoundsChange(this.state.canvasTimeStart, this.state.canvasTimeStart + newZoom * 3);
      }

      // Check the scroll is correct
      var scrollLeft = Math.round(this.state.width * (this.state.visibleTimeStart - this.state.canvasTimeStart) / newZoom);
      var componentScrollLeft = Math.round(prevState.width * (prevState.visibleTimeStart - prevState.canvasTimeStart) / oldZoom);
      if (componentScrollLeft !== scrollLeft) {
        this.scrollComponent.scrollLeft = scrollLeft;
        this.scrollHeaderRef.scrollLeft = scrollLeft;
      }
    }
  }, {
    key: "columns",
    value: function columns(canvasTimeStart, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height, dimensionItems, groupHeights, groupTops) {
      return /*#__PURE__*/_react["default"].createElement(_Columns["default"], {
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineCount: (0, _generic._length)(this.props.groups),
        minUnit: minUnit,
        timeSteps: timeSteps,
        height: height,
        verticalLineClassNamesForTime: this.props.verticalLineClassNamesForTime,
        items: this.props.items,
        groups: this.props.groups,
        keys: this.props.keys,
        dimensionItems: dimensionItems,
        groupHeights: groupHeights,
        groupTops: groupTops,
        emptyCellLabelRenderer: this.props.emptyCellLabelRenderer,
        lineHeight: this.props.lineHeight
      });
    }
  }, {
    key: "rows",
    value: function rows(canvasWidth, groupHeights, groups) {
      return /*#__PURE__*/_react["default"].createElement(_GroupRows["default"], {
        groups: groups,
        canvasWidth: canvasWidth,
        lineCount: (0, _generic._length)(this.props.groups),
        groupHeights: groupHeights,
        clickTolerance: this.props.clickTolerance,
        onRowClick: this.handleRowClick,
        onRowDoubleClick: this.handleRowDoubleClick,
        horizontalLineClassNamesForGroup: this.props.horizontalLineClassNamesForGroup,
        onRowContextClick: this.handleScrollContextMenu
      });
    }
  }, {
    key: "items",
    value: function items(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops) {
      return /*#__PURE__*/_react["default"].createElement(_Items["default"], {
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        dimensionItems: dimensionItems,
        groupTops: groupTops,
        items: this.props.items,
        groups: this.props.groups,
        keys: this.props.keys,
        selectedItem: this.state.selectedItem,
        dragSnap: this.props.dragSnap,
        minResizeWidth: this.props.minResizeWidth,
        canChangeGroup: this.props.canChangeGroup,
        canMove: this.props.canMove,
        canResize: this.props.canResize,
        useResizeHandle: this.props.useResizeHandle,
        canSelect: this.props.canSelect,
        moveResizeValidator: this.props.moveResizeValidator,
        itemSelect: this.selectItem,
        itemDrag: this.dragItem,
        itemDrop: this.dropItem,
        onItemDoubleClick: this.doubleClickItem,
        onItemContextMenu: this.props.onItemContextMenu ? this.contextMenuClickItem : undefined,
        itemResizing: this.resizingItem,
        itemResized: this.resizedItem,
        itemRenderer: this.props.itemRenderer,
        selected: this.props.selected,
        scrollRef: this.scrollComponent
      });
    }
  }, {
    key: "sidebar",
    value: function sidebar(height, groupHeights) {
      var sidebarWidth = this.props.sidebarWidth;
      return sidebarWidth && /*#__PURE__*/_react["default"].createElement(_Sidebar["default"], {
        groups: this.props.groups,
        groupRenderer: this.props.groupRenderer,
        keys: this.props.keys,
        width: sidebarWidth,
        groupHeights: groupHeights,
        height: height
      });
    }
  }, {
    key: "rightSidebar",
    value: function rightSidebar(height, groupHeights) {
      var rightSidebarWidth = this.props.rightSidebarWidth;
      return rightSidebarWidth && /*#__PURE__*/_react["default"].createElement(_Sidebar["default"], {
        groups: this.props.groups,
        keys: this.props.keys,
        groupRenderer: this.props.groupRenderer,
        isRightSidebar: true,
        width: rightSidebarWidth,
        groupHeights: groupHeights,
        height: height
      });
    }
  }, {
    key: "childrenWithProps",
    value: function childrenWithProps(canvasTimeStart, canvasTimeEnd, canvasWidth, dimensionItems, groupHeights, groupTops, height, visibleTimeStart, visibleTimeEnd, minUnit, timeSteps) {
      var _this3 = this;
      if (!this.props.children) {
        return null;
      }

      // convert to an array and remove the nulls
      var childArray = Array.isArray(this.props.children) ? this.props.children.filter(function (c) {
        return c;
      }) : [this.props.children];
      var childProps = {
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        visibleTimeStart: visibleTimeStart,
        visibleTimeEnd: visibleTimeEnd,
        dimensionItems: dimensionItems,
        items: this.props.items,
        groups: this.props.groups,
        keys: this.props.keys,
        groupHeights: groupHeights,
        groupTops: groupTops,
        selected: this.getSelected(),
        height: height,
        minUnit: minUnit,
        timeSteps: timeSteps
      };
      return _react["default"].Children.map(childArray, function (child) {
        if (!_this3.isTimelineHeader(child)) {
          return /*#__PURE__*/_react["default"].cloneElement(child, childProps);
        } else {
          return null;
        }
      });
    }
  }, {
    key: "getSelected",
    value: function getSelected() {
      return this.state.selectedItem && !this.props.selected ? [this.state.selectedItem] : this.props.selected || [];
    }
  }, {
    key: "hasSelectedItem",
    value: function hasSelectedItem() {
      if (!Array.isArray(this.props.selected)) return !!this.state.selectedItem;
      return this.props.selected.length > 0;
    }
  }, {
    key: "isItemSelected",
    value: function isItemSelected(itemId) {
      var selectedItems = this.getSelected();
      return selectedItems.some(function (i) {
        return i === itemId;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      var _this$props3 = this.props,
        items = _this$props3.items,
        groups = _this$props3.groups,
        sidebarWidth = _this$props3.sidebarWidth,
        rightSidebarWidth = _this$props3.rightSidebarWidth,
        timeSteps = _this$props3.timeSteps,
        traditionalZoom = _this$props3.traditionalZoom,
        buffer = _this$props3.buffer;
      var _this$state5 = this.state,
        draggingItem = _this$state5.draggingItem,
        resizingItem = _this$state5.resizingItem,
        width = _this$state5.width,
        visibleTimeStart = _this$state5.visibleTimeStart,
        visibleTimeEnd = _this$state5.visibleTimeEnd,
        canvasTimeStart = _this$state5.canvasTimeStart,
        canvasTimeEnd = _this$state5.canvasTimeEnd;
      var _this$state6 = this.state,
        dimensionItems = _this$state6.dimensionItems,
        height = _this$state6.height,
        groupHeights = _this$state6.groupHeights,
        groupTops = _this$state6.groupTops;
      var zoom = visibleTimeEnd - visibleTimeStart;
      var canvasWidth = (0, _calendar.getCanvasWidth)(width, buffer);
      var minUnit = (0, _calendar.getMinUnit)(zoom, width, timeSteps);
      var isInteractingWithItem = !!draggingItem || !!resizingItem;
      if (isInteractingWithItem) {
        var stackResults = (0, _calendar.stackTimelineItems)(items, groups, canvasWidth, this.state.canvasTimeStart, this.state.canvasTimeEnd, this.props.keys, this.props.lineHeight, this.props.itemHeightRatio, this.props.stackItems, this.state.draggingItem, this.state.resizingItem, this.state.dragTime, this.state.resizingEdge, this.state.resizeTime, this.state.newGroupOrder);
        dimensionItems = stackResults.dimensionItems;
        height = stackResults.height;
        groupHeights = stackResults.groupHeights;
        groupTops = stackResults.groupTops;
      }
      var outerComponentStyle = {
        height: "".concat(height, "px")
      };
      return /*#__PURE__*/_react["default"].createElement(_TimelineStateContext.TimelineStateProvider, {
        visibleTimeStart: visibleTimeStart,
        visibleTimeEnd: visibleTimeEnd,
        canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        showPeriod: this.showPeriod,
        timelineUnit: minUnit,
        timelineWidth: this.state.width
      }, /*#__PURE__*/_react["default"].createElement(_TimelineMarkersContext.TimelineMarkersProvider, null, /*#__PURE__*/_react["default"].createElement(_HeadersContext.TimelineHeadersProvider, {
        registerScroll: this.handleHeaderRef,
        timeSteps: timeSteps,
        leftSidebarWidth: this.props.sidebarWidth,
        rightSidebarWidth: this.props.rightSidebarWidth
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: this.props.style,
        ref: function ref(el) {
          return _this4.container = el;
        },
        className: "react-calendar-timeline ".concat(this.props.className)
      }, this.renderHeaders(), /*#__PURE__*/_react["default"].createElement("div", {
        style: outerComponentStyle,
        className: "rct-outer"
      }, sidebarWidth > 0 ? this.sidebar(height, groupHeights) : null, /*#__PURE__*/_react["default"].createElement(_ScrollElement["default"], {
        scrollRef: this.getScrollElementRef,
        width: width,
        height: height,
        onZoom: this.changeZoom,
        onWheelZoom: this.handleWheelZoom,
        traditionalZoom: traditionalZoom,
        onScroll: this.onScroll,
        isInteractingWithItem: isInteractingWithItem
      }, /*#__PURE__*/_react["default"].createElement(_MarkerCanvas["default"], null, this.columns(canvasTimeStart, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height, dimensionItems, groupHeights, groupTops), this.rows(canvasWidth, groupHeights, groups), this.items(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops), this.childrenWithProps(canvasTimeStart, canvasTimeEnd, canvasWidth, dimensionItems, groupHeights, groupTops, height, visibleTimeStart, visibleTimeEnd, minUnit, timeSteps))), rightSidebarWidth > 0 ? this.rightSidebar(height, groupHeights) : null)))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var visibleTimeStart = nextProps.visibleTimeStart,
        visibleTimeEnd = nextProps.visibleTimeEnd,
        items = nextProps.items,
        groups = nextProps.groups;

      // This is a gross hack pushing items and groups in to state only to allow
      // For the forceUpdate check
      var derivedState = {
        items: items,
        groups: groups
      };

      // if the items or groups have changed we must re-render
      var forceUpdate = items !== prevState.items || groups !== prevState.groups;

      // We are a controlled component
      if (visibleTimeStart && visibleTimeEnd) {
        // Get the new canvas position
        Object.assign(derivedState, (0, _calendar.calculateScrollCanvas)(visibleTimeStart, visibleTimeEnd, forceUpdate, items, groups, nextProps, prevState));
      } else if (forceUpdate) {
        // Calculate new item stack position as canvas may have changed
        var canvasWidth = (0, _calendar.getCanvasWidth)(prevState.width, nextProps.buffer);
        Object.assign(derivedState, (0, _calendar.stackTimelineItems)(items, groups, canvasWidth, prevState.canvasTimeStart, prevState.canvasTimeEnd, nextProps.keys, nextProps.lineHeight, nextProps.itemHeightRatio, nextProps.stackItems, prevState.draggingItem, prevState.resizingItem, prevState.dragTime, prevState.resizingEdge, prevState.resizeTime, prevState.newGroupOrder));
      }
      return derivedState;
    }
  }]);
}(_react.Component);
_defineProperty(ReactCalendarTimeline, "propTypes", {
  groups: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object]).isRequired,
  items: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object]).isRequired,
  sidebarWidth: _propTypes["default"].number,
  rightSidebarWidth: _propTypes["default"].number,
  dragSnap: _propTypes["default"].number,
  minResizeWidth: _propTypes["default"].number,
  lineHeight: _propTypes["default"].number,
  itemHeightRatio: _propTypes["default"].number,
  minZoom: _propTypes["default"].number,
  maxZoom: _propTypes["default"].number,
  buffer: _propTypes["default"].number,
  clickTolerance: _propTypes["default"].number,
  canChangeGroup: _propTypes["default"].bool,
  canMove: _propTypes["default"].bool,
  canResize: _propTypes["default"].oneOf([true, false, 'left', 'right', 'both']),
  useResizeHandle: _propTypes["default"].bool,
  canSelect: _propTypes["default"].bool,
  stackItems: _propTypes["default"].bool,
  traditionalZoom: _propTypes["default"].bool,
  itemTouchSendsClick: _propTypes["default"].bool,
  horizontalLineClassNamesForGroup: _propTypes["default"].func,
  onItemMove: _propTypes["default"].func,
  onItemResize: _propTypes["default"].func,
  onItemClick: _propTypes["default"].func,
  onItemSelect: _propTypes["default"].func,
  onItemDeselect: _propTypes["default"].func,
  onCanvasClick: _propTypes["default"].func,
  onItemDoubleClick: _propTypes["default"].func,
  onItemContextMenu: _propTypes["default"].func,
  onCanvasDoubleClick: _propTypes["default"].func,
  onCanvasContextMenu: _propTypes["default"].func,
  onZoom: _propTypes["default"].func,
  onItemDrag: _propTypes["default"].func,
  moveResizeValidator: _propTypes["default"].func,
  itemRenderer: _propTypes["default"].func,
  groupRenderer: _propTypes["default"].func,
  emptyCellLabelRenderer: _propTypes["default"].func,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  keys: _propTypes["default"].shape({
    groupIdKey: _propTypes["default"].string,
    groupTitleKey: _propTypes["default"].string,
    groupLabelKey: _propTypes["default"].string,
    groupRightTitleKey: _propTypes["default"].string,
    itemIdKey: _propTypes["default"].string,
    itemTitleKey: _propTypes["default"].string,
    itemDivTitleKey: _propTypes["default"].string,
    itemGroupKey: _propTypes["default"].string,
    itemTimeStartKey: _propTypes["default"].string,
    itemTimeEndKey: _propTypes["default"].string
  }),
  headerRef: _propTypes["default"].func,
  scrollRef: _propTypes["default"].func,
  timeSteps: _propTypes["default"].shape({
    second: _propTypes["default"].number,
    minute: _propTypes["default"].number,
    hour: _propTypes["default"].number,
    day: _propTypes["default"].number,
    month: _propTypes["default"].number,
    year: _propTypes["default"].number
  }),
  defaultTimeStart: _propTypes["default"].object,
  defaultTimeEnd: _propTypes["default"].object,
  visibleTimeStart: _propTypes["default"].number,
  visibleTimeEnd: _propTypes["default"].number,
  onTimeChange: _propTypes["default"].func,
  onBoundsChange: _propTypes["default"].func,
  selected: _propTypes["default"].array,
  resizeDetector: _propTypes["default"].shape({
    addListener: _propTypes["default"].func,
    removeListener: _propTypes["default"].func
  }),
  verticalLineClassNamesForTime: _propTypes["default"].func,
  children: _propTypes["default"].node
});
_defineProperty(ReactCalendarTimeline, "defaultProps", {
  sidebarWidth: 150,
  rightSidebarWidth: 0,
  dragSnap: 1000 * 60 * 15,
  // 15min
  minResizeWidth: 20,
  lineHeight: 30,
  itemHeightRatio: 0.65,
  buffer: 3,
  minZoom: 60 * 60 * 1000,
  // 1 hour
  maxZoom: 5 * 365.24 * 86400 * 1000,
  // 5 years

  clickTolerance: 3,
  // how many pixels can we drag for it to be still considered a click?

  canChangeGroup: true,
  canMove: true,
  canResize: 'right',
  useResizeHandle: false,
  canSelect: true,
  stackItems: false,
  traditionalZoom: false,
  horizontalLineClassNamesForGroup: null,
  onItemMove: null,
  onItemResize: null,
  onItemClick: null,
  onItemSelect: null,
  onItemDeselect: null,
  onItemDrag: null,
  onCanvasClick: null,
  onItemDoubleClick: null,
  onItemContextMenu: null,
  onZoom: null,
  verticalLineClassNamesForTime: null,
  moveResizeValidator: null,
  dayBackground: null,
  defaultTimeStart: null,
  defaultTimeEnd: null,
  itemTouchSendsClick: false,
  style: {},
  className: '',
  keys: _defaultConfig.defaultKeys,
  timeSteps: _defaultConfig.defaultTimeSteps,
  headerRef: function headerRef() {},
  scrollRef: function scrollRef() {},
  // if you pass in visibleTimeStart and visibleTimeEnd, you must also pass onTimeChange(visibleTimeStart, visibleTimeEnd),
  // which needs to update the props visibleTimeStart and visibleTimeEnd to the ones passed
  visibleTimeStart: null,
  visibleTimeEnd: null,
  onTimeChange: function onTimeChange(visibleTimeStart, visibleTimeEnd, updateScrollCanvas) {
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
  },
  // called when the canvas area of the calendar changes
  onBoundsChange: null,
  children: null,
  selected: null
});
_defineProperty(ReactCalendarTimeline, "childContextTypes", {
  getTimelineContext: _propTypes["default"].func
});