let svg = Snap("#svg");
let paper = svg.paper;

const W = document.documentElement.clientWidth;
const H = document.documentElement.clientHeight;
// 中心点的坐标
const centerX = W / 2;
const centerY = H / 2 - 120;

// 钻石的偏移量（以最上方钻石为例）
const MAX_X = 55,
    MID_X = 28,
    MIN_X = 25,
    MAX_Y = 95,
    MID_Y = 35;
const a = 1; // 细调常量

let global = {
    svg: {
        svg,
        paper
    },
    main: {
        centerX,
        centerY
    },
    diamond: {
        MAX_X,
        MID_X,
        MIN_X,
        MAX_Y,
        MID_Y,
        a
    }
}

module.exports = global;