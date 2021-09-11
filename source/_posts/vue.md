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

- 换行：tab。

- 上：up。

- 下：down。

- 左：left。

- 右：right。

2、vue 为提供别名的按键，可以使用按键原始的 key 值去判定，但注意要转为 kebab-case（短横线命名）。

3、

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

<!-- more -->

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

```js
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

```js
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

```js
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
