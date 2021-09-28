"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rightResizeStyle = exports.leftResizeStyle = exports.selectedAndCanResizeRightAndDragRight = exports.selectedAndCanResizeRight = exports.selectedAndCanResizeLeftAndDragLeft = exports.selectedAndCanResizeLeft = exports.selectedAndCanMove = exports.selectedStyle = exports.overridableStyles = void 0;
var overridableStyles = {
  fontSize: 12,
  color: 'white',
  cursor: 'pointer',
  background: '#2196f3',
  border: '1px solid #1a6fb3',
  zIndex: 80
};
exports.overridableStyles = overridableStyles;
var selectedStyle = {
  background: '#ffc107',
  border: '1px solid #ff9800',
  zIndex: 82
};
exports.selectedStyle = selectedStyle;
var selectedAndCanMove = {
  cursor: 'move'
};
exports.selectedAndCanMove = selectedAndCanMove;
var selectedAndCanResizeLeft = {
  borderLeftWidth: 3
};
exports.selectedAndCanResizeLeft = selectedAndCanResizeLeft;
var selectedAndCanResizeLeftAndDragLeft = {
  cursor: 'w-resize'
};
exports.selectedAndCanResizeLeftAndDragLeft = selectedAndCanResizeLeftAndDragLeft;
var selectedAndCanResizeRight = {
  borderRightWidth: 3
};
exports.selectedAndCanResizeRight = selectedAndCanResizeRight;
var selectedAndCanResizeRightAndDragRight = {
  cursor: 'e-resize'
};
exports.selectedAndCanResizeRightAndDragRight = selectedAndCanResizeRightAndDragRight;
var leftResizeStyle = {
  position: "absolute",
  width: 24,
  maxWidth: "20%",
  minWidth: 2,
  height: "100%",
  top: 0,
  left: 0,
  cursor: "pointer",
  zIndex: 88
};
exports.leftResizeStyle = leftResizeStyle;
var rightResizeStyle = {
  position: "absolute",
  width: 24,
  maxWidth: "20%",
  minWidth: 2,
  height: "100%",
  top: 0,
  right: 0,
  cursor: "pointer",
  zIndex: 88
};
exports.rightResizeStyle = rightResizeStyle;