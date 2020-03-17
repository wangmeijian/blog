# Event loops秒懂

JS是一种单线程脚本语言，为什么当初设计成单线程？

假设JS是多线程脚本语言，A线程修改了DOM，B线程删除了DOM，一旦B线程先执行完，DOM被删除了，A线程就会报错，为了避免类似这种问题，JS从一诞生就是单线程  

单线程的问题是一次只能做一件事，要做第二件事，必须等第一件事先做完。假如有个需求是每5分钟更新一次数据，用setInterval去计时，那么这个页面JS永远无法做其他事了，因为线程一直被setInterval占用着。为了让JS可以同时执行多个任务，引入了Event loops机制，注意，Event loops使得JS可以同时执行多个任务，但任务的执行仍然是串行而非并行，那跟之前有什么区别？区别在于，Event loops会让JS任务按指定顺序穿插执行

那么重点来了，如何确定JS任务执行顺序？

Event loops中，JS任务分为2种，task队列、microtask队列，业界一般把tasks队列称为宏任务，把microtasks叫做微任务。

**每执行完一个task，就会查看microtask队列里有没有任务，microtask队列不为空，则按先进先出的原则依次执行，执行完了再继续下一个task；microtask队列为空，就直接执行下一个task，以此类推**

什么任务会添加到task？

代码刚开始执行时，整体代码就是一个task，在代码执行过程中，凡是看到setTimeout、setInterval、I/O、setImmediate（Nodejs环境）就往task队列里push

什么任务会添加到microtask？

在代码执行过程中，凡是看到Promise.then/catch/finally、MutationObserver、process.nextTick(Nodejs环境)就往microtask队列里push

按照以上规则，先自己思考一下输出顺序，看完本文后，这段代码根本不需要思考就能得出答案
```js
// 先自己思考一下输出顺序
console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function () {
  console.log('promise');
}).then(function () {
  console.log('then');
});

console.log('script end');
```

代码从上到下开始执行





