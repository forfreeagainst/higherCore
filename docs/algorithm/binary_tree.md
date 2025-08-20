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


### 如何定义一个二叉树节点

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

### 如何理解前序 & 中序 & 后序遍历

* 左 一定在 右 的左边
* 前中后序， 主要看中 在哪，中在最左边，就是前序；中在中间，就是中序，中在最右边，就是后序。

### 坑人题目

直接省略了构建树

有节点(val)的那个推入队列，进行添加left, right

::: details

```js
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
```

:::

### 解题思路

::: details

* 递归就是栈的思想
* 确定递归函数的参数和返回值
* 确认终止条件
* 确定单层递归的逻辑

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script>
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

function buildTree(arr) {
    if (arr.length === 0) return null;
    
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    
    while (queue.length > 0 && i < arr.length) {
        const current = queue.shift();
        
        if (i < arr.length && arr[i] !== null) {
            current.left = new TreeNode(arr[i]);
            queue.push(current.left);
        }
        i++;
        
        if (i < arr.length && arr[i] !== null) {
            current.right = new TreeNode(arr[i]);
            queue.push(current.right);
        }
        i++;
    }
    
    return root;
}

// root其实是一个对象。
function inorderTraversal(root) {
    const res = [];
    const inorder = (node) => {
        if (!node) return;
        inorder(node.left);
        res.push(node.val);
        inorder(node.right);
    };
    inorder(root);
    return res;
}

const root = buildTree([1, null, 2, 3]);
console.log("🚀 ~ root:", root)
const result = inorderTraversal(root);
console.log("🚀 ~ result:", result); // 正确输出: [1, 3, 2]
  </script>
</body>
</html>
```

:::

### leetcode144:前序遍历

::: details

#### 前序的迭代法

```js
var preorderTraversal = function(root) {
    if (!root) return [];
    const res = [];
    const stack = [root];
    let cur = null
    // 前序遍历 中 左 右
    do {
        cur = stack.pop();
        res.push(cur.val);
        // 先进后出, 模拟栈行为，先push,后pop
        cur.right && stack.push(cur.right);
        cur.left && stack.push(cur.left);
    } while(stack.length);
    return res;
};
```

#### 前序的递归法

```js
var traversal = function(curr, arr) {
    // 先检查cur是否存在，才能访问cur.val呀
    if (!curr) return;
    arr.push(curr.val);
    traversal(curr.left, arr);
    traversal(curr.right, arr);
}
var preorderTraversal = function(root) {
    const arr = [];
    traversal(root, arr);
    return arr;
};
```

:::

### leetcode94:中序遍历

::: details

#### 中序迭代的思路

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

#### 中序递归的思路

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

### leetcode145:后序遍历

::: details


#### 后序的迭代法

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
 * @return {number[]}
 */

var postorderTraversal = function(root) {
    if (!root) return [];
    // 后序: 左 右 中
    const stack = [root];
    const res = [];
    let cur = null;
    do {
        cur = stack.pop();
        // 注意看，我先push 中间的
        // 结果先 push 中，要实现 中 右 左 的反转
        res.push(cur.val);
        // 同时栈是先进后出，所以 左边先进，左边后出来。
        cur.left && stack.push(cur.left);
        cur.right && stack.push(cur.right);
    } while (stack.length);
    return res.reverse();
};
```

#### 后序的递归法

```js
var postorderTraversal = function(root) {
   const arr = [];
   var traversal = function(curr) {
        if (!curr) return;
        traversal(curr.left);
        traversal(curr.right);
        arr.push(curr.val);
   }  
   traversal(root);
   return arr;
};
```

:::


## leetcode102二叉树的层序遍历(广度优先搜索)

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

## leetcode226翻转二叉树

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

## leetcode101对称二叉树

::: details

### 递归法

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

### 迭代法

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

## leetcode104二叉树的最大深度

::: details

### 笨方法，思路同letcode102

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

### 其他方法

* 递归

```js
var maxDepth = function(root) {
    if (root === null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
};
```

:::

## leetcode111二叉树的最小深度

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明：叶子节点是指没有子节点的节点。


::: details

```js
var minDepth = function(root) {
    if (!root) return 0;
    const queue = [root];
    let res = 0;
    // 层序遍历
    while(queue.length) {
        res ++;
        const len = queue.length;
        for(let i = 0; i < len; i++) {
            const cur = queue.shift();
            // 发现没有 叶子节点，直接结束
            if (!cur.left && !cur.right) return res;
            cur.left && queue.push(cur.left);
            cur.right && queue.push(cur.right);
        }
    }
    return res;
};
```

:::

