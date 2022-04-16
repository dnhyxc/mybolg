### WPS 加载项

#### 什么是 WPS OA 助手

WPS 加载项是一套基于 Web 技术用来扩展 WPS 应用程序的解决方案。每个 WPS 加载项都对应打开了一个网页，并通过调用网页中 JavaScript 方法来完成其功能逻辑。具体查看 [WPS 开发者文档](https://open.wps.cn/docs/client/wpsLoad)。

#### 加载项（WpsOAAssist）文件结构说明

- icon：图标文件。

- js：WPS 加载项功能逻辑的 js 代码。

- otherslib：vue 等第三方库。

- template：示例模板文件。

- importTemplate.html：导入模板页面。

- index.html：加载项的默认加载页面。

- qrcode.html：插入二维码页面。

- redhead.html：插入红头页面。

- selectBookmark.html：插入标签页面。

- selectSeal.html：插入签章页面。

- setUserName.html：修改默认用户名页面。

- ribbon.xml：自定义选项卡配置，即自定义功能区配置。遵循 **CustomUI** 标准。

#### 交互逻辑部分（wwwroot）结构说明

- file：所需要的各种文件模板。

- resource：web 页面相关页面及交互资源。

  - wps.js：唤起 wps 创建、编辑等交互逻辑所在区。

  - wpsjsrpcsdk.js：wps 开发者提供的通用 sdk。

  - index.html：web 端页面入口。

- uploaded：node 保存生成的 word 文档所在区。

#### 如何启动项目

在 `server` 文件目录下运行 `npm i` 安装所需要的包。安装好之后使用 `node StartupServer.js` 启动项目。

#### 使用加载项套红具体用法

如果需要套红，只需在 **\_WpsInvoke()** 方法下的 **OpenDoc** 属性中传入如下属性：

```js
const bookMarksStart = "正文内容B";
const bookMarksEnd = "正文内容E";

_WpsInvoke(
  [
    {
      // OpenDoc方法对应于OA助手dispatcher支持的方法名，我们不需要关心
      OpenDoc: {
        insertFileUrl: "http://xxxurl", // 套红模板
        bkInsertFileStart: bookMarksStart, // 套红开始标签
        bkInsertFileEnd: bookMarksEnd, // 套红结束标签
      },
    },
  ],
  true // 控制着通过页面执行WPS加载项方法，WPS的界面是否在执行时在前台显示
);
```

> 注意：bookMarksStart 和 bookMarksEnd 的属性值必须是 **正文内容 B**、**正文内容 E**。因为模板中设置的就是这两个值

#### 如何向 wps 中插入具体标签值

当需要插入新的标签属性时，只需要找到 `WpsOAAssist/js/commom/enum.js` 文件，添加需要新插入的标签值、并且需要在 **\_WpsInvoke()** 方法下的 **OpenDoc** 属性中在传入套红属性的基础上添加 **fieldObj** 属性：

- WpsOAAssist/js/commom/enum.js 内容：

```js
var fieldObjEnum = {
  标题: "title",
  文号: "refNo",
  // 紧急程度
  缓急: "urgencyLevel",
  // 密级
  密级: "secretClass",
  // 主送
  主送: "mainSend",
  // 抄送
  抄送: "copySend",
  签发人: "issUer",
  落款单位: "signingUnit",
  署名单位: "signatureUnit",
  签发日期: "issueDate",
  印发日期: "printDate",
  // 附件
  附件: "enclosure",
  // 起草人
  起草人: "creatPerson",
  // 部门
  部门: "department",
  // 发文单位
  发文单位: "units",
};
```

- fieldObj 传参方式：

```js
_WpsInvoke(
  [
    {
      OpenDoc: {
        insertFileUrl: "http://xxxurl", // 套红模板
        bkInsertFileStart: bookMarksStart, // 套红开始标签
        bkInsertFileEnd: bookMarksEnd, // 套红结束标签
        // 自定义传入wps中的参数
        params: {
          fieldObj, // 需要插入的各种标签属性
        },
      },
    },
  ],
  true
);
```

- fieldObj 属性中个参数类型说明：

```js
const fieldObj = {
  copySend: "区公司各部门，各市公司，FF融安公司，FF人力资源部",
  creatPerson: "李芙蓉",
  enclosure: [
    {
      downloadUrl: "xxx",
      key: "0dsad1",
      mimeType: "xxx",
      name: "xxx",
      size: 29191,
      url: "xxxurl",
    },
  ],
  fileDepartment: '{"id":530051,"name":"区公司/人力资源部"}',
  issUer: "xxx",
  issueDate: "2022/04/14",
  mainSend: "区公司各部门，FF融安公司，各市公司，FF人力资源部",
  outsideRefNo: "测试机关代字20226817号",
  printDate: "签发日期",
  refNo: "测试机关代字20226817号",
  secretClass: "普通商密",
  signatureUnit: "xxx",
  signingUnit: "署名区公司人力资源部",
  title: "取个名字真的难",
  urgencyLevel: "特急",
};
```

#### 进入 WPS 编辑自动开启修订

只需在 **\_WpsInvoke()** 方法下的 **OpenDoc** 属性中传入如下参数即可：

- \_WpsInvoke 和 OpenDoc 是 WPS 源码暴露出来的方法，开发者无需关心。

```js
_WpsInvoke(
  [
    {
      OpenDoc: {
        // 默认开启修订
        revisionCtrl: {
          bOpenRevision: true,
          bShowRevision: true,
        },
      },
    },
  ],
  true
);
```

#### 禁用加载项中的按钮

只需要在 **\_WpsInvoke()** 方法下的 **OpenDoc** 属性中传入如下参数即可：

- disabledBtns：该字段用于设置哪些加载项按钮需要被禁用。如果不传则所有按钮都不禁用。

```js
_WpsInvoke(
  [
    {
      OpenDoc: {
        disabledBtns:
          "btnOpenRevision,btnCloseRevision,btnAcceptAllRevisions,btnRejectAllRevisions",
      },
    },
  ],
  true
);
```

> disabledBtns 字段必须传入字符串形式，其中每个字段之间必须以逗号(,)相隔。

#### 隐藏加载项按钮

只需要在 **\_WpsInvoke()** 方法下的 **OpenDoc** 属性中传入如下参数即可：

- buttonGroups：该字段用于设置哪些加载项按钮需要被隐藏。如果不传则所有按钮都显示。

```js
_WpsInvoke(
  [
    {
      OpenDoc: {
        buttonGroups:
          "btnOpenRevision,btnCloseRevision,btnAcceptAllRevisions,btnRejectAllRevisions",
      },
    },
  ],
  true
);
```

> buttonGroups 字段必须传入字符串形式，其中每个字段之间必须以逗号(,)相隔。

#### 自定义使用方式

通过改自定义方法可以实现正文套红、标签插入、默认开启修订、禁用修订等一系列需求：

```js
function customDoc() {
  const uploadPath = GetUploadPath();

  const uploadFieldName = "dnhyxc";

  const fileList = [];

  const fieldObj = {
    title: "瞧好了，标题插入了",
    mainSend: "WOWOWOW",
    copySend: "DNHYXC",
    issUer: "签发人",
    signingUnit: "落款单位",
    signatureUnit: "署名单位",
    issueDate: "签发日期",
    printDate: "印发日期",
    creatPerson: "dnhyxc",
    refNo: "2020[0902]号",
    urgencyLevel: "紧急",
    secretClass: "密级1",
    department: "高级的前端部门",
    units: "发文单位",
  };

  const bookMarksStart = "正文内容B";

  const bookMarksEnd = "正文内容E";

  const dealDescription = `创建【套红正文】文件`;

  _WpsInvoke(
    [
      {
        OpenDoc: {
          docId: "902209",
          uploadPath: uploadPath, // 保存文档上传接口
          fileName: "",
          newFileName: "问号名称.docx",
          uploadFieldName: uploadFieldName,
          insertFileUrl: GetDemoPath("wps广西移动公司部门会议纪要.doc"),
          bkInsertFileStart: bookMarksStart,
          bkInsertFileEnd: bookMarksEnd,
          bodyTemplateUrl: "",
          userName: "dnhyxc",
          suffix: ".pdf",
          uploadWithAppendPath: "1",

          // 默认开启修订
          revisionCtrl: {
            bOpenRevision: true,
            bShowRevision: true,
          },

          params: {
            isNew: true,
            id: parseInt(Math.random() * 100),
            orgId: "902209",
            docId: 123456789,
            file: undefined,
            index: -1,
            list: fileList || [],
            operType: 4,
            dealDescription,
            fieldObj,
          },
          openType: {
            // 文档打开方式
            // 文档保护类型，-1：不启用保护模式，0：只允许对现有内容进行修订，
            // 1：只允许添加批注，2：只允许修改窗体域(禁止拷贝功能)，3：只读
            protectType: -1,
            // protectType: downloadParams ? 0 : -1,
            // password: '123456',
          },
          // 屏蔽功能按钮, 不传则显示所有操作按钮，如果传入对应的按钮，那么传入的这些按钮将不会在加载项中显示。注意每个按钮之间需要用逗号分隔，btnImportTemplate 这个些参数是 ribbon.xml 中 button 所对应的 id
          buttonGroups:
            "btnImportTemplate,btnInsertBookmark,btnChangeToPDF,btnChangeToUOT,btnChangeToOFD",

          // 禁用加载项按钮
          disabledBtns:
            "btnOpenRevision,btnCloseRevision,btnAcceptAllRevisions,btnRejectAllRevisions",
        },
      },
    ],
    true
  ); // OpenDoc方法对应于OA助手dispatcher支持的方法名
}
```

#### 增加自定义加载项按钮

- 在 ribbon.xml 中增加自定义按钮，具体如下：

```html
<group id="grpOAExtend" label="扩展功能组" getVisible="OnGetVisible">
  <button
    id="customBtn"
    label="自定义按钮"
    getLabel="OnGetLabel"
    onAction="OnAction"
    getEnabled="OnGetEnabled"
    getVisible="OnGetVisible"
    getImage="GetImage"
    size="large"
  />
  <separator id="sepOAExtend" getVisible="OnGetVisible" />
</group>
```

- 并且需要在 `WpsOAAssist` 中增加自定义加载项对应的页面 `custom.html`。同时可以在该页面进行接口请求、页面交互等。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>导入模板</title>
    <meta charset="UTF-8" />
    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="otherslib/lib/vue.min.js"></script>
    <style type="text/css">
      * {
        box-sizing: border-box;
      }

      /*清除浮动*/
      .clear:after {
        content: "";
        display: block;
        clear: both;
      }

      html,
      body,
      #template {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }

      .row {
        width: 100%;
        border-top: 2px solid #e7e7e7;
      }

      .row > div {
        height: 100%;
      }

      #file_select {
        width: 100%;
        padding-left: 5%;
      }

      .def_control {
        height: 55%;
        width: 100%;
        font-size: 18px;
      }

      .btn_box {
        width: 16%;
        float: right;
        line-height: 4.5em;
        margin-right: 3%;
      }
    </style>
  </head>

  <body>
    <div id="template">
      <div class="row" style="height: 50%; padding-top: 3%">
        <div id="file_select">我是自定义弹窗，想做什么自己定</div>
      </div>
      <div class="row" style="height: 50%">
        <div class="btn_box">
          <button class="def_control" type="button" @click="cancel()">
            取消
          </button>
        </div>
        <div class="btn_box">
          <button class="def_control" type="button" @click="onCustomClick()">
            确定
          </button>
        </div>
      </div>
    </div>
  </body>
