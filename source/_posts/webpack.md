---
title: webpack5
date: 2020-12-09 09:02:09
tags: webpack
categories:
  - 构建工具
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

<!-- more -->

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

- filename：用于配置打包输出的文件名称，我们可以通过 filename 中的**substitutions** 设置来定义输出文件的名称。webpack 提供了一种使用称为substitutions（）

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

#### 加载数据

1、类似于 NodeJS，webpack 加载 JSON 文件实际上是内置的，也就是说 `import Data from './data.json'`，但要导入 CSV、TSV、XML 这些资源就需要使用 **csv-loader 和 xml-loader**。

```
npm i csv-loader xml-loader -D
```

2、具体配置如下：

```js
module: {
  rules: [
    {
      test: /\.(csv|tsv)$/,
      use: ["csv-loader"],
    },
    {
      test: /\.xml$/,
      use: ["xml-loader"],
    },
  ];
}
```

3、使用如上配置，就可以直接在 js 文件中导入 csv、xml 等资源了：

```js
import Data from "./assets/data.xml";
import Notes from "./assets/data.csv";

console.log(Data);
console.log(Notes);
```

#### 自定义 JSON 模块 parser

1、通过自定义 parser 代替特定的 webpack loader，可以将任何 toml、yaml 或 json5 文件作为 JSON 模块导入。但要完成这个需求需要安装如下插件：

```
npm i toml yaml json5 -D
```

2、在 webpack.config.js 文件中设置如下配置：

```js
// ...
const toml = require("toml");
const yaml = require("yaml");
const json5 = require("json5");

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.toml$/,
        type: "json",
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/,
        type: "json",
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/,
        type: "json",
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
};
```

3、设置了如上配置之后，就可以在 js 中导入使用上述资源了：

```js
import toml from "./assets/data.toml";
import yaml from "./assets/data.yaml";
import json5 from "./assets/data.json5";

console.log(toml);
console.log(yaml);
console.log(json5);
```

#### babel-loader

1、babel-loader 可以将 es6 的 js 代码编译成 es5 的代码，如下 es6 中的 async await 的写法就可通过 babel-loader 编译成低版本浏览器可识别的 es5 的写法：

- 在入口 js 文件中写入如下代码：

```js
function getString() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello world");
    }, 2000);
  });
}

async function helloWorld() {
  const string = await getString();
  console.log(string);
}
```

> 如果在低版本的浏览器中运行上述代码，如果没有被 babel-loader 转义，在页面将不能正常显示。

2、要使用 babel-loader，需要安装如下几个 loader：

```
npm i babel-loader @babel/core @babel/preset-env -D
```

- babel-loader：在 webpack 里用于解析 ES6 的桥梁。

- @babel/core：babel 核心模块。

- @babel/preset-env：babel 预设，一组 babel 插件的集合。

3、为了兼容 async/await 语法，webpack 会用到 regeneratorRuntime 插件。此时就需要安装 **@babel/runtime、@babel/plugin-transform-runtime** 这两个插件。否则在解析 async/await 语法的时候就会报错。

- @babel/plugin-transform-runtime：会在需要使用到 regeneratorRuntime 的地方自动 require 导包。

```
npm i @babel/runtime @babel/plugin-transform-runtime -D
```

4、具体配置如下：

```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: [["@babel/plugin-transform-runtime"]],
        },
      },
    },
  ];
}
```

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
document.body.appendChild(span);
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

### 代码分离

#### 常用的代码分离方法

1、在入口起点中使用 entry 配置多入口手动分离代码。

2、使用 Entry dependencies 或者 SplitChunksPlugin 去重和分离代码。

3、使用动态导入，通过模块的内联函数调用来分离代码。

#### 入口起点的方式

1、使用多入口的方式，可以将多个入口的 js 文件单独打包到不同的文件中，从而实现代码的分离。

2、这种方式需要更改 output 配置中的 filename 属性，即使用 webpack 内置的写法，自动获取输出文件的文件名称，使分离的文件不会使用同一个出口，防止报错。

```js
// ...
module.exports = {
  entry: {
    index: "./src/index.js",
    another: "./src/another-module.js",
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
};
```

> 上述配置会将 index.js 及 another-module.js 分别输出到 dist 文件中，及将会在 dist 文件中同时生成 index.bundle.js 及 another.bundle.js 文件。而在输出的 index.html 文件中也会同时引入这两个 js 文件。

3、使用 entry 配置多入口分离代码会存在一个致命的缺点，就是如果在入口的 chunk 之间，包含一些重复的代码，这些重复的代码就会被引入到各自的 bundle 中。

- 如果在 index.js 中以及 another-module.js 中同时使用 lodash 的话，将会将 lodash 分别打包进入这两个 js 文件中，导致 lodash 重复打包。

#### 防止重复打包

1、需要在入口依赖中配置 dependOn option 选项，这样可以在多个 chunk 之间共享模块：

