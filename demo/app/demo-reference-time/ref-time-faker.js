import faker from 'faker'
import randomColor from 'randomcolor'
import moment from 'moment'

export default function (refTimeInMillis, groupCount = 6, itemCount = 100) {
  const ONE_WEEK = 7 * 24 * 60 * 60 * 1000

  const earliestDate = new Date(refTimeInMillis - ONE_WEEK)
  const latestDate = new Date(refTimeInMillis + ONE_WEEK)
  let randomSeed = Math.floor(Math.random() * 1000)
  let groups = []
  for (let i = 0; i < groupCount; i++) {
    groups.push({
      id: `${i + 1}`,
      title: faker.name.firstName(),
      rightTitle: faker.name.lastName(),
      bgColor: randomColor({ luminosity: 'light', seed: randomSeed + i })
    })
  }

  let items = []
  for (let i = 0; i < itemCount; i++) {
    const startDate = faker.date.between(earliestDate, latestDate)
    const startValue = Math.floor(moment(startDate).valueOf() / 10000000) * 10000000
    const endValue = moment(startDate + faker.random.number({min: 2, max: 20}) * 15 * 60 * 1000).valueOf()

    items.push({
      id: i + '',
      group: faker.random.number({ min: 1, max: groups.length }) + '',
      title: faker.hacker.phrase(),
      start: startValue,
      end: endValue,
      canMove: true,
      canResize: 'both',
      className: (moment(startDate).day() === 6 || moment(startDate).day() === 0) ? 'item-weekend' : '',
      itemProps: {
        'data-tip': faker.hacker.phrase()
      }
    })
  }

  items = items.sort((a, b) => b - a)

  return { groups, items }
}
