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

##### 可继承的属性

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

#### BFC

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

BFC 的作用：

- **解决 margin 的重叠问题**：由于 BFC 是一个独立的区域，内部的元素和外部的元素互不影响，将两个元素变为两个 BFC，就解决了 margin 重叠的问题。

- **解决高度塌陷的问题**：在对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为 0。要解决这个问题，只需要把父元素变成一个 BFC。常用的方法是给父元素设置 `overflow: hidden`。

- **创建自适应两栏布局**：可以用来创建自适应两栏布局：左边的宽度固定，右边的宽度自适应。

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

1、父子之间重叠，为底部盒子开启 BFC 即可，如下：

- 底部元素变为行内块元素：`display：inline-block`。

- 底部元素设置浮动：`float`。

- 底部元素的 position 的值为：`absolute/fixed`。

2、父子之间重叠：

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

1、像素（px）是页面布局的基础，一个像素表示终端（电脑、手机、平板等）屏幕所能显示的最小区域，像素分为两种类型：CSS 像素和物理像素。

- CSS 像素：为 Web 开发这提供，在 CSS 中使用的一个抽象单位。

- 物理像素：只与设备的硬件（屏幕）密度有关，任何设备的物理像素都是固定的。

2、百分比（%）：当浏览器的宽度或者高度发生变化时，通过百分比单位可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果。一般认为子元素的百分比相对于直接父元素。

3、em 和 rem 相对于 px 更具灵活性，它们都是相对长度单位，它们之间的区别：**em 相对于父元素，rem 相对于根元素**。

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

4、vw/vh 是与视图窗口有关的单位，vw 表示相对于视图窗口的宽度，vh 表示相对于视图窗口高度，除了 vw 和 vh 外，还有 vmin 和 vmax 两个相关的单位。

- vw：相对于视窗的宽度，视窗宽度是 100vw。

- vh：相对于视窗的高度，视窗宽度是 100vh。

- vmin：vw 和 vh 中的较小值。

- vmax：vw 和 vh 中的较大值。

5、vw/vh 于百分比的区别：

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

**物理像素**：物理像素也叫设备像素，简称 `DP`，是指设备屏幕时机拥有的像素点，屏幕的基本单元，物理像素在屏幕出厂时就已经确定了，不会再改变。比如 MAC Pro 13.3 英寸（2560 x 1600）、iPhone XS 5.8 英寸（2436 x 1125），这里的数字 2560 x 1600 指的就是物理像素。

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

### JavaScript

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

大纲 https://juejin.cn/post/6996841019094335519#heading-10

css 篇 https://juejin.cn/post/6905539198107942919
