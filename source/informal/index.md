---
title: informal
date: 2021-02-14 01:55:54
toc: true
declare: true
---

### Event Loop 相关

1，为什么 js 是单线程？

- js 作为主要运行在浏览器的脚本语言，js 主要用途之一是操作 DOM。

- 在 js 高程中举过一个栗子，如果 js 同时有两个线程，同时对同一个 dom 进行操作，这时浏览器应该听哪个线程的，如何判断优先级？为了避免这种问题，js 必须是一门单线程语言，并且在未来这个特点也不会改变。

#### 执行栈

1，执行栈是一个类似于函数调用栈的运行容器，是一个具有 LIFO（后进先出）结构的堆栈，用于存储在代码执行期间创建的所有执行上下文。当执行栈为空时，JS 引擎便检查事件队列，如果事件队列不为空的话，事件队列便将第一个任务压入执行栈中运行。

#### 事件队列

1，事件队列是一个存储着待执行任务的队列，其中的任务严格按照时间先后顺序执行（先进先出），排在队头的任务将会率先执行，而排在队尾的任务会最后执行。

2，事件队列每次仅执行一个任务，在该任务执行完毕之后，再执行下一个任务。

#### 主线程

1，主线程跟执行栈是不同概念，主线程规定现在执行执行栈中的哪个事件。

2，主线程循环：即主线程会不停的从执行栈中读取事件，会执行完所有栈中的同步代码。

3，当遇到一个异步事件后，并不会一直等待异步事件返回结果，而是会将这个事件挂在与执行栈不同的队列中，我们称之为任务队列(Task Queue)。

4，当主线程将执行栈中所有的代码执行完之后，主线程将会去查看任务队列是否有任务。如果有，那么主线程会依次执行那些任务队列中的回调函数。

#### js 异步执行的运行机制

1，所有任务都在主线程上执行，形成一个执行栈。

2，主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

3，一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"。那些对应的异步任务，结束等待状态，进入执行栈并开始执行。

4，主线程不断重复上面的第三步。

#### 宏任务与微任务

1，异步任务分为 宏任务（macrotask）与微任务 (microtask)，不同的 API 注册的任务会依次进入自身对应的队列中，然后等待 Event Loop 将它们依次压入执行栈中执行。

2，宏任务（macrotask）包括：script（整体代码）、setTimeout、setInterval、UI 渲染、 I/O、postMessage、 MessageChannel、setImmediate（Node.js 环境）。

3，微任务（microtask）包括：Promise、 MutaionObserver、process.nextTick（Node.js 环境）。

#### Event Loop(事件循环)

1，Event Loop（事件循环）中，每一次循环称为 tick, 每一次 tick 的任务如下：

- 执行栈选择最先进入队列的宏任务(通常是 script 整体代码)，如果有则执行。

- 检查是否存在宏任务，如果存在则不停的执行，直至清空微任务队列。

- 更新 render（每一次事件循环，浏览器都可能会去更新渲染）。

- 重复以上步骤。

2，事件循环执行机制为：宏任务 => 所有微任务 => 宏任务，如下图所示：

![事件循环执行机制](event.jpeg)

> 从上图我们可以看出：
>
> - 将所有任务看成两个队列：执行队列与事件队列。
> - 执行队列是同步的，事件队列是异步的，宏任务放入事件列表，微任务放入执行队列之后，事件队列之前。
> - 当执行完同步代码之后，就会执行位于执行列表之后的微任务，然后再执行事件列表中的宏任务。

3，完整的 Event Loop 如下图：

![完整的 Event Loop](eventLoop.png)

4，简单实践题：

```js
setTimeout(function () {
  console.log(1);
});
new Promise(function (resolve, reject) {
  console.log(2);
  resolve(3);
}).then(function (val) {
  console.log(val);
});
console.log(4);

// 答案为：2 4 3 1
```

> 解题思路为：
>
> - 先执行 script 同步代码：先执行 new Promise 中的 console.log(2)，then 后面的不执行属于微任务，然后执行 console.log(4)。
> - 执行完 script 宏任务后，执行微任务，console.log(3)，没有其他微任务了。
> - 执行另一个宏任务，定时器，console.log(1)。

### JS API

#### outerHTML

1，使用 outerHTML 获取指定元素中的所有子元素及文本元素。

```js
<div id="content">
  <p>outerHTML</p>
  <ul>
    <li>Item 1</li>
  </ul>
</div>;
const content = document.getElementById("content");
console.log(content.outerHTML);
/*
  执行console.log(content.outerHTML)返回如下：
  <div id="content">
    <p>This is a <strong>paragraph</strong> with a list following it.</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>
*/
```

2，使用 outerHTML 整体替换指定元素。

```js
<div id="content">
  <p>outerHTML</p>
  <ul>
    <li>Item 1</li>
  </ul>
</div>;
content.outerHTML = "<span>替换原来的div</span>";

// 上述代码等价于如下代码
const p = document.createElement("p");
p.appendChild(document.createTextNode("dsadsadsadasda"));
div.parentNode.replaceChild(p, div);
```

> 上述代码中，将会使用 span 标签整体替换原来的 div 标签。

#### encodeURIComponent()

1，该方法可以把字符串作为 URI 组件进行编码。

2，该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： `- _ . ! ~ * ' ( ) `。其他字符（比如：`; / ? : @ & = + $ , #`这些用于分隔 URI 组件的标点符号），都会被一个或多个十六进制的转义序列替换的。

3，具体使用：

```js
const url = "http://www.baidu.com";
const res = encodeURIComponent(url);
console.log(res); // http%3A%2F%2Fwww.baidu.com
```

### 文件流相关

#### 文件切片

1、使用 file 的 slice 方法将文件进行切片。

2、切片的规则可以根据规定的文件大小进行切分、也可以根据规定的份数进行切分、也可以两者结合，具体操作如下：

