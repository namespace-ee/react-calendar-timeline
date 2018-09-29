# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres (more or less) to [Semantic Versioning](http://semver.org/).

## Unreleased

### 0.20.0

### improvements
* eliminate extra renders on every scroll - #357 [acemac](https://github.com/acemac)

### Fixed
* When the `date` prop on a `CustomMarker` changes the marker will now move on the timeline - #421 [kevinmanncito](https://github.com/kevinmanncito) [ilaiwi](https://github.com/ilaiwi)
* Header has a bounce effect - #311 [acemac](https://github.com/acemac)

####dev

* update to `react-testing-library` version 5
* remove deprecated `toBeInDom`



### 0.19.0

### Added

* ability to set classes for timeline columns depending on its time - #364
* ability to add custom classes and custom heights to the timeline rows - #367
* add `scrollRef` to allow for programmatically scrolling timeline - #372

### Breaking

* rework item renderer to render the whole item using render prop and prop getters - #289

### 0.18.2

### Fixed

* `onCanvasClick` not fired - #383
* cursor marker disappear while hovering over item - #378

### 0.18.1

### Fixed

* Date passed to CursorMarker child is wrong - #379
* groupRenderer doesnt work for right sidebar - #377

### 0.18.0

### Fixed

* Timeline now respects changes to `headerLabelFormats` and `subHeaderLabelFormats` - #362

### Added

* timeline markers - user can have more control over markers that are rendered on the timeline. See `TimelineMarkers` section of README for documentation - #327

### Breaking

* Removed support for React 15 and lower.  This is due to the fact that 16+ supports returning arrays from render, something that the TimelineMarker feature relies on.
* removed `showCursorLine` prop in favor of using the `CursorMarker` component. See `TimelineMarkers` section of README for documentation.

```diff
import Timeline,
+ {TimelineMarkers, CursorMarker}
from 'react-calendar-timeline'

<Timeline
- showCursorLine

- />
+ >

+ <TimelineMarkers>
+  <CursorMarker />
+ </TimelineMarkers>

+ </Timeline>
```

### 0.17.3

### Added
* fix issue with single row header - #359

### 0.17.2

### Added

* support passing `style` prop from item - #347
* `selected` is provided to `itemRenderer` - #348
* simplify logic for calculate dimensions and prevent item width and left properties from being unbounded - (refactoring)

### 0.17.1

### Added

* pass canvasTimeStart/End via timelineContext to the itemRenderer prop

### 0.17.0

### Breaking

