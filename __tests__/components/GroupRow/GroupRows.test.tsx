import { render } from "@testing-library/react";
import { noop } from "test-utility";
import GroupRows from "lib/row/GroupRows";

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
  canvasWidth: 10,
  lineCount: 2,
  groupHeights: [30, 27],
  onRowClick: noop,
  onRowDoubleClick: noop,
  clickTolerance: 0,
  onRowContextClick: noop,
};

describe("GroupRows", () => {
  it("passes props and get right height for first group", () => {
    const { container } = render(<GroupRows {...defaultProps} />);

    const firstRow = container.querySelector(".rct-hl-even") as HTMLElement;
    expect(firstRow!.style.height).toBe("30px");
  });
});
