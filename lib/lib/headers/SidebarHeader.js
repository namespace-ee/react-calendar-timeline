"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _HeadersContext = require("./HeadersContext");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var SidebarHeader = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(SidebarHeader, _React$PureComponent);

  var _super = _createSuper(SidebarHeader);

  function SidebarHeader() {
    var _this;

    _classCallCheck(this, SidebarHeader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "getRootProps", function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var style = props.style;
      var width = _this.props.variant === _constants.RIGHT_VARIANT ? _this.props.rightSidebarWidth : _this.props.leftSidebarWidth;
      return {
        style: _objectSpread(_objectSpread({}, style), {}, {
          width: width
        })
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getStateAndHelpers", function () {
      return {
        getRootProps: _this.getRootProps,
        data: _this.props.headerData
      };
    });

    return _this;
  }

  _createClass(SidebarHeader, [{
    key: "render",
    value: function render() {
      var props = this.getStateAndHelpers();
      var Renderer = this.props.children;
      return /*#__PURE__*/_react["default"].createElement(Renderer, props);
    }
  }]);

  return SidebarHeader;
}(_react["default"].PureComponent);

_defineProperty(SidebarHeader, "propTypes", {
  children: _propTypes["default"].func.isRequired,
  rightSidebarWidth: _propTypes["default"].number,
  leftSidebarWidth: _propTypes["default"].number.isRequired,
  variant: _propTypes["default"].string,
  headerData: _propTypes["default"].object
});

var SidebarWrapper = function SidebarWrapper(_ref) {
  var children = _ref.children,
      variant = _ref.variant,
      headerData = _ref.headerData;
  return /*#__PURE__*/_react["default"].createElement(_HeadersContext.TimelineHeadersConsumer, null, function (_ref2) {
    var leftSidebarWidth = _ref2.leftSidebarWidth,
        rightSidebarWidth = _ref2.rightSidebarWidth;
    return /*#__PURE__*/_react["default"].createElement(SidebarHeader, {
      leftSidebarWidth: leftSidebarWidth,
      rightSidebarWidth: rightSidebarWidth,
      children: children,
      variant: variant,
      headerData: headerData
    });
  });
};

SidebarWrapper.propTypes = {
  children: _propTypes["default"].func.isRequired,
  variant: _propTypes["default"].string,
  headerData: _propTypes["default"].object
};
SidebarWrapper.defaultProps = {
  variant: _constants.LEFT_VARIANT,
  children: function children(_ref3) {
    var getRootProps = _ref3.getRootProps;
    return /*#__PURE__*/_react["default"].createElement("div", getRootProps());
  }
};
SidebarWrapper.secretKey = "SidebarHeader";
var _default = SidebarWrapper;
exports["default"] = _default;