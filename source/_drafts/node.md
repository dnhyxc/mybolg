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

#### access 方法

1、fs.access() 异步方法，可以用来异步的检查当前目录中是否存在指定文件或文件夹、检查指定文件是否可读、可写。

##### fs.access() 语法

1、fs.access() 采用回调形式的语法：

```js
fs.access(path[, mode], callback)
```

- path：文件路径，可以是 string | Buffer | URL。

- mode：检测的模式，默认值为：`fs.constants.F_OK`。

  - `fs.constants.F_OK`：表示检测当前目录是否存在指定的文件或文件夹。

  - `fs.constants.R_OK`：表示检测当前指定文件或者文件夹是否可读。

  - `fs.constants.W_OK`：表示检测当前指定文件或者文件夹是否可写。

- callback：检测完成的回调。

2、采用 Promise 写法时的语法：

```js
const fsPromises = require('fs/promises')

fsPromises.access(path[, mode])
```

##### access 基本使用示例

1、回调函数写法：

```js
const fs = require("fs");

const onAccessOfCallback = async (file, type) => {
  switch (type) {
    // 检查当前目录中是否存在指定文件或文件夹
    case "F_OK":
      fs.access(file, fs.constants.F_OK, (err) => {
        if (err) {
          console.log(`${file} 不存在`);
        } else {
          console.log(`${file} 存在`);
        }
      });
      break;
    // 检查当前文件是否可读
    case "R_OK":
      fs.access(file, fs.constants.R_OK, (err) => {
        if (err) {
          console.log(`${file} 不可读`);
        } else {
          console.log(`${file} 可读`);
        }
      });
      break;
    // 检查当前文件是否可写
    case "W_OK":
      fs.access(file, fs.constants.W_OK, (err) => {
        if (err) {
          console.log(`${file} 不可写`);
        } else {
          console.log(`${file} 可写`);
        }
      });
      break;
    // 检查当前文件是否可读可写
    case "FRW_OK":
      fs.access(
        file,
        fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK,
        (err) => {
          if (err) {
            console.log(`${file} 不存在或不可读或不可写`);
          } else {
            console.log(`${file} 存在并可读可写`);
          }
        }
      );
      break;

    default:
      break;
  }
};
```

2、promise 写法：

```js
const { access } = require("fs/promises");

// 检测文件或文件夹权限
const onAccessOfPromise = async (file, type) => {
  switch (type) {
    // 检查当前目录中是否存在指定文件或文件夹
    case "F_OK":
      try {
        await access(file, fs.constants.F_OK);
        console.log(`${file} 存在`);
      } catch {
        console.log(`${file} 不存在`);
      }
      break;
    // 检查当前文件是否可读
    case "R_OK":
      try {
        await access(file, fs.constants.R_OK);
        console.log(`${file} 可读`);
      } catch {
        console.log(`${file} 不可读`);
      }
      break;
    // 检查当前文件是否可写
    case "W_OK":
      try {
        await access(file, fs.constants.W_OK);
        console.log(`${file} 可写`);
      } catch {
        console.log(`${file} 不可写`);
      }
      break;
    // 检查当前文件是否可读可写
    case "FRW_OK":
      try {
        await access(
          file,
          fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK
        );
        console.log(`${file} 存在并可读可写`);
      } catch {
        console.log(`${file} 不存在或不可读或不可写`);
      }
      break;

    default:
      break;
  }
};

onAccess("test.txt", "F_OK");
```

#### accessSync 方法

1、fs.accessSync() 同步方法，作用与 access 相同。但是同步的 API 会同步地执行所有操作，会阻塞事件循环，直到操作完成或失败。

2、fs.accessSync() 语法：

```js
fs.accessSync(path[, mode])
```

- path：文件路径，可以是 string | Buffer | URL。

- mode：检测的模式，默认值为：`fs.constants.F_OK`。

3、fs.accessSync 基本使用示例：

```js
const fs = require("fs");

const onAccessSync = () => {
  try {
    accessSync("test.txt", constants.R_OK | constants.W_OK);
    console.log(`${file} 可读可写`);
  } catch (err) {
    console.log(`${file} 不可读不可写`);
  }
};
```

#### readFile 方法

1、fs.readFile() 方法可以用来异步的读取指定文件中内容。

##### fs.readFile 语法

1、callback 回调写法：

```js
fs.readFile(path [,options], callback)
```

- path：必选参数，是一个字符串，用来指定要读取文件的路径。

- options：可选参数，表示以什么编码格式来读取文件。

- callback：必选参数，文件读取完成以后会触发这个回调，可用来获取读取的结果。

2、Promise 写法：

```js
const fsPromises = require("fs/promises");

fsPromises.readFile(path[, options])
```

##### fs.readFile() 基本使用方式

1、callback 回调写法：

```js
const fs = require("fs");

fs.readFile("./test.txt", "utf-8", (err, data) => {
  console.log(data, "读取成功了");
});

// 如果不传 options 规定编码方式还可以使用 toString将读取到的内容进行转发
fs.readFile("./test.txt", (err, data) => {
  console.log(data.toString(), "读取成功了");
});
```

> 如果读取成功，err 为 null，data 为读取到的文件内容，否则 err 为错误对象。data 为 undefined。

2、Promise 写法：

```js
const { readFile } = require("fs/promises");

const onReadFile = async (fileName) => {
  try {
    await readFile(fileName, "utf-8");
    console.log(`${file} 读取成功`);
  } catch (err) {
    // 当请求中止时 - err 是 AbortError
    console.error(err);
  }
};

onReadFile("test.txt");
```

#### readFileSync 方法

1、fs.readFileSync() 方法会同步的读取指定的文件，会阻塞事件循环，直到操作完成或失败。

2、fs.readFileSync() 语法：

```js
fs.readFileSync(path[, options])
```

- path：必选参数，是一个字符串，用来指定要读取文件的路径。

- options：可选参数，表示以什么编码格式来读取文件。

3、基本使用示例：

```js
const content = fs.readFileSync("./test.txt", "utf-8");

console.log(content, "content"); // 文件读写测试 content
```

#### fs.writeFile()

1、fs.writeFile 可以向指定文件中写入内容。

##### fs.writeFile 语法

1、callback 回调写法：

```js
fs.writeFile(file, data[, options], callback)
```

- file：必选参数，用与指定文件的存放路径，是一个表示文件路径的字符串。

- data：必选参数，表示要写入的文件内容。

- options：可选参数，表示以什么格式写入文件内容，默认值是 utf8。

- callback：必选参数，文件写入完成之后会触发此回调。

2、Promise 写法：

```js
const fsPromises = require('fs/promises');

fsPromises.writeFile(file, data[, options])
```

- file：必选参数，用与指定文件的存放路径，是一个表示文件路径的字符串。

- data：必选参数，表示要写入的文件内容。

- options：可选参数，表示以什么格式写入文件内容，默认值是 utf8。

##### fs.writeFile 基本使用

1、
