# Canvas和Svg绘图

* 可视化：发现规律，决策选择
* 数据大屏（炫酷），数据报表（工整），移动端数据

## canvas你知道多少

```js
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
const canvas = ref()
const handleClick = (e) => {
    const {left, top} = canvas.value.getBoundingClientRect();
    const x = e.clientX - left;// 相对于画布左边的距离
    const y = e.clientY - top;
    console.log(x, y)
}

onMounted(() => {
    canvas.value.addEventListener('click', handleClick)
    // 获取绘制上下文
    const ctx = canvas.value.getContext('2d'); // 平面绘图， webgl,3D绘图

    ctx.beginPath();
    ctx.closePath();
})
onUnmounted(() => {
    canvas.value.removeEventListener('click');
})
</script>
<template>
    <canvas ref="canvas" class="canvas-box" width="600" height="500"></canvas>
</template>

<style lang="scss" scoped>
.canvas-box {
    background-color: skyblue;
}
</style>
```

## 简单说说

```md
* 可视化图表
* 虚拟表格
* ...


常见的库：
* echarts： 图表库
* ZRender： 图库
* d3

* G2
* highCharts


```

## ZRender

* ZRender官网https://ecomfe.github.io/zrender-doc/public/

## echarts

* echarts官网https://echarts.apache.org/zh/option.html#legend


## 位图和矢量图

位图：存的是像素-放大会失真
矢量图：存的是路径，起点-终点， 放大不失真

|  | canvas | SVG | webgl |
| --- | --- | --- | --- |
| 维度 | 2d | 2d | 3d |
| 是什么 | 位图 | 矢量图 | - |
| 图形 | 纯代码 | 标签 | 纯代码 |
| 操作 | 不可修改(擦掉，重画)，没事件(通过三方库，来解决交互事件) | 可修改、有事件 |  |
| 性能 | 性能极高，取决绘图算法 | 一般，跟HTML标签一样，DOM的数量 |  |
| 用途 | 高性能 | 重交互 |  |
| 应用场景 | 游戏、大型图表、图片处理 | 地图、小型图标、图标 |  |

## canvas注意

