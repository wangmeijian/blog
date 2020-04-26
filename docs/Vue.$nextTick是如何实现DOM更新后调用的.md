# Vue.$nextTick是如何实现DOM更新后调用的？

来自Vue官网的一段话：

> Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。……，然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 Vue.nextTick(callback)。这样回调函数将在 DOM 更新完成后被调用。

了解过[事件循环](https://github.com/wangmeijian/blog/blob/master/docs/Event%20loops%E7%A7%92%E6%87%82.md)就知道，每次事件循环之后，都会触发一次UI Render，像这样：

<img src="https://raw.githubusercontent.com/wangmeijian/images/master/event-loops/event-loop-ui_render.jpg" />

假如我们想在UI Render之后做点什么，只需要将代码放到下次事件循环的microtask或task中去执行。由于下一次事件循环执行，意味着上一次UI Render早已完成，Vue.nextTick(callback)方法，就是利用这一点，来实现回调函数在DOM更新之后被调用。

为了说明下一次microtask在UI Render之后执行，看看下面的demo

```html
<button id="test">测试</button>
```
```js
let test = document.querySelector('#test')

test.addEventListener('click', () => {
  Promise.resolve().then(() => {
    test.innerHTML = 'microtask';
  })
  test.innerHTML = 'change';
  debugger; // 此时内容已更新，microtask还没有执行
})
```
点击按钮，执行到debugger，发现按钮内容变为```change```，说明UI Render执行完了，```test.innerHTML = 'microtask';```还没执行。







