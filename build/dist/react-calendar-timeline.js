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
/******/ 	__webpack_require__.p = "dist/";
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
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
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
	      resizeEnd: null
	    };
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
	      var width = this.refs.container.clientWidth - this.props.sidebarWidth;
	      this.setState({
	        width: width
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
	
	      if (visibleTimeStart && visibleTimeEnd) {
	        this.updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
	      }
	    }
	  }, {
	    key: 'updateScrollCanvas',
	    value: function updateScrollCanvas(visibleTimeStart, visibleTimeEnd) {
	      var oldCanvasTimeStart = this.state.canvasTimeStart;
	      var oldZoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
	      var newZoom = visibleTimeEnd - visibleTimeStart;
	
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
	        newState.canvasTimeStart = visibleTimeStart - newZoom;
	        this.refs.scrollComponent.scrollLeft = this.state.width;
	        if (this.props.onBoundsChange) {
	          this.props.onBoundsChange(newState.canvasTimeStart, newState.canvasTimeStart + newZoom * 3);
	        }
	      }
	
	      this.setState(newState);
	    }
	  }, {
	    key: 'onWheel',
	    value: function onWheel(e) {
	      if (e.ctrlKey) {
	        e.preventDefault();
	        var parentPosition = (0, _utils.getParentPosition)(e.currentTarget);
	        var xPosition = e.clientX - parentPosition.x;
	        this.changeZoom(1.0 + e.deltaY / 50, xPosition / this.state.width);
	      } else if (e.shiftKey) {
	        e.preventDefault();
	        var scrollComponent = this.refs.scrollComponent;
	        scrollComponent.scrollLeft += e.deltaY;
	      } else {
	        if (this.props.fixedHeader === 'fixed') {
	          e.preventDefault();
	          if (e.deltaX !== 0) {
	            this.refs.scrollComponent.scrollLeft += e.deltaX;
	          }
	          if (e.deltaY !== 0) {
	            window.scrollTo(window.pageXOffset, window.pageYOffset + e.deltaY);
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
	    value: function selectItem(item) {
	      if (this.state.selectedItem === item) {
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
	      if (e.target.className.indexOf('rct-item') === -1) {
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
	      this.setState({
	        dragTime: dragTime,
	        dragGroupTitle: newGroup ? newGroup.title : ''
	      });
	    }
	  }, {
	    key: 'dropItem',
	    value: function dropItem(item, dragTime, newGroupOrder) {
	      this.setState({ dragTime: null, dragGroupTitle: null });
	      if (this.props.onItemMove) {
	        this.props.onItemMove(item, dragTime, newGroupOrder);
	      }
	    }
	  }, {
	    key: 'resizingItem',
	    value: function resizingItem(item, newResizeEnd) {
	      this.setState({ resizeEnd: newResizeEnd });
	    }
	  }, {
	    key: 'resizedItem',
	    value: function resizedItem(item, newResizeEnd) {
	      this.setState({ resizeEnd: null });
	      if (this.props.onItemResize) {
	        this.props.onItemResize(item, newResizeEnd);
	      }
	    }
	  }, {
	    key: 'todayLine',
	    value: function todayLine() {
	      var canvasTimeStart = this.state.canvasTimeStart;
	      var zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
	      var canvasTimeEnd = canvasTimeStart + zoom * 3;
	      var canvasWidth = this.state.width * 3;
	
	      return _react2.default.createElement(_TodayLine2.default, { canvasTimeStart: canvasTimeStart,
	        canvasTimeEnd: canvasTimeEnd,
	        canvasWidth: canvasWidth,
	        lineHeight: this.props.lineHeight,
	        lineCount: (0, _utils._length)(this.props.groups) });
	    }
	  }, {
	    key: 'verticalLines',
	    value: function verticalLines() {
	      var canvasTimeStart = this.state.canvasTimeStart;
	      var zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
	      var canvasTimeEnd = canvasTimeStart + zoom * 3;
	      var canvasWidth = this.state.width * 3;
	      var minUnit = (0, _utils.getMinUnit)(zoom, this.state.width);
	
	      return _react2.default.createElement(_VerticalLines2.default, { canvasTimeStart: canvasTimeStart,
	        canvasTimeEnd: canvasTimeEnd,
	        canvasWidth: canvasWidth,
	        lineHeight: this.props.lineHeight,
	        lineCount: (0, _utils._length)(this.props.groups),
	        minUnit: minUnit,
	        fixedHeader: this.props.fixedHeader });
	    }
	  }, {
	    key: 'horizontalLines',
	    value: function horizontalLines() {
	      var canvasWidth = this.state.width * 3;
	
	      return _react2.default.createElement(_HorizontalLines2.default, { canvasWidth: canvasWidth,
	        lineHeight: this.props.lineHeight,
	        lineCount: (0, _utils._length)(this.props.groups) });
	    }
	  }, {
	    key: 'items',
	    value: function items() {
	      var zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
	      var minUnit = (0, _utils.getMinUnit)(zoom, this.state.width);
	      var canvasTimeStart = this.state.canvasTimeStart;
	      var canvasTimeEnd = canvasTimeStart + zoom * 3;
	      var canvasWidth = this.state.width * 3;
	
	      return _react2.default.createElement(_Items2.default, { canvasTimeStart: canvasTimeStart,
	        canvasTimeEnd: canvasTimeEnd,
	        canvasWidth: canvasWidth,
	        lineHeight: this.props.lineHeight,
	        lineCount: (0, _utils._length)(this.props.groups),
	        minUnit: minUnit,
	        items: this.props.items,
	        groups: this.props.groups,
	        keys: this.props.keys,
	        selectedItem: this.state.selectedItem,
	        dragSnap: this.props.dragSnap,
	        minResizeWidth: this.props.minResizeWidth,
	        canChangeGroup: this.props.canChangeGroup,
	        canMove: this.props.canMove,
	        canResize: this.props.canResize,
	        moveResizeValidator: this.props.moveResizeValidator,
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
	    value: function header() {
	      var canvasTimeStart = this.state.canvasTimeStart;
	      var zoom = this.state.visibleTimeEnd - this.state.visibleTimeStart;
	      var canvasTimeEnd = canvasTimeStart + zoom * 3;
	      var canvasWidth = this.state.width * 3;
	      var minUnit = (0, _utils.getMinUnit)(zoom, this.state.width);
	
	      return _react2.default.createElement(_Header2.default, { canvasTimeStart: canvasTimeStart,
	        canvasTimeEnd: canvasTimeEnd,
	        canvasWidth: canvasWidth,
	        lineHeight: this.props.lineHeight,
	        minUnit: minUnit,
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
	    value: function sidebar() {
	      return _react2.default.createElement(
	        _Sidebar2.default,
	        { groups: this.props.groups,
	          keys: this.props.keys,
	
	          width: this.props.sidebarWidth,
	          lineHeight: this.props.lineHeight,
	
	          fixedHeader: this.props.fixedHeader,
	          zIndex: this.props.zIndexStart + 2 },
	        this.props.children
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var width = this.state.width;
	      var height = ((0, _utils._length)(this.props.groups) + 2) * this.props.lineHeight;
	      var canvasWidth = this.state.width * 3;
	
	      var outerComponentStyle = {
	        height: height + 'px'
	      };
	
	      var scrollComponentStyle = {
	        width: width + 'px',
	        height: height + 20 + 'px'
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
	          this.sidebar(),
	          _react2.default.createElement(
	            'div',
	            { ref: 'scrollComponent',
	              className: 'rct-scroll',
	              style: scrollComponentStyle,
	              onClick: this.scrollAreaClick.bind(this),
	              onScroll: this.onScroll.bind(this),
	              onWheel: this.onWheel.bind(this) },
	            _react2.default.createElement(
	              'div',
	              { ref: 'canvasComponent',
	                className: 'rct-canvas',
	                style: canvasComponentStyle },
	              this.verticalLines(),
	              this.horizontalLines(),
	              this.todayLine(),
	              this.items(),
	              this.infoLabel(),
	              this.header()
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
	
	  minZoom: _react2.default.PropTypes.number,
	  maxZoom: _react2.default.PropTypes.number,
	
	  canChangeGroup: _react2.default.PropTypes.bool,
	  canMove: _react2.default.PropTypes.bool,
	  canResize: _react2.default.PropTypes.bool,
	
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
	
	  minZoom: 60 * 60 * 1000, // 1 hour
	  maxZoom: 5 * 365.24 * 86400 * 1000, // 5 years
	
	  canChangeGroup: true,
	  canMove: true,
	  canResize: true,
	
	  onItemMove: null,
	  onItemResize: null,
	  onItemClick: null,
	  onCanvasClick: null,
	
	  moveResizeValidator: null,
	
	  dayBackground: null,
	
	  defaultTimeStart: null,
	  defaultTimeEnd: null,
	
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Item = __webpack_require__(9);
	
	var _Item2 = _interopRequireDefault(_Item);
	
	var _utils = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// import ItemGroup from './ItemGroup.jsx'
	
	var Items = function (_Component) {
	  _inherits(Items, _Component);
	
	  function Items(props) {
	    _classCallCheck(this, Items);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Items).call(this, props));
	  }
	
	  _createClass(Items, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return !((0, _utils.arraysEqual)(nextProps.groups, this.props.groups) && (0, _utils.arraysEqual)(nextProps.items, this.props.items) && nextProps.keys === this.props.keys && nextProps.canvasTimeStart === this.props.canvasTimeStart && nextProps.canvasTimeEnd === this.props.canvasTimeEnd && nextProps.canvasWidth === this.props.canvasWidth && nextProps.selectedItem === this.props.selectedItem && nextProps.lineHeight === this.props.lineHeight && nextProps.dragSnap === this.props.dragSnap && nextProps.minResizeWidth === this.props.minResizeWidth && nextProps.canChangeGroup === this.props.canChangeGroup && nextProps.canMove === this.props.canMove && nextProps.canResize === this.props.canResize);
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
	      var _props$keys = this.props.keys;
	      var itemTimeStartKey = _props$keys.itemTimeStartKey;
	      var itemTimeEndKey = _props$keys.itemTimeEndKey;
	
	      return this.props.items.filter(function (item) {
	        return (0, _utils._get)(item, itemTimeStartKey) <= canvasTimeEnd && (0, _utils._get)(item, itemTimeEndKey) >= canvasTimeStart;
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props = this.props;
	      var canvasTimeStart = _props.canvasTimeStart;
	      var canvasTimeEnd = _props.canvasTimeEnd;
	      var _props$keys2 = this.props.keys;
	      var itemIdKey = _props$keys2.itemIdKey;
	      var itemGroupKey = _props$keys2.itemGroupKey;
	
	      var groupOrders = this.getGroupOrders();
	      var visibleItems = this.getVisibleItems(canvasTimeStart, canvasTimeEnd, groupOrders);
	
	      // const timeDiff = Math.floor((canvasTimeEnd - canvasTimeStart) / 24)
	
	      // const start = Math.floor(canvasTimeStart / timeDiff) * timeDiff
	      // const end = Math.floor(canvasTimeEnd / timeDiff) * timeDiff
	
	      // const canvasTimeLength = (canvasTimeEnd - canvasTimeStart)
	      // const ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart)
	      //
	      // let itemGroups = []
	      //
	      // for (let i = start; i < end + timeDiff; i += timeDiff) {
	      //   itemGroups.push({
	      //     start: i,
	      //     end: i + timeDiff,
	      //     left: Math.round((i - canvasTimeStart) * ratio, 2),
	      //     items: visibleItems.filter(item => item.start >= i && item.start < i + timeDiff)
	      //   })
	      // }
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'rct-items' },
	        visibleItems.map(function (item) {
	          return _react2.default.createElement(_Item2.default, { key: (0, _utils._get)(item, itemIdKey),
	            item: item,
	            keys: _this2.props.keys,
	            order: groupOrders[(0, _utils._get)(item, itemGroupKey)],
	            selected: _this2.props.selectedItem === (0, _utils._get)(item, itemIdKey),
	            canChangeGroup: (0, _utils._get)(item, 'canChangeGroup') !== undefined ? (0, _utils._get)(item, 'canChangeGroup') : _this2.props.canChangeGroup,
	            canMove: (0, _utils._get)(item, 'canMove') !== undefined ? (0, _utils._get)(item, 'canMove') : _this2.props.canMove,
	            canResize: (0, _utils._get)(item, 'canResize') !== undefined ? (0, _utils._get)(item, 'canResize') : _this2.props.canResize,
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
	            onSelect: _this2.props.itemSelect });
	        })
	      );
	
	      // NB: itemgroups commented out for now as they made performacne horrible when zooming in/out
	      //
	      // return (
	      //   <div>
	      //     {itemGroups.map(group => (
	      //       <div key={`timegroup-${group.start}-${group.end}`} style={{position: 'absolute', top: '0', left: `${group.left}px`}}>
	      //         <ItemGroup {...this.props} items={group.items} canvasTimeStart={group.start} canvasTimeEnd={group.start + canvasTimeLength} groupOrders={groupOrders} />
	      //       </div>
	      //     ))}
	      //   </div>
	      // )
	    }
	  }]);
	
	  return Items;
	}(_react.Component);
	
	exports.default = Items;
	
	Items.propTypes = {
	  groups: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.object]).isRequired,
	  items: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.object]).isRequired,
	
	  canvasTimeStart: _react2.default.PropTypes.number.isRequired,
	  canvasTimeEnd: _react2.default.PropTypes.number.isRequired,
	  canvasWidth: _react2.default.PropTypes.number.isRequired,
	  lineHeight: _react2.default.PropTypes.number.isRequired,
	
	  dragSnap: _react2.default.PropTypes.number,
	  minResizeWidth: _react2.default.PropTypes.number,
	  selectedItem: _react2.default.PropTypes.string,
	
	  canChangeGroup: _react2.default.PropTypes.bool.isRequired,
	  canMove: _react2.default.PropTypes.bool.isRequired,
	  canResize: _react2.default.PropTypes.bool.isRequired,
	
	  keys: _react2.default.PropTypes.object.isRequired,
	
	  moveResizeValidator: _react2.default.PropTypes.func,
	  itemSelect: _react2.default.PropTypes.func,
	  itemDrag: _react2.default.PropTypes.func,
	  itemDrop: _react2.default.PropTypes.func,
	  itemResizing: _react2.default.PropTypes.func,
	  itemResized: _react2.default.PropTypes.func
	};
	Items.defaultProps = {};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _interact = __webpack_require__(10);
	
	var _interact2 = _interopRequireDefault(_interact);
	
	var _utils = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Item = function (_Component) {
	  _inherits(Item, _Component);
	
	  function Item(props) {
	    _classCallCheck(this, Item);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Item).call(this, props));
	
	    _this.onMouseDown = function (e) {
	      if (!_this.state.interactMounted) {
	        e.preventDefault();
	        _this.startedClicking = true;
	      }
	    };
	
	    _this.onMouseUp = function (e) {
	      if (!_this.state.interactMounted && _this.startedClicking) {
	        _this.startedClicking = false;
	        _this.actualClick(e);
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
	        _this.actualClick(e);
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
	      resizeStart: null,
	      resizeTime: null
	    };
	    return _this;
	  }
	
	  _createClass(Item, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return !(nextState.dragging !== this.state.dragging && nextState.dragTime !== this.state.dragTime && nextState.dragGroupDelta !== this.state.dragGroupDelta && nextState.resizing !== this.state.resizing && nextState.resizeTime !== this.state.resizeTime && nextProps.keys === this.props.keys && nextProps.selected === this.props.selected && nextProps.item === this.props.item && nextProps.canvasTimeStart === this.props.canvasTimeStart && nextProps.canvasTimeEnd === this.props.canvasTimeEnd && nextProps.canvasWidth === this.props.canvasWidth && nextProps.lineHeight === this.props.lineHeight && nextProps.order === this.props.order && nextProps.dragSnap === this.props.dragSnap && nextProps.minResizeWidth === this.props.minResizeWidth && nextProps.selected === this.props.selected && nextProps.canChangeGroup === this.props.canChangeGroup && nextProps.canMove === this.props.canMove && nextProps.canResize === this.props.canResize);
	    }
	  }, {
	    key: 'cacheDataFromProps',
	    value: function cacheDataFromProps(props) {
	      this.itemId = (0, _utils._get)(props.item, props.keys.itemIdKey);
	      this.itemTitle = (0, _utils._get)(props.item, props.keys.itemTitleKey);
	      this.itemTimeStart = (0, _utils._get)(props.item, props.keys.itemTimeStartKey);
	      this.itemTimeEnd = (0, _utils._get)(props.item, props.keys.itemTimeEndKey);
	    }
	  }, {
	    key: 'coordinateToTimeRatio',
	    value: function coordinateToTimeRatio() {
	      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
	
	      return (props.canvasTimeEnd - props.canvasTimeStart) / props.canvasWidth;
	    }
	  }, {
	    key: 'dragTimeSnap',
	    value: function dragTimeSnap(dragTime) {
	      if (this.props.dragSnap) {
	        return Math.round(dragTime / this.props.dragSnap) * this.props.dragSnap;
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
	
	        return this.dragTimeSnap(startTime + timeDelta);
	      } else {
	        return startTime;
	      }
	    }
	  }, {
	    key: 'dragGroupDelta',
	    value: function dragGroupDelta(e) {
	      if (this.state.dragging) {
	        if (!this.props.canChangeGroup) {
	          return 0;
	        }
	        var deltaY = e.pageY - this.state.dragStart.y;
	        var groupDelta = Math.round(deltaY / this.props.lineHeight);
	
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
	    value: function resizeTimeDelta(e) {
	      var length = this.itemTimeEnd - this.itemTimeStart;
	      var timeDelta = this.dragTimeSnap((e.pageX - this.state.resizeStart) * this.coordinateToTimeRatio());
	
	      if (length + timeDelta < (this.props.dragSnap || 1000)) {
	        return (this.props.dragSnap || 1000) - length;
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
	
	      (0, _interact2.default)(this.refs.item).resizable({
	        edges: { left: false, right: true, top: false, bottom: false },
	        enabled: this.props.selected && this.canResize()
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
	            resizeStart: e.pageX,
	            newResizeEnd: 0
	          });
	        } else {
	          return false;
	        }
	      }).on('resizemove', function (e) {
	        if (_this2.state.resizing) {
	          var newResizeEnd = _this2.dragTimeSnap(_this2.itemTimeEnd + _this2.resizeTimeDelta(e));
	
	          if (_this2.props.moveResizeValidator) {
	            newResizeEnd = _this2.props.moveResizeValidator('resize', _this2.props.item, newResizeEnd);
	          }
	
	          if (_this2.props.onResizing) {
	            _this2.props.onResizing(_this2.itemId, newResizeEnd);
	          }
	
	          _this2.setState({
	            newResizeEnd: newResizeEnd
	          });
	        }
	      }).on('resizeend', function (e) {
	        if (_this2.state.resizing) {
	          var newResizeEnd = _this2.dragTimeSnap(_this2.itemTimeEnd + _this2.resizeTimeDelta(e));
	
	          if (_this2.props.moveResizeValidator) {
	            newResizeEnd = _this2.props.moveResizeValidator('resize', _this2.props.item, newResizeEnd);
	          }
	
	          if (_this2.props.onResized && _this2.resizeTimeDelta(e) !== 0) {
	            _this2.props.onResized(_this2.itemId, newResizeEnd);
	          }
	          _this2.setState({
	            resizing: null,
	            resizeStart: null,
	            newResizeEnd: null
	          });
	        }
	      }).on('tap', function (e) {
	        _this2.actualClick(e);
	      });
	
	      this.setState({
	        interactMounted: true
	      });
	    }
	  }, {
	    key: 'canResize',
	    value: function canResize() {
	      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
	
	      if (!props.canResize) {
	        return false;
	      }
	      var width = parseInt(this.dimensions(props).width, 10);
	      return width >= props.minResizeWidth;
	    }
	  }, {
	    key: 'canMove',
	    value: function canMove() {
	      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
	
	      return !!props.canMove;
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.cacheDataFromProps(nextProps);
	
	      var interactMounted = this.state.interactMounted;
	
	      var couldDrag = this.props.selected && this.canMove(this.props);
	      var couldResize = this.props.selected && this.canResize(this.props);
	      var willBeAbleToDrag = nextProps.selected && this.canMove(nextProps);
	      var willBeAbleToResize = nextProps.selected && this.canResize(nextProps);
	
	      if (nextProps.selected && !interactMounted) {
	        this.mountInteract();
	        interactMounted = true;
	      }
	
	      if (interactMounted && couldResize !== willBeAbleToResize) {
	        (0, _interact2.default)(this.refs.item).resizable({ enabled: willBeAbleToResize });
	      }
	      if (interactMounted && couldDrag !== willBeAbleToDrag) {
	        (0, _interact2.default)(this.refs.item).draggable({ enabled: willBeAbleToDrag });
	      }
	    }
	  }, {
	    key: 'actualClick',
	    value: function actualClick(e) {
	      if (this.props.onSelect) {
	        this.props.onSelect(this.itemId);
	      }
	    }
	  }, {
	    key: 'dimensions',
	    value: function dimensions() {
	      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
	
	      var x = this.state.dragging ? this.state.dragTime : this.itemTimeStart;
	      var w = Math.max((this.state.resizing ? this.state.newResizeEnd : this.itemTimeEnd) - this.itemTimeStart, props.dragSnap);
	      var y = (props.order + (this.state.dragging ? this.state.dragGroupDelta : 0) + 0.15 + 2) * props.lineHeight; // +2 for header
	      var h = props.lineHeight * 0.65;
	      var ratio = 1 / this.coordinateToTimeRatio(props);
	
	      return {
	        left: (x - props.canvasTimeStart) * ratio + 'px',
	        top: y + 'px',
	        width: Math.max(w * ratio, 3) + 'px',
	        height: h + 'px'
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var dimensions = this.dimensions();
	
	      var classNames = 'rct-item' + (this.props.selected ? ' selected' : '') + (this.canMove(this.props) ? ' can-move' : '') + (this.canResize(this.props) ? ' can-resize' : '') + (this.props.item.className ? ' ' + this.props.item.className : '');
	
	      return _react2.default.createElement(
	        'div',
	        { key: this.itemId,
	          ref: 'item',
	          className: classNames,
	          title: this.itemTitle,
	          onMouseDown: this.onMouseDown,
	          onMouseUp: this.onMouseUp,
	          onTouchStart: this.onTouchStart,
	          onTouchEnd: this.onTouchEnd,
	          style: {
	            // left + top is faster than transform
	            left: dimensions.left,
	            top: dimensions.top,
	            width: dimensions.width,
	            height: dimensions.height,
	            lineHeight: dimensions.height } },
	        this.itemTitle
	      );
	    }
	  }]);
	
	  return Item;
	}(_react.Component);
	
	// removed prop type check for SPEED!
	// they are coming from a trusted component anyway
	
	exports.default = Item;
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
	  // canResize: React.PropTypes.bool.isRequired,
	  //
	  // keys: React.PropTypes.object.isRequired,
	  // item: React.PropTypes.object.isRequired,
	  //
	  // onSelect: React.PropTypes.func,
	  // onDrag: React.PropTypes.func,
	  // onDrop: React.PropTypes.func,
	  // onResizing: React.PropTypes.func,
	  // onResized: React.PropTypes.func
	};
	Item.defaultProps = {
	  selected: false
	};

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
	exports._get = _get;
	exports._length = _length;
	exports.arraysEqual = arraysEqual;
	exports.iterateTimes = iterateTimes;
	exports.getMinUnit = getMinUnit;
	exports.getNextUnit = getNextUnit;
	exports.getParentPosition = getParentPosition;
	exports.createGradientPattern = createGradientPattern;
	
	var _moment = __webpack_require__(3);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	
	function iterateTimes(start, end, unit, callback) {
	  var time = (0, _moment2.default)(start).startOf(unit);
	
	  while (time.valueOf() < end) {
	    var nextTime = (0, _moment2.default)(time).add(1, unit + 's');
	    callback(time, nextTime);
	    time = nextTime;
	  }
	}
	
	function getMinUnit(zoom, width) {
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
	    if (breakCount < width / minCellWidth) {
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

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _function = __webpack_require__(13);
	
	var _function2 = _interopRequireDefault(_function);
	
	var _moment = __webpack_require__(3);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var InfoLabel = function (_Component) {
	  _inherits(InfoLabel, _Component);
	
	  function InfoLabel(props) {
	    _classCallCheck(this, InfoLabel);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InfoLabel).call(this, props));
	
	    _this.shouldComponentUpdate = _function2.default;
	    return _this;
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
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
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sidebar).call(this, props));
	
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
	
	      return !((0, _utils.arraysEqual)(nextProps.groups, this.props.groups) && nextProps.keys === this.props.keys && nextProps.width === this.props.width && nextProps.lineHeight === this.props.lineHeight && nextProps.fixedHeader === this.props.fixedHeader && nextProps.zIndex === this.props.zIndex);
	    }
	  }, {
	    key: 'scroll',
	    value: function scroll(e) {
	      if (this.props.fixedHeader === 'absolute' && window && window.document) {
	        var _scroll = window.document.body.scrollTop;
	        this.setState({
	          scrollTop: _scroll
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
	      var _props = this.props;
	      var fixedHeader = _props.fixedHeader;
	      var width = _props.width;
	      var lineHeight = _props.lineHeight;
	      var zIndex = _props.zIndex;
	      var groups = _props.groups;
	      var _props$keys = this.props.keys;
	      var groupIdKey = _props$keys.groupIdKey;
	      var groupTitleKey = _props$keys.groupTitleKey;
	      var scrollTop = this.state.scrollTop;
	
	      var sidebarStyle = {
	        width: width + 'px',
	        height: lineHeight * ((0, _utils._length)(groups) + 2) + 'px'
	      };
	
	      var headerStyle = {
	        height: lineHeight * 2 + 'px',
	        lineHeight: lineHeight + 'px',
	        width: width + 'px'
	      };
	
	      var groupsStyle = {
	        width: width + 'px'
	      };
	
	      var elementStyle = {
	        height: lineHeight - 1 + 'px',
	        lineHeight: lineHeight - 1 + 'px'
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
	
	      this.props.groups.forEach(function (group) {
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
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
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Header).call(this, props));
	
	    _this.state = {
	      scrollTop: 0,
	      componentTop: 0,
	      touchTarget: null,
	      touchActive: false
	    };
	
	    _this.periodClick = _this.periodClick.bind(_this);
	    _this.touchStart = _this.touchStart.bind(_this);
	    _this.touchEnd = _this.touchEnd.bind(_this);
	    return _this;
	  }
	
	  _createClass(Header, [{
	    key: 'scroll',
	    value: function scroll(e) {
	      if (this.props.fixedHeader === 'absolute' && window && window.document) {
	        var _scroll = window.document.body.scrollTop;
	        this.setState({
	          scrollTop: _scroll
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
	        return time.format(width < 42 ? 'D' : width < 80 ? 'Do' : width < 120 ? 'ddd, Do' : 'dddd, Do');
	      } else if (unit === 'hour') {
	        return time.format(width < 50 ? 'HH' : 'HH:00');
	      } else {
	        return time.get(unit === 'day' ? 'date' : unit);
	      }
	    }
	  }, {
	    key: 'periodClick',
	    value: function periodClick(e) {
	      var _e$target$dataset = e.target.dataset;
	      var time = _e$target$dataset.time;
	      var unit = _e$target$dataset.unit;
	
	      this.props.showPeriod((0, _moment2.default)(time - 0), unit);
	    }
	  }, {
	    key: 'touchStart',
	    value: function touchStart(e) {
	      if (e.touches.length === 1) {
	        this.setState({
	          touchTarget: e.target || e.touchTarget,
	          touchActive: true
	        });
	      }
	    }
	  }, {
	    key: 'touchEnd',
	    value: function touchEnd(e) {
	      if (!this.state.touchActive) {
	        return this.resetTouchState();
	      }
	
	      var changedTouches = e.changedTouches[0];
	      if (changedTouches) {
	        var elem = document.elementFromPoint(changedTouches.pageX, changedTouches.pageY);
	        if (elem !== this.state.touchTarget) {
	          return this.resetTouchState();
	        }
	      }
	
	      this.resetTouchState();
	      this.periodClick(e);
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
	      var _props = this.props;
	      var canvasTimeStart = _props.canvasTimeStart;
	      var canvasTimeEnd = _props.canvasTimeEnd;
	      var canvasWidth = _props.canvasWidth;
	      var lineHeight = _props.lineHeight;
	      var visibleTimeStart = _props.visibleTimeStart;
	      var visibleTimeEnd = _props.visibleTimeEnd;
	      var minUnit = _props.minUnit;
	      var fixedHeader = _props.fixedHeader;
	      var scrollTop = this.state.scrollTop;
	
	      var ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart);
	      var twoHeaders = minUnit !== 'year';
	
	      // add the top header
	      if (twoHeaders) {
	        (function () {
	          var nextUnit = (0, _utils.getNextUnit)(minUnit);
	
	          (0, _utils.iterateTimes)(visibleTimeStart, visibleTimeEnd, nextUnit, function (time, nextTime) {
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
	                  height: lineHeight + 'px',
	                  lineHeight: lineHeight + 'px',
	                  cursor: 'pointer'
	                } },
	              _this3.headerLabel(time, nextUnit, labelWidth)
	            ));
	          });
	        })();
	      }
	
	      (0, _utils.iterateTimes)(canvasTimeStart, canvasTimeEnd, minUnit, function (time, nextTime) {
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
	              top: (minUnit === 'year' ? 0 : lineHeight) + 'px',
	              left: left + leftCorrect + 'px',
	              width: labelWidth + 'px',
	              height: (minUnit === 'year' ? 2 : 1) * lineHeight + 'px',
	              lineHeight: (minUnit === 'year' ? 2 : 1) * lineHeight + 'px',
	              fontSize: labelWidth > 30 ? '14' : labelWidth > 20 ? '12' : '10',
	              cursor: 'pointer'
	            } },
	          _this3.subHeaderLabel(time, minUnit, labelWidth)
	        ));
	      });
	
	      var zIndex = this.props.zIndex;
	
	      var headerStyle = {
	        height: lineHeight * 2 + 'px',
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utils = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var VerticalLines = function (_Component) {
	  _inherits(VerticalLines, _Component);
	
	  function VerticalLines(props) {
	    _classCallCheck(this, VerticalLines);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(VerticalLines).call(this, props));
	  }
	
	  _createClass(VerticalLines, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return !(nextProps.canvasTimeStart === this.props.canvasTimeStart && nextProps.canvasTimeEnd === this.props.canvasTimeEnd && nextProps.canvasWidth === this.props.canvasWidth && nextProps.lineHeight === this.props.lineHeight && nextProps.lineCount === this.props.lineCount && nextProps.minUnit === this.props.minUnit && nextProps.fixedHeader === this.props.fixedHeader);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props = this.props;
	      var canvasTimeStart = _props.canvasTimeStart;
	      var canvasTimeEnd = _props.canvasTimeEnd;
	      var canvasWidth = _props.canvasWidth;
	      var minUnit = _props.minUnit;
	      var lineCount = _props.lineCount;
	      var lineHeight = _props.lineHeight;
	
	      var ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart);
	
	      var lines = [];
	
	      (0, _utils.iterateTimes)(canvasTimeStart, canvasTimeEnd, minUnit, function (time, nextTime) {
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
	            top: lineHeight * 2 + 'px',
	            left: left + leftPush + 'px',
	            width: labelWidth + 'px',
	            height: lineCount * lineHeight + 'px'
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var HorizontalLines = function (_Component) {
	  _inherits(HorizontalLines, _Component);
	
	  function HorizontalLines(props) {
	    _classCallCheck(this, HorizontalLines);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(HorizontalLines).call(this, props));
	  }
	
	  _createClass(HorizontalLines, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return !(nextProps.canvasWidth === this.props.canvasWidth && nextProps.lineHeight === this.props.lineHeight && nextProps.lineCount === this.props.lineCount);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var lineCount = _props.lineCount;
	      var lineHeight = _props.lineHeight;
	      var canvasWidth = _props.canvasWidth;
	
	      var lines = [];
	
	      for (var i = 0; i < lineCount; i++) {
	        lines.push(_react2.default.createElement('div', { key: 'horizontal-line-' + i,
	          className: i % 2 === 0 ? 'rct-hl-even' : 'rct-hl-odd',
	          style: {
	            top: (i + 2) * lineHeight + 'px',
	            left: '0px',
	            width: canvasWidth + 'px',
	            height: lineHeight - 1 + 'px'
	          } }));
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TodayLine = function (_Component) {
	  _inherits(TodayLine, _Component);
	
	  function TodayLine(props) {
	    _classCallCheck(this, TodayLine);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(TodayLine).call(this, props));
	  }
	
	  // TODO: should currentTime come from a prop? probably...?
	
	  _createClass(TodayLine, [{
	    key: 'render',
	    value: function render() {
	      var currentTime = new Date().getTime();
	
	      if (currentTime > this.props.canvasTimeStart && currentTime < this.props.canvasTimeEnd) {
	        var ratio = this.props.canvasWidth / (this.props.canvasTimeEnd - this.props.canvasTimeStart);
	        var left = Math.round((currentTime - this.props.canvasTimeStart) * ratio);
	        var top = this.props.lineHeight * 2;
	        var height = this.props.lineCount * this.props.lineHeight;
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