# 双指针

## :star: 283. 移动零(简单)

```md
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意 ，必须在不复制数组的情况下原地对数组进行操作。

输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]

输入: nums = [0]
输出: [0]
```

::: details

笨方法：
不是0，往前赋值，统计不是0个数，后续补0

```js
var moveZeroes = function(nums) {
    let notZeroSub = 0;
    for(let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[notZeroSub] = nums[i];
            notZeroSub ++;
        }
    }
    for(let i = notZeroSub; i < nums.length; i++) {
        nums[i] = 0;
    }
};
```

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    let left =0;
    let right = 0;
    while (right < nums.length) {
        if (nums[right] !== 0) {
            let temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left ++;
        }
        right ++;
    }
    return nums;
};
```

:::

## :star: 11. 盛最多水的容器(中等)

```md
给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

说明：你不能倾斜容器

输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水
（表示为蓝色部分）的最大值为 49。

输入：height = [1,1]
输出：1
```

::: details

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let res = null;
    let left = 0;
    let right = height.length -1;
    while (left < right) {
        let temp = (right-left) * Math.min(height[left], height[right]);
        if (res === null || res < temp) {
            res = temp;
        }
        if (height[left] > height[right]) {
            right --;
        } else {
            left++;
        }
    }
    return res;
};
```

:::

## :star: 15. 三数之和(中等)

```md
给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足
i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。
请你返回所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组

输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
注意，输出的顺序和三元组的顺序并不重要。

输入：nums = [0,1,1]
输出：[]
解释：唯一可能的三元组和不为 0 。

输入：nums = [0,0,0]
输出：[[0,0,0]]
解释：唯一可能的三元组和为 0 。
```

::: details

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
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

## :star: 42. 接雨水(困难)

```md
给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，
下雨之后能接多少雨水。

输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，
可以接 6 个单位的雨水（蓝色部分表示雨水）

输入：height = [4,2,0,3,2,5]
输出：9
```

::: details

双指针（稍优动态规划）

```js
var trap = function(height) {
    let ans = 0;
    let left = 0;
    let right = height.length-1;
    let leftMax = 0;
    let rightMax = 0;
    while (left <right) {
        leftMax = Math.max(height[left], leftMax);
        rightMax = Math.max(height[right], rightMax);
        if (leftMax < rightMax) {
            ans += leftMax - height[left];
            left++;
        } else {
            ans += rightMax-height[right];
            right --;
        }
    }
    return ans;
};
```

动态规划

* 从左往右看，最大高度
* 从右往左看，最大高度

```js
var trap = function(height) {
    let ans = 0;
    let len = height.length;
    if (len < 3) return 0;
    let left_max_arr = [];
    let right_max_arr = [];
    left_max_arr[0] = height[0];
    right_max_arr[len-1] = height[len-1];
    for(let i = 1;i<len;i++) {
        left_max_arr[i] = Math.max(left_max_arr[i-1], height[i]);
    }
    for(let i = len -2;i>=0;i--) {
        right_max_arr[i] = Math.max(right_max_arr[i+1], height[i]);
    }
    for(let i = 0; i< len; i++) {
        ans += Math.min(left_max_arr[i], right_max_arr[i]) -height[i]
    }
    return ans;
};
```

:::