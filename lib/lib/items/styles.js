'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var overridableStyles = exports.overridableStyles = {
  fontSize: 12,
  color: 'white',
  cursor: 'pointer',
  background: '#2196f3',
  border: '1px solid #1a6fb3',
  zIndex: 80
};
var selectedStyle = exports.selectedStyle = {
  background: '#ffc107',
  border: '1px solid #ff9800',
  zIndex: 82
};
var selectedAndCanMove = exports.selectedAndCanMove = {
  cursor: 'move'
};
var selectedAndCanResizeLeft = exports.selectedAndCanResizeLeft = {
  borderLeftWidth: 3
};
var selectedAndCanResizeLeftAndDragLeft = exports.selectedAndCanResizeLeftAndDragLeft = {
  cursor: 'w-resize'
};
var selectedAndCanResizeRight = exports.selectedAndCanResizeRight = {
  borderRightWidth: 3
};
var selectedAndCanResizeRightAndDragRight = exports.selectedAndCanResizeRightAndDragRight = {
  cursor: 'e-resize'
};

var leftResizeStyle = exports.leftResizeStyle = {
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

var rightResizeStyle = exports.rightResizeStyle = {
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