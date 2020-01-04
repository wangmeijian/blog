# JS抽象语法树（Abstract syntax tree）

## 初识AST
JS抽象语法树（Abstract syntax tree），简称AST，是JS代码对应的树形结构，它一点也不抽象，修改代码的AST，可以用来做很多事，ES6转ES5，代码提示插件，代码格式化，写webpack loader等等    

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

除了上面的 ```FunctionDeclaration```、```BlockStatement```、```ReturnStatement```等节点，还有什么 ```ForStatement```（for语句）、```ArrayExpression```（数组表达式）、```LogicalExpression```（逻辑运算符表达式）……，他们都在这里[Parser API](https://developer.mozilla.org/zh-CN/docs/Mozilla/Projects/SpiderMonkey/Parser_API)

## 修改AST

