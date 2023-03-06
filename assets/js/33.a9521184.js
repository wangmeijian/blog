(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{419:function(s,a,t){"use strict";t.r(a);var e=t(46),n=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"vuepress搭建github-page博客"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vuepress搭建github-page博客"}},[s._v("#")]),s._v(" VuePress搭建GitHub Page博客")]),s._v(" "),t("p",[s._v("Vue的官网非常简洁，个人非常喜欢，非常适合用来做技术博客，Evan You做了个工具"),t("a",{attrs:{href:"https://vuepress.vuejs.org/zh/",target:"_blank",rel:"noopener noreferrer"}},[s._v("VuePress"),t("OutboundLink")],1),s._v("，可以非常快速搭建这种Vue官网风格的博客。我的博客就是用它搭建的，过程中遇到一些问题，如果你在搭建过程中也遇到了问题，可以对照我的做法，看看哪里出了问题")]),s._v(" "),t("h2",{attrs:{id:"一、初始化项目"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#一、初始化项目"}},[s._v("#")]),s._v(" 一、初始化项目")]),s._v(" "),t("ol",[t("li",[s._v("创建并进入一个新目录")])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" blog "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" blog\n")])])]),t("ol",{attrs:{start:"2"}},[t("li",[s._v("初始化")])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" init\n")])])]),t("ol",{attrs:{start:"3"}},[t("li",[s._v("安装VuePress依赖")])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" vuepress -D\n")])])]),t("ol",{attrs:{start:"4"}},[t("li",[s._v("创建docs文件夹，然后创建一个测试文档README.md")])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" docs "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'# Hello World'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" docs/README.md\n")])])]),t("ol",{attrs:{start:"5"}},[t("li",[s._v("在package.json 中添加构建脚本")])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"scripts"')]),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"docs:dev"')]),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"vuepress dev docs"')]),s._v(",\n        "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"docs:build"')]),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"vuepress build docs"')]),s._v(",\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("ol",{attrs:{start:"6"}},[t("li",[s._v("启动本地服务")])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" docs:dev\n")])])]),t("p",[s._v("到目前为止，你应该能正常访问 http://localhost:8080 并看到第4步创建的测试文档内容，以及一个带搜素栏的Header")]),s._v(" "),t("h2",{attrs:{id:"二、配置首页"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#二、配置首页"}},[s._v("#")]),s._v(" 二、配置首页")]),s._v(" "),t("p",[s._v("VuePress会自动将docs目录下的READMD.md识别成首页，它提供了一些配置：")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("---\nhome: "),t("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("\nheroImage: /hero.png\nheroText: Hero 标题\ntagline: Hero 副标题\nactionText: 快速上手 →\nactionLink: /zh/guide/\nfeatures:\n- title: 简洁至上\n  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。\n- title: Vue驱动\n  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。\n- title: 高性能\n  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。\nfooter: MIT Licensed "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" Copyright © "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2018")]),s._v("-present Evan You\n---\n")])])]),t("p",[s._v("可以尝试修改配置查看效果")]),s._v(" "),t("h2",{attrs:{id:"二、配置header导航和标题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#二、配置header导航和标题"}},[s._v("#")]),s._v(" 二、配置Header导航和标题")]),s._v(" "),t("p",[s._v("在docs目录下新建.vuepress文件夹，然后新建config.js配置文件")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("// .vuepress/config.js\nmodule.exports "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  themeConfig: "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    nav: "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" text: "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Home'")]),s._v(", link: "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(",\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" text: "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Guide'")]),s._v(", link: "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/guide/'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(",\n      "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" text: "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'External'")]),s._v(", link: "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'https://google.com'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(",\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("p",[s._v("接着新建导航对应的页面内容")]),s._v(" "),t("p",[s._v("在docs目录下新建guide文件夹，然后新建README.md")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" docs/guide "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'# Guide'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" docs/guide/README.md\n")])])]),t("p",[s._v("点击刚刚配置的Guide，即可访问docs/guide/README.md")]),s._v(" "),t("p",[s._v("注意：.vuepress/config.js不支持热更新，修改后需重新启动本地服务")]),s._v(" "),t("h2",{attrs:{id:"三、配置侧边栏"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#三、配置侧边栏"}},[s._v("#")]),s._v(" 三、配置侧边栏")]),s._v(" "),t("p",[s._v("VuePress官方提供了静态侧边栏的配置，但作为博客，我不想每次新增一篇文章，就手动新增一个侧边栏链接，这里推荐使用插件"),t("a",{attrs:{href:"https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar",target:"_blank",rel:"noopener noreferrer"}},[s._v("vuepress-plugin-auto-sidebar"),t("OutboundLink")],1),s._v("来动态生成侧边栏")]),s._v(" "),t("ol",[t("li",[s._v("安装依赖")])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" vuepress-plugin-auto-sidebar -D\n")])])]),t("ol",{attrs:{start:"2"}},[t("li",[s._v("使用")])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("// .vuepress/config.js\nmodule.exports "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  plugins: "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"vuepress-plugin-auto-sidebar"')]),s._v(", "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("p",[s._v("重新启动本地服务，就能看到Guide页面自动生成的侧边栏了")]),s._v(" "),t("h2",{attrs:{id:"四、部署到github-page"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#四、部署到github-page"}},[s._v("#")]),s._v(" 四、部署到GitHub Page")]),s._v(" "),t("ol",[t("li",[t("p",[s._v("开启GitHub Page：登录GitHub，打开你的博客对应的仓库，Settings -> Pages -> GitHub Pages -> Source -> 选择你要部署的分支(新建一个分支gh-pages用于部署GitHub Page，否则会覆盖你的代码) -> 选择根目录/root，保存")])]),s._v(" "),t("li",[t("p",[s._v("回到blog根目录下，创建部署脚本deploy.hsh")])])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token shebang important"}},[s._v("#!/usr/bin/env sh")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 确保脚本抛出遇到的错误")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" -e\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 生成静态文件")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" docs:build\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入生成的文件夹")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" docs/.vuepress/dist\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果是发布到自定义域名")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# echo 'www.example.com' > CNAME")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" init\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("add")]),s._v(" -A\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" commit -m "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'deploy'")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果发布到 https://wangmeijian.github.io/blog，gh-pages分支")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" push -f git@github.com:wangmeijian/blog.git master:gh-pages\n\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" -\n")])])]),t("ol",{attrs:{start:"3"}},[t("li",[s._v("配置基础路径为你的仓库名，以/开始，以/结束")])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("// .vuepress/config.js\nmodule.exports "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  bash: "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/blog/'")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),t("ol",{attrs:{start:"4"}},[t("li",[s._v("在命令行执行脚本部署")])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sh")]),s._v(" deploy.sh\n")])])]),t("ol",{attrs:{start:"5"}},[t("li",[s._v("部署完成即可访问 "),t("a",{attrs:{href:"https://wangmeijian.github.io/blog/",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://wangmeijian.github.io/blog/"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=n.exports}}]);