</html>
<script>
  function onCustomClick() {
    window.opener = null;
    window.open("", "_self", "");
    window.close();
  }

  function cancel() {
    // 取消按钮
    window.close();
  }

  var vm = new Vue({
    el: "#template",
    data: {
      templateItem: -1,
      templates: {},
    },
    methods: {},
    mounted: function () {
      this.onCustomClick();
    },
  });
</script>
```

- 设置自定义按钮图标需要找到 `commom/func_tabcontrol.js` 中的 **GetImage()** 方法进行设置。

- 设置自定义按钮文本需要找到 `commom/func_tabcontrol.js` 中的 **OnGetLabel()** 方法进行设置。

- 唤起自定义页面需要找到 `commom/func_tabcontrol.js` 中的 **OnAction()** 方法进行设置。

#### 在实际项目中唤起 WPS 的方法

在需要唤起 WPS 的页面中调用根目录下 `wpsutils/wps.js` 文件中的 **outWpsEdit()** 方法即可唤起 WPS。方法具体如下：

```js
/**
 * 打开外部 WPS 程序在线编辑
 * @export
 * @param {object} params 在线编辑需要的信息
 * @param {object[]} params.fileList 文件信息对象数组
 * @param {number} params.index 文件所在值中的索引
 * @param {string|number} params.id 公文ID
 * @param {boolean} params.isNew 是否是新建公文
 * @param {object} params.fieldObj 字段对象
 * @param {string} params.insertFileUrl 红头模板 URL
 * @param {Function} callback 回调函数
 */