```md
1.canvas标签
    内容：只有浏览器不识别，canvas才会显示
<canvas width="100" height="100">你的浏览器不支持canvas,请升级或更换</canvas>
    width,height必须是属性
2.图形上下文
    const ctx = canvas.getContext('???')  '2d' 或 'webgl'
    ctx 打印不为null。
3.图形操作
    路径 - 选定操作范围（不会真的画东西），后续绘图操作（stroke、fill）
        常见的坑：路径如果不清楚，会一直保留。
        beginPath --清除已有的路径（开始一个全新的路径）
        习惯：一定先beginPath,然后再开始操作路径
    绘制 - 直接画出东西
4.线
    moveTo() 起点
    lineTo() 终点
    closePath() 手动闭合路径（不等于自己画一条）
5.绘图操作
    stroke() 边框
        注意顺序：strokeStyle需要在stroke()前面
        strokeStyle只会影响后续的操作，对于已经完成的操作完全没影响
    fill() 填充：自动闭合（最后一个路径点， 到起点）

    strokeStyle: 边线颜色, eg： "red", #333333,rgb 或rgba
    fillStyle：填充颜色：同上
        1.纯色（xxx）
        2.渐变（linear, radial）
        3.图片

    lineWidth: 边线宽度
    lineCap: 线帽， 默认butt没有, round圆， square正方形
        （多出width: 线宽/ 2， height: 线宽的矩形）
    lineJoin: 线连接的地方，默认miter, round圆，bevel折叠.
        连续lineTo,才能触发lineJoin()
6.操作文字
    绘制文字
        fillText(str, x, y);
        strokeText(str, x, y);
    font属性
        ctx.font = "20px 黑体"
        ctx.font = "bold italic 20px 字体"
    位置（x, y）
        文字左下角
    文字原点
        默认：left, alphabetic
        ctx.textAlign = "left" || "center" || "right"
        ctx.textBaseline = "alphabetic"字母的基准 || "bottom" || "top" || "middle"
    多行文字
        ctx.measureText(str)
        ctx.measureText(str).width > canvas.width
7.canvas绝大多数的属性，都是"全局的"
    透明度：globalAlpha, 用来设置后续操作的透明度（绘制完要恢复回来）
        多个透明度，会变成乘积的结果 rgba的0.3 * globalAlpha的0.3
    阴影
        1.颜色： shadowColor
        2.范围：shadowBlur
        3.偏移： shadowOffsetX, shadowOffsetY
8.形状
    矩形
        直接绘制
            fillRect(x, y, w, h);
            strokeRect(x, y, w, h);
                相当于beginPath(); rect(); stroke(); 
        添加路径（不会绘制）
            rect(x, y, w, h)
        清除矩形区域
            clearRect(x, y, w, h); // 最常用，动画的实现，重新擦掉，重新绘制
    圆(360度)/弧(0-360度)
        ellipse 椭圆弧
        arc 正圆弧 （特殊的椭圆弧360度）

        ellipse(
            // 圆心
            cx, cy,
            // 半径
            rx, ry,
            // 旋转
            rotation,
            // 角度, 准备是填写对应的弧度，开始弧度，结束弧度， 2 * Math.PI
            startAng, endAng,
            // 是否逆时针, startAng-endAng的弧 的 另一半的弧， true 或false
            [anticlock]
        )
        arc(
            // 圆心、半径
            cy, cy, r,
            // 角度, 准备是填写对应的弧度，开始弧度，结束弧度， 2 * Math.PI
            startAng, endAng,
            // 是否逆时针, startAng-endAng的弧 的 另一半的弧， true 或false
            [anticlock]
        ) // 正圆怎么旋转都一样，不需要rotation; 且rx, ry 变为r

        度 0 ~ 360
        弧度 0 ~ 2 * Math.PI
        换算：
        360度 = 2 * Math.PI 弧度
        度 -> 弧度  n * Math.PI / 180
        弧度 -> 度  n * 180 / Math.PI   
```

简单上手

```md
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='icon' href='data:,'>  <!-- 空图标 -->
    <style>
        #canvas{
            margin: 0 auto;
            display: block;
            border:solid 2px skyblue;
            /* width: 500px;
            height: 400px; */
        }
    </style>
</head>
<body>
    <div>
        <canvas id="canvas" width="500" height="400"></canvas>
        <!--width,height必须是属性，否则一下就失真了-->
        <!-- <canvas id="canvas"></canvas> -->
    </div>
    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d'); // 2d:平面绘图
        // const ctx = canvas.getContext('webgl')// webgl：3d绘图
        console.log(ctx);

        // 路径，选定操作范围，很像photoshop的选择操作区域
        ctx.beginPath();

        ctx.moveTo(100, 100);
        ctx.lineTo(200, 300);
        // ctx.lineTo(100, 200)

        // ctx.beginPath()
        ctx.moveTo(100, 200);
        ctx.lineTo(200, 300)
        // ctx.lineTo(100, 200);

        ctx.lineWidth = '20';
        ctx.strokeStyle = "blue"
        // ctx.lineCap = "butt";
        ctx.lineCap = "round";
        // ctx.lineCap = "square";
        // ctx.lineJoin = "miter";
        // ctx.lineJoin = "round";
        ctx.lineJoin = 'bevel';

        // 绘图操作
        ctx.stroke(); // 边框
        ctx.strokeStyle = "red"; // 注意顺序，此处无效

        // ctx.fill(); // 填充，会自动闭合（最后一个路径点 到起点）
    </script>
</body>
</html>
```

### 渐变

