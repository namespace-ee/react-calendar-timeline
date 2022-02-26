"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParentPosition = getParentPosition;
exports.getSumScroll = getSumScroll;
exports.getSumOffset = getSumOffset;

// TODO: can we use getBoundingClientRect instead??
// last place this is used is in "handleWheel" in ScrollElement
function getParentPosition(element) {
  var xPosition = 0;
  var yPosition = 0;
  var first = true;

  while (element) {
    if (!element.offsetParent && element.tagName === 'BODY' && element.scrollLeft === 0 && element.scrollTop === 0) {
      element = document.scrollingElement || element;
    }

    xPosition += element.offsetLeft - (first ? 0 : element.scrollLeft) + element.clientLeft;
    yPosition += element.offsetTop - (first ? 0 : element.scrollTop) + element.clientTop;
    element = element.offsetParent;
    first = false;
  }

  return {
    x: xPosition,
    y: yPosition
  };
}

function getSumScroll(node) {
  if (node === document.body) {
    return {
      scrollLeft: 0,
      scrollTop: 0
    };
  } else {
    var parent = getSumScroll(node.parentNode);
    return {
      scrollLeft: node.scrollLeft + parent.scrollLeft,
      scrollTop: node.scrollTop + parent.scrollTop
    };
  }
}

function getSumOffset(node) {
  if (node === document.body || !node.offsetParent) {
    return {
      offsetLeft: 0,
      offsetTop: 0
    };
  } else {
    var parent = getSumOffset(node.offsetParent);
    return {
      offsetLeft: node.offsetLeft + parent.offsetLeft,
      offsetTop: node.offsetTop + parent.offsetTop
    };
  }
}