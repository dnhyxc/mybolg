---
title: interviewAnswers
tags: answers
date: 2020-09-02 02:09:11
# keywords: 博客文章密码
# password: dnhyxc
# abstract: 该博文可能涉及技术泄密及收费内容，如需查看请与我联系获取访问密码
---

#### 对原型的理解

创建函数时，每个函数都默认会有一个 prototype 显示原型属性，而每个实例对象都会有一个 proto 隐式原型属性。实例对象的隐式原型等于构造函数的显示原型 prototpe。我们可以通过构造函数的 prototype.constructor 指回构造函数本身。

原型链就是通过对象的隐式原型属性 proto 形成的，比如在一个对象中寻找某个属性，当自身上没有的时候，就会通过 proto 去找它的上级，直到找到大写的 Object 的显示原型，如果还没有找到就会返回 null。因为大写 Object 是原型链的尽头。它的隐式原型属性指向的是 null。

可以利用函数的原型实现公共的属性和方法，降低代码的耦合性。

#### 对执行上下文的理解

执行上下文分为全局执行上下文和函数执行上下文。全局执行上下文 js 代码即将执行的时候就会确认 window 为全局执行上下文。函数执行上下文是在函数即将执行的时候确定的。当确定函数执行上下文时，就会确立 arguments 对象，进行形参赋值，变量提升，确定 this 指向等操作。

<!-- more -->

#### 对作用域的理解

作用域分为全局作用域和函数作用域，作用域是在代码书写的时候就确定了。

作用域的作用就是能够隔离变量，防止同一作用域中的同名变量产生冲突。

#### 对闭包的理解

闭包就是一个前套的内部函数，形成闭包的条件就是通过函数嵌套、同时在内部函数中引用外部函数中的某个变量。

闭包的作用主要就是能够延长变量的作用范围，使我们能够在函数外部访问到函数内部的变量。

#### 对 const、let、var 的理解

var 声明的变量会存在变量提升，并且会挂载到 window 上，而其它两个不会。同时 var 能在同一作用域中声明多个同名的变量，而其它两个不行。

const 跟 let 的区别主要就是 const 声明的变量一旦声明就必须要给它赋值，并且对于一般数据类型来说，一旦赋值，就不能重新在赋值，但是对于引用数据类型来说，可以改变里面的属性值。而 let 声明的变量可以不立马赋值，同时也能重新赋值。

const 和 let 声明的变量都会产生块级作用域。

#### 对事件循环机制的理解

js 代码自身而下运行的过程中，同步代码会在执行栈中同步执行，如果遇到异步代码就会先将它们放入到 WebApi 中等待触发，一旦触发就会将它们推入到任务队列中等待执行，等到同步代码执行完毕之后，就会将任务队列中微任务压入执行栈中执行，在微任务全部执行完以后再执行宏任务，如果宏任务中还有微任务，就会等里面的微任务执行完以后再重新执行宏任务。宏任务主要包含定时器，ajax 请求，IO 事件等等，微任务主要就是 Promise。

#### 关于函数继承的理解

函数继承有原型链继承，就是通过实例的隐式原型等于构造函数的显示原型来实现。它的缺点就是继承的实例不能传递参数，同时不能访问构造函数原型中定义的属性和方法。

组合式继承，就是通过原型继承加 call 方法来实现。这种方式的缺点就是会让构造函数调用两次，在创建实例的时候会执行一次，call 的时候还会执行一次。

寄生式组合继承，这种方式是通过一个间接的空函数来实现的。让空函数的 prototype 等于需要被继承的构造函数的 prototype。

#### 对设计模式的理解

主要就是单例模式，主要的作用就是让每次函数执行返回的都是同一个对象。可以通过闭包来实现。

```js
const single = (function () {
  let data = null;
  function createData() {
    return {
      name: "dnhyxc",
    };
  }
  function getData() {
    if (data === null) {
      data = createData();
    }
    return data;
  }
})();
```

发布订阅模式，像 react 中的 content 上下文就是通过发布订阅模式实现的，还有就是 connect 也是。这个可以通过 Map 数据结构实现，监听就是通过 get 方法查询是否存在这个需要监听的属性，如果没有就用 set 创建一个。发布就是通过 get 方法去获取基本监听的属性，如果查到了就去调用。

