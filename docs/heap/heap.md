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

## 面试题 17.14. 最小K个数(中等)

```md
设计一个算法，找出数组中最小的k个数。以任意顺序返回这k个数均可。

输入： arr = [1,3,5,7,2,4,6,8], k = 4
输出： [1,2,3,4]
```

::: details

理解题意而已，回去等通知吧

```js
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var smallestK = function(arr, k) {
    arr.sort((a, b) => a - b);
    return arr.slice(0, k)
};
```

堆

```js
class MaxHeap {
    constructor() {
        this.heap = [];
    }
    
    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    
    pop() {
        const max = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.sinkDown(0);
        }
        return max;
    }
    
    top() {
        return this.heap[0];
    }
    
    size() {
        return this.heap.length;
    }
    
    bubbleUp(idx) {
        const element = this.heap[idx];
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            const parent = this.heap[parentIdx];
            if (element <= parent) break;
            this.heap[parentIdx] = element;
            this.heap[idx] = parent;
            idx = parentIdx;
        }
    }
    
    sinkDown(idx) {
        const length = this.heap.length;
        const element = this.heap[idx];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;
            
            if (leftChildIdx < length) {
                leftChild = this.heap[leftChildIdx];
                if (leftChild > element) {
                    swap = leftChildIdx;
                }
            }
            
            if (rightChildIdx < length) {
                rightChild = this.heap[rightChildIdx];
                if ((swap === null && rightChild > element) || 
                    (swap !== null && rightChild > leftChild)) {
                    swap = rightChildIdx;
                }
            }
            
            if (swap === null) break;
            this.heap[idx] = this.heap[swap];
            this.heap[swap] = element;
            idx = swap;
        }
    }
}

var smallestK = function(arr, k) {
    if (k === 0) return [];
    const maxHeap = new MaxHeap();
    for (let i = 0; i < k; i++) {
        maxHeap.push(arr[i]);
    }
    for (let i = k; i < arr.length; i++) {
        if (arr[i] < maxHeap.top()) {
            maxHeap.pop();
            maxHeap.push(arr[i]);
        }
    }
    return maxHeap.heap;
};
```

快排

```js
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var smallestK = function(arr, k) {
    randomizedSelected(arr, 0, arr.length - 1, k);
    return arr.slice(0, k);
}

const randomizedSelected = (arr, l, r, k) => {
    if (l >= r) {
        return;
    }
    const pos = randomizedPartition(arr, l, r);
    const num = pos - l + 1;
    if (k === num) {
        return;
    } else if (k < num) {
        randomizedSelected(arr, l, pos - 1, k);
    } else {
        randomizedSelected(arr, pos + 1, r, k - num);
    }
}

// 基于随机的划分
const randomizedPartition = (nums, l, r) => {
    const i = parseInt(Math.random() * (r - l + 1)) + l;
    swap(nums, r, i);
    return partition(nums, l, r);
}

const partition = (nums, l, r) => {
    const pivot = nums[r];
    let i = l - 1;
    for (let j = l; j <= r - 1; ++j) {
        if (nums[j] <= pivot) {
            i = i + 1;
            swap(nums, i, j);
        }
    }
    swap(nums, i + 1, r);
    return i + 1;
}

const swap = (nums, i, j) => {
    [nums[i], nums[j]] = [nums[j], nums[i]];
}
```


:::

## :star: 295. 数据流的中位数(困难)(下次一定)