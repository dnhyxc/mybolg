const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],

  mode: "development",

  devServer: {
    port: "8081",
  },
};
