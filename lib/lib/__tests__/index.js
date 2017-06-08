'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Timeline = require('../Timeline');

var _Timeline2 = _interopRequireDefault(_Timeline);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var groups = [{ id: 2, title: 'group 2' }, { id: 1, title: 'group 1' }, { id: 3, title: 'group 3' }];

var items = [{ id: 1, group: 1, title: 'item 1', start_time: (0, _moment2.default)('1995-12-25'), end_time: (0, _moment2.default)('1995-12-25').add(1, 'hour') }, { id: 2, group: 2, title: 'item 2', start_time: (0, _moment2.default)('1995-12-25').add(-0.5, 'hour'), end_time: (0, _moment2.default)('1995-12-25').add(0.5, 'hour') }, { id: 3, group: 3, title: 'item 3', start_time: (0, _moment2.default)('1995-12-25').add(2, 'hour'), end_time: (0, _moment2.default)('1995-12-25').add(3, 'hour') }];

describe('Timeline', function () {
  it('shows grouping no matter of the group order', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Timeline2.default, { groups: groups,
      items: items,
      defaultTimeStart: (0, _moment2.default)('1995-12-25').add(-12, 'hour'),
      defaultTimeEnd: (0, _moment2.default)('1995-12-25').add(12, 'hour')
    }));

    // get the items parent
    var itemsRendered = wrapper.find('.rct-items');

    // array will hold the title and top-position for each item
    var itemsOrder = [];

    // read for every item the title and the top-value and push it to itemsOrder[]
    itemsRendered.props().children.forEach(function (itemRendered) {
      return itemsOrder.push({
        title: itemRendered.props.item.title,
        top: itemRendered.props.dimensions.top
      });
    });

    // order the array by top-attribute
    itemsOrder = itemsOrder.sort(function (a, b) {
      return a.top - b.top;
    });
    expect(itemsOrder[0].title).toBe('item 2');
    expect(itemsOrder[1].title).toBe('item 1');
    expect(itemsOrder[2].title).toBe('item 3');
  });
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(groups, 'groups', 'src/lib/__tests__/index.js');

  __REACT_HOT_LOADER__.register(items, 'items', 'src/lib/__tests__/index.js');
}();

;