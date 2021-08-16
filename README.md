### hexo blog of dnhyxc

#### 根目录依赖下载

```js
yarn;
```

#### 主题依赖下载

```js
cd themes/dnhyxc

yarn
```

#### 全局安装 hexo-cli

```js
npm i hexo-cli -g
```

#### 启动项目

```js
hexo s
```

#### 启动带有草稿的项目

```js
hexo s --draft
```

#### 新建文章

```js
hexo new "博客名称"
```

#### 新建草稿

```js
hexo new draft "草稿名称"
```

#### 把草稿变成正式文章

```js
hexo p "文件名称"
```

#### 清除缓存文件

```js
hexo clean
```

#### 生成静态文件

```js
hexo g
```

#### 部署博客

```js
hexo d
```

#### 博客部署步骤

```js
// 步骤一
hexo clean

// 步骤二
hexo g

// 步骤三
hexo d
```
