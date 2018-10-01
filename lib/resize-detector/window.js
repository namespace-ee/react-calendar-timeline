'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function addListener(component) {
  component._resizeEventListener = {
    handleEvent: function handleEvent() {
      component.resize();
    }
  };

  window.addEventListener('resize', component._resizeEventListener);
}

function removeListener(component) {
  window.removeEventListener('resize', component._resizeEventListener);
}

exports.default = { addListener: addListener, removeListener: removeListener };