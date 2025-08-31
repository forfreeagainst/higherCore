# 堆

## :star: 215. 数组中的第K个最大元素(中等)

```md
给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。

输入: [3,2,1,5,6,4], k = 2
输出: 5

输入: [3,2,3,1,2,4,5,5,6], k = 4
输出: 4
```

::: details

理解个题意，时间复杂度不行

```js
var findKthLargest = function(nums, k) {
    nums.sort((a, b) => a - b); // 升序排序
    return nums[nums.length - k]; // 第 k 大的数在索引 nums.length - k 处
};
```

基于快速排序的选择方法

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function quickselect(nums, l, r, k) {
    if (l === r) return nums[k];
    let partition = nums[l];
    let i = l - 1;
    let j = r + 1;
    while(i < j) {
        do {i++} while (nums[i] < partition);
        do {j--} while(nums[j] > partition);
        if (i < j) {
            let temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;
        }
    }
    if (k <= j) { 
        return quickselect(nums, l, j, k);
    } else {
        return quickselect(nums, j + 1, r, k);
    }
}

var findKthLargest = function(nums, k) {
    const numsSize = nums.length;
    return quickselect(nums, 0, numsSize - 1, numsSize - k);
};
```

时间复杂度：O(nlogn)，建堆的时间代价是 O(n)，删除的总代价是 O(klogn)，
因为 k<n，故渐进时间复杂为 O(n+klogn)=O(nlogn)。
空间复杂度：O(logn)，即递归使用栈空间的空间代价。

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function maxHeapify(a, i, heapSize) {
    let l = i * 2 + 1, r = i * 2 + 2, largest = i;
    if (l < heapSize && a[l] > a[largest]) {
        largest = l;
    }
    if (r < heapSize && a[r] > a[largest]) {
        largest = r;
    }
    if (largest !== i) {
        let t = a[i];
        a[i] = a[largest];
        a[largest] = t;
        maxHeapify(a, largest, heapSize);
    }
}

function buildMaxHeap(a, heapSize) {
    for (let i = Math.floor(heapSize / 2) - 1; i >= 0; --i) {
        maxHeapify(a, i, heapSize);
    }
}

function findKthLargest(nums, k) {
    let numsSize = nums.length;
    let heapSize = numsSize;
    buildMaxHeap(nums, heapSize);
    for (let i = numsSize - 1; i >= numsSize - k + 1; --i) {
        let t = nums[0];
        nums[0] = nums[i];
        nums[i] = t;
        --heapSize;
        maxHeapify(nums, 0, heapSize);
    }
    return nums[0];
}
```

:::

## :star: 347. 前 K 个高频元素(中等)

```md
给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。
你可以按 任意顺序 返回答案。

输入：nums = [1,1,1,2,2,3], k = 2
输出：[1,2]

输入：nums = [1], k = 1
输出：[1]

输入：nums = [1,2,1,2,1,2,3,1,3,2], k = 2
输出：[1,2]

进阶：你所设计算法的时间复杂度 必须 优于 O(n log n) ，其中 n 是数组大小。
```

::: details

O(n)的时间复杂度解法

```js
var topKFrequent = function(nums, k) {
    // 1. 统计每个数字出现的频率 - O(n)
    const frequencyMap = {};
    for (const num of nums) {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    }
    
    // 2. 创建桶数组 - 索引代表频率，值是该频率的所有数字 - O(n)
    const bucket = [];
    for (const [num, freq] of Object.entries(frequencyMap)) {
        if (!bucket[freq]) {
            bucket[freq] = [];
        }
        bucket[freq].push(parseInt(num));
    }
    
    // 3. 从高频率到低频率遍历桶，收集结果 - O(n)
    const result = [];
    for (let i = bucket.length - 1; i >= 0 && result.length < k; i--) {
        if (bucket[i]) {
            result.push(...bucket[i]);
        }
    }
    
    // 4. 如果结果超过k个，截取前k个
    return result.slice(0, k);
};
```

不考虑时间复杂度O(NLogN)

```js
var topKFrequent = function(nums, k) {
    // 统计每个数字出现的频率
    const frequencyMap = {};
    for (const num of nums) {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    }
    
    // 将数字和频率转换为数组
    const entries = Object.entries(frequencyMap);
    
    // 按频率降序排序
    entries.sort((a, b) => b[1] - a[1]);
    
    // 取前k个元素
    return entries.slice(0, k).map(entry => parseInt(entry[0]));
};
```

:::

## :star: 295. 数据流的中位数(困难)(下次一定)