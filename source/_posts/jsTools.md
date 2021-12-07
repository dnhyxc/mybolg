---
title: JsTools
date: 2021-07-20 11:02:09
tags: js
toc: true
declare: true
categories:
  - JavaScript
---

#### 检测当前页面是否被隐藏

1、使用 **visibilitychange** 事件可监测当前页面是否被隐藏，当切换页面时**document.hidden**显示为 true 则为隐藏, false 就是显示状态。

2、一般在工作用主要用到用户在页面停留了多长时间。如：爱奇艺广告播放时间居然是在当前标签页激活的时候才会进行倒计时，离开当前标签页的时候，倒计时停止。

2、基本使用方式如下：

```js
document.addEventListener("visibilitychange", function () {
  console.log(document.hidden);
});
```

<!-- more -->

3、兼容性写法如下：

```js
document.addEventListener("visibilitychange", function () {
  let hidden;
  if (typeof document.hidden !== "undefined") {
    hidden = "hidden";
  } else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
  }
  if (document.hidden) {
    document.title = "关闭";
  } else {
    document.title = "显示";
  }
});
```

#### 保留 N 位小数

```js
const toFixed = (n, fixed) => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);
// 事例
toFixed(25.198726354, 1); // 25.1
toFixed(25.198726354, 2); // 25.19
toFixed(25.198726354, 3); // 25.198
toFixed(25.198726354, 4); // 25.1987
toFixed(25.198726354, 5); // 25.19872
toFixed(25.198726354, 6); // 25.198726
```

#### 检查当前是否有元素处于焦点中

1、使用 **document.activeElement** 属性检查一个元素是否当前处于焦点。

```js
const elementIsInFocus = (el) => el === document.activeElement;
elementIsInFocus(anyElement);
// 如果在焦点中返回true，如果不在焦点中返回 false
```

#### js 实现复制功能

1、可以使用**document.execCommand("copy")**实现，具体如下：

```js
const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  // 防止唤起虚拟键盘
  el.setAttribute("readonly", "");
  // 让文本域不显示在页面可视区域内
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);

  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;

  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};
```

#### JS 实现千位分隔符

##### 实现方式一

1、首先将数字转为字符串数组，在循环整个数组，每三位添加一个分隔逗号，最后再合并成字符串。

2、由于分隔符在顺序上是从后往前添加的：比如 1234567 添加后是 1,234,567 而不是 123,456,7，所以方便起见可以先把数组倒序排列，添加完之后再将顺序倒回来，就是正常顺序了。

3、**注意**：如果数字带小数的话，要把小数部分分开处理。

```js
function numFormat(num) {
  // 分隔小数点
  num = num.toString().split(".");
  // 转换成字符数组并且倒序排列
  var arr = num[0].split("").reverse();
  var res = [];
  for (var i = 0; i < arr.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      // 添加分隔符
      res.push(",");
    }
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
console.log(numFormat(a)); // "1,234,567,894,532"
console.log(numFormat(b)); // "673,439.4542"
```

##### 实现方式二

1、使用 JS 自带的 API **toLocaleString()**，该方法返回这个数字在特定语言环境下的表示字符串。

```js
numObj.toLocaleString(locales, options);
```

> locales：缩写语言代码（BCP 47 language tag，例如：cmn-Hans-CN）的字符串或者这些字符串组成的数组。
> options：包含一些或所有的下面属性的类。decimal => 用于纯数字格式，currency => 用于货币格式，percent => 用于百分比格式，unit => 用于单位格式。

2、**注意**：该方法在没有指定区域时，返回时用默认的语言环境和默认选项格式化的字符串，所以不同地区数字格式可能会有一定的差异，因此最好确保使用 locales 参数指定了使用的语言。

3、实现数字插入千位符代码如下：

```js
const a = 1234567894532;
const b = 673439.4542;

console.log(a.toLocaleString()); // "1,234,567,894,532"
console.log(b.toLocaleString()); // "673,439.454"  （小数部分四舍五入了）
```

##### 实现方式三

1、使用 `RegExp 和 replace()` 方法。

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

> 上述代码中，对象或者字面量所匹配的内容会被第二个参数的返回值替换。

#### 改变对象属性名的方式

##### JSON.parse() && JSON.stringify()

1、缺点：如果属性值匹配到也会被更改，而且属性名中有部分匹配到也会被更改。

