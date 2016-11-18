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
        return time.format(width < 46 ? 'YY' : 'YYYY');
      } else if (unit === 'month') {
        return time.format(width < 65 ? 'MM/YY' : width < 75 ? 'MM/YYYY' : width < 120 ? 'MMM YYYY' : 'MMMM YYYY');
      } else if (unit === 'day') {
        return time.format(width < 150 ? 'L' : 'dddd, LL');
      } else if (unit === 'hour') {
        return time.format(width < 50 ? 'HH' : width < 130 ? 'HH:00' : width < 150 ? 'L, HH:00' : 'dddd, LL, HH:00');
      } else {
        return time.format('LLL');
      }
    }
  }, {
    key: 'subHeaderLabel',
    value: function subHeaderLabel(time, unit, width) {
      if (unit === 'year') {
        return time.format(width < 46 ? 'YY' : 'YYYY');
      } else if (unit === 'month') {
        return time.format(width < 37 ? 'MM' : width < 85 ? 'MMM' : 'MMMM');
      } else if (unit === 'day') {
        return time.format(width < 47 ? 'D' : width < 80 ? 'dd D' : width < 120 ? 'ddd, Do' : 'dddd, Do');
      } else if (unit === 'hour') {
        return time.format(width < 50 ? 'HH' : 'HH:00');
      } else if (unit === 'minute') {
        return time.format(width < 60 ? 'mm' : 'HH:mm');
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
          headerLabelGroupHeight = _props.headerLabelGroupHeight,
          headerLabelHeight = _props.headerLabelHeight;
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

        timeLabels.push(_react2.default.createElement(
          'div',
          { key: 'label-' + time.valueOf(),
            href: '#',
            className: 'rct-label ' + (twoHeaders ? '' : 'rct-label-only') + ' ' + (firstOfType ? 'rct-first-of-type' : '') + ' ',
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

exports.default = Header;


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
  zIndex: _react2.default.PropTypes.number
};
Header.defaultProps = {
  fixedHeader: 'none',
  zIndex: 11
};