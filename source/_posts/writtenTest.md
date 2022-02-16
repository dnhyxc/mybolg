---
title: Interview
date: 2021-03-18 13:50:50
tags: interview
toc: true
declare: true
categories:
  - JavaScript
---

### JS 概念相关

#### js 数据类型

1，基本数据类型：

- string、number、boolean、null、undefined、symbol。

2，引用数据类型：

- object、array、function 等。

#### js 类型转换

1，转换为字符串：使用 **String()/toString()** 方法，也可以使用引号或加法运算符进行隐式转换。

2，转换为数据类型：使用 **Number()** 方法，或 **parseInt()/parseFloat()** 方法。

<!-- more -->

- 使用 Number() 方法对**引用数据**类型进行转换时，首先会将其**转换为字符串类型**，再将其转为数字类型，而在转换的过程中，只要字符串中出现了非数字字符，其转换结果就是 NaN。

- 使用 parseInt()/parseFloat() 方法进行转换时，也会先将其转换为字符串，然后从左往右依次寻找数字字符，遇到非数字字符就停止寻找，然后将找到的数据字符传为数字类型，如果一个都没找到，就会返回 NaN。

3，将基本数据类型转为数字时：布尔值 true 为 1，false 为 0，null 为 0，undefined 为 NaN，空数组为 0，空对象为 NaN，symbol 不允许转换。

#### 数据类型判断

##### typeof

1，typeof 检测对象，除了函数是 function 类型之外。像常见的数组，对象或者是正则，日期等等都是 object。

2，typeof 检测对象的特殊场景如下：

```js
typeof Symbol(); // 'symbol'
typeof null; // object
typeof undefined; // undefined
```

> typeof null 检测输出 object 因为 js 最初版本，使用的是 32 位系统，类型的标签存储在每个单元的低位中 000 是 object 类型。null 全是 0，所以当我们使用 typeof 进行检测的时候 js 错误的判断位 object。

##### instanceof

1，instanceof 主要用于对对象进行判断，可判断出左边是否是右边的实例。但它**不能检测 null 和 undefined**。

```js
[] instanceof Array; //true
{} instanceof Object; //true
new Date() instanceof Date; //true
new RegExp() instanceof RegExp; //true
null instanceof Null; //报错
undefined instanceof undefined; //报错
```

##### Object.prototype.toString.call()

1，该方法可精准判断所有类型。

```js
Object.prototype.toString.call(""); // [object String]
Object.prototype.toString.call(1); // [object Number]
Object.prototype.toString.call(true); // [object Boolean]
Object.prototype.toString.call(undefined); // [object Undefined]
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call(new Function()); // [object Function]
Object.prototype.toString.call(new Date()); // [object Date]
Object.prototype.toString.call([]); // [object Array]
Object.prototype.toString.call(new RegExp()); // [object RegExp]
Object.prototype.toString.call(new Error()); // [object Error]
```

#### 发生类型转换的情况

1，使用加法运算符、== 运算符、逻辑运算符、if 条件判断等都会发生类型转换。

#### 箭头函数和普通函数的区别是什么

1，普通函数 this：this 总是指向它的直接调用者。

- 在默认情况下，没找到直接调用者，this 指的是 window。

- 在严格模式下，没有直接调用者的函数中的 this 是 undefined。

- 使用 call,apply,bind 绑定，this 指的是绑定的对象。

2，箭头函数 this：在使用`=>`定义函数的时候，this 的指向是`定义时所在的对象`，而不是使用时所在的对象。

- 不能够用作构造函数，这就是说，不能够使用 new 命令，否则就会抛出一个错误。

- 不能够使用 arguments 对象。

- 不能使用 yield 命令。

#### let、var、const 的区别

1，var：var 没有块级作用域，支持变量提升。

2，let 有块级作用域，不支持变量提升。不允许重复声明，暂存性死区。不能通过 window.变量名进行访问。

3，const 有块级作用域，不支持变量提升，不允许重复声明，暂存性死区。声明一个变量一旦声明就不能改变，改变报错。

- 如果声明的变量是一个数组或者对象，则可以改变其中的属性或属性值。

#### 深度优先和广度优先

1，广度优先：尝试访问尽可能靠近它的目标节点，然后逐层向下遍历，直至最远的节点层级。

2，深度优先：从起始节点开始，一直向下找到最后一个节点，然后返回，又继续下一条路径。直到找遍所有的节点。

#### setTimeout 与 setInterval 的区别

1，setTimeout 表示间隔一段时间之后执行一次调用，而 setInterval 是每隔一段时间循环调用，直至清除。

2，内存方面，setTimeout 只需要进入一次宏队列，setInterval 不计算代码执行时间，有可能多次执行多次代码。

#### 原型、原型链

##### 什么是原型

1，js 中每一个函数都自带的属性，它的值是一个对象，就好比(prototype:{……})，叫做原型对象。

2，对于构造函数来讲，每通过构造函数实例化一个对象,都有一个隐藏的属性，指向该构造函数的原型对象。他们两个是全等的关系，实例化对象.\_\_proto\_\_ === 构造函数.prototype。

3，原型对象就好像是一个公共区域，他可以被每一个实例化对象所访问(当然构造函数要相同，因为后面要往原型里添加方法，用别的构造函数实例化的对象的原型里是没有新增的方法的)。

4，在创建函数的时候，我们如果将方法写在原型对象中，不但不会造成全局变量的污染，还可以被每一个用这个构造函数实例化的对象所共享。

5，原型的作用：为实例化对象提供共享的属性和方法。

##### 怎么使用原型添加共享的属性和方法

1，我们一般用 Fn.prototype.FunName = function(){...}，的方法为这个构造函数添加方法，如下：

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayHi = function () {
  return "我是" + this.name + "今年" + this.age + "岁了";
};
var person01 = new Person("大威天龙", 12);
// console.log(person01.constructor.prototype.__proto__.__proto__)
console.log(person01.sayHi());
```

##### 原型里常用的几个属性：

1，prototype 属性：

- js 中的每个函数都默认有一个 prototype 属性，随着函数的声明自动生成。

- 构造函数调用 prototype 可以得到构造函数的原型对象。

- 通过这个原型对象可以自定义共享属性供构造函数的实例化对象使用。

2，constructor 属性：

- constructor 属性的作用：

  - constructor 的作用是获取一个(实例化对象/构造函数)的构造函数。

  - 构造函数的最上级是 Function，Function 的构造函数依旧是它本身。

3，instanceof 运算符：

- 用于测试构造函数的 prototype(原型对象) 属性是否出现在原型链中的任何位置。

- 这个方法可以用来判断一个数据是否是对象也可以判断一个数据是否是数组。

- 语法：实例化对象 instanceof Object/Array 返回布尔值。

4，hasOwnProperty()方法：

- 每一个实例化对象都有一个 hasOwnProperty() 方法，用来判断某个属性到底是本地属性还是来自原型的属性。

- 通过构造函数添加的属性或方法叫做本地属性或方法。

- 语法: 实例化对象.hasOwnProperty()，参数是字符串类型，返回布尔值。

> in 运算符用来判断某个实例是否含有某个属性，不管是不是本地属性。语法：`'属性' in 实例化对象`返回布尔值。

##### 什么是原型链

1，每一个对象都有原型对象。一个原型对象也是对象，所以它也有原型对象。

2，当一个对象去调用某个属性或者方法的时候，先从自身开始查找，如果有则使用；如果没有则到对象的原型中去查找。如果有则使用；如果原型中也没有，则会到原型的原型中去查找，这样就形成了一条链，叫做原型链。原型链的终点是 Object 的原型，如果该对象中依然没有找到，则返回 undefined。

![原型链结构图](prototype.png)

#### JS 作用域

##### 全局作用域

1，全局作用域在页面打开时被创建，页面关闭时被销毁。

2，编写在 script 标签中的变量和函数，作用域为全局，在页面的任意位置都可以访问到。

3，在全局作用域中有全局对象 window，代表一个浏览器窗口，由浏览器创建，可以直接调用。

4，全局作用域中声明的变量和函数会作为 window 对象的属性和方法。

5，作用域的作用就是**隔离变量**，是不同作用域中的同名变量不会产生冲突。

##### 函数作用域

1，函数作用域在函数定义时就已创建。

2，每调用一次函数就会创建一个新的函数作用域，他们之间是相互独立的。

3，在函数作用域中可以访问到全局作用域的变量，在函数外无法访问到函数作用域内的变量。

4，在函数作用域中访问变量，函数时，会先在自身作用域中寻找，若没有找到，则会到函数的上一级作用域中寻找，一直到全局作用域。

#### 作用域深层理解

##### 执行期的上下文

1，当函数代码执行的前期，会创建一个执行期上下文的内部对象 AO（作用域）。

2，这个内部的对象是预编译时候创建出来的，因为当函数被调用的时候，会先进行预编译。

3，在全局代码执行的前期，会创建一个执行期的上下文对象 GO。

##### 函数作用域预编译

1，创建 AO 对象 AO{}。

2，找形参和变量声明，将变量和形参名当作 AO 对象的属性名，且值为 undefined。

3，形参和实参相统一，形参被赋值为实参。

4，在函数体里面找函数声明，值赋予函数体（即同名的变量声明会被同名的函数声明覆盖）。

##### 作用域与执行上下文区别

1，它们最大的区别就是：执行上下文在运行时确定，随时可能改变，但作用域在定义时就确定，并且不会改变。

- 面试题示例如下：

```js
function fn(a, c) {
  console.log(a); // f a(){}
  var a = 123;
  console.log(a); // 123
  console.log(c); // f c(){}
  function a() {}
  if (false) {
    var d = 678;
  }
  console.log(d); // undefined
  console.log(b); // undefined
  var b = function () {};
  console.log(b); // f(){}
  function c() {} // f c(){}
  console.log(c);
}
fn(1, 2);

