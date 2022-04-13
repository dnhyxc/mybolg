---
title: wps
date: 2022-04-13 23:25:16
tags:
---

### WPS 加载项

#### 什么是 WPS OA 助手

WPS 加载项是一套基于 Web 技术用来扩展 WPS 应用程序的解决方案。每个 WPS 加载项都对应打开了一个网页，并通过调用网页中 JavaScript 方法来完成其功能逻辑。具体查看 [WPS 开发者文档](https://open.wps.cn/docs/client/wpsLoad)。

#### 加载项（WpsOAAssist）文件结构说明

- icon：图标文件。

- js：WPS 加载项功能逻辑的 js 代码。

- otherslib：vue 等第三方库。

- template：示例模板文件。

<!-- more -->

- importTemplate.html：导入模板页面。

- index.html：加载项的默认加载页面。

- qrcode.html：插入二维码页面。

- redhead.html：插入红头页面。

- selectBookmark.html：插入标签页面。

- selectSeal.html：插入签章页面。

- setUserName.html：修改默认用户名页面。

- ribbon.xml：自定义选项卡配置，即自定义功能区配置。遵循 **CustomUI** 标准。

#### 逻辑部分（wwwroot）结构说明

- file：所需要的各种文件模板。

- resource：web 页面相关页面及交互资源。

  - wps.js：唤起 wps 创建、编辑等交互逻辑所在区。

  - wpsjsrpcsdk.js：wps 开发者提供的通用 sdk。

  - index.html：web 端页面入口。

#### 使用加载项套红具体用法

```js
function customDoc() {
  var uploadPath = GetUploadPath();

  var uploadFieldName = "xxx";

  var fieldObj = {
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

  var bookMarksStart = "正文内容B";

  var bookMarksEnd = "正文内容E";

  const dealDescription = `创建【套红正文】文件`;

  _WpsInvoke(
    [
      {
        OpenDoc: {
          docId: "902209",
          uploadPath: uploadPath, // 保存文档上传接口
          fileName: "", // 文件名称，新建时传空
          newFileName: "取名字真的好难.docx", // 新定义的文件名称，可根据表单字段获取
          uploadFieldName, // 上传人名称
          insertFileUrl: GetDemoPath("wps广西移动公司部门会议纪要.doc"), // 套红模板
          bkInsertFileStart: bookMarksStart, // 套红开始标签
          bkInsertFileEnd: bookMarksEnd, // 套红结束标签
          bodyTemplateUrl: "", // 正文模板
          userName: "用户名称，正常需要根据用户登录信息获取",
          suffix: ".pdf", // wps 需要保存的文件格式
          uploadWithAppendPath: "1", // 1 对应 pdf

          // 默认开启修订
          revisionCtrl: {
            bOpenRevision: true,
            bShowRevision: true,
          },

          // 自定义传入wps中的参数
          params: {
            isNew: true, // 是否是创建
            id: parseInt(Math.random() * 100),
            orgId: "902209",
            docId: 123456789,
            file: undefined, // 创建时 file 需要传 undefined
            index: -1, // 创建 index 需要传 -1
            list: [], // 文件列表
            operType: 4, // 创建时传 4，编辑传 12
            dealDescription,
            fieldObj, // 需要插入的各种标签属性
          },
          openType: {
            // 文档打开方式
            // 文档保护类型，-1：不启用保护模式，0：只允许对现有内容进行修订，
            // 1：只允许添加批注，2：只允许修改窗体域(禁止拷贝功能)，3：只读
            protectType: -1,
            // protectType: downloadParams ? 0 : -1,
            // password: '123456',
          },
          // buttonGroups: options.filePath ? "btnImportTemplate" : "", // 屏蔽功能按钮
        },
      },
    ],
    true
  ); // OpenDoc方法对应于OA助手dispatcher支持的方法名
}
```

#### 如何向 wps 中插入执行标签属性

当需要插入新的标签属性时，只需要找到 `WpsOAAssist/js/commom/enum.js` 文件，添加需要新插入的标签值即可。

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
