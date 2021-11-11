---
title: FileOperation
date: 2021-11-08 16:02:09
toc: true
tags:
  - FileReader
  - Blob
  - MediaSource
categories:
  - File
---

### File

#### File 概述

1、File 对象提供有关文件的信息，并允许网页中的 JavaScript 读写文件，它继承了 Blob。

2、最常见的使用场合是表单的文件上传控件，用户在一个 `<input type="file">` 元素上选择文件后，浏览器会生成一个数组，里面是每一个用户选中的文件，它们都是 File 实例对象。

3、**特别说明**：File 对象是一种特殊 **Blob** 对象，并且可以用在任意的 Blob 对象的 context 中。比如说， FileReader, **URL.createObjectURL()**, **createImageBitmap()**, 及 **XMLHttpRequest.send()** 都能处理 Blob 和 File。

```js
const file = document.getElementById("fileItem").files[0];
file instanceof File; // true
```

<!-- more -->

#### File 构造函数

1、浏览器原生提供一个 File() 构造函数，用来生成 File 实例对象。

```js
const myFile = new File(bits, name[, options]);
```

2、参数说明：

- **bits**：一个包含 ArrayBuffer，ArrayBufferView，Blob，或者 DOMString 对象的数组，或者任何这些对象的组合。这是 UTF-8 编码的文件内容。通过这个参数，也可以实现 ArrayBuffer，ArrayBufferView，Blob 转换为 File 对象。

- **name**：字符串，表示文件名或文件路径。

- **options**：配置对象，设置实例的属性。该参数可选。可选值有如下两种：

  - `type`：DOMString，表示将要放到文件中的内容的 MIME 类型。默认值为 "" 。

  - `lastModified`：数值，表示文件最后修改时间的 Unix 时间戳（毫秒）。默认值为 Date.now()。

3、使用示例如下：

```js
const myFile = new File(["dnhyxc1", "dnhyxc2"], "dnhyxc.txt", {
  type: "text/plain",
});
```

4、根据已有 blob 对象创建 File 对象：

```js
const myFile = new File([blob], "leo.png", { type: "image/png" });
```

#### File 实例属性

1、**File.lastModified**：只读属性，用户获取最后修改时间，是个时间戳（自 UNIX 时间起始值（1970 年 1 月 1 日 00:00:00 UTC）以来的毫秒数）。

2、**File.name**：只读属性，返回文件名。

3、**File.size**：只读属性，返回文件大小（单位字节）。

4、**File.type**：只读属性，返回文件的 MIME 类型。

5、**File.lastModifiedDate**：只读属性，返回文件最后的修改时间，一个 Date 对象。

```js
const myFile = document.querySelector(".fileInp");

myFile.addEventListener("change", function (e) {
  const file = e.target.files[0];
  console.log(file.name); // 4m.jpg
  console.log(file.size); // 215626
  console.log(file.type); // image/jpeg
  console.log(file.lastModified); // 1636091486080
  console.log(file.lastModifiedDate); // Fri Nov 05 2021 13:51:26 GMT+0800 (中国标准时间)
});
```

#### File 实例方法

1、File 对象没有定义任何方法，但是它从 Blob 接口继承了以下方法：

```js
File.slice([start[, end[, contentType]]])
```

2、slice 方法会返回一个新的 File 对象，它包含有源 File 对象中指定范围内的数据。

### FileList

#### FileList 概述

1、FileList 对象是一个类数组对象，每个成员都是一个 File 实例，主要出现在两种场合：

- 通过 `<input type="file" multiple>` 控件的 files 属性，返回一个 FileList 实例。另外，当 input 元素拥有 **multiple** 属性，则可以用它来选择多个文件。

- 通过拖放文件，查看 DataTransfer.files 属性，返回一个 FileList 实例。

```js
const multipleInp = document.querySelector(".multipleInp");
multipleInp.addEventListener("change", function (e) {
  const files = e.target.files;
  console.log(files instanceof FileList); // true
  console.log(files);
  /*
  FileList {0: File, 1: File, length: 2}
    0: File
      lastModified: 1636091486080
      lastModifiedDate: Fri Nov 05 2021 13:51:26 GMT+0800 (中国标准时间) {}
      name: "4m.jpg"
      size: 215626
      type: "image/jpeg"
      webkitRelativePath: ""
      [[Prototype]]: File
    1: File
      lastModified: 1636091419330
      lastModifiedDate: Fri Nov 05 2021 13:50:19 GMT+0800 (中国标准时间) {}
      name: "11.jpg"
      size: 26050
      type: "image/jpeg"
      webkitRelativePath: ""
      [[Prototype]]: File
      length: 2
      [[Prototype]]: FileList        
  */

  console.log(files[0]);
  /*
    lastModified: 1636091486080
    lastModifiedDate: Fri Nov 05 2021 13:51:26 GMT+0800 (中国标准时间) {}
    name: "4m.jpg"
    size: 215626
    type: "image/jpeg"
    webkitRelativePath: ""
  */
});
```

