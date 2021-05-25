import { vanillaDateDriver } from "./dateDrivers/vanillaDateDriver";
// If someone overwrites this, they wanted to.
const obscureKey = "reactCalendarTimelineDateDriver";

if (!window[obscureKey]) {
  window[obscureKey] = (function () {
    let driver = vanillaDateDriver;
    const service = {
      get: () => {
        return driver
      },
      set: (driver) => {
        return driver;
      }
    };
    Object.freeze(service);
    return service;
  })();
}

export const setDateDriver = window[obscureKey].set;
export const dateDriver = window[obscureKey].get();
