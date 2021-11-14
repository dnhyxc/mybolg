---
title: FileOperation
date: 2021-11-08 16:02:09
toc: true
tags:
  - FileReader
  - Blob
  - URL
  - URLSearchParams
categories:
  - JavaScript
  - Blob
  - File
---

### Blob

#### Blob 概述

1、Blob（Binary Large Object）表示二进制类型的大对象。在数据库管理系统中，将二进制数据存储为一个单一个体的集合。Blob 通常是影像、声音或多媒体文件。**在 JavaScript 中 Blob 类型的对象表示不可变的类似文件对象的原始数据**。

2、Blob 由一个可选的字符串 type（通常是 MIME 类型）和 blobParts 组成：

```
                 blobParts                            type(MIME)
                     |                                    |
Blob = [Blob ArrayBuffer DOMString]  +  image/png 或 text/html 或 text/plain...
```

> MIME（Multipurpose Internet Mail Extensions）多用途互联网邮件扩展类型，是设定某种扩展名的文件用一种应用程序来打开的方式类型，当该扩展名文件被访问的时候，浏览器会自动使用指定应用程序来打开。多用于指定一些客户端自定义的文件名，以及一些媒体文件打开方式。
> 常见的 MIME 类型有：超文本标记语言文本 **.html text/html**、**PNG 图像 .png image/png**、**普通文本 .txt text/plain** 等。

<!-- more -->

#### 创建 Blob 的方式

1、通过构造函数创建 Blob 对象：

- 语法：`const myBlob = new Blob(blobParts, options)`

```js
const blob = new Blob(["hello world"], { type: "text/plain" });
```

2、相关参数说明：

- blobParts：它是一个由 ArrayBuffer，ArrayBufferView，Blob，DOMString 等对象构成的数组。DOMStrings 会被编码为 UTF-8。

- options：一个可选的对象，包含以下两个属性：

  - type —— 默认值为 ""，它代表了将会被放入到 blob 中的数组内容的 MIME 类型。

  - endings —— 默认值为 **transparent**，用于指定包含行结束符 **\n** 的字符串如何被写入。 它是以下两个值中的一个：**native**，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 **transparent**，代表会保持 blob 中保存的结束符不变。

#### Blob 创建示例

1、通过字符串创建 Blob：

```js
let myBlobParts = ["<html><h2>Hello Semlinker</h2></html>"];
let myBlob = new Blob(myBlobParts, {
  type: "text/html",
  endings: "transparent",
});

console.log(myBlob.size + "bytes size"); // 37 bytes size
console.log(myBlob.type + "is the type"); // text/html is the type
```

2、通过类型化数组和字符串创建 Blob：

```js
let hello = new Uint8Array([72, 101, 108, 108, 111]); // 二进制格式的 "hello"
let blob = new Blob([hello, " ", "dnhyxc"], { type: "text/plain" });
blob.text().then((data) => console.log(data)); // Hello dnhyxc
```

#### Blob 的属性

1、**size**：只读属性，表示 Blob 对象中所包含数据的大小（以字节为单位）。

2、**type**：只读属性，是一个字符串，表明该 Blob 对象所包含数据的 MIME 类型。如果类型未知，则该值为空字符串。

#### Blob 的方法

1、**slice**([start[, end[, contentType]]])：返回一个新的 Blob 对象，包含了源 Blob 对象中指定范围内的数据。

2、**stream**( )：返回一个能读取 blob 内容的 **ReadableStream**。

3、**text**( )：返回一个 Promise 对象且包含 blob 所有内容的 UTF-8 格式的 USVString。

4、**arrayBuffer**( )：返回一个 Promise 对象且包含 blob 所有内容的二进制格式的 ArrayBuffer。

> 由于 Blob 对象是不可改变的。我们不能直接在一个 Blob 中更改数据，但是我们可以对一个 Blob 进行分割，从其中创建新的 Blob 对象，将它们混合到一个新的 Blob 中。这种行为类似于 JavaScript 字符串：我们无法更改字符串中的字符，但可以创建新的更正后的字符串。

