import lights from './defs/lights'
import diamonds from './defs/diamonds'
import global from './global/global'
let { svg } = global.svg;
let { centerX, centerY } = global.main;

const perDegree = 360 / 5;

/**
 * 定义绘制
 */

// 闪光组
let lightsGroup = lights();

// 钻石组
let diamondsGroup = diamonds();

/**
 * 实际操作
 */

// use 钻石
for (let i = 0; i < 5; i++) {
    let use_diamondsGroup = diamondsGroup.use().attr({
        class: "diamond",
        x: 0,
        y: 0,
        transform: `rotate(${perDegree * i}, ${centerX}, ${centerY})`
    });
    svg.append(use_diamondsGroup);
}

// 路径动画
let diamond_collection = svg.selectAll(".diamond");
let pathAnim_complete = false;  // 路径动画完成的标志
Array.from(diamond_collection, (v, i) => {
    Snap.animate(-100, 0, function(val) {
        v.attr({
            transform: `rotate(${perDegree * i}, ${centerX}, ${centerY}) translate(0, ${val})`
        });
    }, 1500, function() {
        pathAnim_complete = true;
    });
});

// use 闪光
// let use_lightsGroup = lightsGroup.use().attr({
//     class: "shining",
//     x: 557,
//     y: 250
// });
// svg.append(use_lightsGroup);

let shining_collection = svg.selectAll(".shining");

// 原地闪光
function shineInPlace() {
    shining_collection[0].animate({
        transform: `translate(557, 250) scale(1.5) translate(-557, -250)`
    }, 400, mina.easein, function() {
        this.animate({
            transform: `translate(557, 250) scale(1) translate(-557, -250)`
        }, 400, mina.easein, function() {
            shineInPlace();
        });
    });
}
// 太闪了，休息一下
// shineInPlace();

let line_collection = svg.selectAll(".line");
// 线条动画 

// 获取每条路径的长度， 并且设置stroke-dasharray、stroke-dashoffset的值
Array.from(line_collection, v => {
    let totalLength = v.getTotalLength();
    v.attr({
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength
    });
});

function lineAnim() {
    line_collection[0].animate({
        strokeDashoffset: 0
    }, 1200, function() {
        line_collection[1].animate({
            strokeDashoffset: 0
        }, 1000, function() {
            line_collection[2].animate({
                strokeDashoffset: 0
            }, 600, function() {
                line_collection[3].animate({
                     strokeDashoffset: 0
                }, 500);
                line_collection[4].animate({
                     strokeDashoffset: 0
                }, 500);
            });
        });
    });
}

let timer = setInterval(function() {
    if(pathAnim_complete) {
        lineAnim();
        clearInterval(timer);
    }
}, 100);
