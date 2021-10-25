module.exports = {
  title: 'Wang Blog',
  description: 'Wang Blog前端技术博客，session、token和cookie，React中共享组件逻辑的三种方式，Event loops秒懂，Vue.nexttick，Webpack,web系统中的权限控制,深入webpack热更新,Vue的数据异步更新机制Vue.nextTick',
  base: '/blog/',
  displayAllHeaders: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '大杂烩', link: '/comprehensive/' },
      { text: 'GitHub', link: 'https://github.com/wangmeijian' },
    ],
  },
  plugins: [
    ["vuepress-plugin-auto-sidebar", {}]
  ]
}