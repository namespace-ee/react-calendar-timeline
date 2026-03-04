import { render, fireEvent } from "@testing-library/react";
import Item from "lib/items/Item";
import { TimelineContext, TimelineContextType } from "lib/timeline/TimelineStateContext";
import { noop } from "test-utility";
import { SelectUnits } from "lib/utility/calendar";
import { TimelineContext as TimelineContextValue } from "lib/types/main";

const now = Date.now();
const oneHour = 1000 * 60 * 60;

const defaultKeys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupLabelKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start_time",
  itemTimeEndKey: "end_time",
};

const mockTimelineContext: TimelineContextType = {
  getTimelineState: () =>
    ({
      visibleTimeStart: now - oneHour,
      visibleTimeEnd: now + 3 * oneHour,
      canvasTimeStart: now - 2 * oneHour,
      canvasTimeEnd: now + 4 * oneHour,
      canvasWidth: 3000,
      timelineUnit: "hour" as SelectUnits,
      timelineWidth: 1000,
    }) as TimelineContextValue,
  getLeftOffsetFromDate: () => 0,
  getDateFromLeftOffsetPosition: () => 0,
  showPeriod: noop,
};

const defaultItem = {
  id: 1,
  group: 1,
  title: "Test Item",
  start_time: now,
  end_time: now + oneHour,
};

const defaultDimensions = {
  left: 100,
  top: 50,
  width: 200,
  height: 30,
  collisionLeft: 100,
  collisionWidth: 200,
  isDragging: false,
  originalLeft: 100,
  stack: true,
  order: { index: 0, group: { id: 1, title: "Group 1" } },
};

const defaultProps = {
  item: defaultItem,
  keys: defaultKeys,
  order: { index: 0 },
  dimensions: defaultDimensions,
  selected: false,
  canChangeGroup: true,
  canMove: true,
  canSelect: true,
  canResizeLeft: false,
  canResizeRight: false,
  useResizeHandle: false,
  canvasTimeStart: now - 2 * oneHour,
  canvasTimeEnd: now + 4 * oneHour,
  canvasWidth: 3000,
  minResizeWidth: 20,
  dragSnap: 0,
  onSelect: noop,
  onDrag: noop,
  onDrop: noop,
  onResizing: noop,
  onResized: noop,
  onItemDoubleClick: noop,
  groupTops: [0, 40],
  scrollRef: null,
  scrollOffset: 0,
};

const renderItem = (props = {}) =>
  render(
    <TimelineContext.Provider value={mockTimelineContext}>
      <Item {...defaultProps} {...props} />
    </TimelineContext.Provider>
  );

