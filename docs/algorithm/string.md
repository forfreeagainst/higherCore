# 字符串

## leetcode344:反转字符串



::: details

终止条件：left < right

```js
var reverseString = function(s) {
    let left = 0;
    let right = s.length - 1;
    while(left < right) {
        let temp = s[left];
        s[left++] = s[right];
        s[right--] = temp;
    }
    return s;
};
```

终止条件 i < s.length / 2

```js
var reverseString = function(s) {
    for(let i = 0; i < s.length / 2; i++) {
        let left = i;
        let right = s.length - i - 1;
        let temp = s[left];
        s[left] = s[right];
        s[right] = temp;
    }
    return s;
};
```

:::

## leetcode541:反转字符串II

::: details

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
 // 数组，开始索引，结束索引
function reverse(arr, start, end) {
    for(let i = start, j = end; i < j; i++, j--) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

var reverseStr = function(s, k) {
    // 题目意思是 每计数到2k, 就 反转 2k字符中的 前 k个字符，
    // 剩余的字符 （即取余2k的字符）全部反转。
    const arr = s.split('');
    for(let i = 0; i < arr.length; i += 2 * k) {
        // 如果剩余字符串少于k个。
        // 剩余2个， k为3
        if (arr.length - 1 - i < k) {
            reverse(arr, i, arr.length - 1);
        } else {
            // 可以完整计数 2 * k  一次
            reverse(arr, i, i + k - 1);
        }
    }
    return arr.join('');
};
```

:::

## leetcode151:翻转字符串里的单词

::: details

```js
var reverseWords = function(s) {
    //  \s+:	匹配连续的一个或多个空白字符
    return s.trim().split(/\s+/).reverse().join(' ');
};
```

:::

## KMP算法理论篇

::: details

```js

```

:::

## KMP算法代码篇

::: details

```js

```

:::

## leetcode459重复的子字符串

给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成。

::: details

```js

```

:::
