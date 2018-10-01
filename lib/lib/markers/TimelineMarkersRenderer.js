'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TimelineMarkersContext = require('./TimelineMarkersContext');

var _markerType = require('./markerType');

var _TodayMarker = require('./implementations/TodayMarker');

var _TodayMarker2 = _interopRequireDefault(_TodayMarker);

var _CustomMarker = require('./implementations/CustomMarker');

var _CustomMarker2 = _interopRequireDefault(_CustomMarker);

var _TimelineStateContext = require('../timeline/TimelineStateContext');

var _CursorMarker = require('./implementations/CursorMarker');

var _CursorMarker2 = _interopRequireDefault(_CursorMarker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Internal component used in timeline to render markers registered */
var TimelineMarkersRenderer = function TimelineMarkersRenderer() {
  return _react2.default.createElement(
    _TimelineStateContext.TimelineStateConsumer,
    null,
    function (_ref) {
      var getLeftOffsetFromDate = _ref.getLeftOffsetFromDate;
      return _react2.default.createElement(
        _TimelineMarkersContext.TimelineMarkersConsumer,
        null,
        function (_ref2) {
          var markers = _ref2.markers;

          return markers.map(function (marker) {
            switch (marker.type) {
              case _markerType.TimelineMarkerType.Today:
                return _react2.default.createElement(_TodayMarker2.default, {
                  key: marker.id,
                  getLeftOffsetFromDate: getLeftOffsetFromDate,
                  renderer: marker.renderer,
                  interval: marker.interval
                });
              case _markerType.TimelineMarkerType.Custom:
                return _react2.default.createElement(_CustomMarker2.default, {
                  key: marker.id,
                  renderer: marker.renderer,
                  date: marker.date,
                  getLeftOffsetFromDate: getLeftOffsetFromDate
                });
              case _markerType.TimelineMarkerType.Cursor:
                return _react2.default.createElement(_CursorMarker2.default, {
                  key: marker.id,
                  renderer: marker.renderer,
                  getLeftOffsetFromDate: getLeftOffsetFromDate
                });
              default:
                return null;
            }
          });
        }
      );
    }
  );
};

exports.default = TimelineMarkersRenderer;