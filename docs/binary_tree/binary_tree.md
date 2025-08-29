# 二叉树

## 二叉树概念


```js

满二叉树是一种特殊的二叉树，其所有非叶子节点都拥有两个子节点，
而且所有叶子节点都位于同一层。如果一棵二叉树的深度为k，
并且拥有(2^k - 1)个节点，则这棵树就是满二叉树

完全二叉树则要求除了最后一层外，其它各层的节点数都达到最大个数，
并且最后一层的节点都连续集中在最左边。

* 满二叉树
* 完全二叉树
* 平衡二叉树

二叉搜索树是一种有序的二叉树数据结构，其核心特性是：
任意节点的左子树的所有节点值均小于它，右子树的所有节点值均大于它。
这一特性使得 BST 在查找、插入、删除操作时能高效利用二分查找原理，平均时间复杂度为
 O(log n)（最坏情况退化为链表，O(n)）。


左子树和右子树的高度不能超过1，这就是平衡二叉树

 平衡二叉树（Balanced Binary Tree）是一种特殊的二叉搜索树（BST），
 其核心目标是 通过约束树的结构，使左右子树高度接近，
 避免退化成链表，从而保证操作效率稳定在 O(log n)。
 AVL 平衡二叉搜索树

 存储方式: 链式存储, 线性存储(数组)

 深度优先搜索: 前序遍历,中序遍历,后序遍历 ,可递归可迭代
 广度优先搜索: 一层一层地去遍历, 队列的思想,迭代法
```


## 如何定义一个二叉树节点

::: details

```js
 // Definition for a binary tree node.
 function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
 }
```

:::

## 如何理解前序 & 中序 & 后序遍历

* 左 一定在 右 的左边
* 前中后序， 主要看中 在哪，中在最左边，就是前序；中在中间，就是中序，中在最右边，就是后序。

## :star: 94. 二叉树的中序遍历(简单)

```md
给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。

输入：root = [1,null,2,3]
输出：[1,3,2]

输入：root = []
输出：[]

输入：root = [1]
输出：[1]

进阶: 递归算法很简单，你可以通过迭代算法完成吗？

```

::: details

中序迭代的思路

```js
var inorderTraversal = function(root) {
    // 中序： 左 中 右
    const res = [];
    const stk = [];
    while (root || stk.length) {
        while (root) {
            stk.push(root);
            root = root.left;
        }
        root = stk.pop();
        res.push(root.val);
        root = root.right;
    }
    return res;
}
```

中序递归的思路

```js
function traversal(curr, arr) {
    if (curr === null) return;
    traversal(curr.left, arr);
    arr.push(curr.val);
    traversal(curr.right, arr);
}

var inorderTraversal = function(root) {
    // const tree = buildTree(root);
    const arr = [];
    traversal(root, arr)
    return arr;
};
```

:::

## :star: 104. 二叉树的最大深度(简单)

```md
给定一个二叉树 root ，返回其最大深度。

二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数。

输入：root = [3,9,20,null,null,15,7]
输出：3

输入：root = [1,null,2]
输出：2
```

::: details

笨方法，思路同letcode102

```js
var maxDepth = function(root) {
    if (!root) return 0;
    const queue = [root];
    const res = [];
    while(queue.length) {
        res.push([]);
        const len = queue.length;
        for(let i = 0; i < len; i++) {
            const cur = queue.shift();
            res[res.length - 1].push(cur.val)
            cur.left && queue.push(cur.left);
            cur.right && queue.push(cur.right);
        }
    }
    return res.length;
};
```

优化下空间

```js
// 层序遍历，迭代法
var maxDepth = function(root) {
    if (!root) return 0;
    const queue = [root];
    let res = 0;
    while(queue.length) {
        res ++;
        const len = queue.length;
        for(let i = 0; i < len; i++) {
            const cur = queue.shift();
            cur.left && queue.push(cur.left);
            cur.right && queue.push(cur.right);
        }
    }
    return res;
};
```

递归，最佳

```js
var maxDepth = function(root) {
    if (root === null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
};
```

:::

## :star: 226. 翻转二叉树(简单)

```md
给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。

输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]

输入：root = [2,1,3]
输出：[2,3,1]

输入：root = []
输出：[]
```

::: details

```js
var invertTree = function(root) {
    if (root === null) {
        return null;
    }
    const left = invertTree(root.left);
    const right = invertTree(root.right);
    root.left = right;
    root.right = left;
    return root;
};
```

:::

## :star: 101. 对称二叉树(简单)

```md
给你一个二叉树的根节点 root ， 检查它是否轴对称。

输入：root = [1,2,2,3,4,4,3]
输出：true

输入：root = [1,2,2,null,3,null,3]
输出：false

进阶：你可以运用递归和迭代两种方法解决这个问题吗？
```

::: details

递归法

```js
// left 左子树， right 右子树
 function check(left, right) {
    // 两个都是空节点
    if (!left && !right) return true;
    // 其中1个有节点，1个没节点，肯定不对称
    if (!left || !right) return false;
    // 都有节点
    return left.val === right.val
    && check(left.left, right.right) 
    && check(left.right, right.left);
}
var isSymmetric = function(root) {
    // 左子树-
    // 右子树-
    return check(root.left, root.right);
};
```

迭代法

