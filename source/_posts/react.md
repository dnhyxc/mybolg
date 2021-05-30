---
title: React
date: 2019-02-20 21:08:18
tags: react
toc: true
declare: true
categories:
  - 前端框架
    - react
---

### React 的定义方式

#### 定义方式一

1，使用函数定义的方式：

```js
export default function App（props）{
    return(
        <div>
            /* return中只能存在一个div包裹的情况，
            不能存在两个div同等级的情况。*/
            <h1>{props.xxx}</h1>
        </div>
    )
}
```

<!-- more -->

#### 定义方式二

1，使用类定义的方式：

```js
export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.state.xxx}</h1>
      </div>
    );
  }
}
```

### React 的渲染方式

#### 函数式或类

1，不管是函数定义的方式，还是类定义的方式，都是使用同一种渲染方式:

```jsx
ReactDOM.render(<App/>,document.getElementById('root')
```

### react.PureComponent

#### PureComponent 与 shouldComponentUpdate

1，**PureComponent** 会对数据进行浅比较，即可对其他组件传递过来的状态（props）进行浅比较，如果前后状态相同，则不会触发 render 进行状态更新，也就不会更新视图。否则反之。

2，可使用 **shouldComponentUpdate()** 生命周期函数代替 PureComponent。

3，具体用法示例如下：

```js
export default class Child extends PureComponent {
  render() {
    console.log("前后状态不一样，我更新了~~~");
    return (
      <div>
        <h3>Child1:{this.props.count}</h3>
      </div>
    );
  }
}
```

### react.Component

#### Component 说明：

1，Component 不会对数据进行比较。不管前后状态是否相同，都会触发 render 进行状态更新。

### React.memo()

#### memo 说明

1，React.memo() 和 PureComponent 很相似，他可以控制组件是否进行渲染。

2，组件仅在它的 props 发生改变的时候进行重新渲染。通常来说，在组件树中 React 组件，只要有变化就会走一遍渲染流程。但是通过 PureComponent 和 React.memo()，我们可以仅仅让某些组件进行渲染。

3，PureComponent 要依靠 class 才能使用。而 React.memo() 可以和 function component 一起使用。

4，React.memo() 基本使用：

```js
import React, { Component } from "react";

class Child extends Component {
  render() {
    console.log("ChildRender");
    return <div>Child:{this.props.count}</div>;
  }
}
// 只有当this.props.count与前一次不一样才触发render进行状态更新。
export default React.memo(Child);
```

### Fragment

#### Fragment 说明

1，Fragment 组件可以防止产生无意义标签，从而影响 HTML 页面结构。或者直接使用空标签：<></>（空标签）也能达到 Fragment 的效果。但官方推荐使用 Fragment。

### React 中 props 属性

#### props 理解

1，每个组件对象都会有 props 属性。

2，组件标签的所有属性都保存在 props 属性中。

3，props 中保存的属性是从外部传递过来的。

#### props 作用

1，通过标签属性从组件外向组件内传递变化的数据。

2，**注意**：组件内部不要修改 props 数据。

3，编码操作：

- 内部读取某个属性值：**this.props.propsTypeName**。

- 对 props 中的属性值进行类型限制和必要性限制（即对属性的类型进行检测并且可对属性进行必要性限制）。

```js
// 设置传递过来的属性需要时字符串类型，且是必要的
App.propType = {
  name: PropType.string.isRequired,
  age: PropType.string.isRequired,
};
```

- 设置默认属性值：

```js
// 如果没有传递设定的name属性，则默认使用snsn
App.defaultProps = {
  name: "snsn",
};
```

4，propsTypes 使用示例：

```js
import React from "react";
import PropTypes from "prop-types";
import "./index.css";
export default function TodoHeader(props) {
  // console.log(props)
  return (
    <div className="header">
      <h1 className="logo">
        <a href="https://react.docschina.org/" title="React官网">
          React官网
        </a>
      </h1>
      <h1>{props.children}</h1>
      <h3>{props.desc}</h3>
    </div>
  );
}

TodoHeader.propTypes = {
  desc: PropTypes.string.isRequired,
};

// 设置desc默认值
TodoHeader.defaultProps = {
  desc: "踏足山巅",
};
```

5，组件类的构造函数：

```jsx
constroutor(props) {
    super(props)
    // 查看props中所有的属性
    console.log(props)
}
```

### React 中 state 属性

#### state 说明

1，state 属性理解：

- state 是组件对象最重要的属性，值是对象（可包含多个数据）。组件被称为“状态肌”，通过更新组件的 state 属性来更新对应的页面显示（重新渲染组件）。

2，state 属性使用：

- 读取属性：`this.state.stateName`。

- 更新属性：this.setState()。

```jsx
this.setState({
  stateName: newValue,
  stateName1: newValue1,
});
```

#### setState() 方法说明：

1，关于 setState 是同步还是异步的问题：

- setState 是 react 控制的就是异步的，不属于 react 控制的就是同步的，比如在定时器中执行时就是同步的。而在 componentDidMount 生命周期中执行时就是异步的。

2，setState 在生命周期中执行时为异步操作，setState 会合并所有异步执行，直到异步执行完毕以后，才会执行 setState 中的异步回调函数。

3，具体代码示例如下：

```js
import React, { Component } from 'react';

export default class SetState extends Component {
   state = {
      count:0
   }

   // 在此执行setState为异步，会将异步操作合并一起，只更新一次状态
   componentDidMount() {
      this.setState({
         count:this.state.count+1
      },() => {
         console.log(this.state.count) // 1
      })
      console.log(this.state.count,'1515151515')  // 0
      this.setState({
         count:this.state.count+1
      }, () => {
         console.log(this.state.count) // 1
      })
      console.log(this.state.count,'1919191919')  // 0
      this.setState({
         count:this.state.count+1
      }, () => {
         console.log(this.state.count,"25252525") // 1
      })
      console.log(this.state.count, '2727272727')  // 0
      <!--三次更新合并成了一次更新，此时count为1-->

      // 在此执行setState为同步
      setTimeout(() => {
         this.setState({
            count:this.state.count+1
         })
         console.log(this.state.count) // 2
         this.setState({
            count:this.state.count+1
         }, () => {
            console.log(this.state.count, "37373737") // 3
         })
         console.log(this.state.count, "39393939") // 3
      }, 0);
   } // count最终为3

   render() {
      return (
         <div>
            <!--最终输出结果为3-->
            <h1>{this.state.count}</h1>
         </div>
      )
   }
}
```

4，使用 prevState (上一次 state 的状态)可实时在 setState() 方法中更新 state 的状态，不管 setState 是同步或是异步都可以。

```js
import React, { Component } from "react";

export default class SetState extends Component {
  state = {
    count: 0,
  };

  // 使用prevState实时更新状态
  componentDidMount() {
    this.setState(
      (prevState, props) => ({
        count: prevState.count + 1,
      }),
      () => {
        console.log(this.state.count); // 1
      }
    );
    this.setState(
      (prevState, props) => ({
        count: prevState.count + 1,
      }),
      () => {
        console.log(this.state.count); // 2
      }
    );
    this.setState(
      (prevState, props) => ({
        count: prevState.count + 1,
      }),
      () => {
        console.log(this.state.count); // 3
      }
    );

    setTimeout(() => {
      this.setState(
        (prevState, props) => ({
          count: prevState.count + 1,
        }),
        () => {
          console.log(this.state.count); // 4
        }
      );
      this.setState(
        (prevState, props) => ({
          count: prevState.count + 1,
        }),
        () => {
          console.log(this.state.count); // 5
        }
      );
    });

    /*
        输出为0是因为setTimeout是异步的，
        而componentDidMount中setState也是异步的。
        所以最先输出0
      */
    console.log(this.state.count); // 0
  } // 最终输出结果为5

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
      </div>
    );
  }
}
```

5，类组件中更新状态注意点：

- 如果需要在类组件中更新状态，必须调用 setState 方法。

6，setState()方法参数说明：

- setState()方法可以有两个参数：第一个参数又有两种情况：可以是一个`对象`，也可以是一个`回调函数`。第二个参数为一个回调函数。**如果需要得到最新更改的状态，需要在此回调函数中获取**。

- **提示**：当 setState() 使用`回调函数`作为第一个参数时，可以使用 prevState 属性（上一次的状态）来实时的更新状态。

### state 与 props 的区别

#### state

1，state 属性为自身组件内部的属性。

2，该属性是保存组件内部状态的最重要的属性。当需要获取组件内部的属性时，需写成：this.state.innerState。

#### props

1，props 属性为组件外部的属性。

2，该属性在自身组件内部是没有的。当一个组件需要获取外部传入的属性的时候就需要使用 props 属性。并且在类组件中需要使用 this 这个属性。即当需要获取自身组件外部传入的属性时，需写成：this.props.exteriorState。

### React 受控组件与非受控组件

#### 受控组件

1，受控组件概述：组件自身状态受到 react 控制，需要触发 onChange 事件对自身状态进行更新。

2，受控组件使用环境：常用于收集表单数据，例如 `<input><select><textearea>` 等元素都要绑定一个 change 事件，当表单的状态发生变化，就会触发 onChange 事件，更新组件的 state。

<!-- - 表单元素具体属性及方法回调中的新值说明：

|            元素             |         属性         |   方法   |   方法回调中的新值   |
| :-------------------------: | :------------------: | :------: | :------------------: |
|   `<input type="text" />`   |    value="string"    | onChange |  event.target.value  |
| `<input type="checkbox" />` |  checked={boolean}   | onChange | event.target.checked |
|   `<input type="radio"/>`   |  checked={boolean}   | onChange | event.target.checked |
|       `<textarea />`        |    value="string"    | onChange |  event.target.value  |
|        `<select />`         | value="option value" | onChange |  event.target.value  | -->

3，具体代码说明：

```js
import React, { Component } from "react";
export default class Controlled extends Component {
  satte = {
    value: "",
  };
  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
```

#### 非受控组件

1，非受控组件概述：数据由 DOM 本身控制，即不受 react 控制，它使用一个 ref 来从 DOM 获得表单值。

2，非受控组件具体使用场景：需要操作 DOM 时使用，比如需要获取输入框焦点，或者失去焦点。

3，具体代码说明：

4，函数式组件中使用 ref：

> 函数式组件中使用 ref

```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    alert("value is: " + this.input.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => (this.input = input)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

> react 类 (class) 组件中 ref 容器

```js
import React, { Component } from "react";

