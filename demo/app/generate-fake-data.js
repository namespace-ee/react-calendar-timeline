import faker from 'faker'
import moment from 'moment'

const GROUP_COUNT = 30
const ITEM_COUNT = 1000
const DAYS_IN_PAST = 30

export default function () {
  let groups = []
  for (let i = 0; i < GROUP_COUNT; i++) {
    groups.push({
      id: `${i + 1}`,
      title: faker.name.firstName(),
      rightTitle: faker.name.lastName()
    })
  }

  let items = []
  for (let i = 0; i < ITEM_COUNT; i++) {
    const startDate = faker.date.recent(DAYS_IN_PAST).valueOf() + (DAYS_IN_PAST * 0.3) * 86400 * 1000
    const startValue = Math.floor(moment(startDate).valueOf() / 10000000) * 10000000
    const endValue = moment(startDate + faker.random.number({min: 2, max: 20}) * 15 * 60 * 1000).valueOf()

    items.push({
      id: i + '',
      group: faker.random.number({ min: 1, max: groups.length }) + '',
      title: faker.hacker.phrase(),
      start: startValue,
      end: endValue,
      canMove: startValue > new Date().getTime(),
      canResize: startValue > new Date().getTime() ? (endValue > new Date().getTime() ? 'both' : 'left') : (endValue > new Date().getTime() ? 'right' : false),
      className: (moment(startDate).day() === 6 || moment(startDate).day() === 0) ? 'item-weekend' : '',
      itemProps: {
        'data-tip': faker.hacker.phrase()
      }
    })
  }

  items = items.sort((a, b) => b - a)

  return { groups, items }
}
