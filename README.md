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
The component can take many parameters.

### groups
Expects either a vanilla JS array or an immutable JS array, consisting of objects with the following attributes:
```
{
  id: 1,
  title: 'group 1'
}
```

### items
Expects either a vanilla JS array or an immutable JS array, consisting of objects with the following attributes:
```
{
  id: 1,
  group: 1,
  title: 'Random title',
  start_time: 1457902922261,
  end_time: 1457902922261 + 86400000,
  canMove: true,
  canResize: false,
  className: 'weekend'
}
```

The preferred (fastest) option is to give unix timestamps in milliseconds for `start_time` and `end_time`. Objects that convert to them (java Date or moment()) will also work, but will be a lot slower.

### keys
An array specifying keys in the `items` and `groups` objects. Defaults to
```
{
  groupIdKey: 'id',
  groupTitleKey: 'title',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start_time',
  itemTimeEndKey: 'end_time'
}
```

### sidebarWidth
Width of the sidebar in pixels. Defaults to `150`.

### dragSnap
Snapping unit when dragging items. Defaults to `15 * 60 * 1000` or 15min. When so, the items will snap to 15min intervals when dragging.

### minResizeWidth
The minimum width, in pixels, of a timeline entry when it's possible to resize. If not reached, you must zoom in to resize more. Default to `20`.

### fixedHeader
How does the header (the scrolling part with dates) behave if not all of the groups fit on the page, resulting in a vertical scrollbar.

* `fixed` - the header is always on the screen
* `none` (default) - the header is always at the top of the component

### zIndexStart
What z-index value do the header and the sidebar have. Default `10`

### lineHeight
Height of one line in the calendar in pizels. Default `30`

### headerLabelGroupHeight
Height of the top header line. Default `30`

### headerLabelHeight
Height of the bottom header line. Default `30`

### itemHeightRatio
What percentage of the height of the line is taken by the item? Default `0.65`

### minZoom
Smallest time the calendar can zoom to in milliseconds. Default `60 * 60 * 1000` (1 hour)

### maxZoom
Largest time the calendar can zoom to in milliseconds. Default `5 * 365.24 * 86400 * 1000` (5 years)

```
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

defaultTimeStart: React.PropTypes.object,
defaultTimeEnd: React.PropTypes.object,

visibleTimeStart: React.PropTypes.number,
visibleTimeEnd: React.PropTypes.number,
onTimeChange: React.PropTypes.func,
onTimeInit: React.PropTypes.func,
onBoundsChange: React.PropTypes.func,

children: React.PropTypes.node
```
