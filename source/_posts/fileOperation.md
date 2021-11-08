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

### FileReader

#### FileReader 概述

1、FileReader 对象允许 Web 应用程序**异步读取**存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。

- 其中 File 对象可以是来自用户在一个`<input>`元素上选择文件后返回的 **FileList** 对象，也可以来自拖放操作生成的 **DataTransfer** 对象，还可以是来自在一个 HTMLCanvasElement 上执行 **mozGetAsFile()** 方法后返回结果。

> **注意**： FileReader 仅用于以安全的方式从用户（远程）系统读取文件内容，它不能用于从文件系统中按路径名简单地读取文件。要在 JavaScript 中按路径名读取文件，应使用标准 Ajax 解决方案进行服务器端文件读取，如果读取跨域，则需要使用 CORS 等方式处理跨域问题。

<!-- more -->
