# 栈

## :star: 20. 有效的括号(简单)

```md
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，
判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
每个右括号都有一个对应的相同类型的左括号。

输入：s = "()"
输出：true

输入：s = "()[]{}"
输出：true

输入：s = "(]"
输出：false

输入：s = "([])"
输出：true

输入：s = "([)]"
输出：false
```

::: details

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const arr = [];
    for(let i = 0; i < s.length; i++) {
        const end = arr[arr.length - 1];
        if (end === '[' && s.charAt(i) === ']') {
            arr.pop()
        } else if (end === '{' && s.charAt(i) === '}') {
            arr.pop();
        } else if (end === '(' && s.charAt(i) === ')') {
            arr.pop();
        } else {
            arr.push(s.charAt(i));
        }
    }
    return arr.length === 0;
};
```

:::

## :star: 155. 最小栈(中等)

```md
设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

实现 MinStack 类:

MinStack() 初始化堆栈对象。
void push(int val) 将元素val推入堆栈。
void pop() 删除堆栈顶部的元素。
int top() 获取堆栈顶部的元素。
int getMin() 获取堆栈中的最小元素。

输入：
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

输出：
[null,null,null,null,-3,null,0,-2]

解释：
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.
```

::: details

```js
// 先进后出
// 栈顶是先出来的那个
var MinStack = function() {
    this.stack = [];
    this.min_stack = [Infinity];
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    this.stack.push(val);
    // 将上一步得到的新最小值推入辅助栈
    this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], val));
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.stack.pop();
    this.min_stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.min_stack[this.min_stack.length - 1];
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
```

:::

## :star: 394. 字符串解码(中等)

```md
给定一个经过编码的字符串，返回它解码后的字符串。

编码规则为: k[encoded_string]，表示其中方括号内部的
 encoded_string 正好重复 k 次。注意 k 保证为正整数。

你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，
且输入的方括号总是符合格式要求的。

此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，
例如不会出现像 3a 或 2[4] 的输入。

测试用例保证输出的长度不会超过 105。

输入：s = "3[a]2[bc]"
输出："aaabcbc"

输入：s = "3[a2[c]]"
输出："accaccacc"

输入：s = "2[abc]3[cd]ef"
输出："abcabccdcdcdef"

输入：s = "abc3[cd]xyz"
输出："abccdcdcdxyz"
```

::: details

```js
var decodeString = function(s) {
   const stack = [];
   let str = "";
   let count = 0;
   for(let v of s) {
        if (/\d/.test(v)) {
            count = count * 10 + Number(v);
        } else if (v === '[') {
            stack.push({
                str,
                count
            })
            str = '';
            count = 0;
        } else if (v === ']') {
            const {str: strTemp, count: countTemp} = stack.pop();
            str = strTemp + str.repeat(countTemp);
        } else {
            str += v;
        }
   }
   return str;
};
```

:::

## :star: 739. 每日温度(中等)(单调栈)

```md
给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，
其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。
如果气温在这之后都不会升高，请在该位置用 0 来代替。

输入: temperatures = [73,74,75,71,69,72,76,73]
输出: [1,1,4,2,1,1,0,0]

输入: temperatures = [30,40,50,60]
输出: [1,1,1,0]

输入: temperatures = [30,60,90]
输出: [1,1,0]
```

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

## :star: 84. 柱状图中最大的矩形(困难)(单调栈)

```md
给定 n 个非负整数，用来表示柱状图中各个柱子的高度。
每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

输入：heights = [2,1,5,6,2,3]
输出：10
解释：最大的矩形为图中红色区域，面积为 10

输入： heights = [2,4]
输出： 4
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