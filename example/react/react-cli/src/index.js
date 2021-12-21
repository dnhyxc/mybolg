import React from "react";
import ReactDOM from "react-dom";
import { Sub } from "./App";
import "./index.css";

const RenderCreate = ({ type }) => {
  const selfProps = {
    name: "SubChild",
    content: type === "create" ? "我是Create组件" : "我是Content组件",
  };
  return React.createElement(Sub.Create, selfProps);
};

ReactDOM.render(
  <RenderCreate type="content" />,
  document.getElementById("root")
);
