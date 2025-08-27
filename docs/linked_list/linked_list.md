# 链表

## :star: 160. 相交链表(简单)

```md
给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交
的起始节点。如果两个链表不存在相交节点，返回 null 。

图示两个链表在节点 c1 开始相交：

A:       a1 -> a2 -> c1 -> c2 -> c3
B: b1 -> b2 -> b3 -> c1 -> c2 -> c3

题目数据 保证 整个链式结构中不存在环。

注意，函数返回结果后，链表必须 保持其原始结构 。

输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5],
 skipA = 2, skipB = 3
输出：Intersected at '8'
解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,6,1,8,4,5]。
在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
— 请注意相交节点的值不为 1，因为在链表 A 和链表 B 之中值为 1 的节点 (A 中第二
个节点和 B 中第三个节点) 是不同的节点。换句话说，它们在内存中指向两个不同的位置，
而链表 A 和链表 B 中值为 8 的节点 (A 中第三个节点，B 中第四个节点) 在内存中指向
相同的位置

输入：intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], 
skipA = 3, skipB = 1
输出：Intersected at '2'
解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [1,9,1,2,4]，链表 B 为 [3,2,4]。
在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。

输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], 
skipA = 3, skipB = 2
输出：No intersection
解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 
可以是任意值。这两个链表不相交，因此返回 null 。

进阶：你能否设计一个时间复杂度 O(m + n) 、仅用 O(1) 内存的解决方案？


自定义评测：

评测系统 的输入如下（你设计的程序 不适用 此输入）：

intersectVal - 相交的起始节点的值。如果不存在相交节点，这一值为 0
listA - 第一个链表
listB - 第二个链表
skipA - 在 listA 中（从头节点开始）跳到交叉节点的节点数
skipB - 在 listB 中（从头节点开始）跳到交叉节点的节点数
评测系统将根据这些输入创建链式数据结构，并将两个头节点 headA 和
 headB 传递给你的程序。如果程序能够正确返回相交节点，那么你的解决
 方案将被 视作正确答案 。
```

::: details

```md
时间复杂度O(m+n)，m+n为什么会相遇？A的长度+B的长度

pA: 走完A(a+c) -> 开始走B的独有部分(b)
pB: 走完B(b+c) -> 开始走A的独有部分(a)

当 pA 走完b时，总路程 = a + c + b
当 pB 走完a时，总路程 = b + c + a

c就是一起要走的路。若c没有，说明不相交
```


```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    if (headA === null || headB === null) {
        return null;
    }
    let pA = headA, pB = headB;
    while (pA !== pB) {
        pA = pA === null ? headB : pA.next;
        pB = pB === null ? headA : pB.next;
    }
    return pA;
};
```

使用哈希

```md
无论LeetCode如何具体创建链表，只要两个链表确实在物理上共享某些节点
（即它们的 next 指针指向内存中的同一个对象），这个算法就一定能通过
比较内存地址来找到相交点。

// 假设我们在内存中创建了这样的链表结构：

// 公共尾部链表 [8, 4, 5]
let commonTail = {
  val: 8,
  next: {
    val: 4, 
    next: {
      val: 5,
      next: null
    }
  }
};

// 链表A: [4, 1] -> 连接到公共尾部
let headA = {
  val: 4,
  next: {
    val: 1,
    next: commonTail  // 这里指向的是上面那个对象！
  }
};

// 链表B: [5, 6, 1] -> 连接到同一个公共尾部  
let headB = {
  val: 5,
  next: {
    val: 6,
    next: {
      val: 1,
      next: commonTail  // 这里也指向上面那个对象！
    }
  }
};

// LeetCode 测试用例的大致逻辑：

// 1. 先创建公共尾部节点
const node8 = new ListNode(8);
const node4 = new ListNode(4); 
const node5 = new ListNode(5);

// 2. 链接成公共尾部
node8.next = node4;
node4.next = node5;

// 3. 创建链表A并连接到公共尾部
const a1 = new ListNode(4);
const a2 = new ListNode(1);
a1.next = a2;
a2.next = node8;  // 这里指向的是同一个node8对象！

// 4. 创建链表B并连接到同一个公共尾部
const b1 = new ListNode(5);
const b2 = new ListNode(6); 
const b3 = new ListNode(1);
b1.next = b2;
b2.next = b3;
b3.next = node8;  // 这里也指向同一个node8对象！

// 调用函数
getIntersectionNode(a1, b1); // 应该返回 node8
```

