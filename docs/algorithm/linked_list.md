# 链表

## 链表结构如何书写

::: details

```js
function listNode(val, next) {
    this.val = (val === undefined ? null: val);
    this.next = (next === undefined ? null: next);
}
```

:::

## leetcode203：移除链表元素

给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。删除链表上的某个元素

输入：head = [7,7,7,7], val = 7

输出：[]

::: details

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    const dummyHead = new ListNode(0);
    dummyHead.next = head;
    let temp = dummyHead;
    while(temp.next !== null) {
        if (temp.next.val == val) {
            temp.next = temp.next.next;
        } else {
            temp = temp.next;
        }
    }
    return dummyHead.next;
};
```

:::


## leetcode707. 设计链表

* 获取第几个节点的值
* 头部插入节点
* 尾部插入节点
* 第几个节点前插入节点
* 删除第几个节点

::: details

* size 要减少/增加
* get不到，返回 -1
* addAtIndex, 在哪个下表，插入东西，也是参考splice。

```js
function ListNode(val, next) {
    this.val = (val === undefined ? null: val);
    this.next = (next === undefined ? null: next);
}

var MyLinkedList = function() {
    this.size = 0;
    this.head = new ListNode(0);
};

MyLinkedList.prototype.get = function(index) {
   if (index < 0 || index >= this.size) {
        return -1; // 检查 index 合法性
    }
    let cur = this.head.next; // 直接从第一个实际节点开始（跳过 dummy）
    for (let i = 0; i < index; i++) { // 循环 index 次（不是 index+1 次）
        cur = cur.next;
    }
    return cur.val; // 返回目标节点的值
};

MyLinkedList.prototype.addAtHead = function(val) {
    const newNode = new ListNode(val);
    newNode.next = this.head.next;     // 新节点指向原第一个实际节点
    this.head.next = newNode;          // 虚拟头节点指向新节点
    this.size ++;  
};

MyLinkedList.prototype.addAtTail = function(val) {
    let cur = this.head;
     while (cur.next !== null) { // 直接遍历到最后一个节点（cur.next 为 null）
        cur = cur.next;
    }
    cur.next = new ListNode(val);
    this.size ++;
};

MyLinkedList.prototype.addAtIndex = function(index, val) {
    // const arr = [1, 2, 3];
    // arr.splice(3,0, 4);
    // console.log("🚀 ~ arr:", arr); // 1, 2, 3,4
    if (index < 0 || index > this.size) return; // 边界参考splice
    // const arr = [1, 2, 3];
    // arr.splice(0,0, 4);
    // console.log("🚀 ~ arr:", arr); // 4，1， 2，3
    let cur = this.head; // 是this.head，也是参考splice
    for(let i = 0; i < index; i++) {
        cur = cur.next;
    }
    const node = new ListNode(val);
    // 0 1 2
    node.next = cur.next;
    cur.next = node;
    this.size ++;
};

MyLinkedList.prototype.deleteAtIndex = function(index) {
    if (index < 0 || index >= this.size) return;
    let cur = this.head;
    for(let i = 0; i < index; i++) {
        cur = cur.next;
    }
    cur.next = cur.next.next;
    this.size --;
};

```

```js
function ListNode(val, next) {
    this.val = (val === undefined ? null: val);
    this.next = (next === undefined ? null: next);
}

var MyLinkedList = function() {
    this.size = 0;
    this.head = new ListNode(0);
};

MyLinkedList.prototype.get = function(index) {
    // 链表下标从0开始
    if (index < 0 || index >= this.size) return -1; // 注意：要返回-1
    let cur = this.head.next; // 链表下标为0的数
    for(let i = 0; i < index; i++) {
        cur = cur.next;
    }
    return cur.val;
};

MyLinkedList.prototype.addAtHead = function(val) {
    const headNode = new ListNode(val);
    headNode.next = this.head.next;
    this.head.next = headNode;
    this.size ++;
};

MyLinkedList.prototype.addAtTail = function(val) {
    let cur = this.head;
    while(cur.next) {
        cur = cur.next;
    }
    cur.next = new ListNode(val);
    this.size ++;
};

MyLinkedList.prototype.addAtIndex = function(index, val) {
    if (index < 0 || index > this.size) return; // 参考splice的边界
    let cur = this.head;
    for(let i = 0; i < index; i++) {
        cur = cur.next;
    }
    const newNode = new ListNode(val);
    newNode.next = cur.next;
    cur.next = newNode;
    this.size ++;
};

