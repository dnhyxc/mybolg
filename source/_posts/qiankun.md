---
title: qiankun
date: 2021-02-01 21:02:06
tags:
  - dva
  - qiankun
  - webpack
  - eslint
  - TypeScript
  - JavaScript
toc: true
top: true
declare: true
categories:
  - 项目构建
  - qiankun
  - dva
---

<div class="coverInfo coverInfoTop" title="前言：近年来越来越多前端开始把注意力集中在复杂前端应用的架构上面。尤其是如何将前端整体分解，每一块可以独立开发、测试和部署，同时对用户而言仍是一个整体。这种技术就是微前端，我们将其定义为：一种多个团队通过独立发布功能的方式来共同构建现代化 web 应用的技术手段及方法策略。">
  前言：近年来越来越多前端开始把注意力集中在复杂前端应用的架构上面。尤其是如何将前端整体分解，每一块可以独立开发、测试和部署，同时对用户而言仍是一个整体。这种技术就是微前端，我们将其定义为：一种多个团队通过独立发布功能的方式来共同构建现代化 web 应用的技术手段及方法策略。
</div>

<div class="browserCover">
  <!-- <img src="c3.png" class="browserCover changeImg"> -->
</div>

<div 
  class="coverInfo" 
  title="本文主要讲的是基于 qiankun 搭建的微前端架构示例，主应用为 Dva，子应用接入 React 和 Vue 这两个主流的前端框架。其中将会详细的介绍主子应用的配置以及主子应用间的通信等。最终将实现一个可以用于实际项目开发的企业级微前端应用。"
>
  本文主要讲的是基于 qiankun 搭建的微前端架构示例，主应用为 React，子应用接入 React 和 Vue 这两个主流的前端框架。其中将会详细的介绍主子应用的配置以及主子应用间的通信等。最终将实现一个可以用于实际项目开发的企业级微前端应用。
</div>

<!-- more -->

### 微前端

#### 前言

当下前端领域，基于 vue、react、angular 的单页应用（spa）开发模式已经成为业界主流。随着时间推移以及应用的功能丰富，应用开始变得庞大臃肿，逐渐成为一个难以维护的屎山应用，难以维护不说，每次开发、上线新需求时还需要花费不少的时间来构建项目，而且有可能改一处而动全身，对开发人员的开发效率和体验都造成了不好的影响。因此将一个屎山应用拆分为多个子应用就势在必行了。

#### 什么是微前端

1、微前端（Micro-Frontends）是一种类似于微服务的架构，它将微服务的理念应用于浏览器端，即将 Web 应用由单一的单体应用转变为多个小型前端应用聚合为一的应用。同时各个前端应用还可以独立运行、独立开发、独立部署。

#### 微前端的特点

1、**与技术无关**：主框架不限制接入应用的技术栈，微应用具备完全自主权。

2、**各个子应用可以独立开发独立部署**：微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新。

3、**增量升级：在面对各种复杂场景时**，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略。

4、**独立运行时**：每个微应用之间状态隔离，运行时状态不共享。

#### 微前端能解决什么问题

##### 拆分和细化

1、基于业务来拆分应用。每个应用都有一个自己的仓库，**独立开发**、**独立部署**、**独立访问**、**独立维护**，还可以根据团队的特点自主选择适合自己的技术栈，极大的提升了开发人员的效率和体验，甚至隔壁团队误发布了一个半成品或有问题的特性也无关紧要。如果一个微前端已经准备好发布了，它就应该随时可发布，并且只由开发维护它的团队来定。

##### 整合历史系统

1、在不少的业务中，或多或少会存在一些历史项目，介于日常运营，这些系统需要结合到新框架中来使用还不能抛弃，对此我们也没有理由浪费时间和精力重写旧的逻辑。而微前端可以将这些系统进行整合，在基本不修改来逻辑的同时来同时兼容新老两套系统并行运行。

##### 技术栈无关

1、通过基座应用，可以融合 vue，react，angla，或者 js 开发的子项目。

#### 实现微前端常用的技术方案

##### iframe

1、iframe 作为一项非常古老的技术，也可以用于实现微前端。通过 iframe，可以很方便的将一个应用嵌入到另一个应用中，而且两个应用之间的 css 和 javascript 是相互隔离的，不会互相干扰。

2、iframe 的优点：

- 实现简单。

- css 和 js 天然隔离，互不干扰。

- 完全与技术栈无关。

- 多个子应用可以并存。

- 不需要对现有应用进行改造。

3、iframe 的缺点：

- 用户体验不好，每次切换应用时，浏览器需要重新加载页面。

- UI 不同步，DOM 结构不共享。

- 全局上下文完全隔离，内存变量不共享，子应用之间通信、数据同步虽然可以使用 **postMessage** 实现，但是过程相对比较复杂。

- 子应用切换时可能需要重新登录，体验不好。

- 对 SEO 不友好。

##### single-spa

1、single-spa 是最早的微前端框架，兼容多种前端技术栈。

