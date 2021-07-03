---
title: ReactPrinciple
tags: react
declare: true
toc: true
categories:
  - react fiber diff hooks
date: 2021-02-09 21:09:02
---

### react 设计理念

#### 快速响应

1，react 设计理念就是让用户能用 javascript 实现**快速相应**的大型 web 应用程序。而要实现快速相应，必然会碰到 **CPU 瓶颈** 和 **IO 瓶颈**。

- CUP 瓶颈是当页面需要进行过于复杂的运算，或者当项目变得庞大、组件数量繁多时，就容易遇到 CPU 的瓶颈。

- IO 瓶颈就是当发送网络请求时会有延迟。

#### 如何解决瓶颈

1，我们都知道 react 解决 CPU 瓶颈的关键就是利用**时间切片**，而时间切片的关键就是**将同步的更新变为可中断的异步更新**。

- 通俗来讲，时间切片就是为了处理 GUI 线程与 JS 线程互斥导致阻碍页面渲染的问题，即当 js 执行时间远大于浏览器的刷新频率 16.6ms 时，导致页面卡顿的问题。

<!-- more -->

> 在浏览器每一帧的时间中，预留一些时间给 JS 线程，React 利用这部分时间更新组件（可以看到，在源码 (opens new window)中，预留的初始时间是 5ms）。当预留的时间不够用时，React 将线程控制权交还给浏览器使其有时间渲染 UI，React 则等待下一帧时间到来继续被中断的工作。将一个长任务分拆到每一帧中，像蚂蚁搬家一样一次执行一小段任务的操作，被称为时间切片（time slice）。

2，网络延迟是前端无法控制的，所以要解决 IO 瓶颈，就是在有限的条件下减少用户对与网络延迟的感知。

- 例如，在发送请求之前，先在当前页面停留一小段时间（短的让用户无法感知），超过这段时间时，再显示 loading 效果。

### React15 架构

#### Reconciler（协调器）

1，Reconciler（协调器）的作用是负责**找出变化的组件**。

2，Reconciler（协调器）每当有更新发生时，会做如下工作：

- 调用 render 方法，将返回的 jsx 转化为虚拟 DOM。

- 将当前得到的虚拟 DOM 与上次更新的虚拟 DOM 做对比。

- 通过对比找出本次更新中变化的虚拟 DOM。

- 通知 Renderer 将变化的虚拟 DOM 渲染到页面上。

#### Renderer（渲染器）

1，Renderer（渲染器）的作用是负责**将变化的组件渲染到页面上**。

### React 15 架构的缺点

#### 递归更新

