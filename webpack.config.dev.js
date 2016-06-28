const path = require('path');
const webpack = require('webpack');

const APP = path.join(__dirname, 'src');
const BUILD = path.join(__dirname, 'build');
const LINT = path.join(__dirname, '.eslintrc');


module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/index'
  ],
  output: {
    path: BUILD,
    filename: 'bundle.js',
    publicPath: '/scripts/'
  },
  plugins: [

  ],

  // loaders for processing different file types
  module: {

    preLoaders: [
      // currently a build script step
      // {
      //   test: /(\.jsx|\.js)$/,
      //   loaders: ['eslint'],
      //   include: APP
      // }
      {
        test: /\.css$/,
        loaders: ['postcss'],
        include: APP + '/styles/'
      },
    ],

    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: APP
      }
    ]
  }
}
