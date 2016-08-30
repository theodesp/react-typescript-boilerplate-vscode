const webpack = require("webpack");
const path = require("path");
const WebpackNotifierPlugin = require("webpack-notifier");

module.exports = {
  devtool: "eval",
  entry: [
    // Add the react hot loader entry point
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",
    "index.tsx"
  ],
  output: {
    filename: "app.js",
    devtoolModuleFilenameTemplate: function (info) {
      if (info.absoluteResourcePath.charAt(0) === '/') {
        return "file://" + info.absoluteResourcePath;
      } else {
        return "file:///" + info.absoluteResourcePath;
      }
    },
    devtoolFallbackModuleFilenameTemplate: function (info) {
      if (info.absoluteResourcePath.charAt(0) === '/') {
        return "file://" + info.absoluteResourcePath + '?' + info.hash;
      } else {
        return "file:///" + info.absoluteResourcePath + '?' + info.hash;
      }
    },
    publicPath: "/static",
    path: path.resolve("static")
  },
  resolve: {
    extensions: ["", ".ts", ".tsx", ".js", ".jsx"],
    modulesDirectories: ["src", "node_modules"],
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loaders: ["babel", "ts-loader"] }
    ]
  },
  plugins: [
    // Add the HMR plugin
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin({ alwaysNotify: true }),
  ]
};
