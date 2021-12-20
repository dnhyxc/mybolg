const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: {
      import: ["./src/app.js", "./src/app2.js"],
      dependOn: "lodash",
      filename: "page1/[name].js",
    },
    main2: {
      import: ["./src/app3.js"],
      dependOn: "lodash",
      filename: "page2/[name].js",
    },
    lodash: {
      import: "lodash",
      filename: "commom/[name].js",
    },
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: "多页面打包",
      template: "./index.html",
      filename: "page1/index.html",
      chunks: ["main", "lodash"],
    }),

    new HtmlWebpackPlugin({
      title: "多页面打包",
      template: "./index2.html",
      filename: "page2/index2.html",
      chunks: ["main2", "lodash"],
    }),
  ],

  mode: "development",
};