export default class Uncontrolled extends Component {
  state = { context: "" };
  inpRef = React.createRef();
  handleClick = () => {
    this.setState(
      {
        context: this.inpRef.current.value,
      },
      () => {
        this.inpRef.current.focus();
        this.inpRef.current.value = "";
      }
    );
  };
  render() {
    return (
      <div>
        <input type="text" ref={this.inpRef} />
        <button onClick={this.handleClick}>submit</button>
        <h1>{this.state.context}</h1>
      </div>
    );
  }
}
```

### React 生命周期

#### 生命周期概述

1，React 生命周期（组件从创建到消失的整个过程）分为三个阶段，分别为：`mounting(实例化期)`、`updating(存在期)`、`unmounting(销毁期)`。

#### 生命周期图谱

![reactLife](reactLife.png)

![reactLife1](reactLife1.png)

![reactLife2](reactLife2.webp)

#### mounting 阶段（实例化时期）：

1，mounting 阶段概述：就是 component（组件）被 render（）方法解析成对应的 DOM 节点，并被插入到浏览器的 DOM 结构的一个过程（组件从无到有的过程）。

2，**注意**：`constructor()`只会在初始化时执行一次。以后都不再执行。所以需要改变状态不能写在 constructor()方法中。

> mounting 阶段生命周期函数解析：

1，UNSAFE_componentWillMount()：

- 该方法在首次渲染（调用 render 方法）之前用，在这一阶段组件还未始实例化，类似于 Vue 生命周期中的 created。

- 项目应用：用于做一些组件初始化需要调用的数据处理，也可以在这一阶段触发 loading 事件。

2，componentDidMount()：

- 该方法在首次渲染（调用 render 方法）之后调用，在这一阶段组件已经实例化完成，类似于 Vue 生命周期中的 mounted。

- componentDidMount() 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。

- 项目应用：dom 加载完成后，发起 axios 请求，拿回数据，结束 loading 事件。

3，static getDerivedStateFromProps()：

- static getDerivedStateFromProps(props, state)。

- getDerivedStateFromProps 在初始安装和后续更新上都在调用 render 方法之前立即调用。

- 该方法应该返回一个对象以更新状态，或者返回 null 则不更新任何内容。

- 即使自身 props 没有任何变化，而是父组件 state 发生了变化，导致子组件发生了 re-render，该生命周期函数依然会被调用。

- 该生命周期函数是为了替代`componentWillReceiveProps`存在的，所以在你需要使用 componentWillReceiveProps 的时候，就可以考虑使用`getDerivedStateFromProps`来进行替代了。

- 该方法参数与`componentWillReceiveProps`不同，getDerivedStateFromProps 是一个静态函数，也就是这个函数不能通过 this 访问到 class 的属性，也并不推荐直接访问属性。而是应该通过参数提供的**nextProps**以及**prevState**来进行判断，根据新传入的 props 来映射到 state。

- **注意**：如果 props 传入的内容不需要影响到你的 state ，那么就需要返回一个 null ，这个返回值是必须的，所以尽量将其写到函数的末尾。

```js
static getDerivedStateFromProps(nextProps, prevState) {
    const {type} = nextProps;
    // 当传入的type发生变化的时候，更新state
    if (type !== prevState.type) {
        return {
            type,
        };
    }
    // 否则，对于state不进行任何操作
    return null;
}
```

#### updating 阶段（存在期）

1，updating 阶段概述：一个 mounted 的 React Component 被重新 render 的过程（只有 state（内部状态），props（外部状态）确实改变了），react 才会改变对应的 DOM 结构。

> updating 阶段生命周期函数解析：

2，UNSAFE_componentWillReceiveProps()：

- UNSAFE_componentWillReceiveProps(nextProps)。

- 该方法用于：当一个 mounted 要接收新的 props 时才会被调用，函数参数就是将要接收的 props。（即用于接收外部状态（props）的方法）。

- 项目应用：子组件表格从父组件获取 props，并在每次 props 更新后随之更新表格的数据。

3，shouldComponentUpdate()：

- shouldComponentUpdate(nextProps, nextState)。

- 该组件在 render 方法之前调用。

- 该方法用于确定是否有必要更新 DOM 结构，参数是新的 nextProps 对象，和新的 nextState 对象，分别对比 this.props 和 this.state ，返回 true 为更新，返回 false 为不更新。

- 当`nextProps` === `this.props.xxx`时，说明前后状态相同，此时可以`return false`，告诉 render 不需要更新状态。否则返回 true，告诉 render 需要更新状态。

4，UNSAFE_componentWillUpdate()：

- UNSAFE_componentWillUpdate(nextProps, nextState)。

- 该方法用于：如果 shouldComponentUpdata 返回为 true 则调用，在组件更新（re-render）前调用，首次 render（初始化时）不调用。

5，getSnapshotBeforeUpdate()：

- getSnapshotBeforeUpdate(prevProps, prevState)。

- 该方法在 render 之前调用，此时 state 已更新，但页面上 state 还未更新。

- 该方法主要用于获取 render 之前的 DOM 状态（如 render 之前的某 DOM 元素的 scrollHeight（滚动条可滚动高度））。

- 该方法让组件可以在 DOM 可能发生更改之前捕获某些信息（例如，滚动位置）。此生命周期返回的任何值都将作为参数传递`componentDidUpdate()`。

```js
  // 获取当前rootNode的scrollHeight，传到componentDidUpdate的参数perScrollHeight
  getSnapshotBeforeUpdate() {
    return this.rootNode.scrollHeight;
  }
  componentDidUpdate(perProps, perState, perScrollHeight) {
    const curScrollTop = this.rootNode.scrollTop;

    if (curScrollTop < 5) return;
    // perScrollHeight：为更新前的可滚动距离
    // this.rootNode.scrollHeight：为更新后的可滚动距离
    this.rootNode.scrollTop = curScrollTop + (this.rootNode.scrollHeight  - perScrollHeight);
    /*使用当前滚动条的位置加上每次增加的可滚动距离。
    相当于使滚动条自动向下滑动一个div增加的可滚动距离，这样看起来内容就没有滚动。*/
  }
```

6，componentDidUpdate()：

- componentDidUpdate(prevProps, prevState, snapshot)。

- 该方法在 componentWillUpdate() 方法之后执行，组件重新 render 后立即调用，首次 render（初始化时）不调用。此时组件中与页面中的 state 都是最新的。

- 当组件已更新时，可借此机会在 DOM 上进行操作。只要将当前道具与以前的道具进行比较，这也是执行网络请求的好地方（例如，如果道具未更改，则可能不需要网络请求）。

```js
componentDidUpdate(prevProps) {
  // 对新的userID与上一次的userID进行比较
  if (this.props.userID !== prevProps.userID) {
    // 前后userID不一致，则发送异步请求
    this.fetchData(this.props.userID);
  }
}
```

#### unmounted 阶段（销毁期）：

1，unmounted 阶段概述：一个 mounted 的 React Component 对应的 DOM 节点被从 DOM 节点移除的过程。

> unmounted 阶段生命周期函数解析：

1，componentWillUnmount()：

- 该方法用于：当需要销毁挂载的副作用组件时，在此方法中销毁。该方法会在组件卸载即销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除定时器，取消网络请求或清除在 componentDidMount() 方法中创建的订阅等。

- componentWillUnmount() 方法中不应调用 setState() 方法，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。

### 组件的组合

#### 功能界面的组件化编流程

1，拆分组件：拆分界面，抽取组件。

2，实现静态组件：使用组件实现静态页面效果。

3，实现动态组件：

- 动态显示初始化数据。

- 交互功能（从绑定监听开始）。

#### 状态数据的保存

1，看状态数据是某个组件需要（即给某个），还是某些组件需要（给共同的父组件）。

#### 处理在子组件中改变父组件状态的情况

1，子组件中不能直接改变父组件的状态。即：状态在哪个组件，更新状态的行为就应该定义在哪个组件。

2，父组件定义函数，通过在 return 的 `<div><子组件 XXX ={this.XXX }/></div>`
标签当中传递给子组件，再由子组件通过：`this.props.XXX`调用。

### 组件间通信的方式

#### 使用 props 传递

1，共同的数据放在父组件中，特有的数据放在自己的组件内部（state）。

2，通过 props 可以传递一般数据和函数数据，但只能逐层传递。

- 一般数据 => 父组件传递数据给子组件 => 子组件读取数据。

- 函数数据 => 子组件传递数据给父组件 => 子组件调用函数。

#### 使用 PubSub 发布订阅机制

1，参考官网：[PubSubJS](https://www.npmjs.com/package/pubsub-js)

2，下载：npm install pubsub-js --save

3，使用步骤：

- 引入：import Pubsub from 'pubsub-js'。

- 订阅消息：PubSub.subscribe('delete(主题名)', function(msg, data){...})

  - 一般定义在父组件中订阅消息。

- 发布消息：PubSub.publish('delete(主题名)', 'data(需要发布的数据)')

  - 一般定义在子组件中发布消息。

- PubSub.subscribe() 参数说明：

  - 第一个为事件主题名称，该名称必须与 PubSub.publish() 中发布的事件主题名称保持一致。

  - 第二个为回调函数，该回调函数也接受两个参数：

    - 第一个为发布的事件主题名称。

    - 第二个为发布的对象数据。

- PubSub.publish() 参数说明：

  - 第一个为事件主题名称，该名称需要与 PubSub.subscribe() 中订阅的事件主题名称保持一致。

  - 第二个为需要发布的状态数据。

4，如何取消订阅：

- PubSub.unsubscribe(msgId)：用于取消指定事件主题名称的订阅。

- PubSub.unsubscribe(this.pubSub_token)：用于取消指定功能的所有订阅。

- PubSub.clearAllSubscriptions()：用于取消全部订阅。

5，具体使用案例：

- 子组件发布消息：

```jsx
import React, { Component } from "react";
import PubSub from "pubsub-js";

export const msgId = "pubsubName";
export const msgId1 = "pubsubAge";
// 在有数据的地方进行发布
export default class Child extends Component {
  state = { name: "snsn", age: 25 };
  pubSubhandleClick = () => {
    PubSub.publish(msgId, this.state.name);
    PubSub.publish(msgId1, this.state.age);
  };
  render() {
    return (
      <button onClick={this.pubSubhandleClick}>Child PubSub.publish</button>
    );
  }
}
```

- 父组件订阅消息：

```jsx
import React, { Component } from "react";
import PubSub from "pubsub-js";
import Child from "./Child";
import { msgId } from "./Child";
import { msgId1 } from "./Child";
// 订阅
export default class Parent extends Component {
  // 组件将要被渲染的时候进行订阅
  componentDidMount() {
    // msgId：发布与订阅的事件名称
    // 订阅的事件名称必须与发布的事件名称保持一致
    this.token = PubSub.subscribe(msgId, (msg, data) => {
      console.log(msgId); // pubsubId
      console.log(msg, data); // pubsubId snsn
    });
    this.token1 = PubSub.subscribe(msgId1, (msg, data) => {
      console.log(msgId1); // pubsubId
      console.log(msg, data); // pubsubId snsn
    });
  }
  componentWillUnmount() {
    // 取消事件主题为msgId的订阅
    PubSub.unsubscribe(msgId);
    // 取消指定功能的所有订阅
    PubSub.unsubscribe(this.token);
    // 取消全部订阅
    PubSub.clearAllSubscriptions();
  }

  render() {
    return (
      <div className="Parent">
        <Child />
      </div>
    );
  }
}
```

#### 使用 React.createContext

1，语法：

- const { Provider, Consumer } = React.createContext()

2，Provider 解析：

- React 组件允许 Consumers 订阅 context 的改变。

- 接收一个 value 属性传递给 Provider 的后代 Consumers 。一个 Provider 可以联系到多个 Consumers 。Providers 可以被嵌套以覆盖组件树内更深层次的值。

3，Consumer 解析：

- 一个可以订阅 context 变化的 React 组件。当 context 值发生改变时，Consumer 值也会改变。

- 接收一个函数作为子节点。该函数接收当前 context 的值并返回一个 React 节点。传递给函数的 value ，将等于组件树中上层 context 的最近的 Provider 的 value 属性。如果 context 没有 Provider ，那么 value 参数将等于被传递给 createContext (initValie)的 initValie (默认值)。

4，使用注意点：

- **每当 Provider 的值发生改变时, 作为 Provider 后代的所有 Consumers 都会重新渲染**。 从 Provider 到其后代的 Consumers 传播不受 shouldComponentUpdate 方法的约束，因此即使祖先组件退出更新时，后代 Consumer 也会被更新。

5，具体使用示例：

- index 代码

```jsx
import React, { Component } from "react";
import Parent from "./Parent";
import Child from "./Child";
import Grandchild from "./Grandchild";
export default class index extends Component {
  render() {
    return (
      <div>
        <Parent>
          <Child>
            <Grandchild />
          </Child>
        </Parent>
      </div>
    );
  }
}
```

- Parent 代码

```jsx
import React, { Component } from "react";

