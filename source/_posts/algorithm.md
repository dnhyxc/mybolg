---
title: 前端算法
date: 2022-04-12 19:05:57
toc: true
declare: true
tags:
  - JavaScript
categories:
  - algorithm
---

#### 判断两个数组是否相等

前提：数组可能出现嵌套，每层数组的元素都是简单数据类型。

判断相等条件：数组元素顺序和每层元素的值是否都是相同的，如：

- `a1 = [1]`、`a2 = ['1']` 此时 a1 !== a2。

- `a1 = [1, 2]`、`a2 = [1, [2]]` 此时 a1 !== a2。

- `a1 = [1, 2, 3]`、`a2 = [1, 2, 3]` 此时 a1 === a2。

- `a1 = ['a', ['b', ['c'], 'd']`、`a2 = ['a', ['b', ['c'], 'd']` 此时 a1 === a2。

具体实现方式如下：

<!-- more -->

```js
Array.prototype.equals = function (arr) {
  if (!arr) return false;
  if (this.length !== arr.length) return false;
  for (let i = 0; i < this.length; i++) {
    if (Array.isArray(this[i]) && Array.isArray(arr[i])) {
      // 如果递归时 i 中其中有一项返回 false，即直接返回 false
      if (!this[i].equals(arr[i])) return false;
    } else {
      if (this[i] !== arr[i]) return false;
    }
  }
  return true;
};

const a1 = ["a", ["b", ["c"], "d"]];
const a2 = ["a", ["b", ["c"], "d"]];
const a3 = [1, "2"];
const a4 = [1, 2];

console.log(a1.equals(a2)); // true
console.log(a3.equals(a4)); // false
```

#### 计算对象的最大层数

```js
const obj = {
  a: "a",
  b: {
    c: {
      d: "d",
      e: "e",
    },
  },
  f: {
    g: {
      h: {
        i: "i",
      },
    },
  },
};

function getLevel(obj = {}) {
  let result = 1;
  const fn = (param, level = 0) => {
    if (typeof param === "object" && param !== null) {
      Object.values(param).forEach((item) => {
        if (typeof item === "object" && item !== null) {
          fn(item, level + 1);
        } else {
          return (result = level + 1 > result ? level + 1 : result);
        }
      });
    } else {
      result = level > result ? level : result;
    }
  };
  fn(obj);
  return result;
}
```
