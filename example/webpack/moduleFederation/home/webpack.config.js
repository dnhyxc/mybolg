const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin(),
    new ModuleFederationPlugin({
      name: "home",
      filename: "remoteEntry.js",
      remotes: {
        nav: "nav@http://localhost:9001/remoteEntry.js",
      },
      exposes: {
        "./HomeList": "./src/HomeList.js",
      },
      shared: {},
    }),
  ],
  devServer: {
    port: 9000,
  },
  mode: "production",
};
