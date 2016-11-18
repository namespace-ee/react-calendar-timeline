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

var ItemGroup = function (_Component) {
  _inherits(ItemGroup, _Component);

  function ItemGroup() {
    _classCallCheck(this, ItemGroup);

    return _possibleConstructorReturn(this, (ItemGroup.__proto__ || Object.getPrototypeOf(ItemGroup)).apply(this, arguments));
  }

  _createClass(ItemGroup, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !((0, _utils.arraysEqual)(nextProps.groups, this.props.groups) && (0, _utils.arraysEqual)(nextProps.items, this.props.items) && (0, _utils.arraysEqual)(Object.keys(nextProps.groupOrders), Object.keys(this.props.groupOrders)) && nextProps.keys === this.props.keys && nextProps.canvasTimeStart === this.props.canvasTimeStart && nextProps.canvasTimeEnd === this.props.canvasTimeEnd && nextProps.canvasWidth === this.props.canvasWidth && nextProps.selectedItem === this.props.selectedItem && nextProps.lineHeight === this.props.lineHeight && nextProps.dragSnap === this.props.dragSnap && nextProps.minResizeWidth === this.props.minResizeWidth && nextProps.canChangeGroup === this.props.canChangeGroup && nextProps.canMove === this.props.canMove && nextProps.canResize === this.props.canResize);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // const { canvasTimeStart, canvasTimeEnd } = this.props
      var _props$keys = this.props.keys,
          itemIdKey = _props$keys.itemIdKey,
          itemGroupKey = _props$keys.itemGroupKey;


      var groupOrders = this.props.groupOrders;
      var visibleItems = this.props.items;

      return _react2.default.createElement(
        'div',
        { className: 'rct-item-group' },
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
            onDrag: _this2.props.itemDrag,
            onDrop: _this2.props.itemDrop,
            onSelect: _this2.props.itemSelect });
        })
      );
    }
  }]);

  return ItemGroup;
}(_react.Component);

// they were all checked in Items


exports.default = ItemGroup;
ItemGroup.propTypes = {
  // groups: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]).isRequired,
  // items: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]).isRequired,
  // groupOrders: React.PropTypes.object.isRequired,
  //
  // canvasTimeStart: React.PropTypes.number.isRequired,
  // canvasTimeEnd: React.PropTypes.number.isRequired,
  // canvasWidth: React.PropTypes.number.isRequired,
  // lineHeight: React.PropTypes.number.isRequired,
  //
  // dragSnap: React.PropTypes.number,
  // minResizeWidth: React.PropTypes.number,
  // selectedItem: React.PropTypes.string,
  //
  // canChangeGroup: React.PropTypes.bool.isRequired,
  // canMove: React.PropTypes.bool.isRequired,
  // canResize: React.PropTypes.bool.isRequired,
  //
  // keys: React.PropTypes.object.isRequired,
  //
  // itemSelect: React.PropTypes.func,
  // itemDrag: React.PropTypes.func,
  // itemDrop: React.PropTypes.func,
  // itemResizing: React.PropTypes.func,
  // itemResized: React.PropTypes.func
};
ItemGroup.defaultProps = {};