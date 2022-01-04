/*
 * @Description: Shimming 预置依赖
 * @Author: dnh
 * @Date: 2021-12-20 12:02:44
 * @LastEditTime: 2022-01-04 19:15:59
 * @LastEditors: dnh
 * @FilePath: \example\webpack\shimming\src\index.js
 */
console.log(_.join(["hello", "word"]), " ");
this.alert("hello webpack");

const { file, parse, test } = require("./global");

console.log(file);
parse();
test();
