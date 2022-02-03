---
title: 前端面试
date: 2022-02-09 21:09:11
tags: interview
toc: true
categories:
  - JavaScript
  - HTML
  - CSS
  - React
  - Vue
  - http
  - TypeScript
  - webpack
  - node
  - git
---

### 前端基础

#### HTML

##### src 和 href 的区别

src 和 href 都是用来引用外部的资源，它们的区别如下：

- src：表示对资源的引用，它指向的内容会嵌入到当前标签所在的位置。src 会将其指向的资源下载并应用到文档内，如请求 js 脚本。当浏览器解析到该元素时，**会暂停其他资源的下载和处理**，直到将该资源加载、编译、执⾏完毕，所以⼀般 js 脚本会放在页面底部。

- href：表示超文本引用，它指向一些网络资源，建立和当前元素或本文档的链接关系。当浏览器识别到它他指向的⽂件时，就会并⾏下载资源，**不会停⽌对当前⽂档的处理**。 常用在 a、link 等标签上。

##### 对 HTML 语义化的理解

语义化是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化）。通俗来讲就是用正确的标签做正确的事情。

<!-- more -->

语义化的优点如下：

- 对机器友好，带有语义化的文字表现力丰富，更适合搜索引擎的爬虫爬取有效信息，有利于 SEO。除此之外，语义类还支持读屏软件根据文章自动生成目录。

- 对开发者友好，使用语义类标签增强了可读性，结构更加清晰，开发者能清晰的看出网页的结构，便于团队的开发与维护。

常见的语义化标签：

```
<header></header>  头部

<nav></nav>  导航栏

<section></section>  区块（有语义化的div）

<main></main>  主要区域

<article></article>  主要内容

<aside></aside>  侧边栏

<footer></footer>  底部
```

##### script 标签中 defer 和 async 的区别

defer 和 async 属性都是去异步加载外部的 JS 脚本文件，它们都不会阻塞页面的解析，如果没有 defer 或 async 属性，浏览器会立即加载并执行相应的脚本。它不会等待后续加载的文档元素，读取到就会开始加载和执行，这样就阻塞了后续文档的加载。其二者的区别如下：

- 执行顺序：多个带 async 属性的标签，不能保证加载顺序，多个带 defer 属性的标签按照加载顺序执行。

- 脚本是否并行执行：async 属性，表示**后续文档的加载和执行与 js 脚本的加载和执行是并行的**，即异步执行。defer 属性，加载后续文档的过程与 js 脚本的加载（此时仅加载不执行）是并行进行的（异步），而 **js 脚本需要等到文档所有元素解析完成之后才执行**，DOMContentLoaded 事件触发执行之前。

##### 页面生命周期

HTML 页面的生命周期包含 DOMContentLoaded、load、beforeunload、unload 这几个重要的事件：

- **DOMContentLoaded**：浏览器已完全加载 HTML，并构建了 DOM 树，但像 `<img>` 和样式表之类的外部资源可能尚未加载完成。该事件表示 DOM 已经就绪，因此处理程序可以查找 DOM 节点，并初始化接口。

- **load**：浏览器不仅加载完了 HTML，还加载完了所有外部资源：图片、样式等。该事件表示外部资源已加载完成，样式已被应用，图片大小也已知了。

- **beforeunload**：当用户正在离开页面时。该事件表示用户正在离开，我们可以检查用户是否保存了更改，并询问他是否真的要离开。

- **unload**：当用户正在离开页面时。该事件表示用户几乎已经离开了，但是我们仍然可以启动一些操作，例如发送统计数据。

_DOMContentLoaded_

DOMContentLoaded 事件发生在 document 对象上。**必须使用 addEventListener 来捕获它**：

```js
document.addEventListener("DOMContentLoaded", ready);
// 不能使用 document.onDOMContentLoaded = () => {}
```

例如：

```html
<script>
  function ready() {
    alert("DOM is ready");

    // 图片目前尚未加载完成（除非已经被缓存），所以图片的大小为 0x0
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  }

  document.addEventListener("DOMContentLoaded", ready);
</script>

<img id="img" src="https://dnhyxc.gitee.io/img/sea.jpg" alt="" />
```

