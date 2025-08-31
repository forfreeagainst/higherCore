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

## :star: 34.在排序数组中查找元素的第一个和最后一个位置(中等)

```md
给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。
请你找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。

输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]

输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]

输入：nums = [], target = 0
输出：[-1,-1]
```

::: details

实现功能，时间复杂度不行

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    let start = -1;
    let end = -1;
    for(let i = 0; i < nums.length; i++) {
        if (nums[i] === target && start !== -1) {
            end = i;
        } else if (nums[i] === target) {
            start = i;
            end = i;
        }
    }
    return [start, end]
};
```

```js
function searchRange(nums, target) {
    function findFirst() {
        let left = 0, right = nums.length - 1, res = -1;
        while (left <= right) {
            const mid = (left + right) >> 1;
            if (nums[mid] >= target) {
                right = mid - 1;
                // 继续向左搜索，以确保找到最左边的那个
                if (nums[mid] === target) res = mid; // 记录可能的答案
            } else {
                left = mid + 1;
            }
        }
        return res;
    }

    function findLast() {
        let left = 0, right = nums.length - 1, res = -1;
        while (left <= right) {
            const mid = (left + right) >> 1;
            if (nums[mid] <= target) {
                left = mid + 1;
                if (nums[mid] === target) res = mid; // 记录可能的答案
            } else {
                right = mid - 1;
            }
        }
        return res;
    }

    const first = findFirst();
    const last = findLast();
    return [first, last];
}
```

:::

## :star: 33. 搜索旋转排序数组(中等)

```md
整数数组 nums 按升序排列，数组中的值 互不相同 。

在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）
上进行了 向左旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], 
nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。
例如， [0,1,2,4,5,6,7] 下标 3 上向左旋转后可能变为 [4,5,6,7,0,1,2] 。

给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个
目标值 target ，则返回它的下标，否则返回 -1 。

你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。

输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4

输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1

输入：nums = [1], target = 0
输出：-1
```

::: details

```js
var search = function(nums, target) {
    return nums.indexOf(target);
    return nums.findIndex(v => v === target);
};
```

```js
function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            return mid;
        }
        
        // 判断左半部分是否有序
        if (nums[left] <= nums[mid]) {
            // 如果 target 在左半部分的范围内
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // 右半部分有序
            // 如果 target 在右半部分的范围内
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}
```

:::

## :star: 153. 寻找旋转排序数组中的最小值(中等)

```md
已知一个长度为 n 的数组，预先按照升序排列，经由1到n次旋转后，
得到输入数组。例如，原数组 nums = [0,1,2,4,5,6,7] 在变化后可能得到：
若旋转 4 次，则可以得到 [4,5,6,7,0,1,2]
若旋转 7 次，则可以得到 [0,1,2,4,5,6,7]
注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 
的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。

给你一个元素值 互不相同 的数组 nums ，它原来是一个升序排列的数组，
并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。

你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。

输入：nums = [3,4,5,1,2]
输出：1
解释：原数组为 [1,2,3,4,5] ，旋转 3 次得到输入数组。

输入：nums = [4,5,6,7,0,1,2]
输出：0
解释：原数组为 [0,1,2,4,5,6,7] ，旋转 4 次得到输入数组。

输入：nums = [11,13,15,17]
输出：11
解释：原数组为 [11,13,15,17] ，旋转 4 次得到输入数组。
```

::: details

不合进阶

```js
var findMin = function(nums) {
    let min = nums[0];
    for(let i = 1; i < nums.length; i++) {
        if (nums[i] < min) {
            min = nums[i]
        }
    }
    return min;
};
```

```js
var findMin = function(nums) {
    let left = 0;
    let right = nums.length - 1;
    while(left < right) {
        const mid = (left + right) >> 1;
        if (nums[mid] < nums[right]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return nums[left]
};
```

:::

## :star: 4. 寻找两个正序数组的中位数(困难)

```md
给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。
请你找出并返回这两个正序数组的 中位数 。

算法的时间复杂度应该为 O(log (m+n)) 。

输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2

输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
```

::: details

```js
var findMedianSortedArrays = function(nums1, nums2) {
    let arr = [...nums1, ...nums2];
    arr.sort((a, b) => a -b); // O(M+N)， 不是n Log n
    if (arr.length % 2 === 0) {
        let left = 0;
        let right = arr.length - 1;
        const mid = (left + right) >> 1;
        return( arr[mid] + arr[mid + 1] ) / 2
    } else {
        return arr[arr.length >> 1]
    }
};
```

```js
function findMedianSortedArrays(nums1, nums2) {
    const m = nums1.length;
    const n = nums2.length;
    
    // 确保 nums1 是较短的数组，减少二分次数
    if (m > n) {
        return findMedianSortedArrays(nums2, nums1);
    }
    
    const total = m + n;
    const half = Math.floor((total + 1) / 2); // 中位数的位置
    
    let left = 0;
    let right = m;
    
    while (left <= right) {
        const i = Math.floor((left + right) / 2); // nums1 的分割点
        const j = half - i;                      // nums2 的分割点
        
        // 处理边界情况
        const nums1Left = i === 0 ? -Infinity : nums1[i - 1];
        const nums1Right = i === m ? Infinity : nums1[i];
        const nums2Left = j === 0 ? -Infinity : nums2[j - 1];
        const nums2Right = j === n ? Infinity : nums2[j];
        
        // 检查分割点是否正确
        if (nums1Left <= nums2Right && nums2Left <= nums1Right) {
            // 找到正确的分割点
            if (total % 2 === 1) {
                // 奇数情况，返回较大的左半部分
                return Math.max(nums1Left, nums2Left);
            } else {
                // 偶数情况，返回左半部分的最大和右半部分的最小平均值
                return (Math.max(nums1Left, nums2Left) + Math.min(nums1Right, nums2Right)) / 2;
            }
        } else if (nums1Left > nums2Right) {
            // nums1 的左半部分太大，向左调整分割点
            right = i - 1;
        } else {
            // nums2 的左半部分太大，向右调整分割点
            left = i + 1;
        }
    }
    
    return 0; // 不会执行到这里
}
```

:::
