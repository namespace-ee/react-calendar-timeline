import moment from 'moment'

export const items = [
  {
    id: '0',
    group: '1',
    start_time: moment('2018-10-26T10:46:40.000').valueOf(),
    end_time: moment('2018-10-26T12:40:03.877').valueOf(),
    canMove: false,
    canResize: false
  },
  {
    id: '5',
    group: '1',
    start_time: moment('2018-10-26T08:46:40.000').valueOf(),
    end_time: moment('2018-10-26T14:40:03.877').valueOf(),
    canMove: false,
    canResize: false,
    className: ''
  },
  {
    id: '6',
    group: '1',
    start_time: moment('2018-10-26T13:46:40.000').valueOf(),
    end_time: moment('2018-10-26T20:40:03.877').valueOf(),
    canMove: false,
    canResize: false,
    className: ''
  },
  {
    id: '1',
    group: '1',
    start_time: moment('2018-10-26T19:06:40.000').valueOf(),
    end_time: moment('2018-10-26T23:14:35.919').valueOf(),
    canMove: true,
    canResize: 'both'
  },
  {
    id: '2',
    group: '1',
    start_time: moment('2018-10-27T08:00:00.000').valueOf(),
    end_time: moment('2018-10-27T13:39:57.548').valueOf(),
    canMove: false,
    canResize: false,
    className: ''
  },
  {
    id: '3',
    group: '3',
    start_time: moment('2018-10-27T18:00:00.000').valueOf(),
    end_time: moment('2018-10-27T23:39:57.548').valueOf(),
    canMove: false,
    canResize: false,
    className: ''
  }
]

export const groups = [{ id: '1' }, { id: '2' }, { id: '3' }]
