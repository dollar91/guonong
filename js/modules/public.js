window.onload=htmlSize;
window.onresize =htmlSize;
function htmlSize(){
    var cw=document.body.clientWidth;
    cw=cw/16;
    //计算倍数，数值可变。
    if(cw<20){cw=20} //最小宽度
    if(cw>40){cw=40} //最大宽度
    document.getElementsByTagName('html')[0].style.fontSize=cw+'px';
}
define(function(require ,exports ,module){
    var $ = require('Zepto');
    require('touch')($);
    /*选择样式*/
    $(".goods-select").on('tap',function(e){
        $(this).toggleClass('selected');
        e.stopPropagation();
    });
    /*menu-open*/
    $("#openMenu").tap(function(){
        $(this).removeClass('pt-page-moveFromLeft').addClass('pt-page-moveToLeft');
        $("#menu").removeClass('pt-page-moveToLeftEasing').show().addClass('pt-page-moveFromLeft')
    });
    /*menu-close*/
    $("#closeMenu").tap(function(){
        $("#menu").addClass('pt-page-moveToLeftEasing');
        $("#openMenu").removeClass('pt-page-moveToLeft').addClass('pt-page-moveFromLeft');
    });
    /*showKind*/
    $("#kindBtn").tap(function(){
        $("#contentLeft").show().removeClass('pt-page-moveToLeftEasing').addClass('pt-page-moveFromLeft');
        $(".mask").show().addClass('pt-page-fade');
    });
    /*hideKind*/
    $(".mask").click(function(){
        $("#contentLeft").addClass('pt-page-moveToLeftEasing').removeClass('pt-page-moveFromLeft');
        $(".mask").hide().removeClass('pt-page-fade');
    });
    /*分类展开菜单*/
    $(".second-nav").on('click',function(){
        $(this).find(".sub-children-open").toggleClass('sub-children-close');
        $(this).next('ul').toggle()
    });
})
