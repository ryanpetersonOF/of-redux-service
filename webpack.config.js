const webpack = require('webpack');

module.exports = {
  entry: {
      'standard/client': './src/client/index.js',
      'standard/service': './src/service/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist/build',
    filename: '[name].js'
  }
};