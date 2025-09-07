# 动态规划

## :star: 70. 爬楼梯(简单)

```md
假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

输入：n = 2
输出：2
解释：有两种方法可以爬到楼顶。
1. 1 阶 + 1 阶
2. 2 阶

输入：n = 3
输出：3
解释：有三种方法可以爬到楼顶。
1. 1 阶 + 1 阶 + 1 阶
2. 1 阶 + 2 阶
3. 2 阶 + 1 阶
```

::: details

动态规划

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    let p = 0, q = 0, r = 1;
    for (let i = 1; i <= n; ++i) {
        p = q;
        q = r;
        r = p + q;
    }
    return r;
};
```

矩阵快速幂,时间复杂度：同快速幂，O(logn),空间复杂度：O(1)。

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    const q = [[1, 1], [1, 0]];
    const res = pow(q, n);
    return res[0][0];
};

const pow = (a, n) => {
    let ret = [[1, 0], [0, 1]];
    while (n > 0) {
        if ((n & 1) === 1) {
            ret = multiply(ret, a);
        }
        n >>= 1;
        a = multiply(a, a);
    }
    return ret;
}

const multiply = (a, b) => {
    const c = new Array(2).fill(0).map(() => new Array(2).fill(0));
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            c[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j];
        }
    }
    return c;
}
```

通项公式

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    const sqrt5 = Math.sqrt(5);
    const fibn = Math.pow((1 + sqrt5) / 2, n + 1) - Math.pow((1 - sqrt5) / 2, n + 1);
    return Math.round(fibn / sqrt5);
};
```

:::

## :star: 118. 杨辉三角(简单)

```md
给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。

在「杨辉三角」中，每个数是它左上方和右上方的数的和。

输入: numRows = 5
输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

输入: numRows = 1
输出: [[1]]
```

::: details

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

:::

## :star: 198. 打家劫舍(中等)

```md
你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，
影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置
的情况下 ，一夜之内能够偷窃到的最高金额。

输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。

输入：[2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
```

::: details

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

:::

## :star: 279. 完全平方数(中等)

```md
给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。

完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，
其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，
而 3 和 11 不是。

输入：n = 12
输出：3 
解释：12 = 4 + 4 + 4

输入：n = 13
输出：2
解释：13 = 4 + 9
```

::: details

动态规划，时间复杂度O(n 乘以 根号n)，空间复杂度O(n)

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

数学(四平方和定理)，时间复杂度O(根号n),空间复杂度O(1)

```js
var numSquares = function(n) {
    if (isPerfectSquare(n)) {
        return 1;
    }
    if (checkAnswer4(n)) {
        return 4;
    }
    for (let i = 1; i * i <= n; i++) {
        let j = n - i * i;
        if (isPerfectSquare(j)) {
            return 2;
        }
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

:::

## :star: 322. 零钱兑换(中等)

```md
给你一个整数数组 coins ，表示不同面额的硬币；
以及一个整数 amount ，表示总金额。

计算并返回可以凑成总金额所需的 最少的硬币个数 。
如果没有任何一种硬币组合能组成总金额，返回 -1 。

你可以认为每种硬币的数量是无限的。

输入：coins = [1, 2, 5], amount = 11
输出：3 
解释：11 = 5 + 5 + 1

输入：coins = [2], amount = 3
输出：-1

输入：coins = [1], amount = 0
输出：0
```

::: details

记忆化搜索

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

动态规划

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    // 创建 dp 数组，初始化为无穷大
    const dp = new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER);
    // 金额为 0 时需要 0 个硬币
    dp[0] = 0;
    
    // 遍历每种硬币
    for (const coin of coins) {
        // 从当前硬币面值开始，遍历到目标金额
        for (let x = coin; x <= amount; x++) {
            // 更新 dp[x]：比较当前值和使用当前硬币后的值
            if (dp[x - coin] !== Number.MAX_SAFE_INTEGER) {
                dp[x] = Math.min(dp[x], dp[x - coin] + 1);
            }
        }
    }
    
    // 返回结果，如果无法组成则返回 -1
    return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount];
};
```

:::

## :star: 139. 单词拆分(中等)

```md
给你一个字符串 s 和一个字符串列表 wordDict 作为字典。
如果可以利用字典中出现的一个或多个单词拼接出 s 则返回 true。

注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。

输入: s = "leetcode", wordDict = ["leet", "code"]
输出: true
解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。

