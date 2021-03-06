---
title: WPS OA 助手开发
date: 2022-05-02 21:06:16
toc: true
tags: WPS
declare: true
categories:
  - WPS OA 助手
  - WPS 加载项
---

### WPS OA 助手

#### 什么是 WPS OA 助手

WPS 加载项是一套基于 Web 技术用来扩展 WPS 应用程序的解决方案。每个 WPS 加载项都对应打开了一个网页，并通过调用网页中 JavaScript 方法来完成其功能逻辑。 WPS 加载项打开的网页可以直接与 WPS 应用程序进行交互，同时一个 WPS 加载项中的多个网页形成了一个整体， 相互之间可以进行数据共享。 开发者不必关注浏览器兼容的问题，因为 WPS 加载项的底层是以 Chromium 开源浏览器项目为基础进行的优化扩展。 WPS 加载项具备快速开发、轻量化、跨平台的特性，目前已针对 Windows/Linux 操作系统进行适配。 WPS 加载项功能特点如下:

- 完整的功能。可通过多种不同的方法对文档、电子表格和演示文稿进行创作、格式设置和操控；通过鼠标、键盘执行的操作几乎都能通过 WPS 加载项 完成；可以轻松地执行重复任务，实现自动化。

<!-- more -->

- 三种交互方式。自定义功能区，采用公开的 CustomUI 标准，快速组织所有功能；任务窗格，展示网页，内容更丰富；Web 对话框，结合事件监听，实现自由交互。

- 标准化集成。不影响 JavaScript 语言特性，网页运行效果和在浏览器中完全一致；WPS 加载项开发文档完整，接口设计符合 JavaScript 语法规范，避免不必要的学习成本，缩短开发周期。

> 具体可查看 [WPS 开发者文档](https://open.wps.cn/docs/client/wpsLoad)。

#### 具体项目中能用 WPS OA 助手做什么？

在实际项目中，我们可以使用 WPS OA 助手实现如下需求：

- 点击页面中的按钮唤起本地 WPS 进行文档的创建、编辑。

- 打开 WPS 进行文档创建或编辑时，默认开启修订、修订记录等功能。

- 为文档进行套红操作（给文档套上用户传入的指定红头模板，下文将会集体介绍）。还能将收集到的用户填写的表单内容插入到模板对应的标签中，这个下文也将着重介绍。

- 文档自动排版，即为新建或编辑的文档设置字体样式、字体大小、首行缩进、清除复制内容原有的格式（如：复制有底色文本，会将底色带入到正在编辑的文档中）等等格式设置。

- 还能自定义 WPS 加载项的按钮、增加按钮对应的弹窗页面，同时还能禁用、隐藏加载项按钮。具体将在下文中介绍。

目前，我只用 WPS OA 助手实现过如上这些能力，如果各位读者有实现过其它能力，欢迎大家向我指出，我们共同学习。

#### 使用加载项套红具体用法

WPS 套红指的是使用 WPS 给文档套用指定的红头模板。当前 demo 的实现方式是在文档编辑完成保存时自动为文档套用红头。

![红头模板](redHeadTemplate.png)

要给文档套红，用户只需在 **\_WpsInvoke()** 方法下的 **OpenDoc** 属性中传入如下属性：

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
        bkInsertFileEnd: bookMarksEnd // 套红结束标签
      }
    }
  ],
  true // 控制着通过页面执行WPS加载项方法，WPS的界面是否在执行时在前台显示
);
```

> 注意：bookMarksStart 和 bookMarksEnd 的属性值必须是 **正文内容 B**、**正文内容 E**。因为模板中设置的就是这两个值

WPS 套红，具体实现源码如下：

```js
function InsertRedHead(params) {
  var wpsApp = wps.WpsApplication();
  var activeDoc = wpsApp.ActiveDocument;
  if (!activeDoc) {
    alert("文档不存在，请先新建一个文档!");
    return;
  }

  var bookmarkStart = GetDocParamsValue(doc, constStrEnum.bkInsertFileStart);
  var bookmarkEnd = GetDocParamsValue(doc, constStrEnum.bkInsertFileEnd);
  var strFile = GetParamsValue(params, constStrEnum.insertFileUrl);
  if (strFile == "") {
    alert("未获取到传入的红头模板URL路径，不能正常套红");
    return;
  }

  if (bookmarkStart == "" || bookmarkEnd == "") {
    alert("未获取到传入的正文书签，不能正常套红");
    return;
  }
  pInsertRInedHead(activeDoc, strFile, bookmarkStart, bookmarkEnd);
}

