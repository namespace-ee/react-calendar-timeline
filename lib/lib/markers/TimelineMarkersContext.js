'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineMarkersConsumer = exports.TimelineMarkersProvider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactContext2 = require('create-react-context');

var _createReactContext3 = _interopRequireDefault(_createReactContext2);

var _generic = require('../utility/generic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultContextState = {
  markers: [],
  subscribeMarker: function subscribeMarker() {
    // eslint-disable-next-line
    console.warn('default subscribe marker used');
    return _generic.noop;
  }
};

var _createReactContext = (0, _createReactContext3.default)(defaultContextState),
    Consumer = _createReactContext.Consumer,
    Provider = _createReactContext.Provider;

// REVIEW: is this the best way to manage ids?


var _id = 0;
var createId = function createId() {
  _id += 1;
  return _id + 1;
};

var TimelineMarkersProvider = exports.TimelineMarkersProvider = function (_React$Component) {
  _inherits(TimelineMarkersProvider, _React$Component);

  function TimelineMarkersProvider() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TimelineMarkersProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TimelineMarkersProvider.__proto__ || Object.getPrototypeOf(TimelineMarkersProvider)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubscribeToMarker = function (newMarker) {
      newMarker = _extends({}, newMarker, {
        // REVIEW: in the event that we accept id to be passed to the Marker components, this line would override those
        id: createId()
      });

      _this.setState(function (state) {
        return {
          markers: [].concat(_toConsumableArray(state.markers), [newMarker])
        };
      });
      return function () {
        _this.setState(function (state) {
          return {
            markers: state.markers.filter(function (marker) {
              return marker !== newMarker;
            })
          };
        });
      };
    }, _this.state = {
      markers: [],
      subscribeMarker: _this.handleSubscribeToMarker
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TimelineMarkersProvider, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        Provider,
        { value: this.state },
        this.props.children
      );
    }
  }]);

  return TimelineMarkersProvider;
}(_react2.default.Component);

TimelineMarkersProvider.propTypes = {
  children: _propTypes2.default.element.isRequired
};
var TimelineMarkersConsumer = exports.TimelineMarkersConsumer = Consumer;