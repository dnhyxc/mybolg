const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: require.resolve("./src/index.js"),
        use: "imports-loader?wrapper=window",
      },
      {
        test: require.resolve("./src/global.js"),
        use: "exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse,multiple|helpers.test|test",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.ProvidePlugin({
      _: "lodash",
    }),
  ],
  mode: "development",
};