```js
// 已规定的最大切片大小进行切片，算出需要切出的份数，如果超过了规定切分的最大份数10，那么就将文件切成10份，以10份为标准，算出每份的size
const chunks = [];

function fileSlice(file) {
  let maxChunkSize = 1024 * 10;
  let count = Math.ceil(file.size / maxChunkSize);
  if (count > 10) {
    maxChunkSize = file.size / 10;
    count = 10;
  }

  for (let start = 0; start < count; start++) {
    console.log(maxChunkSize);
    const chunk = file.slice(start * maxChunkSize, (start + 1) * maxChunkSize);
    chunks.push({
      file: chunk,
      filename: `${"fileOnlyOneHash"}_${start + 1}.${"file后缀"}`,
    });
  }
}

// 根据规定份数进行切分
const chunksByCount = [];

function fileSliceByCount(file) {
  const count = 10;
  const maxChunkSize = Math.ceil(file.size / 10);

  for (let start = 0; start < file.size; start += maxChunkSize) {
    const chunk = file.slice(start, start + maxChunkSize + 1);
    chunksByCont.push({
      file: chunk,
      filename: `${"fileOnlyOneHash"}_${start + 1}.${"file后缀"}`,
    });
  }
}

// 根据规定文件大小进行切分
const chunksBySize = [];

function fileSliceBySize(file) {
  const maxChunkSize = 1024 * 10;
  const count = Math.ceil(file.size / maxChunkSize);

  for (let start = 0; start < count; start++) {
    const chunk = file.slice(start * maxChunkSize, (start + 1) * maxChunkSize);
    chunksBySize.push({
      file: chunk,
      filename: `${"fileOnlyOneHash"}_${start + 1}.${"file后缀"}`,
    });
  }
}

fileSlice(file);
fileSliceByCount(file);
fileSliceBySize(file);
console.log(chunks, "chunks");
console.log(chunksByCount, "chunksByCount");
console.log(chunksBySize, "chunksBySize");
```

### 构造函数相关

#### 构造函数 this

1，构造函数中，this 总是指向新创建出来的实例对象。

2，如果在严格模式下，this 则指向 undefined。

#### new 关键字

1，构造函数于普通函数的区别就是，构造函数需要使用 new 关键字进行调用。

2，new 关键字调用构造函数时，会经历四个过程，分别为：

- 创建一个 Object 实例对象。相当于：

```js
const obj = new Object();
```

- 将构造函数中的 this 指向新创建的这个实例对象。

```js
this.name = "dnhyxc";
// 相当于（obj是new Object()创建的对象）
obj.name = "dnhyxc";
```

- 自上而下执行构造函数中的代码。

- 返回 new 构建出的实例对象。

**注意**：如果被调用的这个构造函数没有显示的 `return` 表达式（仅限于返回对象类型数据的情况）时，则会隐式的返 `this` 对象，也就是 new 创建出来的实例对象。

**说明**：如果使用 return 表达式返回 undefined、null、boolean、number、string 等基本数据类型的时候，则不会替换 new 关键字调用的默认行为，也就是说此时会隐式的返回 new 创建出来的实例对象。而如果用 return 显示的返回 {}、[]、RegExp、Data、Function 时，return 返回的值则会替换 new 调用的默认返回值 this，也就是说会替换 new 新创建出来的实例对象。

#### 相关测试代码

```js
function Test(name) {
  console.log(this);
  this.user = name;
  return {};
}

const newObj = new Test("dnhyxc");
console.log(newObj.user, "return {}"); // undefined
console.log(">>>))手动分割线)>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

function Test1(name) {
  console.log(this);
  this.user = name;
  return [];
}

const newObj1 = new Test1("dnhyxc");
console.log(newObj1.user, "return []"); // undefined
console.log(">>>))手动分割线)>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

function Test2(name) {
  console.log(this);
  this.user = name;
  return null;
}

const newObj2 = new Test2("dnhyxc");
console.log(newObj2.user, "return null"); // dnhyxc
console.log(">>>))手动分割线)>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

function Test3(name) {
  console.log(this);
  this.user = name;
  return undefined;
}

const newObj3 = new Test3("dnhyxc");
console.log(newObj3.user, "return null"); // dnhyxc
console.log(">>>))手动分割线)>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
```

### JS 计算行数

#### 计算元素是否达到三行