```md
1.创建渐变对象
    ctx.createLinearGradient(x1, y1, x2, y2);
    ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
2.添加颜色点
    gradient.addStop(位置0-1,Sasd 颜色)
```

```md
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='icon' href='data:,'>  <!-- 空图标 -->
    <style>
        #canvas{
            margin: 0 auto;
            display: block;
            border:solid 2px skyblue;
            /* width: 500px;
            height: 400px; */
        }
    </style>
</head>
<body>
    <div>
        <canvas id="canvas" width="500" height="400"></canvas>
        <!--width,height必须是属性，否则一下就失真了-->
        <!-- <canvas id="canvas"></canvas> -->
    </div>
    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d'); // 2d:平面绘图
       
        ctx.rect(50, 50, 300, 200); // 添加路径

        // 创建放射性渐变对象
        const radial = ctx.createRadialGradient(
            100, 100, 100,
            100, 100, 50
        )
        // 添加渐变点
        radial.addColorStop(0, 'red');
        radial.addColorStop(0.6, "green");
        radial.addColorStop(1, 'blue')
        // 放射性渐变
        // ctx.fillStyle = radial;

        // 创建线性渐变对象
        const linear = ctx.createLinearGradient(
            100, 100,
            200, 100
        )
        // 添加渐变点
        linear.addColorStop(0, 'red');
        linear.addColorStop(0.6, "green");
        linear.addColorStop(1, 'blue')
        // 线性渐变
        ctx.fillStyle = linear;

        ctx.fill()
    </script>
</body>
</html>
```

### 文字

```md
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='icon' href='data:,'>  <!-- 空图标 -->
    <style>
        #canvas{
            margin: 0 auto;
            display: block;
            border:solid 2px skyblue;
            /* width: 500px;
            height: 400px; */
        }
    </style>
</head>
<body>
    <div>
        <canvas id="canvas" width="500" height="400"></canvas>
        <!--width,height必须是属性，否则一下就失真了-->
        <!-- <canvas id="canvas"></canvas> -->
    </div>
    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d'); // 2d:平面绘图
       
        ctx.font="bold italic 20px 黑体";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText('中文', 0, 0)
        ctx.fillText('中文', 250, 0) // 250宽度的一半

        const str = `黄初三年，于朝京师，换基洛川，古人有言，似水之神明月付费，敢送予对出
        国神女只是，遂作私服。其词曰，与从鲸鱼，烟鬼董藩，贝伊阙，月还原，精通古，灵镜山，
        日记喜庆，车贷玛法，而乃托架胡恒高，莫似乎织田，`
        const lines = [];
        let line = '';
        for(let s of str) {
            if (ctx.measureText(line + s).width > canvas.width) {
                lines.push(line);
                line = '';
            }
            line += s;
        }
        lines.push(line);
        // ctx.fillText(str, 0, 50)
        lines.forEach((v, k) => {
            ctx.fillText(v, canvas.width / 2, 30 * k + 50);
        })
    </script>
</body>
</html>
```

### 透明度和阴影

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); // 2d:平面绘图

ctx.globalAlpha = 0.4;
ctx.shadowColor = "red";
ctx.shadowBlur = 130;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;
ctx.rect(60, 60, 100, 100); // 添加路径，不会绘制
ctx.fill()
```

## 形状

### 矩形

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); // 2d:平面绘图

let x = 1;
setInterval(() => {
    ctx.clearRect(0, 0, 500, 400)
    ctx.beginPath()
    ctx.moveTo(x, 100);
    ctx.lineTo(200, 300);
    ctx.stroke()
    x ++;
}, 20)
```

### :star: 椭圆和半圆弧

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); // 2d:平面绘图

ctx.beginPath();
ctx.ellipse(40, 40, 20, 10, 10, 0, 2 * Math.PI, false)
ctx.stroke();
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI, true)
ctx.stroke()
```

:star: 诡异角度设计

```md
如果直接 arc() 而不设置起点，fill() 可能会从画布 (0,0) 开始填充，导致奇怪形状。

