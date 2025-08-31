# 数组

## 二分查找

## :star: letcode35

## :star: leetcode74



## :star: leetcode34.在排序数组中查找元素的第一个和最后一个位置

```md
给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。

示例 1：

输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
示例 2：

输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]
示例 3：

输入：nums = [], target = 0
输出：[-1,-1]
```

实现功能，时间复杂度不行

::: details

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    let start = -1;
    let end = -1;
    for(let i = 0; i < nums.length; i++) {
        if (nums[i] === target && start !== -1) {
            end = i;
        } else if (nums[i] === target) {
            start = i;
            end = i;
        }
    }
    return [start, end]
};
```


```js
function searchRange(nums, target) {
    function findFirst() {
        let left = 0, right = nums.length - 1, res = -1;
        while (left <= right) {
            const mid = (left + right) >> 1;
            if (nums[mid] >= target) {
                right = mid - 1;
                // 继续向左搜索，以确保找到最左边的那个
                if (nums[mid] === target) res = mid; // 记录可能的答案
            } else {
                left = mid + 1;
            }
        }
        return res;
    }

    function findLast() {
        let left = 0, right = nums.length - 1, res = -1;
        while (left <= right) {
            const mid = (left + right) >> 1;
            if (nums[mid] <= target) {
                left = mid + 1;
                if (nums[mid] === target) res = mid; // 记录可能的答案
            } else {
                right = mid - 1;
            }
        }
        return res;
    }

    const first = findFirst();
    const last = findLast();
    return [first, last];
}
```

:::

## :star: leetcode33.搜索旋转排序数组

```md
整数数组 nums 按升序排列，数组中的值 互不相同 。

在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 向左旋转 3 次后可能变为 [4,5,6,7,0,1,2] 。

给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。

示例 1：
输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4

示例 2：
输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1

示例 3：
输入：nums = [1], target = 0
输出：-1
```

::: details

```js
var search = function(nums, target) {
    return nums.indexOf(target);
    return nums.findIndex(v => v === target);
};
```

```js
function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;
        }
        
        // 判断左半部分是否有序
        if (nums[left] <= nums[mid]) {
            // 如果 target 在左半部分的范围内
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // 右半部分有序
            // 如果 target 在右半部分的范围内
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}
```

:::

## :star: leetcode153.寻找旋转排序数组中的最小值

```md
已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。例如，原数组 nums = [0,1,2,4,5,6,7] 在变化后可能得到：
若旋转 4 次，则可以得到 [4,5,6,7,0,1,2]
若旋转 7 次，则可以得到 [0,1,2,4,5,6,7]
注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。

给你一个元素值 互不相同 的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。

你必须设计一个时间复杂度为 O(log n) 的算法解决此问题

示例 1：
输入：nums = [3,4,5,1,2]
输出：1
解释：原数组为 [1,2,3,4,5] ，旋转 3 次得到输入数组。

示例 2：
输入：nums = [4,5,6,7,0,1,2]
输出：0
解释：原数组为 [0,1,2,4,5,6,7] ，旋转 4 次得到输入数组。

