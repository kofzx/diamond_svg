let svg = Snap("#svg");

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

// 模糊
let filter = svg.paper.filter('<feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />');

/**
 * 闪光组
 */
let lightsGroup = svg.paper.g().attr({
    id: "shine"
});

// 光晕
let halo = svg.paper.circle(0, 0, 5).attr({
    fill: "url(#radial)",
    filter: "url(#filter)"
});

// 发光线
for(let i = 0; i < 4; i++) {
    let lightLine = svg.paper.ellipse(0, 0, i % 2 == 0 ? 10 : 9 , 0.3).attr({
        fill: "url(#linear)",
        transform: `scale(4) rotate(${i * 45})`
    });
    lightsGroup.add(lightLine);
}

lightsGroup.add(halo).toDefs();

/**
 * 钻石组
 */
let diamondsGroup = svg.paper.g().attr({
    id: "diamond"
});

// 钻石填充

let diamondFill = svg.paper.polygon([centerX, centerY, centerX - MAX_X, centerY - MAX_Y, 
    centerX - MAX_X + MIN_X, centerY - MAX_Y - MID_Y, centerX + MIN_X, centerY - MAX_Y - MID_Y,
    centerX + MIN_X * 2, centerY - MAX_Y]).attr({
    fill: "inherit",
    stroke: "transparent"
});

// 钻石线条
const line1 = `M${ centerX - MAX_X + a } ${ centerY - MAX_Y } L${ centerX - MAX_X + MIN_X - a } ${ centerY - MAX_Y }
                L${centerX} ${centerY - a} L${ centerX + MIN_X + a } ${ centerY - MAX_Y }
                L${ centerX + MIN_X * 2 - a } ${ centerY - MAX_Y }`,
      line2 = `M${ centerX - MAX_X + MIN_X } ${ centerY - MAX_Y - MID_Y + a } 
                L${ centerX - MAX_X + MIN_X + MID_X } ${ centerY - MAX_Y - a }
                L${ centerX - MAX_X + MIN_X + MID_X * 2 } ${ centerY - MAX_Y - MID_Y + a }`,
      line3 = `M${ centerX - MAX_X + MIN_X + MID_X } ${ centerY - MAX_Y } L${centerX} ${centerY - 2}`,
      line4 = `M${ centerX - MAX_X + MIN_X + MID_X - a } ${ centerY - MAX_Y }
                L${ centerX - MAX_X + MIN_X } ${ centerY - MAX_Y }`,
      line5 = `M${ centerX - MAX_X + MIN_X + MID_X - a } ${ centerY - MAX_Y }
                L${ centerX + MIN_X + a } ${ centerY - MAX_Y }`;

let lines = new Array();
lines.push(line1, line2, line3, line4, line5);

lines.map(v => {
    let diamondLine = svg.paper.path(v).attr({
        class: "line"
    });
    diamondsGroup.add(diamondLine);
});

diamondsGroup.add(diamondFill).toDefs();