const path = require("path");
const webpack = require("webpack");

const nodeModulesPath = path.join(__dirname, "node_modules");

module.exports = {
  devtool: "source-map",
  entry: {
    vendors: [
      "react",
      "react-dom",
      "babel-polyfill",
    ],
    app: ["./src/index.tsx"]
  },
  output: {
    path: path.join(__dirname, "..", "build"),
    filename: "app-[hash].js",
    publicPath: "/static/"
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin("vendors", "vendors_[chunkhash].js")
  ],
  resolve: {
    root: [path.resolve("../src")],
    extensions: ["", ".jsx", ".js", ".tsx", ".ts", ".less", ".css"],
    modulesDirectories: ["src", "node_modules"]
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loaders: ["babel", "ts-loader"] },
      { test: /\.css$/, loader: "style-loader!css-loader?minimize", include: path.resolve(__dirname, "..", "src") },
      { test: /\.less$/, loader: "style-loader!css-loader?minimize!less-loader?compress", include: path.resolve(__dirname, "..", "src") },
      { test: /\.(png|gif|jpg|ttf|eot|otf)$/, loader: "file-loader?name=[sha512:hash:base36:7].[ext]" }
    ]
  },
}