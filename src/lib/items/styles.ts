export const overridableStyles = {
  fontSize: 12,
  color: "white",
  cursor: "pointer",
  background: "#2196f3",
  borderTopWidth: "1px",
  borderBottomWidth: "1px",
  borderLeftWidth: "1px",
  borderRightWidth: "1px",
  borderStyle: "solid",
  borderColor: "#1a6fb3",
  zIndex: 80,
};
export const selectedStyle = {
  background: "#ffc107",
  borderTopWidth: "1px",
  borderLeftWidth: "1px",
  borderRightWidth: "1px",
  borderBottomWidth: "1px",
  borderStyle: "solid",
  borderColor: "#ff9800",
  zIndex: 82,
};
export const selectedAndCanMove = {
  willChange: "left, top, width",
  cursor: "move",
};
export const selectedAndCanResizeLeft = {
  borderLeftWidth: 3,
};
export const selectedAndCanResizeRight = {
  borderRightWidth: "3px",
};

export const leftResizeStyle = {
  position: "absolute",
  width: 20,
  maxWidth: "50%",
  minWidth: 2,
  height: "100%",
  top: 0,
  left: 0,
  cursor: "ew-resize",
  zIndex: 88,
};

export const rightResizeStyle = {
  position: "absolute",
  width: 20,
  maxWidth: "50%",
  minWidth: 2,
  height: "100%",
  top: 0,
  right: 0,
  cursor: "ew-resize",
  zIndex: 88,
};
