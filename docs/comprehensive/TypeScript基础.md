# TypeSCript

## 一、类型声明
在TypeScript中，一切变量都必须声明其类型，业务开发中，经常会遇到这样的场景，新增和获取某条数据时，往往只有一两个字段不同，那么是不是需要重复声明类似的两个interface（接口）呢？  

比如新增用户，有用户名、密码，获取用户，有用户名、密码、用户ID、创建时间，可以先声明一个BaseAccount  
```bash
interface BaseAccount{
  name: string,
  password: string
}
```
获取的用户的interface直接继承BaseAccount  
```bash
interface Account extends BaseAccount{
  id: number,
  create_time: number
}
```
假如后续增加了部门，获取用户还需要返回所在部门，同样先声明一个部门接口Department  
```bash
interface Department{
  id: number,
  department_name: string
}
```
获取用户的接口可同时继承BaseAccount和Department    
```bash
interface Account extends BaseAccount, Department{
  id: number,
  create_time: number
}
```
或者  
```bash
interface Account extends BaseAccount{
  id: number,
  create_time: number,
  department: Department
}
```

## 二、@types/[package]

同样，TypeScript项目中，第三方库也必须声明类型，比如在TS中引用了react，VSCode会给你这样一个提示：无法找到模块“react”的声明文件    
![react](https://raw.githubusercontent.com/wangmeijian/images/master/typescript/20200315122550.png)  

解决办法是手动安装react声明```@types/react```
```bash
npm install @types/react
```
安装完，VSCode会自动从@types查找第三方库的声明文件  

如果```@types/[package]```找不到相关的第三方声明，也可以手动新建```<package>.d.ts```来声明第三方库暴露的API  

装了```@types/react```还有一个好处就是会有代码提示  
![react代码提示](https://raw.githubusercontent.com/wangmeijian/images/master/typescript/20200315132725.png)

## 三、函数重载

比如，需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。该如何定义TS？

利用联合类型，我们可以这么实现：

```js
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
}}
```

**然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。**

这时，我们可以使用重载定义多个 reverse 的函数类型：

```js
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
}}
```

## 四、泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

首先，我们来实现一个函数 createArray，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值

```js
function createArray(length: number, value: any): Array<any> {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```
这样有个缺陷，它没有准确定义返回值的类型，预期的返回值类型应该和参数Value的类型是一样的，这时候，泛型就派上用场了

```js
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```

上例中，我们在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用了

### 多个类型参数

定义泛型的时候，可以一次定义多个类型参数

```js
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```

## 五、类型断言

类型断言（Type Assertion）可以用来手动指定一个值的类型

语法：值 as 类型 或者 <类型>值

tsx语法中必须用前者

### 类型断言的用途

将一个联合类型断言为其中一个类型，当一个值类型可以是number和string时，不能直接读取这个值的length属性，除非利用类型断言来约束返回值类型
```js
type TName = number | string
function getName(name: TName){
    // 会报错
    return name.length
}

function getName(name: TName){
    // 编译通过
    return (name as string).length
}
```

### 类型断言 VS 类型声明

使用类型断言，只需要满足一部分类型即可；使用类型声明，必须满足所有类型；
```js
interface TAnimal {
    name: string
    run: () => {}
}

// 正常编译
let Cat = {
    name: 'Tom'
} as TAnimal

// 报错  Property 'run' is missing in type '{ name: string; }' but required in type 'TAnimal'.
let Dog: TAnimal = {
    name: 'Tom'
}
```

### 类型断言 VS 泛型
除了类型断言可以约束返回值，另一种方式是使用泛型
```js
interface TCache {
    name: string
    age: number
}

function getCache<T>(key: string): T{
    const cache: any = {
        name: 'Tom',
        age: 5
    }
    return cache[key]
}
// 约束返回值为字符串
getCache<string>('name')
```
