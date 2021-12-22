const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  // 当library.type为module时需要配置如下属性
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "mylib.js",
    // library可以防止生产模式下，模块未使用而被tree shaking删除
    library: {
      // name: "mylib", // 当配置了experiments时，不能设置name属性，否则会报错
      type: "module", // type 的值还可以是：window、commonjs
    },
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: "production",
};