```js
var getIntersectionNode = function(headA, headB) {
    const visited = new Set();
    let temp = headA;
    while (temp !== null) {
        visited.add(temp);
        temp = temp.next;
    }
    temp = headB;
    while (temp !== null) {
        if (visited.has(temp)) {
            return temp;
        }
        temp = temp.next;
    }
    return null;
};
```

:::

## :star: 206. 反转链表(简单)

```md
给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]

输入：head = [1,2]
输出：[2,1]

输入：head = []
输出：[]

进阶：链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？
```

::: details

递归

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
 * @return {ListNode}
 */
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

迭代

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
 * @return {ListNode}
 */
var reverseList = function(head) {
     let prev = null;
    let curr = head;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
};
```

:::

## :star: 234. 回文链表(简单)

```md
给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。
如果是，返回 true ；否则，返回 false 。

输入：head = [1,2,2,1]
输出：true

输入：head = [1,2]
输出：false

进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
```

::: details

空间复杂度O(1)

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
* @return {boolean}
*/
const reverseList = (head) => {
    let prev = null;
    let curr = head;
    while (curr !== null) {
        let nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}

const endOfFirstHalf = (head) => {
    let fast = head;
    let slow = head;
    while (fast.next !== null && fast.next.next !== null) {
        fast = fast.next.next;
        slow = slow.next;
    }
    return slow;
}

var isPalindrome = function(head) {
    if (head == null) return true;

    // 找到前半部分链表的尾节点并反转后半部分链表
    const firstHalfEnd = endOfFirstHalf(head);
    const secondHalfStart = reverseList(firstHalfEnd.next);

    // 判断是否回文
    let p1 = head;
    let p2 = secondHalfStart;
    let result = true;
    while (result && p2 != null) {
        if (p1.val != p2.val) result = false;
        p1 = p1.next;
        p2 = p2.next;
    }

    // 还原链表并返回结果
    firstHalfEnd.next = reverseList(secondHalfStart);
    return result;
};
```

使用数组的方式，空间复杂度O(N)

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
* @return {boolean}
*/
var isPalindrome = function(head) {
    const arr = [];
    while (head !== null) {
        arr.push(head.val);
        head = head.next;
    }
    for (let i = 0, j = arr.length - 1; i < j; ++i, --j) {
        if (arr[i] !== arr[j]) {
            return false;
        }
    }
    return true;
};
```

:::

## :star: 141. 环形链表(简单)

```md
给你一个链表的头节点 head ，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。
 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中
 的位置（索引从 0 开始）。注意：pos 不作为参数进行传递 。仅仅是为了标识
 链表的实际情况。

如果链表中存在环 ，则返回 true 。 否则，返回 false 。

输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。

输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。

输入：head = [1], pos = -1
输出：false
解释：链表中没有环。

进阶：你能用 O(1)（即，常量）内存解决此问题吗？
```

::: details

快慢指针

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
 * @return {boolean}
 */
var hasCycle = function(head) {
    if(!head || !head.next) return false;
    //建立双指针
    var p = head;
    //快指针P下一个结点或下下结点不存在跳出循环，返回false
    while(p.next && p.next.next){
        p = p.next.next    //快指针一次走两步
        head = head.next    //慢指针一次走一步
        if(p == head){    //快慢指针指向同一位置时存在环
            return true    
        }
    }
    return false
}
```

哈希表

```js
var hasCycle = function(head) {
    // 创建哈希表来存储已访问的节点
    const visited = new Set();
    let current = head;
    
    // 遍历链表
    while (current !== null) {
        // 如果当前节点已经在哈希表中，说明有环
        if (visited.has(current)) {
            return true;
        }
        // 将当前节点加入哈希表
        visited.add(current);
        // 移动到下一个节点
        current = current.next;
    }
    
    // 遍历到null，说明无环
    return false;
};
```

:::

## :star: 142. 环形链表 II(中等)

```md
给定一个链表的头节点  head ，返回链表开始入环的第一个节点。
 如果链表无环，则返回 null。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。
 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中
 的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。注意：pos 
 不作为参数进行传递，仅仅是为了标识链表的实际情况。

不允许修改 链表。

输入：head = [3,2,0,-4], pos = 1
输出：返回索引为 1 的链表节点
解释：链表中有一个环，其尾部连接到第二个节点。

输入：head = [1,2], pos = 0
输出：返回索引为 0 的链表节点
解释：链表中有一个环，其尾部连接到第一个节点。

输入：head = [1], pos = -1
输出：返回 null
解释：链表中没有环。

进阶：你是否可以使用 O(1) 空间解决此题？

```

