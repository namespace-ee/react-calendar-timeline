'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _generic = require('../utility/generic');

var _calendar = require('../utility/calendar');

var _Connection = require('./Connection');

var _Connection2 = _interopRequireDefault(_Connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import ItemGroup from './ItemGroup'

var canResizeLeft = function canResizeLeft(item, canResize) {
  var value = (0, _generic._get)(item, 'canResize') !== undefined ? (0, _generic._get)(item, 'canResize') : canResize;
  return value === 'left' || value === 'both';
};

var canResizeRight = function canResizeRight(item, canResize) {
  var value = (0, _generic._get)(item, 'canResize') !== undefined ? (0, _generic._get)(item, 'canResize') : canResize;
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
    value: function shouldComponentUpdate(nextProps) {
      return !((0, _generic.arraysEqual)(nextProps.groups, this.props.groups) && (0, _generic.arraysEqual)(nextProps.items, this.props.items) && (0, _generic.arraysEqual)(nextProps.connections, this.props.connections) && (0, _generic.arraysEqual)(nextProps.dimensionItems, this.props.dimensionItems) && nextProps.keys === this.props.keys && nextProps.canvasTimeStart === this.props.canvasTimeStart && nextProps.canvasTimeEnd === this.props.canvasTimeEnd && nextProps.canvasWidth === this.props.canvasWidth && nextProps.selectedItem === this.props.selectedItem && nextProps.selected === this.props.selected && nextProps.dragSnap === this.props.dragSnap && nextProps.minResizeWidth === this.props.minResizeWidth && nextProps.canChangeGroup === this.props.canChangeGroup && nextProps.canMove === this.props.canMove && nextProps.canResize === this.props.canResize && nextProps.canSelect === this.props.canSelect);
    }
  }, {
    key: 'getGroupOrders',
    value: function getGroupOrders() {
      var _props = this.props,
          keys = _props.keys,
          groups = _props.groups;


      return (0, _calendar.getGroupOrders)(groups, keys);
    }
  }, {
    key: 'isSelected',
    value: function isSelected(item, itemIdKey) {
      if (!this.props.selected) {
        return this.props.selectedItem === (0, _generic._get)(item, itemIdKey);
      } else {
        var target = (0, _generic._get)(item, itemIdKey);
        return this.props.selected.includes(target);
      }
    }
  }, {
    key: 'isLineSelected',
    value: function isLineSelected(line) {
      if (!this.props.selected) {
        return false;
      } else {
        return this.props.selected.includes(line.startId) || this.props.selected.includes(line.endId);
      }
    }
  }, {
    key: 'calcDimensionConnections',
    value: function calcDimensionConnections(items, connections) {
      function calculate(id, start, end, warning) {
        var _start$dimensions = start.dimensions,
            st = _start$dimensions.top,
            sl = _start$dimensions.left,
            sw = _start$dimensions.width,
            sh = _start$dimensions.height;
        var _end$dimensions = end.dimensions,
            et = _end$dimensions.top,
            el = _end$dimensions.left,
            eh = _end$dimensions.height;


        var startX = sl + sw;
        var startY = st + sh / 2;
        var endX = el;
        var endY = et + eh / 2;
        var width = Math.abs(endX - startX);

        var startPoint = [startX, startY];
        var controlPoint = [startX + width / 2, startY];
        var controlPoint2 = [endX - width / 2, endY];
        var endPoint = [endX, endY];

        return {
          id: id,
          startId: start.id,
          endId: end.id,
          startPoint: startPoint,
          controlPoint: controlPoint,
          controlPoint2: controlPoint2,
          endPoint: endPoint,
          warning: warning
        };
      }
      var lines = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = connections[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var line = _step.value;

          if (!items[line.start] || !items[line.end]) continue;
          lines.push(calculate(line.id, items[line.start], items[line.end], line.warning));
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

      return lines;
    }
  }, {
    key: 'getVisibleItems',
    value: function getVisibleItems(canvasTimeStart, canvasTimeEnd) {
      var _props2 = this.props,
          keys = _props2.keys,
          items = _props2.items;


      return (0, _calendar.getVisibleItems)(items, canvasTimeStart, canvasTimeEnd, keys);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          canvasTimeStart = _props3.canvasTimeStart,
          canvasTimeEnd = _props3.canvasTimeEnd,
          dimensionItems = _props3.dimensionItems,
          connections = _props3.connections;
      var _props$keys = this.props.keys,
          itemIdKey = _props$keys.itemIdKey,
          itemGroupKey = _props$keys.itemGroupKey;


      var groupOrders = this.getGroupOrders();
      var visibleItems = this.getVisibleItems(canvasTimeStart, canvasTimeEnd, groupOrders);
      var sortedDimensionItems = (0, _generic.keyBy)(dimensionItems, 'id');
      var dimensionConnections = this.calcDimensionConnections(sortedDimensionItems, connections);
      // console.log('@@@@',sortedDimensionItems)

      return _react2.default.createElement(
        'div',
        { className: 'rct-items' },
        visibleItems.filter(function (item) {
          return sortedDimensionItems[(0, _generic._get)(item, itemIdKey)];
        }).map(function (item) {
          return _react2.default.createElement(_Item2.default, {
            key: (0, _generic._get)(item, itemIdKey),
            item: item,
            keys: _this2.props.keys,
            order: groupOrders[(0, _generic._get)(item, itemGroupKey)],
            dimensions: sortedDimensionItems[(0, _generic._get)(item, itemIdKey)].dimensions,
            selected: _this2.isSelected(item, itemIdKey),
            canChangeGroup: (0, _generic._get)(item, 'canChangeGroup') !== undefined ? (0, _generic._get)(item, 'canChangeGroup') : _this2.props.canChangeGroup,
            canMove: (0, _generic._get)(item, 'canMove') !== undefined ? (0, _generic._get)(item, 'canMove') : _this2.props.canMove,
            canResizeLeft: canResizeLeft(item, _this2.props.canResize),
            canResizeRight: canResizeRight(item, _this2.props.canResize),
            canSelect: (0, _generic._get)(item, 'canSelect') !== undefined ? (0, _generic._get)(item, 'canSelect') : _this2.props.canSelect,
            useResizeHandle: _this2.props.useResizeHandle,
            groupTops: _this2.props.groupTops,
            canvasTimeStart: _this2.props.canvasTimeStart,
            canvasTimeEnd: _this2.props.canvasTimeEnd,
            canvasWidth: _this2.props.canvasWidth,
            dragSnap: _this2.props.dragSnap,
            minResizeWidth: _this2.props.minResizeWidth,
            onResizing: _this2.props.itemResizing,
            onResized: _this2.props.itemResized,
            moveResizeValidator: _this2.props.moveResizeValidator,
            onDrag: _this2.props.itemDrag,
            onDrop: _this2.props.itemDrop,
            onPointEnter: _this2.props.onPointEnter,
            onPointDrop: _this2.props.onPointDrop,
            onPointLeave: _this2.props.onPointLeave,
            onItemDoubleClick: _this2.props.onItemDoubleClick,
            onContextMenu: _this2.props.onItemContextMenu,
            onSelect: _this2.props.itemSelect,
            itemRenderer: _this2.props.itemRenderer,
            scrollRef: _this2.props.scrollRef
          });
        }),
        _react2.default.createElement(
          'svg',
          {
            id: 'svg-canvas',
            width: '3000',
            viewBox: '0 0 3000 800',
            style: { zIndex: 70, position: 'relative' }
          },
          dimensionConnections.map(function (line, i) {
            return _react2.default.createElement(_Connection2.default, _extends({}, line, { selected: _this2.isLineSelected(line), key: i }));
          })
        )
      );
    }
  }]);

  return Items;
}(_react.Component);

