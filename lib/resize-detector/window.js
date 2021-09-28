"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

var _default = {
  addListener: addListener,
  removeListener: removeListener
};
exports["default"] = _default;