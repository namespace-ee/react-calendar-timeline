import { getMinUnit } from "lib/utility/calendar";
import { defaultTimeSteps } from "lib/default-config";

describe("getMinUnit", () => {
  // this is the happy path and used as safety net if we make any refactorings
  // to this function.  There seem to be a ton of edge cases here...
  describe("standard width of 1200", () => {
    const standardWidth = 1200;
    it("should be second for one minute duration", () => {
      const oneMinute = 60000; // 1 minute in ms
      const result = getMinUnit(oneMinute, standardWidth, defaultTimeSteps);

      expect(result).toBe("second");
    });
    it("should be minute for one hour duration", () => {
      const oneHour = 3600000; // 1 hour in ms
      const result = getMinUnit(oneHour, standardWidth, defaultTimeSteps);

      expect(result).toBe("minute");
    });
    it("should be hour for one day duration", () => {
      const oneDay = 86400000; // 1 day in ms
      const result = getMinUnit(oneDay, standardWidth, defaultTimeSteps);

      expect(result).toBe("hour");
    });
    it("should be day for one week duration", () => {
      const oneWeek = 604800000; // 1 week in ms
      const result = getMinUnit(oneWeek, standardWidth, defaultTimeSteps);

      expect(result).toBe("day");
    });
    it("should be day for one month duration", () => {
      const oneMonth = 2592000000; // 1 month (~30 days) in ms
      const result = getMinUnit(oneMonth, standardWidth, defaultTimeSteps);

      expect(result).toBe("day");
    });
    it("should be month for one year duration", () => {
      const oneYear = 31536000000; // 1 year (~365 days) in ms
      const result = getMinUnit(oneYear, standardWidth, defaultTimeSteps);

      expect(result).toBe("month");
    });
  });
});
