define(function(require ,exports ,module){
    var $=require('Zepto');
    require('touch');
    module.exports = function(zepto){
        (function($) {
    /*
     * tab切换组件
     * $(selector).gnTabs({
     *   initNum {number} 默认显示第几个
     * })
     * */
    $.fn.gnTabs = function(o){
        var defaultsOptions = {initNum : 0};
        var options = $.extend({} ,defaultsOptions ,o);
        return this.each(function(){
            var $this = $(this),
                initNum = options.initNum,
                thisTitles = $(this).find('.tabs-title li'),
                thisContents = $(this).find('.tabs-content');
            thisTitles.removeClass('cur').eq(initNum).addClass('cur');
            thisContents.hide().eq(initNum).show();
            thisTitles.tap(function(){
                var index =  $(this).index();
                thisTitles.removeClass('cur').eq(index).addClass('cur');
                thisContents.hide().eq(index).show();
            });
            thisContents.on({
                'swipeLeft' : function(){
                    var current = $this.find('li.cur').index();
                    if(current != thisTitles.length-1){
                        thisTitles.removeClass('cur').eq(current+1).addClass('cur');
                        thisContents.hide().eq(current+1).show();
                    }
                },
                'swipeRight' : function(){
                    var current = $this.find('li.cur').index();
                    if(current != 0){
                        thisTitles.removeClass('cur').eq(current-1).addClass('cur');
                        thisContents.hide().eq(current-1).show();
                    }
                }
            })

        });
    };

    /**
     * 数量加减组件
     * $(Selector).gnNums({
     *  default : {num} 默认数值为1
     *  max ：{num} 最多可以买多少 默认5
     *  min : {num} 最少需要买多少 默认1
     * })
     */
    $.fn.gnNums = function(o){
        var defaultOptions = {default : 1 ,max : 5 ,min : 1};
        var options = $.extend({} ,defaultOptions ,o);
        return this.each(function(){
            var $addBtn = $(this).find('.add-btn'),
                $minusBtn = $(this).find(".minus-btn"),
                $numText = $(this).find(".buy-num"),
                initText = options.default;
            function addNum(currentNum){
                $numText.text( ++currentNum  );
                $minusBtn.removeClass('disabled');
                currentNum === options.max && $addBtn.addClass('disabled');
            };
            function minusNum(currentNum){
                $numText.text( -- currentNum);
                $addBtn.removeClass('disabled');
                currentNum === options.min && $minusBtn.addClass('disabled');
            }
            //init
            $numText.text(initText);
            initText<=1 && $minusBtn.addClass('disabled');
            //add
            $addBtn.on('click',function(){
                if(!$(this).hasClass('disabled')){
                    addNum(parseInt($numText.text()));
                }
            });
            //minus
            $minusBtn.on('click',function(){
                if(!$(this).hasClass('disabled')) {
                    minusNum(parseInt($numText.text()));
                }
            });

        });
    };

    /**
     * lazyload图片懒加载插件
     */
    var lazyload = function(o){
        this.onerrorImgUrl = o.onerrorImgUrl;
        this.srcStore = o.srcStore;
        this.class = o.class;
        this.sensitivity = o.sensitivity;
        this.init();
    }
    lazyload.prototype = {
        constructor:lazyload,
        init : function(){
            var minScroll = 5,
                slowScrollTime = 200,
                that = this;
            ios = navigator.appVersion.match(/(iPhone\sOS)\s([\d_]+)/),
                isIos = ios && !0 || !1,
                isoVersion = isIos && ios[2].split("_");

            isoVersion = isoVersion && parseFloat(isoVersion.length > 1 ? isoVersion.splice(0, 2).join(".") : isoVersion[0], 10),
                isIos = that.isPhone = isIos && isoVersion < 6;

            if(isIos){
                var startSyAndTime ,setTimeOut;
                $(window).on("touchstart",function() {
                    startSyAndTime = {
                        sy: window.scrollY,
                        time: Date.now()
                    },
                    setTimeOut && clearTimeout(setTimeOut)
                }).on("touchend",function(e) {
                    if (e && e.changedTouches) {
                        var subtractionY = Math.abs(window.scrollY - startSyAndTime.sy);
                        if (subtractionY > minScroll) {
                            var subtractionTime = Date.now() - startSyAndTime.time;
                            setTimeOut = setTimeout(function() {
                                    that.changeimg(),
                                        startSyAndTime = {},
                                        clearTimeout(setTimeOut),
                                        setTimeOut = null
                                },
                                subtractionTime > slowScrollTime ? 0: 200)
                        }
                    } else {
                        that.changeimg();
                    }
                }).on("touchcancel", function() {
                    setTimeOut && clearTimeout(setTimeOut),
                        startSyAndTime = {}
                })
            } else {
                $(window).on("scroll", function() {
                    that.changeimg();
                });
            }
            setTimeout(function() {
                that.trigger();
            },90);
        },
        trigger : function(){
            var that = this;
            eventType = that.isPhone && "touchend" || "scroll";
            that.imglist = $('img.'+that.class+'');
            $(window).trigger(eventType);
        },
        changeimg : function(){
            function loadYesOrno(img) {
                var windowPageYOffset = window.pageYOffset,
                    windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight,
                    imgOffsetTop = img.offset().top;
                return imgOffsetTop >= windowPageYOffset && imgOffsetTop - that.sensitivity <= windowPageYOffsetAddHeight;
            }
            function loadImg(img, index) {

                var imgUrl = img.attr(that.srcStore);
                img.attr("src", imgUrl);
                img[0].onload || (img[0].onload = function() {
                    $(this).removeClass(that.class).removeAttr(that.srcStore),
                        that.imglist[index] = null,
                        this.onerror = this.onload = null
                },
                    img[0].onerror = function() {
                        this.src = that.onerrorImgUrl,
                            $(this).removeClass(that.class).removeAttr(that.srcStore),
                            that.imglist[index] = null,
                            this.onerror = this.onload = null
                    })
            }
            var that = this;
            that.imglist.each(function(index, val) {
                if (!val) return;
                var img = $(val);
                if (!loadYesOrno(img)) return;
                if (!img.attr(that.srcStore)) return;
                loadImg(img, index);
            })
        }
    }
    /**
     * lazyload 图片懒加载插件
     * o.onerrorImgUrl {string} 图片加载失败用什么图片替换
     * o.srcStore {} 图片真实地址存放的自定义属性
     * o.class {} 惰性加载的图片需要添加的class
     * o.sensitivity {num} 该值越小，惰性越强（加载越少）
     */
    $.lazyload = function(o){
        var defaultOptions = {
            onerrorImgUrl : "./images/grey.png",//图片加载失败用什么图片替换
            srcStore      : "dataimg",   //图片真实地址存放的自定义属性
            class         : "lazy",      //惰性加载的图片需要添加的class
            sensitivity   : 50           //该值越小，惰性越强（加载越少）
        };
        var options = $.extend({},defaultOptions,o);
        new lazyload(options);
    };

    /*
     * gnDialog 弹窗组件
     * new gnDialog({
     *  text : html {string} required 填进弹窗的内容
     *  width : {string/num} 弹窗宽度 默认为60%
     *  height : {string/num} 弹窗高度 默认为auto
     *  modal : {boolean} 是否要遮罩层 默认为ture
     *  close : function 关闭的动作 或者 false
     *
     * })
     * */
    //检测是不是函数
    function isFunction( fn ) {
        return  !!fn && !fn.nodeName && fn.constructor != String &&
            fn.constructor != RegExp && fn.constructor != Array &&
            /function/i.test( fn + "" );
    }
    window.gnDialog =  function(o){
        var defaultOptions = {text : '弹窗' ,modal : true ,width:'70%' ,height : 'auto' };
        this.options = $.extend({} ,defaultOptions ,o);
        this.dialog = null;
        this.render();
        this.events();
        return this;
    };
    window.gnDialog.prototype = {
        constructor: 'gnDialog',
        render: function () {
            var _this = this;
            this.dialog = $("<div class='dialog'>").
                css({
                    width: _this.options.width,
                    height: _this.options.height
                });
            var dialogInner = $("<div class='dialog-inner'></div>").
                html(_this.options.text);
            this.dialog.append(dialogInner);
            if (this.options.close != false) {
                this.dialog.append("<a href='###' class='dialog-close'>关闭</a>");
            }
            this.dialog.addClass('a-fadein').appendTo('body');
            this.dialog.css({
                'margin-left': '-' + _this.dialog.width() / 2 + 'px',
                'margin-top': '-' + _this.dialog.height() / 2 + 'px'
            });
            if (_this.options.modal) {
                if ($(".mask").length) {
                    $(".mask").eq(0).show();
                } else {
                    $("<div class='mask'></div>").appendTo('body').show();
                }
            }
        },
        close: function () {
            this.dialog.remove();
            $(".mask").hide();
        },
        events: function () {
            var _this = this;
            //关闭
            this.dialog.find(".dialog-close").on('tap', function () {
                if (isFunction(_this.options.close)) {
                    _this.options.close();
                } else {
                    _this.close();
                }
            });
            $(".mask").on('tap', function () {
                _this.close();
            })
        }
    }
    $.gnDialog = function(o){
        return new window.gnDialog(o)
    };
        })(zepto);
    }
});
