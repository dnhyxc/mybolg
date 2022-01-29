---
title: node
date: 2022-02-09 21:09:11
tags: node
toc: true
categories:
  - 服务端
    - node
---

### fs 文件系统模块

#### fs 文件系统概述

1、fs 模块是 node.js 官方提供的用来操作文件的模块，它提供了一系列方法和属性，用来满足用户对文件的操作需求。例如：

- fs.readFile() 方法，用来读取指定文件中的内容。

- fs.writeFile() 方法，用来向指定的文件中写入内容。

2、如果要在 JS 代码中，使用 fs 模块来操作文件，则需要使用如下方式导入：

```js
const fs = require("fs");
```

<!-- more -->

#### fs.access() 方法

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

##### fs.access() 基本使用示例

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

#### fs.accessSync() 方法

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

#### fs.readFile() 方法

1、fs.readFile() 方法可以用来异步的读取指定文件中内容。

##### fs.readFile() 语法

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

#### fs.readFileSync() 方法

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

#### fs.writeFile() 方法

1、fs.writeFile 可以向指定文件中写入内容。

##### fs.writeFile() 语法

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

##### fs.writeFile() 基本使用

1、callback 写法：

```js
const fs = require("fs");
const path = require("path");

fs.writeFile(
  path.join(__dirname, "./write.txt"),
  "使用path路径拼接向文件中写入内容",
  (err, data) => {
    console.log(err, "写入失败");
    console.log(data, "写入成功");
  }
);
```

2、promise 写法：

```js
const fsPromise = require("fs/promises");

const onWriteFile = async (path, data) => {
  const content = await fsPromise.writeFile(path, data);
  console.log(content, "写入成功~~~");
};

onWriteFile("./write.txt", "使用path路径拼接向文件中写入内容~~~~~");
```

#### fs.writeFileSync() 方法

1、fs.writeFileSync() 可以同步的向文件中写入内容。

2、fs.writeFileSync() 语法：

```js
fs.writeFileSync(file, data[, options])
```

- file：必选参数，用与指定文件的存放路径，是一个表示文件路径的字符串。

- data：必选参数，表示要写入的文件内容。

- options：可选参数，表示以什么格式写入文件内容，默认值是 utf8。

3、基本使用方式如下：

```js
const fs = require("fs");

const res = fs.writeFileSync("./write.txt", "同步写入内容");

if (res) {
  console.log("写入失败！");
} else {
  console.log("写入成功！");
}
```

