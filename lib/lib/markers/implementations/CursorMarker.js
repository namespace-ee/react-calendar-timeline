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

var _shared = require('./shared');

var _MarkerCanvasContext = require('../MarkerCanvasContext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultRenderer = (0, _shared.createDefaultRenderer)('default-cursor-marker');

/**
 * CursorMarker implementation subscribes to 'subscribeToCanvasMouseOver' on mount.
 * This subscription is passed in via MarkerCanvasConsumer, which is wired up to
 * MarkerCanvasProvider in the MarkerCanvas component. When the user mouses over MarkerCanvas,
 * the callback registered in CursorMarker (this component) is passed:
 *  leftOffset - pixels from left edge of canvas, used to position this element
 *  date - the date the cursor pertains to
 *  isCursorOverCanvas - whether the user cursor is over the canvas. This is set to 'false'
 *  when the user mouseleaves the element
 */

var CursorMarker = function (_React$Component) {
  _inherits(CursorMarker, _React$Component);

  function CursorMarker() {
    _classCallCheck(this, CursorMarker);

    var _this = _possibleConstructorReturn(this, (CursorMarker.__proto__ || Object.getPrototypeOf(CursorMarker)).call(this));

    _this.handleCanvasMouseOver = function (_ref) {
      var leftOffset = _ref.leftOffset,
          date = _ref.date,
          isCursorOverCanvas = _ref.isCursorOverCanvas;

      _this.setState({
        leftOffset: leftOffset,
        date: date,
        isShowingCursor: isCursorOverCanvas
      });
    };

    _this.state = {
      leftOffset: 0,
      date: 0,
      isShowingCursor: false
    };
    return _this;
  }

  _createClass(CursorMarker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubscribe = this.props.subscribeToCanvasMouseOver(this.handleCanvasMouseOver);
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
      var _state = this.state,
          isShowingCursor = _state.isShowingCursor,
          leftOffset = _state.leftOffset,
          date = _state.date;


      if (!isShowingCursor) return null;

      var styles = (0, _shared.createMarkerStylesWithLeftOffset)(leftOffset);

      return this.props.renderer({ styles: styles, date: date });
    }
  }]);

  return CursorMarker;
}(_react2.default.Component);

// TODO: turn into HOC?


CursorMarker.propTypes = {
  subscribeToCanvasMouseOver: _propTypes2.default.func.isRequired,
  renderer: _propTypes2.default.func
};
CursorMarker.defaultProps = {
  renderer: defaultRenderer
};
var CursorMarkerWrapper = function CursorMarkerWrapper(props) {
  return _react2.default.createElement(
    _MarkerCanvasContext.MarkerCanvasConsumer,
    null,
    function (_ref2) {
      var subscribeToMouseOver = _ref2.subscribeToMouseOver;

      return _react2.default.createElement(CursorMarker, _extends({
        subscribeToCanvasMouseOver: subscribeToMouseOver
      }, props));
    }
  );
};

CursorMarkerWrapper.displayName = 'CursorMarkerWrapper';

exports.default = CursorMarkerWrapper;