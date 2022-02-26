"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _HeadersContext = require("./HeadersContext");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SidebarHeader = _interopRequireDefault(require("./SidebarHeader"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var TimelineHeaders =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TimelineHeaders, _React$Component);

  function TimelineHeaders(props) {
    var _this;

    _classCallCheck(this, TimelineHeaders);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TimelineHeaders).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getRootStyle", function () {
      return _objectSpread({}, _this.props.style, {
        display: 'flex',
        width: '100%'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getCalendarHeaderStyle", function () {
      var _this$props = _this.props,
          leftSidebarWidth = _this$props.leftSidebarWidth,
          rightSidebarWidth = _this$props.rightSidebarWidth,
          calendarHeaderStyle = _this$props.calendarHeaderStyle;
      return _objectSpread({}, calendarHeaderStyle, {
        overflow: 'hidden',
        width: "calc(100% - ".concat(leftSidebarWidth + rightSidebarWidth, "px)")
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleRootRef", function (element) {
      if (_this.props.headerRef) {
        _this.props.headerRef(element);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isSidebarHeader", function (child) {
      if (child.type === undefined) return false;
      return child.type.secretKey === _SidebarHeader["default"].secretKey;
    });

    return _this;
  }

  _createClass(TimelineHeaders, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var rightSidebarHeader;
      var leftSidebarHeader;
      var calendarHeaders = [];
      var children = Array.isArray(this.props.children) ? this.props.children.filter(function (c) {
        return c;
      }) : [this.props.children];

      _react["default"].Children.map(children, function (child) {
        if (_this2.isSidebarHeader(child)) {
          if (child.props.variant === _constants.RIGHT_VARIANT) {
            rightSidebarHeader = child;
          } else {
            leftSidebarHeader = child;
          }
        } else {
          calendarHeaders.push(child);
        }
      });

      if (!leftSidebarHeader) {
        leftSidebarHeader = _react["default"].createElement(_SidebarHeader["default"], null);
      }

      if (!rightSidebarHeader && this.props.rightSidebarWidth) {
        rightSidebarHeader = _react["default"].createElement(_SidebarHeader["default"], {
          variant: "right"
        });
      }

      return _react["default"].createElement("div", {
        ref: this.handleRootRef,
        style: this.getRootStyle(),
        className: (0, _classnames["default"])('rct-header-root', this.props.className)
      }, leftSidebarHeader, _react["default"].createElement("div", {
        ref: this.props.registerScroll,
        style: this.getCalendarHeaderStyle(),
        className: (0, _classnames["default"])('rct-calendar-header', this.props.calendarHeaderClassName)
      }, calendarHeaders), rightSidebarHeader);
    }
  }]);

  return TimelineHeaders;
}(_react["default"].Component);

_defineProperty(TimelineHeaders, "propTypes", {
  registerScroll: _propTypes["default"].func.isRequired,
  leftSidebarWidth: _propTypes["default"].number.isRequired,
  rightSidebarWidth: _propTypes["default"].number.isRequired,
  style: _propTypes["default"].object,
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  calendarHeaderStyle: _propTypes["default"].object,
  calendarHeaderClassName: _propTypes["default"].string,
  headerRef: _propTypes["default"].func
});

var TimelineHeadersWrapper = function TimelineHeadersWrapper(_ref) {
  var children = _ref.children,
      style = _ref.style,
      className = _ref.className,
      calendarHeaderStyle = _ref.calendarHeaderStyle,
      calendarHeaderClassName = _ref.calendarHeaderClassName;
  return _react["default"].createElement(_HeadersContext.TimelineHeadersConsumer, null, function (_ref2) {
    var leftSidebarWidth = _ref2.leftSidebarWidth,
        rightSidebarWidth = _ref2.rightSidebarWidth,
        registerScroll = _ref2.registerScroll;
    return _react["default"].createElement(TimelineHeaders, {
      leftSidebarWidth: leftSidebarWidth,
      rightSidebarWidth: rightSidebarWidth,
      registerScroll: registerScroll,
      style: style,
      className: className,
      calendarHeaderStyle: calendarHeaderStyle,
      calendarHeaderClassName: calendarHeaderClassName
    }, children);
  });
};

TimelineHeadersWrapper.propTypes = {
  style: _propTypes["default"].object,
  children: _propTypes["default"].node,
  className: _propTypes["default"].string,
  calendarHeaderStyle: _propTypes["default"].object,
  calendarHeaderClassName: _propTypes["default"].string
};
TimelineHeadersWrapper.secretKey = "TimelineHeaders";
var _default = TimelineHeadersWrapper;
exports["default"] = _default;