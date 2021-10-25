# VuePress搭建GitHub Page博客

Vue的官网非常简洁，个人非常喜欢，非常适合用来做技术博客，Evan You做了个工具[VuePress](https://vuepress.vuejs.org/zh/)，可以非常快速搭建这种Vue官网风格的博客。我的博客就是用它搭建的，过程中遇到一些问题，如果你在搭建过程中也遇到了问题，可以对照我的做法，看看哪里出了问题

## 一、初始化项目

1. 创建并进入一个新目录

```bash
mkdir blog && cd blog
```
2. 初始化
```bash
yarn init
```

3. 安装VuePress依赖
```bash
yarn add vuepress -D
```

4. 创建docs文件夹，然后创建一个测试文档README.md
```bash
mkdir docs && echo '# Hello World' > docs/README.md
```

5. 在package.json 中添加构建脚本
```bash
{
    "scripts": {
        "docs:dev": "vuepress dev docs",
        "docs:build": "vuepress build docs",
    }
}
```

6. 启动本地服务
```bash
yarn docs:dev
```

到目前为止，你应该能正常访问 http://localhost:8080 并看到第4步创建的测试文档内容，以及一个带搜素栏的Header

## 二、配置首页

VuePress会自动将docs目录下的READMD.md识别成首页，它提供了一些配置：

```bash
---
home: true
heroImage: /hero.png
heroText: Hero 标题
tagline: Hero 副标题
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```
可以尝试修改配置查看效果

## 二、配置Header导航和标题

在docs目录下新建.vuepress文件夹，然后新建config.js配置文件
```bash
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'External', link: 'https://google.com' },
    ]
  }
}
```
接着新建导航对应的页面内容

在docs目录下新建guide文件夹，然后新建README.md
```bash
mkdir docs/guide && echo '# Guide' > docs/guide/README.md
```

点击刚刚配置的Guide，即可访问docs/guide/README.md

注意：.vuepress/config.js不支持热更新，修改后需重新启动本地服务

## 三、配置侧边栏

VuePress官方提供了静态侧边栏的配置，但作为博客，我不想每次新增一篇文章，就手动新增一个侧边栏链接，这里推荐使用插件[vuepress-plugin-auto-sidebar](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar)来动态生成侧边栏

1. 安装依赖

```bash
yarn add vuepress-plugin-auto-sidebar -D
```

2. 使用

```bash
// .vuepress/config.js
module.exports = {
  plugins: [
    ["vuepress-plugin-auto-sidebar", {}]
  ]
}
```

重新启动本地服务，就能看到Guide页面自动生成的侧边栏了

## 四、部署到GitHub Page

1. 开启GitHub Page：登录GitHub，打开你的博客对应的仓库，Settings -> Pages -> GitHub Pages -> Source -> 选择你要部署的分支 -> 选择根目录/root，保存

2. 回到blog根目录下，创建部署脚本deploy.hsh

```bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://wangmeijian.github.io/blog
git push -f git@github.com:wangmeijian/blog.git master:master

cd -
```

3. 配置基础路径为你的仓库名，以/开始，以/结束

```bash
// .vuepress/config.js
module.exports = {
  bash: '/blog/'
}
```

4. 在命令行执行脚本部署
```bash
sh deploy.sh
```

5. 部署完成即可访问 [https://wangmeijian.github.io/blog/](https://wangmeijian.github.io/blog/)

