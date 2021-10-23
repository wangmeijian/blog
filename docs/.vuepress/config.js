module.exports = {
  title: 'Undefined的笔记本',
  description: 'Undefined的笔记本',
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