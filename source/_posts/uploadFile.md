---
title: 文件上传
date: 2020-06-13 10:32:18
toc: true
tags:
  - File
  - canvas
  - JavaScript
categories:
  - 文件上传
---

#### 前言

本文主要概括了以下几种文件上传方式：

- 基于 formData 实现文件上传。

- 基于 base64 实现文件上传。

- 上传时生成唯一 fileName 传给后端。

- 文件上传并生成进度条。

- 多文件上传。

- 拖拽上传。

- 大文件上传(切片上传)。

- canvas 压缩上传图片。

<!-- more -->

#### 基于 formData 上传

```js
// 基于formData实现文件上传
const upload = document.querySelector("#upload1");
const upload_inp = upload.querySelector(".upload_inp");
const upload_button_select = upload.querySelector(".upload_button.select");
const upload_button_upload = upload.querySelector(".upload_button.upload");
const upload_tip = upload.querySelector(".upload_tip");
const upload_list = upload.querySelector(".upload_list");

let _file = null;

const clearHandle = () => {
  upload_tip.style.display = "block";
  upload_list.style.display = "none";
  upload_list.innerHTML = "";
  _file = null;
};

// 移除操作逻辑
upload_list.addEventListener("click", function (ev) {
  let target = ev.target;
  if (target.tagName === "EM") {
    clearHandle();
  }
});

// 监听用户选择文件的操作
upload_inp.addEventListener("change", function () {
  // 获取用户选择的文件
  let file = upload_inp.files[0];
  if (!file) return;

  // 限制文件上传的格式
  if (!/(PNG|JPG|JPEG)/i.test(file.type)) {
    alert("只能上传PNG|JPG|JPEG格式的文件");
    return;
  }

  // 限制文件上传的大小
  if (file.size > 2 * 1024 * 1024) {
    alert("上传的文件不能超过2MB");
    return;
  }

  _file = file;

  // 显示上传的文件
  upload_tip.style.display = "none";
  upload_list.style.display = "block";
  upload_list.innerHTML = `<li>
      <span>文件：${file.name}</span>
      <span><em>移除</em></span>
    </li>`;
});

// 点击选择文件按钮，触发上传文件input框选择文件的行为
upload_button_select.addEventListener("click", function () {
  if (
    upload_button_select.classList.contains("disable") ||
    upload_button_select.classList.contains("loading")
  )
    return;
  upload_inp.click();
});

const handleDisable = (flag) => {
  if (flag) {
    upload_button_select.classList.add("disable");
    upload_button_upload.classList.add("loading");
    return;
  }
  upload_button_select.classList.remove("disable");
  upload_button_upload.classList.remove("loading");
};

// 上传到服务器
upload_button_upload.addEventListener("click", function () {
  console.log(_file);
  if (
    upload_button_upload.classList.contains("disable") ||
    upload_button_upload.classList.contains("loading")
  )
    return;
  if (!_file) {
    alert("请选择文件");
    return;
  }

  handleDisable(true);

  // 传递文件给服务器
  let formData = new FormData();
  formData.append("file", _file);
  formData.append("filename", _file.name);
  instance
    .post("/upload_single", formData)
    .then((data) => {
      if (data.code === 0) {
        alert(`文件上传成功${data.servicePath}`);
        return;
      }
      return Promise.reject(data.codeText);
    })
    .catch((reson) => {
      alert("上传失败");
    })
    .finally(() => {
      handleDisable(false);
      clearHandle();
    });
});
```

#### 基于 base64 上传

