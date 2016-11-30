'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _utils = require('../utils');

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