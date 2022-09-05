# pnpm凭什么这么快

前端包管理器层出不穷，pnpm算是一个后起之秀。它和npm有什么不同，为什么有了npm还要造一个pnpm？

## npm的问题

npm是最早的包管理器，安装nodejs自带npm，v3版本之前，npm安全依赖的目录结构是这样的：

```
node_modules
└─ foo
   ├─ index.js
   ├─ package.json
   └─ node_modules
      └─ bar
         ├─ index.js
         └─ package.json
```         

结构清晰而直观，但是存在一个明显的问题，当依赖层级过多时，文件嵌套非常深，然而window系统对文件路径长度是有限制的，超过256字符就会出现目标路径太长，从而无法操作深层级文件的问题，从v3版本开始，npm将每个package平铺到node_modules，就像这样

```
node_modules
├─ foo
|  ├─ index.js
|  └─ package.json
└─ bar
   ├─ index.js
   └─ package.json
```

平铺的方式解决了长路径的问题，但是又存在另一些问题：

**package依赖不直观，所有package都是平级的，无法看出来谁依赖了谁**；

**项目中可以直接import间接依赖的package**，比如模块A依赖了模块B，开发者可以直接在项目中import模块B，当模块A升级之后，可能依赖的模块B版本也升级了，之前直接import模块B的API可能不再兼容；

除此之外，**npm的另外一个问题是，如果你有10个项目中依赖了模块A，模块A将被安装10次，并且在你的硬盘上保存了10份一模一样的代码，占用了大量磁盘空间**

pnpm的作者意识到这些问题，站出来造了pnpm这个新轮子，加入了一些创新

## pnpm的解决方案
pnpm的口号是“快速的，节省磁盘空间的包管理工具”，这就是pnpm名字的由来，pnpm代表 performant（高性能的）npm，那么它是怎么做到快且节省磁盘空间的？

当项目中安装依赖包时，pnpm将所有依赖包存储在磁盘的某一个位置，简称```.pnpm store```，下次再安装同一个包的时候，如果```.pnpm store```已经存在这个包，将会在项目中创建一个硬链接到```.pnpm store```（[什么是硬链接？](https://github.com/wangmeijian/blog/issues/10)），如果```.pnpm store```不存在这个包，会先保存这个包到```.pnpm store```，然后再创建硬链接。这样设计，即使是10个项目都依赖了同一个版本的模块A，模块A也只在磁盘上保存1份代码，这就是pnpm又快又节省磁盘空间的原因

## pnpm的实现方式

pnpm的node_modules并不是平铺的，举例：

某个项目使用了模块```foo@1.0.0```，模块```foo@1.0.0```又依赖了模块```bar@1.0.0```，那么安装依赖后的node_modules结构是这样的：

```
node_modules
├── foo -> ./.pnpm/foo@1.0.0/node_modules/foo
└── .pnpm
    ├── bar@1.0.0
    │   └── node_modules
    │       └── bar -> <store>/bar
    └── foo@1.0.0
        └── node_modules
            ├── foo -> <store>/foo
            └── bar -> ../../bar@1.0.0/node_modules/bar
```
node_modules根目录下只有项目直接依赖的foo模块的软链接和一个.pnpm隐藏文件夹，.pnpm文件夹内，以平铺的方式存放着所有包，每个包文件夹都能一眼看出依赖关系

foo模块以及依赖的bar模块的真实文件，都是存放在```.pnpm store```，通过硬链接的方式使用

![pnpmstore](https://user-images.githubusercontent.com/9384140/185889660-68ae3d8f-b91a-4e7a-91bd-2cd6c44ca2ee.png)

## 总结

pnpm在重复安装依赖包时，不需要复制文件，所以速度非常快，通过硬链接的方式共享同一份代码，极大的节省了磁盘空间
