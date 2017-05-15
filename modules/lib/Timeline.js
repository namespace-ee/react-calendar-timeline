'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('./Timeline.css');

var _Items = require('./items/Items');

var _Items2 = _interopRequireDefault(_Items);

var _InfoLabel = require('./layout/InfoLabel');

var _InfoLabel2 = _interopRequireDefault(_InfoLabel);

var _Sidebar = require('./layout/Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Header = require('./layout/Header');

var _Header2 = _interopRequireDefault(_Header);

var _VerticalLines = require('./lines/VerticalLines');

var _VerticalLines2 = _interopRequireDefault(_VerticalLines);

var _HorizontalLines = require('./lines/HorizontalLines');

var _HorizontalLines2 = _interopRequireDefault(_HorizontalLines);

var _TodayLine = require('./lines/TodayLine');

var _TodayLine2 = _interopRequireDefault(_TodayLine);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultKeys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightSidebarKey: 'right_sidebar',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start_time',
  itemTimeEndKey: 'end_time'
};

var defaultTimeSteps = {
  second: 1,
  minute: 1,
  hour: 1,
  day: 1,
  month: 1,
  year: 1
};

var ReactCalendarTimeline = function (_Component) {
  _inherits(ReactCalendarTimeline, _Component);

  function ReactCalendarTimeline(props) {
    _classCallCheck(this, ReactCalendarTimeline);

    var _this = _possibleConstructorReturn(this, (ReactCalendarTimeline.__proto__ || Object.getPrototypeOf(ReactCalendarTimeline)).call(this, props));

    _initialiseProps.call(_this);

    var visibleTimeStart = null;
    var visibleTimeEnd = null;

    if (_this.props.defaultTimeStart && _this.props.defaultTimeEnd) {
      visibleTimeStart = _this.props.defaultTimeStart.valueOf();
      visibleTimeEnd = _this.props.defaultTimeEnd.valueOf();
    } else if (_this.props.visibleTimeStart && _this.props.visibleTimeEnd) {
      visibleTimeStart = _this.props.visibleTimeStart;
      visibleTimeEnd = _this.props.visibleTimeEnd;
    } else {
      visibleTimeStart = Math.min.apply(Math, _toConsumableArray(_this.props.items.map(function (item) {
        return (0, _utils._get)(item, 'start').getTime();
      })));
      visibleTimeEnd = Math.max.apply(Math, _toConsumableArray(_this.props.items.map(function (item) {
        return (0, _utils._get)(item, 'end').getTime();
      })));

      if (!visibleTimeStart || !visibleTimeEnd) {
        visibleTimeStart = new Date().getTime() - 86400 * 7 * 1000;
        visibleTimeEnd = new Date().getTime() + 86400 * 7 * 1000;
      }

      if (_this.props.onTimeInit) {
        _this.props.onTimeInit(visibleTimeStart, visibleTimeEnd);
      }
    }

    _this.state = {
      width: 1000,

      visibleTimeStart: visibleTimeStart,
      visibleTimeEnd: visibleTimeEnd,
      canvasTimeStart: visibleTimeStart - (visibleTimeEnd - visibleTimeStart),

      selectedItem: null,
      dragTime: null,
      dragGroupTitle: null,
      resizeTime: null,
      isDragging: false,
      topOffset: 0,
      resizingItem: null,
      resizingEdge: null
    };

    var _this$stackItems = _this.stackItems(props.items, props.groups, _this.state.canvasTimeStart, _this.state.visibleTimeStart, _this.state.visibleTimeEnd, _this.state.width),
        dimensionItems = _this$stackItems.dimensionItems,
        height = _this$stackItems.height,
        groupHeights = _this$stackItems.groupHeights,
        groupTops = _this$stackItems.groupTops;

    _this.state.dimensionItems = dimensionItems;
    _this.state.height = height;
    _this.state.groupHeights = groupHeights;
    _this.state.groupTops = groupTops;
    return _this;
  }

  _createClass(ReactCalendarTimeline, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.resize();

      this.resizeEventListener = {
        handleEvent: function handleEvent(event) {
          _this2.resize();
        }
      };

      window.addEventListener('resize', this.resizeEventListener);

      this.lastTouchDistance = null;

      this.refs.scrollComponent.addEventListener('touchstart', this.touchStart);
      this.refs.scrollComponent.addEventListener('touchmove', this.touchMove);
      this.refs.scrollComponent.addEventListener('touchend', this.touchEnd);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.resizeEventListener);
      this.refs.scrollComponent.removeEventListener('touchstart', this.touchStart);
      this.refs.scrollComponent.removeEventListener('touchmove', this.touchMove);
      this.refs.scrollComponent.removeEventListener('touchend', this.touchEnd);
    }
  }, {
    key: 'resize',
    value: function resize() {
      // FIXME currently when the component creates a scroll the scrollbar is not used in the initial width calculation, resizing fixes this
      var _refs$container$getBo = this.refs.container.getBoundingClientRect(),
          containerWidth = _refs$container$getBo.width,
          containerTop = _refs$container$getBo.top;

      var width = containerWidth - this.props.sidebarWidth - this.props.rightSidebarWidth;

      var _stackItems = this.stackItems(this.props.items, this.props.groups, this.state.canvasTimeStart, this.state.visibleTimeStart, this.state.visibleTimeEnd, width),
          dimensionItems = _stackItems.dimensionItems,
          height = _stackItems.height,
          groupHeights = _stackItems.groupHeights,
          groupTops = _stackItems.groupTops;

      this.setState({
        width: width,
        topOffset: containerTop + window.pageYOffset,
        dimensionItems: dimensionItems,
        height: height,
        groupHeights: groupHeights,
        groupTops: groupTops
      });
      this.refs.scrollComponent.scrollLeft = width;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var visibleTimeStart = nextProps.visibleTimeStart,
          visibleTimeEnd = nextProps.visibleTimeEnd,
          items = nextProps.items,
          groups = nextProps.groups;


      if (visibleTimeStart && visibleTimeEnd) {
        this.updateScrollCanvas(visibleTimeStart, visibleTimeEnd, items !== this.props.items || groups !== this.props.groups, items, groups);
      }

      if (items !== this.props.items || groups !== this.props.groups) {
        this.updateDimensions(items, groups);
      }
    }
  }, {
    key: 'updateDimensions',
    value: function updateDimensions(items, groups) {
      var _state = this.state,
          canvasTimeStart = _state.canvasTimeStart,
          visibleTimeStart = _state.visibleTimeStart,
          visibleTimeEnd = _state.visibleTimeEnd,
          width = _state.width;

      var _stackItems2 = this.stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, width),
          dimensionItems = _stackItems2.dimensionItems,
          height = _stackItems2.height,
          groupHeights = _stackItems2.groupHeights,
          groupTops = _stackItems2.groupTops;

      this.setState({ dimensionItems: dimensionItems, height: height, groupHeights: groupHeights, groupTops: groupTops });
    }

    // called when the visible time changes

  }, {
    key: 'zoomIn',
    value: function zoomIn(e) {
      e.preventDefault();

      this.changeZoom(0.75);
    }
  }, {
    key: 'zoomOut',
    value: function zoomOut(e) {
      e.preventDefault();

      this.changeZoom(1.25);
    }
  }, {
    key: 'changeZoom',
    value: function changeZoom(scale) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
      var _props = this.props,
          minZoom = _props.minZoom,
          maxZoom = _props.maxZoom;

      var oldZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
      var newZoom = Math.min(Math.max(Math.round(oldZoom * scale), minZoom), maxZoom); // min 1 min, max 20 years
      var newVisibleTimeStart = Math.round(this.state.visibleTimeStart + (oldZoom - newZoom) * offset);

      this.props.onTimeChange.bind(this)(newVisibleTimeStart, newVisibleTimeStart + newZoom, this.updateScrollCanvas);
    }
  }, {
    key: 'rowAndTimeFromEvent',
    value: function rowAndTimeFromEvent(e) {
      var _props2 = this.props,
          lineHeight = _props2.lineHeight,
          dragSnap = _props2.dragSnap;
      var _state2 = this.state,
          width = _state2.width,
          visibleTimeStart = _state2.visibleTimeStart,
          visibleTimeEnd = _state2.visibleTimeEnd;


      var parentPosition = (0, _utils.getParentPosition)(e.currentTarget);
      var x = e.clientX - parentPosition.x;
      var y = e.clientY - parentPosition.y;

      var row = Math.floor((y - lineHeight * 2) / lineHeight);
      var time = Math.round(visibleTimeStart + x / width * (visibleTimeEnd - visibleTimeStart));
      time = Math.floor(time / dragSnap) * dragSnap;

      return [row, time];
    }
  }, {
    key: 'todayLine',
    value: function todayLine(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight) {
      return _react2.default.createElement(_TodayLine2.default, { canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        lineCount: (0, _utils._length)(this.props.groups),
        height: height,
        headerHeight: headerHeight
      });
    }
  }, {
    key: 'verticalLines',
    value: function verticalLines(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height, headerHeight) {
      return _react2.default.createElement(_VerticalLines2.default, { canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        lineCount: (0, _utils._length)(this.props.groups),
        minUnit: minUnit,
        timeSteps: timeSteps,
        fixedHeader: this.props.fixedHeader,
        height: height,
        headerHeight: headerHeight
      });
    }
  }, {
    key: 'horizontalLines',
    value: function horizontalLines(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, groupHeights, headerHeight) {
      return _react2.default.createElement(_HorizontalLines2.default, { canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        lineCount: (0, _utils._length)(this.props.groups),
        groups: this.props.groups,
        groupHeights: groupHeights,
        headerHeight: headerHeight
      });
    }
  }, {
    key: 'items',
    value: function items(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops) {
      return _react2.default.createElement(_Items2.default, { canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        lineCount: (0, _utils._length)(this.props.groups),
        dimensionItems: dimensionItems,
        minUnit: minUnit,
        groupHeights: groupHeights,
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
        topOffset: this.state.topOffset,
        itemSelect: this.selectItem,
        itemDrag: this.dragItem,
        itemDrop: this.dropItem,
        onItemDoubleClick: this.props.onItemDoubleClick,
        onItemContextMenu: this.props.onItemContextMenu,
        itemResizing: this.resizingItem,
        itemResized: this.resizedItem });
    }
  }, {
    key: 'infoLabel',
    value: function infoLabel() {
      var label = null;

      if (this.state.dragTime) {
        label = (0, _moment2.default)(this.state.dragTime).format('LLL') + ', ' + this.state.dragGroupTitle;
      } else if (this.state.resizeTime) {
        label = (0, _moment2.default)(this.state.resizeTime).format('LLL');
      }

      return label ? _react2.default.createElement(_InfoLabel2.default, { label: label }) : '';
    }
  }, {
    key: 'header',
    value: function header(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, headerLabelGroupHeight, headerLabelHeight) {
      return _react2.default.createElement(_Header2.default, { canvasTimeStart: canvasTimeStart,
        hasRightSidebar: this.props.rightSidebarWidth > 0,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        minUnit: minUnit,
        timeSteps: timeSteps,
        headerLabelGroupHeight: headerLabelGroupHeight,
        headerLabelHeight: headerLabelHeight,
        width: this.state.width,
        zoom: zoom,
        visibleTimeStart: this.state.visibleTimeStart,
        visibleTimeEnd: this.state.visibleTimeEnd,
        fixedHeader: this.props.fixedHeader,
        zIndex: this.props.zIndexStart + 1,
        showPeriod: this.showPeriod });
    }
  }, {
    key: 'sidebar',
    value: function sidebar(height, groupHeights, headerHeight) {
      return _react2.default.createElement(
        _Sidebar2.default,
        { groups: this.props.groups,
          keys: this.props.keys,

          width: this.props.sidebarWidth,
          lineHeight: this.props.lineHeight,
          groupHeights: groupHeights,
          height: height,
          headerHeight: headerHeight,

          fixedHeader: this.props.fixedHeader,
          zIndex: this.props.zIndexStart + 2 },
        this.props.children
      );
    }
  }, {
    key: 'rightSidebar',
    value: function rightSidebar(height, groupHeights, headerHeight) {
      return _react2.default.createElement(
        _Sidebar2.default,
        { groups: this.props.groups,
          keys: this.props.keys,
          isRightSidebar: true,

          width: this.props.rightSidebarWidth,
          lineHeight: this.props.lineHeight,
          groupHeights: groupHeights,
          height: height,
          headerHeight: headerHeight,

          fixedHeader: this.props.fixedHeader,
          zIndex: this.props.zIndexStart + 2 },
        this.props.rightSidebarContent
      );
    }
  }, {
    key: 'stackItems',
    value: function stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, width) {
      var _props3 = this.props,
          keys = _props3.keys,
          dragSnap = _props3.dragSnap,
          lineHeight = _props3.lineHeight,
          headerLabelGroupHeight = _props3.headerLabelGroupHeight,
          headerLabelHeight = _props3.headerLabelHeight,
          stackItems = _props3.stackItems,
          fullUpdate = _props3.fullUpdate,
          itemHeightRatio = _props3.itemHeightRatio;
      var _state3 = this.state,
          draggingItem = _state3.draggingItem,
          dragTime = _state3.dragTime,
          resizingItem = _state3.resizingItem,
          resizingEdge = _state3.resizingEdge,
          resizeTime = _state3.resizeTime,
          newGroupOrder = _state3.newGroupOrder;

      var zoom = visibleTimeEnd - visibleTimeStart;
      var canvasTimeEnd = canvasTimeStart + zoom * 3;
      var canvasWidth = width * 3;
      var headerHeight = headerLabelGroupHeight + headerLabelHeight;

      var visibleItems = (0, _utils.getVisibleItems)(items, canvasTimeStart, canvasTimeEnd, keys);
      var groupOrders = (0, _utils.getGroupOrders)(groups, keys);

      var dimensionItems = visibleItems.map(function (item) {
        return {
          id: (0, _utils._get)(item, keys.itemIdKey),
          dimensions: (0, _utils.calculateDimensions)({
            item: item,
            order: groupOrders[(0, _utils._get)(item, keys.itemGroupKey)],
            keys: keys,
            canvasTimeStart: canvasTimeStart,
            canvasTimeEnd: canvasTimeEnd,
            canvasWidth: canvasWidth,
            dragSnap: dragSnap,
            lineHeight: lineHeight,
            draggingItem: draggingItem,
            dragTime: dragTime,
            resizingItem: resizingItem,
            resizingEdge: resizingEdge,
            resizeTime: resizeTime,
            newGroupOrder: newGroupOrder,
            itemHeightRatio: itemHeightRatio,
            fullUpdate: fullUpdate,
            visibleTimeStart: visibleTimeStart,
            visibleTimeEnd: visibleTimeEnd
          })
        };
      }).filter(function (i) {
        return i.dimensions;
      });

      var stackingMethod = stackItems ? _utils.stack : _utils.nostack;

      var _stackingMethod = stackingMethod(dimensionItems, groupOrders, lineHeight, headerHeight),
          height = _stackingMethod.height,
          groupHeights = _stackingMethod.groupHeights,
          groupTops = _stackingMethod.groupTops;

      return { dimensionItems: dimensionItems, height: height, groupHeights: groupHeights, groupTops: groupTops };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          items = _props4.items,
          groups = _props4.groups,
          headerLabelGroupHeight = _props4.headerLabelGroupHeight,
          headerLabelHeight = _props4.headerLabelHeight,
          sidebarWidth = _props4.sidebarWidth,
          rightSidebarWidth = _props4.rightSidebarWidth,
          timeSteps = _props4.timeSteps;
      var _state4 = this.state,
          draggingItem = _state4.draggingItem,
          resizingItem = _state4.resizingItem,
          isDragging = _state4.isDragging,
          width = _state4.width,
          visibleTimeStart = _state4.visibleTimeStart,
          visibleTimeEnd = _state4.visibleTimeEnd,
          canvasTimeStart = _state4.canvasTimeStart;
      var _state5 = this.state,
          dimensionItems = _state5.dimensionItems,
          height = _state5.height,
          groupHeights = _state5.groupHeights,
          groupTops = _state5.groupTops;

      var zoom = visibleTimeEnd - visibleTimeStart;
      var canvasTimeEnd = canvasTimeStart + zoom * 3;
      var canvasWidth = width * 3;
      var minUnit = (0, _utils.getMinUnit)(zoom, width, timeSteps);
      var headerHeight = headerLabelGroupHeight + headerLabelHeight;

      if (draggingItem || resizingItem) {
        var stackResults = this.stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, width);
        dimensionItems = stackResults.dimensionItems;
        height = stackResults.height;
        groupHeights = stackResults.groupHeights;
        groupTops = stackResults.groupTops;
      }

      var outerComponentStyle = {
        height: height + 'px'
      };

      var scrollComponentStyle = {
        width: width + 'px',
        height: height + 20 + 'px',
        cursor: isDragging ? 'move' : 'default'
      };

      var canvasComponentStyle = {
        width: canvasWidth + 'px',
        height: height + 'px'
      };

      return _react2.default.createElement(
        'div',
        { style: this.props.style, ref: 'container', className: 'react-calendar-timeline' },
        _react2.default.createElement(
          'div',
          { style: outerComponentStyle, className: 'rct-outer' },
          sidebarWidth > 0 ? this.sidebar(height, groupHeights, headerHeight) : null,
          _react2.default.createElement(
            'div',
            { ref: 'scrollComponent',
              className: 'rct-scroll',
              style: scrollComponentStyle,
              onScroll: this.onScroll,
              onWheel: this.onWheel,
              onMouseDown: this.handleMouseDown,
              onMouseMove: this.handleMouseMove,
              onMouseUp: this.handleMouseUp
            },
            _react2.default.createElement(
              'div',
              { ref: 'canvasComponent',
                className: 'rct-canvas',
                style: canvasComponentStyle,
                onDoubleClick: this.handleDoubleClick
              },
              this.items(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops),
              this.verticalLines(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, height, headerHeight),
              this.horizontalLines(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, groupHeights, headerHeight),
              this.todayLine(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight),
              this.infoLabel(),
              this.header(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, timeSteps, headerLabelGroupHeight, headerLabelHeight)
            )
          ),
          rightSidebarWidth > 0 ? this.rightSidebar(height, groupHeights, headerHeight) : null
        )
      );
    }
  }]);

  return ReactCalendarTimeline;
}(_react.Component);

