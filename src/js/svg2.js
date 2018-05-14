import Light from './class/light';

const W = document.documentElement.clientWidth;
const H = document.documentElement.clientHeight;
// 中心点的坐标
const centerX = W / 2;
const centerY = H / 2 - 120;

const SVG_NS = 'http://www.w3.org/2000/svg';
const XLINK_NS = 'http://www.w3.org/1999/xlink';

// 钻石的偏移量（以最上方钻石为例）
const MAX_X = 55,
    MID_X = 28,
    MIN_X = 25,
    MAX_Y = 95,
    MID_Y = 35;
const a = 1; // 细调常量

/**
 * 直线路径动画
 */
var deltaY, deltaY2, deltaY3, deltaY4, deltaY5;
deltaY = deltaY2 = deltaY3 = deltaY4 = deltaY5 = -400;
let deltaY6 = -500;

let bool = false;
const perDegree = 360 / 5;
const dy = 8;

// 绘制钻石
drawDiamond();

/**
 * 闪光（lignt them on）
 */


// 渲染闪光
let lights = new Light(8);

/**
 * 帧渲染
 */
function frame() {

    pathAnim(); // 路劲动画
    requestAnimationFrame(frame);
}

frame();

lights.lighting();
// 特殊处理
let time = setInterval(function() {
    lights.lighting(); // 闪光
}, 115);

// 布局文字
$(".htc-text").css("margin-top", centerY + 150);


/**
 * helper
 */

// 绘制钻石
function drawDiamond() {
    let contour_points = `${centerX} ${centerY}, ${ centerX - MAX_X } ${ centerY - MAX_Y }, 
                ${ centerX - MAX_X + MIN_X } ${ centerY - MAX_Y - MID_Y }, ${ centerX + MIN_X } ${ centerY - MAX_Y - MID_Y },
                ${ centerX + MIN_X * 2 } ${ centerY - MAX_Y }`;
    let line1_points = `M${ centerX - MAX_X + a } ${ centerY - MAX_Y } L${ centerX - MAX_X + MIN_X - a } ${ centerY - MAX_Y }
                        L${centerX} ${centerY - a} L${ centerX + MIN_X + a } ${ centerY - MAX_Y }
                        L${ centerX + MIN_X * 2 - a } ${ centerY - MAX_Y }`;
    let line2_points = `M${ centerX - MAX_X + MIN_X } ${ centerY - MAX_Y - MID_Y + a } 
                        L${ centerX - MAX_X + MIN_X + MID_X } ${ centerY - MAX_Y - a }
                        L${ centerX - MAX_X + MIN_X + MID_X * 2 } ${ centerY - MAX_Y - MID_Y + a }`;
    let line3_points = `M${ centerX - MAX_X + MIN_X + MID_X } ${ centerY - MAX_Y }
                        L${centerX} ${centerY - 2}`;
    let line4_points = `M${ centerX - MAX_X + MIN_X + MID_X - a } ${ centerY - MAX_Y }
                        L${ centerX - MAX_X + MIN_X } ${ centerY - MAX_Y }`;
    let line5_points = `M${ centerX - MAX_X + MIN_X + MID_X - a } ${ centerY - MAX_Y }
                        L${ centerX + MIN_X + a } ${ centerY - MAX_Y }`;

    contour.setAttribute('points', contour_points);
    line1.setAttribute('d', line1_points);
    line2.setAttribute('d', line2_points);
    line3.setAttribute('d', line3_points);
    line4.setAttribute('d', line4_points);
    line5.setAttribute('d', line5_points);
}

// 偏移钻石
function translateDiamond(diamond, ty, degrees, callback, x = centerX, y = centerY) {
    diamond.setAttribute('transform', `rotate(${degrees},${x},${y}) translate(0,${ty})`);
}

// 旋转钻石
function rotate(x, y) {
    let rotate = document.createElement('animateTransform');
    rotate.setAttribute('attributeName', 'transform');
    rotate.setAttribute('attributeType', 'XML');
    rotate.setAttribute('type', 'rotate');
    rotate.setAttribute('from', `0 ${x} ${y}`);
    rotate.setAttribute('to', `360 ${x} ${y}`);
    rotate.setAttribute('dur', '5s');
    rotate.setAttribute('repeatCount', 'indefinite');
    let diamonds = document.getElementById('diamonds');
    diamonds.appendChild(rotate);
}


// 路劲动画
function pathAnim() {

    if (deltaY) {
        deltaY += dy;
    } else {
        // 路径动画完成，执行文本动画
        $(".htc-text").addClass("anim-slideUpIn");
        setTimeout(function() {
            $(".lang-box").addClass("anim-slideUpIn");
        }, 500);
    }
    translateDiamond(diamond1, deltaY, 0);
    translateDiamond(diamond2, deltaY, perDegree);
    translateDiamond(diamond3, deltaY, perDegree * 2);
    translateDiamond(diamond4, deltaY, perDegree * 3);
    translateDiamond(diamond5, deltaY, perDegree * 4);

}