'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _calendar = require('../utility/calendar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimelineElementsHeader = function (_Component) {
  _inherits(TimelineElementsHeader, _Component);

  function TimelineElementsHeader(props) {
    _classCallCheck(this, TimelineElementsHeader);

    var _this = _possibleConstructorReturn(this, (TimelineElementsHeader.__proto__ || Object.getPrototypeOf(TimelineElementsHeader)).call(this, props));

    _this.handlePeriodClick = function (time, unit) {
      if (time && unit) {
        _this.props.showPeriod((0, _moment2.default)(time - 0), unit);
      }
    };

    _this.state = {
      touchTarget: null,
      touchActive: false
    };
    return _this;
  }

  _createClass(TimelineElementsHeader, [{
    key: 'handleHeaderMouseDown',
    value: function handleHeaderMouseDown(evt) {
      //dont bubble so that we prevent our scroll component
      //from knowing about it
      evt.stopPropagation();
    }
  }, {
    key: 'headerLabel',
    value: function headerLabel(time, unit, width) {
      var f = this.props.headerLabelFormats;


      if (unit === 'year') {
        return time.format(width < 46 ? f.yearShort : f.yearLong);
      } else if (unit === 'month') {
        return time.format(width < 65 ? f.monthShort : width < 75 ? f.monthMedium : width < 120 ? f.monthMediumLong : f.monthLong);
      } else if (unit === 'day') {
        return time.format(width < 150 ? f.dayShort : f.dayLong);
      } else if (unit === 'hour') {
        return time.format(width < 50 ? f.hourShort : width < 130 ? f.hourMedium : width < 150 ? f.hourMediumLong : f.hourLong);
      } else {
        return time.format(f.time);
      }
    }
  }, {
    key: 'subHeaderLabel',
    value: function subHeaderLabel(time, unit, width) {
      var f = this.props.subHeaderLabelFormats;


      if (unit === 'year') {
        return time.format(width < 46 ? f.yearShort : f.yearLong);
      } else if (unit === 'month') {
        return time.format(width < 37 ? f.monthShort : width < 85 ? f.monthMedium : f.monthLong);
      } else if (unit === 'day') {
        return time.format(width < 47 ? f.dayShort : width < 80 ? f.dayMedium : width < 120 ? f.dayMediumLong : f.dayLong);
      } else if (unit === 'hour') {
        return time.format(width < 50 ? f.hourShort : f.hourLong);
      } else if (unit === 'minute') {
        return time.format(width < 60 ? f.minuteShort : f.minuteLong);
      } else {
        return time.get(unit);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var willUpate = nextProps.canvasTimeStart != this.props.canvasTimeStart || nextProps.canvasTimeEnd != this.props.canvasTimeEnd || nextProps.width != this.props.width || nextProps.canvasWidth != this.props.canvasWidth || nextProps.subHeaderLabelFormats != this.props.subHeaderLabelFormats || nextProps.headerLabelFormats != this.props.headerLabelFormats || nextProps.hasRightSidebar != this.props.hasRightSidebar;

      return willUpate;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          canvasTimeStart = _props.canvasTimeStart,
          canvasTimeEnd = _props.canvasTimeEnd,
          canvasWidth = _props.canvasWidth,
          minUnit = _props.minUnit,
          timeSteps = _props.timeSteps,
          headerLabelGroupHeight = _props.headerLabelGroupHeight,
          headerLabelHeight = _props.headerLabelHeight,
          hasRightSidebar = _props.hasRightSidebar;


      var ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart);
      var twoHeaders = minUnit !== 'year';

      var topHeaderLabels = [];
      // add the top header
      if (twoHeaders) {
        var nextUnit = (0, _calendar.getNextUnit)(minUnit);

        (0, _calendar.iterateTimes)(canvasTimeStart, canvasTimeEnd, nextUnit, timeSteps, function (time, nextTime) {
          var left = Math.round((time.valueOf() - canvasTimeStart) * ratio);
          var right = Math.round((nextTime.valueOf() - canvasTimeStart) * ratio);

          var labelWidth = right - left;
          // this width applies to the content in the header
          // it simulates stickyness where the content is fixed in the center
          // of the label.  when the labelWidth is less than visible time range,
          // have label content fill the entire width
          var contentWidth = Math.min(labelWidth, canvasWidth);

          topHeaderLabels.push(_react2.default.createElement(
            'div',
            {
              key: 'top-label-' + time.valueOf(),
              className: 'rct-label-group' + (hasRightSidebar ? ' rct-has-right-sidebar' : ''),
              onClick: function onClick() {
                return _this2.handlePeriodClick(time, nextUnit);
              },
              style: {
                left: left - 1 + 'px',
                width: labelWidth + 'px',
                height: headerLabelGroupHeight + 'px',
                lineHeight: headerLabelGroupHeight + 'px',
                cursor: 'pointer'
              }
            },
            _react2.default.createElement(
              'span',
              { style: { width: contentWidth, display: 'block' } },
              _this2.headerLabel(time, nextUnit, labelWidth)
            )
          ));
        });
      }

      var bottomHeaderLabels = [];
      (0, _calendar.iterateTimes)(canvasTimeStart, canvasTimeEnd, minUnit, timeSteps, function (time, nextTime) {
        var left = Math.round((time.valueOf() - canvasTimeStart) * ratio);
        var minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit);
        var firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0);
        var labelWidth = Math.round((nextTime.valueOf() - time.valueOf()) * ratio);
        var leftCorrect = firstOfType ? 1 : 0;

        bottomHeaderLabels.push(_react2.default.createElement(
          'div',
          {
            key: 'label-' + time.valueOf(),
            className: 'rct-label ' + (twoHeaders ? '' : 'rct-label-only') + ' ' + (firstOfType ? 'rct-first-of-type' : '') + ' ' + (minUnit !== 'month' ? 'rct-day-' + time.day() : '') + ' ',
            onClick: function onClick() {
              return _this2.handlePeriodClick(time, minUnit);
            },
            style: {
              left: left - leftCorrect + 'px',
              width: labelWidth + 'px',
              height: (minUnit === 'year' ? headerLabelGroupHeight + headerLabelHeight : headerLabelHeight) + 'px',
              lineHeight: (minUnit === 'year' ? headerLabelGroupHeight + headerLabelHeight : headerLabelHeight) + 'px',
              fontSize: (labelWidth > 30 ? '14' : labelWidth > 20 ? '12' : '10') + 'px',
              cursor: 'pointer'
            }
          },
          _this2.subHeaderLabel(time, minUnit, labelWidth)
        ));
      });

      var headerStyle = {
        height: headerLabelGroupHeight + headerLabelHeight + 'px'
      };

      return _react2.default.createElement(
        'div',
        {
          key: 'header',

          className: 'rct-header',
          onMouseDown: this.handleHeaderMouseDown,
          onTouchStart: this.touchStart,
          onTouchEnd: this.touchEnd,
          style: headerStyle,
          ref: this.props.scrollHeaderRef
        },
        _react2.default.createElement(
          'div',
          {
            className: 'rct-top-header',
            style: { height: twoHeaders ? headerLabelGroupHeight : 0, width: canvasWidth }
          },
          topHeaderLabels
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'rct-bottom-header',
            style: { height: headerLabelHeight, width: canvasWidth }
          },
          bottomHeaderLabels
        )
      );
    }
  }]);

  return TimelineElementsHeader;
}(_react.Component);

TimelineElementsHeader.propTypes = {
  hasRightSidebar: _propTypes2.default.bool.isRequired,
  showPeriod: _propTypes2.default.func.isRequired,
  canvasTimeStart: _propTypes2.default.number.isRequired,
  canvasTimeEnd: _propTypes2.default.number.isRequired,
  canvasWidth: _propTypes2.default.number.isRequired,
  minUnit: _propTypes2.default.string.isRequired,
  timeSteps: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  headerLabelFormats: _propTypes2.default.object.isRequired,
  subHeaderLabelFormats: _propTypes2.default.object.isRequired,
  headerLabelGroupHeight: _propTypes2.default.number.isRequired,
  headerLabelHeight: _propTypes2.default.number.isRequired,
  scrollHeaderRef: _propTypes2.default.func.isRequired
};
exports.default = TimelineElementsHeader;