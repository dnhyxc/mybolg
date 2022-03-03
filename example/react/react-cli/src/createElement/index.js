import React from "react";
import { Sub } from "./create";

const RenderCreate = ({ type }) => {
  const selfProps = {
    name: "SubContent",
    content: type === "create" ? "我是Create组件" : "我是Content组件",
  };
  return React.createElement(Sub.Create, selfProps);
};

const CreateElement = ({ type }) => {
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

export default CreateElement
