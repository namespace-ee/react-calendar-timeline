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
/** interactjs resize margin, in px. The handle is this wide. */
export const resizeMargin = 20;
const selectedResizeBorder = 3;

export const selectedAndCanResizeLeft = {
  borderLeftWidth: selectedResizeBorder,
};
export const selectedAndCanResizeRight = {
  borderRightWidth: selectedResizeBorder,
};

// Absolute left/right sit on the padding edge, inside the border. Pull the
// handle out by the border width so it covers that border and lines up with
// interact's margin, which is measured from the outer edge.
export const leftResizeStyle = {
  position: "absolute",
  width: resizeMargin,
  maxWidth: "50%",
  minWidth: 2,
  height: "100%",
  top: 0,
  left: -selectedResizeBorder,
  cursor: "ew-resize",
  zIndex: 88,
};

export const rightResizeStyle = {
  position: "absolute",
  width: resizeMargin,
  maxWidth: "50%",
  minWidth: 2,
  height: "100%",
  top: 0,
  right: -selectedResizeBorder,
  cursor: "ew-resize",
  zIndex: 88,
};
