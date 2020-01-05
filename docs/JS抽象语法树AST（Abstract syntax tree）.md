# JS抽象语法树（Abstract syntax tree）

## 初识AST
JS抽象语法树（Abstract syntax tree），简称AST，是JS代码对应的树形结构，它一点也不抽象，修改代码的AST，可以做很多事，ES6转ES5，代码提示插件，代码格式化，写webpack loader等等    

### 案例1
来看一段代码  

```
let m = 6
```
在JS中，这是一段变量声明，在AST中，它叫```VariableDeclaration```（变量声明）节点，它还可以被拆分：  

1、第一步拆成 ```let``` 和 ```m = 6```  

* ```let```是变量声明种类，不能再拆
* ```m = 6```是变量声明符，在AST中，它叫```VariableDeclarator ```节点，它还可以继续拆分

2、第二步将```m = 6```拆成```m```和```6```

* ```m```是变量声明标识符，不能再拆，在AST中，它属于```Identifier```节点
* ```6```也不能再拆，在AST中，它属于```Literal```节点

这段代码的AST表示为：

<img src="https://raw.githubusercontent.com/wangmeijian/images/master/ast/ast.png" width="550">

在线查看AST的小工具：[AST explorer](https://astexplorer.net/)  

简化成树状图就是这样  

<img src="https://raw.githubusercontent.com/wangmeijian/images/master/ast/variableDeclaration.jpg" width="370">

### 案例2
再看一个例子
```
function welcome(name){
    return 'hello ' + name
}
```
这是一个 ```FunctionDeclaration```（函数声明）节点，拆分为三块

1、id，就是函数名welcome
```
{
    type: "Identifier",
    name: "welcome"
}
```
2、params，即参数name
```
{
    type: "Identifier",
    name: "name"
}
```
3、body，函数体```{ return 'hello ' + name  }```，函数体是个 ```BlockStatement```（语句块），内部是一个```ReturnStatement```（return语句），再往下级是一个 ```BinaryExpression```（二元运算符表达式），再往下就是最基本的 ```Literal```和```Identifier```  

```
{
    type: "Literal",
    value: "hello ",
    row: "'hello '"
}
```

```
{
    type: "Identifier",
    name: "name"
}
```
可以自行将代码输入到[AST explorer](https://astexplorer.net/)查看结果  

简化成树状图就是这样  

<img src="https://raw.githubusercontent.com/wangmeijian/images/master/ast/functionDeclaration.jpg" width="370">

除了上面的 ```FunctionDeclaration```、```BlockStatement```、```ReturnStatement```等节点，还有什么 ```ForStatement```（for语句）、```ArrayExpression```（数组表达式）、```LogicalExpression```（逻辑运算符表达式）……，更多可以参考 [babel types](https://babeljs.io/docs/en/babel-types#api)

## 实战：做一个webpack loader
了解AST之后，应该知道怎么用它，发挥出它的价值  
现在开始做一个webpack loader，作用是将代码里的 == 转换为 ===，操作AST需要用到以下几个包  

1、```@babel/parser``` 将代码解析成AST  
2、```@babel/generator``` 将AST生成代码

### 分析
和上面一样，将代码拆分，我们要转换的 == 是在一个 ```BinaryExpression```（二元运算表达式）里面，将代码输入AST explorer，发现有两个 ```BinaryExpression```，运算符分别是 == 和 %，== 才是我们要找的那个，因此，只需要遍历全部 ```BinaryExpression```并判断其 ```operator```是 ==，然后将 == 替换成 === 即可  

### 动手
下面动手新建项目文件夹demo  
```
mkdir demo
```
初始化
```
npm init
```
安装依赖包
```
npm install @babel/parser @babel/parser -D
```
新建三个文件：入口文件index.js、webpack loader文件test-loader.js、webpack配置文件webpack.config.js  

> index.js  
```js
function isEven(n){
    if(n%2 == 0){
        return true;
    }
}
```
> test-loader.js  
```js
#!/usr/bin/env node
const parser = require('@babel/parser')
const generator = require('@babel/generator').default
const traverse = require('@babel/traverse').default;

module.exports = function (source) {
  const ast = parser.parse(source)
  traverse(ast, {
    enter(path) {
      let {operator} = path.node;
      // 判断节点类型和操作符是否为 ==
      if (path.isBinaryExpression(path.node) && operator === '==') {
        path.node.operator = '===';
      }
    }
  })
  const output = generator(ast, {}, source);
  // 打印出转换后的代码
  console.log( output.code );
  return output.code
}
```
> webpack.config.js  
```js
const path = require('path')

module.exports = {
  mode:'development',
  entry:path.resolve(__dirname,'index.js'),
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'')
  },
  module:{
    rules:[{
      test:/\.js$/,
        use:path.resolve(__dirname,'test-loader.js') // 在这里引入本地loader
      }
    ]
  }
}
```
执行编译
```js
npm run dev
```
终端打印出转换后的结果
```js
function isEven(n) {
  if (n % 2 === 0) {
    return true;
  }
}
```
loader到这里就算完成了，之后就可以把这个test-loader.js做成一个npm包发布  

