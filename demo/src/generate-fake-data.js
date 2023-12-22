import { faker } from '@faker-js/faker'
import randomColor from 'randomcolor'
import dayjs from 'dayjs'

export default function (groupCount = 30, itemCount = 1000, daysInPast = 30) {
  let randomSeed = Math.floor(Math.random() * 1000)
  let groups = []
  for (let i = 0; i < groupCount; i++) {
    groups.push({
      id: `${i + 1}`,
      title: faker.person.firstName(),
      rightTitle: faker.person.lastName(),
      label: `Label ${faker.person.firstName()}`,
      bgColor: randomColor({ luminosity: 'light', seed: randomSeed + i }),
    })
  }

  let items = []
  for (let i = 0; i < itemCount; i++) {
    const startDate =
      faker.date.recent({ days: daysInPast }).valueOf() +
      daysInPast * 0.3 * 86400 * 1000
    const startValue =
      Math.floor(dayjs(startDate).valueOf() / 10000000) * 10000000
    const endValue = dayjs(
      startDate + faker.number.int({ min: 2, max: 20 }) * 15 * 60 * 1000,
    ).valueOf()

    items.push({
      id: i + '',
      group: faker.number.int({ min: 1, max: groups.length }) + '',
      title: faker.hacker.phrase(),
      start: startValue,
      end: endValue,
      canMove: startValue > new Date().getTime(),
      canResize:
        startValue > new Date().getTime()
          ? endValue > new Date().getTime()
            ? 'both'
            : 'left'
          : endValue > new Date().getTime()
            ? 'right'
            : false,
      className:
        dayjs(startDate).day() === 6 || dayjs(startDate).day() === 0
          ? 'item-weekend'
          : '',
      bgColor: randomColor({
        luminosity: 'light',
        seed: randomSeed + i,
        format: 'rgba',
        alpha: 0.6,
      }),
      selectedBgColor: randomColor({
        luminosity: 'light',
        seed: randomSeed + i,
        format: 'rgba',
        alpha: 1,
      }),
      color: randomColor({ luminosity: 'dark', seed: randomSeed + i }),
      itemProps: {
        'data-tip': faker.hacker.phrase(),
      },
    })
  }

  items = items.sort((a, b) => b - a)

  return { groups, items }
}