```js
const upload = document.querySelector("#upload2");
const upload_inp = upload.querySelector(".upload_inp");
const upload_button_select = upload.querySelector(".upload_button.select");

// 检测按钮是否可点击
const checkDisable = (element) => {
  let classList = element.classList;
  return classList.contains("disable") || classList.contains("loading");
};

// 将选择的文件转为base64格式
const changeBase64 = (file) => {
  return new Promise((resolve) => {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (ev) => {
      resolve(ev.target.result);
    };
  });
};

// 监听用户选择文件的操作
upload_inp.addEventListener("change", async function () {
  // 获取用户选择的文件
  let file = upload_inp.files[0];
  let BASE64;
  if (!file) return;

  // 限制文件上传的格式
  if (!/(PNG|JPG|JPEG)/i.test(file.type)) {
    alert("只能上传PNG|JPG|JPEG格式的文件");
    return;
  }

  // 限制文件上传的大小
  if (file.size > 2 * 1024 * 1024) {
    alert("上传的文件不能超过2MB");
    return;
  }
  upload_button_select.classList.add("loading");
  BASE64 = await changeBase64(file);
  console.log(BASE64, "base64");
  try {
    const data = await instance.post(
      "/upload_single_base64",
      {
        file: encodeURIComponent(BASE64),
        filename: file.name,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (data.code == 0) {
      alert(`上传成功${data.servicePath}`);
    }

    throw data.codeText;
  } catch (error) {
    alert("上传失败");
  } finally {
    upload_button_select.classList.remove("loading");
  }
});

// 点击选择文件按钮，触发上传文件input框选择文件的行为
upload_button_select.addEventListener("click", function () {
  if (checkDisable(upload_button_select)) return;
  upload_inp.click();
});
```

#### 上传时生成唯一 fileName 传给后端

1、如果服务端不将传入的文件名处理成唯一的前提就需要前端自己生成唯一的 filename，之后传给服务端。

```js
const upload = document.querySelector("#upload3");
const upload_inp = upload.querySelector(".upload_inp");
const upload_button_select = upload.querySelector(".upload_button.select");
const upload_button_upload = upload.querySelector(".upload_button.upload");
const upload_abbre = upload.querySelector(".upload_abbre");
const upload_abbre_img = upload_abbre.querySelector("img");

let _file = null;

// 检测按钮是否可点击
const checkDisable = (element) => {
  let classList = element.classList;
  return classList.contains("disable") || classList.contains("loading");
};

// 将选择的文件转为base64格式
const changeBase64 = (file) => {
  return new Promise((resolve) => {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (ev) => {
      resolve(ev.target.result);
    };
  });
};

// 将为文件转为Buffer
const changeBuffer = (file) => {
  return new Promise((resolve) => {
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (ev) => {
      let buffer = ev.target.result;
      console.log(buffer, "buffer");
      let spark = new SparkMD5.ArrayBuffer();
      spark.append(buffer);
      let HASH = spark.end();
      console.log(HASH, "HASH");
      let suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1];
      console.log(suffix, "HASH");
      resolve({
        buffer,
        HASH,
        suffix,
        filename: `${HASH}.${suffix}`,
      });
    };
  });
};

// 监听用户选择文件的操作，并实现文件预览
upload_inp.addEventListener("change", async function () {
  // 获取用户选择的文件
  let file = upload_inp.files[0];
  let BASE64;
  if (!file) return;
  _file = file;
  // 限制文件上传的格式
  if (!/(PNG|JPG|JPEG)/i.test(file.type)) {
    alert("只能上传PNG|JPG|JPEG格式的文件");
    return;
  }
  // 限制文件上传的大小
  if (file.size > 2 * 1024 * 1024) {
    alert("上传的文件不能超过2MB");
    return;
  }
  // 读取之前让上传按钮禁用
  upload_button_select.classList.add("disable");
  // 文件预览，就是把文件对象转换为BASE64，赋值给图片的src熟悉感即可
  BASE64 = await changeBase64(file);
  upload_abbre.style.display = "block";
  upload_abbre_img.src = BASE64;
  upload_button_select.classList.remove("disable");
});

// 点击选择文件按钮，触发上传文件input框选择文件的行为
upload_button_select.addEventListener("click", function () {
  if (checkDisable(upload_button_select)) return;
  upload_inp.click();
});

const changeDisable = (flag) => {
  if (flag) {
    upload_button_select.classList.add("disable");
    upload_button_upload.classList.add("loading");
    return;
  }
  upload_button_select.classList.remove("disable");
  upload_button_upload.classList.remove("loading");
};

// 上传到服务器
upload_button_upload.addEventListener("click", async function () {
  if (checkDisable(this)) return;
  if (!_file) {
    alert("请选择文件");
    return;
  }
  changeDisable(true);
  // 生成文件的HASH名字
  const { filename } = await changeBuffer(_file);
  console.log(filename, "filename");

  // 传递文件给服务器
  let formData = new FormData();
  formData.append("file", _file);
  // 将自己生成的文件名传给服务端
  formData.append("filename", filename);
  instance
    .post("/upload_single", formData)
    .then((data) => {
      if (data.code === 0) {
        alert(`文件上传成功${data.servicePath}`);
        return;
      }
      return Promise.reject(data.codeText);
    })
    .catch((reson) => {
      alert("上传失败");
    })
    .finally(() => {
      changeDisable(false);
      upload_abbre.style.display = "none";
      upload_abbre_img.src = "";
      _file = null;
    });
});
```

