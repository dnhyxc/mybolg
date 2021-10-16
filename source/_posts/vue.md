---
title: Vue
date: 2021-08-16 11:25:22
tags: Vue2 Vue3
draft: true
toc: true
declare: true
categories:
  - 前端框架
---

### Vue 基础

#### 内置指令

1、**v-bind**：单向绑定解析表达式，可简写为：`:xxx`。

2、**v-model**：双向数据绑定。

3、**v-for**：遍历数组、对象、字符串。

4、**v-on**：绑定事件监听，可简写为 **@xxx**（如：@click）。

5、**v-if**：条件渲染（动态控制节点是否存在）。

6、**v-else**：条件渲染（动态控制节点是否存在）。

7、**v-show**：条件渲染（动态控制节点是否展示）。

8、**v-text**：可向其所在的节点中渲染文本内容，它与插值语法的区别在于：v-text 会替换掉节点中的内容，而`{{xx}}`插值语法则不会替换。

<!-- more -->

9、**v-html**：用法及作用与 v-text 类似，只不过 v-model 可以解析标签，而 v-text 则不行。

```html
<div>
  <div>hello,{{name}}</div>
  <div v-text="str"></div>
  <div v-html="str"></div>
</div>
```

> 注意：v-model 处在安全性问题，在网站上动态渲染任意 HTML 是非常危险的，容易导致 XSS 攻击。因此一定要在可信的内容上使用 v-html，不要用在用户提交的内容上。

10、**v-cloak**：该指令没有值，本质上是一个特殊属性，Vue 实例创建完毕并接管容器后，会删除 v-cloak 属性。可以使用 css 配合 v-cloak 解决网速慢时页面展示出`{{xxx}}`的问题。

```html
<style>
  [v-cloak] {
    display: none;
  }
</style>
<body>
  <div id="root">
    <h2 v-cloak>{{name}}</h2>
  </div>
</body>
```

11、**v-once**：该指令所在节点在初次动态渲染后，就视为静态内容了，以后数据的改变不会引起 v-once 所在结构的更新，可以用于优化性能。

```html
<body>
  <div id="root">
    <h2 v-cloak>初始化n的值是：{{n}}</h2>
    <h2 v-cloak>当前n的值是：{{n}}</h2>
    <button @click="n++">n++</button>
  </div>
</body>

<script>
  new Vue({
    el: "#root",
    data: {
      n: 1,
    },
  });
</script>
```

12、**v-pre**：该指令会跳过所在节点的编译过程。可以利用该指令跳过没有使用 vue 的指令语法，或没有使用 vue 插值语法的节点，加快编译。

#### 事件的基本使用

1、使用 v-on:xxx 或 @xxx 绑定事件，其中 xxx 是事件名。

2、事件的回调需要配置在 methods 对象中，最终会挂在 vm 上。

3、methods 中配置的函数，都是被 vue 所管理的函数，其中 this 的指向是 vm 或组件实例对象。

4、methods 中配置的函数，不要用箭头函数，否则 this 就会指向 window，不再指向 vm。

5、@click="demo" 和 @click="demo($event)" 效果一致，但后者可以传递其它参数。

6、示例代码如下：

```html
<div id="root">
  <h2>dnhyxc</h2>
  <button @click="showInfo1">不可传参</button>
  <button @click="showInfo2($event,'dnhyxc')">不可传参</button>
</div>

<script type="text/javascript">
  const vm = new Vue({
    el: "#root",
    data() {
      return {
        name: "dnhyxc",
      };
    },
    methods: {
      showInfo1(event) {
        console.log(event);
      },
      showInfo2(event, name) {
        console.log(event);
        console.log(name);
      },
    },
  });
</script>
```

#### 事件修饰符

1、prevent：阻止默认事件。

2、stop：阻止事件冒泡。

3、once：事件只触发一次。

4、capture：使用事件的捕获模式，即事件会在捕获阶段触发，而不是在默认的冒泡阶段触发。

5、self：只有 event.target 是当前操作的元素时才触发事件。

6、passive：事件的默认行为立即执行，无需等待事件回调执行完毕。

7、具体使用方式如下：

```html
<div id="root">
  <a href="baidu.com" @click.prevent="showInfo1">阻止默认事件</a>

  <div @click="showInfo2">
    <button @click.stop="showInfo3">阻止事件冒泡</button>
  </div>

  <div @click="showInfo2">
    <a href="baidu.com" @click.prevent.stop="showInfo"
      >阻止默认事件再阻止事件冒泡</a
    >
  </div>

  <button @click.once="showInfo4">事件只触发一次</button>

  <div @click:capture="showMsg(1)">
    <div @click="showMsg(1)">使用事件的捕获模式</div>
  </div>

  <div @click:self="showInfo5">
    <button @click="showInfo6">
      只有 event.target 是当前操作的元素时才触发事件
    </button>
  </div>

  <!-- 当使用wheel滚轮事件时，会先触发deme回调函数，再触发滚动事件。假如demo中有数量很庞大的计算，如10000次for循环，那么就需要等很长一段事件，滚动条才会动一下 -->
  <ul @wheel.passive="demo" class="list">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
  </ul>
</div>
```

#### 键盘事件

1、vue 中常用的按键别名：

- 回车：enter。

- 删除：delete（捕获"删除"和"退格"键）。

- 退出：esc。

- 空格：space。

- 换行：tab（特殊，必须配合 keydown 去使用）。

- 上：up。

- 下：down。

- 左：left。

- 右：right。

2、vue 为提供别名的按键，可以使用按键原始的 key 值去判定，但注意要转为 kebab-case（短横线命名）。

3、系统修饰键（用法特殊）：ctrl、alt、shift、meta。

- 配合 keyup 使用：按下修饰键的同时，再按下其它键，随后释放其它键，事件才被触发。

- 配合 keydown 使用：正常触发事件。

4、可以使用 keyCode 去指定具体的按键（不推荐）。

5、Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名。

#### 计算属性 computed

1、定义：要用的属性不存在，要通过**已有属性**计算得来。

2、原理：底层借助 Object.defineproperty 方法提供的 getter 和 setter 实现。

3、get 函数什么时候执行？

- 初次读取时会执行一次。

- 当依赖的数据发生改变时会被再次调用。

4、优势：与 methods 实现相比，内部有缓存机制（复用），效率更高，调试方便。

> 1. 计算属性最终会出现在 vm 上，直接读取使用即可。
> 2. 如果计算属性要被修改，那必须写 set 函数去响应修改，且 set 中要引起计算时依赖的数据发生改变。

5、具体代码示例如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <title>计算属性</title>
  </head>
  <body>
    <div id="root">
      <!-- 使用methods实现计算属性 -->
      <div>
        姓：<input type="text" v-model="firstName" /> <br /><br />
        名：<input type="text" v-model="lastName" /> <br /><br />
        全名：<span>{{fullName()}}</span>
      </div>

      <!-- 使用computed实现计算属性 -->
      <div>
        姓：<input type="text" v-model="firstName" /> <br /><br />
        名：<input type="text" v-model="lastName" /> <br /><br />
        全名：<span>{{fullName1}}</span>
      </div>

      <!-- 使用computed简写形式实现计算属性 -->
      <div>
        姓：<input type="text" v-model="firstName" /> <br /><br />
        名：<input type="text" v-model="lastName" /> <br /><br />
        全名：<span>{{fullName2}}</span>
      </div>
    </div>
  </body>
  <script type="text/javascript">
    Vue.config.productionTip = false; // 阻止vue在启动时生成生产提示警告
    const vm = new Vue({
      el: "#root",
      data() {
        return {
          firstName: "dnh",
          lastName: "yxc",
        };
      },
      methods: {
        fullName() {
          return `${this.firstName}-${this.lastName}`;
        },
      },
      computed: {
        // 计算属性完整写法
        fullName1: {
          /*
            get 方法会在有人读取fullName1时被调用，且返回值就最为fullName1的值。
            由于计算属性会做缓存，因此get会在初次读取fullName的时候调用一次，之后只会在所依赖的数据发生改变时才会被调用。
          */
          get() {
            console.log("getter被调用了");
            return `${this.firstName}-${this.lastName}`;
          },
          // set会在fullName1发生改变时调用
          set(value) {
            console.log("set", value);
            const arr = value.split("-");
            this.firstName = arr[0];
            this.lastName = arr[1];
          },
        },

        // 计算属性简写（必须确定只需要读取属性不需要改变属性时才使用简写形式）
        fullName2() {
          console.log("getter被调用了");
          return `${this.firstName}-${this.lastName}`;
        },
      },
    });
  </script>