#### FileList 实例属性

1、**FileList.length**：只读属性，返回列表中的文件数量。

#### FileList 实例方法

1、FileList.item()：用来返回指定位置的实例，从 0 开始，类似于通过索引获取`files[0]、files[1]`。

> 由于 FileList 实例是个类数组对象，可以直接用方括号运算符，即 myFileList[0] 等同于 myFileList.item(0) ，所以一般用不到 item()方法。

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

1、**fr.abort** ( )：终止读取操作，readyState 属性将变成 2。

2、**fr.readAsArrayBuffer** ( )：以 ArrayBuffer 的格式读取文件，读取完成后 result 属性将返回一个 `ArrayBuffer` 实例。

3、**fr.readAsDataURL** ( )：读取完成后，result 属性将返回一个 `Data URL 格式（Base64 编码）的字符串`，代表文件内容。

4、**fr.readAsText** ( )：读取完成后，result 属性将返回文件内容的`文本字符串`。

5、**fr.readAsBinaryString** ( )：读取完成后，result 属性将返回原始的`二进制数据（二进制字符串）`。

### URL & URLSearchParams

#### URL 概述

1、URL 接口用于解析、构造、规范化和编码 URL。其构造的实例支持若干属性和方法，可以用来读写 URL 相关的属性值。我们甚至可以把文件内容作为 URL 的一部分进行呈现。

#### URL 与 URLSearchParams 的作用

1、当需要对地址栏中的 URL 地址进行分析处理，需要自己进行字符串分析，例如：`https://dnhyxc.gitee.io/file/?s=url`，如果我们需要获取 s 的属性值，就需要进行字符串切割或者进行正则匹配。而 URL 与 URLSearchParams 就是用来对 url 进行处理的，如下：

```js
new URL("https://dnhyxc.gitee.io/file/?n=dnhyxc").searchParams.get("n"); // dnhyxc

new URLSearchParams("?n=dnhyxc").get("n"); // dnhyxc
```

#### URLSearchParams() 语法

1、URLSearchParams() 语法如下：

```js
// URL查询字符串
const myUrlSearchParams = new URLSearchParams(strSearchParams);
// 查询字符序列
const myUrlSearchParams = new URLSearchParams(arrSearchSequence);
// 查询键值对象
const myUrlSearchParams = new URLSearchParams(objSearchKeyValue);
```

2、参数说明：

- strSearchParams：表示 URL 查询字符串，或者对当前地址栏地址的查询字符串。

```js
const params1 = new URLSearchParams("?n=dnhyxc");

const params2 = new URLSearchParams(location.search);
```

- arrSearchSequence：数组形式的查询字符序列。

```js
const params3 = new URLSearchParams([
  ["n", "dnhyxc"],
  ["id", 1],
]);
```

- objSearchKeyValue：键值对形式的查询对象。

```js
const params4 = new URLSearchParams({ n: "dnhyxc", id: 2 });
```

#### URLSearchParams 实例方法

1、执行 new URLSearchParams() 的返回值 myUrlSearchParams 就是一个 URLSearchParams 实例。

##### toString()

1、把 URLSearchParams 对象转换成查询字符串。

```js
const params = new URLSearchParams("?n=dnhyxc"); // 可以省略问号直接'n=dnhyxc'
params.append("from", "snsn");
console.log(params1.toString()); // n=dnhyxc&from=snsn
```

##### append(name, key)

1、append 方法可以添加新的键值对作为查询参数：

```js
const params = new URLSearchParams("?n=dnhyxc"); // 可以省略问号直接'n=dnhyxc'
params.append("from", "snsn");
console.log(params1.toString()); // n=dnhyxc&from=snsn
```

##### URLSearchParams.delete(name)

1、删除已存在的查询参数：

```js
const params2 = new URLSearchParams("n=dnhyxc&from=snsn");
params2.delete("from");
console.log(params2.toString()); // n=dnhyxc
```

##### URLSearchParams.entries()

1、返回查询参数的迭代器对象，可以遍历该迭代器对象获得所有的键值对，如使用 for..of 进行遍历：

```js
let searchParams = new URLSearchParams("n=dnhyxc&from=snsn&id=209");

console.log(searchParams.entries()); // Iterator {}

const params = {};

for (let arr of searchParams.entries()) {
  console.log(arr[0] + ", " + arr[1]);
  /*
    n, dnhyxc
    from, snsn
    id, 209
  */
  params[arr[0]] = arr[1];
}
console.log(params, "params"); // {n: 'dnhyxc', from: 'snsn', id: '209'}
```

