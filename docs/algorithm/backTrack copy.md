# 回溯算法

## 解决哪类题型？

* 组合问题
* 切割问题
* 子集问题
* 排列问题
* 棋盘问题

组合是无序的 [1, 2]，排列是有序的 [1, 2]和 [2, 1]。

## 解题思路

抽象为一个树形结构。本质上是递归调用for循环。

重要元素：
* 确立终止条件
* 递归函数的参数
* 单层递归的逻辑

组合问题：所要取的长度就是for循环的层数。

## letcode刷题

### 题号77：组合

给定两个整数 `n` 和 `k`，返回范围 `[1, n]` 中所有可能的 `k` 个数的组合。

你可以按 **任何顺序** 返回答案。

**示例 1：**

```md
输入： n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
```

#### 优化后，且剪枝的解法。

```js
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    const res = [];
    const path = [];

    function backTracking(n, k, startIndex) {
        if (path.length === k) {
            res.push(path.slice());
            return;
        }
        // k -path.length 还要选多少个元素。然后再举例可得。n-(k-path.length)+1;
        for(let i = startIndex; i <= n - (k - path.length) + 1; i++) {
            path.push(i);
            backTracking(n, k, i+1);
            path.pop()
        }
    }

    backTracking(n, k , 1);

    return res;
};
```

#### 没有剪枝的。

```js
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    const res = [];
    let path = [];

    function backTracking(n, k, startIndex) {
        if (path.length === k) {
            res.push(path);
            return;
        }
        for(let i = startIndex; i <= n; i++) {
            path.push(i);
            backTracking(n, k, i+1);
            // 使用pop不行的，还没理解透彻
            path = path.slice(0, -1);
        }
    }

    backTracking(n, k , 1);

    return res;
};
```

### 题号216：组合总和 III

找出所有相加之和为 `n` **的 `k` ****个数的组合，且满足下列条件：

-   只使用数字1到9
-   每个数字 **最多使用一次** 

返回 *所有可能的有效组合的列表* 。该列表不能包含相同的组合两次，组合可以以任何顺序返回。

若一个符合的组合都没有，返回空数组。

**示例 1:**

```
输入: k = 3, n = 7
输出: [[1,2,4]]
解释:
1 + 2 + 4 = 7
没有其他符合的组合了。
```

```js
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
    const res = [];
    const path = [];
    let sum = 0;
    
    function backtracking(n, k, startIndex) {
        if (sum === n && k === path.length) {
            res.push(path.slice())
            return;
        }
        if (sum > n) {
            return;
        }

        for(let i = startIndex; i <= 9 - (k -path.length) + 1; i++ ) {
            path.push(i);
            sum += i;
            backtracking(n, k, i + 1);
            const temp = path.pop();
            sum -= temp;
        }
    }

    backtracking(n, k, 1)

    return res;
};
```

### 题目：题号17 电话号码的字母组合

给定一个仅包含数字 `2-9` 的字符串，返回所有它能表示的字母组合。答案可以按 **任意顺序** 返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

const numArr = [
    "",
    "",
    "abc",
    "def",
    "ghi",
    "jkl",
    "mno",
    "pqrs",
    "tuv",
    "wxyz"
]
    
**示例 1：**

```
输入： digits = "23"
输出： ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

#### 解题思路

与前面两题不同，前面都是从一个集合去取，这里是从n个集合去取。不需要startIndex。

```js
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if (!digits) return [];
    const numArr = [
        "",
        "",
        "abc",
        "def",
        "ghi",
        "jkl",
        "mno",
        "pqrs",
        "tuv",
        "wxyz"
    ]

    const res = [];
    const path = [];
    
    function backtracking(index) {
        if (path.length === digits.length) {
            res.push(path.join(""));
            return;
        }

        for(const v of numArr[digits[index]]) {
            path.push(v);
            backtracking(index + 1);
            path.pop();
        }
    }

    backtracking(0);

    return res;
};
```

### 题号39：组合总和

## 回溯算法怎么做减枝？

通过画树形结构，看哪些分支，可以被裁剪。

## 隐藏回溯