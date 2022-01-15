const fs = require("fs");
const {
  access, // [AsyncFunction: access, 测试用户对 path 指定的文件或目录的权限
  copyFile, // [AsyncFunction: copyFile],
  cp, // [AsyncFunction: cp],
  open, // [AsyncFunction: open],
  opendir, // [Function: opendir],
  rename, // [AsyncFunction: rename],
  truncate, // [AsyncFunction: truncate],
  rm, // [AsyncFunction: rm],
  rmdir, // [AsyncFunction: rmdir],
  mkdir, // [AsyncFunction: mkdir],
  readdir, // [AsyncFunction: readdir],
  readlink, // [AsyncFunction: readlink],
  symlink, // [AsyncFunction: symlink],
  lstat, // [AsyncFunction: lstat],
  stat, // [AsyncFunction: stat],
  link, // [AsyncFunction: link],
  unlink, // [AsyncFunction: unlink],
  chmod, // [AsyncFunction: chmod],
  lchmod, // [AsyncFunction: lchmod],
  lchown, // [AsyncFunction: lchown],
  chown, // [AsyncFunction: chown],
  utimes, // [AsyncFunction: utimes],
  lutimes, // [AsyncFunction: lutimes],
  realpath, // [AsyncFunction: realpath],
  mkdtemp, // [AsyncFunction: mkdtemp],
  writeFile, // [AsyncFunction: writeFile],
  appendFile, // [AsyncFunction: appendFile],
  readFile, // [AsyncFunction: readFile],
  watch, // [AsyncGeneratorFunction: watch]
} = require("fs/promises");
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

// const content = readFileSync(path.join(__dirname, "test.txt"));

// console.log(fsPromises, "同步读取操作");
console.log(readFile, "readFile");

const onAccess = (file) => {
  
};

// 异步的将test.txt文件内容复制到test文件夹下的copyTest.txt中
const onCopyFile = async () => {
  await copyFile("./test.txt", "./test/copyTest.txt");
  console.log("复制成功");
};

onCopyFile();
