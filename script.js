const fs = require('fs')
const path = require('path')

const [, , fileName, folder = 'source/_posts', ...args] = process.argv;

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

const content_html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fileName}</title>
</head>
<body>
  <script>

  </script>
</body>
</html>`

if (folder === 'source/_posts') {
  fs.mkdir(path.resolve(__dirname, `${folder}/${fileName}`), (err) => {
    if (err) {
      console.log(err)
    }
  })

  fs.writeFile(path.resolve(__dirname, `${folder}/${fileName}.md`), content, (error) => {
    if (error) {
      console.log(`创建失败：${error}`)
    }
  })
} else if (folder === 'demo') {
  fs.writeFile(path.resolve(__dirname, `${folder}/base/${fileName}.html`), content_html, (err) => {
    if (err) {
      console.log(err)
    }
  })
} else {
  fs.mkdir(path.resolve(__dirname, `${folder}/${fileName}`), (err) => {
    if (err) {
      console.log(err)
    }
  })
}
