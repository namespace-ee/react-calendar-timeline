var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  context: __dirname,
  entry: {
    'react-calendar-timeline': './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'build/dist/'),
    filename: '[name].js',
    publicPath: 'build/dist/',
    library: 'ReactCalendarTimeline',
    libraryTarget: 'umd'
  },
  debug: true,
  devtool: 'sourcemap',
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      },
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css')
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'moment': 'moment',
    'interact.js': 'interact'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.md']
  }
}