修正：在 arc() 前加 ctx.moveTo(圆心)。

Canvas 坐标系：

在 Canvas 中，坐标系的原点 (0,0) 位于左上角

X 轴向右为正方向

Y 轴向下为正方向（这与数学中常见的坐标系不同）

ctx.arc(100, 100, 100, 0, Math.PI/2, false);

圆心在 (100, 100)
半径 100
起始角度 0（对应3点钟方向）
结束角度 Math.PI/2（即90度，对应6点钟方向）
逆时针方向 (false)
记住：在Canvas中，正角度方向是顺时针，
<!-- 而数学中通常是逆时针为正方向(数学不再无敌)，这是容易混淆的地方。 -->
```

绘制饼图

```md
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='icon' href='data:,'>  <!-- 空图标 -->
    <style>
        #canvas{
            margin: 0 auto;
            display: block;
            border:solid 2px skyblue;
        }
    </style>
</head>
<body>
    <div>
        <canvas id="canvas" width="500" height="400"></canvas>
        <!--width,height必须是属性，否则一下就失真了-->
        <!-- <canvas id="canvas"></canvas> -->
    </div>
    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d'); // 2d:平面绘图
        const data = [
            {color: 'red', count: 60},
            // blue蓝色，就会看起来有黑色间隙，服了呀
            // blue蓝色，就会看起来有黑色间隙，服了呀
            // blue蓝色，就会看起来有黑色间隙，服了呀
            {color: 'yellow', count: 120}, // blue蓝色，就会看起来有黑色间隙，服了呀
            {color: 'green', count: 180},
            {color: 'orange', count: 40}
        ]
        // 画一个饼，如red
        // ctx.beginPath();
        // ctx.fillStyle = 'red';
        // ctx.moveTo(100, 100); // 设置扇形的圆心（起点）
        // ctx.arc(100, 100, 100, 0, degreeToArc(90), false);
        // ctx.fill()
        // 360度 = 2 * Math.PI
        // 180 = Math.PI;   1度 = Math.PI / 180;
        function degreeToArc(deg) {
            return Math.PI / 180 * deg;
        }
        function arcToDegree(arc) {
            return Math.PI * 180 / arc;
        }
        function drawPie(color, startAng, endAng) {
            ctx.beginPath();
            ctx.moveTo(100, 100); // 设置扇形的圆心（起点）
            ctx.arc(100, 100, 100, degreeToArc(startAng), degreeToArc(endAng), false);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill()
        }
        let allCount = data.reduce((sum, item) => sum + item.count, 0);
        console.log("🚀 ~ allCount:", allCount)
        let cur = 0;
        data.forEach((item, key) => {
            let ang = 360 * (item.count / allCount); // 当前扇形角度
            let endAng = (key === data.length - 1) ? 360 : cur + ang; // 最后一块强制闭合
            drawPie(item.color, cur, endAng);
            cur += ang;
        })
    </script>
</body>
</html>
```

### 曲线curve

```md
贝塞尔曲线
ct.moveTo(); //起点
bezierCurveTo(
    x1, y1, // 第一个控制点
    x2, y2, // 第二个控制点

    x, y // 终点
)
    大概思路
     1.起点到第一个控制点的连线
     2.第一个控制点到第二个控制点的连线
     3.第二个控制点到终点的连线
     4.如0.3，三条连线的0.3位置，进行连线，得到两条连线
     5.两条连线的0.3位置的连线，得出最终的连线。
二次曲线（quadratic二次）
quadraticCurveTo(
    x1, y1,  // 第一个控制点

    x, y
)
    大概思路
    1.起点到第一个控制点的连线
    2.第一个控制点到终点的连线
    3.如0.3，两条连线0.3位置，进行连线，得到最终的一条连线
    4.取最终的这条连线0.3的位置
