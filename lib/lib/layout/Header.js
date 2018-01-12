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

var _utils = require('../utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    _this.periodClick = function () {
      return _this.__periodClick__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.touchStart = function () {
      return _this.__touchStart__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.touchEnd = function () {
      return _this.__touchEnd__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.state = {
      touchTarget: null,
      touchActive: false
    };
    return _this;
  }

  _createClass(Header, [{
    key: '__touchEnd__REACT_HOT_LOADER__',
    value: function __touchEnd__REACT_HOT_LOADER__() {
      return this.__touchEnd__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__touchStart__REACT_HOT_LOADER__',
    value: function __touchStart__REACT_HOT_LOADER__() {
      return this.__touchStart__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__periodClick__REACT_HOT_LOADER__',
    value: function __periodClick__REACT_HOT_LOADER__() {
      return this.__periodClick__REACT_HOT_LOADER__.apply(this, arguments);
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
    key: '__periodClick__REACT_HOT_LOADER__',
    value: function __periodClick__REACT_HOT_LOADER__(e) {
      var _e$target$dataset = e.target.dataset,
          time = _e$target$dataset.time,
          unit = _e$target$dataset.unit;

      if (time && unit) {
        this.props.showPeriod((0, _moment2.default)(time - 0), unit);
      }
    }
  }, {
    key: '__touchStart__REACT_HOT_LOADER__',
    value: function __touchStart__REACT_HOT_LOADER__(e) {
      if (e.touches.length === 1) {
        this.setState({
          touchTarget: e.target || e.touchTarget,
          touchActive: true
        });
      }
    }
  }, {
    key: '__touchEnd__REACT_HOT_LOADER__',
    value: function __touchEnd__REACT_HOT_LOADER__(e) {
      if (!this.state.touchActive) {
        return this.resetTouchState();
      }

      var changedTouches = e.changedTouches[0];
      if (changedTouches) {
        var elem = document.elementFromPoint(changedTouches.pageX, changedTouches.pageY);
        if (elem !== this.state.touchTarget) {
          return this.resetTouchState();
        }
      }

      this.resetTouchState();
      this.periodClick(e);
    }
  }, {
    key: 'resetTouchState',
    value: function resetTouchState() {
      this.setState({
        touchTarget: null,
        touchActive: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var timeLabels = [];
      var _props = this.props,
          canvasTimeStart = _props.canvasTimeStart,
          canvasTimeEnd = _props.canvasTimeEnd,
          canvasWidth = _props.canvasWidth,
          lineHeight = _props.lineHeight,
          visibleTimeStart = _props.visibleTimeStart,
          visibleTimeEnd = _props.visibleTimeEnd,
          minUnit = _props.minUnit,
          timeSteps = _props.timeSteps,
          fixedHeader = _props.fixedHeader,
          stickyOffset = _props.stickyOffset,
          headerPosition = _props.headerPosition,
          headerLabelGroupHeight = _props.headerLabelGroupHeight,
          headerLabelHeight = _props.headerLabelHeight,
          hasRightSidebar = _props.hasRightSidebar,
          width = _props.width;


      var ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart);
      var twoHeaders = minUnit !== 'year';

      var correctLeftPositions = fixedHeader === 'fixed' || fixedHeader === 'sticky' && headerPosition === 'fixed';

      // add the top header
      if (twoHeaders) {
        var nextUnit = (0, _utils.getNextUnit)(minUnit);

        (0, _utils.iterateTimes)(visibleTimeStart, visibleTimeEnd, nextUnit, timeSteps, function (time, nextTime) {
          var startTime = Math.max(visibleTimeStart, time.valueOf());
          var endTime = Math.min(visibleTimeEnd, nextTime.valueOf());
          var left = Math.round((startTime.valueOf() - canvasTimeStart) * ratio, -2);
          var right = Math.round((endTime.valueOf() - canvasTimeStart) * ratio, -2);
          var labelWidth = right - left;
          var leftCorrect = correctLeftPositions ? Math.round((canvasTimeStart - visibleTimeStart) * ratio) - 1 : 0;

          timeLabels.push(_react2.default.createElement(
            'div',
            { key: 'top-label-' + time.valueOf(),
              href: '#',
              className: 'rct-label-group' + (hasRightSidebar ? ' rct-has-right-sidebar' : ''),
              'data-time': time,
              'data-unit': nextUnit,
              style: {
                left: left + leftCorrect + 'px',
                width: labelWidth + 'px',
                height: headerLabelGroupHeight + 'px',
                lineHeight: headerLabelGroupHeight + 'px',
                cursor: 'pointer'
              } },
            _this2.headerLabel(time, nextUnit, labelWidth)
          ));
        });
      }

      (0, _utils.iterateTimes)(canvasTimeStart, canvasTimeEnd, minUnit, timeSteps, function (time, nextTime) {
        var left = Math.round((time.valueOf() - canvasTimeStart) * ratio, -2);
        var minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit);
        var firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0);
        var labelWidth = Math.round((nextTime.valueOf() - time.valueOf()) * ratio, -2);
        var borderWidth = firstOfType ? 2 : 1;
        var leftCorrect = correctLeftPositions ? Math.round((canvasTimeStart - visibleTimeStart) * ratio) - borderWidth + 1 : 0;

        timeLabels.push(_react2.default.createElement(
          'div',
          { key: 'label-' + time.valueOf(),
            href: '#',
            className: 'rct-label ' + (twoHeaders ? '' : 'rct-label-only') + ' ' + (firstOfType ? 'rct-first-of-type' : '') + ' ' + (minUnit !== 'month' ? 'rct-day-' + time.day() : '') + ' ',
            'data-time': time,
            'data-unit': minUnit,
            style: {
              top: (minUnit === 'year' ? 0 : headerLabelGroupHeight) + 'px',
              left: left + leftCorrect + 'px',
              width: labelWidth + 'px',
              height: (minUnit === 'year' ? headerLabelGroupHeight + headerLabelHeight : headerLabelHeight) + 'px',
              lineHeight: (minUnit === 'year' ? headerLabelGroupHeight + headerLabelHeight : headerLabelHeight) + 'px',
              fontSize: (labelWidth > 30 ? '14' : labelWidth > 20 ? '12' : '10') + 'px',
              cursor: 'pointer'
            } },
          _this2.subHeaderLabel(time, minUnit, labelWidth)
        ));
      });

      var headerStyle = {
        height: headerLabelGroupHeight + headerLabelHeight + 'px',
        lineHeight: lineHeight + 'px'
      };

      if (fixedHeader === 'fixed') {
        headerStyle.position = 'fixed';
        headerStyle.width = width + 'px';
      } else if (fixedHeader === 'sticky') {
        if (headerPosition === 'top') {
          // do nothing, keep at the top
        } else if (headerPosition === 'fixed') {
          headerStyle.position = 'fixed';
          headerStyle.top = stickyOffset;
          headerStyle.width = width + 'px';
        } else if (headerPosition === 'bottom') {
          headerStyle.position = 'absolute';
          headerStyle.bottom = 0;
          headerStyle.width = canvasWidth + 'px';
        }
      }

      return _react2.default.createElement(
        'div',
        { ref: 'header', key: 'header', className: 'rct-header', onTouchStart: this.touchStart, onTouchEnd: this.touchEnd, onClick: this.periodClick, style: headerStyle },
        timeLabels
      );
    }
  }]);

  return Header;
}(_react.Component);

Header.propTypes = {
  hasRightSidebar: _propTypes2.default.bool.isRequired,
  showPeriod: _propTypes2.default.func.isRequired,
  canvasTimeStart: _propTypes2.default.number.isRequired,
  canvasTimeEnd: _propTypes2.default.number.isRequired,
  canvasWidth: _propTypes2.default.number.isRequired,
  lineHeight: _propTypes2.default.number.isRequired,
  visibleTimeStart: _propTypes2.default.number.isRequired,
  visibleTimeEnd: _propTypes2.default.number.isRequired,
  minUnit: _propTypes2.default.string.isRequired,
  timeSteps: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  headerLabelFormats: _propTypes2.default.object.isRequired,
  subHeaderLabelFormats: _propTypes2.default.object.isRequired,
  fixedHeader: _propTypes2.default.oneOf(['fixed', 'sticky', 'none']),
  stickyOffset: _propTypes2.default.number.isRequired,
  headerPosition: _propTypes2.default.oneOf(['top', 'bottom', 'fixed'])
};
Header.defaultProps = {
  fixedHeader: 'sticky',
  stickyOffset: 0,
  headerPosition: 'top'
};
var _default = Header;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Header, 'Header', 'src/lib/layout/Header.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/layout/Header.js');
}();

;