/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var svg = Snap("#svg");
var paper = svg.paper;

var W = document.documentElement.clientWidth;
var H = document.documentElement.clientHeight;
// 中心点的坐标
var centerX = W / 2;
var centerY = H / 2 - 120;

// 钻石的偏移量（以最上方钻石为例）
var MAX_X = 55,
    MID_X = 28,
    MIN_X = 25,
    MAX_Y = 95,
    MID_Y = 35;
var a = 1; // 细调常量

var global = {
    svg: {
        svg: svg,
        paper: paper
    },
    main: {
        centerX: centerX,
        centerY: centerY
    },
    diamond: {
        MAX_X: MAX_X,
        MID_X: MID_X,
        MIN_X: MIN_X,
        MAX_Y: MAX_Y,
        MID_Y: MID_Y,
        a: a
    }
};

module.exports = global;

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lights = __webpack_require__(9);

var _lights2 = _interopRequireDefault(_lights);

var _diamonds = __webpack_require__(10);

var _diamonds2 = _interopRequireDefault(_diamonds);

var _global = __webpack_require__(2);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var svg = _global2.default.svg.svg;
var _global$main = _global2.default.main,
    centerX = _global$main.centerX,
    centerY = _global$main.centerY;


var perDegree = 360 / 5;

/**
 * 定义绘制
 */

// 闪光组
var lightsGroup = (0, _lights2.default)();

// 钻石组
var diamondsGroup = (0, _diamonds2.default)();

/**
 * 实际操作
 */

// use 钻石
for (var i = 0; i < 5; i++) {
    var use_diamondsGroup = diamondsGroup.use().attr({
        class: "diamond",
        x: 0,
        y: 0,
        transform: 'rotate(' + perDegree * i + ', ' + centerX + ', ' + centerY + ')'
    });
    svg.append(use_diamondsGroup);
}

// 路径动画
var diamond_collection = svg.selectAll(".diamond");
var pathAnim_complete = false; // 路径动画完成的标志
Array.from(diamond_collection, function (v, i) {
    Snap.animate(-100, 0, function (val) {
        v.attr({
            transform: 'rotate(' + perDegree * i + ', ' + centerX + ', ' + centerY + ') translate(0, ' + val + ')'
        });
    }, 1500, function () {
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

var shining_collection = svg.selectAll(".shining");

// 原地闪光
function shineInPlace() {
    shining_collection[0].animate({
        transform: 'translate(557, 250) scale(1.5) translate(-557, -250)'
    }, 400, mina.easein, function () {
        this.animate({
            transform: 'translate(557, 250) scale(1) translate(-557, -250)'
        }, 400, mina.easein, function () {
            shineInPlace();
        });
    });
}
// 太闪了，休息一下
// shineInPlace();

var line_collection = svg.selectAll(".line");
// 线条动画 

// 获取每条路径的长度， 并且设置stroke-dasharray、stroke-dashoffset的值
Array.from(line_collection, function (v) {
    var totalLength = v.getTotalLength();
    v.attr({
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength
    });
});

function lineAnim() {
    line_collection[0].animate({
        strokeDashoffset: 0
    }, 1200, function () {
        line_collection[1].animate({
            strokeDashoffset: 0
        }, 1000, function () {
            line_collection[2].animate({
                strokeDashoffset: 0
            }, 600, function () {
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

var timer = setInterval(function () {
    if (pathAnim_complete) {
        lineAnim();
        clearInterval(timer);
    }
}, 100);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(2);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paper = _global2.default.svg.paper;


var blurry = paper.filter(Snap.filter.blur(5));

module.exports = function () {
    /**
     * 闪光组
     */
    var lightsGroup = paper.g().attr({
        id: "shine"
    });

    // 光晕
    var halo = paper.circle(0, 0, 5).attr({
        fill: "url(#radial)",
        filter: blurry
    });

    // 发光线
    for (var i = 0; i < 4; i++) {
        var lightLine = paper.ellipse(0, 0, i % 2 == 0 ? 10 : 9, 0.3).attr({
            fill: "url(#linear)",
            transform: "scale(4) rotate(" + i * 45 + ")"
        });
        lightsGroup.add(lightLine);
    }

    lightsGroup.add(halo).toDefs();

    return lightsGroup;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _global = __webpack_require__(2);

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var svg = _global2.default.svg,
    main = _global2.default.main,
    diamond = _global2.default.diamond;
var paper = svg.paper;
var centerX = main.centerX,
    centerY = main.centerY;
var MAX_X = diamond.MAX_X,
    MID_X = diamond.MID_X,
    MIN_X = diamond.MIN_X,
    MAX_Y = diamond.MAX_Y,
    MID_Y = diamond.MID_Y,
    a = diamond.a;


module.exports = function () {
    /**
     * 钻石组
     */
    var diamondsGroup = paper.g().attr({
        id: "diamond"
    });

    // 钻石填充

    var diamondFill = paper.polygon([centerX, centerY, centerX - MAX_X, centerY - MAX_Y, centerX - MAX_X + MIN_X, centerY - MAX_Y - MID_Y, centerX + MIN_X, centerY - MAX_Y - MID_Y, centerX + MIN_X * 2, centerY - MAX_Y]).attr({
        style: "fill: inherit; stroke: transparent"
    });

    diamondsGroup.add(diamondFill).toDefs();

    // 钻石线条
    var line1 = "M" + (centerX - MAX_X + a) + " " + (centerY - MAX_Y) + " L" + (centerX - MAX_X + MIN_X - a) + " " + (centerY - MAX_Y) + "\n                L" + centerX + " " + (centerY - a) + " L" + (centerX + MIN_X + a) + " " + (centerY - MAX_Y) + "\n                L" + (centerX + MIN_X * 2 - a) + " " + (centerY - MAX_Y),
        line2 = "M" + (centerX - MAX_X + MIN_X) + " " + (centerY - MAX_Y - MID_Y + a) + " \n                L" + (centerX - MAX_X + MIN_X + MID_X) + " " + (centerY - MAX_Y - a) + "\n                L" + (centerX - MAX_X + MIN_X + MID_X * 2) + " " + (centerY - MAX_Y - MID_Y + a),
        line3 = "M" + (centerX - MAX_X + MIN_X + MID_X) + " " + (centerY - MAX_Y) + " L" + centerX + " " + (centerY - 2),
        line4 = "M" + (centerX - MAX_X + MIN_X + MID_X - a) + " " + (centerY - MAX_Y) + "\n                L" + (centerX - MAX_X + MIN_X) + " " + (centerY - MAX_Y),
        line5 = "M" + (centerX - MAX_X + MIN_X + MID_X - a) + " " + (centerY - MAX_Y) + "\n                L" + (centerX + MIN_X + a) + " " + (centerY - MAX_Y);

    // 加入数组
    var lines = new Array();
    lines.push(line1, line2, line3, line4, line5);

    lines.map(function (v) {
        var diamondLine = paper.path(v).attr({
            class: "line"
        });
        diamondsGroup.add(diamondLine);
    });

    return diamondsGroup;
};

/***/ })
/******/ ]);
//# sourceMappingURL=transfer.js.map