export function outWpsEdit(params = {}, callback) {
  const {
    fileList = [],
    index,
    id,
    isNew,
    fieldObj,
    insertFileUrl = "",
    bodyTemplateUrl = "",
  } = params || {};

  const isCreate = index < 0;
  if (!isCreate && fileList.length === 0) {
    return;
  }

  const currentFile = fileList[index];

  if (!isCreate && !currentFile) {
    return;
  }

  if (!isCreate && !["doc", "docx"].includes(currentFile.type)) {
    message.error("非 word 文档不可在线编辑");
    return;
  }

  startOutWps(() => {
    const {
      originalUrl,
      noRedHeadOriginalUrl,
      type,
      name: fileName,
    } = currentFile || {};

    const newFileName = "正文.docx";

    const operType = isCreate ? OPER_TYPE.CREATE : OPER_TYPE.MODIFY_FILE;

    const dealDescription = isCreate
      ? `创建【${newFileName}】文件`
      : `修改【${currentFile.name}】文件`;

    const editUrl = noRedHeadOriginalUrl || originalUrl;

    wpsMask.init(true);

    openDoc(
      {
        isNew, // 是否是新建
        orgId: getOrgId(),
        docId: 123456789,
        userName: getUserName(),
        filePath: isCreate
          ? undefined
          : `${editUrl}&contenttype=${mimeTypeMap[type]}`, // 需要编辑文件的路径
        fileName,
        newFileName,
        bodyTemplateUrl, // 正文模板url
        insertFileUrl, // 套红模板路径
        templateDataUrl: "/access/DocumentMoaSetting/getBodyFileList", // 获取正文模板的接口，在WPS加载项导入模板页面使用
        uploadPath: "/sfs/webUpload/file", // wps保存上传路径
        // 自定义传入wps中的参数
        params: {
          id,
          orgId: getOrgId(),
          file: isCreate ? undefined : currentFile,
          index,
          list: fileList || [],
          operType, // create: 4 mod: 12
          dealDescription,
          isNew,
          fieldObj, // 需要插入wps中的各种标签值
        },
      },
      {
        open: (docId) => {
          const fileMap = Cookies.getJSON(WPSFileMap) || {};
          fileMap[index] = docId;
          Cookies.set(WPSFileMap, fileMap);
        }, // 打开wps时触发
        save: (res, features = {}) => {
          const { id: gId, list } = res;
          callback(gId, list);
        }, // 保存时触发
        exit: (docId) => {
          const fileMap = Cookies.getJSON(WPSFileMap);
          if (!fileMap) {
            return;
          }
          for (const i in fileMap) {
            if (fileMap[i] === docId) {
              delete fileMap[i];
              Cookies.set(WPSFileMap, fileMap);
              return;
            }
          }
        }, // 关闭时触发
      }
    );
  }, true); // 控制着通过页面执行WPS加载项方法，WPS的界面是否在执行时在前台显示
}
```

#### outWpsEdit() 方法的调用方式

参数说明：

- index：index 为 -1 为创建新文档。大于 -1 则为编辑文档。

- bodyTemplateUrl：正文模板 url。

```js
const onWpsEdit = (index = -1, bodyTemplateUrl = "") => {
  let fieldObj = {}; // 需要插入的标签内容

  validateFieldsAndScroll((err, values) => {
    const res = getFieldsValue(formDataSource, values);
    const allFields = getWpsFieldValue(res);
    fieldObj = getFileObjValue(
      allFields,
      deptId,
      fullDepartment,
      eventTimeList
    );
  });

  // 过滤出对应的套红模板
  const chooseTemplate =
    redheadTemplates.length &&
    redheadTemplates.filter((i) => i.file.childType === 1);

  const fileInfo = chooseTemplate[0] ? chooseTemplate[0].file : "";

  const params = {
    fileList, // 如果为创建，传空数组
    index,
    id,
    isCreate,
    fieldObj,
    isNew: isCreate,
    insertFileUrl: fileInfo.url,
    bodyTemplateUrl,
  };

  outWpsEdit(params, fileChange);
};

