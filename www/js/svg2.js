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
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _toolkit = __webpack_require__(1);

var _toolkit2 = _interopRequireDefault(_toolkit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var random = _toolkit2.default.random;


var W = document.documentElement.clientWidth;
var H = document.documentElement.clientHeight;
// 中心点的坐标
var centerX = W / 2;
var centerY = H / 2 - 120;

// 定义常用调试数值
var X_OFFSET = 70,
    Y_OFFSET = 30;

var shining = document.getElementById('shining');
var shine = document.getElementById('shine');

// 闪光类

var Light = function () {
    function Light(count) {
        _classCallCheck(this, Light);

        // 属性
        this.info = {};

        // 生成对象
        this.render(count);
        // 获取信息
        this.getInfo();
    }
    // 闪光


    _createClass(Light, [{
        key: 'lighting',
        value: function lighting() {
            var ds_tmp = 0.2;
            var ds = ds_tmp;
            // 遍历info对象
            var entries = Object.entries(this.info);
            var light = void 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2),
                        k = _step$value[0],
                        v = _step$value[1];

                    light = document.getElementById(k);

                    // 判断scale
                    if (v.scale >= random(0.5, 0.6)) {
                        ds = -1 * ds;
                    } else if (v.scale <= random(0.3, 0.5)) {
                        ds = ds_tmp;
                    }
                    v.scale += ds;

                    light.setAttribute('transform', 'translate(' + v.x + ',' + v.y + ') scale(' + v.scale + ') translate(' + -v.x + ',' + -v.y + ')');
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        // 渲染对象

    }, {
        key: 'render',
        value: function render(count) {
            var light = void 0;

            var xArray = Array.from({ length: count }, function (v, i) {
                return (i + 1) * X_OFFSET;
            });
            var yArray = Array.from({ length: count }, function (v, i) {
                return (i + 1) * Y_OFFSET;
            });

            while (count--) {
                light = _toolkit2.default.use(shine);
                light.id = 'light' + count;

                light.setAttribute('x', random(centerX - xArray[count], centerX + xArray[count]));
                light.setAttribute('y', random(centerY - yArray[count], centerY + yArray[count]));
                // 添加随机缩放大小
                light.setAttribute('transform', 'translate(' + random(centerX - xArray[count], centerX + xArray[count]) + ',' + random(centerY - yArray[count], centerY + yArray[count]) + ') scale(' + random(0.6, 0.8) + ') translate(' + -random(centerX - xArray[count], centerX + xArray[count]) + ',' + -random(centerY - yArray[count], centerY + yArray[count]) + ')');

                shining.appendChild(light);
            }
        }

        // 生成一定数量的随机数

    }, {
        key: 'getRand',
        value: function getRand(count, min, max) {
            var arr = new Array();
            var bool = true;
            for (var i = 0; i < count; i++) {
                arr[i] = random(min, max);
            }
            // 进行检测处理
            for (var _i = 0; _i < arr.length - 1; _i++) {
                for (var j = _i + 1; j < arr.length; j++) {
                    if (Math.abs(arr[_i] - arr[j]) < 50) {
                        bool = false;
                    }
                }
            }
            if (!bool) this.getRand(count, min, max);
            return arr;
        }

        // 对随机数 数组进行处理

    }, {
        key: 'randFactor',
        value: function randFactor(arr) {
            for (var i = 0; i < arr.length - 1; i++) {
                for (var j = i + 1; j < arr.length; j++) {
                    if (Math.abs(arr[i] - arr[j]) < 50) break;
                }
            }
            return arr;
        }

        // 获取信息

    }, {
        key: 'getInfo',
        value: function getInfo() {
            var _this = this;

            var list = shining.children;
            Array.from(list, function (v) {
                var id = v.id;
                var x = v.getAttribute('x');
                var y = v.getAttribute('y');
                var transform = v.getAttribute('transform');
                // 提取字符串中的scale值
                var scale = _this.extractScale(transform);
                // 储存到this.info对象中
                _this.info[id] = {};
                _this.info[id]['id'] = id;
                _this.info[id]['x'] = x;
                _this.info[id]['y'] = y;
                _this.info[id]['scale'] = scale;
            });
        }

        // 提取scale值

    }, {
        key: 'extractScale',
        value: function extractScale(transform) {
            // 提取transform字符串中的scale
            var str = transform.split('scale(');
            var newStr = str[1];
            var finalIndex = newStr.indexOf(')');
            var finalStr = newStr.substring(0, finalIndex);
            var finalStr_float = parseFloat(finalStr);

            return finalStr_float;
        }
    }]);

    return Light;
}();

module.exports = Light;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toolkit = {

    // 随机数
    random: function random(min, max) {
        return min + (max - min) * Math.random();
    },

    // 创建use标签
    use: function use(origin) {
        var SVG_NS = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'http://www.w3.org/2000/svg';
        var XLINK_NS = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'http://www.w3.org/1999/xlink';

        var _use = document.createElementNS(SVG_NS, 'use');
        _use.setAttributeNS(XLINK_NS, 'xlink:href', '#' + origin.id);
        return _use;
    }
};

module.exports = toolkit;

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _light = __webpack_require__(0);

var _light2 = _interopRequireDefault(_light);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var W = document.documentElement.clientWidth;
var H = document.documentElement.clientHeight;
// 中心点的坐标
var centerX = W / 2;
var centerY = H / 2 - 120;

var SVG_NS = 'http://www.w3.org/2000/svg';
var XLINK_NS = 'http://www.w3.org/1999/xlink';

// 钻石的偏移量（以最上方钻石为例）
var MAX_X = 55,
    MID_X = 28,
    MIN_X = 25,
    MAX_Y = 95,
    MID_Y = 35;
var a = 1; // 细调常量

/**
 * 直线路径动画
 */
var deltaY, deltaY2, deltaY3, deltaY4, deltaY5;
deltaY = deltaY2 = deltaY3 = deltaY4 = deltaY5 = -400;
var deltaY6 = -500;

var bool = false;
var perDegree = 360 / 5;
var dy = 8;

// 绘制钻石
drawDiamond();

/**
 * 闪光（lignt them on）
 */

// 渲染闪光
var lights = new _light2.default(8);

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
var time = setInterval(function () {
    lights.lighting(); // 闪光
}, 115);

// 布局文字
$(".htc-text").css("margin-top", centerY + 150);

/**
 * helper
 */

// 绘制钻石
function drawDiamond() {
    var contour_points = centerX + ' ' + centerY + ', ' + (centerX - MAX_X) + ' ' + (centerY - MAX_Y) + ', \n                ' + (centerX - MAX_X + MIN_X) + ' ' + (centerY - MAX_Y - MID_Y) + ', ' + (centerX + MIN_X) + ' ' + (centerY - MAX_Y - MID_Y) + ',\n                ' + (centerX + MIN_X * 2) + ' ' + (centerY - MAX_Y);
    var line1_points = 'M' + (centerX - MAX_X + a) + ' ' + (centerY - MAX_Y) + ' L' + (centerX - MAX_X + MIN_X - a) + ' ' + (centerY - MAX_Y) + '\n                        L' + centerX + ' ' + (centerY - a) + ' L' + (centerX + MIN_X + a) + ' ' + (centerY - MAX_Y) + '\n                        L' + (centerX + MIN_X * 2 - a) + ' ' + (centerY - MAX_Y);
    var line2_points = 'M' + (centerX - MAX_X + MIN_X) + ' ' + (centerY - MAX_Y - MID_Y + a) + ' \n                        L' + (centerX - MAX_X + MIN_X + MID_X) + ' ' + (centerY - MAX_Y - a) + '\n                        L' + (centerX - MAX_X + MIN_X + MID_X * 2) + ' ' + (centerY - MAX_Y - MID_Y + a);
    var line3_points = 'M' + (centerX - MAX_X + MIN_X + MID_X) + ' ' + (centerY - MAX_Y) + '\n                        L' + centerX + ' ' + (centerY - 2);
    var line4_points = 'M' + (centerX - MAX_X + MIN_X + MID_X - a) + ' ' + (centerY - MAX_Y) + '\n                        L' + (centerX - MAX_X + MIN_X) + ' ' + (centerY - MAX_Y);
    var line5_points = 'M' + (centerX - MAX_X + MIN_X + MID_X - a) + ' ' + (centerY - MAX_Y) + '\n                        L' + (centerX + MIN_X + a) + ' ' + (centerY - MAX_Y);

    contour.setAttribute('points', contour_points);
    line1.setAttribute('d', line1_points);
    line2.setAttribute('d', line2_points);
    line3.setAttribute('d', line3_points);
    line4.setAttribute('d', line4_points);
    line5.setAttribute('d', line5_points);
}

// 偏移钻石
function translateDiamond(diamond, ty, degrees, callback) {
    var x = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : centerX;
    var y = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : centerY;

    diamond.setAttribute('transform', 'rotate(' + degrees + ',' + x + ',' + y + ') translate(0,' + ty + ')');
}

// 旋转钻石
function rotate(x, y) {
    var rotate = document.createElement('animateTransform');
    rotate.setAttribute('attributeName', 'transform');
    rotate.setAttribute('attributeType', 'XML');
    rotate.setAttribute('type', 'rotate');
    rotate.setAttribute('from', '0 ' + x + ' ' + y);
    rotate.setAttribute('to', '360 ' + x + ' ' + y);
    rotate.setAttribute('dur', '5s');
    rotate.setAttribute('repeatCount', 'indefinite');
    var diamonds = document.getElementById('diamonds');
    diamonds.appendChild(rotate);
}

// 路劲动画
function pathAnim() {

    if (deltaY) {
        deltaY += dy;
    } else {
        // 路径动画完成，执行文本动画
        $(".htc-text").addClass("anim-slideUpIn");
        setTimeout(function () {
            $(".lang-box").addClass("anim-slideUpIn");
        }, 500);
    }
    translateDiamond(diamond1, deltaY, 0);
    translateDiamond(diamond2, deltaY, perDegree);
    translateDiamond(diamond3, deltaY, perDegree * 2);
    translateDiamond(diamond4, deltaY, perDegree * 3);
    translateDiamond(diamond5, deltaY, perDegree * 4);
}

/***/ })
/******/ ]);
//# sourceMappingURL=svg2.js.map