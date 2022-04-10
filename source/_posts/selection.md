---
title: ChromePlugin
date: 2022-04-05 20:09:12
toc: true
tags:
  - Chrome Plugins
  - Selection
categories:
  - Chrome API
  - DOM API
  - 文本选择
  - 文本复制
---

### 谷歌插件

#### 谷歌插件开发说明

谷歌插件基本是以 `.crx` 为文件后缀，该文件其实就是一个压缩包，包括插件所需要的 html、css、js、图片资源等等文件。其中必须要存在 `manifest.json` 文件，并且该文件必须放在插件开发目录的根目录上。该文件主要是用来描述插件的元数据，插件的配置信息等。除了 manifest.json 文件，根据需要，还可以配置如下一些文件：

- backgroubd.js 文件：该文件主要是用户配置插件的后台脚本。配置在 background 属性中，而 background 是一个常驻的页面，它的生命周期是插件中所有类型页面中最长的，它随着浏览器的打开而打开，随着浏览器的关闭而关闭，所以通常把需要一直运行的、启动就运行的、全局的代码放在 background 里面。

<!-- more -->

#### manifest.json

`manifest.json` 文件基本配置如下：

```json
{
  "name": "tts",
  "version": "1.0",
  "description": "tts",
  "manifest_version": 3,
  // 给tts开启权限
  "permissions": ["tts"],
  // 插件所需的各种尺寸的图标
  "icons": {
    "16": "/static/images/S16.png",
    "32": "/static/images/S32.png",
    "48": "/static/images/S48.png",
    "128": "/static/images/S128.png"
  },
  // 用户配置插件的后台脚本，在谷歌扩展程序页面点击对应插件的查看视图 Service Worker 即可调出后台调试页面
  "background": {
    "service_worker": "background.js"
  },
  // 用户设置插件的交互脚本
  "content_scripts": [
    {
      "js": ["page.js"],
      // 设置page.js文件在哪个页面生效。http://localhost/* 的意思是 page.js 会在所有的以localhost 形成的域名下生效
      "matches": ["http://localhost/*"] // ["http://*/*", "https://*/*"] 匹配所有的域名
    }
  ]
}
```

> 更多配置请看[谷歌插件开发官方文档](https://developer.chrome.com/docs/extensions/mv3/manifest/#overview)

### Selection API

#### Selection 概述

Selection 对象表示用户选择的文本范围或插入符号的当前位置。它代表页面中的文本选区，可能横跨多个元素。文本选区由用户拖拽鼠标经过文字而产生。要获取用于检查或修改的 Selection 对象，需要调用 **window.getSelection()** 获取 Selection 对象。

#### Selection 所包含术语介绍

anchor（锚点) 指的是一个选区的起始点（不同于 HTML 中的锚点链接，译者注）。当我们使用鼠标框选一个区域的时候，锚点就是我们鼠标按下瞬间的那个点。在用户拖动鼠标时，锚点是不会变的。

focus（焦点）指向用户结束选择的地方，当您用鼠标框选一个选区的时候，焦点是你的鼠标松开瞬间所记录的那个点。随着用户拖动鼠标，焦点的位置会随着改变。

range（范围）指的是文档中连续的一部分。一个范围包括整个节点，也可以包含节点的一部分，例如文本节点的一部分。用户通常下只能选择一个范围，但是有的时候用户也有可能选择多个范围（例如当用户按下 Control 按键并框选多个区域时，Chrome 中禁止了这个操作，译者注）。“范围”会被作为 Range 对象返回。Range 对象也能通过 DOM 创建、增加、删减。

#### Selection 属性说明

**anchorNode**：只读属性，返回该选区起点所在的节点（Node）。

**anchorOffset**：只读属性，返回一个数字，其表示的是选区起点在 anchorNode 中的位置偏移量。

- 如果 anchorNode 是文本节点，那么返回的就是从该文字节点的第一个字开始，直到**被选中的第一个字**之间的字数（如果第一个字就被选中，那么偏移量为零）。

- 如果 anchorNode 是一个元素，那么返回的就是在选区第一个节点之前的同级节点总数。(这些节点都是 anchorNode 的子节点)。

**focusNode**：只读属性，返回该选区终点所在的节点。

**focusOffset**：只读属性，返回一个数字，其表示的是选区终点在 focusNode 中的位置偏移量。

- 如果 focusNode 是文本节点，那么选区末尾未被选中的第一个字，在该文字节点中是第几个字（从 0 开始计），就返回它。

- 如果 focusNode 是一个元素，那么返回的就是在选区末尾之后第一个节点之前的同级节点总数。

**isCollapsed**：只读属性，返回一个布尔值，用于判断选区的起始点和终点是否在同一个位置。

**rangeCount**：只读属性，返回该选区所包含的连续范围的数量。

#### Selection 常用方法

**toString**：该方法返回当前被选中的文本文字。语法如下：

```js
const selection = window.getSelection();
const str = selection.toString();
```

#### Selection 的基本使用方式

使用 Selection 实时获取选中的文本：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Selection</title>
  </head>
  <body>
    <p>
      <a href="https://dnhyxc.gitee.io">dnhyxc</a>
      <span>元素1</span>
      <span>元素2</span>
      <span>元素3</span>
      Selection
      对象表示用户选择的文本范围或插入符号的当前位置。它代表页面中的文本选区，可能横跨多个元素。文本选区由用户拖拽鼠标经过文字而产生。要获取用于检查或修改的
      Selection 对象，需要调用 window.getSelection() 获取 Selection 对象。
    </p>

    <script>
      const selObj = window.getSelection();

      document.addEventListener("mouseup", () => {
        const selectStr = selObj.toString();
        console.log(selectStr);
      });
    </script>
  </body>
</html>
```

> [Selection 更多属性及方法请戳这里查看>>>](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection)