// 解题过程如下：
// AO {
//   a: undefined => 1 => function a(){}
//   b: undefined => 2 => function c(){}
//   d: undefined
//   b: undefined
// }
```

##### 全局作用域预编译

1，创建 GO 对象。

2，找变量声明，将变量名作为 GO 对象的属性名，值为 undefined。

3，找函数声明，值赋予函数体（即同名的变量声明会被同名的函数声明覆盖）。

#### 闭包

1，什么是闭包？

- 闭包就是有权访问一个函数内部变量的函数，也就是常说的函数内部嵌套函数，内部函数访问外部函数变量，从而导致垃圾回收机制没有将当前变量回收掉。这样的操作，有可能会带来内存泄漏。好处就是可以设计私有的方法和变量。

2，闭包形成的条件：

- 函数嵌套。

- 内部函数引用外部函数的局部变量。

#### 垃圾回收机制（闭包的延伸）

1，js 拥有特殊的垃圾回收机制，当一个变量在内存中失去引用，js 会通过特殊的算法将其回收，并释放内存。分为以下两个阶段：

- 标记阶段：垃圾回收器，从根对象开始遍历，访问到的每一个对象都会被标示为可到达对象。

- 清除阶段：垃圾回收器在对内存当中进行线性遍历，如果发现该对象没有被标记为可到达对象，那么就会被垃圾回收机制回收。这里面牵扯到了引用计数法，每次引用都被会`+1` 如果标记清零，那么就会被回收掉。

#### Set 和 Map 的区别

1，Set 是类似数字的数据结构，其中值都是唯一的，可以用来对数组进行去重。使用 new Set() 进行创建。

- Set 包含的方法：

  - add()：用于添加值。

  - delete()：用于删除值。

  - has()：用于检查受否存在该值。

  - clear()：用来清除所有成员。

2，Map 是类似对象的数据结构，成员键是任意类型的值，使用 new Map() 进行声明。

- Map 包含的方法：

  - get()：用于返回键值对。

  - set()：用于添加键值对。

  - delete()：用于删除键值对，返回布尔值。

  - has()：用于检查键值对，返回布尔值。

  - clear()：用于清除所有成员。

#### Promise

1，Promise 是用于解决异步编程的一种法案。

2，Promise 有三种状态：pending、resolved、rejected，而状态一旦变更就不能逆转。

- 其中成功的时候会调用 resolved，失败则是调用 rejected，都会返回一个新的 Promise，可以通过 .then() 中获取到成功或者失败的结果，或者也可以使用 **.catch()** 捕获异常的结果。

- 当要同时执行多个异步操作的时候，且需要这多个异步操作同时成功的情况下再进行下一步操作的时候就可以用 **Promise.all()** 方法将这些异步操作同时执行。如果都成功了，就会以数组的形式返回结果，但只要其中有一个失败了就会返回失败的结果。

- 当有多个任务同时执行，需要获取最先执行完毕的任务时，就可以使用 **Promise.race()** 方法获取，该方法只获取最先执行完成的任务，不管是成功还是失败的任务，只关注最先返回结果的任务。

3，Promise 的优点：支持链式调用，能够解决回调地狱的问题。

4，Promise 的缺点：

- 一旦创建就会立即执行，无法中途取消。

- 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。

- 当处于 pending 状态时，无法得知目前进展到哪一阶段。

### DOM 相关

#### css 的重绘与回流

1，重绘：当节点需要更改外观而不会影响布局。

- 如更改背景颜色，字体颜色等。

2，DOM 结构的修改引发 DOM 几何尺寸变化的时候，发生回流。

- 常见的几何属性有 width、height、padding、margin、left、top、border 或者是 DOM 节点发生增减移动。

3，减少重绘和回流的办法：

- 使用 css3 新增属性：translate 替代 top 等方向值。

- 避免频繁使用 style，而是采用 class。

#### innerHTML 与 innerText 的区别

1，innerHTML 会获取到 html 标签、空格和换行，而 innerText 只会获取文本内容，不包括空格和换行。

#### DOM 事件流

1，DOM 事件流包括：捕获阶段、目标阶段、冒泡阶段。

- 事件冒泡是从最具体的元素逐级向上传播的过程。事件委托就是利用冒泡的原理，将事件绑定在父节点上，通过冒泡原理，使子节点也能触发该事件。

  - 事件委托可以减少对 DOM 的操作，提高程序性能，无需对每个元素都单独绑定一次事件。

- 事件捕获是从最顶层元素逐级向下传播的过程。

#### mouseover 与 mouseenter 的区别

1，mouseover 在鼠标移入元素或者其子元素中时都会触发，会重复触发冒泡的过程。对应的移出事件为 mouseout。

2，mouseenter 只有当鼠标移到元素本身上时才会触发，移动到其子元素上并不会触发。不会有冒泡的过程。对应的移出事件为 mouseleave。

### CSS 相关

#### css 盒子模型

1，盒子模型分为 **IE 盒模型**和**标准盒模型**。

- 标准盒模型内容区大小不包括 border 和 panding，而 IE 盒模型则包括 border 和 padding。

- 可以使用 box-sizzing 将标准和模型转换为 IE 盒模型。

#### 响应式布局

1，响应式布局可以使用 @media 媒体查询，rem 适配，vm/vh，或者 flex 布局。

#### mate 标签解决移动端适配

```httml
<meta name=”viewport” content=”initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no”>
```

#### 元素垂直居中的方法

1，知道宽高的情况下使用：absolute + margin、absolute + calc。

2，不知道宽高的情况下使用：flex、absolute + transform(translate: -50%, -50%)、网格布局。

#### opacity、display、visibility 的区别

1，display: none 会让元素完全从渲染树中消失，不占据任何空间，不能触发绑定的事件。

2，opacity: 0 不会让元素从渲染树中消失，会占据空间，只是内容不可见，能触发绑定的事件。

3，visibility: hidden 不会从渲染树消失，也会占据空间，但是不会触发绑定的事件。

### 浏览器及 http 相关

#### get 和 post 的区别

1，get 和 post 最主要的区别就在于携带参数的位置不同，get 是将参数放在 url 中，而 post 则是将参数放在 body 中。

2，get 发送请求时，只会发送一个包，而 post 是发送两个包，第一个包会先发送 herder，用于确认服务器是否有处理能力，当服务器返回 100 后，再发送 data 数据。

#### cookie、localstorage、seesionstorage

1，cookie：存储大小为 4kb 左右，每次都会携带在 HTTP 头中，如果使用 cookie 保存过多数据会带来性能问题，默认是关闭浏览器后失效，但是也可以设置过期时间。

2，localstorage：存储大小为 5M，仅在浏览器中保存，不参与和服务器的通信，除非手动被清除，否则永久保存。

3，seesionstorage：存储大小 5M，仅在浏览器中保存，不参与和服务器的通信，仅在当前会话(窗口)下有效，关闭窗口或浏览器后被清除，不能设置过期时间。

#### 浏览器禁用 cookie 该如何处理

1，一般会用到 url 重写的技术来进行会话跟踪，每一次的交互，都会在 url 后面加上 sid=xxx 类似的参数。服务端根据这种方式来识别用户。

#### 进程与线程

##### 进程

1，进程：进程是 CPU 资源分配的最小单位，进程包括运行中的程序和程序所使用到的内存和系统资源。

2，CPU 可以有很多进程，我们的电脑每打开一个软件就会产生一个或多个进程，为什么电脑运行的软件多就会卡，是因为 CPU 给每个进程分配资源空间，但是一个 CPU 一共就那么多资源，分出去越多，越卡，每个进程之间是相互独立的，CPU 在运行一个进程时，其他的进程处于非运行状态，CPU 使用**时间片轮转调度算法**（想深入了解可自行百度，这里不做赘述）来实现同时运行多个进程。

##### 线程

1，线程是 CPU 调度的最小单位。

2，线程是建立在进程的基础上的一次程序运行单位，通俗点解释线程就是程序中的一个执行流，一个进程可以有多个线程。

3，一个进程中只有一个执行流称作单线程，即程序执行时，所走的程序路径按照连续顺序排下来，前面的必须处理好，后面的才会执行。

4，一个进程中有多个执行流称作多线程，即在一个程序中可以同时运行多个不同的线程来执行不同的任务，也就是说允许单个程序创建多个并行执行的线程来完成各自的任务。

##### 进程和线程的区别

1，进程是操作系统分配资源的最小单位，线程是程序执行的最小单位。

2，一个进程由一个或多个线程组成，线程可以理解为是一个进程中代码的不同执行路线。

3，进程之间相互独立，但同一进程下的各个线程间共享程序的内存空间(包括代码段、数据集、堆等)及一些进程级的资源(如打开文件和信号)。

4，调度和切换：线程上下文切换比进程上下文切换要快得多。

##### 多进程和多线程

1，多进程指的是在同一个时间里，同一个计算机系统中允许存在两个或两个以上的进程处于运行状态。多进程带来的好处是明显的，比如大家可以在网易云听歌的同时打开编辑器敲代码，编辑器和网易云的进程之间不会相互干扰。

2，多线程是指程序中包含多个执行流，即在一个程序中可以同时运行多个不同的线程来执行不同的任务，也就是说允许单个程序创建多个并行执行的线程来完成各自的任务。

##### 浏览器包含的进程

1，Browser 进程：

- 浏览器的主进程（负责协调、主控），该进程只有一个。

- 负责浏览器界面显示，与用户交互。如前进，后退等。

- 负责各个页面的管理，创建和销毁其他进程。

- 将渲染（Renderer）进程得到的内存中的 Bitmap（位图），绘制到用户界面上。

- 网络资源的管理，下载等。

2，第三方插件进程：

- 每种类型的插件对应一个进程，当使用该插件时才创建。

3，GPU 进程：

- 该进程也只有一个，用于 3D 绘制等等。

4，渲染进程：

- 即通常所说的浏览器内核（Renderer 进程，内部是多线程）。

- 每个 Tab 页面都有一个渲染进程，互不影响。

- 主要作用为页面渲染，脚本执行，事件处理等。

- 页面的渲染，JS 的执行，事件的循环，都在渲染进程内执行。

##### 为什么浏览器要多进程

1，假设浏览器是单进程，那么某个 Tab 页崩溃了，就影响了整个浏览器，体验极差。同理如果插件崩溃了也会影响整个浏览器。

##### 渲染进程 Renderer 的主要线程

1，GUI 渲染线程：

- 负责渲染浏览器界面，解析 HTML，CSS，构建 DOM 树和 RenderObject 树，布局和绘制等。

  - 解析 html 代码(HTML 代码本质是字符串)转化为浏览器认识的节点，生成 DOM 树，也就是 DOM Tree。

  - 解析 css，生成 CSSOM(CSS 规则树)。

  - 把 DOM Tree 和 CSSOM 结合，生成 Rendering Tree(渲染树)。

- 当我们修改了一些元素的颜色或者背景色，页面就会重绘(Repaint)。

- 当我们修改元素的尺寸，页面就会回流(Reflow)。

- 当页面需要 Repaing 和 Reflow 时 GUI 线程执行，绘制页面。

- 回流(Reflow)比重绘(Repaint)的成本要高，我们要尽量避免 Reflow 和 Repaint。

- GUI 渲染线程与 JS 引擎线程是互斥的：

  - 当 JS 引擎执行时 GUI 线程会被挂起(相当于被冻结了)。

  - GUI 更新会被保存在一个队列中等到 JS 引擎空闲时立即被执行。

2，JS 引擎线程：

- JS 引擎线程就是 JS 内核，负责处理 Javascript 脚本程序(例如 V8 引擎)。

- JS 引擎线程负责解析 Javascript 脚本，运行代码。

- JS 引擎一直等待着任务队列中任务的到来，然后加以处理：

  - 浏览器同时只能有一个 JS 引擎线程在运行 JS 程序，所以 JS 是单线程运行的。

  - 一个 Tab 页(renderer 进程)中无论什么时候都只有一个 JS 线程在运行 JS 程序。

- GUI 渲染线程与 JS 引擎线程是互斥的，JS 引擎线程会阻塞 GUI 渲染线程：

  - 就是我们常遇到的 JS 执行时间过长，造成页面的渲染不连贯，导致页面渲染加载阻塞(就是加载慢)。

  - 例如浏览器渲染的时候遇到 script 标签，就会停止 GUI 的渲染，然后 JS 引擎线程开始工作，执行里面的 JS 代码，等 JS 执行完毕，JS 引擎线程停止工作，GUI 继续渲染下面的内容。所以如果 JS 执行时间太长就会造成页面卡顿的情况。

3，事件触发线程：

- 属于浏览器而不是 JS 引擎，用来控制事件循环，并且管理着一个事件队列(task queue)。

- 当 JS 执行碰到事件绑定和一些异步操作(如 setTimeout，也可来自浏览器内核的其他线程，如鼠标点击、AJAX 异步请求等)，会走事件触发线程将对应的事件添加到对应的线程中(比如定时器操作，便把定时器事件添加到定时器线程)，等异步事件有了结果，便把他们的回调操作添加到事件队列，等待 JS 引擎线程空闲时来处理。

- 当对应的事件符合触发条件被触发时，该线程会把事件添加到待处理队列的队尾，等待 JS 引擎的处理。

- 因为 JS 是单线程，所以这些待处理队列中的事件都得排队等待 JS 引擎处理。

4，定时触发器线程：

- setInterval 与 setTimeout 所在线程。

- 浏览器定时计数器并不是由 JavaScript 引擎计数的(因为 JavaScript 引擎是单线程的，如果处于阻塞线程状态就会影响记计时的准确)。

- 通过单独线程来计时并触发定时(计时完毕后，添加到事件触发线程的事件队列中，等待 JS 引擎空闲后执行)，这个线程就是定时触发器线程，也叫定时器线程。

- W3C 在 HTML 标准中规定，规定要求 setTimeout 中低于 4ms 的时间间隔算为 4ms。

5，异步 http 请求线程：

- 在 XMLHttpRequest 在连接后是通过浏览器新开一个线程请求。

- 将检测到状态变更时，如果设置有回调函数，异步线程就产生状态变更事件，将这个回调再放入事件队列中再由 JavaScript 引擎执行。

- 简单说就是当执行到一个 http 异步请求时，就把异步请求事件添加到异步请求线程，等收到响应(准确来说应该是 http 状态变化)，再把回调函数添加到事件队列，等待 JS 引擎线程来执行。

#### 从输入 url 到页面展示的过程

1，首先需要经过 DNS 解析，获取到 IP 地址，之后经过 TCP 三次握手建立连接之后发送请求，然后服务器响应请求返回请求的文件，得到文件后，浏览器就开始渲染页面，其中遇到 html 标签就调用 html 引擎解析成 DOM 树，遇到 css 就调用 css 引擎解析成样式树，遇到 js 代码就调用 js 引擎解析 js 代码。之后将 DOM 树和样式树进行合并形成一个渲染树，之后根据渲染树来计算出各元素在页面中的布局，然后给各个节点绘制颜色，最后断开 TCP 链接。

#### 同源策略

1，协议、域名、端口号相同的即为同源，如果这三个任何一个不一样就是非同源，访问非同源时就会出现跨域的情况。

#### 如何解决跨域问题

1，使用 jsonp 实现跨域，原理为：

- 借用 script 标签没有跨域限制的漏洞实现的一种跨域方法，只支持 get 请求。安全问题会受到威胁。

2，使用 CORS 实现跨域，原理为：

- 通过后端服务器实现，Access-Control-Allow-Origin。

3，使用 postMessage 实现跨域，postMessage 是 window 的一个属性方法。

4，使用 websocket 实现跨域。

5，使用 nginx 反向代理实现跨域。

6，使用 iframe 实现跨域。

7，使用 webpack proxy 实现跨域，原理为：

- webpack proxy 配置在 webpack 的 devServer 属性中。在 webpack 中的 devServer 配置后，打包阶段在本地临时生成了一个 node 服务器，浏览器请求服务器相当于请求本地服务。

> 注意：webpack proxy 跨域只能用作与开发阶段，临时解决本地请求服务器产生的跨域问题，并不适合线上环境。

#### http 与 https

1，http 为超文本传输协议，采用请求响应的模式，用于服务器与浏览器之间传输数据。

2，http 是无状态的，而且信息是明文传输的。

- 解决明文传输可以使用 https，https 协议是由 http 和 ssl 协议构建的可进行机密传输和身份认证的网络协议。https 需要有证书，且需要进行加解密。

3，http 的缺陷：

- 无法复用链接，完成即断开，重新启动慢，存在对头阻塞的情况，会导致请求之间相互影响。

- 在 http 1.1 之后支持长连接，但需要使用 keep-alive 开启。

3，http 2.0 的特点：

- http 2.0 相比之前的版本，它提升了访问速度，允许多路复用，就是同时发送多个请求及响应信息、支持二进制分帧（将所有传输信息分割为更小的信息或者帧，然后对它们进行二进制编码）、首部压缩、还能支持服务端推送。

#### http 状态码

1，200 系列表示请求成功。 其中 202 表示请求已被接收但还未处理，206 表示请求接受了，但还没处理完成。

2，300 系列表示重定向。其中 301 表示永久重定向，302 表示临时重定向。

3，400 系列表示客户端错误，其中 400 表示语义错误或者参数错误，401 表示请求需要用户验证，403 表示拒绝访问，404 表示访问的网页不存在。

5，500 系列则是表示服务端错误。

#### XSS 攻击

1，XSS 称为跨站脚本攻击，攻击者通过注入非法的 html 标签或者 js 代码实现。

2，XSS 主要分为三类：反射型 XSS、存储型 XSS 和 DOMXSS。

- 反射型又称为非持久型 XSS，其原理就是当用户将带有 XSS 攻击的非法代码发送到服务端后，经过服务端解析返回这段 XSS 代码，最后通过浏览器解析执行后就会造成 XSS 攻击。

- 存储型 XSS 又称为持久型 XSS 攻击，它将非法代码直接存储到服务器，这种方式相比反射型危害更大，也更隐蔽。

- DOMXSS 是直接通过 DOM 解析然后达到 XSS 攻击的目的。

3，XSS 的危害是：会对用户的信息造成危害，还能发送恶意的请求。

4，防御 XSS 的方式首先是对用户输入的**内容进行验证**，然后对一些特殊的**标签进行转换**。

#### CSRF 攻击

1，CSRF 攻击称为跨站请求伪造，就是冒充用户且在用户不知情的情况下发起请求，然后做一些违背用户医院的事情，比如：修改用户信息等。

- 跨站脚本攻击通俗的来讲，就像有一个小偷去别人家偷东西，被这家的小孩看见了，这个小孩就问小偷，你是谁叫什么名字，小偷就说我叫逗你玩，然后小孩就对她妈妈说：有人在偷我们家东西，他妈妈就问谁啊，小孩就说是逗你玩，然后小偷就顺利的偷走了东西还没被抓住。

2，CSRF 的危害主要有：利用以通过认证的用户权限更新设定信息，购买商品，或者进行恶意评论等等。

3，防止 CSRF 攻击可以通过**验证码技术**、**请求来源限制**、而最稳妥的还是使用 **token** 进行验证。

- token 的原理就是在后端随机生成一个 token，并且把这个 token 保存到 session 中，同时把这个 token 发送到前端页面，之后浏览器提交请求时，把 token 加入到请求头中传输到服务器，服务器验证前端传来的 token 是否与 session 中的一致，如果一致就说明时合法的，否则就是不合法。

#### SQL 注入

1，SQL 注入就是在 url 中输入带有逻辑判断的代码，使用户的密码失效，从而达到攻击的目的。

### JS 笔试相关

#### 如何实现一个 new 的伪代码

1，创建一个新的对象。

2，把 obj 的 `__proto__` 指向 fn 的 `prototype`，实现继承。

3，改变 this 的指向（使其指向新创建的实例对象），执行构造函数、传递参数，fn.apply() 或者 fn.call()。

4，返回新的对象 obj。

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
  const obj = {}; //创建一个新的对象
  obj.__proto__ = fn.prototype; //把obj的__proto__指向fn的prototype,实现继承
  fn.apply(obj, arg); //改变this的指向
  return Object.prototype.toString.call(obj) === "[object Object]" ? obj : {}; //返回新的对象obj
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

#### 继承

##### 继承的原理

1，复制父类的属性和方法来重写子类的原型对象。

##### 继承的分类

1，原型链继承：

```js
function Person() {
  this.name = "hello";
  this.hobby = ["唱歌", "coding"];
}

