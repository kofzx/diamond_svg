import lights from './defs/lights'
import diamonds from './defs/diamonds'
import filter from './defs/filter'
import global from './global/global'
let { svg } = global.svg;
let { centerX, centerY } = global.main;

const perDegree = 360 / 5;

/**
 * 定义绘制
 */

// 模糊
filter();

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
Array.from(diamond_collection, (v, i) => {
    Snap.animate(-100, 0, function(val) {
        v.attr({
            transform: `rotate(${perDegree * i}, ${centerX}, ${centerY}) translate(0, ${val})`
        });
    }, 1500);
});