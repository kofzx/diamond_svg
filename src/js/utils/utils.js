const common = {
    // 记录元素的offsetTop、animated（是否执行了动画）
    animateInfo(iterable) {
        let arr = new Array();
        iterable.each((i, v) => {
            let obj = {};
            obj["offsetTop"] = $(v).offset().top;
            obj["animated"] = true;
            arr.push(obj);
        });
        return arr;
    },

    // 顺序执行动画
    orderAnimate($e, effect, index = 0, constant1 = 0, constant2 = 0) {
        const dur = index * constant1 + constant2;
        $e.velocity(effect, dur);
    },

    // 动画执行条件（滚动事件里判断）
    animCondition(obj, constant) {
        const scrollTop = $(window).scrollTop();
        const clientH = document.documentElement.clientHeight || document.body.clientHeight;

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
    showSec(context, secDiv, display) { // context: 一级导航上下文, secDiv: 二级div, display: display值
        const str = addDecimal(secDiv);

        context.find(str).css({ display: display });
        // logic代码
        const aLeft = context.offset().left,
            ulW = context.find(str + ">ul").width() / 2,
            liW = context.find(str + ">ul>li").outerWidth(true); // 包含了margin的Width

        const com = aLeft - ulW;
        const finalX = com + liW / 2;

        context.find(str + ">ul").css({
            "transform": "translate3d(" + finalX + "px, 0, 0)"
        });
        context.find(str).velocity({ opacity: 1 });
    }
};

// effects
const kofzx = {
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

module.exports = class Toolkit {

    static get commonFunction() {
        return common;
    }

    static get myself() {
        return kofzx;
    }
};