#### 对克隆的理解

浅克隆的话就是当在克隆一个对象的时候，改了克隆出来的这个对象里面某个属性值会影响到原对象。主要可以通过 assign 方法、结构、赋值等方式实现。

深克隆的话就是可以使用 JSON.parse(JSON.stringify(data)) 来实现。但是这个方式有个弊端就是它不能克隆像正则、函数、Date 等数据，会返回 undefined。比较全面的方式就是使用递归来实现。

```js
function deepClone(obj) {
  const cloneData = new obj.constructor();
  if (obj === null) return null;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== "object") return obj;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneData[key] = deepClone(obj[key]);
    }
  }
  return cloneData;
}
```

#### promise 具体实现方式

#### 对 js 数据类型的理解

js 基本数据类型主要有：string、number、boolean、null、undefined、symbol。

引用数据类型主要就是：object、array、function 等等。

#### 数据类型的判断

判断基本数据类型使用 typeof，除了判断 null 返回 object 以外，其它都能正确返回，还能判断 function。

instanceof 能判断引用数据类型，判断左边是否是右边的实例。

Object.prototype.toString.call(obj) 能判断所有的类型。

#### 发生类型转换的情况

发生类型转换的情况主要有：使用 == 运算符、+ 运算符、逻辑运算符、if 条件判断等等都会进行逻辑判断。

#### 如何进行数组扁平化

数组扁平化可以使用 flat() 方法、或者 arr.toString().split(',').map(i => +i)、或者 [].concat.apply + some 等等。

#### js 给元素设置样式的方法

通过 style 属性、给元素添加 className、或者 setAttribute 等实现。

#### 如何向页面插入元素

使用 appendChild 向父元素中的兄弟节点之后插入元素、insertBefore()向兄弟元素之前插入元素。

#### DOM 事件流

DOM 事件流有捕获阶段、目标阶段、冒泡阶段。其中捕获阶段是从跟节点逐级向下传播的过程、事件冒泡是从目标元素逐级向上传播的过程。

#### css 盒子模型

css 盒模型分为 IE 盒模型和标准盒模型，IE 盒模型的内容大小是包括 border 和 padding 的，而标准盒模型则不包括。可以通过 box-sizing 设置标准盒模型为 IE 盒模型。

#### 防抖节流

防抖就是只执行对后触发的那一次操作。节流就是规定时间内只执行一次。

```js
// 节流函数
function debounce(fn, delay) {
  let timer;
  return function () {
    const arg = [...arguments];
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimerout(() => {
      fn.apply(this, arg);
    }, delay);
  };
}

// 节流函数
function throttle(fn, delay) {
  let waittime;
  return function () {
    if (!waittime) {
      waittime = setTimeout(() => {
        fn();
        waittime = null;
      }, delay);
    }
  };
}
```

#### get 和 post 的区别

get 和 post 最大的区别就是传参方式的不同，get 是将参数放在 url 中，而 post 是将参数放在 body 中。其次就是 get 只发送一个包，而 post 是发送两个包，第一个包会先将 header 发送过去确定服务端是否有能力处理这次请求，等服务端返回 100 之后再将 data 发送过去。

#### Set 和 Map 的区别

Set 是类似于数组的数据结构，其中的属性都是唯一的，如果属性相同就会进行覆盖。有 get、set、add、clear、delete 等方法。

Map 是类似于对象的数据结构，它跟普通对象最大的区别就是它是可迭代的，而普通对象需要迭代还需要进行相应的处理。还有就是 Map 里面保存的键值对都是有序的，而普通对象是没有顺序的。

#### mouseover 与 mouseenter 的区别

mouseover 在鼠标进入目标元素或者其子元素都会触发，而 mouseenter 只有在鼠标进入目标元素是才会触发，进入子元素不会触发。

#### http 和 https

http 是建立在应用层之上的一个超文本传输协议，信息是明文传输的。就 http1.0 来说，它的优点是：快速便捷、扩展性强、无状态。缺点是，http1.0 无法复用连接、完成即断开、重新启动慢、存在对头阻塞等问题。而 http2.0 的就这些问题进行了相应的处理，首先它能支持首部压缩、允许多路复用、支持二进制分帧，解决的对头阻塞等问题。