export const { Provider, Consumer } = React.createContext();
export default class Parent extends Component {
  state = {
    childName: "nnn",
    childAge: 25,
    grandchildName: "mmm",
    grandchildAge: 3,
  };

  changeChildAge = () => {
    this.setState({
      childAge: this.state.childAge + 1,
    });
  };
  changeGrandchildAge = () => {
    this.setState({
      grandchildAge: this.state.grandchildAge + 1,
    });
  };

  render() {
    const { childName, childAge, grandchildName, grandchildAge } = this.state;
    const data = { childName, childAge, grandchildName, grandchildAge };
    return (
      <div>
        <Provider value={data}>
          {this.props.children}
          {console.log(this.props.children)}
        </Provider>
        <button onClick={this.changeChildAge}>ChildAge</button>
        <button onClick={this.changeGrandchildAge}>GrandchildAge</button>
      </div>
    );
  }
}
```

- Child 代码

```jsx
import React, { Component } from "react";
import { Consumer } from "./Parent";
import Grandchild from "./Grandchild";
export default class Child extends Component {
  render() {
    return (
      <div>
        <h1>Child</h1>
        <Consumer>
          {(value) => {
            return (
              <div>
                <p>Child姓名:{value.childName}</p>
                <p>Child年龄:{value.childAge}</p>
              </div>
            );
          }}
        </Consumer>
        <Grandchild />
      </div>
    );
  }
}
```

- Grandchild 代码

```jsx
import React, { Component } from "react";
import { Consumer } from "./Parent";

export default class Grandchild extends Component {
  render() {
    return (
      <div>
        <h2>Grandchild</h2>
        <Consumer>
          {(value) => {
            return (
              <div>
                <p>Grandchild姓名:{value.grandchildName}</p>
                <p>Grandchild年龄:{value.grandchildAge}</p>
              </div>
            );
          }}
        </Consumer>
      </div>
    );
  }
}
```

#### 使用 React.createContext 与 contextType 结合

1，contextType 概述：

- contextType 可以简化 context 的使用，不使用 consumer 也可以共享变量。

2，语法：static contextType = themeContext（创建好的 createContext()）。

3，**说明**：使用 contextType 后，在 render 函数中可以直接访问 this.context 获取共享变量，这样就可以不使用 consumer。

- const theme = this.context。

4，contextType 注意点：

- contextType 只能在类组件中使用。

- 一个组件如果有多个 consumer，contextType 只对其中一个有效，因此在一个组件中 contextType 只能有存在一个。

5，基本使用案例：

```jsx
import React, { Component, createContext } from "react";

const colorContext = createContext();

export default class ContextType extends Component {
  state = {
    color: "pink",
  };
  render() {
    const { color } = this.state;
    return (
      <div>
        <colorContext.Provider value={color}>
          <Middle />
        </colorContext.Provider>
      </div>
    );
  }
}

class Middle extends Component {
  render() {
    return (
      <div>
        <Bottom />
      </div>
    );
  }
}

class Bottom extends Component {
  static contextType = colorContext;
  render() {
    const color = this.context;
    return (
      <div>
        <h1>snsn:{color}</h1>
      </div>
    );
  }
}
```

### Refs

#### 使用 Refs 的场景

1，管理焦点，文本选择或媒体播放。

2，触发强制动画。

3，集成第三方 DOM 库。

#### 如何创建 Refs

1，使用 **React.createRef()** 创建。

#### 如何访问 refs

1，使用 const node = this.myRef.current 访问引用的节点。

- this.textInput.current.focus() 可使元素自动获取焦点。

#### refs 说明

1，不能在函数式组件上使用 React.createRef() 方法，因为函数式组件没有实例。

2，虽然不能在函数式组件中使用，但是可以**在函数式组件内部使用 ref 来引用一个 DOM 元素或者类 (class) 组件**，具体如下：

```jsx
function CustomTextInput(props) {
  // textInput在这里声明了，所以 ref 回调可以引用它
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={(input) => {
          textInput = input;
        }}
      />

      {/* 可以不在上面声明，使用以下简写方式 */}
      {/* ref = {input => this.textInput = input} */}

      <input type="button" value="Focus the text input" onClick={handleClick} />
    </div>
  );
}
```

#### 转发 refs

1，转发 refs 概述：

- 转发 refs 可让某些组件使用收到的 ref，并将其向下传递给子组件。

2，如何获取传递过来的 ref：

- 使用 **React.forwardRef()** 可以获取传递过来的 ref。

```jsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

- **注意**：第二个 ref 参数仅在使用 React.forwardRef() 调用定义组件时才存在。常规函数或类组件不接收 ref 参数，而且 props 也不提供 ref 。

3，转发 refs 的使用场景：

- 这种特性适用于高可复用“叶”组件，这些组件倾向于在整个应用中以一种类似常规 DOM button 和 input 的方式被使用，利用 ref 转发特性可以方便的访问其 DOM 节点，用来实现：

  - **管理焦点（focus）**。

  - **选择（selection）**。

  - **动画（animations）** 等。

4，转发 Refs 到 DOM：

- 转发 refs 到 DOM 组件以自动获取焦点：

```jsx
import React, { Component } from "react";

// 可复用性强的“叶”组件FancyInput
const FancyInput = React.forwardRef((props, ref) => {
  function butClick() {
    // 利用传送过来的ref进行自动获取焦点的操作
    ref.current.focus();
    ref.current.value = "";
  }
  return (
    <div>
      <p>RefsName:{props.name}</p>
      <input type="text" ref={ref} className="FancyInput" />
      <button onClick={butClick}>submit</button>
    </div>
  );
});

export default class Refs extends Component {
  state = {
    name: "nnn",
    msg: "",
  };
  inpRef = React.createRef();

  RefsClickhandler = () => {
    if (this.inpRef.current.value.trim()) {
      this.setState(
        {
          msg: this.inpRef.current.value,
        },
        () => {
          this.inpRef.current.focus();
          this.inpRef.current.value = "";
        }
      );
    }
    return;
  };

  render() {
    return (
      <div>
        <FancyInput ref={this.inpRef} name={this.state.name} />
        <h3>RefsComponent</h3>
        <p>msg:{this.state.msg}</p>
        <button onClick={this.RefsClickhandler}>RefsClickhandler</button>
      </div>
    );
  }
}
```

5，在高阶组件中转发 Refs

- 高阶组件内容：

```jsx
import React, { Component } from "react";

export const Input = (InputComponent) => {
  const NewInpComponent = React.forwardRef((props, ref) => {
    const onChange = () => {
      props.setMsg(ref.current.value);
    };
    return <InputComponent forwardedRef={ref} onChange={onChange} {...props} />;
  });

  return class InpCom extends Component {
    state = {
      name: "未提交...",
      msg: "等待输入...",
    };
    inputRef = React.createRef();
    setName = (name) => {
      this.setState({
        name,
      });
    };
    setMsg = (msg) => {
      this.setState({
        msg,
      });
    };
    render() {
      const { name, msg } = this.state;
      const data = { name, msg };
      return (
        <NewInpComponent
          ref={this.inputRef}
          data={data}
          setName={this.setName}
          setMsg={this.setMsg}
        />
      );
    }
  };
};
```

- 被包装组件内容：

```jsx
import React from "react";
import { Input } from "./HOCRef";

const TextInput = ({ forwardedRef, setName, setMsg, ...rest }) => {
  function handlerClick() {
    setName(forwardedRef.current.value);
    forwardedRef.current.focus();
    forwardedRef.current.value = "";
  }

  return (
    <div>
      <h2>InpComponent</h2>
      <p>name:{rest.data.name}</p>
      <p>msg:{rest.data.msg}</p>
      <input ref={forwardedRef} {...rest} />
      <button onClick={handlerClick}>submit</button>
    </div>
  );
};
export default Input(TextInput);
```

### 高阶组件(HOC)

#### 高阶组件概述

1，高阶组件具体描述：

- 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。

- 一个高阶组件只是一个包装了另外一个 React 组件的 React 组件。

- 简而言之，高阶组件是参数为组件，返回值为新组件的函数。

- HOC 是纯函数，没有副作用。

- 组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件。

#### 高阶组件的作用

1，代码复用，逻辑抽象。

2，渲染劫持。

3，state 抽象和更改。

4，props 更改。

#### 高阶组件实现

1，属性代理：

- 属性代理理解：

  - HOC 对传给被包裹组件的 props 进行操作。

- 属性代理的作用：

  - 操作 props。

  - 通过 refs 访问到组件实例。

  - 提取 state。

  - 用其他元素包裹 WrappedComponent。

2，反向继承：

- 反向继承理解：

  - 返回的组件没有继承 React.Component，而是**继承作为参数传入的被包装组件**。

  - 反向继承允许高阶组件通过 this 获取被包装组件，意味着可以获取到 state，props，组件生命周期，以及渲染方法。

  - reconciliation（协调过程）：React Element 在执行它的协调过程时描述什么将被渲染。

  - React Element 可以是 string 或者 function ，string 的 reactElement 代表原生 DOM 节点，function 代表通过 React.Component 创建的组件。

  - function 类型的 ReactElement 将在 reconciliation 阶段被解析成 DOM 类型的 ReactElement，这意味着反向继承的高阶组件不保证一定解析整个子元素树。

  - 反向继承可以渲染劫持，操作 state。

- 渲染劫持说明：

  - 渲染指 wrappedComponent 的 render 方法。被叫做渲染劫持是因为高阶组件控制了 WrappedComponent 生成的渲染结果，并且可以做各种操作（增删改将被渲染的 Reactelement 的 props)。

- 反向继承基本案例：

> HOC 内容：

```jsx
import React from "react";
export default function iiHoc(WrappedComponent) {
  return class Enhance extends WrappedComponent {
    render() {
      //super指向WrappedComponent
      const elementsTree = super.render();
      console.log(elementsTree.props);
      //增加WrappedComponent的props
      let addProp = { style: { color: "green" } };
      //修改WrappedComponent的props
      let newProp = { value: "反向继承修改继承的state" };
      const props = Object.assign({}, elementsTree.props, newProp, addProp);
      const newElement = React.cloneElement(
        elementsTree,
        props,
        elementsTree.props.children
      );
      return newElement;
    }
  };
}
```

> wrappedComponent 内容：

```jsx
import React, { Component } from "react";
import iiHoc from "./inversionHOC";
class WrappedComponent extends Component {
  state = {
    msg: "反向继承",
  };
  handlerChange = (e) => {
    console.log(e.target.value);
  };
  render() {
    return (
      <input type="text" value={this.state.msg} onChange={this.handlerChange} />
    );
  }
}
export default iiHoc(WrappedComponent);
```

3，HOC 缺陷:

- 扩展性限制：HOC 无法从外部访问子组件的 state，因此无法通过 shouldComponentUpdate 过滤掉不必要的更新，不过 react 之后提供了 PureComponent 来解决。

- ref 传值问题：ref 被隔断。但可使用 react.forwardRef() 解决。

- wrapper hell：HOC 可能出现多层包裹组件的情况，多层抽象增加复杂度和理解成本。

- 命名冲突：若 HOC 多次嵌套，没有使用命名空间会产生冲突，覆盖老属性。

- 不可见性：HOC 相当于在原始组件外层包裹一个组件，你不知道里面是啥对于你是黑盒。

4，HOC 基本使用案例：

- 逻辑复用的 HOC：

```jsx
// HOC
import React, { Component } from "react";

export default function stateHOC(WrappedComponent, method) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: "",
      };
      this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
      this.setState({
        value: e.target.value,
      });
    }
    render() {
      const newProp = {
        value: this.state.value,
        onChange: this.handleChange,
      };
      return <WrappedComponent {...this.props} {...newProp} />;
    }
  };
}

// MyInput
import React, { Component } from "react";
import StateHOC from "./StateHOC";

class MyInput extends Component {
  render() {
    return (
      <div>
        <h2>MyInput</h2>
        <p>value:{this.props.value}</p>
        <input value={this.props.value} onChange={this.props.onChange} />
      </div>
    );
  }
}

export default StateHOC(MyInput);

// MyTextarea
import React, { Component } from "react";
import StateHOC from "./StateHOC";

class MyTextarea extends Component {
  render() {
    return (
      <div>
        <h2>MyTextarea</h2>
        <p>value:{this.props.value}</p>
        <textarea value={this.props.value} onChange={this.props.onChange} />
      </div>
    );
  }
}

export const TextComponent = StateHOC(MyTextarea);

// index
import React, { Component } from "react";
import { TextComponent } from "./MyTextarea";
import InputComponent from "./MyInput";

export default class App extends Component {
  render() {
    return (
      <div>
        <TextComponent />
        <InputComponent />
      </div>
    );
  }
}
```

- 通过 refs 访问到组件实例：

```jsx
// HOC
import React, { Component } from "react";

export default function refsHoc(WrappedComponent) {
  return class PP extends Component {
    state = {
      msg: "你好啊",
      name: "snsn",
    };

    refFun(instance) {
      instance.say();
    }

    render() {
      return <WrappedComponent {...this.state} ref={this.refFun} />;
    }
  };
}

// MyComponent
import React, { Component } from "react";
import RefHOC from "./RefHOC";

class MyComponent extends Component {
  state = {
    data: "",
  };
  say() {
    this.setState({
      data: this.props.msg + this.props.name,
    });
  }
  render() {
    return (
      <div>
        <h1>msg:{this.props.msg}</h1>
        <h1>name:{this.props.name}</h1>
        <h2>data:{this.state.data}</h2>
      </div>
    );
  }
}

export default RefHOC(MyComponent);
```

- 为 WrappedComponent 包装颜色样式

```jsx
// HOC
import React, { Component } from "react";

//被包装组件本身没有样式红色，可以包装一个
export default function withColorRed(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <div style={{ color: "red" }}>
          <WrappedComponent />
        </div>
      );
    }
  };
}

// WrappedComponent MyCon
import React, { Component } from "react";
import WithColorRed from "./WithColorRed";

class MyCon extends Component {
  render() {
    return <h1>hello</h1>;
  }
}

export default WithColorRed(MyCon);
```

### [React Router](http://react-guide.github.io/react-router-cn/) 概述

#### 相关理解

1，react-router 是 react 的一个插件库。

2，它可以让你向应用中快速地添加视图和数据流，同时保持页面与 URL 间的同步。

3，专门用来实现一个 SPA 应用。

4，基于 react 的项目基本都会用到此库。

#### SPA 简介

1，SPA 是单页 web 应用（single page web application SPA）。

2，整个应用只有一个完整的页面。

3，点击页面中的链接不会刷新页面，本身也不会向服务器发请求。

4，点击（路由）链接时，只会做页面的局部更新。

5，数据都需要通过 ajax 请求获取，并在前端异步展现。

#### 路由的理解

1，什么是路由？

- 一个路由就是一个映射关系（key => value）。

  - key：路由路径，value：前端路由 value 是 component(组件)，后端路由 value 是 callback。

2，路由的分类：

- 前端路由：

  - 浏览器端路由，value 是 component，当请求的是路由 path 时，浏览器端没有发送 http 请求，但是界面会更新显示对应的组件。

  - 注册路由：<Router path ='/about' component={About} />。

  - 当浏览器的 hash 变为 #about 时，当前路由组件就会变为 About 组件。

- 后端路由：

  - node 服务器路由，value 是 function ，用来处理客户端提交的请求并返回响应数据。

  - 注册路由：router.get( "/path", function(req，res){ ...... })。

  - 注意：req 为请求，res 是返回的响应，即 key 为 path，value 为 callback（回调函数）。

  - 当 node 接收到请求时，根据请求路径找到匹配的路由，调用路由中函数来处理请求，返回响应数据。

### React Router 常用组件

#### React Router 的三大组件

1，Router：是所有路由组件共用的底层接口组件，它是路由规则制定的最外层的容器。

2，Route：路由规则匹配，并显示当前的规则对应的组件。

3，Link：路由跳转的组件。

### React Router 各组件解析

#### Router

1，Router 是 React Router 的重要组件。它能保持 UI 和 URL 的同步。

2，是所有路由组件共用的底层接口组件，也是路由规则制定的最外层的容器。

3，Router 组件对不同的功能和平台对应可使用如下类型的组件：

- BrowserRouter：浏览器的路由组建。

  - BrowserRouter 使用 HTML5 提供的 history API(pushState, replaceState 和 popstate 事件) 来保持 UI 和 URL 的同步。

  ```jsx
  import { BrowserRouter } from "react-router-dom";
  <BrowserRouter
    basename={string}
    forceRefresh={bool}
    getUserConfirmation={func}
    keyLength={number}
  >
    <App />
  </BrowserRouter>;
  ```

- BrowserRouter 属性**basename**解析：

  - 其类型为 string。

  - 是所有位置的基准 URL。如果应用程序部署在服务器的子目录，
    则需将其设置为某某子目录。

  - basename 的正确格式是前面有一个前导斜杠，但不能有尾部斜杠。

  ```jsx
  <BrowserRouter basename="/calendar">
    <Link to="/today" />
  </BrowserRouter>
  ```

  - 输出 link 最终被呈现为：`<a href="/calendar/today" />`。

- HashRouter：URL 格式为 Hash 的路由组件。

  - HashRouter 使用 URL 的 hash 部分（即 window.location.hash）来保持 UI 和 URL 的同步。

  - hashType：类型为 string，主要有以下几种 hash 类型：

    - `slash`：后面跟一个斜杠，例如 #/ 和 #/sunshine/lollipops。

    - `noslash`：后面没有斜杠，例如 # 和 #sunshine/lollipops。

    - `hashbang`：Google 风格的 ajax crawlable，例如 #!/ 和 #!/sunshine/lollipops

  ```jsx
  import { HashRouter } from "react-router-dom";

  <HashRouter>
    <App />
  </HashRouter>;
  ```

- **注意**：使用 hash 记录导航历史不支持 location.key 和 location.state。

- HashRouter 属性**basename**解析：

  - basename 类型为 string。

  - 其作用与 BrowserRouter 中的 basename 一致。

- NattiveRouter：Native 的路由组件。

- MemoryRouter：内存路由组件。

- StaticRouter：地址不改变的静态路由组件。

4，Router 属性介绍：

- `children` (required)：一个或多个的 Route 或 PlainRoute。当 history 改变时，<Router> 会匹配出 Route 的一个分支，并且渲染这个分支中配置的组件，渲染时保持父 route 组件嵌套子 route 组件。

- `routes`：children 的别名。

- `history`：Router 监听的 history 对象，由 history 包提供。

#### Link

1，Link 组件就像是一个个路牌，为我们指明组件的位置，link 使用声明式的方式为应用程序提供导航功能。

2，定义的 Link 标签最终会被渲染成一个 a 标签，Link 使用**to**这个属性来指明目标组件的路径，可以直接使用一个字符串，也可以传入一个对象。

- to：string

  - 一个字符串形式的链接地址，通过 pathname、search 和 hash 属性创建。

  - <Link to='/About?news=snsn' />

- to：Object

  - 一个对象形式的链接地址，可以具有以下任何属性：

    - pathname：要链接到的路径。

    - search：查询参数。

    - hash：URL 中的 hash，例如 #hash。

    - state：存储到 location 中的额外状态数据

  ```jsx
  import { Link } from 'react-router-dom'
  // 字符串参数
  <Link to="/query">查询</Link>
  // 对象参数
  <Link to={{
    pathname: '/query',
    search: '?key=name',
    hash: '#hash',
    state: { fromDashboard: true }
  }}>查询</Link>
  ```

3，Link 组件属性介绍：

- `to`：需要跳转到的路径(pathname)或地址（location）。

  <font size=4>

  ```jsx
  <Link to="/home/news"> news </Link>
  ```

- `replace`：bool（布尔值）：为 true 时，点击链接后将使用新地址替换掉访问历史记录。
  为 false 时，点击链接后将在原有的访问历史记录的基础上添加一个新的记录。replace 默认为 false。

  ```jsx
  <Link to="/courses" replace />
  ```

- `query`：已经转化成字符串的键值对的对象。

- `hash`：URL 的 hash 值，如：#a-hash。

- `innerRef`：func，允许访问组件的底层引用。

  ```jsx
  const refCallback = (node) => {
    // node 指向最终挂载的 DOM 元素，在卸载时为 null
  };
  <Link to="/" innerRef={refCallback} />;
  ```

- `others`：你还可以传递一些其它属性，例如 title、id 或 className 等。

  ```jsx
  <Link to="/" className="nav" title="a title">
    About
  </Link>
  ```

#### NavLink

1，NavLink 概述：

- NavLink 是一个特殊版本的 Link。

- NavLink 可以使用 activeClassName 来设置 link 被选中时的被附 class，使用 activeStyle 来设置被选中时的应用样式。

- NavLink 中有一个 exact 属性，此属性要求只有地址栏中的 URL 和这个 link 的 to 指定的 location 相匹配时才会附加 class 和 style。

```jsx
// 该路径被选中后会添加selected类属性值
<NavLink to={'/'} exact activeClassName='selected'>Home</NavLink>
// 该路径被选中后会附加样式 color:red
<NavLink to={'/about'} activeStyle={{color:red}}>About</NavLink>
```

3，NavLink 属性介绍：

- `to`：可以是字符串或者对象，同 Link 组件。

- `exact`：bool 类型。

  - 完全匹配时才会被附件 class 和 style。

  ```jsx
  <NavLink exact to="/profile">
    Profile
  </NavLink>
  ```

- `activeStyle`：Object 类型。

  - 当元素处于激活状态时应用的样式。

  ```jsx
  const activeStyle = {
    fontWeight: "bold",
    color: "pink",
  };

  <NavLink to="/faq" activeStyle={activeStyle}>
    isActiveStyle
  </NavLink>;
  ```

- `activeClassName`：string 类型。

  - 当元素处于激活状态时应用的类，默认为 active。它将与 className 属性一起使用。

  ```jsx
  <NavLink to="/faq" activeClassName="selected">
    isSelected
  </NavLink>
  ```