* throw more descriptive error if visibleTimeStart/End and defaultTimeStart/End are not passed as props. Timeline no longer calculates visibleTime start and end from items. Removed `onTimeInit` prop as it no longer serves a purpose. - #299
* `interactjs` is a peerDependency (wasn't previously). Upped version to 1.3.4 to fix issue #297

### Fixed

* fix for issue where NaN is returned in onItemMove if the startTime is not unix timestamp #300

### 0.16.3

### Fixed

* tap on canvas now dispatches `onCanvasClicked` - #168
* regression bug related to touch zoom
* code cleanup and refactoring around group rows

### 0.16.2

### Fixed

* clicking on canvas when item is selected now calls `onCanvasClicked` - #312

### 0.16.1

### Added

* added `stickyHeader` to disable/enable timeline header sticking on scroll.
* removed `fullUpdate` prop and functionality. Labels rely on `position: sticky` to show for items that start before `visibleTimeStart`. This (should) greatly improve scroll performance.
* removed extraneous css such as `text-align: center` on `.rct-item`, `.rct-item-overflow` to simplify the dom structure of `Item.js`
* added `headerRef` callback to receive a reference to the header element. Due to the change in how the header positioning is implemented (i.e. using `position: sticky`), there is a need to use a polyfill in [certain browsers](https://caniuse.com/#feat=css-sticky) that don't support `position: sticky`. With a reference to the header dom element, you can use a polyfill to apply sticky behavior.
* `minimumWidthForItemContentVisibility` prop to control at what width inner item content is rendered.

### Breaking

* removed `fixedHeader` prop in favor of using `position: sticky` by default
* removed import of stylesheets in library code, put onus on user to handle this stylesheet

## 0.15.12

### Fixed

* Shift + Scroll via mouse wheel scrolls canvas horizontally - #281

## 0.15.11

### Fixed

* removed `preventDefault` call in item double click handler - #277

## 0.15.10

### Fixed

* fix issue with time report with onItem\* callbacks for browsers that don't support `x` property in rect object - #266

## 0.15.9

### Fixed

* header positioned incorrectly when not fixed/sticky - caused by #236

## 0.15.8

### Fixed

* propTypes error related to Item prop - #239
* onCanvasClick and onCanvasDoubleClick were being called on header click - #236

### Added

* on timeline zoom, onZoom prop is called with timelineContext - #248

## 0.15.7

This release contains a lot of code cleanup as well as an API change to the `itemRenderer` prop.

### Fixed

* peerDependency warning if using React 16 #187

  ### Added

* `timelineContext` is provided to `itemRenderer` #233

## 0.15.6

### Fixed

* Fixed issue with state not properly updated when ending resize #173
* Fixed issue with onItem\* events not reporting correct time when timeline has outer padding #227

## 0.15.5

### Fixed

* context click actually calls double click callback #225
* Removed href attribute from header divs #222

## 0.15.4

### Fixed

* Clicking on Svg element throws error #216

## 0.15.3

This version contains one crucial bug fix and a simple update to item clicks to report time. Much of the other work was around repo maintenance and preparing the repo for future development (update to dev-tooling, some documentation updates)

### Added

* Report time with all item clicks #210

### Fixed

* Drag doesn't stop when you leave the timeline canvas #182

## [0.15.0]

Plugin support and sticky header!

### Added

* Plugins system (pass them as children) @mariusandra #122
* Sticky header (`fixedHeader='sticky'`) @mariusandra #125

### Removed

* [BREAKING] Removed deprecated option to pass sidebar header content as children. Use `sidebarContent` instead. @mariusandra
* [BREAKING] Removed fixedHeader option `absolute`, which was broken and is now replaced with the option `sticky` @mariusandra

### Demo & Docs

* Notice for modern module bundlers @jlubben @mariusandra #128
* Add [treeGroups](http://namespace.ee/react-calendar-timeline-docs/#/treeGroups) demo

## [0.14.11]

Plenty of bugfixes, tests and new demos in these 0.14 patch releases.

### Fixed

* Fixed bug with `resizeDetector` and with detecting changes in `sidebarWidth` @mariusandra
* Fixed bug where order `0` was evaluated as a falsy @nicocrm #111
* Fix overflow-x with header @signalwerk

### Added

* Add meta+wheel modifier that zooms 3x the speed of the normal wheel events @mariusandra

### Changed

* Refactor `calculateDimensions` to be pure @signalwerk
* Convert `groupHeights` and `groupTops` to arrays (from objects) @mariusandra

### Demo & docs

* Add [linkedTimelines](http://namespace.ee/react-calendar-timeline-docs/#/linkedTimelines) demo
* Add [elementResize](http://namespace.ee/react-calendar-timeline-docs/#/elementResize) demo
* Add docs about modifier keys for zooming/scrolling @signalwerk

## [0.14.2]

### Changed

* Use `prop-types` instead of `React.PropTypes` to support React 15.5+. @mariusandra #110

## [0.14.0]

### Added

* Use `headerLabelFormats` and `subHeaderLabelFormats` to customise the header labels. @Slowyn #68
* Optional pluggable `resizeDetector` to detect when the element's container is resized. @Ziller321 #94

### Fixed

* Fix renders with empty `groups` array. @signalwerk #106

## [0.13.0]

### Added

* An option to add another sidebar to the right of the Timeline. @goooseman #80
* `itemRenderer` prop to allow specifying a custom component to render the items @nicocrm #103
* `groupRenderer` prop to allow specifying a custom component to render the groups @nicocrm #103
* `showCursorLine` prop to show a vertical line at the snap position @meikoudras
* You can now select multiple items if you take control of the `selected` prop and the `onItemSelect` handler. @meengit #71
* Canvas context menu handler `onCanvasContextMenu` @meikoudras

### Fixed

* Calculate width when we receive sidebar width property @jmerriweather #75
* Avoid updating updateDimensions right after updateScrollCanvas @nicocrm #87
* Fix typo collision detection in stack() @nicocrm #96
* Remove dead code @signalwerk #101
* Disable cursor style by interactjs @bkniffler #89
* Fixed header width and Header label weekday support @meikoudras #66

### Changed

* [Deprecated] To have content above the left sidebar, pass it in a `sidebarContent={<div />}` prop, not as children to the component.

## [0.11.1]

### Fixed

* Without canResize prop in items it gave a Uncaught TypeError. @tgosp

## [0.11.0]

### Added

* An option to fully update the calendar at every scroll event. With this change, labels of items are always fully visible, even if looking at a multi day event with a zoom level set at 30min. @mariusandra

## [0.10.1]

### Changed

* The left resize edge mouse cursor is now a left arrow @mariusandra

## [0.10.0]

### Added

* You can also resize items from the left now @mariusandra

## [0.9.0]

### Added

* Allow disabling selection clicks on items #58 by @sjchmiela
* Allow passing additional props to `Item`'s `<div/>` #58 by @sjchmiela
* Add `clickTolerance` so dragging more than 3 pixels is no longer a click @mariusandra

### Changed

* [BREAKING] Same arguments order (groupId, time, e) for onCanvasDoubleClick and onCanvasClick #52 by @signalwerk
* [Deprecated] `onTimeChange` now gets `updateScrollCanvas` as the third argument. Doing `this.updateScrollCanvas` is no longer needed and will be removed soon.
* Moved React & Moment from dependencies to peerDependencies #53 by @meikoudras
* Fix resizing when inside DIV #47 by @semargal
* Fix demo for IE11 #44 by @lucidlemon
* Package a .css file, not a .scss file as previously done. @mariusandra

[0.9.0]: https://github.com/namespace-ee/react-calendar-timeline/compare/v0.8.6...v0.9.0
[0.10.0]: https://github.com/namespace-ee/react-calendar-timeline/compare/v0.9.0...v0.10.0
[0.10.1]: https://github.com/namespace-ee/react-calendar-timeline/compare/v0.10.0...v0.10.1
[0.11.0]: https://github.com/namespace-ee/react-calendar-timeline/compare/v0.10.1...v0.11.0
[0.11.1]: https://github.com/namespace-ee/react-calendar-timeline/compare/v0.11.0...v0.11.1
[0.13.0]: https://github.com/namespace-ee/react-calendar-timeline/compare/v0.11.1...v0.13.0
[0.14.0]: https://github.com/namespace-ee/react-calendar-timeline/compare/v0.13.0...v0.14.0
[0.14.2]: https://github.com/namespace-ee/react-calendar-timeline/compare/v0.14.0...v0.14.2
[0.14.11]: https://github.com/namespace-ee/react-calendar-timeline/compare/v0.14.2...v0.14.11
[0.15.0]: https://github.com/namespace-ee/react-calendar-timeline/compare/v0.14.11...v0.15.0
