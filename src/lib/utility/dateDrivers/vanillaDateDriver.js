const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function vanillaDateDriver(date) {
  const innerDate = new Date(date);

  const dealiasUnit = (rawUnit) => {
    // Months have an exception as they collide with minutes in their shorthand.
    if (rawUnit === "M") {
      return "month";
    }
    const unit = rawUnit.toLowerCase();
    if (unit === "year" || unit === "years" || unit === "y") {
      return "year";
    }
    if (unit === "month" || unit === "months") {
      return "month";
    }
    if (unit === "week" || unit === "weeks" || unit === "w") {
      return "week";
    }
    if (unit === "date" || unit === "dates" || unit === "day" || unit === "days" || unit === "d") {
      return "date";
    }
    if (unit === "hour" || unit === "hours" || unit === "h") {
      return "hour";
    }
    if (unit === "minute" || unit === "minutes" || unit === "m") {
      return "minute";
    }
    if (unit === "second" || unit === "seconds" || unit === "s") {
      return "second";
    }
    if (unit === "millisecond" || unit === "milliseconds" || unit === "ms") {
      return "ms";
    }
    return rawUnit;
  }

  return {
    startOf: function (unit) {
      unit = dealiasUnit(unit);
      const startOfWeek = (iso) => {
        if (iso) {
          return innerDate.getDate() - innerDate.getUTCDay();
        }
        return innerDate.getDate() - innerDate.getDay();
      }
      const steps = [
        "year",
        "quarter",
        "month",
        "week",
        "isoWeek",
        "day",
        "date",
        "hour",
        "minute",
        "second",
      ];
      const startOfLadder = [
        ["setMonth", 0, "month"],
        ["setMonth", Math.floor(innerDate.getMonth() / 4), "month"],
        ["setDate", 1, "day"],
        ["setDate", startOfWeek(false), "day"],
        ["setDate", startOfWeek(true), "day"],
        ["setHours", 0, "hour"],
        ["setHours", 0, "hour"],
        ["setMinutes", 0, "minute"],
        ["setSeconds", 0, "second"],
        ["setMilliseconds", 0, null],
      ];

      while (unit) {
        const [method, value, next] = startOfLadder[steps.indexOf(unit)];
        unit = next;
        innerDate[method](value);
      }
      return this;
    },
    endOf: function (raw) {
      let unit = dealiasUnit(raw);

      if (unit === "quarter") {
        // Months all have different lengths, so this gets handled dumb.
        const m = this.get("month");
        innerDate.setMonth(m + 3 - (m % 3));
        this.startOf("month");
        this.add(-1, "ms");
        return this;
      }

      if (unit === "isoWeek") {
        unit = "week";
      }

      let addUnit = unit;
      let addAmount = 1;
      this.add(addAmount, addUnit);
      this.startOf(unit);
      this.add(-1, "ms");
      return this;
    },
    add: function (amount, raw) {
      let unit = dealiasUnit(raw);

      // There isn't a set week method. We can make do.
      if (unit === "week") {
        unit = "date";
        amount = amount * 7;
      }

      const methods = {
        year: "setYear",
        month: "setMonth",
        date: "setDate",
        hour: "setHours",
        minute: "setMinutes",
        second: "setSeconds",
        ms: "setMilliseconds",
      };
      try {
        innerDate[methods[unit]](this.get(unit) + amount);
      }
      catch (e) {
        throw new Error(`${raw} is not recognized as a valid unit.`)
      }
      return this;
    },
    valueOf: function () {
      return innerDate.valueOf();
    },
    unix: function () {
      return Math.floor(innerDate.valueOf() / 1000);
    },
    get: function(raw) {
      const unit = dealiasUnit(raw);
      if (unit === "week") {
        return parseInt(this.format("w"));
      }
      const methods = {
        "year": "getFullYear",
        "month": "getMonth",
        "date": "getDate",
        "hour": "getHours",
        "minute": "getMinutes",
        "second": "getSeconds",
        "ms": "getMilliseconds",
      }
      try {
        return innerDate[methods[unit]]();
      }
      catch (e) {
        throw new Error(`${raw} is not recognized as a valid unit.`)
      }
    },
    v: innerDate.toString(),
    day: function() {
      return this.get("date");
    },
    utcOffset: function() {
      return innerDate.getTimezoneOffset();
    },
    clone: function() {
      return vanillaDateDriver(this.valueOf());
    },
    format: function(format) {
      const toOrd = (num) => {
        if (num % 100 !== 11 && num % 10 === 1) {
          return `${num}st`;
        }
        if (num % 100 !== 12 && num % 10 === 2) {
          return `${num}nd`;
        }
        if (num % 100 !== 13 && num % 10 === 3) {
          return `${num}rd`;
        }
        return `${num}th`;
      }
      const pad = (num, len) => {
        let str = `${num}`;
        while (str.length < len) {
          str = `0${str}`;
        }
        return str;
      }
      const formats = {
        d: () => {
          return innerDate.getDay();
        },
        dd: () => {
          return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][formats.d()];
        },
        ddd: () => {
          return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][formats.d()];
        },
        dddd: () => {
          return [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ][formats.d()];
        },
        YY: () => {
          return pad(innerDate.getFullYear() % 100, 2);
        },
        YYYY: () => {
          return innerDate.getFullYear();
        },
        M: () => {
          return innerDate.getMonth() + 1;
        },
        Mo: () => {
          const M = formats.M();
          return toOrd(M);
        },
        MM: () => {
          return pad(innerDate.getMonth() + 1, 2);
        },
        MMM: () => {
          return [
            0,
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ][formats.M()];
        },
        MMMM: () => {
          return [
            0,
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ][formats.M()];
        },
        Q: () => {
          return Math.floor((formats.M() - 1) / 4) + 1;
        },
        Qo: () => {
          return toOrd(formats.Q());
        },
        D: () => {
          return innerDate.getDate();
        },
        Do: () => {
          return toOrd(formats.D());
        },
        DD: () => {
          return pad(formats.D(), 2);
        },
        DDD: () => {
          const isLeap = (() => {
            const y = innerDate.getFullYear();
            return !(y % 4) && (!(y % 100) || y % 400);
          });
          const months = [
            31,
            isLeap() ? 29 : 28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31,
          ];
          const m = innerDate.getMonth();
          let DDD = 0;
          for (let i = 0; i < m; i++) {
            DDD += months[i];
          }
          return DDD + formats.D();
        },
        DDDo: () => {
          return toOrd(formats.DDD());
        },
        DDDD: () => {
          return pad(formats.DDD(), 3);
        },
        w: () => {
          let yearStart = vanillaDateDriver(innerDate.valueOf()).startOf("year").valueOf();
          const weekStart = vanillaDateDriver(yearStart).startOf("week").valueOf();
          const elapsedMs = innerDate.valueOf() - weekStart;
          return Math.floor(elapsedMs / WEEK_MS);
        },
        wo: () => {
          return toOrd(formats.w());
        },
        ww: () => {
          return pad(formats.w(), 2);
        },
        H: () => {
          return innerDate.getHours();
        },
        HH: () => {
          return pad(formats.H(), 2);
        },
        h: () => {
          let H = innerDate.getHours();
          H = H > 12 ? H - 12 : H;
          return H || 12;
        },
        hh: () => {
          return pad(formats.h(), 2);
        },
        m: () => {
          return innerDate.getMinutes();
        },
        mm: () => {
          return pad(formats.m(), 2);
        },
        s: () => {
          return innerDate.getSeconds();
        },
        ss: () => {
          return pad(formats.s(), 2);
        },
        a: () => {
          return formats.H() < 13 ? "am" : "pm";
        },
        A: () => {
          return formats.a().toUpperCase();
        },
        Z: () => {
          const tz = innerDate.getTimezoneOffset();
          return `${tz <= 0 ? "+" : "-"}${pad(Math.floor(tz / 60), 2)}:${pad(tz % 60, 2)}`;
        },
        ZZ: () => {
          return formats.Z().replace(":", "");
        },
        S: () => {
          return Math.floor(innerDate.getMilliseconds() / 100);
        },
        SS: () => {
          return Math.floor(innerDate.getMilliseconds() / 10);
        },
        SSS: () => {
          return innerDate.getMilliseconds();
        },
        X: () => {
          return innerDate.getTime();
        },
        x: () => {
          return Math.floor(innerDate.getTime() / 1000);
        },
      };

      const presets = {
        LT: "h:mm A",
        LTS: "h:mm:ss A",
        LL: "MMMM D YYYY",
        ll: "MMM D YYYY",
        LLL: "MMMM D YYYY hh:mm A",
        lll: "MMM D YYYY hh:mm A",
        LLLL: "dddd, MMMM D YYYY hh:mm A",
        llll: "ddd, MMM D YYYY hh:mm A",
      }

      let output = "";
      let idx = -1;
      const next = () => {
        idx += 1;
        return format.length > idx ? format.substring(idx, idx + 1) : null;
      }
      const rewind = () => {
        idx -= 1;
      }
      const peek = (num = 1) => {
        return format.length > idx + 1 ? format.substring(idx + num, idx + num + 1) : null;
      }

      const formatTokens = Object.keys(formats);
      while (idx < format.length) {
        let currentToken = next();

        // Handle format strings.
        let lastValidToken = "";
        while (formatTokens.includes(currentToken) || (typeof currentToken === "string" && currentToken.match(/^Y{1,4}$/))) {
          lastValidToken = currentToken;
          currentToken = currentToken.concat(next());
        }
        if (lastValidToken) {
          // Render the token.
          // A character was consumed that shouldn't have been.
          rewind();
          output += formats[lastValidToken]();
          continue;
        }

        // Handle escape sequences.
        if (currentToken === "[" && peek() === " ") {
          // Consume the space.
          next();
          let nextChar = next();
          let escape = "";
          while (nextChar !== " " && peek() !== "]") {
            escape += nextChar;
            nextChar = next();
            if (nextChar === null) {
              throw new Error(`Unterminated escape sequence in ${format}`);
            }
          }
          // Consume the closing bracket.
          next();
          output += escape;
          continue;
        }

        // Handle presets.
        if (currentToken === "l" || currentToken === "L") {
          let presetToken = currentToken + next();
          let lastValidPreset = "";
          while (Object.keys(presets).includes(presetToken)) {
            lastValidPreset = presetToken;
            presetToken += next();
          }

          if (lastValidPreset) {
            // Return the last consumed character.
            rewind();
            output += this.format(presets[lastValidPreset]);
            continue;
          }

          // If the string wasn't a valid preset, rewind the format.
          for (let i = 0; i < presetToken.length - currentToken.length; i++) {
            rewind();
          }
        }

        // Default.
        if (currentToken !== null) {
          // If the token isn't a format, add it directly.
          output += currentToken;
        }
      }
      return output;
    }
  }
}

module.exports = {vanillaDateDriver};
