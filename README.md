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
  canChangeGroup: false,
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

### canMove
Can items be dragged around? Can be overridden in the `items` array. Defaults to `true`

### canChangeGroup
Can items be moved between groups? Can be overridden in the `items` array. Defaults to `true`

### canResize
Can items be resized? Can be overridden in the `items` array. Defaults to `true`

### useResizeHandle
Append a special `.rct-drag-right` handle to the elements and only resize if dragged from there. Defaults to `false`

### stackItems
Stack items under each other, so there is no visual overlap when times collide. Defaults to `false`.

### traditionalZoom
Zoom in when scrolling the mouse up/down. Defaults to `false`

### itemTouchSendsClick
Normally tapping (touching) an item selects it. If this is set to true, a tap will have the same effect, as selecting with the first click and then clicking again to open and send the onItemClick event. Defaults to `false`.

### timeSteps
With what step to display different units. E.g. `15` for `minute` means only minutes 0, 15, 30 and 45 will be shown.

Default:
```js
{
  second: 1,
  minute: 1,
  hour: 1,
  day: 1,
  month: 1,
  year: 1
}
```

### onItemMove(itemId, dragTime, newGroupOrder)
Callback when an item is moved. Returns 1) the item's ID, 2) the new start time and 3) the index of the new group in the `groups` array.

### onItemResize(itemId, newResizeEnd)
Callback when an item is resized. Returns 1) the item's ID, 2) the new end time of the item

### onItemSelect(itemId, e)
Called when an item is selected. This is sent on the first click on an item.

### onItemClick(itemId, e)
Called when an item is clicked. Note: the item must be selected before it's clicked... except if it's a touch event and `itemTouchSendsClick` is enabled.

### onCanvasClick(groupId, time, e)
Called when an empty spot on the canvas was clicked. Get the group ID and the time as arguments. For example open a "new item" window after this.

### onItemDoubleClick(itemId, e)
Called when an item was double clicked

### onItemContextMenu(itemId, e)
Called when the item is clicked by the right button of the mouse. Note: If this property is set the default context menu doesn't appear

### moveResizeValidator(action, itemId, time)
This function is called when an item is being moved or resized. It's up to this function to return a new version of `change`, when the proposed move would violate business logic.

The argument `action` is one of `move` or `resize`.

The argument `time` describes the proposed new time for either the start time of the item (for move) or the end time (for resize).

The function must return a new unix timestamp in milliseconds... or just `time` if the proposed new time doesn't interfere with business logic.

For example, to prevent moving of items into the past, but to keep them at 15min intervals, use this code:

```js
function(action, item, time) {
  if (time < new Date().getTime()) {
    var newTime = Math.ceil(new Date().getTime() / (15*60*1000)) * (15*60*1000);
    return newTime;
  }

  return time
}
```

### defaultTimeStart and defaultTimeEnd
Unless overridden by `visibleTimeStart` and `visibleTimeEnd`, specify where the calendar begins and where it ends. This parameter expects a Date or moment object.

### visibleTimeStart and visibleTimeEnd
The exact viewport of the calendar. When these are specified, scrolling in the calendar must be orchestrated by the `onTimeChange` function.

### onTimeChange(visibleTimeStart, visibleTimeEnd)
A function called when the user tries to scroll. If you control `visibleTimeStart` and `visibleTimeEnd` yourself, use the parameters to this function to change them.
Otherwise use it as a filter for what the user can see. The function is bound to the calendar component, so for uncontrolled, and yet bound usage, you must call `this.updateScrollCanvas` with the updated visibleTimeStart and visibleTimeEnd.

Here is an example that limits the timeline to only show dates starting 6 months from now and ending in 6 months.

```js
// this limits the timeline to -6 months ... +6 months
var minTime = moment().add(-6, 'months').valueOf()
var maxTime = moment().add(6, 'months').valueOf()

function (visibleTimeStart, visibleTimeEnd) {
  if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
    this.updateScrollCanvas(minTime, maxTime)
  } else if (visibleTimeStart < minTime) {
    this.updateScrollCanvas(minTime, minTime + (visibleTimeEnd - visibleTimeStart))
  } else if (visibleTimeEnd > maxTime) {
    this.updateScrollCanvas(maxTime - (visibleTimeEnd - visibleTimeStart), maxTime)
  } else {
    this.updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
  }
}
```

### onTimeInit(visibleTimeStart, visibleTimeEnd)
Called when the calendar is first initialised

### onBoundsChange(canvasTimeStart, canvasTimeEnd)
Called when the bounds in the calendar's canvas change. Use it for example to load new data to display. (see "Behind the scenes" below)

### children
All children of the Timeline component will be displayed above the sidebar. Use this to display small filters or so.

## FAQ

### How can I have items with different colors?

[Items](https://github.com/namespace-ee/react-calendar-timeline#items) have a "className" parameter. For example if you have "standard" items and "analysis" items, then you can just add an "analysis" class for your analysis items and then change the css backgroundColor property for them.

You will then need to override the default CSS rule:

```
.react-calendar-timeline .rct-items .rct-item.analysis {
  backgroundColor: #68efad;
}
```


## Behind the scenes
The timeline is built with speed, usability and extensibility in mind.

Speed: The calendar itself is actually a 3x wide scrolling canvas of the screen. All scroll events left and right happen naturally, like scrolling any website. When the timeline has scrolled enough (50% of the invisible surface on one side), we change the "position:absolute;left:{num}px;" variables of each of the visible items and scroll the canvas back. When this happens, the `onBoundsChange` prop is called.

This results in a visually endless scrolling canvas with optimal performance.

Extensibility and usability: While some parameters (`onTimeChange`, `moveResizeValidator`) might be hard to configure, these are design decisions to make it as extensible as possible. If you have recipes for common tasks regarding those parameters, send a PR to add them to this doc.