function Child() {}
//关键代码
Child.prototype = new Person();
Child.prototype.constructor = Child;
var child = new Child();
child.hobby.push("睡觉");
var child2 = new Child();
console.log(child2.hobby); //['唱歌','coding','睡觉']
```

2，原型继承的缺点：

- 不能传递参数。

- 如果父类的属性是引用类型，子类实列修改了该属性，其他的子类实列会共享该属性。

##### 构造函数继承

1，借用构造函数实现继承，也就是通过 call 或者 apply 方法调用父类构造函数，以实现继承。

```js
// 父类
function Person(name) {
  this.name = name;
  this.hobby = ["唱歌", "踢球", "跑步"];
}
Person.prototype.eat = function () {
  console.log("好吃");
};

//子类
function Child(age, name) {
  this.age = age;
  Person.call(this, name);
}

//实列
var child1 = new Child("11", "dnhyxc");
child1.hobby.push("学习");
console.log(child1.hobby); // ['唱歌','踢球','跑步','学习']
var child2 = new Child("11", "dnhyxc");
console.log(child2.hobby); // ['唱歌','踢球','跑步']
console.log(child2.name); // dnhyxc
console.log(child1.eat); // undefined
console.log(child2.eat); // undefined
var person = new Person();
console.log(person.eat); // function
```

2，借用构造函数有缺点：

- 子类无法继承父类在原型链上的属性和方法。

- 每个实例都拷贝一份，占用内存大，尤其是方法过多的时候（函数复用又无从谈起了，本来我们用 prototype 就是解决复用问题的）。

3，优点：

- 解决了通过原型链继承子类对于父类引用类型属性的修改，导致其他子类实列共享了修改的问题。

##### 组合继承

1，组合继承（原型链继承+借用构造函数继承）由于这两种继承方式都存在各自的优缺点，从而将他们优点结合起来，通过原型继承父类原型上的属性和方法，通过构造函数的方法继承父类的属性。

```js
// 父类
function Person(name) {
  this.name = name;
  this.hobby = ["唱歌", "踢球", "跑步"];
}
Person.prototype.eat = function (value) {
  console.log(value, "好吃");
};
//子类
function Child(age, name) {
  this.age = age;
  Person.call(this, name); //借用构造函数
}
Child.prototype = new Person(); // 原型链
Child.prototype.constructor = Child;
var child = new Child(18, "dnhyxc");
console.log(child.name); // dnhyxc
console.log(child.hobby); // ["唱歌", "踢球", "跑步"]
console.log(child.age); // 18
child.eat("雪糕"); // 雪糕 好吃
```

2，组合继承缺点：

- 组合继承是 js 最常用的继承模式，组合继承最大的问题就是无论在什么情况下，都会调用两次构造函数：一次是在创建子类型原型时，另一次是在子类构造函数内部。

##### 寄生组合继承

1，寄生组合继承就是避免两次调用父类构造函数，通过赋值直接继承父类的原型。

```js
function Person(name) {
  this.name = name;
  this.hobby = ["唱歌", "踢球", "跑步"];
}
Person.prototype.eat = function () {
  console.log("好吃");
};
//子类
function Child(age, name) {
  this.age = age;
  Person.call(this, name); //借用构造函数
}
var proObj = Object.create(Person.prototype);
proObj.constructor = Child;
Child.prototype = proObj;
var child = new Child(18, "dnhyxc");
console.log(child.name); // dnhyxc
console.log(child.hobby); // ["唱歌", "踢球", "跑步"]
console.log(child.age); // 18
child.eat("雪糕"); // 雪糕 好吃
```

2，Object.create() 做了什么？

```js
Object._create = function (obj) {
  function F() {} // 创建了一个新的构造函数F
  F.prototype = obj; // 然后将构造函数F的原型指向了参数对象obj
  return new F(); // 返回构造函数F的实例对象，从而实现了该实例继承obj的属性。
};
```

#### 深浅拷贝

##### 浅拷贝

1，通常需要拷贝的对象内部只有一层的这种对象。

2，常用方法：

- Object.assign() 方法来实现。

- 扩展运算符 ...obj。

- loadsh 里面的 \_.clone。

- Array.prototype.concat。

- Array.prototype.slice。

##### 深拷贝

1，通常是嵌套二层或以上的复杂对象。

2，常用方法：

- JSON.parse(JSON.stringfy(object)); 该方法忽略掉 undefined、忽略 Symbol、忽略 function。只适合简单深拷贝。

- 递归实现深拷贝。

3，递归实现深拷贝方式一：

```js
// 定义一个深拷贝函数  接收目标target参数
function deepClone(target) {
  // 定义一个变量
  let result;
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === "object") {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = []; // 将result赋值为一个数组，并且执行遍历
      for (let i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]));
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null;
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target;
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {};
      for (let i in target) {
        result[i] = deepClone(target[i]);
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target;
  }
  // 返回最终结果
  return result;
}

