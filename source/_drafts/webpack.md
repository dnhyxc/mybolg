---
title: webpack
tags: webpack
toc: true
categories:
  - 资源打包
date: 2021-03-06 15:17:39
---


### webpack 配置 px2rem

#### 下载相关依赖

<!-- more -->

```js
npm i px2rem-loader -D
npm i lib-flexible -S
```

#### 引入 lib-flexible

1，在项目入口 js/ts 文件中引入 `lib-flexible`。

```js
import "lib-flexible";
```

#### 配置 webpack.config.js

```js
{
  test: /\.(css|less)$/,
  use: [
    devMode ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          mode: 'local',
          localIdentName: '[name]__[local]',
        },
        importLoaders: 1,
      },
    },
    // 增加 px2rem-loader 开始处
    {
      loader: 'px2rem-loader',
      options: {
        importLoaders: 1,
        remUnit: 37.5,
        min: 2
      },
    },
    // 增加 px2rem-loader 结束处
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          ident: 'postcss',
          plugins: [
            [
              "postcss-preset-env",
              {
                autoprefixer: {
                  flexbox: "no-2009",
                },
                stage: 3,
              },
            ],
            postcssNormalize(),
          ],
        },
        sourceMap: false
      }
    },
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          // modifyVars: {
          //   'primary-color': 'green',
          //   'menu-item-active-bg': 'green',
          // },
          javascriptEnabled: true,
        },
      },
    },
  ],
},
```

2，完整 webpack.config.js 配置如下：

