const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: ['whatwg-fetch', 'element-dataset', 'babel-polyfill', path.resolve(__dirname,'src/scripts/index.js')],
  output: {
    'filename': 'bundle.js',
    path: path.resolve(__dirname, 'dist/scripts')
  },
  // watcher
  watch: NODE_ENV === 'development',
  watchOptions: {
    aggregateTimeout: 500,
    ignored: /node_modules/,
    poll: 1000
  },
  // sourcemaps
  devtool: NODE_ENV === 'development' ? 'inline-cheap-module-source-map' : false,
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // enables production/dev/etc. environment
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    // resolve modules path and extension
    extensions: ['.js'],
    modules: [
      path.join(__dirname, 'src/scripts'),
      path.join(__dirname, 'src/styles'),
      'node_modules'
    ]
  },
  resolveLoader: {
    // use 'babel' naming instead of 'babel-loader'
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src/styles'),
        use: [
          'style',
          {
            loader: 'css', options: {
              importLoaders: 1
            }
          },
          'postcss'
        ]
      }, {
        test: /\.js$/,
        include: path.join(__dirname, 'src/scripts'),
        use: 'babel'
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
}