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

Adding a right sidebar is as easy as passing `rightSidebarWidth`. Content in the right column is populated from the `rightTitle` property on the group. 

Note: If you are using Custom Headers then you need to add them with `SidebarHeader` with variant "right"

[Example Codesandbox](https://codesandbox.io/s/j3wrw6rl4v)

## Linked Timelines

By managing the the `visibleStartTime` and `visibleEndTime` for multiple timelines, you can syncronize scroll across multiple timelines.

[Example Codesandbox](https://codesandbox.io/s/6j04z5rjjr)

## Tree Groups

Through group manipulation, you can achieve tree group views.

[Example Codesandbox](https://codesandbox.io/s/r1mxzj581m)

Note that this is the user code manipulating groups to achieve tree group functionality. This example is an illustration of how you can achieve this functionality. This is not a feature that is directly supported by the library.

## Controlled scroll

Controlled visible port of the calendar using `visibleTimeStart` and `visibleTimeEnd`. This also limits scrolling by mouse and adds two buttons to change the visible port of the calendar

[Example Codesandbox](https://codesandbox.io/s/timeline-demo-controlled-visible-time-no-scroll-659jb)

## Programmatically Scrolling

Using controlled scroll and react-spring to trigger scrolling and create an animation.

[Example Codesandbox](https://codesandbox.io/s/timeline-demo-programmatic-scroll-3kq2503y8p)

## Sticky header

Using `Timeline Header` you can make the header stick to the top of the page while scrolling down

[Example Codesandbox](https://codesandbox.io/s/w6xvqzno4w)

## InfoLabel 

Native info label was removed with 0.26.0 and now the responsibility to render to render the Info Label is on the user. The example bellow has InfoLabel that matches exactly the removed label

[Example Codesandbox](https://codesandbox.io/s/timeline-demo-info-label-neec9)

## Custom header items with helpers 

using custom header and helpers, you would be able to render custom items/intervals in the header

[Example Codesandbox](https://codesandbox.io/s/timeline-demo-helpers-doc-example-o24h6)

## Unavailable placeholders

with row renderer and helpers, custom timeslots are rendered with a label rendered on the calendar

[Example Codesandbox](https://codesandbox.io/s/timeline-demo-rowrenderer-doc-example-66pvw)

## Drag and drop from outside the calendar

with row renderer and helpers, you can drag and drop items from outside the calendar into predetermined spots on the calendar.

[Example Codesandbox](https://codesandbox.io/s/timeline-demo-rowrenderer-dnd-from-outside-the-calendar-gz7ns)
