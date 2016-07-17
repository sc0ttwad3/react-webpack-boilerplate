# React Webpack Boilerplate



> A simple website starter kit powered by [React.js](http://facebook.github.io/react/)
> and [Webpack](http://webpack.github.io/).


### Features

&nbsp; &nbsp; ✓ Next generation JavaScript with [Babel](https://github.com/babel/babel)<br>
&nbsp; &nbsp; ✓ [Sass](http://sass-lang.com/) syntax for CSS via [postCSS](https://github.com/postcss/postcss) and [precss](https://github.com/jonathantneal/precss)<br>
&nbsp; &nbsp; ✓ Development web server with [BrowserSync](http://www.browsersync.io) and [React Transform](https://github.com/gaearon/babel-plugin-react-transform)<br>
&nbsp; &nbsp; ✓ Bundling and optimization with [Webpack](http://webpack.github.io/)<br>
&nbsp; &nbsp; ✓ [Code-splitting](https://github.com/webpack/docs/wiki/code-splitting) and async chunk loading<br>

### Research Notes   
[PostCSS](https://www.sitepoint.com/an-introduction-to-postcss/)<br />
[PostCSS-loader](https://github.com/postcss/postcss-loader)<br />
[NPM as build tool](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)<br />
[NPM as task runner](https://www.smashingmagazine.com/2016/06/harness-machines-productive-task-runners/) <br />
[Fetch API](https://www.sitepoint.com/introduction-to-the-fetch-api/) <br />
[CSS and FrontEnd Tips](https://speakerdeck.com/smashingmag/dirty-tricks-from-the-dark-corners-of-front-end) <br />
[WebpackBin](http://www.webpackbin.com/) <br />


### Directory Layout

```
.
├── /build/                     # The folder for compiled output
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # React.js-based web pages
│   ├── /App.js                 # Application starting page
│   └── /index.js               # Home page
├── /test/                      # Unit and integration tests
│── dev-server.js               # Express server development (entry point)
│── LICENSE.txt                 # License file
│── package.json                # Dev dependencies and NPM scripts
└── README.md                   # Project overview
```

### Getting Started

Just clone the repo, install Node.js modules and run `npm install`:

```
$ git clone -o react-webpack-boilerplate -b master --single-branch \
      https://github.com/sc0ttwad3/react-webpack-boilerplate.git MyApp
$ cd MyApp
$ npm install

$ npm run lint
$ npm run build:dev
$ node dev-server.js
```

Then open [http://localhost:3000/](http://localhost:3000/) in your browser.

### How to Test

The unit tests are powered by [chai](http://chaijs.com/) and [mocha](http://mochajs.org/).

```
$ npm test
```

### How to Update

You can always fetch and merge the recent changes from this repo back into
your own project:

```shell
$ git checkout master
$ git fetch react-webpack-boilerplate
$ git merge react-webpack-boilerplate/master
$ npm install
```
### Related Projects

  * [React Starter Kit](https://github.com/kriasoft/react-starter-kit)
  * [React Routing](https://github.com/kriasoft/react-routing)
  * [React Decorators](https://github.com/kriasoft/react-decorators)

### Learn More

  * [Getting Started with React.js](http://facebook.github.io/react/)
  * [Getting Started with GraphQL and Relay](https://quip.com/oLxzA1gTsJsE)
  * [React.js Questions on StackOverflow](http://stackoverflow.com/questions/tagged/reactjs)
  * [React.js Discussion Board](https://discuss.reactjs.org/)
  * [Learn ES6](https://babeljs.io/docs/learn-es6/), [ES6 Features](https://github.com/lukehoban/es6features#readme)

---
Made with ♥ by Scott Wade ([@sc0ttwad3](https://twitter.com/sc0ttwad3)) and [contributors](https://github.com/sc0ttwad3/react-webpack-boilerplate/graphs/contributors) &nbsp;|&nbsp; MIT License
