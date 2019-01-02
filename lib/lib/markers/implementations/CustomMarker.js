'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shared = require('./shared');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultCustomMarkerRenderer = (0, _shared.createDefaultRenderer)('default-customer-marker-id');
/**
 * CustomMarker that is placed based on passed in date prop
 */

var CustomMarker = function (_React$Component) {
  _inherits(CustomMarker, _React$Component);

  function CustomMarker() {
    _classCallCheck(this, CustomMarker);

    return _possibleConstructorReturn(this, (CustomMarker.__proto__ || Object.getPrototypeOf(CustomMarker)).apply(this, arguments));
  }

  _createClass(CustomMarker, [{
    key: 'render',
    value: function render() {
      var date = this.props.date;

      var leftOffset = this.props.getLeftOffsetFromDate(date);

      var styles = (0, _shared.createMarkerStylesWithLeftOffset)(leftOffset);
      return this.props.renderer({ styles: styles, date: date });
    }
  }]);

  return CustomMarker;
}(_react2.default.Component);

CustomMarker.propTypes = {
  getLeftOffsetFromDate: _propTypes2.default.func.isRequired,
  renderer: _propTypes2.default.func,
  date: _propTypes2.default.number.isRequired
};
CustomMarker.defaultProps = {
  renderer: defaultCustomMarkerRenderer
};
exports.default = CustomMarker;