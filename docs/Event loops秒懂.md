# Event loops秒懂

<img src="https://raw.githubusercontent.com/wangmeijian/images/master/event-loops/event-loops.png" height="240" />

## Event loops简介
JS是一种单线程脚本语言，为什么要设计成单线程？

举例说明，假设JS是多线程脚本语言，A线程修改了DOM，B线程删除了DOM，一旦B线程先执行完，DOM被删除了，A线程就会报错，为了避免类似这种问题，JS被设计为单线程  

单线程的问题是一次只能做一件事，要做第二件事，必须等第一件事先做完。假如有个需求是每5分钟更新一次数据，用setInterval去计时，那么这个页面JS永远无法做其他事了，线程一直被setInterval占用着。为了让JS可以同时执行多个任务，引入了Event loops（事件循环）机制

Event loops分为2种队列，task队列、microtask队列，业界一般把tasks队列称为宏任务，microtask翻译过来叫微任务。

task队列和microtask队列执行顺序是怎样的？

代码刚开始执行时，script脚本代码首先进入执行栈，在执行过程中

* 遇到setTimeout、setInterval、I/O、setImmediate就往task队列里push
* 遇到Promise.then/catch/finally、MutationObserver、process.nextTick(Nodejs环境)就往microtask队列里push

执行栈中的代码执行完，会先查看microtask队列里有没有待执行的任务，如果有，则按先进先出的原则依次执行microtask中的全部任务。执行完之后，再检查task队列有没有待执行的任务，有则按先进先出的原则取一个task执行，每次执行完一个task，会检查microtask有没有待执行的任务，有则执行全部microtask任务，没有就继续下一个task，以此类推，这就是Event loops

## 案例
按照以上规则，思考以下代码输出顺序
```js
// 先自己思考一下输出顺序
console.log('script start');

setTimeout(function () {
  console.log('timeout');
}, 0);

Promise.resolve().then(function () {
  console.log('promise');
}).then(function () {
  console.log('then');
});

console.log('script end');
```

分析：

1. 整体代码做为第一个task，从上到下开始执行
2. 输出```script start```
3. 遇到```setTimeout()```，push到task队列，等待执行
4. 遇到```Promise```第一个```then()```，push到microtask队列，等待执行
5. 输出```script end```
6. 第一个task执行完成，查看microtask队列，有任务，开始执行
7. 输出```promise```，遇到第二个```then()```，push到microtask队列
8. 输出刚刚push的```then```
9. microtask队列执行完成，取下一个task执行
10. 输出```timeout```

输出顺序为：script start -> script end -> promise -> then -> timeout

## 升级，return Promise

将上面例子的Promise升级了一下，假设Promise.then内部又有Promise，怎么分析？

```js
Promise.resolve().then(function () {
  console.log('promise');
  return new Promise((resolve, reject) => {
    console.log('inner promise');
    resolve();
  }).then(() => {
    console.log('inner then1');
  }).then(() => {
    console.log('inner then2');
  })
}).then(function () {
  console.log('then');
});
```

分析：

1. 整体代码为第一个task，从上到下开始执行
2. 遇到第一个then，push到microtask队列
3. 第一个task执行完成，查看microtask队列，有任务，开始执行
4. 输出 ```promise```
5. 进入内部new Promise，输出 ```inner promise```  
6. 遇到内部new Promise第一个then，push到microtask队列
7. 输出刚刚push的 ```inner then1```
8. 遇到内部new Promise第二个then，push到microtask队列
9. 输出刚刚push的 ```inner then2```
10. 内部new Promise执行完，外部promise第一个then拿到返回值，继续往下，遇到它的第二个then，push到microtask队列
11. 输出刚刚push的 ```then```

输出顺序为：promise -> inner promise -> inner then1 -> inner then2 -> then

注意：then链式调用时，如果前面的then方法return了一个新Promise对象，后面的then会等待这个新Promise对象状态发生变化后，才会执行，换句话说，两个then的执行由异步变成同步了，如果把return去掉呢？

## 变化，无return Promise

```js
Promise.resolve().then(function () {
  console.log('promise');
  new Promise((resolve, reject) => {
    console.log('inner promise');
    resolve();
  }).then(() => {
    console.log('inner then1');
  }).then(() => {
    console.log('inner then2');
  })
}).then(function () {
  console.log('then');
});
```
分析：

1. 整体代码为第一个task，从上到下开始执行
2. 遇到第一个then，push到microtask队列
3. 第一个task执行完成，查看microtask队列，有任务，开始执行
4. 输出 ```promise```
5. 进入内部new Promise，输出 ```inner promise```  
6. 遇到内部new Promise第一个then，push到microtask队列，前6步跟上面一样
7. 此时，外部Promise对象的第一个then里的同步代码已经执行完了，接着执行它的第二个then，push到microtask队列
8. 继续执行microtask，输出 ```inner then1```
9. 到了内部new Promise的第二个then，push到microtask队列
10. 继续执行microtask，输出 ```then```
11. 最后输出 ```inner then2```

输出顺序为：promise -> inner promise -> inner then1 -> then -> inner then2

总结：return去掉之后，前面的then执行完同步代码就会跳到下一个then

## 思考

最后思考一个问题，下面这个错误能被catch捕获到吗？为什么？

```js
new Promise(function (resolve, reject) {
  setTimeout(function () { 
    throw new Error('test') 
  }, 0)
  resolve('ok');
}).catch(err => {
  console.error(err);
});
```

熟悉了Event loops，回答这个问题就很容易：不能捕获到。因为错误在setTimeout内部抛出，setTimeout和.catch并不在同一个task执行，抛出错误的时候，catch已经执行完了。

> 觉得不错，点个star吧[Github](https://github.com/wangmeijian/blog/blob/master/docs/Event%20loops%E7%A7%92%E6%87%82.md)
