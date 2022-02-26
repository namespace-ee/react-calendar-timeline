"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineMarkersConsumer = exports.TimelineMarkersProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _createReactContext2 = _interopRequireDefault(require("create-react-context"));

var _generic = require("../utility/generic");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultContextState = {
  markers: [],
  subscribeMarker: function subscribeMarker() {
    // eslint-disable-next-line
    console.warn('default subscribe marker used');
    return _generic.noop;
  }
};

var _createReactContext = (0, _createReactContext2["default"])(defaultContextState),
    Consumer = _createReactContext.Consumer,
    Provider = _createReactContext.Provider; // REVIEW: is this the best way to manage ids?


var _id = 0;

var createId = function createId() {
  _id += 1;
  return _id + 1;
};

var TimelineMarkersProvider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TimelineMarkersProvider, _React$Component);

  function TimelineMarkersProvider() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TimelineMarkersProvider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TimelineMarkersProvider)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleSubscribeToMarker", function (newMarker) {
      newMarker = _objectSpread({}, newMarker, {
        // REVIEW: in the event that we accept id to be passed to the Marker components, this line would override those
        id: createId()
      });

      _this.setState(function (state) {
        return {
          markers: [].concat(_toConsumableArray(state.markers), [newMarker])
        };
      });

      return {
        unsubscribe: function unsubscribe() {
          _this.setState(function (state) {
            return {
              markers: state.markers.filter(function (marker) {
                return marker.id !== newMarker.id;
              })
            };
          });
        },
        getMarker: function getMarker() {
          return newMarker;
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleUpdateMarker", function (updateMarker) {
      var markerIndex = _this.state.markers.findIndex(function (marker) {
        return marker.id === updateMarker.id;
      });

      if (markerIndex < 0) return;

      _this.setState(function (state) {
        return {
          markers: [].concat(_toConsumableArray(state.markers.slice(0, markerIndex)), [updateMarker], _toConsumableArray(state.markers.slice(markerIndex + 1)))
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "state", {
      markers: [],
      subscribeMarker: _this.handleSubscribeToMarker,
      updateMarker: _this.handleUpdateMarker
    });

    return _this;
  }

  _createClass(TimelineMarkersProvider, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement(Provider, {
        value: this.state
      }, this.props.children);
    }
  }]);

  return TimelineMarkersProvider;
}(_react["default"].Component);

exports.TimelineMarkersProvider = TimelineMarkersProvider;

_defineProperty(TimelineMarkersProvider, "propTypes", {
  children: _propTypes["default"].element.isRequired
});

var TimelineMarkersConsumer = Consumer;
exports.TimelineMarkersConsumer = TimelineMarkersConsumer;