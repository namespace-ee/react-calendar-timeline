'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodayLine = function (_Component) {
  _inherits(TodayLine, _Component);

  function TodayLine() {
    _classCallCheck(this, TodayLine);

    return _possibleConstructorReturn(this, (TodayLine.__proto__ || Object.getPrototypeOf(TodayLine)).apply(this, arguments));
  }

  _createClass(TodayLine, [{
    key: 'render',


    // TODO: should currentTime come from a prop? probably...?
    value: function render() {
      var currentTime = new Date().getTime();

      if (currentTime > this.props.canvasTimeStart && currentTime < this.props.canvasTimeEnd) {
        var ratio = this.props.canvasWidth / (this.props.canvasTimeEnd - this.props.canvasTimeStart);
        var left = Math.round((currentTime - this.props.canvasTimeStart) * ratio);
        var top = this.props.headerHeight;
        var height = this.props.height - this.props.headerHeight;
        var styles = {
          top: top + 'px',
          left: left + 'px',
          height: height + 'px'
        };

        return _react2.default.createElement('div', { className: 'rct-today', style: styles });
      } else {
        return _react2.default.createElement('div', null);
      }
    }
  }]);

  return TodayLine;
}(_react.Component);

TodayLine.propTypes = {
  canvasTimeStart: _propTypes2.default.number.isRequired,
  canvasTimeEnd: _propTypes2.default.number.isRequired,
  canvasWidth: _propTypes2.default.number.isRequired,
  lineHeight: _propTypes2.default.number.isRequired,
  lineCount: _propTypes2.default.number.isRequired
};
TodayLine.defaultProps = {};
var _default = TodayLine;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TodayLine, 'TodayLine', 'src/lib/lines/TodayLine.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/lines/TodayLine.js');
}();

;