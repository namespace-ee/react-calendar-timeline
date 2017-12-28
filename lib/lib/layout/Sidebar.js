'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils');

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
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !((0, _utils.arraysEqual)(nextProps.groups, this.props.groups) && nextProps.keys === this.props.keys && nextProps.width === this.props.width && nextProps.lineHeight === this.props.lineHeight && nextProps.fixedHeader === this.props.fixedHeader && nextProps.stickyOffset === this.props.stickyOffset && nextProps.headerPosition === this.props.headerPosition && nextProps.groupHeights === this.props.groupHeights && nextProps.height === this.props.height);
    }
  }, {
    key: 'renderGroupContent',
    value: function renderGroupContent(group, isRightSidebar, groupTitleKey, groupRightTitleKey) {
      if (this.props.groupRenderer) {
        return _react2.default.createElement(this.props.groupRenderer, { group: group, isRightSidebar: isRightSidebar });
      } else {
        return (0, _utils._get)(group, isRightSidebar ? groupRightTitleKey : groupTitleKey);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          fixedHeader = _props.fixedHeader,
          stickyOffset = _props.stickyOffset,
          width = _props.width,
          lineHeight = _props.lineHeight,
          groupHeights = _props.groupHeights,
          height = _props.height,
          headerHeight = _props.headerHeight,
          isRightSidebar = _props.isRightSidebar,
          headerPosition = _props.headerPosition;
      var _props$keys = this.props.keys,
          groupIdKey = _props$keys.groupIdKey,
          groupTitleKey = _props$keys.groupTitleKey,
          groupRightTitleKey = _props$keys.groupRightTitleKey;


      var sidebarStyle = {
        width: width + 'px',
        height: height + 'px'
      };

      var headerStyle = {
        height: headerHeight + 'px',
        lineHeight: lineHeight + 'px',
        width: width + 'px'
      };

      var groupsStyle = {
        width: width + 'px'
      };

      if (fixedHeader === 'fixed') {
        headerStyle.position = 'fixed';
        groupsStyle.paddingTop = headerStyle.height;
      } else if (fixedHeader === 'sticky') {
        if (headerPosition === 'top') {
          // do nothing - keep at the top
        } else if (headerPosition === 'fixed') {
          headerStyle.position = 'fixed';
          headerStyle.top = stickyOffset;
          groupsStyle.paddingTop = headerStyle.height;
        } else if (headerPosition === 'bottom') {
          headerStyle.position = 'absolute';
          headerStyle.bottom = 0;
          groupsStyle.paddingTop = headerStyle.height;
        }
      }

      var header = _react2.default.createElement(
        'div',
        { ref: 'sidebarHeader', className: 'rct-sidebar-header', style: headerStyle },
        this.props.children
      );

      var groupLines = [];
      var i = 0;

      this.props.groups.forEach(function (group, index) {
        var elementStyle = {
          height: groupHeights[index] - 1 + 'px',
          lineHeight: groupHeights[index] - 1 + 'px'
        };

        groupLines.push(_react2.default.createElement(
          'div',
          { key: (0, _utils._get)(group, groupIdKey), className: 'rct-sidebar-row' + (i % 2 === 0 ? ' rct-sidebar-row-even' : ' rct-sidebar-row-odd'), style: elementStyle },
          _this2.renderGroupContent(group, isRightSidebar, groupTitleKey, groupRightTitleKey)
        ));
        i += 1;
      });

      return _react2.default.createElement(
        'div',
        { ref: 'sidebar', className: 'rct-sidebar' + (isRightSidebar ? ' rct-sidebar-right' : ''), style: sidebarStyle },
        header,
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
  lineHeight: _propTypes2.default.number.isRequired,
  groupHeights: _propTypes2.default.array.isRequired,
  fixedHeader: _propTypes2.default.oneOf(['fixed', 'sticky', 'none']),
  stickyOffset: _propTypes2.default.number.isRequired,
  headerPosition: _propTypes2.default.oneOf(['top', 'bottom', 'fixed']),
  keys: _propTypes2.default.object.isRequired,
  groupRenderer: _propTypes2.default.func,
  children: _propTypes2.default.node,
  isRightSidebar: _propTypes2.default.bool
};
Sidebar.defaultProps = {
  fixedHeader: 'sticky',
  stickyOffset: 0,
  headerPosition: 'top',
  children: null,
  isRightSidebar: false
};
var _default = Sidebar;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Sidebar, 'Sidebar', 'src/lib/layout/Sidebar.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/lib/layout/Sidebar.js');
}();

;