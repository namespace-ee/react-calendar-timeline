import { stackAll } from "lib/utility/calendar";
import { orderedGroups, dimensionItems } from "../../../__fixtures__/groupOrderAndItemDimentions";

const lineHeight = 60;

describe("stackAll", () => {
  it("works as expected stacked", () => {
    expect(stackAll(dimensionItems, orderedGroups, lineHeight, true, undefined)).toMatchSnapshot();
  });
  it("works as expected not stacked", () => {
    expect(stackAll(dimensionItems, orderedGroups, lineHeight, false, undefined)).toMatchSnapshot();
  });
});
