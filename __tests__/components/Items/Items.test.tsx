import { render } from "@testing-library/react";
import Items from "lib/items/Items";
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

const groups = [
  { id: 1, title: "Group 1" },
  { id: 2, title: "Group 2" },
];

const items = [
  { id: 1, group: 1, title: "Item 1", start_time: now, end_time: now + oneHour },
  { id: 2, group: 2, title: "Item 2", start_time: now + oneHour, end_time: now + 2 * oneHour },
];

const dimensionItems = [
  {
    id: 1,
    dimensions: {
      left: 100,
      top: 0,
      width: 200,
      height: 30,
      collisionLeft: 100,
      collisionWidth: 200,
      isDragging: false,
      originalLeft: 100,
      stack: true,
      order: { index: 0, group: groups[0] },
    },
  },
  {
    id: 2,
    dimensions: {
      left: 300,
      top: 0,
      width: 200,
      height: 30,
      collisionLeft: 300,
      collisionWidth: 200,
      isDragging: false,
      originalLeft: 300,
      stack: true,
      order: { index: 1, group: groups[1] },
    },
  },
];

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

const defaultProps = {
  groups,
  items,
  dimensionItems,
  canvasTimeStart: now - 2 * oneHour,
  canvasTimeEnd: now + 4 * oneHour,
  canvasWidth: 3000,
  keys: defaultKeys,
  itemSelect: noop,
  itemDrag: noop,
  itemDrop: noop,
  itemResizing: noop,
  itemResized: noop,
  onItemDoubleClick: noop,
  groupTops: [0, 40],
  scrollRef: null,
  scrollOffset: 0,
};

const renderItems = (props = {}) =>
  render(
    <TimelineContext.Provider value={mockTimelineContext}>
      <Items {...defaultProps} {...props} />
    </TimelineContext.Provider>
  );

describe("Items", () => {
  it("renders .rct-items container", () => {
    const { container } = renderItems();
    expect(container.querySelector(".rct-items")).toBeInTheDocument();
  });

  it("renders correct number of items", () => {
    const { container } = renderItems();
    const itemEls = container.querySelectorAll(".rct-item");
    expect(itemEls.length).toBe(2);
  });

  it("filters items without matching dimensionItems", () => {
    const { container } = renderItems({
      dimensionItems: [dimensionItems[0]], // only first item has dimensions
    });
    const itemEls = container.querySelectorAll(".rct-item");
    expect(itemEls.length).toBe(1);
  });

  it("filters items outside canvas time range", () => {
    const futureItems = [
      { id: 3, group: 1, title: "Far Future", start_time: now + 100 * oneHour, end_time: now + 101 * oneHour },
    ];
    const { container } = renderItems({
      items: futureItems,
      dimensionItems: [
        {
          id: 3,
          dimensions: {
            left: 500,
            top: 0,
            width: 200,
            height: 30,
            collisionLeft: 500,
            collisionWidth: 200,
            isDragging: false,
            originalLeft: 500,
            stack: true,
            order: { index: 0, group: groups[0] },
          },
        },
      ],
    });
    const itemEls = container.querySelectorAll(".rct-item");
    expect(itemEls.length).toBe(0);
  });

  it("marks selected item via selectedItem prop", () => {
    const { container } = renderItems({
      selectedItem: 1,
    });
    // The selected item gets selectedStyle (amber background)
    const itemEls = container.querySelectorAll(".rct-item");
    const firstItemStyle = (itemEls[0] as HTMLElement).style;
    expect(firstItemStyle.background).toBe("rgb(255, 193, 7)"); // #ffc107
  });

  it("marks selected items via selected array prop", () => {
    const { container } = renderItems({
      selected: [1, 2],
    });
    const itemEls = container.querySelectorAll(".rct-item");
    // Both items should be selected (amber background)
    expect((itemEls[0] as HTMLElement).style.background).toBe("rgb(255, 193, 7)");
    expect((itemEls[1] as HTMLElement).style.background).toBe("rgb(255, 193, 7)");
  });

  it("uses per-item canResize override", () => {
    const itemsWithResize = [
      { ...items[0], canResize: "left" },
      { ...items[1], canResize: false },
    ];
    const { container } = renderItems({
      items: itemsWithResize,
      canResize: "both",
    });
    // Items should render without error regardless of resize config
    const itemEls = container.querySelectorAll(".rct-item");
    expect(itemEls.length).toBe(2);
  });
});