function pInsertRInedHead(doc, strFile, bookmarkStart, bookmarkEnd) {
  var bookMarks = doc.Bookmarks;
  if (bookMarks.Item("quanwen")) {
    // 当前文档存在"quanwen"书签时候表示已经套过红头
    // alert("当前文档已套过红头，请勿重复操作!");
    pInsertRInedField(doc); // 自定义增加该方法
    return;
  }

  var wpsApp = wps.WpsApplication();
  var activeDoc = wpsApp.ActiveDocument;
  var selection = wpsApp.ActiveWindow.Selection;
  // 准备以非批注的模式插入红头文件(剪切/粘贴等操作会留有痕迹,故先关闭修订)
  activeDoc.TrackRevisions = false;
  selection.WholeStory(); //选取全文
  bookMarks.Add("quanwen", selection.Range);
  selection.Cut();
  selection.InsertFile(strFile);

  if (bookMarks.Exists(bookmarkStart) && bookMarks.Exists(bookmarkEnd)) {
    var insertRang = [];
    // 计算开始位置
    var bookmarkStartItem = bookMarks.Item(bookmarkStart);
    insertRang[0] = bookmarkStartItem.Range.End;

    // 计算结束位置
    var bookmarkEndItem = bookMarks.Item(bookmarkEnd);
    insertRang[1] = bookmarkEndItem.Range.Start;

    selection.Start = insertRang[0];
    selection.End = insertRang[1];
    selection.Select();

    var s = activeDoc.ActiveWindow.Selection;
    s.Paste();

    // 标识插入红头成功
    wps.PluginStorage.setItem(constStrEnum.InsertReding, 2);
  } else {
    alert(
      "套红头失败，您选择的红头模板没有对应书签：" +
        bookmarkStart +
        ", " +
        bookmarkEnd
    );
  }

  // 该方法用于给红头模板中插入对应的书签内容
  pInsertRInedField(doc);

  // 恢复修订模式(根据传入参数决定)
  var l_revisionCtrl = GetDocParamsValue(activeDoc, constStrEnum.revisionCtrl);
  activeDoc.TrackRevisions =
    l_revisionCtrl == "" ? false : l_revisionCtrl.bOpenRevision;
  //取消WPS关闭时的提示信息
  wps.WpsApplication().DisplayAlerts = (wps.Enum && wps.Enum.wdAlertsNone) || 0;
}
```

#### 向 WPS 红头模板中插入对应标签值

由于红头模板中可能会配置各种标签属性，这些标签属性就需要在套用红头模板时将标签对应的标签值插入到对应的标签位置。上图灰色块就是各个标签所在的位置。当插入对应的标签值时，灰色块就会被插入的标签值所替换。比如：**标签 1** 灰色块就会替换成 **插入的标签 1 的值**，如下图所示。

![标签有值的红头模板](redHeadContent.png)

当需要插入新的标签属性时，用户只需要找到 `WpsOAAssist/js/commom/enum.js` 文件，添加需要新插入的标签值、并且需要在 **\_WpsInvoke()** 方法下的 **OpenDoc** 属性中在传入套红属性的基础上添加 **fieldObj** 属性：

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
  发文单位: "units"
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
          fieldObj // 需要插入的各种标签属性
        }
      }
    }
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
      url: "xxxurl"
    }
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
  urgencyLevel: "特急"
};
```

#### 设置 WPS 页边距

设置页边距需要通过如下方式进行设置：

```js
const wpsApp = wps.WpsApplication();
const selection = wpsApp.ActiveWindow.Selection;
selection.Range.PageSetup.LeftMargin = 71.999428; // 设置左边距为 2.54
selection.Range.PageSetup.RightMargin = 71.999428; // 设置左边距为 2.54
```

