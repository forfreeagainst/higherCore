# 普通数组

## :star: 53. 最大子数组和(中等)

```md
给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组
最少包含一个元素），返回其最大和。

子数组是数组中的一个连续部分

输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

输入：nums = [1]
输出：1

输入：nums = [5,4,-1,7,8]
输出：23

进阶：如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的 分治法 求解。
```

::: details

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

分治

```md
「方法二」相较于「方法一」来说，时间复杂度相同，但是因为使用了递归，并且维护了
四个信息的结构体，运行的时间略长，空间复杂度也不如方法一优秀，而且难以理解。那么
这种方法存在的意义是什么呢？
```


```js
function Status(l, r, m, i) {
    this.lSum = l;
    this.rSum = r;
    this.mSum = m;
    this.iSum = i;
}

const pushUp = (l, r) => {
    const iSum = l.iSum + r.iSum;
    const lSum = Math.max(l.lSum, l.iSum + r.lSum);
    const rSum = Math.max(r.rSum, r.iSum + l.rSum);
    const mSum = Math.max(Math.max(l.mSum, r.mSum), l.rSum + r.lSum);
    return new Status(lSum, rSum, mSum, iSum);
}

const getInfo = (a, l, r) => {
    if (l === r) {
        return new Status(a[l], a[l], a[l], a[l]);
    }
    const m = (l + r) >> 1;
    const lSub = getInfo(a, l, m);
    const rSub = getInfo(a, m + 1, r);
    return pushUp(lSub, rSub);
}

var maxSubArray = function(nums) {
    return getInfo(nums, 0, nums.length - 1).mSum;
};
```

:::

## :star: 56. 合并区间(中等)

```md
以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。

输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
```

::: details

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

:::

## :star: 189.轮转数组(中等)

```md
给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右轮转 1 步: [7,1,2,3,4,5,6]
向右轮转 2 步: [6,7,1,2,3,4,5]
向右轮转 3 步: [5,6,7,1,2,3,4]

输入：nums = [-1,-100,3,99], k = 2
输出：[3,99,-1,-100]
解释: 
向右轮转 1 步: [99,-1,-100,3]
向右轮转 2 步: [3,99,-1,-100]

尽可能想出更多的解决方案，至少有 三种 不同的方法可以解决这个问题。
你可以使用空间复杂度为 O(1) 的 原地 算法解决这个问题吗？
```

::: details

时间复杂度O(n), 空间复杂度O(n)

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

时间复杂度O(Nk), 空间复杂度O(k)

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

时间复杂度O(N), 空间复杂度O(1)

```js
const reverse = (nums, start, end) => {
    while (start < end) {
        const temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start += 1;
        end -= 1;
    }
}

var rotate = function(nums, k) {
    k %= nums.length;
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
};
```

时间复杂度O(N), 空间复杂度O(1)

```js
// gcd最大公约数
const gcd = (x, y) => y ? gcd(y, x % y) : x;

var rotate = function(nums, k) {
    const n = nums.length;
    k = k % n;
    let count = gcd(k, n);
    for (let start = 0; start < count; ++start) {
        let current = start;
        let prev = nums[start];
        do {
            const next = (current + k) % n;
            const temp = nums[next];
            nums[next] = prev;
            prev = temp;
            current = next;
        } while (start !== current);
    }
};
```

:::

## :star: 238. 除自身以外数组的乘积(中等)

```md
给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 
nums 中除 nums[i] 之外其余各元素的乘积 。

题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在32 位 整数范围内。

请 不要使用除法，且在 O(n) 时间复杂度内完成此题。

输入: nums = [1,2,3,4]
输出: [24,12,8,6]

输入: nums = [-1,1,0,-3,3]
输出: [0,0,9,0,0]

进阶：你可以在 O(1) 的额外空间复杂度内完成这个题目吗？
（ 出于对空间复杂度分析的目的，输出数组 不被视为 额外空间。）
```

::: details

前缀积 * 后缀积，时间复杂度O(N)，空间复杂度O(N)

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

时间复杂度O(N)，空间复杂度O(1)

```js
var productExceptSelf = function(nums) {
    const length = nums.length;
    const answer = new Array(length);

    // answer[i] 表示索引 i 左侧所有元素的乘积
    // 因为索引为 '0' 的元素左侧没有元素， 所以 answer[0] = 1
    answer[0] = 1;
    for (let i = 1; i < length; i++) {
        answer[i] = nums[i - 1] * answer[i - 1];
    }

    // R 为右侧所有元素的乘积
    // 刚开始右边没有元素，所以 R = 1
    let R = 1;
    for (let i = length - 1; i >= 0; i--) {
        // 对于索引 i，左边的乘积为 answer[i]，右边的乘积为 R
        answer[i] = answer[i] * R;
        // R 需要包含右边所有的乘积，所以计算下一个结果时需要将当前值乘到 R 上
        R *= nums[i];
    }
    return answer;
};
```

:::

## :star: 41. 缺失的第一个正数(困难)(骗人，不难)

```md
给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。

请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。

输入：nums = [1,2,0]
输出：3
解释：范围 [1,2] 中的数字都在数组中。

输入：nums = [3,4,-1,1]
输出：2
解释：1 在数组中，但 2 没有。

输入：nums = [7,8,9,11,12]
输出：1
解释：最小的正数 1 没有出现。
```

::: details

空间复杂度不为常数级别，不符合题意

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
// 时间复杂度O(N) 空间复杂度O(n)
// 请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。
// 不符合题意
var firstMissingPositive = function(nums) {
    const set = new Set();
    let res = 1;
    for(let i = 0; i < nums.length; i++) {
        set.add(nums[i]);
        while(set.has(res)) {
            res ++;
        }
        // 用以下注释，就能通过大多用例，稍加思考下，就能解决了
        // if (nums[i] === res) {
        //     res++;
        // }
    }
    return res;
};
```

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    const n = nums.length;
    
    // 第一步：将所有非正数标记为 n+1
    for (let i = 0; i < n; i++) {
        if (nums[i] <= 0) {
            nums[i] = n + 1;
        }
    }
    
    // 第二步：使用索引作为哈希键，标记出现过的正数
    for (let i = 0; i < n; i++) {
        const num = Math.abs(nums[i]);
        if (num <= n) {
            nums[num - 1] = -Math.abs(nums[num - 1]);
        }
    }
    
    // 第三步：找到第一个未被标记的索引
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) {
            return i + 1;
        }
    }
    
    // 如果所有1..n都存在，则返回n+1
    return n + 1;
};
```

:::