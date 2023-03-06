(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{399:function(t,a,s){"use strict";s.r(a);var n=s(46),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"js抽象语法树-abstract-syntax-tree"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#js抽象语法树-abstract-syntax-tree"}},[t._v("#")]),t._v(" JS抽象语法树（Abstract syntax tree）")]),t._v(" "),s("h2",{attrs:{id:"初识ast"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#初识ast"}},[t._v("#")]),t._v(" 初识AST")]),t._v(" "),s("p",[t._v("JS抽象语法树（Abstract syntax tree），简称AST，是JS代码对应的树形结构，它一点也不抽象，修改代码的AST，可以做很多事，ES6转ES5，代码提示插件，代码格式化，写webpack loader等等")]),t._v(" "),s("h3",{attrs:{id:"案例1"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#案例1"}},[t._v("#")]),t._v(" 案例1")]),t._v(" "),s("p",[t._v("来看一段代码")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("let m = 6\n")])])]),s("p",[t._v("在JS中，这是一段变量声明，在AST中，它叫"),s("code",[t._v("VariableDeclaration")]),t._v("（变量声明）节点，它还可以被拆分：")]),t._v(" "),s("p",[t._v("1、第一步拆成 "),s("code",[t._v("let")]),t._v(" 和 "),s("code",[t._v("m = 6")])]),t._v(" "),s("ul",[s("li",[s("code",[t._v("let")]),t._v("是变量声明种类，不能再拆")]),t._v(" "),s("li",[s("code",[t._v("m = 6")]),t._v("是变量声明符，在AST中，它叫"),s("code",[t._v("VariableDeclarator")]),t._v("节点，它还可以继续拆分")])]),t._v(" "),s("p",[t._v("2、第二步将"),s("code",[t._v("m = 6")]),t._v("拆成"),s("code",[t._v("m")]),t._v("和"),s("code",[t._v("6")])]),t._v(" "),s("ul",[s("li",[s("code",[t._v("m")]),t._v("是变量声明标识符，不能再拆，在AST中，它属于"),s("code",[t._v("Identifier")]),t._v("节点")]),t._v(" "),s("li",[s("code",[t._v("6")]),t._v("也不能再拆，在AST中，它属于"),s("code",[t._v("Literal")]),t._v("节点")])]),t._v(" "),s("p",[t._v("这段代码的AST表示为：")]),t._v(" "),s("img",{attrs:{src:"https://raw.githubusercontent.com/wangmeijian/images/master/ast/ast.png",width:"550"}}),t._v(" "),s("p",[t._v("在线查看AST的小工具："),s("a",{attrs:{href:"https://astexplorer.net/",target:"_blank",rel:"noopener noreferrer"}},[t._v("AST explorer"),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("简化成树状图就是这样")]),t._v(" "),s("img",{attrs:{src:"https://raw.githubusercontent.com/wangmeijian/images/master/ast/variableDeclaration.jpg",width:"370"}}),t._v(" "),s("h3",{attrs:{id:"案例2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#案例2"}},[t._v("#")]),t._v(" 案例2")]),t._v(" "),s("p",[t._v("再看一个例子")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("function welcome(name){\n    return 'hello ' + name\n}\n")])])]),s("p",[t._v("这是一个 "),s("code",[t._v("FunctionDeclaration")]),t._v("（函数声明）节点，拆分为三块")]),t._v(" "),s("p",[t._v("1、id，就是函数名welcome")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('{\n    type: "Identifier",\n    name: "welcome"\n}\n')])])]),s("p",[t._v("2、params，即参数name")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('{\n    type: "Identifier",\n    name: "name"\n}\n')])])]),s("p",[t._v("3、body，函数体"),s("code",[t._v("{ return 'hello ' + name }")]),t._v("，函数体是个 "),s("code",[t._v("BlockStatement")]),t._v("（语句块），内部是一个"),s("code",[t._v("ReturnStatement")]),t._v("（return语句），再往下级是一个 "),s("code",[t._v("BinaryExpression")]),t._v("（二元运算符表达式），再往下就是最基本的 "),s("code",[t._v("Literal")]),t._v("和"),s("code",[t._v("Identifier")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('{\n    type: "Literal",\n    value: "hello ",\n    row: "\'hello \'"\n}\n')])])]),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('{\n    type: "Identifier",\n    name: "name"\n}\n')])])]),s("p",[t._v("可以自行将代码输入到"),s("a",{attrs:{href:"https://astexplorer.net/",target:"_blank",rel:"noopener noreferrer"}},[t._v("AST explorer"),s("OutboundLink")],1),t._v("查看结果")]),t._v(" "),s("p",[t._v("简化成树状图就是这样")]),t._v(" "),s("img",{attrs:{src:"https://raw.githubusercontent.com/wangmeijian/images/master/ast/functionDeclaration.jpg",width:"370"}}),t._v(" "),s("p",[t._v("除了上面的 "),s("code",[t._v("FunctionDeclaration")]),t._v("、"),s("code",[t._v("BlockStatement")]),t._v("、"),s("code",[t._v("ReturnStatement")]),t._v("等节点，还有什么 "),s("code",[t._v("ForStatement")]),t._v("（for语句）、"),s("code",[t._v("ArrayExpression")]),t._v("（数组表达式）、"),s("code",[t._v("LogicalExpression")]),t._v("（逻辑运算符表达式）……，更多可以参考 "),s("a",{attrs:{href:"https://babeljs.io/docs/en/babel-types#api",target:"_blank",rel:"noopener noreferrer"}},[t._v("babel types"),s("OutboundLink")],1)]),t._v(" "),s("h2",{attrs:{id:"实战-做一个webpack-loader"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实战-做一个webpack-loader"}},[t._v("#")]),t._v(" 实战：做一个webpack loader")]),t._v(" "),s("p",[t._v("了解AST之后，应该知道怎么用它，发挥出它的价值"),s("br"),t._v("\n现在开始做一个webpack loader，作用是将代码里的 == 转换为 ===，操作AST需要用到以下几个包")]),t._v(" "),s("p",[t._v("1、"),s("code",[t._v("@babel/parser")]),t._v(" 将代码解析成AST"),s("br"),t._v("\n2、"),s("code",[t._v("@babel/traverse")]),t._v(" 对AST增删改操作"),s("br"),t._v("\n3、"),s("code",[t._v("@babel/generator")]),t._v(" 将AST生成代码")]),t._v(" "),s("h3",{attrs:{id:"分析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#分析"}},[t._v("#")]),t._v(" 分析")]),t._v(" "),s("p",[t._v("和上面一样，将代码拆分，我们要转换的 == 是在一个 "),s("code",[t._v("BinaryExpression")]),t._v("（二元运算表达式）里面，将代码输入AST explorer，发现有两个 "),s("code",[t._v("BinaryExpression")]),t._v("，运算符分别是 == 和 %，== 才是我们要找的那个，因此，只需要遍历全部 "),s("code",[t._v("BinaryExpression")]),t._v("并判断其 "),s("code",[t._v("operator")]),t._v("是 ==，然后将 == 替换成 === 即可")]),t._v(" "),s("h3",{attrs:{id:"动手"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#动手"}},[t._v("#")]),t._v(" 动手")]),t._v(" "),s("p",[t._v("下面动手新建项目文件夹demo")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("mkdir demo\n")])])]),s("p",[t._v("初始化")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("npm init\n")])])]),s("p",[t._v("安装依赖包")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("npm install @babel/parser @babel/traverse @babel/generator -D\n")])])]),s("p",[t._v("新建三个文件：入口文件index.js、webpack loader文件test-loader.js、webpack配置文件webpack.config.js")]),t._v(" "),s("blockquote",[s("p",[t._v("index.js")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isEven")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("n")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("blockquote",[s("p",[t._v("test-loader.js")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token hashbang comment"}},[t._v("#!/usr/bin/env node")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" parser "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@babel/parser'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" generator "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@babel/generator'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("default\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" traverse "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@babel/traverse'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("default"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("exports")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("source")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" ast "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" parser"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("parse")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("source"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("traverse")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ast"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("enter")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("path")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("operator"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("node"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 判断节点类型和操作符是否为 ==")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isBinaryExpression")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("node"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" operator "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'=='")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("node"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("operator "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'==='")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" output "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("generator")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ast"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" source"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 打印出转换后的代码")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" output"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("code "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" output"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("code\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("blockquote",[s("p",[t._v("webpack.config.js")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" path "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'path'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nmodule"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  mode"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'development'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  entry"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'index.js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  output"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    filename"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'[name].js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    path"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  module"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    rules"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      test"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token regex"}},[s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("\\.js$")]),s("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        use"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'test-loader.js'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 在这里引入本地loader")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("执行编译")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("npm run dev\n")])])]),s("p",[t._v("终端打印出转换后的结果")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isEven")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("n")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("n "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("查看编译生成的main.js，== 被替换成了 ===")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('eval("function isEven(n) {\\n  if (n % 2 === 0) {\\n    return true;\\n  }\\n}\\n\\n//# sourceURL=webpack:///./index.js?");\n')])])]),s("p",[t._v("loader到这里就算完成了，之后就可以把这个test-loader.js做成一个npm包发布")]),t._v(" "),s("h2",{attrs:{id:"loader进阶"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#loader进阶"}},[t._v("#")]),t._v(" Loader进阶")]),t._v(" "),s("p",[t._v("loader插件一般会提供一些配置项，如何获取用户配置呢？需要这样：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("const loaderUtils = require('loader-utils');\nmodule.exports = function(source) {\n  // 获取到用户给当前 Loader 传入的 options\n  const options = loaderUtils.getOptions(this);\n  return source;\n};\n")])])]),s("p",[t._v("ES6+转成ES5，可能还需要返回Source Map，那么就需要用this.callback()来返回转换后的内容，它有四个参数，分别是：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("this.callback(\n  // 当无法转换原内容时，给 Webpack 返回一个 Error\n  err: Error | null,\n  // 原内容转换后的内容\n  content: string | Buffer,\n  // 用于把转换后的内容得出原内容的 Source Map，方便调试\n  sourceMap?: SourceMap,\n  // 如果本次转换为原内容生成了 AST 语法树，可以把这个 AST 返回，\n  // 以方便之后需要 AST 的 Loader 复用该 AST，以避免重复生成 AST，提升性能\n  abstractSyntaxTree?: AST\n);\n")])])])])}),[],!1,null,null,null);a.default=e.exports}}]);