> 更多 fs API 请查看 [nodejs 官网](http://nodejs.cn/api/fs.html)

### path 模块

#### path 模块概述

1、path 模块提供了用于处理文件和目录的路径的实用工具，可以使用如下方式导入 path 模块：

```js
const path = require("path");
```

#### path.join() 方法

1、path.join() 方法可以进行路径的拼接，它将使用特定于平台的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。

2、path.join() 语法：

```js
path.join([...paths]);
```

- paths：它是逗号分隔的一系列路径，这些路径将连接在一起以构成最终路径。

3、基本使用方式如下：

- 拼接多个路径：

```js
path.join("/foo", "bar", "baz/asdf", "quux", ".."); // '/foo/bar/baz/asdf'
```

> 由于后面是 `..` 因此会在 `/foo/bar/baz/asdf/quux` 基础上向上翻一级，即将 quux 这层目录抵消了。

- 结合 `__dirname` 使用：

```js
const fullPath = path.join(__dirname, "../fs/test.txt");

console.log(fullPath); // '/Users/dnhyxc/Documents/code/mybolg/example/node/fs/test.txt'
```

- **\_\_dirname**：表示当前模块所在的目录路径，不包含当前文件模块本身。如：E:\mybolg\example\node\path。结合 join 方法使用可以得到指定文件的完整路径。

- **\_\_filename**：表示当前模块所在的完整路径，包含当前文件模块本身。如：E:\mybolg\example\node\path\index.js

#### path.resolve() 方法

1、path.resolve() 方法将路径或路径片段的序列解析为绝对路径，即最终返回绝对路径。

- 该方法的解析方式是将给定的路径序列从右到左处理，每个后续的 path 会被追加到前面，直到构建得到绝对路径。例如，给定路径片段的序列：/foo、/bar、baz，调用 path.resolve('/foo', '/bar', 'baz') 将返回 /bar/baz，因为 'baz' 不是绝对路径，而 '/bar' + '/' + 'baz' 拼接形成了绝对路径，最终将这个得到的绝对路径返回。因此最左边的 /foo 就被忽略了。

2、path.resolve() 语法：

```js
path.resolve([...paths]);
```

- paths：路径或路径片段的序列。

3、具体使用方式如下：

- 路径片段拼接：

```js
path.resolve("/foo/bar", "./baz"); // '/foo/bar/baz'

path.resolve("/foo/bar", "/tmp/file/"); // '/tmp/file'

path.resolve("wwwroot", "static_files/png/", "../gif/image.gif"); // 如果当前工作目录是 /home/myself/node，则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
```

- 结合 `__dirname` 使用：

```js
const res = path.resolve(__dirname, "../fs/test.txt");

console.log(res, "resolve"); // '/Users/dnhyxc/Documents/code/mybolg/example/node/fs/test.txt'
```

#### path.basename() 方法

1、path.basename() 方法返回传入的 path 的最后一部分。

2、path.basename() 语法：

```js
path.basename(path[, ext])
```

- path：必需，表示需要处理的路径。

- ext：可选，表示传入 path 路径所携带的文件扩展名，如果传了该参数，则返回值将忽略文件的扩展名，否则返回值将携带文件的扩展名。

3、基本使用方式如下：

```js
path.basename("/foo/bar/baz/asdf/quux.html"); // 返回: 'quux.html'

path.basename("/foo/bar/baz/asdf/quux.html", ".html"); // 返回: 'quux'
```

#### path.extname() 方法

1、path.extname() 方法会返回指定路径的扩展名。即 path 的最后一部分中从最后一次出现的 .（句点）字符到字符串的结尾。如果 path 的最后一部分中没有 .，或者除了 path 的基本名称（参见 path.basename()）的第一个字符之外没有 . 个字符，则返回空字符串。

2、path.extname() 语法：

```js
path.extname(path);
```

- path：必需，指定需要处理的路径。

3、基本使用如下：

```js
path.extname("index.html"); // 返回: '.html'

path.extname("index.coffee.md"); // 返回: '.md'

path.extname("index."); // 返回: '.'

path.extname("index"); // 返回: ''

path.extname(".index"); // 返回: ''

path.extname(".index.md"); // 返回: '.md'
```

- 如果 path 不是字符串，则抛出 TypeError。

#### path.parse() 方法

1、path.parse() 方法返回一个对象，其属性表示 path 的重要元素。返回的对象将具有以下属性：

- root：表示所在根路径。

- dir：表示所在文件夹路径。

- base：表示当前文件的携带扩展名的文件名称。

- name：表示当前文件名称，不携带扩展名。

- ext：表示当前文件的扩展名。

2、path.parse() 语法：

```js
path.parse(path);
```

- path：需要处理的文件路径。

3、基本使用方式如下：

```js
path.parse("/home/user/dir/file.txt");
/*
返回：
  { 
    root: '/',
    dir: '/home/user/dir',
    base: 'file.txt',
    ext: '.txt',
    name: 'file' 
  }
*/

path.parse("../fs/test.txt"); // { root: '', dir: '../fs', base: 'test.txt', ext: '.txt', name: 'test' }
```

> 更多 path API 请查看 [nodejs 官网](http://nodejs.cn/api/path.html)

#### http

1、node 浏览器端调试方法：在终端中运行如下脚本：

```json
node --inspect --inspect-brk xxx.js
```