> 在上述代码示例中，DOMContentLoaded 处理程序在 DOM 加载完成后触发，所以他可以查看所有元素，包括下面的 `<img>` 元素。但是，它不会等待图片的加载，因此 alert 显示其大小为 0。

当浏览器处理一个 HTML 文档，并在文档中遇到 `<script>` 标签时，就会在继续构建 DOM 之前运行它，这是一种防范措施，因为脚本可能想要修改 DOM，甚至对其执行 document.write 操作，所以 DOMContentLoaded 必须等待脚本执行结束才执行。因此，DOMContentLoaded 肯定在下面的这些脚本执行结束之后发生：

```html
<script>
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM is ready!");
  });
</script>

<script src="https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js"></script>

<script>
  console.log("Library loaded, inline script executed");
</script>
```

> 在上面这个例子中，我们首先会看到 “Library loaded…”，然后才会看到 “DOM ready!”（所有脚本都已经执行结束）。

外部样式表不会影响 DOM，因此 DOMContentLoaded 不会等待它们。但如果在样式后面有一个脚本，那么该脚本必须等待样式表加载完成。原因是，脚本可能想要获取元素的坐标和其他与样式相关的属性，如下所示。因此，它必须等待样式加载完成。

```html
<link type="text/css" rel="stylesheet" href="style.css" />

<script>
  // 在样式表加载完成之前，脚本都不会执行
  console.log(getComputedStyle(document.body).marginTop);
</script>
```

Firefox，Chrome 和 Opera 都会在 DOMContentLoaded 中自动填充表单。例如，如果页面有一个带有登录名和密码的表单，并且浏览器记住了这些值，那么在 DOMContentLoaded 上，浏览器会尝试自动填充它们（如果得到了用户允许）。因此，如果 DOMContentLoaded 被需要加载很长时间的脚本延迟触发，那么自动填充也会等待。你可能在某些网站上看到过（如果你使用浏览器自动填充）—— 登录名/密码字段不会立即自动填充，而是在页面被完全加载前会延迟填充。这实际上是 DOMContentLoaded 事件之前的延迟。

**说明**：诸如 `<script>...</script>` 或 `<script src="..."></script>` 之类的脚本会**阻塞** DOMContentLoaded，浏览器将等待它们执行结束。而图片和其他资源仍然可以继续被加载。

_window.onload_

当整个页面，包括样式、图片和其他资源被加载完成时，会触发 window 对象上的 load 事件。可以通过 onload 属性获取此事件。下面的这个示例正确显示了图片大小，因为 window.onload 会等待所有图片加载完毕：

```html
<script>
  window.onload = function () {
    // 与此相同 window.addEventListener('load', (event) => {
    console.log("Page loaded");

    // 此时图片已经加载完成
    console.log(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://dnhyxc.gitee.io/img/sea.jpg" alt="" />
```

_window.onunload_

当访问者离开页面时，window 对象上的 unload 事件就会被触发。我们可以在那里做一些不涉及延迟的操作，例如关闭相关的弹出窗口。

