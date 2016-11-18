# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added
- Allow disabling selection clicks on items #58 by @sjchmiela
- Allow passing additional props to `Item`'s `<div/>` #58 by @sjchmiela
- Add `clickTolerance` so dragging more than 3 pixels is no longer a click

### Changed
- [BREAKING] Same arguments order (groupId, time, e) for onCanvasDoubleClick and onCanvasClick #52 by @signalwerk
- [Deprecated] `onTimeChange` now gets `updateScrollCanvas` as the third argument. Doing `this.updateScrollCanvas` is no longer needed and will be removed soon.
- Moved React & Moment from dependencies to peerDependencies #53 by @meikoudras
- Fix resizing when inside DIV #47 by @semargal
- Fix demo for IE11 #44 by @lucidlemon
- Package a .css file, not a .scss file as previously done.
