const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: "production",
  optimization: {
    splitChunks: {
      minSize: 50,
      chunks: "all",
      name: "vendor",
    },
  },
};
