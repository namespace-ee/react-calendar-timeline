(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("moment"), require("interact"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "moment", "interact"], factory);
	else if(typeof exports === 'object')
		exports["ReactCalendarTimeline"] = factory(require("React"), require("moment"), require("interact"));
	else
		root["ReactCalendarTimeline"] = factory(root["React"], root["moment"], root["interact"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_8__) {
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

	var _ReactCalendarTimeline = __webpack_require__(1);

	var _ReactCalendarTimeline2 = _interopRequireDefault(_ReactCalendarTimeline);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _ReactCalendarTimeline2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _moment = __webpack_require__(3);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _Items = __webpack_require__(4);
	
	var _Items2 = _interopRequireDefault(_Items);
	
	var _InfoLabel = __webpack_require__(9);
	
	var _InfoLabel2 = _interopRequireDefault(_InfoLabel);
	
	var _Sidebar = __webpack_require__(10);
	
	var _Sidebar2 = _interopRequireDefault(_Sidebar);
	
	var _Header = __webpack_require__(11);
	
	var _Header2 = _interopRequireDefault(_Header);
	
	var _VerticalLines = __webpack_require__(13);
	
	var _VerticalLines2 = _interopRequireDefault(_VerticalLines);
	
	var _TodayLine = __webpack_require__(14);
	
	var _TodayLine2 = _interopRequireDefault(_TodayLine);
	
	var _utils = __webpack_require__(12);
	
	var _throttle2 = __webpack_require__(15);
	
	var _throttle3 = _interopRequireDefault(_throttle2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// import './ReactCalendarTimeline.scss';
	
	var ReactCalendarTimeline = (function (_Component) {
	  _inherits(ReactCalendarTimeline, _Component);
	
	  function ReactCalendarTimeline(props) {
	    _classCallCheck(this, ReactCalendarTimeline);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactCalendarTimeline).call(this, props));
	
	    _this.resize = (0, _throttle3.default)(function () {
	      var width = _this.refs.container.clientWidth - _this.props.sidebarWidth;
	      _this.setState({
	        width: width,
	        visible: true
	      });
	      _this.refs.scrollComponent.scrollLeft = width;
	    }, 30);
	
	    var minTime = null,
	        maxTime = null;
	
	    _this.props.items.forEach(function (item) {
	      if (minTime === null || item.start.getTime() < minTime) {
	        minTime = item.start.getTime();
	      }
	      if (maxTime === null || item.end.getTime() > maxTime) {
	        maxTime = item.end.getTime();
	      }
	    });
	
	    _this.state = {
	      width: 1000,
	      lineHeight: 30,
	      minTime: minTime,
	      maxTime: maxTime,
	      zoom: maxTime - minTime,
	      originX: minTime - (maxTime - minTime),
	      visible: false,
	      selectedItem: null,
	      dragTime: null,
	      dragGroupTitle: null,
	      resizeLength: null
	    };
	    return _this;
	  }
	
	  _createClass(ReactCalendarTimeline, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.resize();
	      window.addEventListener('resize', this.resize);
	
	      this.lastTouchDistance = null;
	      this.refs.scrollComponent.addEventListener('touchstart', this.touchStart.bind(this));
	      this.refs.scrollComponent.addEventListener('touchmove', this.touchMove.bind(this));
	      this.refs.scrollComponent.addEventListener('touchend', this.touchEnd.bind(this));
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      window.removeEventListener('resize', this.resize);
	      this.refs.scrollComponent.removeEventListener('touchstart', this.touchStart.bind(this));
	      this.refs.scrollComponent.removeEventListener('touchmove', this.touchMove.bind(this));
	      this.refs.scrollComponent.removeEventListener('touchend', this.touchEnd.bind(this));
	    }
	  }, {
	    key: 'touchStart',
	    value: function touchStart(e) {
	      if (e.touches.length == 2) {
	        e.preventDefault();
	
	        this.lastTouchDistance = Math.abs(e.touches[0].clientX - e.touches[1].clientX);
	      }
	    }
	  }, {
	    key: 'touchMove',
	    value: function touchMove(e) {
	      if (this.lastTouchDistance) {
	        e.preventDefault();
	
	        var touchDistance = Math.abs(e.touches[0].clientX - e.touches[1].clientX);
	
	        var parentPosition = (0, _utils.getParentPosition)(e.currentTarget),
	            xPosition = (e.touches[0].clientX + e.touches[1].clientX) / 2 - parentPosition.x;
	
	        if (touchDistance != 0 && this.lastTouchDistance != 0) {
	          this.changeZoom(this.lastTouchDistance / touchDistance, xPosition / this.state.width);
	          this.lastTouchDistance = touchDistance;
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
	    }
	  }, {
	    key: 'onScroll',
	    value: function onScroll() {
	      var scrollComponent = this.refs.scrollComponent,
	          originX = this.state.originX,
	          scrollX = scrollComponent.scrollLeft,
	          zoom = this.state.zoom,
	          width = this.state.width,
	          minTime = originX + zoom * scrollX / width;
	
	      this.setState({
	        minTime: minTime,
	        maxTime: minTime + zoom
	      });
	
	      if (scrollX < this.state.width * 0.5) {
	        this.setState({ originX: this.state.originX - this.state.zoom });
	        scrollComponent.scrollLeft += this.state.width;
	      }
	      if (scrollX > this.state.width * 1.5) {
	        this.setState({ originX: this.state.originX + this.state.zoom });
	        scrollComponent.scrollLeft -= this.state.width;
	      }
	    }
	  }, {
	    key: 'onWheel',
	    value: function onWheel(e) {
	      if (e.ctrlKey) {
	        e.preventDefault();
	
	        var parentPosition = (0, _utils.getParentPosition)(e.currentTarget),
	            xPosition = e.clientX - parentPosition.x;
	
	        this.changeZoom(1.0 + e.deltaY / 50, xPosition / this.state.width);
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
	
	      var oldZoom = this.state.zoom,
	          newZoom = Math.min(Math.max(Math.round(oldZoom * scale), 60 * 60 * 1000), 20 * 365.24 * 86400 * 1000),
	          // min 1 min, max 20 years
	      realScale = newZoom / oldZoom,
	          middle = Math.round(this.state.minTime + oldZoom * offset),
	          oldBefore = middle - this.state.originX,
	          newBefore = Math.round(oldBefore * realScale),
	          newOriginX = this.state.originX + (oldBefore - newBefore),
	          newMinTime = Math.round(this.state.minTime + (oldZoom - newZoom) * offset);
	
	      this.setState({
	        zoom: newZoom,
	        originX: newOriginX,
	        minTime: newMinTime,
	        maxTime: newMinTime + newZoom
	      });
	    }
	  }, {
	    key: 'showPeriod',
	    value: function showPeriod(from, unit) {
	      var minTime = from.valueOf(),
	          maxTime = (0, _moment2.default)(from).add(1, unit),
	          zoom = maxTime - minTime;
	
	      // can't zoom in more than to show one hour
	      if (zoom < 360000) {
	        return;
	      }
	
	      // clicked on the big header and already focused here, zoom out
	      if (unit != 'year' && this.state.minTime == minTime && this.state.maxTime == maxTime) {
	        var nextUnit = (0, _utils.getNextUnit)(unit);
	
	        minTime = from.startOf(nextUnit).valueOf();
	        maxTime = (0, _moment2.default)(minTime).add(1, nextUnit);
	        zoom = maxTime - minTime;
	      }
	
	      this.setState({
	        zoom: zoom,
	        originX: minTime - zoom,
	        minTime: minTime,
	        maxTime: minTime + zoom
	      });
	
	      this.refs.scrollComponent.scrollLeft = this.state.width;
	    }
	  }, {
	    key: 'selectItem',
	    value: function selectItem(item) {
	      this.setState({ selectedItem: item });
	    }
	  }, {
	    key: 'canvasClick',
	    value: function canvasClick(e) {
	      if (e.target.className !== 'timeline-item') {
	        this.selectItem(null);
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
	      if (this.props.moveItem) {
	        this.props.moveItem(item, dragTime, newGroupOrder);
	      }
	    }
	  }, {
	    key: 'resizingItem',
	    value: function resizingItem(item, newLength) {
	      this.setState({ resizeLength: newLength });
	    }
	  }, {
	    key: 'resizedItem',
	    value: function resizedItem(item, newLength) {
	      this.setState({ resizeLength: null });
	      if (this.props.resizeItem) {
	        this.props.resizeItem(item, newLength);
	      }
	    }
	  }, {
	    key: 'infoLabel',
	    value: function infoLabel() {
	      var label = null;
	
	      if (this.state.dragTime) {
	        label = (0, _moment2.default)(this.state.dragTime).format('LLL') + ', ' + this.state.dragGroupTitle;
	      } else if (this.state.resizeLength) {
	        var minutes = Math.floor(this.state.resizeLength / (60 * 1000)),
	            hours = Math.floor(minutes / 60),
	            days = Math.floor(hours / 24);
	
	        minutes = minutes % 60;
	        hours = hours % 24;
	
	        var parts = [];
	        if (days > 0) {
	          parts.push(days + ' d');
	        }
	        if (hours > 0 || days > 0) {
	          parts.push(hours + ' h');
	        }
	        parts.push('' + (minutes < 10 ? '0' : '') + minutes + ' min');
	        label = parts.join(', ');
	      }
	      return label;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var width = this.state.width,
	          height = (this.props.groups.length + 2) * this.state.lineHeight,
	          zoom = this.state.zoom,
	          canvasWidth = this.state.width * 3,
	          originX = this.state.originX,
	          maxX = originX + this.state.zoom * 3;
	
	      var minUnit = (0, _utils.getMinUnit)(zoom, this.state.width);
	
	      var stripeColor = '#f0f0f0',
	          headerColor = '#ffffff',
	          headerBackgroundColor = '#da2127',
	          gradientBackground = 'repeating-linear-gradient(to top,#ffffff,#ffffff ' + this.state.lineHeight + 'px,' + stripeColor + ' ' + this.state.lineHeight + 'px,' + stripeColor + ' ' + this.state.lineHeight * 2 + 'px)';
	
	      var staticProps = {
	        originX: originX,
	        maxX: maxX,
	        canvasWidth: canvasWidth,
	        lineHeight: this.state.lineHeight
	      };
	
	      var extraProps = {
	        lineCount: this.props.groups.length,
	        minUnit: minUnit
	      };
	
	      var itemProps = {
	        items: this.props.items,
	        groups: this.props.groups,
	        selectedItem: this.state.selectedItem,
	        dragSnap: this.props.dragSnap,
	        minResizeWidth: this.props.minResizeWidth,
	        itemSelect: this.selectItem.bind(this),
	        itemDrag: this.dragItem.bind(this),
	        itemDrop: this.dropItem.bind(this),
	        itemResizing: this.resizingItem.bind(this),
	        itemResized: this.resizedItem.bind(this)
	      };
	
	      var sidebarProps = {
	        groups: this.props.groups,
	
	        width: this.props.sidebarWidth,
	        lineHeight: this.state.lineHeight,
	
	        headerColor: headerColor,
	        headerBackgroundColor: headerBackgroundColor,
	        gradientBackground: gradientBackground
	      };
	
	      var headerProps = {
	        minUnit: minUnit,
	        width: width,
	        zoom: zoom,
	        minTime: this.state.minTime,
	        maxTime: this.state.maxTime,
	        headerColor: headerColor,
	        headerBackgroundColor: headerBackgroundColor,
	        showPeriod: this.showPeriod.bind(this)
	      };
	
	      var scrollComponentStyle = {
	        display: 'inline-block',
	        width: width + 'px',
	        height: height + 'px',
	        verticalAlign: 'top',
	        overflowX: 'scroll',
	        overflowY: 'hidden'
	      };
	
	      var canvasComponentStyle = {
	        position: 'relative',
	        width: canvasWidth + 'px',
	        height: height + 'px',
	        background: gradientBackground
	      };
	
	      return _react2.default.createElement(
	        'div',
	        { style: this.props.style || {}, ref: 'container', className: 'react-calendar-timeline' },
	        _react2.default.createElement(
	          'p',
	          null,
	          _react2.default.createElement(
	            'a',
	            { href: '#', onClick: this.zoomIn.bind(this) },
	            'Zoom in'
	          ),
	          ' | ',
	          _react2.default.createElement(
	            'a',
	            { href: '#', onClick: this.zoomOut.bind(this) },
	            'Zoom out'
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(_Sidebar2.default, sidebarProps),
	          _react2.default.createElement(
	            'div',
	            { ref: 'scrollComponent', style: scrollComponentStyle, onScroll: this.onScroll.bind(this), onWheel: this.onWheel.bind(this) },
	            _react2.default.createElement(
	              'div',
	              { ref: 'canvasComponent', style: canvasComponentStyle, onClick: this.canvasClick.bind(this) },
	              _react2.default.createElement(_TodayLine2.default, _extends({}, staticProps, extraProps)),
	              _react2.default.createElement(_VerticalLines2.default, _extends({}, staticProps, extraProps)),
	              _react2.default.createElement(_Items2.default, _extends({}, staticProps, itemProps)),
	              this.infoLabel() ? _react2.default.createElement(_InfoLabel2.default, { label: this.infoLabel() }) : '',
	              _react2.default.createElement(_Header2.default, _extends({}, staticProps, headerProps))
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return ReactCalendarTimeline;
	})(_react.Component);
	
	exports.default = ReactCalendarTimeline;
	
	ReactCalendarTimeline.propTypes = {
	  groups: _react2.default.PropTypes.array.isRequired,
	  items: _react2.default.PropTypes.array.isRequired,
	  sidebarWidth: _react2.default.PropTypes.number,
	  dragSnap: _react2.default.PropTypes.number,
	  minResizeWidth: _react2.default.PropTypes.number,
	
	  moveItem: _react2.default.PropTypes.func,
	  resizeItem: _react2.default.PropTypes.func
	};
	ReactCalendarTimeline.defaultProps = {
	  sidebarWidth: 150,
	  dragSnap: 1000 * 60 * 15, // 15min
	  minResizeWidth: 20
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Item = __webpack_require__(5);
	
	var _Item2 = _interopRequireDefault(_Item);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Items = (function (_Component) {
	  _inherits(Items, _Component);
	
	  function Items(props) {
	    _classCallCheck(this, Items);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Items).call(this, props));
	  }
	
	  _createClass(Items, [{
	    key: 'getGroupOrders',
	    value: function getGroupOrders() {
	      var groupOrders = {},
	          i = 0;
	
	      this.props.groups.forEach(function (group) {
	        groupOrders[group.id] = i++;
	      });
	
	      return groupOrders;
	    }
	  }, {
	    key: 'getVisibleItems',
	    value: function getVisibleItems(originX, maxX, groupOrders) {
	      return this.props.items.filter(function (item) {
	        return groupOrders.hasOwnProperty(item.group);
	      }).filter(function (item) {
	        var x1 = item.start.getTime(),
	            x2 = item.end.getTime();
	        return x1 >= originX && x1 <= maxX || x1 <= originX && x2 >= maxX || x2 >= originX && x2 <= maxX;
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var groupOrders = this.getGroupOrders(),
	          visibleItems = this.getVisibleItems(this.props.originX, this.props.maxX, groupOrders);
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        visibleItems.map(function (item) {
	          return _react2.default.createElement(_Item2.default, { key: item.id,
	            item: item,
	            originX: _this2.props.originX,
	            maxX: _this2.props.maxX,
	            canvasWidth: _this2.props.canvasWidth,
	            lineHeight: _this2.props.lineHeight,
	            order: groupOrders[item.group],
	            selected: _this2.props.selectedItem === item.id,
	            dragSnap: _this2.props.dragSnap,
	            minResizeWidth: _this2.props.minResizeWidth,
	            onResizing: _this2.props.itemResizing,
	            onResized: _this2.props.itemResized,
	            onDrag: _this2.props.itemDrag,
	            onDrop: _this2.props.itemDrop,
	            onSelect: _this2.props.itemSelect });
	        })
	      );
	    }
	  }]);
	
	  return Items;
	})(_react.Component);
	
	exports.default = Items;
	
	Items.propTypes = {
	  groups: _react2.default.PropTypes.array.isRequired,
	  items: _react2.default.PropTypes.array.isRequired,
	
	  originX: _react2.default.PropTypes.number.isRequired,
	  maxX: _react2.default.PropTypes.number.isRequired,
	  canvasWidth: _react2.default.PropTypes.number.isRequired,
	  lineHeight: _react2.default.PropTypes.number.isRequired,
	
	  dragSnap: _react2.default.PropTypes.number,
	  minResizeWidth: _react2.default.PropTypes.number,
	  selectedItem: _react2.default.PropTypes.string,
	
	  itemSelect: _react2.default.PropTypes.func,
	  itemDrag: _react2.default.PropTypes.func,
	  itemDrop: _react2.default.PropTypes.func,
	  itemResizing: _react2.default.PropTypes.func,
	  itemResized: _react2.default.PropTypes.func
	};
	Items.defaultProps = {};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _function = __webpack_require__(6);
	
	var _function2 = _interopRequireDefault(_function);
	
	var _moment = __webpack_require__(3);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _interact = __webpack_require__(8);
	
	var _interact2 = _interopRequireDefault(_interact);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Item = (function (_Component) {
	  _inherits(Item, _Component);
	
	  function Item(props) {
	    _classCallCheck(this, Item);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Item).call(this, props));
	
	    _this.shouldComponentUpdate = _function2.default;
	
	    _this.state = {
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
	    key: 'coordinateToTimeRatio',
	    value: function coordinateToTimeRatio() {
	      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
	
	      return (props.maxX - props.originX) / props.canvasWidth;
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
	      var item = this.props.item;
	
	      if (this.state.dragging) {
	        var deltaX = e.pageX - this.state.dragStart.x,
	            timeDelta = deltaX * this.coordinateToTimeRatio();
	
	        return this.dragTimeSnap(item.start.getTime() + timeDelta);
	      } else {
	        return item.start.getTime();
	      }
	    }
	  }, {
	    key: 'dragGroupDelta',
	    value: function dragGroupDelta(e) {
	      if (this.state.dragging) {
	        var deltaY = e.pageY - this.state.dragStart.y,
	            groupDelta = Math.round(deltaY / this.props.lineHeight);
	
	        if (this.props.order + groupDelta < 0) {
	          return -this.props.order;
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
	      var length = this.props.item.end - this.props.item.start,
	          timeDelta = this.dragTimeSnap((e.pageX - this.state.resizeStart) * this.coordinateToTimeRatio());
	
	      if (length + timeDelta < (this.props.dragSnap || 1000)) {
	        return (this.props.dragSnap || 1000) - length;
	      } else {
	        return timeDelta;
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
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
	            dragTime: _this2.props.item.start.getTime(),
	            dragGroupDelta: 0
	          });
	        } else {
	          return false;
	        }
	      }).on('dragmove', function (e) {
	        if (_this2.state.dragging) {
	          var dragTime = _this2.dragTime(e),
	              dragGroupDelta = _this2.dragGroupDelta(e);
	
	          if (_this2.props.onDrag) {
	            _this2.props.onDrag(_this2.props.item.id, dragTime, _this2.props.order + dragGroupDelta);
	          }
	
	          _this2.setState({
	            dragTime: dragTime,
	            dragGroupDelta: dragGroupDelta
	          });
	        }
	      }).on('dragend', function (e) {
	        if (_this2.state.dragging) {
	          if (_this2.props.onDrop) {
	            _this2.props.onDrop(_this2.props.item.id, _this2.dragTime(e), _this2.props.order + _this2.dragGroupDelta(e));
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
	            resizeTimeDelta: 0
	          });
	        } else {
	          return false;
	        }
	      }).on('resizemove', function (e) {
	        if (_this2.state.resizing) {
	          if (_this2.props.onResizing) {
	            _this2.props.onResizing(_this2.props.item.id, _this2.props.item.end - _this2.props.item.start + _this2.resizeTimeDelta(e));
	          }
	
	          _this2.setState({
	            resizeTimeDelta: _this2.resizeTimeDelta(e)
	          });
	        }
	      }).on('resizeend', function (e) {
	        if (_this2.state.resizing) {
	          if (_this2.props.onResized && _this2.resizeTimeDelta(e) !== 0) {
	            _this2.props.onResized(_this2.props.item.id, _this2.props.item.end - _this2.props.item.start + _this2.resizeTimeDelta(e));
	          }
	          _this2.setState({
	            resizing: null,
	            resizeStart: null,
	            resizeTimeDelta: null
	          });
	        }
	      });
	    }
	  }, {
	    key: 'canResize',
	    value: function canResize() {
	      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
	
	      var width = parseInt(this.dimensions(props).width);
	      return width >= props.minResizeWidth;
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var couldDrag = this.props.selected,
	          couldResize = this.props.selected && this.canResize(this.props),
	          willBeAbleToDrag = nextProps.selected,
	          willBeAbleToResize = nextProps.selected && this.canResize(nextProps);
	
	      if (couldResize !== willBeAbleToResize) {
	        (0, _interact2.default)(this.refs.item).resizable({ enabled: willBeAbleToResize });
	      }
	      if (couldDrag !== willBeAbleToDrag) {
	        (0, _interact2.default)(this.refs.item).draggable({ enabled: willBeAbleToDrag });
	      }
	    }
	  }, {
	    key: 'onClick',
	    value: function onClick(e) {
	      if (this.props.onSelect) {
	        this.props.onSelect(this.props.item.id);
	      }
	    }
	  }, {
	    key: 'onTouchStart',
	    value: function onTouchStart(e) {
	      this.startedTouching = true;
	    }
	  }, {
	    key: 'onTouchEnd',
	    value: function onTouchEnd(e) {
	      if (this.startedTouching) {
	        this.onClick(e);
	      }
	    }
	  }, {
	    key: 'dimensions',
	    value: function dimensions() {
	      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
	
	      var item = props.item,
	          x = this.state.dragging ? this.state.dragTime : item.start.getTime(),
	          w = Math.max(item.end.getTime() - item.start.getTime() + (this.state.resizing ? this.state.resizeTimeDelta : 0), props.dragSnap),
	          y = (props.order + (this.state.dragging ? this.state.dragGroupDelta : 0) + 0.15 + 2) * props.lineHeight,
	          // +2 for header
	      h = props.lineHeight * 0.65,
	          ratio = 1 / this.coordinateToTimeRatio(props);
	
	      return {
	        left: (x - props.originX) * ratio + 'px',
	        top: y + 'px',
	        width: Math.max(w * ratio, 3) + 'px',
	        height: h + 'px'
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var item = this.props.item,
	          dimensions = this.dimensions();
	
	      return _react2.default.createElement(
	        'div',
	        { key: item.id,
	          ref: 'item',
	          title: item.title,
	          onClick: this.onClick.bind(this),
	          onTouchStart: this.onTouchStart.bind(this),
	          onTouchEnd: this.onTouchEnd.bind(this),
	          className: 'timeline-item',
	          style: {
	            overflow: 'hidden',
	            cursor: this.props.selected ? 'move' : 'pointer',
	            position: 'absolute',
	            boxSizing: 'border-box',
	            left: dimensions.left,
	            top: dimensions.top,
	            width: dimensions.width,
	            height: dimensions.height,
	            lineHeight: dimensions.height,
	            background: this.props.selected ? '#FFC107' : '#2196F3',
	            border: this.props.selected ? '1px solid #FF9800' : '1px solid #1A6FB3',
	            borderRightWidth: this.props.selected && this.canResize(this.props) ? '3px' : '1px',
	            fontSize: '12px',
	            color: 'white',
	            textAlign: 'center' } },
	        item.title
	      );
	    }
	  }]);
	
	  return Item;
	})(_react.Component);
	
	exports.default = Item;
	
	Item.propTypes = {
	  item: _react2.default.PropTypes.object.isRequired,
	  originX: _react2.default.PropTypes.number.isRequired,
	  maxX: _react2.default.PropTypes.number.isRequired,
	  canvasWidth: _react2.default.PropTypes.number.isRequired,
	  lineHeight: _react2.default.PropTypes.number.isRequired,
	  order: _react2.default.PropTypes.number.isRequired,
	
	  dragSnap: _react2.default.PropTypes.number,
	  minResizeWidth: _react2.default.PropTypes.number,
	  selected: _react2.default.PropTypes.bool,
	  onSelect: _react2.default.PropTypes.func,
	  onDrag: _react2.default.PropTypes.func,
	  onDrop: _react2.default.PropTypes.func,
	  onResizing: _react2.default.PropTypes.func,
	  onResized: _react2.default.PropTypes.func
	};
	Item.defaultProps = {
	  selected: false
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = shouldPureComponentUpdate;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _shallowEqual = __webpack_require__(7);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	function shouldPureComponentUpdate(nextProps, nextState) {
	  return !(0, _shallowEqual2['default'])(this.props, nextProps) || !(0, _shallowEqual2['default'])(this.state, nextState);
	}
	
	module.exports = exports['default'];

/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _function = __webpack_require__(6);
	
	var _function2 = _interopRequireDefault(_function);
	
	var _moment = __webpack_require__(3);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var InfoLabel = (function (_Component) {
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
	      var style = {
	        position: 'fixed',
	        left: '100px',
	        bottom: '50px',
	        background: 'rgba(0,0,0,0.5)',
	        color: 'white',
	        padding: '10px',
	        fontSize: '20px',
	        borderRadius: '5px'
	      };
	
	      return _react2.default.createElement(
	        'div',
	        { style: style },
	        this.props.label
	      );
	    }
	  }]);
	
	  return InfoLabel;
	})(_react.Component);
	
	exports.default = InfoLabel;
	
	InfoLabel.propTypes = {
	  label: _react2.default.PropTypes.string.isRequired
	};
	InfoLabel.defaultProps = {
	  label: ''
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Sidebar = (function (_Component) {
	  _inherits(Sidebar, _Component);
	
	  function Sidebar(props) {
	    _classCallCheck(this, Sidebar);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Sidebar).call(this, props));
	  }
	
	  _createClass(Sidebar, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var style = {
	        width: this.props.width - 1 + 'px',
	        height: this.props.lineHeight * (this.props.groups.length + 2) + 'px',
	        borderRight: '1px solid #000',
	        overflow: 'hidden',
	        display: 'inline-block',
	        verticalAlign: 'top',
	        background: this.props.gradientBackground
	      };
	
	      var header = _react2.default.createElement('p', { key: 'sidebar-header',
	        style: {
	          height: this.props.lineHeight * 2 + 'px',
	          lineHeight: this.props.lineHeight + 'px',
	          margin: '0',
	          color: this.props.headerColor,
	          background: this.props.headerBackgroundColor
	        } });
	
	      var groups = this.props.groups.map(function (group) {
	        return _react2.default.createElement(
	          'p',
	          { key: group.id, style: { height: _this2.props.lineHeight + 'px', lineHeight: _this2.props.lineHeight + 'px', margin: '0' } },
	          group.title
	        );
	      });
	
	      return _react2.default.createElement(
	        'div',
	        { style: style },
	        header,
	        groups
	      );
	    }
	  }]);
	
	  return Sidebar;
	})(_react.Component);
	
	exports.default = Sidebar;
	
	Sidebar.propTypes = {
	  groups: _react2.default.PropTypes.array.isRequired,
	  width: _react2.default.PropTypes.number.isRequired,
	  lineHeight: _react2.default.PropTypes.number.isRequired,
	  headerColor: _react2.default.PropTypes.string.isRequired,
	  headerBackgroundColor: _react2.default.PropTypes.string.isRequired,
	  gradientBackground: _react2.default.PropTypes.string.isRequired
	};
	Sidebar.defaultProps = {};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utils = __webpack_require__(12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Header = (function (_Component) {
	  _inherits(Header, _Component);
	
	  function Header(props) {
	    _classCallCheck(this, Header);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).call(this, props));
	  }
	
	  _createClass(Header, [{
	    key: 'getMiddleLine',
	    value: function getMiddleLine(lineHeight, canvasWidth) {
	      return _react2.default.createElement('div', { key: 'label-line',
	        style: {
	          position: 'absolute',
	          top: lineHeight + 'px',
	          left: 0,
	          width: canvasWidth + 'px',
	          height: '1px',
	          lineHeight: '1px',
	          background: '#ccc',
	          overflow: 'hidden'
	        } });
	    }
	  }, {
	    key: 'headerLabel',
	    value: function headerLabel(time, unit, width) {
	      if (unit == 'year') {
	        return time.format(width < 46 ? 'YY' : 'YYYY');
	      } else if (unit == 'month') {
	        return time.format(width < 65 ? 'MM/YY' : width < 75 ? 'MM/YYYY' : width < 120 ? 'MMM YYYY' : 'MMMM YYYY');
	      } else if (unit == 'day') {
	        return time.format(width < 150 ? 'L' : 'LL');
	      } else if (unit == 'hour') {
	        return time.format(width < 50 ? 'HH' : width < 130 ? 'HH:00' : width < 150 ? 'L, HH:00' : 'LL, HH:00');
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
	        return time.format(width < 42 ? 'D' : 'Do');
	      } else if (unit === 'hour') {
	        return time.format(width < 50 ? 'HH' : 'HH:00');
	      } else {
	        return time.get(unit == 'day' ? 'date' : unit);
	      }
	    }
	  }, {
	    key: 'periodClick',
	    value: function periodClick(time, unit) {
	      this.props.showPeriod(time, unit);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var timeLabels = [],
	          originX = this.props.originX,
	          maxX = this.props.maxX,
	          canvasWidth = this.props.canvasWidth,
	          lineHeight = this.props.lineHeight,
	          minUnit = this.props.minUnit,
	          width = this.props.width,
	          zoom = this.props.zoom,
	          ratio = canvasWidth / (maxX - originX);
	
	      (0, _utils.iterateTimes)(originX, maxX, minUnit, function (time, nextTime) {
	        var left = Math.round((time.valueOf() - originX) * ratio, -2),
	            minUnitValue = time.get(minUnit == 'day' ? 'date' : minUnit),
	            firstOfType = minUnitValue == (minUnit == 'day' ? 1 : 0),
	            labelWidth = Math.round((nextTime.valueOf() - time.valueOf()) * ratio, -2),
	            color = firstOfType || labelWidth > 100 ? '#aaa' : '#ccc',
	            width = firstOfType ? 2 : 1;
	
	        timeLabels.push(_react2.default.createElement(
	          'div',
	          { key: 'label-' + time.valueOf(),
	            onClick: _this2.periodClick.bind(_this2, time, minUnit),
	            style: {
	              position: 'absolute',
	              top: (minUnit == 'year' ? 0 : lineHeight) + 'px',
	              left: left + 'px',
	              width: labelWidth + 'px',
	              height: (minUnit == 'year' ? 2 : 1) * lineHeight + 'px',
	              lineHeight: (minUnit == 'year' ? 2 : 1) * lineHeight + 'px',
	              fontSize: labelWidth > 30 ? '14' : labelWidth > 20 ? '12' : '10',
	              overflow: 'hidden',
	              textAlign: 'center',
	              cursor: 'pointer' } },
	          _this2.subHeaderLabel(time, minUnit, labelWidth)
	        ));
	      });
	
	      if (minUnit != 'year') {
	        (function () {
	          var minTime = _this2.props.minTime,
	              maxTime = _this2.props.maxTime,
	              nextUnit = (0, _utils.getNextUnit)(minUnit);
	
	          timeLabels.push(_this2.getMiddleLine(lineHeight, canvasWidth));
	
	          (0, _utils.iterateTimes)(minTime, maxTime, nextUnit, function (time, nextTime) {
	            var startTime = Math.max(minTime, time.valueOf()),
	                endTime = Math.min(maxTime, nextTime.valueOf()),
	                left = Math.round((startTime.valueOf() - originX) * ratio, -2),
	                right = Math.round((endTime.valueOf() - originX) * ratio, -2),
	                labelWidth = right - left;
	
	            timeLabels.push(_react2.default.createElement(
	              'div',
	              { key: 'top-label-' + time.valueOf(),
	                onClick: _this2.periodClick.bind(_this2, time, nextUnit),
	                style: {
	                  position: 'absolute',
	                  top: 0,
	                  left: left + 'px',
	                  width: labelWidth + 'px',
	                  height: lineHeight - 1 + 'px',
	                  lineHeight: lineHeight - 1 + 'px',
	                  fontSize: '14',
	                  overflow: 'hidden',
	                  textAlign: 'center',
	                  cursor: 'pointer' } },
	              _this2.headerLabel(time, nextUnit, labelWidth)
	            ));
	          });
	        })();
	      }
	
	      var headerColor = this.props.headerColor,
	          headerBackgroundColor = this.props.headerBackgroundColor;
	
	      return _react2.default.createElement(
	        'div',
	        { key: 'timeLabels', style: {
	            height: lineHeight * 2 + 'px',
	            lineHeight: lineHeight + 'px',
	            margin: '0',
	            color: headerColor,
	            background: headerBackgroundColor } },
	        timeLabels
	      );
	    }
	  }]);
	
	  return Header;
	})(_react.Component);
	
	exports.default = Header;
	
	Header.propTypes = {
	  // groups: React.PropTypes.array.isRequired,
	  // width: React.PropTypes.number.isRequired,
	  // lineHeight: React.PropTypes.number.isRequired,
	  // headerColor: React.PropTypes.string.isRequired,
	  // headerBackgroundColor: React.PropTypes.string.isRequired,
	  // gradientBackground: React.PropTypes.string.isRequired
	};
	Header.defaultProps = {};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.iterateTimes = iterateTimes;
	exports.getMinUnit = getMinUnit;
	exports.getNextUnit = getNextUnit;
	exports.getParentPosition = getParentPosition;
	
	var _moment = __webpack_require__(3);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function iterateTimes(start, end, unit, callback) {
	  var times = [],
	      time = (0, _moment2.default)(start).startOf(unit);
	
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
	
	  var minUnit = 'year',
	      breakCount = zoom,
	      minCellWidth = 17;
	
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

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _function = __webpack_require__(6);
	
	var _function2 = _interopRequireDefault(_function);
	
	var _utils = __webpack_require__(12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var VerticalLines = (function (_Component) {
	  _inherits(VerticalLines, _Component);
	
	  function VerticalLines(props) {
	    _classCallCheck(this, VerticalLines);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VerticalLines).call(this, props));
	
	    _this.shouldComponentUpdate = _function2.default;
	    return _this;
	  }
	
	  _createClass(VerticalLines, [{
	    key: 'render',
	    value: function render() {
	      var lines = [],
	          originX = this.props.originX,
	          maxX = this.props.maxX,
	          minUnit = this.props.minUnit,
	          ratio = this.props.canvasWidth / (maxX - originX),
	          lineCount = this.props.lineCount,
	          lineHeight = this.props.lineHeight;
	
	      (0, _utils.iterateTimes)(originX, maxX, minUnit, function (time, nextTime) {
	        var left = Math.round((time.valueOf() - originX) * ratio, -2),
	            minUnitValue = time.get(minUnit == 'day' ? 'date' : minUnit),
	            firstOfType = minUnitValue == (minUnit == 'day' ? 1 : 0),
	            labelWidth = Math.round((nextTime.valueOf() - time.valueOf()) * ratio, -2),
	            color = firstOfType || labelWidth > 100 ? '#aaa' : '#ccc',
	            width = firstOfType ? 2 : 1;
	
	        lines.push(_react2.default.createElement('div', { key: 'line-' + time.valueOf(),
	          style: {
	            position: 'absolute',
	            top: (firstOfType || minUnit == 'year' ? 0 : lineHeight) + 'px',
	            left: left - (width == 2 ? 1 : 0) + 'px',
	            width: width + 'px',
	            height: (lineCount + (firstOfType || minUnit == 'year' ? 2 : 1)) * lineHeight + 'px',
	            background: color
	          } }));
	      });
	
	      return _react2.default.createElement(
	        'div',
	        null,
	        lines
	      );
	    }
	  }]);
	
	  return VerticalLines;
	})(_react.Component);
	
	exports.default = VerticalLines;
	
	VerticalLines.propTypes = {
	  originX: _react2.default.PropTypes.number.isRequired,
	  maxX: _react2.default.PropTypes.number.isRequired,
	  canvasWidth: _react2.default.PropTypes.number.isRequired,
	  lineHeight: _react2.default.PropTypes.number.isRequired,
	  lineCount: _react2.default.PropTypes.number.isRequired,
	  minUnit: _react2.default.PropTypes.string.isRequired
	};
	VerticalLines.defaultProps = {};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utils = __webpack_require__(12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TodayLine = (function (_Component) {
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
	
	      if (currentTime > this.props.originX && currentTime < this.props.maxX) {
	        var ratio = this.props.canvasWidth / (this.props.maxX - this.props.originX),
	            left = Math.round((currentTime - this.props.originX) * ratio),
	            top = this.props.lineHeight * 2,
	            height = this.props.lineCount * this.props.lineHeight;
	
	        return _react2.default.createElement('div', { style: {
	            position: 'absolute',
	            top: top + 'px',
	            left: left + 'px',
	            width: '2px',
	            height: height + 'px',
	            background: 'red'
	          } });
	      } else {
	        return _react2.default.createElement('div', null);
	      }
	    }
	  }]);
	
	  return TodayLine;
	})(_react.Component);
	
	exports.default = TodayLine;
	
	TodayLine.propTypes = {
	  originX: _react2.default.PropTypes.number.isRequired,
	  maxX: _react2.default.PropTypes.number.isRequired,
	  canvasWidth: _react2.default.PropTypes.number.isRequired,
	  lineHeight: _react2.default.PropTypes.number.isRequired,
	  lineCount: _react2.default.PropTypes.number.isRequired,
	  minUnit: _react2.default.PropTypes.string.isRequired
	};
	TodayLine.defaultProps = {};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var debounce = __webpack_require__(16),
	    isObject = __webpack_require__(17);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed invocations. Provide an options object to indicate
	 * that `func` should be invoked on the leading and/or trailing edge of the
	 * `wait` timeout. Subsequent calls to the throttled function return the
	 * result of the last `func` call.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	 * on the trailing edge of the timeout only if the the throttled function is
	 * invoked more than once during the `wait` timeout.
	 *
	 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options] The options object.
	 * @param {boolean} [options.leading=true] Specify invoking on the leading
	 *  edge of the timeout.
	 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	 *  edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // avoid excessively updating the position while scrolling
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
	 * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
	 *   'trailing': false
	 * }));
	 *
	 * // cancel a trailing throttled call
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  if (options === false) {
	    leading = false;
	  } else if (isObject(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce(func, wait, { 'leading': leading, 'maxWait': +wait, 'trailing': trailing });
	}
	
	module.exports = throttle;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(17),
	    now = __webpack_require__(18);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed invocations. Provide an options object to indicate that `func`
	 * should be invoked on the leading and/or trailing edge of the `wait` timeout.
	 * Subsequent calls to the debounced function return the result of the last
	 * `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	 * on the trailing edge of the timeout only if the the debounced function is
	 * invoked more than once during the `wait` timeout.
	 *
	 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options] The options object.
	 * @param {boolean} [options.leading=false] Specify invoking on the leading
	 *  edge of the timeout.
	 * @param {number} [options.maxWait] The maximum time `func` is allowed to be
	 *  delayed before it's invoked.
	 * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	 *  edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // avoid costly calculations while the window size is in flux
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
	 * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // ensure `batchLog` is invoked once after 1 second of debounced calls
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', _.debounce(batchLog, 250, {
	 *   'maxWait': 1000
	 * }));
	 *
	 * // cancel a debounced call
	 * var todoChanges = _.debounce(batchLog, 1000);
	 * Object.observe(models.todo, todoChanges);
	 *
	 * Object.observe(models, function(changes) {
	 *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
	 *     todoChanges.cancel();
	 *   }
	 * }, ['delete']);
	 *
	 * // ...at some point `models.todo` is changed
	 * models.todo.completed = true;
	 *
	 * // ...before 1 second has passed `models.todo` is deleted
	 * // which cancels the debounced `todoChanges` call
	 * delete models.todo;
	 */
	function debounce(func, wait, options) {
	  var args,
	      maxTimeoutId,
	      result,
	      stamp,
	      thisArg,
	      timeoutId,
	      trailingCall,
	      lastCalled = 0,
	      maxWait = false,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = wait < 0 ? 0 : (+wait || 0);
	  if (options === true) {
	    var leading = true;
	    trailing = false;
	  } else if (isObject(options)) {
	    leading = !!options.leading;
	    maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	
	  function cancel() {
	    if (timeoutId) {
	      clearTimeout(timeoutId);
	    }
	    if (maxTimeoutId) {
	      clearTimeout(maxTimeoutId);
	    }
	    lastCalled = 0;
	    maxTimeoutId = timeoutId = trailingCall = undefined;
	  }
	
	  function complete(isCalled, id) {
	    if (id) {
	      clearTimeout(id);
	    }
	    maxTimeoutId = timeoutId = trailingCall = undefined;
	    if (isCalled) {
	      lastCalled = now();
	      result = func.apply(thisArg, args);
	      if (!timeoutId && !maxTimeoutId) {
	        args = thisArg = undefined;
	      }
	    }
	  }
	
	  function delayed() {
	    var remaining = wait - (now() - stamp);
	    if (remaining <= 0 || remaining > wait) {
	      complete(trailingCall, maxTimeoutId);
	    } else {
	      timeoutId = setTimeout(delayed, remaining);
	    }
	  }
	
	  function maxDelayed() {
	    complete(trailing, timeoutId);
	  }
	
	  function debounced() {
	    args = arguments;
	    stamp = now();
	    thisArg = this;
	    trailingCall = trailing && (timeoutId || !leading);
	
	    if (maxWait === false) {
	      var leadingCall = leading && !timeoutId;
	    } else {
	      if (!maxTimeoutId && !leading) {
	        lastCalled = stamp;
	      }
	      var remaining = maxWait - (stamp - lastCalled),
	          isCalled = remaining <= 0 || remaining > maxWait;
	
	      if (isCalled) {
	        if (maxTimeoutId) {
	          maxTimeoutId = clearTimeout(maxTimeoutId);
	        }
	        lastCalled = stamp;
	        result = func.apply(thisArg, args);
	      }
	      else if (!maxTimeoutId) {
	        maxTimeoutId = setTimeout(maxDelayed, remaining);
	      }
	    }
	    if (isCalled && timeoutId) {
	      timeoutId = clearTimeout(timeoutId);
	    }
	    else if (!timeoutId && wait !== maxWait) {
	      timeoutId = setTimeout(delayed, wait);
	    }
	    if (leadingCall) {
	      isCalled = true;
	      result = func.apply(thisArg, args);
	    }
	    if (isCalled && !timeoutId && !maxTimeoutId) {
	      args = thisArg = undefined;
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  return debounced;
	}
	
	module.exports = debounce;


/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(19);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeNow = getNative(Date, 'now');
	
	/**
	 * Gets the number of milliseconds that have elapsed since the Unix epoch
	 * (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @category Date
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => logs the number of milliseconds it took for the deferred function to be invoked
	 */
	var now = nativeNow || function() {
	  return new Date().getTime();
	};
	
	module.exports = now;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(20);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	module.exports = getNative;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(21),
	    isObjectLike = __webpack_require__(22);
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = isNative;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(17);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-calendar-timeline.js.map