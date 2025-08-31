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
      {
        text: "数组", items: [
          {text: '哈希表', link: "/Array/hashtable.md"},
          {text: '双指针', link: "/Array/double_pointer.md"},
          {text: '滑动窗口', link: "/Array/sliding_window.md"},
          {text: '子串', link: "/Array/substring.md"},
          {text: "普通数组", link: "/Array/ordinary_array.md"},
          {text: "矩阵", link: "/Array/matrix.md"},
          {text: "二分查找", link: "/Array/binary_search.md"},
        ]
      },
      {
        text: "链表", items: [
          {text: '链表', link: "/linked_list/linked_list.md"}
        ]
      },
      {
        text: '二叉树', items: [
          {text: '二叉树', link: "/binary_tree/binary_tree.md"}
        ]
      },
      {
        text: "回溯", items: [
          {text: '回溯', link: "/backtrack/backtrack.md"}
        ]
      },
       {
        text: "栈", items: [
          {text: '栈', link: "/stack/stack.md"}
        ]
      },
       {
        text: "堆", items: [
          {text: '堆', link: "/heap/heap.md"}
        ]
      },
      {
        text: "贪心算法", items: [
          {text: '贪心算法', link: "/greedy/greedy.md"}
        ]
      },
       {
        text: "动态规划", items: [
          {text: '动态规划', link: "/dynamic_programming/dynamic_programming.md"}
        ]
      },
      {
        text: "其他", items: [
          {text: "图论", link: "/other/graph_theory.md"},
          {text: "技巧", link: "/other/skill.md"},
          {text: "重在属性展示", link: "/other/interview.md"},
        ]
      }
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
