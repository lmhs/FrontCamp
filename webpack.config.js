const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const env = process.env.NODE_ENV || 'development';

const commonConfig = {
  entry: ['whatwg-fetch', 'element-dataset', 'babel-polyfill', path.resolve(__dirname,'src/scripts/index.js')],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/scripts')
  },
  // watcher
  watch: env === 'development',
  watchOptions: {
    aggregateTimeout: 500,
    ignored: /node_modules/,
    poll: 1000
  },
  // sourcemaps
  devtool: env === 'development' ? 'inline-cheap-module-source-map' : false,
  // webpack-dev-server
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // enables production/dev/etc. environment
    new webpack.DefinePlugin({
      env: JSON.stringify(env)
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

const productionConfig = () => commonConfig;

const developmentConfig = () => {
  const config = {
    devServer: {
      contentBase: [
        path.resolve(__dirname, './'),
        path.resolve(__dirname, './dist/scripts/')
      ],
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    }
  };
  return Object.assign({}, commonConfig, config);
}

module.exports = env => {
  if (env === 'production') {
    return productionConfig();
  }

  return developmentConfig();
}