import React from "react";
import { add } from "mylib_math_test";
import "./App.css";

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

export { parent, Sub };
