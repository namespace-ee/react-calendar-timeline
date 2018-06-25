const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const nodeEnv = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 8888

const isProd = nodeEnv === 'production'

const config = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  context: path.join(__dirname, './demo'),
  entry: {
    vendor: ['react', 'react-dom', 'faker', 'interactjs', 'moment'],
    demo: isProd
      ? ['./index.js']
      : [
          `webpack-dev-server/client?http://0.0.0.0:${port}`,
          'webpack/hot/only-dev-server',
          './index.js'
        ]
  },
  output: {
    path: path.join(__dirname, './build'),
    publicPath: '',
    chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: isProd
          ? ExtractTextPlugin.extract('style-loader', 'css-loader')
          : 'style!css'
      },
      {
        test: /\.scss$/,
        loader: isProd
          ? ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
          : 'style!css!sass'
      },
      {
        test: /\.(html|png|jpg|gif|jpeg|svg)$/,
        loader: 'file',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [path.resolve('./demo'), 'node_modules'],
    alias: {
      '~': path.join(__dirname, './demo'),
      'react-calendar-timeline': path.join(__dirname, './src'),
      'react-calendar-timeline-css': path.join(
        __dirname,
        './src/lib/Timeline.scss'
      )
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new ExtractTextPlugin('[name].css'),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    })
  ],
  devServer: {
    contentBase: './demo',
    port
  }
}

module.exports = config
