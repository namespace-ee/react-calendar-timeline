'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function addListener(component) {
  component._resizeEventListener = {
    handleEvent: function handleEvent(event) {
      component.resize();
    }
  };

  window.addEventListener('resize', component._resizeEventListener);
}

function removeListener(component) {
  window.removeEventListener('resize', component._resizeEventListener);
}

var _default = { addListener: addListener, removeListener: removeListener };
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(addListener, 'addListener', 'src/resize-detector/window.js');

  __REACT_HOT_LOADER__.register(removeListener, 'removeListener', 'src/resize-detector/window.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/resize-detector/window.js');
}();

;