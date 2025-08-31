# 回溯

```md
## 解决哪类题型？

* 组合问题
* 切割问题
* 子集问题
* 排列问题
* 棋盘问题

组合是无序的 [1, 2]，排列是有序的 [1, 2]和 [2, 1]。

## 解题思路

抽象为一个树形结构。本质上是递归调用for循环。

重要元素：
* 确立终止条件
* 递归函数的参数
* 单层递归的逻辑

组合问题：所要取的长度就是for循环的层数。
```

## :star: 46. 全排列(中等)

```md
给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。
你可以 按任意顺序 返回答案。

输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

输入：nums = [0,1]
输出：[[0,1],[1,0]]

输入：nums = [1]
输出：[[1]]
```

::: details

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const result = [];
    const path = [];
    const used = new Array(nums.length).fill(false); // 记录哪些元素已经被使用
    
    function backtracking() {
        if (path.length === nums.length) {
            result.push([...path]); // 复制当前路径
            return;
        }
        
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue; // 跳过已经使用的元素
            
            used[i] = true; // 标记为已使用
            path.push(nums[i]); // 添加到路径
            
            backtracking(); // 递归
            
            path.pop(); // 回溯
            used[i] = false; // 取消标记
        }
    }
    
    backtracking();
    return result;
};
```

:::

## :star: 78. 子集(中等)

```md
给你一个整数数组 nums ，数组中的元素 互不相同 。
返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

输入：nums = [0]
输出：[[],[0]]
```

::: details

递归法实现子集枚举

```js
var subsets = function(nums) {
    const t = [];
    const ans = [];
    const dfs = (cur) => {
        if (cur === nums.length) {
            ans.push(t.slice());
            return;
        }
        t.push(nums[cur]);
        dfs(cur + 1);
        t.pop(t.length - 1);
        dfs(cur + 1);
    }
    dfs(0);
    return ans;
};
```

迭代法实现子集枚举

```js
var subsets = function(nums) {
    const ans = [];
    const n = nums.length;
    for (let mask = 0; mask < (1 << n); ++mask) {
        const t = [];
        for (let i = 0; i < n; ++i) {
            if (mask & (1 << i)) {
                t.push(nums[i]);
            }
        }
        ans.push(t);
    }
    return ans;
};
```

:::

## :star: 17. 电话号码的字母组合(中等)

```md
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
答案可以按 任意顺序 返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]

输入：digits = ""
输出：[]

输入：digits = "2"
输出：["a","b","c"]
```

::: details

```js
var letterCombinations = function(digits) {
    if (!digits) return [];
    const numArr = [
        "",
        "",
        "abc",
        "def",
        "ghi",
        "jkl",
        "mno",
        "pqrs",
        "tuv",
        "wxyz"
    ]

    const res = [];
    const path = [];
    
    function backtracking(index) {
        if (path.length === digits.length) {
            res.push(path.join(""));
            return;
        }

        for(const v of numArr[digits[index]]) {
            path.push(v);
            backtracking(index + 1);
            path.pop();
        }
    }

    backtracking(0);

    return res;
};
```

:::

## :star: 39. 组合总和(中等)

```md
给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，
找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，
并以列表形式返回。你可以按 任意顺序 返回这些组合。

candidates 中的 同一个 数字可以 无限制重复被选取 。
如果至少一个数字的被选数量不同，则两种组合是不同的。 

对于给定的输入，保证和为 target 的不同组合数少于 150 个。

输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]
解释：
2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
7 也是一个候选， 7 = 7 。
仅有这两种组合。

输入: candidates = [2,3,5], target = 8
输出: [[2,2,2,2],[2,3,3],[3,5]]

