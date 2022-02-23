---
title: 前端基础
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

### HTML

#### src 和 href 的区别

src 和 href 都是用来引用外部的资源，它们的区别如下：

- src：表示对资源的引用，它指向的内容会嵌入到当前标签所在的位置。src 会将其指向的资源下载并应用到文档内，如请求 js 脚本。当浏览器解析到该元素时，**会暂停其他资源的下载和处理**，直到将该资源加载、编译、执⾏完毕，所以⼀般 js 脚本会放在页面底部。

- href：表示超文本引用，它指向一些网络资源，建立和当前元素或本文档的链接关系。当浏览器识别到它他指向的⽂件时，就会并⾏下载资源，**不会停⽌对当前⽂档的处理**。 常用在 a、link 等标签上。

#### 对 HTML 语义化的理解

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

#### script 标签中 defer 和 async 的区别

defer 和 async 属性都是去异步加载外部的 JS 脚本文件，它们都不会阻塞页面的解析，如果没有 defer 或 async 属性，浏览器会立即加载并执行相应的脚本。它不会等待后续加载的文档元素，读取到就会开始加载和执行，这样就阻塞了后续文档的加载。其二者的区别如下：

- 执行顺序：多个带 async 属性的标签，不能保证加载顺序，多个带 defer 属性的标签按照加载顺序执行。

- 脚本是否并行执行：async 属性，表示**后续文档的加载和执行与 js 脚本的加载和执行是并行的**，即异步执行。defer 属性，加载后续文档的过程与 js 脚本的加载（此时仅加载不执行）是并行进行的（异步），而 **js 脚本需要等到文档所有元素解析完成之后才执行**，DOMContentLoaded 事件触发执行之前。

#### 页面生命周期

HTML 页面的生命周期包含 DOMContentLoaded、load、beforeunload、unload 这几个重要的事件：

- **DOMContentLoaded**：浏览器已完全加载 HTML，并构建了 DOM 树，但像 `<img>` 和样式表之类的外部资源可能尚未加载完成。该事件表示 DOM 已经就绪，因此处理程序可以查找 DOM 节点，并初始化接口。

- **load**：浏览器不仅加载完了 HTML，还加载完了所有外部资源：图片、样式等。该事件表示外部资源已加载完成，样式已被应用，图片大小也已知了。

- **beforeunload**：当用户正在离开页面时。该事件表示用户正在离开，我们可以检查用户是否保存了更改，并询问他是否真的要离开。

- **unload**：当用户正在离开页面时。该事件表示用户几乎已经离开了，但是我们仍然可以启动一些操作，例如发送统计数据。

##### DOMContentLoaded

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

##### window.onload

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

##### window.onunload

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

##### window.onbeforeunload

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

##### readState

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

#### 常⽤的 meta 标签有哪些

meta 标签由 **name** 和 **content** 属性定义，**用来描述网页文档的属性**，比如网页的作者，网页的描述，关键字等。除了 HTTP 标准固定了一些 name 作为大家使用的共识，开发者还可以自定义 name。

常用的 meta 标签：

*1、*chartset：用来描述 HTML 文档的编码类型。

```html
<meta charset="UTF-8" />
```

*2、*keywords：页面关键词。

```html
<meta name="keywords" content="关键词" />
```

*3、*description：页面描述。

```html
<meta name="description" content="页面描述内容" />
```

*4、*refresh：页面重定向和刷新。

```html
<meta http-equiv="refresh" content="0;url=" />
```

*5、*viewport：适配移动端，可以控制视口的大小和比例：

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

*6、*搜索引擎索引方式：

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

#### img 的 srcset 属性的作⽤

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

#### 行内元素、块级元素、空(void)元素有哪些

行内元素有：a、b、span、img、input、select、strong 等。

块级元素有：div、ul、ol、li、dl、dt、dd、h1 ～ h6、p 等。

空元素，即没有内容的 HTML 元素。空元素是在开始标签中关闭的，也就是空元素没有闭合标签：

- 常见的有：br、hr、img、input、link、meta 等。

- 不常见的有：area、base、col、colgroup、command、embed、keygen、param、source、track、wbr 等。

#### HTML5 的离线储存怎么使用，它的工作原理是什么

离线存储指的是：在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。

**原理**：HTML5 的离线存储是基于一个新建的 **.appcache** 文件的缓存机制（不是存储技术），通过这个文件上的解析清单离线存储资源，这些资源就会像 cookie 一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。

**具体使用方法如下**：

*1、*创建一个和 html 同名的 manifest 文件，然后在页面头部加入 manifest 属性：

```html
<html lang="en" manifest="index.manifest"></html>
```

*2、*在 **cache.manifest** 文件中编写需要离线存储的资源：

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

*3、*在离线状态时，操作 window.applicationCache 进行离线缓存的操作。

**如何更新缓存**：

*1、*更新 manifest 文件：

- 给 manifest 添加或删除文件。

- 如果 manifest 没有添加或删除文件，只是修改了文件，可以通过更改版本号等更新 manifest 文件。

*2、*通过 javascript 操作：

- html5 中引入了 js 操作离线缓存的方法：window.applicationCache.update()，可以手动更新缓存。

*3、*清除浏览器缓存：

- 如果用户清除了浏览器缓存（手动或用其他一些工具），都会重新下载文件。

**注意事项**：

*1、*浏览器对缓存数据的容量限制可能不太一样（某些浏览器设置的限制是每个站点 5MB）。

*2、*如果 manifest 文件，或者内部列举的某一个文件不能正常下载，整个更新过程都将失败，浏览器将会继续使用老的缓存。

*3、*引用 manifest 的 html 必须与 manifest 文件同源，在同一域下。

*4、*FALLBACK 中的资源必须和 manifest 文件同源。

*5、*当一个资源被缓存后，该浏览器直接请求这个绝对路径也会访问缓存中的资源。

*6、*站点中的其它页面即使没有设置 manifest 属性，请求的资源如果在缓存中也从缓存中访问。

*7、*当 manifest 文件发生改变时，资源请求本身也会触发更新。

**离线缓存有什么优缺点**：

*1、*优点：

- 离线浏览：用户可在应用离线时使用它们。

- 速度：已缓存资源加载得更快。

- 减少服务器负载：浏览器只从服务器下载更新过或更改过的资源。

*2、*缺点：

- 更新的资源需要二次刷新才会被页面采用。

- 不支持增量更新，只要 manifest 发生变化，所有资源全部重新下载一次。

- 缺乏足够容错机制，当清单中任意资源文件出现加载异常，都会导致整个 manifest 策略运行异常。

#### 浏览器如何对 HTML5 的离线储存资源进行管理和加载

在线的情况下：浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问页面，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行离线存储，如果已经访问过页面并且资源已经进行离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，就会重新下载文件中的资源并进行离线存储。

离线的情况下：浏览器会直接使用离线存储的资源。

#### iframe 有那些优点和缺点

iframe 元素会创建包含另一个文档的内联框架（即行内框架）。

优点：

- 可以用来加载速度较慢的内容（如广告）。

- 可以使脚本实现并行下载。

- 可以实现跨子域通信。

缺点：

- iframe 会阻塞主页面的 onload 事件。

- 无法被一些搜索引擎检索识别。

- 会产生很多页面，不容易管理。

#### label 标签的作用及如何使用

label 标签可以用来定义表单控件的关系，当用户选择 label 标签时，浏览器会自动将焦点转到和 label 标签相关的表单控件上。

使用方法一：

```html
<label for="mobile">Number:</label> <input type="text" id="mobile" />
```

使用方法二：

```html
<label>Date:<input type="text" /></label>
```

#### head 标签有什么作用，其中什么标签必不可少

head 标签用于定义文档的头部，它是所有头部元素的容器。其中的元素可以引用脚本、指示浏览器在哪里找到样式表、提供元信息等。

文档的头部描述了文档的各种属性和信息，包括文档的标题、在 Web 中的位置以及和其他文档的关系等。绝大多数文档头部包含的数据都不会真正作为内容显示给读者。

下面这些标签可用在 head 部分：`<base>、<link>、<meta>、<script>、<style>、<title>`。其中 title 定义文档的标题，它是 head 部分中唯一必须的元素。

#### 浏览器产生乱码的原因，如何解决

产生乱码的原因：

- 网页源代码是 gbk 的编码，而内容中的中文字是 utf-8 编码的，这样浏览器打开即会出现 html 乱码，反之也会出现乱码。

- html 网页编码是 gkb，而程序从数据库中调出呈现是 utf-8 编码的内容也会造成编码乱码。

- 浏览器不能自动检测网页编码，这就造成了网页乱码。

解决办法：

- 使用软件编辑 HTML 网页内容。

- 如果网页设置编码是 gbk，而数据库存储数据编码格式是 utf-8，此时需要程序查询数据库数据显示数据前进程转码。

- 如果浏览器浏览时出现网页乱码，在浏览器中找到转换编码的菜单进行转换。

#### HTML5 drag API

dragstart：事件主体是被拖放元素，在开始拖放元素时触发。

drag：事件主体是被拖放元素，在被拖放元素正在被拖动时触发。

dragend：事件主体是被拖放元素，在整个拖放操作结束时触发。

dragenter：事件主体是目标元素，在被拖放元素进入目标元素时触发。

dragover：事件主体是目标元素，在被拖放元素在目标元素内移动时触发。

dragleave：事件主体是目标元素，在被拖放元素移出目标元素时触发。

drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发。

### CSS

#### CSS 选择器及其优先级

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

#### 盒子模型

css 盒模型分为 IE 盒模型和标准盒模型，IE 盒模型的内容大小是包括 border 和 padding 的，而标准盒模型则不包括。可以通过 box-sizing 设置标准盒模型为 IE 盒模型。

#### CSS 中可继承与不可继承属性有哪些

##### 不可继承的属性

display：设置元素显示与隐藏。