```js
var aaa = [
  {
    Name: "test1Name",
    type: "test",
  },
  {
    Name: "test2",
    model: "model2",
  },
];
var bbb = JSON.parse(JSON.stringify(aaa).replace(/Name/g, "title"));
console.log(bbb);
```

##### 使用递归遍历

1、使用递归遍历对数组中每一个对象的属性名进行更改。

2、函数第一个参数是要修改的对象，第二个参数传数组 key 为要被改的属性名，value 为改成的属性名。

3、函数本身是一个深拷贝，通过对其每层中对象的“键”做匹配替换即实现了多层的“键”替换，另外这里如果传空数组此函数就是一个深拷贝。

```js
function copyTrans(obj, typeArr) {
  let result;
  const { toString } = Object.prototype;
  if (toString.call(obj) === "[object Array]") {
    result = [];
    for (let i = 0; i < obj.length; i++) {
      result[i] = copyTrans(obj[i], typeArr);
    }
  } else if (toString.call(obj) === "[object Object]") {
    result = {};
    for (const _key in obj) {
      if (obj.hasOwnProperty(_key)) {
        let flag = 0;
        let _value = null;
        for (let j = 0; j < typeArr.length; j++) {
          if (typeArr[j].key === _key) {
            flag = 1;
            _value = typeArr[j].value;
          }
        }
        if (flag) {
          result[_value] = copyTrans(obj[_key], typeArr);
        } else {
          result[_key] = copyTrans(obj[_key], typeArr);
        }
      }
    }
  } else {
    return obj;
  }
  return result;
}

const arr = [
  { name: "key", age: "18" },
  { key: "name", address: "poyang" },
];

const res = copyTrans(arr, [
  { key: "name", value: "myname" },
  { key: "key", value: "myvalue" },
]);
console.log(res);
```

#### 时间转换

##### 将时长转成 时:分:秒

```js
const timeToMinute = (time) => {
  let t;
  if (time > -1) {
    const hour = Math.floor(time / 3600);
    const min = Math.floor(time / 60) % 60;
    const sec = time % 60;
    if (hour < 10) {
      t = "0" + hour + ":";
    } else {
      t = hour + ":";
    }
    if (min < 10) {
      t += "0";
    }
    t += min + ":";
    if (sec < 10) {
      t += "0";
    }
    t += sec.toFixed(2);
  }
  t = t.substring(0, t.length - 3);
  return t;
};

const res = timeToMinute(320);
console.log(res);
```

##### 将时间转成 天/时/分/秒

```js
function secondsFormat(s) {
  var day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整
  var hour = Math.floor((s - day * 24 * 3600) / 3600);
  var minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
  var second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
  return day + "天" + hour + "时" + minute + "分" + second + "秒";
}
console.log(secondsFormat(5555555)); // 64天7时12分35秒
console.log(secondsFormat(1234)); // 0天0时20分34秒
```

##### 将时间转成 年/月/日 时:分:秒

```js
function getHMS(timestamp) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "/";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "/";
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";

  var h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}

const HMS = getHMS(Date.now());
console.log(HMS); // 2021/01/12 14:06:25
```

##### 时间戳转成 YYYY-MM-DD hh:mm:ss 新思路

1、Date 的 'toJSON' 方法返回格林威治时间的 JSON 格式字符串，实际是使用 'toISOString' 方法的结果。字符串形如'2018-08-09T10:20:54.396Z'，转化为北京时间需要额外增加八个时区，我们需要取字符串前 19 位，然后把 'T' 替换为空格，即是我们需要的时间格式。

```js
function time(time = +new Date()) {
  let date = new Date(time + 8 * 3600 * 1000); // 增加8小时
  console.log(date.toJSON()); // 2021-01-12T14:20:21.511Z
  return date.toJSON().substr(0, 19).replace("T", " ");
}
const myTime = time();
console.log(myTime); // 2021-01-12 14:13:13

function getTime(time = +new Date()) {
  let date = new Date(time + 8 * 3600 * 1000); // 增加8小时
  return date.toJSON().substr(0, 19).replace("T", " ").replace(/-/g, ".");
}

const time1 = getTime();
console.log(time1); // 2021.01.12 14:18:55
```

##### 将时间转为时间戳

```js
function getTimestamp(time) {
  return new Date(time).getTime();
}
console.log(getTimestamp("2020/12/25 11:02:09")); // 1608865329000
console.log(getTimestamp("2020-12-24 11:09:02")); // 1608779342000
```

