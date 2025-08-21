# 滑动窗口

## :star: 3.无重复字符的最长子串(中等)

```md
给定一个字符串 s ，请你找出其中不含有重复字符的 最长 子串 的长度。

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

::: details

连续的就是子串。

```js
var lengthOfLongestSubstring = function(s) {
    // 哈希集合，记录每个字符是否出现过
    const set = new Set();
    const len = s.length;
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = 0;
    let ans = 0;
    for (let i = 0; i < len; i++) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            set.delete(s.charAt(i - 1));
        }
        while (rk < len && !set.has(s.charAt(rk))) {
            // 不断地移动右指针
            set.add(s.charAt(rk));
            rk++;
        }
        // 第 i 到 rk 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, rk - i);
    }
    return ans;
};
```

:::

## :star: 438. 找到字符串中所有字母异位词(中等)

```md
给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，
返回这些子串的起始索引。不考虑答案输出的顺序。

输入: s = "cbaebabacd", p = "abc"
输出: [0,6]
解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。

输入: s = "abab", p = "ab"
输出: [0,1,2]
解释:
起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。
```

::: details

异位词，排序一下，就是一样的单词

```js
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    let numArr = [];
    let sLen = s.length;
    let pSet = new Set([...p])
    for(let i = 0; i< sLen; i++) {
        if (!pSet.has(s.charAt(i))) {
            continue;
        }
        let rk = i;
        let pStr = p;
        while (rk < sLen) {
            let currLen = pStr.length;
            pStr = pStr.replace(s.charAt(rk), "");
            if (currLen === pStr.length) {
                break;
            }
            if (pStr.length === 0) {
                numArr.push(i);
                break;
            }
            rk++;
        }
    }
    return numArr;
};
```

:::