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
    long: '16 nsec',
    mediumLong: '16 nsec',
    medium: '16',
    short: '16',
  },
  blocks2: {
    long: '96 nsec',
    mediumLong: '96 nsec',
    medium: '96',
    short: '96',
  },
  // blocks3: {
  //   long: '480 nsec',
  //   mediumLong: '480 nsec',
  //   medium: '480',
  //   short: '480',
  // },
  // blocks4: {
  //   long: '1.92 usec',
  //   mediumLong: '1.92 usec',
  //   medium: '1.9',
  //   short: '1.9',
  // },
  // blocks5: {
  //   long: '9.6 usec',
  //   mediumLong: '9.6 usec',
  //   medium: '9.6',
  //   short: '9.6',
  // },
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
