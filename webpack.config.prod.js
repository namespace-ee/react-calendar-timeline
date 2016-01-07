var config = require('./webpack.config.js')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

config.output.filename = config.output.filename.replace('.js', '.min.js')

config.plugins = [
  new webpack.NoErrorsPlugin(),
  new ExtractTextPlugin('[name].min.css'),
  new webpack.DefinePlugin({
    'process.env': {
      // This has effect on the react lib size
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin()
]

module.exports = config
