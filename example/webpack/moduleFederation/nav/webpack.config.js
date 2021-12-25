const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.js",

  plugins: [
    new HtmlWebpackPlugin(),
    new ModuleFederationPlugin({
      name: "nav",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./Header": "./src/Header.js",
      },
      shared: {}, // shared: ["react", "react-dom"],
    }),
  ],
  devServer: {
    port: 9001,
  },
  mode: "production",
};
