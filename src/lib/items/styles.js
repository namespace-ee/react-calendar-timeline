 export const overridableStyles = {
  fontSize: 12,
  color: 'white',
  cursor: 'pointer',
  background: '#2196f3',
  border: '1px solid #1a6fb3',
  zIndex: 80
}
export const selectedStyle = {
  background: '#ffc107',
  border: '1px solid #ff9800',
  zIndex: 82
}
export const selectedAndCanMove = {
  cursor: 'move'
}
export const selectedAndCanResizeLeft = {
  borderLeftWidth: 3
}
export const selectedAndCanResizeLeftAndDragLeft = {
  cursor: 'w-resize'
}
export const selectedAndCanResizeRight = {
  borderRightWidth: 3
}
export const selectedAndCanResizeRightAndDragRight = {
  cursor: 'e-resize'
}

export const leftResizeStyle = {
    position: "absolute",
    width: 24,
    maxWidth: "20%",
    minWidth: 2,
    height: "100%",
    top: 0,
    left: 0,
    cursor: "pointer",
    zIndex: 88,
  }


  export const rightResizeStyle = {
    position: "absolute",
    width: 24,
    maxWidth: "20%",
    minWidth: 2,
    height: "100%",
    top: 0,
    right: 0,
    cursor: "pointer",
    zIndex: 88,
  }