// 测试
let obj1 = {
  a: {
    c: /a/,
    d: undefined,
    b: null,
  },
  b: function () {
    console.log(this.a);
  },
  c: [
    {
      a: "c",
      b: /b/,
      c: undefined,
    },
    "a",
    3,
  ],
};

let obj2 = deepClone(obj1);

obj2.a.d = {
  aa: "我改了",
};

obj2.c = [
  {
    a: "c",
    b: "我改了",
    c: undefined,
  },
  "a",
  3,
];

console.log(obj1);
console.log(obj2);
console.log(obj1.a); // {c: /a/, d: undefined, b: null}
console.log(obj2.a); // {c: /a/, d: {…}, b: null}
```

4，递归实现深拷贝方式二：

```js
function deepClone(obj) {
  let cloneObj = new obj.constructor();
  if (obj === null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== "object") return obj;
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      cloneObj[i] = deepClone(obj[i]);
    }
  }
  return cloneObj;
}
```

> 说明；之所以使用 new obj.constructor()创建对象，是因为这样能保证即可克隆一个对象本身，也能克隆这个对象的实例。因为不确定 obj 传入的是对象本身，还是它创建出来的实例，new obj.constructor()可以保证当你传入的是 obj 的实例时，克隆的就是 obj 的实例。即为了保证克隆的结果和克隆之前的对象保持相同的所属类。

##### 深浅拷贝的区别

1，深浅拷贝赋值不一样，在浅拷贝中，把一个对象赋值给新的变量时，赋的其实是该对象在栈中的地址，而不是堆中的数据，也就是两个对象指向的是同一个存储空间，无论哪个对象发生改变，其实都是改变的存储空间的内容，因此，两个对象是联动的。

2，在浅拷贝中，重新在堆中创建内容，拷贝前后对象的**基本数据类型互不影响**，但拷贝引用类型时，因为共享同一内存空间，因此会相互影响。

3，在深拷贝中，从堆内存中开辟一个新的内存空间存放对象，对对象中的子对象进行递归拷贝，拷贝前后的两个对象互不影响。

#### 函数的节流和防抖

##### 防抖函数

1，防抖函数：将多次触发变成最后一次触发，即让触发的函数只执行最后一次。

```js
function debounce(fn, wait) {
  let timer = null;
  return function () {
    let arg = arguments;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(this, arg);
    }, wait);
  };
}
function clg() {
  console.log("clg");
}
window.addEventListener("resize", debounce(clg, 1000));
```

> 为什么要在 fn.apply(this, arg) 中传入 arg？
>
> - fun.apply(this, arg)的用意，就是想让 fn 中的 this 指向 debounce 中 return 的这个函数中的 this，return 回来的这个函数中的 this 也就是指向直接调用 return 函数那个对象。这里都是 window 来直接调用 return 回来的那个函数。所以这里的 this 其实没啥用，之所以这么写是因为 arguments 就是传入的参数数组，而且个数可以不确定的传回给 fn。

##### 节流函数

1，将多次执行变成每隔一个时间节点去执行的函数，即限制函数每隔 delay 时间执行一次。

```js
// 方式一
function throttle(fn, time) {
  let lastTime = null;
  return function () {
    let nowTime = Date.now();
    if (nowTime - lastTime > time || !lastTime) {
      fn();
      lastTime = nowTime;
    }
  };
}
function sayHi() {
  console.log("hi");
}
setInterval(throttle(sayHi, 1000), 500);

// 方式二
function throttle(callback, delay) {
  let delayTimer;

  return function () {
    if (!delayTimer) {
      delayTimer = setTimeout(() => {
        callback();
        delayTimer = null;
      }, delay);
    }
  };
}
```

#### call、apply、bind

##### call、apply、bind 的区别

1，三者的相同点：都是重定向 this 指针的方法。

2，三者的不同点：

- call 和 apply 的第二个参数不相同，call 和 bind 是若干个参数的列表，apply 则是一个数组。

- call 和 apply 都会立即执行，但 bind 不会立即执行。

##### 手写 call

1，call 方法的执行操作回顾：

```js
let mock = { value: 1 };
function mockNum() {
  console.log("value", this.value);
}
mockNum.call(mock); // 改变了函数中this的指向，当前this指向了mock对象
```

2，具体分析：

- 将上述调用方式进行转换：

```js
let mock = {
  value:1;
  mockNum:function(){
     console.log('value',this.value)
  }
}
mock.mockNum();
```

- 经过上面这个操作的演化即可得出如下结论：

  - 将函数设为一个对象的属性。

  - 并将这个函数属性进行调用。

  - 最后删除该函数。

3，具体实现代码如下：

```js
Function.prototype.Mycall = function (context) {
  if (typeof this !== "function") {
    // 判断当前调用者是否为函数
    return;
  }
  // 保存传入的this指向，这里会出现没有传入this指向的问题，那么就默认指向window
  let obj = context || window;
  // 为obj添加fn函数，并将其this指向当前函数，即为mockNum函数，此时fn函数就相当于是mockNum函数
  obj.fn = this;
  // 通过slice来截取传入的参数，即除去传入的第一个参数mock
  let args = [...arguments].slice(1);
  // 调用fn函数
  let result = obj.fn(...args);
  delete obj.fn;
  // 如果mockNum函数有返回，result就是mockNum函数的返回值，否则就是undefined
  return result;
};

// 测试
let mock = {
  value: 1,
};

function mockNum(a, b) {
  console.log("value", this.value); // value 1
  console.log("a", a); // a 111
  console.log("b", b); // b 222
}
mockNum.Mycall(mock, 111, 222);
```

##### 手写 apply

```js
Function.prototype.myApply = function (context) {
  if (typeof this !== "function") {
    // 判断当前调用者是否为函数
    return;
  }
  let obj = context || window;
  obj.fn = this;
  let result = arguments[1] ? obj.fn(arguments[1]) : obj.fn([]);
  delete obj.fn;
  return result;
};

let mock3 = {
  arr: [1, 2, 3, 4, 5],
};