## leetcode222完全二叉树的节点个数（数量）

::: details

### 层序遍历，就完事了

```js
var countNodes = function(root) {
    if (!root) return 0;
    let res = 0;
    const queue = [root];
    while(queue.length) {
        const len = queue.length;
        for(let i = 0; i < queue.length; i++) {
            const cur = queue.shift();
            res ++;
            if (cur.left) {
                queue.push(cur.left);
            }
            if (cur.right) {
                queue.push(cur.right);
            }
        }
    }
    return res;
};
```

### 优化版

### 其他版本

```js
var countNodes = function(root) {
    //递归法计算二叉树节点数
    // 1. 确定递归函数参数
    const getNodeSum = function(node) {
    //2. 确定终止条件
        if(node === null) {
            return 0;
        }
    //3. 确定单层递归逻辑
        let leftNum = getNodeSum(node.left);
        let rightNum = getNodeSum(node.right);
        return leftNum + rightNum + 1;
    }
    return getNodeSum(root);
};
```

```js
var countNodes = function(root) {
    //利用完全二叉树的特点
    if(root === null) {
        return 0;
    }
    let left = root.left;
    let right = root.right;
    let leftDepth = 0, rightDepth = 0;
    while(left) {
        left = left.left;
        leftDepth++;
    }
    while(right) {
        right = right.right;
        rightDepth++;
    }
    if(leftDepth == rightDepth) {
        return Math.pow(2, leftDepth+1) - 1;
    }
    return countNodes(root.left) + countNodes(root.right) + 1;
};
```

:::

## leetcode110平衡二叉树TODO

```md
- `Math.abs(leftHeight - rightHeight) <= 1`：检查**当前节点**是否平衡。
- `isBalanced(root.left)`：检查**左子树**是否平衡。
- `isBalanced(root.right)`：检查**右子树**是否平衡。
- **必须三者同时满足**，整棵树才是平衡的。
```

::: details

### 笨方法，但是理解了什么才是真正的平衡二叉树

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
 * @return {boolean}
 */
 function getHeight(root) {
    if (!root) return 0;
    const queue = [root];
    let res = 0;
    while(queue.length) {
        const len = queue.length;
        res ++;
        for(let i = 0; i < len; i ++) {
            const cur = queue.shift();
            cur.left && queue.push(cur.left);
            cur.right && queue.push(cur.right);
        }
    }
    return res;
 }
var isBalanced = function(root) {
    // 平衡二叉树， 左右子树的高度，不超过1
    if (!root) return true;
    const leftHeight = getHeight(root.left);
    const rightHeight = getHeight(root.right);
    return Math.abs(leftHeight - rightHeight) <= 1 
        && isBalanced(root.left) 
        && isBalanced(root.right);
};
```

:::

## leetcode257二叉树的所有路径

::: details

```js

```

:::

## leetcode404左叶子之和

::: details

```js

```

:::

## leetcode513找树左下角的值

::: details

```js

```

:::

## leetcode112路径总和

::: details

```js

```

:::

## leetcode106从中序与后序遍历序列构造二叉树

::: details

```js

```

:::

## leetcode654最大二叉树

::: details

```js

```

:::

## leetcode617合并二叉树

::: details

```js

```

:::

## leetcode700二叉搜索树中的搜索

::: details

```js

```

:::

## :star: leetcode98验证二叉搜索树

```md
给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。

有效 二叉搜索树定义如下：

节点的左子树只包含 严格小于 当前节点的数。
节点的右子树只包含 严格大于 当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树

输入：root = [2,1,3]
输出：true

输入：root = [5,1,4,null,null,3,6]
输出：false
解释：根节点的值是 5 ，但是右子节点的值是 4 。
```

::: details

递归的方法

```js
var isValidBST = function (root) {
    let pre = null;
    const inOrder = (root) => {
        if (root === null)
            return true;
        let left = inOrder(root.left);

        if (pre !== null && pre.val >= root.val)
            return false;
        pre = root;

        let right = inOrder(root.right);
        return left && right;
    }
    return inOrder(root);
};
```

迭代的方法

```js
var isValidBST = function (root) {
	const queue = [];
	let cur = root;
	let pre = null;
	while (cur !== null || queue.length !== 0) {
		if (cur !== null) {
			queue.push(cur);
			cur = cur.left;
		} else {
			cur = queue.pop();
			if (pre !== null && cur.val <= pre.val) {
				return false;
			}
			pre = cur;
			cur = cur.right;
		}
	}
	return true;
};
```

辅助数组

```js
var isValidBST = function (root) {
    let arr = [];
    const buildArr = (root) => {
        if (root) {
            buildArr(root.left);
            arr.push(root.val);
            buildArr(root.right);
        }
    }
    buildArr(root);
    for (let i = 1; i < arr.length; ++i) {
        if (arr[i] <= arr[i - 1])
            return false;
    }
    return true;
};
```

:::

## leetcode530二叉搜索树的最小绝对差

::: details

```js