2、现在前端应用开发的主流模式基本上都是基于 react、Vue 的单页应用开发模式。在这种模式下，我们需要维护一个路由注册表，每个路由对应各自的页面组件 url。切换路由时，如果是一个新的页面，需要动态获取路由对应的 js 脚本，然后执行脚本并渲染出对应的页面；如果是一个已经访问过的页面，那么直接从缓存中获取已缓存的页面方法，执行并渲染出对应的页面。而在微前端中，single-spa 就提供了新的技术方案，可以帮助我们实现类似单页应用的体验。

- 在 single-spa 方案中，应用被分为两类：基座应用和子应用。其中，基座应用，是一个单独的应用，用于聚合子应用。而子应用就是需要被基座所聚合的应用。

- 和单页应用的实现原理类似，single-spa 会在基座应用中维护一个路由注册表，每个路由对应一个子应用。基座应用启动以后，当我们切换路由时，如果是一个新的子应用，会动态获取子应用的 js 脚本，然后执行脚本并渲染出相应的页面；如果是一个已经访问过的子应用，那么就会从缓存中获取已经缓存的子应用，激活子应用并渲染出对应的页面。

3、single-spa 的优点：

- 切换应用时，浏览器不用重载页面，提供和单页应用一样的用户体验。

- 完全与技术栈无关。

- 多个子应用可并存。

- 生态丰富。

4、single-spa 的缺点：

- 需要对原有应用进行改造，应用要兼容接入 sing-spa 和独立使用。

- 使用复杂，关于子应用加载、应用隔离、子应用通信等问题，需要框架使用者自己实现。

- 子应用间相同资源会重复加载。

##### qiankun

1、qiankun 是阿里开源的微前端框架，它是基于 single-spa 进行二次封装，和 single-spa 一样，qiankun 也能给我们提供类似单页应用的用户体验。

2、qiankun 在框架层面解决了使用 single-spa 时需要开发人员自己编写子应用加载、通信、隔离等逻辑的问题，对开发者而言更加的友好了。

### qiankun

#### [qiankun](https://qiankun.umijs.org/zh) 简介

1、由于 qiankun 是在 single-spa 的基础上做的二次开发，所以 qiankun 的用法和 single-spa 基本一样，也分为 application 模式和 parcel 模式。

2、application 模式是基于路由工作的，它将应用分为两类：基座应用和子应用。其中，基座应用需要维护一个路由注册表，根据路由的变化来切换子应用；子应用是一个个独立的应用，需要提供生命周期方法供基座应用使用。parcel 模式和 application 模式相反，它与路由无关，子应用切换是手动控制的。

### qiankun 主子应用配置

#### 主应用

1、首先需要安装 qiankun：

```
yarn add qiankun or npm i qiankun -S
```

2、注册微应用：

