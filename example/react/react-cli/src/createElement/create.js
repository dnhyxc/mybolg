import React from "react";
import { add } from "mylib_math_test";
import "./index.css";

console.log(add(22, 99), "mylib");

const Sub = ({ className, name, ...props }) => {
  return <div className={className}>hello {name}</div>;
};

Sub.Create = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <div>{props.content}</div>
    </div>
  );
};

const child = React.createElement(Sub, { name: "sub", className: "child" });

const parent = React.createElement(
  "div",
  { className: "parent" },
  "parent",
  child
);

const H1 = React.createElement(
  "div",
  { key: "h1", className: "h1" },
  "root_child中的元素"
);
const child1 = React.createElement(
  "ul",
  { key: "child1", className: "child1" },
  <li>React.createElement 生成 child1</li>
);
const child2 = React.createElement(
  "ul",
  { key: "child2", className: "child2" },
  <li>React.createElement 生成 child2</li>
);

const List = React.createElement(
  "div",
  { className: "wrap" },
  <div>
    {H1}
    {child1}
    {child2}
  </div>
);

// ReactDOM.render(List, document.querySelector('#root_child')) // 该代码同样生效，类似于 ReactDOM.createPortal()

export { parent, Sub, List };

/**
 * React.createElement(type, [props], [...children])：根据指定的第一个参数创建一个React元素。
 * - 第一个参数是必填，传入的是似 HTML 标签名称，如: ul, li, 也可以是一个组件，如上面的 Sub 组件。
 * - 第二个参数是选填，表示的是属性，如: className。
 * - 第三个参数是选填, 子节点，如: 要显示的文本内容。
 */
