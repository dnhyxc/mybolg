---
title: node
date: 2022-02-09 21:09:11
tags: node
toc: true
categories:
  - 服务端
    - node
---

### fs 文件系统

#### fs 文件系统概述

1、fs 模块是 node.js 官方提供的用来操作文件的模块，它提供了一系列方法和属性，用来满足用户对文件的操作需求。例如：

- fs.readFile() 方法，用来读取指定文件中的内容。

- fs.writeFile() 方法，用来向指定的文件中写入内容。

2、如果要在 JS 代码中，使用 fs 模块来操作文件，则需要使用如下方式导入：

```js
const fs = require("fs");
```

#### fs.readFile()

1、fs.readFile() 方法可以读取指定文件中内容，具体语法如下：

```js
fs.readFile(path [,options], callback)
```

- path：必选参数，是一个字符串，用来指定要读取文件的路径。

- options：可选参数，表示以什么编码格式来读取文件。

- callback：必选参数，文件读取完成以后会触发这个回调，可用来获取读取的结果。

2、具体使用方式如下：

```js
const fs = require("fs");
const path = require("path");

// 读写文件时尽量都是用 path.join 方法进行路径的拼接
fs.readFile(path.join(__dirname, "test.txt"), "utf-8", (err, data) => {
  console.log(data);
});
```

> 如果读取成功，err 为 null，data 为读取到的文件内容，否则 err 为错误对象。data 为 undefined。

#### fs.writeFile()

1、fs.writeFile 可以向指定文件中写入内容，语法格式如下：

```js
fs.writeFile(file, data[, options], callback)
```

- file：必选参数，用与指定文件的存放路径，是一个表示文件路径的字符串。

- data：必选参数，表示要写入的文件内容。

- options：可选参数，表示以什么格式写入文件内容，默认值是 utf8。

- callback：必选参数，文件写入完成之后会触发此回调。 