输入: s = "applepenapple", wordDict = ["apple", "pen"]
输出: true
解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
     注意，你可以重复使用字典中的单词。

输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
输出: false
```

::: details

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

:::

::: details

```md
正则匹配 vs 状态机的优劣分析
正则匹配的问题：
回溯爆炸：正则引擎在匹配 (word1|word2|...)+ 时会产生大量回溯，时间复杂度可能达到指数级

性能低下：对于长字符串和大字典，正则匹配可能极其缓慢甚至导致浏览器卡死

内存消耗大：正则引擎需要维护大量的回溯状态

可读性差：复杂的正则表达式难以理解和维护

状态机的优势：
线性时间复杂度：O(n × m)，其中 n 是字符串长度，m 是最长单词长度

确定性的性能：不会出现回溯爆炸，性能可预测

内存效率高：只需要 O(n) 的额外空间

更好的可维护性：动态规划逻辑清晰，易于理解和扩展

提前终止：一旦找到解就可以提前返回，而正则必须尝试所有可能性

实际测试对比：
对于输入 s = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab", 
wordDict = ["a","aa","aaa","aaaa"]：

正则匹配：可能超时或导致浏览器无响应

状态机：快速返回正确结果

结论：在算法问题中，状态机（动态规划）的实现方式远优于正则匹配，
特别是在处理边界情况和性能要求高的场景下。
```

:::

## :star: 300. 最长递增子序列(中等)

```md
给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素
而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。

输入：nums = [10,9,2,5,3,7,101,18]
输出：4
解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。

输入：nums = [0,1,0,3,2,3]
输出：4

输入：nums = [7,7,7,7,7,7,7]
输出：1

进阶：你能将算法的时间复杂度降低到 O(n log(n)) 吗?
```

::: details

动态规划,时间复杂度O(n * n) ,空间复杂度O(n)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    if (nums.length === 0) return 0;
            
    const dp = new Array(nums.length);
    dp[0] = 1;
    let maxans = 1;
    
    for (let i = 1; i < nums.length; i++) {
        dp[i] = 1;
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxans = Math.max(maxans, dp[i]);
    }
    
    return maxans;
};
```

贪心+二分查找,时间复杂度O(Nlogn)，空间复杂度O(N)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
   if (nums.length === 0) return 0;
            
    const n = nums.length;
    const d = new Array(n + 1);
    let len = 1;
    d[len] = nums[0];
    
    for (let i = 1; i < n; i++) {
        if (nums[i] > d[len]) {
            d[++len] = nums[i];
        } else {
            let l = 1, r = len, pos = 0;
            while (l <= r) {
                const mid = Math.floor((l + r) / 2);
                if (d[mid] < nums[i]) {
                    pos = mid;
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }
            d[pos + 1] = nums[i];
        }
    }
    
    return len;
};
```

:::

## :star: 152. 乘积最大子数组(中等)

```md
给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续 
子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

测试用例的答案是一个 32-位 整数。

输入: nums = [2,3,-2,4]
输出: 6
解释: 子数组 [2,3] 有最大乘积 6。

输入: nums = [-2,0,-1]
输出: 0
解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
```

::: details

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    if (nums.length === 0) return 0;
    
    let maxF = nums[0];
    let minF = nums[0];
    let ans = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        const current = nums[i];
        // 保存临时值，因为maxF和minF会在计算中被更新
        const tempMax = maxF;
        const tempMin = minF;
        
        // 三种可能：当前数本身、当前数乘以最大值、当前数乘以最小值
        maxF = Math.max(current, Math.max(tempMax * current, tempMin * current));
        minF = Math.min(current, Math.min(tempMax * current, tempMin * current));
        
        // 更新最终结果
        ans = Math.max(ans, maxF);
    }
    
    return ans;
};
```

:::

## :star: 416. 分割等和子集(中等)

```md
给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将
这个数组分割成两个子集，使得两个子集的元素和相等。

输入：nums = [1,5,11,5]
输出：true
解释：数组可以分割成 [1, 5, 5] 和 [11] 。

输入：nums = [1,2,3,5]
输出：false
解释：数组不能分割成两个元素和相等的子集。
```