#### 文件上传并生成进度条

```js
const upload = document.querySelector("#upload4");
const upload_inp = upload.querySelector(".upload_inp");
const upload_button_select = upload.querySelector(".upload_button.select");
const upload_progress = upload.querySelector(".upload_progress");
const upload_progress_value = upload_progress.querySelector(".value");

// 延迟函数
const delay = function delay(interval) {
  typeof interval !== "number" ? (interval = 1000) : null;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
};

// 检测按钮是否可点击
const checkDisable = (element) => {
  let classList = element.classList;
  return classList.contains("disable") || classList.contains("loading");
};

// 监听用户选择文件的操作，并实现文件预览
upload_inp.addEventListener("change", async function () {
  // 获取用户选择的文件
  let file = upload_inp.files[0];

  if (!file) return;

  // 限制文件上传的格式
  if (!/(PNG|JPG|JPEG)/i.test(file.type)) {
    alert("只能上传PNG|JPG|JPEG格式的文件");
    return;
  }

  // 限制文件上传的大小
  if (file.size > 2 * 1024 * 1024) {
    alert("上传的文件不能超过2MB");
    return;
  }
  // 读取之前让上传按钮禁用
  upload_button_select.classList.add("loading");

  try {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name);
    const data = await instance.post("/upload_single", formData, {
      // 文件上传中的回调函数 xhr.upload.onprogress
      onUploadProgress(ev) {
        let { loaded, total } = ev;
        upload_progress.style.display = "block";
        upload_progress_value.style.width = `${(loaded / total) * 100}%`;
      },
    });
    if (data.code === 0) {
      upload_progress_value.width = "100%";
      // 延迟3ms，防止alert阻止页面渲染，阻止进度条进度加载
      await delay(300);
      alert(`上传成功 => ${data.servicePath}`);
      return;
    }
    throw data.codeText;
  } catch (err) {
    alert("上传失败");
  } finally {
    upload_button_select.classList.remove("loading");
    upload_progress.style.display = "none";
    upload_progress_value.width = "0";
  }
});

upload_button_select.addEventListener("click", function () {
  if (checkDisable(upload_button_select)) return;
  upload_inp.click();
});
```

#### 多文件上传

