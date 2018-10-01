'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _elementResizeDetector = require('element-resize-detector');

var _elementResizeDetector2 = _interopRequireDefault(_elementResizeDetector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addListener(component) {
  component._erd = (0, _elementResizeDetector2.default)({
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

exports.default = { addListener: addListener, removeListener: removeListener };