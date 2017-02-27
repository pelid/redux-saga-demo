var path = require('path');
var _ = require('lodash');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: './app.js',
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ],
  module: {
    rules: [
      {
        test: /\.tag.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: './babel-cache',
            }
          },
          {
            loader: 'riotjs-loader',
            options: {
              type: 'none'
            }
          },
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: './babel-cache',
        }
      },
      {
        test: /\.(png|svg|gif|jpg|jpeg)$/,
        loader: "file-loader",
        exclude: /node_modules/
      },
    ]
  },
}