文本属性：

- vertical-align：垂直文本对齐。

- text-decoration：设置添加到文本的装饰。

- text-shadow：设置文本阴影效果。

- white-space：设置文本是否换行。

- unicode-bidi：设置文本的方向。

盒子模型的属性：width、height、margin、border、padding。

背景属性：background、background-color、background-image、background-repeat、background-position、background-attachment。

定位属性：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index。

生成内容属性：content、counter-reset、counter-incerment。

轮廓样式属性：outline-style、outline-width、outline-color、outline。

页面样式属性：size、page-break-before、page-break-after。

声音样式属性：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during。

##### 可继承的属性

字体系列属性：

- font-family：字体类型。

- font-weight：字体粗细。

- font-size：字体大小。

- font-style：字体风格。

文本系列属性：

- text-indent：文本缩进。

- text-align：文本水平对齐。

- line-height：行高。

- word-spacing：单词之间的间距。

- letter-spacing：中文或者字母之间的间距。

- text-transform：控制文本大小写（就是 uppercase、lowercase、capitalize 这三个）。

- color：文本颜色。

元素可见性：

- visibility：控制元素显示隐藏。

列表布局属性：

- list-style：列表风格，包括 list-style-type、list-style-image 等。

光标属性：

- cursor：光标显示为何种形态。

#### 行内元素与块级元素的区别

行内元素：

- 设置宽高无效。

- 可以设置水平方向的 margin 和 padding 属性，不能设置垂直方向的 padding 和 margin。

- 不会自动换行。

块级元素：

- 可以设置宽高。

- 设置 margin 和 padding 都有效。

- 可以自动换行。

- 多个块级元素默认是从上到下排列。

#### 隐藏元素的方法有哪些

`display: none`：渲染树不会包含该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件。

`visibility: hidden`：元素在页面中仍占据空间，但是不会响应绑定的监听事件。

`opacity: 0`：将元素的透明度设置为 0，以此来实现元素的隐藏。元素在页面中仍然占据空间，并且能够响应元素绑定的监听事件。

`position: absolute`：通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏。

`z-index: 负值`：来使其他元素遮盖住该元素，以此来实现隐藏。

`clip/clip-path`：使用元素裁剪的方法来实现元素的隐藏，这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。

`transform: scale(0, 0)`：将元素缩放为 0，来实现元素的隐藏。这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。

#### link 和 @import 的区别

两者都是外部引用 CSS 的方式，它们的区别如下：

- link 是 XHTML 标签，除了加载 CSS 外，还可以定义 RSS 等其它事务。而 @import 属于 CSS 范畴，只能加载 CSS。

- link 引用 CSS 时，在页面载入时同时加载，@import 需要网页完全载入以后才加载。

- link 是 XHTML 标签，无兼容性问题，@import 是在 CSS2.1 提出的，低版本的浏览器不支持。

- link 支持使用 JS 控制 DOM 去改变样式，而 @import 不支持。

#### 对 requestAnimationframe 的理解

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

#### 清除浮动原理及方式

*1、*浮动的定义：

- 非 IE 浏览器下，容器不设高度且子元素浮动时，容器高度不能被内部撑开。此时，内容会溢出到浏览器外面而影响布局。这种现象就称为浮动。

*2、*浮动的工作原理：

- 浮动元素脱离文档流，不占据空间（引起 "高度塌陷" 现象）。

- 浮动元素碰到包含它的边框或者其它浮动元素的边框会停止浮动。

> 浮动元素可以左右移动，直到遇到另一个浮动元素或者遇到它外边缘的包含框。浮动框不属于文档流中的普通流，当元素浮动之后，不会影响块级元素的布局，只会影响内联元素布局。此时文档流中的普通流就会表现得该浮动框不存在一样的布局模式。当包含框的高度小于浮动框的时候，此时就会出现 "高度塌陷"。

*3、*浮动元素引起的问题：

- 父元素的高度无法被撑开，影响与父元素同级的元素。

- 与浮动元素同级的非浮动元素会跟随其后。

- 若浮动元素不是第一个元素，则该元素之前的额元素也要浮动，否则会影响页面的显示结构。

*4、*清除浮动的方式：

- 给父级 div 定义 height 属性。

- 最后一个浮动元素之后添加一个空的 div 标签，并添加 `clear: both` 样式。

- 包含浮动元素的父级标签添加 `overflow: hidden` 或者 `overflow: auto`。

- 使用 :after 伪元素。由于 IE6-7 不支持 :after，使用 `zoom: 1` 触发 `hasLayout`。

```css
.clearfix:after {
  content: "\200B";
  display: table;
  height: 0;
  clear: both;
}
.clearfix {
  *zoom: 1;
}
```

#### 使用 clear 属性清除浮动的原理

使用 clear 属性清除浮动，其语法如下：

```css
clear: none|left|right|both;
```

如果单看字面意思，clear:left 是“清除左浮动”，clear:right 是“清除右浮动”，实际上，这种解释是有问题的，因为浮动一直还在，并没有清除。

官方对 clear 属性解释："**元素盒子的边不能和前面的浮动元素相邻**"，对元素设置 clear 属性是为了避免浮动元素对该元素的影响，而不是清除掉浮动。

还需要注意 clear 属性指的是元素盒子的边不能和前面的浮动元素相邻，注意这里“前面的”3 个字，也就是 clear 属性对“后面的”浮动元素是不闻不问的。考虑到 float 属性要么是 left，要么是 right，不可能同时存在，同时由于 clear 属性对“后面的”浮动元素不闻不问，因此，当 clear:left 有效的时候，clear:right 必定无效，也就是此时 clear:left 等同于设置 clear:both；同样地，clear:right 如果有效也是等同于设置 clear:both。由此可见，clear:left 和 clear:right 这两个声明就没有任何使用的价值，至少在 CSS 世界中是如此，直接使用 clear:both 吧。

一般使用伪元素的方式清除浮动：

```css
.clear::after {
  content: "";
  display: block;
  clear: both;
}
```

clear 属性只有块级元素才有效的，而::after 等伪元素默认都是内联水平，这就是借助伪元素清除浮动影响时需要设置 display 属性值的原因。

#### BFC

BFC 是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定的规则进行物品摆放，并且不会影响其它环境中的物品。如果一个元素符合触发 BFC 的条件，则 BFC 中的元素布局不受外部影响。

*1、*触发 BFC 的条件：

- 根元素：body。

- 元素设置浮动：float 除了 none 以外的值。

- 元素设置绝对定位：position（absolute、fixed）。

- display 值为：inline-block、table-cell、table-caption、flex 等。

- overflow 值为：hidden、auto、scroll。

*2、*BFC 的特点：

- 垂直方向上，自上而下排列，和文档流的排列方式一致。

- 在 BFC 中上下相邻的两个容器的 margin 会重叠。

- 计算 BFC 的高度时，需要计算浮动元素的高度。

- BFC 区域不会与浮动的容器发生重叠。

- BFC 是独立的容器，容器内部元素不会影响外部元素。

- 每个元素的左 margin 值和容器的左 border 相接触。

*3、*BFC 的作用：

- 解决 margin 的重叠问题：由于 BFC 是一个独立的区域，内部的元素和外部的元素互不影响，将两个元素变为两个 BFC，就解决了 margin 重叠的问题。

- 解决高度塌陷的问题：在对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为 0。要解决这个问题，只需要把父元素变成一个 BFC。常用的方法是给父元素设置 `overflow: hidden`。

- 创建自适应两栏布局：可以用来创建自适应两栏布局：左边的宽度固定，右边的宽度自适应。

```html
<style>
  .left {
    width: 100px;
    height: 200px;
    background: red;
    float: left;
  }
  .right {
    height: 300px;
    background: blue;
    overflow: hidden;
  }
</style>

<div class="box">
  <div class="left"></div>
  <div class="right"></div>
</div>
```

> 左侧设置 float: left，右侧设置 overflow; hidden。这样右边就触发了 BFC，BFC 的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠，实现了自适应两栏布局。

#### 如何解决 margin 重叠问题

问题描述：两个块级元素的上外边距和下外边距可能会合并（折叠）为一个外边距，其大小会取其中外边距值最大的那个，这种行为就是外边距折叠。需要注意的是，浮动的元素和绝对定位这种脱离文档流的元素的外边距不会折叠。**重叠只会出现在垂直方向**。

计算原则：折叠合并后外边距的计算规则如下：

- 如果两者都是正数，那么就取最大值。

- 如果是一正一负，就取正值减去负值的绝对值。

- 两个都是负值时，用 0 减去两个中绝对值最大的那个。

解决办法：对于折叠的情况，主要有两种：兄弟之间重叠和父子之间重叠。

*1、*父子之间重叠，为底部盒子开启 BFC 即可，如下：

- 底部元素变为行内块元素：`display：inline-block`。

- 底部元素设置浮动：`float`。

- 底部元素的 position 的值为：`absolute/fixed`。

*2、*父子之间重叠：

- 父元素加入：`overflow: hidden`。

- 父元素添加透明度边框：`border: 1px solid transparent`。

- 子元素变为行内块元素：`display: inline-block`。

- 子元素加入浮动属性或定位。

#### 如果判断元素是否达到可视区域

以图片为例：

- window.innerHeight 是浏览器可视区的高度。

- document.body.scrollTop || document.documentElement.scrollTop 是浏览器滚动过的距离。

- imgs.offsetTop 是元素顶部距离文档顶部的高度（包括滚动条的距离）。

- 内容达到显示区域的判断条件是：`img.offsetTop < window.innerHeight + document.body.scrollTop`。

![元素是否达到可视区域](view.png)

#### 对媒体查询的理解

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

#### z-index 属性在什么情况下会失效

通常 z-index 的使用是在有两个重叠的标签，在一定的情况下控制其中一个在另一个的上方或者下方出现。z-index 值越大就越是在上层。z-index 元素的 position 属性需要是 relative、absolute 或者 fixed。

