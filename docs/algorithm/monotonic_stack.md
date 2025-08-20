# 单调栈

## :star: leetcode739:每日温度

::: details

找到第一个比它大的 都应该想到单调栈

```js
var dailyTemperatures = function(temperatures) {
    const n = temperatures.length;
    const res = Array(n).fill(0);
    const stack = [];  // 递增栈：用于存储元素右面第一个比他大的元素下标
    stack.push(0);
    for (let i = 1; i < n; i++) {
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const top = stack.pop();
            res[top] = i - top;
        }
        stack.push(i);
    }
    return res;
};
```

:::

## leetcode496:下一个更大元素

::: details

```js

```

:::

## leetcode503：下一个更大元素II

::: details

```js

```

:::

## leetcode42:接雨水

::: details

```js

```

:::

## :star: leetcode84:柱状图中最大的矩形

```md
给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

输入：heights = [2,1,5,6,2,3]

输出：10

解释：最大的矩形为图中红色区域，面积为 10
```

::: details

```js
var largestRectangleArea = function(heights) {
    let maxArea = 0;
    const stack = []; // 初始化为空栈
    heights = [...heights, 0]; // 末尾添加0，确保所有柱子都能被处理
    for (let i = 0; i < heights.length; i++) {
        while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
            const stackTopIndex = stack.pop();
            // 如果栈为空，说明当前柱子是最小的，宽度就是i
            const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            const h = heights[stackTopIndex];
            maxArea = Math.max(maxArea, w * h);
        }
        stack.push(i);
    }
    
    return maxArea;
};
```

:::

