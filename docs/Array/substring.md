# 子串

## :star: 560. 和为 K 的子数组(中等)

```md
给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。

子数组是数组中元素的连续非空序列。

输入：nums = [1,1,1], k = 2
输出：2

输入：nums = [1,2,3], k = 3
输出：2
```

::: details

```js
var subarraySum = function(nums, k) {
    const mp = new Map();
    mp.set(0, 1);
    let count = 0;
    let pre = 0;
    for (const x of nums) {
        pre += x;
        if (mp.has(pre -k)) {
            count += mp.get(pre - k);
        }
        if (mp.has(pre)) {
            mp.set(pre, mp.get(pre) + 1);
        } else {
            mp.set(pre, 1);
        }
    }
    return count;
};
```

枚举/暴力解法

```js
var subarraySum = function(nums, k) {
    let ans = 0;
    for(let ind = 0; ind <nums.length; ind ++) {
        let sum = 0;
        let rk = ind;
        while (rk < nums.length) {
            sum += nums[rk];
            if (sum === k) {
                ans ++;
            }
            rk ++;
        }
    }
    return ans;
};
```

:::

## :star: 239. 滑动窗口最大值(困难)

```md
给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧
移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。
滑动窗口每次只向右移动一位。

返回 滑动窗口中的最大值 。

输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[3,3,5,5,6,7]
解释：
滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7

输入：nums = [1], k = 1
输出：[1]
```

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

暴力解法，时间超出限制

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

## :star: 76. 最小覆盖子串(困难)

```md
给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符
的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

注意：

对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
如果 s 中存在这样的子串，我们保证它是唯一的答案。

输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。

输入：s = "a", t = "a"
输出："a"
解释：整个字符串 s 是最小覆盖子串。

输入: s = "a", t = "aa"
输出: ""
解释: t 中两个字符 'a' 均应包含在 s 的子串中，
因此没有符合条件的子字符串，返回空字符串。

进阶：你能设计一个在 o(m+n) 时间内解决此问题的算法吗？

```

::: details

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    if (t.length > s.length) return "";
    const target = {};
    const window = {};
    for(const val of t) {
        target[val] = (target[val] || 0) + 1;
    }
    let left = 0;
    let right = 0;
    let minLeft = 0;
    let minLen = Infinity;
    let count = Object.keys(target).length;
    while(right < s.length) {
        const rChar = s[right];
        if (target[rChar]) {
            window[rChar] = (window[rChar] || 0) + 1;
            if (window[rChar] === target[rChar]) {
                count --;
            }
        }
        right ++;
        while (count ===0) {
            if (right - left < minLen) {
                minLen = right - left;
                minLeft = left;
            }
            const lChar = s[left];
            if (target[lChar]) {
                window[lChar] --;
                if (window[lChar] < target[lChar]) {
                    count ++;
                }
            }
            left ++;
        }
    }
    return minLen === Infinity ? '': s.substring(minLeft, minLeft + minLen);
};
```

:::