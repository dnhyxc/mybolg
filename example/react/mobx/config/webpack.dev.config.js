/*
 * @Description: 开发配置
 * @Author: dnh
 * @Date: 2022-06-10 15:14:12
 * @LastEditors: dnh
 * @FilePath: \example\react\mobx\config\webpack.dev.config.js
 * @LastEditTime: 2022-06-10 19:23:53
 */
// const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          // 配置less模块化导入
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
              importLoaders: 1,
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                sourceMap: true,
                modifyVars: {
                  'primary-color': 'green',
                  'link-color': 'green',
                  'border-radius-base': '10px',
                },
                javascriptEnabled: true,
              }
            }
          }
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          // 配置scss模块化导入
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
              importLoaders: 1,
            },
          },
          'postcss-loader',
          'sass-loader'
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      hash: false,
    }),
  ],
  /**
  * devServer 配置说明：
  *  port: 端口号
  *  compress: 为每个静态文件开启gzip压缩
  */
  devServer: {
    port: 9000,
    compress: true,
  },
  devtool: 'eval-cheap-module-source-map',
});