##### URLSearchParams.forEach(callback)

1、该方法可以遍历查询对象，其中 callback 是遍历方法，支持两个参数，分别是每个键值对的值和键。

```js
const searchParams = new URLSearchParams("n=dnhyxc&from=snsn&id=209");
// 输出值和键的内容
searchParams.forEach(function (value, key) {
  console.log(key, value);
  /*
    n dnhyxc
    from snsn
    id 209
  */
});
```

##### URLSearchParams.get(name)

1、该方法可以返回指定关键字对象的值，如果没有对应的值，则返回 null。

```js
const params = new URLSearchParams("n=dnhyxc&from=snsn&id=209");
console.log(params.get("n")); // dnhyxc
```

##### URLSearchParams.getAll(name)

1、以数组形式返回所有当前查询关键字对应的值。

```js
const params = new URLSearchParams("n=dnhyxc&from=snsn&n=209");
console.log(params.getAll("n")); // ['dnhyxc', '209']
```

##### URLSearchParams.has(name)

1、返回布尔值，true 或者 false，是否包含某个查询关键字。

```js
const params = new URLSearchParams("n=dnhyxc&from=snsn&id=209");
console.log(params.has("n")); // true
```

##### URLSearchParams.keys()

1、返回一个迭代器对象，允许迭代该对象中所有的关键字。

```js
const searchParams = new URLSearchParams("n=dnhyxc&from=snsn");
// 显示所有的键
for (let key of searchParams.keys()) {
  console.log(key); // n from
}
```

##### URLSearchParams.values()

1、返回一个迭代器对象，允许迭代该对象中所有的关键字值。

```js
const searchParams = new URLSearchParams("n=dnhyxc&from=snsn");
// 显示所有的值
for (let value of searchParams.values()) {
  console.log(value); // dnhyxc snsn
}
```

##### URLSearchParams.set(name, value)

1、当存在该属性时，将其属性值替换为传入的新值，不存在该属性值则直接设置。

```js
const params = new URLSearchParams("n=dnhyxc&from=snsn");
params.set("from", "hz");
params.set("id", "209");
consol.log(params.toString()); // n=dnhyxc&from=hz&id=209
```

##### URLSearchParams.sort()

1、该方法将此对象中包含的所有键/值对就地排序，并返回 undefined。排序顺序是以 Unicode 码位为依据。该方法使用一种稳定的排序算法（即保留具有相同键的键/值对之间的相对顺序）。

```js
const searchParams = new URLSearchParams("c=6&a=2&d=9&b=3&a=1");
// 键值对排序
searchParams.sort();
// 显示排序后的查询字符串
console.log(searchParams.toString()); // a=2&a=1&b=3&c=6&d=9
```

#### URL() 语法

1、URL() 语法如下：

```js
const myUrl = new URL(url, [base]);
```

2、参数说明：

- url：相对地址或者绝对地址。如果是相对地址，需要设置 base 参数，如果是绝对地址，则会忽略 base 设置。我们也可以使用 URL 对象作为 url 参数。此时作用的值是 URL 对象中的 href 属性值。

- base：如果 URL 地址是相对地址，则需要这个参数，作用是作为相对计算的基础地址。我们也可以使用 URL 对象作为 base 参数，此时作用的值是 URL 对象中的 href 属性值。如果不设置该参数，则会按照空字符串''进行处理。

> 如果参数值无法组合成完整 URL 地址，则会报 TypeError 错误。

3、具体用法如下：

```js
const base = "https://dnhyxc.gitee.io";
console.log(new URL("dnhyxc", base).href); // https://dnhyxc.gitee.io/dnhyxc
console.log(new URL("/dnhyxc", base).href); // https://dnhyxc.gitee.io/dnhyxc
```

- 使用 URL 对象作为参数：

```js
const base = "https://dnhyxc.gitee.io";
const urlFromBase = new URL("dnhyxc", base);
console.log(new URL(urlFromBase).href); // https://dnhyxc.gitee.io/dnhyxc
console.log(new URL("snsn", urlFromBase).href); // https://dnhyxc.gitee.io/snsn
```

- 带有较深层级 base 地址和不同相对地址形式：

```js
const base = "https://dnhyxc.gitee.io/dnhyxc/a/b/c";
console.log(new URL("study/url", base).href); // https://dnhyxc.gitee.io/dnhyxc/a/b/study/url
// ./和裸露相对地址没有区别
console.log(new URL("./study/url", base).href); // https://dnhyxc.gitee.io/dnhyxc/a/b/study/url
// 向上一层URL层级深度
console.log(new URL("../study/url", base).href); // https://dnhyxc.gitee.io/dnhyxc/a/study/url
// 层级按照斜杠进行计算
console.log(new URL("../study/url", base + "/").href); // https://dnhyxc.gitee.io/dnhyxc/a/b/study/url
// 斜杠开头表示从origin开始匹配，即从io开始
console.log(new URL("/study/url", base).href); // https://dnhyxc.gitee.io/study/url
```