#### Blob 的使用场景

##### 切片上传

1、由于 File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的上下文中。所以针对大文件传输的场景，我们可以使用 slice 方法对大文件进行切割，然后分片进行上传，具体示例如下：

```js
const file = new File(["a".repeat(1000000)], "test.txt");

const chunkSize = 40000;
const url = "https://httpbin.org/post";

async function chunkedUpload() {
  for (let start = 0; start < file.size; start += chunkSize) {
    const chunk = file.slice(start, start + chunkSize + 1);
    const fd = new FormData();
    fd.append("data", chunk);

    await fetch(url, { method: "post", body: fd }).then((res) => res.text());
  }
}
```

##### 数据下载

1、使用以 ajax 从互联网上下载数据并将数据存储到 Blob 对象中：

```js
const downloadBlob = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.onload = () => {
    callback(xhr.response);
  };
  xhr.send(null);
};
```

2、除了使用 ajax 之外，也可以使用 fetch 来实现以流的方式获取二进制数据：

- 使用 fetch 获取线上图片并在本地显示：

```js
const myImage = document.querySelector("img");
const myRequest = new Request("flowers.jpg");

fetch(myRequest)
  .then(function (response) {
    return response.blob();
  })
  .then(function (myBlob) {
    let objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
  });
```

> 当 fetch 请求成功的时候，调用 response 对象的 blob() 方法，从 response 对象中读取一个 Blob 对象，然后使用 createObjectURL() 方法创建一个 objectURL，然后把它赋值给 img 元素的 src 属性从而显示这张图片。

##### Blob 用作 URL

1、**Blob URL/Object URL** 简介：

- Blob URL/Object URL 是一种伪协议，允许 Blob 和 File 对象用作图像，下载二进制数据链接等的 URL 源。在浏览器中，我们使用 URL.createObjectURL 方法来创建 Blob URL，该方法接收一个 Blob 对象，并为其创建一个唯一的 URL，其形式为 `blob:<origin>/<uuid>`，对应的示例如下：

```
blob:https://example.org/40a5fb5a-d56d-4a33-b4e2-0acf6a8e5f641
```

- 浏览器内部为每个通过 URL.createObjectURL 生成的 URL 存储了一个 URL → Blob 映射。因此，此类 URL 较短，但可以访问 Blob。生成的 URL 仅在当前文档打开的状态下才有效。它允许引用 `<img>、<a>` 中的 Blob，但如果你访问的 Blob URL 不再存在，则会从浏览器中收到 404 错误。

- 虽然 Blob URL 看似很不错，但实际上它也有副作用。虽然存储了 URL → Blob 的映射，但 Blob 本身仍驻留在内存中，浏览器无法释放它。映射在文档卸载时自动清除，因此 Blob 对象随后被释放。但是，如果应用程序寿命很长，那不会很快发生。因此，如果我们创建一个 Blob URL，即使不再需要该 Blob，它也会存在内存中。

- 针对这个问题，我们可以调用 `URL.revokeObjectURL(url)` 方法，从内部映射中删除引用，从而允许删除 Blob（如果没有其他引用），并释放内存。

2、根据上述说明，举一个 Blob 文件下载示例：

- index.html 内容：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Blob 文件下载示例</title>
  </head>

  <body>
    <button id="downloadBtn">文件下载</button>
    <script src="index.js"></script>
  </body>
</html>
```

- index.js 内容：

```js
const download = (fileName, blob) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
};

