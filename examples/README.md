# Examples

Below are links to Codesandbox instances for examples of how to use this repo. Feel free to fork these sandboxes and play around with this library's features. If you have any examples of cool uses of this library, submit a PR to add one!

## Basic Usage

Basic functionality of the timeline, included panning, zooming and rendering of items

[Example Codesandbox](https://codesandbox.io/s/lyjr9p0119)

## Item Moving and Resizing

Moving and Resizing examples. Clicking and dragging can move items into different groups. Notice the `handleItemMove` and `handleItemResize` handlers passed to the Timeline.

[Example Codesandbox](https://codesandbox.io/s/ww7wr5k8ww)

## Custom Item Rendering - Basic

The `itemRenderer` component allows you to customize what contents are shown in the item on the calendar.

[Example Codesandbox](https://codesandbox.io/s/o7kwxwxmp9)

## Custom Item Rendering using `timelineContext` - position sub items

Using `itemRenderer` and `timelineContext` [docs](https://github.com/namespace-ee/react-calendar-timeline#itemrenderer), you can position elements within the context of the calendar within an item.

[Example Codesandbox](https://codesandbox.io/s/6y15696o23)

## Custom Item Rendering using `timelineContext` - conditionally render components

Using `itemRenderer` [docs] you can render different components based on the `timelineContext` zoom (`visibleTimeStart` and `visibleTimeEnd`). Zoom in and out to see item render with slightly different elements.

[Example Codesandbox](https://codesandbox.io/s/l2j59rkmv9)

## Restricting Item Moving and Resizing

You can restrict the moving and resizing of items at the item level by providing a `canMove` and `canResize` property with an item.

[Example Codesandbox](https://codesandbox.io/s/pw68ry5yn7)

## Right Sidebar

Adding a right sidebar is as easy as passing in a couple of props `rightSidebarWidth` and `rightSidebarContent`. Content in the right column is populated from the `rightTitle` property on the group.

[Example Codesandbox](https://codesandbox.io/s/8kyo429708)

## Linked Timelines

By managing the the `visibleStartTime` and `visibleEndTime` for multiple timelines, you can syncronize scroll across multiple timelines.

[Example Codesandbox](https://codesandbox.io/s/z34n3wlz54)

## Tree Groups

Through group manipulation, you can achieve tree group views.

[Example Codesandbox](https://codesandbox.io/s/0qy5628kk0)

Note that this is the user code manipulating groups to achieve tree group functionality. This example is an illustration of how you can achieve this functionality. This is not a feature that is directly supported by the library.
