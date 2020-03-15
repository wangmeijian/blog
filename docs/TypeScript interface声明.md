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
![react](https://raw.githubusercontent.com/wangmeijian/images/master/erweimademimi/20200315122550.png)  

解决办法是手动安装react声明```@types/react```
```bash
npm install @types/react
```
安装完，VSCode会自动从@types查找第三方库的声明文件  

如果```@types/[package]```找不到相关的第三方声明，也可以手动新建```<package>.d.ts```来声明第三方库暴露的API  

装了```@types/react```还有一个好处就是会有代码提示  
![react代码提示](https://raw.githubusercontent.com/wangmeijian/images/master/erweimademimi/20200315132725.png)