function arrx2(arr) {
  return this.arr.concat(arr).map((x) => x * 2);
}

console.log("arrx2", arrx2.myApply(mock3, [6, 7, 8]));
```

##### 手写 bind

1，bind 方法具体说明：该方法会直接返回一个新的函数，需要手动去调用才能执行。其特点是：

- 返回一个函数。

- 可以传入参数。

- 例如：

```js
let foo = { value: 1 };
function bar() {
  console.log("bindFoo", this.value);
  // return this.value // 考虑到函数可能有返回值
}
let bindFoo = bar.bind(foo);
// 如果有返回值的情况下 bindFoo() === 1;
bindFoo(); // 1
```

3，bind 方法具体代码实现如下：

```js
Function.prototype.Mybind = function (obj) {
  if (typeof this !== "function") throw new Error("not a function");
  // 当前this指向bar函数
  let self = this;
  let args = [...arguments].slice(1);
  return function F() {
    if (this instanceof F) {
      return new self(...args, ...arguments);
    }
    // ...arguments为传入F函数的参数
    return self.apply(obj, args.concat([...arguments]));
  };
};

let foo = {
  value: 1,
};

function bar(arg) {
  console.log("bindFoo", this.value); // bindFoo 1
  return this.value;
}
let bindFoo = bar.Mybind(foo);
console.log(bindFoo()); // 1
```

4，终极完整版实现如下：

```js
Function.prototype._bind = function (thisObj) {
  // 判断是否为函数调用
  if (
    typeof target !== "function" ||
    Object.prototype.toString.call(target) !== "[object Function]"
  ) {
    throw new TypeError(this + " must be a function");
  }

  const self = this;
  const args = [...arguments].slice(1);

  var bound = function () {
    var finalArgs = [...args, ...arguments];
    // 考虑new调用的情况，new.target用来检测是否是被new调用
    if (new.target !== undefined) {
      // 说明是用new来调用的
      var result = self.apply(this, finalArgs);
      if (result instanceof Object) {
        return result;
      }
      return this;
    } else {
      return self.apply(thisArg, finalArgs);
    }
  };

  // 保留函数原型，为了防止构造函数有prototype属性的时候出现问题
  if (self.prototype) {
    // 为什么使用了Object.create?因为我们要防止，bound.prototype的修改而导致self.prototype被修改。
    // 不要写成bound.prototype = self.prototype，这样可能会导致原函数的原型被修改。
    bound.prototype = Object.create(self.prototype);
    bound.prototype.constructor = self;
  }
  return bound;
};
```

#### instanceof 原理

1，instanceOf 用来判断左边是否是右边的实例。

```js
function myInstanceof(left, right) {
  // 获得类型的原型
  let prototype = right.prototype;
  // 获得对象的原型
  left = left.__proto__;
  // 判断对象的类型是否等于类型的原型
  while (true) {
    if (left === null) {
      return false;
    }
    if (prototype === left) {
      return true;
    }
    left = left.__proto__;
  }
}

function Fun(name, age) {
  this.name = name;
  this.age = age;
}

Fun.prototype.say = function () {
  console.log("我叫" + this.name + "，今年" + this.age + "岁！");
};

const fun = new Fun("dnhyxc", "18");
console.log(myInstanceof(fun, Fun)); // true
console.log(fun.name); // dnhyxc
console.log(fun.age); // 18
fun.say(); // 我叫dnhyxc，今年18岁！
```

#### 实现 Event(event bus)

1，event bus 既是 node 中各个模块的基石，又是前端组件通信的依赖手段之一，同时涉及了订阅-发布设计模式，是非常重要的基础。

2，简单版实现：

```js
// 简单版
class EventEmeitter {
  constructor() {
    this._events = this._events || new Map(); // 储存事件/回调键值对
    this._maxListeners = this._maxListeners || 10; // 设立监听上限
  }
}

// 监听名为type的事件
EventEmeitter.prototype.on = function (type, fn) {
  // 将type事件以及对应的fn函数放入this._events中储存
  if (!this._events.get(type)) {
    this._events.set(type, fn);
  }
};

// 触发名为type的事件
EventEmeitter.prototype.emit = function (type, ...args) {
  let handler;
  // 从储存事件键值对的this._events中获取对应事件回调函数
  handler = this._events.get(type);
  if (args.length > 0) {
    handler.apply(this, args);
  } else {
    handler.call(this);
  }
  return true;
};

//测试用例
let eventBus = new EventEmeitter();
// 注意：必须先调用addListener，再调用emit触发addListener，否则会报错
eventBus.on("event1", function (params) {
  console.log(params);
});
eventBus.emit("event1", {
  name: "dnhyxc",
});
```

3，深度版实现：

```js
class MyEventBus {
  constructor() {
    this._events = this._events || new Map(); // 储存事件/回调键值对
    this._maxListeners = this._maxListeners || 10; // 设立监听上限
  }
}

// 监听名为type的事件
MyEventBus.prototype.on = function (type, fn) {
  // 获取对应事件名称的函数清单
  const handler = this._events.get(type);
  if (!handler) {
    // 第一次监听type事件时，handler为undefined，说明_events中还没有监听者，需要设置type事件的监听者
    this._events.set(type, fn);
  } else if (handler && typeof handler === "function") {
    // 如果handler是函数说明已经有一个监听者了，此时我们需要用数组储存这两个监听者
    this._events.set(type, [handler, fn]);
  } else {
    // 进入到这，说明已经有多个监听者了，那么直接往数组里push函数即可
    handler.push(fn);
  }
};

// 触发名为type的事件
MyEventBus.prototype.emit = function (type, ...args) {
  let handler;
  handler = this._events.get(type);
  if (Array.isArray(handler)) {
    // 如果是一个数组说明有多个监听者，需要依次此触发里面的函数
    for (let i = 0; i < handler.length; i++) {
      if (args.length > 0) {
        handler[i].apply(this, args);
      } else {
        handler[i].call(this);
      }
    }
  } else {
    // 单个函数的情况我们直接触发即可
    if (args.length > 0) {
      handler.apply(this, args);
    } else {
      handler.call(this);
    }
  }

  return true;
};

MyEventBus.prototype.removeListener = function (type, fn) {
  // 获取对应事件名称的函数清单
  const handler = this._events.get(type);
  // 如果是函数,说明只被监听了一次
  if (handler && typeof handler === "function") {
    this._events.delete(type, fn);
  } else {
    let postion;
    // 如果handler是数组，说明被监听多次要找到对应的函数
    for (let i = 0; i < handler.length; i++) {
      if (handler[i] === fn) {
        postion = i;
      } else {
        postion = -1;
      }
    }
    // 如果找到匹配的函数，从数组中清除
    if (postion !== -1) {
      // 找到数组对应的位置，直接清除此回调
      handler.splice(postion, 1);
      // 如果清除后只有一个函数，那么取消数组，以函数形式保存
      if (handler.length === 1) {
        this._events.set(type, handler[0]);
      }
    } else {
      return this;
    }
  }
};

//测试用例
let deepEventBus = new MyEventBus();
// 注意：必须先调用addListener，再调用emit触发addListener，否则会报错
deepEventBus.on("event1", function (params) {
  console.log(params, "dnhyxc1");
});
deepEventBus.on("event1", function (params) {
  console.log(params, "dnhyxc2");
});
deepEventBus.on("event1", function (params) {
  console.log(params, "dnhyxc3");
});
deepEventBus.emit("event1", {
  name: "dnhyxc",
  age: "18",
});
```

#### 模拟 Object.create()

1，Object.create()方法说明：Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的\_\_proto\_\_。

```js
// 模拟 Object.create()
function create(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}
```

#### 实现 JOSN.parse

1，深度实现方式：

```js
var i = 0;
function parseValue() {
  if (str[i] === "{") {
    return parseObject();
  } else if (str[i] === "[") {
    return parseArray();
  } else if (str[i] === "n") {
    return parseNull();
  } else if (str[i] === "t") {
    return parseTrue();
  } else if (str[i] === "f") {
    return parseFalse();
  } else if (str[i] === '"') {
    return parseString();
  } else {
    //如果不考虑出错的话，不是以上所有的情况即
    return parseNumber();
  }
}

// 所有的函数都是从i位置开始解析出一个对应类型的值，同时把i移动到解析完成后的下一个位置
function parseString() {
  var result = "";
  i++; // 开始解析之前，i是指向字符开始的双引号的，但字符的内容是不包含这个双引号的
  while (str[i] != '"') {
    result += str[i++];
  }
  i++; // 移动i到解析完成后的下一个位置
  return result;
}

function parseNull() {
  // 简单粗暴，直接往后读出一个长度为4的个字符串出来，如果不是null，则直接报错
  var content = str.substr(i, 4);

  if (content === "null") {
    i += 4;
    return null;
  } else {
    throw new Error("Unexpected char at pos: " + i);
  }
}

function parseFalse() {
  // 基本同上
  var content = str.substr(i, 5);

  if (content === "false") {
    i += 5;
    return false;
  } else {
    throw new Error("Unexpected char at pos: " + i);
  }
}

function parseTrue() {
  // 基本同上
  var content = str.substr(i, 4);

  if (content === "true") {
    i += 4;
    return true;
  } else {
    throw new Error("Unexpected char at pos: " + i);
  }
}

function parseNumber() {
  // 本函数的实现并没有考虑内容格式的问题，实际上JSON中的数值需要满足一个格式
  // 并且由于最后调用了parseFloat，所以如果格式不对，还是会报错的
  var numStr = ""; //-2e+8
  // 此处只要判断i位置还是数字字符，就继续读
  // 为了方便，写了另一个helper函数
  while (isNumberChar(str[i])) {
    numStr += str[i++];
  }
  return parseFloat(numStr);
}

// 判断字符c是否为组成JSON中数值的符号
function isNumberChar(c) {
  var chars = {
    "-": true,
    "+": true,
    e: true,
    E: true,
    ".": true,
  };
  if (chars[c]) {
    return true;
  }
  if (c >= "0" && c <= "9") {
    return true;
  }
  return false;
}

// 解析数组
// 掐头去尾，然后一个值一个逗号，如果解析完一个值后没遇到逗号，说明解析完了
function parseArray() {
  i++;
  var result = []; // [1234,"lsdf",true,false]
  while (str[i] !== "]") {
    result.push(parseValue());
    if (str[i] === ",") {
      i++;
    }
  }
  i++;
  return result;
}