设置页边距具体用法：

- 唤起 WPS 新建文档时设置左右页边距：

```js
function NewFile(params) {
  const wpsApp = wps.WpsApplication();
  wps.PluginStorage.setItem(constStrEnum.IsInCurrOADocOpen, true); // 设置OA打开文档的临时状态
  let doc;
  if (params.isOfficialDocument) {
    wps.Application.GetApplicationEx().NewOfficialDocument(); // 新增使用公文写作打开的公文
    doc = wpsApp.ActiveDocument;
  } else {
    doc = wpsApp.Documents.Add(); // 新增OA端文档
  }

  // 新建时更改页边距
  const selection = wpsApp.ActiveWindow.Selection;
  selection.Range.PageSetup.LeftMargin = 71.999428; // 设置左边距为 2.54
  selection.Range.PageSetup.RightMargin = 71.999428; // 设置左边距为 2.54

  // 以下代码省略...
}
```

- 唤起 WPS 编辑文档时设置左右页边距：

```js
function OpenFile(params) {
  // 以上代码省略...

  // 更新正文时更改页边距
  const wpsApp = wps.WpsApplication();
  const selection = wpsApp.ActiveWindow.Selection;
  selection.Range.PageSetup.LeftMargin = 71.999428; // 设置左边距为 2.54
  selection.Range.PageSetup.RightMargin = 71.999428; // 设置左边距为 2.54

  // 以下代码省略...
}
```

