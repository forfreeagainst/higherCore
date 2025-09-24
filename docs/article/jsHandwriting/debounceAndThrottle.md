# 手写防抖和节流

## 闭包

* 创建私有变量
* 延长变量生命周期

## DOM 事件模型的发展阶段

```md
DOM0 级事件：

* 直接在 HTML 元素上通过 onclick、oninput 等属性绑定事件，
或通过 JS 给元素的事件属性赋值（如 input.oninput = function() {}）。
* 特点：简单直接，兼容性极好（所有浏览器都支持），但一个事件只能
绑定一个处理函数（重复绑定会覆盖）。

DOM2 级事件：

* 通过 addEventListener() 绑定事件、removeEventListener() 移除事件。
* 特点：支持给同一个事件绑定多个处理函数(真的这样)，还能指定事件捕获 / 冒泡阶段触发，
是目前开发中更推荐的方式。
```

### 举例

#### 直接在HTML元素上绑定事件

```md
<div id="app">
    <button onclick="clickMe()">点我</button>
</div>
<script>
    function clickMe() {
        console.log('冲冲冲')
    }
</script>    
```

#### 使用onclick绑定事件

```md
<div id="app">
    <button id="clickMe">点我</button>
</div>
<script>
    const clickDom = document.getElementById('clickMe');
    clickDom.onclick = function() {
        console.log('冲冲冲')
    }
</script>    
```

#### 使用addEventListener绑定事件

```md
<div id="app">
    <button id="clickMe">点我</button>
</div>
<script>
    const clickDom = document.getElementById('clickMe');
    clickDom.addEventListener('click', function() {
        console.log('点我');
    })
    clickDom.addEventListener('click', function() {
        console.log('冲冲冲');
    })
    // 都会打印， 点我 + 冲冲冲
</script>
```

### 总结

```md
HTML 属性中需要显式加()调用函数，因为它本质是执行一段代码
addEventListener需要传递函数本身（不加()），由浏览器负责调用
本质上两种方式都需要执行函数，只是addEventListener帮你封装了 "调用" 这个动作，
而 HTML 属性需要手动写出来。
```


## 手写防抖

* 防抖是回城，节流是技能CD。
* debounceSearch(event)
* HTML 属性中需要显式加()调用函数
* debounce传入一个函数，返回一个函数

```md
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='icon' href='data:,'>  <!-- 空图标 -->
</head>
<body>
    <div id="app">
        <input type="text" oninput="debounceSearch(event)">
    </div>
    <script>
        function debounce(fn, delay) {
            let timer = null;
            return function() {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    // 箭头函数没有arguments，访问外部的arguments
                    fn.apply(this, arguments);
                    timer = null;
                }, delay);
            }
        }
        // 只创建一次防抖函数实例
        // debounce传入一个函数，返回一个函数
         const debounceSearch = debounce(function(e) {
        // 在这里可以安全使用事件对象
        console.log(e.target.value);
    }, 1000);
    </script>
</body>
</html>
```

* addEventListener需要传递函数本身（不加()），由浏览器负责调用

```md
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="icon" href="data:,">  <!-- 空图标 -->
</head>
<body>
    <div>
        <input type="text" id="player">
    </div>
    <script>
        // 防抖：不动一段时间，就会执行。动一下，就要重新计算时间。
        // eg: 搜索框(觉得填好了，再帮我查呀)
        function debounce(fn, delay) {
            let timer = null;
            return function() {
                // console.log(this);// DOM元素
                // console.log(arguments); //接收input的e参数
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    fn.apply(this, arguments);
                }, delay)
            }
        }
        function play(e) {
            console.log(this, '汪汪队立大功', e.target.value);
        }
        const playerDom = document.getElementById('player');
        playerDom.addEventListener('input', debounce(play, 1000));
    </script>
</body>
</html>
```

## 手写节流

* 节流，一段时间内，只执行一次。eg: 表单提交（1s只触发一次请求）
* onclick = 一个函数
* debounce传入一个函数，返回一个函数
* e.target是DOM元素，e.target.value, 是DOM元素的value属性
* new Date().getTime()

```md
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='icon' href='data:,'>  <!-- 空图标 -->
</head>
<body>
    <div id="app">
        <button id="clickMe" value="click Me!">点我</button>
    </div>
    <script>
        function throttle(fn, delay) {
            let prev = 0;
            return function() {
                const now = new Date().getTime();
                if (now - prev > delay) {
                    fn.apply(this, arguments);
                    // 执行完，重新计时
                    prev = new Date().getTime();
                }
            }
        }
        const clickDom = document.getElementById('clickMe');
        function clickEvent(e) {
            console.log(e.target);
            console.log("🚀 ~ clickEvent ~ e.target.value:", e.target.value)
        }
        clickDom.onclick = throttle(clickEvent, 2000);
    </script>
</body>
</html>
```

* onclick 类似于addEventListener('click')

```md
clickDom.onclick = throttle(clickEvent, 2000);
改成
clickDom.addEventListener('click', throttle(clickEvent, 2000))
```