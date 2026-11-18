import dayjs from "dayjs";
import { snapPreservingPhase, snapTime, snapToInterval } from "lib/utility/calendar";

const DAY = 24 * 60 * 60 * 1000;
const FIFTEEN_MIN = 15 * 60 * 1000;
const HOUR = 60 * 60 * 1000;

describe("snapToInterval", () => {
  const winterOffset = HOUR;
  const summerOffset = 2 * HOUR;
  // Local midnight for +1h: adding the offset lands on a UTC day boundary.
  const winterMidnight = 20_000 * DAY - winterOffset;
  const halfHourLater = winterMidnight + 30 * 60 * 1000;

  it("lands a 24-hour snap on local midnight for the target offset", () => {
    const snapped = snapToInterval(halfHourLater, DAY, winterOffset);
    expect(snapped).toBe(winterMidnight);
    expect((snapped + winterOffset) % DAY).toBe(0);
  });

  it("is an hour early when the offset is the other side of the change", () => {
    const snapped = snapToInterval(halfHourLater, DAY, summerOffset);
    expect(snapped).toBe(winterMidnight - HOUR);
  });

  it("keeps a 15-minute grid when the offset divides the interval", () => {
    const time = winterMidnight + 7 * 60 * 1000;
    const rounded = Math.round(time / FIFTEEN_MIN) * FIFTEEN_MIN;
    expect(snapToInterval(time, FIFTEEN_MIN, winterOffset)).toBe(rounded);
    expect(snapToInterval(time, FIFTEEN_MIN, summerOffset)).toBe(rounded);
  });

  it("lands on local midnight for a negative offset", () => {
    const offset = -5 * HOUR;
    const midnight = 20_000 * DAY - offset;
    const snapped = snapToInterval(midnight + 20 * 60 * 1000, DAY, offset);
    expect(snapped).toBe(midnight);
  });
});

describe("snapTime", () => {
  it("lands a 24-hour snap on local midnight", () => {
    const snapped = snapTime(Date.UTC(2026, 5, 15, 10, 20, 0), DAY);
    const offset = dayjs(snapped).utcOffset() * 60 * 1000;
    expect((snapped + offset) % DAY).toBe(0);
  });

  it("matches millisecond rounding on a 15-minute grid", () => {
    const time = Date.UTC(2026, 5, 15, 10, 7, 0);
    const offset = dayjs(time).utcOffset() * 60 * 1000;
    expect(offset % FIFTEEN_MIN).toBe(0);
    expect(snapTime(time, FIFTEEN_MIN)).toBe(Math.round(time / FIFTEEN_MIN) * FIFTEEN_MIN);
  });
});

describe("snapPreservingPhase", () => {
  it("keeps local time of day instead of snapping a resize to midnight", () => {
    const probe = Date.UTC(2026, 5, 15, 12, 0, 0);
    const offset = dayjs(probe).utcOffset() * 60 * 1000;
    const local = probe + offset;
    const localMidnight = local - (((local % DAY) + DAY) % DAY);
    const anchor = localMidnight + 9 * HOUR - offset;

    expect(snapPreservingPhase(anchor + 20 * 60 * 1000, anchor, DAY)).toBe(anchor);
    expect(snapPreservingPhase(anchor + DAY + 20 * 60 * 1000, anchor, DAY)).toBe(anchor + DAY);
  });

  it("matches the previous remainder formula on a 15-minute grid", () => {
    const anchor = Date.UTC(2026, 5, 15, 9, 7, 0);
    const time = anchor + 8 * 60 * 1000;
    const endTime = anchor % FIFTEEN_MIN;
    const previous = Math.round((time - endTime) / FIFTEEN_MIN) * FIFTEEN_MIN + endTime;
    expect(snapPreservingPhase(time, anchor, FIFTEEN_MIN)).toBe(previous);
  });
});
