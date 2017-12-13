define(function(require ,exports ,module){
    require('public');
    require('plugins')($);
    $("#tabs").gnTabs();
    $("#nums").gnNums({default:1,max:10,min:1});
    //加入购物车
    $("#addShopCar").on('tap',function(){
        var str = '<div class="shopcar-dialog">\
                        <p class="shopcar-text">加入购物车成功</p>\
                        <div class="shopcar-link-outer">\
                            <a href="index.html" class="shopcar-link">再去逛逛</a>\
                            <a href="shopcar.html" class="shopcar-link">去购物车</a>\
                        </div>\
                    </div>';
        $.gnDialog({
            text:str
        });
    });
    //加入收藏
    $("#restoreBtn").on('tap',function(){
        $(this).addClass('restored');
        var str = '<div>\
                        <div class="restore-title-outer">\
                            <span class="restore-title">添加到</span>\
                            <a href="javascript:;" class="create-menu">新菜单</a>\
                        </div>\
                        <div class="restore-list">\
                            <ul>\
                                <li class="restored-menu"><i class="restore-icon"></i>收藏<input checked type="checkbox"/></li>\
                                <li><i class="restore-icon"></i>苹果<input type="checkbox"/></li>\
                                <li><i class="restore-icon"></i>梨子<input type="checkbox"/></li>\
                                <li><i class="restore-icon"></i>苹果<input type="checkbox"/></li>\
                                <li><i class="restore-icon"></i>梨子<input type="checkbox"/></li>\
                                <li><i class="restore-icon"></i>苹果<input type="checkbox"/></li>\
                                <li><i class="restore-icon"></i>梨子<input type="checkbox"/></li>\
                                <li><i class="restore-icon"></i>苹果<input type="checkbox"/></li>\
                                <li><i class="restore-icon"></i>梨子<input type="checkbox"/></li>\
                            </ul>\
                        </div> \
                        <div class="restore-buttons">\
                            <a href="javascript:;" id="sureBtn">确定</a> \
                            <a href="javascript:;" id="qxBtn">取消</a> \
                        </div> \
                    </div>';
        var restoreDialog = $.gnDialog({
            text:str,
            close:false
        });
        $("#sureBtn").on('tap',function(){
            $.ajax();
        });
        $("#qxBtn").on('tap',function(){
            restoreDialog.close();
        });
        //新建菜单
        $(".create-menu").on('tap',function(){
            restoreDialog.close();
            var str = '<div class="restore-title-outer">\
                                <span class="restore-title">新建菜单</span>\
                            </div>\
                            <div class="restore-list">\
                                <input type="text" class="menu-input"/>\
                            </div> \
                            <div class="restore-buttons">\
                                <a href="javascript:;" id="MenuSureBtn">确定</a> \
                                <a href="javascript:;" id="MenuQxBtn">取消</a> \
                            </div>';
            var menuDialog = $.gnDialog({
                text:str,
                close:false
            });
            $("#MenuSureBtn").on('tap',function(){
                $.ajax();
            });
            $("#MenuQxBtn").on('tap',function(){
                menuDialog.close();
            });

        });
    });
});