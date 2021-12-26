const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: [
    "jquery",
    "lodash",
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dll"),
    library: "[name]_[hash]",
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]_[hash]",
      path: path.resolve(__dirname, "dll/manifest.json"),
    }),
  ],
};
