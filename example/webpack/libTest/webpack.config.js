const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin(),
    // 设置全局变量，在全局可以不导入mylib_math_test包的情况下，直接使用mylib访问到这个mylib_math_test包的内容
    new webpack.ProvidePlugin({
      mylib: "mylib_math_test",
    }),
  ],
  mode: "production",
  optimization: {
    splitChunks: {
      minSize: 50,
      chunks: "all",
      name: "vendor",
    },
  },
};
