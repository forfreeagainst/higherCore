# leetcode100

## :bulb: 全排列（回溯算法）

给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

输入：nums = [1,2,3]

输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

### 回溯算法

回溯法：一种通过探索所有可能的候选解来找出所有的解的算法。如果候选解被确认不是一个解（或者至少不是最后一个解），回溯算法会通过在
上一步进行一些变化抛弃该解，即回溯并且再次尝试。

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const result = [];
    const used = new Array(nums.length).fill(false);

    // 回溯函数
    function backtrack(path) {
        // 当路径的长度等于数组的长度时，说明已经找到了一个全排列
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            // 如果当前数字已经被使用过，则跳过
            if (used[i]) continue;

            // 选择当前数字
            path.push(nums[i]);
            used[i] = true;

            // 递归调用回溯函数
            backtrack(path);

            // 撤销选择
            path.pop();
            used[i] = false;
        }
    }
    
    // 从空路径开始回溯
    backtrack([]);

    return result;
};
```

## 二分查找：题号704

给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

输入: nums = [-1,0,3,5,9,12], target = 9

输出: 4

解释: 9 出现在 nums 中并且下标为 4

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
    return -1;
};
```

## 有序数组的平方: 题号977

给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

输入：nums = [-4,-1,0,3,10]

输出：[0,1,9,16,100]

解释：平方后，数组变为 [16,1,0,9,100]

排序后，数组变为 [0,1,9,16,100]

###  非递减顺序 排序的整数数组 nums：最大值一定是在左端/右端

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    let left = 0;
    let right = nums.length - 1;
    let len = nums.length - 1;
    const res = [];
    // 题目中的数组比较特殊，非递减顺序排序
    while(left <= right) {
        const l = nums[left] * nums[left];
        const r = nums[right] * nums[right];
        if (l > r) {
            res[len --] = l;
            left ++;                      
        } else {
            res[len --] = r;
            right --;
        }        
    }
    return res;
};
```

### 时间复杂度nlogn

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    for(let i = 0 ;i < nums.length; i++) {
        nums[i] = nums[i] * nums[i];
    }
    return nums.sort((a, b) => a - b);
};
```

## 省略，即将重做

## :bulb: 爬楼梯

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

输入：n = 3

输出：3

解释：有三种方法可以爬到楼顶。

1. 1 阶 + 1 阶 + 1 阶

2. 1 阶 + 2 阶

3. 2 阶 + 1 阶

### 动态规划简单题

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    const arr = [1, 1];
    for(let i = 2;i<= n;i++) {
        arr[i] = arr[i-1] + arr[i -2];
    }
    return arr[n];
};
```

## :bulb: 杨辉三角

给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行

在「杨辉三角」中，每个数是它左上方和右上方的数的和。

```js
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    const nums = [];
    for(let i = 0; i < numRows; i++) {
        const row = new Array(i + 1).fill(1);
        for(let j = 1; j< row.length - 1; j++) {
            row[j] = nums[i - 1][j - 1] + nums[i - 1][j]
        }
        nums.push(row);
    }
    return nums;
};
```

## :bulb: 打家劫舍冲冲冲

给定一个代表每个房屋存放金额的非负整数数组，不能偷相邻两个房间的情况下 ，一夜之内能够偷窃到的最高金额。

### 先寻找递归规律，再动态规划

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    const len = nums.length;
    if (len === 0) return 0;
    if (len === 1) return nums[0];
    const arr = [];
    arr[0] = nums[0];
    arr[1] = Math.max(nums[0], nums[1]);
    for(let i = 2; i < len;i ++) {
        arr[i] = Math.max(arr[i -1], arr[i - 2] + nums[i]);
    }
    return arr[len -1];
};
```

### 同上思路，优化空间复杂度

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    const len = nums.length;
    if (len === 0) return 0;
    if (len === 1) return nums[0];
    let first = nums[0];
    let second = Math.max(nums[0], nums[1]);
    for(let i = 2; i < len; i++) {
        let temp = second;
        second = Math.max(second, first + nums[i]);
        first = temp;
    }
    return second;
};
```

## :bulb: 完全平方数

给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。

完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。

输入：n = 13

输出：2

解释：13 = 4 + 9

### 动态规划（时间复杂度：O(n * 根号n), 空间复杂度：O(n) ）

最大值： Number.MAX_VALUE

```js
var numSquares = function(n) {
    const f = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        let minn = Number.MAX_VALUE;
        for (let j = 1; j * j <= i; j++) {
            minn = Math.min(minn, f[i - j * j]);
        }
        f[i] = minn + 1;
    }
    return f[n];
};
```

### 巧用数学公式（四平方和定理）

「四平方和定理」: n = 4 ^ k × (8m + 7) 时，n 只能被表示为四个正整数的平方和。此时我们可以直接返回 4。

```js
var numSquares = function(n) {
    if (isPerfectSquare(n)) {
        return 1;
    }
    for (let i = 1; i * i <= n; i++) {
        let j = n - i * i;
        if (isPerfectSquare(j)) {
            return 2;
        }
    }
    if (checkAnswer4(n)) {
        return 4;
    }
    return 3;
}

// 判断是否为完全平方数
const isPerfectSquare = (x) => {
    const y = Math.floor(Math.sqrt(x));
    return y * y == x;
}

// 判断是否能表示为 4^k*(8m+7)
const checkAnswer4 = (x) => {
    while (x % 4 == 0) {
        x /= 4;
    }
    return x % 8 == 7;
}
```

## :bulb: 零钱兑换

给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。

计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。

你可以认为每种硬币的数量是无限的。

### 动态规划中等题

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    //初始化一个长度为12，用来存储状态的数组，默认值填充为amount+1,也可以填充为最大值，用来后续比较。
    let dp = new Array(amount + 1).fill(amount + 1)
    //设置初始0的最少硬币为0
    dp[0] = 0
    //分别处理标记0-amount的状态值
    for (let i = 0; i < dp.length; i++) { 
        //用不同的硬币种类去判断各种情况
        for (let j = 0; j < coins.length; j++) { 
            //如果当前金额大于当前判断的硬币
            if (i - coins[j] >= 0) {
                //dp[i-coins[j]]获得该价格下的最优数量
                dp[i] = Math.min(dp[i], 1 + dp[i - coins[j]]) 
            }
        }
    }
    //是否初始化的值，如果是初始值说明没有兑换成功
    return (dp[amount] === amount + 1) ? -1 : dp[amount]
};
```

## :bulb: 单词拆分

给你一个字符串 s 和一个字符串列表 wordDict 作为字典。如果可以利用字典中出现的一个或多个单词拼接出 s 则返回 true。

注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。

输入: s = "leetcode", wordDict = ["leet", "code"]

输出: true

解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。

### DP，时间复杂度O(n的平方)，空间复杂度O(n)

```js
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    const n = s.length;
    const wordDictSet = new Set(wordDict);
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;
    for(let i = 0; i <= n; i++) {
        for(let j = 0; j < i; j++) {
            if (dp[j] && wordDictSet.has(s.substr(j, i - j))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[n];
};
```
