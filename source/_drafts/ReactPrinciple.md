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

4，**每次状态更新都会产生新的 workInProgress Fiber 树**，通过 current 与 workInProgress 的替换，完成 DOM 更新。

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

##### “递”阶段

1，首先从 rootFiber 开始向下深度优先遍历。为遍历到的每个 Fiber 节点调用 [beginWork](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3058) 方法。该方法会根据传入的 Fiber 节点创建子 Fiber 节点，并将这两个 Fiber 节点连接起来。当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段。

##### “归”阶段

1，在“归”阶段会调用 [completeWork](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCompleteWork.new.js#L652) 处理 Fiber 节点。

2，当某个 Fiber 节点执行完 completeWork，如果其存在兄弟 Fiber 节点（即 fiber.sibling !== null），会进入其兄弟 Fiber 的“递”阶段。如果不存在兄弟 Fiber，会进入父级 Fiber 的“归”阶段。

3，“递”和“归”阶段会交错执行直到“归”到 rootFiber。至此，render 阶段的工作就结束了。

##### 示例 🌰

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

#### beginWork

##### beginWork 方法解析

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

- **current**：当前组件对应的 Fiber 节点在上一次更新时的 Fiber 节点，即 workInProgress.alternate（上一次更新的 Fiber 节点）。

  - 组件 mount 时，由于是首次渲染，是不存在当前组件对应的 Fiber 节点在上一次更新时的 Fiber 节点。所以 `mount 时 current === null`。

  - 组件 update 时，由于之前已经 mount 过，所以 `current !== null`。所以可以通过 current 是否等于 null 来区分组件是 mount 还是 update。

- **workInProgress**：当前组件对应的 Fiber 节点（最新在内存中生成的 Fiber 节点）。

- **renderLanes**：优先级相关，在讲解 Scheduler 时再讲解。

3，基于 current 是否为 null，beginWork 的工作可以分为如下两部分：

- update 时：如果 current 存在，在满足一定条件时可以复用 current 节点，这样就能克隆 current.child 作为 workInProgress.child，而不需要新建 workInProgress.child。

- mount 时：current === null。会根据 fiber.tag 不同，创建不同类型的子 Fiber 节点。

```js
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  // update时：如果current存在可能存在优化路径，可以复用current（即上一次更新的Fiber节点）
  if (current !== null) {
    // ...省略

    // 复用current
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  } else {
    didReceiveUpdate = false;
  }

  // mount时：根据tag不同，创建不同的子Fiber节点
  switch (workInProgress.tag) {
    case IndeterminateComponent:
    // ...省略
    case LazyComponent:
    // ...省略
    case FunctionComponent:
    // ...省略
    case ClassComponent:
    // ...省略
    case HostRoot:
    // ...省略
    case HostComponent:
    // ...省略
    case HostText:
    // ...省略
    // ...省略其他类型
  }
}
```

2，beginWork 大致流程图如下：

![beginWork](beginwork.png)

##### mount 时

1，当不满足复用前一次更新的子 fiber 时，就进入 switch 判断，根据 fiber.tag 不同，进入不同类型 Fiber 的创建逻辑，从而新建子 Fiber：

```js
// mount时：根据tag不同，创建不同的Fiber节点
switch (workInProgress.tag) {
  case IndeterminateComponent:
  // ...省略
  case LazyComponent:
  // ...省略
  case FunctionComponent:
  // ...省略
  case ClassComponent:
  // ...省略
  case HostRoot:
  // ...省略
  case HostComponent:
  // ...省略
  case HostText:
  // ...省略
  // ...省略其他类型
}
```

> [戳这里](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactWorkTags.js)看 tag 对应的组件类型。

2，对于常见的组件类型，如 FunctionComponent、ClassComponent、HostComponent 等，最终会进入 [reconcileChildren](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L233) 方法。

##### update 时

1，当 **didReceiveUpdate === false**（即可以直接复用前一次更新的子 Fiber，不需要新建子 Fiber）。

- oldProps === newProps && workInProgress.type === current.type，即 props 与 fiber.type 不变。

- !includesSomeLane(renderLanes, updateLanes)，即当前 Fiber 节点优先级不够，会在讲解 Scheduler 时介绍。

```js
if (current !== null) {
  const oldProps = current.memoizedProps;
  const newProps = workInProgress.pendingProps;

  if (
    oldProps !== newProps ||
    hasLegacyContextChanged() ||
    (__DEV__ ? workInProgress.type !== current.type : false)
  ) {
    didReceiveUpdate = true;
  } else if (!includesSomeLane(renderLanes, updateLanes)) {
    didReceiveUpdate = false;
    switch (
      workInProgress.tag
      // 省略处理
    ) {
    }
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
  } else {
    didReceiveUpdate = false;
  }
} else {
  didReceiveUpdate = false;
}
```

##### reconcileChildren

1，该方法对于 mount 的组件，它会创建新的子 Fiber 节点。

2，而对于 update 的组件，它会将当前组件与该组件在上次更新时对应的 Fiber 节点比较（也就是俗称的 Diff 算法），将比较的结果生成新 Fiber 节点。

```js
export function reconcileChildren(
  current: Fiber | null,
  workInProgress: Fiber,
  nextChildren: any,
  renderLanes: Lanes
) {
  if (current === null) {
    // 对于mount的组件
    workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      nextChildren,
      renderLanes
    );
  } else {
    // 对于update的组件
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderLanes
    );
  }
}
```

- 从上面代码可以看出，和 beginWork 一样，该方法也是通过 current 是否等于 null 来区分 mount 与 update。但不论走哪个逻辑，最终都会生成新的子 Fiber 节点并赋值给 workInProgress.child，作为下次 beginWork 执行时 workInProgress 的传参。

3，**注意**：mountChildFibers 与 reconcileChildFibers 这两个方法的逻辑基本一致。唯一的区别是：**reconcileChildFibers 会为生成的 Fiber 节点带上 effectTag 属性**，而 mountChildFibers 不会。

##### effectTag

1，由于 render 阶段的工作是在内存中进行，当工作结束后会通知 Renderer 需要执行的 DOM 操作。**要执行 DOM 操作的具体类型**就保存在 fiber.effectTag 中。[戳这里](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactSideEffectTags.js)看全部 effectTag 对应的 DOM 操作，如下为简单示例（省略版）：

```js
// DOM需要插入到页面中
export const Placement = /*                */ 0b00000000000010;
// DOM需要更新
export const Update = /*                   */ 0b00000000000100;
// DOM需要插入到页面中并更新
export const PlacementAndUpdate = /*       */ 0b00000000000110;
// DOM需要删除
export const Deletion = /*                 */ 0b00000000001000;
```

- 通过二进制表示 effectTag，可以方便的使用位操作为 fiber.effectTag 赋值多个 effect。

2，如果要通知 Renderer 将 Fiber 节点对应的 DOM 节点插入页面中，需要满足以下两个条件：

- fiber.stateNode 存在，即 Fiber 节点中保存了对应的 DOM 节点。

- fiber.effectTag &= Placement !== 0，即 Fiber 节点存在 Placement effectTag。

3，由于 mount 时，fiber.stateNode === null，且在 reconcileChildren 中调用的 mountChildFibers 不会为 Fiber 节点赋值 effectTag。那么首屏渲染如何完成呢？

- 答案就是：fiber.stateNode 会在 completeWork 中创建，将会在下一节介绍。

4，假设 mountChildFibers 也会赋值 effectTag，那么可以预见 mount 时整棵 Fiber 树所有节点都会有 Placement effectTag。那么 commit 阶段在执行 DOM 操作时每个节点都会执行一次插入操作，这样大量的 DOM 操作是极低效的。

- 为了解决这个问题，在 mount 时只有 rootFiber 会赋值 Placement effectTag，在 commit 阶段只会执行一次插入操作。

##### beginWork 方法总结

1，beginWork 方法主要就是用于创建 Fiber 节点，形成 Fiber 树。

#### completeWork

##### completeWork 流程概览

1，类似 beginWork，completeWork 也是针对不同 fiber.tag 调用不同的处理逻辑。

```js
function completeWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
): Fiber | null {
  const newProps = workInProgress.pendingProps;

  switch (workInProgress.tag) {
    case IndeterminateComponent:
    case LazyComponent:
    case SimpleMemoComponent:
    case FunctionComponent:
    case ForwardRef:
    case Fragment:
    case Mode:
    case Profiler:
    case ContextConsumer:
    case MemoComponent:
      return null;
    case ClassComponent: {
      // ...省略
      return null;
    }
    case HostRoot: {
      // ...省略
      updateHostContainer(workInProgress);
      return null;
    }
    case HostComponent: {
      // ...省略
      return null;
    }
  // ...省略
```

> [戳这里](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCompleteWork.new.js#L652)看 completeWork 方法的完整定义。

2，completeWork 大致流程图如下：

![completeWork](completeWork.png)

##### 处理 HostComponent

1，和 beginWork 一样，根据 current 是否等于 null 来判断是 mount 还是 update。同时针对 HostComponent，判断 update 时还需要考虑 workInProgress.stateNode 是否为 null（即该 Fiber 节点是否存在对应的 DOM 节点）。

```js
case HostComponent: {
  popHostContext(workInProgress);
  const rootContainerInstance = getRootHostContainer();
  const type = workInProgress.type;

  if (current !== null && workInProgress.stateNode != null) {
    // update的情况
    // ...省略
  } else {
    // mount的情况
    // ...省略
  }
  return null;
}
```

##### mount 时

1，当省略了不相关的逻辑。可以看到，mount 时的主要逻辑包括以下三个：

- 为 Fiber 节点生成对应的 DOM 节点。

- 将子孙 DOM 节点插入刚生成的 DOM 节点中。

- 与下方 update 逻辑中的 updateHostComponent 类似的处理 props 的过程。

```js
// mount的情况

// ...省略服务端渲染相关逻辑

const currentHostContext = getHostContext();
// 为fiber创建对应DOM节点
const instance = createInstance(
  type,
  newProps,
  rootContainerInstance,
  currentHostContext,
  workInProgress
);
// 将子孙DOM节点插入刚生成的DOM节点中
appendAllChildren(instance, workInProgress, false, false);
// DOM节点赋值给fiber.stateNode
workInProgress.stateNode = instance;

// 与update逻辑中的updateHostComponent类似的处理props的过程
if (
  finalizeInitialChildren(
    instance,
    type,
    newProps,
    rootContainerInstance,
    currentHostContext
  )
) {
  markUpdate(workInProgress);
}
```

2，由于 mount 时只会在 rootFiber 存在 Placement effectTag。那么 commit 阶段是如何通过一次插入 DOM 操作（对应一个 Placement effectTag）将整棵 DOM 树插入页面的呢？

- 答案就在于 completeWork 中的 appendAllChildren 方法。由于 completeWork 属于“归”阶段调用的函数，每次调用 appendAllChildren 时都会将已生成的子孙 DOM 节点插入当前生成的 DOM 节点下。那么当“归”到 rootFiber 时，我们已经有一个构建好的离屏 DOM 树。

##### update 时

1，当 update 时，Fiber 节点已经存在对应 DOM 节点，所以不需要生成 DOM 节点。需要做的主要是处理 props，比如：

- onClick、onChange 等回调函数的注册。

- 处理 style prop。

- 处理 DANGEROUSLY_SET_INNER_HTML prop。

- 处理 children prop。

2，在去掉一些当前不需要关注的功能（比如 ref）时，可以看到最主要的逻辑是调用 **updateHostComponent** 方法。

```js
if (current !== null && workInProgress.stateNode != null) {
  // update的情况
  updateHostComponent(
    current,
    workInProgress,
    type,
    newProps,
    rootContainerInstance
  );
}
```

> [戳这里](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCompleteWork.new.js#L204)看 updateHostComponent 方法的完成定义。

- 在 updateHostComponent 内部，被处理完的 props 会被赋值给 workInProgress.updateQueue，并最终会在 commit 阶段被渲染在页面上。

```js
workInProgress.updateQueue = (updatePayload: any);
```

- 其中 updatePayload 为数组形式，它的奇数索引的值为变化的 prop key，偶数索引的值为变化的 prop value。

##### effectList

1，到这一步，render 阶段的绝大部分工作就完成了。而作为 DOM 操作的依据，commit 阶段需要找到所有有 effectTag 的 Fiber 节点并依次执行 effectTag 对应操作。那是否需要在 commit 阶段再遍历一次 Fiber 树寻找 effectTag !== null 的 Fiber 节点呢？

- 答案是否定的，为了解决这个问题，在 completeWork 的上层函数 completeUnitOfWork 中，每个执行完 completeWork 且存在 effectTag 的 Fiber 节点会被保存在一条被称为 effectList 的单向链表中。

- effectList 中第一个 Fiber 节点保存在 fiber.firstEffect，最后一个元素保存在 fiber.lastEffect。

- 类似 appendAllChildren，在“归”阶段，所有有 effectTag 的 Fiber 节点都会被追加在 effectList 中，最终形成一条以 rootFiber.firstEffect 为起点的单向链表。这样，在 commit 阶段只需要遍历 effectList 就能执行所有 effect 了。

```js
                       nextEffect         nextEffect
rootFiber.firstEffect -----------> fiber -----------> fiber
```

> [戳这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L1744)看这段代码的完整逻辑。

##### completeWork 方法总结

1，completeWork 方法主要的作用就是根据生成的 Fiber 节点，创建对应的 DOM 节点。

#### 流程结尾

1，至此，render 阶段全部工作完成。在 performSyncWorkOnRoot 函数中 fiberRootNode 被传递给 commitRoot 方法，开启 commit 阶段工作流程，[戳这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L1107)看源码。

```js
commitRoot(root);
```

### commit 阶段流程

#### commit 阶段流程概述

1，Renderer 工作的阶段被称为 commit 阶段，而 commitRoot 方法是 commit 阶段工作的起点。fiberRootNode 会作为参数传入 commitRoot 方法中。

```js
commitRoot(root); // root即为fiberRootNode
```

2，在 rootFiber.firstEffect 上保存了一条需要执行副作用的 Fiber 节点的单向链表 effectList，这些 Fiber 节点的 updateQueue 中保存了变化的 props。而这些副作用对应的 DOM 操作就会在在 commit 阶段执行。

3，除此之外，一些生命周期钩子（比如 componentDidXXX）、hook（比如 useEffect）也需要在 commit 阶段执行。

4，commit 阶段的主要工作（即 Renderer 的工作流程）分为如下三部分，[戳这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L2001)看源码：

- before mutation 阶段（执行 DOM 操作前）。

- mutation 阶段（执行 DOM 操作）。

- layout 阶段（执行 DOM 操作后）。

5，在 before mutation 阶段之前和 layout 阶段之后还有一些额外工作，涉及到比如 useEffect 的触发、优先级相关的重置、ref 的绑定/解绑，下面将会进行简单的介绍。

##### before mutation 之前

1，commitRootImpl 方法中直到第一句 if (firstEffect !== null)之前属于 before mutation 之前，如下：

```js
// do...while 循环至少会执行一次，不管条件是否成立，因为该循环在判断条件是否成立之前就会执行一次，之后如果判断条件成立则循环执行，否则就会终止循环。
do {
  // 触发useEffect回调与其他同步任务。由于这些任务可能触发新的渲染，所以这里要一直遍历执行直到没有任务
  flushPassiveEffects();
} while (rootWithPendingPassiveEffects !== null);

// root指 fiberRootNode
// root.finishedWork指当前应用的rootFiber
const finishedWork = root.finishedWork;

// 凡是变量名带lane的都是优先级相关
const lanes = root.finishedLanes;
if (finishedWork === null) {
  return null;
}
root.finishedWork = null;
root.finishedLanes = NoLanes;

// 重置Scheduler绑定的回调函数
root.callbackNode = null;
root.callbackId = NoLanes;

let remainingLanes = mergeLanes(finishedWork.lanes, finishedWork.childLanes);
// 重置优先级相关变量
markRootFinished(root, remainingLanes);

// 清除已完成的discrete updates，例如：用户鼠标点击触发的更新。
if (rootsWithPendingDiscreteUpdates !== null) {
  if (
    !hasDiscreteLanes(remainingLanes) &&
    rootsWithPendingDiscreteUpdates.has(root)
  ) {
    rootsWithPendingDiscreteUpdates.delete(root);
  }
}

// 重置全局变量
if (root === workInProgressRoot) {
  workInProgressRoot = null;
  workInProgress = null;
  workInProgressRootRenderLanes = NoLanes;
} else {
}

// 将effectList赋值给firstEffect
// 由于每个fiber的effectList只包含他的子孙节点
// 所以根节点如果有effectTag则不会被包含进来
// 所以这里将有effectTag的根节点插入到effectList尾部
// 这样才能保证有effect的fiber都在effectList中
let firstEffect;
if (finishedWork.effectTag > PerformedWork) {
  if (finishedWork.lastEffect !== null) {
    finishedWork.lastEffect.nextEffect = finishedWork;
    firstEffect = finishedWork.firstEffect;
  } else {
    firstEffect = finishedWork;
  }
} else {
  // 根节点没有effectTag
  firstEffect = finishedWork.firstEffect;
}
```

- 由可以代码可以看到，before mutation 之前主要做一些变量赋值，状态重置的工作。目前只需要关注最后赋值的 firstEffect，因为在 commit 的三个子阶段都会用到他。

##### layout 之后

1，如下是 layout 阶段执行完后的代码，[戳这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L2195)看这段源码，简单浏览即可，现在不需要理解：

```js
const rootDidHavePassiveEffects = rootDoesHavePassiveEffects;

// useEffect相关
if (rootDoesHavePassiveEffects) {
  rootDoesHavePassiveEffects = false;
  rootWithPendingPassiveEffects = root;
  pendingPassiveEffectsLanes = lanes;
  pendingPassiveEffectsRenderPriority = renderPriorityLevel;
} else {
}

// 性能优化相关
if (remainingLanes !== NoLanes) {
  if (enableSchedulerTracing) {
    // ...
  }
} else {
  // ...
}

// 性能优化相关
if (enableSchedulerTracing) {
  if (!rootDidHavePassiveEffects) {
    // ...
  }
}

// ...检测无限循环的同步任务
if (remainingLanes === SyncLane) {
  // ...
}

// 在离开commitRoot函数前调用，触发一次新的调度，确保任何附加的任务被调度
ensureRootIsScheduled(root, now());

// ...处理未捕获错误及老版本遗留的边界问题

// 执行同步任务，这样同步任务不需要等到下次事件循环再执行
// 比如在 componentDidMount 中执行 setState 创建的更新会在这里被同步执行
// 或useLayoutEffect
flushSyncCallbackQueue();

return null;
```

- 上述代码主要包括如下三点内容：

  - useEffect 相关的处理。将在 layout 阶段时进行讲解。

  - 性能追踪相关。源码里有很多和 interaction 相关的变量。他们都和追踪 React 渲染时间、性能相关，在 Profiler API 和 DevTools 中使用。

  - 在 commit 阶段会触发一些生命周期钩子（如 componentDidXXX）和 hook（如 useLayoutEffect、useEffect）。在这些回调方法中可能触发新的更新，新的更新会开启新的 render-commit 流程。

#### before mutation 阶段

##### before mutation 阶段概览

1，before mutation 整个过程就是遍历 effectList 并调用 commitBeforeMutationEffects 函数处理，删减部分不相关的代码逻辑后，主要关注 beforeMutation 阶段的主函数 **commitBeforeMutationEffects** 做了什么，可[戳这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L2104-L2127)看源码，基本代码如下：

```js
// 保存之前的优先级，以同步优先级执行，执行完毕后恢复之前优先级
const previousLanePriority = getCurrentUpdateLanePriority();
setCurrentUpdateLanePriority(SyncLanePriority);

// 将当前上下文标记为CommitContext，作为commit阶段的标志
const prevExecutionContext = executionContext;
executionContext |= CommitContext;

// 处理focus状态
focusedInstanceHandle = prepareForCommit(root.containerInfo);
shouldFireAfterActiveInstanceBlur = false;

// beforeMutation阶段的主函数
commitBeforeMutationEffects(finishedWork);

focusedInstanceHandle = null;
```

##### commitBeforeMutationEffects

1，该方法大体代码逻辑如下：

```js
function commitBeforeMutationEffects() {
  while (nextEffect !== null) {
    const current = nextEffect.alternate;

    if (!shouldFireAfterActiveInstanceBlur && focusedInstanceHandle !== null) {
      // ...focus blur相关
    }

    const effectTag = nextEffect.effectTag;

    // 调用getSnapshotBeforeUpdate
    if ((effectTag & Snapshot) !== NoEffect) {
      commitBeforeMutationEffectOnFiber(current, nextEffect);
    }

    // 调度useEffect
    if ((effectTag & Passive) !== NoEffect) {
      if (!rootDoesHavePassiveEffects) {
        rootDoesHavePassiveEffects = true;
        scheduleCallback(NormalSchedulerPriority, () => {
          flushPassiveEffects();
          return null;
        });
      }
    }
    nextEffect = nextEffect.nextEffect;
  }
}
```

- 以上代码整体可以分为如下三部分：

  - 处理 DOM 节点渲染/删除后的 autoFocus、blur 逻辑。

  - 调用 getSnapshotBeforeUpdate 生命周期钩子。

  - 调度 useEffect。

##### getSnapshotBeforeUpdate

1，commitBeforeMutationEffectOnFiber 是 commitBeforeMutationLifeCycles 的别名。在该方法内会调用 getSnapshotBeforeUpdate。[戳这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberCommitWork.old.js#L222)看到这段逻辑。

2，从 Reactv16 开始，componentWillXXX 钩子前增加了 UNSAFE\_前缀。究其原因，是因为 Stack Reconciler 重构为 Fiber Reconciler 后，render 阶段的任务可能中断/重新开始，对应的组件在 render 阶段的生命周期钩子（即 componentWillXXX）可能触发多次。而这种行为和 Reactv15 不一致，所以标记为 UNSAFE\_。为此，React 提供了替代的生命周期钩子 **getSnapshotBeforeUpdate**。

> componentWillXXX 为什么 会加上 UNSAFE 示例如下：
>
> - 在某个组件 updateQueue 中存在四个 Update，其中字母代表该 Update 要更新的字母，数字代表该 Update 的优先级，数字越小优先级越高。
>
> ```js
> baseState = "";
> A1 - B2 - C1 - D2;
> ```
>
> 1，首次渲染时，先执行优先级为 1 的 A1 与 C1，B2 D2 优先级不够被跳过。
>
> 1.1，为了保证更新的连贯性，第一个被跳过的 Update（B）及其后面所有 Update 会作为第二次渲染的 baseUpdate，无论他们的优先级高低，这里为 B2 C1 D2。
>
> ```js
> baseState: ''
> Updates: [A1, C1]
> Result state: 'AC'
> ```
>
> 2，接着第二次渲染，优先级为 2 的 B2 与 D2。
>
> 2.1，由于 B 在第一次渲染时被跳过，所以在他之后的 C 造成的渲染结果不会体现在第二次渲染的 baseState 中。所以 baseState 为 A 而不是上次渲染的 Result state AC。这也是为了保证更新的连贯性。
>
> ```js
> baseState: 'A'
> Updates: [B2, C1, D2]
> Result state: 'ABCD'
> ```
>
> 2.2，因此可以看出，C1 同时出现在两次渲染的 Updates 中，他代表的状态会被更新两次。
>
> 3，如果有以下类似的代码：
>
> ```js
> componentWillReceiveProps(nextProps) {
>     if (!this.props.includes('C') && nextProps.includes('C')) {
>         // ...do something
>     }
> }
> ```
>
> 3.1，上述代码很有可能被调用两次，这与同步更新的 React 表现不一致。基于以上原因，componentWillXXX 被标记为 UNSAFE。

3，getSnapshotBeforeUpdate 是在 commit 阶段内的 before mutation 阶段调用的，由于 **commit 阶段是同步的**，所以不会遇到多次调用的问题。

##### 调度 useEffect

1，如下代码内，scheduleCallback 方法由 Scheduler 模块提供，用于以某个优先级异步调度一个回调函数。

```js
// 调度useEffect
if ((effectTag & Passive) !== NoEffect) {
  if (!rootDoesHavePassiveEffects) {
    rootDoesHavePassiveEffects = true;
    scheduleCallback(NormalSchedulerPriority, () => {
      // 触发useEffect
      flushPassiveEffects();
      return null;
    });
  }
}
```

- 上述代码中，被**异步调度**的回调函数就是触发 useEffect 的方法 **flushPassiveEffects**。

##### 如何异步调度 useEffect

1，在 flushPassiveEffects 方法内部会从全局变量 rootWithPendingPassiveEffects 获取 effectList。

2，effectList 中保存了需要执行副作用的 Fiber 节点。其中副作用包括如下几点：

- 插入 DOM 节点（Placement）。

- 更新 DOM 节点（Update）。

- 删除 DOM 节点（Deletion）。

3，当一个 FunctionComponent 含有 useEffect 或 useLayoutEffect，它对应的 Fiber 节点也会被赋值 effectTag，[戳这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactHookEffectTags.js)看 hook 相关的 effectTag。

4，在 flushPassiveEffects 方法内部会遍历 rootWithPendingPassiveEffects（即 effectList）执行 effect 回调函数。如果在此时直接执行，由于此时 rootWithPendingPassiveEffects === null，而 rootWithPendingPassiveEffects 要在 layout 之后的代码片段中会根据 rootDoesHavePassiveEffects 是否等于 true 来决定是否赋值 rootWithPendingPassiveEffects。

```js
const rootDidHavePassiveEffects = rootDoesHavePassiveEffects;
if (rootDoesHavePassiveEffects) {
  rootDoesHavePassiveEffects = false;
  rootWithPendingPassiveEffects = root;
  pendingPassiveEffectsLanes = lanes;
  pendingPassiveEffectsRenderPriority = renderPriorityLevel;
}
```

5，综上所述，整个 useEffect 异步调用分为三步：

- before mutation 阶段在 scheduleCallback 中调度 flushPassiveEffects。

- layout 阶段之后将 effectList 赋值给 rootWithPendingPassiveEffects。

- scheduleCallback 触发 flushPassiveEffects，flushPassiveEffects 内部遍历 rootWithPendingPassiveEffects。

##### 为何要异步调用 useEffect

1，react 文档中提到：与 componentDidMount、componentDidUpdate 不同的是，在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。

2，由此可见，useEffect 异步执行的原因主要是**防止同步执行时阻塞浏览器渲染**。

##### before mutation 阶段总结

1，在 before mutation 阶段，会遍历 effectList，依次执行：

- 处理 DOM 节点渲染/删除后的 autoFocus、blur 逻辑。

- 调用 getSnapshotBeforeUpdate 生命周期钩子。

- 调度 useEffect。

#### mutation 阶段

##### mutation 阶段概述

1，mutation 阶段主要在执行 DOM 操作，类似 before mutation 阶段，mutation 阶段也是遍历 effectList，执行函数。这里执行的是 **commitMutationEffects**。

```js
nextEffect = firstEffect;
do {
  try {
    commitMutationEffects(root, renderPriorityLevel);
  } catch (error) {
    invariant(nextEffect !== null, "Should be working on an effect.");
    captureCommitPhaseError(nextEffect, error);
    nextEffect = nextEffect.nextEffect;
  }
} while (nextEffect !== null);
```

##### commitMutationEffects

1，[commitMutationEffects](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.old.js#L2091)方法相关代码如下：

```js
function commitMutationEffects(root: FiberRoot, renderPriorityLevel) {
  // 遍历effectList
  while (nextEffect !== null) {
    const effectTag = nextEffect.effectTag;

    // 根据 ContentReset effectTag重置文字节点
    if (effectTag & ContentReset) {
      commitResetTextContent(nextEffect);
    }

    // 更新ref
    if (effectTag & Ref) {
      const current = nextEffect.alternate;
      if (current !== null) {
        commitDetachRef(current);
      }
    }

    // 根据 effectTag 分别处理
    const primaryEffectTag =
      effectTag & (Placement | Update | Deletion | Hydrating);
    switch (primaryEffectTag) {
      // 插入DOM
      case Placement: {
        commitPlacement(nextEffect);
        nextEffect.effectTag &= ~Placement;
        break;
      }
      // 插入DOM 并 更新DOM
      case PlacementAndUpdate: {
        // 插入
        commitPlacement(nextEffect);

        nextEffect.effectTag &= ~Placement;

        // 更新
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      // SSR
      case Hydrating: {
        nextEffect.effectTag &= ~Hydrating;
        break;
      }
      // SSR
      case HydratingAndUpdate: {
        nextEffect.effectTag &= ~Hydrating;

        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      // 更新DOM
      case Update: {
        const current = nextEffect.alternate;
        commitWork(current, nextEffect);
        break;
      }
      // 删除DOM
      case Deletion: {
        commitDeletion(root, nextEffect, renderPriorityLevel);
        break;
      }
    }

    nextEffect = nextEffect.nextEffect;
  }
}
```

2，由上述代码可以看出，commitMutationEffects 会遍历 effectList，对每个 Fiber 节点执行如下三个操作：

- 根据 ContentReset effectTag 重置文字节点。

- 更新 ref。

- 根据 effectTag 分别处理，其中 effectTag 包括(Placement | Update | Deletion | Hydrating)。

##### Placement effect

1，当 Fiber 节点含有 Placement effectTag，意味着该 Fiber 节点对应的 DOM 节点需要插入到页面中。调用的方法为 [commitPlacement](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCommitWork.new.js#L1156)，该方法所做的工作分为如下三步：

- 获取父级 DOM 节点。其中 finishedWork 为传入的 Fiber 节点：

```js
const parentFiber = getHostParentFiber(finishedWork);
// 父级DOM节点
const parentStateNode = parentFiber.stateNode;
```

- 获取 Fiber 节点的 DOM 兄弟节点：

```js
const before = getHostSibling(finishedWork);
```

- 根据 DOM 兄弟节点是否存在，从而决定是调用 parentNode.insertBefore 还是 parentNode.appendChild 执行 DOM 插入操作。

```js
// 判断parentStateNode是否是rootFiber
if (isContainer) {
  // finishedWork为Fiber节点，before为当前Fiber节点的DOM兄弟节点，parent为当前Fiber的父DOM节点
  insertOrAppendPlacementNodeIntoContainer(finishedWork, before, parent);
} else {
  insertOrAppendPlacementNode(finishedWork, before, parent);
}
```

2，**注意**：getHostSibling（获取兄弟 DOM 节点）的执行很耗时，当在同一个父 Fiber 节点下依次执行多个插入操作，getHostSibling 算法的复杂度为指数级。这是由于 Fiber 节点不只包括 HostComponent，所以 Fiber 树和渲染的 DOM 树节点并不是一一对应的。要从 Fiber 节点找到 DOM 节点很可能跨层级遍历，如下就是典型的栗子 🌰：

```js
function Item() {
  return <li><li>;
}

function App() {
  return (
    <div>
      <Item/>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));
```

- 上述代码对应的 Fiber 树和 DOM 树结构如下：

```js
// Fiber树
          child      child      child       child
rootFiber -----> App -----> div -----> Item -----> li

// DOM树
#root ---> div ---> li
```

- 当在 div 的子节点 Item 前插入一个新节点 p，即 App 变为：

```js
function App() {
  return (
    <div>
      <p></p>
      <Item />
    </div>
  );
}
```

- 其对应的 Fiber 树和 DOM 树结构变为：

```js
// Fiber树
          child      child      child
rootFiber -----> App -----> div -----> p
                                       | sibling       child
                                       | -------> Item -----> li
// DOM树
#root ---> div ---> p
             |
             |----> li
```

- 此时 DOM 节点 p 的兄弟节点为 li，而 Fiber 节点 p 对应的兄弟 DOM 节点为：`fiberP.sibling.child`，即 fiber p 的兄弟 fiber Item 的子 fiber li。

##### Update effect

1，当 Fiber 节点含有 Update effectTag，意味着该 Fiber 节点需要更新。调用的方法为 [commitWork](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCommitWork.new.js#L1441)，它会根据 Fiber.tag 分别处理。目前主要关注 `FunctionComponent` 和 `HostComponent`。

**FunctionComponent mutation**

1，当 fiber.tag 为 FunctionComponent，会调用 [commitHookEffectListUnmount](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCommitWork.new.js#L314)。该方法会遍历 effectList，执行所有 useLayoutEffect hook 的销毁函数，何为“销毁函数”，见如下例子：

```js
useLayoutEffect(() => {
  // ...一些副作用逻辑

  return () => {
    // ...这就是销毁函数
  };
});
```

> 由此可见，在 mutation 阶段会执行 useLayoutEffect 的**销毁函数**。

**HostComponent mutation**

1，当 fiber.tag 为 HostComponent，会调用 [commitUpdate](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-dom/src/client/ReactDOMHostConfig.js#L423)。最终会在 [updateDOMProperties](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-dom/src/client/ReactDOMComponent.js#L378)中将 render 阶段 completeWork 中为 Fiber 节点赋值的 updateQueue 对应的内容渲染在页面上，如下：

```js
for (let i = 0; i < updatePayload.length; i += 2) {
  const propKey = updatePayload[i];
  const propValue = updatePayload[i + 1];

  // 处理 style
  if (propKey === STYLE) {
    setValueForStyles(domElement, propValue);
    // 处理 DANGEROUSLY_SET_INNER_HTML
  } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
    setInnerHTML(domElement, propValue);
    // 处理 children
  } else if (propKey === CHILDREN) {
    setTextContent(domElement, propValue);
  } else {
    // 处理剩余 props
    setValueForProperty(domElement, propKey, propValue, isCustomComponentTag);
  }
}
```

##### Deletion effect

1，当 Fiber 节点含有 Deletion effectTag，意味着该 Fiber 节点对应的 DOM 节点需要从页面中删除。调用的方法为 [commitDeletion](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCommitWork.new.js#L1421)。该方法会执行如下操作：

- 递归调用 Fiber 节点及其子孙 Fiber 节点中 fiber.tag 为 ClassComponent 的 componentWillUnmount (opens new window)生命周期钩子，从页面移除 Fiber 节点对应 DOM 节点。

- 调度 useEffect 的销毁函数。

- 解绑 ref。

##### mutation 阶段总结

1，mutation 阶段会遍历 effectList，依次执行 commitMutationEffects。该方法的主要工作为“根据 effectTag 调用不同的处理函数处理 Fiber。

#### layout 阶段

##### layout 阶段概览

1，之所以称为 layout，因为该阶段的代码都是在 DOM 渲染完成（mutation 阶段完成）后执行的。该阶段触发的生命周期钩子和 hook 可以直接访问到已经改变后的 DOM，即该阶段是可以参与 DOM layout 的阶段。

2，该阶段与前两个阶段类似，layout 阶段也是遍历 effectList，执行函数，具体执行的函数是 commitLayoutEffects，如下：

```js
root.current = finishedWork;

nextEffect = firstEffect;
do {
  try {
    commitLayoutEffects(root, lanes);
  } catch (error) {
    invariant(nextEffect !== null, "Should be working on an effect.");
    captureCommitPhaseError(nextEffect, error);
    nextEffect = nextEffect.nextEffect;
  }
} while (nextEffect !== null);

nextEffect = null;
```

##### commitLayoutEffects

1，[commitLayoutEffects](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L2302) 相关代码如下：

```js
function commitLayoutEffects(root: FiberRoot, committedLanes: Lanes) {
  while (nextEffect !== null) {
    const effectTag = nextEffect.effectTag;

    // 调用生命周期钩子和hook
    if (effectTag & (Update | Callback)) {
      const current = nextEffect.alternate;
      commitLayoutEffectOnFiber(root, current, nextEffect, committedLanes);
    }

    // 赋值ref
    if (effectTag & Ref) {
      commitAttachRef(nextEffect);
    }

    nextEffect = nextEffect.nextEffect;
  }
}
```

2，由上述代码可见，commitLayoutEffects 一共做了两件事：

- commitLayoutEffectOnFiber（调用生命周期钩子和 hook 相关操作）。

- commitAttachRef（赋值 ref）。

##### commitLayoutEffectOnFiber

1，[commitLayoutEffectOnFiber](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCommitWork.new.js#L459) 方法会根据 fiber.tag 对不同类型的节点分别处理。

> commitLayoutEffectOnFiber 为别名，方法原名为 commitLifeCycles。

2，该方法对于 ClassComponent，它会通过 current 是否为 null 来区分是 mount 还是 update，调用 [componentDidMount](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCommitWork.new.js#L538) 或 [componentDidUpdate](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCommitWork.new.js#L592)。

3，触发状态更新的 this.setState 如果赋值了第二个参数回调函数，也会在此时调用。

```js
this.setState({ xxx: 1 }, () => {
  console.log("i am update~");
});
```

4，对于 FunctionComponent 及相关类型，它会调用 useLayoutEffect hook 的回调函数，调度 useEffect 的销毁与回调函数，[戳这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberCommitWork.old.js#L465-L491)看这一段完整代码：

> 相关类型指特殊处理后的 FunctionComponent，比如 ForwardRef、React.memo 包裹的 FunctionComponent。

```js
 switch (finishedWork.tag) {
    // 以下都是FunctionComponent及相关类型
    case FunctionComponent:
    case ForwardRef:
    case SimpleMemoComponent:
    case Block: {
      // 执行useLayoutEffect的回调函数
      commitHookEffectListMount(HookLayout | HookHasEffect, finishedWork);
      // 调度useEffect的销毁函数与回调函数
      schedulePassiveEffects(finishedWork);
      return;
    }
```

5，在上述 Update effect 时说到过，mutation 阶段会执行 useLayoutEffect hook 的销毁函数。再结合这里可以发现，useLayoutEffect hook 从上一次更新的销毁函数调用到本次更新的回调函数调用是**同步执行**的。而 useEffect 则需要先调度，在 Layout 阶段完成后再异步执行。而这就是 useLayoutEffect 与 useEffect 的区别。

6，对于 HostRoot，即 rootFiber，如果赋值了第三个参数回调函数，也会在此时调用。

```js
ReactDOM.render(<App />, document.querySelector("#root"), function () {
  console.log("i am mount~");
});
```

##### commitAttachRef

1，commitLayoutEffects 会做的第二件事是 [commitAttachRef](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberCommitWork.new.js#L823)：

```js
function commitAttachRef(finishedWork: Fiber) {
  const ref = finishedWork.ref;
  if (ref !== null) {
    const instance = finishedWork.stateNode;

    // 获取DOM实例
    let instanceToUse;
    switch (finishedWork.tag) {
      case HostComponent:
        instanceToUse = getPublicInstance(instance);
        break;
      default:
        instanceToUse = instance;
    }

    if (typeof ref === "function") {
      // 如果ref是函数形式，调用回调函数
      ref(instanceToUse);
    } else {
      // 如果ref是ref实例形式，赋值ref.current
      ref.current = instanceToUse;
    }
  }
}
```

- 上述代码主要就是在获取 DOM 实例，更新 ref。

##### current Fiber 树切换

1，进入这一阶段，说明整个 layout 阶段就结束了。

2，**需要注意的是**：在 mutation 阶段结束后，layout 阶段开始前，会切换 fiberRootNode 指向的 current Fiber 树，那么为什么在这个时候执行呢？

```js
root.current = finishedWork;
```

- 由于 workInProgress Fiber 树在 commit 阶段完成渲染后会变为 current Fiber 树。而这行代码的作用就是切换 fiberRootNode 指向的 current Fiber 树。

> 可[戳这里](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L2022)看这部分源码。

- 因为 componentWillUnmount 会在 mutation 阶段执行。此时 current Fiber 树还指向前一次更新的 Fiber 树，在生命周期钩子内获取的 DOM 还是更新前的。而 `componentDidMount 和 componentDidUpdate 会在 layout 阶段执行`。此时 current Fiber 树已经指向更新后的 Fiber 树，在生命周期钩子内获取的 DOM 就是更新后的。即 componentDidMount 和 componentDidUpdate 会在 layout 阶段执行，而这两个钩子需要获取到更新后的 DOM，因此需要在 layout 之前切换 current 指向新生成的 Fiber 树，让其渲染到页面上，得到更新后的 DOM。

##### layout 阶段总结

1，在 layout 阶段会遍历 effectList，依次执行 commitLayoutEffects。该方法的主要工作为“根据 effectTag 调用不同的处理函数处理 Fiber 并更新 ref。

### Diff 算法

#### Diff 算法概述

1，React 需要同时维护两棵虚拟 DOM 树：一棵表示当前的 DOM 结构，另一棵在 React 状态变更将要重新渲染时生成。React 通过比较这两棵树的差异，决定是否需要修改 DOM 结构，以及如何修改。这种算法称作 Diff 算法。

#### Diff 算法的基本过程

1，Diff 算法会对新旧两棵树做**深度优先遍历**，然后给每个节点生成一个唯一的标志。同时在遍历的过程中，每遍历到一个节点，就将新旧两棵树作比较，并且**只对同一级别的元素进行比较**。

#### Diff 的瓶颈以及 React 如何应对

1，由于 Diff 操作本身也会带来性能损耗，React 文档中提到，即使在最前沿的算法中，将前后两棵树完全比对的算法的复杂程度为 O(n 3 )，其中 n 是树中元素的数量。

2，如果在 React 中使用了该算法，那么展示 1000 个元素所需要执行的计算量将在十亿的量级范围。这个开销实在是太过高昂。因此为了降低算法复杂度，React 的 diff 会预设三个限制：

- 只对同级元素进行 Diff。如果一个 DOM 节点在前后两次更新中跨越了层级，那么 React 不会尝试复用他。

- 两个不同类型的元素会产生出不同的树。如果元素由 div 变为 p，React 会销毁 div 及其子孙节点，并新建 p 及其子孙节点。

- 开发者可以通过 key prop 来暗示哪些子元素在不同的渲染下能保持稳定，类似如下示例：

```js
// 更新前
<div>
  <span key="dnh">dnh</span>
  <p key="yxc">yxc</p>
</div>

// 更新后
<div>
  <p key="yxc">yxc</p>
  <span key="dnh">dnh</span>
</div>
```

- 上述代码如果没有 key，React 会认为 div 的第一个子节点由 span 变为 p，第二个子节点由 p 变为 span。这符合上述限制 2 的设定，会销毁并新建。但当用 **key** 指明了节点前后对应关系后，React 知道 key === "dnh" 的 span 在更新后还存在，所以 DOM 节点可以复用，只是需要交换下顺序。

#### Diff 是如何实现的

1，从 Diff 的入口函数 [reconcileChildFibers](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L1280) 可以看出，该函数会根据 newChild（即 JSX 对象）类型调用不同的处理函数。

```js
// 根据newChild类型选择不同diff函数处理
function reconcileChildFibers(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  newChild: any
): Fiber | null {
  const isObject = typeof newChild === "object" && newChild !== null;

  if (isObject) {
    // object类型，可能是 REACT_ELEMENT_TYPE 或 REACT_PORTAL_TYPE
    switch (newChild.$$typeof) {
      case REACT_ELEMENT_TYPE:
      // 调用 reconcileSingleElement 处理
      // // ...省略其他case
    }
  }

  if (typeof newChild === "string" || typeof newChild === "number") {
    // 调用 reconcileSingleTextNode 处理
    // ...省略
  }

  if (isArray(newChild)) {
    // 调用 reconcileChildrenArray 处理
    // ...省略
  }

  // 一些其他情况调用处理函数
  // ...省略

  // 以上都没有命中，删除节点
  return deleteRemainingChildren(returnFiber, currentFirstChild);
}
```

2，根据上述代码，可以从同级的节点数量将 Diff 分为两类：

- 当 newChild 类型为 object、number、string，代表同级只有一个节点。

- 当 newChild 类型为 Array，则表示同级有多个节点。

#### 单节点 diff

1，对于单个节点，以类型 object 为例，会进入 [reconcileSingleElement](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L1141)：

```js
const isObject = typeof newChild === "object" && newChild !== null;

if (isObject) {
  // 对象类型，可能是 REACT_ELEMENT_TYPE 或 REACT_PORTAL_TYPE
  switch (newChild.$$typeof) {
    case REACT_ELEMENT_TYPE:
    // 调用 reconcileSingleElement 处理
    // ...其他case
  }
}
```

2，该函数所做的事情大致流程如下：

![diff流程](diff.png)

3，判断 DOM 节点是否可以复用是如何实现的？相关代码如下：

```js
function reconcileSingleElement(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  element: ReactElement
): Fiber {
  const key = element.key;
  let child = currentFirstChild;

  // 首先判断是否存在对应DOM节点
  while (child !== null) {
    // 上一次更新存在DOM节点，接下来判断是否可复用

    // 首先比较key是否相同
    if (child.key === key) {
      // key相同，接下来比较type是否相同

      switch (child.tag) {
        // ...省略case

        default: {
          if (child.elementType === element.type) {
            // type相同则表示可以复用
            // 返回复用的fiber
            return existing;
          }

          // type不同则跳出switch
          break;
        }
      }
      // 代码执行到这里代表：key相同但是type不同
      // 将该fiber及其兄弟fiber标记为删除
      deleteRemainingChildren(returnFiber, child);
      break;
    } else {
      // key不同，将该fiber标记为删除
      deleteChild(returnFiber, child);
    }
    child = child.sibling;
  }

  // 创建新Fiber，并返回 ...省略
}
```

- 从代码可以看出，React 通过先判断 key 是否相同，如果 key 相同则判断 type 是否相同，只有都相同时，这个 DOM 节点才能被复用。

4，值得注意的几点如下：

- **当 child !== null 且 key 相同且 type 不同时执行 deleteRemainingChildren 将 child 及其兄弟 fiber 都标记删除**。

- **当 child !== null 且 key 不同时仅将当前 child 标记删除**。

5，具体例子如下：

- 当前页面有 3 个 li，要全部删除，再插入一个 p：

```html
<!-- 当前页面显示的 -->
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>

<!-- 本次需要更新的 -->
<ul>
  <p></p>
</ul>
```

- 由于本次更新时只有一个 p，属于单一节点的 Diff，会进入上面所展示的 reconcileSingleElement 方法逻辑，即在 reconcileSingleElement 中遍历之前的 3 个 fiber（对应的 DOM 为 3 个 li），寻找本次更新的 p 是否可以复用之前的 3 个 fiber 中某个的 DOM。

  - 当 key 相同且 type 不同时，代表我们已经找到本次更新的 p 对应的上次的 fiber，但是 p 与 li type 不同，不能复用。既然唯一的可能性已经不能复用，则剩下的 fiber 都没有机会了，所以都需要标记删除。

  - 当 key 不同时只代表遍历到的该 fiber 不能被 p 复用，后面还有兄弟 fiber 还没有遍历到。所以仅仅标记该 fiber 删除。

#### 多节点 Diff

##### 多节点 Diff 出现的情况

1，当有一个 FunctionComponent，他的返回值 JSX 对象的 children 属性不是单一节点，而是包含四个对象的数组，如下：

```js
function List() {
  return (
    <ul>
      <li key="0">0</li>
      <li key="1">1</li>
      <li key="2">2</li>
      <li key="3">3</li>
    </ul>
  );
}

// 对应JSX对象
{
  $$typeof: Symbol(react.element),
  key: null,
  props: {
    children: [
      {$$typeof: Symbol(react.element), type: "li", key: "0", ref: null, props: {…}, …}
      {$$typeof: Symbol(react.element), type: "li", key: "1", ref: null, props: {…}, …}
      {$$typeof: Symbol(react.element), type: "li", key: "2", ref: null, props: {…}, …}
      {$$typeof: Symbol(react.element), type: "li", key: "3", ref: null, props: {…}, …}
    ]
  },
  ref: null,
  type: "ul"
}
```

- 对于以上这种情况，即 reconcileChildFibers 的 newChild 参数类型为 Array，在 [reconcileChildFibers](https://github.com/facebook/react/blob/970fa122d8188bafa600e9b5214833487fbf1092/packages/react-reconciler/src/ReactChildFiber.new.js#L1344) 函数内部对应如下情况：

```js
if (isArray(newChild)) {
  // 调用 reconcileChildrenArray 处理
  // ...省略
}
```