const downloadBtn = document.querySelector("#downloadBtn");
downloadBtn.addEventListener("click", (event) => {
  const fileName = "blob.txt";
  const myBlob = new Blob(["一文彻底掌握 Blob File 数据流"], {
    type: "text/plain",
  });
  download(fileName, myBlob);
});
```

##### Blob 转换为 Base64

1、URL.createObjectURL 的一个替代方法是，将 Blob 转换为 base64 编码的字符串。Base64 是一种基于 64 个可打印字符来表示二进制数据的表示方法，它常用于在处理文本数据的场合，表示、传输、存储一些二进制数据，包括 MIME 的电子邮件及 XML 的一些复杂数据。

2、在 MIME 格式的电子邮件中，base64 可以用来将二进制的字节序列数据编码成 ASCII 字符序列构成的文本。使用时，在传输编码方式中指定 base64。使用的字符包括大小写拉丁字母各 26 个、数字 10 个、加号 + 和斜杠 /，共 64 个字符，等号 = 用来作为后缀用途。

3、如何在 HTML 中嵌入 base64 编码的图片：

- 在编写 HTML 网页时，对于一些简单图片，通常会选择将图片内容直接内嵌在网页中，从而减少不必要的网络请求，但是图片数据是二进制数据，该怎么嵌入呢？绝大多数现代浏览器都支持一种名为 Data URLs 的特性，允许使用 base64 对图片或其他文件的二进制数据进行编码，将其作为文本字符串嵌入网页中。

4、Data URLs 由四个部分组成：前缀（data:）、指示数据类型的 MIME 类型、如果非文本则为可选的 base64 标记、数据本身：

```
data:[<mediatype>][;base64],<data>
```

- mediatype 是个 MIME 类型的字符串，例如 "image/jpeg" 表示 JPEG 图像文件。如果被省略，则默认值为 text/plain;charset=US-ASCII。如果数据是文本类型，你可以直接将文本嵌入（根据文档类型，使用合适的实体字符或转义字符）。如果是二进制数据，你可以将数据进行 base64 编码之后再进行嵌入。比如嵌入一张图片：

```
<img alt="logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...">
```

5、如果图片较大，图片的色彩层次比较丰富，则不适合使用这种方式，因为该图片经过 base64 编码后的字符串非常大，会明显增大 HTML 页面的大小，从而影响加载速度。 除此之外，利用 FileReader API，我们也可以方便的实现图片本地预览功能，具体代码如下：

```html
<input type="file" accept="image/*" onchange="loadFile(event)" />
<img id="output" />

<script>
  const loadFile = function (event) {
    const reader = new FileReader();
    reader.onload = function () {
      const output = document.querySelector("output");
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };
</script>
```

##### 图片压缩

1、在一些场合中，我们希望在上传本地图片时，先对图片进行一定的压缩，然后再提交到服务器，从而减少传输的数据量。在前端要实现图片压缩，我们可以利用 Canvas 对象提供的 `toDataURL()` 方法，该方法接收 **type** 和 **encoderOptions** 两个可选参数。其中 `type` 表示**图片格式**，默认为 image/png。而 `encoderOptions` 用于表示**图片的质量**，在指定图片格式为 image/jpeg 或 image/webp 的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92，其他参数会被忽略。

2、具体实现图片压缩的方式：

```js
const MAX_WIDTH = 800; // 图片最大宽度

function compress(base64, quality, mimeType) {
  let canvas = document.createElement("canvas");
  let img = document.createElement("img");
  img.crossOrigin = "anonymous";
  return new Promise((resolve, reject) => {
    img.src = base64;
    img.onload = () => {
      let targetWidth, targetHeight;
      if (img.width > MAX_WIDTH) {
        targetWidth = MAX_WIDTH;
        targetHeight = (img.height * MAX_WIDTH) / img.width;
      } else {
        targetWidth = img.width;
        targetHeight = img.height;
      }
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, targetWidth, targetHeight); // 清除画布
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      let imageData = canvas.toDataURL(mimeType, quality / 100);
      resolve(imageData);
    };
  });
}
```

- 对于返回的 Data URL 格式的图片数据，为了进一步减少传输的数据量，我们可以把它转换为 Blob 对象：

```js
function dataUrlToBlob(base64, mimeType) {
  let bytes = window.atob(base64.split(",")[1]);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
}
```

- 在转换完成后，我们就可以压缩后的图片对应的 Blob 对象封装在 FormData 对象中，然后再通过 AJAX 提交到服务器上：

```js
function uploadFile(url, blob) {
  let formData = new FormData();
  let request = new XMLHttpRequest();
  formData.append("image", blob);
  request.open("POST", url, true);
  request.send(formData);
}
```

3、Canvas 对象除了提供 toDataURL() 方法之外，它还提供了一个 toBlob() 方法，该方法的语法为：`canvas.toBlob(callback, mimeType, qualityArgument)`。

- 和 toDataURL() 方法相比，toBlob() 方法是异步的，因此多了个 callback 参数，这个 callback 回调方法默认的第一个参数就是转换好的 blob 文件信息。

4、本地图片压缩的完整示例：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>本地图片压缩</title>
  </head>
  <body>
    <input type="file" accept="image/*" onchange="loadFile(event)" />
    <script src="./compress.js"></script>
    <script>
      const loadFile = function (event) {
        const reader = new FileReader();
        reader.onload = async function () {
          let compressedDataURL = await compress(
            reader.result,
            90,
            "image/jpeg"
          );
          let compressedImageBlob = dataUrlToBlob(compressedDataURL);
          uploadFile("https://httpbin.org/post", compressedImageBlob);
        };
        reader.readAsDataURL(event.target.files[0]);
      };
    </script>
  </body>
</html>
```

