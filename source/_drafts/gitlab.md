---
title: gitlab
date: 2021-04-15 20:15:10
tags: gitlab
toc: true
categories:
  - 自动化部署
---

### gitlab 简介

#### gitlab 的作用

<!-- more -->

1，gitlab 是一个基于 git 实现的在线代码仓库软件，你可以用 Gitlab 自己搭建一个类似于 Github 一样的系统，一般用于在企业、学校等内部网络搭建 Git 私服。

#### gitlab-ci 简介

> 使用 gitlab-ci 的背景：
> 有一些项目它依赖了一些很麻烦的包，这些包很难在 window 下环境友好运行，所以导致这个项目无法打包部署。这给我们整个团队带来了很大的不便，部署只能用 linux 很麻烦的手动部署。所以我想配置一个 gitlab-ci 实现项目的自动部署，以提升效率。

1，通俗易懂的来说 gitlab-ci 就是把代码测试、打包、发布等工作交给一些工具来自动完成。这样可以提高很多效率，减少失误，开发人员只要关心把代码提交到 git 就行了。

2，从 GitLab 8.0 开始，GitLab CI 就已经集成在 GitLab 中，我们只要在项目中添加一个 `.gitlab-ci.yml` 文件，然后添加一个 `Runner`，即可进行持续集成。 而且随着 GitLab 的升级，GitLab CI 变得越来越强大。

#### .gitlab-ci.yml 说明

1，在 git 项目的根目录下的一个文件，记录了一系列的阶段和执行规则。GitLab-CI 在 push 后会解析它，根据里面的内容调用 runner 来运行。

2，简单来说就是利用 Git 版本管理 Push 了本地代码到你的 gitlab.com 上，然后 Gitlab，就通知你的服务器(runner 服务器)，也就是 Gitlab-runner 来运行构建任务。然后跑测试用例，测试用例通过了就生成 Build 出相应的环境的代码，自动部署到不同的环境服务器上。

#### gitLab-runner 说明

1，这个是脚本执行的承载者，.gitlab-ci.yml 的 script 部分的运行就是由 runner 来负责的。GitLab-CI 浏览过项目里的 .gitlab-ci.yml 文件之后，根据里面的规则，分配到各个 Runner 来运行相应的脚本 script。这些脚本有的是测试项目用的，有的是部署用的。

![gitlab-ci流程](gitlab-process.png)
