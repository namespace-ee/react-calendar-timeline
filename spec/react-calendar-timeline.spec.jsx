import React from 'react/addons';
import ReactCalendarTimeline from '../lib/react-calendar-timeline.jsx';

describe('ReactCalendarTimeline', function() {
  var component;

  beforeEach(function() {
    component = React.addons.TestUtils.renderIntoDocument(
      <ReactCalendarTimeline/>
    );
  });

  it('should render', function() {
    expect(component.getDOMNode().className).toEqual('react-calendar-timeline');
  });
});
