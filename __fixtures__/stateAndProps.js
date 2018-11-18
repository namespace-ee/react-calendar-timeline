import { defaultKeys } from 'lib/default-config'
import moment from 'moment'

export const props = {
  keys: defaultKeys,
  lineHeight: 30,
  stackItems: true,
  itemHeightRatio: 0.75
}

export const visibleTimeStart = moment('2018-10-26T00:00:00.000')
export const visibleTimeEnd = moment('2018-10-27T00:00:00.000')

export const state = {
  draggingItem: undefined,
  dragTime: null,
  resizingItem: null,
  resizingEdge: null,
  resizeTime: null,
  newGroupOrder: null,
  canvasTimeStart: moment('2018-10-25T00:00:00.000').valueOf(),
  visibleTimeEnd: visibleTimeEnd.valueOf(),
  visibleTimeStart: visibleTimeStart.valueOf()
}
