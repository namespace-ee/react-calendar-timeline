'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _interactjs = require('interactjs');

var _interactjs2 = _interopRequireDefault(_interactjs);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _generic = require('../utility/generic');

var _events = require('../utility/events');

var _defaultItemRenderer = require('./defaultItemRenderer');

var _calendar = require('../utility/calendar');

var _domHelpers = require('../utility/dom-helpers');

var _styles = require('./styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_Component) {
  _inherits(Item, _Component);

  function Item(props) {
    _classCallCheck(this, Item);

    var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

    _initialiseProps.call(_this);

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
  // removed prop type check for SPEED!
  // they are coming from a trusted component anyway
  // (this complicates performance debugging otherwise)


  _createClass(Item, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var shouldUpdate = nextState.dragging !== this.state.dragging || nextState.dragTime !== this.state.dragTime || nextState.dragGroupDelta !== this.state.dragGroupDelta || nextState.resizing !== this.state.resizing || nextState.resizeTime !== this.state.resizeTime || nextProps.keys !== this.props.keys || !(0, _generic.deepObjectCompare)(nextProps.itemProps, this.props.itemProps) || nextProps.selected !== this.props.selected || nextProps.item !== this.props.item || nextProps.canvasTimeStart !== this.props.canvasTimeStart || nextProps.canvasTimeEnd !== this.props.canvasTimeEnd || nextProps.canvasWidth !== this.props.canvasWidth || nextProps.order !== this.props.order || nextProps.dragSnap !== this.props.dragSnap || nextProps.minResizeWidth !== this.props.minResizeWidth || nextProps.canChangeGroup !== this.props.canChangeGroup || nextProps.canSelect !== this.props.canSelect || nextProps.canMove !== this.props.canMove || nextProps.canResizeLeft !== this.props.canResizeLeft || nextProps.canResizeRight !== this.props.canResizeRight || nextProps.dimensions !== this.props.dimensions;
      return shouldUpdate;
    }
  }, {
    key: 'cacheDataFromProps',
    value: function cacheDataFromProps(props) {
      this.itemId = (0, _generic._get)(props.item, props.keys.itemIdKey);
      this.itemTitle = (0, _generic._get)(props.item, props.keys.itemTitleKey);
      this.itemDivTitle = props.keys.itemDivTitleKey ? (0, _generic._get)(props.item, props.keys.itemDivTitleKey) : this.itemTitle;
      this.itemTimeStart = (0, _generic._get)(props.item, props.keys.itemTimeStartKey);
      this.itemTimeEnd = (0, _generic._get)(props.item, props.keys.itemTimeEndKey);
    }
  }, {
    key: 'getTimeRatio',
    value: function getTimeRatio() {
      var _props = this.props,
          canvasTimeStart = _props.canvasTimeStart,
          canvasTimeEnd = _props.canvasTimeEnd,
          canvasWidth = _props.canvasWidth;

      return (0, _calendar.coordinateToTimeRatio)(canvasTimeStart, canvasTimeEnd, canvasWidth);
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
      var startTime = (0, _moment2.default)(this.itemTimeStart);

      if (this.state.dragging) {
        return this.dragTimeSnap(this.timeFor(e) + this.state.dragStart.offset, true);
      } else {
        return startTime;
      }
    }
  }, {
    key: 'timeFor',
    value: function timeFor(e) {
      var ratio = (0, _calendar.coordinateToTimeRatio)(this.props.canvasTimeStart, this.props.canvasTimeEnd, this.props.canvasWidth);

      var offset = (0, _domHelpers.getSumOffset)(this.props.scrollRef).offsetLeft;
      var scrolls = (0, _domHelpers.getSumScroll)(this.props.scrollRef);

      return (e.pageX - offset + scrolls.scrollLeft) * ratio + this.props.canvasTimeStart;
    }
  }, {
    key: 'dragGroupDelta',
    value: function dragGroupDelta(e) {
      var _props2 = this.props,
          groupTops = _props2.groupTops,
          order = _props2.order;

      if (this.state.dragging) {
        if (!this.props.canChangeGroup) {
          return 0;
        }
        var groupDelta = 0;

        var offset = (0, _domHelpers.getSumOffset)(this.props.scrollRef).offsetTop;
        var scrolls = (0, _domHelpers.getSumScroll)(this.props.scrollRef);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.keys(groupTops)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            var groupTop = groupTops[key];
            if (e.pageY - offset + scrolls.scrollTop > groupTop) {
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
      var timeDelta = this.dragTimeSnap((e.pageX - this.state.resizeStart) * this.getTimeRatio());

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
    key: 'mountInteract',
    value: function mountInteract() {
      var _this2 = this;

      var leftResize = this.props.useResizeHandle ? ".rct-item-handler-resize-left" : true;
      var rightResize = this.props.useResizeHandle ? ".rct-item-handler-resize-right" : true;

      (0, _interactjs2.default)(this.item).resizable({
        edges: {
          left: this.canResizeLeft() && leftResize,
          right: this.canResizeRight() && rightResize,
          top: false,
          bottom: false
        },
        enabled: this.props.selected && (this.canResizeLeft() || this.canResizeRight())
      }).draggable({
        enabled: this.props.selected
      }).styleCursor(false).on('dragstart', function (e) {
        if (_this2.props.selected) {
          var clickTime = _this2.timeFor(e);
          _this2.setState({
            dragging: true,
            dragStart: {
              x: e.pageX,
              y: e.pageY,
              offset: _this2.itemTimeStart - clickTime },
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
          var resizeTime = _this2.resizeTimeSnap(_this2.timeFor(e));

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

          var resizeTime = _this2.resizeTimeSnap(_this2.timeFor(e));

          if (_this2.props.moveResizeValidator) {
            resizeTime = _this2.props.moveResizeValidator('resize', _this2.props.item, resizeTime, resizeEdge);
          }

          if (_this2.props.onResized) {
            _this2.props.onResized(_this2.itemId, resizeTime, resizeEdge, _this2.resizeTimeDelta(e, resizeEdge));
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

      if (!props.canResizeLeft) {
        return false;
      }
      var width = parseInt(props.dimensions.width, 10);
      return width >= props.minResizeWidth;
    }
  }, {
    key: 'canResizeRight',
    value: function canResizeRight() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      if (!props.canResizeRight) {
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
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      this.cacheDataFromProps(this.props);

      var interactMounted = this.state.interactMounted;

      var couldDrag = this.props.selected && this.canMove(this.props);
      var couldResizeLeft = this.props.selected && this.canResizeLeft(this.props);
      var couldResizeRight = this.props.selected && this.canResizeRight(this.props);
      var willBeAbleToDrag = this.props.selected && this.canMove(this.props);
      var willBeAbleToResizeLeft = this.props.selected && this.canResizeLeft(this.props);
      var willBeAbleToResizeRight = this.props.selected && this.canResizeRight(this.props);

      if (this.props.selected && !interactMounted) {
        this.mountInteract();
        interactMounted = true;
      }

      if (interactMounted && (couldResizeLeft !== willBeAbleToResizeLeft || couldResizeRight !== willBeAbleToResizeRight)) {
        var leftResize = this.props.useResizeHandle ? this.dragLeft : true;
        var rightResize = this.props.useResizeHandle ? this.dragRight : true;

        (0, _interactjs2.default)(this.item).resizable({
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
        (0, _interactjs2.default)(this.item).draggable({ enabled: willBeAbleToDrag });
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
    key: 'getItemStyle',
    value: function getItemStyle(props) {
      var dimensions = this.props.dimensions;

      var baseStyles = {
        position: 'absolute',
        boxSizing: 'border-box',
        left: dimensions.left + 'px',
        top: dimensions.top + 'px',
        width: dimensions.width + 'px',
        height: dimensions.height + 'px',
        lineHeight: dimensions.height + 'px'
      };

      var finalStyle = Object.assign({}, _styles.overridableStyles, this.props.selected ? _styles.selectedStyle : {}, this.props.selected & this.canMove(this.props) ? _styles.selectedAndCanMove : {}, this.props.selected & this.canResizeLeft(this.props) ? _styles.selectedAndCanResizeLeft : {}, this.props.selected & this.canResizeLeft(this.props) & this.state.dragging ? _styles.selectedAndCanResizeLeftAndDragLeft : {}, this.props.selected & this.canResizeRight(this.props) ? _styles.selectedAndCanResizeRight : {}, this.props.selected & this.canResizeRight(this.props) & this.state.dragging ? _styles.selectedAndCanResizeRightAndDragRight : {}, props.style, baseStyles);
      return finalStyle;
    }
  }, {
    key: 'render',
    value: function render() {
      if (typeof this.props.order === 'undefined' || this.props.order === null) {
        return null;
      }

      var timelineContext = this.context.getTimelineContext();
      var itemContext = {
        dimensions: this.props.dimensions,
        useResizeHandle: this.props.useResizeHandle,
        title: this.itemTitle,
        canMove: this.canMove(this.props),
        canResizeLeft: this.canResizeLeft(this.props),
        canResizeRight: this.canResizeRight(this.props),
        selected: this.props.selected,
        dragging: this.state.dragging,
        dragStart: this.state.dragStart,
        dragTime: this.state.dragTime,
        dragGroupDelta: this.state.dragGroupDelta,
        resizing: this.state.resizing,
        resizeEdge: this.state.resizeEdge,
        resizeStart: this.state.resizeStart,
        resizeTime: this.state.resizeTime,
        width: this.props.dimensions.width
      };

      return this.props.itemRenderer({
        item: this.props.item,
        timelineContext: timelineContext,
        itemContext: itemContext,
        getItemProps: this.getItemProps,
        getResizeProps: this.getResizeProps
      });
    }
  }]);

  return Item;
}(_react.Component);

Item.propTypes = {
  canvasTimeStart: _propTypes2.default.number.isRequired,
  canvasTimeEnd: _propTypes2.default.number.isRequired,
  canvasWidth: _propTypes2.default.number.isRequired,
  order: _propTypes2.default.number,

  dragSnap: _propTypes2.default.number,
  minResizeWidth: _propTypes2.default.number,
  selected: _propTypes2.default.bool,

  canChangeGroup: _propTypes2.default.bool.isRequired,
  canMove: _propTypes2.default.bool.isRequired,
  canResizeLeft: _propTypes2.default.bool.isRequired,
  canResizeRight: _propTypes2.default.bool.isRequired,

  keys: _propTypes2.default.object.isRequired,
  item: _propTypes2.default.object.isRequired,

  onSelect: _propTypes2.default.func,
  onDrag: _propTypes2.default.func,
  onDrop: _propTypes2.default.func,
  onResizing: _propTypes2.default.func,
  onResized: _propTypes2.default.func,
  onContextMenu: _propTypes2.default.func,
  itemRenderer: _propTypes2.default.func,

  itemProps: _propTypes2.default.object,
  canSelect: _propTypes2.default.bool,
  dimensions: _propTypes2.default.object,
  groupTops: _propTypes2.default.array,
  useResizeHandle: _propTypes2.default.bool,
  moveResizeValidator: _propTypes2.default.func,
  onItemDoubleClick: _propTypes2.default.func,

  scrollRef: _propTypes2.default.object
};
Item.defaultProps = {
  selected: false,
  itemRenderer: _defaultItemRenderer.defaultItemRenderer
};
Item.contextTypes = {
  getTimelineContext: _propTypes2.default.func
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onMouseDown = function (e) {
    if (!_this3.state.interactMounted) {
      e.preventDefault();
      _this3.startedClicking = true;
    }
  };

  this.onMouseUp = function (e) {
    if (!_this3.state.interactMounted && _this3.startedClicking) {
      _this3.startedClicking = false;
      _this3.actualClick(e, 'click');
    }
  };

  this.onTouchStart = function (e) {
    if (!_this3.state.interactMounted) {
      e.preventDefault();
      _this3.startedTouching = true;
    }
  };

  this.onTouchEnd = function (e) {
    if (!_this3.state.interactMounted && _this3.startedTouching) {
      _this3.startedTouching = false;
      _this3.actualClick(e, 'touch');
    }
  };

  this.handleDoubleClick = function (e) {
    e.stopPropagation();
    if (_this3.props.onItemDoubleClick) {
      _this3.props.onItemDoubleClick(_this3.itemId, e);
    }
  };

  this.handleContextMenu = function (e) {
    if (_this3.props.onContextMenu) {
      e.preventDefault();
      e.stopPropagation();
      _this3.props.onContextMenu(_this3.itemId, e);
    }
  };

  this.getItemRef = function (el) {
    return _this3.item = el;
  };

  this.getDragLeftRef = function (el) {
    return _this3.dragLeft = el;
  };

  this.getDragRightRef = function (el) {
    return _this3.dragRight = el;
  };

  this.getItemProps = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    //TODO: maybe shouldnt include all of these classes
    var classNames = 'rct-item' + (_this3.props.item.className ? ' ' + _this3.props.item.className : '');

    return {
      key: _this3.itemId,
      ref: _this3.getItemRef,
      title: _this3.itemDivTitle,
      className: classNames + (' ' + (props.className ? props.className : '')),
      onMouseDown: (0, _events.composeEvents)(_this3.onMouseDown, props.onMouseDown),
      onMouseUp: (0, _events.composeEvents)(_this3.onMouseUp, props.onMouseUp),
      onTouchStart: (0, _events.composeEvents)(_this3.onTouchStart, props.onTouchStart),
      onTouchEnd: (0, _events.composeEvents)(_this3.onTouchEnd, props.onTouchEnd),
      onDoubleClick: (0, _events.composeEvents)(_this3.handleDoubleClick, props.onDoubleClick),
      onContextMenu: (0, _events.composeEvents)(_this3.handleContextMenu, props.onContextMenu),
      style: Object.assign({}, _this3.getItemStyle(props))
    };
  };

  this.getResizeProps = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var leftName = "rct-item-handler rct-item-handler-left rct-item-handler-resize-left";
    if (props.leftClassName) {
      leftName += ' ' + props.leftClassName;
    }

    var rightName = "rct-item-handler rct-item-handler-right rct-item-handler-resize-right";
    if (props.rightClassName) {
      rightName += ' ' + props.rightClassName;
    }
    return {
      left: {
        ref: _this3.getDragLeftRef,
        className: leftName,
        style: Object.assign({}, _styles.leftResizeStyle, props.leftStyle)
      },
      right: {
        ref: _this3.getDragRightRef,
        className: rightName,
        style: Object.assign({}, _styles.rightResizeStyle, props.rightStyle)
      }
    };
  };
};

exports.default = Item;