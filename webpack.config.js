const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
let env = process.env.NODE_ENV;

const commonConfig = {
  entry: ['whatwg-fetch', 'element-dataset', 'babel-polyfill', path.resolve(__dirname,'src/scripts/index.js')],
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/')
  },
  // sourcemaps
  devtool: env === 'production' ? false : 'inline-cheap-module-source-map',
  // webpack-dev-server
  plugins: [
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'index.html'), to: path.resolve(__dirname, 'dist/')}]),
    new CleanWebpackPlugin(['dist']),
    // enables production/dev/etc. environment
    new webpack.DefinePlugin({
      env: JSON.stringify(env)
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
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
        path.resolve(__dirname, './dist/')
      ],
      hot: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    }
  };
  return Object.assign({}, commonConfig, config);
}

module.exports = () => {
  if (env === 'production') {
    console.log(env);
    return productionConfig();
  }

  return developmentConfig();
}