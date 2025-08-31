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

## :star: leetcode20:有效的括号

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

## :star: leetcode347:前K个高频元素

## :star: leetcode155: 最小栈

## :star: leetcode394. 字符串解码