/*
 * 解析对象：
 * 掐头去尾，然后一个key，是字符串，一个冒号，一个值，可能是任意类型，所以调用parseValue
 * 最后，如果解析完一组键值对对，遇到了逗号，则解析下一组，没遇到逗号，则解析完毕
 */
function parseObject() {
  i++;
  var result = {}; //{"a":1,"b":2}
  while (str[i] !== "}") {
    var key = parseString();
    i++; //由于只考虑合法且无多余空白的JSON，所以这里就不判断是不是逗号了，正常应该是发现不是逗号就报错的
    var value = parseValue();
    result[key] = value;
    if (str[i] === ",") {
      i++;
    }
  }
  i++;
  return result;
}

function parse(json) {
  i = 0;
  str = json;
  return parseValue();
}

var str = '{"a":1,"b":true,"c":false,"foo":null,"bar":[1,2,3]}';
console.log(parse(str)); // {a: 1, b: true, c: false, foo: null, bar: Array(3)}
```

2，骚操作实现方式：

```js
var str = '{"a":1,"b":true,"c":false,"foo":null,"bar":[1,2,3]}';
var obj = eval("(" + str + ")"); // {a: 1, b: true, c: false, foo: null, bar: Array(3)}
```

> 此方法属于骚操作，极易容易被 xss 攻击，慎用。

#### 实现 Promise

```js
var PromisePolyfill = (function () {
  // 和reject不同的是resolve需要尝试展开thenable对象
  function tryToResolve(value) {
    if (this === value) {
      // 主要是防止下面这种情况
      // let y = new Promise(res => setTimeout(res(y)))
      throw TypeError("Chaining cycle detected for promise!");
    }

    // 根据规范2.32以及2.33 对对象或者函数尝试展开
    // 保证S6之前的 polyfill 也能和ES6的原生promise混用
    if (
      value !== null &&
      (typeof value === "object" || typeof value === "function")
    ) {
      try {
        // 这里记录这次then的值同时要被try包裹
        // 主要原因是 then 可能是一个getter, 也就是说:
        // 1. value.then可能报错
        // 2. value.then可能产生副作用(例如多次执行可能结果不同)
        var then = value.then;

        // 另一方面, 由于无法保证 then 确实会像预期的那样只调用一个onFullfilled / onRejected
        // 所以增加了一个flag来防止resolveOrReject被多次调用
        var thenAlreadyCalledOrThrow = false;
        if (typeof then === "function") {
          // 是thenable 那么尝试展开
          // 并且在该thenable状态改变之前this对象的状态不变
          then.bind(value)(
            // onFullfilled
            function (value2) {
              if (thenAlreadyCalledOrThrow) return;
              thenAlreadyCalledOrThrow = true;
              tryToResolve.bind(this, value2)();
            }.bind(this),

            // onRejected
            function (reason2) {
              if (thenAlreadyCalledOrThrow) return;
              thenAlreadyCalledOrThrow = true;
              resolveOrReject.bind(this, "rejected", reason2)();
            }.bind(this)
          );
        } else {
          // 拥有then 但是then不是一个函数 所以也不是thenable
          resolveOrReject.bind(this, "resolved", value)();
        }
      } catch (e) {
        if (thenAlreadyCalledOrThrow) return;
        thenAlreadyCalledOrThrow = true;
        resolveOrReject.bind(this, "rejected", e)();
      }
    } else {
      // 基本类型 直接返回
      resolveOrReject.bind(this, "resolved", value)();
    }
  }

  function resolveOrReject(status, data) {
    if (this.status !== "pending") return;
    this.status = status;
    this.data = data;
    if (status === "resolved") {
      for (var i = 0; i < this.resolveList.length; ++i) {
        this.resolveList[i]();
      }
    } else {
      for (i = 0; i < this.rejectList.length; ++i) {
        this.rejectList[i]();
      }
    }
  }

  function Promise(executor) {
    if (!(this instanceof Promise)) {
      throw Error("Promise can not be called without new !");
    }

    if (typeof executor !== "function") {
      // 非标准 但与Chrome谷歌保持一致
      throw TypeError("Promise resolver " + executor + " is not a function");
    }

    this.status = "pending";
    this.resolveList = [];
    this.rejectList = [];

    try {
      executor(tryToResolve.bind(this), resolveOrReject.bind(this, "rejected"));
    } catch (e) {
      resolveOrReject.bind(this, "rejected", e)();
    }
  }

  Promise.prototype.then = function (onFullfilled, onRejected) {
    // 返回值穿透以及错误穿透, 注意错误穿透用的是throw而不是return，否则的话
    // 这个then返回的promise状态将变成resolved即接下来的then中的onFullfilled
    // 会被调用, 然而我们想要调用的是onRejected
    if (typeof onFullfilled !== "function") {
      onFullfilled = function (data) {
        return data;
      };
    }
    if (typeof onRejected !== "function") {
      onRejected = function (reason) {
        throw reason;
      };
    }

    var executor = function (resolve, reject) {
      setTimeout(
        function () {
          try {
            // 拿到对应的handle函数处理this.data
            // 并以此为依据解析这个新的Promise
            var value =
              this.status === "resolved"
                ? onFullfilled(this.data)
                : onRejected(this.data);
            resolve(value);
          } catch (e) {
            reject(e);
          }
        }.bind(this)
      );
    };

    // then 接受两个函数返回一个新的Promise
    // then 自身的执行永远异步与onFullfilled/onRejected的执行
    if (this.status !== "pending") {
      return new Promise(executor.bind(this));
    } else {
      // pending
      return new Promise(
        function (resolve, reject) {
          this.resolveList.push(executor.bind(this, resolve, reject));
          this.rejectList.push(executor.bind(this, resolve, reject));
        }.bind(this)
      );
    }
  };

  // for prmise A+ test
  Promise.deferred = Promise.defer = function () {
    var dfd = {};
    dfd.promise = new Promise(function (resolve, reject) {
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
  };

  // for prmise A+ test
  if (typeof module !== "undefined") {
    module.exports = Promise;
  }

  return Promise;
})();

PromisePolyfill.all = function (promises) {
  return new Promise((resolve, reject) => {
    const result = [];
    let cnt = 0;
    for (let i = 0; i < promises.length; ++i) {
      promises[i].then((value) => {
        cnt++;
        result[i] = value;
        if (cnt === promises.length) resolve(result);
      }, reject);
    }
  });
};

PromisePolyfill.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; ++i) {
      promises[i].then(resolve, reject);
    }
  });
};
```

#### 解析 URL Params 为对象

```js
function parseParam(url) {
  // 将 ? 后面的字符串取出来
  const paramsStr = /.+\?(.+)$/.exec(url)[1];
  // 将字符串以 & 分割后存到数组中
  const paramsArr = paramsStr.split("&");
  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach((param) => {
    if (/=/.test(param)) {
      // 处理有 value 的参数
      let [key, val] = param.split("="); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

      if (paramsObj.hasOwnProperty(key)) {
        // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else {
        // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else {
      // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  });

  return paramsObj;
}

// 测试
let url =
  "http://dnhyxc.github.io/?user=dnhyxc&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled";
console.log(parseParam(url)); // {user: "dnhyxc", id: [123, 456], city: "北京", enabled: true}
```

#### 转化为驼峰命名

```js
const f = function (s) {
  // /\-\w|_\w|\.\w/g：正则匹配'-'、'_'、'.'
  return s.replace(/\-\w|_\w|\.\w/g, function (x) {
    return x.slice(1).toUpperCase();
  });
};

const str = "get.element_by-id";
console.log(f(str)); // getElementById
```

#### 查找字符串中出现最多的字符和个数

```js
let str = "abcabcabcbbccccc";
let num = 0;
let char = "";

// 使其按照一定的次序排列
str = str.split("").sort().join(""); // "aaabbbbbcccccccc"

// 定义正则表达式
let re = /(\w)\1+/g;

str.replace(re, ($1, $2, $3, $4, $5) => {
  if (num < $1.length) {
    num = $1.length;
    char = $2;
  }
});
console.log(`字符最多的是${char}，出现了${num}次`);

// 上述$1，$2参数说明：
str.replace(re, ($1, $2, $3, $4, $5) => {
  console.log($1, $2, $3, $4, $5);
  /*
    aaa a 0 aaabbbbbcccccccc undefined
    bbbbb b 3 aaabbbbbcccccccc undefined
    cccccccc c 8 aaabbbbbcccccccc undefined
  */
});
```

#### 字符串查找

1，具体应用场景：用最基本的遍历来实现判断字符串 a 是否被包含在字符串 b 中，并返回第一次出现的位置（找不到返回 -1）。

```js
function isContain(a, b) {
  for (let i in b) {
    if (a[0] === b[i]) {
      let tmp = true;
      for (let j in a) {
        if (a[j] !== b[~~i + ~~j]) {
          tmp = false;
        }
      }
      if (tmp) {
        return i;
      }
    }
  }
  return -1;
}

a = "34";
b = "1234567";
console.log(isContain(a, b)); // 返回 2
a = "35";
b = "1234567";
console.log(isContain(a, b)); // 返回 -1
a = "355";
b = "123554355";
console.log(isContain(a, b)); // 返回 2
```

#### 判断一个变量是对象还是数组

1，判断数组和对象分别都有好几种方法，其中用 prototype.toString.call() 兼容性最好。

```js
function isObjArr(value) {
  if (Object.prototype.toString.call(value) === "[object Array]") {
    console.log("value是数组");
  } else if (Object.prototype.toString.call(value) === "[object Object]") {
    //这个方法兼容性好一点
    console.log("value是对象");
  } else {
    console.log("value不是数组也不是对象");
  }
}
```

#### 实现千位分隔符

##### 实现方式一

1，首先将数字转为字符串数组，在循环整个数组，每三位添加一个分隔逗号，最后再合并成字符串。

2，由于分隔符在顺序上是从后往前添加的：比如 1234567 添加后是 1,234,567 而不是 123,456,7，所以方便起见可以先把数组倒序排列，添加完之后再将顺序倒回来，就是正常顺序了。

3，**注意**：如果数字带小数的话，要把小数部分分开处理。

```js
function numFormat(num) {
  // 保留三位小数并将其转为字符串以"."进行小数点分割
  num = parseFloat(num.toFixed(3)).toString().split(".");
  // 转换成字符数组并且倒序排列
  var arr = num[0].split("").reverse();
  var res = [];
  for (var i = 0; i < arr.length; i++) {
    // 如果能被3整除，就往数组中添加","分隔符
    if (i % 3 === 0 && i !== 0) {
      res.push(",");
    }
    // 注意：添加分割符必须写在添加数字之前，因为后面需要将其进行反转回来
    res.push(arr[i]);
  }
  // 再次倒序成为正确的顺序
  res.reverse();
  // 如果有小数的话添加小数部分
  if (num[1]) {
    res = res.join("").concat("." + num[1]);
  } else {
    res = res.join("");
  }
  return res;
}

var a = 1234567894532;
var b = 673439.4542;
var c = 673439.8629;
console.log(numFormat(a)); // "1,234,567,894,532"
console.log(numFormat(b)); // "673,439.4542"
console.log(numFormat(c)); // "673,439.863"
```

##### 实现方式二

1，使用 JS 自带的 API `toLocaleString()`。

```js
numObj.toLocaleString(locales, options);
```

> locales：缩写语言代码（BCP 47 language tag，例如：cmn-Hans-CN）的字符串或者这些字符串组成的数组。
> options：包含一些或所有的下面属性的类。`decimal => 用于纯数字格式`，`currency => 用于货币格式`，`percent => 用于百分比格式`，`unit => 用于单位格式`。
> 说明：该方法返回这个数字在特定语言环境下的表示字符串。

2，**注意**：该方法在没有指定区域时，返回时用默认的语言环境和默认选项格式化的字符串，所以不同地区数字格式可能会有一定的差异，因此最好确保使用 locales 参数指定了使用的语言。

3，实现数字插入千位符代码如下：

```js
const a = 1234567894532;
const b = 673439.4542;

console.log(a.toLocaleString()); // "1,234,567,894,532"
console.log(b.toLocaleString()); // "673,439.454"  （小数部分四舍五入了）
```

##### 实现方式三

1，使用 `RegExp 和 replace()` 方法。

```js
function numFormat(num) {
  // 先提取整数部分
  var res = num.toString().replace(/\d+/, function (n) {
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ",";
    });
  });
  return res;
}
var a = 1234567894532;
var b = 673439.4542;
console.log(numFormat(a)); // "1,234,567,894,532"
console.log(numFormat(b)); // "673,439.4542"
```

#### 数组去重

##### 使用双重循环实现

```js
Array.prototype.unique = function () {
  const newArray = [];
  let isRepeat;
  for (let i = 0; i < this.length; i++) {
    isRepeat = false;
    for (let j = 0; j < newArray.length; j++) {
      if (this[i] === newArray[j]) {
        isRepeat = true;
        break;
      }
    }
    if (!isRepeat) {
      newArray.push(this[i]);
    }
  }
  return newArray;
};

const testArr = [1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8, 9, "11", "11", "22"];
const arr = [];
// 生成[0, 100000]之间的随机数
for (let i = 0; i < 100000; i++) {
  arr.push(0 + Math.floor((100000 - 0 + 1) * Math.random()));
}
console.time("test");
arr.unique();
console.timeEnd("test"); // test: 1645.865966796875 ms
console.log(testArr.unique()); // [1, 2, 3, 4, 5, 6, 7, 8, 9, "11", "22"]
```

##### 使用 Array.prototype.indexOf() 实现

1，基本思路：如果索引不是第一个索引，说明是重复值。

- Array.prototype.indexOf()返回的是第一个索引值。

```js
// 写法一
Array.prototype.unique = function () {
  return this.filter((item, index) => {
    return this.indexOf(item) === index;
  });
};

const testArr = [1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8, 9, "11", "11", "22"];
const arr = [];
// 生成[0, 100000]之间的随机数
for (let i = 0; i < 100000; i++) {
  arr.push(0 + Math.floor((100000 - 0 + 1) * Math.random()));
}
console.time("test");
arr.unique();
console.timeEnd("test"); // test: 4436.455810546875 ms
console.log(testArr.unique()); // [1, 2, 3, 4, 5, 6, 7, 8, 9, "11", "22"]

// 写法二
Array.prototype.unique = function () {
  const newArray = [];
  this.forEach((item) => {
    if (newArray.indexOf(item) === -1) {
      newArray.push(item);
    }
  });
  return newArray;
};

const testArr = [1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8, 9, "11", "11", "22"];
const arr = [];
// 生成[0, 100000]之间的随机数
for (let i = 0; i < 100000; i++) {
  arr.push(0 + Math.floor((100000 - 0 + 1) * Math.random()));
}
console.time("test");
arr.unique();
console.timeEnd("test"); // test: 3468.3388671875 ms
console.log(testArr.unique()); // [1, 2, 3, 4, 5, 6, 7, 8, 9, "11", "22"]
```

##### 使用 Array.prototype.sort() 实现

1，基本思路：先对原数组进行排序，然后再进行元素比较。

```js
// 写法一
Array.prototype.unique3 = function () {
  const newArray = [];
  this.sort();
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== this[i + 1]) {
      newArray.push(this[i]);
    }
  }
  return newArray;
};