z-index 属性在下列情况下会失效：

- 元素没有设置 position 属性为非 static 属性，即没有设置定位。解决方式：设置该元素的 position 属性为 relative、absolute 或者 fixed 中的其中一种即可。

- 父元素 position 为 relative 时，子元素的 z-index 会失效。解决方式：父元素 position 改为 absolute 或 static。

- 元素在设置 z-index 的同时还设置了 float 浮动。解决方式：去除 float，改为 display：inline-block。

#### 常见的 CSS 布局单位

常用的布局单位包括像素（px）、百分比（%）、em、rem、vw/vh。

*1、*像素（px）是页面布局的基础，一个像素表示终端（电脑、手机、平板等）屏幕所能显示的最小区域，像素分为两种类型：CSS 像素和物理像素。

- CSS 像素：为 Web 开发这提供，在 CSS 中使用的一个抽象单位。

- 物理像素：只与设备的硬件（屏幕）密度有关，任何设备的物理像素都是固定的。

*2、*百分比（%）：当浏览器的宽度或者高度发生变化时，通过百分比单位可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果。一般认为子元素的百分比相对于直接父元素。

*3、*em 和 rem 相对于 px 更具灵活性，它们都是相对长度单位，它们之间的区别：**em 相对于父元素，rem 相对于根元素**。

- em：文本相对长度单位。相对于当前对象内文本的字体尺寸。即如果自身没有设置字体大小则相对于父元素的字体大小倍数，一层一层往上寻找，如果都没有人为设置行内文本的字体尺寸，则相对于浏览器的默认字体尺寸（默认 16px）。

- rem：rem 是 CSS3 新增的一个相对单位，相对于根元素（html 元素）的 font-size 的倍数。**作用**：利用 rem 可以实现简单的响应式布局，可以利用 html 元素中字体的大小与屏幕间的比值来设置 font-size 的值，以此实现当屏幕分辨率变化时让元素也随之变化。

- 使用 scss + rem 实现响应式方案：

```scss
/* scss实现方案 */

$baseDevice: 750; // 默认iphone6设计稿
$device: $baseDevice / 2; // 375 ，iphone6设备宽度
$baseFontSize: 100px;
@function px2rem($px, $base-font-size: $baseDevice / $device * $baseFontSize) {
  // unitless() 函数只是用来判断一个值是否带有单位，如果不带单位返回的值为 true，带单位返回的值为 false
  // unit() 函数主要是用来获取一个值所使用的单位，碰到复杂的计算时，其能根据运算得到一个“多单位组合”的值，不过只充许乘、除运算
  @if (unitless($px)) {
    @warn 'Assuming #{$px} to be in pixels';
    @return px2rem($px + 0px);
  } @else if (unit($px) == rem) {
    @return $px;
  }
  @return ($px / $base-font-size) * 1rem;
}

html {
  font-size: $baseFontSize;
}
@media screen and (min-width: 320px) {
  html {
    font-size: (320 / $device) * $baseFontSize;
  }
}
@media screen and (min-width: 360px) {
  html {
    font-size: (360 / $device) * $baseFontSize; // 96px
  }
}
@media screen and (min-width: 375px) {
  html {
    font-size: (375 / $device) * $baseFontSize; // 100px
  }
}
@media screen and (min-width: 480px) {
  html {
    font-size: (480 / $device) * $baseFontSize; // 128px
  }
}
@media screen and (min-width: 640px) {
  html {
    font-size: (640 / $device) * $baseFontSize;
  }
}
@media screen and (min-width: 750px) {
  html {
    font-size: (750 / $device) * $baseFontSize;
  }
}
// 示例使用
div {
  font-size: px2rem(
    28px
  ); // 750px的设计稿量出来是多少px就直接扔进去自动换算为rem
}
```

- 使用 less + rem 实现响应式方案：

```less
// 默认iphone6两倍设计稿
@baseDevice: 750;
// 375 ，iphone6设备宽度
@device: @baseDevice / 2;
@baseFontSize: 50px;

/**
  px转rem （混入的方式转换）
  @name: css属性名
  @px: 不带单位的px值
  使用方式：
    .px2rem(font-size, 14);
*/
.px2rem(@name, @px){
  @{name}: @px / @baseFontSize * 1rem;
}

/**
  px转rem （自定义函数的方式转换）
  使用方式（可加单位、也可不加单位）：
    font-size: ~`px2rem("14px")`;
    font-size: ~`px2rem(14)`;  // 推荐使用
    margin-left: ~`px2rem(-20)`; // 负数的使用
*/
.remMixin() {
  @functions: ~`(function() {
    var baseFontSize = 50;
    function convert(size) {
      return typeof size === 'string' ?
        +size.replace('px', '') : size;
    }
    this.px2rem = function(size) {
      return convert(size) / baseFontSize + 'rem';
    }
  })()`;
}
.remMixin();

html {
  font-size: @baseFontSize;
}
@media screen and (min-width: 320px) {
  html {
    font-size: (320 /  @device) * @baseFontSize;
  }
}
@media screen and (min-width: 360px) {
  html {
    font-size: (360 /  @device) * @baseFontSize; // 47px
  }
}
@media screen and (min-width: 375px) {
  html {
    font-size: (375 /  @device) * @baseFontSize; // 50px
  }
}
@media screen and (min-width: 480px) {
  html {
    font-size: (480 /  @device) * @baseFontSize; // 64px
  }
}
@media screen and (min-width: 640px) {
  html {
    font-size: (640 /  @device) * @baseFontSize;
  }
}
@media screen and (min-width: 750px) {
  html {
    font-size: (750 /  @device) * @baseFontSize;
  }
}
```

*4、*vw/vh 是与视图窗口有关的单位，vw 表示相对于视图窗口的宽度，vh 表示相对于视图窗口高度，除了 vw 和 vh 外，还有 vmin 和 vmax 两个相关的单位。

- vw：相对于视窗的宽度，视窗宽度是 100vw。

- vh：相对于视窗的高度，视窗宽度是 100vh。

- vmin：vw 和 vh 中的较小值。

- vmax：vw 和 vh 中的较大值。

*5、*vw/vh 于百分比的区别：

- 百分比（%）：大部分相对于祖先元素，也有相对于自身的情况比如（border-radius、translate 等）。

- vw/vh：相对于视窗的尺寸。

#### px、em、rem 的区别及使用场景

三者的区别：

- px 是固定像素，一旦设置就无法因为适应页面大小而改变。

- em 和 rem 相对于 px 更具灵活性，它们是相对长度单位，其长度不是固定的，更适用于响应式布局。

- em 是相对于其父元素来设置字体大小，这样就会存在一个问题，那就是进行任何元素的设置，都有可能需要知道它父元素的大小。而 rem 是相对于根元素，这样就意味着只需要在根元素确定一个参考值。

使用场景：

- 对于只需要适配少部分移动设备，且分辨率对页面影响不大的，使用 px 即可。

- 对于需要适配各种移动设备，使用 rem，例如需要适配 iPhone 和 iPad 等分辨率差别比较大的设备。

#### 如何根据设计稿进行移动端设配

移动端适配主要有两个维度：

- 适配不同像素密度：针对不同的像素密度，使用 CSS 媒体查询，选择不同精度的图片，以保证图片不会失真。

- 适配不同屏幕大小：由于不同的屏幕有着不同的逻辑像素大小，所以如果直接使用 px 作为开发单位，会使得开发的页面在某一款手机上可以精确显示，但是在另一款手机上就会失真。为了适配不同屏幕的大小，应按照比例来还原设计稿的内容。

为了能让页面的尺寸自适应，可以使用 rem、em、vw、vh 等相对单位。

#### 像素理论

**屏幕分辨率**：在横纵向上的像素点数，单位是 px，1px 等于 1 个像素点（这里的 1 像素指的是物理设备的 1 个像素点）。一般以`纵向像素 ✖️ 横向像素`来表示一个手机的分辨率，如：1960 \* 1080。

**像素密度**：像素密度也叫屏幕密度，指屏幕上每英寸可以显示的像素点的数量，单位是 `PPI`，即 "pixels per inch" 的缩写。像素越多，代表画面更细腻更清晰。如：视网膜屏就是指 PPI 比普通屏幕要高。

- PPI 是图像分辨率的单位，图像 PPI 值越高，画面的细节就越丰富，因为单位面积的像素数量更多。

- 屏幕像素密度与屏幕尺寸和分辨率有关。

**DPI**：指的是一个度量单位，用于点阵数码影像，指每一英寸长度中，取样、可显示或输出点的数目。这里说的点，类似打印的 "墨点"，打印成像是由这些墨点成线，线成面这样组合而成。

- DPI 是一个输出分辨率（打印分辨率），常用于描述打印机的打印精度，一般来说，DPI 值越高，表明打印机的打印精度越高。它表示每英寸所能打印的点数，即打印精度。

- 一般的激光打印机的输出分辨率是 300dpi-600dpi，印刷的照排机达到 1200dpi-2400dpi，常见的冲印一般在 150dpi 到 300dpi 之间。

- 图像的像素、打印分辨率和打印尺寸的关系为：`图像的横向（竖向）像素数 = 打印横向（竖向）分辨率 × 打印的横向（竖向）尺寸`。例如：要打印照片的尺寸是 4 \* 3inch，而打印分辨率横向和竖向都是 300dpi，则需要照相机采集的像素数至少为：`(300 * 4) * (300 * 3) = 1080000` 像素，约一百万像素。采集的像素数过低（采集图像机器的 PPI 决定）会降低图像的打印质量，过高也不能提升打印质量。

**物理像素**：物理像素也叫设备像素，简称 `DP`，是指设备屏幕实际 拥有的像素点，屏幕的基本单元，物理像素在屏幕出厂时就已经确定了，不会再改变。比如 MAC Pro 13.3 英寸（2560 x 1600）、iPhone XS 5.8 英寸（2436 x 1125）k，这里的数字 2560 x 1600 指的就是物理像素。

