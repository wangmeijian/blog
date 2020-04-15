# web项目中的权限控制

六七年前，web项目中一般会有一个专门的403页面，用来阻止用户访问没有权限的页面或者操作，用户访问了没有权限的页面，就跳转到403页面，这种权限控制主要由后端来做。随着技术不断发展，前端交互越来越多，权限控制越来越细，尤其B端web产品，一个系统可能有多达几十个角色，每个角色拥有不同的权限，一个用户对应一种角色，通过对角色权限的划分来控制用户权限，权限控制需要细分到页面上某个点击操作，如果再依靠以前那种页面跳转的交互方式来控制权限，未免太过低效，如何提高权限控制交互效率，又能便于开发和管理？

对前端来说，权限控制分两种，第一种是页面级的，第二种是页面上某个块或某个按钮级别的。

第一种比较简单，按模块划分用户权限，隐藏没有权限的页面导航，再在路由层面增加权限判断，拦截用户直接输入无权限页面的URL访问

```js
const router = new VueRouter({ ... })
// 当前用户权限列表
const permission = {
  // 模块权限
  user: false
}
router.beforeEach((to, from, next) => {
  if( !permission[to.path] ){
    next('/403)
  }
  next();
})
```
如果不想直接用path来判断，也可以把权限信息写到路由配置里  

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
  if( !permission[to.meta.permission] ){
    next('/403)
  }
  next();
})
```