> 说明：设置页边距时必须确保此时 **doc** 对象已经存在。

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
          bShowRevision: true
        }
      }
    }
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
          "btnOpenRevision,btnCloseRevision,btnAcceptAllRevisions,btnRejectAllRevisions"
      }
    }
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
          "btnOpenRevision,btnCloseRevision,btnAcceptAllRevisions,btnRejectAllRevisions"
      }
    }
  ],
  true
);
```

> buttonGroups 字段必须传入字符串形式，其中每个字段之间必须以逗号(,)相隔。

#### WPS 保存输出不同的文件格式

使用 WPS 可以保存输出不同的文件格式，比如我们可以保存出 pdf、doc、html 等文件格式。要使 WPS 能保存出对应的文件格式就需要设置如下属性：

- 保存输出 pdf 及 doc 时，只需要在 **\_WpsInvoke()** 方法下的 **OpenDoc** 属性中传入如下参数：

```js
_WpsInvoke(
  [
    {
      OpenDoc: {
        suffix: ".pdf",
        uploadWithAppendPath: "1"
      }
    }
  ],
  true
); // OpenDoc方法对应于OA助手dispatcher支持的方法名
```

- 保存输出 html 时，相对比较麻烦，需要将 `handleFileAndUpload()` 方法中的 `doc.SaveAs2()` 方法的第二个参数设置为 **8**，同时也需要在 **\_WpsInvoke()** 方法下的 **OpenDoc** 属性中传入 `suffix: ".html"` 参数。

```js
_WpsInvoke(
  [
    {
      OpenDoc: {
        suffix: ".html",
        uploadWithAppendPath: "1"
      }
    }
  ],
  true
);
```

`handleFileAndUpload()` 方法具体需要更改的代码如下：

```js
function handleFileAndUpload(suffix, doc, uploadPath, FieldName, saveType = 1) {
  var l_strChangeFileName = ""; // 转换格式后的文件名称
  var l_strPath = ""; // 转换格式后的文件路径
  var l_FieldName = FieldName;
  if (!doc) return false;
  if (!l_FieldName) {
    l_FieldName = "file"; //默认情况下，设置为 file 字段名称
  }
  var l_DocSourcePath = doc.FullName; //保留当前文档明，在SaveAs使用后再保存回原来的文件明
  //根据传入的 后缀文件名称进行不同的转换文档操作
  switch (suffix.toLocaleLowerCase()) {
    case ".pdf":
      l_strPath = pGetValidDocTempPath(doc) + ".pdf"; //获取有效输出路径

      wps.FileSystem.Remove(l_strPath); //先删除之前可能存在的临时文件
      doc.ExportAsFixedFormat(
        l_strPath,
        (wps.Enum && wps.Enum.wdFormatPDF) || 17,
        true
      ); //文档另存为PDF格式
      l_strChangeFileName = doc.Name.split(".")[0] + ".pdf";
      UploadFile(
        l_strChangeFileName,
        l_strPath,
        uploadPath,
        l_FieldName,
        OnChangeSuffixUploadSuccess,
        OnChangeSuffixUploadFail,
        // 更改：传入saveType字段
        saveType
      );
      break;

    // 此处省略其他格式代码，具体可看源码...
    default: //先删除之前可能存在的临时文件
      //保存回原来的文档内容
      l_strPath = pGetValidDocTempPath(doc) + suffix;
      wps.FileSystem.Remove(l_strPath);
      // 此处就是具体更改SaveAs2保存出html文件的所在处
      doc.SaveAs2(l_strPath, 8);
      l_strChangeFileName = doc.Name.split(".")[0] + suffix;
      UploadFile(
        l_strChangeFileName,
        l_strPath,
        uploadPath,
        l_FieldName,
        OnChangeSuffixUploadSuccess,
        OnChangeSuffixUploadFail,
        // 更改：传如saveType字段
        saveType
      );
      doc.SaveAs2(l_DocSourcePath);
      break;
  }
  wps.FileSystem.Remove(l_strPath); //上载完成后，删除临时文件
  return true;
}
```

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
    units: "发文单位"
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
            bShowRevision: true
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
            fieldObj
          },
          openType: {
            // 文档打开方式
            // 文档保护类型，-1：不启用保护模式，0：只允许对现有内容进行修订，
            // 1：只允许添加批注，2：只允许修改窗体域(禁止拷贝功能)，3：只读
            protectType: -1
            // protectType: downloadParams ? 0 : -1,
            // password: '123456',
          },
          // 屏蔽功能按钮, 不传则显示所有操作按钮，如果传入对应的按钮，那么传入的这些按钮将不会在加载项中显示。注意每个按钮之间需要用逗号分隔，btnImportTemplate 这个些参数是 ribbon.xml 中 button 所对应的 id
          buttonGroups:
            "btnImportTemplate,btnInsertBookmark,btnChangeToPDF,btnChangeToUOT,btnChangeToOFD",

          // 禁用加载项按钮
          disabledBtns:
            "btnOpenRevision,btnCloseRevision,btnAcceptAllRevisions,btnRejectAllRevisions"
        }
      }
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
      templates: {}
    },
    methods: {},
    mounted: function () {
      this.onCustomClick();
    }
  });
</script>
```

- 设置自定义按钮图标需要找到 `commom/func_tabcontrol.js` 中的 **GetImage()** 方法进行设置。

- 设置自定义按钮文本需要找到 `commom/func_tabcontrol.js` 中的 **OnGetLabel()** 方法进行设置。

- 唤起自定义页面需要找到 `commom/func_tabcontrol.js` 中的 **OnAction()** 方法进行设置。

#### 导入正文模板实现示例

- ribbon.xml：

