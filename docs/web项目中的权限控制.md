# web系统中的权限控制

六七年前，web系统中一般会有一个专门的403页面，用来阻止用户访问没有权限的页面或者操作，用户访问了没有权限的页面，由后端重定向到403页面。随着web技术发展，前端交互越来越多，权限控制越来越细，尤其B端web产品，一个系统可能有多达几十个角色，每个角色拥有不同的权限，一个用户对应一种角色，通过对角色权限的划分来控制用户权限，权限控制需要细分到页面上的操作按钮，如果再依靠以前那种页面跳转的交互方式来控制权限，未免太过低效，如何依靠前端实现权限控制，提高效率又能便于开发和管理呢？

对前端来说，权限控制分两种，第一种是页面级的，第二种是按钮级别的。

## 控制路由

第一种比较简单，按模块划分用户权限，隐藏没有权限的页面导航，再在路由层面增加权限判断，拦截越权页面路由。

举例，假如页面路由path是```/user```，某用户没有user页面权限，对应权限值为```user: false```

```js
const router = new VueRouter({ ... })
// 当前用户权限列表
const permission = {
  // 模块权限
  user: false
}
router.beforeEach((to, from, next) => {
  // 路由path和权限对应
  if( !permission[to.path] ){
    next('/403')
  }
  next();
})
```

如果不想把权限直接和path关联，也可以把权限信息写到路由配置的meta  

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user',
      component: User,
      meta: {
        permission: 'user'
      }
    }
  ]
})
// 当前用户权限列表
const permission = {
  // 模块权限
  user: false
}
router.beforeEach((to, from, next) => {
  // 没有权限，跳转到403页面
  if( !permission[to.meta.permission] ){
    next('/403')
  }
  next();
})
```

## 控制按钮

第二种，对页面某个操作按钮做权限判断。

举个例子，根据网络实名制规定，用户在网站跟帖评论必须实名制，为了引导未实名用户参与评论，又不能直接对其隐藏评论功能，这时候就要引入权限，区分已实名与未实名用户，在“提交评论”按钮上做权限判断。一个web系统中要做权限判断的地方往往有很多，如果对每个按钮绑定事件回调，工作量太大，同时也不好维护，更好的做法是，使用自定义指令

```js
import { Message } from 'element-ui'
// 当前用户权限列表
const permission = {
  // 模块权限
  user: false
}
// 注册一个全局自定义指令 `v-permission`
Vue.directive('permission', {
  bind: function (el, binding) {
    // 点击时判断权限
    el.addEventListener('click', () => {
      if (!permission[binding.value] ){
        Message.error('无权限')
      }
    }, false)
  }
})
```

使用

```js
<button v-permission="'user'" @click="submit">提交评论</button>
```
你会发现点击按钮，submit同时也触发了，为了解决这个问题，需要把submit放到权限判断之后去执行  

```js
<button v-permission="{
  value: 'user',
  click: submit
}">提交评论</button>
```
```js
import { Message } from 'element-ui'
// 当前用户权限列表
const permission = {
  // 模块权限
  user: false
}
// 注册一个全局自定义指令 `v-permission`
Vue.directive('permission', {
  bind: function (el, binding) {
    let { value, click } = binding.value;
    // 点击时判断权限
    el.addEventListener('click', () => {
      if (!permission[value] ){
        Message.error('无权限')
        return false;
      }
      click();
    }, false)
  }
})
```
## 禁用按钮

某些情况下，需要禁用无权限的操作

```html
<button v-permission="{
  value: 'user',
  disabled: true
}">提交评论</button>
```
```js
// js
import { Message } from 'element-ui'
// 当前用户权限列表
const permission = {
  // 模块权限
  user: false
}
// 注册一个全局自定义指令 `v-permission`
Vue.directive('permission', {
  bind: function (el, binding) {
    if (!permission[value] ){
      Message.error('无权限')
      el.setAttribute('disabled','disabled')
    }
  }
})
```



