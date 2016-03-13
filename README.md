# React Calendar Timeline

A modern and responsive react timeline component.

![calendar demo](https://raw.githubusercontent.com/namespace-ee/react-calendar-timeline/master/doc/demo.gif)

Demo here: http://namespace.ee/react-calendar-timeline/

## Getting started

```
npm install --save react-calendar-timeline
```

`react-calendar-timeline` has `react`, `react-dom`, [`moment`](http://momentjs.com/) and [`interact.js`](http://interactjs.io/docs/) as peer dependencies.

You need to install them separately:

```
npm install --save react react-dom # you probably already have these
npm install --save moment interact.js
```

## Usage

At the very minimum:

```jsx
import Timeline from 'react-calendar-timeline'
import moment from 'moment'

const groups = [
  {id: 1, title: 'group 1'},
  {id: 2, title: 'group 2'}
]

const items = [
  {id: 1, group: 1, title: 'item 1', start_time: moment(), end_time: moment().add(1, 'hour')},
  {id: 2, group: 2, title: 'item 2', start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour')},
  {id: 3, group: 1, title: 'item 3', start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour')}
]

ReactDOM.render(
  <div>
    Rendered by react!
    <Timeline groups={groups}
              items={items}
              defaultTimeStart={moment().add(-12, 'hour')}
              defaultTimeEnd={moment().add(12, 'hour')}
              />
  </div>,
  document.getElementById('root')
);
```

## API
```
groups: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]).isRequired,
items: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]).isRequired,
sidebarWidth: React.PropTypes.number,
dragSnap: React.PropTypes.number,
minResizeWidth: React.PropTypes.number,
fixedHeader: React.PropTypes.oneOf(['fixed', 'absolute', 'none']),
zIndexStart: React.PropTypes.number,
lineHeight: React.PropTypes.number,
headerLabelGroupHeight: React.PropTypes.number,
headerLabelHeight: React.PropTypes.number,

minZoom: React.PropTypes.number,
maxZoom: React.PropTypes.number,

canChangeGroup: React.PropTypes.bool,
canMove: React.PropTypes.bool,
canResize: React.PropTypes.bool,
useResizeHandle: React.PropTypes.bool,

stackItems: React.PropTypes.bool,

traditionalZoom: React.PropTypes.bool,

itemTouchSendsClick: React.PropTypes.bool,

onItemMove: React.PropTypes.func,
onItemResize: React.PropTypes.func,
onItemClick: React.PropTypes.func,
onCanvasClick: React.PropTypes.func,
onItemDoubleClick: React.PropTypes.func,

moveResizeValidator: React.PropTypes.func,

dayBackground: React.PropTypes.func,

style: React.PropTypes.object,
keys: React.PropTypes.object,

defaultTimeStart: React.PropTypes.object,
defaultTimeEnd: React.PropTypes.object,

visibleTimeStart: React.PropTypes.number,
visibleTimeEnd: React.PropTypes.number,
onTimeChange: React.PropTypes.func,
onTimeInit: React.PropTypes.func,
onBoundsChange: React.PropTypes.func,

children: React.PropTypes.node
```
