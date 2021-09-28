"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeEvents = composeEvents;

function composeEvents() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (event) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    event.preventDefault();
    fns.forEach(function (fn) {
      return fn && fn.apply(void 0, [event].concat(args));
    });
  };
}