https 是基于 http 与 ssl 实现的可进行机密传输和身份认证的网络协议。相比 http 来说会更安全，但它需要与证书。https 的机制就是在建立连接的过程中采用非对称加密，而在传输数据的时候采用的是对称加密，因为对称加密传输数据的效率要比非对称加密的效率要高。

非对称加密的原理就是客户端先发送请求给服务端，服务端就收到请求在响应中返回公钥，客户端接收到以后使用这个公钥进行加密对称加密的密码，然后发送这个加过迷的密码给服务端，接收到之后就会响应给客户端，此时以建立连接，客户端就采用对称加密的方式用这个加密过的对称加密的密码进行加密数据传输给服务端。

中间人攻击就是当客户端首次发送请求到服务端时，中间人截取服务端的公钥，给客户端返回它自己的公钥，然后客户端用这个中间人的公钥进行加密对称加密的密码，中间人用自己的私钥进行解密拿到对称加密的密码，之后用服务端给的公钥对这个密码进行加密，传给服务端，再将拿到的服务端的这个响应发送给客户端。这个时候就成功的骗过了服务端，建立了连接。这样每次客户端发送的数据，中间人都能通过它自己的私钥进行解密，然后用服务端的公钥进行加密发送给服务端获取数据。达到串改数据的目的。这个时候就需要第三方发布的证书了。

#### http 状态码

200 系列表示成功。

300 系列表示重定向，301 表示永久重定向，302 表示临时重定向。

400 系列表示客户端错误。

500 系列表示服务端错误。

#### 浏览器缓存

浏览器有强缓存和协商缓存。

如果命中了强缓存，浏览器则不会发送请求到服务端，直接使用缓存中的数据。

- 强缓存是通过服务端在响应头里面返回 Expires（GMT 时间格式个字符串），如果在这个时间之前，就会命中强缓存。或者使用 Cache-Control 来实现的，该值是利用 max-age 判断缓存的生命周期，是以秒为单位，如过在生命周期时间内，则命中缓存。

如果命中了协商缓存，浏览器会发送请求到服务端，服务器会判断浏览器缓存是否失效，如果失效就返回新的数据，如果没有失效，服务端就不会返回数据，浏览器直接从缓存中获取数据。

- 协商缓存也是在第一次发送请求的时候，服务端会在响应头中返回 Etag 或者 Last-Modified 来实现，Etag 的方式服务器会通过请求头中的 If-None-Match 是否与 Etag 一致，如果一致，就不会给返回数据，还是用缓存中的，如果不一致就会返回新的 etag，以及数据。Last-Modified 的方式服务端通过 If-Modified-Since 来比较两个时间，进行判断。

- ETag 解决了 Last-Modified 使用时可能出现的资源的时间戳变了但内容没变及如果再一秒钟以内资源变化但 Last-Modified 没变的问题（因为 Last-Modified 无法精确到毫秒），感觉 ETag 更加稳妥。

#### fetch 与 ajax 的区别

fetch 默认不带 cookie，可以发送带凭证的请求解决该问题。使用 credentials:'same-origin'来处理。

fetch 返回错误的 http 状态码不会 reject，可以在第一层 then 方法里面抛出异常解决。

fetch 没有设置超时时间，解决这个问题可以通过 promise 进行封装。通过 setTimeout 设置超时时间解决。

fetch 可以终止请求，可以通过给 fetch 传递一个参数 signal: controller.signal，它是中止控制器 AbortController 的一个实例，方式如下：

```js
var controller = new AbortController();
var signal = controller.signal;

var downloadBtn = document.querySelector('.download');
var abortBtn = document.querySelector('.abort');

downloadBtn.addEventListener('click', fetchVideo);

abortBtn.addEventListener('click', function() {
  controller.abort();
  console.log('Download aborted');
});

function fetchVideo() {
  ...
  fetch(url, {signal}).then(function(response) {
    ...
  }).catch(function(e) {
    reports.textContent = 'Download error: ' + e.message;
  })
}
```

#### 元素垂直居中的方式

知道宽高的情况采用定位加 margin 实现，不知道宽高的情况采用定位加 transform 实现，或者采用 flex 实现。

#### 什么是 BFC

