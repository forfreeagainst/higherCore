# 二分查找

```md
    /**
     * 范围查询规律
     * 初始化:
     *   int left = 0;
     *   int right = nums.length - 1;
     * 循环条件
     *   left <= right;
            什么时候left < right ? 找最小值（小于）的时候，leetcode153
     * 右边取值
     *   right = mid - 1
     * 左边取值
     *   left = mid + 1
     * 查询条件
     *   >= target值, 则 nums[mid] >= target时, 都减right = mid - 1
     *   >  target值, 则 nums[mid] >  target时, 都减right = mid - 1
     *   <= target值, 则 nums[mid] <= target时, 都加left = mid + 1
     *   <  target值, 则 nums[mid] <  target时, 都加left = mid + 1
     * 结果
     *   求大于(含等于), 返回left
     *   求小于(含等于), 返回right
     * 核心思想: 要找某个值, 则查找时遇到该值时, 当前指针(例如right指针)要错过它, 
     让另外一个指针(left指针)跨过他(体现在left <= right中的=号), 则找到了


条件	调整方式	返回	含义
nums[mid] >= target	right = mid - 1	left	第一个 >= target 的位置
nums[mid] > target	right = mid - 1	left	第一个 > target 的位置
nums[mid] <= target	left = mid + 1	right	最后一个 <= target 的位置
nums[mid] < target	left = mid + 1	right	最后一个 < target 的位置


     left + (right - left) / 2

更数学化，常见于算法教材（如《算法导论》）。

适合跨语言使用（如 Java/C++/Python）。

Math.floor((left + right) / 2)

更直观，明确表达“向下取整”的意图。

适合纯 JavaScript 项目，可读性更好。

     */

```

## :star: 35. 搜索插入位置(简单)

```md
给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。
如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请必须使用时间复杂度为 O(log n) 的算法。

输入: nums = [1,3,5,6], target = 5
输出: 2

输入: nums = [1,3,5,6], target = 2
输出: 1

输入: nums = [1,3,5,6], target = 7
输出: 4
```

::: details

笨方法O(n),不符合题意

```js
var searchInsert = function(nums, target) {
    for(let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            return i;
        } else if (target < nums[i]) {
            return 0;
        } else if (target > nums[i] && nums[i + 1] && nums[i+1] >target) {
            return i + 1;
        }
    }
    return nums.length;
};
```

:::

最终方法：O(LogN)

::: details

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while(left <= right) {
        let middle = ~~((left + right) / 2);
        if (target === nums[middle]) {
            return middle;
        } else if (target > nums[middle]) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }
    // right 是最后一个小于 target 的元素的索引。
    // left 是第一个大于 target 的元素的索引
    // return left; // ok
    return right + 1; // ok
};
```

:::

## :star: 74. 搜索二维矩阵(中等)

```md
给你一个满足下述两条属性的 m x n 整数矩阵：

每行中的整数从左到右按非严格递增顺序排列。
每行的第一个整数大于前一行的最后一个整数。
给你一个整数 target ，如果 target 在矩阵中，返回 true ；否则，返回 false 。

输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
输出：true
```

::: details

两次二分查找

```js
var searchMatrix = function(matrix, target) {
    let top = 0;
    let bottom = matrix.length - 1;
    while(top <= bottom) {
        let middle = Math.floor((top + bottom) / 2);
        if (matrix[middle][0] === target) {
            return true;
        } else if (target > matrix[middle][0]) {
            top = middle + 1;
        } else {
            bottom = middle - 1;
        }
    }
    // After the loop, bottom is the last row where matrix[bottom][0] <= target
    // If bottom is -1, target is less than all elements
    if (bottom < 0) {
        return false;
    }
    let row = bottom;
    let left = 0;
    let right = matrix[row].length - 1;
    while(left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (matrix[row][mid] === target) {
            return true;
        } else if(target > matrix[row][mid]) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return false;
};
```

时间复杂度O(Log(Mn))，空间复杂度O(1)

若将矩阵每一行拼接在上一行的末尾，则会得到一个升序数组，我们可以在该数组上二分找到目标元素。

代码实现时，可以二分升序数组的下标，将其映射到原矩阵的行和列上。

```js
var searchMatrix = function(matrix, target) {
    const m = matrix.length, n = matrix[0].length;
    let low = 0, high = m * n - 1;
    while (low <= high) {
        const mid = Math.floor((high - low) / 2) + low;
        const x = matrix[Math.floor(mid / n)][mid % n];
        if (x < target) {
            low = mid + 1;
        } else if (x > target) {
            high = mid - 1;
        } else {
            return true;
        }
    }
    return false;
};

```

:::

## :star: leetcode34.在排序数组中查找元素的第一个和最后一个位置(中等)

```md

```