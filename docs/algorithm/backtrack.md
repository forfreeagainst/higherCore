# 回溯算法

## 入门

::: details

```md

```

:::

## leetcode216:组合总和III

::: details

```js

```

:::

## :star: leetcode17:电话号码的字母组合

```md
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

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

## :star: letcode39:组合总和III

```md
给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和
为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。

candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 

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

## letcode40:组合总和II

::: details

```js

```

:::

## :star: letcode131:分割回文串

```md
给你一个字符串 s，请你将 s 分割成一些 子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。

输入：s = "aab"
输出：[["a","a","b"],["aa","b"]]

输入：s = "a"
输出：[["a"]]
```

::: details

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

## leetcode93:复原IP地址

::: details

```js

```

:::

## :star: leetcode78:子集

```md
给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

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

## leetcode90：子集II

::: details

```js

```

:::

## leetcode491:递增子序列

::: details

```js

```

:::

## leetcode46:全排列

::: details

```js

```

:::

## leetcode47:全排列II

::: details

```js

```

:::

## :star: leetcode51:N皇后(困难)

```md
按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。

n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。

每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

输入：n = 4
输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
解释：如上图所示，4 皇后问题存在两个不同的解法。

输入：n = 1
输出：[["Q"]]
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

## leetcode37:解数独

::: details

```js

```

:::

## :star: leetcode22.括号的生成

```md
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

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

## :star: leetcode79.单词搜索

```md
给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，
返回 true ；否则，返回 false 。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻
或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
输出：true

输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
输出：true

输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
输出：false
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

:::