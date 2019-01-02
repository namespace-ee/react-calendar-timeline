'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TimelineElementsHeader = require('./TimelineElementsHeader');

var _TimelineElementsHeader2 = _interopRequireDefault(_TimelineElementsHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          width = _props.width,
          stickyOffset = _props.stickyOffset,
          stickyHeader = _props.stickyHeader,
          headerRef = _props.headerRef,
          scrollHeaderRef = _props.scrollHeaderRef,
          hasRightSidebar = _props.hasRightSidebar,
          showPeriod = _props.showPeriod,
          canvasTimeStart = _props.canvasTimeStart,
          canvasTimeEnd = _props.canvasTimeEnd,
          canvasWidth = _props.canvasWidth,
          minUnit = _props.minUnit,
          timeSteps = _props.timeSteps,
          headerLabelFormats = _props.headerLabelFormats,
          subHeaderLabelFormats = _props.subHeaderLabelFormats,
          headerLabelGroupHeight = _props.headerLabelGroupHeight,
          headerLabelHeight = _props.headerLabelHeight,
          leftSidebarHeader = _props.leftSidebarHeader,
          rightSidebarHeader = _props.rightSidebarHeader,
          leftSidebarWidth = _props.leftSidebarWidth,
          rightSidebarWidth = _props.rightSidebarWidth;


      var headerStyle = {
        top: stickyHeader ? stickyOffset || 0 : 0
      };

      var headerClass = stickyHeader ? 'header-sticky' : '';

      var leftSidebar = leftSidebarHeader && leftSidebarWidth > 0 && _react2.default.createElement(
        'div',
        {
          className: 'rct-sidebar-header',
          style: { width: leftSidebarWidth }
        },
        leftSidebarHeader
      );

      var rightSidebar = rightSidebarHeader && rightSidebarWidth > 0 && _react2.default.createElement(
        'div',
        {
          className: 'rct-sidebar-header rct-sidebar-right',
          style: { width: rightSidebarWidth }
        },
        rightSidebarHeader
      );

      return _react2.default.createElement(
        'div',
        {
          className: 'rct-header-container ' + headerClass,

          ref: headerRef,
          style: headerStyle
        },
        leftSidebar,
        _react2.default.createElement(
          'div',
          { style: { width: width } },
          _react2.default.createElement(_TimelineElementsHeader2.default, {
            hasRightSidebar: hasRightSidebar,
            showPeriod: showPeriod,
            canvasTimeStart: canvasTimeStart,
            canvasTimeEnd: canvasTimeEnd,
            canvasWidth: canvasWidth,
            minUnit: minUnit,
            timeSteps: timeSteps,
            width: width,
            headerLabelFormats: headerLabelFormats,
            subHeaderLabelFormats: subHeaderLabelFormats,
            headerLabelGroupHeight: headerLabelGroupHeight,
            headerLabelHeight: headerLabelHeight,
            scrollHeaderRef: scrollHeaderRef

          })
        ),
        rightSidebar
      );
    }
  }]);

  return Header;
}(_react.Component);

Header.propTypes = {
  hasRightSidebar: _propTypes2.default.bool.isRequired,
  showPeriod: _propTypes2.default.func.isRequired,
  canvasTimeStart: _propTypes2.default.number.isRequired,
  canvasTimeEnd: _propTypes2.default.number.isRequired,
  canvasWidth: _propTypes2.default.number.isRequired,
  minUnit: _propTypes2.default.string.isRequired,
  timeSteps: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  headerLabelFormats: _propTypes2.default.object.isRequired,
  subHeaderLabelFormats: _propTypes2.default.object.isRequired,
  stickyOffset: _propTypes2.default.number,
  stickyHeader: _propTypes2.default.bool.isRequired,
  headerLabelGroupHeight: _propTypes2.default.number.isRequired,
  headerLabelHeight: _propTypes2.default.number.isRequired,
  leftSidebarHeader: _propTypes2.default.node,
  rightSidebarHeader: _propTypes2.default.node,
  leftSidebarWidth: _propTypes2.default.number,
  rightSidebarWidth: _propTypes2.default.number,
  headerRef: _propTypes2.default.func.isRequired,
  scrollHeaderRef: _propTypes2.default.func.isRequired
};
exports.default = Header;