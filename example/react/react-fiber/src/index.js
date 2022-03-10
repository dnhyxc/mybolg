/**
 * react 15 采用递归渲染元素，采用这种方式的问题：
 * - 如果界面节点过多，层次很深时，递归渲染比较耗时。
 * - js 是单线程的，而且 UI 线程与 JS 线程是互斥的，因此就会导致阻塞页面渲染。
 */

import React from "react";

const element = (
  <div id="0" className="wrap">
    <div id="1">dom1</div>
    <div id="2">dom2</div>
  </div>
);

// console.log(element)
// const virtualDOM = JSON.stringify(element, null, 2)
// console.log(virtualDOM)

const render = (element, rootNode) => {
  console.log(element, rootNode, "rootNode");
  const dom = document.createElement(element.type);
  // 给创建的dom添加除了children之外的属性
  Object.keys(element.props)
    .filter((i) => i !== "children")
    .forEach((j) => {
      dom[j] = element.props[j];
    });
  if (Array.isArray(element.props.children)) {
    // 如果子节点是一个数组，则说明子节点是一个元素节点，需要采用递归创建该元素
    element.props.children.forEach((i) => {
      console.log(dom, "dom>>>i");
      render(i, dom);
    });
  } else {
    // 如果子节点不是一个数组类型，则说明它是文本节点，直接复制即可
    dom.innerHTML = element.props.children;
    console.log(dom, "innerHtml");
  }
  rootNode.appendChild(dom);
  console.log(dom, "appendChild");
};

render(element, document.querySelector("#root"));

// ReactDOM.render(element, document.querySelector('#root'))
