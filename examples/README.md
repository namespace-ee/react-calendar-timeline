# Examples

Below are links to Codesandbox instances for examples of how to use this repo.  Feel free to fork these sandboxes and play around with this library's features.  If you have any examples of cool uses of this library, submit a PR to add one!

## Basic Usage

Basic functionality of the timeline, included panning, zooming and rendering of items

[Example Codesandbox](https://codesandbox.io/s/qlj6qvjrnw)

## Item Moving and Resizing

Moving and Resizing examples. Clicking and dragging can move items into different groups. Notice the `handleItemMove` and `handleItemResize` handlers passed to the Timeline.

[Example Codesandbox](https://codesandbox.io/s/l55q2ykpol)

## Restricting Item Moving and Resizing

You can restrict the moving and resizing of items at the item level by providing a `canMove` and `canResize` property with an item.

[Example Codesandbox](https://codesandbox.io/s/v5zz18nm5)

## Right Sidebar

Adding a right sidebar is as easy as passing in a couple of props `rightSidebarWidth` and `rightSidebarContent`. Content in the right column is populated from the `rightTitle` property on the group.

[Example Codesandbox](https://codesandbox.io/s/q3z684lm8w)

## Linked Timelines

By managing the the `visibleStartTime` and `visibleEndTime` for multiple timelines, you can syncronize scroll across multiple timelines.

[Example Codesandbox](https://codesandbox.io/s/9o04637kqr)

## Tree Groups

Through group manipulation, you can achieve tree group views

[Example Codesandbox](https://codesandbox.io/s/v1v5952mxy)

## Plugins (experimental)

By passing a render prop to the Timeline component, you can manipulate the appearance of the timeline.  Note that this API is experimental and might change significantly in future versions.

This example colors each group row differently!

[Example Codesandbox](https://codesandbox.io/s/3v0k4856m)
