"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _TimelineMarkersContext = require("./TimelineMarkersContext");

var _markerType = require("./markerType");

var _TodayMarker = _interopRequireDefault(require("./implementations/TodayMarker"));

var _CustomMarker = _interopRequireDefault(require("./implementations/CustomMarker"));

var _TimelineStateContext = require("../timeline/TimelineStateContext");

var _CursorMarker = _interopRequireDefault(require("./implementations/CursorMarker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/** Internal component used in timeline to render markers registered */
var TimelineMarkersRenderer = function TimelineMarkersRenderer() {
  return _react["default"].createElement(_TimelineStateContext.TimelineStateConsumer, null, function (_ref) {
    var getLeftOffsetFromDate = _ref.getLeftOffsetFromDate;
    return _react["default"].createElement(_TimelineMarkersContext.TimelineMarkersConsumer, null, function (_ref2) {
      var markers = _ref2.markers;
      return markers.map(function (marker) {
        switch (marker.type) {
          case _markerType.TimelineMarkerType.Today:
            return _react["default"].createElement(_TodayMarker["default"], {
              key: marker.id,
              getLeftOffsetFromDate: getLeftOffsetFromDate,
              renderer: marker.renderer,
              interval: marker.interval
            });

          case _markerType.TimelineMarkerType.Custom:
            return _react["default"].createElement(_CustomMarker["default"], {
              key: marker.id,
              renderer: marker.renderer,
              date: marker.date,
              getLeftOffsetFromDate: getLeftOffsetFromDate
            });

          case _markerType.TimelineMarkerType.Cursor:
            return _react["default"].createElement(_CursorMarker["default"], {
              key: marker.id,
              renderer: marker.renderer,
              getLeftOffsetFromDate: getLeftOffsetFromDate
            });

          default:
            return null;
        }
      });
    });
  });
};

var _default = TimelineMarkersRenderer;
exports["default"] = _default;