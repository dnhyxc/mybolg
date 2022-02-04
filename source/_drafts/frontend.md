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

meta 标签由 **name** 和 **content** 属性定义，**用来描述网页文档的属性**，比如网页的作者，网页的描述，关键字等。除了 HTTP 标准固定了一些 name 作为大家使用的共识，开发者还可以自定义 name。

常用的 meta 标签：

1、chartset：用来描述 HTML 文档的编码类型。

```html
<meta charset="UTF-8" />
```

2、keywords：页面关键词。

```html
<meta name="keywords" content="关键词" />
```

3、description：页面描述。

```html
<meta name="description" content="页面描述内容" />
```

4、refresh：页面重定向和刷新。

```html
<meta http-equiv="refresh" content="0;url=" />
```

5、viewport：适配移动端，可以控制视口的大小和比例：

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1 minimum-scale=1 user-scalable=no"
/>
```

content 参数有以下几种：

- width viewport：宽度（数值/device-width）。

- height viewport：宽度（数值/device-height）。

- initial-scale：初始缩放比例。

- maximum-scale：最大缩放比例。

- minimum-scale：最小缩放比例。

- user-scalable：是否允许用户缩放（yes/no）。

6、搜索引擎索引方式：

```html
<meta name="robots" content="index,follow" />
```

其中，content 参数有以下几种：

- all：文件将被检索，且页面上的链接可以被查询。

- none：文件将不被检索，且页面上的链接不可以被查询。

- index：文件将被检索。

- follow：页面上的链接可以被查询。

- noindex：文件将不被检索。

- nofollow：页面上的链接不可以被查询。

##### img 的 srcset 属性的作⽤

响应式页面中经常用到根据屏幕密度设置不同的图片。这时就用到了 img 标签的 srcset 属性。srcset 属性用于设置不同的屏幕密度下，img 会自动加载不同的图片。用法如下：

```html
<img src="image-128.png" srcset="image-256.png 2x" />
```

使用上面的代码，就能实现在屏幕为 1x 的情况下加载 image-128.png，屏幕密度为 2x 时加载 image-256.png。

但是按照上面的额实现，不同的屏幕密度都要设置图片地址，目前的屏幕密度有 1x、2x、3x、4x 四种，如果每一个图片都设置 4 张图片，加载就会很慢，所以就有了新的 srcset 标准，如下：

```html
<img
  src="image-128.png"
  srcset="image-128.png 128w, image-256.png 256w, image-512.png 512w"
  sizes="(max-width: 360px) 340px, 128px"
/>
```

> sizes 就是指默认显示 128px，如果视区宽度大于 360px，则显示 340px。

其中 srcset 指定图片的地址和对应的图片质量。sizes 用来设置图片的尺寸零界点。对于 srcset 中的 w 单位，可以理解为图片质量。如果可视区域小于这个质量的值，就可以使用。sizes 语法如下：

```js
sizes = "[media query] [length], [media query] [length] ... ";
```

##### 行内元素、块级元素、空(void)元素有哪些

行内元素有：a、b、span、img、input、select、strong 等。

块级元素有：div、ul、ol、li、dl、dt、dd、h1 ～ h6、p 等。

空元素，即没有内容的 HTML 元素。空元素是在开始标签中关闭的，也就是空元素没有闭合标签：

- 常见的有：br、hr、img、input、link、meta 等。

- 不常见的有：area、base、col、colgroup、command、embed、keygen、param、source、track、wbr 等。

##### HTML5 的离线储存怎么使用，它的工作原理是什么

离线存储指的是：在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。

**原理**：HTML5 的离线存储是基于一个新建的 **.appcache** 文件的缓存机制（不是存储技术），通过这个文件上的解析清单离线存储资源，这些资源就会像 cookie 一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。

**具体使用方法如下**：

1、创建一个和 html 同名的 manifest 文件，然后在页面头部加入 manifest 属性：

```html
<html lang="en" manifest="index.manifest"></html>
```

2、在 **cache.manifest** 文件中编写需要离线存储的资源：

```text
CACHE MANIFEST
  #v0.11
  CACHE:
  js/app.js
  css/style.css
  NETWORK:
  resourse/logo.png
  FALLBACK:
  / /offline.html