::: details

 快慢指针（空间复杂度O(1)）

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

哈希表+链表

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
    const visited = new Set();
    while (head !== null) {
        if (visited.has(head)) {
            return head;
        }
        visited.add(head);
        head = head.next;
    }
    return null;
};
```

:::

## :star: 21. 合并两个有序链表(简单)

```md
将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定
的两个链表的所有节点组成的。 

输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]

输入：l1 = [], l2 = []
输出：[]

输入：l1 = [], l2 = [0]
输出：[0]
```

::: details

迭代：空间复杂度O(1)

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    let newList = new ListNode(-1);
    let p = newList;
    while(list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            p.next = list1;
            list1 = list1.next;
        } else {
            p.next = list2;
            list2 = list2.next;
        }
        p = p.next;
    }
    p.next = list1 === null ? list2: list1;
    return newList.next;
};
```

递归：空间复杂度O(n)，没看出来

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    if (l1 === null) {
        return l2;
    } else if (l2 === null) {
        return l1;
    } else if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
};
```

:::

## :star: 2. 两数相加(中等)

```md
给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 
的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.

输入：l1 = [0], l2 = [0]
输出：[0]

输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
```

::: details

看清题目很重要，这一题

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
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

:::

## :star: 删除链表的倒数第 N 个结点(中等)

```md
给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]

输入：head = [1], n = 1
输出：[]

输入：head = [1,2], n = 1
输出：[1]

进阶：你能尝试使用一趟扫描实现吗？
```

::: details

双指针

```md
数学原理：
假设链表长度为 L，我们要找倒数第 n 个节点。

快指针先走 n 步：此时快指针距离头节点有 n 个节点

两个指针同时移动：

当快指针到达末尾（null）时，它又移动了 L - n 步

慢指针也移动了 L - n 步

此时慢指针的位置是：(L - n) 从头部开始

倒数第 n 个节点的位置是：L - n 从头部开始
```

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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
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

计算链表长度

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
 * @param {number} n
 * @return {ListNode}
 */
function getLength(head) {
    let length = 0;
    while(head) {
        length += 1;
        head = head.next;        
    }
    return length;
}

var removeNthFromEnd = function(head, n) {
    let dummyNode = new ListNode(0, head);
    const len = getLength(head);
    cur = dummyNode;
    for(let i = 0; i < len - n; i++) {
        cur = cur.next;
    }
    cur.next = cur.next.next;
    return dummyNode.next;
};
```

:::

## :star: 24. 两两交换链表中的节点(中等)

```md
给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改
节点内部的值的情况下完成本题（即，只能进行节点交换）。

输入：head = [1,2,3,4]
输出：[2,1,4,3]

输入：head = []
输出：[]

输入：head = [1]
输出：[1]
```

::: details

迭代

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
 * @return {ListNode}
 */
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

递归

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
 * @return {ListNode}
 */
var swapPairs = function(head) {
    if (head === null|| head.next === null) {
        return head;
    }
    const newHead = head.next;
    head.next = swapPairs(newHead.next);
    newHead.next = head;
    return newHead;
};
```

:::

## :star: 25. K 个一组翻转链表(困难)(未必)

```md
给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。

k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，
那么请将最后剩余的节点保持原有顺序。

你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。

输入：head = [1,2,3,4,5], k = 2
输出：[2,1,4,3,5]

输入：head = [1,2,3,4,5], k = 3
输出：[3,2,1,4,5]

进阶：你可以设计一个只用 O(1) 额外内存空间的算法解决此问题吗？
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
        // 把子链表重新接回原链表
        cur.next = head;
        tail.next = next;
        cur = tail;
        head = tail.next;
    }
    return dummyNode.next;
};
```

:::

## :star: 138. 随机链表的复制(中等)

js手写一个嵌套引用的深拷贝，就能明白题意，更能上手。

```md
给你一个长度为 n 的链表，每个节点包含一个额外增加的随机指针 random ，
该指针可以指向链表中的任何节点或空节点。

构造这个链表的 深拷贝。 深拷贝应该正好由 n 个 全新 节点组成，其中每个新节点
的值都设为其对应的原节点的值。新节点的 next 指针和 random 指针也都应指向
复制链表中的新节点，并使原链表和复制链表中的这些指针能够表示相同的链表状态。
复制链表中的指针都不应指向原链表中的节点 。

