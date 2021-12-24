// 使用 node 运行

// library: commonjs
const { mylib } = require("../dist/mylib");
if (mylib) {
  console.log(mylib.add(9, 2), "commonjs");
}

// library: umd
const { add } = require("../dist/mylib");
if (add) {
  console.log(add(9, 2), "umd");
}
