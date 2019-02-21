# Examples

Below are links to Codesandbox instances for examples of how to use this repo. Feel free to fork these sandboxes and play around with this library's features. If you have any examples of cool uses of this library, submit a PR to add one!

## Basic Usage

Basic functionality of the timeline, included panning, zooming and rendering of items

[Example Codesandbox](https://codesandbox.io/s/w6xvqzno4w)

## Item Moving and Resizing

Moving and Resizing examples. Clicking and dragging can move items into different groups. Notice the `handleItemMove` and `handleItemResize` handlers passed to the Timeline.

[Example Codesandbox](https://codesandbox.io/s/q3rkx1478q)

## Custom Item Rendering

The `itemRenderer` component allows you to customize what contents are shown in the item on the calendar.

[Example Codesandbox](https://codesandbox.io/s/k0wn41y0o7)

<!-- ## Custom Item Rendering using `timelineContext` - position sub items

Using `itemRenderer` and `timelineContext` [docs](https://github.com/namespace-ee/react-calendar-timeline#itemrenderer), you can position elements within the context of the calendar within an item.

[Example Codesandbox](https://codesandbox.io/s/6y15696o23) -->

<!-- ## Custom Item Rendering using `timelineContext` - conditionally render components

Using `itemRenderer` [docs] you can render different components based on the `timelineContext` zoom (`visibleTimeStart` and `visibleTimeEnd`). Zoom in and out to see item render with slightly different elements.

[Example Codesandbox](https://codesandbox.io/s/r74qoxw94p) -->

## Restricting Item Moving and Resizing

You can restrict the moving and resizing of items at the item level by providing a `canMove` and `canResize` property with an item.

[Example Codesandbox](https://codesandbox.io/s/lp887wv6l)

## Right Sidebar

Adding a right sidebar is as easy as passing in a couple of props `rightSidebarWidth` and `rightSidebarContent`. Content in the right column is populated from the `rightTitle` property on the group.

[Example Codesandbox](https://codesandbox.io/s/j3wrw6rl4v)

## Linked Timelines

By managing the the `visibleStartTime` and `visibleEndTime` for multiple timelines, you can syncronize scroll across multiple timelines.

[Example Codesandbox](https://codesandbox.io/s/6j04z5rjjr)

## Tree Groups

Through group manipulation, you can achieve tree group views.

[Example Codesandbox](https://codesandbox.io/s/r1mxzj581m)

Note that this is the user code manipulating groups to achieve tree group functionality. This example is an illustration of how you can achieve this functionality. This is not a feature that is directly supported by the library.

## Programmatically Scrolling

Using `scrollRef` you can trigger scrolling and create an animation. This is an alternative to setting `visibleStartTime` and `visibleEndTime`.

[Example Codesandbox](https://codesandbox.io/s/3kq2503y8p)
