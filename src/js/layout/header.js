import Toolkit from '../utils/utils';
let showSec = Toolkit.commonFunction.showSec;

function header() {
    /*=================== Sticky Header  ===================*/
    if ($(".stickMain").hasClass('stick')) {
        var header_top = $(".stickMain.stick").offset().top;
    }
    $(window).scroll(() => {
        const scroll = $(window).scrollTop();
        if (scroll > header_top) {
            $(".stickMain.stick").addClass("sticky");
        } else {
            $(".stickMain.stick").removeClass("sticky");
        }
    });

    /*=================== 导航交互 ===================*/
    $("nav#navigation ul.first-level > li").each(function() {
        $(this).hover(
            function() {
                // 显示二级导航
                showSec($(this), "second-wrapper", "flex");
            },
            function() {
                $(this).find(".second-wrapper").velocity({ opacity: 0 }, { display: "none" });
            }
        );
    });

    /**
     * 二维码切换
     */
    let $code = $("[data-code='code']");
    let $real = $("[data-code='real']");
    let bool = false;

    $code.click(e => {
        if (!bool) {
            $real.velocity("transition.slideUpIn", { duration: 300 });
        } else {
            $real.velocity("transition.slideUpOut", { duration: 600 });
        }
        bool = !bool;
    });

    /*=================== 手机导航交互 ===================*/
    $("nav#mobileNav ul.first-level > li > a").each(function() {
        $(this).click(e => {
            const $secondLevel = $(this).next(".second-level");

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
    $("#openBtn").click(e => {
        $("body").toggleClass("open");
    });

}

module.exports = header;