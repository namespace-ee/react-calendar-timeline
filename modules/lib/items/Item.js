'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _interact = require('interact.js');

var _interact2 = _interopRequireDefault(_interact);

var _utils = require('../utils');

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
      var shouldUpdate = !(nextState.dragging !== this.state.dragging && nextState.dragTime !== this.state.dragTime && nextState.dragGroupDelta !== this.state.dragGroupDelta && nextState.resizing !== this.state.resizing && nextState.resizeTime !== this.state.resizeTime && nextProps.keys === this.props.keys && nextProps.selected === this.props.selected && nextProps.item === this.props.item && nextProps.canvasTimeStart === this.props.canvasTimeStart && nextProps.canvasTimeEnd === this.props.canvasTimeEnd && nextProps.canvasWidth === this.props.canvasWidth && nextProps.lineHeight === this.props.lineHeight && nextProps.order === this.props.order && nextProps.dragSnap === this.props.dragSnap && nextProps.minResizeWidth === this.props.minResizeWidth && nextProps.selected === this.props.selected && nextProps.canChangeGroup === this.props.canChangeGroup && nextProps.topOffset === this.props.topOffset && nextProps.canMove === this.props.canMove && nextProps.canResize === this.props.canResize && nextProps.dimensions === this.props.dimensions);
      return shouldUpdate;
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
      var _props = this.props;
      var groupTops = _props.groupTops;
      var order = _props.order;
      var topOffset = _props.topOffset;

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

      var rightResize = this.props.useResizeHandle ? this.refs.dragRight : true;
      (0, _interact2.default)(this.refs.item).resizable({
        edges: { left: false, right: rightResize, top: false, bottom: false },
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
        _this2.actualClick(e, e.pointerType === 'mouse' ? 'click' : 'touch');
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
      var width = parseInt(this.props.dimensions.width, 10);
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
    value: function actualClick(e, clickType) {
      if (this.props.onSelect) {
        this.props.onSelect(this.itemId, clickType);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var dimensions = this.props.dimensions;
      if (typeof this.props.order === 'undefined' || this.props.order === null) {
        return null;
      }

      var classNames = 'rct-item' + (this.props.selected ? ' selected' : '') + (this.canMove(this.props) ? ' can-move' : '') + (this.canResize(this.props) ? ' can-resize' : '') + (this.props.item.className ? ' ' + this.props.item.className : '');

      var style = {
        left: dimensions.left + 'px',
        top: dimensions.top + 'px',
        width: dimensions.width + 'px',
        height: dimensions.height + 'px',
        lineHeight: dimensions.height + 'px'
      };

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
          style: style },
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