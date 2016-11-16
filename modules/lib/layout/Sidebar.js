'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sidebar = function (_Component) {
  _inherits(Sidebar, _Component);

  function Sidebar(props) {
    _classCallCheck(this, Sidebar);

    var _this = _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));

    _this.state = {
      scrollTop: 0,
      componentTop: 0
    };
    return _this;
  }

  _createClass(Sidebar, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.fixedHeader === 'absolute' && window && window.document && this.state.scrollTop !== nextState.scrollTop) {
        return true;
      }

      return !((0, _utils.arraysEqual)(nextProps.groups, this.props.groups) && nextProps.keys === this.props.keys && nextProps.width === this.props.width && nextProps.lineHeight === this.props.lineHeight && nextProps.fixedHeader === this.props.fixedHeader && nextProps.zIndex === this.props.zIndex && nextProps.groupHeights === this.props.groupHeights && nextProps.height === this.props.height);
    }
  }, {
    key: 'scroll',
    value: function scroll(e) {
      if (this.props.fixedHeader === 'absolute' && window && window.document) {
        var scroll = window.document.body.scrollTop;
        this.setState({
          scrollTop: scroll
        });
      }
    }
  }, {
    key: 'setComponentTop',
    value: function setComponentTop() {
      var viewportOffset = this.refs.sidebar.getBoundingClientRect();
      this.setState({
        componentTop: viewportOffset.top
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.setComponentTop();
      this.scroll();

      this.scrollEventListener = {
        handleEvent: function handleEvent(event) {
          _this2.scroll();
        }
      };

      window.addEventListener('scroll', this.scrollEventListener);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.scrollEventListener);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.setComponentTop();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          fixedHeader = _props.fixedHeader,
          width = _props.width,
          lineHeight = _props.lineHeight,
          zIndex = _props.zIndex,
          groupHeights = _props.groupHeights,
          height = _props.height,
          headerHeight = _props.headerHeight;
      var _props$keys = this.props.keys,
          groupIdKey = _props$keys.groupIdKey,
          groupTitleKey = _props$keys.groupTitleKey;
      var scrollTop = this.state.scrollTop;


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
        headerStyle.zIndex = zIndex;
        groupsStyle.paddingTop = headerStyle.height;
      } else if (fixedHeader === 'absolute') {
        var componentTop = this.state.componentTop;
        if (scrollTop >= componentTop) {
          headerStyle.position = 'absolute';
          headerStyle.top = scrollTop - componentTop + 'px';
          headerStyle.left = '0';
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
          (0, _utils._get)(group, groupTitleKey)
        ));
        i += 1;
      });

      return _react2.default.createElement(
        'div',
        { ref: 'sidebar', className: 'rct-sidebar', style: sidebarStyle },
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

exports.default = Sidebar;


Sidebar.propTypes = {
  groups: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.object]).isRequired,
  width: _react2.default.PropTypes.number.isRequired,
  lineHeight: _react2.default.PropTypes.number.isRequired,
  zIndex: _react2.default.PropTypes.number,
  fixedHeader: _react2.default.PropTypes.oneOf(['fixed', 'absolute', 'none']),
  keys: _react2.default.PropTypes.object.isRequired,
  children: _react2.default.PropTypes.node
};
Sidebar.defaultProps = {
  fixedHeader: 'none',
  zIndex: 12,
  children: null
};