- strict: bool 类型。

  - 如果为 true，则具有尾部斜杠的 path 仅与具有尾部斜杠的 location.pathname 匹配。当 location.pathname 中有附加的 URL 片段时，strict 就没有效果了。

  ```jsx
  <NavLink strict to="/events/">
    Events
  </NavLink>
  ```

- `isActive`: func 类型。

  - 添加额外逻辑以确定链接是否处于激活状态的函数。如果你需要验证链接的路径名与当前 URL 的路径名是否相匹配，那么应该使用它。

  ```jsx
  // 只有当事件 id 为奇数时才考虑激活
  const oddEvent = (match, location) => {
    if (!match) {
      return false;
    }
    const eventID = parseInt(match.params.eventID);
    return !isNaN(eventID) && eventID % 2 === 1;
  };

  <NavLink to="/events/123" isActive={oddEvent}>
    Event 123
  </NavLink>;
  ```

- `location`: object 类型。

  - isActive 默认比较当前历史位置（通常是当前的浏览器 URL）。你也可以传递一个不同的位置进行比较。

#### Route

1，Route 组件概述：

- 当 location 与 Route 的 path 匹配时渲染 Route 中的 Component。

- 如果有多个 Route 匹配，那么这些 Route 的 Component 都会被渲染。

- 与 Link 类似，Route 也有一个`exact`属性，作用也是要求 location 与 Route 的 path 绝对匹配。

```jsx
// 当location形如 http://location/时，Home就会被渲染。
// 因为 "/" 会匹配所有的URL，所以这里设置一个exact来强制绝对匹配。
<Route exact path="/" component={Home}/>
<Route path="/about" component={About}/>
```

2，Route 参数介绍：

- `path`: string。

  - 可以是 [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) 能够理解的任何有效的 URL 路径。

  ```jsx
  // path="/users/:id"设置动态路由
  <Route path="/users/:id" component={User} />
  ```

- `strict`: bool。

  - 表示严格匹配。如果为 true，则具有尾部斜杠的 path 仅与具有尾部斜杠的 location.pathname 匹配。当 location.pathname 中有附加的 URL 片段时，strict 就没有效果了。

  ```jsx
  <Route strict path="/one/" component={OneComponent} />
  ```

3，路由三大属性介绍：

- **match**：

  - 获取 match 对象的方式：

    - 在 Route component 中，以 this.props.match 方式获取。

    - 在 Route render 中，以 ({ match }) => () 方式获取。

    - 在 Route children 中，以 ({ match }) => () 方式获取。

  - 常用属性说明：

    - `this.props.match.params.xxx` 获取路由路径参数。

- **location**：

  - 获取 location 对象的方式：

    - 在 Route component 中，以 this.props.location 的方式获取。

    - 在 Route render 中，以 ({ location }) => () 的方式获取。

    - 在 Route children 中，以 ({ location }) => () 的方式获取。

    - 在 withRouter 中，以 this.props.location 的方式获取。

  - 常用属性说明：

    - `this.props.location.pathname` 获取 URL 路径。

- **history**：

  - 常用属性说明：

    - `this.history.push('/xxx')` 跳转路由到指定的路径。会保留前一个路由路径。

    - `this.history.replace('./xxx')` 跳转路由到指定路径，但会替换前一个历史路径。

4，Route 的三种渲染方式：

- Route component：

  - 指定只有当位置匹配时才会渲染的 React 组件，该组件会接收 route props 作为属性。

  ```jsx
  const User = ({ match }) => {
    return <h1>Hello {match.params.username}!</h1>;
  };

  <Route path="/user/:username" component={User} />;
  ```

  - **解析**：当你使用 component 时，Router 将根据指定的组件，使用 React.createElement 创建一个新的 React 元素。这意味着，如果你向 component 提供一个内联函数，那么每次渲染都会创建一个新组件。这将导致现有组件的卸载和新组件的安装，而不是仅仅更新现有组件。当使用内联函数进行内联渲染时，请使用 render 或 children 。

- Route render：

  - render：是 func 类型。Route 会渲染这个 function 的返回值，其作用是可以附加一些额外的逻辑。

  - 使用 render 可以方便地进行内联渲染和包装，而无需进行上文解释的不必要的组件重装。

  - 可以传入一个函数，以在位置匹配时调用，而不是使用 component 创建一个新的 React 元素。render 渲染方式接收所有与 component 方式相同的 route props。

  ```jsx
  // 方便的内联渲染
  <Route path="/home" render={() => <div>Home</div>} />

  // 包装
  const FadingRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      <FadeIn>
        <Component {...props} />
      </FadeIn>
    )} />
  )

  <FadingRoute path="/cool" component={Something} />
  ```

- **注意**：<Route component> 和 <Route render> 优先于 <Route children>，因此不要在同一个 <Route> 中同时使用 <Route component> 与 <Route render> 。
- Route render 基本使用案例：

  - index 内容：

  ```jsx
  import React, { Component } from "react";
  import {
    BrowserRouter,
    Route,
    NavLink,
    Link,
    Switch,
    Redirect,
  } from "react-router-dom";
  import Home from "./Home";
  import About from "./About";
  export default class index extends Component {
    state = {
      name: "snsn",
      age: 10,
    };
    render() {
      const { name, age } = this.state;
      const data = { name, age };
      return (
        <BrowserRouter>
          <div>
            <Link to="/home">Home</Link>&nbsp;
            <NavLink to="/about" activeStyle={{ color: "pink" }}>
              About
            </NavLink>
          </div>
          <Switch>
            <Route path="/home" component={Home}></Route>
            {/* 使用render渲染方式需要将路由三大属性传递给需要渲染的组件 */}
            <Route
              path="/about"
              render={(props) => {
                // console.log(props) // location history match
                // context将location history match这三个路由属性传给About组件
                return <About data={data} context={props} />;
              }}
            ></Route>
            <Redirect to="/about" />
          </Switch>
        </BrowserRouter>
      );
    }
  }
  ```

  - About 内容：

  ```jsx
  import React, { Component } from "react";

  export default class About extends Component {
    render() {
      console.log(this.props);
      return (
        <div>
          <h1>About</h1>
          {/* name:snsn */}
          <p>name:{this.props.data.name}</p>
          {/* age:10 */}
          <p>age:{this.props.data.age}</p>
          {/* pathname:/about */}
          <p>pathname:{this.props.context.location.pathname}</p>
        </div>
      );
    }
  }
  ```

  - Home 内容：

  ```jsx
  import React, { Component } from "react";
  import React, { Component } from "react";

  export default class Home extends Component {
    render() {
      return (
        <div>
          <h1>Home</h1>
          {/* pathname:/home */}
          <p>pathname:{this.props.location.pathname}</p>
        </div>
      );
    }
  }
  ```

- Route children：

  - children: 为 func 类型。

  - 有时候不论 path 是否匹配位置，你都想渲染一些内容。在这种情况下，你可以使用 children 属性。除了不论是否匹配它都会被调用以外，它的工作原理与 render 完全一样。

  - children 渲染方式接收所有与 component 和 render 方式相同的 route props，除非路由与 URL 不匹配，不匹配时 match 为 null。这允许你可以根据路由是否匹配动态地调整用户界面。如下所示，如果路由匹配，我们将添加一个激活类：

  ```jsx
  const ListItemLink = ({ to, ...rest }) => (
    <Route path={to} children={({ match }) => (
      <li className={match ? 'active' : ''}>
        <Link to={to} {...rest} />
      </li>
    )} />
  )

  <ul>
    <ListItemLink to="/somewhere" />
    <ListItemLink to="/somewhere-else" />
  </ul>
  ```

- **提示**：以上三种渲染方式都将提供相同的三个路由属性：

  - match。

  - location。

  - history。

#### Redirect

1，Redirect 概述：

- 当这个组件被渲染是，location 会被重写为 Redirect 的 to 指定的新 location。它的一个用途是**登录重定向**，比如在用户点了登录并验证通过之后，将页面跳转到个人主页。

```jsx
import { Route, Redirect } from "react-router-dom";

<Route
  exact
  path="/"
  render={() => (loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />)}
/>;
```

2，Redirect 属性介绍：

- `to`: string。

  ```jsx
  <Redirect to="/somewhere/else" />
  ```

- `to`: object。

  - 属性说明：

    - `pathname`：要链接到的路径。

    - `search`：查询参数。

    - `hash`：URL 中的 hash，例如 #the-hash。

    - `state`：存储到 location 中的额外状态数据。

  ```jsx
  <Redirect
    to={{
      pathname: "/login",
      search: "?name=snsn",
      state: {
        fromDashboard: true,
      },
    }}
  />
  ```

  - 上述代码中，state 对象可以在`重定向跳转到的组件中`通过 this.props.location.state 进行访问。而 fromDashboard 可通过路径名 /login 指向的登录组件中的 this.props.location.state.fromDashboard 进行访问。

- `push`：bool

  - 如果为 true，重定向会将新的位置推入历史记录，而不是替换当前条目。

  ```jsx
  <Redirect push to="/somewhere/else" />
  ```

- `from`: string

  - 要从中进行重定向的路径名。

  - 只能在 <Switch> 组件内使用 <Redirect from>，以匹配一个位置。

  ```jsx
  <Switch>
    <Redirect from="/old-path" to="/new-path" />
    <Route path="/new-path" component={Place} />
  </Switch>
  ```

  ```jsx
  // 根据匹配参数进行重定向
  <Switch>
    <Redirect from="/users/:id" to="/users/profile/:id" />
    <Route path="/users/profile/:id" component={Profile} />
  </Switch>
  ```

- `exact`: bool

  - 完全匹配，相当于 Route.exact。

- `strict`: bool

  - 严格匹配，相当于 Route.strict。

- `sensitive`: bool

  - 如果为 true，进行匹配时将区分大小写。

  ```jsx
  <Route sensitive path="/one" component={OneComponent} />
  ```

#### Switch

1，用于渲染与路径匹配的第一个子 <Route> 或 <Redirect>。

2，与<Route>不同，<Switch> 只会渲染一个路由。

3，如果现在处于 /about 路由界面，不希望匹配 /:user （或者显示 "404" 页面 ）。

```jsx
import { Switch, Route } from "react-router";

<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/:user" component={User} />
  <Route component={NoMatch} />
</Switch>;
```

#### Prompt

1，该组件用于在位置跳转之前给予用户一些确认信息。当你的应用程序进入一个应该阻止用户导航的状态时（比如表单只填写了一半），弹出一个提示。

2，Prompt 属性说明：

- `message`: string

  - 当用户试图离开某个位置时弹出的提示信息。

  ```jsx
  <Prompt message="你确定要离开当前页面吗？" />
  ```

- `message`: func

  - 将在用户试图导航到下一个位置时调用。需要返回一个字符串以向用户显示提示，或者返回 true 以允许直接跳转。

  ```jsx
  <Prompt
    message={(location) => {
      const isApp = location.pathname.startsWith("/app");
      return isApp ? `你确定要跳转到${location.pathname}吗？` : true;
    }}
  />
  ```

  - **说明**：上例中的 location 对象指的是下一个位置（即用户想要跳转到的位置）。你可以基于它包含的一些信息，判断是否阻止导航，或者允许直接跳转。