例如，如果原链表中有 X 和 Y 两个节点，其中 X.random --> Y 。那么在复制链表中
对应的两个节点 x 和 y ，同样有 x.random --> y 。

返回复制链表的头节点。

用一个由 n 个节点组成的链表来表示输入/输出中的链表。每个节点用一个 
[val, random_index] 表示：

val：一个表示 Node.val 的整数。
random_index：随机指针指向的节点索引（范围从 0 到 n-1）；如果不指向任何
节点，则为  null 。
你的代码 只 接受原链表的头节点 head 作为传入参数。

输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]

输入：head = [[1,1],[2,1]]
输出：[[1,1],[2,1]]

输入：head = [[3,null],[3,0],[3,null]]
输出：[[3,null],[3,0],[3,null]]
```

::: details

回溯法（递归）和哈希表（Map）

```md
1. 哈希表 (cachedNode)
作用：存储原始节点和复制节点的映射关系

避免重复复制：如果节点已经被复制过，直接从Map中获取

处理循环引用：防止因为random指针形成的循环导致无限递归

2. 回溯法 (递归)
深度优先：先递归复制next链，再递归复制random链

自底向上：从链表尾部开始构建，逐步向前
```

```js
/**
 * // Definition for a _Node.
 * function _Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function(head, cachedNode = new Map()) {
    if (head === null) {
        return null;
    }
    if (!cachedNode.has(head)) {
        cachedNode.set(head, {val: head.val}), 
        Object.assign(cachedNode.get(head), 
        {
            next: copyRandomList(head.next, cachedNode),
            random: copyRandomList(head.random, cachedNode)
        })
    }
    return cachedNode.get(head);
}
```

更清晰的写法

```js
/**
 * // Definition for a _Node.
 * function _Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function(head, cachedNode = new Map()) {
    if (head === null) return null;
    
    // 如果已经复制过，直接返回
    if (cachedNode.has(head)) {
        return cachedNode.get(head);
    }
    
    // 创建新节点（先不设置next和random）
    const newNode = new Node(head.val);
    cachedNode.set(head, newNode);
    
    // 递归复制next和random
    newNode.next = copyRandomList(head.next, cachedNode);
    newNode.random = copyRandomList(head.random, cachedNode);
    
    return newNode;
}
```

迭代+节点拆分

```js
/**
 * // Definition for a _Node.
 * function _Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 */
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

## :star: 148. 排序链表(中等)(暗藏杀机)

```md
给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。

输入：head = [4,2,1,3]
输出：[1,2,3,4]

输入：head = [-1,5,3,4,0]
输出：[-1,0,3,4,5]

输入：head = []
输出：[]

进阶：你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？
```

::: details

自底向上归并排序

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

自顶向下归并排序

```js
const merge = (head1, head2) => {
    const dummyHead = new ListNode(0);
    let temp = dummyHead, temp1 = head1, temp2 = head2;
    while (temp1 !== null && temp2 !== null) {
        if (temp1.val <= temp2.val) {
            temp.next = temp1;
            temp1 = temp1.next;
        } else {
            temp.next = temp2;
            temp2 = temp2.next;
        }
        temp = temp.next;
    }
    if (temp1 !== null) {
        temp.next = temp1;
    } else if (temp2 !== null) {
        temp.next = temp2;
    }
    return dummyHead.next;
}

const toSortList = (head, tail) => {
    if (head === null) {
        return head;
    }
    if (head.next === tail) {
        head.next = null;
        return head;
    }
    let slow = head, fast = head;
    while (fast !== tail) {
        slow = slow.next;
        fast = fast.next;
        if (fast !== tail) {
            fast = fast.next;
        }
    }
    const mid = slow;
    return merge(toSortList(head, mid), toSortList(mid, tail));
}

var sortList = function(head) {
    return toSortList(head, null);
};
```

:::

## :star: 23. 合并 K 个升序链表(困难)(能读懂的题目，不能叫困难)(下次再学)

```md
给你一个链表数组，每个链表都已经按升序排列。

请你将所有链表合并到一个升序链表中，返回合并后的链表。

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

输入：lists = []
输出：[]

输入：lists = [[]]
输出：[]
```

::: details

```js

```

:::

## :star: 146. LRU 缓存(中等)

```md
请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
实现 LRUCache 类：
LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；
如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 
capacity ，则应该 逐出 最久未使用的关键字。
函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

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

::: details

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

:::