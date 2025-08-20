# 栈与队列

```md
前端常见数据结构

队列：queue FIFO 先进先出 ->打印队列，线程队列
栈: stack FILO 先进后出
```

## leetcode232.用栈实现队列

```md
将一个栈当作输入栈，用于压入 push 传入的数据；另一个栈当作输出栈，用于 pop 和 peek 操作。

每次 pop 或 peek 时，若输出栈为空则将输入栈的全部数据依次弹出并压入输出栈，这样输出栈从栈顶往栈底的顺序就是队列从队首往队尾的顺序。

输出栈为空是唯一正确的触发条件，确保：

out_stack 的栈顶始终是队列的头元素。

避免不必要的转移操作。

严格满足队列的 FIFO 特性。
```

::: details

```js
var MyQueue = function() {
    this.stackIn = [];
    this.stackOut = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.stackIn.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    if (this.stackOut.length === 0) {
        while(this.stackIn.length) {
            this.stackOut.push(this.stackIn.pop())
        }
    } 
    return this.stackOut.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    if (this.stackOut.length === 0) {
        while(this.stackIn.length) {
            this.stackOut.push(this.stackIn.pop())
        }
    }
    return this.stackOut[this.stackOut.length - 1];
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.stackIn.length === 0 && this.stackOut.length === 0;
};

/** 
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
```

:::

## leetcode225:用队列实现栈

::: details

```js

```

:::

## :star: leetcode20:有效的括号

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

## leetcode1047.删除字符串中的所有相邻重复项

::: details

```js
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function(s) {
    const arr = [];
    for(let i = 0; i < s.length; i++) {
        const end = arr[arr.length - 1];
        if (end === s.charAt(i)) {
            arr.pop();
        } else {
            arr.push(s.charAt(i));
        }
    }
    return arr.join('');
};
```

:::

## leetcode150逆波兰表达式求值

要注意转整数呀，同时除法的结果，暗藏杀机。

::: details

```js
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
    let res = [];
    for(let i = 0; i < tokens.length; i++) {
        if (['+', '-', '*', '/'].includes(tokens[i])) {
           const end = Number(res.pop());
           const start = Number(res.pop());
           if (tokens[i] === '/') {
                const temp = start / end;
                res.push(temp > 0 ? Math.floor(temp): Math.ceil(temp));
           } else if (tokens[i] === '+'){
               res.push(start + end);
            } else if (tokens[i] === '-'){
               res.push(start - end);
            } else if (tokens[i] === '*'){
               res.push(start * end);
           }
        } else {
            res.push(Number(tokens[i]));
        }
    }
    return res[0]
};
```

:::

## leetcode239:滑动窗口最大值

::: details

```js
var maxSlidingWindow = function(nums, k) {
    const arr = [];
    for(let i = 0; i < k; i++) {
        while (arr.length && arr[arr.length - 1] < nums[i]) {
            arr.pop();
        }
        arr.push(nums[i]);
    }
    const res = [arr[0]];
    for(let i = k; i < nums.length; i++) {
         while(arr.length && arr[arr.length - 1] < nums[i]) {
            arr.pop();
        }
        arr.push(nums[i]);

        if (arr.length && arr[0] === nums[i - k]) {
            arr.shift();
        }

        res.push(arr[0])
    }
    return res;
};
```

### 暴力解法，时间超出限制

```js
var maxSlidingWindow = function(nums, k) {
    const res = [];
    const arr = [];
    for(let i = 0; i < nums.length; i ++) {
        arr.push(nums[i]);
        if (arr.length === k) {
            let max = -Infinity;
            for(let j = 0; j < arr.length; j++) {
                max = Math.max(max, arr[j]);
            }
            res.push(max);
            arr.shift()
        }
    }
    return res;
};
```

:::

## :star: leetcode347:前K个高频元素

::: details

给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。

输入: nums = [1,1,1,2,2,3], k = 2

输出: [1,2]

### O(n)的时间复杂度解法

```js
var topKFrequent = function(nums, k) {
    // 1. 统计每个数字出现的频率 - O(n)
    const frequencyMap = {};
    for (const num of nums) {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    }
    
    // 2. 创建桶数组 - 索引代表频率，值是该频率的所有数字 - O(n)
    const bucket = [];
    for (const [num, freq] of Object.entries(frequencyMap)) {
        if (!bucket[freq]) {
            bucket[freq] = [];
        }
        bucket[freq].push(parseInt(num));
    }
    
    // 3. 从高频率到低频率遍历桶，收集结果 - O(n)
    const result = [];
    for (let i = bucket.length - 1; i >= 0 && result.length < k; i--) {
        if (bucket[i]) {
            result.push(...bucket[i]);
        }
    }
    
    // 4. 如果结果超过k个，截取前k个
    return result.slice(0, k);
};
```

### 不考虑时间复杂度O(NLogN)

```js
var topKFrequent = function(nums, k) {
    // 统计每个数字出现的频率
    const frequencyMap = {};
    for (const num of nums) {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    }
    
    // 将数字和频率转换为数组
    const entries = Object.entries(frequencyMap);
    
    // 按频率降序排序
    entries.sort((a, b) => b[1] - a[1]);
    
    // 取前k个元素
    return entries.slice(0, k).map(entry => parseInt(entry[0]));
};
```

:::

## :star: leetcode155: 最小栈

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

## :star: leetcode394. 字符串解码

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
