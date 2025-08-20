# 贪心算法

## 入门

::: details

```md
局部最优解 => 全局最优解
特征：找不到反例就行，不需要证明，没有规律
思路：
初始化数组？
如何遍历？
```

:::

## leetcode455：分发饼干

::: details

```js

```

:::

## leetcode376:摆动序列

::: details

```js

```

:::

## leetcode53:最大子序和

::: details

```js

```

:::

## leetcode122:买卖股票最佳时机II

::: details

### 贪心解法

```js
var maxProfit = function(prices) {
    // 局部最优 => 全局最优
    // 找不到反例
    // 最小买入， 最多的时候卖出。
    let result = 0
    for(let i = 1; i < prices.length; i++) {
        // 局部最优：今天买入小的，明天卖出大的
        // 数学等价性 (5-1) = (2-1) + (3-2) + (4-3) + (5-4)
        result += Math.max(prices[i] - prices[i - 1], 0)
    }
    return result
};
```

### 动态规划解法

```js
var maxProfit = (prices) => {
  let dp = Array.from(Array(prices.length), () => Array(2).fill(0));
  // dp[i][0] 表示第i天持有股票所得现金。
  // dp[i][1] 表示第i天不持有股票所得最多现金
  dp[0][0] = 0 - prices[0];
  dp[0][1] = 0;
  for (let i = 1; i < prices.length; i++) {
    // 如果第i天持有股票即dp[i][0]， 那么可以由两个状态推出来
    // 第i-1天就持有股票，那么就保持现状，所得现金就是昨天持有股票的所得现金 即：dp[i - 1][0]
    // 第i天买入股票，所得现金就是昨天不持有股票的所得现金减去 今天的股票价格 即：dp[i - 1][1] - prices[i]
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i]);

    // 在来看看如果第i天不持有股票即dp[i][1]的情况， 依然可以由两个状态推出来
    // 第i-1天就不持有股票，那么就保持现状，所得现金就是昨天不持有股票的所得现金 即：dp[i - 1][1]
    // 第i天卖出股票，所得现金就是按照今天股票佳价格卖出后所得现金即：prices[i] + dp[i - 1][0]
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i]);
  }

  return dp[prices.length - 1][1];
};
```

:::

## leetcode55:跳跃游戏

::: details

```md
给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。

示例 1：

输入：nums = [2,3,1,1,4]
输出：true
解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
示例 2：

输入：nums = [3,2,1,0,4]
输出：false
解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
```

### 太简洁了，这贪心

```js
 var canJump = function(nums) {
    let maxReach = 0; // 当前能到达的最远位置
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false; // 当前位置已经无法到达
        maxReach = Math.max(maxReach, i + nums[i]);
        if (maxReach >= nums.length - 1) return true; // 可以到达终点
    }
    return true;
};
```

### 动态规划此处不如贪心

```js
var canJump = function(nums) {
    if (nums.length <= 1) return true;
    const dp = Array(nums.length).fill(false);
    dp[0] = true; // 起点可达
    
    for (let i = 0; i < nums.length; i++) {
        if (!dp[i]) continue; // 当前点不可达，跳过
        const maxJump = Math.min(i + nums[i], nums.length - 1);
        for (let j = i + 1; j <= maxJump; j++) {
            if (!dp[j]) dp[j] = true; // 标记可达
        }
        if (dp[nums.length - 1]) return true; // 提前终止
    }
    return dp[nums.length - 1];
};
```

:::

## :star: leetcode45：跳跃游戏II

```md
给定一个长度为 n 的 0 索引整数数组 nums。初始位置为 nums[0]。

每个元素 nums[i] 表示从索引 i 向后跳转的最大长度。换句话说，如果你在 nums[i] 处，你可以跳转到任意 nums[i + j] 处:

0 <= j <= nums[i] 
i + j < n
返回到达 nums[n - 1] 的最小跳跃次数。生成的测试用例可以到达 nums[n - 1]。

输入: nums = [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。

输入: nums = [2,3,0,1,4]
输出: 2
 
```

::: details

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let curIndex = 0
    let nextIndex = 0
    let steps = 0
    for(let i = 0; i < nums.length - 1; i++) {
        nextIndex = Math.max(nums[i] + i, nextIndex)
        if(i === curIndex) {
            curIndex = nextIndex
            steps++
        }
    }

    return steps
};
```

:::

## leetcode1005:K次取反后最大化的数组和

::: details

```js

```

:::

## leetcode134:加油站

::: details

```js

```

:::

## leetcode135:分发糖果

::: details

```js

```

:::

## leetcode860:柠檬水找零

::: details

```js

```

:::

## leetcode406:根据身高重建队列

::: details

```js

```

:::

## leetcode452:用最少数量的箭引爆气球

::: details

```js

```

:::

## leetcode435:无重叠区间

::: details

```js

```

:::

## :star: leetcode763:划分字母区间

```md
给你一个字符串 s 。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。
例如，字符串 "ababcc" 能够被分为 ["abab", "cc"]，但类似 ["aba", "bcc"] 或 
["ab", "ab", "cc"] 的划分是非法的。

注意，划分结果需要满足：将所有划分结果按顺序连接，得到的字符串仍然是 s 。

返回一个表示每个字符串片段的长度的列表。

输入：s = "ababcbacadefegdehijhklij"
输出：[9,7,8]
解释：
划分结果为 "ababcbaca"、"defegde"、"hijhklij" 。
每个字母最多出现在一个片段中。
像 "ababcbacadefegde", "hijhklij" 这样的划分是错误的，因为划分的片段数较少。

输入：s = "eccbbbbdec"
输出：[10]
```

::: details

```js

```

:::

## leetcode56:合并区间

::: details

```js

```

:::

## leetcode738:单调自增的数字

::: details

```js

```

:::

## leetcode968:监督二叉树

::: details

```js

```

:::

## :star: leetcode121. 买卖股票的最佳时机

::: details

```js
var maxProfit = function(prices) {
    let res = 0;
    let cur = prices[0];
    for(let i = 1; i < prices.length; i++) {
        // const money = prices[i] - cur;
        // if (money > res) {
        //     res = money;
        // }
        // 可优化为
        res = Math.max(prices[i] - cur, res);
        if (prices[i] < cur) {
            cur = prices[i]
        }
    }
    return res;
};
```

:::