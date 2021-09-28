"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineMarkersConsumer = exports.TimelineMarkersProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _createReactContext2 = _interopRequireDefault(require("create-react-context"));

var _generic = require("../utility/generic");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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

var TimelineMarkersProvider = /*#__PURE__*/function (_React$Component) {
  _inherits(TimelineMarkersProvider, _React$Component);

  var _super = _createSuper(TimelineMarkersProvider);

  function TimelineMarkersProvider() {
    var _this;

    _classCallCheck(this, TimelineMarkersProvider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handleSubscribeToMarker", function (newMarker) {
      newMarker = _objectSpread(_objectSpread({}, newMarker), {}, {
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
      return /*#__PURE__*/_react["default"].createElement(Provider, {
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