# 手写new

## 定义

* new 是一个关键字，我们通过函数实现。
* 新创建一个对象，
* 对象的__proto__指向（构造）函数的prototype
* 立即调用这个（构造）函数, 并把this指向新创建的对象
* （构造）函数的返回值如果是引用类型，返回这个（构造）函数的返回值，否则返回这个新创建的对象

## 初始版

```js
function myNew(fn) {
    // console.time("__proto__");
    // const obj = new Object();
    // 注意：__proto__是两个下划线
    // obj.__proto__ = fn.prototype; // 不推荐使用
    // console.timeEnd("__proto__");

    // console.time("setPrototypeOf")
    // const obj = new Object();
    // Object.setPrototypeOf(obj, fn.prototype); // 注意传参的格式
    // console.timeEnd("setPrototypeOf")

    console.time('Object.create');
    const obj = Object.create(fn.prototype)
    console.timeEnd('Object.create');

    const args = [...arguments].slice(1)
    // console.log("🚀 ~ myNew ~ args:", args)
    const res = fn.call(obj, ...args);
    return typeof res === 'object' && res !== null ? res: obj;
}
function Person(name, age) {
    this.name = name;
    this.age = age;
    // return 999;
    return null;
    return {
        ccc: '冲冲冲'
    }
}
const p1 = new Person('durant', '35');
const p2 = myNew(Person, 'durant', '35');
console.log(p1);
console.log(p2);
```

## 最终版

```js
function myNew(fn, ...args) {
    const obj = Object.create(fn.prototype)
    const res = fn.call(obj, ...args);
    return typeof res === 'object' && res !== null ? res: obj;
}
```

## 用个比较大的数据，测试Object.create() 和 Object.setPrototypeOf()的速度

```js
// 测试 Object.create()
const obj1 = Object.create({ foo: 1 });
console.time("create");
for (let i = 0; i < 1e6; i++) {
    const newObj = Object.create(obj1);
}
console.timeEnd("create"); // ~10ms

// 测试 Object.setPrototypeOf()
const obj2 = { bar: 2 };
console.time("setProto");
for (let i = 0; i < 1e6; i++) {
    const newObj = {};
    Object.setPrototypeOf(newObj, obj2);
}
console.timeEnd("setProto"); // ~43ms (慢 4 倍以上)
```

## Object.create()与Object.setPrototypeOf()使用场景

```md
Object.create(proto) 在对象创建时 就确定原型链，
引擎可以立即优化对象的结构（隐藏类/Shape 优化）。

Object.setPrototypeOf(obj, proto) 动态修改已有对象 的原型，
这会破坏引擎对对象的优化假设，导致 去优化（deoptimization），性能较差。

何时使用 setPrototypeOf？
尽管性能较差，但 setPrototypeOf 仍然有用，例如：

需要 动态修改 已有对象的原型（如某些元编程场景）。

在 库/框架 中需要调整对象继承关系，但无法提前用 Object.create。
```