</html>
```

#### watch 与 computed 的差异

1、computed 能完成的功能，watch 都能完成。

2、watch 能完成的功能，computed 不一定能完成，例如：watch 可以进行异步操作。

> 1. 所被 vue 管理的函数，最好写成普通函数，这样 this 的指向才是 vm 或组件实例对象。
> 2. 所有不被 vue 所管理的函数（定时器的回调函数、ajax 的回调函数等），最好写成箭头函数，这样 this 的指向才是 vm 或组件实例对象。

3、使用 watch 实现计算属性：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <title>使用watch实现计算属性</title>
  </head>
  <body>
    <div id="root">
      <!-- 使用methods实现计算属性 -->
      <div>
        姓：<input type="text" v-model="firstName" /> <br /><br />
        名：<input type="text" v-model="lastName" /> <br /><br />
        全名：<span>computed {{fullName1}}</span> <br /><br />
        全名：<span>watch {{fullName}}</span>
      </div>
    </div>
  </body>
  <script type="text/javascript">
    Vue.config.productionTip = false; // 阻止vue在启动时生成生产提示警告
    const vm = new Vue({
      el: "#root",
      data() {
        return {
          firstName: "dnh",
          lastName: "yxc",
          fullName: "dnh-yxc",
        };
      },
      computed: {
        fullName1() {
          return `${this.firstName}-${this.lastName}`;
        },
      },
      watch: {
        firstName(pre) {
          console.log(pre);
          return (this.fullName = `${pre}-${this.lastName}`);
        },
        lastName(pre) {
          return (this.fullName = `${this.firstName}-${pre}`);
        },
      },
    });
  </script>
</html>
```

#### 监视属性 watch

1、当被监视的属性变化时，回调函数（handler）自动调用。

- 注意：回调函数（handler）名称不能随意乱写，否则会报错。

2、监视的属性必须存在，才能进行监视。

3、监视的两种写法：

- new Vue 时传入 watch 配置。

- 创建 vm 之后，通过 vm.$watch 实现监视。

4、深度监测：

- vue 中的 watch 默认不监测对象内部值的变化（单层级对象）。

- 配置 deep:true 可以监测对象内部值的变化（多层级对象）。

> 1. vue 自身可以监测对象内部值的改变，但 vue 提供的 watch 默认不可以。
> 2. 使用 watch 时根据数据的具体结构，决定是否采用深度监测。

