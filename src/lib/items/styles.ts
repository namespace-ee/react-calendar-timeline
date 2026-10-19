export const overridableStyles = {
  fontSize: "var(--rct-item-font-size, 12px)",
  color: "var(--rct-item-color, white)",
  cursor: "var(--rct-item-cursor, pointer)",
  background: "var(--rct-item-background, #2196f3)",
  borderTopWidth: "var(--rct-item-border-width, 1px)",
  borderBottomWidth: "var(--rct-item-border-width, 1px)",
  borderLeftWidth: "var(--rct-item-border-width, 1px)",
  borderRightWidth: "var(--rct-item-border-width, 1px)",
  borderStyle: "var(--rct-item-border-style, solid)",
  borderColor: "var(--rct-item-border-color, #1a6fb3)",
  zIndex: 80,
};
export const selectedStyle = {
  color: "var(--rct-item-selected-color, white)",
  background: "var(--rct-item-selected-background, #ffc107)",
  borderTopWidth: "var(--rct-item-border-width, 1px)",
  borderLeftWidth: "var(--rct-item-border-width, 1px)",
  borderRightWidth: "var(--rct-item-border-width, 1px)",
  borderBottomWidth: "var(--rct-item-border-width, 1px)",
  borderStyle: "var(--rct-item-border-style, solid)",
  borderColor: "var(--rct-item-selected-border-color, #ff9800)",
  zIndex: 82,
};
export const selectedAndCanMove = {
  willChange: "left, top, width",
  cursor: "move",
};
export const selectedAndCanResizeLeft = {
  borderLeftWidth: 3,
};
export const selectedAndCanResizeLeftAndDragLeft = {
  cursor: "w-resize",
};
export const selectedAndCanResizeRight = {
  borderRightWidth: "3px",
};
export const selectedAndCanResizeRightAndDragRight = {
  cursor: "e-resize",
};

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
};

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
};