const testArr = [1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8, 9, "11", "11", "22"];
const arr = [];
// 生成[0, 100000]之间的随机数
for (let i = 0; i < 100000; i++) {
  arr.push(0 + Math.floor((100000 - 0 + 1) * Math.random()));
}
console.time("test");
arr.unique();
console.timeEnd("test"); // test: 37.299072265625 ms
console.log(testArr.unique()); // [1, "11", 2, "22", 3, 4, 5, 6, 7, 8, 9]

// 写法二
Array.prototype.unique = function () {
  const newArray = [];
  this.sort();
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== newArray[newArray.length - 1]) {
      newArray.push(this[i]);
    }
  }
  return newArray;
};

const testArr = [1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8, 9, "11", "11", "22"];
const arr = [];
// 生成[0, 100000]之间的随机数
for (let i = 0; i < 100000; i++) {
  arr.push(0 + Math.floor((100000 - 0 + 1) * Math.random()));
}
console.time("test");
arr.unique();
console.timeEnd("test"); // test: 37.14990234375 ms
console.log(testArr.unique()); // [1, "11", 2, "22", 3, 4, 5, 6, 7, 8, 9]
```

##### 使用 Array.prototype.includes() 实现

```js
Array.prototype.unique = function () {
  const newArray = [];
  this.forEach((item) => {
    if (!newArray.includes(item)) {
      newArray.push(item);
    }
  });
  return newArray;
};

const testArr = [1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8, 9, "11", "11", "22"];
const arr = [];
// 生成[0, 100000]之间的随机数
for (let i = 0; i < 100000; i++) {
  arr.push(0 + Math.floor((100000 - 0 + 1) * Math.random()));
}
console.time("test");
arr.unique();
console.timeEnd("test"); // test: 3066.06201171875 ms
console.log(testArr.unique()); // [1, 2, 3, 4, 5, 6, 7, 8, 9, "11", "22"]
```

##### 使用 {} 和 [] 结合 forEach() 实现

```js
function unique(arr) {
  if (!arr instanceof Array) {
    throw Error("当前传入的不是数组");
  }
  let list = [];
  let obj = {};
  arr.forEach((item) => {
    if (!obj[item]) {
      list.push(item);
      obj[item] = true;
    }
  });
  return list;
}

const testArr = [1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8, 9, "11", "11", "22"];
const arr = [];
// 生成[0, 100000]之间的随机数
for (let i = 0; i < 100000; i++) {
  arr.push(0 + Math.floor((100000 - 0 + 1) * Math.random()));
}
console.time("test");
unique(arr);
console.timeEnd("test"); // test: 8.662109375 ms
console.log(unique(testArr)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, "11", "22"]
```

##### 使用 Array.prototype.reduce() 实现

```js
Array.prototype.unique = function () {
  return this.sort().reduce((init, current) => {
    if (init.length === 0 || init[init.length - 1] !== current) {
      init.push(current);
    }
    return init;
  }, []);
};

const testArr = [1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8, 9, "11", "11", "22"];
const arr = [];
// 生成[0, 100000]之间的随机数
for (let i = 0; i < 100000; i++) {
  arr.push(0 + Math.floor((100000 - 0 + 1) * Math.random()));
}
console.time("test");
arr.unique();
console.timeEnd("test"); // test: 38.675048828125 ms
console.log(testArr.unique()); // [1, "11", 2, "22", 3, 4, 5, 6, 7, 8, 9]
```

##### 使用 Map 实现

```js
// 写法一
Array.prototype.unique = function () {
  const newArray = [];
  const tmp = new Map();
  for (let i = 0; i < this.length; i++) {
    if (!tmp.get(this[i])) {
      tmp.set(this[i], 1);
      newArray.push(this[i]);
    }
  }
  return newArray;
};

const testArr = [1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8, 9, "11", "11", "22"];
const arr = [];
// 生成[0, 100000]之间的随机数
for (let i = 0; i < 100000; i++) {
  arr.push(0 + Math.floor((100000 - 0 + 1) * Math.random()));
}
console.time("test");
arr.unique();
console.timeEnd("test"); // test: 11.30712890625 ms
console.log(testArr.unique()); // [1, 2, 3, 4, 5, 6, 7, 8, 9, "11", "22"]

// 写法二
Array.prototype.unique = function () {
  const tmp = new Map();
  return this.filter((item) => {
    return !tmp.has(item) && tmp.set(item, 1);
  });
};

const testArr = [1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8, 9, "11", "11", "22"];
const arr = [];
// 生成[0, 100000]之间的随机数
for (let i = 0; i < 100000; i++) {
  arr.push(0 + Math.floor((100000 - 0 + 1) * Math.random()));
}
console.time("test");
arr.unique();
console.timeEnd("test"); // test: 8.900146484375 ms
console.log(testArr.unique()); // [1, 2, 3, 4, 5, 6, 7, 8, 9, "11", "22"]
```

##### 使用 Set 实现

```js
// 写法一
Array.prototype.unique = function () {
  const set = new Set(this);
  return Array.from(set);
};

const testArr = [1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8, 9, "11", "11", "22"];
const arr = [];
// 生成[0, 100000]之间的随机数
for (let i = 0; i < 100000; i++) {
  arr.push(0 + Math.floor((100000 - 0 + 1) * Math.random()));
}
console.time("test");
arr.unique();
console.timeEnd("test"); // test: 5.614013671875 ms
console.log(testArr.unique()); // [1, 2, 3, 4, 5, 6, 7, 8, 9, "11", "22"]

