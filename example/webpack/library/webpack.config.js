const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  // 当library.type为module时需要配置如下属性，注意experiments属性现在为试运行阶段，慎用
  // experiments: {
  //   outputModule: true,
  // },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "mylib.js",
    // library可以防止生产模式下，模块未使用而被tree shaking删除
    library: {
      name: "mylib", // 当配置了experiments时，不能设置name属性，否则会报错
      // umd 模式下：可以支持commomjs、script标签导入
      type: "umd", // type 的值还可以是：window、commonjs、module
    },
    // 处理commonjs中self未定义而报错的情况
    globalObject: "globalThis",
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: "production",
};