```js
 function check(l, r) {
    const queue = [];
    queue.push(l);
    queue.push(r);
    while(queue.length) {
        // 先push,先shift, 先进先出
        const curL = queue.shift();
        const curR = queue.shift();

        // 如果都为空
        if (!curL && !curR) continue;
        // 如果一个有值，一个没有值，直接结束
        if (!curL || !curR) return false;
        // 如果节点不相等，直接结束
        if (curL.val !== curR.val) return false;

        queue.push(curL.left);
        queue.push(curR.right);

        queue.push(curL.right);
        queue.push(curR.left);

    }
    // 全部检查通过，返回成功
    return true;
}
var isSymmetric = function(root) {
    // 左子树-
    // 右子树-
    return check(root.left, root.right);
};
```

:::

## :star: 543. 二叉树的直径(简单)

```md
给你一棵二叉树的根节点，返回该树的 直径 。

二叉树的 直径 是指树中任意两个节点之间最长路径的 长度 。
这条路径可能经过也可能不经过根节点 root 。

两节点之间路径的 长度 由它们之间边数表示。

输入：root = [1,2,3,4,5]
输出：3
解释：3 ，取路径 [4,2,1,3] 或 [5,2,1,3] 的长度。

输入：root = [1,2]
输出：1
```

::: details

解题思路：左右子树深度之和就是经过当前节点的当前最大直径

```md
直径的定义：

直径是任意两个节点之间的最长路径长度，这条路径可以不经过根节点。

路径长度由节点之间的边数决定（例如，路径 4 -> 2 -> 5 的长度是 2）。

关键观察：

对于任意一个节点，经过它的最长路径长度 = 左子树的深度 + 右子树的深度。

我们需要计算所有节点的“左子树深度 + 右子树深度”，并取最大值。

递归计算深度：

使用深度优先搜索（DFS）递归计算每个节点的左右子树深度。

在递归过程中，更新全局变量 maxDiameter，记录最大的直径。

const root = {
    val: 1,
    left: {
        val: 2,
        left: { val: 4, left: null, right: null },
        right: { val: 5, left: null, right: null }
    },
    right: { val: 3, left: null, right: null }
};
console.log(diameterOfBinaryTree(root)); // 3
```

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
function diameterOfBinaryTree(root) {
    let maxDiameter = 0;

    function depth(node) {
        if (!node) return 0;
        const leftDepth = depth(node.left);
        const rightDepth = depth(node.right);
        // 更新最大直径
        maxDiameter = Math.max(maxDiameter, leftDepth + rightDepth);
        // 返回当前节点的深度
        return Math.max(leftDepth, rightDepth) + 1;
    }

    depth(root);
    return maxDiameter;
}
```

:::

## :star: 102. 二叉树的层序遍历(中等)

```md
给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 
（即逐层地，从左到右访问所有节点）。

输入：root = [3,9,20,null,null,15,7]
输出：[[3],[9,20],[15,7]]

输入：root = [1]
输出：[[1]]

输入：root = []
输出：[]
```

::: details

```js
var levelOrder = function(root) {
    if (!root) return [];
    const res = [];
    const queue = [root];
    while(queue.length) {
        res.push([]);
        const len = queue.length;
        for(let i = 0; i < len; i++) {
            const cur = queue.shift();
            res[res.length - 1].push(cur.val);
            cur.left && queue.push(cur.left);
            cur.right && queue.push(cur.right)
        }
    }
    return res;
};
```

:::


## :star: 108. 将有序数组转换为二叉搜索树(简单)

```md
给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为
一棵 平衡 二叉搜索树。

输入：nums = [-10,-3,0,5,9]
输出：[0,-3,9,-10,null,5]
解释：[0,-10,5,null,-3,null,9] 也将被视为正确答案：

输入：nums = [1,3]
输出：[3,1]
解释：[1,null,3] 和 [3,1] 都是高度平衡二叉搜索树。
```

::: details

递归

```js
var sortedArrayToBST = function (nums) {
    const buildTree = (Arr, left, right) => {
        if (left > right)
            return null;

        let mid = Math.floor(left + (right - left) / 2);

        let root = new TreeNode(Arr[mid]);
        root.left = buildTree(Arr, left, mid - 1);
        root.right = buildTree(Arr, mid + 1, right);
        return root;
    }
    return buildTree(nums, 0, nums.length - 1);
};
```

迭代

```js
var sortedArrayToBST = function(nums) {
    if(nums.length===0) {
        return null;
    }
    let root = new TreeNode(0);       //初始根节点
    let nodeQue = [root];             //放遍历的节点,并初始化
    let leftQue = [0];                //放左区间的下标,初始化
    let rightQue = [nums.length-1];   // 放右区间的下标
    
    while(nodeQue.length) {
        let curNode = nodeQue.pop();
        let left = leftQue.pop();
        let right = rightQue.pop();
        let mid = left + Math.floor((right-left)/2);
        
        curNode.val = nums[mid];      //将下标为mid的元素给中间节点
        
//         处理左区间
        if(left <= mid-1) {
            curNode.left = new TreeNode(0);
            nodeQue.push(curNode.left);
            leftQue.push(left);
            rightQue.push(mid-1);
        }
        
//         处理右区间
        if(right >= mid+1) {
            curNode.right = new TreeNode(0);
            nodeQue.push(curNode.right);
            leftQue.push(mid+1);
            rightQue.push(right);
        }
    }
    return root;
};
```

:::

