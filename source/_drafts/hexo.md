---
title: hexo
date: 2021-03-06 20:10:59
tags: hexo
toc: true
categories:
  - 博客搭建
keywords: 博客文章密码
password: dnhyxc
abstract: 该博文可能涉及技术泄密及收费内容，如需查看请与我联系获取访问密码
---

### hexo 常用命令

1，新建文章：

<!-- more -->

> hexo new '文章名称'

2，新建草稿：

> hexo new draft "草稿名称"

**说明**：草稿默认不会再页面中显示，如果想显示可以使用 hexo s --drafts。

3，把草稿变成正式文章：

> hexo p <文件名称>

### 使用 Aplayer 播放器导致目录不能跳转的 bug 处理

1，找到 Blog\themes\yilia\source\dist 路径下的 APlayer.min.js 文件。

2，之后 ctrl+f 搜索 defaultPrevented 定位到要修改的地方。

3，将其中 hash 使用 decodeURIComponent() 方法进行编码，具体替换内容如下：

```js
if (!e.defaultPrevented) {
  e.preventDefault(),
    decodeURIComponent(location.hash) !== decodeURIComponent(this.hash) &&
      window.history.pushState(null, null, decodeURIComponent(this.hash));
  var n = document.getElementById(decodeURIComponent(this.hash).substring(1));
  if (!n) return;
  t(n, 500, function (e) {
    location.replace("#" + e.id);
  });
}
```

### hexo 配置切换页面音乐不中断

```html
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/jquery.pjax/2.0.1/jquery.pjax.min.js"></script>
<script>
  // 对所有链接跳转事件绑定pjax容器container
  $(document).pjax("a[target!=_blank]", "#container", {
    fragment: "#container",
    timeout: 8000,
  });
</script>
```
