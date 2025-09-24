# 手写call和bind

## 说说call, apply, bind

* 三者都能改变this指向
* call和apply都是立即调用，bind不是立即调用，而是返回一个绑定this后的函数
* call接收多个参数，apply接收一个数组，bind可以多次接收不定参数

## 说说this指向问题

```md
绑定规则：
(1). 默认绑定：严格模式下，this会绑定到undefined。
非严格模式下，this会绑定到window。
// eg: function play() {}; // 定义到了window上，window.play。它走隐式绑定
// 使用 const play = function() {console.log(this);} 
play();
console.log(window.play=== undefined)
// 使用const声明的变量，不会挂载到window, 通过window.play访问为undefined;
// `play()` 是直接调用，没有绑定到任何对象。无通过new绑定，显示绑定，隐式绑定，
// 它走默认绑定
(2). 隐式绑定：this永远指向最后调用它的对象。
// eg: obj.play(); fn.bind(); // 通过对象进行调用
(3). 显示绑定：call,apply,bind
(4). new绑定
优先级：new绑定优先级>显示绑定优先级> 隐式绑定优先级>默认绑定优先级。 

简而言之：普通函数的this指向调用它的人，window, obj,  ...
而箭头函数没有this, 就会继承定义时的外部作用域，即基于词法作用域，
而词法作用域是在编译时确定的。
(call,bind,apply,new 都是一些加工的产物，究极本身，就是谁调用了它)。
```

## 手写call

```js
// 改变this指向，立即调用，一次接收多个参数
// 手写call, 注意如果使用箭头函数，是没有this和arguments的
Function.prototype.myCall = function(ctx) {
    // 如果对象是基本类型，指向window
    if (typeof ctx !== 'object' || ctx === null) {
        ctx = window;
    }
    const fnKey = Symbol();
    ctx[fnKey] = this; // 谁调用了myCall, this指向谁，这里指向sayHello函数
    const args = [...arguments].slice(1); // arguments是类数组，不能直接使用slice
    const res = ctx[fnKey](...args); // 函数有返回值
    delete ctx[fnKey];
    return res;
}
function sayHello() {
    console.log(this.fullname, this.age);
}
sayHello.call({fullname: 'durant', age: 35}); // durant 35
sayHello.myCall({fullname: 'durant', age: 35}) // durant 35
sayHello.call(2); // undefined undefined
sayHello.myCall(2); // undefined undefined
```

## 手写apply

手写call,稍微改一下。call接收不定参数，apply接收1个数组。

## 手写bind

### 不考虑通过new调用函数的版本

```js
// 改变this指向，
// 不立即调用，返回一个绑定this后的函数
// 多次传参，参数不定
Function.prototype.myBind = function(ctx, ...args) {
    // console.log(this); // animal
    const fn = this;
    return function(...residual) { // residual 剩余的
        return fn.call(ctx, ...args, ...residual);
    }
}
function animal(a, b, c) {
    console.log(this.name, this.age, a, b, c);
}
const dog = animal.bind({name: 'dog', age: 2}, 5, 10)
dog(15);
const cat = animal.myBind({name: 'cat', age: 2}, 5, 10)
cat(15)
```

### 考虑用new调用函数的版本

```js
// 改变this指向
// 不立即调用，返回一个绑定this后的函数
// 多次传参，参数不定
// 普通调用，this就是你传入的obj,即{name:'dog', age:2}
// 通过new调用，this指向新生成的实例。打印不到this.name, this.age(跟传入的obj无关了)
Function.prototype.myBind = function(ctx, ...args) {
    // console.log(this); // animal, animal调用了myBind这个方法
    const fn = this;
    // 我这个bindFn，相当于 animal.myBind({name: 'pig', age: 2}, 5, 10); 的这一坨了
    // 后续如果要通过new 调用，我判断 新生成的实例对象 是否 由 bindFn这个函数 的原型链上
    return function bindFn(...residual) { // residual 剩余的
        // console.log(this, '1');  
        // 普通调用，this指向window（非严格模式）
        // 谁调用了，new的方式调用了，this指向实例对象
        // 这里打印不到实例化对象的desc属性，你在animal.myBind({name: 'pig', age: 2}, 5, 10);
        // 就已经执行了这些代码,
        // new调用的时候，才会执行 animal的方法。
        if (this instanceof bindFn) {
            // return new fn(...args, ...residual);
            // 之前自己有手写new了。
            const obj = Object.create(fn.prototype);
            const res = fn.call(obj, ...args, ...residual);
            return typeof res  === 'object'  && res !== null ?  res: obj;
        } else {
            return fn.call(ctx, ...args, ...residual);
        }
    }
}
function animal(a, b, c) {
    this.desc = '我是动物的基类';
    // console.log(2);
    console.log(this, this.name, this.age, a, b, c);
}
const dog = animal.bind({name: 'dog', age: 2}, 5, 10)
dog(15);
const cat = animal.myBind({name: 'cat', age: 2}, 5, 10)
cat(15)

const dragon = animal.bind({name: 'dragon', age: 2}, 5, 10);
new dragon(15);

const pig = animal.myBind({name: 'pig', age: 2}, 5, 10);
const a = new pig(15);
```