1，使用`元素的高度` **/** `元素的行高`即为文本行数：

```js
const box = document.getElementById("box");
const height = box.offsetHeight;
const lineHeight = box.style.lineHeight.slice(
  0,
  box.style.lineHeight.length - 2
);
const rowMun = Math.round(height / parseFloat(lineHeight));
console.log(rowMun); // 3
```

### Array.map() 实现页面展示数组数据

#### 上传文件与列表已有文件同时展示

1，处理文件上传文件与原有文件需要同时展示时，需要使用两个互不相干的数组进行展示，即上传文件分为一个数组，已有文件分为一个数组，将这两个数组同时展示在页面上，避免在操作增删改操作时相互影响。

2，伪代码如下：

```js
<div className={classNames(styles.contentWrap, styles.faceWrap)}>
  <div className={styles.uploadWrap} style={isShowFaceCreate ? { display: 'blocdisplay: 'none' }}>
    <FaceUpload onChange={uploadSuccess} getAddRes={getAddRes} />
  </div>
  {
    !loading ? faceDetialData.registeredFaceList && faceDetialData.registeredFaceList.map((i, index) => {
      return (
        <MFace
          key={index as number}
          width={145}
          height={173}
          url={i.url}
          faceId={i.faceId}
          data={{
            i, index,
          }}
          delEntityFace={delEntityFace}
          type="edit"
        />
      );
    }) : ''
  }
  {
    !loading ? uploadList.length > 0 && uploadList.map((i, index) => {
      return (
        <MFace
          key={index as number}
          width={145}
          height={173}
          url={i.url}
          res={i.res}
          data={{
            i, index,
          }}
          type="edit"
          delUploadData={delUploadData}
        />
      );
    }) : ''
  }
</div>
```

### 数组转对象的方式

#### 方式一

1，`对象结构`：

```js
const arr = ["arr1", "arr2", "arr3"];

const obj = { ...arr };
```

#### 方式二

1，`for...in 循环`：

```js
const arr = ["arr1", "arr2", "arr3"];
const obj = {};

for (let k in arr) {
  obj[k] = arr[k];
}
```

#### 方式三

1，`Object.assign()`：

```js
const arr = ["arr1", "arr2", "arr3"];

Object.assign({}, arr);
```

#### 方式四

1，`Array.reduce()`：

```js
arr.reduce((obj, arr, index) => {
  obj[index] = arr;
  return obj;
}, {});
```

### js 类型判断

#### 类型判断函数封装

```js
const getType = function (obj) {
  let type = typeof obj;
  if (type !== "object") {
    return type;
  }
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  // 或如下方式
  // return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1').toLowerCase();
};
```

#### js 类型比较特殊点

1，当声明的函数，其参数都为`数字型`字符串时，JS 会比较两个字符串 ASCII 码的大小，而不是比较数值的大小，具体如下：

```js
function numCompare(first, second) {
  return first >= second ? first : second;
}

numCompare(12, 2); // => 12
numCompare("12", "2"); // => '2'
```

### 随机打乱数组顺序

#### sort 与 Math.random

1，具体方式如下：

```js
let list = [1, 2, "dnhyxc", 1, 34, 3, 12];
let res = list.sort(() => Math.random() - 0.5);
console.log(res);
```

### 判断数组中的值是否满足要求

#### 数组里的值是否有一个或一个以上满足要求

1，当前方法只要数组里面有一个值符合需求，就返回 true，否则 false。

```js
let list = [6, 8, 8, 9, 8, 88];
let res = list.some((item) => item > 6);
console.log(res); // true
```

#### 数组里的值是否都满足要求

1，我们之前使用 for 遍历在判断当前数组里的值是否全符合要求，还要声明一个变量来进行累计，直接使用 every 当全部满足需求时返回 true，否则返回 false。

```js
let list = [6, 8, 8, 88, 8, 68];
let res = list.every((item) => item > 6);
console.log(res); // false
```

#### 找出数组 a 中不存在于数组 b 中的每一项

```js
const arr1 = [
  {
    value: 22,
    name: "其它",
  },
  {
    value: 11,
    name: "法定代表人章",
  },
  {
    value: 33,
    name: "合同专用章",
  },
  {
    value: 12,
    name: "财务专用章",
  },
  {
    value: 90,
    name: "公章",
  },
];

const arr2 = [
  "公章",
  "财务专用章",
  "合同专用章",
  "法定代表人章",
  "其它",
  "xxx",
  "sss",
  "vvv",
  "nnn",
];

const arr1Name = arr1.map((i) => i.name);
const last = arr2.filter((item) => !arr1Name.includes(item));
const newLast = last.map((i) => ({ value: 0, name: i }));
let data = [...arr1].concat(newLast);
console.log(data, "data");
```

### 运算符相关

#### ?? 运算符

1，`??`运算符只有前面的值是 undefined or null 才会执行，工作中有的情况下使用，我们来看一下。

```js
let status = undefined;
let text = status ?? "暂无";
console.log(text); // 暂无
```

#### ?. 运算符

1，`?.`运算符这在有时候处理对象时非常有用，看下面案例，person.name 返回 undefined 然后在调用 toString 这时肯定会报错，这时使用`?.`运算符就不会产生错误，`?.`运算符是只有在当值不是 undefined 时才会调用 toString 方法。

```js
let person = {};
console.log(person.name.toString()); // 报错
console.log(person.name?.toString()); // undefined
```

#### ~~ 双非运算符

1，`~~`双非运算符可以用于向下取整。

```js
console.log(~~9.2); // 9
```

### 代替 if else 的方式

#### 定义特定的对象替代 if else

1，在处理判断时，都会使用 if else， 但当业务越来越庞大时有好几种状态时，这样代码太冗余了，我们做一下简化。

```js
if(xxx = 1) {
    xxx = "启用"
} else if(xxx = 2) {
    xxx = "停用"
} // ...省略

// 废除以上写法，可使用如下方式替代
let operation = {
    1: "启用",
    2: "停用"
    3: "注销",
    4: "修改"
    5: "详情"
}
xxx = operation[status] // 代码简洁清晰
```

### 坐标定位

#### 使用坐标计算目标在元素中的实际位置

1，说明：利用坐标在指定宽高的元素中按照实际比例框中指定的位置。

```js
const getVirtualRect = (options: any, meta: any) => {
  if (!options || !meta) {
    return null;
  }
  const { width, height } = meta;

  if (!width || !height) {
    return null;
  }

  const { regionHeight, regionLeft, regionTop, regionWidth, timePoint } =
    options;

  if (
    regionHeight === undefined ||
    regionLeft === undefined ||
    regionTop === undefined ||
    regionWidth === undefined
  ) {
    return null;
  }

  /* 
    width: 135px; 规定当前元素显示的宽度。
    height: 76px; 规定当前元素显示的高度。
    即：实际就是要在宽为135px，高为76px的元素中利用坐标框出指定的位置
  */

  // 将位置信息映射处理
  let virtualHeight = 0;
  let virtualWidth = 0;
  let deltaHeight = 0;
  let deltaWidth = 0;
  let radio = 1;
  if (width / height >= 135 / 76) {
    virtualWidth = 135;
    virtualHeight = (height * 135) / width;
    deltaHeight = Math.floor((76 - virtualHeight) / 2);
    radio = width / 135;
  } else {
    virtualWidth = (width * 76) / height;
    virtualHeight = 76;
    deltaWidth = Math.floor((135 - virtualWidth) / 2);
    radio = height / 76;
  }
  // 计算实际的位置信息
  const delta = 20; // 成比例放大
  const w = (regionWidth + delta) / radio;
  const h = (regionHeight + delta) / radio;
  const l = (regionLeft - delta) / radio + deltaWidth;
  const t = (regionTop - delta) / radio + deltaHeight;

  return {
    w,
    h,
    l,
    t,
    timePoint,
  };
};
```

### 浏览器下载操作

#### 下载图片

1，当后端返回的 url 是预览的形式（点击下载图片会直接在浏览器新标签页打开）时，可在 url 后面拼接上 **filename=xxx.png** 的形式完成下载。

```js
const download = (url, index) => {
  const a = document.createElement("a");
  a.href = `${url}&filename=xxx.png`;
  a.click();
};
```

#### 处理批量下载

1，如果后端返回的就是下载的 url，即可直接用当前 url 进行下载，无需拼接 filename。

```js
export const download = (url: string) => {
  const a = document.createElement("a");
  a.href = url;
  a.click();
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// 批量下载
export const downloadFiles = async (urls: string[]) => {
  for (const url of urls) {
    download(url);
    await delay(1000);
  }
};
```

#### 下载 office 文档

1，适用于下载 word，ppt 等浏览器不会默认执行预览的文档，也可以用于下载后端接口返回的流数据。

```js
function download(link, name) {
  if (!name) {
    name = link.slice(link.lastIndexOf("/") + 1);
  }
  let eleLink = document.createElement("a");
  eleLink.download = name;
  eleLink.style.display = "none";
  eleLink.href = link;
  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
}

//下载excel
download("http://111.229.14.189/file/1.xlsx");
```

#### 在浏览器中自定义下载一些内容

1，下载一些 DOM 内容，或者下载一个 JSON 文件。

```js
/**
 * 浏览器下载静态文件
 * @param {String} name 文件名
 * @param {String} content 文件内容
 */
function downloadFile(name, content) {
  if (typeof name == "undefined") {
    throw new Error("The first parameter name is a must");
  }
  if (typeof content == "undefined") {
    throw new Error("The second parameter content is a must");
  }
  if (!(content instanceof Blob)) {
    content = new Blob([content]);
  }
  const link = URL.createObjectURL(content);
  download(link, name);
}

function download(link, name) {
  if (!name) {
    //如果没有提供名字，从给的Link中截取最后一坨
    name = link.slice(link.lastIndexOf("/") + 1);
  }
  let eleLink = document.createElement("a");
  eleLink.download = name;
  eleLink.style.display = "none";
  eleLink.href = link;
  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
}

// 使用方式
downloadFile("1.txt", "lalalallalalla");
downloadFile("1.json", JSON.stringify({ name: "hahahha" }));
```

#### 提供一个图片链接，点击下载

1，图片、pdf 等文件，浏览器会默认执行预览，不能调用 download 方法进行下载，需要先把图片、pdf 等文件转成 blob，再调用 download 方法进行下载，转换的方式是使用 axios 请求对应的链接。

```js
//可以用来下载浏览器会默认预览的文件类型，例如mp4,jpg等
import axios from "axios";
//提供一个link，完成文件下载，link可以是  http://xxx.com/xxx.xls
function downloadByLink(link, fileName) {
  axios
    .request({
      url: link,
      responseType: "blob", //关键代码，让axios把响应改成blob
    })
    .then((res) => {
      const link = URL.createObjectURL(res.data);
      download(link, fileName);
    });
}
```

### window.Image()

#### 使用 new window.Image() 设置图片 loading 效果

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>image loading</title>
    <style>
      .wrap {
        width: 400px;
        height: 225px;
        border: 1px solid red;
        text-align: center;
        line-height: 225px;
      }
    </style>
  </head>

  <body>
    <div class="wrap">
      <span>loading...</span>
    </div>
    <script>
      const wrap = document.querySelector(".wrap");
      const myImage = document.createElement("img");
      const p = document.createElement("p");

      const img = new window.Image();

      img.onload = function () {
        loading = false;
      };

      img.onerror = function () {
        alert("error!");
      };

      img.src =
        "https://s.newscdn.cn/file/2020/07/1413858a-b2fb-4351-a715-6496b980771b.gif";

      window.onload = function () {
        myImage.src = img.src;
        wrap.innerHTML = "";
        wrap.appendChild(myImage);
      };
    </script>
  </body>
</html>
```

### DOM

#### 事件委托

1，如果有 100 个 li 元素，都要绑定一个 onclick 事件，这样性能不怎么好，我们可以通过事件委托实现。

```js
ul.on("click", "li", (e) => {
  console.log(e);
});
```

#### dom 滚动条相关

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>scrollbar</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      body,
      html {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
      }

      body :first-child {
        margin-right: 50px;
      }

      .parent {
        box-sizing: border-box;
        height: 100%;
        width: 500px;
        background-color: #ccc;
        padding: 10px 10px;
        overflow: auto;
      }

      .child {
        width: 100%;
        height: 1200px;
        background-color: rgb(184, 247, 164);
      }
    </style>
  </head>

  <body>
    <div class="parent" id="scroll">
      <div class="child">监听滚动条向上滚动还是向下滚动</div>
    </div>
    <div class="parent" id="scroll1">
      <div class="child">监听滚动是否停止</div>
    </div>
    <script>
      const scroll = document.getElementById("scroll");
      let currentVal = 0;
      let scrollVal = 0;
      // 监听滚动条向上滚动还是向下滚动
      scroll.onscroll = function () {
        // 每滚动一次，就会重新赋值
        currentVal = scrollVal;
        scrollVal = scroll.scrollTop;
        if (currentVal < scrollVal) {
          //滚动条下滑，实现下滑效果
          console.log("向下滚动");
        } else {
          //滚动条上滑，实现上滑效果
          console.log("向上滚动");
        }
      };

      // 监听滚动条滚动是否停止
      let scrollTop1 = 0;
      let scrollTop2 = 0;
      let timer = null;
      const scroll1 = document.getElementById("scroll1");
      scroll1.onscroll = function () {
        clearTimeout(timer);
        scrollTop1 = scroll1.scrollTop;
        timer = setTimeout(() => {
          scrollTop2 = scroll1.scrollTop;
          if (scrollTop1 === scrollTop2) {
            console.log("滚动停止了");
          }
        }, 500);
      };
    </script>
  </body>
</html>
```

### CSS

#### flex 换行后双双对齐

1，给开启 flex 的父元素添加 `::after` 伪元素，并设置宽度与需要对齐的元素一致。`不要设置高度`。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>flex换行后双双对齐</title>
    <style>
      .wrap {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        overflow-y: auto;
        margin: 100px auto 0;
        padding-bottom: 10px;
        width: 375px;
        max-height: 700px;
        border: 1px solid red;
      }
      .wrap::after {
        content: "";
        width: 170px;
      }
      .box {
        margin-top: 10px;
        width: 170px;
        height: 212px;
        background-color: #ccc;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="box">box1</div>
      <div class="box">box2</div>
      <div class="box">box3</div>
      <div class="box">box4</div>
      <div class="box">box5</div>
    </div>
  </body>
</html>
```

#### 使网页整体变灰色

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HtmlToGray</title>
    <style>
      body,
      html {
        /* 使网页整体变色 */
        filter: grayscale(100%);
        -webkit-filter: grayscale(100%);
        -moz-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
        -o-filter: grayscale(100%);
        filter: url("data:image/svg+xml;utf8,#grayscale");
        filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
        -webkit-filter: grayscale(1);
        width: 100%;
        height: 100%;
      }

      * {
        margin: 0;
        padding: 0;
      }

      .box {
        width: 100%;
        height: 100%;
        background-color: rgb(218, 237, 245);
      }

      .header {
        width: 100%;
        height: 70px;
        background-color: wheat;
        line-height: 70px;
        text-align: center;
        margin-bottom: 20px;
      }

      .btn {
        width: 80px;
        height: 32px;
        background-color: rgb(224, 236, 241);
        -webkit-border-radius: 6px;
        /*适配以webkit为核心的浏览器(chrome、safari等)*/
        -moz-border-radius: 6px;
        /*适配firefox浏览器*/
        -ms-border-radius: 6px;
        /*适配IE浏览器*/
        -o-border-radius: 6px;
        /*适配opera浏览器*/
        border-radius: 6px;
        /*适配所有浏览器*/
        border: 1px solid #c6c4c4;
        outline: none;
        cursor: pointer;
      }

      .btn:hover {
        background-color: rgb(175, 197, 206);
      }

      .btn:active {
        background-color: rgb(156, 220, 245);
      }
    </style>
  </head>

  <body>
    <div class="box">
      <div class="header">header</div>
      <button class="btn">click</button>
    </div>
  </body>
</html>
```

#### 双击不选中文字

```css
.clickNoSelectText {
  -moz-user-select: none;
  /*火狐*/
  -webkit-user-select: none;
  /*webkit浏览器*/
  -ms-user-select: none;
  /*IE10*/
  -khtml-user-select: none;
  /*早期浏览器*/
  user-select: none;
}
```

#### 多行文字垂直对齐

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>text-space-between</title>
    <style>
      .info {
        border: 1px solid red;
        width: 500px;
        height: 300px;
      }

      .username,
      .password {
        width: 60px;
        height: 40px;
        line-height: 40px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        /* display: inline-block; */
        text-align: justify;
        padding-right: 10px;
        vertical-align: bottom;
      }

      .username::after,
      .password::after {
        display: inline-block;
        width: 100%;
        content: "";
        height: 0;
      }
    </style>
  </head>

  <body>
    <div class="info">
      <div class="username">用户名</div>
      <div class="password">密码</div>
    </div>
  </body>
</html>
```

#### 不设置宽度文本超出隐藏

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>不设宽度文本超出隐藏</title>
    <style>
      .box {
        border: 1px solid red;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 500px;
      }

      .context {
        flex: 1;
        width: 0;
      }

      .desc {
        display: block;
        margin-right: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="context">
        <span class="desc">
          不设宽度文本超出隐藏不设宽度文本超出隐藏不设宽度文本超出隐藏不设宽度文本超出隐藏不设宽度文本超出隐藏不设宽度文本超出隐藏不设宽度文本超出隐藏
        </span>
      </div>
      <div>button</div>
    </div>
  </body>
</html>
```

> 需要设置超出隐藏的元素必须是**块级元素**，否则设置将不生效。

#### 图片层叠显示效果实现

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CascadeImg</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      .wrap {
        width: 98px;
        height: 110px;
        margin: 100px auto;
        position: relative;
      }

      .stackone {
        height: 110px;
        width: 98px;
        border: 2px solid #fff;
        background-color: #99cecb;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
      }

      .stacktwo {
        content: "";
        height: 110px;
        width: 98px;
        background: #a8b386;
        border: 2px solid #fff;
        position: absolute;
        z-index: -1;
        top: 0px;
        left: -5px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        transform: rotate(-9deg);
      }

      .stackthree {
        content: "";
        height: 110px;
        width: 98px;
        background: #6f95b1;
        border: 2px solid #fff;
        position: absolute;
        z-index: -1;
        top: 0px;
        left: 0px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
        transform: rotate(12deg);
      }
    </style>
  </head>

  <body>
    <div class="wrap">
      <div class="stackone"></div>
      <div class="stacktwo"></div>
      <div class="stackthree"></div>
    </div>
  </body>
</html>
```

- 效果如下：

![图片层叠显示效果](cascadeImg.jpg)

### less

#### 定义不带参数的属性集合

1，可用于隐藏这些属性集合，不让它暴露到 CSS 中。

```less
// 是网页整体变成灰色
.htmlToGray() {
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: url("data:image/svg+xml;utf8,#grayscale");
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  -webkit-filter: grayscale(1);
}

// 双击不选中文字
.clickNoSelectText {
  -moz-user-select: none;
  /*火狐*/
  -webkit-user-select: none;
  /*webkit浏览器*/
  -ms-user-select: none;
  /*IE10*/
  -khtml-user-select: none;
  /*早期浏览器*/
  user-select: none;
}
```

#### 定义带参数的属性集合

1，不给参数设置默认值。

```less
.border-radius (@radius) {
  border-radius: @radius;
  -moz-border-radius: @radius;
  -webkit-border-radius: @radius;
}

#header {
  .border-radius(4px);
}

.button {
  .border-radius(6px);
}
```

2，给参数设置默认值。

```less
.border-radius (@radius : 5px) {
  border-radius: @radius;
  -moz-border-radius: @radius;
  -webkit-border-radius: @radius;
}

#header {
  .border-radius(4px);
}
```

3，arguments 包含了所有的传递进来的参数，不用单独处理每一个参数。

```less
.box-shadow (@x: 0, @y: 0, @blur: 1px, @color: #000) {
  box-shadow: @arguments;
  -moz-box-shadow: @arguments;
  -webkit-box-shadow: @arguments;
}
.box-shadow(2px, 5px);
```

> 以上样式编译结果如下：

```css
.box-shadow {
  box-shadow: 2px 5px 1px #000;
  -moz-box-shadow: 2px 5px 1px #000;
  -webkit-box-shadow: 2px 5px 1px #000;
}
```

#### 匹配模式

1，可以通过参数与实参的名称进行匹配，也可以通过参数的个数进行匹配。

```less
//让.mixin根据不同的@switch值而表现各异
.mixin (dark, @color) {
  color: darken(@color, 10%);
}
.mixin (light, @color) {
  color: lighten(@color, 10%);
}
.mixin (@_, @color) {
  display: block;
}

//运行
@switch: light;

.class {
  .mixin(@switch, #888);
}
```

> 编译结果如下：

```css
.class {
  color: #a2a2a2;
  display: block;
}
/*
  mixin就会得到传入颜色的浅色。如果@switch设为dark，就会得到深色。

  具体实现如下：
  第一个混合定义并未被匹配，因为它只接受dark做为首参。
  第二个混合定义被成功匹配，因为它只接受light。
  第三个混合定义被成功匹配，因为它接受任意值。

  只有被匹配的混合才会被使用。变量可以匹配任意的传入值，而变量以外的固定值就仅仅匹配与其相等的。
*/
```

### 移动端滑动事件

#### 判断手指滑动方向

```js
let startx, starty;
//获得角度
function getAngle(angx, angy) {
  return (Math.atan2(angy, angx) * 180) / Math.PI;
}

//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
function getDirection(startx, starty, endx, endy) {
  let angx = endx - startx;
  let angy = endy - starty;
  let result = 0;

  //如果滑动距离太短
  if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
    return result;
  }

  let angle = getAngle(angx, angy);
  if (angle >= -135 && angle <= -45) {
    result = 1;
  } else if (angle > 45 && angle < 135) {
    result = 2;
  } else if (
    (angle >= 135 && angle <= 180) ||
    (angle >= -180 && angle < -135)
  ) {
    result = 3;
  } else if (angle >= -45 && angle <= 45) {
    result = 4;
  }
  return result;
}
//手指接触屏幕
document.addEventListener(
  "touchstart",
  function (e) {
    startx = e.touches[0].pageX;
    starty = e.touches[0].pageY;
  },
  false
);
//手指离开屏幕
document.addEventListener(
  "touchend",
  function (e) {
    let endx, endy;
    endx = e.changedTouches[0].pageX;
    endy = e.changedTouches[0].pageY;
    let direction = getDirection(startx, starty, endx, endy);
    switch (direction) {
      case 1:
        console.log("向上滑动");
        break;
      case 2:
        console.log("向下滑动");
        break;
      case 3:
        console.log("向左滑动");
        break;
      case 4:
        console.log("向右滑动");
        break;
      default:
        console.log("暂未滑动");
        break;
    }
  },
  false
);
```

### H5 相关

#### H5 判断系统类型

```js
function getSystemType() {
  if (
    navigator.userAgent.indexOf("Android") > -1 ||
    navigator.userAgent.indexOf("Adr") > -1 ||
    /(Android)/i.test(navigator.userAgent)
  ) {
    return "Android";
  } else if (
    navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ||
    /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
  ) {
    return "IOS";
  }
}
```

### Fetch API

#### text()

1，该方法用于读取 Response 对象并且将它设置为已读（因为 Responses 对象被设置为了 stream 的方式，所以它们只能被读取一次），并返回一个被解析为 USVString 格式的 Promise 对象。

```js
async function getData() {
  const res = await fetch("http://xxxxxx");
  res.text().then((res) => {
    console.log(res);
  });
}
```

> 上述代码描述的是通过 url 从 oss 上获取富文本内容（返回的是一个 html 字符串），此时获取到的结果在 body 中，如果不使用 `text()` 方法，那么获取到的数据就是不可读的。因此 text() 可以读取 response 对象，同时将其设置为已读。最后返回一被解析的 html 字符串。

### momment

#### momment 获取当天时间戳

```js
// 返回今天的起止时间戳
const beginTime = moment().startOf("day").valueOf();
const endTime = moment().valueOf(); // 当前时间戳
// const endTd = moment().endOf('day').valueOf() // 今天24点时间戳

// 返回今天0点YYYY-MM-DD HH:mm:ss格式的时间
const date = moment().startOf("day").format("YYYY-MM-DD HH:mm:ss");
```

#### momment 获取昨天时间戳

```js
// 返回昨天的起止时间戳
const beginTime = moment().subtract(1, "days").startOf("day").valueOf();
const endTime = moment().subtract(1, "days").endOf("day").valueOf();
```

#### momment 获取近七天时间戳

```js
// 返回近七天的起止时间戳
const beginTime = moment().subtract(6, "days").startOf("day").valueOf();
const endTime = moment().endOf("day").valueOf();
```

### Dva & React & Vue

#### Dva 中实现请求轮循

1，利用 yield 关键字可以阻塞代码运行的特性，将异步变为同步的特性来实现轮询，通过设置一个延时函数，延时时间为 300ms，当此次的数据请求完成之后通过延时函数延时 300ms 之后再进行下一次请求执行。

2，具体代码如下：

```js
* getLatestList(action, { call, put, select }) {
	const delay = ms => new Promise(resolve => setTimeout(resolve, ms);
	while(true) {
	  const data = yield call(getData);
    yield put({ type: 'save', data });
	  yield call(delay, 300); // 延时300ms之后进行下一次的while循环执行
  }
}
```

#### Dva 配置二级路由无法显示问题

1，Dva 配置二级路由`('/app/about')`时，路由无法显示的原因是因为在入口 index.html 中加载 js 资源时没有使用绝对路径，如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Dva Demo</title>
    <link rel="stylesheet" href="index.css" />
  </head>
  <body>
    <div id="root"></div>
    <script src="index.js"></script>
  </body>
</html>
```

> 以上配置，在设置二级路由时将不显示二级路由的内容。

2，如果要使配置的二级路由，生效，需要将 script 标签中引入的 src 资源改为绝对路径，如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Dva Demo</title>
    <link rel="stylesheet" href="index.css" />
  </head>
  <body>
    <div id="root"></div>
    <script src="/index.js"></script>
  </body>
</html>
```

> 以上配置可正常显示二级路由的内容。

3，如果使用的入口 html 为 index.ejs，则需要在加载样式及 js 资源前使用使用 base 标签将路径改为绝对路径，具体操作如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta lang="zh" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
    />
    <meta name="renderer" content="webkit" />
    <meta name="description" content="" />
    <meta name="keyword" content="" />
    <title>FRONTEND-SYSTEM</title>

    <!-- 将加载的资源路径改为绝对路径，便于显示二级路由 -->
    <base href="/" />

    <link
      rel="stylesheet"
      href="/vendor/dist/vendor-d9bf47f526ed6200df30.dev.css"
    />
    <script src="/vendor/dist/vendor-d9bf47f526ed6200df30.dev.js"></script>
  </head>

  <body>
    <div id="root"></div>
  </body>
</html>
```

> 以上配置可正常显示二级路由的内容。

#### React 路由切换报错

1，报错详情为：Warning: Hash history cannot PUSH the same path; a new entry will not be added to the history stack。

2，解决方式为：在 Link/NavLink 标签中添加 **replace** 属性即可。

```js
<Link to="/seal/register/info" replace>
  处理切换报错
</Link>
```

#### React 实现列表多选

1，具体实现方式如下：

```jsx
import React, { useState } from "react";
import { Checkbox } from "antd";
import Header from "@/components/Header";
import styles from "./index.less";

const CheckList: React.FC = () => {
  const [activeMultIds, setActiveMultIds] = useState < any > [];

  const data = [
    { id: "1", name: "aaa" },
    { id: "2", name: "bbb" },
    { id: "3", name: "ccc" },
    { id: "4", name: "ddd" },
    { id: "5", name: "eee" },
    { id: "6", name: "fff" },
  ];

  // 处理选中逻辑
  const onSelected = (e: any, _data: any) => {
    const activeMult = activeMultIds.some((i: any) => {
      if (i.id === _data.id) {
        return true;
      }
      return false;
    });
    if (activeMult) {
      const res = activeMultIds.filter((i: any) => i.id !== _data.id);
      setActiveMultIds(res);
    } else {
      const res = activeMultIds.concat(_data);
      setActiveMultIds(res);
    }
  };

  const onSelectAll = () => {
    if (activeMultIds.length < data.length) {
      setActiveMultIds(data);
    } else {
      setActiveMultIds([]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <div className={styles.content}>
          <div className={styles.checkAll}>
            <Checkbox
              onClick={onSelectAll}
              checked={activeMultIds.length === data.length}
            />
            全选
          </div>
          {data.map((i) => (
            <div
              className={
                activeMultIds.filter((j: any) => j.id === i.id).length
                  ? styles.selectWrap
                  : styles.wrap
              }
              key={i.id}
            >
              <Checkbox
                onClick={(e) => onSelected(e, i)}
                checked={activeMultIds.filter((j: any) => j.id === i.id).length}
              />
              <div className={styles.item}>名称{i.name}</div>
            </div>
          ))}
          <div>
            已选名称列表
            {activeMultIds.map((i: any) => (
              <div key={i.id}>{i.name}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckList;
```

> 上述代码中选中逻辑解析如下：
>
> 1，当 activeMult 为 true 时，说明当前点击的这一项已经存在于 activeMultIds 中，是处于选中状态的，需要将其从 activeMultIds（选中列表）中移除。
> 2，当 activeMult 为 false 时，说明当前点击的这一项不在 activeMultIds 中，即还没有被选中，需要将其加入到 activeMultIds（选中列表）中。

#### React 获取 query 参数

```js
export const getQueryParams = (url) => {
  return url
    .slice(1)
    .split("&")
    .reduce((pre, cur) => {
      const [k, v] = cur.split("=").map(decodeURIComponent);
      pre[k] = v;

      return pre;
    }, {});
};

// 使用方式传入location.search
const { formId, formGroupId } = getQueryParams(location.search);
```

#### Vue 获取 query 参数

```js
const { formId, formGroupId, active } = this.$route.query;
```

#### Vue H5 页面回退刷新页面

1、问题描述：当从 B 应用页面返回 A 应用页面时，使 A 页面能够实时刷新。

2、处理方式：使用 visibilitychange 事件。

- 在 mounted 中监听该方法。

```js
document.addEventListener("visibilitychange", function () {
  console.log(document.visibilityState);
});
```

#### react 路由任意匹配路径

1、使用场景：当多个路由需要同时引用同一个路由组件时，比如 `/home/detail`、`/about/detail`，这个时候如果不使用任意匹配，就需要同时为 home 及 about 加一个二级路由，如果不设置二级路由，直接将 detail 设置为一级路由，当跳转到 detail 页面时，如果页面左侧存在 menu 菜单，那么菜单将失去选中状态，因为此时路由路径是 `detail` 而不是 `/home/detail`，因此任意匹配就是用来解决这个问题的。

2、将详情页设置为任意匹配路径，即使用 `(.*)?/detail` 的形式，具体配置方式如下：

- router/config.js 配置文件：

```js
const config = [
  {
    key: "home",
    name: "home",
    path: "/home",
  },
  {
    key: "about",
    name: "about",
    path: "/about",
  },
  {
    key: "detail",
    name: "detail",
    path: "(.*)?/detail",
  },
];
```

- 跳转到详情的方式：

```js
history.push("/home/detail"); // 从home跳转到详情

history.push("/about/detail"); // 从about跳转到详情
```

#### 实时监听 url 中路由路径的变化

1、通过 hashchange 监听：

- 适用于 hash 路由模式。

```js
window.onhashchange = (event) => {
  console.log(event);
};

// 或者
window.addEventListener("hashchange", function (event) {
  console.log(event);
  console.log(window.localtion.hash);
});
```

2、通过 popstate 监听：

- 注意：popstate 只能监听到 history.back()、history.forward()、history.go()。

```js
window.addEventListener("popstate", function (event) {
  console.log(event);
});
```

3、实现 replaceState 和 pushState 的监听：

```js
const listenPath = function (type) {
  const historyType = history[type];
  return function () {
    const _history = historyType.apply(this, arguments);
    const e = new Event(type);
    e.arguments = arguments;
    window.dispatchEvent(e);
    return _history;
  };
};
history.pushState = listenPath("pushState");
history.replaceState = listenPath("replaceState");

// 监听
window.addEventListener("replaceState", function (e) {
  console.log("replaceState");
});
window.addEventListener("pushState", function (e) {
  console.log("pushState");
});
```

### 实现复制功能

#### react-copy-to-clipboard

1，react-copy-to-clipboard 第三方库可实现复制功能。

2，具体使用如下：

- 安装 react-copy-to-clipboard：

```json
npm install --save react-copy-to-clipboard
```

- 使用示例：

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

class App extends React.Component {
  state = {
    value: "",
    copied: false,
  };

  render() {
    return (
      <div>
        <input
          value={this.state.value}
          onChange={({ target: { value } }) =>
            this.setState({ value, copied: false })
          }
        />

        <CopyToClipboard
          text={this.state.value}
          onCopy={() => this.setState({ copied: true })}
        >
          <span>Copy to clipboard with span</span>
        </CopyToClipboard>

        <CopyToClipboard
          text={this.state.value}
          onCopy={() => this.setState({ copied: true })}
        >
          <button>Copy to clipboard with button</button>
        </CopyToClipboard>

        {this.state.copied ? (
          <span style={{ color: "red" }}>Copied.</span>
        ) : null}
      </div>
    );
  }
}

const appRoot = document.createElement("div");
document.body.appendChild(appRoot);
ReactDOM.render(<App />, appRoot);
```

### 架构原理相关

#### 双向数据绑定原理

##### 使用 Object.defineProperty 实现

1，具体实现代码如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>双向数据绑定原理</title>
  </head>
  <body>
    <span>name:</span><span id="text"></span>
    <div>
      <input type="text" id="inp" />
    </div>

    <script>
      let obj = {
        name: "",
      };

      let newObj = JSON.parse(JSON.stringify(obj));
      Object.defineProperty(obj, "name", {
        // 之所以要用newObj.name是为了防止出现死循环，因为每次获取obj.name都会出发get()方法
        get() {
          return newObj.name;
        },
        set(value) {
          value !== newObj.name && (newObj.name = value);
          observer();
        },
      });

      function observer() {
        text.innerHTML = obj.name;
        inp.value = obj.name;
      }

      setTimeout(() => {
        obj.name = "dnhyxc";
      }, 1000);

      inp.oninput = function () {
        obj.name = this.value;
      };
    </script>
  </body>
</html>
```

2，使用 Object.defineProperty 实现的缺点：

- 需要对原始数据进行克隆。

- 需要分别对对象中的每一个属性设置监听，这就会导致一上来有的属性监听不上。

  - 如：当定义了一个对象，而这个对象是一个空对象，其中没有任何属性，此时后期设置的属性就会监听不上。

##### 使用 ES6 的 Proxy 实现

1，具体实现代码如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>双向数据绑定原理</title>
  </head>
  <body>
    <span>name:</span><span id="text"></span>
    <div>
      <input type="text" id="inp" />
    </div>

    <script>
      let obj = {};

      obj = new Proxy(obj, {
        // target为监听的对象obj，prop为obj的属性
        get(target, prop) {
          return target[prop];
        },
        // target为监听的对象obj，prop为obj的属性，value为obj对应的属性值
        set(target, prop, value) {
          target[prop] = value;
          observer();
        },
      });

      function observer() {
        text.innerHTML = obj.name;
        inp.value = obj.name;
      }

      setTimeout(() => {
        obj.name = "dnhyxc";
      }, 1000);

      inp.oninput = function () {
        obj.name = this.value;
      };
    </script>
  </body>
</html>
```

2，Proxy 实现的优点：

- 不需要对原始数据进行克隆，代码简洁方便。

- 不需要对每个属性进行监听，不会出现初使对象为空的时，监听不上属性的情况。

### npm 相关

#### npm 版本更改

1，升级版本：

```js
npm install -g npm
```

2，降级版本：

```js
npm i npm@版本号 -g
```

#### npm 发布私有包

1，创建 npm 账号。

2，账号创建成功，即可在需要发布的项目终端中使用 npm login 命令进行登录。

3，在需要发布的项目终端中输入 npm publish 进行发布。

4，使用 npm unpublish 要删除的包名 --force 强制删除发布的私有包。

5，使用 npm unpublish 要删除的包名@版本号 删除指定的版本。

#### npm 私有包版本迭代

1，npm 采用语义化版本，共三位，以'.'隔开，从左至右依次代表：主版本（major）、次要版本（minor）、补丁版本（patch）。

2，变更版本号的命令：npm version [major | minor | patch]。

3，版本号更改完毕即可使用 npm publish 进行发布更新了。
