(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{395:function(a,s,t){"use strict";t.r(s);var r=t(46),e=Object(r.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"docker搭建前端环境"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docker搭建前端环境"}},[a._v("#")]),a._v(" docker搭建前端环境")]),a._v(" "),t("p",[a._v("开发环境的搭建，是新人入职后的第一道槛，有时一个小小的问题就能阻塞半天。如果能提供一个工具在短时间内搞定开发环境，势必提高新人对团队的印象分！docker就是这样一个工具。")]),a._v(" "),t("h2",{attrs:{id:"镜像-容器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#镜像-容器"}},[a._v("#")]),a._v(" 镜像&容器")]),a._v(" "),t("p",[a._v("docker有个重要的概念叫镜像，官方概念比较拗口，这么解释比较容易理解：docker仓库有很多镜像，包括node、nginx、redis等等，一个镜像一般解决一个问题，镜像没有状态，而且永远不会改变。容器，是镜像执行的地方。")]),a._v(" "),t("h2",{attrs:{id:"体验"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#体验"}},[a._v("#")]),a._v(" 体验")]),a._v(" "),t("p",[a._v("第一步，"),t("strong",[t("a",{attrs:{href:"https://docs.docker.com/get-docker/",target:"_blank",rel:"noopener noreferrer"}},[a._v("安装docker"),t("OutboundLink")],1)]),a._v("，接着在命令行执行以下命令：")]),a._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[a._v("docker run "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("d "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("p "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("80")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("80")]),a._v(" docker"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("getting"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("started\n")])])]),t("p",[a._v("以上命令创建了一个容器，执行的镜像是docker/getting-started，docker会自动从docker仓库下载这个镜像。命令执行成功后，在浏览器打开http://localhost 即可访问这个容器的服务。")]),a._v(" "),t("p",[a._v("如果要访问自己的项目，需要把自己的项目做成镜像。")]),a._v(" "),t("h2",{attrs:{id:"dockerfile"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#dockerfile"}},[a._v("#")]),a._v(" Dockerfile")]),a._v(" "),t("p",[a._v("如何创建镜像？打开前端项目根目录，"),t("strong",[a._v("新建Dockerfile配置文件")]),a._v("，配置如下（假设你的项目依赖nodejs）")]),a._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[a._v(" "),t("span",{pre:!0,attrs:{class:"token constant"}},[a._v("FROM")]),a._v(" node"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("10.13")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v(".0")]),a._v("\n "),t("span",{pre:!0,attrs:{class:"token constant"}},[a._v("WORKDIR")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("app\n "),t("span",{pre:!0,attrs:{class:"token constant"}},[a._v("COPY")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("\n "),t("span",{pre:!0,attrs:{class:"token constant"}},[a._v("RUN")]),a._v(" npm install\n "),t("span",{pre:!0,attrs:{class:"token constant"}},[a._v("CMD")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"npm"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"run"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"dev"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),t("p",[a._v("FROM node:10.13.0：指定依赖的基础镜像nodejs，版本为10.13.0"),t("br"),a._v("\nWORKDIR /app：指定工作目录\nCOPY . .：拷贝当前目录所有文件到/app"),t("br"),a._v("\nRUN npm install：在项目打包为镜像时执行指定npm install"),t("br"),a._v('\nCMD ["npm", "run", "dev"]：镜像在容器中启动时执行的命令，这里假设为npm run dev')]),a._v(" "),t("p",[a._v("新建.dockerignore，忽略那些不需要打包到镜像的文件（夹）")]),a._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[a._v("node_modules\n")])])]),t("h2",{attrs:{id:"创建镜像"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#创建镜像"}},[a._v("#")]),a._v(" 创建镜像")]),a._v(" "),t("p",[t("strong",[a._v("把当前文件夹内容打包为镜像")]),a._v("，注意最后有个点")]),a._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[a._v("docker build "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("t my"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("app "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("\n")])])]),t("h2",{attrs:{id:"创建容器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#创建容器"}},[a._v("#")]),a._v(" 创建容器")]),a._v(" "),t("p",[t("strong",[a._v("创建容器")]),a._v("，注意，前端项目一般会开启DevServer，host必须配置为0.0.0.0，否则在宿主机上无法访问docker容器内部的开发环境。")]),a._v(" "),t("p",[a._v("创建名字为my-app-container的容器，执行的镜像是my-app，假设DevServer配置的端口为8080，将容器内的8080映射到宿主机的8080端口，冒号前面的是宿主机端口，后面的是docker容器的端口。")]),a._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[a._v("docker run "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("dp "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("8080")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("8080")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("name my"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("app"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("container my"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("app\n")])])]),t("p",[a._v("容器会自动执行Dockerfile指定的CMD命令，稍后就可以在浏览器输入http://localhost:8080 访问容器内的开发环境了。")]),a._v(" "),t("p",[a._v("查看所有正在运行的docker容器")]),a._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[a._v("docker ps\n")])])]),t("h2",{attrs:{id:"文件映射"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#文件映射"}},[a._v("#")]),a._v(" 文件映射")]),a._v(" "),t("p",[a._v("业务代码都打包到镜像里了，接下来，要怎么修改业务代码呢？只需要在创建容器的时候，做文件映射。\n在这之前，先停止并删除当前运行的容器")]),a._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//停止容器")]),a._v("\ndocker kill my"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("app"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("container\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//删除容器")]),a._v("\ndocker rm my"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("app"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("container\n")])])]),t("p",[a._v("假设宿主机前端目录是/project/app，用-v命令，映射到容器的/app")]),a._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[a._v("docker run "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("dp "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("8080")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("8080")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("v "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("project"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("app"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("app "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("name my"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("app"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("container my"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("app\n")])])]),t("p",[a._v("之后，访问http://localhost:8080 ，修改宿主机的代码，代码在容器中编译，宿主机的浏览器也会实时刷新，如同本地开发一样。")])])}),[],!1,null,null,null);s.default=e.exports}}]);