ReactCalendarTimeline.propTypes = {
  groups: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]).isRequired,
  items: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]).isRequired,
  sidebarWidth: _react.PropTypes.number,
  rightSidebarWidth: _react.PropTypes.number,
  rightSidebarContent: _react.PropTypes.node,
  dragSnap: _react.PropTypes.number,
  minResizeWidth: _react.PropTypes.number,
  fixedHeader: _react.PropTypes.oneOf(['fixed', 'absolute', 'none']),
  fullUpdate: _react.PropTypes.bool,
  zIndexStart: _react.PropTypes.number,
  lineHeight: _react.PropTypes.number,
  headerLabelGroupHeight: _react.PropTypes.number,
  headerLabelHeight: _react.PropTypes.number,
  itemHeightRatio: _react.PropTypes.number,

  minZoom: _react.PropTypes.number,
  maxZoom: _react.PropTypes.number,

  clickTolerance: _react.PropTypes.number,

  canChangeGroup: _react.PropTypes.bool,
  canMove: _react.PropTypes.bool,
  canResize: _react.PropTypes.oneOf([true, false, 'left', 'right', 'both']),
  useResizeHandle: _react.PropTypes.bool,
  canSelect: _react.PropTypes.bool,

  stackItems: _react.PropTypes.bool,

  traditionalZoom: _react.PropTypes.bool,

  itemTouchSendsClick: _react.PropTypes.bool,

  onItemMove: _react.PropTypes.func,
  onItemResize: _react.PropTypes.func,
  onItemClick: _react.PropTypes.func,
  onItemSelect: _react.PropTypes.func,
  onCanvasClick: _react.PropTypes.func,
  onItemDoubleClick: _react.PropTypes.func,
  onItemContextMenu: _react.PropTypes.func,
  onCanvasDoubleClick: _react.PropTypes.func,

  moveResizeValidator: _react.PropTypes.func,

  dayBackground: _react.PropTypes.func,

  style: _react.PropTypes.object,
  keys: _react.PropTypes.object,

  timeSteps: _react.PropTypes.object,

  defaultTimeStart: _react.PropTypes.object,
  defaultTimeEnd: _react.PropTypes.object,

  visibleTimeStart: _react.PropTypes.number,
  visibleTimeEnd: _react.PropTypes.number,
  onTimeChange: _react.PropTypes.func,
  onTimeInit: _react.PropTypes.func,
  onBoundsChange: _react.PropTypes.func,

  children: _react.PropTypes.node
};
ReactCalendarTimeline.defaultProps = {
  sidebarWidth: 150,
  rightSidebarWidth: 0,
  dragSnap: 1000 * 60 * 15, // 15min
  minResizeWidth: 20,
  fixedHeader: 'none', // fixed or absolute or none
  fullUpdate: true,
  zIndexStart: 10,
  lineHeight: 30,
  headerLabelGroupHeight: 30,
  headerLabelHeight: 30,
  itemHeightRatio: 0.65,

  minZoom: 60 * 60 * 1000, // 1 hour
  maxZoom: 5 * 365.24 * 86400 * 1000, // 5 years

  clickTolerance: 3, // how many pixels can we drag for it to be still considered a click?

  canChangeGroup: true,
  canMove: true,
  canResize: 'right',
  useResizeHandle: false,
  canSelect: true,

  stackItems: false,

  traditionalZoom: false,

  onItemMove: null,
  onItemResize: null,
  onItemClick: null,
  onItemSelect: null,
  onCanvasClick: null,
  onItemDoubleClick: null,
  onItemContextMenu: null,

  moveResizeValidator: null,

  dayBackground: null,

  defaultTimeStart: null,
  defaultTimeEnd: null,

  itemTouchSendsClick: false,

  style: {},
  keys: defaultKeys,
  timeSteps: defaultTimeSteps,

  // if you pass in visibleTimeStart and visibleTimeEnd, you must also pass onTimeChange(visibleTimeStart, visibleTimeEnd),
  // which needs to update the props visibleTimeStart and visibleTimeEnd to the ones passed
  visibleTimeStart: null,
  visibleTimeEnd: null,
  onTimeChange: function onTimeChange(visibleTimeStart, visibleTimeEnd, updateScrollCanvas) {
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
  },
  // called after the calendar loads and the visible time has been calculated
  onTimeInit: null,
  // called when the canvas area of the calendar changes
  onBoundsChange: null,
  children: null
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.touchStart = function (e) {
    if (e.touches.length === 2) {
      e.preventDefault();

      _this3.lastTouchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX);
      _this3.singleTouchStart = null;
      _this3.lastSingleTouch = null;
    } else if (e.touches.length === 1 && _this3.props.fixedHeader === 'fixed') {
      e.preventDefault();

      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;

      _this3.lastTouchDistance = null;
      _this3.singleTouchStart = { x: x, y: y, screenY: window.pageYOffset };
      _this3.lastSingleTouch = { x: x, y: y, screenY: window.pageYOffset };
    }
  };

  this.touchMove = function (e) {
    if (_this3.state.dragTime || _this3.state.resizeTime) {
      e.preventDefault();
      return;
    }
    if (_this3.lastTouchDistance && e.touches.length === 2) {
      e.preventDefault();

      var touchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX);

      var parentPosition = (0, _utils.getParentPosition)(e.currentTarget);
      var xPosition = (e.touches[0].screenX + e.touches[1].screenX) / 2 - parentPosition.x;

      if (touchDistance !== 0 && _this3.lastTouchDistance !== 0) {
        _this3.changeZoom(_this3.lastTouchDistance / touchDistance, xPosition / _this3.state.width);
        _this3.lastTouchDistance = touchDistance;
      }
    } else if (_this3.lastSingleTouch && e.touches.length === 1 && _this3.props.fixedHeader === 'fixed') {
      e.preventDefault();

      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;

      var deltaX = x - _this3.lastSingleTouch.x;
      // let deltaY = y - this.lastSingleTouch.y

      var deltaX0 = x - _this3.singleTouchStart.x;
      var deltaY0 = y - _this3.singleTouchStart.y;

      _this3.lastSingleTouch = { x: x, y: y };

      var moveX = Math.abs(deltaX0) * 3 > Math.abs(deltaY0);
      var moveY = Math.abs(deltaY0) * 3 > Math.abs(deltaX0);

      if (deltaX !== 0 && moveX) {
        _this3.refs.scrollComponent.scrollLeft -= deltaX;
      }
      if (moveY) {
        window.scrollTo(window.pageXOffset, _this3.singleTouchStart.screenY - deltaY0);
      }
    }
  };

  this.touchEnd = function (e) {
    if (_this3.lastTouchDistance) {
      e.preventDefault();

      _this3.lastTouchDistance = null;
    }
    if (_this3.lastSingleTouch) {
      e.preventDefault();

      _this3.lastSingleTouch = null;
      _this3.singleTouchStart = null;
    }
  };

  this.onScroll = function () {
    var scrollComponent = _this3.refs.scrollComponent;
    var canvasTimeStart = _this3.state.canvasTimeStart;
    var scrollX = scrollComponent.scrollLeft;
    var zoom = _this3.state.visibleTimeEnd - _this3.state.visibleTimeStart;
    var width = _this3.state.width;
    var visibleTimeStart = canvasTimeStart + zoom * scrollX / width;

    // move the virtual canvas if needed
    if (scrollX < _this3.state.width * 0.5) {
      _this3.setState({
        canvasTimeStart: _this3.state.canvasTimeStart - zoom
      });
      scrollComponent.scrollLeft += _this3.state.width;
    }
    if (scrollX > _this3.state.width * 1.5) {
      _this3.setState({
        canvasTimeStart: _this3.state.canvasTimeStart + zoom
      });
      scrollComponent.scrollLeft -= _this3.state.width;
    }

    if (_this3.state.visibleTimeStart !== visibleTimeStart || _this3.state.visibleTimeEnd !== visibleTimeStart + zoom) {
      _this3.props.onTimeChange.bind(_this3)(visibleTimeStart, visibleTimeStart + zoom, _this3.updateScrollCanvas);
    }
  };

  this.updateScrollCanvas = function (visibleTimeStart, visibleTimeEnd, forceUpdateDimensions, updatedItems, updatedGroups) {
    var oldCanvasTimeStart = _this3.state.canvasTimeStart;
    var oldZoom = _this3.state.visibleTimeEnd - _this3.state.visibleTimeStart;
    var newZoom = visibleTimeEnd - visibleTimeStart;
    var items = updatedItems || _this3.props.items;
    var groups = updatedGroups || _this3.props.groups;
    var fullUpdate = _this3.props.fullUpdate;


    var newState = {
      visibleTimeStart: visibleTimeStart,
      visibleTimeEnd: visibleTimeEnd
    };

    var resetCanvas = false;

    var canKeepCanvas = visibleTimeStart >= oldCanvasTimeStart + oldZoom * 0.5 && visibleTimeStart <= oldCanvasTimeStart + oldZoom * 1.5 && visibleTimeEnd >= oldCanvasTimeStart + oldZoom * 1.5 && visibleTimeEnd <= oldCanvasTimeStart + oldZoom * 2.5;

    // if new visible time is in the right canvas area
    if (canKeepCanvas) {
      // but we need to update the scroll
      var newScrollLeft = Math.round(_this3.state.width * (visibleTimeStart - oldCanvasTimeStart) / newZoom);
      if (_this3.refs.scrollComponent.scrollLeft !== newScrollLeft) {
        resetCanvas = true;
      }
    } else {
      resetCanvas = true;
    }

    if (resetCanvas) {
      // Todo: need to calculate new dimensions
      newState.canvasTimeStart = visibleTimeStart - newZoom;
      _this3.refs.scrollComponent.scrollLeft = _this3.state.width;

      if (_this3.props.onBoundsChange) {
        _this3.props.onBoundsChange(newState.canvasTimeStart, newState.canvasTimeStart + newZoom * 3);
      }
    }

    if (resetCanvas || forceUpdateDimensions || fullUpdate) {
      var canvasTimeStart = newState.canvasTimeStart ? newState.canvasTimeStart : oldCanvasTimeStart;

      var _stackItems3 = _this3.stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, _this3.state.width, fullUpdate),
          dimensionItems = _stackItems3.dimensionItems,
          height = _stackItems3.height,
          groupHeights = _stackItems3.groupHeights,
          groupTops = _stackItems3.groupTops;

      newState.dimensionItems = dimensionItems;
      newState.height = height;
      newState.groupHeights = groupHeights;
      newState.groupTops = groupTops;
    }

    _this3.setState(newState);
  };

  this.onWheel = function (e) {
    var traditionalZoom = _this3.props.traditionalZoom;

    if (e.ctrlKey) {
      e.preventDefault();
      var parentPosition = (0, _utils.getParentPosition)(e.currentTarget);
      var xPosition = e.clientX - parentPosition.x;
      _this3.changeZoom(1.0 + e.deltaY / 50, xPosition / _this3.state.width);
    } else if (e.shiftKey) {
      e.preventDefault();
      var scrollComponent = _this3.refs.scrollComponent;
      scrollComponent.scrollLeft += e.deltaY;
    } else if (e.altKey) {
      var _parentPosition = (0, _utils.getParentPosition)(e.currentTarget);
      var _xPosition = e.clientX - _parentPosition.x;
      _this3.changeZoom(1.0 + e.deltaY / 500, _xPosition / _this3.state.width);
    } else {
      if (_this3.props.fixedHeader === 'fixed') {
        e.preventDefault();
        if (e.deltaX !== 0) {
          if (!traditionalZoom) {
            _this3.refs.scrollComponent.scrollLeft += e.deltaX;
          }
        }
        if (e.deltaY !== 0) {
          window.scrollTo(window.pageXOffset, window.pageYOffset + e.deltaY);
          if (traditionalZoom) {
            var _parentPosition2 = (0, _utils.getParentPosition)(e.currentTarget);
            var _xPosition2 = e.clientX - _parentPosition2.x;
            _this3.changeZoom(1.0 + e.deltaY / 50, _xPosition2 / _this3.state.width);
          }
        }
      }
    }
  };

  this.showPeriod = function (from, unit) {
    var visibleTimeStart = from.valueOf();
    var visibleTimeEnd = (0, _moment2.default)(from).add(1, unit).valueOf();
    var zoom = visibleTimeEnd - visibleTimeStart;

    // can't zoom in more than to show one hour
    if (zoom < 360000) {
      return;
    }

    // clicked on the big header and already focused here, zoom out
    if (unit !== 'year' && _this3.state.visibleTimeStart === visibleTimeStart && _this3.state.visibleTimeEnd === visibleTimeEnd) {
      var nextUnit = (0, _utils.getNextUnit)(unit);

      visibleTimeStart = from.startOf(nextUnit).valueOf();
      visibleTimeEnd = (0, _moment2.default)(visibleTimeStart).add(1, nextUnit);
      zoom = visibleTimeEnd - visibleTimeStart;
    }

    _this3.props.onTimeChange.bind(_this3)(visibleTimeStart, visibleTimeStart + zoom, _this3.updateScrollCanvas);
  };

  this.selectItem = function (item, clickType, e) {
    if (_this3.state.selectedItem === item || _this3.props.itemTouchSendsClick && clickType === 'touch') {
      if (item && _this3.props.onItemClick) {
        _this3.props.onItemClick(item, e);
      }
    } else {
      _this3.setState({ selectedItem: item });
      if (item && _this3.props.onItemSelect) {
        _this3.props.onItemSelect(item, e);
      }
    }
  };

  this.scrollAreaClick = function (e) {
    // if not clicking on an item

    if (!(0, _utils.hasSomeParentTheClass)(e.target, 'rct-item')) {
      if (_this3.state.selectedItem) {
        _this3.selectItem(null);
      } else if (_this3.props.onCanvasClick) {
        var _rowAndTimeFromEvent = _this3.rowAndTimeFromEvent(e),
            _rowAndTimeFromEvent2 = _slicedToArray(_rowAndTimeFromEvent, 2),
            row = _rowAndTimeFromEvent2[0],
            time = _rowAndTimeFromEvent2[1];

        if (row >= 0 && row < _this3.props.groups.length) {
          var groupId = (0, _utils._get)(_this3.props.groups[row], _this3.props.keys.groupIdKey);
          _this3.props.onCanvasClick(groupId, time, e);
        }
      }
    }
  };

  this.dragItem = function (item, dragTime, newGroupOrder) {
    var newGroup = _this3.props.groups[newGroupOrder];
    var keys = _this3.props.keys;

    _this3.setState({
      draggingItem: item,
      dragTime: dragTime,
      newGroupOrder: newGroupOrder,
      dragGroupTitle: newGroup ? (0, _utils._get)(newGroup, keys.groupTitleKey) : ''
    });
  };

  this.dropItem = function (item, dragTime, newGroupOrder) {
    _this3.setState({ draggingItem: null, dragTime: null, dragGroupTitle: null });
    if (_this3.props.onItemMove) {
      _this3.props.onItemMove(item, dragTime, newGroupOrder);
    }
  };

  this.resizingItem = function (item, resizeTime, edge) {
    _this3.setState({
      resizingItem: item,
      resizingEdge: edge,
      resizeTime: resizeTime
    });
  };

  this.resizedItem = function (item, resizeTime, edge) {
    _this3.setState({ resizingItem: null, resizingEdge: null, resizeTime: null });
    if (_this3.props.onItemResize) {
      _this3.props.onItemResize(item, resizeTime, edge);
    }
  };

  this.handleMouseDown = function (e) {
    var topOffset = _this3.state.topOffset;
    var pageY = e.pageY;
    var _props5 = _this3.props,
        headerLabelGroupHeight = _props5.headerLabelGroupHeight,
        headerLabelHeight = _props5.headerLabelHeight;

    var headerHeight = headerLabelGroupHeight + headerLabelHeight;

    if (pageY - topOffset > headerHeight) {
      _this3.setState({ isDragging: true, dragStartPosition: e.pageX, dragLastPosition: e.pageX });
    }
  };

  this.handleMouseMove = function (e) {
    if (_this3.state.isDragging && !_this3.state.draggingItem && !_this3.state.resizingItem) {
      _this3.refs.scrollComponent.scrollLeft += _this3.state.dragLastPosition - e.pageX;
      _this3.setState({ dragLastPosition: e.pageX });
    }
  };

  this.handleMouseUp = function (e) {
    var dragStartPosition = _this3.state.dragStartPosition;


    if (Math.abs(dragStartPosition - e.pageX) <= _this3.props.clickTolerance) {
      _this3.scrollAreaClick(e);
    }

    _this3.setState({ isDragging: false, dragStartPosition: null, dragLastPosition: null });
  };

  this.handleDoubleClick = function (e) {
    var _state6 = _this3.state,
        canvasTimeStart = _state6.canvasTimeStart,
        width = _state6.width,
        visibleTimeStart = _state6.visibleTimeStart,
        visibleTimeEnd = _state6.visibleTimeEnd,
        groupTops = _state6.groupTops,
        topOffset = _state6.topOffset;

    var zoom = visibleTimeEnd - visibleTimeStart;
    var canvasTimeEnd = canvasTimeStart + zoom * 3;
    var canvasWidth = width * 3;
    var pageX = e.pageX,
        pageY = e.pageY;

    var ratio = (canvasTimeEnd - canvasTimeStart) / canvasWidth;
    var boundingRect = _this3.refs.scrollComponent.getBoundingClientRect();
    var timePosition = visibleTimeStart + ratio * (pageX - boundingRect.left);
    if (_this3.props.dragSnap) {
      timePosition = Math.round(timePosition / _this3.props.dragSnap) * _this3.props.dragSnap;
    }

    var groupIndex = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(groupTops)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        var item = groupTops[key];
        if (pageY - topOffset > item) {
          groupIndex = parseInt(key, 10);
        } else {
          break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (_this3.props.onCanvasDoubleClick) {
      _this3.props.onCanvasDoubleClick(_this3.props.groups[groupIndex], timePosition, e);
    }
  };
};

exports.default = ReactCalendarTimeline;
