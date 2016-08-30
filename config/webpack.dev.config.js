const webpack = require("webpack");
const path = require("path");
const WebpackNotifierPlugin = require("webpack-notifier");

const nodeModulesPath = path.join(__dirname, "node_modules");

module.exports = {
  devtool: "eval-source-map",
  entry: {
    vendors: [
      "react",
      "react-dom",
      "babel-polyfill",
    ],
    app: [
      // Add the react hot loader entry point
      "react-hot-loader/patch",
      "webpack-dev-server/client?http://localhost:3000",
      "webpack/hot/only-dev-server",
      "./src/index.tsx"
    ]
  },
  output: {
    filename: "app-[hash].js",
    devtoolModuleFilenameTemplate: function (info) {
      if (info.absoluteResourcePath.charAt(0) === "/") {
        return "file://" + info.absoluteResourcePath;
      } else {
        return "file:///" + info.absoluteResourcePath;
      }
    },
    devtoolFallbackModuleFilenameTemplate: function (info) {
      if (info.absoluteResourcePath.charAt(0) === "/") {
        return "file://" + info.absoluteResourcePath + "?" + info.hash;
      } else {
        return "file:///" + info.absoluteResourcePath + "?" + info.hash;
      }
    },
    publicPath: "/static/",
    path: path.join(__dirname, "..", "build"),
  },
  resolve: {
    root: [path.resolve("../src")],
    extensions: ["", ".ts", ".tsx", ".js", ".jsx", ".less", ".css"],
    modulesDirectories: ["src", "node_modules"]
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loaders: ["babel", "ts-loader"] },
      { test: /\.(png|gif|jpg|ttf|eot|otf)$/, loader: "file-loader?name=[sha512:hash:base36:7].[ext]" },
      { test: /\.css$/, loader: "style!css", include: path.resolve(__dirname, "..", "src") },
      { test: /\.less$/, loader: "style!css!less", include: path.resolve(__dirname, "..", "src") },
    ]
  },
  plugins: [
    // Add the HMR plugin
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new WebpackNotifierPlugin({ alwaysNotify: true }),
    new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js"),
  ]
};
