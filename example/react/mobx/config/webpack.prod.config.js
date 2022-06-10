/*
 * @Description: 生产配置
 * @Author: dnh
 * @Date: 2022-06-10 15:13:54
 * @LastEditors: dnh
 * @FilePath: \example\react\mobx\config\webpack.prod.config.js
 * @LastEditTime: 2022-06-10 17:53:59
 */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  output: {
    filename: 'js/[name]-bundle-[hash:6].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]_[hash:base64:5]',
            }
          },
          'postcss-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
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
          'less-loader'
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
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
        ]
      }
    ],
  },
  plugins: [
    /**
     * HtmlWebpackPlugin 配置说明：
     *  template：基于我们自己定义的 html 文件为模板生成 html 文件
     *  filename：打包之后的 html 文件名字
     *  inject：将 js 文件注入到 body 最底部
     *  minify：压缩 html 文件时的配置
     *   - removeComments：去除注释
     */
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        removeComments: true,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style/[name].[hash:6].css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 屏蔽log
          },
        },
      })
    ],
  },
  mode: 'production',
});