```js
const upload = document.querySelector("#upload5");
const upload_inp = upload.querySelector(".upload_inp");
const upload_button_select = upload.querySelector(".upload_button.select");
const upload_button_upload = upload.querySelector(".upload_button.upload");
const upload_list = upload.querySelector(".upload_list");

let _files = [];

// 检测按钮是否可点击
const checkDisable = (element) => {
  let classList = element.classList;
  return classList.contains("disable") || classList.contains("loading");
};

const changeDisable = (flag) => {
  if (flag) {
    upload_button_select.classList.add("disable");
    upload_button_upload.classList.add("loading");
    return;
  }
  upload_button_select.classList.remove("disable");
  upload_button_upload.classList.remove("loading");
};

const createRandom = () => {
  let ran = Math.random() * new Date();
  return ran.toString(16).replace(".", "");
};

// 基于事件委托实现移除操作
upload_list.addEventListener("click", function (ev) {
  let target = ev.target;
  let curLi = null;
  let key;
  if (target.tagName === "EM") {
    curLi = target.parentNode.parentNode;
    if (!curLi) return;
    upload_list.removeChild(curLi);
    key = curLi.getAttribute("key");
    _files = _files.filter((item) => item.key !== key);
    if (_files.length === 0) {
      upload_list.style.display = "none";
    }
  }
});

// 监听用户选择文件的操作，并实现文件预览
upload_inp.addEventListener("change", async function () {
  // 获取用户选择的文件
  _files = Array.from(upload_inp.files);
  console.log(_files, "_files");
  if (_files.length === 0) return;

  // 给每一项设置一个位置值，作为自定义属性存储到元素上，后期点击删除按钮的时候，可以基于这个自定义属性获取唯一值，再到集合中根据这个唯一值，删除集合中这一项。
  _files = _files.map((file) => {
    return {
      file,
      filename: file.name,
      key: createRandom(),
    };
  });
  let str = ``;
  _files.forEach((item, index) => {
    str += `<li key=${item.key}>
        <span>文件${index + 1}：${item.filename}</span>
        <span><em>移除</em></span>
      </li>`;
  });
  upload_list.innerHTML = str;
  upload_list.style.display = "block";
});

// 点击选择文件按钮，触发上传文件input框选择文件的行为
upload_button_select.addEventListener("click", function () {
  if (checkDisable(upload_button_select)) return;
  upload_inp.click();
});

// 上传到服务器
upload_button_upload.addEventListener("click", async function () {
  if (checkDisable(this)) return;
  if (!_files.length === 0) {
    alert("请选择文件");
    return;
  }
  changeDisable(true);

  // 循环发送请求
  let upload_list_arr = Array.from(upload_list.querySelectorAll("li"));
  _files = _files.map((i) => {
    let fm = new FormData();
    let curLi = upload_list_arr.find(
      (liBox) => liBox.getAttribute("key") === i.key
    );
    let curSpan = curLi ? curLi.querySelector("span:nth-last-child(1)") : null;
    fm.append("file", i.file);
    fm.append("filename", i.filename);
    return instance
      .post("/upload_single", fm, {
        onUploadProgress(ev) {
          if (curSpan) {
            curSpan.innerHTML = `${((ev.loaded / ev.total) * 100).toFixed(2)}%`;
          }
        },
      })
      .then((data) => {
        if (data.code === 0) {
          if (curSpan) {
            curSpan.innerHTML = "100%";
          }
          return;
        }
        return Promise.reject();
      });
  });

  Promise.all(_files)
    .then(() => {
      alert("全部上传成功");
    })
    .catch(() => {
      alert("某一个文件导致了上传失败");
    })
    .finally(() => {
      changeDisable(false);
      _files = [];
      upload_list.innerHTML = "";
      upload_list.style.display = "none";
    });
});
```

#### 拖拽上传

```js
let upload = document.querySelector("#upload6");
const upload_inp = upload.querySelector(".upload_inp");
const upload_submit = upload.querySelector(".upload_submit");
const upload_mark = upload.querySelector(".upload_mark");

let isRun = false;
// 实现文件上传
const uploadFile = async (file) => {
  if (isRun) return;
  isRun = true;
  upload_mark.style.display = "flex";
  try {
    let fm = new FormData();
    fm.append("file", file);
    fm.append("filenamchangchuanshibaie", file.name);
    let data = await instance.post("/upload_single", fm);
    if (data.code === 0) {
      alert("上传成功");
      return;
    }
    throw data.codeText;
  } catch (err) {
    alert("上传失败");
  } finally {
    upload_mark.style.display = "none";
    isRun = false;
  }
};

/* 拖拽获取 dragenter dragleave dragover drop
  upload.addEventListener("dragenter", function () {
    console.log("进入"); // 进入时触发
  });

  upload.addEventListener("dragleave", function () {
    console.log("离开"); // 离开时触发
  });
  */

upload.addEventListener("dragover", function (ev) {
  ev.preventDefault();
  console.log("在区域中移动"); // 在区域中移动时触发
});

upload.addEventListener("drop", function (ev) {
  ev.preventDefault();
  console.log("放置到容器中"); // 放置到容器中时触发
  let file = ev.dataTransfer.files[0];
  if (!file) return;
  console.log(file, "file");
  uploadFile(file);
});

// 手动选择
upload_inp.addEventListener("change", function () {
  let file = upload_inp.files[0];
  if (!file) return;
  console.log(file, "-----");
  uploadFile(file);
});
upload_submit.addEventListener("click", function () {
  upload_inp.click();
});
```