- `when`: bool

  - 在应用程序中，你可以始终渲染 <Prompt> 组件，并通过设置 when={true} 或 when={false} 以阻止或允许相应的导航，而不是根据某些条件来决定是否渲染 <Prompt> 组件。

  - **说明**：when 只有两种情况，当它的值为 true 时，会弹出提示信息。如果为 false 则不会弹出。

  ```jsx
  <Prompt when={true} message="你确定要离开当前页面吗？" />
  ```

- 基本使用如下：

```jsx
import { Prompt } from "react-router-dom";

<Prompt when={true - or - false} message="你确定要离开当前页面吗？" />;
```

### [React Hooks](https://react.docschina.org/docs/hooks-reference.html) 概述

#### React Hooks 的发行版本

1，Hook 是 React 16.8 的新增特性。

#### React Hooks 的作用

1，它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

- 即 Hook 可以在使用函数式组件时拥有状态（state）及生命周期，还有其他的 React 特性。

### 常用的 Hook

#### State Hook

1，State Hook API：useState()。

#### Effect Hook

1，Effect Hook API：useEffect()。

#### Ref Hook

1，Ref Hook API：useRef()。

### Hooks API 具体解析

#### State Hook

1，State Hook 让函数组件也拥有 state 状态，并进行状态数据的读写操作。

2，语法：

- const [xxx,setXxx] = useState(ininValue)。

3，useState 说明：

- 参数：第一次作为初始化状态值在内部缓存。

- 返回值：2 个元素的数组，第一个为内部当前状态值，第二个为设置保存新状态值的函数。

4，useState 返回值 setXxx 说明：

- setXxx(newValue):参数为非函数值，直接指定新的状态值，内部用其覆盖原来的状态值。

```jsx
<button onClick = {() => {
    setCount(count+1) // 参数为非函数类型
}} click me </button>
```

- setXxx(newValue):参数为函数，接收原本的旧状态值，返回新的状态值，内部用其覆盖原来的状态值。

```jsx
<button onClick = {() => {
    setCount(name => name + 'snsn') // 参数为函数类型
}} click me </button>
```

5，多次调用 useState 的理解：

- 内部按第一次执行的顺序依次保存状态数据及其对应的更新函数。

- 这个顺序/个数在后面更新时不能改变，否则会抛出异常。

6，**注意**：

- const [xxx,setXxx] = useState(ininValue) 不能写在**if 语句，for 循环语句**
  等判断及其他语句中，这会改变返回的数组的顺次，会报错，**必须写在外部函数的最顶层**。

- 在同一个点击事件中返回一个箭头函数，其中箭头函数中可包含多个 setState()（更新函数）。

```jsx
<button onClick = {() => {
    setCount(count+1) // 参数为非函数类型
    setCount(name => name + 'snsn') // 参数为函数类型
}} click me </button>
```

7，基本使用案例：

- TodoList 内容：

```jsx
import React, { useState } from "react";
import TodoForm from "./TodoForm";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  function setValue(text) {
    if (text) setTodos([...todos, text]);
  }
  return (
    <div>
      <TodoForm listOnSubmit={setValue} />
      <div>
        {todos.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </div>
      <button
        onClick={() => {
          setTodos([]);
        }}
      >
        清除内容
      </button>
    </div>
  );
}
```

- TodoItem 内容：

```jsx
import React, { useState } from "react";
// 定义逻辑复用的hook
const useInputValue = (inputValue) => {
  const [value, setValue] = useState(inputValue);
  return {
    value,
    onChange: (e) => (e.target.value.trim() ? setValue(e.target.value) : null),
    reSetValue: () => setValue(""),
    onFocus: () => inpRef.current.focus(),
  };
};
const inpRef = React.createRef();

export default function TodoForm({ listOnSubmit }) {
  const { reSetValue, onFocus, ...text } = useInputValue("");
  function onSubmitHeader(e) {
    e.preventDefault();
    // 调用父组件方法将新的value加入到todos中
    listOnSubmit(text.value);
    reSetValue(); // 清空输入框
    onFocus(); // 获取焦点
  }
  return (
    <form onSubmit={onSubmitHeader}>
      {/* 受控组件
         <input type="text" value={value}
            onChange={e => setValue(e.target.value)}
         /> */}
      <input type="text" {...text} ref={inpRef} />
      <input type="submit" />
    </form>
  );
}
```

#### Effect Hook

1，Effect Hook 可以让函数式组件执行副作用操作。

2，React 副作用说明：

- 发送 ajax 请求数据获取。

- 设置订阅/启动定时器。

- 手动更新真实 DOM 。

3，语法解析：

```jsx
// 在每次render( )后执行
useEffect(() => {
  effect`// 此处写副作用`;
  // 在组件卸载前执行
  return () => {
    cleanup`// 此处写清除副作用代码`;
  };
}, ["此处写依赖项"]);
```

4，useEffect() 参数说明：

- useEffect() 方法接收两个参数，分别为：

  - 第一个为回调函数（即箭头函数）。

  - 第二个为依赖项（是一个数组）。

5，useEffect 相当于 class 类组件中的三个组件，分别是：

- **componentDidMount**。

- **componentDidUpdate**。

- **componentWillUnmount**。

6，useEffect() 第二个参数——**依赖项**说明：

- 如果数组依赖性为空，回调函数只会在初始化渲染一次，后面的所有 render 将不再执行。

  - 依赖项为空数组：相当与 class 类组件中的**componentDidMount**，并且只会在初始化的时候执行一次，之后就不再执行。
  - 没有依赖项时：相当于生命周期的**componentDidMount**和**componentDidUpdate**，并且每次渲染都会执行。
  - 依赖项数组不为空时：即代表只有当依赖项数组中的值改变时，才会触发**componentDidMount**。

7，**注意**：useEffect 每次都在 render() 执行之后（即渲染完成后）才执行。

8，基本使用案例：

```jsx
import React, { useState, useEffect } from "react";