#### 获取文件后缀名

1、使用场景：上传文件判断后缀名。

```js
export function getExt(filename) {
  if (typeof filename == "string") {
    return filename.split(".").pop().toLowerCase();
  } else {
    throw new Error("filename must be a string type");
  }
}
```

#### 设置休眠事件

```js
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//使用方式
const fetchData = async () => {
  await sleep(1000);
};
```

#### 生成随机字符串

1、可以用此方式生成唯一的 id。

```js
export function uuid(length, chars) {
  chars =
    chars || "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  length = length || 8;
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
```

#### 对象转化为 FormData 对象

1、使用场景：上传文件时我们要新建一个 FormData 对象，然后有多少个参数就 append 多少次，使用该函数可以简化逻辑。

```js
export function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (Array.isArray(value)) {
      value.forEach((subValue, i) => formData.append(key + `[${i}]`, subValue));
    } else {
      formData.append(key, object[key]);
    }
  });
  return formData;
}
```

#### js 生成随机颜色

```js
// 随机生成rgb颜色
function rgb() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let rgb = "rgb(" + r + "," + g + "," + b + ")";
  return rgb;
}

// 随机生成16进制颜色
function color_16() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
  return color;
}

// 获取指定的随机颜色
const randomColor = () => {
  const colors = [
    "#a18cd1",
    "#fad0c4",
    "#ff8177",
    "#fecfef",
    "#fda085",
    "#f5576c",
    "#330867",
    "#30cfd0",
    "#38f9d7",
  ];
  var colorIndex = Math.floor(colors.length * Math.random());
  return colors[colorIndex];
};
```

#### js 随机设置字体大小

```js
// 获得一个包含最小值和最大值之间的随机数
const randomNumber = (lowerInteger = 15, upperInteger = 35) => {
  const choices = upperInteger - lowerInteger + 1;
  return Math.floor(Math.random() * choices + lowerInteger) + "px";
};
```

#### 平滑滚动到底部

```js
function toBottom() {
  function scrollToBottom() {
    // 外层容器 出现滚动条的dom
    const domWrapper = document.querySelector(".wrapper");
    (function smoothscroll() {
      // 已经被卷掉的高度
      const currentScroll = domWrapper.scrollTop;
      // 容器高度
      const clientHeight = domWrapper.offsetHeight;
      // 内容总高度
      const scrollHeight = domWrapper.scrollHeight;
      if (scrollHeight - 10 > currentScroll + clientHeight) {
        requestAnimationFrame(smoothscroll);
        domWrapper.scrollTo(
          0,
          currentScroll + (scrollHeight - currentScroll - clientHeight) / 2
        );
      }
    })();
  }
  setTimeout(scrollToBottom, 100);
}
```

#### 平滑滚动到顶部

```js
const onBackToTop = () => {
  const domWrapper = document.querySelector(".wrapper");
  const toTop = () => {
    if (domWrapper.scrollTop === 0) return;
    const speed = 100;
    domWrapper.scrollTop -= speed;
    requestAnimationFrame(toTop);
  };
  requestAnimationFrame(toTop);
};
```

#### 数组转树形结构

1、使用递归实现：

```js
const arrayToTree = (arr, pid) => {
  let res = [];
  arr.forEach((item) => {
    if (item.pid === pid) {
      let itemChildren = arrayToTree(arr, item.id);
      if (itemChildren.length) {
        item.children = itemChildren;
      }
      res.push(item);
    }
  });
  return res;
};
```

2、非递归实现：

```js
const arrayToTree = (arr) => {
  let result = [];
  if (!Array.isArray(arr) || arr.length === 0) {
    return result;
  }
  let map = {};
  arr.forEach((item) => (map[item.id] = item));
  arr.forEach((item) => {
    const parent = map[item.pid];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
};
```

#### 筛选符合条件的数据并返回树结构

```js
const filterTreeByFunc = (tree, func) => {
  if (!Array.isArray(tree) || tree.length === 0) {
    return [];
  }
  return tree.filter((item) => {
    item.children = item.children && filterTreeByFunc(item.children, func);
    return func(item) || (item.children && item.children.length);
  });
};

// 条件为show为true
const func = (item) => {
  return item.show === true;
};
```

#### findFibonacci 函数

1、在一堆正整数中，找到最长的一组斐波那契数列段：