```js
module.exports = {
  entry: {
    index: {
      import: "./src/index.js",
      dependOn: "shared",
    },

    another: {
      import: "./src/another-module.js",
      dependOn: "shared",
    },

    shared: "lodash",
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
};
```

> 上述配置就实现了将 lodash 单独打包到 shared.bundle.js 文件中，而在 打包输出的文件中，会同时引入 index.bundle.js、another.bundle.js 及 shared.bundle.js。这样就让 index.js 及 another-module.js 能够共享 lodash。而不需要将 lodash 打包到自己的文件中。

2、除了上述方法之外，还可以使用 webpack 内置的插件 **split-chunks-Plugin** 来实现防止代码的重复打包：

```js
module.exports = {
  entry: {
    index: "./src/index.js",
    another: "./src/another-module.js",
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },

  optimization: {
    minimizer: [
      // ...
    ],
    splitChunks: {
      chunks: "all",
    },
  },
};
```

#### 动态导入

1、当涉及到动态代码拆分时，webpack 提供了两个类似的技术，第一种，也是推荐选择的方式是使用符合 ECMAScript 提案的 **import()** 语法来实现动态导入。第二种，则是 webpack 的遗留功能，使用 webpack 特定的 require.ensure。

2、webpack.config.js 具体配置如下：

```js
module.exports = {
  entry: {
    index: "./src/index.js",
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
};
```

3、在 src 中创建一个使用第三方模块 lodash 的 async-module.js 文件，其内容如下：

```js
function getComponent() {
  return import("lodash").then(({ default: _ }) => {
    const element = document.createElement("div");
    element.innerHtml = _.join(["hello", "webpack"], " ");
    return element;
  });
}

getComponent().then((element) => {
  document.body.appendChild(element);
});
```

> 上述 js 文件最终需要在入口 js 文件中引入使用。

4、入口 index.js 文件内容：

```js
import "async-module.js";
```

5、如果在入口 index.js 文件中即引入了使用 import() 动态导入的 lodash，同时也使用了静态导入的 lodash 时，为了使这两种方式都生效，就需要在 webpack.config.js 中开启 splitChunks 的配置。

```js
module.exports = {
  entry: {
    index: "./src/index.js",
    another: "./src/another-module.js",
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
```

- 入口 index.js 文件内容如下：

```js
import _ from "lodash";
import "async-module.js";

console.log(_.join(["hello", "world", "-index"], " "));
```

> 使用上述配置，即可将 import() 动态导入的 lodash 和 index.js 中静态导入的 lodash 及 another.module.js 中导入的 lodash 共同打包到同一个 bundle 文件中。实现 lodash 的多方共享，同时也避免了重复打包。

#### 使用动态导入实现懒加载

1、懒加载或者按需加载，是一种很好的优化网页或应用的方式，这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码，如果你不触发，可能永远不会被加载。

2、创建一个 math.js 文件，在主页中通过点击按钮调用其中的函数：

```js
export const add = () => {
  return x + y;
};

export const minus = () => {
  return x - y;
};
```

3、编辑 index.js 文件：

```js
const button = document.createElement("button");
button.textContent = "点击进行加法运算";
button.addEventListener("click", () => {
  import(/* webpackChunkName: 'math' */ "./math.js").then(({ add }) => {
    console.log(add(2, 9));
  });
});
document.body.appendChild(button);
```

> 上述代码中的注释 `/* webpackChunkName: math */` 称之为 webpack 魔法注释，用来告诉 webpack 打包生成的文件名为 math，即该文件会单独打包到一个 bundle 中。文件名称为 math。该文件如果没有触发按钮，将永远不会被加载，可以从浏览器的 network 中进行验证。

#### 动态导入实现预加载/预获取模块

1、webpack v4.6.0+ 增加了对与获取和预加载的支持。在声明 import 时，使用下面这些内置指令就可以让 webpack 输出 "resource hint（资源提示）"，来告诉浏览器什么时候去加载该资源：

- prefetch（预获取）：将来某些导航下可能需要的资源。

- preload（预加载）：当前导航下可能需要的资源。

2、prefetch 的简单使用方式如下，编辑 index.js 文件：

```js
const button = document.createElement("button");
button.textContent = "点击进行加法运算";
button.addEventListener("click", () => {
  import(
    /* webpackChunkName: 'math', webpackPrefetch: true */ "./math.js"
  ).then(({ add }) => {
    console.log(add(2, 9));
  });
});
document.body.appendChild(button);
```

> 添加 `webpackPrefetch: true` 这句魔法注释用于告诉 webpack 执行预加载，这回生成 `<link rel="prefetch" href="math.js">` 并追加到页面头部，指示着浏览器在闲置的时候获取 math.js 文件。
> `webpackPreload: true` 功能效果类似于懒加载。

### 缓存