**逻辑像素**：逻辑像素也称为设备独立像素（CSS 像素），简称 `DIPS`，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素。在 CSS 中经常写的 px 就是逻辑像素，它和物理像素并不一定是一一对应的，物理像素和逻辑像素之间的对应关系会由 DPR 决定。

**DPR**：指设备像素比（`DPI = 物理像素/逻辑像素`），定义了物理像素和逻辑像素之间的关系。当 DPR 为 1 时，屏幕上的一个逻辑像素需要 1 \* 1 个物理像素来渲染，当 DPR 为 2 时，屏幕上的一个逻辑像素需要 2 \* 2 个物理像素来渲染，以此类推。DPR 越大需要的物理像素就越多，同时画面显示就越清晰和细腻。如下图显示一个 `width: 1px; height: 1px;` 的色块，在 DPR 不同的设备上，所需要的物理像素个数是不同的：

![dpr](dpr.png)

#### CSS 优化和提高性能的方法

加载性能：

- css 压缩：将写好的 css 进行打包压缩，可以减小文件体积。

- css 单一样式：尽量选择执行效率更高的写法。

- 尽量少使用 @import，建议使用 link，因为后者在页面加载时一起加载，前者是等待页面加载完成之后再进行加载。

选择器性能：

- 关键选择器（key selector）：选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）。CSS 选择符是从右到左进行匹配的，当使用后代选择器的时候，浏览器会遍历所有子元素来确定是否是指定的元素等等。

- 如果元素拥有 id 选择器作为其关键选择器，就不要为元素增加标签。过滤掉无关的元素，增加匹配效率。

- 避免使用通配规则，如 \*，这会导致计算次数惊人，只对需要用到的元素进行选择。

- 减少使用标签进行选择，尽量使用 class。

- 尽量少的使用后代选择器，降低选择器的权重值。后代选择器的开销是最高的，尽量将选择器的深度将到最低，最高不要超过三层，更多的使用类来关联每一个标签元素。

- 了解哪些属性是可以通过继承的来的，然后避免对这些属性重复指定规则。

渲染性能：

- 慎重使用高性能属性：浮动、定位等。

- 尽量减少页面重排、重绘。

- 去除空规则（`{}`）。空规则的产生原因一般来说是为了预留样式。去除这些空规则无疑是减少了 css 文档的体积。

- 属性值为 0 时，不加单位。

- 属性值为浮动小数（0.x）时，可以省略小数点之前的 0。

- 标准化各种浏览器前缀，带浏览器前缀在前，标准属性在后。

- 选择器优化嵌套，尽量避免层级过深。

- css 雪碧图，同一页面相近部分的小图标，方便使用，减少页面的请求次数，但是同时图片本身会变大，使用时，优劣考虑清楚，再使用。

- 正确使用 display 的属性，由于 display 的作用，某些样式组合会无效，徒增样式体积的同时也影响解析性能。

- 不滥用 web 字体。对于中文网站来说 WebFonts 可能很陌生，国外却很流行。web fonts 通常体积庞大，而且一些浏览器在下载 web fonts 时会阻塞页面渲染损伤性能。

可维护性、健壮性：

- 将具有相同属性的样式抽离出来，整合并通过 class 在页面中进行使用，提高 css 的可维护性。

- 样式与内容分离：将 css 代码定义到外部 css 中。

#### 对 Flex 布局的理解及其使用场景

Flex 是 FlexibleBox 的缩写，意为 "弹性布局"，用来为盒状模型提供最大的灵活性。任何一个容器都可以指定为 Flex 布局。行内元素也可以使用 Flex 布局。注意，**设为 Flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效**。采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称 "项目"。容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis），项目默认沿水平主轴排列。

设置在容器上（父元素）的 6 个属性：

- flex-direction 属性决定主轴的方向（即项目的排列方向）。

- flex-wrap 属性定义，如果一条轴线排不下，如何换行。

- flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap。

- justify-content 属性定义了项目在主轴上的对齐方式。

- align-items 属性定义项目在交叉轴上如何对齐。

- align-content 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

设置在项目上（子元素）的 6 个属性：

- order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。

- flex-grow 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。

- flex-shrink 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。

- flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。

- flex 属性是 flex-grow，flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。

- align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。

> 简单说明：flex 布局是 CSS3 新增的一种布局方式，可以通过将一个元素的 display 属性值设置为 flex 从而使它成为一个 flex 容器，它的所有子元素都会成为它的项目。一个容器默认有两条轴：一个是水平的主轴，一个是与主轴垂直的交叉轴。可以使用 flex-direction 来指定主轴的方向。可以使用 justify-content 来指定元素在主轴上的排列方式，使用 align-items 来指定元素在交叉轴上的排列方式。还可以使用 flex-wrap 来规定当一行排列不下时的换行方式。对于容器中的项目，可以使用 order 属性来指定项目的排列顺序，还可以使用 flex-grow 来指定当排列空间有剩余的时候，项目的放大比例，还可以使用 flex-shrink 来指定当排列空间不足时，项目的缩小比例。

#### 响应式设计的概念及基本原理

响应式网站设计（Responsive Web design）是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。

基本原理：通过媒体查询 `@media` 查询检测不同的设备屏幕尺寸做处理。

关于兼容：页面头部必须有 mate 声明的 viewport。

```html
<meta
  name="’viewport’"
  content="”width=device-width,"
  initial-scale="1."
  maximum-scale="1,user-scalable=no”"
/>
```

#### 水平垂直居中的实现

*1、*利用绝对定位，先将元素的左上角通过 top:50% 和 left:50% 定位到页面的中心，然后再通过 translate 来调整元素的中心点到页面的中心。该方法需要考虑浏览器兼容问题。

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

*2、*利用绝对定位，设置四个方向的值都为 0，并将 margin 设置为 auto，由于宽高固定，因此对应方向实现平分，可以实现水平和垂直方向上的居中：

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
```

- 注意：该方法只适用于**盒子有宽高**的情况。

*3、*利用绝对定位，先将元素的左上角通过 top:50% 和 left:50% 定位到页面的中心，然后再通过 margin 负值来调整元素的中心点到页面的中心：

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px; /* 自身 height 的一半 */
  margin-left: -50px; /* 自身 width 的一半 */
}
```

- 注意：该方法只适用于**盒子有宽高**的情况。

*4、*使用 flex 布局，通过 align-items:center 和 justify-content:center 设置容器的垂直和水平方向上为居中对齐，然后它的子元素也可以实现垂直和水平的居中。该方法要考虑兼容的问题，该方法在移动端用的较多：

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

#### 两栏布局的实现

一般两栏布局指的是左边一栏宽度固定，右边一栏宽度自适应，两栏布局的具体实现：

- 利用浮动，将左边元素宽度设置为 200px，并且设置向左浮动。将右边元素的 margin-left 设置为 200px，宽度设置为 auto（默认为 auto，撑满整个父元素）：

```css
.parent {
  height: 100px;
}
.left {
  float: left;
  width: 200px;
  background: pink;
}
.right {
  margin-left: 200px;
  width: auto;
  background: yellow;
}
```

- 利用浮动，左侧元素设置固定大小，并左浮动，右侧元素设置 overflow: hidden; 这样右边就触发了 BFC，BFC 的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠：

```css
.left {
  width: 100px;
  height: 200px;
  background: red;
  float: left;
}
.right {
  height: 300px;
  background: blue;
  overflow: hidden;
}
```

- 利用 flex 布局，将左边元素设置为固定宽度 200px，将右边的元素设置为 flex:1：

```css
.parent {
  display: flex;
  height: 100px;
}
.left {
  width: 200px;
  background: pink;
}
.right {
  flex: 1;
  background: yellow;
}
```

- 利用绝对定位，将父级元素设置为相对定位。左边元素设置为 absolute 定位，并且宽度设置为 200px。将右边元素的 margin-left 的值设置为 200px：

```css
.parent {
  position: relative;
  height: 100px;
}
.left {
  position: absolute;
  width: 200px;
  height: 100px;
  background: pink;
}
.right {
  margin-left: 200px;
  background: yellow;
}
```

- 利用绝对定位，将父级元素设置为相对定位。左边元素宽度设置为 200px，右边元素设置为绝对定位，左边定位为 200px，其余方向定位为 0：

```css
.parent {
  position: relative;
  height: 100px;
}
.left {
  width: 200px;
  background: pink;
}
.right {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 200px;
  background: yellow;
}
```

#### 三栏布局的实现

三栏布局一般指的是页面中一共有三栏，左右两栏宽度固定，中间自适应的布局，三栏布局的具体实现：

- 利用绝对定位，左右两栏设置为绝对定位，中间设置对应方向大小的 margin 的值。

```css
.outer {
  position: relative;
  height: 100px;
}

.left {
  position: absolute;
  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 100px;
  background: gold;
}

.center {
  margin-left: 100px;
  margin-right: 200px;
  height: 100px;
  background: lightgreen;
}
```

- 利用 flex 布局，左右两栏设置固定大小，中间一栏设置为 flex:1：

```css
.outer {
  display: flex;
  height: 100px;
}

.left {
  width: 100px;
  background: tomato;
}

.right {
  width: 100px;
  background: gold;
}

.center {
  flex: 1;
  background: lightgreen;
}
```

- 利用浮动，左右两栏设置固定大小，并设置对应方向的浮动。中间一栏设置左右两个方向的 margin 值，注意这种方式 **中间一栏必须放到最后**：

```css
.outer {
  height: 100px;
}

.left {
  float: left;
  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  float: right;
  width: 200px;
  height: 100px;
  background: gold;
}

.center {
  height: 100px;
  margin-left: 100px;
  margin-right: 200px;
  background: lightgreen;
}
```