5、具体使用方式如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <title>监听属性</title>
  </head>
  <body>
    <div id="root">
      <h3>今天好{{info}}</h3>
      <h3>今天好{{sadInfo}}</h3>
      <!-- 写法一 -->
      <button @click="changeInfo">改变心情happy{{x}}</button>
      <!-- 写法二：绑定事件(@xxx="yyy" yyy可以是一些简单的逻辑语句 -->
      <button @click="isSad = !isSad;x++">切换心情sad{{x}}</button>
      <hr />
      <h3>a的值是：{{num.a}}</h3>
      <button @click="num.a++">a++</button>
      <h3>b的值是：{{num.b}}</h3>
      <button @click="num = {a:666,b:999}">彻底替换num</button>
    </div>
  </body>
  <script type="text/javascript">
    Vue.config.productionTip = false; // 阻止vue在启动时生成生产提示警告
    const vm = new Vue({
      el: "#root",
      data() {
        return {
          isHappy: true,
          isSad: true,
          x: 0,
          num: {
            a: 0,
            b: 0,
          },
        };
      },
      methods: {
        changeInfo() {
          this.isHappy = !this.isHappy;
          this.x++;
        },
      },
      computed: {
        info() {
          return this.isHappy ? "开心呢" : "伤心啊";
        },
        sadInfo() {
          return this.isSad ? "伤心啊" : "开心呢";
        },
      },
      // 监测属性写法一
      watch: {
        // 监测计算属性
        info: {
          handler(pre, cur) {
            console.log("info改变了", pre, cur);
          },
        },
        // 检测普通属性
        isHappy: {
          // immediate默认值为false，当为true时，会在初始化时让handler被调用一次。
          immediate: true,
          // 当isHappy发生改变时，isHappyHandler会被调用
          handler(pre, cur) {
            console.log("isHappy改变了", pre, cur);
          },
        },
        num: {
          // deep为true时，可以监视多级结构中所有属性的变化
          deep: true,
          handler(pre, cur) {
            console.log("num中的a改变了", pre, cur);
          },
        },

        // 简写形式（不需要使用deep、immediate配置项时可以使用简写）
        isSad(pre, cur) {
          console.log("watch中isSad改变了", pre, cur);
        },
      },
    });
    // 监测属性写法二（完整写法）
    vm.$watch("isSad", {
      immediate: true,
      deep: true,
      handler(pre, cur) {
        console.log("完整写法isSad改变了", pre, cur);
      },
    });

    // 简写写法
    vm.$watch("isSad", function (pre, cur) {
      console.log("简写写法isSad改变了", pre, cur);
    });
  </script>
</html>
```

#### 绑定样式

1、绑定 class 样式写法为：class="xxx"，xxx 可以是字符串，对象，数组。

- 字符串写法适用于类名不确定，个数不确定，名字不确定的情况。

- 对象写法适用于要绑定多个样式，个数不确定，名字也不确定的情况。

- 数组写法适用于要绑定多个样式，个数确定，名字也确定，但是不确定用不用的情况。

2、绑定 style 样式写法为：

- :style="{fontSize: xxx}" 其中 xxx 是动态的。

- :style="[a,b]" 其中 a、b 是样式对象。

3、具体使用示例如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <title>绑定样式</title>
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      .base {
        width: 200px;
        height: 100px;
        background-color: thistle;
        text-align: center;
        line-height: 100px;
        cursor: pointer;
      }

      .normal {
        background-color: skyblue;
      }

      .pink {
        background-color: pink;
        font-weight: 700;
      }

      .yellow {
        background-color: yellow;
        color: tomato;
      }
    </style>
  </head>
  <body>
    <div id="root">
      <!-- 绑定class样式（字符串写法）适用于样式的类名不确定，需要动态指定的情况 -->
      <div class="base" :class="color" @click="changeColor">{{name}}</div>
      <br />
      <!-- 绑定class样式（数组写法）适用于样式个数不确定，名字也不确定的情况 -->
      <div class="base" :class="colorArr" @click="changeColor1">{{name}}</div>
      <br />
      <!-- 绑定class样式（对象写法）适用于样式个数确定，名字也也确定，但要动态决定是否使用的情况 -->
      <div class="base" :class="colorObj" @click="changeColor2">{{name}}</div>
      <br />
      <!-- 绑定style样式（对象写法） -->
      <div class="base" :style="styleObj" @click="changeColor3">{{name}}</div>
      <br />
      <!-- 绑定style样式（数组写法） -->
      <div class="base" :style="styleArr" @click="changeColor4">{{name}}</div>
    </div>
  </body>
  <script type="text/javascript">
    Vue.config.productionTip = false; // 阻止vue在启动时生成生产提示警告
    const vm = new Vue({
      el: "#root",
      data() {
        return {
          name: "dnhyxc",
          color: "normal",
          colorArr: ["normal", "pink", "yellow"],
          colorObj: {
            pink: true,
            yellow: true,
          },
          styleObj: {
            fontSize: "40px",
          },
          styleArr: [
            {
              fontSize: "40px",
            },
            {
              backgroundColor: "green",
            },
          ],
        };
      },
      methods: {
        changeColor() {
          const arr = ["pink", "yellow", "normal"];
          const index = Math.floor(Math.random() * arr.length);
          this.color = arr[index];
        },
        changeColor1() {
          this.colorArr = this.colorArr.slice(1);
        },
        changeColor2() {
          this.colorObj.pink = !this.colorObj.pink;
          this.colorObj.yellow = !this.colorObj.yellow;
        },
        changeColor3() {
          let size = this.styleObj.fontSize.slice(
            0,
            this.styleObj.fontSize.length - 2
          );
          size++;
          this.styleObj.fontSize = `${size}px`;
        },
        changeColor4() {
          this.styleArr.push({
            color: "yellow",
          });
        },
      },
    });
  </script>
</html>
```

#### 条件渲染

##### v-if

1，v-if 写法：

```js
v-if = '表达式'

v-else-if = '表达式'

v-else = '表达式'
```

2，v-if 适用于切换频率较低的场景，因为它会将隐藏的元素直接从元素所在位置删除。

3，v-if 可以和 v-else-if、v-else 一起使用，但是这三者之间必须紧紧挨在一起，中间不能插入其它元素，否则判断将会被打断，导致条件判断不生效。

##### v-show

1，v-show 写法：

```js
v-show = '表达式'
```

2，v-show 适用于切换频率较高的场景，因为其特点就是隐藏的 DOM 元素是使用 `display：none` 进行隐藏的，元素依然存在。

> 使用 v-show 时，该元素一定能获取到，但是使用 v-if 时，元素可能无法获取到。

##### 条件渲染具体使用示例

```html
<div id="root">
  <h2>当前n的值为：{{n}}</h2>
  <button @click="n++">n + 1</button>

  <!-- 使用v-show进行条件渲染 -->
  <h2 v-show="n === 1">n是1我就出来</h2>

  <!-- 使用v-show进行条件渲染 -->
  <h2 v-if="n === 1">n是1我就出来</h2>

  <!-- 使用v-else-if和v-else进行条件渲染 -->
  <h2 v-if="n === 1">n是1就出来</h2>
  <h2 v-else-if="n === 2">n是2就嘿嘿嘿</h2>
  <h2 v-else-if="n === 3">n是3哈哈哈</h2>
  <h2 v-else>嘿哈嘿哈</h2>

  <!-- 使用v-if与template配合使用进行条件渲染 -->
  <template v-if="n === 1">
    <h2>嘿嘿</h2>
    <h2>哈哈</h2>
    <h2>嘿哈</h2>
  </template>
</div>
```

> template 可以防止在 3 个 h2 元素外包一层父元素，从而导致破坏原有的 DOM 结构，但是 template 只能配合 v-if 进行使用，不能配合 v-show 进行使用。

#### 列表渲染 v-for

1、v-for 用于展示列表数据。

2、语法：v-for="(item, index) in xxx" :key="唯一标识（如：id）"

3、v-for 可遍历：数组、对象、字符串、指定对象。

4、具体使用方式如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <title>列表渲染</title>
  </head>
  <body>
    <!-- v-for 遍历可以使用 in 也可以使用 of -->
    <div id="root">
      <ul>
        <!-- 遍历数组 -->
        <h3>遍历数组</h3>
        <li v-for="(p,index) in persons" :key="p.id">{{p.name}}:{{p.age}}</li>
        <br />
        <!-- 遍历对象 -->
        <h3>遍历对象</h3>
        <li v-for="(value,key) of car" :key="key">{{key}}:{{value}}</li>
        <br />
        <!-- 遍历字符串 -->
        <h3>遍历字符串</h3>
        <li v-for="(char,index) in chars" :key="char">{{char}}:{{index}}</li>
        <br />
        <!-- 遍历指定次数 -->
        <h3>遍历指定次数</h3>
        <li v-for="(number,index) in 5" :key="index">{{number}}:{{index}}</li>
      </ul>
    </div>
  </body>
  <script type="text/javascript">
    Vue.config.productionTip = false; // 阻止vue在启动时生成生产提示警告
    const vm = new Vue({
      el: "#root",
      data() {
        return {
          persons: [
            {
              id: 10,
              name: "snsn",
              age: 26,
            },
            {
              id: 20,
              name: "hmhm",
              age: 25,
            },
            {
              id: 30,
              name: "nhnh",
              age: 18,
            },
          ],
          car: {
            name: "宝马",
            price: "70w",
            color: "黑色",
          },
          chars: "dnhyxc",
        };
      },
    });
  </script>
</html>
```

#### key 的作用（原理）

1、虚拟 dom 中 key 的作用：

- key 是虚拟 dom 对象的标记，当数据发生变化时，vue 会根据「新数据」生成「新的虚拟 dom」，随后 vue 进行「新虚拟 dom」的差异比较。

2、虚拟 dom 对比规则：

- 当旧虚拟 dom 中找到了与新虚拟 dom 相同的 key 时：

  - 若虚拟 dom 中内容没变，直接使用之前的真实 dom。

  - 若虚拟 dom 中内容变了，则生成新的真实 dom，随后替换掉页面上之前的真实 dom。

- 当旧虚拟 dom 中未找到与新虚拟 dom 相同的 key 时：

  - 创建新的真实 dom，随后渲染到页面中。

3、用 index 最为 key 可能引发的问题：

- 若对数据进行逆序添加、逆序删除等破坏顺序操作时，会产生没有必要的真实 dom 更新，虽然对界面没有什么影响，但是效率极低。

- 如果结构中还包含输入类的 dom 时，会产生错误 dom 更新，导致更新的界面出问题。

4、开发中如何选择使用的 key：

- 最好使用每条数据的唯一标识，比如：id。

- 如果不存在对数据的逆序添加，逆序删除等破坏顺序的操作，仅用于渲染列表用于展示时，使用 index 作为 key 是没有问题的。

#### 列表过滤

1、可通过 watch 实现也可通过 computed 计算属性实现，具体实现方式如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <title>列表过滤</title>
  </head>
  <body>
    <!-- v-for 遍历可以使用 in 也可以使用 of -->
    <div id="root">
      <h2>使用watch实现列表过滤</h2>
      <input type="text" placeholder="请输入名字" v-model="inpValue" />
      <ul>
        <li v-for="(p,index) in filterName" :key="p.id">
          {{p.name}}:{{p.age}}
        </li>
      </ul>

      <h2>使用computed实现列表过滤</h2>
      <input type="text" placeholder="请输入名字" v-model="keywords" />
      <button @click="type = 2">升序</button>
      <button @click="type = 1">降序</button>
      <button @click="type = 0">原序</button>
      <ul>
        <li v-for="(p,index) in filterNames" :key="p.id">
          {{p.name}}:{{p.age}}
        </li>
      </ul>
    </div>
  </body>
  <script type="text/javascript">
    Vue.config.productionTip = false; // 阻止vue在启动时生成生产提示警告
    const vm = new Vue({
      el: "#root",
      data() {
        return {
          type: "0",
          inpValue: "",
          keywords: "",
          persons: [
            {
              id: 1,
              name: "snsn",
              age: 26,
            },
            {
              id: 2,
              name: "hmhm",
              age: 25,
            },
            {
              id: 3,
              name: "nhnh",
              age: 27,
            },
            {
              id: 4,
              name: "yhyh",
              age: 18,
            },
          ],
          filterName: [],
        };
      },
      // 使用watch实现过滤
      watch: {
        inpValue: {
          immediate: true,
          handler(val) {
            this.filterName = this.persons.filter((i) => i.name.includes(val));
          },
        },
      },

      // 使用methods实现
      computed: {
        filterNames() {
          const res = this.persons.filter((i) =>
            i.name.includes(this.keywords)
          );
          if (this.type) {
            res.sort((p1, p2) => {
              return this.type === 1 ? p2.age - p1.age : p1.age - p2.age;
            });
          }
          return res;
        },
      },
    });
  </script>
</html>
```

#### Vue 数据监听的原理

1、vue 会监视 data 中所有层次的数据。

2、vue 中通过 setter 实现监视，但是要在 new Vue 时就传入要监视的数据。

- 对象中一开始没有定义，在后来追加的属性，vue 默认不做响应式处理。

- 如果需要给后添加的属性做响应式，需要使用如下 API：

  - Vue.set(target, key, value) 或 vm.$set(target, key, value)。

3、如果要检测数组中的数据，需要通过包裹数组更新元素的方法实现，本质就是：

- 首先调用数组原生的方法对数组进行更新。

- 重新解析模版，进而更新页面。

4、在 vue 修改数组中的某个元素一定要用如下方法：

- push、pop、shift、unshift、splice、sort、reverse。

- Vue.set() 或 vm.$set()。

> 注意千万不能使用 set 给 vm 或 vm 的根数据对象中添加属性。

5、具体使用实例如下：

```js
// 更新对象
this.$set(this.student, "set", "男");

// 更新数组
this.student.friends.unshift({ name: "snsn", age: 18 });

// 更新数组中的某个对象
this.student.friends[0].name = "hmhm";
```

#### Vue 表单收集

1、`<input type="text" />` 则 v-model 收集的是 input 中用户输入的 value 值。

2、`<input type="radio" />` 则 v-model 收集的是 input 中的 value 值，但是需要手动给 input 设置 value 值。

3、`<input type="checkbox" />` 的情况：

- 没有配置 input 的 value 属性时，那么收集的就是 checked（勾选或为勾选，是个 boolen 值）。

- 当配置了 input 的 value 属性时：

  - v-model 的初始值是非数组，那么收集的就是 checked（勾选或为勾选，是个 boolen 值）。

  - v-model 的初始值是数组，那么收集的就是 value 组成的数组。

> v-model 的三个**修饰符**：
>
> - lazy: 失去焦点再收集数据。
> - number: 输入字符串转为有效的数字。
> - trim: 去除输入的首尾空格。

5、具体使用示例如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <title>表单收集</title>
  </head>
  <body>
    <!-- v-for 遍历可以使用 in 也可以使用 of -->
    <div id="root">
      <form @submit.prevent="onSubmit">
        账号：<input type="text" v-model.trim="userInfo.account" /><br /><br />
        密码：<input type="password" v-model="userInfo.password" /><br /><br />
        年龄：<input type="number" v-model.number="userInfo.age" /><br /><br />
        性别： 男<input type="radio" v-model="userInfo.sex" value="male" />
        女<input type="radio" v-model="userInfo.sex" value="female" />
        <br /><br />
        爱好：学习<input
          type="checkbox"
          v-model="userInfo.hobby"
          value="study"
        />
        听歌<input type="checkbox" v-model="userInfo.hobby" value="music" />
        睡觉<input type="checkbox" v-model="userInfo.hobby" value="sleep" />
        <br /><br />
        所在地
        <select v-model="userInfo.city">
          <option value="">请选择校区</option>
          <option value="hangzhou">杭州</option>
          <option value="shanghai">上海</option>
          <option value="wuhan">武汉</option>
          <option value="shenzhen">深圳</option>
        </select>
        <br /><br />
        其它信息：
        <textarea v-model.lazy="userInfo.other"></textarea><br /><br />
        <input type="checkbox" v-model="userInfo.agree" />阅读并接受<a
          href="dnhyxc.github.io"
          >《用户协议》</a
        >
        <button>提交</button>
      </form>
    </div>
  </body>
  <script type="text/javascript">
    Vue.config.productionTip = false; // 阻止vue在启动时生成生产提示警告
    const vm = new Vue({
      el: "#root",
      data() {
        return {
          userInfo: {
            account: "925419516@qq.com",
            password: "",
            sex: "male",
            hobby: ["study"],
            city: "hangzhou",
            other: "",
            agree: "",
          },
        };
      },
      methods: {
        onSubmit() {
          console.log(this.userInfo);
        },
      },
    });
  </script>
</html>
```

#### 过滤器

1、过滤器的定义就是对要显示的数据进行特定格式化后再显示（适用于一些简单的逻辑处理）。

2、定时器语法：

- 注册过滤器：`Vue.filter(name, callback)` 或 `new Vue({filters:{...}})`。

- 使用过滤器：`{{xxx | 过滤器名称}}` 或 v-bind: 属性 = 'xxx | 过滤器名称'。

> 过滤器说明：
>
> 1. 过滤器也可以接受额外的参数，但第一个参数永远都是需要过滤的属性（即`{{xxx | 过滤器名称}}`中的 xxx），第二个参数才是额外传入的参数。
> 2. 多个过滤器可以进行串联使用。
> 3. 过滤器并没有改变原本的数据，而是产生新的对应的数据。

3、具体使用如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/dayjs/1.10.6/dayjs.min.js"></script>
    <title>过滤器</title>
  </head>
  <body>
    <!-- v-for 遍历可以使用 in 也可以使用 of -->
    <div id="root">
      <h2>现在是： {{time | timeFormater("YYYY_MM_DD") | mySlice}}</h2>
    </div>
    <div id="root2">
      <h2>现在是： {{msg | mySlice}}</h2>
    </div>
  </body>
  <script type="text/javascript">
    Vue.config.productionTip = false; // 阻止vue在启动时生成生产提示警告

    // 全局过滤器
    Vue.filter("mySlice", function (value) {
      return value.slice(0, 6);
    });

    const vm = new Vue({
      el: "#root",
      data() {
        return {
          time: 1630519751000,
        };
      },
      // 局部过滤器
      filters: {
        timeFormater(value, str = "YYYY-MM-DD HH:mm:ss") {
          return dayjs(value).format(str);
        },
        mySlice(value) {
          return value.slice(0, 4);
        },
      },
    });

    new Vue({
      el: "#root2",
      data() {
        return {
          msg: "dnhyxc.github.io",
        };
      },
    });
  </script>
</html>
```

#### 自定义指令

1、局部指令定义语法：

```js
// 写法一
new Vue({
  directives: {
    指令名: "配置对象",
  },
});

// 写法二
new Vue({
  指令名: "回调函数",
});
```

2、全局指令：

```js
// 写法一
Vue.directive("指令名", "配置对象");

// 写法二
Vue.directive("指令名", "回调函数");
```

3、配置对象中常用的 3 个回调：

- bind：在指令与元素成功绑定时调用。

- inserted：在指令所在元素被插入页面时调用。

- update：在指令所在模版结构被重新解析时调用。

> 指令定义时不加 v-，但使用时要加 v-。指令名如果是多个单词，要使用 kebab-case 命名方式，不要用 camelCase 命名。

4、具体使用方式如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <title>自定义指令</title>
  </head>
  <body>
    <div id="root">
      <h2>放大10倍后n的值是：<span v-big="n"></span></h2>
      <button @click="n++">现身吧input</button>
      <input type="text" v-fbind:value="n" />
      <input type="text" v-fbind-global:value="n" />
    </div>
  </body>
  <script>
    // 全局指令
    Vue.directive("fbind-global", {
      // 在指令与元素成功绑定时会被调用
      bind(element, binding) {
        element.value = binding.value;
      },
      // 指令所在元素被插入页面时被动用
      inserted(element, binding) {
        element.focus();
      },
      // 指令所在的模版被重新解析时被调用
      update(element, binding) {
        element.value = binding.value;
      },
    });

    // 全局指令
    Vue.directive("big-global", function (element, binding) {
      element.innerText = binding.value * 10;
    });

    new Vue({
      el: "#root",
      data: {
        n: 1,
      },
      // 注意：指令中的this都是指向window
      directives: {
        // v-big会在指令与元素成功绑定时会被调用一次（初始化）以及指令所在的模版重新被解析时也会调用
        big(element, binding) {
          console.log(element, binding.value);
          console.log(this); // window
          element.innerText = binding.value * 10;
        },
        // 局部指令
        fbind: {
          // 在指令与元素成功绑定时会被调用
          bind(element, binding) {
            console.log("bind");
            element.value = binding.value;
            console.log(this); // window
          },
          // 指令所在元素被插入页面时被动用
          inserted(element, binding) {
            console.log("inserted");
            element.focus();
            console.log(this); // window
          },
          // 指令所在的模版被重新解析时被调用
          update(element, binding) {
            console.log("update");
            element.value = binding.value;
            console.log(this); // window
          },
        },
      },
    });
  </script>
</html>
```

#### 生命周期

1、常用的生命周期钩子主要有以下两个：

- mounted：其中可发送 ajax 请求、启动定时器、绑定自定义事件、订阅消息等初始化操作。

- berforeDestroy：清除定时器、解绑自定义事件、取消订阅消息等收尾工作。

2、关于销毁 Vue 实例：

- 销毁后借助 vue 开发者工具看不到任何消息。

- 销毁后自定义事件会失效，但原生 DOM 事件依然有效。

- 一般不会在 beforDestory 中操作数据、因为即使操作数据，也不会再触发更新流程了。

#### VueComponent

1、vue 中每个组件本质是一个名为 VueComponent 的构造函数，且不失程序员定义的，而是 Vue.extend 生成的。

2、如我们只需要写一个`<demo /> 或者 <demo><demo />`，Vue 解析时就会帮我们创建 school 组件的实例对象，即 Vue 帮我们执行：`new VueComponent(options)`。

3、特别注意：每次调用 Vue.extend，返回的都是一个全新的 VueComponent。

4、关于 this 的指向：

- 组件配置中：data 函数、methods 中的函数、watch 中的函数、computed 中的函数它们的 this 都是 VueComponent 实例对象。

- new Vue(options)配置中，data 函数、methods 中的函数、watch 中的函数、computed 中的函数都是指向 Vue 实例对象。

#### render 函数

1、vue.js 与 vue.runtime.xxx.js 的区别：

- vue.js 是完整版的 vue，包含核心功能和模板解析器。

- vue.runtime.xxx.js 是运行版的 vue，只包含核心功能，没有模板解析器。

2、因为 vue.runtime.xxx.js 没有模板解析器，所以不能使用 template 配置项，需要使用 render 函数接收到的 createElement 函数去指定具体内容。

#### 混合 mixin

1、混合功能：可以把多个组件共用的配置提取成一个混入对象。

2、混合的定义方式如下：

```js
export const mixin = {
  data() {
    return {
      // ...
    };
  },
  methods: {
    // ...
  },
  mounted() {
    // ...
  },
};
```

3、混合的使用，有如下两种方式：

- 全局混入：Vue.mixin(xxx)。

- 局部混入：mixins:['mixin1', 'mixin2']。

4、混合具体使用方式：

```html
<script>
  import { mixin1, mixin2 } from "../mixin";

  export default {
    name: "xxx",
    data(){
      return {
        ...,
      }
    },
    mixins:[mixin1, mixin2],
    mounted(){
      ...
    }
  };
</script>
```

> 说明：在定义 state 属性时，如果组件自身上存在于混合中相同的属性，那么以自身的为准，如果在生命周期中如 mounted 中同时定义了某些方法，那么会将它们进行混合，两者并存，并且会先执行混合中的方法。

#### plugins（插件）

1、定义 plugins.js 文件：

```js
export default {
  install(Vue) {
    // 全局过滤器
    Vue.filter("mySlice", function (value) {
      return value.slice(0, 4);
    });
    // 定义全局指令
    Vue.directive("fbind", {
      bind(element, binding) {
        element.value = binding.value;
      },
      inserted(element, binding) {
        element.focus();
      },
      update(element, binding) {
        element.value = binding.value;
      },
    });
    // 定义混入
    Vue.mixin({
      data() {
        return {
          x: 100,
          y: 200,
        };
      },
    });

    // 在原型上定义方法
    Vue.prototype.hello = () => {
      console.log("我是Vue原型上的方法");
    };
  },
};
```

2、应用 plugins：

```js
import Vue from 'vue'

import App from './App.vue'

import plugins from './plugins

Vue.config.productionTip = false

// 应用 plugins
Vue.use(plugins)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

3、在组件中使用 plugins 中定义的全局指令，过滤器等：

```html
<template>
  <div>
    <!-- 应用全局过滤器 -->
    <h2>名字：{{name | mySlice}}</h2>
    <!-- 使用mixin混合 -->
    <h2>x：{{x}}</h2>
    <h2>y：{{y}}</h2>
    <!-- 应用全局指令 -->
    <input type="text" v-fbind:value="name" />
    <button @click="“test”">测试hello方法</button>
  </div>
</template>

<script>
  export default {
    name: "xxx",
    data() {
      return {
        name: "xxx",
      };
    },
    methods: {
      test() {
        // 调用plugins中定义在原型上的方法
        this.hello();
      },
    },
  };
</script>
```

#### 自定义事件

1、自定义事件说明：

- 自定义事件是一种组件间通信的方式，适用于：**子组件像父组件传递数据**。

- 使用场景：A 是父组件，B 是子组件，B 想给 A 传递数据，那么就要在 A 中给 B 绑定自定义事件（事件的回调在 A 中）。

- 绑定自定义事件的方式：

  - 方式一：在父组件中：`<Demo @demo="demo" />` 或 `<Demo v-on:demo="demo" />`

  - 方式二：在父组件中：

  ```html
  <Demo ref="demo" />

  <!-- ... -->

  mounted(){ this.$refs.demo.$on('xxx', () => {
  <!-- do something... -->
  }) }
  ```

  - 如果想让自定义事件只能触发一次，可以使用 once 修饰符，或者 $once 方法。

- 触发自定义事件：`this.$emit('xxx', data)`。

- 解绑自定义事件：`this.$off('xxx')`。

- 组件上也可以绑定原生 DOM 事件，需要使用 native 修饰符。

- 注意：通过 `this.$refs.xxx.$on('xxx', 回调)` 绑定自定义事件时，回调要么配置在 methods 中，要么就用箭头函数，否则 this 指向会出现问题。

2、自定义事件具体写法：

- App 组件

```html
<template>
  <div class="app">
    <!-- 通过父组件给子组件传递函数类型的的props实现：子给父传递数据 -->
    <School :getSchoolName="getSchoolName" />
    <!-- 通过父组件给子组建绑定一个自定义事件实现：子给父传递数据（第一种写法，使用@或者v-on） -->
    <Student @getName="getStudentName" v-on:demo="demo" @test="test" />
    <!-- 
      通过父组件给子组建绑定一个自定义事件实现：子给父传递数据（第二种写法，使用ref，该写法比第一种写法更加灵活），
      如果需要给组件绑定原生事件需要给事件加上native修饰符
    -->
    <Teacher ref="teacher" @click.native="show" />
  </div>
</template>
<script>
  import Student from "./components/Student";
  import School from "./components/School";
  import Teacher from "./components/Teacher";

  export default {
    name: "app",
    components: {
      School,
      Student,
      Teacher
    },
    data() {
      return {
        msg: "hello",
      };
    },
    methods:{
      getSchoolName(name){
        console.log('App收到了学校名：'，name)
      }
      getStudentName(name){
        console.log('App收到了学生名：'，name)
      }
      demo(){
        console.log('demo触发了>>>>>>>>>>>>')
      }
      test(){
        console.log('>>>>>>>>>>>>test触发了')
      }
      show(){
        alert('原生事件click触发了')
      }
    },
    mounted(){
      // 该写法可以规定事件绑定的时机，比如在组件渲染完成后延迟5秒再绑定该事件
      this.$refs.teacher.$on('getName', this.getTeacherName)
      /*
      this.$refs.teacher.$on('getName', function (name) {
        console.log(this) // 当前this指向Student实例对象，并不是指向App的实例对象，可以通过箭头函数接解决该this指向问题
      })
      this.$refs.teacher.$on('getName', (name) => {
        console.log(this) // 当前this指向App实例对象
      })
      */
    }
  };
</script>
```

> 使用 ref 实现自定义事件时，绑定的回调需要注意 this 指向问题，最好在 methods 中先定义好回调，或者使用箭头函数。
> 如果要给组件绑定原生事件（如：click），需要给事件加上 native 修饰符，否则将被视为自定义事件，需要在被绑定的组件中使用$emit 触发该事件。

- School 组件

```html
<template>
  <div class="school">
    <h3>学校姓名：{{name}}</h3>
    <button @click="sendStudentName">把名字给App组件</button>
  </div>
</template>

<script>
  export default {
    name: "school",
    props: ["getSchoolName"],
    data() {
      return {
        name: "dnhyxc",
      };
    },
    methods: {
      sendSchoolName() {
        // 触发Student组件实例身上的getName事件
        this.getSchoolName(this.name);
      },
    },
  };
</script>
```

- Student 组件

```html
<template>
  <div class="student">
    <h3>学生姓名：{{name}}</h3>
    <h3>学生数量：{{number}}</h3>
    <button @click="add">number++</button>
    <button @click="sendStudentName">把名字给App组件</button>
    <button @click="demo">触发App组件demo方法</button>
    <button @click="test">触发App组件test方法</button>
    <button @click="unbind">解绑getName自定义事件</button>
    <button @click="unbindAll">批量解绑自定义事件</button>
    <button @click="kill">销毁当前Student组件的实例（vc）</button>
  </div>
</template>

<script>
  export default {
    name: "student",
    data() {
      return {
        name: "张三",
      };
    },
    methods: {
      add(){
        console.log('add 方法被调用')
        this.numbner++
      }
      sendStudentName() {
        // 触发Student组件实例身上的getName事件
        this.$emit("getName", this.name);
      },
      demo(){
        this.$emit("demo");
      }
      test(){
        this.$emit("test");
      }
      unbind() {
        // 解绑单个事件
        this.$off('getName')
      },
      unbindAll() {
        // 解绑多个事件
        this.$off(['demo','test'])
      },
      kill(){
        // 销毁了当前Student组件的实例，销毁后所有Student实例的自定义事件全部不奏效
        this.$destroy()
      }
    },
  };
</script>
```

- Teacher 组件

```html
<template>
  <div class="teacher">
    <h3>学生姓名：{{name}}</h3>
    <button @click="sendTeacherName">把名字给App组件</button>
  </div>
</template>

<script>
  export default {
    name: "teacher",
    data() {
      return {
        name: "snsn",
      };
    },
    methods: {
      sendTeacherName() {
        // 触发Student组件实例身上的getName事件
        this.$emit("getName", this.name);
      },
    },
  };
</script>
```

#### 全局事件总线

1、全局事件总线是一种组件通信的方式，适用于任意组件间的通信。

2、安装全局事件总线：

```js
new Vue({
  ...
  beforeCreate(){
    // 安装全局事件总线，$bus就是当前应用的vm
    Vue.prototype.$bus = this
  }
})
```

3、使用事件总线：

- 接收数据：A 组件想接收数据，则在 A 组件中给 $bus 绑定自定义事件，事件的回调留在 A 组件自身。

```js
mothods(){
  demo(data){
    ...
  }
},
mounted(){
  this.$bus.$on('xxx',this.demo)
}
```

- 提供数据：`this.$bus.$emit('xxx', data)`

4、最好在 **beforeDestroy** 生命周期钩子中，用 `$off` **解绑当前组件所用到的**事件。

5、事件总线具体使用：

- main.js

```js
import Vue from "vue";

import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: (h) => h(App),
  beforeCreate() {
    // 安装全局事件总线
    Vue.prototype.$bus = this;
  },
});
```

- Student.vue

```html
<template>
  <div class="student">
    <h3>学生姓名：{{name}}</h3>
    <button @click="sendStudentName">把名字给App组件</button>
  </div>
</template>

<script>
  export default {
    name: "student",
    data() {
      return {
        name: "张三",
      };
    },
    methods: {
      sendStudentName() {
        this.$bus.$emit("test", this.name);
      },
    },
  };
</script>
```

- School.vue

```html
<template>
  <div class="school">
    <h3>学校姓名：{{name}}</h3>
    <button @click="sendStudentName">把名字给App组件</button>
  </div>
</template>

<script>
  export default {
    name: "school",
    data() {
      return {
        name: "dnhyxc",
      };
    },
    mounted() {
      this.$bus.$on("test", (data) => {
        console.log("收到了Student组件中传递过来的数据", data);
      });
    },
    beforeDestory() {
      this.$bus.$off("test");
    },
  };
</script>
```

#### nextTick

1、语法：`this.$nextTick(callback)`。

2、作用：在下一次 DOM 更新结束后再执行其指定的回调。

3、使用时机：当改变数据后，要基于更新后新的 DOM 元素进行某些操作时，要在 nextTick 所指定的回调函数中执行。

```js
methods () {
  handleEdit (todo) {
    if (todo.hasOwnProperty('isEdit')) {
      todo.isEdit = true
    } else {
      // ...
    }
    this.$nextTick(function () {
      // 必须要在组件挂在完毕获取焦点才能生效，所以需要放在nextTick中执行
      this.$refs.inputTitle.focus()
    })
  }
}
```

#### slot 插槽

1、slot 默认插槽的基本使用方式：

- App.vue

```html
<template>
  <div class="container">
    <Category title="美食">
      <img src="xxx" />
    </Category>

    <Category title="美食">
      <ul>
        <li v-for="(i, index) in xxx" :key="index">{{i}}</li>
      </ul>
    </Category>

    <Category title="美食">
      <video controls src="xxx" />
    </Category>
  </div>
</template>
```

- Category.vue

```html
<template>
  <div class="category">
    <h3>{{title}}分类</h3>
    <!-- 定义一个插槽（挖坑，等使用者填坑） -->
    <slot>我是默认值，使用者没传结构是，我就会出现，否则隐身</slot>
  </div>
</template>
```

2、具名插槽的基本使用：

- App.vue

```html
<template>
  <div class="container">
    <Category title="美食">
      <!-- 使用slot属性表明需要往哪个插槽中追加结构 -->
      <img slot="center" src="xxx" />
      <a slot="footer" href="xxx">更多美食</a>
    </Category>

    <Category title="美食">
      <ul slot="center">
        <li v-for="(i, index) in xxx" :key="index">{{i}}</li>
      </ul>
      <div slot="footer">
        <a href="xxx">手机游戏</a>
        <a href="xxx">网络游戏</a>
      </div>
    </Category>

    <Category title="美食">
      <video slot="center" controls src="xxx" />
      <!-- 注意：v-slot:slotNmae 只能配合template标签一起使用 -->
      <template v-slot:footer>
        <div class="foot">
          <a href="xxx">经典</a>
          <a href="xxx">热门</a>
          <a href="xxx">推荐</a>
        </div>
        <h4>欢迎前来观影</h4>
      </div>
    </Category>
  </div>
</template>
```

- Category.vue

```html
<template>
  <div class="category">
    <h3>{{title}}分类</h3>
    <!-- 定义一个插槽（挖坑，等使用者填坑） -->
    <slot name="center">
      我是默认值，使用者没传结构是，我就会出现，否则隐身1
    </slot>
    <slot name="footer">
      我是默认值，使用者没传结构是，我就会出现，否则隐身2
    </slot>
  </div>
</template>
```

3、作用域插槽理解：**数据在组件自身，但根据数据生成的结构需要组件的使用者来决定**（games 数据在 Category 组件中，但使用数据所遍历出来的结构由 App 组件决定）。具体使用如下：

- App.vue

```html
<template>
  <div class="container">
    <Category title="游戏">
      <template scope="data">
        <ul>
          <li v-for="(i, index) in data.games" :key="index">{{i}}</li>
        </ul>
      </template>
    </Category>

    <Category title="游戏">
      <!-- 使用解构 -->
      <template scope="{games}">
        <ol>
          <li v-for="(i, index) in games" :key="index">{{i}}</li>
        </ol>
      </template>
    </Category>

    <Category title="游戏">
      <!-- slot-scope 等价于 scope -->
      <template slot-scope="{games}">
        <h4 v-for="(i, index) in games" :key="index">{{i}}</h4>
      </template>
    </Category>
  </div>
</template>
```

- Category.vue

```html
<template>
  <div class="category">
    <!-- 定义一个插槽（挖坑，等使用者填坑） -->
    <slot :games="games">
      我是默认值，使用者没传结构是，我就会出现，否则隐身1
    </slot>
  </div>
</template>

<script>
  export default {
    name: "Category",
    props: ["title"],
    data() {
      return {
        games: ["xx", "xxx", "xxxx", "xxxxx"],
      };
    },
  };
</script>
```

### Vuex

1、Vuex 基本使用：

- main.js

```js
import Vue from "vue";
import App from "./App.vue";
// import Vuex from "vuex";
import store from "./store";

Vue.config.productionTip = false;

// Vue规定，必须在创建store之前use Vuex，因此不能在此处use Vuex，否则会报错，因此需要在store/index中use vuex
// Vue.use(Vuex);

new Vue({
  el: "App",
  render: (h) => h(App),
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

- store/index

```js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// action：用于响应组件中的动作
const action = {
  increment(context, value) {
    context.commit("INCREMENT", value);
  },
  decrement(context, value) {
    context.commit("DECREMENT", value);
  },
  incrementOdd(context, value) {
    if (context.state.sum % 2) {
      context.commit("INCREMENT", value);
    }
  },
  incrementWait(context, value) {
    setTimeout(() => {
      context.commit("INCREMENT", value);
    }, 500);
  },
};

// mutations：用于操作数据
const mutations = {
  INCREMENT(state, value) {
    state.sum += value;
  },
  DECREMENT(state, value) {
    state.sum -= value;
  },
};

// state：用于存储数据
const state = {
  sum: 0,
};

// getters: 用于将state中的数值进行加工
const getters = {
  bigSum(state) {
    return state.sum * 10;
  },
};

export default new Vuex.Store({
  action,
  mutations,
  state,
  getters,
});
```

- count.vue

```html
<template>
  <div class="count">
    <h1>当前求和为：{{$store.state.sum}}</h1>
    <h3>当前求和放大10倍为：{{$store.getters.bigSum}}</h1>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementOdd">当前求和为奇数在加</button>
    <button @click="incrementWait">等一等再加</button>
  </div>
</template>

<script>
  export default {
    name: "Count",
    date() {
      return {
        n: 1,
      };
    },
    methods: {
      increment() {
        // 触发action写法
        this.$store.dispatch("increment", this.n);
      },
      decrement() {
        // 不触发action，直接触发mutations写法：如果操作的数据不是异步的，可以直接触发mutations进行操作数据
        this.$store.commit("decrement", this.n);
      },
      incrementOdd() {
        this.$store.dispatch("incrementOdd", this.n);
      },
      incrementWait() {
        this.$store.dispatch("incrementWait", this.n);
      },
    },
  };
</script>
```

### Vue 高级

#### setup

##### setup 方法说明

1，setup 是 Vue3.x 新增的一个选项，它是组件内使用 Composition API 的入口。

##### setup 执行时机

2，setup 会在 beforeCreate 之前执行，而不是在 beforeCreate 和 created 之间执行。

##### setup 参数说明

1，setup 接受两个参数，分别为：

- props: 组件传入的属性。

- context：是一个对象，由于 **setup 中不能访问 Vue2 中最常用的 this 对象**，所以 context 中就提供了 this 中最常用的三个属性：attrs、slot 和 emit，分别对应 Vue2.x 中的 $attr属性、slot插槽 和$emit 发射事件。并且这几个属性都是自动同步最新的值，所以我们每次使用拿到的都是最新值。

2，setup 中接受的 props 是响应式的， 当传入新的 props 时，会及时被更新。由于是响应式的， 所以不可以使用 ES6 解构，解构会消除它的响应式。如下写法就会消除响应式：

```js
// demo.vue
export default {
  // ...
  setup(props, context) {
    const { name } = props;
    console.log(name);
  },
};
```

3，如果在开发中即想使用解构，又不消除 props 的响应式，就可以使用 toRefs 解决，因为 toRefs 能将 reactive 对象转化为属性全部为 ref 对象的普通对象。具体使用方式如下：

```html
<template>
  <div class="homePage">
    <p>第 {{ year }} 年</p>
    <p>姓名： {{ nickname }}</p>
    <p>年龄： {{ age }}</p>
  </div>
</template>

<script>
  import { defineComponent, reactive, ref, toRefs } from "vue";
  export default defineComponent({
    setup() {
      const year = ref(0);
      const user = reactive({ nickname: "snsn", age: 26, gender: "女" });
      setInterval(() => {
        year.value++;
        user.age++;
      }, 1000);
      return {
        year,
        // 使用reRefs
        ...toRefs(user),
      };
    },
  });
</script>
```

#### reactive、ref 与 toRefs

1，在 vue2.x 中， 定义数据都是在 data 中，但是 Vue3.x 可以使用 reactive 和 ref 来进行**数据定义**。

##### reactive 与 ref 的区别

1，reactive 主要用于**处理对象**的双向绑定，但是不能处理基本类型，例如 string、number、boolean 等。

2，ref 主要用于处理 js **基础类型**的双向绑定，但也能处理对象的数据绑定，如下：

```js
setup() {
  const obj = ref({count: 1, name: "hmhm"})
  setTimeout(() =>{
    obj.value.count = obj.value.count + 1
    obj.value.name = "snsn"
  }, 1000)
  return {
    obj
  }
}
```

4，toRefs 用于将一个 reactive 对象转化为属性全部为 ref 对象的普通对象。

- 不使用 toRefs 的书写方式如下：

```html
<template>
  <div class="homePage">
    <p>第 {{ year }} 年</p>
    <p>姓名： {{ user.nickname }}</p>
    <p>年龄： {{ user.age }}</p>
  </div>
</template>

<script>
  import { defineComponent, reactive, ref, toRefs } from "vue";
  export default defineComponent({
    setup() {
      // ref 使用方式
      const year = ref(0);
      // reactive 使用方式
      const user = reactive({ nickname: "snsn", age: 26, gender: "女" });
      setInterval(() => {
        year.value++;
        user.age++;
      }, 1000);
      return {
        year,
        user,
      };
    },
  });
</script>
```

- 使用 toRefs 的书写方式如下：

```html
<template>
  <div class="homePage">
    <p>第 {{ year }} 年</p>
    <p>姓名： {{ nickname }}</p>
    <p>年龄： {{ age }}</p>
  </div>
</template>

<script>
  import { defineComponent, reactive, ref, toRefs } from "vue";
  export default defineComponent({
    setup() {
      // ref 使用方式
      const year = ref(0);
      // reactive 使用方式
      const user = reactive({ nickname: "snsn", age: 26, gender: "女" });
      setInterval(() => {
        year.value++;
        user.age++;
      }, 1000);
      return {
        year,
        // reRefs使用方式
        ...toRefs(user),
      };
    },
  });
</script>
```

> 使不使用 toRefs 的主要区别在于不使用 toRefs 时，姓名与年龄绑定到页面上时，需要使用 user.nickname，user.age，而使用 toRefs 时，绑定姓名与年龄到页面上只需要使用 nickname，age 即可。

#### vue3.x 生命周期

##### vue3.x 生命周期图谱

![生命周期](vue-live.webp)

> vue3.x 生命周期写在 setup 方法中，同时声明周期钩子都是以 onXxx 开头的，如：onMounted、onUpdated 等等。

#### watch 与 watchEffect

##### watch 方法说明

1，watch 函数用来侦听特定的数据源，并在回调函数中执行副作用。默认情况是惰性的，也就是说**仅在侦听的源数据变更时才执行回调**。

2，使用语法如下：

```js
watch(source, callback, [options]);
```

##### watch 参数说明

1，source：可以支持 string、Object、Function、Array，用于指定要侦听的响应式变量。

2，callback：执行的回调函数。

3，options：支持 deep、immediate 和 flush 选项。

##### watch 具体使用

1，监听 reactive 定义的数据：

```js
import { defineComponent, ref, reactive, toRefs, watch } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({ nickname: "xiaofan", age: 20 });

    setTimeout(() => {
      state.age++;
    }, 1000);

    // 修改age值时会触发 watch的回调
    watch(
      () => state.age,
      (curAge, preAge) => {
        console.log("newValue:", curAge, "oldValue:", preAge);
      }
    );

    return {
      ...toRefs(state),
    };
  },
});
```

2，监听 ref 定义的数据：

```js
const year = ref(0);

