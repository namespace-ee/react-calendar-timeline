'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultItemRenderer = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultItemRenderer = exports.defaultItemRenderer = function defaultItemRenderer(_ref) {
  var item = _ref.item,
      itemContext = _ref.itemContext,
      getItemProps = _ref.getItemProps,
      getResizeProps = _ref.getResizeProps;

  var _getResizeProps = getResizeProps(),
      leftResizeProps = _getResizeProps.left,
      rightResizeProps = _getResizeProps.right;

  return _react2.default.createElement(
    'div',
    getItemProps(item.itemProps),
    itemContext.useResizeHandle ? _react2.default.createElement('div', leftResizeProps) : '',
    _react2.default.createElement(
      'div',
      {
        className: 'rct-item-content',
        style: { maxHeight: '' + itemContext.dimensions.height }
      },
      itemContext.title
    ),
    itemContext.useResizeHandle ? _react2.default.createElement('div', rightResizeProps) : ''
  );
};

// TODO: update this to actual prop types. Too much to change before release
// future me, forgive me.
defaultItemRenderer.propTypes = {
  item: _propTypes2.default.any,
  itemContext: _propTypes2.default.any,
  getItemProps: _propTypes2.default.any,
  getResizeProps: _propTypes2.default.any
};