---
title: webpack5
date: 2020-12-09 09:02:09
tags: webpack
---

### webpack5

#### webpack 安装

1、注意尽量不要在全局安装 webpack、在全局安装会把 webpack 版本锁死，可能导致其它项目打包出错。

2、可以通过如下方式在局部安装：

```
mkdir webpack-test

cd webpack-test

npm init -y

npm i webpack webpack-cli webpack-dev-server -D
```

#### entry 配置

1、entry 用于配置打包时的入口，其属性及配置如下：

```js
module.exports = {
  entry: "./src/index.js",
};
```

#### output 配置

1、output 用于配置打包的出口，其属性及配置方式如下：

- clean：用于清除上次打包生成的 dist 或 build 文件夹。

- filename：用于配置打包输出的文件名称。

- path：用于配置打包输出的文件夹路径。

- assetModuleFilename：用于设置打包输出的资源模块（图片等）的文件名及路径。如：`assetModuleFilename: "images/test.png"` 就是将打包的资源模块输出到 dist 文件夹中的 images 文件夹下，名字为 test.png。

```js
module.exports = {
  // ...
  output: {
    filename: "bundle.js",
    path: path.reslove(__dirname, "./dist"),
    clean: true,
    assetModuleFilename: "images/[contenthash][ext]",
  },
};
```

> contenthash：表示根据文件的内容来生成一个 hash 字符串，ext 则表示文件的扩展名，这些都是 webpack 内置的写法。

#### webpack-dev-server

1、webpack-dev-server 可以提供一个基本的 web server，并且具有 live reloading（实时重新加载）功能。

2、具体属性及配置如下：

- static 该属性用于告知 webpack-dev-server 从什么位置查找文件，`static: "./dist"` 将告知其从 dist 目录下的文件作为 web 服务的根目录。

```js
module.exports = {
  // ...
  devServer: {
    static: "./dist",
  },
};
```

> webpack-dev-server 在编译之后不会输出任何文件，而是将 bundle 文件保存到内存中，然后将它们 serve 到 server 中，就好像它们是挂载在 server 根路径上的真实文件一样。

### webpack 插件

#### html-webpack-plugin

1、该插件可以让 webpack 在打包时自动生成 index.html，并自定将打包生成的 js 文件引入生成的 index.html 中。

2、该插件属性及配置方式如下：

- template：该属性用于配置 webpack 打包生成 index.html 的模板。

- filename：配置生成 html 的文件名。

- inject：配置引入 script 标签的位置，默认是放在 header 中，属性值如果配置为 body，将会引入到 body 中。

```js
plugins: [
  new HtmlWebpackPlugin({
    template: "./index.html",
    filename: "index.html",
    inject: "body",
  }),
];
```

<!-- more -->

### 资源文件

#### loader

1、webpack 天生就可以解析 js 及 json 文件，而需要解析其它资源文件，就需要借助 loader 来实现了，比如在 js 中加载 css 模块，就需要通过 loader 来完成。

#### loader 的定义

1、test：用于识别出哪些文件需要被转换。

2、use：定义转化的时候需要用哪个 loader 进行转化。

```js
module.exports = {
  module: {
    rules: [
      test: /\.txt$/,
      use: "raw-loader",
    ]
  },
};
```

> 上述例子中，当 webpack 去解析一个 .txt 文件的时候，在对这个文件进行打包之前，先使用 raw-loader 进行转化一下，再打包输出。

#### 解析 css 资源

1、解析 css 资源，需要安装 **style-loader、css-loader**。

```
npm i style-loader css-loader -D
```

2、具体配置如下：

```js
module.exports = {
  module: {
    rules: [
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    ]
  },
};
```

> 由于 loader 的加载顺序是从右到左，从下到上的，所以 style-loader 要放在 css-loader 之前，即先使用 css-loader 进行解析，之后再使用 style-loader 渲染到页面上。

#### 解析 less 资源

1、解析 less 需要安装 **less、less-loader**。

```
npm i less less-loader -D
```

2、具体配置如下：

```js
module.exports = {
  module: {
    rules: [
      test: /\.(css|less)$/,
      use: ["style-loader", "css-loader", "less-loader"],
    ]
  },
};
```

#### 抽离 css

1、将 css 文件抽离成单独的文件，需要通过 **mini-css-ectract-plugin** 这个插件来完成。

```
npm i mini-css-ectract-plugin -D
```

2、mini-css-ectract-plugin 属性及配置如下：

