import { getGroupOrders, stackAll } from "lib/utility/calendar";
import { defaultKeys } from "lib/default-config";
import { orderedGroups, dimensionItems } from "../../../__fixtures__/groupOrderAndItemDimentions";

const lineHeight = 60;

describe("stackAll", () => {
  it("works as expected stacked", () => {
    expect(stackAll(dimensionItems, orderedGroups, lineHeight, true, undefined)).toMatchSnapshot();
  });
  it("works as expected not stacked", () => {
    expect(stackAll(dimensionItems, orderedGroups, lineHeight, false, undefined)).toMatchSnapshot();
  });
  it("keeps group order when group ids are integer-like", () => {
    const groupOrders = getGroupOrders(
      [
        { id: "a", title: "A", height: 26 },
        { id: "2", title: "2", height: 64 },
      ],
      defaultKeys
    );
    expect(stackAll([], groupOrders, lineHeight, true, undefined).groupHeights).toEqual([26, 64]);
  });
});
