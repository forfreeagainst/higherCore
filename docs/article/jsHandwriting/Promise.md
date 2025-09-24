# Promise

## ES6的类

* 静态方法 static
* 私有属性 #, 类内部可使用
* 没有标注static和#，就是实例方法，公有字段
* 继承要有super()
* 静态方法中的 this 指向 Person 类本身，其余指向实例
* `类内部开启了严格模式`

```js
 class Person {
    static #desc = '生活在地球的人族'
    #region = '元谋人'
    constructor(name, age) {
        // 这里的this指向新创建的实例
        // console.log(this,this instanceof Person, 'constructor') 
        // 打印结果：Person {#region: 'China'}
        this.name = name;
        this.age = age;
        // console.log(2, this.#region, Person.#desc)
    }
    static sayHello() {
        // 静态方法中的 this 指向 Person 类本身
        console.log(this.#desc, '静态方法的this指向Person类')
    }
    sayNight() {
        // console.log(this instanceof Person, '指向实例', this); 
        // 打印结果：Person {name: 'durant', age: 35, #region: 'China'}
        // 实例方法的this 指向新创建的实例
        console.log(Person.#desc, '实例方法通过Person类调用');
    }
}
Person.sayHello()
const p = new Person('durant', 35);
p.sayNight()
// 外部访问不了
// console.log(p.#region)
// console.log(p.#desc)
class God extends Person {
    constructor(name) {
        // 继承一定要有super()
        super(name, 35)
        // 覆盖子类属性
        this.age = 40;
    }
    // 覆盖子类方法的，就写一样的方法名
    // sayNight() {
    //     console.log('早上好')
    // }
}
const durant = new God('durant');
console.log(durant)
durant.sayNight()


function abc() {
    function ddd() {
        console.log('嘀嘀嘀', this); // window
    }
    ddd();
}
abc();
class Animal {
    constructor(name) {
        console.log(this);
    }
    say() {
      // console.log(this, '谁调用了say方法')
        function a() {
            console.log(this, '???'); // undefined, 类内部开启了严格模式
        }
        a(); // 谁调用这个函数， this指向谁。
    }
}
new Animal('dog').say();
```

## 手写Promise

### 实现目标

