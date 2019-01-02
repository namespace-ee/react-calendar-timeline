'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _GroupRow = require('./GroupRow');

var _GroupRow2 = _interopRequireDefault(_GroupRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GroupRows = function (_Component) {
  _inherits(GroupRows, _Component);

  function GroupRows() {
    _classCallCheck(this, GroupRows);

    return _possibleConstructorReturn(this, (GroupRows.__proto__ || Object.getPrototypeOf(GroupRows)).apply(this, arguments));
  }

  _createClass(GroupRows, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !(nextProps.canvasWidth === this.props.canvasWidth && nextProps.lineCount === this.props.lineCount && nextProps.groupHeights === this.props.groupHeights && nextProps.groups === this.props.groups);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          canvasWidth = _props.canvasWidth,
          lineCount = _props.lineCount,
          groupHeights = _props.groupHeights,
          onRowClick = _props.onRowClick,
          onRowDoubleClick = _props.onRowDoubleClick,
          clickTolerance = _props.clickTolerance,
          groups = _props.groups,
          horizontalLineClassNamesForGroup = _props.horizontalLineClassNamesForGroup,
          onRowContextClick = _props.onRowContextClick;

      var lines = [];

      var _loop = function _loop(i) {
        lines.push(_react2.default.createElement(_GroupRow2.default, {
          clickTolerance: clickTolerance,
          onContextMenu: function onContextMenu(evt) {
            return onRowContextClick(evt, i);
          },
          onClick: function onClick(evt) {
            return onRowClick(evt, i);
          },
          onDoubleClick: function onDoubleClick(evt) {
            return onRowDoubleClick(evt, i);
          },
          key: 'horizontal-line-' + i,
          isEvenRow: i % 2 === 0,
          group: groups[i],
          horizontalLineClassNamesForGroup: horizontalLineClassNamesForGroup,
          style: {
            width: canvasWidth + 'px',
            height: groupHeights[i] - 1 + 'px'
          }
        }));
      };

      for (var i = 0; i < lineCount; i++) {
        _loop(i);
      }

      return _react2.default.createElement(
        'div',
        { className: 'rct-horizontal-lines' },
        lines
      );
    }
  }]);

  return GroupRows;
}(_react.Component);

GroupRows.propTypes = {
  canvasWidth: _propTypes2.default.number.isRequired,
  lineCount: _propTypes2.default.number.isRequired,
  groupHeights: _propTypes2.default.array.isRequired,
  onRowClick: _propTypes2.default.func.isRequired,
  onRowDoubleClick: _propTypes2.default.func.isRequired,
  clickTolerance: _propTypes2.default.number.isRequired,
  groups: _propTypes2.default.array.isRequired,
  horizontalLineClassNamesForGroup: _propTypes2.default.func,
  onRowContextClick: _propTypes2.default.func.isRequired
};
exports.default = GroupRows;