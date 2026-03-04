import { render } from "@testing-library/react";
import { items, groups } from "../../../__fixtures__/itemsAndGroups";
import { props as defaultProps } from "../../../__fixtures__/stateAndProps";
import Timeline from "lib/Timeline";
import type { ReactCalendarTimelineProps } from "lib/Timeline";
import type { TimelineItemBase, TimelineGroupBase } from "lib/types/main";

/**
 * Testing The Default Functionality
 */
describe("Renders default headers correctly", () => {
  it("Given Timeline When not using TimelineHeaders then it should render 2 DateHeaders and a left sidebar header by default", () => {
    const { getAllByTestId, getByTestId } = renderDefaultTimeline();
    expect(getAllByTestId("dateHeader")).toHaveLength(2);
    expect(getByTestId("headerContainer").children).toHaveLength(2);
    expect(getByTestId("sidebarHeader")).toBeInTheDocument();
  });
  it("Given TimelineHeader When pass a rightSidebarWidthWidth Then it should render two sidebar headers", () => {
    const rightSidebarWidth = 150;
    const { getAllByTestId } = renderDefaultTimeline({ rightSidebarWidth });
    const sidebarHeaders = getAllByTestId("sidebarHeader");
    expect(sidebarHeaders).toHaveLength(2);
    expect(sidebarHeaders[0]).toBeInTheDocument();
    expect(sidebarHeaders[1]).toBeInTheDocument();
    const { width } = getComputedStyle(sidebarHeaders[1]);
    expect(width).toBe("150px");
  });
});

type TimelineProps = ReactCalendarTimelineProps<TimelineItemBase<number>, TimelineGroupBase>;

export function renderDefaultTimeline(props: Partial<TimelineProps> = {}) {
  const timelineProps = {
    ...defaultProps,
    items: items as unknown as TimelineItemBase<number>[],
    groups: groups as unknown as TimelineGroupBase[],
    ...props,
  } as Omit<TimelineProps, "ref">;
  return render(<Timeline {...timelineProps} />);
}
