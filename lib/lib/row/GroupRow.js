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

var GroupRow = function (_PureComponent) {
  _inherits(GroupRow, _PureComponent);

  function GroupRow() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GroupRow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GroupRow.__proto__ || Object.getPrototypeOf(GroupRow)).call.apply(_ref, [this].concat(args))), _this), _this.onGroupRowContextMenuClick = function (evt) {
      return _this.props.onContextMenu(evt, _this.props.order);
    }, _this.onGroupRowClick = function (evt) {
      return _this.props.onClick(evt, _this.props.order);
    }, _this.onGroupRowDoubleClick = function (evt) {
      return _this.props.onDoubleClick(evt, _this.props.order);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GroupRow, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          isEvenRow = _props.isEvenRow,
          clickTolerance = _props.clickTolerance,
          horizontalLineClassNamesForGroup = _props.horizontalLineClassNamesForGroup,
          group = _props.group,
          canvasWidth = _props.canvasWidth,
          height = _props.height;


      var classNamesForGroup = [];
      if (horizontalLineClassNamesForGroup) {
        classNamesForGroup = horizontalLineClassNamesForGroup(group);
      }

      return _react2.default.createElement(
        _PreventClickOnDrag2.default,
        { clickTolerance: clickTolerance, onClick: this.onGroupRowClick },
        _react2.default.createElement('div', {
          onContextMenu: this.onGroupRowContextMenuClick,
          onDoubleClick: this.onGroupRowDoubleClick,
          className: (isEvenRow ? 'rct-hl-even ' : 'rct-hl-odd ') + (classNamesForGroup ? classNamesForGroup.join(' ') : ''),
          style: {
            width: canvasWidth,
            height: height - 1
          }
        })
      );
    }
  }]);

  return GroupRow;
}(_react.PureComponent);

GroupRow.propTypes = {
  onClick: _propTypes2.default.func.isRequired,
  onDoubleClick: _propTypes2.default.func.isRequired,
  onContextMenu: _propTypes2.default.func.isRequired,
  isEvenRow: _propTypes2.default.bool.isRequired,
  clickTolerance: _propTypes2.default.number.isRequired,
  group: _propTypes2.default.object.isRequired,
  horizontalLineClassNamesForGroup: _propTypes2.default.func,
  order: _propTypes2.default.number.isRequired,
  canvasWidth: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired

};
exports.default = GroupRow;