let index = 0;
export default function useEffectDepend() {
  const names = ["zzz", "mmm", "sss", "nnn"];
  const [count, setCount] = useState(0);
  const [name, setName] = useState([]);
  const [msg, setMsg] = useState("");

  if (index > 3) {
    index = 0;
  }
  useEffect(() => {
    document.title = count + name;
    const timer = setTimeout(() => {
      console.log("执行了");
      setMsg((msg) => (count !== 0 ? msg + count + name : ""));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [count]);

  return (
    <div>
      <p>count:{count !== 0 ? count : ""}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        changeCount
      </button>
      <p>name:{name}</p>
      <button onClick={() => setName(name.concat(names[index++]))}>
        changeName
      </button>
      <p>msg:{msg}</p>
    </div>
  );
}
```

#### Ref Hooks(容器组件)

1，Ref Hook 可以在函数中，组件中储存/查找组件内的标签或任意其他数据。

2，语法：const RefContainer = useRef(initialValue)。

3，作用：

- 保存标签对象：功能与**React.createRef()**一样。

- 保存任意数据：

  - 保存：`RefContainer.current=XXX`。
  - 读取：`RefContainer.current.XXX`。

4，useRef 说明：

- useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。
  返回的 ref 对象在组件的整个生命周期内保持不变。

- useRef 中 current 属性，用来保存或读取 ref 对象中保存的数据。
  只要经过 current 保存进入 ref 容器中的值，将在整个生命周期内保持不变。

- 每次创建一类 Ref 容器，只要是同一类的容器，就不会在每次更新时，
  都重新创建一个容器，而是使用第一次创建的那个 Ref 容器，然后每次都向该容器中保存数据。

5，基本使用案例：

```jsx
import React, { useState, useEffect, useMemo, useRef } from "react";

export default function App(props) {
  const [count, setCount] = useState(0);
  const timerID = useRef();
  const doubleCount = useMemo(() => {
    return 2 * count;
  }, [count]);

  useEffect(() => {
    // 使用timerID.current保存定时器标识，使该标识在组件内任何地方都能使用
    timerID.current = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (count >= 20) {
      clearInterval(timerID.current);
    }
  });

  function clearTimer() {
    clearInterval(timerID.current);
  }

  return (
    <>
      <p ref={timerID}>
        Count: {count}, double: {doubleCount}
      </p>
      <button onClick={clearTimer}>clearTimer</button>
    </>
  );
}
```

#### Context Hook

1，使用 Context Hook 可以使函数式组件进行跨组件通信。

2，语法：const value = useContext(MyContext)。

3，useContext()方法说明：

- 接收一个 context 对象（React.createContext 的返回值，
  即 const MyContext=React.createContext(null)）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。

- 当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重新渲染，
  并使用最新传递给 MyContext provider 的 context value 值。

- 在同一个组件中，可以使用多个 useContext()，接收不同组件中传递的数据。

4，基本使用案例：

- UseContext 组件内容：

```jsx
import React, { useState } from "react";
import Parent from "./Parent";

export const MyContext = React.createContext();

export default function UseContext() {
  const [count, setCount] = useState(0);
  return (
    <MyContext.Provider value={count}>
      <Parent />
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        changeCount
      </button>
    </MyContext.Provider>
  );
}
```

- Parent 组件内容：

```jsx
import React, { useState } from "react";
import Children from "./Children";

let index = 0;
export const nameContext = React.createContext();

export default function UseContext() {
  const names = ["s", "n", "x", "c", "h", "m", "d", "w"];
  if (index > names.length - 1) index = 0;
  const [name, setName] = useState(["f"]);
  return (
    <nameContext.Provider value={name}>
      <Children />
      <button
        onClick={() => {
          setName(name.concat(names[index++]));
        }}
      >
        changeName
      </button>
    </nameContext.Provider>
  );
}
```

- Children 组件内容：

```jsx
import React, { useContext } from "react";
import { MyContext } from "./UseContext";
import { nameContext } from "./Parent";

export default function Children() {
  const count = useContext(MyContext);
  const name = useContext(nameContext);

  return (
    <div>
      <p>Count:{count * 2}</p>
      <p>Name:{name}</p>
    </div>
  );
}
```

#### Reducer Hook

1，useReducer() 类似于 redux 中的 reducer，可以根据触发事件的不同得到对应的状态。

2，语法：const [state, dispatch] = useReducer(reducer, initialArg, init)。

3，useReducer()方法说明：

- useState 的代替方案。它接收一个形如（state，action）=> newState 的 reducer，
  并返回当前的 state 以及与其配套的 dispatch 方法。

- 在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数。

4，基本使用示例:

```jsx
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}
```

#### Callback Hook

1，语法：

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

2，useCallback()方法说明：

- 类似于 class 类组件中的 componentShouldUpDate()。

- 该方法返回一个 memoized 回调函数。

- 把内联回调函数及依赖项数组作为参数传入 useCallback ，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。

- 并不是说依赖项没有改变，useCallback 就不会执行，不管依赖项变没变，useCallback Hook 都会执行。依赖项的改变只是决定 useCallback Hook 中的回调函数是否需要更新。

- 依赖项改变，useCallback Hook 返回的 memoized 回调函数就会更新。
  即 useCallback 中保存的回调函数才会更新。

- useCallback（fn，deps）相当于 useMemo（( ) => fn , deps）。

3，使用场景是：

- 有一个父组件，其中包含子组件，子组件接收一个函数作为 props ；通常而言，如果父组件更新了，子组件也会执行更新；但是大多数场景下，更新是没有必要的，我们可以借助 useCallback 来返回函数，然后把这个函数作为 props 传递给子组件；这样，子组件就能避免不必要的更新。

- **说明**：所有依赖本地状态或 props 来创建函数，需要使用到缓存函数的地方，都是 useCallback 的应用场景。

4，**注意**：依赖项数组不会作为参数传给回调函数。

5，特别说明：

- useEffect、useMemo、useCallback 都是自带闭包的。也就是说，每一次组件的渲染，其都会捕获当前组件函数上下文中的状态(state, props)，所以每一次这三种 hooks 的执行，
  反映的也都是当前的状态，你无法使用它们来捕获上一次的状态。对于这种情况，我们应该使用 ref 来访问。

6，基本使用案例：

- 案例一：查看 useCallback 返回的函数是否变化：

```jsx
import React, { useState, useCallback } from "react";

const set = new Set();

/*我们可以看到，每次修改count，set.size就会+1，
这说明useCallback依赖变量count，count变更时会返回新的函数。
而val变更时，set.size不会变，说明返回的是缓存的旧版本函数。*/

export default function Callback() {
  const [count, setCount] = useState(1);
  const [val, setVal] = useState("");

  const callback = useCallback(() => {
    console.log(count);
  }, [count]);
  callback();

  set.add(callback);

  return (
    <div>
      <h4>count:{count}</h4>
      <h4>setLength:{set.size}</h4>
      <div>
        <input
          value={val}
          placeholder="UCB缓存的函数不受val影响"
          onChange={(event) => setVal(event.target.value)}
        />
        <button onClick={() => setCount(count + 1)}>count++</button>
      </div>
      <h4>{val}</h4>
    </div>
  );
}
```

- 案例二：防止子组件产生不必要的更新：

```jsx
// 父组件内容
import React, { useState, useCallback } from "react";
import Child from "./Child-update";

export default function Parent() {
  const [count, setCount] = useState(1);
  const [val, setVal] = useState("");
  const callback = useCallback(() => {
    return count;
  }, [count]);
  return (
    <div>
      <h3>Parent-count：{count}</h3>
      <p>Parent-val:{val}</p>
      <Child callback={callback} msg={count} />
      <div>
        <input
          value={val}
          placeholder="count改变子组件才会刷新"
          onChange={(event) => setVal(event.target.value)}
        />
        <button onClick={() => setCount(count + 1)}>ParentCount++</button>
      </div>
    </div>
  );
}

// 子组件内容
import React, { useState, useEffect, useRef } from "react";

export default function Child({ callback }) {
  const pRef = useRef();
  const [count, setCount] = useState(() => callback());
  const result = (pRef.current = "组件更新" + count + "次了");
  useEffect(() => {
    console.log("更新了");
    setCount(callback());
  }, [callback]);
  return (
    <div>
      <h3 ref={pRef}>Child{result}</h3>
      <h3>Child-count:{count}</h3>
    </div>
  );
}
```

#### useMemo Hook

1，语法：

```jsx
const memoizedvalue = useMemo(() => {
  calculateValue(a, b);
}, [a, b]);
```

2，useMemo()方法说明：

- useMemo()方法返回一个 memoized 值。

- 把创建函数和依赖项数组作为参数传入 useMemo ，它仅会在某个依赖项改变时才会重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开消的计算。

3，**useMemo 注意点**：

- 传入 useMemo 的函数会在渲染器件执行。不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，无不是 useMemo。

- 如果没有依赖项数组，useMemo 在每次渲染是都会计算新的值。

- 你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。

4，基本使用案例：

```jsx
import React, { useState, useMemo } from "react";

export default function WithMemo() {
  const [count, setCount] = useState(1);
  const [val, setValue] = useState("");
  const expensive = useMemo(() => {
    console.log("该函数中的计算执行了");
    let sum = 0;
    for (let i = 0; i < count * 100; i++) {
      sum += i;
    }
    return sum;
  }, [count]);

  return (
    <div>
      <h4>
        count-expensive:{count}-{expensive}
      </h4>
      <p>val:{val ? val : "请输入内容"}</p>
      <div>
        <input
          value={val}
          placeholder="val改变不会重新计算sum"
          onChange={(event) => setValue(event.target.value)}
        />
        <button onClick={() => setCount(count + 1)}>Computed</button>
      </div>
    </div>
  );
}
```

#### useSelector Hook 与 useDispatch Hook

1，useSelect：

- 语法：const todo = useSelector(state => state.todo)。

- 作用：useSelector 是从 redux 的 store 对象中提取数据（state）。

- 使用 useSelector 在默认情况下，如果每次返回一个新对象，将始终进行强制 re-reder ，如果要从 store 中获取多个值，可以向以下这样做：

  - useSelector() 调用多次，每次返回一个字段值。

  - 使用 useSelector 或类似的库创建一个记忆（memorized）Selector ，它在一个对象中返回多个值，但只能在其中一个值发生更改时才返回一个新对象。

  - 使用 react-redux 提供的 shallowEqul 函数作为 useSelector 的 equailtyFn 参数。

2，useDispatch：

- 语法：const dispatch = useDispatch()。

- 作用：该 Hook 返回 Redux store 中对 dispatch 函数的引用。

- 当使用 dispatch 将回调函数传递给子组件时，建议使用 useCallback 对其进行记忆，否则子组件可能由于引用的改变而进行不必要的渲染，如下：

```jsx
// 父组件
export const CounterComponent = (value) => {
  const dispatch = useDispatch();
  const incrementCounter = useCallback(() => {
    dispatch({ type: "increment- Counter" });
  }, [dispatch]);
  Return(
    <div>
      <p>{value}</p>
      <MyIncrementButton onIncrement={incrementCounter} />
    </div>
  );
};
// 子组件
export const MyIncrementButton = React.memo((onIncrement) => {
  <button onClick={onIncrement}>Increment counter</button>;
});
```

3，useSelect/useDispatch 基本使用案例：

- Parent 内容：

```jsx
import React from "react";
import Child from "./child";
function App() {
  return (
    <div>
      <h1>使用useSelector和UseDispatch</h1>
      <Child />
    </div>
  );
}
export default App;
```

- Child 内容：

```jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
function Child() {
  const num = useSelector((state) => state.num);
  const dispatch = useDispatch();
  return (
    <div>
      <p>{num}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}
export default Child;
```

- Redux/reducer 内容：

```jsx
export function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { num: state.num + 1 };
    case "decrement":
      return { num: state.num - 1 };
    default:
      return state;
  }
}
```

- Redux/store 内容：

```jsx
import { createStore } from "redux";
import { reducer } from "./reducer";
const initialState = { num: 0 };
const store = createStore(reducer, initialState);
export default store;
```

#### 自定义 Hooks

1，自定义 Hook 说明：

- 自定义 Hook 其实就是把 useXxx 方法执行以后，把方法体里面的内容平铺到组件内部。

- 一般自定义 Hook 只负责逻辑，不负责渲染。

- 公共逻辑的 Hook 尽量细分，按照组件的单一原则划分，单一 Hook 只负责单一的职责。

- 复杂的计算可以尽量考虑用 useCallback/useMemo 去优化。

2，自定义 hooks 基本使用案例：

- 定义自定义 hook 内容

```jsx
import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [width, setWidth] = useState("0px");
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    console.log("snsnsnsn"); // 初始化执行一次
    setWidth(document.documentElement.clientWidth + "px");
    setHeight(document.documentElement.clientHeight + "px");
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWidth(document.documentElement.clientWidth + "px");
      setHeight(document.documentElement.clientHeight + "px");
    };
    window.addEventListener("resize", handleResize, false);
    return () => {
      //使用false是为了取消副作用
      window.removeEventListener("resize", handleResize, false);
    };
  }, [width, height]);

  return [width, height];
};
```

- 使用自定义 hook 组件内容

```jsx
import React from "react";
import { useWindowSize } from "./index";
const Parent = () => {
  const [width, height] = useWindowSize();
  return (
    <div>
      size:{width}*{height}
    </div>
  );
};
function App() {
  return (
    <div>
      <Parent />
    </div>
  );
}
export default App;
```

3，自定义 hook 使用说明：

- 创建自定义 Hook 必须以 use 开头。

- 必须要有返回值，把更新的状态以数组的形式返回。

- 在自定义 Hook 时，如果有副作用操作需要将其放在 useEffect() 方法中。比如：发起监听，设置定时器，发送 ajax 请求等。

- 当需要对性能进行优化时，比如要进行复杂运算，还有防止不必要的渲染时，可以将其写在 useCallback 和 useMemo 方法中。

- useEffect、useCallback、useMemo 三者都有第二个参数，即依赖项，都可以根据依赖项确定是否执行回调函数，进行渲染。但是三者的使用场景不一样。

- useEffect 主要用于操作副作用。useCallback 主要用于避免不必要渲染，既返回的 memoized 回调函数不需要每次渲染时都执行以更新状态。便于提升性能。useMemo 主要用于进行复杂的运算。使复杂运算不需要每次渲染时都要重新计算 memoized 值。

### redux 基本简介

#### redux 概述

1，redux 是一个独立专门用于做状态管理的 JS 库（不是 react 插件库）。

2，它可以用在 react，angular，vue 等项目中，但基本是与 react 配合使用。

#### redux 的作用

1，管理 react 应用中多个组件共享的状态。

#### redux 工作流程图

![redux 工作流程图](redux1.jpg)

#### 为什么要用 redux

1，在 react 中，数据在组件中是单向流动的，数据从一个方向父组件流向子组件（通过 props），所以，两个父子组件之间通信相对麻烦，redux 的出现就是为了解决 state 里面的数据问题。

![redux 通信](redux2.webp)

#### redux 的设计理念

1，redux 将整个应用状态储存到一个地方上，称为 store，里面保存着一个状态树——store tree，组件可以派发（dispatch）行为（action）给 store ，而不是直接通知其他组件，组件内部通过订阅 store 中的状态 state 来刷新自己的视图（view）。

#### redux 的三大原则

1，唯一数据源：

- 整个应用的 state 都被存储到一个状态树里面，并且这个状态树，只存在于唯一的 store 中。

2，保持只读状态：

- State 是只读的，唯一改变 state 的方法就是触发 action ，action 是一个用于描述已发生事件的普通对象。

3，数据改变只能通过纯函数来执行：

- 使用纯函数来执行修改，为了描述 action 如何改变 state 的，你需要编写 reducers。

### [redux](https://www.redux.org.cn/) 概念解析

#### store

1，store 是保存数据的地方，可以把它看成一个数据，整个应用只能有一个 store 。redux 提供 createStore 这个函数，用来生成 store。

2，store 对象的作用：redux 库最核心的管理对象。

3，它内部维护者：reducer（根据老状态更新出新状态的函数）。

4，核心方法：

- getState()：获取状态 state。

- dispatch(action)：分发事件，最终触发 reducer 调用产生新的状态。

- subscribe(listencer)：订阅监听，当产生了新的 state 时，自动调用。

  - 通过 subscribe(listener) 返回的函数注销监听器。

5，语法：

```jsx
store.getState();
store.dispatch({ type: "INCREMENT", number });
store.subscrible(render);
```

#### state

2.1，state 就是 store 里面储存的数据， store 里面可以拥有多个 state ，**redux 规定一个 state 对应一个 View**，只要 state 相同，view 就是一样的，反过来也是一样的，可以通过 store.getState() 来获取 state。

#### action

1，state 的改变会导致 View 的变化，但是在 redux 中不能直接操作 state ，也就是说不能使用 this.setState 来操作，用户只能接触到 View 。在 redux 中提供了一个 action 对象来告诉 store 需要改变 state 。

2，action 是一个对象，用来标识要执行的行为对象。其中 type 属性是必须的，表示 action
的名称，其他的可以根据需求自由设置。

3，action 对象属性介绍:

- `type`：标识属性，值为字符串，唯一，必要属性。

- `data`：自定义数据属性，值类型任意，可选属性。

```jsx
const INCREMENT = "INCREMENT";
const addAction = { type: INCREMENT, count: 1 };
```

#### dispatch

1，store.dispatch() 是组件发出 action 的唯一方法。

```jsx
store.dispatch(addAction);
```

2，dispatch 会分发 action ，触发 reducer 自动调用，产生新的 state。

3，dispatch 参数是一个 action ，而 action 是一个对象，而且 action 里面有两个属性:

- type：标识要执行行为的对象。

- data：是类型任意的数据属性，这个属性是可选的。

#### reducer

1，store 收到 action 以后，必须给出一个新的 state ，这样 view 才会发生变化。这种 state 的计算过程就叫做 reducer 。

2，reducer 是一个纯函数，会根据老的 state 和 action 产生新的 state。

3，纯函数是函数或编程的概念，必须遵守以下一些约束。

- 只要是同样的输入，必定得到同样的输出。

- 不得改写参数。

- 不能调用系统 i/O 的 API。

- 不能调用 Data.now() 或者 Math.random() 等不纯的方法，因为每次会得到不一样的结果。

4，reducer 函数不用像其他函数一样，需要手动调用，store.dispatch() 方法会触发 reducer 自动执行。为此 store 需要知道 reducer 函数，做法就是 再生成 store 的时候，将 reducer 传入 createStore（reducer）方法中作为参数。

5，**注意**：reducer 必须是一个纯函数，也就是说函数返回的结果必须由参数 state 和 action 决定，而且不产生任何副作用也不能修改 state 和 action 对象。

### redux 核心 API 解析

#### createStore()

1，作用：创建包含指定 reducer 的 store 对象。

2，语法：

```
import {createStore} from 'redux'
import counter from "./reducer/counter"
const store = createStore{counter}
```

#### applyMiddleware()

1，该方法是基于 redux 的一个中间件（插件库）。

2，语法：

```jsx
import {createStore,applyMiddleware} from “redux”
import thunk from “redux-thunk”//redux异步中间件thunk
const store = createStore{
  counter，
  applyMiddleware(thunk)    // 传入异步中间件
}
```

#### combineReducers()

1，作用：合并多个 reducer 函数。

2，语法：

```jsx
export default combineReducers({ reducer1, reducer2, reducer3 });
```

### 渲染方式

#### 具体编码方式

```jsx
function render() {
  //将store属性赋值给App
  ReactDOM.render(<App store={store} />, document.getElementById("root"));
}

