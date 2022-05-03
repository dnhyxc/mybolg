---
title: 前端算法
date: 2022-05-03 19:05:57
toc: true
declare: true
tags:
  - JavaScript
categories:
  - algorithm
---

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
