const path = require('path')

const port = process.env.PORT || 8888

const config = {
  devtool: 'cheap-eval-source-map',
  context: path.join(__dirname, './demo'),
  entry: {
    vendor: ['react', 'react-dom', 'faker', 'interactjs', 'moment'],
    demo: [
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
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
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
  devServer: {
    contentBase: './demo',
    port
  }
}

module.exports = config
