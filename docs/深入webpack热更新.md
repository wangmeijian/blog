# 深入webpack热更新

webpack热更新（简称HMR）给web开发者带来了极大的便利，它可以在修改代码后自动替换改动的部分，还能保持当前页面状态，省去了不必要的页面刷新，节省了web开发者的时间。

## HMR的执行过程

**首先```webpack-dev-server```启动本地服务，让浏览器可以请求本地静态资源。浏览器与本地服务建立一个```websocket```连接，```webpack```调用```chokidar```模块来监听文件变化，当用户修改文件后，```chokidar```通知```webpack```哪些文件发生了变化，```webpack```编译发生变化的文件，```webpack-dev-server```将重新编辑后的文件的hash发送给浏览器，浏览器以hash为参数发起请求获取更新的文件，获取文件后替换生效。**

## HMR详细执行过程

> 首先```webpack-dev-server```启动本地服务

查看源码webpack-dev-server/lib/Services.js，发现实际上就是实例化了一个express

```js
// webpack-dev-server/lib/Services.js
setupApp() {
  // Init express server
  // eslint-disable-next-line new-cap
  this.app = new express();
}
```
> 浏览器与本地服务建立一个```websocket```连接

浏览器端与本地服务建立通讯的代码哪来的？这样来的，webpack启用热更新，就会自动在入口文件插入浏览器端与本地服务通信的代码

> ```webpack```调用```chokidar```模块来监听文件变化

webpack内部会实例化一个编译器```compiler```,```compiler```继承了```tapable```


