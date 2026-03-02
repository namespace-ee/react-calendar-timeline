import { SyntheticEvent } from "react";
import { composeEvents } from "lib/utility/events";

const mockEvent = { type: "click" } as unknown as SyntheticEvent;

describe("composeEvents", () => {
  it("calls all handlers in order", () => {
    const order: string[] = [];
    const fn1 = () => order.push("first");
    const fn2 = () => order.push("second");

    const composed = composeEvents(fn1, fn2);
    composed(mockEvent);

    expect(order).toEqual(["first", "second"]);
  });

  it("skips undefined handlers", () => {
    const fn = vi.fn();

    const composed = composeEvents(undefined, fn, undefined);
    composed(mockEvent);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("passes event and extra args to each handler", () => {
    const fn = vi.fn();

    const composed = composeEvents(fn);
    composed(mockEvent, "extra1", "extra2");

    expect(fn).toHaveBeenCalledWith(mockEvent, "extra1", "extra2");
  });

  it("returns a function even with no handlers", () => {
    const composed = composeEvents();
    expect(() => composed(mockEvent)).not.toThrow();
  });
});