// wps 保存回调
const fileChange = (gId, newList = []) => {
  const newFileList = [];
  if (gId !== id) {
    message.warning("当前WPS中编辑文档不属于当前公文！");
    return;
  }
  if (newList.length) {
    newFileList.push(...newList);
    setFieldsValue({
      bodyFile: newFileList,
    });
    setFileList(newFileList);
  }
  if (onChange) {
    onChange(newFileList);
  }
  message.success("WPS保存成功！");
};
```

#### 项目中打包 WPS 加载项

在 `webpack.config.js` 中 增加如下配置：

```js
const plugins = [
  new CopyWebpackPlugin([
    {
      from: "node_modules/pdfjs-dist-show-signature/cmaps/",
      to: "cmaps/",
    },
    {
      from: "lib/WpsOAAssist",
      to: "WpsOAAssist/",
    },
  ]),
];

if (!isDev && !isTest) {
  output.library = toCamelCase(appName);
  output.libraryTarget = "var";
  plugins.push(
    ...[
      new RuntimePublicPathPlugin({
        runtimePublicPath: `"//" + window._APP_CONFIG.domain + "/web/new-web/${appName}/${version}/"`,
      }),
      new webpack.DefinePlugin({
        CMAPS_URL: `"//" + window._APP_CONFIG.domain + "/web/new-web/${appName}/${version}/cmaps/"`,
        APP_NAME: `'${appName}'`,
        STATIC_PREFIX: `"//" + window._APP_CONFIG.domain + "/web/new-web/${appName}/${version}/"`,
      }),
    ]
  );
} else {
  plugins.push(
    ...[
      new HtmlWebpackBeforeCompilerPlugin({
        isBaas: true,
      }),
      new webpack.DefinePlugin({
        CMAPS_URL: "/cmaps/",
        APP_NAME: `'${appName}'`,
        STATIC_PREFIX: `'//${runtimeEnv.devHostname}:${PORT}/'`,
      }),
    ]
  );
}
```
