// 基于formData实现文件上传
(function () {
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
})();

// 基于base64实现文件上传
(function () {
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
})();

// 文件缩略图并自己生成filename传给服务器（如果服务端不将传入的文件名处理成唯一的前提就需要前端自己生成唯一的filename）
(function () {
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
})();
