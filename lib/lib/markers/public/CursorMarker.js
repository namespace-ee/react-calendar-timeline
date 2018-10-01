'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TimelineMarkersContext = require('../TimelineMarkersContext');

var _markerType = require('../markerType');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CursorMarker = function (_React$Component) {
  _inherits(CursorMarker, _React$Component);

  function CursorMarker() {
    _classCallCheck(this, CursorMarker);

    return _possibleConstructorReturn(this, (CursorMarker.__proto__ || Object.getPrototypeOf(CursorMarker)).apply(this, arguments));
  }

  _createClass(CursorMarker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubscribe = this.props.subscribeMarker({
        type: _markerType.TimelineMarkerType.Cursor,
        renderer: this.props.children
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.unsubscribe != null) {
        this.unsubscribe();
        this.unsubscribe = null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return CursorMarker;
}(_react2.default.Component);

// TODO: turn into HOC?


CursorMarker.propTypes = {
  subscribeMarker: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.func
};
var CursorMarkerWrapper = function CursorMarkerWrapper(props) {
  return _react2.default.createElement(
    _TimelineMarkersContext.TimelineMarkersConsumer,
    null,
    function (_ref) {
      var subscribeMarker = _ref.subscribeMarker;
      return _react2.default.createElement(CursorMarker, _extends({ subscribeMarker: subscribeMarker }, props));
    }
  );
};

CursorMarkerWrapper.displayName = 'CursorMarkerWrapper';

exports.default = CursorMarkerWrapper;