#### 大文件上传(切片上传)

```js
const upload = document.querySelector("#upload7");
const upload_inp = upload.querySelector(".upload_inp");
const upload_button_select = upload.querySelector(".upload_button.select");
const upload_progress = upload.querySelector(".upload_progress");
const upload_progress_value = upload_progress.querySelector(".value");

// 检测按钮是否可点击
const checkDisable = (element) => {
  let classList = element.classList;
  return classList.contains("disable") || classList.contains("loading");
};

// 将为文件转为Buffer
const changeBuffer = (file) => {
  return new Promise((resolve) => {
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (ev) => {
      let buffer = ev.target.result;
      console.log(buffer, "buffer");
      let spark = new SparkMD5.ArrayBuffer();
      spark.append(buffer);
      let HASH = spark.end();
      console.log(HASH, "HASH");
      let suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1];
      console.log(suffix, "HASH");
      resolve({
        buffer,
        HASH,
        suffix,
        filename: `${HASH}.${suffix}`,
      });
    };
  });
};

// 监听用户选择文件的操作，并实现文件预览
upload_inp.addEventListener("change", async function () {
  // 获取用户选择的文件
  let file = upload_inp.files[0];

  if (!file) return;

  // 限制文件上传的格式
  if (!/(PNG|JPG|JPEG)/i.test(file.type)) {
    alert("只能上传PNG|JPG|JPEG格式的文件");
    return;
  }

  // 限制文件上传的大小
  if (file.size > 2 * 1024 * 1024) {
    alert("上传的文件不能超过2MB");
    return;
  }
  // 读取之前让上传按钮禁用
  upload_button_select.classList.add("loading");
  upload_progress.style.display = "block";

  let already = [];

  // 获取文件HASH，suffix后缀名
  let { HASH, suffix } = await changeBuffer(file);

  // 获取已经上传的切片信息
  try {
    const data = await instance.get("/upload_already", {
      params: {
        HASH,
      },
    });
    if (data.code === 0) {
      already = data.fileList;
    }
  } catch (err) {}

  // 实现文件的切片处理的方式：固定数量 & 固定大小
  let index = 0;
  let chunks = [];

  let max = 1024 * 100;
  let count = Math.ceil(file.size / max);
  if (count > 100) {
    max = file.size / 100;
    count = 100;
  }

  while (index < count) {
    chunks.push({
      file: file.slice(index * max, (index + 1) * max),
      filename: `${HASH}_${index + 1}.${suffix}`,
    });
    index++;
  }

  const clear = () => {
    upload_button_select.classList.remove("loading");
    upload_progress.style.display = "block";
    upload_progress_value.style.width = "0";
  };

  // 上传成功处理
  index = 0;
  const complate = async () => {
    // 进度条处理
    index++;
    upload_progress_value.style.width = `${(index / count) * 100}%`;
    // 当所有切片都上传成功时，进行切片的合并处理
    if (index < count) return;
    upload_progress_value.style.width = "100%";
    try {
      const data = await instance.post(
        "/upload_merge",
        {
          HASH,
          count,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (data.code === 0) {
        alert("文件上传成功");
        clear();
        return;
      }
      throw data.codeText;
    } catch (err) {
      alert("切片合并失败");
      clear();
    }
  };

  // 把没每一个切片上传到服务器
  chunks.forEach((chunk) => {
    // 已经上传到额切片不需要再重新上传
    if (already.length > 0 && already.includes(chunk.filename)) {
      complate();
      return;
    }

    let fm = new FormData();
    fm.append("file", chunk.file);
    fm.append("filename", chunk.filename);
    instance.post("/upload_chunk", fm),
      then((data) => {
        if (da6a.code === 0) {
          complate();
          return;
        }
        return Promise.reject(data.codeText);
      }).catch(() => {
        alert("切片上传失败");
        clear();
      });
  });
});

upload_button_select.addEventListener("click", function () {
  if (checkDisable(this)) return;
  upload_inp.click();
});
```