- filename：定义 css 打包输出的文件路径及文件名称。

```js
const MiniCssExtractPlugin = require("mini-css-ectract-plugin");

module.exports = {
  module: {
    rules: [
      test: /\.(css|less)$/,
      use: [MiniCssExtractPlugin.loader, "css-loader"],

    ]
  },

  plugins: [
    // ...
    new MiniCssExtractPlugin({
      filename: "styles/[contenthash].css"
    });
  ]
};
```

#### 压缩 css

1、压缩 css 需要通过 **css-minimizer-webpack-plugin** 来完成。

```
npm i css-minimizer-webpack-plugin -D
```

2、css-minimizer-webpack-plugin 配置如下：

```js
const MiniCssExtractPlugin = require("mini-css-ectract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      test: /\.(css|less)$/,
      use: [MiniCssExtractPlugin.loader, "css-loader"],
    ]
  },

  plugins: [
    // ...
    new MiniCssExtractPlugin({
      filename: "styles/[contenthash].css"
    });
  ],

  optimization: {
    minimizer: [
      new CssMinimizerPlugin();
    ]
  },

  mode: 'production',
};
```

> 注意：要使压缩 css 生效，必须将 mode 设置为生产模式。

### 资源模块

#### asset/resource

1、asset/resource 会发送一个单独的文件并导出 URL，可以用来加载图片资源或者 fonts 字体等，如加载 **png、jpg、jpeg** 或者 **woff、woff2、eot、tff、otf** 等，具体配置如下：

- generator：可以在该属性中配置资源打包输出的文件名称及路径。

  - filename：用于配置资源模块的路径及名称。

```js
module: {
  rules: [
    {
      test: /\.png$/,
      type: "asset/resource",
      generator：{
        filename: "images/[contenthash][ext]",
      }
    },
    {
      test: /\.(woff|woff2|eot|tff|otf)$/,
      type: "asset/resource",
    },
  ];
}
```

> 在 generator 中配置的资源模块打包输出的路径及文件名优先级高于 在 output 配置中使用 assetModuleFilename 配置的路径及文件名。

2、使用如上配置后，在 js 文件中就可以使用模块的方式导入图片资源及使用字体了，导入后可以直接作为 img.src 的属性值，如下：

- css 文件：

```css
@font-face {
  font-family: "iconfont";
  src: url("./assets/iconfont.ttf");
}

.icon {
  font-family: "iconfont";
  font-size: 20px;
}
```

- js 文件：

```js
import testImage from "./assets/img1.png";

const myImage = new Image(100, 100);
myImage.src = testImage;
document.body.appendChild(myImage);

// 使用字体
const span = document.createElement("span");
span.classList.add("icon");
span.innerHTML = "&#xe668;";
```

#### asset/inline

1、asset/inline 会导出一个资源的 Data URL（base64 格式），可以用来加载 **svg** 图。具体配置如下：

```js
module: {
  rules: [
    {
      test: /\.svg$/,
      type: "asset/inline",
    },
  ];
}
```

2、使用如上配置后，在 js 文件中就可以使用模块的方式导入 svg 资源了，导入后可以直接作为 img.src 的属性值，如下：

```js
import svgLogo from "./assets/logo.svg";

const myImage = document.createElement("img");
myImage.style.cssText = "width: 600px; height: 200px";
myImage.src = svgLogo;
document.body.appendChild(myImage);
```

#### asset/source

1、asset/source 会导出资源的源代码，可以用来加载 **text** 文本文件，具体配置如下：

```js
module: {
  rules: [
    {
      test: /\.text$/,
      type: "asset/source",
    },
  ];
}
```

2、使用如上配置后，在 js 文件中就可以使用模块的方式导入 text 资源了，如下：

```js
import textFile from "./assets/textFile.txt";

const dom = document.createElement("div");
myImage.style.cssText = "width: 200px; height: 200px; background: pink";
dom.textContent = textFile;
document.body.appendChild(dom);
```

#### asset

1、asset 是一个通用资源类型，它会在 resource 和 inline 之间自动进行选择：

- 小于 8kb 的文件，将会被视为 inline 模块类型，否则会被视为 resource 模块类型。

- 可以在 webpack 配置的 module rule 层级中设置 Rule.parser.dataUrlCondition.maxSize 选项来修改此条件：

```js
module: {
  rules: [
    test: /\.jpg$/,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 4 * 1024 // 4kb
      }
    }
  ]
}
```
