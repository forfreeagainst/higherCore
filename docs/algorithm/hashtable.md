# 哈希表

## leetcode242: 有效的字母异位词

::: details

```js
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    const aMap = new Map();
    for(let v of s) {
        const temp = aMap.get(v) || 0;
        aMap.set(v, temp + 1);
    }
    for(let v of t) {
        const temp = (aMap.get(v) || 0) - 1;
        aMap.set(v, temp);
        if (temp < 0) return false;
    }
    return true;
};
```

```js
// 辣鸡代码 * 1
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    const aMap = new Map();
    const bMap = new Map();
    for(let v of s) {
        const temp = aMap.get(v) || 0;
        aMap.set(v, temp + 1);
    }
    for(let v of t) {
        const temp = bMap.get(v) || 0;
        bMap.set(v, temp + 1);
    }
    for(let v of aMap) {
        const [key, val] = v;
        if (bMap.get(key) !== val) {
            return false;
        }
    }
    return true;
};
```

:::

## leetcode349.两个数组的交集

::: details

```js
var intersection = function(nums1, nums2) {
    const set = new Set(nums1);
    const res = []
    for(let v of nums2) {
        if (set.has(v)) {
            res.push(v)
        }
    }
    return [...new Set(res)];
};
```

```js
// 辣鸡代码 * 1
var intersection = function(nums1, nums2) {
    const res = []
    for(let v of nums2) {
        // if (nums1.indexOf(v) !== -1) {
        if (nums1.includes(v)) {
            res.push(v)
        }
    }
    return [...new Set(res)];
};
```

:::

## :star: leetcode1.两数之和

::: details

```js
var twoSum = function(nums, target) {
    const map = new Map();
    for(let i = 0; i < nums.length; i++) {
        const temp = target - nums[i];
        if (!map.has(temp)) {
            map.set(nums[i], i);
        } else {
            return [map.get(temp), i];
        }
    }
    return [];
};
```

```js
// 辣鸡代码 * 1
var twoSum = function(nums, target) {
    const map = new Map();
    for(let i = 0; i < nums.length; i++) {
        map.set(nums[i], i);
    }
    for(let j = 0; j < nums.length; j++) {
        const val = target - nums[j];
        if (map.has(val) && map.get(val) !== j) {
            return [map.get(val), j];
        }
    }
    return [];
};
```

:::

## leetcode454四数相加

::: details

```js
var fourSumCount = function(nums1, nums2, nums3, nums4) {
    const len = nums1.length;
    const bMap = new Map();
    for(let i = 0; i < len; i++) {
        for(let j = 0; j < len; j++) {
            const sum = nums3[i] + nums4[j]
            let countTemp = bMap.get(sum) || 0;
            // 先++， 再赋值
            bMap.set(sum, ++countTemp);
            // bMap.set(sum, countTemp++);
        }
    }
    let count = 0;
    for(let i = 0; i < len;i ++) {
        for(let j =0; j < len; j++) {
            // 减去 nums1 和 numss的所有组合
            const temp = 0 - nums1[i] - nums2[j];
            if (bMap.has(temp)) {
                count += bMap.get(temp);
            }
        }
    } 
    return count;
};
```

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
var fourSumCount = function(nums1, nums2, nums3, nums4) {
    const aArr = [];
    const len = nums1.length;
    for(let i = 0; i < len; i++) {
        for(let j = 0; j < len; j++) {
            aArr.push(nums1[i] + nums2[j])
        }
    }
    const bMap = new Map();
    for(let i = 0; i < len; i++) {
        for(let j = 0; j < len; j++) {
            const sum = nums3[i] + nums4[j]
            let countTemp = bMap.get(sum) || 0;
            // 先++， 再赋值
            bMap.set(sum, ++countTemp);
            // bMap.set(sum, countTemp++);
        }
    }
    let count = 0;
    for(let i = 0; i < aArr.length; i++) {
        const temp = 0 - aArr[i]
        if (bMap.has(temp)) {
            count += bMap.get(temp);
        }
    }
    return count;
};
```

:::

## :star: leetcode41缺失的第一个正数
