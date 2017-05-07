(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("moment"), require("interact"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "moment", "interact"], factory);
	else if(typeof exports === 'object')
		exports["ReactCalendarTimeline"] = factory(require("React"), require("moment"), require("interact"));
	else
		root["ReactCalendarTimeline"] = factory(root["React"], root["moment"], root["interact"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_10__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Timeline = __webpack_require__(1);
	
	var _Timeline2 = _interopRequireDefault(_Timeline);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Timeline2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _moment = __webpack_require__(3);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	__webpack_require__(4);
	
	var _Items = __webpack_require__(8);
	
	var _Items2 = _interopRequireDefault(_Items);
	
	var _InfoLabel = __webpack_require__(12);
	
	var _InfoLabel2 = _interopRequireDefault(_InfoLabel);
	
	var _Sidebar = __webpack_require__(15);
	
	var _Sidebar2 = _interopRequireDefault(_Sidebar);
	
	var _Header = __webpack_require__(16);
	
	var _Header2 = _interopRequireDefault(_Header);
	
	var _VerticalLines = __webpack_require__(17);
	
	var _VerticalLines2 = _interopRequireDefault(_VerticalLines);
	
	var _HorizontalLines = __webpack_require__(18);
	
	var _HorizontalLines2 = _interopRequireDefault(_HorizontalLines);
	
	var _TodayLine = __webpack_require__(19);
	
	var _TodayLine2 = _interopRequireDefault(_TodayLine);
	
	var _utils = __webpack_require__(11);
	
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
	
	      var width = containerWidth - this.props.sidebarWidth;
	
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
	          )
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Item = __webpack_require__(9);
	
	var _Item2 = _interopRequireDefault(_Item);
	
	var _utils = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// import ItemGroup from './ItemGroup'
	
	var canResizeLeft = function canResizeLeft(item, canResize) {
	  var value = (0, _utils._get)(item, 'canResize') !== undefined ? (0, _utils._get)(item, 'canResize') : canResize;
	  return value === 'left' || value === 'both';
	};
	
	var canResizeRight = function canResizeRight(item, canResize) {
	  var value = (0, _utils._get)(item, 'canResize') !== undefined ? (0, _utils._get)(item, 'canResize') : canResize;
	  return value === 'right' || value === 'both' || value === true;
	};
	
	var Items = function (_Component) {
	  _inherits(Items, _Component);
	
	  function Items() {
	    _classCallCheck(this, Items);
	
	    return _possibleConstructorReturn(this, (Items.__proto__ || Object.getPrototypeOf(Items)).apply(this, arguments));
	  }
	
	  _createClass(Items, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return !((0, _utils.arraysEqual)(nextProps.groups, this.props.groups) && (0, _utils.arraysEqual)(nextProps.items, this.props.items) && nextProps.keys === this.props.keys && nextProps.canvasTimeStart === this.props.canvasTimeStart && nextProps.canvasTimeEnd === this.props.canvasTimeEnd && nextProps.canvasWidth === this.props.canvasWidth && nextProps.selectedItem === this.props.selectedItem && nextProps.lineHeight === this.props.lineHeight && nextProps.dragSnap === this.props.dragSnap && nextProps.minResizeWidth === this.props.minResizeWidth && nextProps.canChangeGroup === this.props.canChangeGroup && nextProps.canMove === this.props.canMove && nextProps.canResize === this.props.canResize && nextProps.canSelect === this.props.canSelect && nextProps.dimensionItems === this.props.dimensionItems && nextProps.topOffset === this.props.topOffset);
	    }
	  }, {
	    key: 'getGroupOrders',
	    value: function getGroupOrders() {
	      var groupIdKey = this.props.keys.groupIdKey;
	
	
	      var groupOrders = {};
	
	      for (var i = 0; i < this.props.groups.length; i++) {
	        groupOrders[(0, _utils._get)(this.props.groups[i], groupIdKey)] = i;
	      }
	
	      return groupOrders;
	    }
	  }, {
	    key: 'getVisibleItems',
	    value: function getVisibleItems(canvasTimeStart, canvasTimeEnd, groupOrders) {
	      var _props$keys = this.props.keys,
	          itemTimeStartKey = _props$keys.itemTimeStartKey,
	          itemTimeEndKey = _props$keys.itemTimeEndKey;
	
	
	      return this.props.items.filter(function (item) {
	        return (0, _utils._get)(item, itemTimeStartKey) <= canvasTimeEnd && (0, _utils._get)(item, itemTimeEndKey) >= canvasTimeStart;
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props = this.props,
	          canvasTimeStart = _props.canvasTimeStart,
	          canvasTimeEnd = _props.canvasTimeEnd,
	          dimensionItems = _props.dimensionItems;
	      var _props$keys2 = this.props.keys,
	          itemIdKey = _props$keys2.itemIdKey,
	          itemGroupKey = _props$keys2.itemGroupKey;
	
	
	      var groupOrders = this.getGroupOrders();
	      var visibleItems = this.getVisibleItems(canvasTimeStart, canvasTimeEnd, groupOrders);
	      var sortedDimensionItems = (0, _utils.keyBy)(dimensionItems, 'id');
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'rct-items' },
	        visibleItems.filter(function (item) {
	          return sortedDimensionItems[(0, _utils._get)(item, itemIdKey)];
	        }).map(function (item) {
	          return _react2.default.createElement(_Item2.default, { key: (0, _utils._get)(item, itemIdKey),
	            item: item,
	            keys: _this2.props.keys,
	            order: groupOrders[(0, _utils._get)(item, itemGroupKey)],
	            dimensions: sortedDimensionItems[(0, _utils._get)(item, itemIdKey)].dimensions,
	            selected: _this2.props.selectedItem === (0, _utils._get)(item, itemIdKey),
	            canChangeGroup: (0, _utils._get)(item, 'canChangeGroup') !== undefined ? (0, _utils._get)(item, 'canChangeGroup') : _this2.props.canChangeGroup,
	            canMove: (0, _utils._get)(item, 'canMove') !== undefined ? (0, _utils._get)(item, 'canMove') : _this2.props.canMove,
	            canResizeLeft: canResizeLeft(item, _this2.props.canResize),
	            canResizeRight: canResizeRight(item, _this2.props.canResize),
	            canSelect: (0, _utils._get)(item, 'canSelect') !== undefined ? (0, _utils._get)(item, 'canSelect') : _this2.props.canSelect,
	            useResizeHandle: _this2.props.useResizeHandle,
	            topOffset: _this2.props.topOffset,
	            groupHeights: _this2.props.groupHeights,
	            groupTops: _this2.props.groupTops,
	            canvasTimeStart: _this2.props.canvasTimeStart,
	            canvasTimeEnd: _this2.props.canvasTimeEnd,
	            canvasWidth: _this2.props.canvasWidth,
	            lineHeight: _this2.props.lineHeight,
	            dragSnap: _this2.props.dragSnap,
	            minResizeWidth: _this2.props.minResizeWidth,
	            onResizing: _this2.props.itemResizing,
	            onResized: _this2.props.itemResized,
	            moveResizeValidator: _this2.props.moveResizeValidator,
	            onDrag: _this2.props.itemDrag,
	            onDrop: _this2.props.itemDrop,
	            onItemDoubleClick: _this2.props.onItemDoubleClick,
	            onContextMenu: _this2.props.onItemContextMenu,
	            onSelect: _this2.props.itemSelect });
	        })
	      );
	    }
	  }]);
	
	  return Items;
	}(_react.Component);
	
	Items.propTypes = {
	  groups: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]).isRequired,
	  items: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]).isRequired,
	
	  canvasTimeStart: _react.PropTypes.number.isRequired,
	  canvasTimeEnd: _react.PropTypes.number.isRequired,
	  canvasWidth: _react.PropTypes.number.isRequired,
	  lineHeight: _react.PropTypes.number.isRequired,
	
	  dragSnap: _react.PropTypes.number,
	  minResizeWidth: _react.PropTypes.number,
	  selectedItem: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	
	  canChangeGroup: _react.PropTypes.bool.isRequired,
	  canMove: _react.PropTypes.bool.isRequired,
	  canResize: _react.PropTypes.oneOf([true, false, 'left', 'right', 'both']),
	  canSelect: _react.PropTypes.bool,
	
	  keys: _react.PropTypes.object.isRequired,
	
	  moveResizeValidator: _react.PropTypes.func,
	  itemSelect: _react.PropTypes.func,
	  itemDrag: _react.PropTypes.func,
	  itemDrop: _react.PropTypes.func,
	  itemResizing: _react.PropTypes.func,
	  itemResized: _react.PropTypes.func,
	
	  onItemDoubleClick: _react.PropTypes.func,
	  onItemContextMenu: _react.PropTypes.func
	};
	Items.defaultProps = {};
	exports.default = Items;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _interact = __webpack_require__(10);
	
	var _interact2 = _interopRequireDefault(_interact);
	
	var _moment = __webpack_require__(3);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _utils = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Item = function (_Component) {
	  _inherits(Item, _Component);
	
	  // removed prop type check for SPEED!
	  // they are coming from a trusted component anyway
	  // (this complicates performance debugging otherwise)
	  function Item(props) {
	    _classCallCheck(this, Item);
	
	    var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));
	
	    _this.onMouseDown = function (e) {
	      if (!_this.state.interactMounted) {
	        e.preventDefault();
	        _this.startedClicking = true;
	      }
	    };
	
	    _this.onMouseUp = function (e) {
	      if (!_this.state.interactMounted && _this.startedClicking) {
	        _this.startedClicking = false;
	        _this.actualClick(e, 'click');
	      }
	    };
	
	    _this.onTouchStart = function (e) {
	      if (!_this.state.interactMounted) {
	        e.preventDefault();
	        _this.startedTouching = true;
	      }
	    };
	
	    _this.onTouchEnd = function (e) {
	      if (!_this.state.interactMounted && _this.startedTouching) {
	        _this.startedTouching = false;
	        _this.actualClick(e, 'touch');
	      }
	    };
	
	    _this.handleDoubleClick = function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      if (_this.props.onItemDoubleClick) {
	        _this.props.onItemDoubleClick(_this.itemId, e);
	      }
	    };
	
	    _this.handleContextMenu = function (e) {
	      if (_this.props.onContextMenu) {
	        e.preventDefault();
	        e.stopPropagation();
	        _this.props.onContextMenu(_this.itemId, e);
	      }
	    };
	
	    _this.cacheDataFromProps(props);
	
	    _this.state = {
	      interactMounted: false,
	
	      dragging: null,
	      dragStart: null,
	      preDragPosition: null,
	      dragTime: null,
	      dragGroupDelta: null,
	
	      resizing: null,
	      resizeEdge: null,
	      resizeStart: null,
	      resizeTime: null
	    };
	    return _this;
	  }
	
	  _createClass(Item, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      var shouldUpdate = nextState.dragging !== this.state.dragging || nextState.dragTime !== this.state.dragTime || nextState.dragGroupDelta !== this.state.dragGroupDelta || nextState.resizing !== this.state.resizing || nextState.resizeTime !== this.state.resizeTime || nextProps.keys !== this.props.keys || !(0, _utils.deepObjectCompare)(nextProps.itemProps, this.props.itemProps) || nextProps.selected !== this.props.selected || nextProps.item !== this.props.item || nextProps.canvasTimeStart !== this.props.canvasTimeStart || nextProps.canvasTimeEnd !== this.props.canvasTimeEnd || nextProps.canvasWidth !== this.props.canvasWidth || nextProps.lineHeight !== this.props.lineHeight || nextProps.order !== this.props.order || nextProps.dragSnap !== this.props.dragSnap || nextProps.minResizeWidth !== this.props.minResizeWidth || nextProps.selected !== this.props.selected || nextProps.canChangeGroup !== this.props.canChangeGroup || nextProps.canSelect !== this.props.canSelect || nextProps.topOffset !== this.props.topOffset || nextProps.canMove !== this.props.canMove || nextProps.canResizeLeft !== this.props.canResizeLeft || nextProps.canResizeRight !== this.props.canResizeRight || nextProps.dimensions !== this.props.dimensions;
	      return shouldUpdate;
	    }
	  }, {
	    key: 'cacheDataFromProps',
	    value: function cacheDataFromProps(props) {
	      this.itemId = (0, _utils._get)(props.item, props.keys.itemIdKey);
	      this.itemTitle = (0, _utils._get)(props.item, props.keys.itemTitleKey);
	      this.itemDivTitle = props.keys.itemDivTitleKey ? (0, _utils._get)(props.item, props.keys.itemDivTitleKey) : this.itemTitle;
	      this.itemTimeStart = (0, _utils._get)(props.item, props.keys.itemTimeStartKey);
	      this.itemTimeEnd = (0, _utils._get)(props.item, props.keys.itemTimeEndKey);
	    }
	  }, {
	    key: 'coordinateToTimeRatio',
	    value: function coordinateToTimeRatio() {
	      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
	
	      return (props.canvasTimeEnd - props.canvasTimeStart) / props.canvasWidth;
	    }
	  }, {
	    key: 'dragTimeSnap',
	    value: function dragTimeSnap(dragTime, considerOffset) {
	      var dragSnap = this.props.dragSnap;
	
	      if (dragSnap) {
	        var offset = considerOffset ? (0, _moment2.default)().utcOffset() * 60 * 1000 : 0;
	        return Math.round(dragTime / dragSnap) * dragSnap - offset % dragSnap;
	      } else {
	        return dragTime;
	      }
	    }
	  }, {
	    key: 'resizeTimeSnap',
	    value: function resizeTimeSnap(dragTime) {
	      var dragSnap = this.props.dragSnap;
	
	      if (dragSnap) {
	        var endTime = this.itemTimeEnd % dragSnap;
	        return Math.round((dragTime - endTime) / dragSnap) * dragSnap + endTime;
	      } else {
	        return dragTime;
	      }
	    }
	  }, {
	    key: 'dragTime',
	    value: function dragTime(e) {
	      var startTime = this.itemTimeStart;
	
	      if (this.state.dragging) {
	        var deltaX = e.pageX - this.state.dragStart.x;
	        var timeDelta = deltaX * this.coordinateToTimeRatio();
	
	        return this.dragTimeSnap(startTime + timeDelta, true);
	      } else {
	        return startTime;
	      }
	    }
	  }, {
	    key: 'dragGroupDelta',
	    value: function dragGroupDelta(e) {
	      var _props = this.props,
	          groupTops = _props.groupTops,
	          order = _props.order,
	          topOffset = _props.topOffset;
	
	      if (this.state.dragging) {
	        if (!this.props.canChangeGroup) {
	          return 0;
	        }
	        var groupDelta = 0;
	
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	          for (var _iterator = Object.keys(groupTops)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var key = _step.value;
	
	            var item = groupTops[key];
	            if (e.pageY - topOffset > item) {
	              groupDelta = parseInt(key, 10) - order;
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
	
	        if (this.props.order + groupDelta < 0) {
	          return 0 - this.props.order;
	        } else {
	          return groupDelta;
	        }
	      } else {
	        return 0;
	      }
	    }
	  }, {
	    key: 'resizeTimeDelta',
	    value: function resizeTimeDelta(e, resizeEdge) {
	      var length = this.itemTimeEnd - this.itemTimeStart;
	      var timeDelta = this.dragTimeSnap((e.pageX - this.state.resizeStart) * this.coordinateToTimeRatio());
	
	      if (length + (resizeEdge === 'left' ? -timeDelta : timeDelta) < (this.props.dragSnap || 1000)) {
	        if (resizeEdge === 'left') {
	          return length - (this.props.dragSnap || 1000);
	        } else {
	          return (this.props.dragSnap || 1000) - length;
	        }
	      } else {
	        return timeDelta;
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {}
	  }, {
	    key: 'mountInteract',
	    value: function mountInteract() {
	      var _this2 = this;
	
	      var leftResize = this.props.useResizeHandle ? this.refs.dragLeft : true;
	      var rightResize = this.props.useResizeHandle ? this.refs.dragRight : true;
	
	      (0, _interact2.default)(this.refs.item).resizable({
	        edges: {
	          left: this.canResizeLeft() && leftResize,
	          right: this.canResizeRight() && rightResize,
	          top: false,
	          bottom: false
	        },
	        enabled: this.props.selected && (this.canResizeLeft() || this.canResizeRight())
	      }).draggable({
	        enabled: this.props.selected
	      }).on('dragstart', function (e) {
	        if (_this2.props.selected) {
	          _this2.setState({
	            dragging: true,
	            dragStart: { x: e.pageX, y: e.pageY },
	            preDragPosition: { x: e.target.offsetLeft, y: e.target.offsetTop },
	            dragTime: _this2.itemTimeStart,
	            dragGroupDelta: 0
	          });
	        } else {
	          return false;
	        }
	      }).on('dragmove', function (e) {
	        if (_this2.state.dragging) {
	          var dragTime = _this2.dragTime(e);
	          var dragGroupDelta = _this2.dragGroupDelta(e);
	
	          if (_this2.props.moveResizeValidator) {
	            dragTime = _this2.props.moveResizeValidator('move', _this2.props.item, dragTime);
	          }
	
	          if (_this2.props.onDrag) {
	            _this2.props.onDrag(_this2.itemId, dragTime, _this2.props.order + dragGroupDelta);
	          }
	
	          _this2.setState({
	            dragTime: dragTime,
	            dragGroupDelta: dragGroupDelta
	          });
	        }
	      }).on('dragend', function (e) {
	        if (_this2.state.dragging) {
	          if (_this2.props.onDrop) {
	            var dragTime = _this2.dragTime(e);
	
	            if (_this2.props.moveResizeValidator) {
	              dragTime = _this2.props.moveResizeValidator('move', _this2.props.item, dragTime);
	            }
	
	            _this2.props.onDrop(_this2.itemId, dragTime, _this2.props.order + _this2.dragGroupDelta(e));
	          }
	
	          _this2.setState({
	            dragging: false,
	            dragStart: null,
	            preDragPosition: null,
	            dragTime: null,
	            dragGroupDelta: null
	          });
	        }
	      }).on('resizestart', function (e) {
	        if (_this2.props.selected) {
	          _this2.setState({
	            resizing: true,
	            resizeEdge: null, // we don't know yet
	            resizeStart: e.pageX,
	            resizeTime: 0
	          });
	        } else {
	          return false;
	        }
	      }).on('resizemove', function (e) {
	        if (_this2.state.resizing) {
	          var resizeEdge = _this2.state.resizeEdge;
	
	          if (!resizeEdge) {
	            resizeEdge = e.deltaRect.left !== 0 ? 'left' : 'right';
	            _this2.setState({ resizeEdge: resizeEdge });
	          }
	          var time = resizeEdge === 'left' ? _this2.itemTimeStart : _this2.itemTimeEnd;
	
	          var resizeTime = _this2.resizeTimeSnap(time + _this2.resizeTimeDelta(e, resizeEdge));
	
	          if (_this2.props.moveResizeValidator) {
	            resizeTime = _this2.props.moveResizeValidator('resize', _this2.props.item, resizeTime, resizeEdge);
	          }
	
	          if (_this2.props.onResizing) {
	            _this2.props.onResizing(_this2.itemId, resizeTime, resizeEdge);
	          }
	
	          _this2.setState({
	            resizeTime: resizeTime
	          });
	        }
	      }).on('resizeend', function (e) {
	        if (_this2.state.resizing) {
	          var resizeEdge = _this2.state.resizeEdge;
	
	          var time = resizeEdge === 'left' ? _this2.itemTimeStart : _this2.itemTimeEnd;
	          var resizeTime = _this2.resizeTimeSnap(time + _this2.resizeTimeDelta(e, resizeEdge));
	
	          if (_this2.props.moveResizeValidator) {
	            resizeTime = _this2.props.moveResizeValidator('resize', _this2.props.item, resizeTime, resizeEdge);
	          }
	
	          if (_this2.props.onResized && _this2.resizeTimeDelta(e, resizeEdge) !== 0) {
	            _this2.props.onResized(_this2.itemId, resizeTime, resizeEdge);
	          }
	          _this2.setState({
	            resizing: null,
	            resizeStart: null,
	            resizeEdge: null,
	            resizeTime: null
	          });
	        }
	      }).on('tap', function (e) {
	        _this2.actualClick(e, e.pointerType === 'mouse' ? 'click' : 'touch');
	      });
	
	      this.setState({
	        interactMounted: true
	      });
	    }
	  }, {
	    key: 'canResizeLeft',
	    value: function canResizeLeft() {
	      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
	
	      if (!props.canResizeLeft || props.dimensions.clippedLeft) {
	        return false;
	      }
	      var width = parseInt(props.dimensions.width, 10);
	      return width >= props.minResizeWidth;
	    }
	  }, {
	    key: 'canResizeRight',
	    value: function canResizeRight() {
	      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
	
	      if (!props.canResizeRight || props.dimensions.clippedRight) {
	        return false;
	      }
	      var width = parseInt(props.dimensions.width, 10);
	      return width >= props.minResizeWidth;
	    }
	  }, {
	    key: 'canMove',
	    value: function canMove() {
	      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
	
	      return !!props.canMove;
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.cacheDataFromProps(nextProps);
	
	      var interactMounted = this.state.interactMounted;
	
	      var couldDrag = this.props.selected && this.canMove(this.props);
	      var couldResizeLeft = this.props.selected && this.canResizeLeft(this.props);
	      var couldResizeRight = this.props.selected && this.canResizeRight(this.props);
	      var willBeAbleToDrag = nextProps.selected && this.canMove(nextProps);
	      var willBeAbleToResizeLeft = nextProps.selected && this.canResizeLeft(nextProps);
	      var willBeAbleToResizeRight = nextProps.selected && this.canResizeRight(nextProps);
	
	      if (nextProps.selected && !interactMounted) {
	        this.mountInteract();
	        interactMounted = true;
	      }
	
	      if (interactMounted && (couldResizeLeft !== willBeAbleToResizeLeft || couldResizeRight !== willBeAbleToResizeRight)) {
	        var leftResize = this.props.useResizeHandle ? this.refs.dragLeft : true;
	        var rightResize = this.props.useResizeHandle ? this.refs.dragRight : true;
	
	        (0, _interact2.default)(this.refs.item).resizable({
	          enabled: willBeAbleToResizeLeft || willBeAbleToResizeRight,
	          edges: {
	            top: false,
	            bottom: false,
	            left: willBeAbleToResizeLeft && leftResize,
	            right: willBeAbleToResizeRight && rightResize
	          }
	        });
	      }
	      if (interactMounted && couldDrag !== willBeAbleToDrag) {
	        (0, _interact2.default)(this.refs.item).draggable({ enabled: willBeAbleToDrag });
	      }
	    }
	  }, {
	    key: 'actualClick',
	    value: function actualClick(e, clickType) {
	      if (this.props.canSelect && this.props.onSelect) {
	        this.props.onSelect(this.itemId, clickType, e);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var dimensions = this.props.dimensions;
	      if (typeof this.props.order === 'undefined' || this.props.order === null) {
	        return null;
	      }
	
	      var classNames = 'rct-item' + (this.props.selected ? ' selected' : '') + (this.canMove(this.props) ? ' can-move' : '') + (this.canResizeLeft(this.props) || this.canResizeRight(this.props) ? ' can-resize' : '') + (this.canResizeLeft(this.props) ? ' can-resize-left' : '') + (this.canResizeRight(this.props) ? ' can-resize-right' : '') + (this.props.item.className ? ' ' + this.props.item.className : '') + (dimensions.clippedLeft ? ' clipped-left' : '') + (dimensions.clippedRight ? ' clipped-right' : '');
	
	      var style = {
	        left: dimensions.left + 'px',
	        top: dimensions.top + 'px',
	        width: dimensions.width + 'px',
	        height: dimensions.height + 'px',
	        lineHeight: dimensions.height + 'px'
	      };
	
	      return _react2.default.createElement(
	        'div',
	        _extends({}, this.props.item.itemProps, {
	          key: this.itemId,
	          ref: 'item',
	          className: classNames,
	          title: this.itemDivTitle,
	          onMouseDown: this.onMouseDown,
	          onMouseUp: this.onMouseUp,
	          onTouchStart: this.onTouchStart,
	          onTouchEnd: this.onTouchEnd,
	          onDoubleClick: this.handleDoubleClick,
	          onContextMenu: this.handleContextMenu,
	          style: style }),
	        this.props.useResizeHandle ? _react2.default.createElement('div', { ref: 'dragLeft', className: 'rct-drag-left' }) : '',
	        _react2.default.createElement(
	          'div',
	          { className: 'rct-item-overflow' },
	          _react2.default.createElement(
	            'div',
	            { className: 'rct-item-content' },
	            this.itemTitle
	          )
	        ),
	        this.props.useResizeHandle ? _react2.default.createElement('div', { ref: 'dragRight', className: 'rct-drag-right' }) : ''
	      );
	    }
	  }]);
	
	  return Item;
	}(_react.Component);
	
	Item.propTypes = {
	  // canvasTimeStart: React.PropTypes.number.isRequired,
	  // canvasTimeEnd: React.PropTypes.number.isRequired,
	  // canvasWidth: React.PropTypes.number.isRequired,
	  // lineHeight: React.PropTypes.number.isRequired,
	  // order: React.PropTypes.number.isRequired,
	  //
	  // dragSnap: React.PropTypes.number,
	  // minResizeWidth: React.PropTypes.number,
	  // selected: React.PropTypes.bool,
	  //
	  // canChangeGroup: React.PropTypes.bool.isRequired,
	  // canMove: React.PropTypes.bool.isRequired,
	  // canResizeLeft: React.PropTypes.bool.isRequired,
	  // canResizeRight: React.PropTypes.bool.isRequired,
	  //
	  // keys: React.PropTypes.object.isRequired,
	  // item: React.PropTypes.object.isRequired,
	  //
	  // onSelect: React.PropTypes.func,
	  // onDrag: React.PropTypes.func,
	  // onDrop: React.PropTypes.func,
	  // onResizing: React.PropTypes.func,
	  // onResized: React.PropTypes.func,
	  // onContextMenu: React.PropTypes.func
	};
	Item.defaultProps = {
	  selected: false
	};
	exports.default = Item;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports._get = _get;
	exports._length = _length;
	exports.arraysEqual = arraysEqual;
	exports.iterateTimes = iterateTimes;
	exports.getMinUnit = getMinUnit;
	exports.getNextUnit = getNextUnit;
	exports.getParentPosition = getParentPosition;
	exports.coordinateToTimeRatio = coordinateToTimeRatio;
	exports.calculateDimensions = calculateDimensions;
	exports.getGroupOrders = getGroupOrders;
	exports.getVisibleItems = getVisibleItems;
	exports.collision = collision;
	exports.stack = stack;
	exports.nostack = nostack;
	exports.keyBy = keyBy;
	exports.getGroupedItems = getGroupedItems;
	exports.hasSomeParentTheClass = hasSomeParentTheClass;
	exports.createGradientPattern = createGradientPattern;
	exports.deepObjectCompare = deepObjectCompare;
	
	var _moment = __webpack_require__(3);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var EPSILON = 0.001;
	
	// so we could use both immutable.js objects and regular objects
	function _get(object, key) {
	  return typeof object.get === 'function' ? object.get(key) : object[key];
	}
	
	function _length(object) {
	  return typeof object.count === 'function' ? object.count() : object.length;
	}
	
	function arraysEqual(array1, array2) {
	  return _length(array1) === _length(array2) && array1.every(function (element, index) {
	    return element === _get(array2, index);
	  });
	}
	
	function iterateTimes(start, end, unit, timeSteps, callback) {
	  var time = (0, _moment2.default)(start).startOf(unit);
	
	  if (timeSteps[unit] && timeSteps[unit] > 1) {
	    var value = time.get(unit);
	    time.set(unit, value - value % timeSteps[unit]);
	  }
	
	  while (time.valueOf() < end) {
	    var nextTime = (0, _moment2.default)(time).add(timeSteps[unit] || 1, unit + 's');
	    callback(time, nextTime);
	    time = nextTime;
	  }
	}
	
	function getMinUnit(zoom, width, timeSteps) {
	  var timeDividers = {
	    second: 1000,
	    minute: 60,
	    hour: 60,
	    day: 24,
	    month: 30,
	    year: 12
	  };
	
	  var minUnit = 'year';
	  var breakCount = zoom;
	  var minCellWidth = 17;
	
	  Object.keys(timeDividers).some(function (unit) {
	    breakCount = breakCount / timeDividers[unit];
	    var cellCount = breakCount / timeSteps[unit];
	    var countNeeded = width / (timeSteps[unit] && timeSteps[unit] > 1 ? 3 * minCellWidth : minCellWidth);
	
	    if (cellCount < countNeeded) {
	      minUnit = unit;
	      return true;
	    }
	  });
	
	  return minUnit;
	}
	
	function getNextUnit(unit) {
	  var nextUnits = {
	    second: 'minute',
	    minute: 'hour',
	    hour: 'day',
	    day: 'month',
	    month: 'year'
	  };
	
	  return nextUnits[unit] || '';
	}
	
	function getParentPosition(element) {
	  var xPosition = 0;
	  var yPosition = 0;
	  var first = true;
	
	  while (element) {
	    xPosition += element.offsetLeft - (first ? 0 : element.scrollLeft) + element.clientLeft;
	    yPosition += element.offsetTop - (first ? 0 : element.scrollTop) + element.clientTop;
	    element = element.offsetParent;
	    first = false;
	  }
	  return { x: xPosition, y: yPosition };
	}
	
	function coordinateToTimeRatio(canvasTimeStart, canvasTimeEnd, canvasWidth) {
	  return (canvasTimeEnd - canvasTimeStart) / canvasWidth;
	}
	
	function calculateDimensions(_ref) {
	  var item = _ref.item,
	      order = _ref.order,
	      keys = _ref.keys,
	      canvasTimeStart = _ref.canvasTimeStart,
	      canvasTimeEnd = _ref.canvasTimeEnd,
	      canvasWidth = _ref.canvasWidth,
	      dragSnap = _ref.dragSnap,
	      lineHeight = _ref.lineHeight,
	      draggingItem = _ref.draggingItem,
	      dragTime = _ref.dragTime,
	      resizingItem = _ref.resizingItem,
	      resizingEdge = _ref.resizingEdge,
	      resizeTime = _ref.resizeTime,
	      newGroupOrder = _ref.newGroupOrder,
	      itemHeightRatio = _ref.itemHeightRatio,
	      fullUpdate = _ref.fullUpdate,
	      visibleTimeStart = _ref.visibleTimeStart,
	      visibleTimeEnd = _ref.visibleTimeEnd;
	
	  var itemId = _get(item, keys.itemIdKey);
	  var itemTimeStart = _get(item, keys.itemTimeStartKey);
	  var itemTimeEnd = _get(item, keys.itemTimeEndKey);
	
	  var isDragging = itemId === draggingItem;
	  var isResizing = itemId === resizingItem;
	
	  var itemStart = isResizing && resizingEdge === 'left' ? resizeTime : itemTimeStart;
	  var itemEnd = isResizing && resizingEdge === 'right' ? resizeTime : itemTimeEnd;
	
	  var x = isDragging ? dragTime : itemStart;
	
	  var w = Math.max(itemEnd - itemStart, dragSnap);
	
	  var collisionX = itemStart;
	  var collisionW = w;
	
	  if (isDragging) {
	    if (itemTimeStart >= dragTime) {
	      collisionX = dragTime;
	      collisionW = Math.max(itemTimeEnd - dragTime, dragSnap);
	    } else {
	      collisionW = Math.max(dragTime - itemTimeStart + w, dragSnap);
	    }
	  }
	
	  var clippedLeft = false;
	  var clippedRight = false;
	
	  if (fullUpdate) {
	    if (!isDragging && (visibleTimeStart > x + w || visibleTimeEnd < x)) {
	      return null;
	    }
	
	    if (visibleTimeStart > x) {
	      w -= visibleTimeStart - x;
	      x = visibleTimeStart;
	      if (isDragging && w < 0) {
	        x += w;
	        w = 0;
	      }
	      clippedLeft = true;
	    }
	    if (x + w > visibleTimeEnd) {
	      w -= x + w - visibleTimeEnd;
	      clippedRight = true;
	    }
	  }
	
	  var ratio = 1 / coordinateToTimeRatio(canvasTimeStart, canvasTimeEnd, canvasWidth);
	  var h = lineHeight * itemHeightRatio;
	
	  var dimensions = {
	    left: (x - canvasTimeStart) * ratio,
	    top: null,
	    width: Math.max(w * ratio, 3),
	    height: h,
	    order: isDragging ? newGroupOrder : order,
	    stack: true,
	    collisionLeft: collisionX,
	    originalLeft: itemTimeStart,
	    collisionWidth: collisionW,
	    lineHeight: lineHeight,
	    isDragging: isDragging,
	    clippedLeft: clippedLeft,
	    clippedRight: clippedRight
	  };
	
	  return dimensions;
	}
	
	function getGroupOrders(groups, keys) {
	  var groupIdKey = keys.groupIdKey;
	
	
	  var groupOrders = {};
	
	  for (var i = 0; i < groups.length; i++) {
	    groupOrders[_get(groups[i], groupIdKey)] = i;
	  }
	
	  return groupOrders;
	}
	
	function getVisibleItems(items, canvasTimeStart, canvasTimeEnd, keys) {
	  var itemTimeStartKey = keys.itemTimeStartKey,
	      itemTimeEndKey = keys.itemTimeEndKey;
	
	
	  return items.filter(function (item) {
	    return _get(item, itemTimeStartKey) <= canvasTimeEnd && _get(item, itemTimeEndKey) >= canvasTimeStart;
	  });
	}
	
	function collision(a, b, lineHeight) {
	  // var verticalMargin = (lineHeight - a.height)/2;
	  var verticalMargin = 0;
	  return a.collisionLeft + EPSILON < b.collisionLeft + b.collisionWidth && a.collisionLeft + a.collisionWidth - EPSILON > b.collisionLeft && a.top - verticalMargin + EPSILON < b.top + b.height && a.top + a.height + verticalMargin - EPSILON > b.top;
	}
	
	function stack(items, groupOrders, lineHeight, headerHeight, force) {
	  var i, iMax;
	  var totalHeight = headerHeight;
	
	  var groupHeights = {};
	  var groupTops = {};
	
	  var groupedItems = getGroupedItems(items, groupOrders);
	
	  if (force) {
	    // reset top position of all items
	    for (i = 0, iMax = items.length; i < iMax; i++) {
	      items[i].dimensions.top = null;
	    }
	  }
	
	  groupedItems.forEach(function (group, index, array) {
	    // calculate new, non-overlapping positions
	    groupTops[index] = totalHeight;
	
	    var groupHeight = 0;
	    var verticalMargin = 0;
	    for (i = 0, iMax = group.length; i < iMax; i++) {
	      var item = group[i];
	      verticalMargin = item.dimensions.lineHeight - item.dimensions.height;
	
	      if (item.dimensions.stack && item.dimensions.top === null) {
	        item.dimensions.top = totalHeight + verticalMargin;
	        groupHeight = Math.max(groupHeight, item.dimensions.lineHeight);
	        do {
	          var collidingItem = null;
	          for (var j = 0, jj = group.length; j < jj; j++) {
	            var other = group[j];
	            if (other.top !== null && other !== item && other.dimensions.stack && collision(item.dimensions, other.dimensions, item.dimensions.lineHeight)) {
	              collidingItem = other;
	              break;
	            } else {
	              // console.log('dont test', other.top !== null, other !== item, other.stack);
	            }
	          }
	
	          if (collidingItem != null) {
	            // There is a collision. Reposition the items above the colliding element
	            item.dimensions.top = collidingItem.dimensions.top + collidingItem.dimensions.lineHeight;
	            groupHeight = Math.max(groupHeight, item.dimensions.top + item.dimensions.height - totalHeight);
	          }
	        } while (collidingItem);
	      }
	    }
	    groupHeights[index] = Math.max(groupHeight + verticalMargin, lineHeight);
	    totalHeight += Math.max(groupHeight + verticalMargin, lineHeight);
	  });
	  return {
	    height: totalHeight,
	    groupHeights: groupHeights,
	    groupTops: groupTops
	  };
	}
	
	function nostack(items, groupOrders, lineHeight, headerHeight, force) {
	  var i, iMax;
	
	  var totalHeight = headerHeight;
	
	  var groupHeights = {};
	  var groupTops = {};
	
	  var groupedItems = getGroupedItems(items, groupOrders);
	
	  if (force) {
	    // reset top position of all items
	    for (i = 0, iMax = items.length; i < iMax; i++) {
	      items[i].dimensions.top = null;
	    }
	  }
	
	  groupedItems.forEach(function (group, index, array) {
	    // calculate new, non-overlapping positions
	    groupTops[index] = totalHeight;
	
	    var groupHeight = 0;
	    for (i = 0, iMax = group.length; i < iMax; i++) {
	      var item = group[i];
	      var verticalMargin = (item.dimensions.lineHeight - item.dimensions.height) / 2;
	
	      if (item.dimensions.top === null) {
	        item.dimensions.top = totalHeight + verticalMargin;
	        groupHeight = Math.max(groupHeight, item.dimensions.lineHeight);
	      }
	    }
	    groupHeights[index] = Math.max(groupHeight, lineHeight);
	    totalHeight += Math.max(groupHeight, lineHeight);
	  });
	  return {
	    height: totalHeight,
	    groupHeights: groupHeights,
	    groupTops: groupTops
	  };
	}
	
	function keyBy(value, key) {
	  var obj = {};
	
	  value.forEach(function (element, index, array) {
	    obj[element[key]] = element;
	  });
	
	  return obj;
	}
	
	function getGroupedItems(items, groupOrders) {
	  var arr = [];
	
	  // Initialize with empty arrays for each group
	  for (var i = 0; i < Object.keys(groupOrders).length; i++) {
	    arr[i] = [];
	  }
	  // Populate groups
	  for (var _i = 0; _i < items.length; _i++) {
	    arr[items[_i].dimensions.order].push(items[_i]);
	  }
	
	  return arr;
	}
	
	function hasSomeParentTheClass(element, classname) {
	  if (element.className && element.className.split(' ').indexOf(classname) >= 0) return true;
	  return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
	}
	
	function createGradientPattern(lineHeight, color1, color2, borderColor) {
	  if (borderColor) {
	    if (!color2 || color1 === color2) {
	      return 'repeating-linear-gradient(to bottom, ' + (color1 + ',') + (color1 + ' ' + (lineHeight - 1) + 'px,') + (borderColor + ' ' + (lineHeight - 1) + 'px,') + (borderColor + ' ' + lineHeight + 'px') + ')';
	    } else {
	      return 'repeating-linear-gradient(to bottom, ' + (color1 + ',') + (color1 + ' ' + (lineHeight - 1) + 'px,') + (borderColor + ' ' + (lineHeight - 1) + 'px,') + (borderColor + ' ' + lineHeight + 'px,') + (color2 + ' ' + lineHeight + 'px,') + (color2 + ' ' + (lineHeight * 2 - 1) + 'px,') + (borderColor + ' ' + (lineHeight * 2 - 1) + 'px,') + (borderColor + ' ' + lineHeight * 2 + 'px') + ')';
	    }
	  } else {
	    if (!color2 || color1 === color2) {
	      return color1;
	    } else {
	      return 'repeating-linear-gradient(to bottom,' + color1 + ',' + color1 + ' ' + lineHeight + 'px,' + color2 + ' ' + lineHeight + 'px,' + color2 + ' ' + lineHeight * 2 + 'px)';
	    }
	  }
	}
	
	function deepObjectCompare(obj1, obj2) {
	  for (var p in obj1) {
	    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;
	
	    switch (_typeof(obj1[p])) {
	      case 'object':
	        if (!Object.compare(obj1[p], obj2[p])) return false;
	        break;
	      case 'function':
	        if (typeof obj2[p] === 'undefined' || p !== 'compare' && obj1[p].toString() !== obj2[p].toString()) return false;
	        break;
	      default:
	        if (obj1[p] !== obj2[p]) return false;
	    }
	  }
	
	  for (var r in obj2) {
	    if (typeof obj1[r] === 'undefined') return false;
	  }
	  return true;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _function = __webpack_require__(13);
	
	var _function2 = _interopRequireDefault(_function);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var InfoLabel = function (_Component) {
	  _inherits(InfoLabel, _Component);
	
	  function InfoLabel() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, InfoLabel);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InfoLabel.__proto__ || Object.getPrototypeOf(InfoLabel)).call.apply(_ref, [this].concat(args))), _this), _this.shouldComponentUpdate = _function2.default, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(InfoLabel, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'rct-infolabel' },
	        this.props.label
	      );
	    }
	  }]);
	
	  return InfoLabel;
	}(_react.Component);
	
	exports.default = InfoLabel;
	
	
	InfoLabel.propTypes = {
	  label: _react2.default.PropTypes.string.isRequired
	};
	InfoLabel.defaultProps = {
	  label: ''
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = shouldPureComponentUpdate;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _shallowEqual = __webpack_require__(14);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	function shouldPureComponentUpdate(nextProps, nextState) {
	  return !(0, _shallowEqual2['default'])(this.props, nextProps) || !(0, _shallowEqual2['default'])(this.state, nextState);
	}
	
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = shallowEqual;
	
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	
	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }
	
	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);
	
	  if (keysA.length !== keysB.length) {
	    return false;
	  }
	
	  // Test for A's keys different from B.
	  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
	  for (var i = 0; i < keysA.length; i++) {
	    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }
	
	  return true;
	}
	
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utils = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Sidebar = function (_Component) {
	  _inherits(Sidebar, _Component);
	
	  function Sidebar(props) {
	    _classCallCheck(this, Sidebar);
	
	    var _this = _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));
	
	    _this.state = {
	      scrollTop: 0,
	      componentTop: 0
	    };
	    return _this;
	  }
	
	  _createClass(Sidebar, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      if (nextProps.fixedHeader === 'absolute' && window && window.document && this.state.scrollTop !== nextState.scrollTop) {
	        return true;
	      }
	
	      return !((0, _utils.arraysEqual)(nextProps.groups, this.props.groups) && nextProps.keys === this.props.keys && nextProps.width === this.props.width && nextProps.lineHeight === this.props.lineHeight && nextProps.fixedHeader === this.props.fixedHeader && nextProps.zIndex === this.props.zIndex && nextProps.groupHeights === this.props.groupHeights && nextProps.height === this.props.height);
	    }
	  }, {
	    key: 'scroll',
	    value: function scroll(e) {
	      if (this.props.fixedHeader === 'absolute' && window && window.document) {
	        var scroll = window.document.body.scrollTop;
	        this.setState({
	          scrollTop: scroll
	        });
	      }
	    }
	  }, {
	    key: 'setComponentTop',
	    value: function setComponentTop() {
	      var viewportOffset = this.refs.sidebar.getBoundingClientRect();
	      this.setState({
	        componentTop: viewportOffset.top
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;
	
	      this.setComponentTop();
	      this.scroll();
	
	      this.scrollEventListener = {
	        handleEvent: function handleEvent(event) {
	          _this2.scroll();
	        }
	      };
	
	      window.addEventListener('scroll', this.scrollEventListener);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener('scroll', this.scrollEventListener);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps() {
	      this.setComponentTop();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          fixedHeader = _props.fixedHeader,
	          width = _props.width,
	          lineHeight = _props.lineHeight,
	          zIndex = _props.zIndex,
	          groupHeights = _props.groupHeights,
	          height = _props.height,
	          headerHeight = _props.headerHeight;
	      var _props$keys = this.props.keys,
	          groupIdKey = _props$keys.groupIdKey,
	          groupTitleKey = _props$keys.groupTitleKey;
	      var scrollTop = this.state.scrollTop;
	
	
	      var sidebarStyle = {
	        width: width + 'px',
	        height: height + 'px'
	      };
	
	      var headerStyle = {
	        height: headerHeight + 'px',
	        lineHeight: lineHeight + 'px',
	        width: width + 'px'
	      };
	
	      var groupsStyle = {
	        width: width + 'px'
	      };
	
	      if (fixedHeader === 'fixed') {
	        headerStyle.position = 'fixed';
	        headerStyle.zIndex = zIndex;
	        groupsStyle.paddingTop = headerStyle.height;
	      } else if (fixedHeader === 'absolute') {
	        var componentTop = this.state.componentTop;
	        if (scrollTop >= componentTop) {
	          headerStyle.position = 'absolute';
	          headerStyle.top = scrollTop - componentTop + 'px';
	          headerStyle.left = '0';
	          groupsStyle.paddingTop = headerStyle.height;
	        }
	      }
	
	      var header = _react2.default.createElement(
	        'div',
	        { ref: 'sidebarHeader', className: 'rct-sidebar-header', style: headerStyle },
	        this.props.children
	      );
	
	      var groupLines = [];
	      var i = 0;
	
	      this.props.groups.forEach(function (group, index) {
	        var elementStyle = {
	          height: groupHeights[index] - 1 + 'px',
	          lineHeight: groupHeights[index] - 1 + 'px'
	        };
	
	        groupLines.push(_react2.default.createElement(
	          'div',
	          { key: (0, _utils._get)(group, groupIdKey), className: 'rct-sidebar-row' + (i % 2 === 0 ? ' rct-sidebar-row-even' : ' rct-sidebar-row-odd'), style: elementStyle },
	          (0, _utils._get)(group, groupTitleKey)
	        ));
	        i += 1;
	      });
	
	      return _react2.default.createElement(
	        'div',
	        { ref: 'sidebar', className: 'rct-sidebar', style: sidebarStyle },
	        header,
	        _react2.default.createElement(
	          'div',
	          { style: groupsStyle },
	          groupLines
	        )
	      );
	    }
	  }]);
	
	  return Sidebar;
	}(_react.Component);
	
	exports.default = Sidebar;
	
	
	Sidebar.propTypes = {
	  groups: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.object]).isRequired,
	  width: _react2.default.PropTypes.number.isRequired,
	  lineHeight: _react2.default.PropTypes.number.isRequired,
	  zIndex: _react2.default.PropTypes.number,
	  fixedHeader: _react2.default.PropTypes.oneOf(['fixed', 'absolute', 'none']),
	  keys: _react2.default.PropTypes.object.isRequired,
	  children: _react2.default.PropTypes.node
	};
	Sidebar.defaultProps = {
	  fixedHeader: 'none',
	  zIndex: 12,
	  children: null
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _moment = __webpack_require__(3);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _utils = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Header = function (_Component) {
	  _inherits(Header, _Component);
	
	  function Header(props) {
	    _classCallCheck(this, Header);
	
	    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
	
	    _this.periodClick = function (e) {
	      var _e$target$dataset = e.target.dataset,
	          time = _e$target$dataset.time,
	          unit = _e$target$dataset.unit;
	
	      if (time && unit) {
	        _this.props.showPeriod((0, _moment2.default)(time - 0), unit);
	      }
	    };
	
	    _this.touchStart = function (e) {
	      if (e.touches.length === 1) {
	        _this.setState({
	          touchTarget: e.target || e.touchTarget,
	          touchActive: true
	        });
	      }
	    };
	
	    _this.touchEnd = function (e) {
	      if (!_this.state.touchActive) {
	        return _this.resetTouchState();
	      }
	
	      var changedTouches = e.changedTouches[0];
	      if (changedTouches) {
	        var elem = document.elementFromPoint(changedTouches.pageX, changedTouches.pageY);
	        if (elem !== _this.state.touchTarget) {
	          return _this.resetTouchState();
	        }
	      }
	
	      _this.resetTouchState();
	      _this.periodClick(e);
	    };
	
	    _this.state = {
	      scrollTop: 0,
	      componentTop: 0,
	      touchTarget: null,
	      touchActive: false
	    };
	    return _this;
	  }
	
	  _createClass(Header, [{
	    key: 'scroll',
	    value: function scroll(e) {
	      if (this.props.fixedHeader === 'absolute' && window && window.document) {
	        var scroll = window.document.body.scrollTop;
	        this.setState({
	          scrollTop: scroll
	        });
	      }
	    }
	  }, {
	    key: 'setComponentTop',
	    value: function setComponentTop() {
	      var viewportOffset = this.refs.header.getBoundingClientRect();
	      this.setState({
	        componentTop: viewportOffset.top
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;
	
	      this.setComponentTop();
	      this.scroll();
	
	      this.scrollEventListener = {
	        handleEvent: function handleEvent(event) {
	          _this2.scroll();
	        }
	      };
	
	      window.addEventListener('scroll', this.scrollEventListener);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener('scroll', this.scrollEventListener);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps() {
	      this.setComponentTop();
	    }
	  }, {
	    key: 'headerLabel',
	    value: function headerLabel(time, unit, width) {
	      if (unit === 'year') {
	        return time.format(width < 46 ? 'YY' : 'YYYY');
	      } else if (unit === 'month') {
	        return time.format(width < 65 ? 'MM/YY' : width < 75 ? 'MM/YYYY' : width < 120 ? 'MMM YYYY' : 'MMMM YYYY');
	      } else if (unit === 'day') {
	        return time.format(width < 150 ? 'L' : 'dddd, LL');
	      } else if (unit === 'hour') {
	        return time.format(width < 50 ? 'HH' : width < 130 ? 'HH:00' : width < 150 ? 'L, HH:00' : 'dddd, LL, HH:00');
	      } else {
	        return time.format('LLL');
	      }
	    }
	  }, {
	    key: 'subHeaderLabel',
	    value: function subHeaderLabel(time, unit, width) {
	      if (unit === 'year') {
	        return time.format(width < 46 ? 'YY' : 'YYYY');
	      } else if (unit === 'month') {
	        return time.format(width < 37 ? 'MM' : width < 85 ? 'MMM' : 'MMMM');
	      } else if (unit === 'day') {
	        return time.format(width < 47 ? 'D' : width < 80 ? 'dd D' : width < 120 ? 'ddd, Do' : 'dddd, Do');
	      } else if (unit === 'hour') {
	        return time.format(width < 50 ? 'HH' : 'HH:00');
	      } else if (unit === 'minute') {
	        return time.format(width < 60 ? 'mm' : 'HH:mm');
	      } else {
	        return time.get(unit);
	      }
	    }
	  }, {
	    key: 'resetTouchState',
	    value: function resetTouchState() {
	      this.setState({
	        touchTarget: null,
	        touchActive: false
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;
	
	      var timeLabels = [];
	      var _props = this.props,
	          canvasTimeStart = _props.canvasTimeStart,
	          canvasTimeEnd = _props.canvasTimeEnd,
	          canvasWidth = _props.canvasWidth,
	          lineHeight = _props.lineHeight,
	          visibleTimeStart = _props.visibleTimeStart,
	          visibleTimeEnd = _props.visibleTimeEnd,
	          minUnit = _props.minUnit,
	          timeSteps = _props.timeSteps,
	          fixedHeader = _props.fixedHeader,
	          headerLabelGroupHeight = _props.headerLabelGroupHeight,
	          headerLabelHeight = _props.headerLabelHeight;
	      var scrollTop = this.state.scrollTop;
	
	      var ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart);
	      var twoHeaders = minUnit !== 'year';
	
	      // add the top header
	      if (twoHeaders) {
	        var nextUnit = (0, _utils.getNextUnit)(minUnit);
	
	        (0, _utils.iterateTimes)(visibleTimeStart, visibleTimeEnd, nextUnit, timeSteps, function (time, nextTime) {
	          var startTime = Math.max(visibleTimeStart, time.valueOf());
	          var endTime = Math.min(visibleTimeEnd, nextTime.valueOf());
	          var left = Math.round((startTime.valueOf() - canvasTimeStart) * ratio, -2);
	          var right = Math.round((endTime.valueOf() - canvasTimeStart) * ratio, -2);
	          var labelWidth = right - left;
	          var leftCorrect = fixedHeader === 'fixed' ? Math.round((canvasTimeStart - visibleTimeStart) * ratio) - 1 : 0;
	
	          timeLabels.push(_react2.default.createElement(
	            'div',
	            { key: 'top-label-' + time.valueOf(),
	              href: '#',
	              className: 'rct-label-group',
	              'data-time': time,
	              'data-unit': nextUnit,
	              style: {
	                left: left + leftCorrect + 'px',
	                width: labelWidth + 'px',
	                height: headerLabelGroupHeight + 'px',
	                lineHeight: headerLabelGroupHeight + 'px',
	                cursor: 'pointer'
	              } },
	            _this3.headerLabel(time, nextUnit, labelWidth)
	          ));
	        });
	      }
	
	      (0, _utils.iterateTimes)(canvasTimeStart, canvasTimeEnd, minUnit, timeSteps, function (time, nextTime) {
	        var left = Math.round((time.valueOf() - canvasTimeStart) * ratio, -2);
	        var minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit);
	        var firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0);
	        var labelWidth = Math.round((nextTime.valueOf() - time.valueOf()) * ratio, -2);
	        var borderWidth = firstOfType ? 2 : 1;
	        var leftCorrect = fixedHeader === 'fixed' ? Math.round((canvasTimeStart - visibleTimeStart) * ratio) - borderWidth + 1 : 0;
	
	        timeLabels.push(_react2.default.createElement(
	          'div',
	          { key: 'label-' + time.valueOf(),
	            href: '#',
	            className: 'rct-label ' + (twoHeaders ? '' : 'rct-label-only') + ' ' + (firstOfType ? 'rct-first-of-type' : '') + ' ',
	            'data-time': time,
	            'data-unit': minUnit,
	            style: {
	              top: (minUnit === 'year' ? 0 : headerLabelGroupHeight) + 'px',
	              left: left + leftCorrect + 'px',
	              width: labelWidth + 'px',
	              height: (minUnit === 'year' ? headerLabelGroupHeight + headerLabelHeight : headerLabelHeight) + 'px',
	              lineHeight: (minUnit === 'year' ? headerLabelGroupHeight + headerLabelHeight : headerLabelHeight) + 'px',
	              fontSize: (labelWidth > 30 ? '14' : labelWidth > 20 ? '12' : '10') + 'px',
	              cursor: 'pointer'
	            } },
	          _this3.subHeaderLabel(time, minUnit, labelWidth)
	        ));
	      });
	
	      var zIndex = this.props.zIndex;
	
	
	      var headerStyle = {
	        height: headerLabelGroupHeight + headerLabelHeight + 'px',
	        lineHeight: lineHeight + 'px'
	      };
	
	      if (fixedHeader === 'fixed') {
	        headerStyle.position = 'fixed';
	        headerStyle.width = '100%';
	        headerStyle.zIndex = zIndex;
	      } else if (fixedHeader === 'absolute') {
	        var componentTop = this.state.componentTop;
	        if (scrollTop >= componentTop) {
	          headerStyle.position = 'absolute';
	          headerStyle.top = scrollTop - componentTop + 'px';
	          headerStyle.width = canvasWidth + 'px';
	          headerStyle.left = '0';
	        }
	      }
	
	      return _react2.default.createElement(
	        'div',
	        { ref: 'header', key: 'header', className: 'rct-header', onTouchStart: this.touchStart, onTouchEnd: this.touchEnd, onClick: this.periodClick, style: headerStyle },
	        timeLabels
	      );
	    }
	  }]);
	
	  return Header;
	}(_react.Component);
	
	exports.default = Header;
	
	
	Header.propTypes = {
	  // groups: React.PropTypes.array.isRequired,
	  // width: React.PropTypes.number.isRequired,
	  // lineHeight: React.PropTypes.number.isRequired,
	  // headerBackgroundColor: React.PropTypes.string.isRequired,
	  showPeriod: _react2.default.PropTypes.func.isRequired,
	  canvasTimeStart: _react2.default.PropTypes.number.isRequired,
	  canvasTimeEnd: _react2.default.PropTypes.number.isRequired,
	  canvasWidth: _react2.default.PropTypes.number.isRequired,
	  lineHeight: _react2.default.PropTypes.number.isRequired,
	  visibleTimeStart: _react2.default.PropTypes.number.isRequired,
	  visibleTimeEnd: _react2.default.PropTypes.number.isRequired,
	  // visibleTimeEnd: React.PropTypes.number.isRequired,
	  minUnit: _react2.default.PropTypes.string.isRequired,
	  timeSteps: _react2.default.PropTypes.object.isRequired,
	  width: _react2.default.PropTypes.number.isRequired,
	  fixedHeader: _react2.default.PropTypes.oneOf(['fixed', 'absolute', 'none']),
	  zIndex: _react2.default.PropTypes.number
	};
	Header.defaultProps = {
	  fixedHeader: 'none',
	  zIndex: 11
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utils = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var VerticalLines = function (_Component) {
	  _inherits(VerticalLines, _Component);
	
	  function VerticalLines() {
	    _classCallCheck(this, VerticalLines);
	
	    return _possibleConstructorReturn(this, (VerticalLines.__proto__ || Object.getPrototypeOf(VerticalLines)).apply(this, arguments));
	  }
	
	  _createClass(VerticalLines, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return !(nextProps.canvasTimeStart === this.props.canvasTimeStart && nextProps.canvasTimeEnd === this.props.canvasTimeEnd && nextProps.canvasWidth === this.props.canvasWidth && nextProps.lineHeight === this.props.lineHeight && nextProps.lineCount === this.props.lineCount && nextProps.minUnit === this.props.minUnit && nextProps.timeSteps === this.props.timeSteps && nextProps.fixedHeader === this.props.fixedHeader && nextProps.height === this.props.height && nextProps.headerHeight === this.props.headerHeight);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props = this.props,
	          canvasTimeStart = _props.canvasTimeStart,
	          canvasTimeEnd = _props.canvasTimeEnd,
	          canvasWidth = _props.canvasWidth,
	          minUnit = _props.minUnit,
	          timeSteps = _props.timeSteps,
	          height = _props.height,
	          headerHeight = _props.headerHeight;
	
	      var ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart);
	
	      var lines = [];
	
	      (0, _utils.iterateTimes)(canvasTimeStart, canvasTimeEnd, minUnit, timeSteps, function (time, nextTime) {
	        var left = Math.round((time.valueOf() - canvasTimeStart) * ratio, -2);
	        var minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit);
	        var firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0);
	        var lineWidth = firstOfType ? 2 : 1;
	        var labelWidth = Math.ceil((nextTime.valueOf() - time.valueOf()) * ratio) - lineWidth;
	        var leftPush = _this2.props.fixedHeader === 'fixed' && firstOfType ? -1 : 0;
	
	        var classNames = 'rct-vl' + (firstOfType ? ' rct-vl-first' : '') + (minUnit === 'day' || minUnit === 'hour' || minUnit === 'minute' ? ' rct-day-' + time.day() : '');
	
	        lines.push(_react2.default.createElement('div', { key: 'line-' + time.valueOf(),
	          className: classNames,
	          style: {
	            top: headerHeight + 'px',
	            left: left + leftPush + 'px',
	            width: labelWidth + 'px',
	            height: height - headerHeight + 'px'
	          } }));
	      });
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'rct-vertical-lines' },
	        lines
	      );
	    }
	  }]);
	
	  return VerticalLines;
	}(_react.Component);
	
	exports.default = VerticalLines;
	
	
	VerticalLines.propTypes = {
	  canvasTimeStart: _react2.default.PropTypes.number.isRequired,
	  canvasTimeEnd: _react2.default.PropTypes.number.isRequired,
	  canvasWidth: _react2.default.PropTypes.number.isRequired,
	  lineHeight: _react2.default.PropTypes.number.isRequired,
	  lineCount: _react2.default.PropTypes.number.isRequired,
	  minUnit: _react2.default.PropTypes.string.isRequired,
	  timeSteps: _react2.default.PropTypes.object.isRequired,
	  fixedHeader: _react2.default.PropTypes.string.isRequired
	};
	VerticalLines.defaultProps = {
	  fixedHeader: 'none',
	  dayBackground: null
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var HorizontalLines = function (_Component) {
	  _inherits(HorizontalLines, _Component);
	
	  function HorizontalLines() {
	    _classCallCheck(this, HorizontalLines);
	
	    return _possibleConstructorReturn(this, (HorizontalLines.__proto__ || Object.getPrototypeOf(HorizontalLines)).apply(this, arguments));
	  }
	
	  _createClass(HorizontalLines, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return !(nextProps.canvasWidth === this.props.canvasWidth && nextProps.lineHeight === this.props.lineHeight && nextProps.lineCount === this.props.lineCount && nextProps.groupHeights === this.props.groupHeights);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          lineCount = _props.lineCount,
	          canvasWidth = _props.canvasWidth,
	          groupHeights = _props.groupHeights,
	          headerHeight = _props.headerHeight;
	
	      var lines = [];
	
	      var totalHeight = headerHeight;
	      for (var i = 0; i < lineCount; i++) {
	        lines.push(_react2.default.createElement('div', { key: 'horizontal-line-' + i,
	          className: i % 2 === 0 ? 'rct-hl-even' : 'rct-hl-odd',
	          style: {
	            top: totalHeight + 'px',
	            left: '0px',
	            width: canvasWidth + 'px',
	            height: groupHeights[i] - 1 + 'px'
	          } }));
	        totalHeight += groupHeights[i];
	      }
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'rct-horizontal-lines' },
	        lines
	      );
	    }
	  }]);
	
	  return HorizontalLines;
	}(_react.Component);
	
	exports.default = HorizontalLines;
	
	
	HorizontalLines.propTypes = {
	  canvasWidth: _react2.default.PropTypes.number.isRequired,
	  lineHeight: _react2.default.PropTypes.number.isRequired,
	  lineCount: _react2.default.PropTypes.number.isRequired
	};
	HorizontalLines.defaultProps = {
	  borderWidth: 1
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TodayLine = function (_Component) {
	  _inherits(TodayLine, _Component);
	
	  function TodayLine() {
	    _classCallCheck(this, TodayLine);
	
	    return _possibleConstructorReturn(this, (TodayLine.__proto__ || Object.getPrototypeOf(TodayLine)).apply(this, arguments));
	  }
	
	  _createClass(TodayLine, [{
	    key: 'render',
	
	    // TODO: should currentTime come from a prop? probably...?
	    value: function render() {
	      var currentTime = new Date().getTime();
	
	      if (currentTime > this.props.canvasTimeStart && currentTime < this.props.canvasTimeEnd) {
	        var ratio = this.props.canvasWidth / (this.props.canvasTimeEnd - this.props.canvasTimeStart);
	        var left = Math.round((currentTime - this.props.canvasTimeStart) * ratio);
	        var top = this.props.headerHeight;
	        var height = this.props.height - this.props.headerHeight;
	        var styles = {
	          top: top + 'px',
	          left: left + 'px',
	          height: height + 'px'
	        };
	
	        return _react2.default.createElement('div', { className: 'rct-today', style: styles });
	      } else {
	        return _react2.default.createElement('div', null);
	      }
	    }
	  }]);
	
	  return TodayLine;
	}(_react.Component);
	
	exports.default = TodayLine;
	
	TodayLine.propTypes = {
	  canvasTimeStart: _react2.default.PropTypes.number.isRequired,
	  canvasTimeEnd: _react2.default.PropTypes.number.isRequired,
	  canvasWidth: _react2.default.PropTypes.number.isRequired,
	  lineHeight: _react2.default.PropTypes.number.isRequired,
	  lineCount: _react2.default.PropTypes.number.isRequired
	};
	TodayLine.defaultProps = {};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-calendar-timeline.js.map