##### 生成 PDF 文档

1、PDF（便携式文件格式，Portable Document Format）是由 Adobe Systems 在 1993 年用于文件交换所发展出的文件格式。在浏览器端，利用一些现成的开源库，比如 jsPDF，我们也可以方便地生成 PDF 文档。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>客户端生成 PDF 示例</title>
  </head>
  <body>
    <h3>客户端生成 PDF 示例</h3>
    <script src="https://unpkg.com/jspdf@latest/dist/jspdf.min.js"></script>
    <script>
      (function generatePdf() {
        const doc = new jsPDF();
        doc.text("Hello semlinker!", 66, 88);
        const blob = new Blob([doc.output()], { type: "application/pdf" });
        blob.text().then((blobAsText) => {
          console.log(blobAsText);
        });
      })();
    </script>
  </body>
</html>
```

- 在以上示例中，首先创建 PDF 文档对象，然后调用该对象上的 text() 方法在指定的坐标点上添加 Hello semlinker! 文本，然后我们利用生成的 PDF 内容来创建对应的 Blob 对象，需要注意的是我们设置 Blob 的类型为 application/pdf，最后把 Blob 对象中保存的内容转换为文本并输出到控制台。截取部分输出结果如下：

```
%PDF-1.3
%ºß¬à
3 0 obj
<</Type /Page
/Parent 1 0 R
/Resources 2 0 R
/MediaBox [0 0 595.28 841.89]
/Contents 4 0 R
>>
endobj
....
```

2、jsPDF 除了支持纯文本之外，它也可以生成带图片的 PDF 文档，比如：

```js
let imgData = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/...";
let doc = new jsPDF();

