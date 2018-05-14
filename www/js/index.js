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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _header = __webpack_require__(3);

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _header2.default)();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(4);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var showSec = _utils2.default.commonFunction.showSec;

function header() {
    /*=================== Sticky Header  ===================*/
    if ($(".stickMain").hasClass('stick')) {
        var header_top = $(".stickMain.stick").offset().top;
    }
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > header_top) {
            $(".stickMain.stick").addClass("sticky");
        } else {
            $(".stickMain.stick").removeClass("sticky");
        }
    });

    /*=================== 导航交互 ===================*/
    $("nav#navigation ul.first-level > li").each(function () {
        $(this).hover(function () {
            // 显示二级导航
            showSec($(this), "second-wrapper", "flex");
        }, function () {
            $(this).find(".second-wrapper").velocity({ opacity: 0 }, { display: "none" });
        });
    });

    /**
     * 二维码切换
     */
    var $code = $("[data-code='code']");
    var $real = $("[data-code='real']");
    var bool = false;

    $code.click(function (e) {
        if (!bool) {
            $real.velocity("transition.slideUpIn", { duration: 300 });
        } else {
            $real.velocity("transition.slideUpOut", { duration: 600 });
        }
        bool = !bool;
    });

    /*=================== 手机导航交互 ===================*/
    $("nav#mobileNav ul.first-level > li > a").each(function () {
        var _this = this;

        $(this).click(function (e) {
            var $secondLevel = $(_this).next(".second-level");

            if ($secondLevel.css("display") === "none") {
                $secondLevel.velocity({ opacity: 1 }, { duration: 200, display: "block" });
            } else {
                $secondLevel.hide();
            }
        });
    });

    /**
     * 手机切换视图效果
     */
    $("#openBtn").click(function (e) {
        $("body").toggleClass("open");
    });
}

module.exports = header;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var common = {
    // 记录元素的offsetTop、animated（是否执行了动画）
    animateInfo: function animateInfo(iterable) {
        var arr = new Array();
        iterable.each(function (i, v) {
            var obj = {};
            obj["offsetTop"] = $(v).offset().top;
            obj["animated"] = true;
            arr.push(obj);
        });
        return arr;
    },


    // 顺序执行动画
    orderAnimate: function orderAnimate($e, effect) {
        var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var constant1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var constant2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

        var dur = index * constant1 + constant2;
        $e.velocity(effect, dur);
    },


    // 动画执行条件（滚动事件里判断）
    animCondition: function animCondition(obj, constant) {
        var scrollTop = $(window).scrollTop();
        var clientH = document.documentElement.clientHeight || document.body.clientHeight;

        if (obj.animated && obj.offsetTop) {
            return obj.animated && scrollTop > obj.offsetTop - (clientH - constant) ? true : false;
        }
        return false;
    },


    // 封装二级导航逻辑代码

    /**
     * 计算second-wrapper的left偏移   算法： 一级a标签的左偏移 - 二级列表的宽度 / 2 + 二级li的宽度 / 2
     *                                     aLeft - secondListW / 2 + liW / 2
     */
    showSec: function showSec(context, secDiv, display) {
        // context: 一级导航上下文, secDiv: 二级div, display: display值
        var str = addDecimal(secDiv);

        context.find(str).css({ display: display });
        // logic代码
        var aLeft = context.offset().left,
            ulW = context.find(str + ">ul").width() / 2,
            liW = context.find(str + ">ul>li").outerWidth(true); // 包含了margin的Width

        var com = aLeft - ulW;
        var finalX = com + liW / 2;

        context.find(str + ">ul").css({
            "transform": "translate3d(" + finalX + "px, 0, 0)"
        });
        context.find(str).velocity({ opacity: 1 });
    }
};

// effects
var kofzx = {
    slideUpIn: {
        opacity: [1, 0],
        translateY: [0, 20],
        translateZ: 0
    },
    slideUpBigIn: {
        opacity: [1, 0],
        translateY: [0, 75],
        translateZ: 0
    }
};

function addDecimal(str) {
    return "." + str;
}

// 改写代码

module.exports = function () {
    function Toolkit() {
        _classCallCheck(this, Toolkit);
    }

    _createClass(Toolkit, null, [{
        key: "commonFunction",
        get: function get() {
            return common;
        }
    }, {
        key: "myself",
        get: function get() {
            return kofzx;
        }
    }]);

    return Toolkit;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map