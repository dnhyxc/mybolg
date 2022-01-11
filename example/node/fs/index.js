const fs = require("fs");
const path = require("path");

// 读写文件时尽量都是用 path.join 方法进行路径的拼接
fs.readFile(path.join(__dirname, "test.txt"), "utf-8", (err, data) => {
  console.log(data);
});

// 写文件
fs.writeFile(
  path.join(__dirname, "./write.txt"),
  "使用path路径拼接向文件中写入内容",
  (err, data) => {
    console.log(err, "写入失败");
    console.log(data, "写入成功");
  }
);