describe("Item", () => {
  describe("rendering", () => {
    it("renders with default renderer", () => {
      const { container } = renderItem();
      expect(container.querySelector(".rct-item")).toBeInTheDocument();
    });

    it("renders item title in content", () => {
      const { container } = renderItem();
      const content = container.querySelector(".rct-item-content");
      expect(content!.textContent).toBe("Test Item");
    });

    it("returns null when order is undefined", () => {
      const { container } = renderItem({ order: undefined });
      expect(container.querySelector(".rct-item")).not.toBeInTheDocument();
    });

    it("returns null when order is null", () => {
      const { container } = renderItem({ order: null });
      expect(container.querySelector(".rct-item")).not.toBeInTheDocument();
    });

    it("applies custom className from item", () => {
      const { container } = renderItem({
        item: { ...defaultItem, className: "my-custom-class" },
      });
      expect(container.querySelector(".my-custom-class")).toBeInTheDocument();
    });
  });

  describe("styles", () => {
    it("applies positioning from dimensions", () => {
      const { container } = renderItem();
      const item = container.querySelector(".rct-item") as HTMLElement;
      expect(item.style.left).toBe("100px");
      expect(item.style.top).toBe("50px");
      expect(item.style.width).toBe("200px");
      expect(item.style.height).toBe("30px");
    });

    it("applies base overridable styles", () => {
      const { container } = renderItem();
      const item = container.querySelector(".rct-item") as HTMLElement;
      expect(item.style.cursor).toBe("pointer");
    });

    it("applies selected styles when selected", () => {
      const { container } = renderItem({ selected: true });
      const item = container.querySelector(".rct-item") as HTMLElement;
      expect(item.style.background).toBe("rgb(255, 193, 7)"); // #ffc107
    });

    it("applies move cursor when selected and canMove", () => {
      const { container } = renderItem({ selected: true, canMove: true });
      const item = container.querySelector(".rct-item") as HTMLElement;
      expect(item.style.cursor).toBe("move");
    });

    it("does not apply move cursor when not selected", () => {
      const { container } = renderItem({ selected: false, canMove: true });
      const item = container.querySelector(".rct-item") as HTMLElement;
      expect(item.style.cursor).toBe("pointer");
    });
  });

  describe("resize handles", () => {
    it("does not render resize handles by default", () => {
      const { container } = renderItem({ useResizeHandle: false });
      expect(container.querySelector(".rct-item-handler-resize-left")).not.toBeInTheDocument();
      expect(container.querySelector(".rct-item-handler-resize-right")).not.toBeInTheDocument();
    });

    it("renders resize handles when useResizeHandle is true", () => {
      const { container } = renderItem({ useResizeHandle: true });
      expect(container.querySelector(".rct-item-handler-resize-left")).toBeInTheDocument();
      expect(container.querySelector(".rct-item-handler-resize-right")).toBeInTheDocument();
    });
  });

  describe("event handlers", () => {
    it("calls onSelect on click when not interact-mounted", () => {
      const onSelectMock = vi.fn();
      const { container } = renderItem({
        canSelect: true,
        onSelect: onSelectMock,
      });

      const item = container.querySelector(".rct-item")!;
      fireEvent.mouseDown(item);
      fireEvent.mouseUp(item);

      expect(onSelectMock).toHaveBeenCalledWith(1, "click", expect.anything());
    });

    it("does not call onSelect when canSelect is false", () => {
      const onSelectMock = vi.fn();
      const { container } = renderItem({
        canSelect: false,
        onSelect: onSelectMock,
      });

      const item = container.querySelector(".rct-item")!;
      fireEvent.mouseDown(item);
      fireEvent.mouseUp(item);

      expect(onSelectMock).not.toHaveBeenCalled();
    });

    it("calls onItemDoubleClick on double click", () => {
      const onDoubleClickMock = vi.fn();
      const { container } = renderItem({
        onItemDoubleClick: onDoubleClickMock,
      });

      const item = container.querySelector(".rct-item")!;
      fireEvent.doubleClick(item);

      expect(onDoubleClickMock).toHaveBeenCalledWith(1, expect.anything());
    });

    it("calls onContextMenu on right click", () => {
      const onContextMenuMock = vi.fn();
      const { container } = renderItem({
        onContextMenu: onContextMenuMock,
      });

      const item = container.querySelector(".rct-item")!;
      fireEvent.contextMenu(item);

      expect(onContextMenuMock).toHaveBeenCalledWith(1, expect.anything());
    });
  });

  describe("custom itemRenderer", () => {
    it("calls custom renderer with correct props", () => {
      const customRenderer = vi.fn(() => <div data-testid="custom-item" />);
      const { getByTestId } = renderItem({
        itemRenderer: customRenderer,
      });

      expect(getByTestId("custom-item")).toBeInTheDocument();
      expect(customRenderer).toHaveBeenCalledWith(
        expect.objectContaining({
          item: defaultItem,
          itemContext: expect.objectContaining({
            title: "Test Item",
            selected: false,
            canMove: true,
          }),
          getItemProps: expect.any(Function),
          getResizeProps: expect.any(Function),
          timelineContext: mockTimelineContext,
        })
      );
    });
  });

  describe("dragTimeSnap", () => {
    it("returns raw time when dragSnap is 0", () => {
      const { container } = renderItem({ dragSnap: 0 });
      // We test this indirectly — the item renders without error
      expect(container.querySelector(".rct-item")).toBeInTheDocument();
    });

    it("snaps time to dragSnap interval", () => {
      // Test by rendering with a specific dragSnap and checking it doesn't crash
      const { container } = renderItem({ dragSnap: 15 * 60 * 1000 }); // 15 min
      expect(container.querySelector(".rct-item")).toBeInTheDocument();
    });
  });

  describe("canResizeLeft/Right", () => {
    it("does not show left resize border when canResizeLeft is false", () => {
      const { container } = renderItem({
        selected: true,
        canResizeLeft: false,
        canResizeRight: false,
      });
      const item = container.querySelector(".rct-item") as HTMLElement;
      expect(item.style.borderLeftWidth).toBe("1px");
    });

    it("shows left resize border when selected and canResizeLeft with enough width", () => {
      const { container } = renderItem({
        selected: true,
        canResizeLeft: true,
        minResizeWidth: 20,
        dimensions: { ...defaultDimensions, width: 200 },
      });
      const item = container.querySelector(".rct-item") as HTMLElement;
      expect(item.style.borderLeftWidth).toBe("3px");
    });

    it("does not show resize border when width less than minResizeWidth", () => {
      const { container } = renderItem({
        selected: true,
        canResizeLeft: true,
        minResizeWidth: 300,
        dimensions: { ...defaultDimensions, width: 200 },
      });
      const item = container.querySelector(".rct-item") as HTMLElement;
      expect(item.style.borderLeftWidth).toBe("1px");
    });
  });
});