输入: candidates = [2], target = 1
输出: []
```

::: details

```js
var combinationSum = function(candidates, target) {
    const res = [], path = [];
    candidates.sort((a,b)=>a-b); // 排序
    backtracking(0, 0);
    return res;
    function backtracking(j, sum) {
        if (sum === target) {
            res.push(Array.from(path));
            return;
        }
        for(let i = j; i < candidates.length; i++ ) {
            const n = candidates[i];
            if(n > target - sum) break;
            path.push(n);
            sum += n;
            backtracking(i, sum);
            path.pop();
            sum -= n;
        }
    }
};
```

:::

## :star: 22. 括号生成(中等)

```md
数字 n 代表生成括号的对数，请你设计一个函数，
用于能够生成所有可能的并且 有效的 括号组合。

输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]

输入：n = 1
输出：["()"]
```

::: details

```js
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const result = [];
    
    function backtrack(current, left, right) {
        // 终止条件：当前字符串长度已达 2n
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }
        
        // 左括号数小于 n 时可以添加左括号
        if (left < n) {
            backtrack(current + '(', left + 1, right);
        }
        
        // 右括号数小于左括号数时可以添加右括号
        if (right < left) {
            backtrack(current + ')', left, right + 1);
        }
    }
    
    backtrack('', 0, 0);
    return result;
};
```

:::

## :star: 79. 单词搜索(中等)

```md
给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。
如果 word 存在于网格中，返回 true ；否则，返回 false 。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，
其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。
同一个单元格内的字母不允许被重复使用。

输入：board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']],
 word = "ABCCED"
输出：true

输入：board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], 
word = "SEE"
输出：true

输入：board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']],
 word = "ABCB"
输出：false

进阶：你可以使用搜索剪枝的技术来优化解决方案，使其在 board 更大的情况下可以更快解决问题？
```

::: details

```js
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    const h = board.length, w = board[0].length;
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const visited = new Array(h);
    for (let i = 0; i < visited.length; ++i) {
        visited[i] = new Array(w).fill(false);
    }
    const check = (i, j, s, k) => {
        if (board[i][j] != s.charAt(k)) {
            return false;
        } else if (k == s.length - 1) {
            return true;
        }
        visited[i][j] = true;
        let result = false;
        for (const [dx, dy] of directions) {
            let newi = i + dx, newj = j + dy;
            if (newi >= 0 && newi < h && newj >= 0 && newj < w) {
                if (!visited[newi][newj]) {
                    const flag = check(newi, newj, s, k + 1);
                    if (flag) {
                        result = true;
                        break;
                    }
                }
            }
        }
        visited[i][j] = false;
        return result;
    }

    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const flag = check(i, j, word, 0);
            if (flag) {
                return true;
            }
        }
    }
    return false;
};
```

进一步剪枝

```js
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    const h = board.length, w = board[0].length;
    const n = word.length;
    
    // 极端情况快速返回
    if (n > h * w) return false;
    
    const visited = new Array(h * w).fill(false);
    
    function dfs(i, j, k) {
        if (k === n) return true;
        if (i < 0 || i >= h || j < 0 || j >= w) return false;
        
        const idx = i * w + j;
        if (visited[idx] || board[i][j] !== word[k]) return false;
        
        visited[idx] = true;
        
        // 使用位运算微优化
        const found = dfs(i+1, j, k+1) || dfs(i-1, j, k+1) ||
                     dfs(i, j+1, k+1) || dfs(i, j-1, k+1);
        
        visited[idx] = false;
        return found;
    }
    
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            if (board[i][j] === word[0] && dfs(i, j, 0)) {
                return true;
            }
        }
    }
    
    return false;
};
```

:::

## :star: 131. 分割回文串(中等)

```md
给你一个字符串 s，请你将 s 分割成一些 子串，使每个子串都是
 回文串 。返回 s 所有可能的分割方案。

 输入：s = "aab"
输出：[["a","a","b"],["aa","b"]]