setTimeout(() => {
  year.value++;
}, 1000);

watch(year, (newVal, oldVal) => {
  console.log("newVal:", newVal, "oldVal:", oldVal);
});
```

3，侦听多个数据：

- 当我们需要侦听多个数据源时，可以进行合并，同时侦听多个数据，如下：

```js
watch([() => state.age, year], ([newAge, newYear], [oldAge, oldYear]) => {
  console.log("newVal:", newAge, "oldVal:", oldAge);
  console.log("newVal:", newYear, "oldVal:", oldYear);
});
```

4，侦听复杂的嵌套对象：

```js
const state = reactive({
  room: {
    id: 100,
    attrs: {
      size: "300平方米",
      type: "8室2厅",
    },
  },
});
watch(
  () => state.room,
  (newType, oldType) => {
    console.log("newType:", newType, "oldType:", oldType);
  },
  { deep: true }
);
```

> 如果不使用第三个参数 **deep:true**，是无法监听到数据变化的。前面我们提到，**默认情况下，watch 是惰性的**，那什么情况下不是惰性的，可以立即执行回调函数呢？只需要设置第三个参数 **immediate: true** 即可。

5，stop 停止监听：

- 我们在组件中创建的 watch 监听，会**在组件被销毁时自动停止**。如果在组件销毁之前我们想要停止掉某个监听，可以调用 watch() 函数的返回值，操作如下：

```js
const stopWatchRoom = watch(
  () => state.room,
  (newType, oldType) => {
    console.log("newType:", newType, "oldType:", oldType);
  },
  { deep: true }
);

