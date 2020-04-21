# Vue.$nextTick是如何实现DOM更新后调用的？

来自Vue官网的一段话：

> Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。……，然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 Vue.nextTick(callback)。这样回调函数将在 DOM 更新完成后被调用。

每次事件循环之后，都会触发一次UI Render，我们想要做的事情是在UI Render之后，Vue.nextTick(callback)能做到回调函数在DOM更新（UI Render）之后被调用，我脑海里浮现的第一个疑问是，它是怎么知道UI Render什么时候完成的？




