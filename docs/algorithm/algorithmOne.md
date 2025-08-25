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
