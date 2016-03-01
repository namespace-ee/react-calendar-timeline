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

require('./Timeline.scss');

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
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start_time',
  itemTimeEndKey: 'end_time'
};

var ReactCalendarTimeline = function (_Component) {
  _inherits(ReactCalendarTimeline, _Component);

  function ReactCalendarTimeline(props) {
    _classCallCheck(this, ReactCalendarTimeline);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactCalendarTimeline).call(this, props));

    var visibleTimeStart = null;
    var visibleTimeEnd = null;

    if (_this.props.defaultTimeStart && _this.props.defaultTimeEnd) {
      visibleTimeStart = _this.props.defaultTimeStart.valueOf();
      visibleTimeEnd = _this.props.defaultTimeEnd.valueOf();
    } else if (_this.props.visibleTimeStart && _this.props.visibleTimeEnd) {
      visibleTimeStart = _this.props.visibleTimeStart;
      visibleTimeEnd = _this.props.visibleTimeEnd;
    } else {
      var _Math, _Math2;

      visibleTimeStart = (_Math = Math).min.apply(_Math, _toConsumableArray(_this.props.items.map(function (item) {
        return (0, _utils._get)(item, 'start').getTime();
      })));
      visibleTimeEnd = (_Math2 = Math).max.apply(_Math2, _toConsumableArray(_this.props.items.map(function (item) {
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
      resizeEnd: null,
      isDragging: false,
      topOffset: 0,
      resizingItem: null
    };

    var _this$stackItems = _this.stackItems(props.items, props.groups, _this.state.canvasTimeStart, _this.state.visibleTimeStart, _this.state.visibleTimeEnd, _this.state.width);

    var dimensionItems = _this$stackItems.dimensionItems;
    var height = _this$stackItems.height;
    var groupHeights = _this$stackItems.groupHeights;
    var groupTops = _this$stackItems.groupTops;


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
      this.refs.scrollComponent.addEventListener('touchstart', this.touchStart.bind(this));
      this.refs.scrollComponent.addEventListener('touchmove', this.touchMove.bind(this));
      this.refs.scrollComponent.addEventListener('touchend', this.touchEnd.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.resizeEventListener);
      this.refs.scrollComponent.removeEventListener('touchstart', this.touchStart.bind(this));
      this.refs.scrollComponent.removeEventListener('touchmove', this.touchMove.bind(this));
      this.refs.scrollComponent.removeEventListener('touchend', this.touchEnd.bind(this));
    }
  }, {
    key: 'touchStart',
    value: function touchStart(e) {
      if (e.touches.length === 2) {
        e.preventDefault();

        this.lastTouchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX);
        this.singleTouchStart = null;
        this.lastSingleTouch = null;
      } else if (e.touches.length === 1 && this.props.fixedHeader === 'fixed') {
        e.preventDefault();

        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;

        this.lastTouchDistance = null;
        this.singleTouchStart = { x: x, y: y, screenY: window.pageYOffset };
        this.lastSingleTouch = { x: x, y: y, screenY: window.pageYOffset };
      }
    }
  }, {
    key: 'touchMove',
    value: function touchMove(e) {
      if (this.state.dragTime || this.state.resizeEnd) {
        e.preventDefault();
        return;
      }
      if (this.lastTouchDistance && e.touches.length === 2) {
        e.preventDefault();

        var touchDistance = Math.abs(e.touches[0].screenX - e.touches[1].screenX);

        var parentPosition = (0, _utils.getParentPosition)(e.currentTarget);
        var xPosition = (e.touches[0].screenX + e.touches[1].screenX) / 2 - parentPosition.x;

        if (touchDistance !== 0 && this.lastTouchDistance !== 0) {
          this.changeZoom(this.lastTouchDistance / touchDistance, xPosition / this.state.width);
          this.lastTouchDistance = touchDistance;
        }
      } else if (this.lastSingleTouch && e.touches.length === 1 && this.props.fixedHeader === 'fixed') {
        e.preventDefault();

        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;

        var deltaX = x - this.lastSingleTouch.x;
        // let deltaY = y - this.lastSingleTouch.y

        var deltaX0 = x - this.singleTouchStart.x;
        var deltaY0 = y - this.singleTouchStart.y;

        this.lastSingleTouch = { x: x, y: y };

        var moveX = Math.abs(deltaX0) * 3 > Math.abs(deltaY0);
        var moveY = Math.abs(deltaY0) * 3 > Math.abs(deltaX0);

        if (deltaX !== 0 && moveX) {
          this.refs.scrollComponent.scrollLeft -= deltaX;
        }
        if (moveY) {
          window.scrollTo(window.pageXOffset, this.singleTouchStart.screenY - deltaY0);
        }
      }
    }
  }, {
    key: 'touchEnd',
    value: function touchEnd(e) {
      if (this.lastTouchDistance) {
        e.preventDefault();

        this.lastTouchDistance = null;
      }
      if (this.lastSingleTouch) {
        e.preventDefault();

        this.lastSingleTouch = null;
        this.singleTouchStart = null;
      }
    }
  }, {
    key: 'resize',
    value: function resize() {
      // FIXME currently when the component creates a scroll the scrollbar is not used in the initial width calculation, resizing fixes this
      var width = this.refs.container.clientWidth - this.props.sidebarWidth;

      var _stackItems = this.stackItems(this.props.items, this.props.groups, this.state.canvasTimeStart, this.state.visibleTimeStart, this.state.visibleTimeEnd, width);

      var dimensionItems = _stackItems.dimensionItems;
      var height = _stackItems.height;
      var groupHeights = _stackItems.groupHeights;
      var groupTops = _stackItems.groupTops;


      this.setState({
        width: width,
        topOffset: this.refs.container.getBoundingClientRect().top + window.pageYOffset,
        dimensionItems: dimensionItems,
        height: height,
        groupHeights: groupHeights,
        groupTops: groupTops
      });
      this.refs.scrollComponent.scrollLeft = width;
    }
  }, {
    key: 'onScroll',
    value: function onScroll() {
      var scrollComponent = this.refs.scrollComponent;
      var canvasTimeStart = this.state.canvasTimeStart;
      var scrollX = scrollComponent.scrollLeft;
      var zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
      var width = this.state.width;
      var visibleTimeStart = canvasTimeStart + zoom * scrollX / width;

      // move the virtual canvas if needed
      if (scrollX < this.state.width * 0.5) {
        this.setState({
          canvasTimeStart: this.state.canvasTimeStart - zoom
        });
        scrollComponent.scrollLeft += this.state.width;
      }
      if (scrollX > this.state.width * 1.5) {
        this.setState({
          canvasTimeStart: this.state.canvasTimeStart + zoom
        });
        scrollComponent.scrollLeft -= this.state.width;
      }

      if (this.state.visibleTimeStart !== visibleTimeStart || this.state.visibleTimeEnd !== visibleTimeStart + zoom) {
        this.props.onTimeChange.bind(this)(visibleTimeStart, visibleTimeStart + zoom);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var visibleTimeStart = nextProps.visibleTimeStart;
      var visibleTimeEnd = nextProps.visibleTimeEnd;
      var items = nextProps.items;
      var groups = nextProps.groups;


      if (visibleTimeStart && visibleTimeEnd) {
        this.updateScrollCanvas(visibleTimeStart, visibleTimeEnd, items !== this.props.items || groups !== this.props.groups, items, groups);
      }
    }
  }, {
    key: 'updateScrollCanvas',
    value: function updateScrollCanvas(visibleTimeStart, visibleTimeEnd, forceUpdateDimensions, updatedItems, updatedGroups) {
      var oldCanvasTimeStart = this.state.canvasTimeStart;
      var oldZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
      var newZoom = visibleTimeEnd - visibleTimeStart;
      var items = updatedItems || this.props.items;
      var groups = updatedGroups || this.props.groups;

      var newState = {
        visibleTimeStart: visibleTimeStart,
        visibleTimeEnd: visibleTimeEnd
      };

      var resetCanvas = false;

      var canKeepCanvas = visibleTimeStart >= oldCanvasTimeStart + oldZoom * 0.5 && visibleTimeStart <= oldCanvasTimeStart + oldZoom * 1.5 && visibleTimeEnd >= oldCanvasTimeStart + oldZoom * 1.5 && visibleTimeEnd <= oldCanvasTimeStart + oldZoom * 2.5;

      // if new visible time is in the right canvas area
      if (canKeepCanvas) {
        // but we need to update the scroll
        var newScrollLeft = Math.round(this.state.width * (visibleTimeStart - oldCanvasTimeStart) / newZoom);
        if (this.refs.scrollComponent.scrollLeft !== newScrollLeft) {
          resetCanvas = true;
        }
      } else {
        resetCanvas = true;
      }

      if (resetCanvas) {
        // Todo: need to calculate new dimensions
        newState.canvasTimeStart = visibleTimeStart - newZoom;
        this.refs.scrollComponent.scrollLeft = this.state.width;

        if (this.props.onBoundsChange) {
          this.props.onBoundsChange(newState.canvasTimeStart, newState.canvasTimeStart + newZoom * 3);
        }
      }

      if (resetCanvas || forceUpdateDimensions) {
        var canvasTimeStart = newState.canvasTimeStart ? newState.canvasTimeStart : oldCanvasTimeStart;

        var _stackItems2 = this.stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, this.state.width);

        var dimensionItems = _stackItems2.dimensionItems;
        var height = _stackItems2.height;
        var groupHeights = _stackItems2.groupHeights;
        var groupTops = _stackItems2.groupTops;

        newState.dimensionItems = dimensionItems;
        newState.height = height;
        newState.groupHeights = groupHeights;
        newState.groupTops = groupTops;
      }

      this.setState(newState);
    }
  }, {
    key: 'onWheel',
    value: function onWheel(e) {
      var traditionalZoom = this.props.traditionalZoom;

      if (e.ctrlKey) {
        e.preventDefault();
        var parentPosition = (0, _utils.getParentPosition)(e.currentTarget);
        var xPosition = e.clientX - parentPosition.x;
        this.changeZoom(1.0 + e.deltaY / 50, xPosition / this.state.width);
      } else if (e.shiftKey) {
        e.preventDefault();
        var scrollComponent = this.refs.scrollComponent;
        scrollComponent.scrollLeft += e.deltaY;
      } else if (e.altKey) {
        var parentPosition = (0, _utils.getParentPosition)(e.currentTarget);
        var xPosition = e.clientX - parentPosition.x;
        this.changeZoom(1.0 + e.deltaY / 500, xPosition / this.state.width);
      } else {
        if (this.props.fixedHeader === 'fixed') {
          e.preventDefault();
          if (e.deltaX !== 0) {
            if (!traditionalZoom) {
              this.refs.scrollComponent.scrollLeft += e.deltaX;
            }
          }
          if (e.deltaY !== 0) {
            window.scrollTo(window.pageXOffset, window.pageYOffset + e.deltaY);
            if (traditionalZoom) {
              var parentPosition = (0, _utils.getParentPosition)(e.currentTarget);
              var xPosition = e.clientX - parentPosition.x;
              this.changeZoom(1.0 + e.deltaY / 50, xPosition / this.state.width);
            }
          }
        }
      }
    }
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
      var offset = arguments.length <= 1 || arguments[1] === undefined ? 0.5 : arguments[1];
      var _props = this.props;
      var minZoom = _props.minZoom;
      var maxZoom = _props.maxZoom;

      var oldZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
      var newZoom = Math.min(Math.max(Math.round(oldZoom * scale), minZoom), maxZoom); // min 1 min, max 20 years
      var newVisibleTimeStart = Math.round(this.state.visibleTimeStart + (oldZoom - newZoom) * offset);

      this.props.onTimeChange.bind(this)(newVisibleTimeStart, newVisibleTimeStart + newZoom);
    }
  }, {
    key: 'showPeriod',
    value: function showPeriod(from, unit) {
      var visibleTimeStart = from.valueOf();
      var visibleTimeEnd = (0, _moment2.default)(from).add(1, unit).valueOf();
      var zoom = visibleTimeEnd - visibleTimeStart;

      // can't zoom in more than to show one hour
      if (zoom < 360000) {
        return;
      }

      // clicked on the big header and already focused here, zoom out
      if (unit !== 'year' && this.state.visibleTimeStart === visibleTimeStart && this.state.visibleTimeEnd === visibleTimeEnd) {
        var nextUnit = (0, _utils.getNextUnit)(unit);

        visibleTimeStart = from.startOf(nextUnit).valueOf();
        visibleTimeEnd = (0, _moment2.default)(visibleTimeStart).add(1, nextUnit);
        zoom = visibleTimeEnd - visibleTimeStart;
      }

      this.props.onTimeChange.bind(this)(visibleTimeStart, visibleTimeStart + zoom);
    }
  }, {
    key: 'selectItem',
    value: function selectItem(item, clickType) {
      if (this.state.selectedItem === item || this.props.itemTouchSendsClick && clickType === 'touch') {
        if (item && this.props.onItemClick) {
          this.props.onItemClick(item);
        }
      } else {
        this.setState({ selectedItem: item });
      }
    }
  }, {
    key: 'rowAndTimeFromEvent',
    value: function rowAndTimeFromEvent(e) {
      var _props2 = this.props;
      var lineHeight = _props2.lineHeight;
      var dragSnap = _props2.dragSnap;
      var _state = this.state;
      var width = _state.width;
      var visibleTimeStart = _state.visibleTimeStart;
      var visibleTimeEnd = _state.visibleTimeEnd;


      var parentPosition = (0, _utils.getParentPosition)(e.currentTarget);
      var x = e.clientX - parentPosition.x;
      var y = e.clientY - parentPosition.y;

      var row = Math.floor((y - lineHeight * 2) / lineHeight);
      var time = Math.round(visibleTimeStart + x / width * (visibleTimeEnd - visibleTimeStart));
      time = Math.floor(time / dragSnap) * dragSnap;

      return [row, time];
    }
  }, {
    key: 'scrollAreaClick',
    value: function scrollAreaClick(e) {
      // if not clicking on an item

      if (!(0, _utils.hasSomeParentTheClass)(e.target, 'rct-item')) {
        if (this.state.selectedItem) {
          this.selectItem(null);
        } else if (this.props.onCanvasClick) {
          var _rowAndTimeFromEvent = this.rowAndTimeFromEvent(e);

          var _rowAndTimeFromEvent2 = _slicedToArray(_rowAndTimeFromEvent, 2);

          var row = _rowAndTimeFromEvent2[0];
          var time = _rowAndTimeFromEvent2[1];

          if (row >= 0 && row < this.props.groups.length) {
            var groupId = (0, _utils._get)(this.props.groups[row], this.props.keys.groupIdKey);
            this.props.onCanvasClick(groupId, time, e);
          }
        }
      }
    }
  }, {
    key: 'dragItem',
    value: function dragItem(item, dragTime, newGroupOrder) {
      var newGroup = this.props.groups[newGroupOrder];
      var keys = this.props.keys;

      this.setState({
        draggingItem: item,
        dragTime: dragTime,
        newGroupOrder: newGroupOrder,
        dragGroupTitle: newGroup ? (0, _utils._get)(newGroup, keys.groupTitleKey) : ''
      });
    }
  }, {
    key: 'dropItem',
    value: function dropItem(item, dragTime, newGroupOrder) {
      this.setState({ draggingItem: null, dragTime: null, dragGroupTitle: null });
      if (this.props.onItemMove) {
        this.props.onItemMove(item, dragTime, newGroupOrder);
      }
    }
  }, {
    key: 'resizingItem',
    value: function resizingItem(item, newResizeEnd) {
      this.setState({
        resizingItem: item,
        resizeEnd: newResizeEnd
      });
    }
  }, {
    key: 'resizedItem',
    value: function resizedItem(item, newResizeEnd) {
      this.setState({ resizingItem: null, resizeEnd: null });
      if (this.props.onItemResize) {
        this.props.onItemResize(item, newResizeEnd);
      }
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
      this.setState({ isDragging: true, dragStartPosition: e.pageX });
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      if (this.state.isDragging && !this.state.draggingItem && !this.state.resizingItem) {
        this.refs.scrollComponent.scrollLeft += this.state.dragStartPosition - e.pageX;
        this.setState({ dragStartPosition: e.pageX });
      }
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(e) {
      this.setState({ isDragging: false, dragStartPosition: null });
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
    value: function verticalLines(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight) {
      return _react2.default.createElement(_VerticalLines2.default, { canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        lineCount: (0, _utils._length)(this.props.groups),
        minUnit: minUnit,
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
        moveResizeValidator: this.props.moveResizeValidator,
        topOffset: this.state.topOffset,
        itemSelect: this.selectItem.bind(this),
        itemDrag: this.dragItem.bind(this),
        itemDrop: this.dropItem.bind(this),
        itemResizing: this.resizingItem.bind(this),
        itemResized: this.resizedItem.bind(this) });
    }
  }, {
    key: 'infoLabel',
    value: function infoLabel() {
      var label = null;

      if (this.state.dragTime) {
        label = (0, _moment2.default)(this.state.dragTime).format('LLL') + ', ' + this.state.dragGroupTitle;
      } else if (this.state.resizeEnd) {
        label = (0, _moment2.default)(this.state.resizeEnd).format('LLL');
      }

      return label ? _react2.default.createElement(_InfoLabel2.default, { label: label }) : '';
    }
  }, {
    key: 'header',
    value: function header(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, headerLabelGroupHeight, headerLabelHeight) {
      return _react2.default.createElement(_Header2.default, { canvasTimeStart: canvasTimeStart,
        canvasTimeEnd: canvasTimeEnd,
        canvasWidth: canvasWidth,
        lineHeight: this.props.lineHeight,
        minUnit: minUnit,
        headerLabelGroupHeight: headerLabelGroupHeight,
        headerLabelHeight: headerLabelHeight,
        width: this.state.width,
        zoom: zoom,
        visibleTimeStart: this.state.visibleTimeStart,
        visibleTimeEnd: this.state.visibleTimeEnd,
        fixedHeader: this.props.fixedHeader,
        zIndex: this.props.zIndexStart + 1,
        showPeriod: this.showPeriod.bind(this) });
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
    key: 'stackItems',
    value: function stackItems(items, groups, canvasTimeStart, visibleTimeStart, visibleTimeEnd, width) {
      var _props3 = this.props;
      var keys = _props3.keys;
      var dragSnap = _props3.dragSnap;
      var lineHeight = _props3.lineHeight;
      var headerLabelGroupHeight = _props3.headerLabelGroupHeight;
      var headerLabelHeight = _props3.headerLabelHeight;
      var stackItems = _props3.stackItems;
      var itemHeightRatio = _props3.itemHeightRatio;
      var _state2 = this.state;
      var draggingItem = _state2.draggingItem;
      var dragTime = _state2.dragTime;
      var resizingItem = _state2.resizingItem;
      var resizeEnd = _state2.resizeEnd;
      var newGroupOrder = _state2.newGroupOrder;

      var zoom = visibleTimeEnd - visibleTimeStart;
      var canvasTimeEnd = canvasTimeStart + zoom * 3;
      var canvasWidth = width * 3;
      var headerHeight = headerLabelGroupHeight + headerLabelHeight;

      var visibleItems = (0, _utils.getVisibleItems)(items, canvasTimeStart, canvasTimeEnd, keys);
      var groupOrders = (0, _utils.getGroupOrders)(groups, keys);

      var dimensionItems = visibleItems.map(function (item) {
        return {
          id: (0, _utils._get)(item, keys.itemIdKey),
          dimensions: (0, _utils.calculateDimensions)(item, groupOrders[(0, _utils._get)(item, keys.itemGroupKey)], keys, canvasTimeStart, canvasTimeEnd, canvasWidth, dragSnap, lineHeight, draggingItem, dragTime, resizingItem, resizeEnd, newGroupOrder, itemHeightRatio)
        };
      });

      var stackingMethod = stackItems ? _utils.stack : _utils.nostack;

      var _stackingMethod = stackingMethod(dimensionItems, groupOrders, lineHeight, headerHeight);

      var height = _stackingMethod.height;
      var groupHeights = _stackingMethod.groupHeights;
      var groupTops = _stackingMethod.groupTops;


      return { dimensionItems: dimensionItems, height: height, groupHeights: groupHeights, groupTops: groupTops };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props;
      var items = _props4.items;
      var groups = _props4.groups;
      var headerLabelGroupHeight = _props4.headerLabelGroupHeight;
      var headerLabelHeight = _props4.headerLabelHeight;
      var _state3 = this.state;
      var draggingItem = _state3.draggingItem;
      var resizingItem = _state3.resizingItem;
      var isDragging = _state3.isDragging;
      var width = _state3.width;
      var visibleTimeStart = _state3.visibleTimeStart;
      var visibleTimeEnd = _state3.visibleTimeEnd;
      var canvasTimeStart = _state3.canvasTimeStart;
      var _state4 = this.state;
      var dimensionItems = _state4.dimensionItems;
      var height = _state4.height;
      var groupHeights = _state4.groupHeights;
      var groupTops = _state4.groupTops;

      var zoom = visibleTimeEnd - visibleTimeStart;
      var canvasTimeEnd = canvasTimeStart + zoom * 3;
      var canvasWidth = width * 3;
      var minUnit = (0, _utils.getMinUnit)(zoom, width);
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
          this.sidebar(height, groupHeights, headerHeight),
          _react2.default.createElement(
            'div',
            { ref: 'scrollComponent',
              className: 'rct-scroll',
              style: scrollComponentStyle,
              onClick: this.scrollAreaClick.bind(this),
              onScroll: this.onScroll.bind(this),
              onWheel: this.onWheel.bind(this),
              onMouseDown: this.handleMouseDown.bind(this),
              onMouseMove: this.handleMouseMove.bind(this),
              onMouseUp: this.handleMouseUp.bind(this)
            },
            _react2.default.createElement(
              'div',
              { ref: 'canvasComponent',
                className: 'rct-canvas',
                style: canvasComponentStyle },
              this.items(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, dimensionItems, groupHeights, groupTops),
              this.verticalLines(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight),
              this.horizontalLines(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, groupHeights, headerHeight),
              this.todayLine(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, height, headerHeight),
              this.infoLabel(),
              this.header(canvasTimeStart, zoom, canvasTimeEnd, canvasWidth, minUnit, headerLabelGroupHeight, headerLabelHeight)
            )
          )
        )
      );
    }
  }]);

  return ReactCalendarTimeline;
}(_react.Component);

