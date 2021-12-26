const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name][contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "./dll/manifest.json"),
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, "./dll/main.js"),
      publicPath: "./",
    }),
  ],
  devServer: {
    port: 9000,
  },
  mode: "production",
};
