import { getParentPosition, getSumScroll, getSumOffset } from "lib/utility/dom-helpers";

describe("getSumScroll", () => {
  it("returns zeros for document.body", () => {
    expect(getSumScroll(document.body)).toEqual({ scrollLeft: 0, scrollTop: 0 });
  });

  it("accumulates scroll from nested elements", () => {
    const parent = document.createElement("div");
    const child = document.createElement("div");
    document.body.appendChild(parent);
    parent.appendChild(child);

    // jsdom doesn't support real scrolling, but we can set the properties
    Object.defineProperty(child, "scrollLeft", { value: 10, configurable: true });
    Object.defineProperty(child, "scrollTop", { value: 20, configurable: true });
    Object.defineProperty(parent, "scrollLeft", { value: 5, configurable: true });
    Object.defineProperty(parent, "scrollTop", { value: 15, configurable: true });

    const result = getSumScroll(child);
    expect(result.scrollLeft).toBe(15); // 10 + 5
    expect(result.scrollTop).toBe(35); // 20 + 15

    document.body.removeChild(parent);
  });
});

describe("getSumOffset", () => {
  it("returns zeros for document.body", () => {
    expect(getSumOffset(document.body)).toEqual({ offsetLeft: 0, offsetTop: 0 });
  });

  it("returns zeros when no offsetParent", () => {
    const el = document.createElement("div");
    // detached elements have no offsetParent
    expect(getSumOffset(el)).toEqual({ offsetLeft: 0, offsetTop: 0 });
  });

  it("accumulates offsets through offsetParent chain", () => {
    const parent = document.createElement("div");
    const child = document.createElement("div");
    document.body.appendChild(parent);
    parent.appendChild(child);

    Object.defineProperty(child, "offsetLeft", { value: 30, configurable: true });
    Object.defineProperty(child, "offsetTop", { value: 40, configurable: true });
    Object.defineProperty(child, "offsetParent", { value: parent, configurable: true });

    Object.defineProperty(parent, "offsetLeft", { value: 10, configurable: true });
    Object.defineProperty(parent, "offsetTop", { value: 20, configurable: true });
    // parent's offsetParent is null (body) — terminates recursion

    const result = getSumOffset(child);
    // parent has no offsetParent so returns {0,0} — only child's offset is included
    expect(result.offsetLeft).toBe(30);
    expect(result.offsetTop).toBe(40);

    document.body.removeChild(parent);
  });
});

describe("getParentPosition", () => {
  it("returns x and y based on offsets", () => {
    const el = document.createElement("div");
    Object.defineProperty(el, "offsetLeft", { value: 50, configurable: true });
    Object.defineProperty(el, "offsetTop", { value: 100, configurable: true });
    Object.defineProperty(el, "clientLeft", { value: 0, configurable: true });
    Object.defineProperty(el, "clientTop", { value: 0, configurable: true });
    Object.defineProperty(el, "offsetParent", { value: null, configurable: true });

    const result = getParentPosition(el);
    expect(result.x).toBe(50);
    expect(result.y).toBe(100);
  });

  it("subtracts scroll for non-first elements in chain", () => {
    const parent = document.createElement("div");
    const child = document.createElement("div");

    Object.defineProperty(child, "offsetLeft", { value: 30, configurable: true });
    Object.defineProperty(child, "offsetTop", { value: 40, configurable: true });
    Object.defineProperty(child, "scrollLeft", { value: 0, configurable: true });
    Object.defineProperty(child, "scrollTop", { value: 0, configurable: true });
    Object.defineProperty(child, "clientLeft", { value: 0, configurable: true });
    Object.defineProperty(child, "clientTop", { value: 0, configurable: true });
    Object.defineProperty(child, "offsetParent", { value: parent, configurable: true });

    Object.defineProperty(parent, "offsetLeft", { value: 10, configurable: true });
    Object.defineProperty(parent, "offsetTop", { value: 20, configurable: true });
    Object.defineProperty(parent, "scrollLeft", { value: 5, configurable: true });
    Object.defineProperty(parent, "scrollTop", { value: 10, configurable: true });
    Object.defineProperty(parent, "clientLeft", { value: 0, configurable: true });
    Object.defineProperty(parent, "clientTop", { value: 0, configurable: true });
    Object.defineProperty(parent, "offsetParent", { value: null, configurable: true });

    const result = getParentPosition(child);
    // child: 30 (first, no scroll subtraction) + parent: 10 - 5 (scroll) = 35
    expect(result.x).toBe(35);
    // child: 40 (first, no scroll subtraction) + parent: 20 - 10 (scroll) = 50
    expect(result.y).toBe(50);
  });
});