::: details

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    const n = nums.length;
    if (n < 2) {
        return false;
    }
    let sum = 0, maxNum = 0;
    for (const num of nums) {
        sum += num;
        maxNum = maxNum > num ? maxNum : num;
    }
    if (sum & 1) {
        return false;
    }
    const target = Math.floor(sum / 2);
    if (maxNum > target) {
        return false;
    }
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;
    for (const num of nums) {
        for (let j = target; j >= num; --j) {
            dp[j] |= dp[j - num];
        }
    }
    return dp[target];
};
```

:::

## :star: 32. 最长有效括号(困难)(题意好懂)

```md
给你一个只包含 '(' 和 ')' 的字符串，找出最长有效
（格式正确且连续）括号 子串 的长度。

左右括号匹配，即每个左括号都有对应的右括号将其闭合的字符串
是格式正确的，比如 "(()())"。

输入：s = "(()"
输出：2
解释：最长有效括号子串是 "()"

输入：s = ")()())"
输出：4
解释：最长有效括号子串是 "()()"

输入：s = ""
输出：0
```

::: details

动态规划

```js
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    if (!s || s.length < 2) return 0;
            
    const n = s.length;
    const dp = new Array(n).fill(0);
    let maxLen = 0;
    
    for (let i = 1; i < n; i++) {
        if (s[i] === ')') {
            if (s[i - 1] === '(') {
                dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
            } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {
                dp[i] = dp[i - 1] + 2 + (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0);
            }
            maxLen = Math.max(maxLen, dp[i]);
        }
    }
    return maxLen;
};
```

使用栈

```js
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    let maxLen = 0;
    const stack = [-1]; // 初始化为-1，作为基准点
    
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.length === 0) {
                stack.push(i); // 更新基准点
            } else {
                maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
            }
        }
    }
    return maxLen;
};
```

不使用额外的空间

```js
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    let left = 0, right = 0, maxLen = 0;
            
    // 从左到右扫描
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') left++;
        else right++;
        
        if (left === right) {
            maxLen = Math.max(maxLen, 2 * right);
        } else if (right > left) {
            left = right = 0;
        }
    }
    
    left = right = 0;
    // 从右到左扫描
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === '(') left++;
        else right++;
        
        if (left === right) {
            maxLen = Math.max(maxLen, 2 * left);
        } else if (left > right) {
            left = right = 0;
        }
    }
    
    return maxLen;
};
```

:::

## 多维动态规划

## :star: 62. 不同路径(中等)

```md
一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角
（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？

输入：m = 3, n = 7
输出：28

输入：m = 3, n = 2
输出：3
解释：
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右
3. 向下 -> 向右 -> 向下

输入：m = 7, n = 3
输出：28

输入：m = 3, n = 3
输出：6
```

## :star: 64. 最小路径和(中等)

```md
给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，
使得路径上的数字总和为最小。

说明：每次只能向下或者向右移动一步。

输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
输出：7
解释：因为路径 1→3→1→1→1 的总和最小。

输入：grid = [[1,2,3],[4,5,6]]
输出：12
```

## :star: 5. 最长回文子串(中等)

```md
给你一个字符串 s，找到 s 中最长的 回文 子串。

输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。

输入：s = "cbbd"
输出："bb"
```

## :star: 1143. 最长公共子序列(中等)

```md
给定两个字符串 text1 和 text2，返回这两个字符串的最长 
公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。

一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串
在不改变字符的相对顺序的情况下删除某些字符
（也可以不删除任何字符）后组成的新字符串。

例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。

输入：text1 = "abcde", text2 = "ace" 
输出：3  
解释：最长公共子序列是 "ace" ，它的长度为 3 。

输入：text1 = "abc", text2 = "abc"
输出：3
解释：最长公共子序列是 "abc" ，它的长度为 3 。

输入：text1 = "abc", text2 = "def"
输出：0
解释：两个字符串没有公共子序列，返回 0 。
```

## :star: 72. 编辑距离(中等)

```md
给你两个单词 word1 和 word2， 请返回将 word1 转换成
 word2 所使用的最少操作数  。

你可以对一个单词进行如下三种操作：

插入一个字符
删除一个字符
替换一个字符


输入：word1 = "horse", word2 = "ros"
输出：3
解释：
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')

输入：word1 = "intention", word2 = "execution"
输出：5
解释：
intention -> inention (删除 't')
inention -> enention (将 'i' 替换为 'e')
enention -> exention (将 'n' 替换为 'x')
exention -> exection (将 'n' 替换为 'c')
exection -> execution (插入 'u')
```