import { defaultKeys } from 'lib/default-config'
import {items} from './itemsAndGroups'
export const props = {
  keys: defaultKeys,
  lineHeight: 30,
  stackItems: true,
  itemHeightRatio: 0.75
}

export const propsNoStack = {
  ...props,
  stackItems: false,
}

export const visibleTimeStart = 1540501200000
export const visibleTimeEnd = 1540587600000

export const state = {
  draggingItem: undefined,
  dragTime: null,
  resizingItem: null,
  resizingEdge: null,
  resizeTime: null,
  newGroupOrder: null,
  canvasTimeStart: 1540414800000,
  visibleTimeEnd: visibleTimeEnd,
  visibleTimeStart: visibleTimeStart,
  canvasTimeEnd: 1540674000000,
  width: 1000,
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