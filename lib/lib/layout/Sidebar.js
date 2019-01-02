'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _generic = require('../utility/generic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sidebar = function (_Component) {
  _inherits(Sidebar, _Component);

  function Sidebar() {
    _classCallCheck(this, Sidebar);

    return _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).apply(this, arguments));
  }

  _createClass(Sidebar, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !((0, _generic.arraysEqual)(nextProps.groups, this.props.groups) && nextProps.keys === this.props.keys && nextProps.width === this.props.width && nextProps.groupHeights === this.props.groupHeights && nextProps.height === this.props.height);
    }
  }, {
    key: 'renderGroupContent',
    value: function renderGroupContent(group, isRightSidebar, groupTitleKey, groupRightTitleKey) {
      if (this.props.groupRenderer) {
        return _react2.default.createElement(this.props.groupRenderer, {
          group: group,
          isRightSidebar: isRightSidebar
        });
      } else {
        return (0, _generic._get)(group, isRightSidebar ? groupRightTitleKey : groupTitleKey);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          width = _props.width,
          groupHeights = _props.groupHeights,
          height = _props.height,
          isRightSidebar = _props.isRightSidebar;
      var _props$keys = this.props.keys,
          groupIdKey = _props$keys.groupIdKey,
          groupTitleKey = _props$keys.groupTitleKey,
          groupRightTitleKey = _props$keys.groupRightTitleKey;


      var sidebarStyle = {
        width: width + 'px',
        height: height + 'px'
      };

      var groupsStyle = {
        width: width + 'px'
      };

      var groupLines = this.props.groups.map(function (group, index) {
        var elementStyle = {
          height: groupHeights[index] - 1 + 'px',
          lineHeight: groupHeights[index] - 1 + 'px'
        };

        return _react2.default.createElement(
          'div',
          {
            key: (0, _generic._get)(group, groupIdKey),
            className: 'rct-sidebar-row rct-sidebar-row-' + (index % 2 === 0 ? 'even' : 'odd'),
            style: elementStyle
          },
          _this2.renderGroupContent(group, isRightSidebar, groupTitleKey, groupRightTitleKey)
        );
      });

      return _react2.default.createElement(
        'div',
        {
          className: 'rct-sidebar' + (isRightSidebar ? ' rct-sidebar-right' : ''),
          style: sidebarStyle
        },
        _react2.default.createElement(
          'div',
          { style: groupsStyle },
          groupLines
        )
      );
    }
  }]);

  return Sidebar;
}(_react.Component);

Sidebar.propTypes = {
  groups: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]).isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  groupHeights: _propTypes2.default.array.isRequired,
  keys: _propTypes2.default.object.isRequired,
  groupRenderer: _propTypes2.default.func,
  isRightSidebar: _propTypes2.default.bool
};
exports.default = Sidebar;