示例 3：
输入：nums = [11,13,15,17]
输出：11
解释：原数组为 [11,13,15,17] ，旋转 4 次得到输入数组。
```

::: details

```js
var findMin = function(nums) {
    let min = nums[0];
    for(let i = 1; i < nums.length; i++) {
        if (nums[i] < min) {
            min = nums[i]
        }
    }
    return min;
};
```

```js
var findMin = function(nums) {
    let left = 0;
    let right = nums.length - 1;
    while(left < right) {
        const mid = (left + right) >> 1;
        if (nums[mid] < nums[right]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return nums[left]
};
```

:::

## :star: leetcode4.寻找两个正序数组的中位数（困难）

```md
给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。

算法的时间复杂度应该为 O(log (m+n)) 

示例 1：
输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2

示例 2：
输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
```

::: details

```js
var findMedianSortedArrays = function(nums1, nums2) {
    let arr = [...nums1, ...nums2];
    arr.sort((a, b) => a -b); // O(M+N)， 不是n Log n
    if (arr.length % 2 === 0) {
        let left = 0;
        let right = arr.length - 1;
        const mid = (left + right) >> 1;
        return( arr[mid] + arr[mid + 1] ) / 2
    } else {
        return arr[arr.length >> 1]
    }
};
```

```js
function findMedianSortedArrays(nums1, nums2) {
    const m = nums1.length;
    const n = nums2.length;
    
    // 确保 nums1 是较短的数组，减少二分次数
    if (m > n) {
        return findMedianSortedArrays(nums2, nums1);
    }
    
    const total = m + n;
    const half = Math.floor((total + 1) / 2); // 中位数的位置
    
    let left = 0;
    let right = m;
    
    while (left <= right) {
        const i = Math.floor((left + right) / 2); // nums1 的分割点
        const j = half - i;                      // nums2 的分割点
        
        // 处理边界情况
        const nums1Left = i === 0 ? -Infinity : nums1[i - 1];
        const nums1Right = i === m ? Infinity : nums1[i];
        const nums2Left = j === 0 ? -Infinity : nums2[j - 1];
        const nums2Right = j === n ? Infinity : nums2[j];
        
        // 检查分割点是否正确
        if (nums1Left <= nums2Right && nums2Left <= nums1Right) {
            // 找到正确的分割点
            if (total % 2 === 1) {
                // 奇数情况，返回较大的左半部分
                return Math.max(nums1Left, nums2Left);
            } else {
                // 偶数情况，返回左半部分的最大和右半部分的最小平均值
                return (Math.max(nums1Left, nums2Left) + Math.min(nums1Right, nums2Right)) / 2;
            }
        } else if (nums1Left > nums2Right) {
            // nums1 的左半部分太大，向左调整分割点
            right = i - 1;
        } else {
            // nums2 的左半部分太大，向右调整分割点
            left = i + 1;
        }
    }
    
    return 0; // 不会执行到这里
}
```

:::

## leetcode704

给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

输入: nums = [-1,0,3,5,9,12], target = 9

输出: 4

解释: 9 出现在 nums 中并且下标为 4

::: details

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    // 只有一个元素，判断要不要while循环。显然要，所以是等于
    // 左闭右开，左闭右闭，看要不要等于
    while(left <= right) {
        const middle = (left + right) // 2;
        if (nums[middle] > target) {
            right = middle - 1;
        } else if (nums[middle] < target) {
            left = middle + 1;
        } else {
            return middle;
        }
    }
    // return nums.findIndex(v => v===target);
    return -1;
};
```

```js
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    let res = -1;
    while(left <= right) {
        // let middle = Math.floor((left + right) / 2);
        let middle = (left + right) // 2;
        if (nums[middle] === target) {
            res = middle;
            break;
        }  else if (nums[middle] < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }
    return res;
};
```

### 类似题目：2529. 正整数和负整数的最大计数

```js

```

:::

## 快慢指针

注意返回值

## leetcode27

给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素。元素的顺序可能发生改变。然后返回 nums 中与 val 不同的元素的数量。

假设 nums 中不等于 val 的元素数量为 k，要通过此题，您需要执行以下操作：

更改 nums 数组，使 nums 的前 k 个元素包含不等于 val 的元素。nums 的其余元素和 nums 的大小并不重要。
返回 k。

输入：nums = [3,2,2,3], val = 3

输出：2, nums = [2,2,_,_]

解释：你的函数函数应该返回 k = 2, 并且 nums 中的前两个元素均为 2。

你在返回的 k 个元素之外留下了什么并不重要（因此它们并不计入评测）。

::: details

```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    let fast = 0;
    let slow = 0;
    // 后面的覆盖前面的
    while(fast < nums.length) {
       if (nums[fast] !== val) {
        nums[slow++] = nums[fast];
       } 
       fast ++;
    }
    return slow; //返回的不是数组本身
};
```

### 类似题目：26. 删除有序数组中的重复项

注意返回值

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let slow = 1;
    let fast = 1;
    let temp = nums[0];
    while(fast < nums.length) {
       if (nums[fast] !== temp) {
            nums[slow++] = nums[fast];
            temp = nums[fast];
       }
       fast ++;
    }
    return slow; // 返回新数组的长度
};
```

### 类似题目：80. 删除有序数组中的重复项 II

```js

```

:::

## 双指针

## leetcode977

给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

示例 1：

输入：nums = [-4,-1,0,3,10]

输出：[0,1,9,16,100]

解释：平方后，数组变为 [16,1,0,9,100]

排序后，数组变为 [0,1,9,16,100]

::: details

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    let res = new Array(nums.length);
    // let res = [];
    let i = nums.length - 1;
    // 值得注意的是，负数的平方可能会大于 正数的平方,最大的在两边
    let l = 0; // 左指针
    let r = nums.length - 1; // 右指针
    while(l <= r) {
        const ll = nums[l] * nums[l]; // 左边的平方
        const rr = nums[r] * nums[r]; // 右边的平方
        if (ll > rr) {
            res[i --] = ll;
            l ++;
        } else {
            res[i --] = rr;
            r --;
        }
    }
    return res;
};
```

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    let left = 0;
    let right = nums.length - 1;
    const res = [];
    let len = nums.length -1;
    // 首先最大的平方数，一定是在最左边 或者 最右边
    while(left <= right) {
        const left2 = nums[left] * nums[left];
        const right2 = nums[right] * nums[right];
        if (left2 <= right2) {
            res[len] = right2;
            right --;
        } else {
            res[len] = left2;
            left ++;
        }
        len --;
    }
    return res;
};
```

### 类似题目：88. 合并两个有序数组

```js
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let len = m + n -1;
    let m_len = m - 1;
    let n_len = n - 1;
    // 为啥不是len? 而是n_len. 越界访问nums2
    while(n_len >= 0) {
        if (nums1[m_len] >= nums2[n_len]) {
            nums1[len] = nums1[m_len];
            m_len --;
        } else {
            nums1[len] = nums2[n_len];
            n_len --;
        }
        len --;
    }
};
```

:::

## 滑动窗口

## leetcode209

给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其总和大于等于 target 的长度最小的 子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

输入：target = 7, nums = [2,3,1,2,4,3]

输出：2

解释：子数组 [4,3] 是该条件下的长度最小的子数组。

::: details

滑动窗口

```js
// 时间复杂度 O(n)
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    let res = Infinity; // 无穷大
    let end = 0;
    let start = 0;
    let len = nums.length;
    let sum = 0;
    for(let end = 0; end < len; end ++) {
        sum += nums[end];
        // 注意要使用while
        while (sum >= target) {
            res = Math.min(res, end - start + 1);
            sum -= nums[start];
            start ++;
        } 
    }
    return res === Infinity ? 0 : res;
};
```

```js
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    let res = Infinity;
    let left = 0;
    let right = 0;
    let sum = 0;
    while(right < nums.length) {
        sum += nums[right];
        // 不断地缩小窗口
        while(sum >= target) {
            res = Math.min(res, right-left + 1);
            sum -= nums[left];
            left ++;
        }
        right ++;
    }
    return res === Infinity ? 0 : res;
};
```

暴力解法：两层for循环

```js
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    let res = Infinity; // 无穷大
    let len = nums.length;
    // 暴力解法：两层for循环
    for(let i = 0; i < len; i++) {
        let sum = 0;
        // 注意两层for循环，j是从i开始的
        for(let j = i; j < len; j++) {
            sum += nums[j];
            // 题目是大于等于
            if (sum >= target) {
                res = Math.min(res, j - i + 1); 
            }
        }
    }
    return res === Infinity ? 0 : res;
};
```

### 类似题目：325. 和等于 k 的最长子数组长度

```js

