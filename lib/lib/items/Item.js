"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _interactjs = _interopRequireDefault(require("interactjs"));

var _moment = _interopRequireDefault(require("moment"));

var _generic = require("../utility/generic");

var _events = require("../utility/events");

var _defaultItemRenderer = require("./defaultItemRenderer");

var _calendar = require("../utility/calendar");

var _domHelpers = require("../utility/dom-helpers");

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Item =
/*#__PURE__*/
function (_Component) {
  _inherits(Item, _Component);

  // removed prop type check for SPEED!
  // they are coming from a trusted component anyway
  // (this complicates performance debugging otherwise)
  function Item(_props) {
    var _this;

    _classCallCheck(this, Item);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Item).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function (e) {
      if (!_this.state.interactMounted) {
        e.preventDefault();
        _this.startedClicking = true;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function (e) {
      if (!_this.state.interactMounted && _this.startedClicking) {
        _this.startedClicking = false;

        _this.actualClick(e, 'click');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onTouchStart", function (e) {
      if (!_this.state.interactMounted) {
        e.preventDefault();
        _this.startedTouching = true;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onTouchEnd", function (e) {
      if (!_this.state.interactMounted && _this.startedTouching) {
        _this.startedTouching = false;

        _this.actualClick(e, 'touch');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleDoubleClick", function (e) {
      e.stopPropagation();

      if (_this.props.onItemDoubleClick) {
        _this.props.onItemDoubleClick(_this.itemId, e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleContextMenu", function (e) {
      if (_this.props.onContextMenu) {
        e.preventDefault();
        e.stopPropagation();

        _this.props.onContextMenu(_this.itemId, e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getItemRef", function (el) {
      return _this.item = el;
    });

    _defineProperty(_assertThisInitialized(_this), "getDragLeftRef", function (el) {
      return _this.dragLeft = el;
    });

    _defineProperty(_assertThisInitialized(_this), "getDragRightRef", function (el) {
      return _this.dragRight = el;
    });

    _defineProperty(_assertThisInitialized(_this), "getItemProps", function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      //TODO: maybe shouldnt include all of these classes
      var classNames = 'rct-item' + (_this.props.item.className ? " ".concat(_this.props.item.className) : '');
      return {
        key: _this.itemId,
        ref: _this.getItemRef,
        title: _this.itemDivTitle,
        className: classNames + " ".concat(props.className ? props.className : ''),
        onMouseDown: (0, _events.composeEvents)(_this.onMouseDown, props.onMouseDown),
        onMouseUp: (0, _events.composeEvents)(_this.onMouseUp, props.onMouseUp),
        onTouchStart: (0, _events.composeEvents)(_this.onTouchStart, props.onTouchStart),
        onTouchEnd: (0, _events.composeEvents)(_this.onTouchEnd, props.onTouchEnd),
        onDoubleClick: (0, _events.composeEvents)(_this.handleDoubleClick, props.onDoubleClick),
        onContextMenu: (0, _events.composeEvents)(_this.handleContextMenu, props.onContextMenu),
        style: Object.assign({}, _this.getItemStyle(props))
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getResizeProps", function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var leftName = "rct-item-handler rct-item-handler-left rct-item-handler-resize-left";

      if (props.leftClassName) {
        leftName += " ".concat(props.leftClassName);
      }

      var rightName = "rct-item-handler rct-item-handler-right rct-item-handler-resize-right";

      if (props.rightClassName) {
        rightName += " ".concat(props.rightClassName);
      }

      return {
        left: {
          ref: _this.getDragLeftRef,
          className: leftName,
          style: Object.assign({}, _styles.leftResizeStyle, props.leftStyle)
        },
        right: {
          ref: _this.getDragRightRef,
          className: rightName,
          style: Object.assign({}, _styles.rightResizeStyle, props.rightStyle)
        }
      };
    });

    _this.cacheDataFromProps(_props);

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
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var shouldUpdate = nextState.dragging !== this.state.dragging || nextState.dragTime !== this.state.dragTime || nextState.dragGroupDelta !== this.state.dragGroupDelta || nextState.resizing !== this.state.resizing || nextState.resizeTime !== this.state.resizeTime || nextProps.keys !== this.props.keys || !(0, _generic.deepObjectCompare)(nextProps.itemProps, this.props.itemProps) || nextProps.selected !== this.props.selected || nextProps.item !== this.props.item || nextProps.canvasTimeStart !== this.props.canvasTimeStart || nextProps.canvasTimeEnd !== this.props.canvasTimeEnd || nextProps.canvasWidth !== this.props.canvasWidth || (nextProps.order ? nextProps.order.index : undefined) !== (this.props.order ? this.props.order.index : undefined) || nextProps.dragSnap !== this.props.dragSnap || nextProps.minResizeWidth !== this.props.minResizeWidth || nextProps.canChangeGroup !== this.props.canChangeGroup || nextProps.canSelect !== this.props.canSelect || nextProps.canMove !== this.props.canMove || nextProps.canResizeLeft !== this.props.canResizeLeft || nextProps.canResizeRight !== this.props.canResizeRight || nextProps.dimensions !== this.props.dimensions;
      return shouldUpdate;
    }
  }, {
    key: "cacheDataFromProps",
    value: function cacheDataFromProps(props) {
      this.itemId = (0, _generic._get)(props.item, props.keys.itemIdKey);
      this.itemTitle = (0, _generic._get)(props.item, props.keys.itemTitleKey);
      this.itemDivTitle = props.keys.itemDivTitleKey ? (0, _generic._get)(props.item, props.keys.itemDivTitleKey) : this.itemTitle;
      this.itemTimeStart = (0, _generic._get)(props.item, props.keys.itemTimeStartKey);
      this.itemTimeEnd = (0, _generic._get)(props.item, props.keys.itemTimeEndKey);
    }
  }, {
    key: "getTimeRatio",
    value: function getTimeRatio() {
      var _this$props = this.props,
          canvasTimeStart = _this$props.canvasTimeStart,
          canvasTimeEnd = _this$props.canvasTimeEnd,
          canvasWidth = _this$props.canvasWidth;
      return (0, _calendar.coordinateToTimeRatio)(canvasTimeStart, canvasTimeEnd, canvasWidth);
    }
  }, {
    key: "dragTimeSnap",
    value: function dragTimeSnap(dragTime, considerOffset) {
      var dragSnap = this.props.dragSnap;

      if (dragSnap) {
        var offset = considerOffset ? (0, _moment["default"])().utcOffset() * 60 * 1000 : 0;
        return Math.round(dragTime / dragSnap) * dragSnap - offset % dragSnap;
      } else {
        return dragTime;
      }
    }
  }, {
    key: "resizeTimeSnap",
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
    key: "dragTime",
    value: function dragTime(e) {
      var startTime = (0, _moment["default"])(this.itemTimeStart);

      if (this.state.dragging) {
        return this.dragTimeSnap(this.timeFor(e) + this.state.dragStart.offset, true);
      } else {
        return startTime;
      }
    }
  }, {
    key: "timeFor",
    value: function timeFor(e) {
      var ratio = (0, _calendar.coordinateToTimeRatio)(this.props.canvasTimeStart, this.props.canvasTimeEnd, this.props.canvasWidth);
      var offset = (0, _domHelpers.getSumOffset)(this.props.scrollRef).offsetLeft;
      var scrolls = (0, _domHelpers.getSumScroll)(this.props.scrollRef);
      return (e.pageX - offset + scrolls.scrollLeft) * ratio + this.props.canvasTimeStart;
    }
  }, {
    key: "dragGroupDelta",
    value: function dragGroupDelta(e) {
      var _this$props2 = this.props,
          groupTops = _this$props2.groupTops,
          order = _this$props2.order;

      if (this.state.dragging) {
        if (!this.props.canChangeGroup) {
          return 0;
        }

        var groupDelta = 0;
        var offset = (0, _domHelpers.getSumOffset)(this.props.scrollRef).offsetTop;
        var scrolls = (0, _domHelpers.getSumScroll)(this.props.scrollRef);

        for (var _i = 0, _Object$keys = Object.keys(groupTops); _i < _Object$keys.length; _i++) {
          var key = _Object$keys[_i];
          var groupTop = groupTops[key];

          if (e.pageY - offset + scrolls.scrollTop > groupTop) {
            groupDelta = parseInt(key, 10) - order.index;
          } else {
            break;
          }
        }

        if (this.props.order.index + groupDelta < 0) {
          return 0 - this.props.order.index;
        } else {
          return groupDelta;
        }
      } else {
        return 0;
      }
    }
  }, {
    key: "resizeTimeDelta",
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
    key: "mountInteract",
    value: function mountInteract() {
      var _this2 = this;

      var leftResize = this.props.useResizeHandle ? ".rct-item-handler-resize-left" : true;
      var rightResize = this.props.useResizeHandle ? ".rct-item-handler-resize-right" : true;
      (0, _interactjs["default"])(this.item).resizable({
        edges: {
          left: this.canResizeLeft() && leftResize,
          right: this.canResizeRight() && rightResize,
          top: false,
          bottom: false
        },
        enabled: this.props.selected && (this.canResizeLeft() || this.canResizeRight())
      }).draggable({
        enabled: this.props.selected && this.canMove()
      }).styleCursor(false).on('dragstart', function (e) {
        if (_this2.props.selected) {
          var clickTime = _this2.timeFor(e);

          _this2.setState({
            dragging: true,
            dragStart: {
              x: e.pageX,
              y: e.pageY,
              offset: _this2.itemTimeStart - clickTime
            },
            preDragPosition: {
              x: e.target.offsetLeft,
              y: e.target.offsetTop
            },
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
            _this2.props.onDrag(_this2.itemId, dragTime, _this2.props.order.index + dragGroupDelta);
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

            _this2.props.onDrop(_this2.itemId, dragTime, _this2.props.order.index + _this2.dragGroupDelta(e));
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
            resizeEdge: null,
            // we don't know yet
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

            _this2.setState({
              resizeEdge: resizeEdge
            });
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
    key: "canResizeLeft",
    value: function canResizeLeft() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      if (!props.canResizeLeft) {
        return false;
      }

      var width = parseInt(props.dimensions.width, 10);
      return width >= props.minResizeWidth;
    }
  }, {
    key: "canResizeRight",
    value: function canResizeRight() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      if (!props.canResizeRight) {
        return false;
      }

      var width = parseInt(props.dimensions.width, 10);
      return width >= props.minResizeWidth;
    }
  }, {
    key: "canMove",
    value: function canMove() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      return !!props.canMove;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.cacheDataFromProps(this.props);
      var interactMounted = this.state.interactMounted;
      var couldDrag = prevProps.selected && this.canMove(prevProps);
      var couldResizeLeft = prevProps.selected && this.canResizeLeft(prevProps);
      var couldResizeRight = prevProps.selected && this.canResizeRight(prevProps);
      var willBeAbleToDrag = this.props.selected && this.canMove(this.props);
      var willBeAbleToResizeLeft = this.props.selected && this.canResizeLeft(this.props);
      var willBeAbleToResizeRight = this.props.selected && this.canResizeRight(this.props);

      if (!!this.item) {
        if (this.props.selected && !interactMounted) {
          this.mountInteract();
          interactMounted = true;
        }

        if (interactMounted && (couldResizeLeft !== willBeAbleToResizeLeft || couldResizeRight !== willBeAbleToResizeRight)) {
          var leftResize = this.props.useResizeHandle ? this.dragLeft : true;
          var rightResize = this.props.useResizeHandle ? this.dragRight : true;
          (0, _interactjs["default"])(this.item).resizable({
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
          (0, _interactjs["default"])(this.item).draggable({
            enabled: willBeAbleToDrag
          });
        }
      } else {
        interactMounted = false;
      }

      this.setState({
        interactMounted: interactMounted
      });
    }
  }, {
    key: "actualClick",
    value: function actualClick(e, clickType) {
      if (this.props.canSelect && this.props.onSelect) {
        this.props.onSelect(this.itemId, clickType, e);
      }
    }
  }, {
    key: "getItemStyle",
    value: function getItemStyle(props) {
      var dimensions = this.props.dimensions;
      var baseStyles = {
        position: 'absolute',
        boxSizing: 'border-box',
        left: "".concat(dimensions.left, "px"),
        top: "".concat(dimensions.top, "px"),
        width: "".concat(dimensions.width, "px"),
        height: "".concat(dimensions.height, "px"),
        lineHeight: "".concat(dimensions.height, "px")
      };
      var finalStyle = Object.assign({}, _styles.overridableStyles, this.props.selected ? _styles.selectedStyle : {}, this.props.selected & this.canMove(this.props) ? _styles.selectedAndCanMove : {}, this.props.selected & this.canResizeLeft(this.props) ? _styles.selectedAndCanResizeLeft : {}, this.props.selected & this.canResizeLeft(this.props) & this.state.dragging ? _styles.selectedAndCanResizeLeftAndDragLeft : {}, this.props.selected & this.canResizeRight(this.props) ? _styles.selectedAndCanResizeRight : {}, this.props.selected & this.canResizeRight(this.props) & this.state.dragging ? _styles.selectedAndCanResizeRightAndDragRight : {}, props.style, baseStyles);
      return finalStyle;
    }
  }, {
    key: "render",
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

exports["default"] = Item;

_defineProperty(Item, "propTypes", {
  canvasTimeStart: _propTypes["default"].number.isRequired,
  canvasTimeEnd: _propTypes["default"].number.isRequired,
  canvasWidth: _propTypes["default"].number.isRequired,
  order: _propTypes["default"].object,
  dragSnap: _propTypes["default"].number,
  minResizeWidth: _propTypes["default"].number,
  selected: _propTypes["default"].bool,
  canChangeGroup: _propTypes["default"].bool.isRequired,
  canMove: _propTypes["default"].bool.isRequired,
  canResizeLeft: _propTypes["default"].bool.isRequired,
  canResizeRight: _propTypes["default"].bool.isRequired,
  keys: _propTypes["default"].object.isRequired,
  item: _propTypes["default"].object.isRequired,
  onSelect: _propTypes["default"].func,
  onDrag: _propTypes["default"].func,
  onDrop: _propTypes["default"].func,
  onResizing: _propTypes["default"].func,
  onResized: _propTypes["default"].func,
  onContextMenu: _propTypes["default"].func,
  itemRenderer: _propTypes["default"].func,
  itemProps: _propTypes["default"].object,
  canSelect: _propTypes["default"].bool,
  dimensions: _propTypes["default"].object,
  groupTops: _propTypes["default"].array,
  useResizeHandle: _propTypes["default"].bool,
  moveResizeValidator: _propTypes["default"].func,
  onItemDoubleClick: _propTypes["default"].func,
  scrollRef: _propTypes["default"].object
});

_defineProperty(Item, "defaultProps", {
  selected: false,
  itemRenderer: _defaultItemRenderer.defaultItemRenderer
});

_defineProperty(Item, "contextTypes", {
  getTimelineContext: _propTypes["default"].func
});