# react calendar timeline

Get the AMD module located at `react-calendar-timeline.js` and include it in your project.

Here is a sample integration:

```js
require.config({
  paths: {
    'react': 'vendor/bower_components/react/react',
    'ReactCalendarTimeline': 'react-calendar-timeline'
  }
});

require(['react', 'ReactCalendarTimeline'], function(React, ReactCalendarTimeline) {

  React.render(React.createElement(ReactCalendarTimeline), document.getElementById('widget-container'));

});
```

## Development

* Development server `npm start`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