MyLinkedList.prototype.deleteAtIndex = function(index) {
   if (index < 0 || index >= this.size) return;
   let cur = this.head;
   for(let i = 0; i < index; i++) {
        cur = cur.next;
   }
   cur.next = cur.next.next;
   this.size --; // 注意 size要减少
};
```

:::

## leetcode206-反转链表

::: details

### 双指针

```js
var reverseList = function(head) {
    let tail = null; // 最后一个节点，它是我们最终想要的新链表
    let cur = head;
    while(cur) {
        let next = cur.next;
        cur.next = tail; // 最后一个节点的前一个
        tail = cur;
        cur = next;        
    }
    return tail;
};
```

### 递归

```js
function reverse(cur, tail) {
    if (!cur) return tail;
    const temp = cur.next;
    cur.next = tail;
    tail = cur;
    return reverse(temp, tail);
}

var reverseList = function(head) {
    return reverse(head, null);
};
```

<!-- ```js
// 晦涩难懂
var reverseList = function(head) {
     if (head == null || head.next == null) {
        return head;
    }
    const newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
};
``` -->

:::

## leetcode24.两两交换链表中的节点

::: details

```js
var swapPairs = function(head) {
    const dummyNode = new ListNode(0);
    dummyNode.next = head;
    let cur = dummyNode;
    // 空节点的下两个节点
    while(cur.next && cur.next.next) {
        const node1 = cur.next;
        const node3 = cur.next.next.next;
        cur.next = cur.next.next;
        cur.next.next = node1;
        node1.next = node3;
        cur = node1;
    }
    return dummyNode.next;
};
```

:::

## leetcode19.删除链表倒数第N个节点

::: details

```js
var removeNthFromEnd = function(head, n) {
    // 这是倒数呀
    const dummyNode = new ListNode(0, head);
    let first = head;
    let second = dummyNode;

    for(let i = 0; i < n; i++) {
        first = first.next;
    }
    while(first) {
        first = first.next;
        second = second.next;
    }
    second.next = second.next.next;
    return dummyNode.next;
};
```

:::

## leetcode142.环形链表

::: details

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    if (!head) return null;
    let slow = head;
    let fast = head;
    while(fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
        // 相等说明有环，且这个点为环入口
        if (fast === slow) {
            let index = head;
            while(index !== slow) {
                index = index.next;
                // 这句需要重点理解
                slow = slow.next;
            }
            return index;
        }
    }
    return null;
};
```

```js
var detectCycle = function(head) {
    if (head === null) {
        return null;
    }
    let slow = head, fast = head;
    while (fast !== null) {
        slow = slow.next;
        if (fast.next !== null) {
            fast = fast.next.next;
        } else {
            return null;
        }
        if (fast === slow) {
            let ptr = head;
            while (ptr !== slow) {
                ptr = ptr.next;
                slow = slow.next;
            }
            return ptr;
        }
    }
    return null;
};
```

:::

## :star: leetcode2：两数相加

::: details

```js
var addTwoNumbers = function(l1, l2) {
    const dummyNode = new ListNode(0);
    let carry = 0
    let link1 = l1;
    let link2 = l2;
    let link3 = dummyNode;
    while(link1 || link2 || carry > 0) {
        const aVal = link1 && link1.val ? link1.val : 0;
        const bVal = link2 && link2.val ? link2.val : 0;
        const sum = aVal + bVal + carry;
        link3.next = new ListNode(sum % 10);
        link3 = link3.next;
        carry = ~~(sum / 10)
        if (link1) {
            link1 = link1.next;
        }
        if (link2) {
            link2 = link2.next;
        }
    }
    return dummyNode.next;
};
```

```js
// 辣鸡代码 * 1
var addTwoNumbers = function(l1, l2) {
    // Step 1: Convert linked lists to arrays (digits in reverse order)
    const aArr = [];
    while (l1) {
        aArr.push(l1.val);
        l1 = l1.next;
    }
    const bArr = [];
    while (l2) {
        bArr.push(l2.val);
        l2 = l2.next;
    }

    // Step 2: Calculate sum from least significant digit (right to left)
    let i = 0;
    const resultArr = [];
    let carry = 0;

    while (i < aArr.length || i < bArr.length || carry > 0) {
        const sum = (aArr[i] || 0) + (bArr[i] || 0) + carry;
        resultArr.push(sum % 10);
        carry = Math.floor(sum / 10);
        i++;
    }

    // Step 3: Build the result linked list (in reverse order)
    let dummyNode = new ListNode(0);
    let current = dummyNode;
    for (const num of resultArr) {
        current.next = new ListNode(num);
        current = current.next;
    }
    return dummyNode.next;
};
```

:::

## :star: leetcode25. K 个一组翻转链表 TODO

```md
给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。

k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

输入：head = [1,2,3,4,5], k = 2
输出：[2,1,4,3,5]

输入：head = [1,2,3,4,5], k = 3
输出：[3,2,1,4,5]
```

