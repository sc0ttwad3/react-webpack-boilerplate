const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./webpack.config.dev');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath
}).listen(3000, 'localhost', (err, result) => {
  if (err) {
    return console.log(err);
  }

  console.log('WebPackDevServer listening on port 3000');
});