#### index.html 内容

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>切片上传</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/qs/6.10.1/qs.min.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/spark-md5/3.0.0/spark-md5.min.js"></script>
    <style>
      .upload_inp {
        display: none;
      }

      .upload_list {
        display: none;
      }

      .disable {
        background-color: #ccc;
      }

      .loading {
        background-color: #ccc;
      }

      .upload_abbre {
        display: none;
      }

      .upload_progress {
        width: 500px;
        height: 10px;
        background-color: #eee;
        margin-top: 20px;
        border-radius: 10px;
        display: none;
      }

      .value {
        width: 0;
        height: 10px;
        background-color: skyblue;
        border-radius: 10px;
        transition: all 0.3s ease;
      }

      em {
        cursor: pointer;
        color: red;
      }

      .upload_box {
        position: relative;
      }

      .upload_drag {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 500px;
        height: 150px;
        border: 1px dotted #ccc;
      }

      .upload_mark {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 500px;
        height: 150px;
        background-color: #ccc;
        color: #333;
        display: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="item">
        <h3>单一文件上传「FORM-DATA」</h3>
        <section class="upload_box" id="upload1">
          <input type="file" class="upload_inp" accept=".png,.jpg,.jpeg" />
          <div class="upload_button_box">
            <button class="upload_button select">选择文件</button>
            <button class="upload_button upload">上传到服务器</button>
          </div>
          <div class="upload_tip">
            只能上传 PNG/JPG/JPEG 格式图片，且大小不能超过2MB
          </div>
          <ul class="upload_list">
            <li>
              <span>文件：...</span>
              <span><em>移除</em></span>
            </li>
          </ul>
        </section>
      </div>

      <div class="item">
        <h3>单一文件上传[BASE64]，只适合图片</h3>
        <section class="upload_box" id="upload2">
          <input type="file" class="upload_inp" />
          <div class="upload_button_box">
            <button class="upload_button select">上传图片</button>
          </div>
          <div class="upload_tip">
            只能上传jpg/png格式图片，且大小不能超过2mb
          </div>
        </section>
      </div>

      <div class="item">
        <h3>单一文件上传[缩略图处理]</h3>
        <section class="upload_box" id="upload3">
          <input type="file" class="upload_inp" accept=".png,.jpg,.jpeg" />
          <div class="upload_button_box">
            <button class="upload_button select">选择文件</button>
            <button class="upload_button upload">上传到服务器</button>
          </div>
          <div class="upload_abbre">
            <img src="" alt="" />
          </div>
        </section>
      </div>

      <div class="item">
        <h3>单一文件上传[进度条处理]</h3>
        <section class="upload_box" id="upload4">
          <input type="file" class="upload_inp" accept=".png,.jpg,.jpeg" />
          <div class="upload_button_box">
            <button class="upload_button select">上传文件</button>
          </div>
          <div class="upload_progress">
            <div class="value"></div>
          </div>
        </section>
      </div>

      <div class="item">
        <h3>多文件上传</h3>
        <section class="upload_box" id="upload5">
          <!-- multiple可允许同时上传多个文件 -->
          <input
            type="file"
            class="upload_inp"
            multiple
            accept=".png,.jpg,.jpeg"
          />
          <div class="upload_button_box">
            <button class="upload_button select">上传文件</button>
            <button class="upload_button upload">上传到服务器</button>
          </div>
          <ul class="upload_list">
            <li>
              <span>文件：...</span>
              <span><em>移除</em></span>
            </li>
          </ul>
        </section>
      </div>

      <div class="item">
        <h3>拖拽上传</h3>
        <section class="upload_box" id="upload6">
          <input type="file" class="upload_inp" accept=".png,.jpg,.jpeg" />
          <div class="upload_drag">
            <i class="icon">拖到此处上传</i>
            <span class="text">
              将文件拖到此处，或
              <a href="javascript:;" class="upload_submit">点击上传</a>
            </span>
          </div>
          <div class="upload_mark">正在上传中，请稍等...</div>
        </section>
      </div>

      <div class="item">
        <h3>大文件上传</h3>
        <section class="upload_box" id="upload7">
          <input type="file" class="upload_inp" />
          <div class="upload_button_box">
            <button class="upload_button select">上传文件</button>
          </div>
          <div class="upload_progress">
            <div class="value"></div>
          </div>
        </section>
      </div>
    </div>

    <script src="./instance.js"></script>
    <script src="./upload.js"></script>
  </body>
</html>
```

#### canvas 压缩上传图片

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>canvas 压缩上传</title>
  </head>
  <body>
    <input type="file" id="upload" />
    <script>
      const upload = document.querySelector("#upload");

      const ACCEPT = ["image/jpg", "image/png", "image/jpeg"];
      const MAXSIZE = 5 * 1024 * 1024;
      const MAXSIZE_STR = "5MB";

      function convertImageToBase64(file, callback) {
        let render = new FileReader();
        render.addEventListener("load", function (e) {
          const base64Image = e.target.result;
          callback && callback(base64Image);
          render = null;
        });
        render.readAsDataURL(file);
      }

      // 使用canvas压缩图片
      function compress(base64Image, callback) {
        let maxW = 1024;
        let maxH = 1024;
        const image = new Image();
        image.addEventListener("load", function (e) {
          // 压缩比例
          let ratio;
          // 是否需要压缩
          let needCompress = false;
          // 最大宽度小于传入图片宽度，则需要压缩
          if (maxW < image.naturalWidth) {
            needCompress = true;
            ratio = image.naturalWidth / maxW;
            maxH = image.naturalHeight / ratio;
          }
          // 最大高度小于传入图片高度，则需要压缩
          if (maxW < image.naturalHeight) {
            needCompress = true;
            ratio = image.naturalHeight / maxH;
            maxW = image.naturalWidth / ratio;
          }
          // 不需要压缩
          if (!needCompress) {
            maxW = image.naturalWidth;
            maxH = image.naturalHeight;
          }
          // 创建canvas
          const canvas = document.createElement("canvas");
          canvas.setAttribute("id", "__compress__");
          canvas.width = maxW;
          canvas.height = maxH;
          canvas.style.visibility = "visible";
          document.body.appendChild(canvas);

          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, maxW, maxH);
          ctx.drawImage(image, 0, 0, maxW, maxH);
          // 使用toDataURL方法将图片压缩到0.9倍
          const compressImage = canvas.toDataURL("image/jpeg", 0.9);
          callback && callback(compressImage);

          // 开始，正常一下代码可以省略，这里是为了显示压缩前后对比
          const _image = new Image();
          _image.src = compressImage;
          document.body.append(_image);
          console.log(`图片压缩比是：${image.src.length / _image.src.length}`);
          // 结束，正常一下代码可以省略，这里是为了显示压缩前后对比

          canvas.remove();
        });
        image.src = base64Image;

        // 开始，正常一下代码可以省略，这里是为了显示压缩前后对比
        document.body.appendChild(image);
        // 结束，正常一下代码可以省略，这里是为了显示压缩前后对比
      }

      // 上传至服务器
      function uploadToServer(compressImage) {
        console.log("compressImage....uoload to Server", compressImage);
      }

      upload.addEventListener("change", function (e) {
        const [file] = e.target.files;
        if (!file) return;
        const { type: fileType, size: fileSize } = file;
        if (!ACCEPT.includes(fileType)) {
          alert(
            `只允许上传jpg、png、jpeg格式的图片，不支持${fileType}格式的图片`
          );
          upload.value = "";
          return;
        }
        if (fileSize > MAXSIZE) {
          alert(`文件超出${MAXSIZE_STR}`);
          upload.value = "";
          return;
        }
        // 使用canvas压缩图片
        convertImageToBase64(file, (base64Image) =>
          compress(base64Image, uploadToServer)
        );
      });
    </script>
  </body>
</html>
```
