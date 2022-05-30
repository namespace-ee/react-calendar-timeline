const path = require('path')

const port = process.env.PORT || 4000

const config = {
  context: path.join(__dirname, './demo'),
  entry: {
    // vendor: ['react', 'react-dom', 'faker', 'interactjs', 'moment'],
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
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader','css-loader','sass-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
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
    static: {
      directory: './demo'
    },
    port
  }
}

module.exports = config