- 圣杯布局，利用浮动和负边距来实现。父级元素设置左右的 padding，三列均设置向左浮动，中间一列放在最前面，宽度设置为父级元素的宽度，因此后面两列都被挤到了下一行，通过设置 margin 负值将其移动到上一行，再利用相对定位，定位到两边：

```css
.outer {
  height: 100px;
  padding-left: 100px;
  padding-right: 200px;
}

.left {
  position: relative;
  left: -100px;

  float: left;
  margin-left: -100%;

  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  position: relative;
  left: 200px;

  float: right;
  margin-left: -200px;

  width: 200px;
  height: 100px;
  background: gold;
}

.center {
  float: left;

  width: 100%;
  height: 100px;
  background: lightgreen;
}
```

- 双飞翼布局，双飞翼布局相对于圣杯布局来说，左右位置的保留是通过中间列的 margin 值来实现的，而不是通过父元素的 padding 来实现的。本质上来说，也是通过浮动和外边距负值来实现的：

```css
.outer {
  height: 100px;
}

.left {
  float: left;
  margin-left: -100%;

  width: 100px;
  height: 100px;
  background: tomato;
}

.right {
  float: left;
  margin-left: -200px;

  width: 200px;
  height: 100px;
  background: gold;
}

.wrapper {
  float: left;

  width: 100%;
  height: 100px;
  background: lightgreen;
}

.center {
  margin-left: 100px;
  margin-right: 200px;
  height: 100px;
}
```

#### 如何实现一个三角形

CSS 绘制三角形主要用到的是 border 属性，也就是边框。

- 实现方向指向下方的三角：

```css
div {
  width: 0;
  height: 0;
  border-top: 50px solid red;
  border-right: 50px solid transparent;
  border-left: 50px solid transparent;
}
```

- 实现方向指向上方的三角：

```css
div {
  width: 0;
  height: 0;
  border-bottom: 50px solid red;
  border-right: 50px solid transparent;
  border-left: 50px solid transparent;
}
```

- 实现方向指向右方的三角：

```css
div {
  width: 0;
  height: 0;
  border-left: 50px solid red;
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
}
```

- 实现方向指向左方的三角：

```css
div {
  width: 0;
  height: 0;
  border-right: 50px solid red;
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
}
```

- 实现方向指向左上方的三角：

```css
div {
  width: 0;
  height: 0;
  border-top: 100px solid red;
  border-right: 100px solid transparent;
}
```

> css 实现三角形总体的原则就是通过上下左右边框来控制三角形的方向，用边框的宽度比来控制三角形的角度。

#### 如何实现一个扇形

用 CSS 实现扇形的思路和三角形基本一致，就是多了一个圆角的样式，实现一个 90° 的扇形：

```css
div {
  border: 100px solid transparent;
  width: 0;
  heigt: 0;
  border-radius: 100px;
  border-top-color: red;
}
```

#### 如何实现一个宽高自适应的正方形

利用 vw 来实现：

```css
.square {
  width: 10%;
  height: 10vw;
  background: tomato;
}
```

利用元素的 margin/padding 百分比是相对父元素 width 的性质来实现：

```css
.square {
  width: 20%;
  height: 0;
  padding-top: 20%;
  background: orange;
}
```

利用子元素的 margin-top 的值来实现：

```css
.square {
  width: 30%;
  overflow: hidden;
  background: yellow;
}
.square::after {
  content: "";
  display: block;
  margin-top: 100%;
}
```

#### 如何画一条 0.5px 的线

采用 transform: scale() 的方式，该方法用来定义元素的 2D 缩放转换：

```css
transform: scale(0.5, 0.5);
```

采用 meta viewport 的方式：

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5"
/>
```

> 这种方式如果是 1px 那么就会变成 0.5px。但是 viewport 只针对于移动端，所以只在移动端上才能看到效果

#### 设置小于 12px 的字体

在谷歌下 css 设置字体大小为 12px 及以下时，显示都是一样大小，都是默认 12px。解决方式如下：

- 使用 Webkit 的内核的 `-webkit-text-size-adjust` 的私有 CSS 属性来解决，只要加了`-webkit-text-size-adjust:none;` 字体大小就不受限制了。但是 chrome 更新到 27 版本之后就不可以用了。所以**高版本 chrome 谷歌浏览器已经不再支持 -webkit-text-size-adjust 样式**，所以要使用时候慎用。

- 使用 css3 的 transform 缩放属性 `-webkit-transform:scale(0.5)`，注意-webkit-transform:scale(0.75) 收缩的是整个元素的大小，这时候，如果是内联元素，必须要将内联元素转换成块元素，可以使用 display：block ｜ inline-block。

- 使用图片：如果是内容固定不变情况下，使用将小于 12px 文字内容切出做图片，这样不影响兼容也不影响美观。

#### 如何解决 1px 问题

1px 问题指的是：在一些 Retina 屏幕 的机型上，移动端页面的 1px 会变得很粗，呈现出不止 1px 的效果。原因很简单，就是 CSS 中的 1px 并不能和移动设备上的 1px 划等号。它们之间的比例关系有一个专门的属性来描述：

```
window.devicePixelRatio = 设备的物理像素 / CSS像素。
```

打开 Chrome 浏览器，启动移动端调试模式，在控制台去输出这个 devicePixelRatio 的值。这里选中 iPhone6/7/8 这系列的机型，输出的结果就是 2。这就意味着设置的 1px CSS 像素，在这个设备上实际会用 2 个物理像素单元来进行渲染，所以实际看到的一定会比 1px 粗一些。

解决 1px 问题的三种思路：

*1、*直接写 0.5px：

可以先在 JS 中拿到 window.devicePixelRatio 的值，然后把这个值通过 JSX 或者模板语法给到 CSS 的 data 里，达到这样的效果（这里用 JSX 语法做示范）：

```js
<div id="container" data-device="{{window.devicePixelRatio}}"></div>
```

然后就可以在 CSS 中用属性选择器来命中 devicePixelRatio 为某一值的情况，比如说这里尝试命中 devicePixelRatio 为 2 的情况：

```css
#container[data-device="2"] {
  border: 0.5px solid #333;
}
```

> 直接把 1px 改成 1/devicePixelRatio 后的值，这是目前为止最简单的一种方法。这种方法的缺陷在于兼容性不行，IOS 系统需要 8 及以上的版本，安卓系统则直接不兼容。

*2、*伪元素先放大后缩小：

这个方法的可行性会更高，兼容性也更好。唯一的缺点是代码会变多。

思路是先放大、后缩小：在目标元素的后面追加一个 ::after 伪元素，让这个元素布局为 absolute 之后、整个伸展开铺在目标元素上，然后把它的宽和高都设置为目标元素的两倍，border 值设为 1px。接着借助 CSS 动画特效中的放缩能力，把整个伪元素缩小为原来的 50%。此时，伪元素的宽高刚好可以和原有的目标元素对齐，而 border 也缩小为了 1px 的二分之一，间接地实现了 0.5px 的效果。

```css
#container[data-device="2"] {
  position: relative;
}
#container[data-device="2"]::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  transform: scale(0.5);
  transform-origin: left top;
  box-sizing: border-box;
  border: 1px solid #333;
}
```

*3、*使用 viewport 缩放解决：

这个思路就是对 meta 标签里几个关键属性下手：

```html
<meta
  name="viewport"
  content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no"
/>
```

这里针对像素比为 2 的页面，把整个页面缩放为了原来的 1/2 大小。这样，本来占用 2 个物理像素的 1px 样式，现在占用的就是标准的一个物理像素。根据像素比的不同，这个缩放比例可以被计算为不同的值，用 js 代码实现如下：

```js
const scale = 1 / window.devicePixelRatio;
// 这里 metaEl 指的是 meta 标签对应的 Dom
metaEl.setAttribute(
  "content",
  `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`
);
```

> 这种方式副作用比较大，整个页面被缩放了。这时 1px 已经被处理成物理像素大小，这样的大小在手机上显示边框很合适。但是，一些原本不需要被缩小的内容，比如文字、图片等，也被无差别缩小掉了。

### JavaScript

#### JS 有哪些数据类型，它们的区别

js 共有八种数据类型，分别是 undefined、null、string、number、boolean、Symbol、Object、bigint。

其中 Symbol 和 bigint 是 ES6 新增的数据类型：

- Symbol：代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题。

- bigint：是一种数字类型的数据，它可以表示任意精度格式的整数，使用 bigint 可以安全的存储和操作大整数，即使这个数已经超出了 number 能够表示的额安全整数范围。

这些数据类型可以分为原始数据类型和引用数据类型：

- 栈中存储：原始数据类型（number、string、boolean、undefined、null）。

- 堆中存储：引用数据类型（Object、Array、Function）。

两种数据类型的区别在于存储位置不同：

- 原始数据类型是直接存储在栈中的简单数据段，占据空间小，大小固定，属于被频繁使用的数据，所以放入栈中存储。

- 引用数据类型是存储在堆中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能，引用数据类型在栈中存储了指针，该指针执行堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

堆和栈的概念存在于数据结构和操作系统内存中，在数据结构中：

- 在数据结构中，栈中数据的存取方式为先进后出。

- 堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。

在操作系统中，内存被分为栈区和堆区：

- 栈区内存由编译器自东分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。

- 堆区内存一般由开发者分配释放，若开发之不释放，程序结束时可能有垃圾回收机制回收。

#### 为什么会有 bigint

js 中 Number.MAX_SAFF_INTEGER 表示最大安全数字，计算结果是 9007199254740991，即在这个数范围内不会出现精度丢失（小数除外）。但是一旦超过这个范围，js 就会出现计算不准确的情况，这在大数计算的时候不得不依靠一些第三方库进行解决，因此官方提出了 bigint 来解决此问题。

#### 数据类型检测的额方式有哪些

*1、*typeof:

```js
console.log(typeof 2); // number
console.log(typeof true); // boolean
console.log(typeof "str"); // string
console.log(typeof []); // object
console.log(typeof function () {}); // function
console.log(typeof {}); // object
console.log(typeof undefined); // undefined
console.log(typeof null); // object
```

> 使用 typeof 的判断方式除了数组、对象、null 会判断为 object 之外，其它都能准确判断，其中包含 Function。

*2、*instanceof：

instanceof 可以准确判断对象的类型，其内部运行机制是判断在其原型链中能否找到该类型的原型。

```js
console.log(2 instanceof Number); // false
console.log(true instanceof Boolean); // false
console.log("str" instanceof String); // false