::: details

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function myReverse(head, tail) {
    let prev = tail.next;
    let p = head;
    while (prev !== tail) {
        const nex = p.next;
        p.next = prev;
        prev = p;
        p = nex;
    }
    return [tail, head];
}

var reverseKGroup = function(head, k) {
    // 先学会翻转链表
    const dummyNode = new ListNode(0);
    dummyNode.next = head;
    let cur = dummyNode;
    while(head) {
        let tail = cur;
        // 查看剩余部分长度是否大于等于 k
        for(let i = 0; i < k; i ++) {
            tail = tail.next;
            if (!tail) {
                return dummyNode.next;
            }
        }
        const next = tail.next;
        [head, tail] = myReverse(head, tail);
        // 把自恋表重新接回原链表
        cur.next = head;
        tail.next = next;
        cur = tail;
        head = tail.next;
    }
    return dummyNode.next;
};
```

:::

## :star: leetcode138. 随机链表的复制 TODO

```md
给你一个长度为 n 的链表，每个节点包含一个额外增加的随机指针 random ，该指针可以指向链表中的任何节点或空节点。

构造这个链表的 深拷贝。 深拷贝应该正好由 n 个 全新 节点组成，其中每个新节点的值都设为其对应的原节点的值。新节点的 next 指针和 random 指针也都应指向复制链表中的新节点，并使原链表和复制链表中的这些指针能够表示相同的链表状态。复制链表中的指针都不应指向原链表中的节点 。

例如，如果原链表中有 X 和 Y 两个节点，其中 X.random --> Y 。那么在复制链表中对应的两个节点 x 和 y ，同样有 x.random --> y 。

返回复制链表的头节点。

用一个由 n 个节点组成的链表来表示输入/输出中的链表。每个节点用一个 [val, random_index] 表示：

val：一个表示 Node.val 的整数。
random_index：随机指针指向的节点索引（范围从 0 到 n-1）；如果不指向任何节点，则为  null 。
你的代码 只 接受原链表的头节点 head 作为传入参数。
```

::: details

```js
var copyRandomList = function(head, cachedNode = new Map()) {
    if (head === null) {
        return null;
    }
    if (!cachedNode.has(head)) {
        cachedNode.set(head, {val: head.val}), Object.assign(cachedNode.get(head), {next: copyRandomList(head.next, cachedNode), random: copyRandomList(head.random, cachedNode)})
    }
    return cachedNode.get(head);
}
```

```js
var copyRandomList = function(head) {
     if (head === null) {
        return null;
    }
    for (let node = head; node !== null; node = node.next.next) {
        const nodeNew = new Node(node.val, node.next, null);
        node.next = nodeNew;
    }
    for (let node = head; node !== null; node = node.next.next) {
        const nodeNew = node.next;
        nodeNew.random = (node.random !== null) ? node.random.next : null;
    }
    const headNew = head.next;
    for (let node = head; node !== null; node = node.next) {
        const nodeNew = node.next;
        node.next = node.next.next;
        nodeNew.next = (nodeNew.next !== null) ? nodeNew.next.next : null;
    }
    return headNew;
};
```

:::

## :star: leetcode148 排序链表 TODO

```md
给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。

输入：head = [4,2,1,3]
输出：[1,2,3,4]
```

::: details

### 无脑借助数组sort，进行排序

```js
var sortList = function(head) {
    if (!head) return head;
    let arr = [];
    let cur = head;
    while(cur) {
        arr.push(cur.val);
        cur = cur.next;
    }
    arr.sort((a,b) => a - b);
    let newNode = new ListNode(0);
    let current = newNode;
    for(let i = 0; i < arr.length; i++) {
        current.next = new ListNode(arr[i])
        current = current.next;
    }
    return newNode.next;
};
```

### 进阶：你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？

```js
var sortList = function(head) {
    if (!head || !head.next) return head;
    
    // 1. 计算链表长度
    let length = 0;
    let node = head;
    while (node) {
        length++;
        node = node.next;
    }
    
    // 2. 自底向上归并排序
    const dummy = new ListNode(0);
    dummy.next = head;
    
    for (let step = 1; step < length; step <<= 1) {
        let prev = dummy;
        let curr = dummy.next;
        
        while (curr) {
            // 分割出两个子链表
            const left = curr;
            const right = split(left, step);
            curr = split(right, step);
            
            // 合并两个有序链表
            prev.next = merge(left, right);
            
            // 移动prev到合并后的链表末尾
            while (prev.next) {
                prev = prev.next;
            }
        }
    }
    
    return dummy.next;
};

// 分割链表，返回后半部分的头节点
function split(head, step) {
    if (!head) return null;
    
    for (let i = 1; i < step && head.next; i++) {
        head = head.next;
    }
    
    const next = head.next;
    head.next = null; // 切断链表
    return next;
}

