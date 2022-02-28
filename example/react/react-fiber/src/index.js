/**
 * react 15 采用递归渲染元素，采用这种方式的问题：
 * - 如果界面节点过多，层次很深时，递归渲染比较耗时。
 * - js 是单线程的，而且 UI 线程与 JS 线程是互斥的，因此就会导致阻塞页面渲染。
 */

import React from 'react';

const element = (
  <div id='0' className='wrap'>
    <div id='1'>dom1</div>
    <div id='2'>dom2</div>
  </div>
)

// console.log(element)
// const virtualDOM = JSON.stringify(element, null, 2)
// console.log(virtualDOM)

const render = (element, rootNode) => {
  console.log(element, rootNode, 'rootNode')
  const dom = document.createElement(element.type)
  Object.keys(element.props).filter(i => i !== 'children').forEach(j => {
    dom[j] = element.props[j]
  })
  if (Array.isArray(element.props.children)) {
    element.props.children.forEach(i => {
      console.log(dom, 'dom>>>i')
      render(i, dom)
    })
  } else {
    dom.innerHTML = element.props.children
    console.log(dom, 'innerHtml')
  }
  rootNode.appendChild(dom)
  console.log(dom, 'appendChild')
}

render(element, document.querySelector('#root'))

// ReactDOM.render(element, document.querySelector('#root'))