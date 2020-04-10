# 深入webpack热更新

webpack热更新（简称HMR）给web开发者带来了极大的便利，它可以在修改代码后自动编译并替换修改的部分，还能保持当前页面状态，省去了不必要的页面刷新，节省了web开发者的时间。

## HMR的执行过程

**首先```webpack-dev-server```启动本地服务，让浏览器可以请求本地静态资源。浏览器与本地服务建立```websocket```连接，```webpack```调用```chokidar```模块来监听文件变化，当用户修改文件后，```chokidar```通知```webpack```哪些文件发生了变化，```webpack```编译修改的文件，```webpack-dev-server```将重新编辑后的文件的hash发送给浏览器，浏览器以hash为参数发起请求获取更新的文件，获取文件后替换生效。**

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

webpack内部会实例化一个编译器```compiler```，```compiler.watch```内部依赖了```chokidar```模块来监听文件变化，```chokidar```那么又是根据什么来判断文件发生了变化？而且webpack执行在node环境中，为什么不直接用```fs.watch```和```fs.watchFile```来监听文件变化？

实际上```chokidar```内部也依赖了```fs.watch```和```fs.watchFile```来监听文件变化，但这不是它的全部，由于```fs.watch```和```fs.watchFile```这两个API存在一些问题：

Nodejs ```fs.watch```  
* 在MacOS上使用Sublime编辑文件，不会报告文件修改事件
* 经常一次事件报告两次
* 报告的大多数事件是rename，在window系统上删除文件也报rename
* 没有提供简便的方法来递归监视文件树

Nodejs ```fs.watchFile```  
* 事件处理几乎一样糟糕
* 也没有提供任何递归监视
* 轮询方式监视文件，导致高CPU占用

Nodejs官方文档上有说明：fs.watch的API在各个平台上并非100%一致，在某些情况下不可用，比如Docker上。

为了解决以上问题，```chokidar```将内部核心内容分为两块，分别是```nodefs-handler.js```和```fsEvents-handler.js```，macOS使用```fsEvents-handler.js```监听文件变化，其它系统用```nodefs-handler.js```，用户可以通过```options.useFsEvents```配置强制使用```fsEvents-handler.js```来监听文件变化。```fsEvents-handler.js```内部又依赖```fsevents```模块，```fsevents```集成了C++从系统底层来监听文件变化，一图胜千言

<img src="https://raw.githubusercontent.com/wangmeijian/images/master/webpack/chokidar.png" width="600" />

node_modules/chokidar/index.js核心代码：

```js
// node_modules/chokidar/index.js

var NodeFsHandler = require('./lib/nodefs-handler');
var FsEventsHandler = require('./lib/fsevents-handler');

function importHandler(handler) {
  Object.keys(handler.prototype).forEach(function(method) {
    FSWatcher.prototype[method] = handler.prototype[method];
  });
}
// FSWatcher 继承了NodeFsHandler 和 FsEventsHandler的方法
importHandler(NodeFsHandler);
if (FsEventsHandler.canUse()) importHandler(FsEventsHandler);

// 增加文件监听
FSWatcher.prototype.add = function(paths) {
  // 判断用户配置以及系统是否支持fsevents，优先用fsevents监听文件变化
  if (this.options.useFsEvents && FsEventsHandler.canUse()) {
    // _addToFsEvents方法继承自FsEventsHandler
    paths.forEach(this._addToFsEvents, this);
  } else {
    asyncEach(paths, function(path, next) {
      // 否则还是用NodeFs监听文件
      // _addToNodeFs方法继承自NodeFsHandler
      this._addToNodeFs(path, !_internal, 0, 0, _origAdd, function(err, res) {
        if (res) this._emitReady();
        next(err, res);
      }.bind(this));
    }
  }
}

// Export FSWatcher class
exports.FSWatcher = FSWatcher;
```

> 浏览器以hash为参数发起请求获取更新的文件，获取文件后替换生效

浏览器端收到本地服务通过websocket发过来的hash值，直接以<script src="[chunkId].[hash].hot-update.js"></script>脚本的方式加载更新的chunk文件，文件内容是一个自动执行的全局函数```webpackHotUpdate```，```webpackHotUpdate```的参数是chunkId以及chunk包含的模块ID和内容
```js
webpackHotUpdate([chunkId], moreModules)
```

```webpackHotUpdate```是webpack挂载在window上的全局函数，用来下载热更新模块(moreModules)，moreModules是模块ID和模块内容的映射关系
```js
{
  [moduleId]: (function (module, exports) {
    eval('代码模块内容')
  })
}
```
```webpackHotUpdate```挂在window对象上
```js
window["webpackHotUpdate"] = function webpackHotUpdateCallback(chunkId, moreModules) {
  hotAddUpdateChunk(chunkId, moreModules);
}

function hotAddUpdateChunk(chunkId, moreModules) {
  // 遍历模块ID，保存到hotUpdate
  for (var moduleId in moreModules) {
    if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
      hotUpdate[moduleId] = moreModules[moduleId];
    }
  }
  if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
    hotUpdateDownloaded();
  }
}

function hotUpdateDownloaded() {
  var outdatedModules = [];
  // 遍历hotUpdate，push到outdatedModules，用于删除过时的模块
  for (var id in hotUpdate) {
    outdatedModules.push(id);
  }
}
```
删除过时的模块，```__webpack_require__[moduleId]```更新代码
```js
function hotApply(options){
  var queue = outdatedModules.slice();
  while (queue.length > 0) {
    // 删除缓存
    delete installedModules[moduleId];
    // 删除过时的依赖
    delete outdatedDependencies[moduleId];
  }
  // 保存模块ID，便于更新代码
  var outdatedSelfAcceptedModules = [];
	for (i = 0; i < outdatedModules.length; i++) {
    outdatedSelfAcceptedModules.push({
      module: moduleId
    });
  }

  for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
    var item = outdatedSelfAcceptedModules[i];
    moduleId = item.module;
    //更新代码
    __webpack_require__(moduleId);
  }
}
```
一图胜千言

<img src="https://raw.githubusercontent.com/wangmeijian/images/master/webpack/HMR.png" />

HMR大概就是这样