- 修改 [micro-react-main/src/index.tsx](https://github.com/dnhyxc/qiankun-react-main/blob/master/src/index.tsx) 注册微应用并启动：

```js
import React from "react";
import ReactDOM from "react-dom";

import {
  registerMicroApps,
  start,
  runAfterFirstMounted,
  addGlobalUncaughtErrorHandler,
  initGlobalState,
  MicroAppStateActions,
} from "qiankun";

import "./index.css";
import { login, notfound, failed } from "./pages/config";
import App from "./App";

interface IProps {
  loading?: boolean;
  needHeader?: boolean;
  path?: string;
  type?: string;
}

const render = (porps: IProps) => {
  ReactDOM.render(
    <React.StrictMode>
      <App {...porps} />
    </React.StrictMode>,
    document.getElementById("main-root")
  );
};

render({ loading: true });

const appStart = () => {
  // 设置子应用首次加载loading效果
  const loader = (loading: boolean) => render({ loading });

  interface AppParams {
    name: string;
    entry: string;
    activeRule: string;
    container: string;
    loader: (loading: boolean) => void;
    props: {};
  }

  const apps: AppParams[] = [
    {
      name: "reactApp",
      entry: "//localhost:8989",
      activeRule: "/dnhyxc/react",
      container: "#sub-app-viewport",
      loader,
      props: {
        info: "来了老弟",
        routerBase: "/dnhyxc/react", // 给子应用下发的基础路由
      },
    },
    {
      name: "vueApp",
      entry: "//localhost:8686",
      activeRule: "/dnhyxc/vue",
      container: "#sub-app-viewport",
      loader,
      props: {
        routerBase: "/dnhyxc/vue", // 给子应用下发的基础路由
      },
    },
  ];

  // 注册子应用
  registerMicroApps(apps, {
    beforeLoad: (app): any => {
      console.log("before load app.name=====>>>>>", app.name);
    },
    beforeMount: [
      (app): any => {
        console.log("[LifeCycle] before mount %c%s", "color: green;", app.name);
      },
    ],
    afterMount: [
      (app): any => {
        console.log("[LifeCycle] after mount %c%s", "color: green;", app.name);
      },
    ],
    afterUnmount: [
      (app): any => {
        console.log(
          "[LifeCycle] after unmount %c%s",
          "color: green;",
          app.name
        );
      },
    ],
  });

  start();

  // 微前端启动进入第一个子应用后回调函数
  runAfterFirstMounted(() => {
    console.log("[MainApp] first app mounted");
  });

  // 添加全局异常捕获
  addGlobalUncaughtErrorHandler((event) => {
    console.error("异常捕获", event);
    const { message } = event as any;

    const errorApp: AppParams[] = [];

    apps.forEach((i) => {
      if (message && message.includes(i.name)) {
        errorApp.splice(0, 1, i);
      }
    });

    // 加载失败时提示
    if (
      message &&
      message.includes("died in status LOADING_SOURCE_CODE") &&
      errorApp.length &&
      window.location.pathname === errorApp[0].activeRule
    ) {
      render(failed);
    }
  });

  const initState = {
    AppName: "micro-react-main",
  };
  initGlobalState(initState);
};

const actions: MicroAppStateActions = initGlobalState({});
(window as any).__MAIN_GLOBALSTATE_ACTIONS__ = actions;
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log("[onGlobalStateChange - master]:", state, prev);
});

// 设置路由拦截
const routeIntercept = () => {
  if (window.location.pathname === "/dnhyxc/login") {
    window.location.href = "/dnhyxc/react";
  } else {
    render(notfound);
  }
};

// 模拟获取用户登录信息
const getUserInfo = () => {
  return true;
};

// 页面加载判断
if (window.location.pathname === "/") {
  window.location.href = "/dnhyxc/react";
} else {
  if (getUserInfo()) {
    routeIntercept();
    appStart();
  } else {
    render(login);
  }
}
```

3、添加子应用容器：

- 在 [micro-main/src/App.tsx](https://github.com/dnhyxc/qiankun-react-main/blob/master/src/App.tsx) 中添加子应用容器元素：

```js
import RenderPage from "./pages";
import Header from "./components/Header";
import "./App.css";

interface IProps {
  loading?: boolean;
}

const App: React.FC<IProps> = ({ loading, ...props }) => {
  return (
    <div className="app-main">
      <header className="app-header">
        <Header />
      </header>
      <div className="app-sub">
        <RenderPage loading={loading} {...props} />
        {/* 子应用容器 */}
        <div id="sub-app-viewport"></div>
      </div>
    </div>
  );
};

export default App;
```

#### React 子应用

1、在 src 目录新增 public-path.js：

```js
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

2、修改入口文件 react-app/src/index.js：

```js
import "./public-path";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

function render(props) {
  const { container } = props;
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    // 为了避免根 id #root 与其他的 DOM 冲突，需要限制查找范围。
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log("[react17] react app bootstraped");
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log("[react17] props from main framework", props);
  render(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector("#root")
      : document.querySelector("#root")
  );
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log("update props", props);
}
```

3、修改 webpack 配置：

修改 webpack 配置方式一：

- 安装@rescripts/cli 插件：

```
npm i @rescripts/cli -D
```

- 在根目录新增 .rescriptsrc.js 文件：

```js
const { name } = require("./package");

module.exports = {
  webpack: (config) => {
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = "umd";
    config.output.jsonpFunction = `webpackJsonp_${name}`;
    config.output.globalObject = "window";

    return config;
  },

  devServer: (_) => {
    const config = _;
    // 主应用获取子应用时跨域响应头，必须要开启跨域
    config.headers = {
      "Access-Control-Allow-Origin": "*",
    };
    config.historyApiFallback = true;
    config.hot = false;
    config.watchContentBase = false;
    config.liveReload = false;

    return config;
  },
};
```

- 修改 package.json：

```json
"start": "rescripts start",
"build": "rescripts build",
"test": "rescripts test",
```

修改 webpack 配置方式二：

- 首先使用 `npm install react-app-rewired -D` 安装 react-app-rewired。

- 在与 src 平级的根目录下创建 config-overrides.js 文件：

```js
const path = require("path");
const { name } = require("./package");

module.exports = {
  webpack: (config) => {
    // 微应用的包名
    config.output.library = `${name}-[name]`;
    // 将 library 暴露为所有的模块定义下都可运行的方式
    config.output.libraryTarget = "umd";
    // 按需加载相关，设置为 webpackJsonp_reactApp 即可
    config.output.jsonpFunction = `webpackJsonp_${name}`;

    // 设置引入别名
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },

  devServer: (configFunction) => {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);
      // 关闭主机检查，使微应用可以被 fetch
      config.disableHostCheck = true;
      // 主应用获取子应用时跨域响应头，必须要开启跨域
      config.headers = {
        "Access-Control-Allow-Origin": "*",
      };
      // 配置 history 模式
      config.historyApiFallback = true;
      return config;
    };
  },
};
```

#### Vue 子应用配置

1、在 src 目录新增 public-path.js 文件：

```js
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

2、修改入口文件 vue-app/src/main.js 文件：

```js
import "./public-path";
import Vue from "vue";
import App from "./App.vue";

let instance = null;

Vue.config.productionTip = false;

function render(props = {}) {
  const { container } = props;

  instance = new Vue({
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}
export async function mount(props) {
  console.log("[vue] props from main framework", props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}
```

3、修改打包配置 vue.config.js 文件：

```js
const { name } = require("./package");
module.exports = {
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd", // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
```

#### 主子应用通信说明

1、一般来说，微前端中各个应用之前的通信应该是尽量少的，而这依赖于应用的合理拆分。反过来说，如果你发现两个应用间存在极其频繁的通信，那么一般是拆分不合理造成的，这时往往需要将它们合并成一个应用。