setTimeout(() => {
  // 停止监听
  stopWatchRoom();
}, 3000);
```

##### watchEffect 方法说明

1，watchEffect 与 watch 使用上的区别：

```js
import { defineComponent, ref, reactive, toRefs, watchEffect } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({ nickname: "snsn", age: 26 });
    let year = ref(0);

    setInterval(() => {
      state.age++;
      year.value++;
    }, 1000);

    watchEffect(() => {
      console.log(state);
      console.log(year);
    });

    return {
      ...toRefs(state),
    };
  },
});
```

> 上述代码执行结果首先打印一次 state 和 year 值，然后每隔一秒，打印 state 和 year 值。从上面的代码可以看出，并没有像 watch 一样需要先传入依赖，watchEffect 会自动收集依赖, 只要指定一个回调函数。**在组件初始化时，会先执行一次来收集依赖**，然后当收集到的依赖中数据发生变化时，就会再次执行回调函数。

##### watchEffect 与 watch 的区别

1，watchEffect 不需要手动传入依赖。

2，watchEffect 会在组件初始化时先执行一次用来自动收集依赖。

3，watchEffect 无法获取到变化前的值，只能获取变化后的值。

#### slot 具名插槽语法

##### vue2.x 具名插槽写法

```js
// 子组件中
<slot name="title"></slot>

