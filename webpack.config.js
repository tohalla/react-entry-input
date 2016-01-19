const webpack = require('webpack');

module.exports = {
  entry: [
    './src/'
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: './',
    filename: 'react-redux-entry-input.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
};