```

:::

## leetcode501二叉搜索树中的众数

::: details

```js

```

:::


## :star: leetcode236. 二叉树的最近公共祖先

```md
给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出：3
解释：节点 5 和节点 1 的最近公共祖先是节点 3 。

输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出：5
解释：节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身

输入：root = [1,2], p = 1, q = 2
输出：1
```

::: details

递归

```js
var lowestCommonAncestor = function(root, p, q) {
    let ans;
    const dfs = (root, p, q) => {
        if (root === null) return false;
        const lson = dfs(root.left, p, q);
        const rson = dfs(root.right, p, q);
        if ((lson && rson) || ((root.val === p.val || root.val === q.val) && (lson || rson))) {
            ans = root;
        } 
        return lson || rson || (root.val === p.val || root.val === q.val);
    }
    dfs(root, p, q);
    return ans;
};
```

也是递归

```js
var lowestCommonAncestor = function(root, p, q) {
    // 使用递归的方法
    // 需要从下到上，所以使用后序遍历
    // 1. 确定递归的函数
    const travelTree = function(root,p,q) {
        // 2. 确定递归终止条件
        if(root === null || root === p || root === q) {
            return root;
        }
        // 3. 确定递归单层逻辑
        let left = travelTree(root.left,p,q);
        let right = travelTree(root.right,p,q);
        if(left !== null && right !== null) {
            return root;
        }
        if(left === null) {
            return right;
        }
        return left;
    }
   return  travelTree(root,p,q);
};
```

:::

## leetcode701. 二叉搜索树中的插入操作

::: details

```js

```

:::

## leetcode450. 删除二叉搜索树中的节点

::: details

```js

```

:::

## leetcode669. 修剪二叉搜索树

::: details

```js

```

:::

## :star: leetcode108. 将有序数组转换为二叉搜索树

```md
给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 平衡 二叉搜索树。

输入：nums = [-10,-3,0,5,9]
输出：[0,-3,9,-10,null,5]
解释：[0,-10,5,null,-3,null,9] 也将被视为正确答案：

输入：nums = [1,3]
输出：[3,1]
解释：[1,null,3] 和 [3,1] 都是高度平衡二叉搜索树
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

## leetcode538. 把二叉搜索树转换为累加树

::: details

```js

```

:::

## :star: leetcode543.二叉树的直径

```md
给你一棵二叉树的根节点，返回该树的 直径 。

二叉树的 直径 是指树中任意两个节点之间最长路径的 长度 。这条路径可能经过也可能不经过根节点 root 。

两节点之间路径的 长度 由它们之间边数表示。

输入：root = [1,2,3,4,5]
输出：3
解释：3 ，取路径 [4,2,1,3] 或 [5,2,1,3] 的长度。
示例 2：

输入：root = [1,2]
输出：1
```

解题思路

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

## :star: leetcode230.二叉搜索树中第K小的元素

```md
给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 小的元素（从 1 开始计数）。

输入：root = [3,1,4,null,2], k = 1
输出：1

输入：root = [5,3,6,2,4,null,null,1], k = 3
输出：3
```

::: details

中序遍历

```js
var kthSmallest = function(root, k) {
    const stack = [];
    while (root != null || stack.length) {
        while (root != null) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        --k;
        if (k === 0) {
            break;
        }
        root = root.right;
    }
    return root.val;
};
```

:::

## :star: leetcode199.二叉树的右视图

```md
给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

输入：root = [1,2,3,null,5,null,4]
输出：[1,3,4]

输入：root = [1,2,3,4,null,null,null,5]
输出：[1,3,4,5]

输入：root = [1,null,3]
输出：[1,3]

输入：root = []
输出：[]
```

::: details

方法 1：深度优先搜索（DFS）

```js
var rightSideView = function(root) {
    const result = [];
    
    function dfs(node, depth) {
        if (!node) return;
        // 如果当前深度还没有记录节点，则当前节点是该深度最右边的节点
        if (depth === result.length) {
            result.push(node.val);
        }
        // 先递归右子树，确保右节点优先被记录
        dfs(node.right, depth + 1);
        dfs(node.left, depth + 1);
    }
    
    dfs(root, 0);
    return result;
};

```

方法 2：广度优先搜索（BFS）

