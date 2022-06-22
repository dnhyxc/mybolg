---
title: babel
date: 2022-05-28 20:14:51
tags: babel
toc: true
declare: true
categories: babel
---

#### babel 定义

Babel 是一个 JavaScript 编译器，它是一个工具链，主要用于将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。简单来说就是 Babel 能够把 JavaScript 中 es2015/2016/2017/2046 的新语法转化为 es5，让低端运行环境(如浏览器和 node )能够认识并执行。

#### babel 工作原理

<!-- more -->

#### babel-polyfill

#### @babel/plugin-transform-runtime

由于 `polyfill` 机制是：直接修改全局变量的原型，如：

- 对于例如 `Array.from` 等静态方法，直接在 **global.Array** 上添加。

- 对于例如 `includes` 等实例方法，直接在 **global.Array.prototype** 上添加。

- **注意**：直接修改全局变量的原型，有可能会带来意想不到的问题。这个问题在开发第三方库的时候尤其重要，因为我们开发的第三方库修改了全局变量，有可能和另一个也修改了全局变量的第三方库发生冲突，或者和使用我们第三方库的使用者发生冲突。因此不推荐这种方式。

babel 转译 syntax 时，有时候会使用一些辅助的函数来帮忙转，比如：

- class 语法中，babel 自定义了 **\_classCallCheck** 这个函数来辅助。

- typeof 则是直接重写了一遍，自定义了 \_typeof 这个函数来辅助。这些函数叫做 **helpers**。

- **注意**：helper 会直接在转译后的文件里被定义一遍。如果一个项目中有 100 个文件，其中每个文件都写了一个 class，那么这个项目最终打包的产物里就会存在 100 个 `\_classCallCheck` 函数，他们的长相和功能都一模一样，这显然不合理。

@babel/plugin-transform-runtime 就是用来解决上述两个问题的：

- @babel/plugin-transform-runtime 的作用是转译代码，转译后的代码中可能会引入 **@babel/runtime-corejs3** 里面的模块。所以前者运行在编译时，后者运行在运行时。类似 polyfill，后者需要被打包到最终产物里在浏览器中运行。因此要使用 @babel/plugin-transform-runtime 时，往往需要配合 `@babel/runtime-corejs3` 一起使用：

```
mpn i @babel/plugin-transform-runtime -D

npm i @babel/runtime-corejs3 -S
```

- 部分转译代码如下：

```js
"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true,
});

exports.func = void 0;

var _from = _interopRequireDefault(
  require("@babel/runtime-corejs3/core-js-stable/array/from")
);

var _includes = _interopRequireDefault(
  require("@babel/runtime-corejs3/core-js-stable/instance/includes")
);

var _promise = _interopRequireDefault(
  require("@babel/runtime-corejs3/core-js-stable/promise")
);

const bebel = {
  version: 7.2,
};
console.log(bebel);

const func = (a, b) => {
  return a + b;
};

exports.func = func;
const res = func(9, 2);
console.log(res, "res");
const arr = [2, , 3, , 5];
const arr1 = (0, _from.default)(arr);
console.log(arr1, "arr1");
const test = (0, _includes.default)(arr).call(arr, 2);
console.log(test, "test");

_promise.default.resolve().finally();
```
