import { defineConfig } from "vitepress";

export default defineConfig({
  title: "编程笔记",
  description: "前端、后端与开发工具的技术学习笔记",
  lang: "zh-CN",
  titleTemplate: false,
  head: [
    ["link", { rel: "icon", href: "/vitepress-logo-mini.png" }],
    ["meta", { name: "theme-color", content: "#2563eb" }],
    ["meta", { name: "author", content: "编程笔记" }],
  ],
  markdown: {
    languageAlias: {
      mysql: "sql",
      gitignore: "ini",
    },
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
  },

  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "前端", link: "/frontend/html" },
      { text: "后端", link: "/backend/python" },
      { text: "工具", link: "/tools/stable-diffusion" },
      { text: "学习路线", link: "/fullstack-roadmap" },
      { text: "待分类", link: "/others" },
    ],

    sidebar: {
      "/frontend/": [
        {
          text: "前端",
          items: [
            { text: "HTML", link: "/frontend/html" },
            { text: "CSS", link: "/frontend/css" },
            { text: "JavaScript", link: "/frontend/javascript" },
            { text: "Vue", link: "/frontend/vue" },
          ],
        },
      ],

      "/backend/": [
        {
          text: "后端",
          items: [
            { text: "Python", link: "/backend/python" },
            { text: "Java", link: "/backend/java" },
            { text: "C++", link: "/backend/cpp" },
          ],
        },
      ],

      "/tools/": [
        {
          text: "工具",
          items: [
            { text: "Stable Diffusion", link: "/tools/stable-diffusion" },
          ],
        },
      ],

    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索笔记",
            buttonAriaLabel: "搜索笔记",
          },
          modal: {
            displayDetails: "显示详情",
            resetButtonTitle: "清除搜索",
            backButtonTitle: "关闭搜索",
            noResultsText: "没有找到相关内容",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },
    outline: {
      level: [2, 3],
      label: "本页目录",
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    returnToTopLabel: "返回顶部",
    sidebarMenuLabel: "目录",
    darkModeSwitchLabel: "切换主题",
    lightModeSwitchTitle: "切换至浅色模式",
    darkModeSwitchTitle: "切换至深色模式",
    footer: {
      message: "学无止境",
      copyright: "Copyright © 2023–2026 编程笔记",
    },
  },
});
