'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VerticalLines = function (_Component) {
  _inherits(VerticalLines, _Component);

  function VerticalLines() {
    _classCallCheck(this, VerticalLines);

    return _possibleConstructorReturn(this, (VerticalLines.__proto__ || Object.getPrototypeOf(VerticalLines)).apply(this, arguments));
  }

  _createClass(VerticalLines, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(nextProps.canvasTimeStart === this.props.canvasTimeStart && nextProps.canvasTimeEnd === this.props.canvasTimeEnd && nextProps.canvasWidth === this.props.canvasWidth && nextProps.lineHeight === this.props.lineHeight && nextProps.lineCount === this.props.lineCount && nextProps.minUnit === this.props.minUnit && nextProps.timeSteps === this.props.timeSteps && nextProps.fixedHeader === this.props.fixedHeader && nextProps.height === this.props.height && nextProps.headerHeight === this.props.headerHeight);
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
          height = _props.height,
          headerHeight = _props.headerHeight;

      var ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart);

      var lines = [];

      (0, _utils.iterateTimes)(canvasTimeStart, canvasTimeEnd, minUnit, timeSteps, function (time, nextTime) {
        var left = Math.round((time.valueOf() - canvasTimeStart) * ratio, -2);
        var minUnitValue = time.get(minUnit === 'day' ? 'date' : minUnit);
        var firstOfType = minUnitValue === (minUnit === 'day' ? 1 : 0);
        var lineWidth = firstOfType ? 2 : 1;
        var labelWidth = Math.ceil((nextTime.valueOf() - time.valueOf()) * ratio) - lineWidth;
        var leftPush = _this2.props.fixedHeader !== 'none' && firstOfType ? -1 : 0;

        var classNames = 'rct-vl' + (firstOfType ? ' rct-vl-first' : '') + (minUnit === 'day' || minUnit === 'hour' || minUnit === 'minute' ? ' rct-day-' + time.day() : '');

        lines.push(_react2.default.createElement('div', { key: 'line-' + time.valueOf(),
          className: classNames,
          style: {
            top: headerHeight + 'px',
            left: left + leftPush + 'px',
            width: labelWidth + 'px',
            height: height - headerHeight + 'px'
          } }));
      });

      return _react2.default.createElement(
        'div',
        { className: 'rct-vertical-lines' },
        lines
      );
    }
  }]);

  return VerticalLines;
}(_react.Component);

VerticalLines.propTypes = {
  canvasTimeStart: _propTypes2.default.number.isRequired,
  canvasTimeEnd: _propTypes2.default.number.isRequired,
  canvasWidth: _propTypes2.default.number.isRequired,
  lineHeight: _propTypes2.default.number.isRequired,
  lineCount: _propTypes2.default.number.isRequired,
  minUnit: _propTypes2.default.string.isRequired,
  timeSteps: _propTypes2.default.object.isRequired,
  fixedHeader: _propTypes2.default.string.isRequired
};
VerticalLines.defaultProps = {
  fixedHeader: 'sticky',
  dayBackground: null
};
var _default = VerticalLines;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(VerticalLines, 'VerticalLines', 'src/lib/lines/VerticalLines.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/lines/VerticalLines.js');
}();

;