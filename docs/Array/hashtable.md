# 哈希表

## 学习map, set

```js
const map = new Map();
map.set(0, 1);
console.log(map);
console.log(map.has(0)); // true
```

## :star: 1. 两数之和(简单)

```md
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出
和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

你可以按任意顺序返回答案。

输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

输入：nums = [3,2,4], target = 6
输出：[1,2]

输入：nums = [3,3], target = 6
输出：[0,1]
```

::: details

Set 和 Map 在JavaScript中都是基于哈希表实现的。

```js
var twoSum = function(nums, target) {
    const map = new Map();
    for(let i = 0; i < nums.length; i++) {
        const need = target - nums[i];
        if (map.has(need) && i !== map.get(need)) {
            return [i, map.get(need)]
        }
        map.set(nums[i], i);
    } 
};
```

```md
暴力解法

*枚举在数组中所有的不同的两个下标的组合
*逐个检查它们所对应的数的和是否等于target。
```

:::

## :star: 49. 字母异位词分组(中等)(骗人)

```md
给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
解释：
在 strs 中没有字符串可以通过重新排列来形成 "bat"。
字符串 "nat" 和 "tan" 是字母异位词，因为它们可以重新排列以形成彼此。
字符串 "ate" ，"eat" 和 "tea" 是字母异位词，因为它们可以重新排列以形成彼此。

输入: strs = [""]
输出: [[""]]

输入: strs = ["a"]
输出: [["a"]]
```

::: details

```md
sort中，字符串如何比较大小：

从小到大：arr.sort();

从大到小：arr.sort((a, b) => b.localeCompare(a, 'en'));
```

```js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    let map = new Map();
    let strArr = [];
    strs.forEach(v => {
        const temp = [...v];
        temp.sort();
        const key = temp.join('');
        if (map.has(key)) {
            map.set(key, [v,...map.get(key)])
        } else {
            map.set(key, [v]);
        }
    })
    for(let [k,v] of map) {
        strArr.push(map.get(k));
    }
    return strArr;
};
```

:::

## :star: 128. 最长连续序列(中等)

```md
给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素
在原数组中连续）的长度。

请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

输入：nums = [100,4,200,1,3,2]
输出：4
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。

输入：nums = [0,3,7,2,5,8,4,6,0,1]
输出：9

输入：nums = [1,0,1,2]
输出：3
```

::: details

```js
var longestConsecutive = function(nums){
    let num_set = new Set(nums);
    let longestLength = 0;
    for (const num of num_set) {
        if (!num_set.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;
            while (num_set.has(currentNum + 1)) {
                currentNum += 1;
                currentStreak += 1;
            }
            longestLength = Math.max(longestLength, currentStreak);
        }
    }
    return longestLength;   
};
```

:::