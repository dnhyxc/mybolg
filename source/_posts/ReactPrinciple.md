---
title: ReactPrinciple
tags: react
declare: true
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
