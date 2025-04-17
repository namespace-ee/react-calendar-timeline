export const defaultKeys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  groupLabelKey: 'title',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start_time',
  itemTimeEndKey: 'end_time',
}

const customDefaultTimeSteps = {
  blocks1: 1,
  blocks2: 1,
  blocks3: 1,
  blocks4: 1,
  blocks5: 1,
  blocks6: 1,
  blocks7: 1,
  blocks8: 1,
  blocks9: 1,
}

const originalDefaultTimeSteps = {
  second: 1,
  minute: 1,
  hour: 1,
  day: 1,
  month: 1,
  year: 1,
}

export const defaultTimeSteps = { ...customDefaultTimeSteps, ...originalDefaultTimeSteps }

type UnitValue = {
  long: string
  mediumLong: string
  medium: string
  short: string
}

const customDefaultHeaderFormats: Record<string, UnitValue> = {
  blocks1: {
    long: '8 nsec',
    mediumLong: '8 nsec',
    medium: '8ns',
    short: '8ns',
  },
  blocks2: {
    long: '16 nsec',
    mediumLong: '16 nsec',
    medium: '16',
    short: '16',
  },
  blocks3: {
    long: '0.8 usec',
    mediumLong: '0.8 usec',
    medium: '.8us',
    short: '.8us',
  },
  blocks4: {
    long: '20 usec',
    mediumLong: '20 usec',
    medium: '20',
    short: '20',
  },
  blocks5: {
    long: '1 msec',
    mediumLong: '1 msec',
    medium: '1ms',
    short: '1ms',
  },
  blocks6: {
    long: '25 msec',
    mediumLong: '25 msec',
    medium: '25',
    short: '25',
  },
  blocks7: {
    long: '1 sec',
    mediumLong: '1 sec',
    medium: '1s',
    short: '1s',
  },
  blocks8: {
    long: '1 min',
    mediumLong: '1 min',
    medium: '1m',
    short: '1m',
  },
  blocks9: {
    long: '1 hour',
    mediumLong: '1 hour',
    medium: '1h',
    short: '1h',
  },
}

const originalDefaultHeaderFormats: Record<string, UnitValue> = {
  year: {
    long: 'YYYY',
    mediumLong: 'YYYY',
    medium: 'YYYY',
    short: 'YY',
  },
  month: {
    long: 'MMMM YYYY',
    mediumLong: 'MMMM',
    medium: 'MMMM',
    short: 'MM/YY',
  },
  week: {
    long: 'w',
    mediumLong: 'w',
    medium: 'w',
    short: 'w',
  },
  day: {
    long: 'dddd, LL',
    mediumLong: 'dddd, LL',
    medium: 'dd D',
    short: 'D',
  },
  hour: {
    long: 'dddd, LL, HH:00',
    mediumLong: 'L, HH:00',
    medium: 'HH:00',
    short: 'HH',
  },
  minute: {
    long: 'HH:mm',
    mediumLong: 'HH:mm',
    medium: 'HH:mm',
    short: 'mm',
  },
  second: {
    long: 'mm:ss',
    mediumLong: 'mm:ss',
    medium: 'mm:ss',
    short: 'ss',
  },
}

export const defaultHeaderFormats: Record<string, UnitValue> = {
  ...customDefaultHeaderFormats,
  ...originalDefaultHeaderFormats,
}