```html
<group id="grpOAExtend" label="扩展功能组" getVisible="OnGetVisible">
  <button
    id="btnImportTemplate"
    label="导入模板"
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

- importTemplate.html：

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
        height: calc(100% - 10px);
      }

      .row {
        width: 100%;
        height: 100%;
        margin-top: 10px;
        padding-top: 20px;
        border-top: 1px solid #e7e7e7;
      }

      .action {
        position: absolute;
        bottom: 2px;
        right: 0;
        width: 100%;
        border-top: 1px solid #e7e7e7;
      }

      .row > div {
        height: 100%;
      }

      #file_select {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        padding: 0 20px;
        height: 32px;
      }

      .def_control {
        flex: 1;
        height: 32px;
        font-size: 16px;
        color: #333;
      }

      .placeholder {
        color: #9c9c9c;
      }

      .btn_box {
        width: 88px;
        float: right;
        line-height: 4.5em;
        margin-right: 20px;
      }

      .action_btn {
        width: 100%;
        height: 32px;
        background: #fff;
        outline: none;
        border: 1px solid #ccc;
        cursor: pointer;
        border-radius: 4px;
      }

      .require {
        background: #1e90ff;
        color: #fff;
      }
    </style>
  </head>

  <body>
    <div id="template">
      <div class="row" style="height: 50%; padding-top: 3%">
        <div id="file_select">
          <span>文件名：</span>
          <select
            class="def_control"
            style="width: 100%"
            v-model="templateItem"
          >
            <option value="-1" class="placeholder">请选择模板</option>
            <option
              v-for="(item, key) in templates"
              :value="item.tempId"
              :key="key"
            >
              {{item.name}}
            </option>
          </select>
        </div>
      </div>
      <div class="action">
        <div class="btn_box">
          <button class="action_btn" type="button" @click="cancel()">
            取消
          </button>
        </div>
        <div class="btn_box">
          <button
            class="action_btn require"
            type="button"
            @click="OnImportTemplate()"
          >
            导入
          </button>
        </div>
      </div>
    </div>
  </body>
</html>
<script>
  /**
   * 导入公文模板，并替换当前文档全部内容
   * @param templateURL  模板路径
   */
  function importTemplateFile(templateURL) {
    var wpsApp = wps.WpsApplication();
    var activeDoc = wpsApp.ActiveDocument;
    if (!activeDoc) {
      alert("文档不存在");
      return;
    }
    var selection = wpsApp.ActiveWindow.Selection;
    selection.WholeStory(); //选取全文
    selection.Delete(); // 删除选中内容
    selection.InsertFile(templateURL);
    if (activeDoc.Revisions.Count > 0) {
      // 文档或区域中的修订
      activeDoc.AcceptAllRevisions(); // 接受对指定文档的所有修订
    }
  }

  const mimeTypeMap = {
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  };

  // 获取选中项，拼接模板Url进行导入模板
  function OnImportTemplate() {
    var templateId = vm.templateItem;
    var curTemp = vm.templates[templateId];
    console.log(curTemp, "curTemp");
    if (templateId == -1) {
      alert("请选中模板!!");
      return;
    }
    if (!curTemp.url) {
      alert("请选中模板!!");
      return;
    }
    const [_, type] = curTemp.name.match(/.([^.]+)$/i) || [];

    // 当后端返回的url为：http://xxxxjsnhgxv 这种类型的url时需要拼接contenttype
    // const templateUrl = `${curTemp.url}&contenttype=${mimeTypeMap[type]}`;

    importTemplateFile(curTemp.url);
    window.opener = null;
    window.open("", "_self", "");
    window.close();
    wps.OAAssist.ShellExecute("ksowebstartupwps://");
  }

  function cancel() {
    // 取消按钮
    window.close();
    wps.OAAssist.ShellExecute("ksowebstartupwps://"); // 将WPS程序置前
  }

  var vm = new Vue({
    el: "#template",
    data: {
      templateItem: -1,
      templates: []
    },
    methods: {
      GetTemplatePath(templateDataUrl) {
        var url = document.location.host;
        return document.location.protocol + "//" + url + templateDataUrl;
      },

      getAllTemplate: function () {
        var _this = this;
        // 通过接口拉取模板列表
        var p_Doc = wps.WpsApplication().ActiveDocument;
        var l_params = GetDocParamsValue(p_Doc, "params");
        var templateDataUrl = GetDocParamsValue(p_Doc, "templateDataUrl");
        if (!templateDataUrl) {
          alert("获取正文模板失败！");
          return;
        }
        $.ajax({
          url: templateDataUrl,
          async: false,
          method: "post",
          dataType: "json",
          success: function (res) {
            _this.templates = res.data;
          },
          error: function (res) {
            alert("获取响应失败");
            _this.templates = [];
          }
        });
      }
    },
    mounted: function () {
      this.getAllTemplate();
    }
  });
</script>
```

- node 模拟服务端接口代码如下：