2、qiankun 官方基于通信问题提供了一个简要的方案，思路是基于一个全局的 **globalState** 对象。这个对象由基座应用负责创建，内部包含一组用于通信的变量，以及两个分别用于修改变量值和监听变量变化的方法：**setGlobalState** 和 **onGlobalStateChange**，具体使用如下：

```js
import { initGlobalState, MicroAppStateActions } from "qiankun";

const initialState = {};
const actions: MicroAppStateActions = initGlobalState(initialState);

export default actions;
```

- 这里的 actions 对象就是我们说的 globalState，即全局状态。基座应用可以在加载子应用时通过 props 将 actions 传递到子应用内，而子应用通过以下语句即可监听全局状态变化：

```js
actions.onGlobalStateChange (globalState, oldGlobalState) {
  ...
}

```

- 修改全局状态：

```js
actions.setGlobalState(...);
```

- 同样的，子应用也可以从主应用传递下来的 props 中获取到 setGlobalState 方法修改全局状态。

#### 主子应用全局状态管理配置方式

1、qiankun 通过 initGlobalState, onGlobalStateChange, setGlobalState 实现主应用的全局状态管理，然后默认会通过 props 将通信方法传递给子应用。

- 主应用：

```js
// main/src/main.js
import { initGlobalState } from "qiankun";
// 初始化 state
const initialState = {
  user: {}, // 用户信息
};
const actions = initGlobalState(initialState);
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state, prev);
});
actions.setGlobalState(state);
actions.offGlobalStateChange();
```

- 子应用：

```js
// 从生命周期 mount 中获取通信方法，props默认会有onGlobalStateChange和setGlobalState两个api
export function mount(props) {
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });
  props.setGlobalState(state);
}
```

2、除了上述通信方式以外，还可以直接通过 props 进行传递：

```js
const apps = [
  {
    name: "reactApp",
    entry: "//localhost:8686",
    activeRule: "/dnhyxc/react",
    container: "#subapp-viewport",
    loader,
    props: {
      params: "我是主应用传递过来的参数",
      routerBase: "/dnhyxc/react", // 给子应用下发的基础路由
    },
  },
];
```

- 通过 props 传递的参数，在子应用中，可以直接通过 props 获取到。

#### 具体配置示例