```js
// 实现方式一
function findFibnacci(list) {
  const map = {},
    results = [];
  for (let num1 of list) {
    map[num1] = true;
    for (let num2 of list) {
      if (num2 > num1) {
        results.push([num1, num2]);
      }
    }
  }
  let longest = [];
  while (results.length) {
    for (let i = results.length - 1; i >= 0; i--) {
      let result = results[i];
      let n1 = result[result.length - 2];
      let n2 = result[result.length - 1];
      let next = n1 + n2;
      if (!map[next]) {
        if (result.length > longest.length) {
          longest = result;
        }
        results.splice(i, 1);
        continue;
      }
      result.push(next);
    }
  }
  return longest;
}

let res = findFibnacci([13, 9, 3, 8, 5, 25, 31, 11, 21]);
console.log(res);

// 实现方式二
var arr1 = arr.sort(function (a, b) {
  return a - b;
});
var tempArr = [];
tempArr.push(arr1[0], arr[1]);
for (var i = 2; i < arr1.length; i++) {
  if (arr1[i] == arr1[i - 2] + arr1[i - 1]) {
    tempArr.push(arr1[i]);
  } else {
    arr1.splice(i, 1);
    arr1 = arr1;
    i--;
  }
}
return tempArr;
```

#### 过滤出数组对象 B 不存在与数组对象 A 中的所有相

```js
const A = [
  { id: 1, name: "dnh" },
  { id: 2, name: "dnhy" },
  { id: 3, name: "dnhyx" },
  { id: 4, name: "dnhyxc" },
  { id: 5, name: "dnhyxcn" },
  { id: 6, name: "dnhyxcnt" },
];

const B = [
  { id: 11, name: "nt" },
  { id: 2, name: "ntd" },
  { id: 33, name: "ntdn" },
  { id: 77, name: "ntdnh" },
  { id: 6, name: "ntdnhy" },
];

const newArr = B.filter((i) => !A.some((j) => j.id === i.id));
console.log(newArr);
```

#### js 定时刷新页面

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>定时刷新</title>
  </head>
  <body>
    <div>定时刷新</div>
    <select class="timer">
      <option value="15">15min</option>
      <option value="30">30min</option>
      <option value="45">45min</option>
      <option value="60">60min</option>
    </select>
    <button class="handle">手动刷新</button>
    <script>
      const selectTime = document.querySelector(".timer");
      const handle = document.querySelector(".handle");

      let timer;

      const addTime15s = 1500; // 15s
      const addTime30s = 3000; // 30s
      const addTime45s = 4500; // 45s
      const addTime60s = 6000; // 60s

      let selectAddTime = addTime15s;

      selectTime.addEventListener("change", (e) => {
        if (e.target.value === "15") {
          selectAddTime = addTime15s;
          begin(selectAddTime);
        }
        if (e.target.value === "30") {
          selectAddTime = addTime30s;
          begin(selectAddTime);
        }
        if (e.target.value === "45") {
          selectAddTime = addTime45s;
          begin(selectAddTime);
        }
        if (e.target.value === "60") {
          selectAddTime = addTime60s;
          begin(selectAddTime);
        }
      });

      const reflash = () => {
        setTimeout(async () => {
          await console.log("刷新页面,刷新页面");
          begin(selectAddTime);
        }, 1000);
      };

      window.onload = () => {
        begin(selectAddTime);
      };

      handle.addEventListener("click", () => {
        if (timer) clearInterval(timer);
        reflash();
      });

      const begin = (time) => {
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
          reflash();
        }, time);
      };
    </script>
  </body>
