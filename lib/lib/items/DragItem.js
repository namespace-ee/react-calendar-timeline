'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _interactjs = require('interactjs');

var _interactjs2 = _interopRequireDefault(_interactjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { findDOMNode } from 'react-dom'

function dragMoveListener(event) {
  var target = event.target,

  // keep the dragged position in the data-x/data-y attributes
  x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

var DragItem = function (_Component) {
  _inherits(DragItem, _Component);

  function DragItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DragItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DragItem.__proto__ || Object.getPrototypeOf(DragItem)).call.apply(_ref, [this].concat(args))), _this), _this.itemRef = _react2.default.createRef(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DragItem, [{
    key: 'setInteractions',
    value: function setInteractions() {
      this.interact.draggable({
        autoScroll: true,
        inertia: true,
        onmove: dragMoveListener
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.interact = (0, _interactjs2.default)(this.itemRef.current);
      this.setInteractions();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.interact = (0, _interactjs2.default)(this.itemRef.current);
      this.setInteractions();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'task', ref: this.itemRef },
        this.props.task.title
      );
    }
  }]);

  return DragItem;
}(_react.Component);

exports.default = DragItem;