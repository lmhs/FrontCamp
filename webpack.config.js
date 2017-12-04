const path = require('path');

module.exports = {
  entry: ['whatwg-fetch', 'element-dataset', 'babel-polyfill', path.resolve(__dirname,'src/scripts/index.js')],
  output: {
    'filename': 'bundle.js',
    path: path.resolve(__dirname, 'dist/scripts')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src/scripts'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}