import { vanillaDateDriver } from "../../src/lib/utility/dateDrivers/vanillaDateDriver";

describe("Test the vanilla date driver", () => {
  const getTestDriver = () => {
    return vanillaDateDriver("2009-03-15T23:43:12.345Z");
  }

  test("It should return its numeric value", () => {
    expect(getTestDriver().valueOf()).toBe(new Date("2009-03-15T23:43:12.345Z").valueOf());
  });
  test("It should get the start of all units", () => {
    expect(getTestDriver().startOf("year").valueOf()).toBe(new Date("2009-01-01T00:00:00Z").valueOf());
    expect(getTestDriver().startOf("quarter").valueOf()).toBe(new Date("2009-01-01T00:00:00Z").valueOf());
    expect(getTestDriver().startOf("month").valueOf()).toBe(new Date("2009-03-01T00:00:00Z").valueOf());
    expect(getTestDriver().startOf("week").valueOf()).toBe(new Date("2009-03-15T00:00:00Z").valueOf());
    expect(getTestDriver().startOf("isoWeek").valueOf()).toBe(new Date("2009-03-15T00:00:00Z").valueOf());
    expect(getTestDriver().startOf("day").valueOf()).toBe(new Date("2009-03-15T00:00:00Z").valueOf());
    expect(getTestDriver().startOf("date").valueOf()).toBe(new Date("2009-03-15T00:00:00Z").valueOf());
    expect(getTestDriver().startOf("hour").valueOf()).toBe(new Date("2009-03-15T23:00:00Z").valueOf());
    expect(getTestDriver().startOf("minute").valueOf()).toBe(new Date("2009-03-15T23:43:00Z").valueOf());
    expect(getTestDriver().startOf("second").valueOf()).toBe(new Date("2009-03-15T23:43:12Z").valueOf());
  });
  test("It should get the end of all units", () => {
    expect(getTestDriver().endOf("year").valueOf()).toBe(new Date("2009-12-31T23:59:59.999Z").valueOf());
    expect(getTestDriver().endOf("quarter").valueOf()).toBe(new Date("2009-03-31T23:59:59.999Z").valueOf());
    expect(getTestDriver().endOf("month").valueOf()).toBe(new Date("2009-03-31T23:59:59.999Z").valueOf());
    expect(getTestDriver().endOf("week").valueOf()).toBe(new Date("2009-03-21T23:59:59.999Z").valueOf());
    expect(getTestDriver().endOf("isoWeek").valueOf()).toBe(new Date("2009-03-21T23:59:59.999Z").valueOf());
    expect(getTestDriver().endOf("day").valueOf()).toBe(new Date("2009-03-15T23:59:59.999Z").valueOf());
    expect(getTestDriver().endOf("date").valueOf()).toBe(new Date("2009-03-15T23:59:59.999Z").valueOf());
    expect(getTestDriver().endOf("hour").valueOf()).toBe(new Date("2009-03-15T23:59:59.999Z").valueOf());
    expect(getTestDriver().endOf("minute").valueOf()).toBe(new Date("2009-03-15T23:43:59.999Z").valueOf());
    expect(getTestDriver().endOf("second").valueOf()).toBe(new Date("2009-03-15T23:43:12.999Z").valueOf());
  })
  test("It should add time to all units", () => {
    expect(getTestDriver().add(3, "year").valueOf()).toBe(new Date("2012-03-15T23:43:12.345Z").valueOf());
    expect(getTestDriver().add(3, "month").valueOf()).toBe(new Date("2009-06-15T23:43:12.345Z").valueOf());
    expect(getTestDriver().add(3, "week").valueOf()).toBe(new Date("2009-04-05T23:43:12.345Z").valueOf());
    expect(getTestDriver().add(3, "date").valueOf()).toBe(new Date("2009-03-18T23:43:12.345Z").valueOf());
    expect(getTestDriver().add(3, "hour").valueOf()).toBe(new Date("2009-03-16T02:43:12.345Z").valueOf());
    expect(getTestDriver().add(3, "minute").valueOf()).toBe(new Date("2009-03-15T23:46:12.345Z").valueOf());
    expect(getTestDriver().add(3, "second").valueOf()).toBe(new Date("2009-03-15T23:43:15.345Z").valueOf());
    expect(getTestDriver().add(3, "milliseconds").valueOf()).toBe(new Date("2009-03-15T23:43:12.348Z").valueOf());
  });
  test("It should get its utc offset", () => {
    expect(getTestDriver().utcOffset()).toBe(new Date("2009-03-15T23:43:12.234Z").getTimezoneOffset());
  });
  test("It should get a unix timestamp", () => {
    expect(getTestDriver().unix()).toBe(Math.floor(new Date("2009-03-15T23:43:12Z").valueOf() / 1000))
  });
  test("It should get the current day", () => {
    expect(getTestDriver().day()).toBe(15);
  });
  test("It should output formatted dates", () => {
    expect(getTestDriver().format("d")).toBe("0");
    expect(getTestDriver().format("dd")).toBe("Su");
    expect(getTestDriver().format("ddd")).toBe("Sun");
    expect(getTestDriver().format("dddd")).toBe("Sunday");
    expect(getTestDriver().format("YY")).toBe("09");
    expect(getTestDriver().format("YYYY")).toBe("2009");
    expect(getTestDriver().format("M")).toBe("3");
    expect(getTestDriver().format("Mo")).toBe("3rd");
    expect(getTestDriver().format("MM")).toBe("03");
    expect(getTestDriver().format("MMM")).toBe("Mar");
    expect(getTestDriver().format("MMMM")).toBe("March");
    expect(getTestDriver().format("Q")).toBe("1");
    expect(getTestDriver().format("Qo")).toBe("1st");
    expect(getTestDriver().format("D")).toBe("15");
    expect(getTestDriver().format("DD")).toBe("15");
    expect(getTestDriver().format("DDD")).toBe("74");
    expect(getTestDriver().format("DDDo")).toBe("74th");
    expect(getTestDriver().format("DDDD")).toBe("074");
    expect(getTestDriver().format("w")).toBe("11");
    expect(getTestDriver().format("wo")).toBe("11th");
    expect(getTestDriver().format("ww")).toBe("11");
    expect(getTestDriver().format("H")).toBe("23");
    expect(getTestDriver().format("HH")).toBe("23");
    expect(getTestDriver().format("h")).toBe("11");
    expect(getTestDriver().format("hh")).toBe("11");
    expect(getTestDriver().format("m")).toBe("43");
    expect(getTestDriver().format("mm")).toBe("43");
    expect(getTestDriver().format("s")).toBe("12");
    expect(getTestDriver().format("ss")).toBe("12");
    expect(getTestDriver().format("a")).toBe("pm");
    expect(getTestDriver().format("A")).toBe("PM");
    expect(getTestDriver().format("Z")).toBe("+00:00");
    expect(getTestDriver().format("ZZ")).toBe("+0000");
    expect(getTestDriver().format("S")).toBe("3");
    expect(getTestDriver().format("SS")).toBe("34");
    expect(getTestDriver().format("SSS")).toBe("345");
    expect(getTestDriver().format("X")).toBe("1237160592345");
    expect(getTestDriver().format("x")).toBe("1237160592");
  });
  test("Format should escape strings.", () => {
    expect(getTestDriver().format("[ a ][a]")).toBe("a[pm]");
  });
  test("Format should parse presets.", () => {
    expect(getTestDriver().format("LT")).toBe("11:43 PM");
    expect(getTestDriver().format("LTS")).toBe("11:43:12 PM");
    expect(getTestDriver().format("LL")).toBe("March 15 2009");
    expect(getTestDriver().format("ll")).toBe("Mar 15 2009");
    expect(getTestDriver().format("LLL")).toBe("March 15 2009 11:43 PM");
    expect(getTestDriver().format("lll")).toBe("Mar 15 2009 11:43 PM");
    expect(getTestDriver().format("LLLL")).toBe("Sunday, March 15 2009 11:43 PM");
    expect(getTestDriver().format("llll")).toBe("Sun, Mar 15 2009 11:43 PM");
  });
  test("Format should parse complex strings.", () => {
    expect(getTestDriver().format("hello, Darling")).toBe("11eMar 15 2009o, 15pmrling");
  });
});
