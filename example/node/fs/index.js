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

// 检测文件或文件夹权限
const onAccess = async (file, type) => {
  switch (type) {
    // 检查当前目录中是否存在指定文件或文件夹
    case "F_OK":
      try {
        await access(file, fs.constants.F_OK);
        console.log(`${file} 存在`);
      } catch {
        console.log(`${file} 不存在`);
      }
      break;
    // 检查当前文件是否可读
    case "R_OK":
      try {
        await access(file, fs.constants.R_OK);
        console.log(`${file} 可读`);
      } catch {
        console.log(`${file} 不可读`);
      }
      break;
    // 检查当前文件是否可写
    case "W_OK":
      try {
        await access(file, fs.constants.W_OK);
        console.log(`${file} 可写`);
      } catch {
        console.log(`${file} 不可写`);
      }
      break;
    // 检查当前文件是否可读可写
    case "FRW_OK":
      try {
        await access(
          file,
          fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK
        );
        console.log(`${file} 存在并可读可写`);
      } catch {
        console.log(`${file} 不存在或不可读或不可写`);
      }
      break;

    default:
      break;
  }
};

// 异步的将test.txt文件内容复制到test文件夹下的copyTest.txt中
const onCopyFile = async () => {
  await copyFile("./test.txt", "./test/copyTest.txt");
  console.log("复制成功");
};

onCopyFile();

onAccess("test.txt", "FRW_OK");

const onAccessSync = (file) => {
  fs.accessSync("test", fs.constants.F_OK);
  console.log(`${file}`, "存在~~~");
};

onAccessSync("test.txt", fs.constants.F_OK);

const content = fs.readFileSync("./test.txt", "utf-8");
console.log(content, "content"); // 文件读写测试 content

const fsPromise = require("fs/promises");

const onWriteFile = async (path, data) => {
  const content = await fsPromise.writeFile(path, data);
  console.log(content, "写入成功~~~");
};

onWriteFile("./write.txt", "使用path路径拼接向文件中写入内容~~~~~");

const res = fs.writeFileSync("./writeSync.txt", "同步写入内容");

if (res) {
  console.log("写入失败！");
} else {
  console.log("写入成功！");
}

console.log(__dirname, "__dirname"); // E:\mybolg\example\node\fs => 当前模块所在的目录路径，不包含当前文件模块
console.log(__filename, "__filename"); // E:\mybolg\example\node\fs\index.js => 当前模块所在的完整路径，包含当前文件模块