exports.default = ReactCalendarTimeline;


ReactCalendarTimeline.propTypes = {
  groups: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.object]).isRequired,
  items: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.object]).isRequired,
  sidebarWidth: _react2.default.PropTypes.number,
  dragSnap: _react2.default.PropTypes.number,
  minResizeWidth: _react2.default.PropTypes.number,
  fixedHeader: _react2.default.PropTypes.oneOf(['fixed', 'absolute', 'none']),
  zIndexStart: _react2.default.PropTypes.number,
  lineHeight: _react2.default.PropTypes.number,
  headerLabelGroupHeight: _react2.default.PropTypes.number,
  headerLabelHeight: _react2.default.PropTypes.number,

  minZoom: _react2.default.PropTypes.number,
  maxZoom: _react2.default.PropTypes.number,

  canChangeGroup: _react2.default.PropTypes.bool,
  canMove: _react2.default.PropTypes.bool,
  canResize: _react2.default.PropTypes.bool,
  useResizeHandle: _react2.default.PropTypes.bool,

  stackItems: _react2.default.PropTypes.bool,

  traditionalZoom: _react2.default.PropTypes.bool,

  itemTouchSendsClick: _react2.default.PropTypes.bool,

  onItemMove: _react2.default.PropTypes.func,
  onItemResize: _react2.default.PropTypes.func,
  onItemClick: _react2.default.PropTypes.func,
  onCanvasClick: _react2.default.PropTypes.func,

  moveResizeValidator: _react2.default.PropTypes.func,

  dayBackground: _react2.default.PropTypes.func,

  style: _react2.default.PropTypes.object,
  keys: _react2.default.PropTypes.object,

  defaultTimeStart: _react2.default.PropTypes.object,
  defaultTimeEnd: _react2.default.PropTypes.object,

  visibleTimeStart: _react2.default.PropTypes.number,
  visibleTimeEnd: _react2.default.PropTypes.number,
  onTimeChange: _react2.default.PropTypes.func,
  onTimeInit: _react2.default.PropTypes.func,
  onBoundsChange: _react2.default.PropTypes.func,

  children: _react2.default.PropTypes.node
};
ReactCalendarTimeline.defaultProps = {
  sidebarWidth: 150,
  dragSnap: 1000 * 60 * 15, // 15min
  minResizeWidth: 20,
  fixedHeader: 'none', // fixed or absolute or none
  zIndexStart: 10,
  lineHeight: 30,
  headerLabelGroupHeight: 30,
  headerLabelHeight: 30,
  itemHeightRatio: 0.65,

  minZoom: 60 * 60 * 1000, // 1 hour
  maxZoom: 5 * 365.24 * 86400 * 1000, // 5 years

  canChangeGroup: true,
  canMove: true,
  canResize: true,
  useResizeHandle: false,

  stackItems: false,

  traditionalZoom: false,

  onItemMove: null,
  onItemResize: null,
  onItemClick: null,
  onCanvasClick: null,

  moveResizeValidator: null,

  dayBackground: null,

  defaultTimeStart: null,
  defaultTimeEnd: null,

  itemTouchSendsClick: false,

  style: {},
  keys: defaultKeys,

  // if you pass in visibleTimeStart and visibleTimeEnd, you must also pass onTimeChange(visibleTimeStart, visibleTimeEnd),
  // which needs to update the props visibleTimeStart and visibleTimeEnd to the ones passed
  visibleTimeStart: null,
  visibleTimeEnd: null,
  onTimeChange: function onTimeChange(visibleTimeStart, visibleTimeEnd) {
    this.updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
  },
  // called after the calendar loads and the visible time has been calculated
  onTimeInit: null,
  // called when the canvas area of the calendar changes
  onBoundsChange: null,
  children: null
};