// 写法二
Array.prototype.unique = function () {
  return [...new Set(this)];
};

const testArr = [1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8, 9, "11", "11", "22"];
const arr = [];
// 生成[0, 100000]之间的随机数
for (let i = 0; i < 100000; i++) {
  arr.push(0 + Math.floor((100000 - 0 + 1) * Math.random()));
}
console.time("test");
arr.unique();
console.timeEnd("test"); // test: 5.591796875 ms
console.log(testArr.unique()); // [1, 2, 3, 4, 5, 6, 7, 8, 9, "11", "22"]
```

#### 字符串反转

1，基本思路：先将字符串转成一个数组，然后用数组的 reverse()+join() 方法实现。

```js
let str = "hello word";
let b = [...str].reverse().join(""); //drow olleh
```

#### 实现链式调用

1，基本思路：在调用完的方法之后将自身实例返回。

2，实现示例：

- 示例一：

```js
function Class1() {
  console.log("初始化");
}
Class1.prototype.method = function (param) {
  console.log(param);
  return this;
};
let cl = new Class1();
//由于new 在实例化的时候this会指向创建的对象，所以this.method这个方法会在原型链中找到。
cl.method("第一次调用").method("第二次链式调用").method("第三次链式调用");
```

- 示例二：

```js
const obj = {
  a: function () {
    console.log("a");
    return this;
  },
  b: function () {
    console.log("b");
    return this;
  },
};
obj.a().b(); // a b
```

- 示例三：

```js
class Person {
  fn1() {
    const args = [...arguments];
    const res = args.reduce((prev, current) => prev + current, "");
    console.log(res); // 疯狂coding88
    return this;
  }
  fn2() {
    const args = [...arguments];
    const res = args.reduce((prev, current) => prev + current * 2, 0);
    console.log(res); // 24
    return this;
  }
  fn3(value) {
    console.log(value * 3); // 18
    return this;
  }
  fn4(value) {
    console.log(value * 4); // 36
    return this;
  }
}
const person = new Person();
person.fn1("疯狂coding", 88).fn2(3, 9).fn3(6).fn4(9);
```

### react 相关

#### hooks 是什么

1，hooks 是 react16.8 出来的新特性，它能让我们在不使用 class 组件的情况下使用 state，以及其它的 react 特性。

#### class 组件的不足

1，状态逻辑难复用：

- 在组件之间复用状态逻辑很难，可能要用到 render props （渲染属性）或者 HOC（高阶组件），但无论是渲染属性，还是高阶组件，都会在原先的组件外包裹一层父容器（一般都是 div 元素），导致层级冗余。

2，趋向复杂难以维护：

- 在生命周期函数中混杂不相干的逻辑（如：在 componentDidMount 中注册事件以及其他的逻辑，在 componentWillUnmount 中卸载事件，这样分散不集中的写法，很容易写出 bug ）。

- 类组件中到处都是对状态的访问和处理，导致组件难以拆分成更小的组件。

3，this 指向问题：

- 父组件给子组件传递函数时，必须绑定 this。

#### 相比 class hooks 的优势

1，能优化类组件的三大问题。

2，能在无需修改组件结构的情况下复用状态逻辑（自定义 Hooks ）。

3，能将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）。

4，副作用的关注点分离。

- 副作用指那些没有发生在数据向视图转换过程中的逻辑，如 ajax 请求、访问原生 dom 元素、本地持久化缓存、绑定/解绑事件、添加订阅、设置定时器、记录日志等。以往这些副作用都是写在类组件生命周期函数中的。而 useEffect 在全部渲染完毕后才会执行，useLayoutEffect 会在浏览器 layout 之后，painting 之前执行。

#### useState

##### useState 概述

1，useState 会返回一个数组：一个 state，一个用于更新 state 的函数，如下：

```js
const [state, setState] = useState(initialState);
```

2，在初始化渲染期间，返回的状态 state 与传入的第一个参数 initialState 的值是相同的。

3，我们可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 this.setState，但是**它不会把新的 state 和旧的 state 进行合并，而是直接替换**。

##### 深入 useState

1，**useState 中每次渲染都是独立的闭包**：

- 每一次渲染都有它自己的 Props 和 State。

- 每一次渲染都有它自己的事件处理函数。

- 当点击更新状态的时候，函数组件都会重新被调用，那么每次渲染都是独立的，取到的值不会受后面操作的影响。

```js
function Counter2() {
  let [number, setNumber] = useState(0);
  function alertNumber() {
    setTimeout(() => {
      // alert 只能获取到点击按钮时的那个状态
      alert(number);
    }, 3000);
  }
  return (
    <>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>+</button>
      <button onClick={alertNumber}>alertNumber</button>
    </>
  );
}
```

2，**函数式更新**：

- 如果新的 state 需要通过使用先前的 state 计算得出，那么可以将回调函数当做参数传递给 setState。该回调函数将接收先前的 state，并返回一个更新后的值。

```js
function Counter() {
  let [number, setNumber] = useState(0);
  function lazy() {
    setTimeout(() => {
      // setNumber(number+1);
      // 这样每次执行时都会去获取一遍 state，而不是使用点击触发时的那个 state
      setNumber((number) => number + 1);
    }, 3000);
  }
  return (
    <>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>+</button>
      <button onClick={lazy}>lazy</button>
    </>
  );
}
```

3， **惰性初始化 state**：

- initialState 参数只会在组件的初始化渲染中起作用，后续渲染时会被忽略。

- 如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用。

```js
function Counter5(props) {
  console.log("Counter5 render");
  // 这个函数只在初始渲染时执行一次，后续更新状态重新渲染组件时，该函数就不会再被调用
  function getInitState() {
    return { number: props.number };
  }
  let [counter, setCounter] = useState(getInitState);
  return (
    <>
      <p>{counter.number}</p>
      <button onClick={() => setCounter({ number: counter.number + 1 })}>
        +
      </button>
      <button onClick={() => setCounter(counter)}>setCounter</button>
    </>
  );
}
```

##### useState 性能优化

1，Object.is （浅比较）：

- Hook 内部使用 Object.is 来比较新/旧 state 是否相等。

- 与 class 组件中的 setState 方法不同，如果你修改状态的时候，传的状态值没有变化，则不重新渲染。

- 与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果。

```js
function Counter() {
  const [counter, setCounter] = useState({ name: "计数器", number: 0 });
  console.log("render Counter");
  // 如果你修改状态的时候，传的状态值没有变化，则不重新渲染
  return (
    <>
      <p>
        {counter.name}:{counter.number}
      </p>
      <button
        onClick={() => setCounter({ ...counter, number: counter.number + 1 })}
      >
        +
      </button>
      <button onClick={() => setCounter(counter)}>++</button>
    </>
  );
}
```

2，减少渲染次数：

- 默认情况，只要父组件状态变了（不管子组件依不依赖该状态），子组件也会重新渲染。

- 一般的优化如下：

  - 类组件：可以使用 pureComponent。

  - 函数组件：使用 React.memo ，将函数组件传递给 memo 之后，就会返回一个新的组件，新组件的功能：如果接受到的属性不变，则不重新渲染函数。

#### useEffect

#### react 生命周期

1，react 生命周期分为：实例化阶段、更新阶段、卸载阶段。

- 实例化阶段主要有：

  - constructor：可以在这里对 state、props 进行初始化等操作。

  - getDerivedStateFromProps：根据父组件传递过来的 props 来按需更新自身的 state。

  - render：初始化时，生成 Fiber 节点，形成虚拟 DOM。

  - commonentDidMount：此时组件已经挂载完成，可以在这个生命周期中进行数据请求。

- 更新阶段主要有：

  - getDerivedStateFromProps：根据父组件传递过来的 props 来按需更新自身的 state。

  - shouldComopnentUpdate：可以通过这个生命周期判断状态是否改变，组件是否需要更新，可以用来优化性能。

  - render：将更新 Fiber 节点，生成新的虚拟 DOM。

  - getSnapshotBeforeUpdate：会在组件即将更新时调用，用来获取快照，返回值将作为 componentDidUpdate 这个生命周期的第三个参数。

  - componentDidUpdate：到此生命周期时组件已经更新完毕。

- 卸载阶段主要有：

  - componentWillUnmount：这个钩子主要用来做一些收尾工作，比如清除定时器、取消订阅等。

3，react 捕获异常的生命周期：

- componentDidCatch(error, info)：该声明周期专门用来捕获异常。

![reactlive](reactlive.png)

### 微前端相关

#### 什么是微前端

1，微前端（Micro-Frontends）是一种类似于微服务的架构，它将微服务的理念应用于浏览器端，即将 Web 应用由单一的单体应用转变为多个小型前端应用聚合为一的应用。同时各个前端应用还可以独立运行、独立开发、独立部署。

#### 为什么会有微前端

1，**项目需要拆分和细化**：

- 当下前端领域，单页面应用（SPA）是非常流行的项目形态之一，而随着时间的推移以及应用功能的丰富，单页应用变得不再单一而是越来越庞大也越来越难以维护，往往是改一处而动全身，由此带来的发版成本也越来越高。微前端的意义就是将这些庞大应用进行拆分，并随之解耦，每个部分可以单独进行维护和部署，提升效率。

2，**项目需要整合历史系统**：

- 在不少的业务中，或多或少会存在一些历史项目，这些项目大多以采用老框架类似（Backbone.js，Angular.js 1）的 B 端管理系统为主，介于日常运营，这些系统需要结合到新框架中来使用还不能抛弃，对此我们也没有理由浪费时间和精力重写旧的逻辑。而微前端可以将这些系统进行整合，在基本不修改原来逻辑的同时还能兼容新老两套系统并行运行。

#### 实现微前端的方案之 qiankun

1，qiankun 概述：

- qiankun 是一个基于 single-spa 进行封装的微前端解决方案。本质上还是**路由分发式**的服务框架。

2，qiankun 的特点：

- 与技术无关。

  - 主框架不限制接入应用的技术栈，微应用具备完全自主权。

- 各个子应用可以独立开发独立部署。

  - 微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新。

- 增量升级。

  - 在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略。

- 独立运行时。

  - 每个微应用之间状态隔离，运行时状态不共享。
