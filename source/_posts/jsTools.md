---
title: jsTools
date: 2021-08-20 11:02:09
tags: js
toc: true
declare: true
categories:
  - javaScript
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