```

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); // 2d:平面绘图

ctx.beginPath();
ctx.moveTo(100, 100); // 起点
ctx.bezierCurveTo(100, 300, 300, 100, 300, 300);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(300, 100);
ctx.quadraticCurveTo(400, 100, 400, 300);
ctx.stroke();
```

## 深入transform、组合变换

所有transform的原点都是左上角(0,0)，eg:scale,rotate,...

```md
transform -变形
旋转 rotate
缩放 scale
位移 translate

canvas 默认的原点是在整个canvas左上角（0,0）
    不好确定用户的图形中心，故把原点设为左上角(0,0)位置
1.transform起作用的顺序是 “反的”（会图形学，就觉得是正的） 
    图形学的算法-核心：矩阵，最晚乘，最早起作用。
2.多次transform，会叠加

调整canvas的“原点”
    1.让图形的中心和canvas的(0,0)重合
        fillRect(-w/2, -h/2, w, h);
    2.完成需要的transform
        rotate
        scale
    3.图形的位置调整回来
        translate(x + w / 2, y + h / 2)
transform叠加-清除
    方法一：完全反向操作
    方法二：最佳实践
        save() 保存：保存当前canvas的状态（不是图形）
            transform
            strokeStyle、fillStyle
            透明度、font
        restore() ；恢复
总结
    1.使用path之前-beginPath()
    2.使用transform
        save();
        
        transform ...
        
        绘制 ...

        restore();
```

```md
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='icon' href='data:,'>  <!-- 空图标 -->
    <style>
        #canvas{
            margin: 0 auto;
            display: block;
            border:solid 2px skyblue;
            background-color: pink;
        }
    </style>
</head>
<body>
    <div>
        <canvas id="canvas" width="500" height="400"></canvas>
    </div>
    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d'); // 2d:平面绘图
        
        function degreeToArc(deg) {
            return Math.PI / 180 * deg;
        }
        const x = 100, y = 100, w=100,h = 50;
        
        ctx.save();

        ctx.translate(x + w/2, y + h/ 2)
        ctx.rotate(degreeToArc(30));
        // ctx.rotate(degreeToArc(20)); // transform是叠加的，eg: rotate, scale,...
        ctx.scale(1, 2); // x的缩放比，y的缩放比
        ctx.strokeRect(-w/2, -h /2, w, h)

        ctx.restore();

        ctx.fillRect(0, 0, 50, 50);
    </script>
</body>
</html>
```

## 图片

```md
1.图片读取
    let img = new Image(); 或 createElement('img'); 或 `<img />` 
    img.src = "";
    img.onload = funciton() {}
    img.onerror = function() {}
    使用Promise优化

2.img种类
    `<img />` 和 Image
    
3.绘制
    drawImage(img, x, y);
```

## 封装自己的canvas图形库

```js
export default class ZCanvas{
    #canvas = null; // canvas的宽高，可从这获取
    #ctx = null;
    constructor(selector) {
        if (typeof selector === 'string') {
            this.#canvas = document.querySelector(selector);
        // 传入的就是canvas的dom元素
        } else if (selector && selector.tagName === 'CANVAS') {
            this.#canvas = selector;
        } else {
            throw('类型错误')
        }
        console.log(this.#canvas.width)
        this.#ctx = this.#canvas.getContext('2d');
        if (!this.#ctx) throw('不存在canvas的上下文');
        this.defaultConfig = {
            x: 0,
            y: 0,
            w: 50,
            h: 50,
            fillStyle: 'red',
            strokeStyle: 'blue',
            lineWidth: 2,
            deg: 30
        }
    }
    clear() {
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
    }
    rect(options = {}) {
        // 判断是为对象先， 
        if (typeof options !== 'object') {
            throw('传入选项有问题')
        }
        const {
            x,
            y,
            w,
            h,
            deg,
            fillStyle
        } = Object.assign(this.defaultConfig, options);
        console.log(x, y, w, h);
        this.#ctx.save();

        this.#ctx.translate(x + w / 2, y + h / 2)
        this.#ctx.rotate(this.degreeToArc(deg));

        this.#ctx.fillStyle = fillStyle
        this.#ctx.fillRect(-w/2, -h/2, w, h);
        this.#ctx.restore();

    }
    ployline(points, options = {}) {
        this.#ctx.beginPath();
        const {
            strokeStyle
        } = Object.assign(this.defaultConfig, options);
        points.forEach((v, k) => {
            const {x, y} = v;
            console.log(x, y)
            if (k === 0) {
                this.#ctx.moveTo(x, y)
            } else {
                this.#ctx.lineTo(x, y)
            }
        })
        this.#ctx.strokeStyle = strokeStyle;
        this.#ctx.stroke()

        this.#ctx.closePath();
    }
    degreeToArc(deg) {
        return Math.PI / 180 * deg;
    }
}
```