注意：在发送分析数据的时候，假设我们收集有关页面使用情况的数据：鼠标点击，滚动，被查看的页面区域等，自然地，当用户要离开的时候，我们希望通过 unload 事件将数据保存到我们的服务器上。有一个特殊的 navigator.sendBeacon(url, data) 方法可以满足这种需求，[详见规范](https://w3c.github.io/beacon/)或[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)。它在后台发送数据，转换到另外一个页面不会有延迟：浏览器离开页面，但仍然在执行 sendBeacon。使用方式如下：

```js
// 带有收集的数据的对象
let analyticsData = {};

// 使用 ajax 发送，会导致页面卸载被延迟
window.addEventListener(
  "unload",
  () => {
    const client = new XMLHttpRequest();
    client.open("POST", "/log", false); // 第三个参数表明是同步的 xhr
    client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    client.send(analyticsData);
  },
  false
);

// 使用 sendBeacon() 方法会使用户代理在有机会时异步地向服务器发送数据，同时不会延迟页面的卸载或影响下一导航的载入性能。
window.addEventListener("unload", function () {
  navigator.sendBeacon("/log", JSON.stringify(analyticsData));
});
```

- navigator.sendBeacon() 以 POST 方式发送请求。

- sendBeacon() 不仅能发送字符串，还能发送表单以及其它格式的数据，但通常它是一个字符串化的对象。

- sendBeacon() 发送的数据大小限制在 64kb。

当 sendBeacon() 请求完成时，浏览器可能已经离开了文档，所以就无法获取服务器响应（对于分析数据来说通常为空）。

还有一个 **keep-live** 标志，该标志用于在 fetch 方法中为通用的网络请求执行此类「离开页面后」的请求。如果想了解更多相关信息请查看 [Fetch API](https://zh.javascript.info/fetch-api)。

如果我们要取消跳转到另一页面的操作，在这里是做不到的，但是我们可以使用另一个事件：**onbeforeunload** 实现。

_window.onbeforeunload_

如果访问者触发了离开页面的导航（navigation）或试图关闭窗口，beforeunload 处理程序将要求进行更多确认。

如果我们要取消事件，浏览器会询问用户是否确定。

可以通过运行下面这段代码，然后重新加载页面来进行尝试：

```js
window.onbeforeunload = function () {
  return false;
};
```

由于历史原因，返回非空字符串也被视为取消事件。在以前，浏览器曾经将其显示为消息，但是根据现代规范 所述，它们不应该这样，如下示例所示：

```js
window.onbeforeunload = function () {
  return "There are unsaved changes. Leave now?";
};
```

> 上述示例中，它的行为已经改变了，因为有些站长通过显示误导性和恶意信息滥用了此事件处理程序。所以，目前一些旧的浏览器可能仍将其显示为消息，但除此之外，无法自定义显示给用户的消息。

_readState_

如果我们在文档加载完成之后设置 DOMContentLoaded 事件处理程序，会发生什么？很显然，它永远不会运行。

在某些情况下，我们不确定文档是否已经准备就绪。但是我们希望函数在 DOM 加载完成时执行，无论现在还是以后。而 **document.readyState** 属性就可以为我们提供当前加载状态的信息。它有 3 个可能值：

- **loading**：文档正在被加载。

- **interactive**：文档被全部读取。

- **complete**：文档被全部读取，并且所有资源（例如图片等）都已加载完成。

所以，我们可以检查 document.readyState 并设置一个处理程序，或在代码准备就绪时立即执行它。如下：

```js
if (document.readyState === "loading") {
  // 仍在加载，等待事件
  document.addEventListener("DOMContentLoaded", () => {
    // do something...
  });
} else {
  // DOM 已就绪！do something...
}
```

还有一个 **readystatechange** 事件，会在状态发生改变时触发，因此我们可以打印所有这些状态，就像这样：

```js
// 当前状态
console.log(document.readyState);

// 状态改变时打印它
document.addEventListener("readystatechange", () =>
  console.log(document.readyState)
);
```

readystatechange 事件是跟踪文档加载状态的另一种机制，它很早就存在了。现在则很少被使用。

##### 常⽤的 meta 标签有哪些

##### img 的 srcset 属性的作⽤

##### 行内元素、块级元素、空(void)元素有哪些

##### HTML5 的离线储存怎么使用，它的工作原理是什么

##### 浏览器如何对 HTML5 的离线储存资源进行管理和加载

##### iframe 有那些优点和缺点

##### head 标签有什么作用，其中什么标签必不可少

#####

#### CSS

##### BFC

##### 盒子模型

##### 定位浮动

### JavaScript

#### 函数

##### this

##### 闭包

##### 执行上下文

##### 原型/原型链

##### 作用域/作用域链

#### 异步

##### 单线程

##### 异步队列

##### 回调函数

##### Generator
