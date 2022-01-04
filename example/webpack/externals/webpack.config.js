/*
 * @Description: 外部扩展 externals
 * @Author: dnh
 * @Date: 2022-01-04 21:10:24
 * @LastEditTime: 2022-01-04 21:28:13
 * @LastEditors: dnh
 * @FilePath: \example\webpack\externals\webpack.config.js
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  externals: {
    jquery: "$",
  },
  mode: "development",
};