</html>
```

#### 标记搜索关键字

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .search {
        color: red;
      }
    </style>
  </head>

  <body>
    <div class="sign">
      <div id="text">
        <p>得意时 “一日看尽长安花”</p>
        <p>艰难时 “潦倒新停浊酒杯”</p>
        <p>哪怕 “畏途巉岩不可攀”</p>
        <p>也要 “会当凌绝顶”</p>
        <p>napa “无人会，登临意”</p>
        <p>yeyao “猛志固常在”</p>
      </div>
      <p>dnhyxc</p>
      <p>DNHYXC</p>
      <p>TeSt</p>
      <p>tEsT</p>
    </div>
    <div class="outSign">
      <p>TeSt</p>
      <p>tEsT</p>
    </div>
  </body>
  <script>
    function find(keyword, color, element) {
      let sText = element.innerHTML;
      let bgColor = color || "#ffba00";
      let num = -1;

      // 匹配传入的搜索值不区分大小写 i表示不区分大小写，g表示全局搜索
      let rStr = new RegExp(keyword, "gi");

      // 匹配html元素
      let rHtml = new RegExp("\<.*?\>", "ig");

      // 存放html元素的数组
      let aHtml = sText.match(rHtml);
      let arr = sText.match(rStr);
      a = -1;

      // 替换html标签
      sText = sText.replace(rHtml, "{~}");
      sText = sText.replace(rStr, () => {
        a++;
        return (
          "<span name='addSpan' style='background-color: " +
          bgColor +
          ";'>" +
          arr[a] +
          "</span>"
        );
      });

      // 替换key
      sText = sText.replace(/{~}/g, () => {
        // 恢复html标签
        num++;
        return aHtml[num];
      });
      element.innerHTML = sText;
    }

    let element = document.querySelector(".sign");

    find("TeSt", "gold", element);
  </script>
</html>
```

#### 判断父元素是否包含子元素

1、原理：使用 **contains** 方法实现，如果 A 元素包含 B 元素，则返回 true，否则 false。

- 注意：contains 存在兼容性问题，firefox 有些版本不兼容该方法，但可以使用 compareDocumentPosition() 方法代替。它的使用形式与 contains 差不多，但返回的不是 一个布尔值，而是一个很奇怪的数值。[具体请戳这里查看](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/compareDocumentPosition)。

2、contains 语法：

```js
ParentElement.contains(childElement);
```

3、处理 contains 兼容性：

```js
const contains = function (a, b, itself) {
  // 第一个节点是否包含第二个节点
  // contains 方法支持情况：chrome+ firefox9+ ie5+，opera9.64+(估计从9.0+)，safari5.1.7+
  if (itself && a === b) return true;
  if (a.contains) {
    if (a.nodeType === 9) return true;
    return a.contains(b);
  } else if (a.compareDocumentPosition) {
    return !!(a.compareDocumentPosition(b) & 16);
  }
  while ((b = b.parentNode)) if (a === b) return true;
  return false;
};
```

#### 根据文件后缀判断文件类型

```js
const getFileType = (fileName) => {
  // 后缀获取
  let suffix = "";
  // 获取类型结果
  let result = "";
  try {
    const flieArr = fileName.split(".");
    suffix = flieArr[flieArr.length - 1];
  } catch (err) {
    suffix = "";
  }
  // fileName无后缀返回 false
  if (!suffix) {
    return false;
  }
  suffix = suffix.toLocaleLowerCase();
  // 匹配图片
  const imglist = ["png", "jpg", "jpeg", "bmp", "gif"];
  result = imglist.find((item) => item === suffix);
  if (result) {
    return "image";
  }
  // 匹配txt
  const txtlist = ["txt"];
  result = txtlist.find((item) => item === suffix);
  if (result) {
    return "txt";
  }
  // 匹配 excel
  const excelist = ["xls", "xlsx"];
  result = excelist.find((item) => item === suffix);
  if (result) {
    return "excel";
  }
  // 匹配 word
  const wordlist = ["doc", "docx"];
  result = wordlist.find((item) => item === suffix);
  if (result) {
    return "word";
  }
  // 匹配 pdf
  const pdflist = ["pdf"];
  result = pdflist.find((item) => item === suffix);
  if (result) {
    return "pdf";
  }
  // 匹配 ppt
  const pptlist = ["ppt", "pptx"];
  result = pptlist.find((item) => item === suffix);
  if (result) {
    return "ppt";
  }
  // 匹配 视频
  const videolist = [
    "mp4",
    "m2v",
    "mkv",
    "rmvb",
    "wmv",
    "avi",
    "flv",
    "mov",
    "m4v",
  ];
  result = videolist.find((item) => item === suffix);
  if (result) {
    return "video";
  }
  // 匹配 音频
  const radiolist = ["mp3", "wav", "wmv"];
  result = radiolist.find((item) => item === suffix);
  if (result) {
    return "radio";
  }
  // 匹配zip
  const zipList = ["zip"];
  result = zipList.find((item) => item === suffix);
  // 匹配zip
  const htmlList = ["html"];
  result = htmlList.find((item) => item === suffix);
  // 其他 文件类型
  return "other";
};
```