```js
var rightSideView = function(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];
    
    while (queue.length) {
        const levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            // 如果是当前层的最后一个节点，加入结果
            if (i === levelSize - 1) {
                result.push(node.val);
            }
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return result;
};
```

:::

## :star: 114.二叉树展开为链表

```md
给你二叉树的根结点 root ，请你将它展开为一个单链表：

展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
展开后的单链表应该与二叉树 先序遍历 顺序相同。

输入：root = [1,2,5,3,4,null,6]
输出：[1,null,2,null,3,null,4,null,5,null,6]

输入：root = []
输出：[]

输入：root = [0]
输出：[0]
```

::: details

前序遍历

```js
var flatten = function(root) {
    const list = [];
    preorderTraversal(root, list);
    const size = list.length;
    for (let i = 1; i < size; i++) {
        const prev = list[i - 1], curr = list[i];
        prev.left = null;
        prev.right = curr;
    }
};

const preorderTraversal = (root, list) => {
    if (root != null) {
        list.push(root);
        preorderTraversal(root.left, list);
        preorderTraversal(root.right, list);
    }
}
```

寻找前驱节点

```js
var flatten = function(root) {
    let curr = root;
    while (curr !== null) {
        if (curr.left !== null) {
            const next = curr.left;
            let predecessor = next;
            while (predecessor.right !== null) {
                predecessor = predecessor.right;
            }
            predecessor.right = curr.right;
            curr.left = null;
            curr.right = next;
        }
        curr = curr.right;
    }
};
```

:::

## :star: leetcode105.从前序与中序遍历序列构造二叉树

```md
给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。

输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
输出: [3,9,20,null,null,15,7]

输入: preorder = [-1], inorder = [-1]
输出: [-1]
```

::: details

```js
function buildTree(preorder, inorder) {
    const inorderMap = {};
    inorder.forEach((val, idx) => {
        inorderMap[val] = idx;
    });

    function build(preStart, preEnd, inStart, inEnd) {
        if (preStart > preEnd || inStart > inEnd) return null;

        const rootVal = preorder[preStart];
        const root = new TreeNode(rootVal);
        const rootIndexInInorder = inorderMap[rootVal];
        const leftSubtreeSize = rootIndexInInorder - inStart;

        root.left = build(
            preStart + 1,
            preStart + leftSubtreeSize,
            inStart,
            rootIndexInInorder - 1
        );
        root.right = build(
            preStart + leftSubtreeSize + 1,
            preEnd,
            rootIndexInInorder + 1,
            inEnd
        );

        return root;
    }

    return build(0, preorder.length - 1, 0, inorder.length - 1);
}
```

:::

## :star: leetcode437.路径总和III

```md
给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。

路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。

输入：root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
输出：3
解释：和等于 8 的路径有 3 条，如图所示。

输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
输出：3
```

::: details

前缀和

```js
var pathSum = function(root, targetSum) {
    const prefix = new Map();
    prefix.set(0, 1);
    return dfs(root, prefix, 0, targetSum);
}

const dfs = (root, prefix, curr, targetSum) => {
    if (root == null) {
        return 0;
    }

    let ret = 0;
    curr += root.val;

    ret = prefix.get(curr - targetSum) || 0;
    prefix.set(curr, (prefix.get(curr) || 0) + 1);
    ret += dfs(root.left, prefix, curr, targetSum);
    ret += dfs(root.right, prefix, curr, targetSum);
    prefix.set(curr, (prefix.get(curr) || 0) - 1);

    return ret;
}
```

:::

## :star: leetcode124.二叉树中的最大路径和

```md
二叉树中的 路径 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。

路径和 是路径中各节点值的总和。

给你一个二叉树的根节点 root ，返回其 最大路径和 。

输入：root = [1,2,3]
输出：6
解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6

输入：root = [-10,9,20,null,null,15,7]
输出：42
解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42
```

::: details

```js
var maxPathSum = function(root) {
    let maxSum = -Infinity; // 初始化全局最大路径和

    function maxGain(node) {
        if (!node) return 0;

        // 递归计算左右子树的最大贡献值（如果为负则舍去）
        const leftGain = Math.max(maxGain(node.left), 0);
        const rightGain = Math.max(maxGain(node.right), 0);

        // 当前节点的路径和（可能包含左右子树）
        const currentSum = node.val + leftGain + rightGain;

        // 更新全局最大路径和
        maxSum = Math.max(maxSum, currentSum);

        // 返回当前节点的最大贡献值（只能选择左或右的一条路径）
        return node.val + Math.max(leftGain, rightGain);
    }

    maxGain(root);
    return maxSum;
};
```

:::