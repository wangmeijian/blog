# Event loops秒懂

JS是一种单线程脚本语言，为什么当初设计成单线程？

假设JS是多线程脚本语言，A线程修改了DOM，B线程删除了DOM，一旦B线程先执行完，DOM被删除了，A线程就会报错，为了避免类似这种问题，JS从一诞生就是单线程  

单线程的问题是一次只能做一件事，要做第二件事，必须等第一件事先做完。假如有个需求是每5分钟更新一次数据，用setInterval去计时，那么这个页面JS永远无法做其他事了，因为线程一直被setInterval占用着。为了让JS可以同时执行多个任务，引入了Event loops机制，注意，Event loops使得JS可以同时执行多个任务，但任务的执行仍然是串行而非并行，那跟之前有什么区别？区别在于，Event loops会让JS任务按指定顺序穿插执行

那么重点来了，如何确定JS任务执行顺序？

先自己思考一下输出顺序，看完本文，这段代码根本不需要思考就能得出答案
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

代码从上到下开始执行，将代码分为2部分，task队列、microtask队列，业界一般把tasks队列称为宏任务，把microtasks叫做微任务。

task有setTimeout、setInterval、I/O、setImmediate（Nodejs环境）
microtask有Promise.then/catch/finally、MutationObserver、process.nextTick(Nodejs环境)




