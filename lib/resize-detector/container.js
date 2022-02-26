"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _elementResizeDetector = _interopRequireDefault(require("element-resize-detector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function addListener(component) {
  component._erd = (0, _elementResizeDetector["default"])({
    strategy: 'scroll'
  });
  component._erdWidth = component.container.offsetWidth;

  component._erd.listenTo(component.container, function (element) {
    var width = element.offsetWidth;

    if (component._erdWidth !== width) {
      component.resize(component.props);
      component._erdWidth = width;
    }
  });
}

function removeListener(component) {
  component._erd.removeAllListeners(component.container);
}

var _default = {
  addListener: addListener,
  removeListener: removeListener
};
exports["default"] = _default;