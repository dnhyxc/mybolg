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
        nav: "nav@http://localhost:8080/remoteEntry.js",
      },
      exposes: {
        "./HomeList": "./src/HomeList.js",
      },
      shared: {},
    }),
  ],
  mode: "production",
};