doc.setFontSize(40);
doc.text(35, 25, "Paranyan loves jsPDF");
doc.addImage(imgData, "JPEG", 15, 40, 180, 160);
```

### File

#### File 概述

1、File 对象提供有关文件的信息，并允许网页中的 JavaScript 读写文件，它继承了 Blob。

2、最常见的使用场合是表单的文件上传控件，用户在一个 `<input type="file">` 元素上选择文件后，浏览器会生成一个数组，里面是每一个用户选中的文件，它们都是 File 实例对象。

3、**特别说明**：File 对象是一种特殊 **Blob** 对象，并且可以用在任意的 Blob 对象的 context 中。比如说， FileReader, **URL.createObjectURL()**, **createImageBitmap()**, 及 **XMLHttpRequest.send()** 都能处理 Blob 和 File。

```js
const file = document.getElementById("fileItem").files[0];
file instanceof File; // true
```

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

##### delete(name)

1、删除已存在的查询参数：

```js
const params2 = new URLSearchParams("n=dnhyxc&from=snsn");
params2.delete("from");
console.log(params2.toString()); // n=dnhyxc
```

##### entries()

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

##### forEach(callback)

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

##### get(name)

1、该方法可以返回指定关键字对象的值，如果没有对应的值，则返回 null。

```js
const params = new URLSearchParams("n=dnhyxc&from=snsn&id=209");
console.log(params.get("n")); // dnhyxc
```

##### getAll(name)

1、以数组形式返回所有当前查询关键字对应的值。

```js
const params = new URLSearchParams("n=dnhyxc&from=snsn&n=209");
console.log(params.getAll("n")); // ['dnhyxc', '209']
```

##### has(name)

1、返回布尔值，true 或者 false，是否包含某个查询关键字。

```js
const params = new URLSearchParams("n=dnhyxc&from=snsn&id=209");
console.log(params.has("n")); // true
```

##### keys()

1、返回一个迭代器对象，允许迭代该对象中所有的关键字。

```js
const searchParams = new URLSearchParams("n=dnhyxc&from=snsn");
// 显示所有的键
for (let key of searchParams.keys()) {
  console.log(key); // n from
}
```

##### values()

1、返回一个迭代器对象，允许迭代该对象中所有的关键字值。

```js
const searchParams = new URLSearchParams("n=dnhyxc&from=snsn");
// 显示所有的值
for (let value of searchParams.values()) {
  console.log(value); // dnhyxc snsn
}
```

##### set(name, value)

1、当存在该属性时，将其属性值替换为传入的新值，不存在该属性值则直接设置。

```js
const params = new URLSearchParams("n=dnhyxc&from=snsn");
params.set("from", "hz");
params.set("id", "209");
consol.log(params.toString()); // n=dnhyxc&from=hz&id=209
```

##### sort()

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

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>createObjectURL</title>
  </head>
  <body>
    <input id="upload" type="file" />
    <img id="preview" src="" alt="预览" />

    <script>
      const upload = document.querySelector("#upload");
      const preview = document.querySelector("#preview");

      upload.onchange = function () {
        const file = upload.files[0]; //File对象
        const src = URL.createObjectURL(file);
        preview.src = src;
      };
    </script>
  </body>
</html>
```

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

### Blob、ArrayBuffer、File 的区别

#### Blob、ArrayBuffer、File 的类别

1、Blob、ArrayBuffer、File 可以归为一类，它们都是数据。

- File 对象是一种特殊 Blob 对象。

#### Blob 与 ArrayBuffer 的区别

1、ArrayBuffer 对象用于表示`通用的，固定长度的原始二进制数据缓冲区`。你不能直接操纵 ArrayBuffer 的内容，而是需要创建一个类型化数组对象或 **DataView** 对象，该对象以特定格式表示缓冲区，并使用该对象读取和写入缓冲区的内容。

2、Blob 类型的对象表示`不可变的类似文件对象的原始数据`。Blob 表示的不一定是 JavaScript 原生格式的数据。File 接口基于 Blob，继承了 Blob 功能并将其扩展为支持用户系统上的文件。

3、除非你需要使用 ArrayBuffer 提供的写入/编辑的能力，否则 Blob 格式可能是最好的。

4、Blob 对象是不可变的，而 ArrayBuffer 是可以通过 TypedArrays 或 DataView 来操作。

5、ArrayBuffer 是存在内存中的，可以直接操作。而 Blob 可以位于磁盘、高速缓存内存和其他不可用的位置。

6、虽然 Blob 可以直接作为参数传递给其他函数，比如 window.URL.createObjectURL()。但是，你可能仍需要 FileReader 之类的 File API 才能与 Blob 一起使用。

7、Blob 与 ArrayBuffer 对象之间是可以相互转化的：