输入：s = "a"
输出：[["a"]]
```

::: details

回溯 + 动态规划预处理, 时间复杂度：O(n * 2 ^ n), 空间复杂度：O(n ^ 2)

```js
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    const dfs = (i) => {
        if (i === n) {
            ret.push(ans.slice());
            return;
        }
        for (let j = i; j < n; ++j) {
            if (f[i][j]) {
                ans.push(s.slice(i, j + 1));
                dfs(j + 1);
                ans.pop();
            }
        }
    }
    
    const n = s.length;
    const f = new Array(n).fill(0).map(() => new Array(n).fill(true));
    let ret = [], ans = [];
    
    for (let i = n - 1; i >= 0; --i) {
        for (let j = i + 1; j < n; ++j) {
            f[i][j] = (s[i] === s[j]) && f[i + 1][j - 1];
        }
    }
    dfs(0);
    return ret;
};
```

回溯 + 记忆化搜索，时间复杂度：O(n * 2 ^ n), 空间复杂度：O(n ^ 2)

```js
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    const dfs = (i) => {
        if (i === n) {
            ret.push(ans.slice());
            return;
        }
        for (let j = i; j < n; ++j) {
            if (isPalindrome(i, j) === 1) {
                ans.push(s.slice(i, j + 1));
                dfs(j + 1);
                ans.pop();
            }
        }
    }

    // 记忆化搜索中，f[i][j] = 0 表示未搜索，1 表示是回文串，-1 表示不是回文串
    const isPalindrome = (i, j) => {
        if (f[i][j] !== 0) {
            return f[i][j];
        }
        if (i >= j) {
            f[i][j] = 1;
        } else if (s[i] === s[j]) {
            f[i][j] = isPalindrome(i + 1, j - 1);
        } else {
            f[i][j] = -1;
        }
        return f[i][j];
    }

    const n = s.length;
    const ret = [], ans = [];
    const f = new Array(n).fill(0).map(() => new Array(n).fill(0));

    dfs(0);
    return ret;
};
```

 时间复杂度O(N ^3)，空间复杂度O(N)

```js
/**
 * @param {string} s
 * @return {string[][]}
 */
const isPalindrome = (s, l, r) => {
    for (let i = l, j = r; i < j; i++, j--) {
        if(s[i] !== s[j]) return false;
    }
    return true;
}

var partition = function(s) {
    const res = [], path = [], len = s.length;
    function backtracking(startIndex) {
        if(startIndex >= len) {
            res.push(Array.from(path));
            return;
        }
        for(let i = startIndex; i < len; i++) {
            if(!isPalindrome(s, startIndex, i)) continue;
            path.push(s.slice(startIndex, i + 1));
            backtracking(i + 1);
            path.pop();
        }
    }
    backtracking(0);
    return res;
};
```

:::

## :star: 51. N 皇后(困难)

```md
按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。

n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，
并且使皇后彼此之间不能相互攻击。

给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。

每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 
分别代表了皇后和空位。
```

::: details

```js
/**
 * @param {number} n
 * @return {string[][]}
 */
 /**
 法2，优化了判断斜向的for循环
 判断方式不变，依旧是r+c和r-c。把他们分别记录到两个布尔数组中。
 如果diag1[r+c]为true，则无法放。
 对于r-c的布尔数组，这里为了避免负数，需要加上n-1（最右上角），这样结果都是大于等于0
  */

var solveNQueens = function(n) {
    const ans = []
    // 记录每个列是否被使用
    const col = Array(n).fill(0)
    const onPath = Array(n).fill(false)
    const diag1 = Array(2*n+1).fill(false)
    const diag2 = Array(2*n+1).fill(false)
    // r行号，s剩余可选 的列号
    const dfs = (r)=>{
        if(r===n){
            ans.push(col.map(c=>'.'.repeat(c)+'Q'+'.'.repeat(n-1-c)))
            return
        }
        for(let c = 0; c<n;c++){
            if(!onPath[c]&&!diag1[r+c]&&!diag2[r-c+n-1]){
                col[r] = c
                onPath[c] =  diag1[r+c] = diag2[r-c+n-1] = true
                dfs(r+1)
                onPath[c] =  diag1[r+c] = diag2[r-c+n-1] = false
            }
        }
    }
    dfs(0)
    return ans
};
```

:::