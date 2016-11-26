/*初始化Rem*/
;(function (window, document) {
    (function () {
        var viewportEl = document.querySelector('meta[name="viewport"]'), hotcssEl = document.querySelector('meta[name="hotcss"]'), dpr = window.devicePixelRatio || 1;
        if (hotcssEl) {
            var hotcssCon = hotcssEl.getAttribute("content");
            if (hotcssCon) {
                var initialDpr = hotcssCon.match(/initial\-dpr=([\d\.]+)/);
                if (initialDpr) {
                    dpr = parseFloat(initialDpr[1])
                }
            }
        }
        var scale = 1, content = "width=device-width, initial-scale=" + scale + ", minimum-scale=" + scale + ", maximum-scale=" + scale + ", user-scalable=no";
        if (viewportEl) {
            viewportEl.setAttribute("content", content)
        } else {
            viewportEl = document.createElement("meta");
            viewportEl.setAttribute("name", "viewport");
            viewportEl.setAttribute("content", content);
            document.head.appendChild(viewportEl)
        }
    })();
    var hotcss = {};
    hotcss.px2rem = function (px, designWidth) {
        if (!designWidth) {
            designWidth = parseInt(hotcss.designWidth, 10)
        }
        return parseInt(px, 10) * 375 / designWidth / 20
    };
    hotcss.mresize = function () {
        var innerWidth = window.innerWidth;
        if (!innerWidth) {
            return false
        }
        document.documentElement.style.fontSize = (innerWidth * 20 / 375) + "px"
    };
    hotcss.mresize();
    window.addEventListener("resize", hotcss.mresize, false);
    window.addEventListener("load", hotcss.mresize, false);
    setTimeout(function () {
        hotcss.mresize()
    }, 300);
    window.hotcss = hotcss;
    //安卓ios设备判断
    var Emt = (function () {
        var env = {},
            navigator = window.navigator,
            userAgent = navigator.userAgent,
            ios = userAgent.match(/(iPad|iPhone|iPod);.+OS\s([\d_\.]+)/),
            android = userAgent.match(/(Android)\s([\d\.]+)/);

        env.isAndroid = (/android/gi).test(navigator.appVersion);
        env.isIDevice = (/iphone|ipad|ipod/gi).test(navigator.appVersion);
        env.isWebkit = /WebKit\/[\d.]+/i.test(userAgent);
        env.isSafari = ios ? (navigator.standalone ? isWebkit : (/Safari/i.test(userAgent) && !/CriOS/i.test(userAgent) && !/MQQBrowser/i.test(userAgent))) : false;

        if (ios) {
            env.device = ios[1];
            env.version = ios[2].replace(/_/g, '.');
        } else if (android) {
            env.version = android[2];
        }

        env.standalone = navigator.standalone;
        env.wechat = navigator.userAgent.indexOf("MicroMessenger") >= 0;
        env.gameStoreHD = navigator.userAgent.indexOf('GameStoreHD') >= 0;

        return env;
    })();

    if (Emt.standalone && Emt.version < "7.0") {
        document.write('<meta name="apple-mobile-web-app-capable" content="yes">');
    }
})(window, document);
(function(window, $, undefined){
    var $body=$("body");
    $body.css("height",$(window).height());
    /*文字缩进动画*/
    for(var i=1;i<5;i++){
        var _target=$(".mod-page"+i).find(".txt-box p");
        for(var k=0;k<_target.length;k++){
            _target.eq(k).css("padding-left",10.5*k+"%");
        }
    }

    /*小屏适配*/
    var _scale=$(window).width()/$(window).height();
    if((_scale>=(310/414))) {
        $body.addClass("small-screen");
    }

})(window, $);
