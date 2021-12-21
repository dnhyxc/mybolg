import React from "react";
import ReactDOM from "react-dom";
import { Sub } from "./App";
import "./index.css";

const RenderCreate = ({ type }) => {
  const selfProps = {
    name: "SubContent",
    content: type === "create" ? "我是Create组件" : "我是Content组件",
  };
  return React.createElement(Sub.Create, selfProps);
};

const App = ({ type }) => {
  const selfProps = {
    name: "SubChild",
    content: type === "create" ? "我是Create组件" : "我是Content组件",
  };

  return (
    <div>
      <div>{Sub.Create(selfProps)}</div>
      <div>
        <RenderCreate type="content" />
      </div>
    </div>
  );
};

ReactDOM.render(<App type="create" />, document.getElementById("root"));