1，在 Reconciler 中，mount 的组件会调用 [mountComponent](https://github.com/facebook/react/blob/15-stable/src/renderers/dom/shared/ReactDOMComponent.js#L498)，update 的组件会调用 [updateComponent](https://github.com/facebook/react/blob/15-stable/src/renderers/dom/shared/ReactDOMComponent.js#L877)。这两个方法都会递归更新子组件。

2，由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了 16ms，用户交互就会卡顿。

### React 16 架构

#### React 16 架构分层

1，**Scheduler（调度器）**，其作用是：调度任务的优先级，高优任务优先进入 Reconciler。

2，**Reconciler（协调器）**，其作用是：负责找出变化的组件。

3，**Renderer（渲染器）**，其作用是：负责将变化的组件渲染到页面上。

#### Scheduler（调度器）

1，既然以浏览器是否有剩余时间作为任务中断的标准，那么就需要一种机制，即当浏览器有剩余时间时通知我们。对于这个问题，部分浏览器已经通 [requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback) 这个 API 实现了。但由于浏览器的兼容性，以及触发频率不稳定，受很多因素影响（比如当我们的浏览器切换 tab 后，之前 tab 注册的 requestIdleCallback 触发的频率会变得很低）等因素，因此 React 放弃了使用。

2，基于以上原因，React 实现了功能更完备的 requestIdleCallback polyfill，这就是 Scheduler。除了在空闲时触发回调的功能外，Scheduler 还提供了多种调度优先级供任务设置。

#### Reconciler（协调器）

1，在 React15 中 Reconciler 是递归处理虚拟 DOM 的。而 React16 的 [Reconciler](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L1673)，其更新工作从递归变成了可以中断的循环过程。每次循环都会调用 shouldYield 来判断当前是否有剩余时间。

```js
/** @noinline */
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}
```

> Scheduler（调度器）与 Reconciler（协调器）中正在执行的步骤随时可能被：有其他更高优任务需要先更新或当前帧没有剩余时间所打断。但由于 Scheduler 与 Reconciler 这两个工作都在内存中进行，不会更新页面上的 DOM，所以即使反复中断，用户也不会看见更新不完全的 DOM。

2，React16 是如何解决中断更新时 DOM 渲染不完全的问题的？

- 在 React16 中，Reconciler 与 Renderer 不再是交替工作。当 Scheduler 将任务交给 Reconciler 后，Reconciler 会为变化的虚拟 DOM 打上代表增/删/更新的标记，如下，[戳这里看全部](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactSideEffectTags.js)：

```js
export const Placement = /*             */ 0b0000000000010;
export const Update = /*                */ 0b0000000000100;
export const PlacementAndUpdate = /*    */ 0b0000000000110;
export const Deletion = /*              */ 0b0000000001000;
```

- 整个 Scheduler 与 Reconciler 的工作都在内存中进行。只有当所有组件都完成 Reconciler 的工作，才会统一交给 Renderer。

#### Renderer（渲染器）

1，Renderer 根据 Reconciler 为虚拟 DOM 打的标记，同步执行对应的 DOM 操作。

> Reconciler 工作的阶段被称为 **render** 阶段。因为在该阶段会调用组件的 render 方法。
>
> Renderer 工作的阶段被称为 **commit** 阶段。就像完成一个需求的编码后执行 git commit 提交代码。commit 阶段会把 render 阶段提交的信息渲染在页面上。
>
> render 与 commit 阶段统称为 **work**，即 React 在工作中。相对应的，如果任务正在 Scheduler 内调度，就不属于 work。

### JSX 与虚拟 DOM

#### JSX

1，JSX 是一种描述当前组件内容的数据结构，他不包含组件 schedule、reconcile、render 所需的相关信息。比如如下信息就不包含在 JSX 中：

- 组件在更新中的优先级。

- 组件的 state。

- 组件被打上的用于 Renderer 的标记。

> 以上所述的内容都包含在虚拟 DOM 中。

2，在组件 mount 时，Reconciler 根据 JSX 描述的组件内容生成组件对应的虚拟 DOM。在 update 时，Reconciler 将 JSX 与虚拟 DOM 保存的数据对比，生成组件对应的虚拟 DOM，并根据对比结果为虚拟 DOM 打上标记。

#### 虚拟 DOM

1，虚拟 DOM 就是使用 javascript 对象来表示真实 DOM，是一个树形结构。

2，虚拟 DOM 只保留了真实 DOM 节点的一些基本属性，和节点之间的层次关系，它相当于建立在 javascript 和 DOM 之间的一层“缓存”。

3，由于在真实 DOM 中，一个普通的元素内容就很复杂了，可以想象浏览器处理 DOM 结构有多慢。因此相对于操作 DOM 来说，操作 javascript 对象更方便快速，如一个 ul 元素中包含三个 li 元素可以用如下方式表示：

```js
const element = {
  tagName: "ul", // 节点标签名
  props: {
    // DOM的属性，用一个对象存储键值对
    id: "list",
  },
  children: [
    // 该节点的子节点
    { tagName: "li", props: { class: "item" }, children: ["1"] },
    { tagName: "li", props: { class: "item" }, children: ["2"] },
    { tagName: "li", props: { class: "item" }, children: ["3"] },
  ],
};
```

### Fiber 架构的实现原理

#### Fiber 的含义

1，作为架构来说，之前 React15 的 Reconciler 采用递归的方式执行，数据保存在递归调用栈中，所以被称为 stack Reconciler。React16 的 Reconciler 基于 Fiber 节点实现，被称为 Fiber Reconciler。

2，作为静态的数据结构来说，每个 Fiber 节点对应一个组件，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的 DOM 节点等信息。

3，作为动态的工作单元来说，每个 Fiber 节点保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）。

#### Fiber 的结构

1，Fiber 的属性定义可以分成如下三层含义来区分：

```js
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode
) {
  // 作为静态数据结构的属性
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // 用于连接其他Fiber节点形成Fiber树
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  // 作为动态的工作单元的属性
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  // 调度优先级相关
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  // 指向该fiber在另一次更新时对应的fiber
  this.alternate = null;
}
```

> Fiber 节点的具体属性定义请[戳这里查看](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiber.new.js#L117)

#### Fiber 作为架构说明

1，Fiber 作为架构来说，每个 Fiber 节点有对应的 React element，多个 Fiber 节点依靠如下三个属性来连接形成树：

```js
// 指向父级Fiber节点
this.return = null;
// 指向子Fiber节点
this.child = null;
// 指向右边第一个兄弟Fiber节点
this.sibling = null;
```

2，就如同如下结构来说，其对应的 Fiber 树结构如下图所示：

```js
function App() {
  return (
    <div>
      我叫
      <span>dnhyxc</span>
    </div>
  );
}
```

![Fiber树结构](fiber.png)

> 说明：为什么父级指针叫做 return 而不是 parent 或者 father 呢？因为作为一个工作单元，return 指节点执行完 completeWork（后面会介绍到）后会返回的下一个节点。子 Fiber 节点及其兄弟节点完成工作后会返回其父级节点，所以用 return 指代父级节点。

3，**Fiber 节点可以保存对应的 DOM 节点。相应的，Fiber 节点构成的 Fiber 树就对应 DOM 树**。

#### Fiber 作为静态的数据结构说明

1，Fiber 作为一种静态的数据结构，保存了组件相关的信息，如下：

```js
// Fiber对应组件的类型 Function/Class/Host...
this.tag = tag;
// key属性
this.key = key;
// 大部分情况同type，某些情况不同，比如FunctionComponent使用React.memo包裹
this.elementType = null;
// 对于 FunctionComponent，指函数本身，对于ClassComponent，指class，对于HostComponent，指DOM节点tagName
this.type = null;
// Fiber对应的真实DOM节点
this.stateNode = null;
```

#### Fiber 作为动态的工作单元说明

1，作为动态的工作单元，Fiber 中如下参数保存了本次更新相关的信息：

```js
// 保存本次更新造成的状态改变相关信息
this.pendingProps = pendingProps;
this.memoizedProps = null;
this.updateQueue = null;
this.memoizedState = null;
this.dependencies = null;

this.mode = mode;

// 保存本次更新会造成的DOM操作
this.effectTag = NoEffect;
this.nextEffect = null;

this.firstEffect = null;
this.lastEffect = null;

// 调度优先级相关
this.lanes = NoLanes;
this.childLanes = NoLanes;
```

### Fiber 结构的工作原理

#### 双缓存概述

1，当用 canvas 绘制动画时，每一帧绘制前都会调用 ctx.clearRect 清除上一帧的画面。如果当前帧画面计算量比较大，导致清除上一帧画面到绘制当前帧画面之间有较长间隙，就会出现白屏。为了解决白屏这个问题，可以在内存中绘制当前帧动画，绘制完毕后直接用当前帧替换上一帧画面，由于省去了两帧替换间的计算时间，不会出现从白屏到出现画面的闪烁情况。这种在内存中构建并直接替换的技术叫做[双缓存](https://baike.baidu.com/item/%E5%8F%8C%E7%BC%93%E5%86%B2)。

2，React 使用“双缓存”来完成 Fiber 树的构建与替换，即对应着 DOM 树的创建与更新。

#### 双缓存 Fiber 树

1，在 React 中最多会同时存在两棵 Fiber 树。当前屏幕上显示内容对应的 Fiber 树称为 current Fiber 树，正在内存中构建的 Fiber 树称为 workInProgress Fiber 树。

2，current Fiber 树中的 Fiber 节点被称为 current fiber，workInProgress Fiber 树中的 Fiber 节点被称为 workInProgress fiber，他们通过 **alternate** 属性连接。

```js
currentFiber.alternate === workInProgressFiber;
workInProgressFiber.alternate === currentFiber;
```

3，React 应用的根节点通过使 current 指针在不同 Fiber 树的 rootFiber 间切换来完成 current Fiber 树指向的切换。即当 workInProgress Fiber 树构建完成交给 Renderer 渲染在页面上后，应用根节点的 current 指针指向 workInProgress Fiber 树，此时 workInProgress Fiber 树就变为 current Fiber 树。

4，每次状态更新都会产生新的 workInProgress Fiber 树，通过 current 与 workInProgress 的替换，完成 DOM 更新。

#### mount 时

```js
function App() {
  const [num, add] = useState(0);
  return <p onClick={() => add(num + 1)}>{num}</p>;
}

ReactDOM.render(<App />, document.getElementById("root"));
```

1，以上述栗子 🌰 来说：首次执行 ReactDOM.render 会创建 **fiberRootNode**（源码中叫 fiberRoot）和 **rootFiber**。其中 fiberRootNode 是整个应用的根节点，rootFiber 是`<App/>`所在组件树的根节点。

- 之所以要区分 fiberRootNode 与 rootFiber，是因为在应用中我们 **可以多次调用 ReactDOM.render** 渲染不同的组件树，他们会拥有不同的 rootFiber。但是整个应用的根节点只有一个，那就是 fiberRootNode。

2，fiberRootNode 的 current 会指向当前页面上已渲染的内容对应的 Fiber 树，即 current Fiber 树。

![rootFiber](rootfiber.png)

```js
fiberRootNode.current = rootFiber;
```

- 由于是首屏渲染，页面中还没有挂载任何 DOM，所以 fiberRootNode.current 指向的 rootFiber 没有任何子 Fiber 节点（即 current Fiber 树为空）。

3，在进入 render 阶段时，根据组件返回的 JSX 在内存中依次创建 Fiber 节点并连接在一起构建 Fiber 树，被称为 workInProgress Fiber 树。（下图中右侧为内存中构建的树，左侧为页面显示的树）。

- 在构建 workInProgress Fiber 树时会尝试复用 current Fiber 树中已有的 Fiber 节点内的属性，**在首屏渲染时只有 rootFiber 存在对应的 current fiber（即 rootFiber.alternate）**。

![workInProgressFiber](workInProgressFiber.png)

4，上图中右侧已构建完的 workInProgress Fiber 树在 commit 阶段渲染到页面。此时 DOM 更新为右侧树对应的样子。fiberRootNode 的 current 指针指向 workInProgress Fiber 树使其变为 current Fiber 树。

![wipTreeFinish](wipTreeFinish.png)

#### update 时

1，点击 p 节点触发状态改变，这会开启一次新的 render 阶段并构建一棵新的 workInProgress Fiber 树。

![wipTreeUpdate](wipTreeUpdate.png)

- 和 mount 时一样，workInProgress fiber 的创建可以复用 current Fiber 树对应的节点数据。

> 这个决定是否复用的过程就是 Diff 算法。

2，workInProgress Fiber 树在 render 阶段完成构建后进入 commit 阶段渲染到页面上。渲染完毕后，workInProgress Fiber 树变为 current Fiber 树。

![currentTreeUpdate](currentTreeUpdate.png)

### render 阶段流程

#### render 阶段流程概述

1，render 阶段开始于 performSyncWorkOnRoot 或 performConcurrentWorkOnRoot 方法的调用。这取决于本次更新是同步更新还是异步更新。而在这两个方法中会调用如下两个方法：

```js
// performSyncWorkOnRoot会调用该方法
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

// performConcurrentWorkOnRoot会调用该方法
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}
```

- 上述两个方法他们唯一的区别是是否调用 **shouldYield**。如果当前浏览器帧没有剩余时间，shouldYield 会中止循环，直到浏览器有空闲时间后再继续遍历。

- workInProgress 代表当前已创建的 workInProgress fiber。

- performUnitOfWork 方法会创建下一个 Fiber 节点并赋值给 workInProgress，并将 workInProgress 与已创建的 Fiber 节点连接起来构成 Fiber 树。

> [戳这里看 workLoopConcurrent 的源码](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L1599)

3，Fiber Reconciler 是从 Stack Reconciler 重构而来，通过遍历的方式实现可中断的递归，所以 performUnitOfWork 的工作可以分为两部分：「递」和「归」。

#### “递”阶段

1，首先从 rootFiber 开始向下深度优先遍历。为遍历到的每个 Fiber 节点调用 [beginWork](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3058) 方法。该方法会根据传入的 Fiber 节点创建子 Fiber 节点，并将这两个 Fiber 节点连接起来。当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段。

#### “归”阶段

1，在“归”阶段会调用 [completeWork](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCompleteWork.new.js#L652) 处理 Fiber 节点。

2，当某个 Fiber 节点执行完 completeWork，如果其存在兄弟 Fiber 节点（即 fiber.sibling !== null），会进入其兄弟 Fiber 的“递”阶段。如果不存在兄弟 Fiber，会进入父级 Fiber 的“归”阶段。

3，“递”和“归”阶段会交错执行直到“归”到 rootFiber。至此，render 阶段的工作就结束了。

#### 示例 🌰

1，示例代码如下：

```js
function App() {
  return (
    <div>
      我是
      <span>dnhyxc</span>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

- 上述代码对应的 Fiber 树结构：

![Fiber树结构](fiber.png)

- render 阶段会依次执行：

```js
rootFiber beginWork
  => App Fiber beginWork
  => div Fiber beginWork
  => "我是" Fiber beginWork
  => "我是" Fiber completeWork
  => span Fiber beginWork
  => span Fiber completeWork
  => div Fiber completeWork
  => App Fiber completeWork
  => rootFiber completeWork
```

> **说明**：之所以没有 “dnhyxc” Fiber 的 beginWork/completeWork，是因为作为一种性能优化手段，针对只有单一文本子节点的 Fiber，React 会特殊处理。

### beginWork

#### beginWork 方法解析

1，beginWork 方法大致定义如下，[戳这里看源码](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3058)：

```js
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  // ...省略函数体
}
```

2，参数说明：

- current：当前组件对应的 Fiber 节点在上一次更新时的 Fiber 节点，即 workInProgress.alternate。

- workInProgress：当前组件对应的 Fiber 节点。

- renderLanes：优先级相关，在讲解 Scheduler 时再讲解。
