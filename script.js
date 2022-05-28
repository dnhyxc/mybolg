const fs = require('fs')
const path = require('path')

const [, , fileName] = process.argv;

fs.mkdir(path.resolve(__dirname, `source/_posts/${fileName}`), (err) => {
  if (err) {
    console.log(err)
  }
})

function getDate() {
  const date = new Date(Date.now());
  const Y = date.getFullYear() + "-";
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  const D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";

  const h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  const m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  const s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}

const content = `---
title: ${fileName}
date: ${getDate()}
tags: 
toc: true
declare: true
categories: 
---

#### ${fileName}

<!-- more -->
`

fs.writeFile(path.resolve(__dirname, `source/_posts/${fileName}.md`), content, (error) => {
  if (error) {
    console.log(`创建失败：${error}`)
  }
})
