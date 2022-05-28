// 如果需要使用require，需要安装 @types/node 
const { func } = require("./index.js");

console.log(func, "func");

const count: number = 902209;

console.log(count);

interface Params {
  name: string;
  age: number;
}

const getInfo = (param: Params) => {
  return param;
};

const info = getInfo({ name: "dnhyxc", age: 18 });

console.log(info);

const { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4, c: 5 };
const obj = { x, y, ...z };

console.log(obj);