// 在父组件中使用
<template slot="title">
  <h1>歌曲：成都</h1>
<template>
```

##### vue2.x 作用域插槽写法

1，如果需要在 slot 上面绑定数据，可以使用作用域插槽，实现如下：

```js
// 子组件
<slot name="content" :data="data"></slot>
export default {
  data(){
    return{
      data:["走过来人来人往","不喜欢也得欣赏","陪伴是最长情的告白"]
    }
  }
}

// 在父组件中使用
<template slot="content" slot-scope="scoped">
  <div v-for="item in scoped.data">{{item}}</div>
<template>
```

##### vue3.x 中使用插槽

1，在 Vue2.x 中具名插槽和作用域插槽分别使用 slot 和 slot-scope 来实现，在 Vue3.0 中将 slot 和 slot-scope 进行了合并统一使用。Vue3.0 中 使用 v-slot 实现：

```js
// 父组件中使用
<template v-slot:content="scoped">
  <div v-for="item in scoped.data">{{item}}</div>
</template>

// 也可以简写成
<template #content="{data}">
    <div v-for="item in data">{{item}}</div>
</template>
```

#### 自定义指令

##### vue2.x 实现自定义指令

1，实现实例代码如下：

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive("focus", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus();
  },
});
```

2，在 Vue 2 中，自定义指令通过以下几个可选钩子创建：

- bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

- inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

- update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新。

- componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。

- unbind：只调用一次，指令与元素解绑时调用。

##### vue3.x 对自定义指令 API 的变更

1，vue2.x 与 vue3.x 自定义指令 API 的区别：

```
bind                 -------->    beforeMount

inserted             -------->    mounted

                     -------->    beforeUpdate 新增钩子，会在元素自身更新前触发

update               -------->    vue3.x 移除了update

componentUpdated     -------->    updated

                     -------->    beforeUnmount 新增钩子，会在元素自身被卸载前触发

unbind               -------->    unmounted
```

2，在 vue3.x 中，可以使用如下方式实现自定义指令：

```js
const { createApp } from "vue"

const app = createApp({})

// 定义自定义指令
app.directive('focus', {
    mounted(el) {
        el.focus()
    }
})

// 使用自定义指令
<input v-focus />
```
