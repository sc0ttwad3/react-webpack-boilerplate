const path = require('path');
const validate = require('webpack-validator');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const APP = path.join(__dirname, 'src');
const BUILD = path.join(__dirname, 'build');
const LINT = path.join(__dirname, '.eslintrc');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const PROXY = `http://${HOST}:${PORT}`;

const config = {
  entry:
//  {
//    app: APP
//  },
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
    extensions: ['', '.js', '.jsx', '.css']
  },
  devtool: 'eval-source-map',
  plugins: [
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
      }
    ]
  }
};

module.exports = validate(config, {
  rules: {
    'no-root-files-node-modules-nameclash': false
  }
});
