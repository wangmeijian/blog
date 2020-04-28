# Vue.$nextTick的思考

浏览器从服务请求请求静态资源到页面显示出来，大致分为5步：

1. HTML转换为DOM树
2. CSS转换为CSSOM（CSS Object Model）
3. 结合DOM树和CSSOM构建渲染树
4. 在内存中布局（Layout），计算出各个元素的大小、颜色、位置等
5. 把布局绘制（Painting）到屏幕上

## 减少布局（Layout）和渲染（Painting）

布局（Layout）和渲染（Painting）是最消耗性能的，因此要尽可能减少这两步。为了减少Layout和Painting，Vue把DOM更新设计为异步更新，每次侦听到数据变化，将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。然后在下一个的事件循环tick中，Vue才会真正执行队列中的数据变更。相当于把多个地方的DOM更新放到一个地方一次性全部更新。

同步更新DOM的情况下，以下代码会触发多次Layout和Painting
```html
<button id="app" :style="style">text</button>
```
```js
let app = document.querySelector('#app');

app.innerHTML = '1'
// ……其他代码……
app.innerHTML = '2'
// ……其他代码……
app.innerHTML = '1'
// ……其他代码……
app.innerHTML = 'text'
```
以上代码修改了元素文本内容，尽管有两次修改值是一样的，浏览器依然会认为元素被修改了4次，也就会触发4次布局和渲染。改为异步之后，浏览器一次重新布局和渲染都不会触发。

```html
<button id="app" :style="style">{{text}}</button>
```
```js
new Vue({
  el: '#app',
  data: {
    text: 'text'
  },
  mounted(){
    this.text = '1'
    // ……其它代码……
    this.text = '2'
    // ……其它代码……
    this.text = '1'
    // ……其它代码……
    this.text = 'text'
  }
})
```

首先对一个数据重复修改去重，只取最后一次```this.text = 'text'```，发现最终修改结果'text'和原有文本一样，diff算法得出的结果是没有差异，不需要重新布局和渲染。

## 数据变更时机：下一个的事件循环tick

上文说过，Vue数据变更队列会在下一个的事件循环tick中执行，“下一个的事件循环tick”指的是什么时候？

事实上，每次[事件循环](https://github.com/wangmeijian/blog/blob/master/docs/Event%20loops%E7%A7%92%E6%87%82.md)之后会都触发UI渲染，一次事件循环指的是一个（宏）任务（task）和一个微任务（microtask）队列，像这样：

<img src="https://raw.githubusercontent.com/wangmeijian/images/master/event-loops/event-loop-ui_render.jpg" />

数据变更在UI渲染之前，那么需要生成一个task或者microtask来处理数据变更。优先使用microtask，因为新生成的microtask会push到当前这一次事件循环的microtask队列末尾，这一次事件循环结束前就会执行到，如果是task则会push到task队列末尾，可能需要等待多次事件循环才后执行（取决于task队列的长度），等待时间较长。异步不是目的，只是手段，因此数据变更需要尽快执行。Vue.nextTick(callback)就是遵循这个原则，优先使用生成microtask的```Promise.then```和```MutationObserver```，如果浏览器不支持，才用```setImmediate```或者```setTimeout```代替。当然，没有首选task的另一个原因是，它会导致各种奇奇怪怪的问题，例如[#7109](https://github.com/vuejs/vue/issues/7109)，[#7153](https://github.com/vuejs/vue/issues/7153)，[#7546](https://github.com/vuejs/vue/issues/7546)，[#7834](https://github.com/vuejs/vue/issues/7834)，[#8109](https://github.com/vuejs/vue/issues/8109)。






