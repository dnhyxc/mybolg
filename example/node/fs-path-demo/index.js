const fs = require("fs");
const path = require("path");

// 匹配 style 标签 s 表示任意空格，S 表示任意非空格
const regStyle = /<style>[\s\S]*<\/style>/;

// 匹配 script 标签 s 表示任意空格，S 表示任意非空格
const regScript = /<script>[\s\S]*<\/script>/;

fs.readFile(
  path.join(__dirname, "./source/index.html"),
  "utf-8",
  (err, data) => {
    if (err) {
      console.log("读取失败");
      return;
    }

    resolveCSS(data);
    resolveJS(data);
    resolveHTML(data);
  }
);

// 处理css
function resolveCSS(data) {
  const str = regStyle.exec(data);

  if (str && str.length) {
    const res = str[0].replace("<style>", "").replace("</style>", "");

    fs.writeFile(path.join(__dirname, "./public/index.css"), res, (err) => {
      if (err) return console.log("写入失败", err.message);
      console.log("css文件写入成功");
    });
  }
}

// 处理js
function resolveJS(data) {
  const str = regScript.exec(data);

  if (str && str.length) {
    const res = str[0].replace("<script>", "").replace("</script>", "");

    fs.writeFile(path.join(__dirname, "./public/index.js"), res, (err) => {
      if (err) return console.log("写入失败", err.message);
      console.log("js文件写入成功");
    });
  }
}

// 处理html
function resolveHTML(data) {
  const newHtml = data
    .replace(regStyle, "<link rel='stylesheet' href='./index.css'/>")
    .replace(regScript, "<script src='./index.js'></script>");

  fs.writeFile(path.join(__dirname, "./public/index.html"), newHtml, (err) => {
    if (err) return console.log("文件读写失败", err.message);
    console.log("html文件写入成功");
  });
}
