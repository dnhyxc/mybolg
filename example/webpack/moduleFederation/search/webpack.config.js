const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin(),
    new ModuleFederationPlugin({
      name: "search",
      filename: "remoteEntry.js",
      remotes: {
        nav: "nav@http://localhost:8080/remoteEntry.js",
        home: "home@http://localhost:8081/remoteEntry.js",
      },
      exposes: {},
      shared: {},
    }),
  ],
  mode: "production",
};
