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
        nav: "nav@http://localhost:9001/remoteEntry.js",
        home: "home@http://localhost:9000/remoteEntry.js",
      },
      exposes: {},
      shared: {},
    }),
  ],
  devServer: {
    port: 9002,
  },
  mode: "production",
};
