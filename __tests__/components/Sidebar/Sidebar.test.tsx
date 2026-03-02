import { render } from "@testing-library/react";
import Sidebar from "lib/layout/Sidebar";

const defaultProps = {
  groups: [
    {
      bgColor: "#e8ccff",
      id: "2998",
      label: 'Label Dustin"',
      rightTitle: "Wolff",
      title: "Carlotta",
    },
    {
      bgColor: "#e8ccff",
      id: "2999",
      label: 'Label Myrtle"',
      rightTitle: '"Sauer"',
      title: "Elmer",
    },
  ],
  width: 10,
  height: 10,
  groupHeights: [30, 27],
  keys: {
    groupIdKey: "id",
    groupRightTitleKey: "rightTitle",
    groupTitleKey: "title",
    groupLabelKey: "title",
    itemDivTitleKey: "title",
    itemGroupKey: "group",
    itemIdKey: "id",
    itemTimeEndKey: "end",
    itemTimeStartKey: "start",
    itemTitleKey: "title",
  },
};

describe("Sidebar", () => {
  it("passes props and get right height for first group", () => {
    const { container } = render(<Sidebar {...defaultProps} />);

    const firstRow = container.querySelector(".rct-sidebar-row") as HTMLElement;
    expect(firstRow!.style.height).toBe("30px");
  });
});
