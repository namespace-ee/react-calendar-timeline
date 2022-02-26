"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSubHeaderLabelFormats = exports.defaultHeaderLabelFormats = exports.defaultHeaderFormats = exports.defaultTimeSteps = exports.defaultKeys = void 0;
var defaultKeys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  groupLabelKey: 'title',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start_time',
  itemTimeEndKey: 'end_time'
};
exports.defaultKeys = defaultKeys;
var defaultTimeSteps = {
  second: 1,
  minute: 1,
  hour: 1,
  day: 1,
  month: 1,
  year: 1
};
exports.defaultTimeSteps = defaultTimeSteps;
var defaultHeaderFormats = {
  year: {
    "long": 'YYYY',
    mediumLong: 'YYYY',
    medium: 'YYYY',
    "short": 'YY'
  },
  month: {
    "long": 'MMMM YYYY',
    mediumLong: 'MMMM',
    medium: 'MMMM',
    "short": 'MM/YY'
  },
  week: {
    "long": 'w',
    mediumLong: 'w',
    medium: 'w',
    "short": 'w'
  },
  day: {
    "long": 'dddd, LL',
    mediumLong: 'dddd, LL',
    medium: 'dd D',
    "short": 'D'
  },
  hour: {
    "long": 'dddd, LL, HH:00',
    mediumLong: 'L, HH:00',
    medium: 'HH:00',
    "short": 'HH'
  },
  minute: {
    "long": 'HH:mm',
    mediumLong: 'HH:mm',
    medium: 'HH:mm',
    "short": 'mm'
  },
  second: {
    "long": 'mm:ss',
    mediumLong: 'mm:ss',
    medium: 'mm:ss',
    "short": 'ss'
  } //TODO: delete this

};
exports.defaultHeaderFormats = defaultHeaderFormats;
var defaultHeaderLabelFormats = {
  yearShort: 'YY',
  yearLong: 'YYYY',
  monthShort: 'MM/YY',
  monthMedium: 'MM/YYYY',
  monthMediumLong: 'MMM YYYY',
  monthLong: 'MMMM YYYY',
  dayShort: 'L',
  dayLong: 'dddd, LL',
  hourShort: 'HH',
  hourMedium: 'HH:00',
  hourMediumLong: 'L, HH:00',
  hourLong: 'dddd, LL, HH:00',
  time: 'LLL' //TODO: delete this

};
exports.defaultHeaderLabelFormats = defaultHeaderLabelFormats;
var defaultSubHeaderLabelFormats = {
  yearShort: 'YY',
  yearLong: 'YYYY',
  monthShort: 'MM',
  monthMedium: 'MMM',
  monthLong: 'MMMM',
  dayShort: 'D',
  dayMedium: 'dd D',
  dayMediumLong: 'ddd, Do',
  dayLong: 'dddd, Do',
  hourShort: 'HH',
  hourLong: 'HH:00',
  minuteShort: 'mm',
  minuteLong: 'HH:mm'
};
exports.defaultSubHeaderLabelFormats = defaultSubHeaderLabelFormats;