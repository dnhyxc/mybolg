---
title: FileOperation
date: 2021-11-08 16:02:09
tags:
  - FileReader
  - Blob
  - MediaSource
categories:
  - File
---

### File

### FileReader

#### FileReader 概述

1、FileReader 对象允许 Web 应用程序**异步读取**存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。

> **注意**： FileReader 仅用于以安全的方式从用户（远程）系统读取文件内容，它不能用于从文件系统中按路径名简单地读取文件。要在 JavaScript 中按路径名读取文件，应使用标准 Ajax 解决方案进行服务器端文件读取，如果读取跨域，则需要使用 CORS 等方式处理跨域问题。

2、具体使用示例如：初始化后，监听 load 事件，然后调用读取方法。

```js
const reader = new FileReader();
reader.onload = function (evt) {
  console.log(evt.target.result);
};
reader.readAsText(file);
```

<!-- more -->

#### FileReader 属性

1、error：一个 DOMException，表示读取文件时发生的错误（只读属性）。

2、readyState：用于获取加载文件时的状态，其中 0 代表还没加载，1 代表加载中，2 代表加载完成（只读属性）。

3、result：用户获取读取到的文件内容（只读属性）。

#### FileReader 事件

1、**onabort**：读取操作被中断的事件，在读取被中断时触发。

2、**onload**：读取操作完成的事件，在读取操作完成时触发。

3、**onprogress**：读取 Blob 时触发。

4、**onloadstart**：在读取操作开始时触发。

5、**onloadend**：在读取操作结束时（要么成功，要么失败）触发。

6、**onerror**：读取操作发生错误的事件，在读取操作发生错误时触发。

#### FileReader 方法

1、**fr.abort()**：终止读取操作，readyState 属性将变成 2。

2、**fr.readAsArrayBuffer()**：以 ArrayBuffer 的格式读取文件，读取完成后 result 属性将返回一个 `ArrayBuffer` 实例。

3、**fr.readAsDataURL()**：读取完成后，result 属性将返回一个 `Data URL 格式（Base64 编码）的字符串`，代表文件内容。

4、**fr.readAsText()**：读取完成后，result 属性将返回文件内容的`文本字符串`。

5、**fr.readAsBinaryString()**：读取完成后，result 属性将返回原始的`二进制数据（二进制字符串）`。
