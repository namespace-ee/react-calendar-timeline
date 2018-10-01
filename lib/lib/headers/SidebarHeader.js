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

var _HeadersContext = require('./HeadersContext');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SidebarHeader = function (_React$PureComponent) {
  _inherits(SidebarHeader, _React$PureComponent);

  function SidebarHeader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SidebarHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SidebarHeader.__proto__ || Object.getPrototypeOf(SidebarHeader)).call.apply(_ref, [this].concat(args))), _this), _this.getRootProps = function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var style = props.style;

      var width = _this.props.variant === _constants.RIGHT_VARIANT ? _this.props.rightSidebarWidth : _this.props.leftSidebarWidth;
      return {
        style: _extends({
          width: width
        }, style)
      };
    }, _this.getStateAndHelpers = function () {
      return {
        getRootProps: _this.getRootProps
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SidebarHeader, [{
    key: 'render',
    value: function render() {
      var props = this.getStateAndHelpers();
      return this.props.children(props, this.props.props);
    }
  }]);

  return SidebarHeader;
}(_react2.default.PureComponent);

SidebarHeader.propTypes = {
  children: _propTypes2.default.func.isRequired,
  rightSidebarWidth: _propTypes2.default.number,
  leftSidebarWidth: _propTypes2.default.number.isRequired,
  variant: _propTypes2.default.string,
  props: _propTypes2.default.object
};


var SidebarWrapper = function SidebarWrapper(_ref2) {
  var children = _ref2.children,
      variant = _ref2.variant,
      props = _ref2.props;
  return _react2.default.createElement(
    _HeadersContext.TimelineHeadersConsumer,
    null,
    function (_ref3) {
      var leftSidebarWidth = _ref3.leftSidebarWidth,
          rightSidebarWidth = _ref3.rightSidebarWidth;

      return _react2.default.createElement(SidebarHeader, {
        leftSidebarWidth: leftSidebarWidth,
        rightSidebarWidth: rightSidebarWidth,
        children: children,
        variant: variant,
        props: props
      });
    }
  );
};

SidebarWrapper.propTypes = {
  children: _propTypes2.default.func.isRequired,
  variant: _propTypes2.default.string,
  props: _propTypes2.default.object
};

SidebarWrapper.defaultProps = {
  variant: _constants.LEFT_VARIANT,
  children: function children(_ref4) {
    var getRootProps = _ref4.getRootProps;
    return _react2.default.createElement('div', getRootProps());
  }
};

exports.default = SidebarWrapper;