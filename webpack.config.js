/* jshint node: true */
var path = require('path');

module.exports = {
  context: path.join(__dirname),
  entry: './lib/index.js',

  output: {
    path: path.join(__dirname),
    filename: 'react-calendar-timeline.js',
    libraryTarget: 'umd',
    library: 'ReactCalendarTimeline'
  },

  externals: {
   'react': 'var React',
   'react/addons': 'var React',
   'moment': 'var moment',
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        // Query parameters are passed to node-sass
        loader: 'style!css!sass?outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(__dirname, './bower_components')) + '&' +
          'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      },
      {
        test: /(\.js)|(\.jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    ]
  }
};
