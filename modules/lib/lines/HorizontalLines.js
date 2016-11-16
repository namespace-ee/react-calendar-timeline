'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HorizontalLines = function (_Component) {
  _inherits(HorizontalLines, _Component);

  function HorizontalLines() {
    _classCallCheck(this, HorizontalLines);

    return _possibleConstructorReturn(this, (HorizontalLines.__proto__ || Object.getPrototypeOf(HorizontalLines)).apply(this, arguments));
  }

  _createClass(HorizontalLines, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(nextProps.canvasWidth === this.props.canvasWidth && nextProps.lineHeight === this.props.lineHeight && nextProps.lineCount === this.props.lineCount && nextProps.groupHeights === this.props.groupHeights);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          lineCount = _props.lineCount,
          canvasWidth = _props.canvasWidth,
          groupHeights = _props.groupHeights,
          headerHeight = _props.headerHeight;

      var lines = [];

      var totalHeight = headerHeight;
      for (var i = 0; i < lineCount; i++) {
        lines.push(_react2.default.createElement('div', { key: 'horizontal-line-' + i,
          className: i % 2 === 0 ? 'rct-hl-even' : 'rct-hl-odd',
          style: {
            top: totalHeight + 'px',
            left: '0px',
            width: canvasWidth + 'px',
            height: groupHeights[i] - 1 + 'px'
          } }));
        totalHeight += groupHeights[i];
      }

      return _react2.default.createElement(
        'div',
        { className: 'rct-horizontal-lines' },
        lines
      );
    }
  }]);

  return HorizontalLines;
}(_react.Component);

exports.default = HorizontalLines;


HorizontalLines.propTypes = {
  canvasWidth: _react2.default.PropTypes.number.isRequired,
  lineHeight: _react2.default.PropTypes.number.isRequired,
  lineCount: _react2.default.PropTypes.number.isRequired
};
HorizontalLines.defaultProps = {
  borderWidth: 1
};