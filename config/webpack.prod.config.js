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
  target: "web",
  output: {
    path: path.join(__dirname, "..", "build"),
    filename: "[name].[chunkhash].js",
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
    new webpack.optimize.CommonsChunkPlugin({name: "vendors", filename: "vendors_[hash].js"})
  ],
  resolve: {
    extensions: [".jsx", ".js", ".tsx", ".ts", ".less", ".css"],
    modules: ["src", "node_modules"]
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loaders: ["babel-loader", "awesome-typescript-loader"], exclude: /node_modules/ },
      { test: /\.css$/, loader: "style-loader!css-loader?minimize", include: path.resolve(__dirname, "..", "src"), exclude: /node_modules/ },
      { test: /\.less$/, loader: "style-loader!css-loader?minimize!less-loader?compress", include: path.resolve(__dirname, "..", "src"), exclude: /node_modules/ },
      { test: /\.(png|gif|jpg|ttf|eot|otf)$/, loader: "file-loader?name=[sha512:hash:base36:7].[ext]", exclude: /node_modules/ },
      { test: /\.ico$/, loader: "file?name=[name].[ext]", exclude: /node_modules/ }
    ]
  },
  externals: {
    'react/lib/ReactContext': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,
  }
};
