import type { TimelineGroupBase, TimelineItemBase } from 'lib/types/main'

export const items: TimelineItemBase<number>[] = [
  {
    id: '0',
    group: '1',
    start_time: 1540540000000,
    end_time: 1540546803877,
    canMove: false,
    canResize: false
  },
  {
    id: '5',
    group: '1',
    start_time: 1540532800000,
    end_time: 1540554003877,
    canMove: false,
    canResize: false,
    className: ''
  },
  {
    id: '6',
    group: '1',
    start_time: 1540550800000,
    end_time: 1540575603877,
    canMove: false,
    canResize: false,
    className: ''
  },
  {
    id: '1',
    group: '1',
    start_time: 1540570000000,
    end_time: 1540584875919,
    canMove: true,
    canResize: 'both'
  },
  {
    id: '2',
    group: '1',
    start_time: 1540620000000,
    end_time: 1540640397548,
    canMove: false,
    canResize: false,
    className: ''
  },
  {
    id: '3',
    group: '3',
    start_time: 1540656000000,
    end_time: 1540676397548,
    canMove: false,
    canResize: false,
    className: ''
  }
]

export const groups: TimelineGroupBase[] = [
  { id: '1', title: 'Group 1' },
  { id: '2', title: 'Group 2' },
  { id: '3', title: 'Group 3' },
]
