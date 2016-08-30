const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("./config/webpack.dev.config");

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  colors: true,
  progress: true,
  hot: true,
  historyApiFallback: true  
}).listen(5000, "localhost", function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log("Listening at http://localhost:5000/");
});