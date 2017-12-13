define(function(require ,exports ,module){
    require('public');
    require('plugins')($);

    //选择区域弹窗
    $("#selectAreaBtn").on('tap',function(){
        $(this).parent('li').addClass('cur').siblings('li').removeClass('cur');
        $(".tabs-content").eq(0).show();
        $(".area-mask,.area-box").show();
    });
    //选择区域弹窗消失
    $(".page-top,.area-mask").on('tap',function(){
        $(".area-mask,.area-box").hide();
    })
    //选择更多
    $(".more-area").on('tap',function(){
        var str = '<li class="area-li">\
                            <a href="###">汉阳区1</a>\
                            <div class="area-select">\
                                <i class="area-select-icon"></i>\
                            </div>\
                        </li>';
        for(var i=0 ;i<4 ;i++){
            $(this).before($(str));
        }
    });
    //选择区域
    $(".area-box").on('tap','.area-li',function(){
        $(this).addClass('cur').siblings('.area-li').removeClass('cur');
        $(".area-mask,.area-box").hide();
        $.ajax();
    });
    //默认排序
    $("#defaultSortBtn").on('tap',function(){
        $(this).parent('li').addClass('cur').siblings('li').removeClass('cur');
        $(".tabs-content").eq(1).show();
    });
});
