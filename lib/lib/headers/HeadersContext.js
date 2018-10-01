'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineHeadersConsumer = exports.TimelineHeadersProvider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactContext2 = require('create-react-context');

var _createReactContext3 = _interopRequireDefault(_createReactContext2);

var _generic = require('../utility/generic');

var _constants = require('./constants');

var _calendar = require('../utility/calendar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultContextState = {
  registerScroll: function registerScroll() {
    // eslint-disable-next-line
    console.warn('default registerScroll header used');
    return _generic.noop;
  },
  rightSidebarWidth: 0,
  leftSidebarWidth: 150,
  timeSteps: {}
};

var _createReactContext = (0, _createReactContext3.default)(defaultContextState),
    Consumer = _createReactContext.Consumer,
    Provider = _createReactContext.Provider;

var TimelineHeadersProvider = exports.TimelineHeadersProvider = function (_React$Component) {
  _inherits(TimelineHeadersProvider, _React$Component);

  function TimelineHeadersProvider() {
    _classCallCheck(this, TimelineHeadersProvider);

    return _possibleConstructorReturn(this, (TimelineHeadersProvider.__proto__ || Object.getPrototypeOf(TimelineHeadersProvider)).apply(this, arguments));
  }

  _createClass(TimelineHeadersProvider, [{
    key: 'render',
    value: function render() {
      var contextValue = {
        rightSidebarWidth: this.props.rightSidebarWidth,
        leftSidebarWidth: this.props.leftSidebarWidth,
        timeSteps: this.props.timeSteps,
        registerScroll: this.props.registerScroll
      };
      return _react2.default.createElement(
        Provider,
        { value: contextValue },
        this.props.children
      );
    }
  }]);

  return TimelineHeadersProvider;
}(_react2.default.Component);

TimelineHeadersProvider.propTypes = {
  children: _propTypes2.default.element.isRequired,
  rightSidebarWidth: _propTypes2.default.number,
  leftSidebarWidth: _propTypes2.default.number.isRequired,
  //TODO: maybe this should be skipped?
  timeSteps: _propTypes2.default.object.isRequired,
  registerScroll: _propTypes2.default.func.isRequired
};
var TimelineHeadersConsumer = exports.TimelineHeadersConsumer = Consumer;