console.log([] instanceof Array); // true
console.log(function () {} instanceof Function); // true
console.log({} instanceof Object); // true
```

> 可以看到，**instanceof 只能准确判断引用数据类型**，而不能判断基本数据类型。instanceof 运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。

*3、*constructor：

```js
console.log((2).constructor === Number); // true
console.log(true.constructor === Boolean); // true
console.log("str".constructor === String); // true
console.log([].constructor === Array); // true
console.log(function () {}.constructor === Function); // true
console.log({}.constructor === Object); // true
```

constructor 有两个作用，一是判断数据的类型，二是对象实例通过 constructor 对象访问它的构造函数。需要注意的是，如果创建一个对象来改变它的原型，constructor 就不能用来判断数据类型了：

```js
function Fn() {}

Fn.prototype = new Array();

const f = new Fn();

console.log(f.constructor === Fn); // false
console.log(f.constructor === Array); // true
```

*4、*Object.prototype.toString.call()：

Object.prototype.toString.call() 使用 Object 对象的原型方法 toString 来判断数据类型：

```js
const a = Object.prototype.toString;

console.log(a.call(2)); // [object Number]
console.log(a.call(true)); // [object Boolean]
console.log(a.call("str")); // [object String]
console.log(a.call([])); // [object Array]
console.log(a.call(function () {})); // [object Function]
console.log(a.call({})); // [object Object]
console.log(a.call(undefined)); // [object Undefined]
console.log(a.call(null)); // [object Null]
```

同样是检测对象 obj 调用 toString 方法，obj.toString() 的结果和 Object.prototype.toString.call(obj)的结果不一样，这是为什么？

- 这是因为 toString 是 Object 的原型方法，而 Array、function 等类型作为 Object 的实例，都重写了 toString 方法。不同的对象类型调用 toString 方法时，根据原型链的知识，调用的是对应的重写之后的 toString 方法（function 类型返回内容为函数体的字符串，Array 类型返回元素组成的字符串…），而不会去调用 Object 上原型 toString 方法（返回对象的具体类型），所以采用 obj.toString()不能得到其对象类型，只能将 obj 转换为字符串类型；因此，在想要得到对象的具体类型时，应该调用 Object 原型上的 toString 方法。

#### 判断数组的方法

通过 Object.prototype.toString.call() 判断：

```js
Object.prototype.toString.call(obj).slice(8, -1) === "Array";
```

通过原型链做判断：

```js
obj.__proto__ === Array.prototype;
```

通过 ES6 的 Array.isArray()做判断：

```js
Array.isArrray(obj);
```

通过 instanceof 做判断：

```js
obj instanceof Array;
```

通过 Array.prototype.isPrototypeOf：

```js
Array.prototype.isPrototypeOf(obj);
```

#### intanceof 操作符的实现原理及实现

instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置：

```js
function myInstanceof(left, right) {
  // 获取对象的原型
  let proto = Object.getPrototypeOf(left);
  // 获取构造函数的 prototype 对象
  let prototype = right.prototype;

  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    // 如果没有找到，就继续从其原型上找，Object.getPrototypeOf方法用来获取指定对象的原型
    proto = Object.getPrototypeOf(proto);
  }
}
```

#### typeof NaN 的结果是什么

NaN 指 "不是一个数字"（not a number），NaN 是一个 "警戒值"（sentinel value，有特殊用途的常规值），用于指出数字类型中的错误情况，即 "执行数学运算没有成功，这是失败后返回的结果"：

```js
typeof NaN; // "number"
```

> NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 x === x 不成立）的值。而 NaN !== NaN 为 true。

#### isNaN 和 Number.isNaN 函数的区别

函数 isNaN 接收参数后，会尝试将这个参数转换为数值，**任何不能被转换为数值的的值都会返回 true**，因此非数字值传入也会返回 true ，会影响 NaN 的判断。

函数 Number.isNaN 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，**不会进行数据类型的转换**，这种方法对于 NaN 的判断更为准确。

#### 其他值到字符串的转换规则

null 和 undefined 类型，null 转换为 "null"，undefined 转换为 "undefined"。

boolean 类型，true 转换为 "true"，false 转换为 "false"。

number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。

Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。

对普通对象来说，除非自行定义 toString() 方法，否则会调用 Object.prototype.toString(）来返回内部属性 [[Class]] 的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会调用该方法并使用其返回值。

#### 其他值到数字值的转换规则

undefined 类型的值转换为 NaN。

null 类型的值转换为 0。

boolean 类型的值，true 转换为 1，false 转换为 0。

string 类型的值转换如同使用 Number() 函数进行转换，**如果包含非数字值则转换为 NaN，空字符串为 0**。

对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。

> - 为了将值转换为相应的基本类型值，抽象操作 ToPrimitive 会首先（通过内部操作 DefaultValue）检查该值是否有 valueOf()方法。如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString() 的返回值（如果存在）来进行强制类型转换。
>
> - 如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。

#### 其他值到布尔类型的值的转换规则

以下这些是假值：undefined、null、false、+0、-0、NaN、""。

假值的布尔强制类型转换结果为 false。从逻辑上说，假值列表以外的都应该是真值。

#### == 操作符的强制类型转换规则

对于 == 来说，如果对比双方的类型不一样，就会进行类型转换。假如对比 x 和 y 是否相同，就会进行如下判断流程：

1. 首先会判断两者类型是否相同，相同的话就比较两者的大小。

2. 类型不相同的话，就会进行类型转换。

3. 会先判断是否在对比 null 和 undefined，是的话就会返回 true。

4. 判断两者类型是否为 string 和 number，是的话就会将字符串转换为 number。

```js
1 == '1' => 1 == 1
```

5. 判断其中一方是否为 boolean，是的话就会把 boolean 转为 number 在进行判断。

```js
'1' == true => '1' == 1 => 1 == 1
```

6. 判断其中一方是否为 object，且另一方为 string、number 或者 symbel，是的话就会把 object 转为原始类型再进行判断。

```js
'1' == {name: 'dnhyxc'} => '1' == '[object Object]'
```

#### Object.is() 与 ‘===’、'==' 的区别

使用 '==' 进行相等判断时，如果两边的类型不一致，则会进行强制类型转换后再进行比较。

使用 '===' 进行相等比较时，如果两边的类型不一致时，不会做强制类型转换，直接返回 false。

使用 Object.is() 来进行相等判断时，一般情况下和三等运算符的判断相同，它处理了一些特殊情况，比如 '-0' 和 '+0' 是不相等的，两个 NaN 是相等的。

```js
Object.is("foo", "foo"); // true
Object.is(window, window); // true

Object.is("foo", "bar"); // false
Object.is([], []); // false

const foo = { a: 1 };
const bar = { a: 1 };
Object.is(foo, foo); // true
Object.is(foo, bar); // false

Object.is(null, null); // true