Items.propTypes = {
  groups: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]).isRequired,
  items: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]).isRequired,
  connections: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),

  canvasTimeStart: _propTypes2.default.number.isRequired,
  canvasTimeEnd: _propTypes2.default.number.isRequired,
  canvasWidth: _propTypes2.default.number.isRequired,

  dragSnap: _propTypes2.default.number,
  minResizeWidth: _propTypes2.default.number,
  selectedItem: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  canChangeGroup: _propTypes2.default.bool.isRequired,
  canMove: _propTypes2.default.bool.isRequired,
  canResize: _propTypes2.default.oneOf([true, false, 'left', 'right', 'both']),
  canSelect: _propTypes2.default.bool,

  keys: _propTypes2.default.object.isRequired,

  moveResizeValidator: _propTypes2.default.func,
  itemSelect: _propTypes2.default.func,
  itemDrag: _propTypes2.default.func,
  itemDrop: _propTypes2.default.func,
  itemResizing: _propTypes2.default.func,
  itemResized: _propTypes2.default.func,

  onItemDoubleClick: _propTypes2.default.func,
  onItemContextMenu: _propTypes2.default.func,

  itemRenderer: _propTypes2.default.func,
  selected: _propTypes2.default.array,

  dimensionItems: _propTypes2.default.array,
  groupTops: _propTypes2.default.array,
  useResizeHandle: _propTypes2.default.bool,
  scrollRef: _propTypes2.default.object
};
Items.defaultProps = {
  selected: []
};
exports.default = Items;