```md
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='icon' href='data:,'>  <!-- 空图标 -->
    <style>
        * {
            padding:0;
            margin: 0;
        }
        canvas{
            background-color: pink;
        }
    </style>
</head>
<body>
    <div style="display: flex;justify-content: center;height:100vh;align-items: center;">
        <canvas id="canvas1" width="1200" height="700"></canvas>
    </div>
    <script type="module">
       import ZCanvas from './zcanvas.js';
       const canvas1 = new ZCanvas("#canvas1");
       console.log("🚀 ~ canvas1:", canvas1)
       let deg = 0;
       // 示例1：
        //    canvas1.rect({x:200, y:200,deg:40});

        // 示例2：
    //    setInterval(() => {
    //         canvas1.clear();
    //         canvas1.rect({x:200, y:200,deg:deg});
    //         deg += 10;
    //    }, 100)

    // 示例三
    const points = [
        {x: 100, y: 120},
        {x: 220, y: 300},
        {x: 430, y: 240}
    ]
    canvas1.ployline(points, {})
    </script>
</body>
</html>
```


<!-- Canvas 操作像素的含义
在 HTML5 Canvas 中，"操作像素"指的是直接访问和修改画布上单个像素的颜色数据的能力。这种底层操作允许开发者实现各种高级图像处理效果。

主要概念
像素数据访问：通过 getImageData() 方法可以获取画布上指定区域的像素数据

像素数据修改：获取的像素数据可以被修改，然后通过 putImageData() 方法写回画布

像素数组结构：像素数据以 Uint8ClampedArray 形式存储，每4个元素表示一个像素(RGBA)

基本操作步骤
javascript
// 1. 获取画布上下文
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 2. 获取像素数据
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data; // 像素数据数组

// 3. 操作像素
for (let i = 0; i < data.length; i += 4) {
    // 修改红色通道
    data[i] = 255 - data[i]; // 红色通道取反
    // data[i+1] 绿色通道
    // data[i+2] 蓝色通道
    // data[i+3] alpha通道(透明度)
}

// 4. 将修改后的数据写回画布
ctx.putImageData(imageData, 0, 0);
常见应用场景
图像滤镜效果(黑白、反色、模糊等)

边缘检测和计算机视觉处理

粒子系统和特殊效果

自定义图像合成

性能敏感的图形操作

像素级操作虽然强大，但由于涉及大量数据计算，可能会影响性能，特别是在大画布上操作时需要注意优化。 -->


## canvas

### 常见API

* getContext: 获取渲染上下文
* fillStyle:画笔颜色
* clearRect(4个坐标)：清除指定矩形区域，让清除部分完全透明。
* fillRect(4个坐标)：从哪个坐标点绘制多少宽多少高的形状，绘制矩形区域
* strokeRect(4个坐标)：类似fillRect,这里是绘制矩形边框
* strokeStyle：边框颜色
* beginPath():开始绘制路线
* moveTo(两个坐标)：画笔移动到哪个（x,y）坐标
* lineTo(两个坐标)：绘制一条从当前位置到指定 x 以及 y 位置的直线。
* fill():填充绘制
* stroke():描边绘制
* closePath(): 关闭绘制路线

