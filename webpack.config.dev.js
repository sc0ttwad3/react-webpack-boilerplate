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
  },
  // The list of plugins for PostCSS
  // https://github.com/postcss/postcss
  postcss(bundler) {
    return [

      // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
      // https://github.com/postcss/postcss-import
      require('postcss-import')({ addDependencyTo: bundler }),

      // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
      // https://github.com/postcss/postcss-custom-properties
      require('postcss-custom-properties')(),

      // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
      // https://github.com/postcss/postcss-custom-media
      require('postcss-custom-media')(),

      // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
      // https://github.com/postcss/postcss-media-minmax
      require('postcss-media-minmax')(),
      // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
      // https://github.com/postcss/postcss-custom-selectors
      require('postcss-custom-selectors')(),
      // W3C calc() function, e.g. div { height: calc(100px - 2em); }
      // https://github.com/postcss/postcss-calc
      require('postcss-calc')(),
      // Allows you to nest one style rule inside another
      // https://github.com/jonathantneal/postcss-nesting
      require('postcss-nesting')(),
      // W3C color() function, e.g. div { background: color(red alpha(90%)); }
      // https://github.com/postcss/postcss-color-function
      require('postcss-color-function')(),
      // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
      // https://github.com/iamvdo/pleeease-filters
      require('pleeease-filters')(),
      // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
      // https://github.com/robwierzbowski/node-pixrem
      require('pixrem')(),
      // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
      // https://github.com/postcss/postcss-selector-matches
      require('postcss-selector-matches')(),
      // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
      // https://github.com/postcss/postcss-selector-not
      require('postcss-selector-not')(),

      // Add vendor prefixes to CSS rules using values from caniuse.com
      // https://github.com/postcss/autoprefixer
      require('autoprefixer')(),
    ];
  }
};

// Just real JS, so any valid code can go here!
module.exports = validate(config, {
  rules: {
    'no-root-files-node-modules-nameclash': false
  }
});
