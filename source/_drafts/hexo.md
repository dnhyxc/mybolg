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

### ssh

id_rsa_sm:

```
-----BEGIN OPENSSH PRIVATE KEY-----
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
-----END OPENSSH PRIVATE KEY-----

```

id_rsa_sm_pub:

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC1p44vzUPXNb2irWnq7onzcqxFRSlhpGVIHaSznZTu8nlNReStzOYkIwRigwvql2zm9Wnw3MOi26tbbDxM1nZVmXzoze8p/V67yBVYzN2uZUyyWPA8W5Euzc8jf/+EmOe03IkVUx+UoWo7DDwq6fxqm0bb1jGAK8kDRtwElBycGSeBwh3Rm2/7C7T/yPE3gVZW9YIRR94hAi+0f9LPWhv0Mw8N1Y1ucWUsaPKszC2q0w+oJ+6lWa7Ce2s7vrVolp8mRlAfTjK/Yarruri6QooLyDKsPwwGo+ws2cOa57bi1gDxFtWxK9Yrf3f142GK7qGp5ZnBq3vwYEOvK+30xI2VM59xbn8bXfctfiBqmxTt2ntK220/TwQQYcPBvwIjD8EJ7UdJ9HQWoThBs4XH4puKqNxr0Lm1sTJR2qHB52rpv9xy1lhkThiwXy2jHIr//opF7MdyV6RZloyZDz34oHHmyUwmOYVCuL10env+olijhUzJk6IFj+iNG1n4AJvh/Xc= 2640559435@qq.com

```
