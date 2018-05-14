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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var svg = Snap("#svg");

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

// 模糊
var filter = svg.paper.filter('<feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />');

/**
 * 闪光组
 */
var lightsGroup = svg.paper.g().attr({
    id: "shine"
});

// 光晕
var halo = svg.paper.circle(0, 0, 5).attr({
    fill: "url(#radial)",
    filter: "url(#filter)"
});

// 发光线
for (var i = 0; i < 4; i++) {
    var lightLine = svg.paper.ellipse(0, 0, i % 2 == 0 ? 10 : 9, 0.3).attr({
        fill: "url(#linear)",
        transform: "scale(4) rotate(" + i * 45 + ")"
    });
    lightsGroup.add(lightLine);
}

lightsGroup.add(halo).toDefs();

/**
 * 钻石组
 */
var diamondsGroup = svg.paper.g().attr({
    id: "diamond"
});

// 钻石填充

var diamondFill = svg.paper.polygon([centerX, centerY, centerX - MAX_X, centerY - MAX_Y, centerX - MAX_X + MIN_X, centerY - MAX_Y - MID_Y, centerX + MIN_X, centerY - MAX_Y - MID_Y, centerX + MIN_X * 2, centerY - MAX_Y]).attr({
    fill: "inherit",
    stroke: "transparent"
});

// 钻石线条
var line1 = "M" + (centerX - MAX_X + a) + " " + (centerY - MAX_Y) + " L" + (centerX - MAX_X + MIN_X - a) + " " + (centerY - MAX_Y) + "\n                L" + centerX + " " + (centerY - a) + " L" + (centerX + MIN_X + a) + " " + (centerY - MAX_Y) + "\n                L" + (centerX + MIN_X * 2 - a) + " " + (centerY - MAX_Y),
    line2 = "M" + (centerX - MAX_X + MIN_X) + " " + (centerY - MAX_Y - MID_Y + a) + " \n                L" + (centerX - MAX_X + MIN_X + MID_X) + " " + (centerY - MAX_Y - a) + "\n                L" + (centerX - MAX_X + MIN_X + MID_X * 2) + " " + (centerY - MAX_Y - MID_Y + a),
    line3 = "M" + (centerX - MAX_X + MIN_X + MID_X) + " " + (centerY - MAX_Y) + " L" + centerX + " " + (centerY - 2),
    line4 = "M" + (centerX - MAX_X + MIN_X + MID_X - a) + " " + (centerY - MAX_Y) + "\n                L" + (centerX - MAX_X + MIN_X) + " " + (centerY - MAX_Y),
    line5 = "M" + (centerX - MAX_X + MIN_X + MID_X - a) + " " + (centerY - MAX_Y) + "\n                L" + (centerX + MIN_X + a) + " " + (centerY - MAX_Y);

var lines = new Array();
lines.push(line1, line2, line3, line4, line5);

lines.map(function (v) {
    var diamondLine = svg.paper.path(v).attr({
        class: "line"
    });
    diamondsGroup.add(diamondLine);
});

diamondsGroup.add(diamondFill).toDefs();

/***/ })

/******/ });
//# sourceMappingURL=transfer.js.map