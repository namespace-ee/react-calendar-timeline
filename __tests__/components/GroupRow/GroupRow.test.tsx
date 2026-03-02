import { render, fireEvent } from "@testing-library/react";
import { noop } from "test-utility";
import GroupRow from "lib/row/GroupRow";

const defaultProps = {
  onClick: noop,
  onDoubleClick: noop,
  onContextMenu: noop,
  isEvenRow: false,
  clickTolerance: 10,
  style: {},
  group: {},
};

describe("GroupRow", () => {
  it("calls passed in onDoubleClick", () => {
    const onDoubleClickMock = vi.fn();
    const props = {
      ...defaultProps,
      onDoubleClick: onDoubleClickMock,
    };

    const { container } = render(<GroupRow {...props} />);

    fireEvent.doubleClick(container.firstChild as HTMLElement);

    expect(onDoubleClickMock).toHaveBeenCalledTimes(1);
  });

  it("calls passed in onClick", () => {
    const onClickMock = vi.fn();
    const props = {
      ...defaultProps,
      onClick: onClickMock,
    };

    const { container } = render(<GroupRow {...props} />);

    fireEvent.click(container.firstChild as HTMLElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("calls passed in onContextMenu", () => {
    const onContextMenuMock = vi.fn();
    const props = {
      ...defaultProps,
      onContextMenu: onContextMenuMock,
    };

    const { container } = render(<GroupRow {...props} />);

    fireEvent.contextMenu(container.firstChild as HTMLElement);

    expect(onContextMenuMock).toHaveBeenCalledTimes(1);
  });

  it('assigns "rct-hl-even" class if isEvenRow is true', () => {
    const props = {
      ...defaultProps,
      isEvenRow: true,
    };

    const { container } = render(<GroupRow {...props} />);

    expect((container.firstChild as HTMLElement).className.trim()).toBe("rct-hl-even");
  });

  it('assigns "rct-hl-odd" if isEvenRow is false', () => {
    const props = {
      ...defaultProps,
      isEvenRow: false,
    };

    const { container } = render(<GroupRow {...props} />);

    expect((container.firstChild as HTMLElement).className.trim()).toBe("rct-hl-odd");
  });

  it("passes style prop to style", () => {
    const props = {
      ...defaultProps,
      style: { border: "1px solid black" },
    };

    const { container } = render(<GroupRow {...props} />);

    expect((container.firstChild as HTMLElement).style.border).toBe("1px solid black");
  });
});
