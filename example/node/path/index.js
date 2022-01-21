const path = require("path");

const fpath = "./a/b/index.html";

// 获取路径中的文件名
const filename = path.basename(fpath);
console.log(filename); // index.html

// 获取路径中的文件名
const name = path.basename(fpath, ".html");
console.log(name); // index

// 获取文件的扩展名
const fext = path.extname(fpath);
console.log(fext); // .html

const dirPath = path.join(__dirname, '../fs/test.txt')

console.log(dirPath) // '/Users/dnhyxc/Documents/code/mybolg/example/node/fs/test.txt'

const filePath = path.join(__filename)

console.log(filePath) // '/Users/dnhyxc/Documents/code/mybolg/example/node/path/index.js'
