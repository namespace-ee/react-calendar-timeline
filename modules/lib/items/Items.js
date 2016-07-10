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

var Items = function (_Component) {
  _inherits(Items, _Component);

  function Items() {
    _classCallCheck(this, Items);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Items).apply(this, arguments));
  }

  _createClass(Items, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !((0, _utils.arraysEqual)(nextProps.groups, this.props.groups) && (0, _utils.arraysEqual)(nextProps.items, this.props.items) && nextProps.keys === this.props.keys && nextProps.canvasTimeStart === this.props.canvasTimeStart && nextProps.canvasTimeEnd === this.props.canvasTimeEnd && nextProps.canvasWidth === this.props.canvasWidth && nextProps.selectedItem === this.props.selectedItem && nextProps.lineHeight === this.props.lineHeight && nextProps.dragSnap === this.props.dragSnap && nextProps.minResizeWidth === this.props.minResizeWidth && nextProps.canChangeGroup === this.props.canChangeGroup && nextProps.canMove === this.props.canMove && nextProps.canResize === this.props.canResize && nextProps.dimensionItems === this.props.dimensionItems && nextProps.topOffset === this.props.topOffset);
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
      var dimensionItems = _props.dimensionItems;
      var _props$keys2 = this.props.keys;
      var itemIdKey = _props$keys2.itemIdKey;
      var itemGroupKey = _props$keys2.itemGroupKey;


      var groupOrders = this.getGroupOrders();
      var visibleItems = this.getVisibleItems(canvasTimeStart, canvasTimeEnd, groupOrders);
      var sortedDimensionItems = (0, _utils.keyBy)(dimensionItems, 'id');

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
            dimensions: sortedDimensionItems[(0, _utils._get)(item, itemIdKey)].dimensions,
            selected: _this2.props.selectedItem === (0, _utils._get)(item, itemIdKey),
            canChangeGroup: (0, _utils._get)(item, 'canChangeGroup') !== undefined ? (0, _utils._get)(item, 'canChangeGroup') : _this2.props.canChangeGroup,
            canMove: (0, _utils._get)(item, 'canMove') !== undefined ? (0, _utils._get)(item, 'canMove') : _this2.props.canMove,
            canResize: (0, _utils._get)(item, 'canResize') !== undefined ? (0, _utils._get)(item, 'canResize') : _this2.props.canResize,
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
  selectedItem: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),

  canChangeGroup: _react2.default.PropTypes.bool.isRequired,
  canMove: _react2.default.PropTypes.bool.isRequired,
  canResize: _react2.default.PropTypes.bool.isRequired,

  keys: _react2.default.PropTypes.object.isRequired,

  moveResizeValidator: _react2.default.PropTypes.func,
  itemSelect: _react2.default.PropTypes.func,
  itemDrag: _react2.default.PropTypes.func,
  itemDrop: _react2.default.PropTypes.func,
  itemResizing: _react2.default.PropTypes.func,
  itemResized: _react2.default.PropTypes.func,

  onItemDoubleClick: _react2.default.PropTypes.func,
  onItemContextMenu: _react2.default.PropTypes.func
};
Items.defaultProps = {};