const path = require('path');
const validate = require('webpack-validator');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const APP = path.join(__dirname, 'src');
const BUILD = path.join(__dirname, 'build');
const buildd = path.resolve(process.cwd(), './build');
const LINT = path.join(__dirname, '.eslintrc');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const PROXY = `http://${HOST}:${PORT}`;

const pkg = require(path.resolve(process.cwd(), './package.json'));
const debug = process.env.NODE_ENV === 'development';
const verbose = process.env.VERBOSE === 'true';
const hmr = process.env.HMR === 'true'

const config = {
  context: process.cwd(),
  entry:
  [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: BUILD,
    pathinfo: true,
    filename: 'bundle.js',
    publicPath: '/scripts/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.svg']
  },
  // Switch loaders to debug or release mode
  debug,
  // Developer tool to enhance debugging, source maps
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: debug ? 'source-map' : false,
  //devtool: 'eval-source-map',
  stats: {
    colors: true,
    reasons: debug,
    hash: verbose,
    version: verbose,
    timings: true,
    chunks: verbose,
    chunkModules: verbose,
    cached: verbose,
    cachedAssets: verbose,
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': debug ? '"development"' : '"production"',
      __DEV__: debug,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin({
    // BrowserSync options
      host: HOST,
      port: PORT,
      proxy: PROXY,
      logPrefix: 'react-webpack-starter',
      logLevel: 'info',
      browser: 'chrome'
    },
    // plugin options
    {
      // prevent BrowserSync from reloading page
      // and let Webpack Dev Server do this
      reload: false
    }
  )
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

// Just real JS, so any valid code can go here!
module.exports = validate(config, {
  rules: {
    'no-root-files-node-modules-nameclash': false
  }
});
