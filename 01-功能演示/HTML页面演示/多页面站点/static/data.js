/* 共享数据模块
 *
 * 为什么不直接放 static/data.json？
 * /full/ 路由只放行 HTML 与精选静态资源（图片、CSS/JS、字体、音视频、WASM），
 * JSON / YAML / TXT 等数据文件不在允许列表里，避免把仓库里的配置或私密数据
 * 变成可直接下载的文件。需要给页面共享数据时，用 JS 模块（本文件）或内联脚本。
 */
window.SITE_DATA = {
  name: 'Aurora Studio',
  tagline: '多文件站点 · 沙箱运行',
  version: '2.4.0',
  updated: '2026-11-09',
  pages: [
    { title: '首页', path: 'index.html', note: '站点入口，汇总这个演示用到的能力。' },
    { title: '指南', path: 'guide/', note: '目录索引：访问 guide/ 时返回 guide/index.html。' },
    { title: '模块', path: 'modules', note: '无扩展名路径：modules 解析为 modules.html。' },
    { title: '关于', path: 'about.html', note: '沙箱边界与实现说明。' }
  ],
  modules: [
    {
      name: '目录索引',
      version: '1.2.0',
      progress: 100,
      status: '已启用',
      description: '以 / 结尾的地址自动返回 index.html，页面间链接不需要写死文件名。'
    },
    {
      name: '相对跳转',
      version: '1.0.4',
      progress: 100,
      status: '已启用',
      description: '页面之间使用相对路径互相链接，在 /full/ 与文章沙箱里都保持可用。'
    },
    {
      name: '共享资源',
      version: '2.1.0',
      progress: 100,
      status: '已启用',
      description: '所有页面引用同一份 assets/site.css 与 assets/site.js。'
    },
    {
      name: '数据模块',
      version: '0.9.2',
      progress: 76,
      status: '演示中',
      description: '把共享数据放进 static/data.js，由页面脚本读取并渲染。'
    }
  ]
};