1、React 主应用 [github 地址](https://github.com/dnhyxc/qiankun-react-main) | [gitee 地址](https://gitee.com/dnhyxc/qiankun-react-main)

2、React 子应用 [github 地址](https://github.com/dnhyxc/micro-react) | [gitee 地址](https://gitee.com/dnhyxc/micro-react)

3、Vue 子应用 [github 地址](https://github.com/dnhyxc/micro-vue) | [gitee 地址](https://gitee.com/dnhyxc/micro-vue)

4、Dva 项目级主应用 [github 地址](https://github.com/dnhyxc/qiankun-dva-main) | [gitee 地址](https://gitee.com/dnhyxc/qiankun-dva-main)

### qiankun 实现原理

#### qiankun 实现的四个步骤

1、监听路由变化。

- 监听 hash 路由可以直接使用 window.onhashchange 方法实现。

- 监听 history 路由需要分两种情况：

  - history.go、history.back、history.forward：需要通过 popstate 事件实现。

  - pushState、replaceState 则需要通过函数重写的方式进行劫持。

```js
window.addEventListener("popstate", () => {
  console.log("监听到 popstate 变化");
});

const rawPushState = window.history.pushState;
window.history.pushState = (...args) => {
  console.log("监听到 pushState 变化");
};

const rawReplaceState = window.history.replaceState;
window.history.replaceState = (...args) => {
  console.log("监听到 replaceState 变化");
};
```

2、匹配子路由。

- 通过获取到当前的路由路径，再从 apps 中查找对应路径的应用。

```js
// apps 就是在主项目中注册的子应用列表
const app = apps.find((i) => winddow.location.pathname === i.activeRule);
```

3、加载子应用。

- 请求获取子应用的资源：HTML、CSS、JS。请求方式可以使用 fetch、ajax、axios 等。

```js
const fetchResource = (url) => fetch(url).then((res) => res.text());
```

4、渲染子应用。

- 由于客户端渲染需要通过执行 JS 来生成内容，而浏览器出于安全考虑，innerHTML 中的 script 不会加载执行，要想执行其中的代码，需要通过 evel() 方法或者 new Function 执行。

```js
import { fetchResource } from "./fetchResource";

export const importHtml = async (url) => {
  const html = await fetchResource(url);
  const template = document.createElement("div");
  template.innerHTML = html;

  const scripts = template.querySelectorAll("script");

  // 获取所有 script 标签的代码
  function getExternalScripts() {
    return Promise.all(
      Array.from(scripts).map((script) => {
        const src = script.getAttribute("src");
        if (!src) {
          return Promise.resolve(script.innerHTML);
        } else {
          return fetchResource(src.startsWith("http") ? src : `${url}${src}`);
        }
      })
    );
  }

  // 获取并执行所有的 script 脚本代码
  async function execScripts() {
    const scripts = await getExternalScripts();

    // 手动构造一个 CommonJS 模块执行环境，此时会将子应用挂载到 module.exports 上。这种方式就可以不依赖子应用的名字了。
    const module = { exports: {} };
    const exports = module.exports;

    scripts.forEach((code) => {
      // eslint-disable-next-line no-eval
      eval(code);
      // 这里能通过window["micro-react-main"]拿到子应用的内容是因为在子应用打包时通过 library 打出了 umd 格式的包，最终会将 micro-react-main 挂载到 window 上
      // console.log(window["micro-react-main"]);
      // 使用 window 获取子应用的方式需要知道每个子应用的打包出来的名字，比较麻烦，因此不推荐该写法。
      // return window["micro-react-main"];
    });

    return module.exports;
  }

  return {
    template,
    getExternalScripts,
    execScripts,
  };
};
```

#### 具体手写实现代码

1、index.js：

```js
import { rewriteRouter } from "./rewriteRouter";
import { handleRouter } from "./handleRouter";

// 注册子应用方法
let _apps = [];

export const getApps = () => _apps;

export const registerMicroApps = (apps) => {
  _apps = apps;
};

export const start = () => {
  rewriteRouter();

  // 初始化时手动执行匹配
  handleRouter();
};
```

2、rewriteRouter.js：

```js
import { handleRouter } from "./handleRouter";

/**
 * 1. 监视路由变化
 *  - hash 路由：使用 window.onhashchange 方法监视
 *  - history 路由：
 *    - history.go、history.back、history.forword 使用 popstate 事件进行监视。
 *    - pushState、replaceState 需要通过函数重写的方式进行劫持。
 */

let prevRoute = ""; // 上一个路由
let nextRoute = window.location.pathname; // 下一个路由

export const getPrevRoute = () => prevRoute;
export const getNextRoute = () => nextRoute;

export const rewriteRouter = () => {
  window.addEventListener("popstate", () => {
    // popstate 事件触发时，路由已经完成导航了，因此需要通过如下方式进行设置。
    prevRoute = nextRoute;
    nextRoute = window.location.pathname;
    handleRouter();
  });

  const rawPushState = window.history.pushState;
  window.history.pushState = (...args) => {
    prevRoute = window.location.pathname;
    rawPushState.apply(window.history, args); // 执行完这句代码之后，就改变了路由的历史纪录
    nextRoute = window.location.pathname;
    handleRouter();
  };

  const rawReplaceState = window.history.replaceState;
  window.history.replaceState = (...args) => {
    prevRoute = window.location.pathname;
    rawReplaceState.apply(window.history, args);
    nextRoute = window.location.pathname;
    handleRouter();
  };
};
```

3、handleRouter.js：

```js
import { getApps } from "./index";
import { getPrevRoute, getNextRoute } from "./rewriteRouter";
import { importHtml } from "./importHtmlEntry";

// 处理路由变化
export const handleRouter = async () => {
  /**
   * 2. 匹配子应用
   *  - 获取到当前的路由路径
   *  - 从 apps 中查找对应的路径
   */
  const apps = getApps();

  // 获取上一个应用
  const prevApp = apps.find((i) => getPrevRoute().startsWith(i.activeRule));

  if (prevApp) {
    await unmount(prevApp);
  }

  // 获取下一个应用
  const app = apps.find((i) => getNextRoute().startsWith(i.activeRule));

  if (!app) return;

  /**
   * 3. 加载子应用
   *  - 请求获取子应用的资源：HTML、CSS、JS。请求方式可以使用 fetch、ajax、axios 等。
   */
  // const html = await fetch(app.entry).then((res) => res.text());
  // const container = document.querySelector(app.container);
  /**
   * 1. 客户端渲染需要通过执行 JS 来生成内容
   * 2. 浏览器出于安全考虑，innerHTML 中的 script 不会加载执行，要想执行其中的代码，需要通过 evel() 方法或者 new Function 执行。
   */
  // container.innerHTML = html;
  const container = document.querySelector(app.container);

  // 4. 渲染子应用
  const { template, execScripts } = await importHtml(app.entry);

  container.appendChild(template);

  // 配置全局环境变量
  window.__POWERED_BY_QIANKUN__ = true;
  // 设置该全局变量用于解决子应用中图片无法加载出来的问题
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = `${app.entry}/`;

  const appExports = await execScripts();
  // 将从 module.exports 中获取到的 bootstrap、mount、unmount设置到 app 上。
  app.bootstrap = appExports.bootstrap;
  app.mount = appExports.mount;
  app.unmount = appExports.unmount;

  // 调用从 module.exports 中获取到的子应用中定义的 bootstrap 方法。
  await bootstrap(app);
  // 调用从 module.exports 中获取到的子应用中定义的 mount 方法。
  await mount(app);
};

async function bootstrap(app) {
  app.bootstrap && (await app.bootstrap());
}

async function mount(app) {
  app.mount &&
    (await app.mount({
      container: document.querySelector(app.container),
    }));
}

async function unmount(app) {
  app.unmount &&
    (await app.unmount({
      container: document.querySelector(app.container),
    }));
}
```

4、importHtmlEntry.js：

```js
import { fetchResource } from "./fetchResource";

export const importHtml = async (url) => {
  const html = await fetchResource(url);
  const template = document.createElement("div");
  template.innerHTML = html;

  const scripts = template.querySelectorAll("script");

  // 获取所有 script 标签的代码
  function getExternalScripts() {
    return Promise.all(
      Array.from(scripts).map((script) => {
        const src = script.getAttribute("src");
        if (!src) {
          return Promise.resolve(script.innerHTML);
        } else {
          return fetchResource(src.startsWith("http") ? src : `${url}${src}`);
        }
      })
    );
  }

  // 获取并执行所有的 script 脚本代码
  async function execScripts() {
    const scripts = await getExternalScripts();

    // 手动构造一个 CommonJS 模块执行环境，此时会将子应用挂载到 module.exports 上。这种方式就可以不依赖子应用的名字了。
    const module = { exports: {} };
    const exports = module.exports;

    scripts.forEach((code) => {
      // eslint-disable-next-line no-eval
      eval(code);
      // 这里能通过window["micro-react-main"]拿到子应用的内容是因为在子应用打包时通过 library 打出了 umd 格式的包，最终会将 micro-react-main 挂载到 window 上
      // console.log(window["micro-react-main"]);
      // 使用 window 获取子应用的方式需要知道每个子应用的打包出来的名字，比较麻烦，因此不推荐该写法。
      // return window["micro-react-main"];
    });

    return module.exports;
  }

  return {
    template,
    getExternalScripts,
    execScripts,
  };
};
```

- webpack 打包 library umd 模式说明：

```js
!(function (e, o) {
  /**
   * e 表示 window，
   * o 表示回调函数：
   *    function () { 子应用代码 return { ... } 导出结果};
   */

  // 兼容 CommonJS 模块规范
  "object" === typeof exports && "object" === typeof module
    ? (module.exports = o())
    : // 兼容 AMD 模块规范
    "function" === typeof define && define.amd
    ? // eslint-disable-next-line no-undef
      define([], o)
    : // 也是兼容 CommonJS 模块规范
    "object" === typeof exports
    ? (exports["micro-react-main"] = o())
    : // 都不匹配的情况下设置 window[xxx] = o() 此时 window 下就会存在 micro-react-main 对象
      (e["micro-react-main"] = o());
})(window, function () {
  // 最终返回导出的结果
  return {
    a: 1,
    b: 2,
  };
});
```

> importHtmlEntry.js 中手动构造 CommonJS 运行模式就是根据上述代码中的判断实现的。

5、fetchResource.js：

```js
export const fetchResource = (url) => fetch(url).then((res) => res.text());
```

#### 相关源码

##### 加载子应用资源

1、基于 single-spa，qiankun 进行了一次封装，给出了一个更完整的应用加载方案，并将应用加载的功能装成了 npm 插件 **import-html-entry**。

- 该方案的主要思路是允许以 html 文件为应用入口，然后通过一个 html 解析器从文件中提取 js 和 css 依赖，并通过 fetch 下载依赖，于是在 qiankun 中你可以这样配置入口：

```js
const apps = [
  {
    name: "react-app",
    entry: "//localhost:8686",
    container: "#sub-view",
    activeRule: "/dnhyxc/react",
  },
];
```

- qiankun 会通过 import-html-entry 请求 `http://localhost:8686`，得到对应的 html 文件，解析内部的所有 script 和 style 标签，依次下载和执行它们，这使得应用加载变得更易用。

##### import-html-entry 源码实现

1、import-html-entry 暴露出的核心接口是 importHTML，用于加载 html 文件，它支持两个参数：

- url：要加载的文件地址，一般是服务中 html 的地址。

- opts：配置参数，opts 如果是一个函数，则会替换默认的 fetch 作为新的下载文件的方法，此时其返回值应当是 Promise；如果是一个对象，那么它最多支持四个属性：fetch、getPublicPath、getDomain、getTemplate，用于替换默认的方法。

2、importHTML 方法的主要逻辑如下：

```js
export default function importHTML(url, opts = {}) {
  // 此处省略一万字...
  // 如果已经加载过，则从缓存返回，否则fetch回来并保存到缓存中
  return embedHTMLCache[url] || (embedHTMLCache[url] = fetch(url)
		.then(response => readResAsString(response, autoDecodeResponse))
		.then(html => {
		  // 对html字符串进行初步处理
		  const { template, scripts, entry, styles } =
		    processTpl(getTemplate(html), assetPublicPath);
		  // 先将外部样式处理成内联样式
		  // 然后返回几个核心的脚本及样式处理方法
		  return getEmbedHTML(template, styles, { fetch }).then(embedHTML => ({
				template: embedHTML,
				assetPublicPath,
				getExternalScripts: () => getExternalScripts(scripts, fetch),
				getExternalStyleSheets: () => getExternalStyleSheets(styles, fetch),
				execScripts: (proxy, strictGlobal, execScriptsHooks = {}) => {
					if (!scripts.length) {
						return Promise.resolve();
					}
					return execScripts(entry, scripts, proxy, {
						fetch,
						strictGlobal,
						beforeExec: execScriptsHooks.beforeExec,
						afterExec: execScriptsHooks.afterExec,
					});
				},
			}));
		});
}
```

- 上述代码中省略了一些参数预处理，从 return 语句开始，具体过程如下：

  - 检查是否有缓存，如果有，直接从缓存中返回。

  - 如果没有，则通过 fetch 下载，并字符串化。

  - 调用 processTpl 进行一次模板解析，主要任务是扫描出外联脚本和外联样式，保存在 scripts 和 styles 中.

  - 调用 getEmbedHTML，将外联样式下载下来，并替换到模板内，使其变成内部样式。

  - 返回一个对象，该对象包含处理后的模板，以及 **getExternalScripts**、**getExternalStyleSheets**、**execScripts** 等几个核心方法。

```
                            return 开始执行
                                  |
                                  |
                                  ⬇         是
                              是否有缓存 --------> 直接从缓存中读取返回 --------> 结束
                                  |
                                  | 否
                                  ⬇
                        fetch下载，并字符串化
                                  |
                                  |
                                  ⬇
        调用processTpl方法，使用正则表达式解析模板，提取脚本和样式
                                  |
                                  |
                                  ⬇
          调用getEmbedHTML，下载外部样式表，并将其处理成内部样式
                                  |
                                  |
                                  ⬇
            返回处理后的模板，以及获取脚本和样式表的接口函数
                                  |
                                  |
                                  ⬇
                                结 束
```

3、getExternalStyleSheets 方法解析：

```js
export function getExternalStyleSheets(styles, fetch = defaultFetch) {
  return Promise.all(styles.map(styleLink => {
	if (isInlineCode(styleLink)) {
	  // if it is inline style
	  return getInlineCode(styleLink);
	} else {
	  // external styles
	  return styleCache[styleLink] ||
	  (styleCache[styleLink] = fetch(styleLink).then(response => response.text()));
	}
  ));
}
```

- 该方法会遍历 styles 数组，如果是内联样式，则直接返回；否则判断缓存中是否存在，如果没有，则通过 fetch 去下载，并进行缓存。

4、getExternalScripts 方法原理与 getExternalStyleSheets 方法类似，具体代码如下。

```js
// scripts是解析html后得到的<scripts>标签的url的数组
export getExternalScripts(scripts, fetch = defaultFetch) {
  return Promise.all(scripts.map(script => {
    return fetch(scriptUrl).then(response => {
        return response.text();
    }));
  }))
}
```

5、execScripts 是实现 js 隔离的核心方法，可以通过给定的一个假 window 来执行所有 script 标签的脚本，这样就是真正模拟了浏览器执行 script 标签的行为。伪代码如下：

```js
export async execScripts(proxy) {
  // 上面的getExternalScripts加载得到的<scripts>标签的内容
  const scriptsTexts = await getExternalScripts(scripts)
  window.proxy = proxy;
  // 模拟浏览器，按顺序执行script
  for (let scriptsText of scriptsTexts) {
    // 调整sourceMap的地址，否则sourceMap失效
    const sourceUrl = '//# sourceURL=${scriptSrc}\n';
    // 通过iife把proxy替换为window, 通过eval来执行这个script
    eval(`
      ;(function(window, self){
        ;${scriptText}
        ${sourceUrl}
      }).bind(window.proxy)(window.proxy, window.proxy);
    `;)
  }
}
```

##### js 隔离机制

1、js 隔离机制是通过 execScripts 方法实现的，部分核心源码如下：

```js
export function execScripts(entry, scripts, proxy = window, opts = {}) {
  ... // 初始化参数
  return getExternalScripts(scripts, fetch, error)
	.then(scriptsText => {
	  // 在proxy对象下执行脚本的方法
	  const geval = (scriptSrc, inlineScript) => {
	    const rawCode = beforeExec(inlineScript, scriptSrc) || inlineScript;
	    const code = getExecutableScript(scriptSrc, rawCode, proxy, strictGlobal);
        (0, eval)(code);
        afterExec(inlineScript, scriptSrc);
	  };
	  // 执行单个脚本的方法
      function exec(scriptSrc, inlineScript, resolve) { ... }
      // 排期函数，负责逐个执行脚本
      function schedule(i, resolvePromise) { ... }
      // 启动排期函数，执行脚本
      return new Promise(resolve => schedule(0, success || resolve));
    });
});
```

- 这个函数的关键是定义了三个函数：geval、exec、schedule，其中实现 js 隔离的是 geval 函数内调用的 getExecutableScript 函数。可以看出，在调这个函数时，会把外部传入的 proxy 作为参数传入了进去，而它返回的是一串新的脚本字符串，这段新的字符串内的 window 已经被 proxy 替代，具体实现逻辑如下：

```js
function getExecutableScript(scriptSrc, scriptText, proxy, strictGlobal) {
  const sourceUrl = isInlineCode(scriptSrc)
    ? ""
    : `//# sourceURL=${scriptSrc}\n`;

  // 通过这种方式获取全局 window，因为 script 也是在全局作用域下运行的，所以我们通过 window.proxy 绑定时也必须确保绑定到全局 window 上
  // 否则在嵌套场景下， window.proxy 设置的是内层应用的 window，而代码其实是在全局作用域运行的，会导致闭包里的 window.proxy 取的是最外层的微应用的 proxy
  const globalWindow = (0, eval)("window");
  globalWindow.proxy = proxy;
  // TODO 通过 strictGlobal 方式切换切换 with 闭包，待 with 方式坑趟平后再合并
  return strictGlobal
    ? `;(function(window, self, globalThis){with(window){;${scriptText}\n${sourceUrl}}}).bind(window.proxy)(window.proxy, window.proxy, window.proxy);`
    : `;(function(window, self, globalThis){;${scriptText}\n${sourceUrl}}).bind(window.proxy)(window.proxy, window.proxy, window.proxy);`;
}
```

- 上述核心代码就是`;(function(window, self, globalThis){with(window){;`${scriptText}\n${sourceUrl}}}).bind(window.proxy)(`window.proxy`,window.proxy, window.proxy);，它把解析出的 scriptText（即脚本字符串）用 with(window){}包裹起来，然后把 window.proxy 作为函数的第一个参数传进来，所以 with 语法内的 window 实际上是 window.proxy。这样，当在执行这段代码时，所有类似 let name = 'dnhyxc' 这样的语句添加的全局变量 name，实际上是被挂载到了 window.proxy 上，而不是真正的全局 window 上。当应用被卸载时，对应的 proxy 会被清除，因此不会导致 js 污染。而当你配置 webpack 的打包类型为 lib 时，你得到的接口大概如下：

```js
const jquery = (function () {})();
```

2、如果你的应用内使用了 jquery，那么这个 jquery 对象就会被挂载到 window.proxy 上。不过如果你在代码内直接写 window.name = 'dnhyxc' 来生成全局变量，那么 qiankun 就无法隔离 js 污染了。

- import-html-entry 实现了上述能力后，qiankun 要做的就很简单了，只需要在加载一个应用时为其初始化一个 proxy 传递进来即可，proxySandbox.ts 文件内容如下：

```js
export default class ProxySandbox implements SandBox {
  ...
  constructor(name: string) {
    ...
    const proxy = new Proxy(fakeWindow, {
      set () { ... },
      get () { ... }
    }
  }
}
```

- 每次加载一个应用，qiankun 就初始化这样一个 proxySandbox，传入上述 execScripts 函数中。

- 在 IE 下，由于 proxy 不被支持，并且没有可用的 polyfill，所以 qiankun 退而求其次，采用快照策略实现 js 隔离。它的大致思路是，在加载应用前，将 window 上的所有属性保存起来（即拍摄快照）；等应用被卸载时，再恢复 window 上的所有属性，这样也可以防止全局污染。但是当页面同时存在多个应用实例时，qiankun 无法将其隔离开，所以 IE 下的快照策略无法支持多实例模式。

##### css 隔离机制

1、qiankun 主要提供了两种样式隔离方案，一种是基于 shadowDom 的；另一种则是实验性的，思路类似于 Vue 中的 scoped 属性，给每个子应用的根节点添加一个特殊属性，用作对所有 css 选择器的约束。

2、开启样式隔离的语法如下：

```js
registerMicroApps({
  name: 'app1',
  ...
  sandbox: {
    strictStyleIsolation: true // 使用 shadow dom 进行样式隔离
    // experimentalStyleIsolation: true // 通过添加选择器范围来解决样式冲突
  },
})
```

- 当启用 strictStyleIsolation 时，qiankun 将采用 shadowDom 的方式进行样式隔离，即为子应用的根节点创建一个 shadow root。最终整个应用的所有 DOM 将形成一棵 shadow tree。我们知道，shadowDom 的特点是，它内部所有节点的样式对树外面的节点无效，因此自然就实现了样式隔离。但是这种方案是存在缺陷的。因为某些 UI 框架可能会生成一些弹出框直接挂载到 document.body 下，此时由于脱离了 shadow tree，所以它的样式仍然会对全局造成污染。具体实现示例如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>shadow-dom</title>
    <style>
      h1 {
        color: red;
      }
    </style>
  </head>
  <body>
    <h1>shadow-dom</h1>

    <div id="subApp">
      <h1>子应用内容</h1>
    </div>

    <script>
      const subApp = document.getElementById("subApp");
      // 是否允许通过 js 获取 shadow-dom
      const shadow = subApp.attachShadow({ mode: "open" });
      const h1 = document.createElement("h1");
      h1.innerHTML = "我是通过 shadow dom 添加的内容，我的样式不会受外部影响";
      h1.style.color = "deeppink";
      shadow.appendChild(h1);
    </script>
  </body>
</html>
```

- 此外 qiankun 也在探索类似于 scoped 属性的样式隔离方案，可以通过 experimentalStyleIsolation 来开启。这种方案的策略是为子应用的根节点添加一个特定的随机属性，如：

```html
<div
  data-qiankun-asiw732sde
  id="__qiankun_microapp_wrapper__"
  data-name="module-app1"
></div>
```

- 这种放肆需要为所有样式前面都加上这样的约束：

```css
- .app-main {
-   字体大小：14 px ;
- }

/* 使用如下写法代替上面的写法 */
+ div[data-qiankun-asiw732sde] .app-main {
+   字体大小：14 px ;
+ }
```

- 经过上述替换，这个样式就只能在当前子应用内生效了。虽然该方案已经提出很久了，但仍然是实验性的，因为它不支持 @keyframes，@font-face，@import，@page（即不会被重写）。

### 参考文档

[quankun 官方文档](https://qiankun.umijs.org/zh/guide)

[MicroApp 官网](https://micro-zoe.github.io/micro-app/docs.html#/)