### 简单学习API

```js
<script setup lang="ts">
import { onMounted, ref } from 'vue';
const canvas = ref()
onMounted(() => {
    // 获取绘制上下文
    const ctx = canvas.value.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 200);
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.font = "36px serif";
    ctx.fillText("My name is Mary Alice Young", 100, 200);
    // canvas是位图，需要处理缩放的问题，很多 图画 * 2 或者 * 3
    // svg 是矢量图
    // 如何获取浏览器设备的像素比
    console.log(window.devicePixelRatio) // 2
    
    ctx.closePath();
})
</script>
<template>
    <canvas ref="canvas" class="canvas-box" width="600" height="500"></canvas>
</template>

<style lang="scss" scoped>
.canvas-box {
    width: 300px;
    height: 250px;
}
</style>
```

```js
<canvas id="cavnasArea"></canvas>

const canvasBox = document.getElementById('cavnasArea')
if (canvasBox.getContext) {
  const ctx = canvasBox.getContext("2d");
  ctx.beginPath();  
  ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
  ctx.moveTo(110, 75);
  ctx.arc(75, 75, 35, 0, Math.PI, false); // 口 (顺时针)
  ctx.moveTo(65, 65);
  ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // 左眼
  ctx.moveTo(95, 65);
  ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // 右眼
  // ctx.fill();
  ctx.stroke();
}
```

## 可视化

### 选型

* echarts: ECharts ≈ ZRender + 图表封装 + 交互配置
* zrender
* d3

#### canvasTable

```js
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
const canvas = ref()
const pixelRatio = 2;
const handleClick = (e) => {
    const {left, top} = canvas.value.getBoundingClientRect();
    const x = e.clientX - left;// 相对于画布左边的距离
    const y = e.clientY - top;
    console.log(x, y)
}

onMounted(() => {
    canvas.value.addEventListener('click', handleClick)
    // 获取绘制上下文
    const ctx = canvas.value.getContext('2d');

    ctx.beginPath();
    ctx.closePath();
})
onUnmounted(() => {
    canvas.value.removeEventListener('click');
})
</script>
<template>
    <canvas ref="canvas" class="canvas-box" width="600" height="500"></canvas>
</template>

<style lang="scss" scoped>
.canvas-box {
    background-color: skyblue;
    width: 300px;
    height: 250px;
}
</style>
```

### canvas 渲染很多数据的优化

#### 将静态元素与动态元素分离渲染，减少重复绘制：

```js
// 创建多个Canvas分层
const staticCanvas = document.createElement('canvas');
const dynamicCanvas = document.createElement('canvas');

// 静态层只渲染一次
function renderStaticLayer() {
  const ctx = staticCanvas.getContext('2d');
  // 绘制背景、网格等不变元素
}

// 动态层频繁更新
function renderDynamicLayer(data) {
  const ctx = dynamicCanvas.getContext('2d');
  ctx.clearRect(0, 0, width, height); // 只清除动态内容
  // 绘制点、线等动态数据
}
```

#### 视口渲染

####  批量绘制与 requestAnimationFrame

```js
let frameRequested = false;
let dataToDraw = [];

function enqueueDraw(item) {
  dataToDraw.push(item);
  if (!frameRequested) {
    frameRequested = true;
    requestAnimationFrame(drawAll);
  }
}

function drawAll() {
  // 批量绘制所有待处理数据
  dataToDraw.forEach(item => drawItem(item));
  dataToDraw = [];
  frameRequested = false;
}
```

#### 硬件加速

利用 CSS transform 触发 GPU 加速：

```css
canvas {
  transform: translateZ(0);
  will-change: transform;
}
```
