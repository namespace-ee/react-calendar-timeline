'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PreventClickOnDrag = require('../interaction/PreventClickOnDrag');

var _PreventClickOnDrag2 = _interopRequireDefault(_PreventClickOnDrag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GroupRow = function (_Component) {
  _inherits(GroupRow, _Component);

  function GroupRow() {
    _classCallCheck(this, GroupRow);

    return _possibleConstructorReturn(this, (GroupRow.__proto__ || Object.getPrototypeOf(GroupRow)).apply(this, arguments));
  }

  _createClass(GroupRow, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          onContextMenu = _props.onContextMenu,
          onDoubleClick = _props.onDoubleClick,
          isEvenRow = _props.isEvenRow,
          style = _props.style,
          onClick = _props.onClick,
          clickTolerance = _props.clickTolerance,
          horizontalLineClassNamesForGroup = _props.horizontalLineClassNamesForGroup,
          group = _props.group;


      var classNamesForGroup = [];
      if (horizontalLineClassNamesForGroup) {
        classNamesForGroup = horizontalLineClassNamesForGroup(group);
      }

      return _react2.default.createElement(
        _PreventClickOnDrag2.default,
        { clickTolerance: clickTolerance, onClick: onClick },
        _react2.default.createElement('div', {
          onContextMenu: onContextMenu,
          onDoubleClick: onDoubleClick,
          className: (isEvenRow ? 'rct-hl-even ' : 'rct-hl-odd ') + (classNamesForGroup ? classNamesForGroup.join(' ') : ''),
          style: style
        })
      );
    }
  }]);

  return GroupRow;
}(_react.Component);

GroupRow.propTypes = {
  onClick: _propTypes2.default.func.isRequired,
  onDoubleClick: _propTypes2.default.func.isRequired,
  onContextMenu: _propTypes2.default.func.isRequired,
  isEvenRow: _propTypes2.default.bool.isRequired,
  style: _propTypes2.default.object.isRequired,
  clickTolerance: _propTypes2.default.number.isRequired,
  group: _propTypes2.default.object.isRequired,
  horizontalLineClassNamesForGroup: _propTypes2.default.func
};
exports.default = GroupRow;