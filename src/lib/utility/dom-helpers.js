// TODO: can we use getBoundingClientRect instead??
// last place this is used is in "handleWheel" in ScrollElement
export function getParentPosition(element) {
  var xPosition = 0
  var yPosition = 0
  var first = true

  while (element) {
    if (
      !element.offsetParent &&
      element.tagName === 'BODY' &&
      element.scrollLeft === 0 &&
      element.scrollTop === 0
    ) {
      element = document.scrollingElement || element
    }
    xPosition +=
      element.offsetLeft - (first ? 0 : element.scrollLeft) + element.clientLeft
    yPosition +=
      element.offsetTop - (first ? 0 : element.scrollTop) + element.clientTop
    element = element.offsetParent
    first = false
  }
  return { x: xPosition, y: yPosition }
}

export function getSumScroll(node) {
  if (node === document.body) {
    return {scrollLeft: 0, scrollTop: 0}
  } else {
    const parent = getSumScroll(node.parentNode)
    return ({
      scrollLeft: node.scrollLeft + parent.scrollLeft,
      scrollTop: node.scrollTop + parent.scrollTop
    })
  }
}

export function getSumOffset(node) {
  if (node === document.body) {
    return {offsetLeft: 0, offsetTop: 0}
  } else {
    const parent = getSumOffset(node.offsetParent)
    return ({
      offsetLeft: node.offsetLeft + parent.offsetLeft,
      offsetTop: node.offsetTop + parent.offsetTop
    })
  }
}