// 合并两个有序链表
function merge(l1, l2) {
    const dummy = new ListNode(0);
    let curr = dummy;
    
    while (l1 && l2) {
        if (l1.val < l2.val) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }
    
    curr.next = l1 || l2;
    return dummy.next;
}
```

:::

## :star: leetcode23.合并K个升序链表（困难）

```md
给你一个链表数组，每个链表都已经按升序排列。

请你将所有链表合并到一个升序链表中，返回合并后的链表。

示例 1：
输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6

示例 2：
输入：lists = []
输出：[]

示例 3：
输入：lists = [[]]
输出：[]
```

::: details

没有用链表的思路，用了数组，这

```md

sort() 在 V8 引擎（Chrome/Node.js）里是高度优化的，即使时间复杂度是 O(N log N)，实际运行速度可能比手动实现的 O(N log k) 堆更快。
```

```js
function mergeKLists(lists) {
    // 1. 收集所有节点的值
    const values = [];
    for (const list of lists) {
        let node = list;
        while (node) {
            values.push(node.val);
            node = node.next;
        }
    }

    // 2. 排序
    values.sort((a, b) => a - b);

    // 3. 重建链表
    const dummy = new ListNode(-1);
    let current = dummy;
    for (const val of values) {
        current.next = new ListNode(val);
        current = current.next;
    }

    return dummy.next;
}
```

方法 2：分治合并（Divide and Conquer）
时间复杂度 O(N log k)，比最小堆更稳定，且适合 JavaScript。

```js
function mergeKLists(lists) {
    if (lists.length === 0) return null;
    // 分治合并
    while (lists.length > 1) {
        const mergedLists = [];
        for (let i = 0; i < lists.length; i += 2) {
            const l1 = lists[i];
            const l2 = (i + 1 < lists.length) ? lists[i + 1] : null;
            mergedLists.push(mergeTwoLists(l1, l2));
        }
        lists = mergedLists;
    }
    return lists[0];
}

// 合并两个有序链表（LeetCode 21）
function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(-1);
    let current = dummy;
    while (l1 && l2) {
        if (l1.val < l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    current.next = l1 || l2;
    return dummy.next;
}
```

优化后的最小堆

```js
class MinHeap {
    constructor() {
        this.heap = [];
    }
    push(node) {
        this.heap.push(node);
        this.bubbleUp(this.heap.length - 1);
    }
    pop() {
        const top = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        return top;
    }
    bubbleUp(idx) {
        const node = this.heap[idx];
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            const parent = this.heap[parentIdx];
            if (node.val >= parent.val) break;
            this.heap[idx] = parent;
            idx = parentIdx;
        }
        this.heap[idx] = node;
    }
    sinkDown(idx) {
        const node = this.heap[idx];
        const length = this.heap.length;
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let swapIdx = null;
            if (leftChildIdx < length && this.heap[leftChildIdx].val < node.val) {
                swapIdx = leftChildIdx;
            }
            if (rightChildIdx < length && this.heap[rightChildIdx].val < (swapIdx === null ? node.val : this.heap[leftChildIdx].val)) {
                swapIdx = rightChildIdx;
            }
            if (swapIdx === null) break;
            this.heap[idx] = this.heap[swapIdx];
            idx = swapIdx;
        }
        this.heap[idx] = node;
    }
    isEmpty() {
        return this.heap.length === 0;
    }
}

function mergeKLists(lists) {
    const heap = new MinHeap();
    for (const list of lists) {
        if (list) heap.push(list);
    }
    const dummy = new ListNode(-1);
    let current = dummy;
    while (!heap.isEmpty()) {
        const node = heap.pop();
        current.next = node;
        current = current.next;
        if (node.next) heap.push(node.next);
    }
    return dummy.next;
}
```

:::

## :star: leetcode146.LRU缓存

```md
请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
实现 LRUCache 类：
LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
函数 get 和 put 必须以 O(1) 的平均时间复杂度运行

输入
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
输出
[null, null, null, 1, null, -1, null, -1, 3, 4]

解释
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1);    // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2);    // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1);    // 返回 -1 (未找到)
lRUCache.get(3);    // 返回 3
lRUCache.get(4);    // 返回 4
```

：直接利用 Map 的插入顺序特性，无需额外队列

```js
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.map = new Map();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (!this.map.has(key)) return -1;
    // 获取值后，删除并重新插入，更新为最近使用
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    // 如果 key 已存在，先删除
    if (this.map.has(key)) {
        this.map.delete(key);
    }
    // 插入新值
    this.map.set(key, value);
    // 如果超出容量，删除最久未使用的（即 Map 的第一个 key）
    if (this.map.size > this.capacity) {
        const firstKey = this.map.keys().next().value;
        this.map.delete(firstKey);
    }
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
```