```

- CACHE：表示需要离线存储的资源列表，由于包含 manifest 文件的页面将被自动离线存储，所以不需要把页面自身也列出来。

- NETWORK：表示在它下面列出来的资源只有在在线的情况下才能访问，它们不会被离线存储，所以在离线情况下无法使用这些资源。不过，如果在 CACHE 和 NETWORK 中有一个相同的资源，那么这个资源还是会被离线存储，也就是说 CACHE 的优先级更高。

- FALLBACK：表示如果访问第一个资源失败，那么就使用第二个资源来替换它，比如上面这个文件表示的就是如果访问根目录下任何一个资源失败了，那么就去访问 offline.html。

3、在离线状态时，操作 window.applicationCache 进行离线缓存的操作。

**如何更新缓存**：

1、更新 manifest 文件：

- 给 manifest 添加或删除文件。

- 如果 manifest 没有添加或删除文件，只是修改了文件，可以通过更改版本号等更新 manifest 文件。

2、通过 javascript 操作：

- html5 中引入了 js 操作离线缓存的方法：window.applicationCache.update()，可以手动更新缓存。

3、清除浏览器缓存：

- 如果用户清除了浏览器缓存（手动或用其他一些工具），都会重新下载文件。

**注意事项**：

1、浏览器对缓存数据的容量限制可能不太一样（某些浏览器设置的限制是每个站点 5MB）。

2、如果 manifest 文件，或者内部列举的某一个文件不能正常下载，整个更新过程都将失败，浏览器将会继续使用老的缓存。

3、引用 manifest 的 html 必须与 manifest 文件同源，在同一域下。

4、FALLBACK 中的资源必须和 manifest 文件同源。

5、当一个资源被缓存后，该浏览器直接请求这个绝对路径也会访问缓存中的资源。

6、站点中的其它页面即使没有设置 manifest 属性，请求的资源如果在缓存中也从缓存中访问。

7、当 manifest 文件发生改变时，资源请求本身也会触发更新。

**离线缓存有什么优缺点**：

1、优点：

- 离线浏览：用户可在应用离线时使用它们。

- 速度：已缓存资源加载得更快。

- 减少服务器负载：浏览器只从服务器下载更新过或更改过的资源。

2、缺点：

- 更新的资源需要二次刷新才会被页面采用。

- 不支持增量更新，只要 manifest 发生变化，所有资源全部重新下载一次。

- 缺乏足够容错机制，当清单中任意资源文件出现加载异常，都会导致整个 manifest 策略运行异常。

##### 浏览器如何对 HTML5 的离线储存资源进行管理和加载

在线的情况下：浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问页面，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行离线存储，如果已经访问过页面并且资源已经进行离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，就会重新下载文件中的资源并进行离线存储。

离线的情况下：浏览器会直接使用离线存储的资源。

##### iframe 有那些优点和缺点

iframe 元素会创建包含另一个文档的内联框架（即行内框架）。

优点：

- 可以用来加载速度较慢的内容（如广告）。

- 可以使脚本实现并行下载。

- 可以实现跨子域通信。

缺点：

- iframe 会阻塞主页面的 onload 事件。

- 无法被一些搜索引擎检索识别。

- 会产生很多页面，不容易管理。

##### label 标签的作用及如何使用

label 标签可以用来定义表单控件的关系，当用户选择 label 标签时，浏览器会自动将焦点转到和 label 标签相关的表单控件上。

使用方法一：

```html
<label for="mobile">Number:</label> <input type="text" id="mobile" />
```

使用方法二：

```html
<label>Date:<input type="text" /></label>
```

##### head 标签有什么作用，其中什么标签必不可少

head 标签用于定义文档的头部，它是所有头部元素的容器。其中的元素可以引用脚本、指示浏览器在哪里找到样式表、提供元信息等。

文档的头部描述了文档的各种属性和信息，包括文档的标题、在 Web 中的位置以及和其他文档的关系等。绝大多数文档头部包含的数据都不会真正作为内容显示给读者。

下面这些标签可用在 head 部分：`<base>、<link>、<meta>、<script>、<style>、<title>`。其中 title 定义文档的标题，它是 head 部分中唯一必须的元素。

##### 浏览器产生乱码的原因，如何解决

产生乱码的原因：

- 网页源代码是 gbk 的编码，而内容中的中文字是 utf-8 编码的，这样浏览器打开即会出现 html 乱码，反之也会出现乱码。

- html 网页编码是 gkb，而程序从数据库中调出呈现是 utf-8 编码的内容也会造成编码乱码。

- 浏览器不能自动检测网页编码，这就造成了网页乱码。

解决办法：

- 使用软件编辑 HTML 网页内容。

- 如果网页设置编码是 gbk，而数据库存储数据编码格式是 utf-8，此时需要程序查询数据库数据显示数据前进程转码。

- 如果浏览器浏览时出现网页乱码，在浏览器中找到转换编码的菜单进行转换。

##### HTML5 drag API

dragstart：事件主体是被拖放元素，在开始拖放元素时触发。

drag：事件主体是被拖放元素，在被拖放元素正在被拖动时触发。

dragend：事件主体是被拖放元素，在整个拖放操作结束时触发。

dragenter：事件主体是目标元素，在被拖放元素进入目标元素时触发。

dragover：事件主体是目标元素，在被拖放元素在目标元素内移动时触发。

dragleave：事件主体是目标元素，在被拖放元素移出目标元素时触发。

drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发。

#### CSS

##### CSS 选择器及其优先级

选择器的优先级：

- 标签选择器、伪元素选择器权重为 1。

- 类选择器、伪类选择器、属性选择器权重为 10。

- id 选择器权重为 100。

- 内联样式权重为 1000。

注意事项：

- !important 声明的样式优先级最高。

- 如果优先级相同，则最后出现的样式生效。

- 继承得到的样式优先级最低。

- 通用选择器「\*」、子元素选择器「>」、相邻同胞选择器「+」并不在这四个等级中，所以它们的权重都为 0。

- 样式表的来源不同时，优先级顺序为：内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式。

##### CSS 中可继承与不可继承属性有哪些

_不可继承的属性_

1、display：设置元素显示与隐藏。

2、文本属性：

- vertical-align：垂直文本对齐。

- text-decoration：设置添加到文本的装饰。

- text-shadow：设置文本阴影效果。

- white-space：设置文本是否换行。

- unicode-bidi：设置文本的方向。

3、盒子模型的属性：width、height、margin、border、padding。

4、背景属性：background、background-color、background-image、background-repeat、background-position、background-attachment。

5、定位属性：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index。

6、生成内容属性：content、counter-reset、counter-incerment。

7、轮廓样式属性：outline-style、outline-width、outline-color、outline。

8、页面样式属性：size、page-break-before、page-break-after。

9、声音样式属性：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during。

_可继承的属性_

1、字体系列属性：

- font-family：字体类型。

- font-weight：字体粗细。

- font-size：字体大小。

- font-style：字体风格。

2、文本系列属性：

- text-indent：文本缩进。

- text-align：文本水平对齐。

- line-height：行高。

- word-spacing：单词之间的间距。

- letter-spacing：中文或者字母之间的间距。

- text-transform：控制文本大小写（就是 uppercase、lowercase、capitalize 这三个）。

- color：文本颜色。

3、元素可见性：

- visibility：控制元素显示隐藏。

4、列表布局属性：

- list-style：列表风格，包括 list-style-type、list-style-image 等。

5、光标属性：

- cursor：光标显示为何种形态。

##### 行内元素与块级元素的区别

行内元素：

- 设置宽高无效。

- 可以设置水平方向的 margin 和 padding 属性，不能设置垂直方向的 padding 和 margin。

- 不会自动换行。

块级元素：

- 可以设置宽高。

- 设置 margin 和 padding 都有效。

- 可以自动换行。

- 多个块级元素默认是从上到下排列。

##### 隐藏元素的方法有哪些

`display: none`：渲染树不会包含该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件。

`visibility: hidden`：元素在页面中仍占据空间，但是不会响应绑定的监听事件。

`opacity: 0`：将元素的透明度设置为 0，以此来实现元素的隐藏。元素在页面中仍然占据空间，并且能够响应元素绑定的监听事件。

`position: absolute`：通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏。

`z-index: 负值`：来使其他元素遮盖住该元素，以此来实现隐藏。

`clip/clip-path`：使用元素裁剪的方法来实现元素的隐藏，这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。

`transform: scale(0, 0)`：将元素缩放为 0，来实现元素的隐藏。这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。

##### link 和 @import 的区别

两者都是外部引用 CSS 的方式，它们的区别如下：

- link 是 XHTML 标签，除了加载 CSS 外，还可以定义 RSS 等其它事务。而 @import 属于 CSS 范畴，只能加载 CSS。

- link 引用 CSS 时，在页面载入时同时加载，@import 需要网页完全载入以后才加载。

- link 是 XHTML 标签，无兼容性问题，@import 是在 CSS2.1 提出的，低版本的浏览器不支持。

- link 支持使用 JS 控制 DOM 去改变样式，而 @import 不支持。

##### 对 requestAnimationframe 的理解

实现动画效果的方法比较多，js 中可以通过定时器 setTimeout 来实现，CSS3 中可以使用 transition 和 animation 来实现，HTML5 中的 canvas 也可以实现。除此之外，HTML5 提供了一个专门用于请求动画的 API，那就是 requestAnimationFrame，即请求动画帧。

语法：`window.requestAnimationFrame(callback)`，其中，callback 是**下一次重绘之前更新动画帧所调用的函数**（即上面所说的回调函数）。该回调函数会被传入 DOMHighResTimeStamp 参数。它表示 requestAnimationframe()开始去执行回调函数的。该方法属于**宏任务**，所以会在执行完微任务之后再去执行。

取消动画：使用 cancelAnimationFrame(id) 来取消执行动画，该方法接收一个参数 requestAnimationFrame 默认返回的 id，只需要传入这个 id 就可以取消动画了。

**requestAnimationFrame() 实现动画的优势**：

- CPU 节能：使用 setInterval 实现的动画，当页面被隐藏或最小化时，setInterval 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全就是浪费资源。而 requestAnimationFrame 则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统走的 requestAnimationFrame 也会被停止渲染，当页面激活时，动画就从上一次停留的地方继续执行，有效节省了 cpu 开销。

- 函数节流：在高频事件（resize、scroll）中，为了防止在一个刷新间隔内发生多次函数执行，requestAnimationFrame 可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销，一个刷新间隔内函数执行多次是没有意义的，因为多数显示器每 16.7ms 刷新一次，多次绘制并不会在屏幕中体现出来。

- 减少 DOM 操作：requestAnimationFrame 会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟着浏览器的刷新频率，一般来说这个频率为每秒 60 帧。

**setTimeout 执行动画的缺点**：它通过设定间隔时间来不断改变图像位置，达到动画效果。这容易出现卡顿、抖动的现象，原因是：

- setTimeout 任务被放入异步队列，只有当主线程任务执行完成后才会执行队列中的任务，因此时机执行时间总是比设定时间要晚。

- setTimeout 的固定时间间隔不一定与屏幕刷新间隔时间相同，会引起丢帧。

##### BFC

BFC 是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定的规则进行物品摆放，并且不会影响其它环境中的物品。如果一个元素符合触发 BFC 的条件，则 BFC 中的元素布局不受外部影响。

触发 BFC 的条件：

- 根元素：body。

- 元素设置浮动：float 除了 none 以外的值。

- 元素设置绝对定位：position（absolute、fixed）。

- display 值为：inline-block、table-cell、table-caption、flex 等。

- overflow 值为：hidden、auto、scroll。

BFC 的特点：

- 垂直方向上，自上而下排列，和文档流的排列方式一致。

- 在 BFC 中上下相邻的两个容器的 margin 会重叠。

- 计算 BFC 的高度时，需要计算浮动元素的高度。

- BFC 区域不会与浮动的容器发生重叠。

- BFC 是独立的容器，容器内部元素不会影响外部元素。

- 每个元素的左 margin 值和容器的左 border 相接触。

##### 盒子模型

css 盒模型分为 IE 盒模型和标准盒模型，IE 盒模型的内容大小是包括 border 和 padding 的，而标准盒模型则不包括。可以通过 box-sizing 设置标准盒模型为 IE 盒模型。

##### 定位浮动

##### 如果判断元素是否达到可视区域

以图片为例：

- window.innerHeight 是浏览器可视区的高度。

- document.body.scrollTop || document.documentElement.scrollTop 是浏览器滚动过的距离。

- imgs.offsetTop 是元素顶部距离文档顶部的高度（包括滚动条的距离）。

- 内容达到显示区域的判断条件是：`img.offsetTop < window.innerHeight + document.body.scrollTop`。

![元素是否达到可视区域](view.png)

##### 对媒体查询的理解

使用 @media 媒体查询，可以针对不同的媒体类型定义不同的样式。@media 还可以针对不同的屏幕尺寸设置不同的样式，特别是需要设置响应式的页面，@media 是非常有用的。当重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。

```html
<!-- link元素中的CSS媒体查询 -->
<link rel="stylesheet" media="(max-width: 800px)" href="example.css" />
<!-- 样式表中的CSS媒体查询 -->
<style>
  @media (max-width: 600px) {
    .facet_sidebar {
      display: none;
    }
  }
</style>
```

##### z-index 属性在什么情况下会失效

通常 z-index 的使用是在有两个重叠的标签，在一定的情况下控制其中一个在另一个的上方或者下方出现。z-index 值越大就越是在上层。z-index 元素的 position 属性需要是 relative、absolute 或者 fixed。

z-index 属性在下列情况下会失效：

- 元素没有设置 position 属性为非 static 属性，即没有设置定位。解决方式：设置该元素的 position 属性为 relative、absolute 或者 fixed 中的其中一种即可。

- 父元素 position 为 relative 时，子元素的 z-index 会失效。解决方式：父元素 position 改为 absolute 或 static。

- 元素在设置 z-index 的同时还设置了 float 浮动。解决方式：去除 float，改为 display：inline-block。

##### 物理像素、逻辑像素、像素密度

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
