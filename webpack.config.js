const path = require('path');
const webpack = require('webpack');

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
    // enables production/dev/etc. environment
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    // resolve modules path and extension
    extensions: ['.js'],
    modules: [path.join(__dirname, 'src/scripts'), 'node_modules']
  },
  resolveLoader: {
    // use 'babel' naming instead of 'babel-loader'
    moduleExtensions: ['-loader']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: path.join(__dirname, 'src/scripts'),
      loader: 'babel'
    }]
  }
}