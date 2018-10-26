import { calculateScrollCanvas } from 'lib/utility/calendar'
import moment from 'moment'


const keys = {
    groupIdKey: 'id',
    groupTitleKey: 'title',
    groupRightTitleKey: 'rightTitle',
    itemIdKey: 'id',
    itemTitleKey: 'title',
    itemDivTitleKey: 'title',
    itemGroupKey: 'group',
    itemTimeStartKey: 'start',
    itemTimeEndKey: 'end'
  }
const props = {
  keys,
  lineHeight: 30,
  stackItems: true,
  itemHeightRatio: 0.75
}

const visibleTimeStart = moment('2018-10-26T00:00:00.000')
const visibleTimeEnd = moment('2018-10-27T00:00:00.000')

const state = {
  draggingItem: undefined,
  dragTime: null,
  resizingItem: null,
  resizingEdge: null,
  resizeTime: null,
  newGroupOrder: null,
  canvasTimeStart: moment('2018-10-25T00:00:00.000').valueOf(),
  visibleTimeEnd: visibleTimeStart.valueOf(),
  visibleTimeStart: visibleTimeStart.valueOf()
}

const items = [
  {
    id: '0',
    group: '1',
    start: moment('2018-10-26T10:46:40.000').valueOf(),
    end: moment('2018-10-26T12:40:03.877').valueOf(),
    canMove: false,
    canResize: false
  },
  {
    id: '1',
    group: '1',
    start: moment('2018-10-26T19:06:40.000').valueOf(),
    end: moment('2018-10-26T23:14:35.919').valueOf(),
    canMove: true,
    canResize: 'both'
  },
  {
    id: '2',
    group: '1',
    start: moment('2018-10-27T08:00:00.000').valueOf(),
    end: moment('2018-10-27T13:39:57.548').valueOf(),
    canMove: false,
    canResize: false,
    className: ''
  }
]

const groups = [{ id: '1' }, { id: '2' }]



describe('calculateScrollCanvas', () => {
  it('should calculate new scroll state', () => {
    const result = calculateScrollCanvas(
      visibleTimeStart.clone().add(12,'h').valueOf(),
      visibleTimeEnd.clone().add(12,'h').valueOf(),
      false,
      items,
      groups,
      props,
      state
    )
    expect(result).toMatchSnapshot()
  })
})
