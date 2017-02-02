'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    _this.periodClick = function (e) {
      var _e$target$dataset = e.target.dataset,
          time = _e$target$dataset.time,
          unit = _e$target$dataset.unit;

      if (time && unit) {
        _this.props.showPeriod((0, _moment2.default)(time - 0), unit);
      }
    };

    _this.touchStart = function (e) {
      if (e.touches.length === 1) {
        _this.setState({
          touchTarget: e.target || e.touchTarget,
          touchActive: true
        });
      }
    };

    _this.touchEnd = function (e) {
      if (!_this.state.touchActive) {
        return _this.resetTouchState();
      }

      var changedTouches = e.changedTouches[0];
      if (changedTouches) {
        var elem = document.elementFromPoint(changedTouches.pageX, changedTouches.pageY);
        if (elem !== _this.state.touchTarget) {
          return _this.resetTouchState();
        }
      }

      _this.resetTouchState();
      _this.periodClick(e);
    };

    _this.state = {
      scrollTop: 0,
      componentTop: 0,
      touchTarget: null,
      touchActive: false
    };
    return _this;
  }

  _createClass(Header, [{
    key: 'scroll',
    value: function scroll(e) {
      if (this.props.fixedHeader === 'absolute' && window && window.document) {
        var scroll = window.document.body.scrollTop;
        this.setState({
          scrollTop: scroll
        });
      }
    }
  }, {
    key: 'setComponentTop',
    value: function setComponentTop() {
      var viewportOffset = this.refs.header.getBoundingClientRect();
      this.setState({
        componentTop: viewportOffset.top
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.setComponentTop();
      this.scroll();

      this.scrollEventListener = {
        handleEvent: function handleEvent(event) {
          _this2.scroll();
        }
      };

      window.addEventListener('scroll', this.scrollEventListener);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.scrollEventListener);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.setComponentTop();
    }
  }, {
    key: 'headerLabel',
    value: function headerLabel(time, unit, width) {
      if (unit === 'year') {
        var _props = this.props,
            headerLabelYearFormatShort = _props.headerLabelYearFormatShort,
            headerLabelYearFormatLong = _props.headerLabelYearFormatLong;

        return time.format(width < 46 ? headerLabelYearFormatShort : headerLabelYearFormatLong);
      } else if (unit === 'month') {
        var _props2 = this.props,
            headerLabelMonthFormatShort = _props2.headerLabelMonthFormatShort,
            headerLabelMonthFormatMedium = _props2.headerLabelMonthFormatMedium,
            headerLabelMonthFormatMediumLong = _props2.headerLabelMonthFormatMediumLong,
            headerLabelMonthFormatLong = _props2.headerLabelMonthFormatLong;

        return time.format(width < 65 ? headerLabelMonthFormatShort : width < 75 ? headerLabelMonthFormatMedium : width < 120 ? headerLabelMonthFormatMediumLong : headerLabelMonthFormatLong);
      } else if (unit === 'day') {
        var _props3 = this.props,
            headerLabelDayFormatShort = _props3.headerLabelDayFormatShort,
            headerLabelDayFormatLong = _props3.headerLabelDayFormatLong;

        return time.format(width < 150 ? headerLabelDayFormatShort : headerLabelDayFormatLong);
      } else if (unit === 'hour') {
        var _props4 = this.props,
            headerLabelHourFormatShort = _props4.headerLabelHourFormatShort,
            headerLabelHourFormatMedium = _props4.headerLabelHourFormatMedium,
            headerLabelHourFormatMediumLong = _props4.headerLabelHourFormatMediumLong,
            headerLabelHourFormatLong = _props4.headerLabelHourFormatLong;

        return time.format(width < 50 ? headerLabelHourFormatShort : width < 130 ? headerLabelHourFormatMedium : width < 150 ? headerLabelHourFormatMediumLong : headerLabelHourFormatLong);
      } else {
        return time.format('LLL');
      }
    }
  }, {
    key: 'subHeaderLabel',
    value: function subHeaderLabel(time, unit, width) {
      if (unit === 'year') {
        var _props5 = this.props,
            subHeaderLabelYearFormatShort = _props5.subHeaderLabelYearFormatShort,
            subHeaderLabelYearFormatLong = _props5.subHeaderLabelYearFormatLong;

        return time.format(width < 46 ? subHeaderLabelYearFormatShort : subHeaderLabelYearFormatLong);
      } else if (unit === 'month') {
        var _props6 = this.props,
            subHeaderLabelMonthFormatShort = _props6.subHeaderLabelMonthFormatShort,
            subHeaderLabelMonthFormatMedium = _props6.subHeaderLabelMonthFormatMedium,
            subHeaderLabelMonthFormatLong = _props6.subHeaderLabelMonthFormatLong;

        return time.format(width < 37 ? subHeaderLabelMonthFormatShort : width < 85 ? subHeaderLabelMonthFormatMedium : subHeaderLabelMonthFormatLong);
      } else if (unit === 'day') {
        var _props7 = this.props,
            subHeaderLabelDayFormatShort = _props7.subHeaderLabelDayFormatShort,
            subHeaderLabelDayFormatMedium = _props7.subHeaderLabelDayFormatMedium,
            subHeaderLabelDayFormatMediumLong = _props7.subHeaderLabelDayFormatMediumLong,
            subHeaderLabelDayFormatLong = _props7.subHeaderLabelDayFormatLong;

        return time.format(width < 47 ? subHeaderLabelDayFormatShort : width < 80 ? subHeaderLabelDayFormatMedium : width < 120 ? subHeaderLabelDayFormatMediumLong : subHeaderLabelDayFormatLong);
      } else if (unit === 'hour') {
        var _props8 = this.props,
            subHeaderLabelHourFormatShort = _props8.subHeaderLabelHourFormatShort,
            subHeaderLabelHourFormatLong = _props8.subHeaderLabelHourFormatLong;

        return time.format(width < 50 ? subHeaderLabelHourFormatShort : subHeaderLabelHourFormatLong);
      } else if (unit === 'minute') {
        var _props9 = this.props,
            subHeaderLabelMinuteFormatShort = _props9.subHeaderLabelMinuteFormatShort,
            subHeaderLabelMinuteFormatLong = _props9.subHeaderLabelMinuteFormatLong;

        return time.format(width < 60 ? subHeaderLabelMinuteFormatShort : subHeaderLabelMinuteFormatLong);
      } else {
        return time.get(unit);
      }
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
      var _this3 = this;

      var timeLabels = [];
      var _props10 = this.props,
          canvasTimeStart = _props10.canvasTimeStart,
          canvasTimeEnd = _props10.canvasTimeEnd,
          canvasWidth = _props10.canvasWidth,
          lineHeight = _props10.lineHeight,
          visibleTimeStart = _props10.visibleTimeStart,
          visibleTimeEnd = _props10.visibleTimeEnd,
          minUnit = _props10.minUnit,
          timeSteps = _props10.timeSteps,
          fixedHeader = _props10.fixedHeader,
          headerLabelGroupHeight = _props10.headerLabelGroupHeight,
          headerLabelHeight = _props10.headerLabelHeight;
      var scrollTop = this.state.scrollTop;

      var ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart);
      var twoHeaders = minUnit !== 'year';

      // add the top header
      if (twoHeaders) {
        (function () {
          var nextUnit = (0, _utils.getNextUnit)(minUnit);

          (0, _utils.iterateTimes)(visibleTimeStart, visibleTimeEnd, nextUnit, timeSteps, function (time, nextTime) {
            var startTime = Math.max(visibleTimeStart, time.valueOf());
            var endTime = Math.min(visibleTimeEnd, nextTime.valueOf());
            var left = Math.round((startTime.valueOf() - canvasTimeStart) * ratio, -2);
            var right = Math.round((endTime.valueOf() - canvasTimeStart) * ratio, -2);
            var labelWidth = right - left;
            var leftCorrect = fixedHeader === 'fixed' ? Math.round((canvasTimeStart - visibleTimeStart) * ratio) - 1 : 0;

            timeLabels.push(_react2.default.createElement(
              'div',
              { key: 'top-label-' + time.valueOf(),
                href: '#',
                className: 'rct-label-group',
                'data-time': time,
                'data-unit': nextUnit,
                style: {
                  left: left + leftCorrect + 'px',
                  width: labelWidth + 'px',
                  height: headerLabelGroupHeight + 'px',
                  lineHeight: headerLabelGroupHeight + 'px',
                  cursor: 'pointer'
                } },
              _this3.headerLabel(time, nextUnit, labelWidth)
            ));
          });
        })();
      }

      (0, _utils.iterateTimes)(canvasTimeStart, canvasTimeEnd, minUnit, timeSteps, function (time, nextTime) {
        var left = Math.round((time.valueOf() - canvasTimeStart) * ratio, -2);
        var minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit);
        var firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0);
        var labelWidth = Math.round((nextTime.valueOf() - time.valueOf()) * ratio, -2);
        var borderWidth = firstOfType ? 2 : 1;
        var leftCorrect = fixedHeader === 'fixed' ? Math.round((canvasTimeStart - visibleTimeStart) * ratio) - borderWidth + 1 : 0;
        var rctLabelClasses = _this3.props.rctLabelClass + ' rct-label ' + (twoHeaders ? '' : 'rct-label-only') + ' ' + (firstOfType ? 'rct-first-of-type' : '') + ' ';

        timeLabels.push(_react2.default.createElement(
          'div',
          { key: 'label-' + time.valueOf(),
            href: '#',
            className: rctLabelClasses,
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
          _this3.subHeaderLabel(time, minUnit, labelWidth)
        ));
      });

      var zIndex = this.props.zIndex;


      var headerStyle = {
        height: headerLabelGroupHeight + headerLabelHeight + 'px',
        lineHeight: lineHeight + 'px'
      };

      if (fixedHeader === 'fixed') {
        headerStyle.position = 'fixed';
        headerStyle.width = '100%';
        headerStyle.zIndex = zIndex;
      } else if (fixedHeader === 'absolute') {
        var componentTop = this.state.componentTop;
        if (scrollTop >= componentTop) {
          headerStyle.position = 'absolute';
          headerStyle.top = scrollTop - componentTop + 'px';
          headerStyle.width = canvasWidth + 'px';
          headerStyle.left = '0';
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
  // groups: React.PropTypes.array.isRequired,
  // width: React.PropTypes.number.isRequired,
  // lineHeight: React.PropTypes.number.isRequired,
  // headerBackgroundColor: React.PropTypes.string.isRequired,
  showPeriod: _react2.default.PropTypes.func.isRequired,
  canvasTimeStart: _react2.default.PropTypes.number.isRequired,
  canvasTimeEnd: _react2.default.PropTypes.number.isRequired,
  canvasWidth: _react2.default.PropTypes.number.isRequired,
  lineHeight: _react2.default.PropTypes.number.isRequired,
  visibleTimeStart: _react2.default.PropTypes.number.isRequired,
  visibleTimeEnd: _react2.default.PropTypes.number.isRequired,
  // visibleTimeEnd: React.PropTypes.number.isRequired,
  minUnit: _react2.default.PropTypes.string.isRequired,
  timeSteps: _react2.default.PropTypes.object.isRequired,
  width: _react2.default.PropTypes.number.isRequired,
  fixedHeader: _react2.default.PropTypes.oneOf(['fixed', 'absolute', 'none']),
  zIndex: _react2.default.PropTypes.number,
  rctLabelClass: _react.PropTypes.string,

  subHeaderLabelYearFormatShort: _react.PropTypes.string.isRequired,
  subHeaderLabelYearFormatLong: _react.PropTypes.string.isRequired,
  subHeaderLabelMonthFormatShort: _react.PropTypes.string.isRequired,
  subHeaderLabelMonthFormatMedium: _react.PropTypes.string.isRequired,
  subHeaderLabelMonthFormatLong: _react.PropTypes.string.isRequired,
  subHeaderLabelDayFormatShort: _react.PropTypes.string.isRequired,
  subHeaderLabelDayFormatMedium: _react.PropTypes.string.isRequired,
  subHeaderLabelDayFormatMediumLong: _react.PropTypes.string.isRequired,
  subHeaderLabelDayFormatLong: _react.PropTypes.string.isRequired,
  subHeaderLabelHourFormatShort: _react.PropTypes.string.isRequired,
  subHeaderLabelHourFormatLong: _react.PropTypes.string.isRequired,
  subHeaderLabelMinuteFormatShort: _react.PropTypes.string.isRequired,
  subHeaderLabelMinuteFormatLong: _react.PropTypes.string.isRequired,

  headerLabelYearFormatShort: _react.PropTypes.string.isRequired,
  headerLabelYearFormatLong: _react.PropTypes.string.isRequired,
  headerLabelMonthFormatShort: _react.PropTypes.string.isRequired,
  headerLabelMonthFormatMedium: _react.PropTypes.string.isRequired,
  headerLabelMonthFormatMediumLong: _react.PropTypes.string.isRequired,
  headerLabelMonthFormatLong: _react.PropTypes.string.isRequired,
  headerLabelDayFormatShort: _react.PropTypes.string.isRequired,
  headerLabelDayFormatLong: _react.PropTypes.string.isRequired,
  headerLabelHourFormatShort: _react.PropTypes.string.isRequired,
  headerLabelHourFormatMedium: _react.PropTypes.string.isRequired,
  headerLabelHourFormatMediumLong: _react.PropTypes.string.isRequired,
  headerLabelHourFormatLong: _react.PropTypes.string.isRequired
};
Header.defaultProps = {
  fixedHeader: 'none',
  zIndex: 11,
  rctLabelClass: ''
};
exports.default = Header;