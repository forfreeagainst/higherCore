import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "this-is-you",
  description: "Action speak louder than words.",
  base: process.env.NODE_ENV === 'production' ? '/higherCore/' : '/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {

        text: '算法', 
        items: [
          { text: '数组', link: '/algorithm/array.md' },
          { text: '链表', link: '/algorithm/linked_list.md' },
          { text: '哈希表', link: '/algorithm/hashtable.md' },
          { text: '字符串', link: '/algorithm/string.md' },
          { text: '栈与队列', link: '/algorithm/stack_and_queue.md' },
          { text: '二叉树', link: '/algorithm/binary_tree.md' },
          { text: '回溯算法', link: "/algorithm/backtrack.md"},
          { text: '贪心算法', link: "/algorithm/greedy.md"},
          { text: '动态规划', link: "/algorithm/dynamic_programming.md"},
          { text: '单调栈', link: "/algorithm/monotonic_stack.md"},
          { text: '代码总结', link: "/algorithm/fine.md"},
          { text: "leetcode100第一部", link: "/algorithm/algorithmOne.md"},
          { text: "leetcode100第二部", link: "/algorithm/algorithmTwo.md"},
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