// 特例
Object.is(0, -0); // false
Object.is(0, +0); // true
Object.is(-0, -0); // true
Object.is(NaN, 0 / 0); // true
Object.is(NaN, NaN); // true
```

#### || 和 && 操作符的返回值

|| 和 && 首先会对第一个操作数执行条件判断，如果其不是布尔值就先强制转换为布尔类型，然后再执行条件判断。

- 对于 || 来说，如果条件判断结果为 true 就返回第一个操作数的值，如果为 false 就返回第二个操作数的值。

- && 则相反，如果条件判断结果为 true 就返回第二个操作数的值，如果为 false 就返回第一个操作数的值。

|| 和 && 返回它们其中一个操作数的值，而非条件判断的结果。

#### 什么是 JS 中的包装类型

在 js 中，基本类型是没有属性和方法的，但是为了便于操作基本类型的值，在调用基本类型的属性或方法时 JS 会在后台隐式地将基本类型的值转换为对象，如下：

```js
const a = "abc";
console.log(a.length); // 3
console.log(a.toUpperCase()); // 'ABC'
```

在访问 `'abc'.length` 时，js 将 'abc' 在后台转换成 `String('abc')`，然后再访问其 length 属性。

js 也可以使用 Object 函数显示的将基本类型转化为包装类型：

```js
const a = "abc";
console.log(Object(a)); // String {'abc'}
```

js 还可以使用 **valueOf** 方法将包装类型倒转成基本类型：

```js
const a = "abc";
const b = Object(a);
const c = b.valueOf();
console.log(c); // 'abc'
```

使用 `new Boolean(false)` 包装 boolean 类型如：false，但是 false 被包裹成包装类型后就成为了对象，所以将其转为布尔值为 true，因此其非值为 false。因此如下代码不会进入 if 判断：

```js
const a = new Boolean(false);
if (!a) {
  console.log(a);
}
```

#### object.assign 与扩展运算符

扩展运算符：

```js
const outObj = {
  inObj: { a: 1, b: 2 },
};
let newObj = { ...outObj };
newObj.inObj.a = 2;
console.log(outObj); // {inObj: {a: 2, b: 2}}
```

Object.assign()：

```js
let outObj = {
  inObj: { a: 1, b: 2 },
};
let newObj = Object.assign({}, outObj);
newObj.inObj.a = 2;
console.log(outObj); // {inObj: {a: 2, b: 2}}
```

由上述示例可以看出，两者都是浅拷贝：

- 扩展运算符：在使用扩展运算符时，数组会对象中的每一个值都会被拷贝到一个新的数组或对象中。它不复制继承的属性或类的属性，但是它会复制 ES6 的 symbol 属性。

- Object.assign()：该方法接收的第一个参数作为目标对象，后面的所有参数作为源对象。然后把所有的源对象合并到目标对象中。它会修改对象，因此会触发 ES6 的 setter。

#### 扩展运算符的使用场景

*1、*对象扩展运算符：

对象扩展运算符用于取出对象中的所有可遍历属性，拷贝到当前对象中：

```js
let bar = { a: 1, b: 2 };
let baz = { ...bar }; // { a: 1, b: 2 }
```

上述方法实际等价于：

```js
let bar = { a: 1, b: 2 };
let baz = Object.assign({}, bar); // { a: 1, b: 2 }
```

Object.assign 方法用于对象的合并，将源对象的所有可枚举属性，复制到目标对象中。Object.assign 方法的第一个参数是目标对象，后面的参数都是源对象（**如果目标对象与源对象具有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性**）。同样，如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性也会被覆盖掉。

```js
let bar = { a: 1, b: 2 };
let baz = { ...bar, ...{ a: 2, b: 4 } }; // {a: 2, b: 4}
```

利用上述特性就可以很方便的修改对象的部分属性。在 redux 中 reducer 函数规定必须是一个纯函数，reducer 中的 state 对象要求不能直接修改，可以通过扩展运算符把修改路径的对象都复制一遍，然后产生一个新的对象返回。

需要注意：**扩展运算符对对象实例的拷贝属于浅拷贝**。

*2、*数组扩展运算符：

数组的扩展运算符可以将一个数组转为用逗号分隔的参数序列，且每次只能展开一层数组。

```js
console.log(...[1, 2, 3]); // 1 2 3
console.log(...[1, [2, 3, 4], 5]); // 1 [2, 3, 4] 5
```

数组扩展运算符的应用：

- 将数组转为参数序列：

```js
function add(x, y) {
  return x + y;
}
const numbers = [1, 2];
add(...numbers); // 3
```

- 复制数组：

```js
const arr1 = [1, 2];
const arr2 = [...arr1];
```

> 注意：扩展运算符用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中，这里参数对象是个数组，数组里面的所有对象都是基础数据类型，将所有基础数据类型重新拷贝到新的数组中。

- 合并数组：

```js
const arr1 = ["two", "three"];
const arr2 = ["one", ...arr1, "four", "five"]; // ["one", "two", "three", "four", "five"]
```

- 扩展运算符与结构赋值结合起来，用于生成数组：

```js
const [first, ...rest] = [1, 2, 3, 4, 5];

console.log(first); // 1
console.log(rest); // [2, 3, 4, 5]
```

> 注意：如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则将会报错，如 `const [...rest, last] = [1, 2, 3, 4, 5]; // 报错`，`const [first, ...rest, last] = [1, 2, 3, 4, 5]; // 报错`。

- 将字符串转为真正的数组：

```js
[..."hello"]; // [ "h", "e", "l", "l", "o" ]
```

- 任何 Iterator 接口的对象，都可以用扩展运算符转为真正的数组，比较常见的应用是可以将某些数据结构转为数组：

```js
// arguments对象
function foo() {
  const args = [...arguments];
}
```

> 用于替换 ES5 中的 Array.prototype.slice.call(arguments)写法。

- 使用 Math 函数获取数组中特定的值：

```js
const numbers = [9, 4, 7, 1];
Math.min(...numbers); // 1
Math.max(...numbers); // 9
```

#### 如何提取高度嵌套的对象里的指定属性

有时会遇到一些嵌套程度非常深的对象：

```js
const school = {
  classes: {
    stu: {
      name: "Bob",
      age: 24,
    },
  },
};
```

像此处的 name 这个变量，嵌套了四层，此时如果仍然尝试老方法来提取它，显然不是奏效的，因为 school 这个对象本身是没有 name 这个属性的，name 位于 school 对象的 "儿子的儿子" 对象里面。要想把 name 提取出来，一种比较笨的方法是逐层结构：

```js
const { classes } = school;
const { stu } = classes;
const { name } = stu;
console.log(name); // 'Bob'
```

由上述代码可见，写法过于冗余，相对于上述写法，还有一种更标准的做法，即可以用一行代码来解决这个问题：

```js
const {
  classes: {
    stu: { name },
  },
} = school;

console.log(name); // 'Bob'
```

#### ES6 字符串处理

存在性判定：在过去，当判断一个字符/字符串是否在某字符串中时，只能用 `indexOf > -1` 来实现。现在 ES6 提供了三个方法：`includes、startsWith、endsWith`，它们都会返回一个布尔值来告诉你是否存在。

- includes：判断字符串与子串的包含关系：

```js
const son = "haha";
const father = "xixi haha hehe";
father.includes(son); // true
```

- startsWith：判断字符串是否以某个/某串字符开头：

```js
const father = "xixi haha hehe";
father.startsWith("haha"); // false
father.startsWith("xixi"); // true
```

- endsWith：判断字符串是否以某个/某串字符结尾：

```js
const father = "xixi haha hehe";
father.endsWith("hehe"); // true
```

自动重复：可以使用 repeat 方法来使同一个字符串输出多次（被连续复制多次）：

```js
const sourceCode = "repeat for 3 times;";
const repeated = sourceCode.repeat(3);
console.log(repeated); // repeat for 3 times;repeat for 3 times;repeat for 3 times;
```

#### let、const、var 的区别

**块级作用域**：块级作用域由 `{}` 包括，let 和 const 具有块级作用域，var 不存在块级作用域。块级作用域解决了 ES5 中的两个问题：

- 内层变量可能覆盖外层变量的问题。

- 用来计数的循环变量泄露为全局变量。

**变量提升**：var 存在变量提升，let 和 const 不存在变量提升，即在变量只能在声明之后使用，否则会报错。

**给全局添加属性**：浏览器的全局对象是 window，Node 的全局对象是 global。var 声明的变量为全局变量，并且会将该变量添加为全局对象（window）的属性，但是 let 和 const 不会。

**重复声明**：var 声明的变量可以进行重复声明，后声明的同名变量会覆盖之前声明的变量。而 const 和 let 不允许重复声明变量。

**暂时性死区**：使用 let、const 命令声明某个变量时，在该变量声明之前，其都是不可用的。这在语法上，称为 “暂时性死区”。使用 var 声明的变量不存在暂时性死区。

```js
console.log(a, "before"); // 此时该变量不可用，有暂时性死区，将报错
let a = 209; // 或 const a = 209
console.log(a, "after"); // 209

console.log(b, "before"); // undefined
var b = 902;
console.log(b, "after"); // 902
```

**初始值设置**：在变量声明时，var 和 let 可以不用设置初始值。而 const 声明变量必须设置初始值。

**指针指向**：let 和 const 都是 ES6 新增的用于创建变量的语法。let 创建的变量是可以更改指针指向的，即可以重复赋值。但 const 声明的变量是不允许更改指针指向的，即不能重新赋值。

- const 保证的并不是变量的值不能改动，而是变量指向的那个内存地址不能改动。对于基本类型的数据，其值就保存在变量指向的那个内存地址中，因此等同于常量。

- 对于引用数据类型（Object，Array）来说，变量指向的内存地址，保存的只是一个指针，const 只能保证这个指针是固定不变的，至于它指向的数据结构是不是可变的，就完全不能控制了。

#### 箭头函数与普通函数的区别

*1、*箭头函数比普通函数更加简洁：

- 如果没有参数，就直接写一个空括号即可。

- 如果只有一个参数，即可以省略参数的括号。

- 如果有多个参数，用逗号分隔，参数括号不能省略。

- 如果函数体的返回值只有一句，可以省略大括号。

- 如果函数体不需要返回值，且只有一句话，可以给这个语句前面加一个 void 关键字。最常见的就是调用一个函数：

```js
const fn = () => void doesNotReturn();
```

*2、*箭头函数没有自己的 this：

- 箭头函数不会创建自己的 this，所以它没有自己的 this，它只会在自己作用域上一层继承 this。所以箭头函数中 this 的指向在它定义时已经确定了，之后不会改变。

*3、*箭头函数继承来的 this 永远不会改变：

```js
var id = "GLOBAL";
var obj = {
  id: "OBJ",
  a: function () {
    console.log(this.id);
  },
  b: () => {
    console.log(this.id);
  },
};
obj.a(); // 'OBJ'
obj.b(); // 'GLOBAL'
new obj.a(); // undefined
new obj.b(); // Uncaught TypeError: obj.b is not a constructor
```

> 对象 obj 的方法 b 是一个箭头函数，这个函数中的 this 就永远指向它定义时所在的全局执行环境中的 this（window），即便这个函数是作为对象 obj 的方法调用，但是 this 依旧指向 window 对象。需要注意的是：定义对象的大括号 `{}` **是无法形成一个单独的执行环境的**，它依旧是处于全局执行环境中。

*4、*call()、apply()、bind() 不能改变箭头函数中 this 的指向：

```js
var id = "Global";
let fun1 = () => {
  console.log(this.id);
};
fun1(); // 'Global'
fun1.call({ id: "Obj" }); // 'Global'
fun1.apply({ id: "Obj" }); // 'Global'
fun1.bind({ id: "Obj" })(); // 'Global'
```

*5、*箭头函数没有自己的 arguments：

- 在箭头函数中访问 arguments 实际上获得的是它外层函数的 arguments 值。

*6、*箭头函数没有 prototype 属性。

*7、*箭头函数不能作为构造函数使用：

- 由于箭头函数没有自己的 prototype 属性及 this 属性，所以无法执行 new。

*8、*箭头函数不能用作 Generator 函数，不能使用 yeild 关键字。