BFC 是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局。BFC 就是一个块级元素，块级元素会在垂直方向一个接一个的排列，它是页面中的一个隔离的独立容器，容器里的标签不会影响到外部标签，垂直方向的距离由 margin 决定， 属于同一个 BFC 的两个相邻的标签外边距会发生重叠，计算 BFC 的高度时，浮动元素也参与计算。

触发 BFC 的条件：

- overflow: hidden

- display: inline-block

- position: absolute

- position: fixed

- display: table-cell

- display: flex

使用 BFC 能解决使用 Float 脱离文档流，高度塌陷的问题、解决 Margin 边距重叠以及解决两栏布局。

#### 重绘和回流

重绘是在改变元素的颜色，不改变元素的结构的情况下回触发重绘。

回流是在改变元素位置，结构大小的时候就会触发回流。

#### new 运算符的执行过程

生成一个新的对象，将构造函数的显示原型与新建的这个对象的隐式原型相对应，确定 this 指向，返回这个新建的对象。

#### 箭头函数

箭头函数没有自己的 this，它的 this 指向它定义时所在作用域中的 this，它没有 arguments 对象和 prototype 属性，因此它不能使用 new 创建实例。

#### 从输入 url 到页面展示的过程

首先会进行 DNS 解析获取到对应的 IP 地址，然后经过三次握手建立 TCP 连接，发送请求获取响应数据，在拿到数据之后，浏览器解析 html，遇到 html 标签就调用 html 引擎解析成 DOM 树，遇到 css 就调用 css 引擎解析成 cssOM 树，遇到 js 就调用 js 引擎解析 js 代码，用户修改 DOM 树或者 cssOM 树，之后将 DOM 树与 cssOM 树进行合并形成渲染树，然后通过渲染树计算出元素在页面中的位置，及各元素的颜色，最终绘制在屏幕上。之后断开 TCP 连接，这个过程就结束了。

#### map、filter、forEach 的区别

map、filter 与 forEatch 的区别于，前面两个都有返回值，而 forEach 没有返回值。map 是返回一个全新的数组，而 filter 是返回符合条件的数组。

#### localStorage、sessionStorage、cookie、session、token 的区别

loaclStorage 与 sessionStorage 大小大概为 5M，前者储存的数据除非手动清除，否则一直会存在。而 sessionStorage 存储的数据会在页面关闭时清除。

cookie 保存在服务端，每次发送请求时，会携带在请求头中，大小大概为 4kb 左右，可以设置过期时间，主要用于验证用户登录。

session 保存在服务端，里面包含了用户的认证信息和登陆状态。

token 是一种认证方式方式，一般存在 cookie 中。它的验证方式当用户登陆成功时返回 token 给客户端，客户端将它存储到 cookie 中，当在此发送请求时，将它携带在请求头中，服务端判断传递过来的 token 是否有效，有效就会正常返回数据，否则就返回错误通知。

#### websocket

websocket 是一种双工通信，不受同源限制影响。它分为两个阶段，分别是握手阶段和数据传输阶段，握手阶段是基于 http 协议的。

通过 new websocket(url) 创建 ws 对象，该对象 onopen 方法，在这个方法中可以使用 send 方法发送消息给服务端，接着在 onmessage 方法中接受服务端发送的数据，还有 onclose 方法，这个方法可以关闭连接，还有 onerror 方法，会在连接出错时触发。

在 onopen 方法中可以进行心跳检测，在设定的时间内，如果客户端没有接收到服务端的消息，就判断为断开连接，同时触发 onclose 事件，同时在 onclose 事件中进行重连。

#### 对 promise 的理解

promise 是解决异步编程的一种方案，其中有三种状态，分别是：pending、resolved、rejected，一旦状态发生变化就不能再重新更改。

在成功的情况下会调用 resolve 方法，失败就调用 reject 方法，通过 then 方法获取返回的结果。还可以通过 catch 方法捕获抛出的异常。

当存在需要同时发送多个请求，且需要在这几个请求都成功时，才进行下一步操作时，可以使用 promise.all 方法，这个方法只有在所有的请求成功的情况下，才会返回成功的结果，只要其中一个失败了，就返回失败的结果。