- 不同域名：

```js
const base = "https://www.baidu.com";
// 没有协议的url认为是相对地址，协议取自base地址
console.log(new URL("//gitee.dnhyxc.com", "http://www.baidu.com").href); // http://gitee.dnhyxc.com/
console.log(new URL("//gitee.dnhyxc.com", "https://www.baidu.com").href); // https://gitee.dnhyxc.com/
// 这里url是完整的绝对地址，因此，忽略后面的base参数
console.log(new URL("https://gitee.dnhyxc.com", base).href); // https://gitee.dnhyxc.com/
```

#### URL 实例对象的属性

1、new URL()返回值就是一个实例对象。

```js
const giteeUrl = new URL(
  "https://dnhyxc.gitee.io:80/dnhyxc/snsn?n=dnhyxc#fileList"
);
const ftp = new URL("ftp://username:password@192.168.1.1/path/file");
```

##### hash

1、URL 地址中的锚链值，包含字符串'#'，例如上述 giteeUrl 中，url.hash 的返回值是'#fileList'。

##### host

1、URL 地址中 host 主机地址，包括协议端口号，上述 giteeUrl.host 的返回值是'dnhyxc.gitee.io:80'。

##### hostname

1、URL 地址中主机名称，不包括端口号，上述 giteeUrl.hostname 的返回值是'dnhyxc.gitee.io'。

##### href

1、完成的 URL 地址。

##### pathname

1、返回 URL 中的目录+文件名。例如上述 ftp.pathname 的返回值是'/dnhyxc/snsn/'。

##### search

1、返回 URL 地址的查询字符串，如果有参数，则返回值以问号'?'开头。例如上述 giteeUrl.search 的返回值是'?n=dnhyxc'。

##### origin （只读）

1、返回 URL 地址的来源，会包含 URL 协议，域名和端口。如：'https://dnhyxc.gitee.io:80'。

##### password

1、返回 URL 地址域名前的密码。ftp 协议中比较常见。如：上述 ftp 中的 ftp.password 的返回值是'password'。

##### username

1、返回 URL 地址域名前的用户名。ftp 协议中比较常见。如：上述 ftp 中的 ftp.username 的返回值是'username'。

##### port

1、返回 URL 地址中的端口号。例如上述 giteeUrl 中 giteeUrl.port 的返回值是'80'，ftp.port 的返回值是''。

##### protocol

1、返回 URL 地址的协议，包括后面的冒号':'。例如上述 giteeUrl.protocol 的返回值是'https:'，ftp.protocol 的返回值是'ftp:'。

##### searchParams

1、返回一个 URLSearchParams 对象，可以调用 URLSearchParams 对象各种方法，对查询字符串进行非常方便的处理。例如我们想要知道查询关键字 n 对应的值，可以：

```js
giteeUrl.searchParams.get("n"); // dnhyxc
```

> 上述属性中，除了 origin 属性是只读的之外，其它属性都可以用来给 url 实例进行赋值操作，即可读可写。

#### URL 实例的方法

##### toString()

1、返回的完整的 URL 地址，可以理解为 URL.href 的另外一种形式，不过这个只能输出，不能修改值。

##### toJSON()

1、同样返回完整的 URL 地址，返回的字符串和 URL.href 属性一样。

#### URL 实例的静态方法

##### URL.createObjectURL(object)

1、可以把 File，Blob 或者 MediaSource 对象变成一个一个唯一的 blob URL。其中参数 object 可以是 File，Blob 或者 MediaSource 对象。

##### URL.revokeObjectURL(objectURL)

1、撤消之前使用 URL.createObjectURL()创建的 URL 对象。其中参数 objectURL 表示之前使用 URL.createObjectURL()创建的 URL 返回值。

##### 静态方法使用示例

1、使用 Ajax 请求一个跨域图片避免 canvas 产生跨域问题，即可以使用这两个静态方法：

```js
const xhr = new XMLHttpRequest();
xhr.onload = function () {
  const url = URL.createObjectURL(this.response);
  const img = new Image();
  img.onload = function () {
    // 此时你就可以使用canvas对img为所欲为了
    // ... code ...
    // 图片用完后记得释放内存
    URL.revokeObjectURL(url);
  };
  img.src = url;
};
xhr.open("GET", url, true);
xhr.responseType = "blob";
xhr.send();
```
