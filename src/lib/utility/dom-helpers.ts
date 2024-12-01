// TODO: can we use getBoundingClientRect instead??
// last place this is used is in "handleWheel" in ScrollElement
export function getParentPosition(element: HTMLElement) {
  let xPosition = 0
  let yPosition = 0
  let first = true

  while (element) {
    if (
      !element.offsetParent &&
      element.tagName === 'BODY' &&
      element.scrollLeft === 0 &&
      element.scrollTop === 0
    ) {
      element = document.scrollingElement as HTMLElement || element
    }
    xPosition +=
      element.offsetLeft - (first ? 0 : element.scrollLeft) + element.clientLeft
    yPosition +=
      element.offsetTop - (first ? 0 : element.scrollTop) + element.clientTop
    element = element.offsetParent as HTMLElement
    first = false
  }
  return { x: xPosition, y: yPosition }
}

interface ScrollPosition {
  scrollLeft: number;
  scrollTop: number;
}

export function getSumScroll(node: HTMLElement): ScrollPosition {
  if (node === document.body) {
    return { scrollLeft: 0, scrollTop: 0 };
  } else {
    const parent = getSumScroll(node.parentNode as HTMLElement);
    return {
      scrollLeft: node.scrollLeft + parent.scrollLeft,
      scrollTop: node.scrollTop + parent.scrollTop,
    };
  }
}

interface OffsetPosition {
  offsetLeft: number;
  offsetTop: number;
}

export function getSumOffset(node: HTMLElement): OffsetPosition {
  if (node === document.body || !node.offsetParent) {
    return { offsetLeft: 0, offsetTop: 0 };
  } else {
    const parent = getSumOffset(node.offsetParent as HTMLElement);
    return {
      offsetLeft: node.offsetLeft + parent.offsetLeft,
      offsetTop: node.offsetTop + parent.offsetTop,
    };
  }
}
