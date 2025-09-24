# 手写instanceof和Flat和深拷贝

## instanceof

构造函数的prototype属性是否出现在某个实例对象的原型链上。

```js
function myInstanceof(obj, fn) {
    // 处理原始值和非法构造函数
    if (obj === null || typeof obj !== 'object' && typeof fn !== 'function') {
        return false;
    }
    if (typeof fn !== 'function' || !fn.prototype) {
        throw new TypeError('Right-hand side of instanceof is not callable');
    }

    let proto = Object.getPrototypeOf(obj);
    while (proto !== null) {
        if (proto === fn.prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto); // 沿原型链向上查找
    }
    return false;
}

console.log(myInstanceof([], Object));      // true
console.log(myInstanceof([], Array));      // true
console.log(myInstanceof([], Function));   // false
console.log(myInstanceof([], Object));   // true
console.log(myInstanceof(123, Number));    // false（原始值返回 false）
console.log(myInstanceof(new Number(123), Number)); // true

console.log(myInstanceof(function() {}, Function), '1'); // true（函数对象通过检查）
console.log(function() {} instanceof Function, '2'); // true（函数对象通过检查）
```

## 扁平化

实现一个函数，将嵌套数组扁平化,这里等价于arr.flat(Infinity)，将arr转换为一维数组。
Array.prototype.flat() 默认一层。

```js
const arr =[23, [33, [3333]]]
console.log(arr.flat(Infinity), arr.flat())
//  [23, 33, 3333]  [23, 33, Array(1)]
```

```js
function myFlatten(arr) {
    let res = []
    for(let item of arr) {
        if (Array.isArray(item)) {
            res = res.concat(myFlatten(item))
        } else {
            res.push(item);
        }
    }
    return res;
}
const arr =[23, [33, [3333]]]
console.log(arr.flat(Infinity), myFlatten(arr));
```

## 深拷贝

浅拷贝：浅拷贝只复制对象的第一层属性，如果属性值是引用类型(如对象、数组等)，则复制的是对象引用(内存地址)，而不是实际数据。 两个指针指向一个真实数据，从内存实现层面描述。

深拷贝：给对象开辟新的内存空间，不受拷贝对象的影响。

没有处理循环引用的深拷贝！！！

```js
function cloneDeep(target) {
    if (Array.isArray(target)) {
        let arr = [];
        for(let item of target) {
            arr.push(cloneDeep(item))
        }
        return arr;
    } else if (typeof target === 'object' && target !== null) {
        let obj = {};
        for(let key in target) {
            obj[key] = cloneDeep(target[key]);
        }
        return obj;
    } else {
        return target;
    }
}
const obj1 = {a: {b: 2}}
const obj2 = cloneDeep(obj1);
obj1.a.b = 3;
console.log(obj1.a.b, obj2.a.b); // 3 2
```

破解循环引用

```md
正确的做法是使用您代码中已经出现但未使用的 WeakMap。WeakMap 的作用是
记录已经拷贝过的对象，如果在递归过程中遇到了已经记录过的对象，说明遇到
了循环引用，直接返回之前拷贝好的新对象即可，从而打破无限递归。
```

最终代码

```js
function deepClone(target, hash = new WeakMap()) {
    if (typeof target !== 'object' || target === null) return target;
    if (hash.has(target)) return hash.get(target);
    const obj = Array.isArray(target) ? [] : {};
    // 存的空对象和空数组，有啥用
    hash.set(target, obj);
    for(let key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
            obj[key] = deepClone(target[key], hash);
        }
    }
    console.log(hash)
    return obj;
}
```

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
        const arr = ['durant', 'curry'];
        for(let key in arr) {
            console.log(key);
        }
        // 打印结果：0 1
    </script>
    <script>
        const pig = {name: 'pig', desc: {age: 35}};
        pig.ref = pig;
        pig.__proto__.hello = '原型链上的属性'
        // console.log(JSON.stringify(pig))

        // for ... in 默认遍历原型链，是常见Bug的源头
        for(let key in pig) {
            console.log(key); // name、desc、ref、hello
        }

        function cloneDeep(target, hash = new WeakMap()) {
            if (typeof target !== 'object' || target === null) return target;
            const obj = Array.isArray(target) ? [] : {};
            for(let key in target) { // for in 自身可枚举的属性+原型链上的属性
               if (Object.prototype.hasOwnProperty.call(target, key)) {
                    // 递归调用 cloneDeep，而不是直接赋值
                    // Uncaught RangeError: Maximum call stack size exceeded
                    obj[key] = cloneDeep(target[key]); // 🚨 这行会导致递归死循环
                }
            }
            return obj;
        }
        // console.log(cloneDeep(pig))

        function deepClone(target, hash = new WeakMap()) {
            if (typeof target !== 'object' || target === null) return target;
            if (hash.has(target)) return hash.get(target);
            const obj = Array.isArray(target) ? [] : {};
            // 存的空对象和空数组，有啥用
            hash.set(target, obj);
            for(let key in target) { // for in 自身可枚举的属性+原型链上的属性
               if (Object.prototype.hasOwnProperty.call(target, key)) {
                    obj[key] = deepClone(target[key], hash);
                }
            }
            console.log(hash)
            return obj;
        }
        const a = {};
        const b = a;
        console.log(a === b, '是否相等');// true
        const clonedPig = deepClone(pig);
        console.log("🚀 ~ clonedPig:", clonedPig)

        console.log(clonedPig !== pig); // true，确实是不同的对象
        console.log(clonedPig.name === pig.name); // true，值正确拷贝了
        console.log(clonedPig.ref === clonedPig); // true！循环引用在新对象中被正确建立
        console.log(clonedPig.ref !== pig); // true！没有指向原始对象
        console.log(clonedPig.ref.ref.ref === clonedPig); // true
    </script>
</body>
</html>
```