- 使用 FileReader 的 readAsArrayBuffer() 方法，可以把 Blob 对象转换为 ArrayBuffer 对象。

- 使用 Blob 构造函数，如 `new Blob([new Uint8Array(data])`，可以把 ArrayBuffer 对象转换为 Blob 对象。

8、对于 HTTP 的场景，比如在 AJAX 场景下，Blob 和 ArrayBuffer 可以通过以下方式来使用：

```js
function GET(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "arraybuffer"; // or xhr.responseType = "blob";
  xhr.send();

  xhr.onload = function (e) {
    if (xhr.status != 200) {
      alert("Unexpected status code " + xhr.status + " for " + url);
      return false;
    }
    callback(new Uint8Array(xhr.response)); // or new Blob([xhr.response]);
  };
}
```

### 文件互相转换方法

#### File 文件转换为 Blob 对象

```js
let aBlob = new Blob([file], { type: file.type });
```

#### Blob 转换为 File

```js
let files = new File([blob], file.name, { type: file.type });
```

#### url 转 base64

1、原理是：利用 canvas.toDataURL 的 API 转化成 base64：

```js
function urlToBase64(url) {
  return new Promise ((resolve,reject) => {
    let image = new Image();
    image.onload = function() {
      let canvas = document.createElement('canvas');
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      // 将图片插入画布并开始绘制
      canvas.getContext('2d').drawImage(image, 0, 0);
      // result
      let result = canvas.toDataURL('image/png')
      resolve(result);
    };
    // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
    image.setAttribute("crossOrigin",'Anonymous');
    image.src = url;
    // 图片加载失败的错误处理
    image.onerror = () => {
      reject(new Error('urlToBase64 error'));
  };
}

// 调用
let imgUrL = `http://XXX.jpg`
urlToBase64(imgUrL).then(res => {
  console.log('base64', res)  // 转化后的base64图片地址
})
```

#### base64 转 blob

1、原理：利用 URL.createObjectURL 为 blob 对象创建临时的 URL：

- 方式一：

```js
function base64ToBlob({
  b64data = "",
  contentType = "",
  sliceSize = 512,
} = {}) {
  return new Promise((resolve, reject) => {
    // 使用 atob() 方法将数据解码
    let byteCharacters = atob(b64data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);
      let byteNumbers = [];
      for (let i = 0; i < slice.length; i++) {
        byteNumbers.push(slice.charCodeAt(i));
      }
      // 8 位无符号整数值的类型化数组。内容将初始化为 0。
      // 如果无法分配请求数目的字节，则将引发异常。
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    let result = new Blob(byteArrays, {
      type: contentType,
    });
    result = Object.assign(result, {
      // 这里一定要处理一下 URL.createObjectURL
      preview: URL.createObjectURL(result),
      name: `XXX.png`,
    });
    resolve(result);
  });
}

// 调用
let base64 = base64.split(",")[1];
base64ToBlob({ b64data: base64, contentType: "image/png" }).then((res) => {
  console.log("blob", res); // 转后后的blob对象
});
```

- 方式二：

```js
base64ToBlob(base64Data) {
  let arr = base64Data.split(','),
      fileType = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      l = bstr.length,
      u8Arr = new Uint8Array(l);

  while (l--) {
      u8Arr[l] = bstr.charCodeAt(l);
  }
  return new Blob([u8Arr], {
      type: fileType
  });
},
```

#### blob 转 base64

1、原理：利用 fileReader 的 readAsDataURL，将 blob 转为 base64：

```js
blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      resolve(e.target.result);
    };
    fileReader.readAsDataURL(blob);
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'));
    };
  });
}

// 调用
blobToBase64(blob).then(res => {
  console.log('base64', res)  // 转化后的base64
})
```

2、可以用于在浏览器上预览本地图片或者视频：

```js
function getWebUrl(file) {
  let url = null;
  // basic
  if (window.createObjectURL != undefined) {
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}
```
