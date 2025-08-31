# 贪心算法

## :star: 121. 买卖股票的最佳时机(简单)

```md
给定一个数组 prices ，它的第 i 个元素 prices[i] 
表示一支给定股票第 i 天的价格。

你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 
卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。

输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
```

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

## :star:  55. 跳跃游戏(中等)

```md
给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。
数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。

输入：nums = [2,3,1,1,4]
输出：true
解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。

输入：nums = [3,2,1,0,4]
输出：false
解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ，
 所以永远不可能到达最后一个下标。
```

::: details

太简洁了，这贪心

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

动态规划此处不如贪心

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

## :star: 45. 跳跃游戏 II(中等)

```md
给定一个长度为 n 的 0 索引整数数组 nums。初始位置在下标 0。

每个元素 nums[i] 表示从索引 i 向后跳转的最大长度。换句话说，
如果你在索引 i 处，你可以跳转到任意 (i + j) 处：

0 <= j <= nums[i] 且
i + j < n
返回到达 n - 1 的最小跳跃次数。测试用例保证可以到达 n - 1。

输入: nums = [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。

输入: nums = [2,3,0,1,4]
输出: 2
```

::: details

```js
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

## :star: 763. 划分字母区间(中等)(看不懂题目)

```md

```