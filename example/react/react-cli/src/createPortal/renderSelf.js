import React from "react";
import { createPortal } from "react-dom";

const H1 = React.createElement(
  "div",
  { key: "h1", className: "h1" },
  "root_child中————使用createPortal渲染在指定容器中"
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
  H1,
  <div>
    {child1}
    {child2}
  </div>
);

const RenderSelf = () => {
  const wrap = document.createElement("div");
  wrap.className = "renderSelf";
  document.body.appendChild(wrap);

  return createPortal(List, wrap);
};

export default RenderSelf;
