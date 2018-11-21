import { defaultKeys } from 'lib/default-config'
import moment from 'moment'
import {items} from './itemsAndGroups'
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
  visibleTimeStart: visibleTimeStart.valueOf(),
  canvasTimeEnd: 1540674000000
}

//offset 1 hour
const timeOffset = 1 * 60 *60 *1000

export const stateMoveItem = {
  ...state,
  draggingItem: items[0].id,
  dragTime: items[0].start_time+timeOffset,
  newGroupOrder: 0,
}
export const stateResizeItemLeft = {
  ...state,
  resizingItem: items[0].id,
  resizingEdge: 'left',
  resizeTime: items[0].start_time+timeOffset,
  newGroupOrder: 0,
}

export const stateResizeItemRight = {
  ...state,
  resizingItem: items[0].id,
  resizingEdge: 'right',
  resizeTime: items[0].end_time+timeOffset,
  newGroupOrder: 0,
}