```js
app.post("/getTemplateData", function (request, response) {
  const luxun = path.join(
    __dirname,
    "./wwwroot/file/bodyFileTemplate/luxun.doc"
  );
  const lizhi = path.join(
    __dirname,
    "./wwwroot/file/bodyFileTemplate/lizhi.doc"
  );
  const weimei = path.join(
    __dirname,
    "./wwwroot/file/bodyFileTemplate/weimei.doc"
  );
  response.send({
    data: [
      {
        tempId: 1,
        name: "当代周树人.doc",
        url: luxun
      },
      {
        tempId: 2,
        name: "励志.doc",
        url: lizhi
      },
      {
        tempId: 1,
        name: "唯美.doc",
        url: weimei
      }
    ]
  });
});
```

- 在 resource/wps.js 中的 **\_WpsInvoke** 方法中需要传入 **templateDataUrl** 参数：

```js
function insertRedHead() {
  // 省略代码...
  _WpsInvoke(
    [
      {
        OpenDoc: {
          // 省略代码...
          templateDataUrl: "/getTemplateData"
        }
      }
    ],
    true
  );
}
```

> [完成代码可点击此处查看](https://github.com/dnhyxc/WPS_OA_Assistant/blob/bfdde0918fc931b0c842fa2fee3ddadeb3de670e/server/wwwroot/resource/js/wps.js#L424)

#### 自动排版实现

在 `ribbon.xml` 中增加一个自定义的自动排版按钮，具体实现如下：

```html
<group id="grpRevision" label="自动排版功能组" getVisible="OnGetVisible">
  <button
    id="formatDoc"
    label="自动排版"
    onAction="OnAction"
    getLabel="OnGetLabel"
    getEnabled="OnGetEnabled"
    getVisible="OnGetVisible"
    getImage="GetImage"
    size="large"
  />
  <separator id="sepWPSRevision" getVisible="OnGetVisible" />
</group>
```

> 上述 `OnAction`、`OnGetLabel`、`OnGetEnabled`、`OnGetVisible`、`GetImage` 事件需要在 `func_tabcontrol.js` 中实现具体逻辑。

在 `func_tabcontrol.js` 中的 **OnAction** 方法中实现自动排版的点击事件：

```js
function OnAction(control) {
  // 省略代码...
  switch (eleId) {
    case "formatDoc": // 自动排版
      OnFormatClick();
      break;
    // 省略代码...
  }
}
```

> [具体代码可点击此处查看](https://github.com/dnhyxc/WPS_OA_Assistant/blob/bfdde0918fc931b0c842fa2fee3ddadeb3de670e/WpsOAAssist/js/common/func_tabcontrol.js#L1819)

实现自动排版逻辑的宏：

- 清除文档原有格式、文档首行缩进、字符大小、字体格式等：

```js
/**
 * Selection.WholeStory();全选文档
 * Selection.SetRange(0, 0);选中起始位置
 * Selection.EndKey(wps.Enum.wdStory, wps.Enum.wdMove);选中结束位置
 */
function Macro() {
  const wpsApp = wps.WpsApplication();
  const { Selection } = wpsApp.ActiveWindow;

  Selection.WholeStory();
  // 首先清除原来的格式
  Selection.ClearFormatting();
  Selection.Font.Name = "仿宋_GB2312";
  // Selection.Font.ColorIndex = wps.Enum.wdAuto; // 设置字体颜色为自动
  // Selection.Range.HighlightColorIndex = wps.Enum.wdAuto; // 设置字体底色未自动
  ((obj) => {
    obj.Size = 16;
    obj.SizeBi = 16;
  })(Selection.Font);

  ((obj) => {
    obj.CharacterUnitFirstLineIndent = 2;
    obj.FirstLineIndent = 0;
    obj.CharacterUnitFirstLineIndent = 2;
    obj.FirstLineIndent = 0;
    obj.ReadingOrder = wps.Enum.wdReadingOrderLtr;
    obj.DisableLineHeightGrid = 0;
    obj.AutoAdjustRightIndent = -1;
    obj.WidowControl = 0;
    obj.KeepWithNext = 0;
    obj.KeepTogether = 0;
    obj.PageBreakBefore = 0;
    obj.FarEastLineBreakControl = -1;
    obj.WordWrap = -1;
    obj.HangingPunctuation = -1;
    obj.HalfWidthPunctuationOnTopOfLine = 0;
    obj.AddSpaceBetweenFarEastAndAlpha = -1;
    obj.AddSpaceBetweenFarEastAndDigit = -1;
    obj.BaseLineAlignment = wps.Enum.wdBaselineAlignAuto;
  })(Selection.ParagraphFormat);
  Selection.SetRange(0, 0);
  wpsApp.ActiveDocument.AcceptAllRevisions();
  // 判断是否开启了文档网格，如果开启了则设置网格对应的格式、否则去除网格的格式
  if (!wpsApp.Options.DisplayGridLines) {
    // 调用取消设置网格的宏
    DisplayGridMacro(wpsApp);
  } else {
    // 调用网格格式的宏
    GridMacro(wpsApp);
  }
}
```

- 取消网格格式的宏：

```js
function DisplayGridMacro(wpsApp) {
  wpsApp.Options.DisplayGridLines = false;
  wpsApp.ActiveWindow.Selection.Range.PageSetup.LayoutMode =
    wps.Enum.wdLayoutModeLineGrid;
  ((obj) => {
    obj.MirrorMargins = 0;
    ((obj) => {
      obj.SetCount(1);
      obj.EvenlySpaced = -1;
      obj.LineBetween = 0;
      obj.SetCount(1);
      obj.Spacing = 0;
    })(obj.TextColumns);
    obj.Orientation = wps.Enum.wdOrientPortrait;
    obj.GutterPos = wps.Enum.wdGutterPosLeft;
    obj.TopMargin = 71.999428;
    obj.BottomMargin = 71.999428;
    obj.Gutter = 0;
    obj.PageWidth = 595.270813;
    obj.PageHeight = 841.883057;
    obj.FirstPageTray = wps.Enum.wdPrinterDefaultBin;
    obj.OtherPagesTray = wps.Enum.wdPrinterDefaultBin;
    obj.Orientation = wps.Enum.wdOrientPortrait;
    obj.GutterPos = wps.Enum.wdGutterPosLeft;
    obj.TopMargin = 71.999428;
    obj.BottomMargin = 71.999428;
    obj.Gutter = 0;
    obj.PageWidth = 595.270813;
    obj.PageHeight = 841.883057;
    obj.FirstPageTray = wps.Enum.wdPrinterDefaultBin;
    obj.OtherPagesTray = wps.Enum.wdPrinterDefaultBin;
    obj.FooterDistance = 49.605999;
    obj.OddAndEvenPagesHeaderFooter = 0;
    obj.DifferentFirstPageHeaderFooter = 0;
    obj.LayoutMode = wps.Enum.wdLayoutModeLineGrid;
  })(wpsApp.ActiveDocument.PageSetup);
  ((obj) => {
    obj.MeasurementUnit = wps.Enum.wdCentimeters;
    obj.UseCharacterUnit = true;
  })(wpsApp.Options);
}
```

- 设置网格格式的宏：

```js
/**
 * 网格格式
 * wpsApp.Options.DisplayGridLines：是否开启网格，true:开启，false：关闭
 */
function GridMacro(wpsApp) {
  wpsApp.ActiveWindow.Selection.Range.PageSetup.LayoutMode =
    wps.Enum.wdLayoutModeGenko;
  ((obj) => {
    obj.MirrorMargins = 0;
    ((obj) => {
      obj.SetCount(1);
      obj.EvenlySpaced = -1;
      obj.LineBetween = 0;
      obj.SetCount(1);
      obj.Spacing = 0;
    })(obj.TextColumns);
    obj.Orientation = wps.Enum.wdOrientPortrait;
    obj.GutterPos = wps.Enum.wdGutterPosLeft;
    obj.TopMargin = 71.999428;
    obj.BottomMargin = 71.999428;
    obj.Gutter = 0;
    obj.PageWidth = 595.270813;
    obj.PageHeight = 841.883057;
    obj.FirstPageTray = wps.Enum.wdPrinterDefaultBin;
    obj.OtherPagesTray = wps.Enum.wdPrinterDefaultBin;
    obj.Orientation = wps.Enum.wdOrientPortrait;
    obj.GutterPos = wps.Enum.wdGutterPosLeft;
    obj.TopMargin = 71.999428;
    obj.BottomMargin = 71.999428;
    obj.Gutter = 0;
    obj.PageWidth = 595.270813;
    obj.PageHeight = 841.883057;
    obj.FirstPageTray = wps.Enum.wdPrinterDefaultBin;
    obj.OtherPagesTray = wps.Enum.wdPrinterDefaultBin;
    obj.FooterDistance = 49.605999;
    obj.OddAndEvenPagesHeaderFooter = 0;
    obj.DifferentFirstPageHeaderFooter = 0;
    obj.LayoutMode = wps.Enum.wdLayoutModeGenko;
  })(wpsApp.ActiveDocument.PageSetup);

  ((obj) => {
    obj.MeasurementUnit = wps.Enum.wdCentimeters;
    obj.UseCharacterUnit = true;
  })(wpsApp.Options);
}
```

#### 项目中打包 WPS 加载项

在 `webpack.config.js` 中 增加如下配置：

```js
const plugins = [
  new CopyWebpackPlugin([
    {
      from: "lib/WpsOAAssist",
      to: "WpsOAAssist/"
    }
  ])
];
```

### WPS OA DEMO

#### demo 仓库地址

git 仓库地址：[戳这里查看](https://github.com/dnhyxc/WPS_OA_Assistant)

code 压缩包：[戳这里下载](https://github.com/dnhyxc/WPS_OA_Assistant/archive/refs/heads/master.zip)

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

### 其它

#### 查看相应 WPS API

在 WPS 中点击**开发工具**这个加载项，点击录制新宏。开启录制之后在 WPS 中执行你需要的操作，比如：换行、按 tab 进行缩进、另存为 html 格式等操作。操作完成之后点击**停止录制**按钮。停止录制之后点击 **WPS 宏编辑器** 按钮，此时在编辑器中就能看到所有录制的操作调用的 API 了，如下：

- 按 tab 进行缩进并且输入文本：

```js
function Macro() {
  Selection.SetRange(0, 0);
  Selection.Range.Paragraphs.Item(1).Indent();
  Selection.TypeText("按 tab 进行缩进并且输入文本");
  Selection.SetRange(6, 6);
}
```

- 换行之后进行 tab 缩进：

```js
function Macro() {
  Selection.SetRange(3, 3);
  Selection.TypeParagraph();
  Selection.TypeParagraph();
  Selection.Range.Paragraphs.Item(1).Indent();
}
```

- 设置左右边距为 2.54 cm：

```js
function Macro() {
  Selection.Range.PageSetup.LeftMargin = 71.999428;
  Selection.Range.PageSetup.RightMargin = 71.999428;
  Selection.SetRange(0, 1);
}
```

### 参考文档

1、[WPS 加载项是什么](https://zhuanlan.zhihu.com/p/148803031)

2、[怎么能快速体验 WPS 加载项](https://zhuanlan.zhihu.com/p/158963727)

3、[怎么将 WPS 加载项和业务系统结合起来](https://zhuanlan.zhihu.com/p/161755083)

4、[怎么把 WPS 加载项部署起来](https://zhuanlan.zhihu.com/p/164336341)

5、[金山文档 publish 自动安装加载项.docx](https://kdocs.cn/l/cpOfxONhn8Yg)

6、[利用 WPS 做业务系统的超级编辑器](https://zhuanlan.zhihu.com/p/177076379)

7、[WPS 加载项案例应用回顾](https://zhuanlan.zhihu.com/p/208117631)

8、[金山文档 WPS 产品矩阵集成解决方案-WPS 二次开发集成篇 V1.1.pptx](https://kdocs.cn/l/cyKkDebda)

9、[金山文档 JSAPI 的特点和优势.docx](https://kdocs.cn/l/ssYE4VWBB)

10、[Microsoft Build API 文档](https://docs.microsoft.com/zh-cn/office/vba/api/overview/word)