#### 如果 new 箭头函数会怎样

箭头函数它没有自己 prototype 属性，也没有自己的 this 指向，更不可以使用 arguments 参数，所以不能所以不能 new 箭头函数。

new 操作符的实现步骤如下：

1. 创建一个对象。

2. 将构造函数的作用域赋给新对象（也就是将对象的 \_\_proto\_\_ 属性指向构造函数的 prototype 属性）。

3. 改变 this 的指向（使构造函数中的 this 指向新创建的实例对象），执行构造函数、传递参数，fn.apply() 或者 fn.call()。

4. 返回新的对象。

> 由于构造函数没有 prototype 属性及自己的 this 属性，所以上述 3、4 步骤箭头函数都无法执行。

实现一个 new 的伪代码如下：

```js
function Dog(name) {
  this.name = name;
  this.say = function () {
    console.log("name = " + this.name);
  };
}

function Cat(name) {
  this.name = name;
  this.say = function () {
    console.log("name = " + this.name);
  };
}

function _new(fn, ...arg) {
  const obj = {}; // 创建一个新的对象
  obj.__proto__ = fn.prototype; // 把obj的__proto__指向fn的prototype,实现继承
  fn.apply(obj, arg); // 改变this的指向
  return Object.prototype.toString.call(obj) === "[object Object]" ? obj : {}; // 返回新的对象obj
}

//测试1
var dog = _new(Dog, "aaa");
dog.say(); //'name = aaa'
console.log(dog instanceof Dog); //true
console.log(dog instanceof Cat); //false
//测试2
var cat = _new(Cat, "bbb");
cat.say(); //'name = bbb'
console.log(cat instanceof Cat); //true
console.log(cat instanceof Dog); //false
```

#### Map 和 Object 的区别

意外的键：

- Map 默认情况不包含任何键，只包含显示插入的键。

- Object 有一个原型，原型链上的键名有可能和自己在对象上的设置的键名产生冲突。

键的类型：

- Map 的键可以任意值，包括函数、对象或任意基本类型。

- Object 的键必须是 String 或是 Symbol。

键的顺序：

- Map 的键可以是任意值，包括函数、对象或任意基本类型。

- Object 的键是无序的。

size：

- Map 的键值对个数可以轻易地通过 size 属性获取。

- Object 的键值对个数只能手动计算。

迭代：

- Map 是 iterable 的，所以可以直接被迭代。

- 迭代 Object 需要以某种方式获取它的键然后才能迭代。

性能：

- 在频繁增删键值对的场景下表现更好。

- 在频繁添加和删除键值对的场景下未做出优化。

#### Map 和 weakMap 的区别

*1、*Map 数据结构：

Map 本质上就是键值对的集合，但是普通的 Object 中的键值对中的键只能是字符串。而 ES6 提供的 Map 数据结构类似于对象，但是它的键不限制范围，可以是任意类型，是一种更加完善的 Hash 结构。如果 Map 的键是一个原始数据类型，只要两个键严格相同，就视为是同一个键。

实际上 Map 是一个数组，它的每一个数据也都是一个数组，其形式如下：

```js
const map = [
  ["name", "张三"],
  ["age", 18],
];
```

Map 数据结构有以下操作方法：

- size：`map.size` 返回 Map 结构的成员总数。

- set(key, value)：设置键名 key 对应的键值 value，然后返回整个 Map 结构，如果 key 已经有值，则键值会被更新，否则就新生成该键。

- get(key)：该方法读取 key 对应的键值，如果找不到 key，返回 undefined。

- has(key)：该方法返回一个布尔值，表示某个键是否在当前 Map 对象中。

- delete(key)：还方法删除某个键，返回 true，如果删除失败，返回 false。

- clear()：map.clear() 清除所有成员，没有返回值。

Map 结构原生提供是三个遍历器生成函数和一个遍历方法：

- keys()：返回键名的遍历器。

- values()：返回键值的遍历器。

- entries()：返回所有成员的遍历器。

- forEach()：遍历 Map 的所有成员。

```js
const map = new Map([
  ["foo", 1],
  ["bar", 2],
]);
for (let key of map.keys()) {
  console.log(key); // foo bar
}
for (let value of map.values()) {
  console.log(value); // 1 2
}
for (let items of map.entries()) {
  console.log(items); // ["foo",1]  ["bar",2]
}
map.forEach((value, key, map) => {
  console.log(key, value); // foo 1    bar 2
});
```

*2、*WeakMap 数据结构：

WeakMap 对象也是一组键值对的集合，其中的键是弱引用的。其**键必须是对象**，原始数据类型不能作为 key 值，而值可以是任意的。

该对象也有以下几种方式：

- set(key, value)：设置键名 key 对应的键值 value，然后返回整个 WeakMap 结构，如果 key 已经有值，则键值会被更新，否则就新生成该键（因为返回的是当前 WeakMap 对象，所以可以链式调用）。

- get(key)：该方法读取 key 对应的键值，如果找不到 key，返回 undefined。

- has(key)：该方法返回一个布尔值，表示某个键是否在当前 WeakMap 对象中。

- delete(key)：该方法删除某个键，返回 true，如果删除失败，返回 false。

> 其 clear()方法已经被弃用，所以可以通过创建一个空的 WeakMap 并替换原对象来实现清除。

WeakMap 的设计目的在于，有时想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。一旦不再需要这两个对象，就必须手动删除这个引用，否则垃圾回收机制就不会释放对象占用的内存。

而 WeakMap 的**键名所引用的对象都是弱引用**，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的**键名对象和所对应的键值对会自动消失，不用手动删除引用**。

简单总结：

- Map 数据结构它类似于对象，也是键值对的集合，但是 "键" 的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

- WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。但是 WeakMap 只接受对象作为键名（null 除外），不接受其他类型的值作为键名。而且 WeakMap 的键名所指向的对象，不计入垃圾回收机制。

#### JavaScript 内置对象

全局的对象（global objects）或称标准内置对象，不要和 "全局对象（global object）" 混淆。这里说的全局的对象是说在全局作用域里的对象。全局作用域中的其它对象可以由用户的脚本创建或由宿主程序提供。

标准内置对象的分类：

1. 值类型：这些全局属性返回一个简单值，这些值没有自己的属性和方法。例如 infinity、NaN、undefined、null 字面量。

2. 函数类型：全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后将结果直接返回给调用者。例如：eval()、parseFloat()、parseInt() 等。

3. 基本对象：基本对象是定义或使用其它对象的基础。基本对象包括一般对象、函数对象和错误对象。例如：Object、Function、Boolean、Symbol、Error 等。

4. 数字和日期对象：用来表示数字、日期和执行数学计算的对象。例如 Number、Math、Date。

5. 字符串：用来表示和操作字符串的对象。例如：String、RegExp。

6. 可索引的集合对象：这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及数组结构的对象。例如：Array。

7. 使用键的集合对象：这些集合对象在存储数据时会使用到键，支持按照插入顺序来迭代元素。 例如 Map、Set、WeakMap、WeakSet。

8. 矢量集合：SIMD 矢量集合中的数据会被组织为一个数据序列。 例如 SIMD 等。

9. 结构化数据：这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON 编码的数据。例如 JSON 等。

10. 控制抽象对象：例如 Promise、Generator 等。

11. 反射：例如 Reflect、Proxy。

12. 国际化：为了支持多语言处理而加入 ECMAScript 的对象。例如 Intl、Intl.Collator 等。

13. WebAssembly。

14. 其它：例如 arguments。

> js 中的内置对象主要指的是在程序执行前存在全局作用域里的由 js 定义的一些全局值属性、函数和用来实例化其他对象的构造函数对象。一般经常用到的如全局变量值 NaN、undefined，全局函数如 parseInt()、parseFloat() 用来实例化对象的构造函数如 Date、Object 等，还有提供数学计算的单体内置对象如 Math 对象。

#### 数组的原生方法

数组和字符串的转换方法：`toString()、toLocalString()、join()` 其中 join() 方法可以指定转换为字符串时的分隔符。

数组尾部操作的方法 `pop() 和 push()`，push 方法可以传入多个参数。

数组首部操作的方法 `shift() 和 unshift()` 重排序的方法 `reverse() 和 sort()`，sort() 方法可以传入一个函数来进行比较，传入前后两个值，如果返回值为正数，则交换两个参数的位置。

数组连接的方法 `concat()`，返回的是拼接好的数组，**不影响原数组**。

数组截取办法 `slice()`，用于截取数组中的一部分返回，**不影响原数组**。

数组插入方法 `splice()`，**影响原数组**查找特定项的索引的方法，`indexOf() 和 lastIndexOf() 迭代方法 every()、some()、filter()、map() 和 forEach()` 方法。

数组归并方法 `reduce() 和 reduceRight()` 方法。

#### JS 脚本延迟加载的方式

延迟加载就是等页面加载完成之后再加载 js 文件。js 延迟加载有助于提高页面加载速度。一般有以下几种方式：

- **defer 属性**：给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步进行，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染 bubei 阻塞。多个设置了 defer 属性的脚本按照规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。

- **async 属性**：给 js 脚步添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞页面解析。多个 async 属性的脚本的执行顺序是不可预判的，一般不会按照代码的顺序依次执行。

- **动态创建 DOM 方式**：动态创建 DOM 标签的方式，可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。

- **使用 setTimeout 延迟方法**：设置一个定时器来延迟加载 js 脚本文件。

- **让 js 最后加载**：将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。

#### 函数

#### this

#### 闭包

#### 执行上下文

#### 原型/原型链

#### 作用域/作用域链

#### 异步

#### 单线程

#### 异步队列

#### 回调函数

#### Generator

#### Proxy 可以实现什么功能

大纲 https://juejin.cn/post/6996841019094335519#heading-10

css 篇 https://juejin.cn/post/6905539198107942919

js 篇 https://juejin.cn/post/6940945178899251230
