# Object.values()排序靠谱吗？

看到一道算法题：
> let arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];  
> 将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组

思路：

1. 扁平化数组并去重：将数组序列化，然后找出全部数字组成一维数组，利用map去重
2. 排序：排序算法有很多种，就本题而言，数字基本有序，用插入排序最快

```js
let arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
  10,
];
let map = {};

arr.toString().replace(/-?\d+/g, function (n) {
  map[n] = Number(n);
  return n;
});

let res = Object.values(map);
console.log(res);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
```
结果发现```Object.values(map)```返回的数组自动排序了！那是不是可以省掉第2步的排序了？如果数组元素中有负数返回结果会怎么样？把第1个数字2改为负2，返回结果是：

```js
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, -2]
```

-2在最后，可见，存在负数的情况下，负数不会被排序，正数仍然会排序。那么，Object.values()返回的顺序背后的逻辑是什么？

## 遍历顺序

MDN:
> Object.values()方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 

值的顺序和```for in```循环的顺序相同，那么，```for in```循环的顺序又是什么样的？

根据[ECMA-262第3版](http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%203rd%20edition,%20December%201999.pdf)，12.6.4 The for-in Statement的描述：
> The order of enumeration is defined by the object.（枚举的顺序由对象定义。）

```for in```语句得到属性遍历顺序是由**对象定义时的书写顺序决定的**

[ECMA-262第5版](https://www.ecma-international.org/ecma-262/5.1/#sec-12.6.4)规范中，对```for in```语句的遍历机制做了调整，属性遍历的顺序是没有被规定的。  
> The mechanics and order of enumerating the properties is not specified.(没有指定枚举属性的机制和顺序)

最新的[ECMA-262第10版](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf)，13.7.5.15 EnumerateObjectProperties ( O )，对```for in```属性遍历顺序仍没有规定

> The mechanics and order of enumerating the properties is not specified（没有指定枚举属性的机制和顺序）

**现代浏览器使用for in语句遍历对象属性时会遵循一个规律，它们会先提取所有 key 的 parseFloat 值为非负整数的属性， 然后根据数字顺序对属性排序首先遍历出来，然后按照对象定义的顺序遍历余下的所有可枚举属性。**

```js
var obj = {
  a: 'a',
  12: 12,
  7: 7,
  0: 0,
  "-2": -2,
  "-3.5": -3.5,
  b: 'b',
}
for (var key in obj) {
  console.log(key);
}
```
各浏览器表现如下：

* chrome（80.0.3987.163）、Firefox（72.0.2 (64 位)）、Safari（13.0.5 (15608.5.11)）、IE9+表现一致为：```0、7、12、a、-2、-3.5、b```

* IE6、IE7、IE8表现一致为：```a、12、7、0、-2、-3.5、b```

注意：必须使用原生IE6/7/8测试，在高版本IE切换文档模式测试结果不准确  

可见，Chrome、Firefox、Safari的JavaScript引擎遵循的是ECMA-262第5版规范。因此，使用 ```for-in``` 语句遍历对象属性时遍历书序并非属性构建顺序。而 IE6、IE7、IE8的JavaScript引擎遵循的是较老的ECMA-262第3版规范，属性遍历顺序由属性构建的顺序决定。

## 结论
```for in```语句无法保证遍历顺序，最好不要依赖它来排序。如果代码中要依赖遍历的顺序，请使用数组或Map数据结构，Map的遍历顺序就是插入顺序。

```js
let map = new Map([
  ['a', 'a'],
  [12, 12],
  [7, 7],
  [0, 0],
  [-2, -2],
  [-3.5, -3.5],
  ['b', 'b']
])
for(let key in map){
  console.log( key );
}
// a、12、7、0、-2、-3.5、b
```

> 觉得不错，点个star[Github](https://github.com/wangmeijian/blog)

本文Github链接：[Github](https://github.com/wangmeijian/blog/blob/master/docs/Object.values()%E6%8E%92%E5%BA%8F%E9%9D%A0%E8%B0%B1%E5%90%97.md)