```js
const path = require("path");
const { name, version } = require("./package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const postcssNormalize = require("postcss-normalize");

const matchSVGSprite = /assets\/icons\/|components\/Base\/Icon\/icons\//;
const { ESLINT_LOADER_DISABLED, IS_REAL_PROD } = process.env; // 通过环境变量禁用 eslint-loader

module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";

  const publicPath = devMode ? "/" : `//t.newscdn.cn/${name}/${version}/`;

  return {
    entry: "./src/index.ts",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "build"),
      publicPath,
    },

    // 生产模式下关闭map文件
    devtool: devMode ? "source-map" : "none",

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
        $: path.resolve(__dirname, "./typings"),
      },
    },

    module: {
      rules: [
        !devMode && !ESLINT_LOADER_DISABLED
          ? {
              enforce: "pre",
              test: /\.jsx?|\.tsx?$/,
              include: path.resolve(__dirname, "src"),
              loader: "eslint-loader",
              options: {
                cache: true,
              },
            }
          : {},
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      modules: false,
                    },
                  ],
                  "@babel/preset-react",
                ],
                plugins: [
                  [
                    "@babel/plugin-transform-runtime",
                    {
                      useESModules: true,
                    },
                  ],
                ],
              },
            },
            {
              loader: "ts-loader",
              options: {
                happyPackMode: true,
                transpileOnly: true,
                compilerOptions: {
                  noEmit: false,
                  module: "esnext",
                  target: devMode ? "es2017" : "es5",
                },
              },
            },
          ],
          exclude: [/node_modules/],
        },
        {
          test: /\.(css|less)$/,
          use: [
            devMode ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  mode: "local",
                  localIdentName: "[name]__[local]",
                },
                importLoaders: 1,
              },
            },
            {
              loader: "px2rem-loader",
              options: {
                importLoaders: 1,
                remUnit: 37.5,
                min: 2,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  ident: "postcss",
                  plugins: [
                    [
                      "postcss-preset-env",
                      {
                        autoprefixer: {
                          flexbox: "no-2009",
                        },
                        stage: 3,
                      },
                    ],
                    postcssNormalize(),
                  ],
                },
                sourceMap: false,
              },
            },
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  // modifyVars: {
                  //   'primary-color': 'green',
                  //   'menu-item-active-bg': 'green',
                  // },
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: ["svg-inline-loader", "raw-loader", "file-loader"],
        },
        {
          test: /\.(mp4|png|jpg|jpeg|png|svg|cur|gif|webp|webm|otf)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
                name: "static/[name].[hash:11].[ext]",
              },
            },
          ],
          exclude: matchSVGSprite,
        },
        {
          test: /\.svg$/,
          include: matchSVGSprite,
          use: [
            {
              loader: "svg-sprite-loader",
              options: {
                symbolId: "icon-[name]",
              },
            },
          ],
        },
        {
          test: /\.html$/,
          loader: "html-loader",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname, "./src/index.ejs"),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
        },
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[name].css",
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
    externals: {
      // "react": "React",
      // "react-dom": "ReactDOM"
    },
    devServer: {
      port: 8000,
      host: "localhost",
      disableHostCheck: true,
      historyApiFallback: true,
      compress: true,
      clientLogLevel: "none",
      quiet: false,
      proxy: {
        "/api": {
          target: "http://test.xxx.xxx.com",
          changeOrigin: true,
        },
      },
    },
  };
};
```

### 配置 dll 按需打包

#### 具体说明

1，dll 将不常更新的公共包打包到一起，避免每次 run dev / run build 的时候重复编译。

2，当公共包需要更新时，比如升级版本/添加新的公共包：

- npm run dll # 编译公共包。

- npm run dll-ship # 发布公共包（cship 在 npm run 下运行有问题，请复制 dll-ship 内容手动运行）。

- 更新 index.ejs 的 vendor 版本号，和项目一起发布。

3，**注意**：

- 打包之前需在项目根目录下创建 vendor 文件夹。

- 如果需要更新公共包，切记公共包和项目包需要一起发布，不可二缺一！

- 开发和线上分别使用一份 vendor，每个 vendor 和 manifest 是对应的。

#### 具体代码配置

```js
const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";
  const name = isDev ? "vendor-[hash].dev" : "vendor-[hash]";

  return {
    context: __dirname,
    entry: [
      "react",
      "react-dom",
      "antd-mobile",
      "antd-mobile/dist/antd-mobile.min.css",
      "@babel/polyfill",
      "react-router-dom",
    ],
    output: {
      filename: `${name}.js`,
      path: path.resolve(__dirname, "./vendor/dist/"),
      library: "vendor",
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname, "./src/index.ejs"),
        chunksSortMode: "none",
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DllPlugin({
        name: "vendor",
        path: path.resolve(
          __dirname,
          isDev
            ? "./vendor/vendor-manifest-dev.json"
            : "./vendor/vendor-manifest.json"
        ),
      }),
      new MiniCssExtractPlugin({
        filename: `${name}.css`,
        chunkFilename: "[id].css",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    devtool: "source-map",
  };
};
```

> 注释说明：

```js
const path = require("path");
// const { name, version } = require('./package.json');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const postcssNormalize = require("postcss-normalize");

const matchSVGSprite = /assets\/icons\/|components\/Base\/Icon\/icons\//;

module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";
  // const publicPath = devMode ? '/' : `//t.newscdn.cn/${name}/${version}/`;

  return {
    entry: "./src/index.ts",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "build"),
      // publicPath
    },

    // 生产模式下关闭map文件
    devtool: devMode ? "source-map" : "none",

    // 配置路径别名
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
        $: path.resolve(__dirname, "./typings"),
      },
    },

    module: {
      rules: [
        /**
         * 解析样式资源，需要安装style-loader、css-loader、less、less-loader、postcss-normalize
         */
        {
          test: /\.(css|less)$/,
          use: [
            devMode ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  mode: "local",
                  localIdentName: "[name]__[local]",
                },
                importLoaders: 1,
              },
            },
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  // modifyVars: {
                  //   'primary-color': 'green',
                  //   'menu-item-active-bg': 'green',
                  // },
                  javascriptEnabled: true,
                },
              },
            },
            {
              loader: "px2rem-loader",
              options: {
                importLoaders: 1,
                remUnit: 37.5,
                min: 2,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  ident: "postcss",
                  plugins: [
                    [
                      "postcss-preset-env",
                      {
                        autoprefixer: {
                          // browsers: [
                          //   '>1%',
                          //   'last 4 versions',
                          //   'Firefox ESR',
                          //   'not ie < 9',
                          // ],
                          flexbox: "no-2009",
                        },
                        stage: 3,
                      },
                    ],
                    postcssNormalize(),
                  ],
                },
                sourceMap: false,
              },
            },
          ],
        },
        /**
         * 使用babel-loader编译js|jsx|ts|tsx
         * 需要下载 @babel/core、@babel/preset-env、babel-loader、
         * @babel/preset-react、@babel/plugin-transform-runtime、
         * ts-loader、typescript
         */
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      modules: false,
                    },
                  ],
                  "@babel/preset-react",
                ],
                plugins: [
                  [
                    "@babel/plugin-transform-runtime",
                    {
                      useESModules: true,
                      corejs: 3,
                    },
                  ],
                ],
              },
            },
            {
              loader: "ts-loader",
              options: {
                happyPackMode: true,
                transpileOnly: true,
                compilerOptions: {
                  noEmit: false,
                  module: "esnext",
                  target: devMode ? "es2017" : "es5",
                },
              },
            },
          ],
          exclude: [/node_modules/],
        },
        /**
         * 打包图片资源，需要下载 url-loader、html-loader、file-loader
         */
        {
          test: /\.(mp4|png|jpg|jpeg|png|svg|cur|gif|webp|webm|otf)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
                name: "static/[name].[hash:11].[ext]",
              },
            },
          ],
          exclude: matchSVGSprite,
        },
        {
          test: /\.html$/,
          loader: "html-loader",
        },
        /**
         * 打包svg资源，需要下载 svg-sprite-loader(用于将svg图以img标签的形式引入)
         */
        {
          test: /\.svg$/,
          include: matchSVGSprite,
          use: [
            {
              loader: "svg-sprite-loader",
              options: {
                symbolId: "icon-[name]",
              },
            },
          ],
        },
      ],
    },

    /**
     * plugins配置，需要下载：html-webpack-plugin、mini-css-extract-plugin
     */
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname, "./src/index.ejs"),
        minify: {
          removeComments: true, // 移除注释
          collapseWhitespace: true, // 移除空格
        },
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[name].css",
      }),
      new OptimizeCSSAssetsPlugin(),
    ],

    /**
     * 热更新
     */
    devServer: {
      port: 8000,
      host: "localhost",
      // open: true,
      disableHostCheck: true,
      historyApiFallback: true,
      // hot: true,
      compress: true,
      clientLogLevel: "none",
      quiet: false,
      // publicPath: '/',
      proxy: {
        "/api": {
          target: "http://test.bat.xinhuazhiyun.com",
          changeOrigin: true,
        },
      },
    },
  };
};
```