//初始化渲染
render();

/*订阅监听(store中的状态变化了，就会自动调用进行重绘,
  将新的state(状态显示出来。不写就不会显示))*/
store.subscribe(render);
```

### [react-redux](https://react-redux.js.org/) 基本介绍

#### react-redux 理解

1，react-redux 是一个 react 插件库。

2，其专门用来简化 react 应用中使用 redux。

#### react-redux 对组件的分类

1，UI 组件：

- 只负责 UI 的呈现，不带有任何业务逻辑，通过 props 接收数 据（一般数据和函数数据）。不使用任何 Redux 的 API。一般保存在 components 文件夹下。没有状态（即不使用 this.state 这个变量）。

2，容器组件：

- 负责管理数据和业务逻辑，不负责 UI 的呈现。使用 Redux 的 API ，一般保存在 containers 文件夹下。

### react-redux API

#### Provider

1，Provider 可让所有组件都可以得到 state 数据。

2，语法：

```jsx
<Provider store = {store}>
  <App />
<Provider />
```

#### connect()

1，该方法用于包装 UI 组件生成容器组件。

```jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increment, decrement, reset } from './actions'

export default class Counter extends Component{
    ...
}

const mapStateToProps = (state /*ownProps*/) => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = { increment, decrement, reset }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
```

#### mapStateToprops 说明

1，mapStateToprops 是一个函数，它的作用就是用来建立一个从（外部的）state 对象到（UI 组件）props 对象的映射关系。

2，mapStateToprops 函数执行后，应该返回一个对象，里面的每一个键值对就是一个映射。

3，mapStateToprops 会订阅 store ，每当 state 更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。

#### mapDispatchToprops 说明

1，mapDispatchToprops 是 connect 函数的第二个参数，用来建立 UI 组件的参数到 store.dispatch 方法的映射，也就是说，它定义了哪些用户的操作应该当做 action 传给 store ，它可以是函数也可以是对象。

#### redux-thunk

1，redux-thunk 是 redux 中的一个中间件。

2，作用：当组件中有复杂的异步请求时，为了减少组件的复杂程度，把异步请求使用中间件放在 actionCreator.js 中。

3，使用：在创建 store 时，需要从 redux 中引入 appMiddleware 这个方法（注意：appMiddleware 方法是专门用来管理中间件的。）而引入该方法的目的在于可以使用中间件。然后从 redux-thunk 这个库中引入 thunk 这个模块。

- import thunk from 'redux-thunk'。

- 在创建 store 时，将 appMiddleware 这个方法作为参数传入。

  - consts store = createStore(reducer, appMiddleware(thunk))。

- 将组件中异步代码写在 action 中。当使用了 redux-thunk 中间件之后，这个 action 就会返回一个函数，在这个函数中可以做异步操作。（注意：必须由 dispatch 调用，然后再由 dispatch 分发 action 给一个同步的 action）。

- **提示**：每当有一个异步 action 时，就必定会有一个相对应的同步 action。

```jsx
// 定义同步action
const incrementAsyn = (number) => ({ type: ASYNC, data: number });

// 定义异步action
export const incrementAsync = (number) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(incrementAsyn(number));
    }, 1000);
  };
};
```

### react-redux 具体使用

#### 创建 action-types

1，创建的所有 action-types 都是与 action 中的 type 属性及 reducer 中 switch 中的 case 相对应的。这样就减少了出现错误的可能。

```jsx
  export const ASYN-TYPE1 = 'ASYN-TYPE1'
  export const ASYNC-TYPE1 = 'ASYNC-TYPE1'
```

#### 创建同步或异步 action

1，每个异步 action 都需要对应一个同步 action ，即在异步 action 中分发一个同步 action 以供 reducer 纯函数进行状态更改。

2，在异步 action 中分发同步 action 时，每个 action 都必须有 despatch 方法进行分发。

```jsx
// 对应asyncFunc2
export const async-type2 = (state) => { type: ASYNC - TYPE2, data: state }
export const async-type3 = (state) => { type: ASYNC - TYPE3, data: state }

// 创建异步action2
export const asyncFunc2 = () => {
  return dispatch => {
    // 该action会在等待请求返回数据的时候触发
    dispatch(async-type3())
    // 发送fetch请求
    fetch("http://localhost:3000/xxx")
      .then(res => res.json())
      .then(data => {
        dispatch(async-type2(data))
      }).catch(error => {
        console.log(error)
      })
  }
}
```

#### 创建 reducer 纯函数

1，redux 中 state 是只读的，不能直接修改 state 的状态，必须使用 action 行为进行触发，再经过 reducer 纯函数进行修改。

2，当有多个 reducer 时，需要使用 combineReducers() 方法拼接多个 reducer。

```jsx
export const reducers = combineReducers({
  reducer1,
  reducer2,
});
```

#### 创建 store 对象

1，store 是连接 reducer 、action 及 view 的桥梁。

2，其中 store 三个参数，常用参数是`reduder纯函数`，`applyMiddleware`中间件管理方法。 applyMiddleware 方法中就收的就是各种中间件，如`thunk中间件`(用于处理异步请求的中间件)。只要有异步操作就需要配置`redex-thunk`异步中间件。

```jsx
import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers/index";
import thunk from "redux-thunk";

// 创建store对象
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
```

#### 基本使用案例

1，App 内容：

```jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import { increment, decrement, async, suc } from "./redux/actions/action";

class App extends Component {
  increment = () => {
    this.props.increment(1);
  };
  decrement = () => {
    this.props.decrement(1);
  };
  asyncHandler = () => {
    this.props.async(5);
  };

  success = () => {
    this.props.suc();
  };

  render() {
    const { count } = this.props;
    const { name, age, isfetch } = this.props.users;
    let data;
    if (isfetch) {
      data = "Loading...";
    } else {
      data = name;
    }
    return (
      <div>
        <h1>{count}</h1>
        <h1>{data}</h1>
        <h1>{age}</h1>
        <button onClick={this.increment}>点我加1</button>
        <button onClick={this.decrement}>点我减1</button>
        <button onClick={this.asyncHandler}>点我加5</button>
        <button onClick={this.success}>发送请求</button>
      </div>
    );
  }
}

export default connect(
  (state) => ({ count: state.current, users: state.fetch }),
  { increment, decrement, async, suc }
)(App);
```

2，store 内容：

```jsx
import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers/index";
import thunk from "redux-thunk";

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
```

3，reducers 内容：

- current 内容：

```jsx
// reducer组件：用于定义状态更改的组件。其中state的值是只读的。
import { INCREMENT, DECREMENT } from "../action-types/action-types";

const initial = 0;

export default function current(state = initial, action) {
  switch (action.type) {
    case INCREMENT:
      return (state += action.data);

    case DECREMENT:
      return (state -= action.data);

    default:
      return state;
  }
}
```

- fetch 内容：

```jsx
import { SUCCESS, ISFETCHING } from "../action-types/action-types";

const initial = {
  user: {
    name: "",
    age: "",
    isfetch: false,
  },
};

export default function fetch(state = initial, action) {
  console.log({ ...state.user, ...action.data });
  switch (action.type) {
    case ISFETCHING:
      return {
        ...state.user,
        isfetch: true,
      };

    case SUCCESS:
      return {
        ...state.user,
        ...action.data,
        isfetch: false,
      };

    default:
      return state;
  }
}
```

- index 内容：

```jsx
import { combineReducers } from "redux";
import current from "./reducers";
import fetch from "./fetch";

const reducers = combineReducers({
  current,
  fetch,
});

export default reducers;
```

4，actions 内容：

```jsx
import {
  INCREMENT,
  DECREMENT,
  SUCCESS,
  ISFETCHING,
} from "../action-types/action-types";

export const increment = (count) => ({ type: INCREMENT, data: count });

export const decrement = (count) => ({ type: DECREMENT, data: count });

export const async = (count) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment(count));
    }, 500);
  };
};

const success = (user) => ({ type: SUCCESS, data: user });
const isfetching = () => ({ type: ISFETCHING });

export const suc = () => {
  return (dispatch) => {
    // 该action会在等待请求返回数据的时候触发
    dispatch(isfetching());
    // 发送fetch请求
    fetch("http://localhost:3100/getuser")
      .then((res) => res.json())
      .then((data) => {
        dispatch(success(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
```

5，action-types 内容：

```jsx
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const SUCCESS = "SUCCESS";
export const DEFEATED = "DEFEATED";
export const ISFETCHING = "ISFETCHING";
export const ERROR = "ERROR";
```

6，入口文件 index 内容：

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store/store";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```
