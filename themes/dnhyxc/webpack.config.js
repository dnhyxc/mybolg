var webpack = require("webpack");
var autoprefixer = require("autoprefixer");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanPlugin = require("clean-webpack-plugin");

// 模板压缩
// 详见：https://github.com/kangax/html-minifier#options-quick-reference

var minifyHTML = {
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  minifyJS: true,
};

module.exports = {
  entry: {
    main: "./source-src/js/main.js",
    slider: "./source-src/js/slider.js",
    mobile: ["babel-polyfill", "./source-src/js/mobile.js"],
  },
  output: {
    path: "./source",
    publicPath: "./",
    filename: "[name].js",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader?cacheDirectory",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: "html",
      },
      {
        test: /\.(scss|sass|css)$/,
        loader: ExtractTextPlugin.extract("style-loader", [
          "css-loader?-autoprefixer",
          "postcss-loader",
          "sass-loader",
        ]),
      },
      {
        test: /\.(gif|jpg|png)\??.*$/,
        loader: "url-loader?limit=500&name=img/[name].[ext]",
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: "file-loader?name=fonts/[name].[ext]",
      },
    ],
  },
  alias: {
    vue$: "vue/dist/vue.js",
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.common.js",
    },
  },
  devtool: process.env.NODE_ENV === "development" ? "#eval-source-map" : false,
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      cache: false,
      minify: minifyHTML,
      template: "./source-src/script.ejs",
      filename: "../layout/_partial/script.ejs",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      cache: false,
      minify: minifyHTML,
      template: "./source-src/css.ejs",
      filename: "../layout/_partial/css.ejs",
    }),
    process.env.NODE_ENV === "production"
      ? new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
          },
        })
      : null,
    process.env.NODE_ENV === "production"
      ? new webpack.optimize.OccurenceOrderPlugin()
      : null,
  ].filter(Boolean),
  watch: true,
};
