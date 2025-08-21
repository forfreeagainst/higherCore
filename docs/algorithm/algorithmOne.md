# leetcode100道题

### 最接近的三数之和（双指针）

给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。

返回这三个数的和。

假定每组输入只存在恰好一个解。

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    const arr = nums.sort((a,b) => a -b);
    let result = nums[0] + nums[1] + nums[2];
    for(let i = 0; i< nums.length-1; i++) {
        let l = i +1;
        let r = nums.length-1;
        while(l <r) {
            let sum = nums[i] + nums[l] +nums[r];
            if (Math.abs(sum - target) <= Math.abs(result - target)) {
                result = sum;
            }
            if (sum < target) {
                l ++;
            } else {
                r--;
            }
        }
    }
    return result;
};
```


### 至多包含两个不同字符的最长子串（哈希表，滑动窗口）

给你一个字符串 s ，请你找出 至多 包含 两个不同字符 的最长子串，并返回该子串的长度。

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTwoDistinct = function(s) {
    if (s.length <= 2) return s.length;
    let ans = 0;
    let len = s.length;
    let set = new Set();
    let rk = 0;//右指针
    for(let i = 0; i < len; i++) {
        set.clear();
        rk = i;
        while(rk < len && set.size <= 2) {
            set.add(s.charAt(rk));
            rk ++;
        }
        if (set.size >2) {
            rk --;
        }
        ans = Math.max(ans, rk-i)
    }
    return ans;
}
```

## :bulb: 最大子数组和

给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

子数组是数组中的一个连续部分。

输入：nums = [5,4,-1,7,8]

输出：23

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let pre = 0;
    let maxAns = nums[0];
    for (let v of nums) {
        pre = Math.max(pre + v, v);
        maxAns = Math.max(maxAns, pre);
    }
    return maxAns;
};
```

## :bulb: 合并区间

以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所

有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。

输入：intervals = [[1,3],[2,6],[8,10],[15,18]]

输出：[[1,6],[8,10],[15,18]]

解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

```js
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    let prev = intervals[0]
    let result = []
    for(let i =0; i<intervals.length; i++){
        let cur = intervals[i]
        if(cur[0] > prev[1]){
            result.push(prev)
            prev = cur
        }else{
            prev[1] = Math.max(cur[1],prev[1])
        }
    }
    result.push(prev)
    return result
};
```

## :bulb: 轮转数组

给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

输入: nums = [1,2,3,4,5,6,7], k = 3

输出: [5,6,7,1,2,3,4]

尽可能想出更多的解决方案，至少有 三种 不同的方法可以解决这个问题。

你可以使用空间复杂度为 O(1) 的 原地 算法解决这个问题吗？

### 时间复杂度O(n), 空间复杂度O(n)

```js
  var rotate = function (nums, k) {
    const arr = [];
    for (let i = 0; i < nums.length; i++) {
      const sub = (i +k) % nums.length;
      arr[sub] = nums[i];
    }
    for(let j = 0; j< nums.length; j++ ) {
      nums[j] = arr[j]
    }
};
```

### 时间复杂度O(Nk), 空间复杂度O(k)

```js
var rotate = function(nums, k) {
    const k1 = k % nums.length;
    const popArr = [];
    for(let i =0; i<k1;i++) {
        popArr.push(nums.pop());
    }
    for(let i = 0; i < popArr.length;i++) {
        nums.unshift(popArr[i])
    }
    return nums;
};
```

## :bulb: 除自身以外数组的乘积

给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。

题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。

请 不要使用除法，且在 O(n) 时间复杂度内完成此题。

输入: nums = [1,2,3,4]

输出: [24,12,8,6]

### 前缀积 * 后缀积

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const answer = [1];
    let mul = 1;
    //前缀和
    for(let i = 1; i< nums.length; i++) {
        mul = mul * nums[i -1]
        answer[i] = mul;
    }
    mul = 1;
    const arr = [];
    arr[nums.length -1] = 1;
    // 后缀和
    for (let i =nums.length - 2; i >= 0; i--) {
        mul = mul * nums[i+1];
        arr[i] = mul;     
    }
    for (let i = 0; i< nums.length; i++) {
        answer[i] = answer[i] * arr[i]
    }
    return answer;
};
```

## :bulb: 缺失的第一个正数（困难）

给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。

请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。

输入: nums = [1,2,0]

输出: 3

解释: 范围 [1,2] 中的数字都在数组中。

```js
```