当需要同时发送多个请求，但不在意成功或失败时，就可以使用 promise.race 方法，获取最先完成的请求。

#### webpack 性能优化

项目中主要用的就是使用 dll 进行单独打包。把 antd、react、这些库进行单独打包，之后的每次打包都不需要再重新打包了。

常用的 loader 有：css-loader、less-loader 用于处理 css 样式的，使用 url-loader 和 html-loader 处理图片资源，因为 url-loader 无法处理 html 文件中直接引入的图片文件，所以需要使用 html-loader 采用 commonJs 的方式引入供 url-loader 进行处理，但是需要先关闭 url-loader 的 ES6 模块化解析。file-loader 用于处理文件资源。比如在页面中引入 xxx.png，就是通过 file-loader 进行处理的。还有就是 babel-loader 用于对 js 文件资源进行处理。ts-loader 用于处理 ts。style-loader 是将 js 代码插入到 head 中生效。如果是移动端的饿话可以配置 px2rem-loader，然后在项目入口 js/ts 文件中引入 lib-flexible。

常用的 plugin 有：htmlWebpackPlugin 用来实现对 html 文件的打包、MiniCssExtractPlugin 用来实现将 css 资源文件单独打包、OptimizeCssAssetsWebpackPlugin 用来实现对 css 文件资源的压缩。

#### 为什么不能在 render 中调用 setState

因为 render 它是一个纯函数，不允许进行副作用的操作。

#### react 生命周期

react 生命周期分为：实例话阶段、更新阶段、卸载阶段。

实例化阶段触发的生命周期主要有：

- constructor 主要用于初始化 state 和 props。

- getDerivedStateFromProps 根据父组件传递过来的 props 按需更新自身的 state。

- componentDidmount 组件挂载完毕，可以在这里发送请求。

更新阶段主要有：

- getDerivedStateFromProps 根据父组件传递过来的 props 按需更新自身的 state。

- shouldComponentUpdate 主要用来优化性能防止不必要的更新。

- getSnapshotBeforeUpdate 在更新之前获取一次快照，返回值会作为接下来的 componentDidUpdate 的第三个参数。

- componentDidUpdate 这里更新已经完成了。

卸载阶段：

- componentWillUnmount：主要用来清除一些副作用的操作。取消订阅之类的。

捕获异常：

- componentDidCatch。

#### react 受控组件与非受控组件

#### setState 是同步还是异步的

- 在合成事件或者钩子函数中表现为异步，而在原生事件与定时器中表现为同步，因为在原始事件与定时器中 setState 会在更新之前执行。可以在 setState 的第二个参数，就是回调函数中拿到更新后的结果。

#### react 中 keys 的作用

keys 是 react 用于追踪哪些列表中元素被修改、被添加或者被移除的标识。react 通过 key 值来判断一个元素是新创建的还是移动过来的，从而减少不必要的元素渲染。其实就是用来优化 diff 算法的。

#### react 中 refs 的作用

是 react 提供的用来操作原生 DOM 一种方式。

#### 为什么虚拟 DOM 能提高性能

虚拟 DOM 相当于在 js 和真实 DOM 中间加了一个缓存，利用 DOM diff 算法避免了没有必要的 DOM 操作，从而提高性能。具体就是在缓存中用 js 对象结构表示 DOM 树的结构，然后用这个树构建一棵真正的 DOM 树插入到文档中。

#### 调用 setState 之后发生了什么

#### react 性能优化

类组件的化使用 shouldComponentUpdate 实现不必要的渲染。或者使用 pureComponent 会对接收到的 props 进行浅比较，也能达到优化的目的。

函数组件可以使用 React.memo 到达效果。还可以使用 useCallback 和 useMemo。

#### react 中如何实现组件间的通信

父传子组件中使用 props 进行通信，子传父就用用回调函数。如果传的层级比较深的话可以使用 Context 上下文的方式。还有就是 redux，或者借用第三方库 events 进行通信了。

#### 对 redux 的理解

redux 是一个集中式管理状态的第三方库。其的特点是：单向数据流、单一数据源，状态是只读的，如果需要更该状态，唯一的途径就是使用其中的 reducer 这个纯函数进行更改。项目中用的主要是 react-redux。