* Promise有三个状态，分别pending, fulfilled, rejected。初始状态为 pending,
* 状态不可逆。一旦由pending转化为 fulfilled或 rejected后，状态就不会再发生改变了。
* throw可以使Promise的状态，由pending变为rejected.
* Promise.then返回一个新的Promise(通过.then进行链式调用)，它接收两个参数，一个成功的回调，一个可选的失败的回调。
回调可以是函数，也可以不是函数（不是函数具有穿透效果）
* 在PromiseA+规范里，具备then方法的函数或对象，就会被认为是Promise.([Promises/A+](https://promisesaplus.com/))
* **`Promise.then` 的回调函数是作为微任务执行的**
* **Promise 构造函数是同步执行的**（当你调用 `new Promise(executor)` 时，传入的 `executor` 函数会立即同步执行）

### 版本（三个状态，不可逆）

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise{
    // 私有属性（通过实例，无法直接访问内部属性）
    #promiseState = PENDING;
    #promiseResult = null;
    constructor(executor) {
        // 你需要熟悉this的指向。（类默认是严格模式）
        // executor(this.resolve, this.reject);
        // 直接调用resolve,而不是通过实例调用resolve,this自然指向的不是实例
        executor(this.resolve.bind(this), this.reject.bind(this));
    }
    resolve(res) {
        if (this.#promiseState !== PENDING) return;
        this.#promiseState = FULFILLED;
        this.#promiseResult = res;
    }
    reject(err) {
        //没有使用bind改变this指向，打印的是undefined;
        console.log(this, '1');
        if (this.#promiseState !== PENDING) return;
        this.#promiseState = REJECTED;
        this.#promiseResult = err;
    }
}
const p1 = new MyPromise((resolve, reject) => {
    reject('错误');
    // 状态不可逆
    resolve(1);
})
console.log(p1, '2');
```

### 最终版本

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
<link rel="icon" href="data:,">  <!-- 空图标 -->
</head>
<body>
  <script>
    // 三个状态，不可逆
    // throw 也是触发rejected
    // then返回一个Promise，接收两个参数，一个成功回调，一个失败回调
    // 回调可以是函数，也可以不是函数，不是函数的话，结果和状态都会穿透
    // Promise.then中的回调函数是微任务
    const PENDING = 'pending';
    const FULFILLED = 'fulfilled';
    const REJECTED = 'rejected';
    class MyPromise{
      #promiseState = PENDING;
      #promiseResult = null;
      #handlerList = [];
      // 接收一个 new Promise(回调函数)
      constructor(executor) {
        try {
          executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (err) {
          this.reject(err);
        }
      }
      changeState(state, result) {
        if (this.#promiseState !== PENDING) return;
        this.#promiseState = state;
        this.#promiseResult = result;
        // 有延时的回调函数 new Promise((resolve,reject) => {setTimeout(resolve(200))})
        this.runTask();
      }
      resolve(res) {
        this.changeState(FULFILLED, res);
      }
      reject(err) {
        this.changeState(REJECTED, err);
      }
      runTask() {
        if (this.#promiseState === PENDING) return;
        // 为什么.then方法里，还有runTask。等state改变了，统一执行（同步和异步）不好？
        // 因为同步时，this.#handlerList还没有push数据。
        // 所以.then还要手动调用一次runTask。
        // 异步和同步不会冲突？当然不会
        // 你都shift(); 取出来执行，就没有了。
        while(this.#handlerList.length) {
          const {
            onFulfilled,
            onRejected,
            resolve,
            reject
          } = this.#handlerList.shift();
          if (this.#promiseState === FULFILLED) {
            this.runOne(onFulfilled, resolve, reject);
          } else {
            this.runOne(onRejected, resolve, reject);
          }
        }
      }
      runOne(callback, resolve, reject) {
        this.runMicroTask(() => {
          try {
            const data = callback(this.#promiseResult);
            // 如果是Promise的话，要等待结果的返回
            if (data instanceof MyPromise) { // 或者this.isPromise(data)
              data.then(resolve, reject);
            } else {
              resolve(data);
            }
          } catch (err) {
            reject(err);
          }
        })
      }
      // 微任务
      runMicroTask(fn) {
        if (typeof process === 'object' && typeof process.nextTick === 'function') {
          process.nextTick(fn);
        } else if (typeof MutationObserver === 'function') {
          const ob = new MutationObserver(fn);
          const textNode = document.createTextNode('1');
          ob.observe(textNode, {
            characterData: true
          })
          textNode.data = '2'
        } else {
          setTimeout(fn, 0);
        }
      }
      then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' 
          ? onFulfilled: res => res;
        onRejected = typeof onRejected === 'function'
          ? onRejected: err => { throw(err)};
        return new MyPromise((resolve, reject) => {
          this.#handlerList.push({
            onFulfilled,
            onRejected,
            resolve,
            reject
          });
          // 没有延时的回调函数 new Promise((resolve,reject) => {reject(500)})
          this.runTask();
        })
      }
      // “promise” is an object or function with a then method whose behavior conforms to this specification.
      //* Promise有个A+规范，函数或对象中有属性then，并且then是个函数，就能成为Promise
      isPromise(obj) {
        if(obj !== null && (typeof obj === 'object' || typeof obj === 'function')) {
          return typeof obj.then === 'function';
        }
        return false;
      }
    }
  </script>
</body>
</html>
```

### 测试用例

**Promise的状态是不可逆的**

```js
//打印一个fulfilled的promise;
const p = new MyPromise((resolve, reject) => {
  resolve('success');
  reject('fail');
})
console.log(p)
```

**异步resolve,能否正常执行then方法的逻辑（考验状态改变，才执行相应的回调函数）**

```js
new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(11);//改变了Promise的状态
    }, 200)
}).then(res => {
   console.log("🚀 ~ res:", res)
})
```

**then的成功回调不传函数，结果就穿透（直接舍弃不是函数的内容，定义一个新函数）**

```js
// 传的不是函数，结果就穿透（promiseState,promiseResult都穿透）
new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(232);
    },500)
}).then(110, err=> console.log(err))
.then(res=> console.log(res), err=> console.log(err)); // 232

new MyPromise((resolve, reject) => {
    setTimeout(()=> {
        reject(0)
    })
}).then(res => 666, 323)
.then(res=> console.log(res, 'res2'), err=> console.log(err, 'err2')); //0 'err2'
```

```js
onFulfilled = typeof onFulfilled !== 'function' ? val => val: onFulfilled;
onRejected = typeof onRejected !== 'function' ? err => { throw(err) }: onRejected;
```

**走了失败的回调，并不代表 之后的回调 都会走失败的 回调。**

```js
// 报错 和 手动 reject，可以使promiseState状态为 rejected, 可以走到失败的回调。
// 走了失败的回调，并不代表 之后的回调 都会走失败的 回调。
new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(232);
    },500)
}).then(110, err=> console.log(err, 'err1'))
.then(res=> console.log(res, 'res2'), err=> console.log(err, 'err2'));//err1和res2
```

```js
new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject(232);
    },500)
}).then(110, () => {throw(999)})
.then(res=> console.log(res, 'res2'), err=> console.log(err, 'err2')); // err2
```

**Promise.then 的回调函数是作为微任务执行的**

*  一种 是 通过 new Promise 的resolve/reject，进入.then
* 另一种是 通过 .then 中执行 成功/失败的回调 中的 resolve/reject, 进入.then。

```js
const p = new MyPromise((resolve, reject) => {
    resolve(111);
}).then(res => {
    console.log(res, '1');
})
console.log(222);// promise.then是微任务，先打印222，再打印111
```

**then传入的回调函数返回一个Promise**

```js
//过1s，打印ok1 666, 过2s,打印......1166
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(666);
  }, 1000)
}).then(data => {
  console.log('ok1', data);
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(data +500)
    },2000)
  })
}).then(res => {
  console.log("......", res)
})
```

**测试async和await**

```js
function awaitFn() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('延迟执行2s')
    },2000)
  })
}
async function testAwait() {
  const res = await awaitFn();
  console.log(res);
}
testAwait();
```

## 静态方法Promise.resolve()返回一个 Promise 对象

* Promise源码中，Promise只存在resolve静态方法，不存在resolve实例方法
* 原生 Promise 的设计确保了状态的 不可变性和安全性，因此不会暴露实例级别的 resolve/reject 方法。
* Promise.resolve()是静态方法（类方法），promise.then是实例方法（实例化才能调用方法）。

```js
const p = Promise.resolve(5)
console.log(p, p instanceof Promise);
p.then(res=> {console.log(0)})  // 微任务
console.log(2);

const p2 = Promise.resolve(100)
console.log(p2, p2 instanceof Promise) // Promise {<fulfilled>: 100} true
p2.resolve(res => { // 直接报错： p2.resolve is not a function
    console.log(res, '实例方法');
})
```

```js
class MyPromise{
    // 静态方法 resolve
    static resolve(value) {
        if (value instanceof MyPromise) {
            return value;
        }
        return new MyPromise((resolve) => resolve(value));
    }
    // 静态方法 reject
    static reject(reason) {
        // reject 的语义是“无条件拒绝”，因此不需要特殊处理 Promise 类型的 reason。
        // _：表示忽略的第一个参数
        return new MyPromise((_, reject) => reject(reason));
    }
}
```

## Promise的静态方法

### Promise.all()

* 接收一个Promise可迭代对象作为输入，并返回一个Promise。
* 如果所有的输入的Promise都能成功resolve,返回的Promise,将带有所有resolve值的数组。
* 如果任意的Promise被reject,返回的Promise,将带有第一个被拒绝的原因。
* （换言之，所有的都成功，或者遇到第一个失败）
* 跟Promise.any()截然相反

```js
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(200);
    }, 1000)
})
const p2 = new Promise((resolve,reject) => {
    setTimeout(() => {
        // resolve(201)
        reject(500)
    }, 2000)
})
Promise.all([p1, p2]).then(res => {
    console.log(res);
})
```

手写Promise.all()

```js
Promise.all = function(pList) {
  // 处理非数组输入
  if (!Array.isArray(pList)) {
    return Promise.reject(new TypeError('Argument must be an array'));
  }

  // 处理空数组
  if (pList.length === 0) {
    return Promise.resolve([]);
  }

  let count = 0;
  const results = new Array(pList.length); // 固定长度数组
  // Promise.all 返回一个promise，才能继续被.then
  return new Promise((resolve, reject) => {
    pList.forEach((p, index) => {
      // 统一包装为 Promise（处理非 Promise 值）
      Promise.resolve(p)
        .then((res) => {
          results[index] = res; // 按顺序存储结果
          count++;
          if (count === pList.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err); // 任何一个失败，立即结束
        });
    });
  });
};

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(200);
    }, 1000)
})
const p2 = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(201)
        reject(500)
    }, 2000)
})

Promise.all([p1, p2]).then(res => {
    console.log(res);
})
```

### Promise.allSettled()

* 接收一个Promise可迭代对象作为输入，返回一个Promise。
* 如果所有输入的Promise都能被resolve或reject, 返回的Promise,将带有描述每个Promise结果的对象数组。

手写Promise.allSettled()

```js
// 所有输入的Promise都有结果，无论是resolve,还是reject
Promise.allSettled = (pList) => {
    console.log('我的allSettled')
    let count = 0;
    let results = [];
    return new Promise((resolve, reject) => {
        const addData = (obj, sub) => {
            count ++;
            results[sub] = obj;
            if (count === pList.length) {
                resolve(results);
            }
        }
        pList.forEach((p, key) => {
            Promise.resolve(p).then(value=> {
                addData({
                    status: 'fulfilled',
                    value
                }, key);
            }, reason => {
                addData({
                    status: 'rejected',
                    reason
                }, key);
            })
        })
    })
}
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(200);
    }, 1000)
})
const p2 = new Promise((resolve,reject) => {
    setTimeout(() => {
        reject(500)
    }, 2000)
})
Promise.allSettled([p1, p2]).then(res => {
    console.log(res);
})
```

### Promise.any()

* 接收一个Promise可迭代对象作为输入，并返回一个Promise。
* 如果任意的Promise被resolve,返回的Promise,将带有第一个被resolve的结果。
* 如果所有的输入的Promise都被reject, 则返回所有的Promise被被reject的报错。
Uncaught (in promise) AggregateError: All promises were rejected

```js
Promise.any = (pList) => {
    console.log('我的手写any');
    return new Promise((resolve, reject) => {
        let count = 0;
        pList.forEach((p, key) => {
            Promise.resolve(p).then(res => {
                resolve(res);
            }, err => {
                count ++;
                if (count === pList.length) {
                    reject('All promises were rejected')
                    // reject(new AggregateError('All promises were rejected')) // AggregateError要自己弄
                }                        
            })
        })
    })
}
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(200);
    }, 3000)
})
const p2 = new Promise((resolve,reject) => {
    setTimeout(() => {
        reject(500)
    }, 2000)
})
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(501);
    }, 1000)
})
```

### Promise.race()

* 接收一个Promise可迭代对象作为输入，返回一个Promise。
* 竞速，返回第一个非待定状态Promise的结果，无论成功或失败。
* throw new Error('？？？')，报错，仍处于非待定状态

```js
Promise.race = (pList) => {
    console.log('我的手写race')
    return new Promise((resolve, reject) => {
        for(let p of pList) {
            Promise.resolve(p).then(res => {
                resolve(res)
            }, err => {
                reject(err)
            })      
        }
    })
}

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(200);
    }, 3000)
})
const p2 = new Promise((resolve,reject) => {
    setTimeout(() => {
        // throw new Error('？？？')
        reject(500)
    }, 2000)
})
Promise.race([p1, p2]).then(res => {
    console.log(res);
})
```

## 实现异步任务的并发执行

并发数concurrency, source代表函数的参数，iteratorFn函数

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
<link rel="icon" href="data:,">  <!-- 空图标 -->
</head>
<body>
  <script>
    async function runParallel(maxConcurrency, source, iteratorFn) {
        const ret = []
        const executing = []
        for (const item of source) {
            // Promise.resoloe 得到一个Promise, Promise类是没有.then方法的
            const p = Promise.resolve().then(() => iteratorFn(item))
            ret.push(p)
            if (maxConcurrency <= source.length) {
                // 00 10 10 10 11
                const e = p.then(() => {
                    // console.log(executing, '1')
                    executing.splice(executing.indexOf(e), 1)
                })
                // console.log(executing, '0')
                executing.push(e)
                if (executing.length >= maxConcurrency) {
                    await Promise.race(executing)
                }
            }
        }
        return Promise.all(ret)
    }
    // 想象大文件的切片，每一片的时间都不一样，最大并发数为6片，都是调用一样的方法，只是参数不同
    // 这里用setTimeout模拟 http的请求过程
    const getList = (id) => {
        return new Promise((resolve, reject) => {
            // 假设id 为1 ，1s后可获取数据， id为2， 2s后可获取数据，依此类推
            setTimeout(() => {
                console.log(id);
                resolve(id)
            }, id * 1000)
        })
    }
    async function myRunParallel(maxConcurrency, paramList, iteratorFn) {
        const ret = []; // 返回值
        const executing = [];
        for(let param of paramList) {
            // () => xxx, 注意，这是返回，而不是调用哦，
            // () => {interatorFn(param)} 这就是调用
            // 为什么要以微任务的形式返回？
            // 后续是先push,哪个先执行完了,才能自己splice删除
            // 为什么以微任务执行？
            //  统一包装为 Promise，兼容同步 / 异步函数
            // 确保异步执行，避免同步阻塞
            const p = Promise.resolve().then(() => {return iteratorFn(param)});
            // const p = () => iteratorFn(param);
            ret.push(p);
            // 切片太多，超出最大并发数，需要等待前面的切片完成
            if (maxConcurrency <= paramList.length) {
                const e = p.then(() => {
                    executing.splice(executing.indexOf(e), 1)
                })
                // 第一个切片（小于最大并发数），无需等待 
                executing.push(e);
                // 同步函数的话,哪个先执行完了,自己删除
                // const e = p();
                // executing.push(e);
                // executing.splice(executing.indexOf(e), 1)
                // 等待前面的切片完成，后续才能继续push
                if (executing.length >= maxConcurrency) {
                    await Promise.race(executing)
                }
            }
        }
        return Promise.all(ret);
    }
    const paramArr = [4,2,9,3,1];
    runParallel(2, paramArr, getList)
    myRunParallel(2, paramArr, getList);
  </script>
</body>
</html>
```

## 手写调度器

```js
class Scheduler {
  constructor(max) {
    this.max = max;
    this.count = 0; // 用来记录当前正在执行的异步函数
    this.queue = new Array(); // 表示等待队列
  }
  async add(promiseCreator) {
    /*
        此时count已经满了，不能执行本次add需要阻塞在这里，将resolve放入队列中等待唤醒,
        等到count<max时，从队列中取出执行resolve,执行，await执行完毕，本次add继续
        */
    if (this.count >= this.max) {
      await new Promise((resolve, reject) => this.queue.push(resolve));
    }

    this.count++;
    let res = await promiseCreator();
    this.count--;
    if (this.queue.length) {
      // 依次唤醒add
      // 若队列中有值，将其resolve弹出，并执行
      // 以便阻塞的任务，可以正常执行
      this.queue.shift()();
    }
    return res;
  }
}

const timeout = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler(2);

const addTask = (time, order) => {
  //add返回一个promise，参数也是一个promise
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};
  
  addTask(1000, '1');
  addTask(500, '2');
  addTask(300, '3');
  addTask(400, '4');
  
// output: 2 3 1 4
```


## 似懂非懂的原因

* Promise.resolve() 和Promise.resolve(函数)的区别

```md
用 Promise.resolve()：快速创建一个已解决的 Promise，无需关心值。allSettled
用 Promise.resolve(func)：需要将函数作为值传递给 Promise 链（例如延迟执行）。并发执行
```


* const p = Promise.resolve().then(() => {return iteratorFn(param)});
const p = Promise.resolve().then(iteratorFn(param));  区别

```md
第一句
当 Promise 状态变为 resolved 时，才会执行这个箭头函数，进而调用 iteratorFn(param)
iteratorFn 的执行时机是在当前微任务队列中

第二句
这里是先立即执行 iteratorFn(param)，然后将其返回值传递给 then 方法
如果 iteratorFn(param) 返回的不是函数，then 会忽略这个参数
关键区别：iteratorFn 会在当前同步代码中立即执行，而不是等待 Promise 状态变更

第一句是 "将来执行函数"，第二句是 "立即执行函数并把结果传给 then"
```
