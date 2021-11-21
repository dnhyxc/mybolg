---
title: DesignPattern
date: 2020-05-16 09:02:11
toc: true
tags:
  - JavaScript
categories:
  - 设计模式
---

#### 设计模式

1、设计模式是一种写代码的方式，它是为了解决特定问题而给出的简洁、优化的解决方案。

2、主要用到的设计模式有：**单例模式**、**观察者模式**、**发布订阅模式**、**策略模式**等。

#### 单例模式

1、单例模式：指的是一个构造函数一生只能有一个实例，即：不管 new 多少次，得到的都是同一个实例。

2、应用场景：可以用来实现页面自定义弹出层，类似实现 antd 中的 Modal 组件。

3、具体应用实例：

<!-- more -->

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>设计模式-单例模式</title>
    <style>
      body {
        position: relative;
        margin: 0;
        padding: 0;
        height: 100vh;
      }

      .action {
        padding: 20px;
      }

      .showModal {
        width: 88px;
        height: 32px;
      }

      .wrap {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 500px;
        border: 1px solid #ccc;
        margin: auto;
      }

      .header {
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 45px;
        padding-left: 10px;
        padding-right: 10px;
        border-bottom: 1px solid #ddd;
      }

      .close {
        cursor: pointer;
      }

      .content {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        min-height: 200px;
      }

      .footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 50px;
        padding: 0 10px;
        border-top: 1px solid #ddd;
      }

      .cancel,
      .ok {
        width: 80px;
        height: 32px;
        margin-left: 10px;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div class="action">
      <button class="showModal">显示弹窗</button>
    </div>
    <div class="wrap"></div>

    <script>
      const Modal = (function () {
        let instance = null;

        // 创建类，因为使用单例模式，该类只会被实例化一次
        class CreateModal {
          constructor() {
            this.ele = document.createElement("div");
            this.ele.className = "container";
            document.querySelector(".wrap").appendChild(this.ele);
            // 绑定事件，只需要实例化的时候执行一次就行了，目的是为this.ele的子元素通过冒泡的形式绑定事件
            this.bindEvent();
            this.callback = function () {};
          }

          // 该方法需要在每次实例化的时候都执行一次，用于实时改变content的内容
          setContent({ title, content, close = true, footer = true }) {
            this.ele.innerHTML = `
              <div class="header">
                <div>${title}</div>
                <div class="close" style="${
                  close ? "display:block" : "display:none"
                }">叉</div>
                </div>
              ${content}
              <div class="footer" style="${
                footer ? "display:flex" : "display:none"
              }">
                <button class="ok">确定</button>
                <button class="cancel">取消</button>
              </div>`;

            this.ele.style.display = "flex";
          }

          // 绑定事件，该方法只需要在实例化的时候执行一次，之后不需要再执行
          bindEvent() {
            this.ele.addEventListener("click", (e) => {
              e = e || window.event;
              const target = e.target || e.srcElement;

              if (target.className === "close") {
                this.ele.style.display = "none";
                this.callback(false);
              }

              if (target.className === "cancel") {
                this.ele.style.display = "none";
                this.callback(false);
              }

              if (target.className === "ok") {
                this.ele.style.display = "none";
                this.callback(true);
              }
            });
          }

          // 设置弹窗样式
          setStyle({ bgColor }) {
            this.ele.querySelector(".header").style.backgroundColor = bgColor;
          }
        }

        // 使用单例模式
        return function (content, cb) {
          if (!instance) {
            instance = new CreateModal();
          }
          // 每次根据传入的内容改变content的内容
          instance.setContent(content);
          // 为实例绑定回调，之所以需要写一个空的函数，是为了防止不传cb时页面报错
          instance.callback = cb || function () {};
          instance.setStyle(content);
          return instance;
        };
      })();

      const showModal = document.querySelector(".showModal");
      showModal.addEventListener("click", () => {
        const content = `<div class="content" style="height:300px">使用单例模式实现弹出层</div>`;
        const modal1 = Modal(
          { title: "单例模式", content, bgColor: "#ccc" },
          (res) => {
            console.log(res, "callback");
          }
        );
      });
    </script>
  </body>
</html>
```

#### 观察者模式

1、观察者模式：监控一个对象的状态，一旦该对象的状态发生变化，马上触发观察者对应的事件。

- 被观察者提供维护观察者的一系列方法。

- 观察者提供更新接口。

- 观察者把自己注册到被观察者中。

- 在被观察者发生变化的时候，调用观察者的方法。

2、观察者需要具备的属性及方法：

- 必须要有一个身份证明，如：观察者的名称。

- 需要有一个事件，当被观察者状态发生改变时，能触发该事件。

3、被观察者需要具备的属性及方法：

- 需要有属性，表明自己的状态。

- 需要有一个数组，用于记录都有哪些观察者观察自己。

- 需要有一个设置属性的方法。

- 需要有一个获取属性的方法。

- 需要有一个添加观察者的方法。

- 需要有一个删除观察者的方法。

- 可以有一个删除所有观察者的方法。

4、具体实现方式如下：

```js
// 观察者
class Observer {
  constructor(name, fn = () => {}) {
    this.name = name;
    this.fn = fn;
  }
}

// 被观察者
class Subject {
  constructor(state) {
    this.state = {
      name: state.name || "",
      action: state.action || "",
    };
    this.observers = [];
  }

  // 设置状态
  setState(val) {
    this.state = { ...this.state, ...val };
    this.observers.forEach((i) => {
      i.fn(val);
    });
  }

  // 获取状态
  getState() {
    return this.state;
  }

  // 添加观察者
  addObserver(obs) {
    if (!this.observers.includes(obs)) {
      this.observers.push(obs);
    }
  }

  // 删除观察者
  delObserver(obs) {
    if (this.observers.includes(obs)) {
      this.observers = this.observers.filter((i) => i !== obs);
    }
  }

  // 清除所有观察者
  delAll() {
    this.observers = [];
  }
}

const snsn = new Observer("snsn", (data) => {
  console.log(`嘻嘻！snsn发现${data.name || "你"}${data.action || ""}了`);
});

const hmhm = new Observer("hmhm", (data) => {
  console.log(`哈哈！hmhm发现${data.name || "你"}${data.action || ""}了`);
});

const sub1 = new Subject({ name: "dnhyxc", action: "code" });
const sub2 = new Subject({ action: "code" });
sub1.addObserver(snsn);
sub1.addObserver(hmhm);
sub1.setState({ action: "看电影" });
sub1.setState({ name: "听音乐的dnhyxc" });

sub2.addObserver(snsn);
sub2.addObserver(hmhm);
sub2.setState({ action: "听音乐" });
console.log(sub1);
console.log(sub2);
sub2.delObserver(hmhm);
sub2.setState({ action: "听音乐" });
console.log(sub2);

sub1.delAll();
sub1.setState({ action: "发现不了了吧" });
const res = sub1.getState();
console.log(res);
console.log(sub1);
```