react-redux 具体操作就是通过 Provider 将 store 传递下去，然后在组件中通过 connect 这个方法中的 mapStateToProps 获取 state，以及通过 mapStateDispatchToProps 去将 action 作为 props 绑定到组件上。之后就通过 dispatch 去触发 reducer 中监听的 type 属性，然后根据 type 去触发对应的逻辑。

#### 虚拟 DOM 是什么

虚拟 DOM 就是一个用 js 表示 DOM 元素的对象。里面有 type 表示节点名称，props 表示节点属性，children 表示子节点。

#### diff 算法的原理

diff 算法是对前后虚拟 DOM 采用递归的方式进行比较，然后返回一个补丁对象，用来存储两个节点之间的差异，然后将差异更新到真实 DOM 上。主要就是通过 type 和 key 进行比较看节点是需要插入还是删除，还是只是位置替换。如果 type 或者 key 其中一个不一样就会删除该节点重新创建。

#### connect 的原理

就是通过发布订阅的方式在入口使用 Provider 将 store 传递下去，然后将 mapStateToProps 和 mapDispatchToProps 返回的 state 和 dispatch 传递给 UI 组件。

#### react-router 的理解

它里面的 Router 是路由最外层的容器组件，用于保持 UI 和 URL 的同步，他有两种形式，分别是 hashRouter 和 browserRouter，项目中用的比较多的还是 browserRouter，它是通过 history 中的 pushState 和 replaceState 实现的。主要存在的问题就是要服务端进行配合，否则切换路由的时候可能会有 404 找不到页面的情况。

#### react hooks

hooks 主要解决的问题就是让函数组件也能有自己的状态。

常用的 hooks 主要有：

- useState：用户更新状态，类似 class 中的 setState。

- useEffect：这个主要适用于做一些副作用的操作，比如发送请求之类的，那能在这里面清除副作用的操作，取消定时器，取消订阅之类的。同时根据依赖项看是否需要更新。

- useCallback：主要用来进行一些性能的优化，防止不必要的渲染。他返回的是一个记忆函数，也能传依赖项，初始化的时候会调用一次，之后会根据依赖项的变化进行调用。

- useMemo：主要用来进行一些复杂的运算，返回的是计算后的结果，其他的基本跟 useCallback 类似。

- useContext：用户组件间的通信。

- useRef：主要用于操作 DOM。

#### es6 的语法有哪些

扩展运算符、promise、模版字符串、Set/Map 数据结构等等。

#### react 原理

react 之后采用的是 fiber 架构，而之前的架构采用的是递归的方式，一旦开始了是不能终端的，如果超过了浏览器的刷新频率，就会造成页面卡顿的情况。而 fiber 架构是可中断的，当浏览器空余时间内还有剩余时间，就交给 react 控制，没有就还给浏览器渲染页面。这就提高了性能，不会产生卡顿的情况。

它分为 Scuduler、reconciler、renderer 三个阶段。Scuduler 就用于任务的调度，高优先级的操作会优先进入 reconciler 阶段。reconciler 阶段主要就是找出 DOM 区别，这里面主要的就是调用 render 之后，会触发 performuniowork 方法，然后根据传入的 DOM 节点调用 benginWork 去递归形成 Fiber 树，其中会调用 diff 算法找出差异，然后会调用 completeWork 为每个有变化的节点打上副作用的标记。这个副作用是以链表的形式存在的，通过 nextEffect 来指向下一个副作用节点。这个时候就产生了一颗带有副作用的 DOM 树。

之后就会进入到 mutation 阶段，mutation 阶段会遍历整个 effectList，然后对这个副作用链表分别进行响应的操作。然后将这些更新渲染到视图中。其中会有三个阶段：

- 就是 before mutation 阶段，在这个阶段回调用 getSnapshotBeforeUpdate 钩子，还会对 useEffect 进行调度。

- 然后就是 mutation 阶段，会对变化的文本进行更新，然后更新 ref 之类的，在这里会调用 componentWillUnmount 钩子。

- 之后进入到 layout 阶段，这个阶段主要做的事情就是回去调用 componentDidmount 和 componentDidUpdate，还有 useEffect。将这几个钩子里面的更新渲染到页面中。

#### TS内置的类型

string、number、boolean、null、undefined、any、never、void、enum、
