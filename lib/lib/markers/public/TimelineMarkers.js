"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// Is this necessary? The initial reason for including this is for organization sake in the
// user code e.g.

/*
<Timeline {...otherProps}>
  <TimelineMarkers> // would there be props passed in here?
    <TodayLine />
    <CursorLine />
    <CustomLine />
  </TimelineMarkers>
</Timeline>

*/
// If we decide to pass in props to TimelineMarkers, then yes, this is necessary.
var TimelineMarkers = function TimelineMarkers(props) {
  return props.children || null;
};

var _default = TimelineMarkers;
exports["default"] = _default;