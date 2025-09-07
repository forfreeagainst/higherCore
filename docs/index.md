---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "this-is-you"
  text: "Action speak louder than words."
  tagline: My great project tagline

features:
  - title: 离不开
    details: 学了几种编程语言，都离不开算法
  - title: 离不开
    details: 越接近源码和广泛应用
  - title: 离不开
    details: 运气好的时候，能力无法匹配
---

能看懂题目
拆分细节（map的所有用法，判断是回文子串, ...）
题目共分为几个考察
通过canvas绘图，描述执行过程。

时间复杂度
不是真正代码执行的时间，而是代码随着数据规模的扩展，展现的变化趋势。
执行次数。
[算法加强javascript-algorithms](https://github.com/trekhleb/javascript-algorithms)

## 前端算法题

```
递归：**1.有规律的函数 2.调用自身 3.找出终止条件**
堆
```

### 1.实现斐波那契数列（数组中，第一个元素和第二个元素都是1，从第三个元素开始，第三个元素的值等于前两个元素的和）

```js
// 使用递归，第n个数的值是多少
function fn(n) {
  if (n == 1) return 1;
  if (n == 2) return 1;
  return fn(n - 2) + fn(n - 1);
}
console.log(fn(5)); // 1 1 2 3

//使用DP (狠狠思考规则fn=fn-2+fn-1)(3个变量)
function fn2(n) {
  if (n == 1) return 1;
  if (n == 2) return 1;
  let a = 1;
  let b = 1;
  let temp;
  for(let i =3;i<=n;i++) {
    temp = a+b;
    a = b;
    b =temp;
  }
  return temp;
}
console.log(fn2(5)); // 1 1 2 3
```

### 2.求最长递增子序列

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    if(nums.length===0) return 0; 
    let arr = [[nums[0]]];
    for(let i=1;i<nums.length;i++) {
        const n = nums[i];
        for(let j=arr.length-1;j>=0;j--) {
            const line = arr[j];
            const tail = line[line.length-1];
            if (n>tail) {
                arr[j+1] = [...line, n];
                break;
            } else if ( j== 0&& n < tail) {
                arr[j] = [n]
            }
        }
    }
    return arr[arr.length - 1];
};
```

### 求最长递增子序列的长度


tree

```md
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='icon' href='data:,'>  <!-- 空图标 -->
</head>
<body>
    <script>
         // Definition for a binary tree node.
 function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
 }
 function buildTree(arr) {
    if (arr.length === 0) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root]; // 有节点(val)的那个，进行添加left, right
    let i = 1;
    while(queue.length > 0 && i < arr.length) {
        const current = queue.shift();
        if (i < arr.length && arr[i] !== null) {
            current.left = new TreeNode(arr[i]);
            queue.push(current.left);
        }
        i ++;

        if (i < arr.length && arr[i] !== null) {
            current.right = new TreeNode(arr[i]);
            queue.push(current.right);
        }
        i ++;
    }
    return root;
}
        const root = [4,2,7,1,3,6,9];
        const temp = buildTree(root);
        var invertTree = function(root) {
            debugger
            if (root === null) {
                return null;
            }
            const left = invertTree(root.left);
            const right = invertTree(root.right);
            root.left = right;
            root.right = left;
            return root;
        };
        const newRoot = invertTree(temp)
        console.log(newRoot);
        // function traverse(tree) {
        //     const res = [];
        //     const queue = [tree];
        //     while(queue.length) {
        //         res.push([])
        //         const len = queue.length;
        //         for(let i = 0; i < len; i++) {
        //             const curr = queue.shift();
        //             res[res.length - 1].push(curr.val)
        //             curr.left && queue.push(curr.left);
        //             curr.right && queue.push(curr.right);
        //         }
        //     }
        //     return res;
        // }
        // console.log(traverse(newRoot));
    </script>
</body>
</html>
```

LTS

```md
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
        // result记录了索引，是个数组。
        // 首先，与结果集的最后一个比较，比它大的，都添加，
        // 比它小的，优化序列，找到 大于左边，小于右边的 合适位置放下。二分查找
        // 以上得出：最长递增子序列的长度 就是结果集的长度；结果集最后一个，代表的就是最大数的索引
        // 我们可以使用前驱节点，p记录了前驱节点索引，是个数组
        function getSequence(arr) {
            const res = [0]; // 结果集
            const len = arr.length;

            const p = new Array(len).fill(undefined);

            let left, right, midde;
            for(let i = 0; i < len; i++ ) {
                const arrI = arr[i];
                if (arrI !== 0) {
                    const resLastIndex = res.length - 1;
                    // 都是比它大的
                    if (arr[res[resLastIndex]] < arrI) {
                        res.push(i);
                        continue;
                    }
                    // 如果不比之前的大，找到比它小的替换
                    left = 0;
                    right = res.length - 1;
                    while(left < right) {
                        middle = (left + right) >> 1; // 整除2
                        // 1 4 7  插入 3， 找 大于左边 ，小于右边（找到比它小的，替换）
                        if (arr[res[middle]] < arrI) {
                            left = middle + 1;
                        } else {
                            right = middle;
                        }
                    }
                    if(arrI < arr[res[left]]) {
                        res[left] = i;
                    }
                }
            }
            return res;
        }
        let arr = [4,5,1,2,7,3,6,9];
        // arr = [1,2,3,4,5,6];
        // arr = [14,19,1,2,33, 16,18];
        arr = [1, 3, 2, 4, 0, 5];
        console.log(getSequence(arr));
    </script>
</body>
</html>
```

## 最长递增子序列

### 个人思路

贪心算法 + 二分查找 ，为啥，就能得到最长递增子序列的个数

首先最长递增子序列的个数是对的，但顺序不对，不是子序列。通过索引的方式

1. 默认追加 （找到比它大的，就添加）
2. 替换 （当前比它小，就往前二分查找，找到比它小的，然后替换掉。）
3. 记录每个人的前驱节点
4. 通过最后一项进行回溯

### 官方源码

```js
function getSequence(arr: number[]): number[] {
  const p = arr.slice()
  const result = [0]
  let i, j, u, v, c
  const len = arr.length
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = (u + v) >> 1; // 除2，然后取整的效果
        // 类似: (u + v) | 0 或者 ~((u+v) /2) ？？
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}
```