```

:::

### :star: leetcode438找到字符串中所有字母异位词

```md
给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
输入: s = "cbaebabacd", p = "abc"
输出: [0,6]
解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
```

::: details

初始版本

```js
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    const sLen = s.length;
    const pLen = p.length;
    if (sLen < pLen) return [];

    const res = [];
    // 26个字母
    const sCount = new Array(26).fill(0);
    const pCount = new Array(26).fill(0);
    const aCode = 'a'.charCodeAt();
    // p是字串， p的长度
    for(let i = 0; i < pLen; i ++) {
        sCount[s[i].charCodeAt() - aCode] ++;
        pCount[p[i].charCodeAt() - aCode] ++;
    }
    
    // 索引0，开始找，就能找到一样的子串
    if (sCount.toString() === pCount.toString()) {
        res.push(0);
    }

    // sLen - pLen 防止越界，右边的字符串增加， i + pLen;
    for(let i = 0; i < sLen - pLen; i ++) {
        // 左边字符串减少 i , 从索引0，开始去除
        sCount[s[i].charCodeAt() - aCode] --;
        // 右边字符串增加 i + len
        sCount[s[i + pLen].charCodeAt() - aCode] ++;
        if (sCount.toString() === pCount.toString()) {
            res.push(i + 1);
        }
    }
    // 思路：p字符串计数不变， s字符串计数，不断移动，开始变化。
    return res;
};
```

优化版，还没理解

```js
var findAnagrams = function(s, p) {
    const sLen = s.length, pLen = p.length;

    if (sLen < pLen) return [];

    const ans = [];
    const count = Array(26).fill(0);
    const aCode = 'a'.charCodeAt();
    for (let i = 0; i < pLen; ++i) {
        // 一个加，一个减
        ++count[s[i].charCodeAt() -aCode];
        --count[p[i].charCodeAt() -aCode];
    }

    let differ = 0;
    for (let j = 0; j < 26; ++j) {
        if (count[j] !== 0) {
            ++differ;
        }
    }
    // 一个加，一个减，还是原始模样，说明一样，添加索引0
    if (differ === 0) {
        ans.push(0);
    }

    for (let i = 0; i < sLen - pLen; ++i) {
        // 窗口中字母 s[i] 的数量与字符串 p 中的数量从不同变得相同
        if (count[s[i].charCodeAt() -aCode] === 1) {
            --differ;
        // 窗口中字母 s[i] 的数量与字符串 p 中的数量从相同变得不同
        } else if (count[s[i].charCodeAt() -aCode] === 0) {  
            ++differ;
        }
        --count[s[i].charCodeAt() -aCode];

        // 窗口中字母 s[i+pLen] 的数量与字符串 p 中的数量从不同变得相同
        if (count[s[i + pLen].charCodeAt() -aCode] === -1) {  
            --differ;
        // 窗口中字母 s[i+pLen] 的数量与字符串 p 中的数量从相同变得不同
        } else if (count[s[i + pLen].charCodeAt() -aCode] === 0) {  
            ++differ;
        }
        ++count[s[i + pLen].charCodeAt() -aCode];

        if (differ === 0) {
            ans.push(i + 1);
        }
    }

    return ans;
};
```


:::

## 螺旋矩阵

## leetcode59

给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。

输入：n = 3

输出：[[1,2,3],[8,9,4],[7,6,5]]

::: details

```js
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    // 注意看，9的x轴是1，y轴也是1；对应就是二维数组的x和y
    // 根据循环不变量，都是左闭右开, 根本用不了。 直接一行走完了，就行了。
    let top = 0;
    let right = n -1;
    let bottom = n - 1;
    let left = 0;

    let num = 1;
    let res = new Array(n);
    for(let i = 0; i < n; i++) {
        res[i] = new Array(n);
    }
    // 结束条件，等于n的平方。
    while(num <= n *n) {
        for(let i= left;i<=right; i++) {
            res[top][i] = num ++;
        }
        top ++;
        for(let i = top; i <=bottom; i ++) {
            res[i][right] = num ++;
        }
        right --;
        for(let i = right; i >= left; i --) {
            res[bottom][i] = num++;
        }
        bottom --;
        for(let i = bottom; i>=top; i--) {
            res[i][left] = num ++;
        }
        left ++;
    }
    return res;
};
```

循环不变量（四个循环都是左闭右开），不是固定规律，不学不学

```js
var generateMatrix = function(n) {
    let startX = startY = 0;   // 起始位置
    let loop = Math.floor(n/2);   // 旋转圈数
    let mid = Math.floor(n/2);    // 中间位置
    let offset = 1;    // 控制每一层填充元素个数
    let count = 1;     // 更新填充数字
    let res = new Array(n).fill(0).map(() => new Array(n).fill(0));

    while (loop--) {
        let row = startX, col = startY;
        // 上行从左到右（左闭右开）
        for (; col < n - offset; col++) {
            res[row][col] = count++;
        }
        // 右列从上到下（左闭右开）
        for (; row < n - offset; row++) {
            res[row][col] = count++;
        }
        // 下行从右到左（左闭右开）
        for (; col > startY; col--) {
            res[row][col] = count++;
        }
        // 左列做下到上（左闭右开）
        for (; row > startX; row--) {
            res[row][col] = count++;
        }

        // 更新起始位置
        startX++;
        startY++;

        // 更新offset
        offset += 1;
    }
    // 如果n为奇数的话，需要单独给矩阵最中间的位置赋值
    if (n % 2 === 1) {
        res[mid][mid] = count;
    }
    return res;
};
```

:::

## leetcode15.三数之和

::: details

```js
var threeSum = function(nums) {
    // 排序 + 双指针
    nums.sort((a, b) => a - b);
    const res = []
    for(let i = 0; i < nums.length; i++) {
        if(i > 0 && nums[i] === nums[i - 1]) continue; // 跳过重复的数字
        let left = i + 1;
        let right = nums.length - 1;
        while(left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                res.push([nums[i], nums[left], nums[right]]);
                // 存在相同的元素，继续往前/ 往后移动
                while (left < right && nums[left] === nums[++left]); // 跳过重复的数字
                while (left < right && nums[right] === nums[--right]); // 跳过重复的数字
            } else if (sum > 0) {
                right --;
            } else {
                left ++;
            }
        }
    }
    return res;
};
```

```js
var threeSum = function(nums) {
    let result = [];
    nums.sort((a, b) => a - b); // 排序数组
 
    for(let i = 0; i < nums.length; i++) {
        if(i > 0 && nums[i] === nums[i - 1]) continue; // 跳过重复的数字
 
        let left = i + 1; // 左指针
        let right = nums.length - 1; // 右指针
 
        while(left < right) {
            let sum = nums[i] + nums[left] + nums[right];
            if(sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                // 超级精华
                while (left < right && nums[left] === nums[++left]); // 跳过重复的数字
                while (left < right && nums[right] === nums[--right]); // 跳过重复的数字
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
};
```

:::


## leetcode18.四数之和

::: details

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    nums.sort((a,b) => a - b);
    const res = [];
    for(let i = 0; i < nums.length; i++) {
        // 去重
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        for(let j = i + 1; j < nums.length; j++) {
            // 去重
            if (j > i + 1 && nums[j - 1] === nums[j]) continue;
            let left = j + 1;
            let right = nums.length - 1;
            while(left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];
                if (sum === target) {
                    res.push([nums[i], nums[j], nums[left], nums[right]]);
                    // 再去重
                    while (left < right && nums[left] === nums[++left]); // 跳过重复的数字
                    while (left < right && nums[right] === nums[--right]);
                } else if (sum > target) {
                    right --;
                } else {
                    left ++;
                }
            }
        }       
    }
    return res;
};
```

:::

## :star: 堆-leetcode215. 数组中的第K个最大元素

```md
给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。

输入: [3,2,1,5,6,4], k = 2
输出: 5
```

### 不考虑时间复杂度

```js
var findKthLargest = function(nums, k) {
    nums.sort((a, b) => a - b); // 升序排序
    return nums[nums.length - k]; // 第 k 大的数在索引 nums.length - k 处
};
```

### :star: 堆-leetcode295. 数据流的中位数(困难)

```md

```

::: details

```js

```

:::

### 快排？

## 补充

```md
冒泡排序
数组排序
```