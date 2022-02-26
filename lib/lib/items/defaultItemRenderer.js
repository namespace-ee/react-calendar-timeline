"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultItemRenderer = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaultItemRenderer = function defaultItemRenderer(_ref) {
  var item = _ref.item,
      itemContext = _ref.itemContext,
      getItemProps = _ref.getItemProps,
      getResizeProps = _ref.getResizeProps;

  var _getResizeProps = getResizeProps(),
      leftResizeProps = _getResizeProps.left,
      rightResizeProps = _getResizeProps.right;

  return _react["default"].createElement("div", getItemProps(item.itemProps), itemContext.useResizeHandle ? _react["default"].createElement("div", leftResizeProps) : '', _react["default"].createElement("div", {
    className: "rct-item-content",
    style: {
      maxHeight: "".concat(itemContext.dimensions.height)
    }
  }, itemContext.title), itemContext.useResizeHandle ? _react["default"].createElement("div", rightResizeProps) : '');
}; // TODO: update this to actual prop types. Too much to change before release
// future me, forgive me.


exports.defaultItemRenderer = defaultItemRenderer;
defaultItemRenderer.propTypes = {
  item: _propTypes["default"].any,
  itemContext: _propTypes["default"].any,
  getItemProps: _propTypes["default"].any,
  getResizeProps: _propTypes["default"].any
};