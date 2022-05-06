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

<!-- more -->

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