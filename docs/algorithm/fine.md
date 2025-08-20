# 好好

## 审题方面

::: details

* 返回索引，还是值

:::

## 语法错误

## :star: 抛出类型错误

`throw new TypeError(__serialize__(ret) + " is not valid value for the expected return type ListNode"`

```js
cur.next = new ListNode(arr[i])
```

## 直接利用 Map 的插入顺序特性，无需额外队列

## 2k 改为 2 * k

## 字符串不可变性，通过索引修改字符串是不行的。

::: details

```md
let s = "abc";
s[0] = "x"; // 这样是无效的，字符串不会改变
console.log(s); // 仍然是 "abc"
```

:::

### sort

需要手写sort

```js
[5,3,1].sort((a, b) => a - b); // [1, 3, 5]  a-b升序

const arr = [5, 3, 1];
arr.sort((a, b) => {
    console.log(a, b);
    return a - b;
})
```

### js没有 // 整除。

* Math.floor(33 / 10);
* ~~(33 / 10);

### 心手不一

* unshift：前面添加，shift前面移除

### 使用const，又赋值运算符

::: details

使用 let。

```js
const countTemp = bMap.get(sum) || 0;
// 先++， 再赋值
bMap.set(sum, ++countTemp);
```

:::

### 如何遍历Map

::: details

```js
for(let [key, val] of map) {
    if (val >= k) {
        res.push(key)
    }
}
```

:::

## 常用语法

::: details

```js
// 初始化长度为8的数组，且元素都是0
Array(8).fill(0);

```

:::

## 代码优化

```js
// 再去重
while (left < right && nums[left] === nums[++left]); // 跳过重复的数字
while (left < right && nums[right] === nums[--right]);

do { left++; } while (left < right && nums[left] === nums[left - 1]);
do { right--; } while (left < right && nums[right] === nums[right + 1]);

// 第一次：无条件执行 left++（即使 nums[left] 不重复也会先移动一次）。
// 后续：如果 nums[left] === nums[left - 1]，则继续 left++，直到不满足条件。
```

## 常用方法的时间复杂度

* sort: nlogn
* Set.has: 时间复杂度 O(1)
* Array.indexOf() 和 Array.includes() :时间复杂度：O(n)
* reverse() :时间复杂度O(n)

## 刷题顺序

::: details

* 数组 
* 链表
* 哈希表
* 字符串
* 栈与队列
* 二叉树
* 回溯算法
* 贪心算法
* 动态规划
* 单调栈

:::