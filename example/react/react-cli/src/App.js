import React from "react";
import "./App.css";

const Sub = ({ className, name, ...props }) => {
  return <div className={className}>hello {name}</div>;
};

const child = React.createElement(Sub, { name: "sub", className: "child" });

const parent = React.createElement(
  "div",
  { className: "parent" },
  "parent",
  child
);

export { parent };
