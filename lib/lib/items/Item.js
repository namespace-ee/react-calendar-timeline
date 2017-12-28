'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _interact = require('interact.js');

var _interact2 = _interopRequireDefault(_interact);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../utils');

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

    _this.onMouseDown = function () {
      return _this.__onMouseDown__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.onMouseUp = function () {
      return _this.__onMouseUp__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.onTouchStart = function () {
      return _this.__onTouchStart__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.onTouchEnd = function () {
      return _this.__onTouchEnd__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleDoubleClick = function () {
      return _this.__handleDoubleClick__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.handleContextMenu = function () {
      return _this.__handleContextMenu__REACT_HOT_LOADER__.apply(_this, arguments);
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
    key: '__handleContextMenu__REACT_HOT_LOADER__',
    value: function __handleContextMenu__REACT_HOT_LOADER__() {
      return this.__handleContextMenu__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__handleDoubleClick__REACT_HOT_LOADER__',
    value: function __handleDoubleClick__REACT_HOT_LOADER__() {
      return this.__handleDoubleClick__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onTouchEnd__REACT_HOT_LOADER__',
    value: function __onTouchEnd__REACT_HOT_LOADER__() {
      return this.__onTouchEnd__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onTouchStart__REACT_HOT_LOADER__',
    value: function __onTouchStart__REACT_HOT_LOADER__() {
      return this.__onTouchStart__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onMouseUp__REACT_HOT_LOADER__',
    value: function __onMouseUp__REACT_HOT_LOADER__() {
      return this.__onMouseUp__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onMouseDown__REACT_HOT_LOADER__',
    value: function __onMouseDown__REACT_HOT_LOADER__() {
      return this.__onMouseDown__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var shouldUpdate = nextState.dragging !== this.state.dragging || nextState.dragTime !== this.state.dragTime || nextState.dragGroupDelta !== this.state.dragGroupDelta || nextState.resizing !== this.state.resizing || nextState.resizeTime !== this.state.resizeTime || nextProps.keys !== this.props.keys || !(0, _utils.deepObjectCompare)(nextProps.itemProps, this.props.itemProps) || nextProps.selected !== this.props.selected || nextProps.item !== this.props.item || nextProps.canvasTimeStart !== this.props.canvasTimeStart || nextProps.canvasTimeEnd !== this.props.canvasTimeEnd || nextProps.canvasWidth !== this.props.canvasWidth || nextProps.order !== this.props.order || nextProps.dragSnap !== this.props.dragSnap || nextProps.minResizeWidth !== this.props.minResizeWidth || nextProps.canChangeGroup !== this.props.canChangeGroup || nextProps.canSelect !== this.props.canSelect || nextProps.topOffset !== this.props.topOffset || nextProps.canMove !== this.props.canMove || nextProps.canResizeLeft !== this.props.canResizeLeft || nextProps.canResizeRight !== this.props.canResizeRight || nextProps.dimensions !== this.props.dimensions;
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
      }).styleCursor(false).on('dragstart', function (e) {
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
    key: '__onMouseDown__REACT_HOT_LOADER__',
    value: function __onMouseDown__REACT_HOT_LOADER__(e) {
      if (!this.state.interactMounted) {
        e.preventDefault();
        this.startedClicking = true;
      }
    }
  }, {
    key: '__onMouseUp__REACT_HOT_LOADER__',
    value: function __onMouseUp__REACT_HOT_LOADER__(e) {
      if (!this.state.interactMounted && this.startedClicking) {
        this.startedClicking = false;
        this.actualClick(e, 'click');
      }
    }
  }, {
    key: '__onTouchStart__REACT_HOT_LOADER__',
    value: function __onTouchStart__REACT_HOT_LOADER__(e) {
      if (!this.state.interactMounted) {
        e.preventDefault();
        this.startedTouching = true;
      }
    }
  }, {
    key: '__onTouchEnd__REACT_HOT_LOADER__',
    value: function __onTouchEnd__REACT_HOT_LOADER__(e) {
      if (!this.state.interactMounted && this.startedTouching) {
        this.startedTouching = false;
        this.actualClick(e, 'touch');
      }
    }
  }, {
    key: '__handleDoubleClick__REACT_HOT_LOADER__',
    value: function __handleDoubleClick__REACT_HOT_LOADER__(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.props.onItemDoubleClick) {
        this.props.onItemDoubleClick(this.itemId, e);
      }
    }
  }, {
    key: '__handleContextMenu__REACT_HOT_LOADER__',
    value: function __handleContextMenu__REACT_HOT_LOADER__(e) {
      if (this.props.onContextMenu) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onContextMenu(this.itemId, e);
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
    key: 'renderContent',
    value: function renderContent() {
      var Comp = this.props.itemRenderer;
      if (Comp) {
        return _react2.default.createElement(Comp, { item: this.props.item });
      } else {
        return this.itemTitle;
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
            this.renderContent()
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
  // onContextMenu: React.PropTypes.func,
  // itemRenderer: React.PropTypes.func
};
Item.defaultProps = {
  selected: false
};
var _default = Item;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Item, 'Item', 'src/lib/items/Item.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/items/Item.js');
}();

;