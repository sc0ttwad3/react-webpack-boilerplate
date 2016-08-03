const path = require('path');
const validate = require('webpack-validator');
const webpack = require('webpack');

const APP = path.join(__dirname, 'src');
const BUILD = path.join(__dirname, 'build');
const LINT = path.join(__dirname, '.eslintrc');


const config = {
  entry: './src/index',
  output: {
    path: BUILD,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],

  // loaders for processing different file types
  module: {

    preLoaders: [
      {
        test: /(\.jsx|\.js)$/,
        loaders: ['eslint'],
        include: APP
      },
      {
        test: /\.css$/,
        loaders: ['postcss'],
        include: APP + '/styles/'
      }
    ],

    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loaders: [
          'react-hot',
          'babel?cacheDirectory'
        ],
        include: APP
      },
      {
        test: /\.css$/,
        include: APP,
        loader: 'style!css!postcss'
      },
      {
        test: /\.json$/,
        include: APP,
        loaders: [
          'react-hot',
          'json'
        ]
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        include: APP,
        loaders: [
          'react-hot',
          'file?static/media/[name].[ext]'
        ]
      },
    ]
  }
};

module.exports = validate(config, {
  rules: {
    'no-root-files-node-modules-nameclash': false
  }
});
